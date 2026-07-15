'use client';

// IMPORTS
// -----------------------------------------------------------------------------------------
import { createContext, useContext } from 'react';
// -----------------------------------------------------------------------------------------


// CONTEXT
// -----------------------------------------------------------------------------------------
export const Context_popups = createContext<{
  stack: Array<Element>;
  add: (e: Element) => void;
  remove: (e?: string) => void;
  enqueue: (element: React.ReactElement) => Promise<unknown>;
}>({
  stack: [],
  add: () => {},
  remove: () => {},
  enqueue: () => Promise.resolve(undefined),
});
// -----------------------------------------------------------------------------------------


// SHORTHAND
// -----------------------------------------------------------------------------------------
export function usePopups() {
  return useContext(Context_popups);
}
// -----------------------------------------------------------------------------------------
