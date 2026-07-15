'use client';

import { JSX } from 'react';
import { Header } from '@/components/header';
import ViewNotAuthenticated from './not-authenticated/view-not-authenticated';

export default function ViewGeneralNotAuthenticated(): JSX.Element {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header title="Not Authenticated" />
      <div style={{ flex: 1, position: 'relative' }}>
        <ViewNotAuthenticated />
      </div>
    </div>
  );
}
