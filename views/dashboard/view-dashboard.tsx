"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useState } from "react";
import { Grid, Card, CardHeader, CardContent } from "@mui/material";
import { Chart, ChartLegends, ChartSelect, useChart } from "@/components/chart";
import { useTranslate } from "@/providers/language";
import Icon from "@/components/icon";
import { ApexAxisChartSeries } from "apexcharts";
import { Header } from '@/components/header';


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function ViewDashboard(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [revenueFilter, setRevenueFilter] = useState("2024");


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <div style={{ display: "flex", flexDirection: "column", overflow: "auto" }}>

      <Header title={t("dashboard.title")} icon={<Icon name="dashboard" />} />

      <Grid container spacing={3} sx={{ p: 3 }}>

        {/* Line Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <ChartLine revenueFilter={revenueFilter} onFilterChange={setRevenueFilter} />
        </Grid>

        {/* Donut Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartDonut />
        </Grid>

        {/* Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartBar />
        </Grid>

        {/* Area Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartArea />
        </Grid>

        {/* Radial Bar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartRadialBar />
        </Grid>

        {/* Radar Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <ChartRadar />
        </Grid>

      </Grid>

    </div>

  );


}


// CHART COMPONENTS
// ----------------------------------------------------------------------------------------------------

function ChartLine({ revenueFilter, onFilterChange }: { revenueFilter: string; onFilterChange: (v: string) => void }) {

  const options = useChart({
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  });

  const seriesByYear: Record<string, ApexAxisChartSeries> = {
    "2024": [
      { name: "Revenue", data: [12000, 18000, 14000, 22000, 19000, 25000, 23000, 28000, 21000, 30000, 27000, 35000] },
      { name: "Expenses", data: [8000, 10000, 9000, 13000, 11000, 15000, 14000, 16000, 13000, 18000, 16000, 20000] },
    ],
    "2023": [
      { name: "Revenue", data: [9000, 12000, 11000, 16000, 14000, 19000, 17000, 21000, 16000, 23000, 20000, 26000] },
      { name: "Expenses", data: [6000, 8000, 7000, 10000, 9000, 12000, 11000, 13000, 10000, 14000, 12000, 16000] },
    ],
    "2022": [
      { name: "Revenue", data: [7000, 9000, 8000, 12000, 10000, 14000, 13000, 16000, 12000, 17000, 15000, 19000] },
      { name: "Expenses", data: [5000, 6000, 5500, 8000, 7000, 9500, 9000, 10500, 8000, 11000, 9500, 13000] },
    ],
  };

  return (
    <Card>
      <CardHeader
        title="Revenue Overview"
        subheader="Monthly revenue vs expenses"
        action={
          <ChartSelect
            options={["2024", "2023", "2022"]}
            value={revenueFilter}
            onChange={onFilterChange}
          />
        }
      />
      <CardContent>
        <ChartLegends
          labels={["Revenue", "Expenses"]}
          colors={["var(--palette-primary-main)", "var(--palette-warning-main)"]}
          sx={{ mb: 3 }}
        />
        <Chart
          type="line"
          series={seriesByYear[revenueFilter]}
          options={options}
          sx={{ height: 300 }}
        />
      </CardContent>
    </Card>
  );

}


function ChartDonut() {

  const LABELS = ["Marketing", "Development", "Operations", "Support"];
  const COLORS = [
    "var(--palette-primary-main)",
    "var(--palette-warning-main)",
    "var(--palette-info-main)",
    "var(--palette-error-main)",
  ];

  const options = useChart({
    labels: LABELS,
    colors: COLORS,
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: { show: true, label: "Total", formatter: () => "€ 148k" },
          },
        },
      },
    },
  });

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Budget Split" subheader="By department" />
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <Chart
          type="donut"
          series={[32000, 58000, 28000, 30000]}
          options={options}
          sx={{ height: 260, width: "100%" }}
        />
        <ChartLegends
          labels={LABELS}
          colors={COLORS}
          values={["€ 32k", "€ 58k", "€ 28k", "€ 30k"]}
        />
      </CardContent>
    </Card>
  );

}


function ChartBar() {

  const options = useChart({
    xaxis: {
      categories: ["Q1", "Q2", "Q3", "Q4"],
    },
  });

  return (
    <Card>
      <CardHeader title="Quarterly Sales" subheader="Units sold per quarter" />
      <CardContent>
        <Chart
          type="bar"
          series={[
            { name: "Product A", data: [420, 560, 480, 610] },
            { name: "Product B", data: [310, 390, 420, 490] },
            { name: "Product C", data: [190, 240, 280, 320] },
          ]}
          options={options}
          sx={{ height: 300 }}
        />
      </CardContent>
    </Card>
  );

}


function ChartArea() {

  const options = useChart({
    fill: { type: "gradient" },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  });

  return (
    <Card>
      <CardHeader title="Weekly Visitors" subheader="Unique visitors this week" />
      <CardContent>
        <Chart
          type="area"
          series={[
            { name: "Desktop", data: [1200, 1800, 1600, 2100, 1900, 900, 600] },
            { name: "Mobile", data: [800, 1200, 1100, 1500, 1400, 1100, 700] },
          ]}
          options={options}
          sx={{ height: 300 }}
        />
      </CardContent>
    </Card>
  );

}


function ChartRadialBar() {

  const LABELS = ["Tasks", "Goals", "Reviews"];
  const COLORS = [
    "var(--palette-primary-main)",
    "var(--palette-warning-main)",
    "var(--palette-info-main)",
  ];

  const options = useChart({
    labels: LABELS,
    colors: COLORS,
    plotOptions: {
      radialBar: {
        hollow: { margin: -8, size: "68%" },
        track: { margin: -8, strokeWidth: "50%" },
        dataLabels: {
          total: { show: true, label: "Progress" },
        },
      },
    },
  });

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Team Progress" subheader="Current sprint completion" />
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <Chart
          type="radialBar"
          series={[78, 62, 91]}
          options={options}
          sx={{ height: 280, width: "100%" }}
        />
        <ChartLegends
          labels={LABELS}
          colors={COLORS}
          values={["78%", "62%", "91%"]}
        />
      </CardContent>
    </Card>
  );

}


function ChartRadar() {

  const options = useChart({
    xaxis: {
      categories: ["Speed", "Reliability", "Security", "UX", "Performance", "Scalability"],
    },
    stroke: { width: 2 },
    fill: { opacity: 0.2 },
    markers: { size: 4 },
  });

  return (
    <Card>
      <CardHeader title="Product Score" subheader="vs. Competitor benchmark" />
      <CardContent>
        <Chart
          type="radar"
          series={[
            { name: "Our product", data: [88, 92, 85, 79, 90, 83] },
            { name: "Competitor", data: [72, 78, 90, 85, 74, 80] },
          ]}
          options={options}
          sx={{ height: 300 }}
        />
      </CardContent>
    </Card>
  );

}
