'use client';

// IMPORTS
// -----------------------------------------------------------------------------------------
import { cloneElement, type ReactNode } from 'react';
import { useState } from 'react';
import { Context_popups } from './context-popups';
// -----------------------------------------------------------------------------------------



// TYPES
// -----------------------------------------------------------------------------------------
type AsyncEntry = {
  id: string;
  element: React.ReactElement;
  open: boolean;
  resolve: (value: unknown) => void;
};
// -----------------------------------------------------------------------------------------



// PROVIDER
// -----------------------------------------------------------------------------------------
export function Provider_popups({ children }: { children: ReactNode }) {

  const [ stack, set_stack ] = useState<Array<Element>>([]);
  const [ queue, set_queue ] = useState<AsyncEntry[]>([]);


  // STACK FUNCTIONS
  // -----------------------------------------------------------------------------------------
  function handle_add(e: Element){
    set_stack(prev => prev.some(a => a.id === e.id) ? prev : [ e, ...prev ]);
  }
  function handle_remove(id?: string){
    set_stack(prev => id ? prev.filter(a => a.id !== id) : prev.slice(1));
  }


  // ASYNC QUEUE FUNCTIONS
  // -----------------------------------------------------------------------------------------
  function enqueue(element: React.ReactElement): Promise<unknown> {
    return new Promise<unknown>((resolve) => {
      const id = `async-popup-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      set_queue(prev => [ ...prev, { id, element, open: true, resolve } ]);
    });
  }

  function handle_async_close(id: string, value: unknown){
    set_queue(prev => prev.map(e => {
      if( e.id !== id ) return e;
      e.resolve(value);
      return { ...e, open: false };
    }));
  }

  function handle_async_closed(id: string){
    set_queue(prev => prev.filter(e => e.id !== id));
  }


  // WRAPPER
  // -----------------------------------------------------------------------------------------
  return (
    <Context_popups.Provider
      value={{
        stack,
        add: handle_add,
        remove: handle_remove,
        enqueue,
      }}
    >
      {children}

      {/* Async popup queue — Popup handles its own portal to document.body */}
      { queue.map(entry =>
        cloneElement(entry.element as React.ReactElement<{ open: boolean; onClose: (value: unknown) => void; onClosed: () => void }>, {
          key: entry.id,
          open: entry.open,
          onClose: (value: unknown) => handle_async_close(entry.id, value),
          onClosed: () => handle_async_closed(entry.id),
        })
      )}

    </Context_popups.Provider>
  );
}
// -----------------------------------------------------------------------------------------
