// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { styled } from "@mui/material";
import { varAlpha } from "minimal-shared/utils";


// STYLES
// ----------------------------------------------------------------------------------------------------
export const ListRoot = styled('ul')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexDirection: 'column',
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.vars.palette.error.main}`,
  backgroundColor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
}));

export const ListItem = styled('li')(() => ({ display: 'flex', flexDirection: 'column' }));

export const ItemTitle = styled('span')(({ theme }) => ({ ...theme.typography.subtitle2 }));

export const ItemCaption = styled('span')(({ theme }) => ({ ...theme.typography.caption }));