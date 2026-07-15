"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { mergeClasses } from "minimal-shared/utils";
import { Box, Skeleton, styled } from "@mui/material";
import { chartClasses } from "../classes";
import type { TChartLoadingProps } from "../chart.type";


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function ChartLoading({ sx, className, type, ...other }: TChartLoadingProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const circularTypes: TChartLoadingProps["type"][] = ["donut", "radialBar", "pie", "polarArea"];
  const isCircular = circularTypes.includes(type);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <LoadingRoot
      className={mergeClasses([chartClasses.loading, className])}
      sx={sx}
      {...other}
    >
      <Skeleton
        variant="circular"
        sx={{
          width: 1,
          height: 1,
          borderRadius: "inherit",
          ...(!isCircular && { borderRadius: 1 }),
        }}
      />
    </LoadingRoot>

  );


}


// STYLES
// ----------------------------------------------------------------------------------------------------

const LoadingRoot = styled(Box)(() => ({
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 9,
  height: "100%",
  overflow: "hidden",
  alignItems: "center",
  position: "absolute",
  borderRadius: "inherit",
  justifyContent: "center",
}));
