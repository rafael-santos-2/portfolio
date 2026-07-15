'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { buildLabel, type LabelData } from '@/utils/zpl';

// ----------------------------------------------------------------------

// TYPES
// ----------------------------------------------------------------------

type PrintStatus = 'idle' | 'initializing' | 'printing' | 'error';

type UsePrintReturn = {
  print: (data: LabelData) => Promise<void>;
  printRaw: (zpl: string) => Promise<void>;
  status: PrintStatus;
  isPrinting: boolean;
  isReady: boolean;
};

// ----------------------------------------------------------------------

// HOOK
// ----------------------------------------------------------------------

export function usePrint(): UsePrintReturn {
  const [status, setStatus] = useState<PrintStatus>('initializing');
  const deviceRef = useRef<ZebraBrowserPrintDevice | null>(null);

  // ----------------------------------------------------------------------
  // Initialize — find the default printer via the Zebra Browser Print agent.
  // The agent must be running locally (systeemtray) for this to work.
  // BrowserPrint is loaded via <script> tag in layout.tsx.
  // ----------------------------------------------------------------------

  useEffect(() => {
    function init() {
      if (typeof window === 'undefined' || !('BrowserPrint' in window)) {
        setStatus('error');
        return;
      }

      BrowserPrint.getDefaultDevice(
        'printer',
        (device: ZebraBrowserPrintDevice) => {
          if (!device || !device.uid) {
            setStatus('error');
            return;
          }
          deviceRef.current = device;
          setStatus('idle');
        },
        () => {
          setStatus('error');
        }
      );
    }

    init();
  }, []);

  // ----------------------------------------------------------------------

  const printRaw = useCallback(async (zpl: string) => {
    const device = deviceRef.current;

    if (!device) {
      toast.error('Printer niet beschikbaar. Is de Zebra Browser Print agent actief?');
      return;
    }

    setStatus('printing');

    await new Promise<void>((resolve, reject) => {
      device.send(zpl, resolve, (err: string) => reject(new Error(err)));
    })
      .then(() => {
        toast.success('Label afgedrukt');
        setStatus('idle');
      })
      .catch((err: Error) => {
        toast.error(err.message || 'Printfout');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      });
  }, []);

  // ----------------------------------------------------------------------

  const print = useCallback(
    async (data: LabelData) => {
      const zpl = buildLabel(data);
      await printRaw(zpl);
    },
    [printRaw]
  );

  // ----------------------------------------------------------------------

  return {
    print,
    printRaw,
    status,
    isPrinting: status === 'printing',
    isReady: status === 'idle',
  };
}
