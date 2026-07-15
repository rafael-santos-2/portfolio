import { Document, Page, Text, View } from "@react-pdf/renderer";
import { JSX } from "react";

import { s } from "./pdf-document.live-preview-demo.styles";
import type { TLivePreviewDemoData } from "./pdf-document.live-preview-demo.types";

type TProps = {
  data: TLivePreviewDemoData;
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0);
}

function formatDate(value: string): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("nl-BE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function PdfDocumentLivePreviewDemo({ data }: TProps): JSX.Element {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View>
            <Text style={s.headerLabel}>Live PDF Demo</Text>
            <Text style={s.headerTitle}>{data.companyName || "Jouw bedrijf"}</Text>
            <Text style={s.headerSubtitle}>{data.companyEmail || "bedrijf@email.be"}</Text>
          </View>

          <View style={s.invoiceBox}>
            <Text style={s.invoiceNumber}>{data.invoiceNumber || "INV-0001"}</Text>
            <Text style={s.dateText}>Factuurdatum: {formatDate(data.invoiceDate)}</Text>
            <Text style={s.dateText}>Vervaldatum: {formatDate(data.dueDate)}</Text>
          </View>
        </View>

        <View style={s.contentGrid}>
          <View style={s.card}>
            <Text style={s.cardLabel}>Van</Text>
            <Text style={s.cardTitle}>{data.companyName || "Jouw bedrijf"}</Text>
            <Text style={s.cardLine}>{data.companyEmail || "bedrijf@email.be"}</Text>
          </View>

          <View style={s.card}>
            <Text style={s.cardLabel}>Voor</Text>
            <Text style={s.cardTitle}>{data.clientName || "Klantnaam"}</Text>
            <Text style={s.cardLine}>{data.clientEmail || "klant@email.be"}</Text>
          </View>
        </View>

        <View style={s.summaryCard}>
          <Text style={s.summaryLabel}>Project</Text>
          <Text style={s.projectTitle}>{data.projectTitle || "Project of opdracht"}</Text>

          <View style={s.amountRow}>
            <Text style={s.amountLabel}>Totaalbedrag</Text>
            <Text style={s.amountValue}>{formatCurrency(data.amount)}</Text>
          </View>
        </View>

        <View style={s.notesBox}>
          <Text style={s.cardLabel}>Notities</Text>
          <Text style={s.notesText}>
            {data.notes ||
              "Hier kun je extra uitleg, betalingsinfo of projectnotities tonen. Alles wat je links invult, verschijnt meteen in deze PDF-preview."}
          </Text>
        </View>

        <Text style={s.footer}>
          Deze demo toont hoe een formulier live gekoppeld kan worden aan een PDF-preview binnen het platform.
        </Text>
      </Page>
    </Document>
  );
}
