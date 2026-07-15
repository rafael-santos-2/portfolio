"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";

import { Field } from "@/components/form/fields";
import { Form } from "@/components/form/form";
import { Header } from "@/components/header";
import Icon from "@/components/icon";
import { pdf_generate, pdf_preview_url } from "@/pdf/utils";
// import { PdfDocumentLivePreviewDemo, pdf_generate, pdf_preview_url } from "@/components/pdfs";
import { PdfDocumentLivePreviewDemo } from "@/pdf/live-preview-demo";

import css from "./view-sub2-pdf-preview.module.css";

const LIVE_PREVIEW_DEMO_SCHEMA = z.object({
  companyName: z.string().min(1, "Bedrijfsnaam is verplicht"),
  companyEmail: z.email("Vul een geldig e-mailadres in"),
  clientName: z.string().min(1, "Klantnaam is verplicht"),
  clientEmail: z.email("Vul een geldig e-mailadres in"),
  invoiceNumber: z.string().min(1, "Factuurnummer is verplicht"),
  invoiceDate: z.string().min(1, "Factuurdatum is verplicht"),
  dueDate: z.string().min(1, "Vervaldatum is verplicht"),
  projectTitle: z.string().min(1, "Projecttitel is verplicht"),
  amount: z.number().min(0, "Bedrag moet positief zijn"),
  notes: z.string(),
});

type TLivePreviewDemoSchema = z.infer<typeof LIVE_PREVIEW_DEMO_SCHEMA>;

const LIVE_PREVIEW_DEMO_DEFAULTS: TLivePreviewDemoSchema = {
  companyName: "Bird Larsen Studio",
  companyEmail: "finance@birdlarsen.be",
  clientName: "Acme Client",
  clientEmail: "hello@acmeclient.be",
  invoiceNumber: "INV-2026-014",
  invoiceDate: "2026-04-16",
  dueDate: "2026-04-30",
  projectTitle: "Brand identity sprint",
  amount: 2450,
  notes:
    "Deze preview ververst live terwijl je links de gegevens aanpast. Ideaal om straks echte offertes, facturen of rapporten op deze manier op te bouwen.",
};

export default function ViewTesterPdfPreviewDemo(): JSX.Element {
  const form = useForm<TLivePreviewDemoSchema>({
    mode: "onChange",
    resolver: zodResolver(LIVE_PREVIEW_DEMO_SCHEMA),
    defaultValues: LIVE_PREVIEW_DEMO_DEFAULTS,
  });

  const values = useWatch({
    control: form.control,
  });

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewLoading, setPreviewLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    let nextUrl = "";

    async function buildPreview(): Promise<void> {
      setPreviewLoading(true);

      try {
        nextUrl = await pdf_preview_url(<PdfDocumentLivePreviewDemo data={values as TLivePreviewDemoSchema} />);

        if (!active) {
          URL.revokeObjectURL(nextUrl);
          return;
        }

        setPreviewUrl((currentUrl) => {
          if (currentUrl) {
            URL.revokeObjectURL(currentUrl);
          }

          return nextUrl;
        });
      } catch (error) {
        console.error("[PDF LIVE PREVIEW] Failed to generate preview URL.", error);
      } finally {
        if (active) {
          setPreviewLoading(false);
        }
      }
    }

    void buildPreview();

    return () => {
      active = false;
    };
  }, [values]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  async function handleDownload(): Promise<void> {
    await pdf_generate(
      {
        document: <PdfDocumentLivePreviewDemo data={values as TLivePreviewDemoSchema} />,
        filename: `live-preview-${(values?.invoiceNumber || "demo").toLowerCase()}`,
      },
      { mode: "download" }
    );
  }

  return (
    <div className={css.page}>
      <Header
        title="PDF Live Preview Demo"
        icon={<Icon name="pdf" />}
      />

      <div className={css.content}>
        <div className={`${css.panel} ${css.formPanel}`}>
          <div>
            <Typography variant="h5" gutterBottom>
              Vul links je data in
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Elke wijziging bouwt meteen een nieuwe PDF-preview op aan de rechterkant.
            </Typography>
          </div>

          <Form methods={form}>
            <div className={css.fields}>
              <Field.Text name="companyName" label="Bedrijfsnaam" />
              <Field.Text name="companyEmail" label="Bedrijf e-mail" />
              <Field.Text name="clientName" label="Klantnaam" />
              <Field.Text name="clientEmail" label="Klant e-mail" />
              <Field.Text name="invoiceNumber" label="Factuurnummer" />
              <Field.Text
                name="invoiceDate"
                label="Factuurdatum"
                slotProps={{ inputLabel: { shrink: true } }}
                type="date"
              />
              <Field.Text
                name="dueDate"
                label="Vervaldatum"
                slotProps={{ inputLabel: { shrink: true } }}
                type="date"
              />
              <Field.Text name="projectTitle" label="Projecttitel" />
              <Field.Text name="amount" label="Bedrag" type="number" />
              <Field.Text name="notes" label="Notities" multiline minRows={5} />
            </div>
          </Form>

          <div className={css.actions}>
            <Button variant="contained" onClick={() => void handleDownload()}>
              Download PDF
            </Button>
            <Button variant="outlined" onClick={() => form.reset(LIVE_PREVIEW_DEMO_DEFAULTS)}>
              Reset demo
            </Button>
          </div>
        </div>

        <div className={`${css.panel} ${css.previewPanel}`}>
          <div className={css.previewHeader}>
            <div>
              <Typography variant="h6">Live preview</Typography>
              <Typography variant="body2" color="text.secondary">
                {previewLoading ? "PDF wordt ververst..." : "Preview is up-to-date"}
              </Typography>
            </div>

            <Button variant="text" onClick={() => void handleDownload()}>
              Exporteer
            </Button>
          </div>

          <div className={css.previewFrameWrap}>
            {previewUrl ? (
              <iframe
                className={css.previewFrame}
                src={previewUrl}
                title="PDF live preview demo"
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
