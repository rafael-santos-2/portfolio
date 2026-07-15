import type { CSSObject, SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export type TTableHeadCell = {
  id: string;
  label?: string;
  width?: CSSObject["width"];
  align?: "left" | "center" | "right";
  disableSort?: boolean;
  hideOnMobile?: boolean;
  required?: boolean;
  headerAction?: ReactNode;
  sx?: SxProps<Theme>;
};

export type TTableHeadProps = {
  headCells: TTableHeadCell[];
  order?: "asc" | "desc";
  orderBy?: string;
  rowCount?: number;
  numSelected?: number;
  onSort?: (id: string) => void;
  onSelectAllRows?: (checked: boolean) => void;
  endCell?: ReactNode;
  sx?: SxProps<Theme>;
};
