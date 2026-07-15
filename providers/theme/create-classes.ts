import { themeConfig } from '@/config/theme';

// ----------------------------------------------------------------------

export function create_classes(className: string): string {
  return `${themeConfig.classesPrefix}__${className}`;
}
