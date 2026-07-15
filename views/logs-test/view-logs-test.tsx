'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Divider, Stack, Typography } from '@mui/material';
import LogPanel from '@/components/logs/log-panel';
import { ILog } from '@/types';
import { stream_logs } from '@/database';


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewLogsTest(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslation();


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const is_creating = false;
  const [ logs , set_logs ] = useState<ILog[]>([])


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  async function handle_create_dummy() {
    // setIsCreating(true);

    // const dummy_logs:ILog[] = [
    //   { action: 'create' as const, resource_type: 'document', resource_id: 'doc_001', resource_label: 'Contract.pdf', message: 'Document created', severity: 'success' as const },
    //   { action: 'update' as const, resource_type: 'user', resource_id: 'usr_002', resource_label: 'Jan Janssen', message: 'User profile updated', severity: 'info' as const },
    //   { action: 'delete' as const, resource_type: 'document', resource_id: 'doc_003', resource_label: 'Old report.pdf', message: 'Document deleted', severity: 'warning' as const },
    //   { action: 'login' as const, resource_type: 'session', resource_id: null, resource_label: null, message: 'User logged in', severity: 'info' as const },
    //   { action: 'export' as const, resource_type: 'report', resource_id: 'rep_004', resource_label: 'Q1 2025 Report', message: 'Report exported to CSV', severity: 'success' as const, tags: ['billing', 'export'] },
    //   { action: 'error' as const, resource_type: 'payment', resource_id: 'pay_005', resource_label: 'Order #42', message: 'Payment processing failed', severity: 'error' as const, tags: ['billing'] },
    //   { action: 'import' as const, resource_type: 'product', resource_id: null, resource_label: null, message: '142 products imported from CSV', severity: 'success' as const },
    //   { action: 'view' as const, resource_type: 'document', resource_id: 'doc_006', resource_label: 'NDA Agreement.pdf', message: 'Document viewed', severity: 'info' as const },
    //   { action: 'logout' as const, resource_type: 'session', resource_id: null, resource_label: null, message: 'User logged out', severity: 'info' as const },
    //   { action: 'custom' as const, resource_type: 'system', resource_id: null, resource_label: null, message: 'Scheduled maintenance completed', severity: 'success' as const, tags: ['system'] },
    // ];

    // for (const log of dummy_logs) {
    //   await create_log(log).catch(console.error);
    // }

    // setIsCreating(false);
  }


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {

    const stream = stream_logs((resp) => set_logs(resp) , { limit:50 });
    return () => { stream(); }

  },[])



  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <Stack spacing={3} sx={{ p: 3, maxWidth: 900 }}>

      {/* Warning */}
      <Alert severity="warning">
        This is a test page. Remove it when done testing.
      </Alert>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">{t('log.title')}</Typography>
        <Button
          variant="contained"
          onClick={handle_create_dummy}
          disabled={is_creating}
        >
          {is_creating ? t('general.loading') : 'Create dummy logs'}
        </Button>
      </Stack>

      <Divider />

      {/* Panel */}
      <Box>
        <LogPanel logs={logs} />
      </Box>

    </Stack>
  );

}
