// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { FormHelperText, FormHelperTextProps } from "@mui/material";

export type THelperTextProps = FormHelperTextProps & {
  errorMessage?: string;
  disableGutters?: boolean;
  helperText?: React.ReactNode;
};

export default function HelperText({ sx, helperText, errorMessage, disableGutters,...other }: THelperTextProps): React.ReactNode {


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
  if (!errorMessage && !helperText) return null;

  return (

    <FormHelperText
      error={!!errorMessage}
      sx={[ { mx: disableGutters ? 0 : 1.75 }, ...(Array.isArray(sx) ? sx : [sx]) ]}
      {...other}
    >
      {errorMessage || helperText}
    </FormHelperText>

  )


}