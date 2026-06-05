import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const PUBLIC_DATA_KEY = process.env.PUBLIC_DATA_KEY;
const KAKAO_API_KEY = process.env.KAKAO_API_KEY;
const DELAY_MS = 100;

const API_URL = 'https://api.odcloud.kr/api/3060079/v1/uddi:0e9db925-b81a-4d7b-9cf5-f55007706d7e';
const RAW_FILE = path.join(__dirname, 'onnuri_2024_raw.json');
const ADDR_CACHE_FILE = path.join(__dirname, 'address_coords.json');
const PLACE_ID_CACHE_FILE = path.join(__dirname, 'place_ids.json');
const OUTPUT_FILE = path.join(__dirname, 'onnuri_final.json');
const PUBLIC_FILE = path.join(__dirname, '..', 'public', 'data', 'onnuri_final.json');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 1단계: 공공 API에서 전체 데이터 다운로드
async function downloadAllData() {
  if (fs.existsSync(RAW_FILE)) {
    const data = JSON.parse(fs.readFileSync(RAW_FILE, 'utf-8'));
    console.log(`💾 기존 원본 데이터 ${data.length.toLocaleString()}건 로드 (다운로드 스킵)\n`);
    return data;
  }

  console.log('📡 공공데이터 API 다운로드 시작...');
  const perPage = 1000;

  const firstRes = await axios.get(API_URL, {
    params: { page: 1, perPage: 1, serviceKey: PUBLIC_DATA_KEY },
  });
  const totalCount = firstRes.data.totalCount;
  const totalPages = Math.ceil(totalCount / perPage);
  console.log(`총 ${totalCount.toLocaleString()}건, ${totalPages}페이지\n`);

  const allData = [];
  for (let page = 1; page <= totalPages; page++) {
    const pct = (((page) / totalPages) * 100).toFixed(1);
    process.stdout.write(`\r다운로드 중... [${page}/${totalPages}] ${pct}%`);

    const res = await axios.get(API_URL, {
      params: { page, perPage, serviceKey: PUBLIC_DATA_KEY },
    });
    allData.push(...res.data.data);
    await delay(DELAY_MS);
  }

  fs.writeFileSync(RAW_FILE, JSON.stringify(allData, null, 2), 'utf-8');
  console.log(`\n✅ ${allData.length.toLocaleString()}건 저장 완료\n`);
  return allData;
}

// 2단계: 주소로 좌표 검색 (주소 검색 → 키워드 검색 폴백)
async function geocodeAddress(address) {
  try {
    const res = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
      params: { query: address, size: 1 },
    });
    const docs = res.data.documents;
    if (docs && docs.length > 0) {
      return { x: parseFloat(docs[0].x), y: parseFloat(docs[0].y) };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      console.warn('\n⚠️  Rate limit. 2초 대기...');
      await delay(2000);
      return geocodeAddress(address);
    }
  }

  // 주소 검색 실패 → 키워드 검색 폴백
  try {
    const res = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
      params: { query: address, size: 1 },
    });
    const docs = res.data.documents;
    if (docs && docs.length > 0) {
      return { x: parseFloat(docs[0].x), y: parseFloat(docs[0].y) };
    }
  } catch {}

  return null;
}

// 5단계: Kakao Place ID 조회 (가맹점명 + 좌표 반경 검색)
async function fetchPlaceId(name, lat, lng) {
  try {
    const res = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
      params: { query: name, x: lng, y: lat, radius: 300, size: 1 },
    });
    const docs = res.data.documents;
    return (docs && docs.length > 0) ? docs[0].id : null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      console.warn('\n⚠️  Rate limit. 2초 대기...');
      await delay(2000);
      return fetchPlaceId(name, lat, lng);
    }
    return null;
  }
}

