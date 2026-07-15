"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { forwardRef, JSX, lazy, Suspense } from "react";
import { useIsClient } from "minimal-shared/hooks";
import { mergeClasses } from "minimal-shared/utils";
import { styled } from "@mui/material/styles";
import { chartClasses } from "./classes";
import ChartLoading from "./components/chart-loading";
import type { TChartProps } from "./chart.type";


// LAZY LOAD
// ----------------------------------------------------------------------------------------------------

const LazyChart = lazy(() =>
  import("react-apexcharts").then((module) => ({ default: module.default }))
);


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export const Chart = forwardRef<HTMLDivElement, TChartProps>((props, ref): JSX.Element => {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { type, series, options, slotProps, className, sx, ...other } = props;

  const isClient = useIsClient();


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  const renderFallback = (): JSX.Element => (
    <ChartLoading type={type} sx={slotProps?.loading} />
  );


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <ChartRoot
      ref={ref}
      dir="ltr"
      className={mergeClasses([chartClasses.root, className])}
      sx={sx}
      {...other}
    >
      {isClient ? (
        <Suspense fallback={renderFallback()}>
          <LazyChart type={type} series={series} options={options} width="100%" height="100%" />
        </Suspense>
      ) : (
        renderFallback()
      )}
    </ChartRoot>

  );

});

Chart.displayName = "Chart";


// STYLES
// ----------------------------------------------------------------------------------------------------

const ChartRoot = styled("div")(({ theme }) => ({
  width: "100%",
  flexShrink: 0,
  position: "relative",
  borderRadius: typeof theme.shape.borderRadius === "number"
    ? theme.shape.borderRadius * 1.5
    :`${parseFloat(theme.shape.borderRadius as string) * 1.5}px`,
}));
