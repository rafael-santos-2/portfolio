// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useState } from "react";
import { Field } from "../fields";
import { TRHFPasswordProps } from "./rhf-password.type";
import { InputAdornment } from "@mui/material";
import { useTranslate } from "@/providers/language";
import Icon from "@/components/icon";
import { IconButton } from "@/components/buttons";


export default function RHFPassword({ name, label }:TRHFPasswordProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function toggleShowPassword() { setShowPassword((prev) => !prev); }

  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Field.Text
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton tooltip={showPassword ? t("profile.password.") : "Toon wachtwoord"} onClick={toggleShowPassword} edge="end" tabIndex={-1}>
                <Icon name="eye" open={showPassword} />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />

  )


}