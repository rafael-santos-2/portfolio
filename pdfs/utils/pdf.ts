// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { type DocumentProps, pdf } from '@react-pdf/renderer';
import JSZip from 'jszip';
import { type ReactElement } from 'react';

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------------------------------------

export type TPdfInput = {
  /** The React PDF document element, e.g. <MyPdf data={...} /> */
  document: ReactElement<DocumentProps>;
  /** File name WITHOUT the .pdf extension */
  filename: string;
};

export type TPdfOpenMode = 'download' | 'tab' | 'blob';

export type TPdfOptions = {
  /**
   * 'download' — triggers a browser download (default)
   * 'tab'      — opens the PDF in a new browser tab
   * 'blob'     — returns the Blob without any browser action
   */
  mode?: TPdfOpenMode;
};

export type TPdfZipOptions = {
  /** Name of the zip file WITHOUT the .zip extension (default: 'documents') */
  zipFilename?: string;
};

// ----------------------------------------------------------------------
// SINGLE PDF
// ----------------------------------------------------------------------------------------------------

/**
 * Generate and handle a single PDF document.
 *
 * @example
 * // Download
 * await pdf_generate({ document: <InvoicePdf data={data} />, filename: 'invoice-123' });
 *
 * @example
 * // Open in new tab
 * await pdf_generate({ document: <InvoicePdf data={data} />, filename: 'invoice-123' }, { mode: 'tab' });
 *
 * @example
 * // Get blob for custom handling
 * const blob = await pdf_generate({ document: <InvoicePdf data={data} />, filename: 'invoice-123' }, { mode: 'blob' });
 */
export async function pdf_generate(
  input: TPdfInput,
  options: TPdfOptions = {}
): Promise<Blob> {
  const { mode = 'download' } = options;
  const blob = await pdf(input.document).toBlob();

  if (mode === 'blob') return blob;

  const url = URL.createObjectURL(blob);

  if (mode === 'tab') {
    window.open(url, '_blank');
  } else {
    pdf_trigger_download(url, `${input.filename}.pdf`);
  }

  // Revoke after a tick so the browser has time to process the action
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  return blob;
}


// ----------------------------------------------------------------------
// MULTIPLE PDFS — individual downloads
// ----------------------------------------------------------------------------------------------------

/**
 * Generate and download multiple PDFs sequentially, one file per PDF.
 *
 * @example
 * await pdf_generate_multiple([
 *   { document: <InvoicePdf data={inv1} />, filename: 'invoice-001' },
 *   { document: <InvoicePdf data={inv2} />, filename: 'invoice-002' },
 * ]);
 */
export async function pdf_generate_multiple(
  inputs: TPdfInput[],
  options: TPdfOptions = {}
): Promise<Blob[]> {
  const blobs: Blob[] = [];

  for (const input of inputs) {
    const blob = await pdf_generate(input, options);
    blobs.push(blob);
  }

  return blobs;
}


// ----------------------------------------------------------------------
// MULTIPLE PDFS — bundled as ZIP
// ----------------------------------------------------------------------------------------------------

/**
 * Generate multiple PDFs and bundle them into a single ZIP file for download.
 *
 * @example
 * await pdf_generate_zip([
 *   { document: <InvoicePdf data={inv1} />, filename: 'invoice-001' },
 *   { document: <InvoicePdf data={inv2} />, filename: 'invoice-002' },
 * ], { zipFilename: 'invoices-march' });
 */
export async function pdf_generate_zip(
  inputs: TPdfInput[],
  options: TPdfZipOptions = {}
): Promise<Blob> {
  const { zipFilename = 'documents' } = options;
  const zip = new JSZip();

  for (const input of inputs) {
    const blob = await pdf(input.document).toBlob();
    zip.file(`${input.filename}.pdf`, blob);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  const url = URL.createObjectURL(zipBlob);
  pdf_trigger_download(url, `${zipFilename}.zip`);
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  return zipBlob;
}


// ----------------------------------------------------------------------
// MERGE: combine all pages into one PDF document
// ----------------------------------------------------------------------------------------------------

/**
 * Combine multiple PDF documents into a single merged PDF.
 *
 * Note: react-pdf does not natively merge separate documents, so this renders
 * each document individually and concatenates their blobs. For true page-level
 * merging you would need a server-side tool (e.g. pdf-lib, pdfkit).
 *
 * For most cases the recommended approach is to build a single <Document>
 * with multiple <Page> children. Use `pdf_build_multi_page` for that pattern.
 *
 * @example
 * const blobs = await pdf_generate_multiple([...], { mode: 'blob' });
 * // blobs is an array of individual PDF blobs
 */

/**
 * Render a React PDF document element to a Blob without triggering any browser action.
 * Useful when you need the raw Blob for uploading, further processing, or previewing.
 *
 * @example
 * const blob = await pdf_to_blob(<InvoicePdf data={data} />);
 * const url = URL.createObjectURL(blob);
 */
export async function pdf_to_blob(document: ReactElement<DocumentProps>): Promise<Blob> {
  return pdf(document).toBlob();
}


// ----------------------------------------------------------------------
// PREVIEW URL
// ----------------------------------------------------------------------------------------------------

/**
 * Generate an object URL that can be used as the `src` of an <iframe> or <embed>
 * for in-page PDF previewing.
 *
 * IMPORTANT: call `URL.revokeObjectURL(url)` when the preview is unmounted.
 *
 * @example
 * const previewUrl = await pdf_preview_url(<InvoicePdf data={data} />);
 * // <iframe src={previewUrl} />
 */
export async function pdf_preview_url(document: ReactElement<DocumentProps>): Promise<string> {
  const blob = await pdf(document).toBlob();
  return URL.createObjectURL(blob);
}


// ----------------------------------------------------------------------
// BASE64
// ----------------------------------------------------------------------------------------------------

/**
 * Convert a PDF document to a base64 string.
 * Useful for embedding in emails or API payloads.
 *
 * @example
 * const base64 = await pdf_to_base64(<InvoicePdf data={data} />);
 */
export async function pdf_to_base64(document: ReactElement<DocumentProps>): Promise<string> {
  const blob = await pdf(document).toBlob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


// ----------------------------------------------------------------------
// INTERNAL HELPERS
// ----------------------------------------------------------------------------------------------------

function pdf_trigger_download(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
