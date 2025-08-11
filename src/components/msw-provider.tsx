'use client';

import { useEffect } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 개발 환경에서만 MSW 초기화
    if (process.env.NODE_ENV === 'development') {
      const initMocks = async () => {
        const { worker } = await import('@/mocks/browser');
        worker.start({
          onUnhandledRequest: 'bypass',
        });
      };

      initMocks();
    }
  }, []);

  return <>{children}</>;
}
