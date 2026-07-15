// TYPES
// ----------------------------------------------------------------------------------------------------
// TO DO
export type TCalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type TCalendarEventColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';

export type TCalendarEvent = {
  id: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  allDay?: boolean;
  description?: string;
  color?: TCalendarEventColor | string;
  category?: string;
  editable?: boolean;
  extendedProps?: Record<string, unknown>;
};

export type TUseCalendarProps = {
  defaultView?: TCalendarView;
  defaultDate?: Date;
  events?: TCalendarEvent[];
  onFetchEvents?: (start: Date, end: Date) => Promise<TCalendarEvent[]> | TCalendarEvent[];
};

export type TUseCalendarReturn = {
  // State
  view: TCalendarView;
  date: Date;
  events: TCalendarEvent[];
  selectedEvent: TCalendarEvent | null;
  loading: boolean;
  error: string | null;
  // View & navigation
  onChangeView: (view: TCalendarView) => void;
  onNavigate: (date: Date) => void;
  onToday: () => void;
  onPrev: () => void;
  onNext: () => void;
  // Event CRUD
  onSelectEvent: (event: TCalendarEvent | null) => void;
  onAddEvent: (event: TCalendarEvent) => void;
  onUpdateEvent: (event: TCalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
  onClearSelection: () => void;
  // Setters
  setEvents: React.Dispatch<React.SetStateAction<TCalendarEvent[]>>;
  setView: React.Dispatch<React.SetStateAction<TCalendarView>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};
