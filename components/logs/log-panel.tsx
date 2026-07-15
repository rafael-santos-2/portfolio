'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import LogItem from './log-item';
import { ILog, TLogSeverity } from '@/types';


// TYPES
// ----------------------------------------------------------------------------------------------------

type TTab = {
  value: TLogSeverity | "all";
  label: string;
  count?: number;
};


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function LogPanel({logs}:{logs:ILog[]}): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslation();
  const is_loading = false;


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [ tab , set_tab ] = useState<TLogSeverity | "all">("all");



  // COMPUTED
  // ----------------------------------------------------------------------------------------------------

  const tabs: TTab[] = [
    { value: "all",     label: t('log.filter.all'),      count: logs.length },
    { value: 'debug',  label: t('log.action.debug') },
    { value: 'info',  label: t('log.action.info') },
    { value: 'error',   label: t('log.severity.error') },
    { value: 'warning', label: t('log.severity.warning') },
    { value: 'success',  label: t('log.action.success') },
  ];


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <Stack sx={{ width: '100%', height:"auto", display: 'flex', flexDirection: 'column' }}>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => set_tab(v as TLogSeverity | "all")}
        variant="scrollable"
        scrollButtons={false}
        sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40, py: 0, fontSize: '0.75rem' } }}
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={
              tab.count !== undefined && tab.count > 0
                ? `${tab.label} (${tab.count})`
                : tab.label
            }
          />
        ))}
      </Tabs>

      <Divider />

      {/* List */}
      <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>

        {is_loading && (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
            <CircularProgress size={24} />
          </Stack>
        )}

        {!is_loading && logs.length === 0 && (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
            <Typography variant="body2" color="text.disabled">{t('log.empty')}</Typography>
          </Stack>
        )}

        {!is_loading && logs.map((log, index) => (
          <Box key={log.id}>
            <LogItem log={log} />
            {index < logs.length - 1 && <Divider />}
          </Box>
        ))}

        {/* Load more */}
        {/* {!is_loading && has_more && (
          <Stack alignItems="center" sx={{ py: 2 }}>
            <Button variant="text" size="small" onClick={onLoadMore}>
              {t('log.loadMore')}
            </Button>
          </Stack>
        )} */}

      </Box>

    </Stack>
  );

}
