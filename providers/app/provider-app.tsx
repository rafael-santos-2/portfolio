'use client';

// IMPORTS
// -----------------------------------------------------------------------------------------
import type { ReactNode } from 'react';
import { useEffect , useState } from 'react';
import { Context_app } from './context-app';
// -----------------------------------------------------------------------------------------



// HELPERS
// -----------------------------------------------------------------------------------------
function checkis_mobile(): boolean {
  try {
    if ('userAgentData' in navigator && (navigator as Navigator & { userAgentData: { mobile: boolean } }).userAgentData.mobile) {
      return true;
    }
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  } catch {
    return false;
  }
}
// -----------------------------------------------------------------------------------------



// PROVIDER
// -----------------------------------------------------------------------------------------
export function Provider_app({ children }:{ children:ReactNode }) {



  // REFERENCES
  // -----------------------------------------------------------------------------------------



  // STATES
  // -----------------------------------------------------------------------------------------
    const [ screen_width, set_screen_width ] = useState(0);
    const [ is_mobile, set_is_mobile ] = useState(false);
    const [ is_offline, set_is_offline ] = useState(false);
    const [ size_screen, set_size_screen ] = useState<'sm' | 'md' | 'lg'>(get_screen_size(screen_width));
  // -----------------------------------------------------------------------------------------


  // FUNCTIONS
  // -----------------------------------------------------------------------------------------
  function get_screen_size(width: number): 'sm' | 'md' | 'lg' {
    if (width < 600) return 'sm';
    if (width < 1200) return 'md';
    return 'lg';
  }

  // EFFECTS
  // -----------------------------------------------------------------------------------------

  useEffect(() => {
    console.info("[APP] Init");

    /* eslint-disable react-hooks/set-state-in-effect -- reading window/navigator browser APIs on mount */
    set_screen_width(window.innerWidth);
    set_size_screen(get_screen_size(window.innerWidth));
    set_is_mobile(checkis_mobile());
    set_is_offline(!navigator.onLine);
    /* eslint-enable react-hooks/set-state-in-effect */

    window.addEventListener('resize', () => {
      set_screen_width(window.innerWidth);
      set_size_screen(get_screen_size(window.innerWidth));
    });
    window.addEventListener("offline", () => { set_is_offline(true) });
    window.addEventListener("online", () => { set_is_offline(false) });

    // Service worker registratie
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(reg => console.info('[SW] Registered:', reg.scope))
        .catch(err => console.error('[SW] Registration failed:', err));
    }

    return;
  }, []);


  // WRAPPER
  // -----------------------------------------------------------------------------------------
  return (
    <Context_app.Provider
      value={{

        is_mobile,
        is_offline,
        screen_width,
        size_screen

      }}
    >
      {children}
    </Context_app.Provider>
  );
}
// -----------------------------------------------------------------------------------------
