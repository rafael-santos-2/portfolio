import type { Dayjs, OpUnitType } from "dayjs";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);


// TYPES
// ----------------------------------------------------------------------------------------------------

export type TDateValue = Dayjs | Date | string | number | null | undefined;

export type TDurationInput = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};


// PATTERNS
// ----------------------------------------------------------------------------------------------------

export const DATE_PATTERNS = {
  dateTime: "DD/MM/YYYY | HH:mm",
  date: "DD/MM/YYYY",
  time: "HH:mm",
  paramCase: "DD-MM-YYYY",
  paramCaseDateTime: "DD-MM-YYYY HH:mm",
  iso: "YYYY-MM-DD",
  isoDateTime: "YYYY-MM-DDTHH:mm",
  monthYear: "MMMM YYYY",
  dayMonth: "DD MMM",
  full: "dddd DD MMMM YYYY",
};


// HELPERS
// ----------------------------------------------------------------------------------------------------

function isValid(date: TDateValue): date is NonNullable<TDateValue> {
  return date != null && dayjs(date).isValid();
}


// FORMATTERS
// ----------------------------------------------------------------------------------------------------

export function today(template?: string): string {
  return dayjs().startOf("day").format(template);
}

export function formatDate(date: TDateValue, template?: string): string {
  if (!isValid(date)) return "";
  return dayjs(date).format(template ?? DATE_PATTERNS.date);
}

export function formatDateTime(date: TDateValue, template?: string): string {
  if (!isValid(date)) return "";
  return dayjs(date).format(template ?? DATE_PATTERNS.dateTime);
}

export function formatTime(date: TDateValue, template?: string): string {
  if (!isValid(date)) return "";
  return dayjs(date).format(template ?? DATE_PATTERNS.time);
}

export function formatTimestamp(date: TDateValue): number | null {
  if (!isValid(date)) return null;
  return dayjs(date).valueOf();
}

export function formatToNow(date: TDateValue): string {
  if (!isValid(date)) return "";
  return dayjs(date).toNow(true);
}

export function formatFromNow(date: TDateValue): string {
  if (!isValid(date)) return "";
  return dayjs(date).fromNow();
}


// COMPARISONS
// ----------------------------------------------------------------------------------------------------

export function isAfter(start: TDateValue, end: TDateValue): boolean {
  if (!isValid(start) || !isValid(end)) return false;
  return dayjs(start).isAfter(end);
}

export function isBefore(start: TDateValue, end: TDateValue): boolean {
  if (!isValid(start) || !isValid(end)) return false;
  return dayjs(start).isBefore(end);
}

export function isSame(start: TDateValue, end: TDateValue, unit?: OpUnitType): boolean {
  if (!isValid(start) || !isValid(end)) return false;
  return dayjs(start).isSame(end, unit ?? "day");
}

export function isBetween(date: TDateValue, start: TDateValue, end: TDateValue): boolean {
  if (!isValid(date) || !isValid(start) || !isValid(end)) return false;
  const ts = dayjs(date).valueOf();
  return ts >= dayjs(start).valueOf() && ts <= dayjs(end).valueOf();
}

export function isPast(date: TDateValue): boolean {
  if (!isValid(date)) return false;
  return dayjs(date).isBefore(dayjs());
}

export function isFuture(date: TDateValue): boolean {
  if (!isValid(date)) return false;
  return dayjs(date).isAfter(dayjs());
}


// RANGE
// ----------------------------------------------------------------------------------------------------

export function formatDateRange(start: TDateValue, end: TDateValue): string {
  if (!isValid(start) || !isValid(end) || isAfter(start, end)) return "";

  if (isSame(start, end, "day")) return formatDate(end);

  if (isSame(start, end, "month")) {
    return `${formatDate(start, "DD")} - ${formatDate(end)}`;
  }

  if (isSame(start, end, "year")) {
    return `${formatDate(start, "DD MMM")} - ${formatDate(end)}`;
  }

  return `${formatDate(start)} - ${formatDate(end)}`;
}


// ARITHMETIC
// ----------------------------------------------------------------------------------------------------

export function addDuration(input: TDurationInput, template?: string): string {
  return dayjs().add(dayjs.duration(input)).format(template);
}

export function subtractDuration(input: TDurationInput, template?: string): string {
  return dayjs().subtract(dayjs.duration(input)).format(template);
}

export function diffInDays(start: TDateValue, end: TDateValue): number | null {
  if (!isValid(start) || !isValid(end)) return null;
  return dayjs(end).diff(dayjs(start), "day");
}

export function diffInHours(start: TDateValue, end: TDateValue): number | null {
  if (!isValid(start) || !isValid(end)) return null;
  return dayjs(end).diff(dayjs(start), "hour");
}

export function diffInMinutes(start: TDateValue, end: TDateValue): number | null {
  if (!isValid(start) || !isValid(end)) return null;
  return dayjs(end).diff(dayjs(start), "minute");
}
