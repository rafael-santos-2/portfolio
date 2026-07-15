'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import { Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import InfoItem from '@/widgets/info/info-item/info-item';
import { Header } from '@/components/header';


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsInfoItem(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [loading, setLoading] = useState(false);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Header
        title="Info Item"
        actions={[]}
      >
          <Chip
            key="loading-toggle"
            label={loading ? 'Loading ON' : 'Loading OFF'}
            color={loading ? 'primary' : 'default'}
            onClick={() => setLoading((v) => !v)}
            size="small"
          />,
      </Header>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Stack spacing={4}>

          {/* Basic */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Basic</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="Full name"          value="Jan Janssen" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="Email"              value="jan@example.com" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="Role"               value="Admin" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="Empty field"        value={null} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="Custom empty label" value={null} emptyLabel="Not set" />
              </Grid>
            </Grid>
          </Stack>

          <Divider />

          {/* Copyable */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Copyable</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="ID"    value="usr_abc123xyz" copyable />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="Token" value="eyJhbGciOiJSUzI1NiJ9..." copyable />
              </Grid>
            </Grid>
          </Stack>

          <Divider />

          {/* Clickable */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Clickable</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="Website" value="www.example.com" onClick={() => alert('clicked')} />
              </Grid>
            </Grid>
          </Stack>

          <Divider />

          {/* With color */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Value color</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="Status" value="Active"  valueColor="success" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="Status" value="Warning" valueColor="warning" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem loading={loading} title="Status" value="Error"   valueColor="error" />
              </Grid>
            </Grid>
          </Stack>

          <Divider />

          {/* React node value */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">React node as value</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoItem
                  loading={loading}
                  title="Tags"
                  value={
                    <Stack direction="row" gap={0.5} flexWrap="wrap">
                      <Chip label="billing" size="small" />
                      <Chip label="export"  size="small" />
                      <Chip label="system"  size="small" />
                    </Stack>
                  }
                />
              </Grid>
            </Grid>
          </Stack>

        </Stack>
      </div>

    </div>
  );

}
