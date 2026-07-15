'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from 'react';
import { Box, Chip, Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';

import 'dayjs/locale/nl';
import { useTranslate } from '@/providers/language/use-locales';
import type { ICalendarEventDetailProps } from './calendar.type';
import css from './calendar.module.css';


// HELPERS
// ----------------------------------------------------------------------------------------------------

const COLOR_MAP: Record<string, string> = {
  primary: 'var(--palette-primary-main)',
  secondary: 'var(--palette-secondary-main)',
  error: 'var(--palette-error-main)',
  warning: 'var(--palette-warning-main)',
  info: 'var(--palette-info-main)',
  success: 'var(--palette-success-main)',
};

function resolve_color(color?: string, colorMap?: Partial<Record<string, string>>): string {
  if (!color) return COLOR_MAP.primary;
  return colorMap?.[color] ?? COLOR_MAP[color] ?? color;
}

function format_date_range(start: Date | string, end?: Date | string, allDay?: boolean): string {
  const s = dayjs(start);
  const e = end ? dayjs(end) : null;

  if (allDay) {
    if (!e || s.isSame(e, 'day')) return s.format('dddd, MMMM D, YYYY');
    return `${s.format('MMM D')} – ${e.format('MMM D, YYYY')}`;
  }

  if (!e) return s.format('dddd, MMMM D · HH:mm');
  if (s.isSame(e, 'day')) {
    return `${s.format('dddd, MMMM D · HH:mm')} – ${e.format('HH:mm')}`;
  }
  return `${s.format('MMM D, HH:mm')} – ${e.format('MMM D, HH:mm')}`;
}


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function CalendarEventDetail({
  event,
  colorMap,
}: ICalendarEventDetailProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t, currentLang } = useTranslate();

  dayjs.locale(currentLang.adapterLocale);

  const color = resolve_color(event.color, colorMap);
  const dateLabel = format_date_range(event.start, event.end, event.allDay);


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (

    <div className={css.eventDetail}>

      {/* Title + color dot */}
      <div className={css.eventDetailRow}>
        <div className={css.eventDetailColor} style={{ backgroundColor: color }} />
        <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.3 }}>
          {event.title}
        </Typography>
      </div>

      <Divider />

      {/* Date */}
      <div className={css.eventDetailRow}>
        <Box sx={{ color: 'text.secondary', fontSize: 13, lineHeight: 1.5 }}>
          {dateLabel}
          {event.allDay && (
            <Chip label={t('calendar.eventDetail.allDay')} size="small" sx={{ ml: 1, height: 18, fontSize: 11 }} />
          )}
        </Box>
      </div>

      {/* Category */}
      {event.category && (
        <div className={css.eventDetailRow}>
          <Chip
            label={event.category}
            size="small"
            sx={{
              backgroundColor: `${color}22`,
              color: color,
              fontWeight: 600,
              fontSize: 12,
            }}
          />
        </div>
      )}

      {/* Description */}
      {event.description && (
        <>
          <Divider />
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
            {event.description}
          </Typography>
        </>
      )}

      {/* Extended props */}
      {event.extendedProps && Object.keys(event.extendedProps).length > 0 && (
        <>
          <Divider />
          {Object.entries(event.extendedProps).map(([key, val]) => (
            <div key={key} className={css.eventDetailRow}>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
                {key}
              </Typography>
              <Typography variant="caption">{String(val)}</Typography>
            </div>
          ))}
        </>
      )}

    </div>

  );

}
