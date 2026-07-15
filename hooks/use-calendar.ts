import { useState, useCallback, useEffect, useRef } from 'react';

import type { TCalendarEvent, TCalendarView, TUseCalendarProps, TUseCalendarReturn } from '../types/use-calendar.type';


// TYPES
// ----------------------------------------------------------------------------------------------------

export type { TCalendarEvent, TCalendarView, TCalendarEventColor, TUseCalendarProps, TUseCalendarReturn } from '../types/use-calendar.type';


// HOOK
// ----------------------------------------------------------------------------------------------------

export function useCalendar(props?: TUseCalendarProps): TUseCalendarReturn {

  const [view, setView] = useState<TCalendarView>(props?.defaultView ?? 'dayGridMonth');
  const [date, setDate] = useState<Date>(props?.defaultDate ?? new Date());
  const [events, setEvents] = useState<TCalendarEvent[]>(props?.events ?? []);
  const [selectedEvent, setSelectedEvent] = useState<TCalendarEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEventsRef = useRef(props?.onFetchEvents);
  useEffect(() => { fetchEventsRef.current = props?.onFetchEvents; });


  // VIEW & NAVIGATION
  // ----------------------------------------------------------------------------------------------------

  const onChangeView = useCallback((newView: TCalendarView) => {
    setView(newView);
  }, []);

  const onNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const onToday = useCallback(() => {
    setDate(new Date());
  }, []);

  const onPrev = useCallback(() => {
    setDate((prev) => {
      const d = new Date(prev);
      if (view === 'dayGridMonth') d.setMonth(d.getMonth() - 1);
      else if (view === 'timeGridWeek' || view === 'listWeek') d.setDate(d.getDate() - 7);
      else if (view === 'timeGridDay') d.setDate(d.getDate() - 1);
      return d;
    });
  }, [view]);

  const onNext = useCallback(() => {
    setDate((prev) => {
      const d = new Date(prev);
      if (view === 'dayGridMonth') d.setMonth(d.getMonth() + 1);
      else if (view === 'timeGridWeek' || view === 'listWeek') d.setDate(d.getDate() + 7);
      else if (view === 'timeGridDay') d.setDate(d.getDate() + 1);
      return d;
    });
  }, [view]);


  // EVENT SELECTION
  // ----------------------------------------------------------------------------------------------------

  const onSelectEvent = useCallback((event: TCalendarEvent | null) => {
    setSelectedEvent(event);
  }, []);

  const onClearSelection = useCallback(() => {
    setSelectedEvent(null);
  }, []);


  // EVENT CRUD
  // ----------------------------------------------------------------------------------------------------

  const onAddEvent = useCallback((event: TCalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  }, []);

  const onUpdateEvent = useCallback((event: TCalendarEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
    setSelectedEvent((prev) => (prev?.id === event.id ? event : prev));
  }, []);

  const onDeleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setSelectedEvent((prev) => (prev?.id === id ? null : prev));
  }, []);


  // FETCH EVENTS
  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (!fetchEventsRef.current) return;

    const start = new Date(date);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);

    setLoading(true);
    setError(null);

    Promise.resolve(fetchEventsRef.current(start, end))
      .then((fetched) => setEvents(fetched))
      .catch((err) => setError(err?.message ?? 'Failed to fetch events'))
      .finally(() => setLoading(false));
  }, [date]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return {
    view, date, events, selectedEvent, loading, error,
    onChangeView, onNavigate, onToday, onPrev, onNext,
    onSelectEvent, onAddEvent, onUpdateEvent, onDeleteEvent, onClearSelection,
    setEvents, setView, setDate,
  };
  
}
