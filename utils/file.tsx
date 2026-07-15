import Icon from '@/components/icon';
import { ReactNode } from 'react';


// FILE THUMB ICON
// ----------------------------------------------------------------------------------------------------
// TODO: replace placeholder strings with your actual JSX icon components
// e.g. import { IconFilePdf, IconFileWord, ... } from '@/components/icons';

export function file_thumb_icon(fileUrl: string): ReactNode {
  switch (file_format(fileUrl)) {
    case 'folder':      return <Icon name="folder" />;
    case 'pdf':         return <Icon name="pdf" />;
    case 'word':        return <Icon name="document" />;
    case 'excel':       return <Icon name="csv" />;
    case 'powerpoint':  return <Icon name="ppt" />;
    case 'image':       return <Icon name="image" />;
    case 'video':       return <Icon name="mp4" />;
    case 'audio':       return <Icon name="mp3" />;
    case 'zip':         return <Icon name="zip" />;
    case 'txt':         return <Icon name="txt" />;
    default:            return <Icon name="file" />;
  }
}


type TFileData = {
  preview: string | undefined;
  name: string | undefined;
  type: string | undefined;
  size: number | undefined;
  path: string | undefined;
  lastModified: number | undefined;
  lastModifiedDate: Date | undefined;
}

export interface IExtendFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export type TInputNumberValue = string | number | null | undefined;



// FILE FORMAT
// ----------------------------------------------------------------------------------------------------

const FORMAT_PDF = ['pdf'];
const FORMAT_TEXT = ['txt'];
const FORMAT_PHOTOSHOP = ['psd'];
const FORMAT_WORD = ['doc', 'docx'];
const FORMAT_EXCEL = ['xls', 'xlsx'];
const FORMAT_ZIP = ['zip', 'rar', 'iso'];
const FORMAT_ILLUSTRATOR = ['ai', 'esp'];
const FORMAT_POWERPOINT = ['ppt', 'pptx'];
const FORMAT_AUDIO = ['wav', 'aif', 'mp3', 'aac'];
const FORMAT_IMG = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'svg', 'webp'];
const FORMAT_VIDEO = ['m4v', 'avi', 'mpg', 'mp4', 'webm'];

export function file_format(fileUrl: string): string {
  const ext = file_type_by_url(fileUrl);

  if (FORMAT_TEXT.includes(ext)) return 'txt';
  if (FORMAT_ZIP.includes(ext)) return 'zip';
  if (FORMAT_AUDIO.includes(ext)) return 'audio';
  if (FORMAT_IMG.includes(ext)) return 'image';
  if (FORMAT_VIDEO.includes(ext)) return 'video';
  if (FORMAT_WORD.includes(ext)) return 'word';
  if (FORMAT_EXCEL.includes(ext)) return 'excel';
  if (FORMAT_POWERPOINT.includes(ext)) return 'powerpoint';
  if (FORMAT_PDF.includes(ext)) return 'pdf';
  if (FORMAT_PHOTOSHOP.includes(ext)) return 'photoshop';
  if (FORMAT_ILLUSTRATOR.includes(ext)) return 'illustrator';

  return ext;
}

export function file_thumb(fileUrl: string): string {
  const iconUrl = (icon: string): string => `/assets/icons/files/${icon}.svg`;

  switch (file_format(fileUrl)) {
    case 'folder': return iconUrl('ic-folder');
    case 'txt': return iconUrl('ic-txt');
    case 'zip': return iconUrl('ic-zip');
    case 'audio': return iconUrl('ic-audio');
    case 'video': return iconUrl('ic-video');
    case 'word': return iconUrl('ic-word');
    case 'excel': return iconUrl('ic-excel');
    case 'powerpoint': return iconUrl('ic-power_point');
    case 'pdf': return iconUrl('ic-pdf');
    case 'photoshop': return iconUrl('ic-pts');
    case 'illustrator': return iconUrl('ic-ai');
    case 'image': return iconUrl('ic-img');
    default: return iconUrl('ic-file');
  }
}



export function file_type_by_url(fileUrl: string): string {
  return (fileUrl && fileUrl.split('.').pop()) || '';
}



export function file_name_by_url(fileUrl: string): string|undefined {
  return fileUrl.split('/').pop();
}



export function file_data(file: File | string): TFileData {
  // From url
  if (typeof file === 'string') {
    return {
      preview: file,
      name: file_name_by_url(file),
      type: file_type_by_url(file),
      size: undefined,
      path: file,
      lastModified: undefined,
      lastModifiedDate: undefined,
    };
  }

  // From file
  return {
    name: file.name,
    size: file.size,
    path: (file as IExtendFile).path,
    type: file.type,
    preview: (file as IExtendFile).preview,
    lastModified: file.lastModified,
    lastModifiedDate: (file as IExtendFile).lastModifiedDate,
  };
}



function process_input(inputValue: TInputNumberValue): number | null {
  if (inputValue == null || Number.isNaN(inputValue)) { return null; }
  return Number(inputValue);
}



export function format_data(inputValue: TInputNumberValue): string {
  const number = process_input(inputValue);
  if (number === null || number === 0) { return '0 bytes' };

  const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
  const decimal = 2;
  const baseValue = 1024;

  const index = Math.floor(Math.log(number) / Math.log(baseValue));
  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
}