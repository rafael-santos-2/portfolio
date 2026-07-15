'use client';

import { JSX } from 'react';
import { Header } from '@/components/header';
import ViewNoPermission from './no-permission/view-no-permission';

export default function ViewGeneralNoPermission(): JSX.Element {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header title="No Permission" />
      <div style={{ flex: 1, position: 'relative' }}>
        <ViewNoPermission />
      </div>
    </div>
  );
}
