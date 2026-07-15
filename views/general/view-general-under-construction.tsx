'use client';

import { JSX } from 'react';
import { Header } from '@/components/header';
import ViewUnderConstruction from './under-construction/view-under-construction';

export default function ViewGeneralUnderConstruction(): JSX.Element {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header title="Under Construction" />
      <div style={{ flex: 1, position: 'relative' }}>
        <ViewUnderConstruction />
      </div>
    </div>
  );
}
