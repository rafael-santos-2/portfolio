'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card, CircularProgress, Divider } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventClickArg, EventDropArg, DateSelectArg } from '@fullcalendar/core';
import type { EventResizeDoneArg } from '@fullcalendar/interaction';

import { useTranslate } from '@/providers/language/use-locales';
import CalendarToolbar from './calendar-toolbar';
import type { ICalendarProps, TCalendarEvent, TCalendarView } from './calendar.type';
import css from './calendar.module.css';


// HELPERS
// ----------------------------------------------------------------------------------------------------

const COLOR_TOKEN_MAP: Record<string, string> = {
  primary: 'var(--palette-primary-main)',
  secondary: 'var(--palette-secondary-main)',
  error: 'var(--palette-error-main)',
  warning: 'var(--palette-warning-main)',
  info: 'var(--palette-info-main)',
  success: 'var(--palette-success-main)',
};

const DEFAULT_ALLOWED_VIEWS: TCalendarView[] = ['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek'];

const DEFAULT_TOOLBAR_CONFIG = {
  showToday: true,
  showNavigation: true,
  showViewSwitcher: true,
  showSearch: true,
  showCategoryFilter: true,
  showTitle: true,
};

function resolve_event_color(color?: string, colorMap?: Partial<Record<string, string>>): string {
  if (!color) return COLOR_TOKEN_MAP.primary;
  return colorMap?.[color] ?? COLOR_TOKEN_MAP[color] ?? color;
}

function map_to_fc_event(event: TCalendarEvent, colorMap?: Partial<Record<string, string>>) {
  return {
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay,
    backgroundColor: resolve_event_color(event.color, colorMap),
    borderColor: resolve_event_color(event.color, colorMap),
    editable: event.editable ?? true,
    extendedProps: {
      description: event.description,
      category: event.category,
      color: event.color,
      extendedProps: event.extendedProps,
    },
  };
}


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function Calendar({
  events,
  view,
  date,
  allowedViews = DEFAULT_ALLOWED_VIEWS,
  onChangeView,
  onToday,
  onPrev,
  onNext,
  onEventClick,
  onSlotClick,
  onEventDrop,
  onEventResize,
  loading = false,
  readOnly = false,
  selectable = true,
  height = 680,
  showWeekends = true,
  minTime = '00:00:00',
  maxTime = '24:00:00',
  colorMap,
  toolbarConfig,
  categories = [],
}: ICalendarProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { currentLang } = useTranslate();

  const calendarRef = useRef<FullCalendar>(null);
  const mergedToolbar = { ...DEFAULT_TOOLBAR_CONFIG, ...toolbarConfig };


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [searchValue, setSearchValue] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  const handleEventClick = useCallback((arg: EventClickArg) => {
    const raw = arg.event;
    const event: TCalendarEvent = {
      id: raw.id,
      title: raw.title,
      start: raw.start ?? new Date(),
      end: raw.end ?? undefined,
      allDay: raw.allDay,
      description: raw.extendedProps.description,
      category: raw.extendedProps.category,
      color: raw.extendedProps.color,
      extendedProps: raw.extendedProps.extendedProps,
    };

    onEventClick?.(event);
  }, [onEventClick]);

  const handleDateSelect = useCallback((arg: DateSelectArg) => {
    if (readOnly) return;
    onSlotClick?.(arg.start, arg.allDay);
  }, [readOnly, onSlotClick]);

  const handleEventDrop = useCallback((arg: EventDropArg) => {
    if (readOnly) return;
    const raw = arg.event;
    const event: TCalendarEvent = {
      id: raw.id,
      title: raw.title,
      start: raw.start ?? new Date(),
      end: raw.end ?? undefined,
      allDay: raw.allDay,
      color: raw.extendedProps.color,
      category: raw.extendedProps.category,
      description: raw.extendedProps.description,
      extendedProps: raw.extendedProps.extendedProps,
    };
    onEventDrop?.(event, raw.start ?? new Date(), raw.end ?? undefined);
  }, [readOnly, onEventDrop]);

  const handleEventResize = useCallback((arg: EventResizeDoneArg) => {
    if (readOnly) return;
    const raw = arg.event;
    const event: TCalendarEvent = {
      id: raw.id,
      title: raw.title,
      start: raw.start ?? new Date(),
      end: raw.end ?? new Date(),
      allDay: raw.allDay,
      color: raw.extendedProps.color,
      category: raw.extendedProps.category,
      description: raw.extendedProps.description,
      extendedProps: raw.extendedProps.extendedProps,
    };
    onEventResize?.(event, raw.start ?? new Date(), raw.end ?? new Date());
  }, [readOnly, onEventResize]);



  // EFFECTS
  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    if (api.view.type !== view) api.changeView(view);
  }, [view]);

  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (!api) return;
    api.gotoDate(date);
  }, [date]);


  // COMPUTED — filtered events
  // ----------------------------------------------------------------------------------------------------

  const filteredEvents = useMemo(() => {
    let result = events;

    if (searchValue.trim()) {
      const lower = searchValue.toLowerCase();
      result = result.filter((e) => e.title.toLowerCase().includes(lower));
    }

    if (categoryFilter) {
      result = result.filter((e) => e.category === categoryFilter);
    }

    return result;
  }, [events, searchValue, categoryFilter]);

  const fcEvents = useMemo(
    () => filteredEvents.map((e) => map_to_fc_event(e, colorMap)),
    [filteredEvents, colorMap]
  );


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (

    <>

      <Card className={css.root} sx={{ height }}>

        {/* Toolbar */}
        <CalendarToolbar
          view={view}
          date={date}
          allowedViews={allowedViews}
          onChangeView={onChangeView}
          onToday={onToday}
          onPrev={onPrev}
          onNext={onNext}
          config={mergedToolbar}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categories={categories}
        />

        <Divider />

        {/* Calendar */}
        <div className={css.calendarWrapper}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView={view}
            initialDate={date}
            events={fcEvents}
            editable={!readOnly}
            selectable={selectable && !readOnly}
            weekends={showWeekends}
            slotMinTime={minTime}
            slotMaxTime={maxTime}
            headerToolbar={false}
            height="100%"
            eventClick={handleEventClick}
            select={handleDateSelect}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            locale={currentLang.adapterLocale}
            nowIndicator
            dayMaxEvents={3}
          />
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className={css.loadingOverlay}>
            <CircularProgress size={32} />
          </div>
        )}

      </Card>


    </>

  );

}
