// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from "react";
import { Skeleton, TableCell, TableRow } from "@mui/material";
import type { TTableSkeletonProps } from "./table-skeleton.type";


export function TableSkeleton({ rowCount = 5, cellCount = 1 }: TTableSkeletonProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <>
      {Array.from({ length: rowCount }, (_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: cellCount }, (__, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
          <TableCell padding="checkbox" />
        </TableRow>
      ))}
    </>
  );


}
