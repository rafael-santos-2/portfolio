'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { useEffect, useState } from 'react';
import { stream_maintenance } from '@/database/maintenance/maintenance';
import type { IMaintenance } from '@/types/database';


// CONSTANTS
// ----------------------------------------------------------------------------------------------------

const LS_KEY = 'maintenance_seen';


// HELPERS
// ----------------------------------------------------------------------------------------------------

function get_seen_ids(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function mark_as_seen(id: string): void {
  const seen = get_seen_ids();
  if (!seen.includes(id)) {
    localStorage.setItem(LS_KEY, JSON.stringify([...seen, id]));
  }
}


// TYPES
// ----------------------------------------------------------------------------------------------------

export type TUseMaintenanceReturn = {
  upcoming: IMaintenance | null;
  active: IMaintenance | null;
  onDismissUpcoming: () => void;
};


// HOOK
// ----------------------------------------------------------------------------------------------------

export function useMaintenance(): TUseMaintenanceReturn {


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [windows, setWindows] = useState<IMaintenance[]>([]);
  const [now, setNow] = useState(() => new Date());
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading dismissed ids from localStorage on mount
    setDismissedIds(get_seen_ids());
  }, []);

  useEffect(() => {
    const unsub = stream_maintenance(setWindows);
    return () => unsub();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);


  // COMPUTED
  // ----------------------------------------------------------------------------------------------------

  // Active: maintenance window is currently ongoing
  const active = windows.find(
    (m) => now >= m.scheduled_start && now <= m.scheduled_end
  ) ?? null;

  // Upcoming: window is in the future and not yet dismissed by the user
  const upcoming = windows.find(
    (m) => now < m.scheduled_start && !dismissedIds.includes(m.id)
  ) ?? null;


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  function onDismissUpcoming() {
    if (!upcoming) return;
    mark_as_seen(upcoming.id);
    setDismissedIds((prev) => [...prev, upcoming.id]);
  }


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return { upcoming, active, onDismissUpcoming };

}
