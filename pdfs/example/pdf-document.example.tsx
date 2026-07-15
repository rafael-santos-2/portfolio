// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { Document, Page, Text, View } from '@react-pdf/renderer';
import { JSX } from 'react';

import { s } from './pdf-document.example.styles';
import type { TExampleItem } from './pdf-document.example.types';

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------------------------------------

const items: TExampleItem[] = [
  { description: 'Website redesign', qty: 1, unitPrice: '€ 2.400,00', total: '€ 2.400,00' },
  { description: 'SEO optimisation', qty: 3, unitPrice: '€ 320,00', total: '€ 960,00' },
  { description: 'Hosting & domain (yearly)', qty: 1, unitPrice: '€ 180,00', total: '€ 180,00' },
  { description: 'Support — 10 hrs', qty: 10, unitPrice: '€ 85,00', total: '€ 850,00' },
];

// ----------------------------------------------------------------------
// DOCUMENT
// ----------------------------------------------------------------------------------------------------

export function PdfDocumentExample(): JSX.Element {
  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Header ── */}
        <View style={s.header}>
          <View>
            <Text style={s.headerTitle}>INVOICE</Text>
            <Text style={s.headerSub}>ACME STUDIO</Text>
          </View>
          <View style={s.badge}>
            <Text style={s.badgeText}>#INV-2024-042</Text>
            <Text style={s.badgeSub}>INVOICE NUMBER</Text>
          </View>
        </View>

        <View style={s.body}>

          {/* ── Info row ── */}
          <View style={s.infoRow}>
            <View style={s.infoBlock}>
              <Text style={s.infoLabel}>FROM</Text>
              <Text style={s.infoPrimary}>Acme Studio BV</Text>
              <Text style={s.infoSecondary}>Grote Markt 12</Text>
              <Text style={s.infoSecondary}>2000 Antwerp</Text>
              <Text style={s.infoSecondary}>hello@acmestudio.be</Text>
            </View>
            <View style={s.infoDivider} />
            <View style={s.infoBlock}>
              <Text style={s.infoLabel}>TO</Text>
              <Text style={s.infoPrimary}>Client Corp NV</Text>
              <Text style={s.infoSecondary}>Leopoldlaan 88</Text>
              <Text style={s.infoSecondary}>9000 Ghent</Text>
              <Text style={s.infoSecondary}>finance@clientcorp.be</Text>
            </View>
            <View style={s.infoDivider} />
            <View style={s.infoBlock}>
              <Text style={s.infoLabel}>DATE</Text>
              <Text style={s.infoPrimary}>1 April 2024</Text>
              <Text style={s.infoSecondary}>Due: 30 April 2024</Text>
            </View>
          </View>

          {/* ── Table ── */}
          <Text style={s.sectionLabel}>ITEMS</Text>
          <View style={s.tableHeader}>
            <Text style={s.th}>Description</Text>
            <Text style={{ ...s.thNarrow, width: 30 }}>Qty</Text>
            <Text style={s.thNarrow}>Unit price</Text>
            <Text style={s.thNarrow}>Total</Text>
          </View>
          {items.map((item, i) => (
            <View key={i} style={i % 2 === 0 ? s.tableRowEven : s.tableRowOdd}>
              <Text style={s.td}>{item.description}</Text>
              <Text style={{ ...s.tdNarrow, width: 30 }}>{item.qty}</Text>
              <Text style={s.tdMuted}>{item.unitPrice}</Text>
              <Text style={s.tdNarrow}>{item.total}</Text>
            </View>
          ))}

          {/* ── Summary ── */}
          <View style={s.summarySection}>
            <View style={s.summaryBox}>
              <View style={s.summaryRow}>
                <Text style={s.summaryLabel}>Subtotal</Text>
                <Text style={s.summaryValue}>€ 4.390,00</Text>
              </View>
              <View style={s.summaryRow}>
                <Text style={s.summaryLabel}>VAT 21%</Text>
                <Text style={s.summaryValue}>€ 921,90</Text>
              </View>
              <View style={s.summaryTotalRow}>
                <Text style={s.summaryTotalLabel}>TOTAL</Text>
                <Text style={s.summaryTotalValue}>€ 5.311,90</Text>
              </View>
            </View>
          </View>

          {/* ── Notes ── */}
          <View style={s.notesBox}>
            <Text style={s.notesLabel}>NOTES</Text>
            <Text style={s.notesText}>
              Payment via bank transfer to BE12 3456 7890 1234 (BIC: GEBABEBB).{'\n'}
              Please reference the invoice number in your payment.
            </Text>
          </View>

        </View>

        {/* ── Footer ── */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>Acme Studio BV — BTW BE 0123.456.789</Text>
          <Text
            style={s.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
            fixed
          />
          <Text style={s.footerBrand}>ACME STUDIO</Text>
        </View>

      </Page>
    </Document>
  );
}
