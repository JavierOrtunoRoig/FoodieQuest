import React from 'react';

export default function layout ({ children }: {children: React.ReactNode}) {
  return (
    <main style={{ padding: '0 30%' }}>
      {children}
    </main>
  );
}
