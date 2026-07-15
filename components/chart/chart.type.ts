// IMPORTS
// ----------------------------------------------------------------------------------------------------

import type { Theme, SxProps } from "@mui/material/styles";
import type { Props as ApexProps } from "react-apexcharts";


// TYPES
// ----------------------------------------------------------------------------------------------------

export type TChartOptions = ApexProps["options"];

export type TChartProps = React.ComponentProps<"div"> &
  Pick<ApexProps, "type" | "series" | "options"> & {
    sx?: SxProps<Theme>;
    slotProps?: {
      loading?: SxProps<Theme>;
    };
  };

export type TChartLoadingProps = React.ComponentProps<"div"> &
  Pick<TChartProps, "type"> & {
    sx?: SxProps<Theme>;
  };

export type TChartSelectProps = Omit<React.ComponentProps<"button">, "onChange"> & {
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
  sx?: SxProps<Theme>;
};

export type TChartLegendsProps = React.ComponentProps<"ul"> & {
  labels?: string[];
  colors?: string[];
  values?: string[];
  sublabels?: string[];
  icons?: React.ReactNode[];
  sx?: SxProps<Theme>;
  slotProps?: {
    wrapper?: React.ComponentProps<"li"> & { sx?: SxProps<Theme> };
    root?: React.ComponentProps<"div"> & { sx?: SxProps<Theme> };
    dot?: React.ComponentProps<"span"> & { sx?: SxProps<Theme> };
    icon?: React.ComponentProps<"span"> & { sx?: SxProps<Theme> };
    value?: React.ComponentProps<"span"> & { sx?: SxProps<Theme> };
    label?: React.ComponentProps<"span"> & { sx?: SxProps<Theme> };
  };
};
