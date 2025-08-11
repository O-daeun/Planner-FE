import { MSWProvider } from '@/components/msw-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Planner - 목표와 계획을 관리하세요',
  description: '인생 목표부터 일일 계획까지 체계적으로 관리하는 플래너 앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <MSWProvider>{children}</MSWProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
