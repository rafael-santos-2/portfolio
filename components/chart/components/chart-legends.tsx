"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { mergeClasses } from "minimal-shared/utils";
import { styled } from "@mui/material/styles";
import { chartClasses } from "../classes";
import type { TChartLegendsProps } from "../chart.type";


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function ChartLegends({
  sx,
  className,
  icons = [],
  values = [],
  labels = [],
  colors = [],
  sublabels = [],
  ...other
}: TChartLegendsProps): JSX.Element {


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <LegendsRoot className={mergeClasses([chartClasses.legends.root, className])} sx={sx} {...other}>
      {labels.map((label, index) => (
        <LegendWrap
          key={label}
          className={chartClasses.legends.item.wrap}
          style={{ ["--icon-color" as string]: colors[index] }}
        >
          <LegendItem className={chartClasses.legends.item.root}>
            {icons.length ? (
              <LegendIcon className={chartClasses.legends.item.icon}>
                {icons[index]}
              </LegendIcon>
            ) : (
              <LegendDot className={chartClasses.legends.item.dot} />
            )}
            <LegendLabel className={chartClasses.legends.item.label}>
              {label}
              {!!sublabels.length && <> {`(${sublabels[index]})`}</>}
            </LegendLabel>
          </LegendItem>

          {!!values.length && (
            <LegendValue className={chartClasses.legends.item.value}>
              {values[index]}
            </LegendValue>
          )}
        </LegendWrap>
      ))}
    </LegendsRoot>

  );


}


// STYLES
// ----------------------------------------------------------------------------------------------------

const LegendsRoot = styled("ul")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  padding: 0,
  margin: 0,
  listStyle: "none",
}));

const LegendWrap = styled("li")(() => ({
  display: "inline-flex",
  flexDirection: "column",
}));

const LegendItem = styled("div")(({ theme }) => ({
  gap: 6,
  alignItems: "center",
  display: "inline-flex",
  justifyContent: "flex-start",
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
}));

const LegendIcon = styled("span")({
  display: "inline-flex",
  color: "var(--icon-color)",
  "& > :first-of-type:not(style):not(:first-of-type ~ *), & > style + *": { width: 20, height: 20 },
});

const LegendDot = styled("span")({
  width: 12,
  height: 12,
  flexShrink: 0,
  display: "flex",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--icon-color)",
  backgroundColor: "currentColor",
});

const LegendLabel = styled("span")({ flexShrink: 0 });

const LegendValue = styled("span")(({ theme }) => ({
  ...theme.typography.h6,
  marginTop: theme.spacing(1),
}));
