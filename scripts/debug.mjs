import { createReadStream } from 'fs';
import csvParser from 'csv-parser';

const stream = createReadStream('scripts/onnuri_raw.csv');
stream.pipe(csvParser({ bom: true })).once('data', (row) => {
  console.log('컬럼명들:', Object.keys(row));
  console.log('가맹점명 값:', JSON.stringify(row['가맹점명']));
  const firstKey = Object.keys(row)[0];
  console.log('첫 번째 키 (hex):', Buffer.from(firstKey).toString('hex'));
  stream.destroy();
});
