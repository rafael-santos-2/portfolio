import { redirect } from 'next/navigation';
import { PATHS } from '@/config/paths';

export default function PageGeneral() {
  redirect(PATHS.PLATFORM.GENERAL.LOADING);
}
