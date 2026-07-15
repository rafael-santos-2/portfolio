'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { usePrint } from '@/hooks/use-print';


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewPrintTest(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { print, printRaw, status, isPrinting, isReady } = usePrint();


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [custom_zpl, setCustomZpl] = useState<string>(
    '^XA\n^MMT\n^PW812\n^LL406\n^LS0\n^FO30,30^ADN,36,20^FDTest Label^FS\n^XZ'
  );

  const [title, setTitle] = useState<string>('Artikel #001');
  const [barcode, setBarcode] = useState<string>('1234567890');
  const [line1, setLine1] = useState<string>('Locatie: Rek A3');
  const [line2, setLine2] = useState<string>('Gewicht: 2.5kg');


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  function handle_print_simple() {
    print({ title });
  }

  function handle_print_with_barcode() {
    print({ title, barcode, lines: [line1, line2] });
  }

  function handle_print_raw() {
    printRaw(custom_zpl);
  }

  function handle_print_config() {
    // ~WC prints the printer configuration label — built-in Zebra command
    printRaw('~WC');
  }


  // HELPERS
  // ----------------------------------------------------------------------------------------------------

  function status_color(): 'default' | 'warning' | 'success' | 'error' | 'info' {
    switch (status) {
      case 'initializing': return 'warning';
      case 'idle':         return 'success';
      case 'printing':     return 'info';
      case 'error':        return 'error';
      default:             return 'default';
    }
  }

  function status_label(): string {
    switch (status) {
      case 'initializing': return 'Verbinding maken...';
      case 'idle':         return 'Klaar';
      case 'printing':     return 'Aan het printen...';
      case 'error':        return 'Fout — is de Zebra Browser Print agent actief?';
      default:             return status;
    }
  }


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <Stack spacing={3} sx={{ p: 3, maxWidth: 960, overflowY: 'auto', height: '100%' }}>

      {/* Warning */}
      <Alert severity="warning">
        Dit is een testpagina. Verwijder deze wanneer het testen klaar is.
      </Alert>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Zebra Printer Test</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {status === 'initializing' && <CircularProgress size={16} />}
          <Chip
            label={status_label()}
            color={status_color()}
            size="small"
            variant="outlined"
          />
        </Stack>
      </Stack>

      <Divider />

      {/* Agent warning */}
      {status === 'error' && (
        <Alert severity="error">
          <Typography variant="subtitle2" gutterBottom>
            Zebra Browser Print agent niet gevonden
          </Typography>
          <Typography variant="body2">
            Zorg dat de Zebra Browser Print desktop applicatie geïnstalleerd en actief is op deze machine.
            Het icoon verschijnt in de systeemtray wanneer het correct draait.
          </Typography>
        </Alert>
      )}

      <Grid container spacing={3}>

        {/* ------------------ Kaart 1: Eenvoudig label ------------------ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardHeader
              title="Eenvoudig label"
              subheader="Alleen tekst, geen barcode"
            />
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="Titel"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={handle_print_simple}
                  disabled={!isReady || isPrinting || !title}
                  fullWidth
                >
                  {isPrinting ? 'Printen...' : 'Print eenvoudig label'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ------------------ Kaart 2: Volledig label ------------------ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardHeader
              title="Volledig label"
              subheader="Tekst + extra lijnen + barcode"
            />
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="Titel"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Lijn 1"
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Lijn 2"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Barcode (Code 128)"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  fullWidth
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={handle_print_with_barcode}
                  disabled={!isReady || isPrinting || !title}
                  fullWidth
                >
                  {isPrinting ? 'Printen...' : 'Print volledig label'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ------------------ Kaart 3: Configuratielabel ------------------ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardHeader
              title="Printer configuratielabel"
              subheader="Print de ingebouwde Zebra configuratiepagina (~WC)"
            />
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  Dit stuurt het commando <code>~WC</code> naar de printer.
                  De printer drukt automatisch een label af met alle instellingen:
                  IP-adres, firmware versie, labelformaat, enz.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handle_print_config}
                  disabled={!isReady || isPrinting}
                  fullWidth
                >
                  {isPrinting ? 'Printen...' : 'Print configuratie'}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* ------------------ Kaart 4: Ruwe ZPL ------------------ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardHeader
              title="Ruwe ZPL"
              subheader="Stuur eigen ZPL rechtstreeks naar de printer"
            />
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="ZPL"
                  value={custom_zpl}
                  onChange={(e) => setCustomZpl(e.target.value)}
                  fullWidth
                  multiline
                  rows={6}
                  size="small"
                  slotProps={{ input: { sx: { fontFamily: 'monospace', fontSize: 12 } } }}
                />
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      setCustomZpl(
                        '^XA\n^MMT\n^PW812\n^LL406\n^LS0\n^FO30,30^ADN,36,20^FDTest Label^FS\n^XZ'
                      )
                    }
                  >
                    Reset
                  </Button>
                  <Box flex={1} />
                  <Button
                    variant="contained"
                    onClick={handle_print_raw}
                    disabled={!isReady || isPrinting || !custom_zpl}
                  >
                    {isPrinting ? 'Printen...' : 'Print ZPL'}
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* ZPL preview info */}
      <Alert severity="info">
        <Typography variant="subtitle2" gutterBottom>
          ZPL preview
        </Typography>
        <Typography variant="body2">
          Wil je labels visueel previewen voor je print? Ga naar{' '}
          <strong>labelary.com/viewer.html</strong> en plak je ZPL code om een
          voorbeeld te zien van het label op 101.6 x 50.8mm.
        </Typography>
      </Alert>

    </Stack>
  );

}