async function main() {
  if (!PUBLIC_DATA_KEY) {
    console.error('❌ PUBLIC_DATA_KEY가 .env 파일에 없습니다.');
    process.exit(1);
  }
  if (!KAKAO_API_KEY) {
    console.error('❌ KAKAO_API_KEY가 .env 파일에 없습니다.');
    process.exit(1);
  }

  // 1단계: 데이터 다운로드
  const rows = await downloadAllData();

  // 2단계: 고유 주소 추출
  const addressSet = new Set(
    rows.map((r) => r['소재지']?.trim()).filter(Boolean)
  );
  const addresses = [...addressSet];
  console.log(`📍 고유 주소 수: ${addresses.length.toLocaleString()}개\n`);

  // 3단계: 주소 캐시 로드
  let addrCache = {};
  if (fs.existsSync(ADDR_CACHE_FILE)) {
    addrCache = JSON.parse(fs.readFileSync(ADDR_CACHE_FILE, 'utf-8'));
    console.log(`💾 기존 캐시 ${Object.keys(addrCache).length.toLocaleString()}건 로드\n`);
  }

  const remaining = addresses.filter((addr) => !(addr in addrCache));
  const estimatedSec = Math.ceil((remaining.length * DELAY_MS) / 1000);
  console.log(`🔍 API 호출 대상: ${remaining.length.toLocaleString()}건 (예상 약 ${estimatedSec}초)\n`);

  let success = 0;
  let fail = 0;

  for (let i = 0; i < remaining.length; i++) {
    const addr = remaining[i];
    const pct = (((i + 1) / remaining.length) * 100).toFixed(1);
    process.stdout.write(
      `\r[${(i + 1).toLocaleString()}/${remaining.length.toLocaleString()}] ${pct}% | "${addr}"`.padEnd(80)
    );

    await delay(DELAY_MS);
    const result = await geocodeAddress(addr);

    addrCache[addr] = result;
    result ? success++ : fail++;

    if ((i + 1) % 100 === 0) {
      fs.writeFileSync(ADDR_CACHE_FILE, JSON.stringify(addrCache, null, 2), 'utf-8');
    }
  }

  fs.writeFileSync(ADDR_CACHE_FILE, JSON.stringify(addrCache, null, 2), 'utf-8');

  if (remaining.length > 0) {
    console.log(`\n\n✅ 지오코딩 완료 — 성공: ${success}, 실패: ${fail}\n`);
  }

  // 4단계: 전체 가맹점에 좌표 매핑
  console.log('🗺️  가맹점 좌표 매핑 중...');

  const results = rows.map((row) => {
    const fullAddress = row['소재지']?.trim() ?? '';
    const coords = addrCache[fullAddress];
    const parts = fullAddress.split(' ');
    const sido = parts[0] ?? '';
    const sigungu = parts[1] ?? '';
    const address = parts.slice(2).join(' ');

    const base = {
      name: row['가맹점명']?.trim() ?? '',
      market: row['소속 시장명(또는 상점가)']?.trim() ?? '',
      sido,
      sigungu,
      address,
      category: row['취급품목']?.trim() ?? '',
      paper: row['지류 취급여부'] === 'Y',
      mobile: row['모바일 취급여부'] === 'Y',
      card: row['충전식 카드 취급여부'] === 'Y',
      year: String(row['등록년도'] ?? ''),
    };

    if (coords) {
      return { ...base, lat: coords.y, lng: coords.x, location_type: 'ADDRESS' };
    }
    return { ...base, lat: null, lng: null, location_type: null };
  });

  const withCoords = results.filter((r) => r.location_type !== null).length;
  const without = results.filter((r) => r.location_type === null).length;

  console.log('\n📊 좌표 매핑 결과');
  console.log(`  좌표 있음 : ${withCoords.toLocaleString()}건`);
  console.log(`  좌표 없음 : ${without.toLocaleString()}건`);
  console.log(`  합계      : ${results.length.toLocaleString()}건\n`);

  // 5단계: Kakao Place ID 조회
  let placeIdCache = {};
  if (fs.existsSync(PLACE_ID_CACHE_FILE)) {
    placeIdCache = JSON.parse(fs.readFileSync(PLACE_ID_CACHE_FILE, 'utf-8'));
    console.log(`💾 기존 Place ID 캐시 ${Object.keys(placeIdCache).length.toLocaleString()}건 로드\n`);
  }

  // 좌표 있는 가맹점 중 캐시에 없는 고유 키만 추출
  const seenKeys = new Set();
  const needsLookup = results.filter((r) => {
    if (r.location_type !== 'ADDRESS') return false;
    const key = `${r.name}|||${r.lat}|||${r.lng}`;
    if (key in placeIdCache || seenKeys.has(key)) return false;
    seenKeys.add(key);
    return true;
  });

  const estimatedPlaceSec = Math.ceil((needsLookup.length * DELAY_MS) / 1000);
  const estimatedPlaceMin = Math.ceil(estimatedPlaceSec / 60);
  console.log(`🔍 Place ID 조회 대상: ${needsLookup.length.toLocaleString()}건 (예상 약 ${estimatedPlaceMin}분)\n`);

  let placeFound = 0;
  let placeNotFound = 0;

  for (let i = 0; i < needsLookup.length; i++) {
    const r = needsLookup[i];
    const key = `${r.name}|||${r.lat}|||${r.lng}`;
    const pct = (((i + 1) / needsLookup.length) * 100).toFixed(1);
    process.stdout.write(
      `\r[${(i + 1).toLocaleString()}/${needsLookup.length.toLocaleString()}] ${pct}% | "${r.name}"`.padEnd(80)
    );

    await delay(DELAY_MS);
    const placeId = await fetchPlaceId(r.name, r.lat, r.lng);
    placeIdCache[key] = placeId;
    placeId ? placeFound++ : placeNotFound++;

    if ((i + 1) % 100 === 0) {
      fs.writeFileSync(PLACE_ID_CACHE_FILE, JSON.stringify(placeIdCache, null, 2), 'utf-8');
    }
  }

  fs.writeFileSync(PLACE_ID_CACHE_FILE, JSON.stringify(placeIdCache, null, 2), 'utf-8');

  if (needsLookup.length > 0) {
    console.log(`\n\n✅ Place ID 조회 완료 — 찾음: ${placeFound.toLocaleString()}, 없음: ${placeNotFound.toLocaleString()}\n`);
  }

  // Place ID를 각 가맹점에 병합
  const finalResults = results.map((r) => {
    const key = `${r.name}|||${r.lat}|||${r.lng}`;
    const kakaoPlaceId = placeIdCache[key] ?? null;
    return { ...r, kakaoPlaceId };
  });

  const placeIdCount = finalResults.filter((r) => r.kakaoPlaceId).length;
  console.log(`📊 최종 결과`);
  console.log(`  Place ID 있음 : ${placeIdCount.toLocaleString()}건`);
  console.log(`  Place ID 없음 : ${(finalResults.length - placeIdCount).toLocaleString()}건`);
  console.log(`  합계          : ${finalResults.length.toLocaleString()}건`);

  const json = JSON.stringify(finalResults, null, 2);
  fs.writeFileSync(OUTPUT_FILE, json, 'utf-8');
  fs.writeFileSync(PUBLIC_FILE, json, 'utf-8');
  console.log(`\n💾 저장 완료 → ${OUTPUT_FILE}`);
  console.log(`💾 public 복사 완료 → ${PUBLIC_FILE}`);
}

main().catch((error) => {
  console.error('\n❌ 스크립트 오류:', error.message);
  process.exit(1);
});
