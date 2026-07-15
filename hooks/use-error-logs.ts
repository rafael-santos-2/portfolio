'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import type { ILog, TErrorLogType } from '@/types/database';
// ----------------------------------------------------------------------------------------------------


// TYPES
// ----------------------------------------------------------------------------------------------------
export type TErrorLogFilter = 'all' | TErrorLogType;

export type TUseErrorLogsReturn = {
  error_logs: ILog[];
  is_loading: boolean;
  has_more: boolean;
  filter: TErrorLogFilter;
  onSetFilter: (filter: TErrorLogFilter) => void;
  onLoadMore: () => Promise<void>;
};
// ----------------------------------------------------------------------------------------------------


// HELPERS
// ----------------------------------------------------------------------------------------------------
export function get_error_type(log: ILog): TErrorLogType {
  switch (log.name) {
    case 'Unhandled Error':             return 'unhandled_exception';
    case 'Unhandled Promise Rejection': return 'unhandled_rejection';
    case 'React Boundary':              return 'react_boundary';
    default:                            return 'manual';
  }
}
// ----------------------------------------------------------------------------------------------------