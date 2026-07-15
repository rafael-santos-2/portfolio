'use client';

import { nlNL as nlNLCore } from '@mui/material/locale';
import { enUS as enUSDate, nlNL as nlNLDate } from '@mui/x-date-pickers/locales';
import { enUS as enUSDataGrid, nlNL as nlNLDataGrid } from '@mui/x-data-grid/locales';

// ----------------------------------------------------------------------

export const allLangs = [
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: { ...enUSDate.components, ...enUSDataGrid.components },
    },
  },
  {
    value: 'nl',
    label: 'Nederlands',
    countryCode: 'NL',
    adapterLocale: 'nl',
    numberFormat: { code: 'nl-NL', currency: 'EUR' },
    systemValue: {
      components: { ...nlNLCore.components, ...nlNLDate.components, ...nlNLDataGrid.components },
    },
  },
];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
