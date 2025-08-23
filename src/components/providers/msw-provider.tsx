'use client';

import { ReactNode } from 'react';

export function MSWProvider({ children }: { children: ReactNode }) {
  // MSW 설정이 필요한 경우 여기에 추가
  return <>{children}</>;
}
