// TYPES
// ----------------------------------------------------------------------------------------------------

import type { ReactNode } from 'react';
import type { TCalendarEvent, TCalendarEventColor, TCalendarView } from '@/types/use-calendar.type';

export type { TCalendarEvent, TCalendarView, TCalendarEventColor };

export type TCalendarColorMap = Partial<Record<string, string>>;

export type TCalendarToolbarConfig = {
  showToday?: boolean;
  showNavigation?: boolean;
  showViewSwitcher?: boolean;
  showSearch?: boolean;
  showCategoryFilter?: boolean;
  showTitle?: boolean;
};

export interface ICalendarProps {
  // Data
  events: TCalendarEvent[];
  // View control
  view: TCalendarView;
  date: Date;
  allowedViews?: TCalendarView[];
  // Navigation callbacks
  onChangeView: (view: TCalendarView) => void;
  onToday: () => void;
  onPrev: () => void;
  onNext: () => void;
  // Event interaction
  onEventClick?: (event: TCalendarEvent) => void;
  onSlotClick?: (date: Date, allDay: boolean) => void;
  onEventDrop?: (event: TCalendarEvent, newStart: Date, newEnd?: Date) => void;
  onEventResize?: (event: TCalendarEvent, newStart: Date, newEnd: Date) => void;
  // State
  loading?: boolean;
  readOnly?: boolean;
  selectable?: boolean;
  // Appearance
  height?: number | string;
  showWeekends?: boolean;
  minTime?: string;
  maxTime?: string;
  colorMap?: TCalendarColorMap;
  // Toolbar
  toolbarConfig?: TCalendarToolbarConfig;
  // Categories for filtering
  categories?: string[];
  // Custom detail rendering
  detailComponent?: (event: TCalendarEvent, onClose: () => void) => ReactNode;
}

export interface ICalendarToolbarProps {
  view: TCalendarView;
  date: Date;
  allowedViews: TCalendarView[];
  onChangeView: (view: TCalendarView) => void;
  onToday: () => void;
  onPrev: () => void;
  onNext: () => void;
  config: TCalendarToolbarConfig;
  searchValue: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  categories: string[];
}

export interface ICalendarEventDetailProps {
  event: TCalendarEvent;
  onClose: () => void;
  colorMap?: TCalendarColorMap;
}
