// Type declarations for Zebra Browser Print official JavaScript library
// Loaded via <script> tag in layout, exposes global BrowserPrint object

// ----------------------------------------------------------------------

interface ZebraBrowserPrintDevice {
  name: string;
  uid: string;
  connection: string;
  deviceType: string;
  version: number;
  provider: string;
  manufacturer: string;
  send: (data: string, success?: () => void, error?: (err: string) => void) => void;
  read: (success: (data: string) => void, error?: (err: string) => void) => void;
  sendFile: (url: string, success?: () => void, error?: (err: string) => void) => void;
}

interface ZebraBrowserPrint {
  getDefaultDevice: (
    type: 'printer' | 'scanner' | 'scale',
    success: (device: ZebraBrowserPrintDevice) => void,
    error?: (err: string) => void
  ) => void;
  getLocalDevices: (
    success: (devices: ZebraBrowserPrintDevice[]) => void,
    error?: (err: string) => void,
    type?: 'printer' | 'scanner' | 'scale'
  ) => void;
}

declare const BrowserPrint: ZebraBrowserPrint;
