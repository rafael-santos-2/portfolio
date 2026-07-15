'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useEffect, useMemo, useState } from 'react';
import { CircularProgress, Divider, Tab, Tabs, Typography } from '@mui/material';
import { get_error_logs } from '@/database/logs/logs';
import { get_error_type } from '@/hooks/use-error-logs';
import type { ILog, TErrorLogType } from '@/types/database';
import Error_log_item from './error-log-item';
import css from './error-log-panel.module.css';
// ----------------------------------------------------------------------------------------------------


// TYPES
// ----------------------------------------------------------------------------------------------------
type TErrorLogFilter = 'all' | TErrorLogType;

type TTab = {
  value: TErrorLogFilter;
  label: string;
};

type TProps = {
  height: number | string;
};
// ----------------------------------------------------------------------------------------------------


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function Error_log_panel({ height }: TProps): JSX.Element {


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [logs, set_logs]           = useState<ILog[]>([]);
  const [is_loading, set_loading]  = useState(false);
  const [filter, set_filter]       = useState<TErrorLogFilter>('all');


  // COMPUTED
  // ----------------------------------------------------------------------------------------------------
  const filtered_logs = useMemo(() => {
    if (filter === 'all') return logs;
    return logs.filter(l => get_error_type(l) === filter);
  }, [logs, filter]);

  const tabs: TTab[] = [
    { value: 'all',                 label: 'Alle'      },
    { value: 'unhandled_exception', label: 'Exception' },
    { value: 'unhandled_rejection', label: 'Rejection' },
    { value: 'react_boundary',      label: 'Boundary'  },
    { value: 'manual',              label: 'Manueel'   },
  ];


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing async fetch result into state on mount
    set_loading(true);
    get_error_logs(100)
      .then(set_logs)
      .catch(() => {})
      .finally(() => set_loading(false));
  }, []);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <div className={css.panel} style={{ height }}>

      {/* Tabs */}
      <Tabs
        value={filter}
        onChange={(_, v) => set_filter(v as TErrorLogFilter)}
        variant="scrollable"
        scrollButtons={false}
        sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40, py: 0, fontSize: '0.75rem' } }}
      >
        {tabs.map(tab => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      <Divider />

      {/* List */}
      <div className={css.list}>

        {is_loading && (
          <div className={css.loader}>
            <CircularProgress size={24} />
          </div>
        )}

        {!is_loading && filtered_logs.length === 0 && (
          <div className={css.empty}>
            <Typography variant="body2" color="text.disabled">Geen error logs gevonden</Typography>
          </div>
        )}

        {!is_loading && filtered_logs.map((log, index) => (
          <div key={log.id}>
            <Error_log_item error_log={log} />
            {index < filtered_logs.length - 1 && <div className={css.divider} />}
          </div>
        ))}

      </div>

    </div>
  );

}
// ----------------------------------------------------------------------------------------------------
