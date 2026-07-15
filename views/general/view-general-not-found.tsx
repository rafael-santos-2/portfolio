'use client';

import { JSX } from 'react';
import { Header } from '@/components/header';
import ViewNotFound from './not-found/view-not-found';

export default function ViewGeneralNotFound(): JSX.Element {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header title="Not Found" />
      <div style={{ flex: 1, position: 'relative' }}>
        <ViewNotFound />
      </div>
    </div>
  );
}
