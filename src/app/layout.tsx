import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import '@/styles/global.css';

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: '온누리맵 — 내 주변 온누리상품권 가맹점 찾기',
  description:
    '전통시장·소상공인 온누리상품권(지류·모바일·카드) 가맹점을 지도와 리스트로 빠르게 찾아보세요.',
  keywords: [
    '온누리상품권',
    '온누리상품권 가맹점',
    '전통시장',
    '온누리맵',
    '지류상품권',
    '모바일상품권',
    '카드상품권',
    '소상공인',
  ],
  openGraph: {
    title: '온누리맵 — 내 주변 온누리상품권 가맹점 찾기',
    description:
      '전통시장·소상공인 온누리상품권(지류·모바일·카드) 가맹점을 지도와 리스트로 빠르게 찾아보세요.',
    url: '/',
    siteName: '온누리맵',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '온누리맵 — 온누리상품권 가맹점 지도 서비스',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '온누리맵 — 내 주변 온누리상품권 가맹점 찾기',
    description:
      '전통시장·소상공인 온누리상품권(지류·모바일·카드) 가맹점을 지도와 리스트로 빠르게 찾아보세요.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/icon-192x192.png',
  },
  manifest: '/manifest.json',
  verification: {
    other: {
      'naver-site-verification': '9a75e37d1731e653c21af0fca503b15c807f193a',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#10B981',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
