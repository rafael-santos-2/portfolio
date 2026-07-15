'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from 'react';
import { useCalendar } from '@/hooks/use-calendar';
import Calendar from '@/components/calendar/calendar';
import type { TCalendarEvent } from '@/hooks/use-calendar';
import { Header } from '@/components/header';
import css from './view-components-calendar.module.css';


// DATA
// ----------------------------------------------------------------------------------------------------
const DUMMY_EVENTS: TCalendarEvent[] = [
  {
    id: 'evt_1',
    title: 'Team meeting',
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
    color: 'primary',
    category: 'work',
    description: 'Weekly team standup',
  },
  {
    id: 'evt_2',
    title: 'Design review',
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
    allDay: true,
    color: 'secondary',
    category: 'work',
  },
  {
    id: 'evt_3',
    title: 'Client call',
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    color: 'warning',
    category: 'client',
    description: 'Discuss Q2 roadmap with client',
  },
  {
    id: 'evt_4',
    title: 'Sprint planning',
    start: new Date(new Date().setDate(new Date().getDate() + 5)),
    color: 'success',
    category: 'work',
  },
  {
    id: 'evt_5',
    title: 'Deploy v2.0',
    start: new Date(new Date().setDate(new Date().getDate() + 7)),
    color: 'error',
    category: 'engineering',
    description: 'Production deployment window',
  },
];


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsCalendar(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const calendar = useCalendar({ events: DUMMY_EVENTS });


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

      <Header title="Calendar" />

      <div className={css.wrapper}>
        <Calendar
          events={calendar.events}
          view={calendar.view}
          date={calendar.date}
          onChangeView={calendar.onChangeView}
          onToday={calendar.onToday}
          onPrev={calendar.onPrev}
          onNext={calendar.onNext}
          onEventDrop={(event, start, end) => calendar.onUpdateEvent({ ...event, start, end })}
          onEventResize={(event, start, end) => calendar.onUpdateEvent({ ...event, start, end })}
          categories={['work', 'client', 'engineering']}
          height="100%"
        />
      </div>

    </div>
  );

}
