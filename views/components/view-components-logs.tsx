'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import { ILog } from '@/types/database';
import LogItem from '@/components/logs/log-item';
import { Header } from '@/components/header';


// DATA
// ----------------------------------------------------------------------------------------------------
const DUMMY_LOGS: ILog[] = [
  // { ...BASE, id: 'l1',  action: 'create', resource_type: 'document', resource_id: 'doc_001', resource_label: 'Contract.pdf',      message: 'Document created',              severity: 'success', date_created: new Date(Date.now() - 1000 * 60 * 2) },
  // { ...BASE, id: 'l2',  action: 'update', resource_type: 'user',     resource_id: 'usr_002', resource_label: 'Jan Janssen',        message: 'User profile updated',          severity: 'info',    date_created: new Date(Date.now() - 1000 * 60 * 10), actor_label: 'Admin' },
  // { ...BASE, id: 'l3',  action: 'delete', resource_type: 'document', resource_id: 'doc_003', resource_label: 'Old report.pdf',     message: 'Document deleted',              severity: 'warning', date_created: new Date(Date.now() - 1000 * 60 * 25) },
  // { ...BASE, id: 'l4',  action: 'login',  resource_type: 'session',  resource_id: null,      resource_label: null,                message: 'User logged in',                severity: 'info',    date_created: new Date(Date.now() - 1000 * 60 * 40) },
  // { ...BASE, id: 'l5',  action: 'export', resource_type: 'report',   resource_id: 'rep_004', resource_label: 'Q1 2025 Report',    message: 'Report exported to CSV',        severity: 'success', date_created: new Date(Date.now() - 1000 * 60 * 60), tags: ['billing', 'export'] },
  // { ...BASE, id: 'l6',  action: 'error',  resource_type: 'payment',  resource_id: 'pay_005', resource_label: 'Order #42',         message: 'Payment processing failed',     severity: 'error',   date_created: new Date(Date.now() - 1000 * 60 * 90), tags: ['billing'] },
  // { ...BASE, id: 'l7',  action: 'import', resource_type: 'product',  resource_id: null,      resource_label: null,                message: '142 products imported from CSV',severity: 'success', date_created: new Date(Date.now() - 1000 * 60 * 120) },
  // { ...BASE, id: 'l8',  action: 'view',   resource_type: 'document', resource_id: 'doc_006', resource_label: 'NDA Agreement.pdf', message: 'Document viewed',               severity: 'info',    date_created: new Date(Date.now() - 1000 * 60 * 180), actor_label: 'Lien Pieters' },
  // { ...BASE, id: 'l9',  action: 'logout', resource_type: 'session',  resource_id: null,      resource_label: null,                message: 'User logged out',               severity: 'info',    date_created: new Date(Date.now() - 1000 * 60 * 240) },
  // { ...BASE, id: 'l10', action: 'custom', resource_type: 'system',   resource_id: null,      resource_label: null,                message: 'Scheduled maintenance completed',severity: 'success', date_created: new Date(Date.now() - 1000 * 60 * 300), tags: ['system'] },
];


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsLogs(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Header title="Logs" />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
          <Stack divider={<Divider />}>
            {DUMMY_LOGS.map((log) => (
              <LogItem key={log.id} log={log} />
            ))}
          </Stack>
        </Box>
      </div>

    </div>
  );

}
