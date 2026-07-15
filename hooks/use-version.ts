'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { useCallback, useEffect, useMemo, useState } from 'react';
import { CHANGELOG } from '@/data/changelog';
import { CONFIG } from '@/config/app';
import { update_user } from '@/database/users/users';
import type { TPatchNote } from '@/types/app.type';
import type { IUser } from '@/types/database';


// HELPERS
// ----------------------------------------------------------------------------------------------------

function semver_gt(a: string, b: string): boolean {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] ?? 0) > (pb[i] ?? 0)) return true;
    if ((pa[i] ?? 0) < (pb[i] ?? 0)) return false;
  }
  return false;
}

function get_new_patches(lastSeenVersion: string | null): TPatchNote[] {
  if (!lastSeenVersion) return CHANGELOG;
  return CHANGELOG.filter((p) => semver_gt(p.version, lastSeenVersion));
}


// HOOK
// ----------------------------------------------------------------------------------------------------

export type TUseWhatsNewReturn = {
  open: boolean;
  patches: TPatchNote[];
  onClose: () => void;
};

export function useVersion(user: IUser | null): TUseWhatsNewReturn {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const currentVersion = CONFIG.version;


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [open, setOpen] = useState(false);


  // COMPUTED
  // ----------------------------------------------------------------------------------------------------

  const patches = useMemo(() => {
    if (!user) return [];
    return get_new_patches(user.last_seen_version);
  }, [user]);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  const onClose = useCallback(async () => {
    setOpen(false);
    if (!user) return;
    try {
      await update_user(user.id, { last_seen_version: currentVersion });
    } catch (error) {
      console.error('[use_version] Failed to update last_seen_version.', error);
    }
  }, [user, currentVersion]);


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (!user) return;
    if (process.env.NODE_ENV === 'development') return;
    if (patches.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- opening the whats-new popup once the user's unseen patches are known
      setOpen(true);
    }
  }, [user, patches.length]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return { open, patches, onClose };

}
