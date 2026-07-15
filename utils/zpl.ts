// ZPL Builder utilities
// Label size: 101.6mm x 50.8mm (4" x 2") @ 203dpi = 812 x 406 dots

// ----------------------------------------------------------------------

// TYPES
// ----------------------------------------------------------------------

export type LabelData = {
  title: string;
  barcode?: string;
  lines?: string[];
};

// ----------------------------------------------------------------------

// LABEL HEADER
// Sets label dimensions for 101.6mm x 50.8mm labels
// ----------------------------------------------------------------------

function labelHeader(): string {
  return [
    '^XA',
    '^MMT',   // Thermal Transfer mode
    '^PW812', // Print width: 812 dots = 101.6mm @ 203dpi
    '^LL406', // Label length: 406 dots = 50.8mm @ 203dpi
    '^LS0',   // Left shift: 0
  ].join('\n');
}

// ----------------------------------------------------------------------

// BUILD LABEL
// ----------------------------------------------------------------------

export function buildLabel(data: LabelData): string {
  const parts: string[] = [labelHeader()];

  let yPos = 30;

  // Title
  parts.push(`^FO30,${yPos}^ADN,36,20^FD${data.title}^FS`);
  yPos += 55;

  // Extra text lines
  if (data.lines) {
    for (const line of data.lines) {
      parts.push(`^FO30,${yPos}^ADN,24,14^FD${line}^FS`);
      yPos += 38;
    }
  }

  // Barcode (Code 128)
  if (data.barcode) {
    parts.push(`^FO30,${yPos}^BY2^BCN,80,Y,N,N^FD${data.barcode}^FS`);
  }

  parts.push('^XZ');

  return parts.join('\n');
}
