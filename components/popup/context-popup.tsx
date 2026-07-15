'use client';

import { createContext, useContext } from 'react';

type PopupContextValue = {
  id: string;
  onClose: (value?: unknown) => void;
};

export const PopupContext = createContext<PopupContextValue>({
  id: '',
  onClose: () => {},
});

export function usePopupContext() {
  return useContext(PopupContext);
}
