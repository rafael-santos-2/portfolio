// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { Document, Page, Text, View } from '@react-pdf/renderer';
import { JSX } from 'react';

import { s } from './pdf-document.starter.styles';

// ----------------------------------------------------------------------

export function MyDocument(): JSX.Element {
  return (
    <Document>
      <Page size="A4" style={s.page}>

        <View>
          <Text>Hello world</Text>
        </View>

      </Page>
    </Document>
  );
}
