'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from 'react';
import {
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import Icon from '@/components/icon';

import { useTranslate } from '@/providers/language/use-locales';
import type { ICalendarToolbarProps, TCalendarView } from './calendar.type';
import css from './calendar.module.css';

function format_toolbar_title(date: Date, view: TCalendarView, locale: string): string {
  const options: Intl.DateTimeFormatOptions =
    view === 'timeGridDay'
      ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      : view === 'dayGridMonth'
      ? { year: 'numeric', month: 'long' }
      : { year: 'numeric', month: 'short', day: 'numeric' };

  return date.toLocaleDateString(locale, options);
}


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function CalendarToolbar({
  view,
  date,
  allowedViews,
  onChangeView,
  onToday,
  onPrev,
  onNext,
  config,
  searchValue,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
}: ICalendarToolbarProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t, currentLang } = useTranslate();


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (

    <div className={css.toolbar}>

      {/* Left: today + prev/next */}
      <div className={css.toolbarLeft}>

        {config.showToday && (
          <Tooltip title={t('calendar.toolbar.today')}>
            <span>
              <IconButton size="small" onClick={onToday}>
                <Typography variant="caption" fontWeight={700} sx={{ px: 0.5 }}>
                  {t('calendar.toolbar.today')}
                </Typography>
              </IconButton>
            </span>
          </Tooltip>
        )}

        {config.showNavigation && (
          <>
            <Tooltip title={t('calendar.toolbar.prev')}>
              <IconButton size="small" onClick={onPrev}>
                <Icon name="chevron" direction="left" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('calendar.toolbar.next')}>
              <IconButton size="small" onClick={onNext}>
                <Icon name="chevron" direction="right" />
              </IconButton>
            </Tooltip>
          </>
        )}

      </div>

      {/* Center: title */}
      {config.showTitle && (
        <div className={css.toolbarCenter}>
          <Typography variant="subtitle1" fontWeight={700} className={css.toolbarTitle}>
            {format_toolbar_title(date, view, currentLang.adapterLocale)}
          </Typography>
        </div>
      )}

      {/* Right: search + category filter + view switcher */}
      <div className={css.toolbarRight}>

        {config.showSearch && (
          <TextField
            size="small"
            placeholder={t('calendar.toolbar.search')}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{ width: 180 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="search" size={16} color="disabled" />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}

        {config.showCategoryFilter && categories.length > 0 && (
          <Select
            size="small"
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            displayEmpty
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="">{t('calendar.toolbar.allCategories')}</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        )}

        {config.showViewSwitcher && allowedViews.length > 1 && (
          <ToggleButtonGroup
            size="small"
            exclusive
            value={view}
            onChange={(_e, val) => { if (val) onChangeView(val as TCalendarView); }}
          >
            {allowedViews.map((v) => (
              <ToggleButton key={v} value={v} sx={{ px: 1.5, fontSize: 12 }}>
                {t(`calendar.toolbar.views.${v}`)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}

      </div>

    </div>

  );

}
