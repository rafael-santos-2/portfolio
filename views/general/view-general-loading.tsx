'use client';

import { JSX } from 'react';
import { Header } from '@/components/header';
import { Loader } from '@/components/loader';

export default function ViewGeneralLoading(): JSX.Element {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header title="Loading" />
      <div style={{ flex: 1, position: 'relative' }}>
        <Loader disableTimeout />
      </div>
    </div>
  );
}
