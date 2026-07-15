"use client";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { JSX } from "react";
import { useTranslate } from "./use-locales";
import { allLangs } from "./all-langs";


export default function LanguageSelect(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { currentLang, onChangeLang } = useTranslate();

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function handleLangChange(event: SelectChangeEvent<string>) {
    const value = event.target.value as string;
    await onChangeLang(value);
  }
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Select
      value={ currentLang.value }
      onChange={ handleLangChange }
      variant="outlined"
      size="small"
      SelectDisplayProps={{ style:{ fontSize:"0.8rem", padding:0 , paddingRight:20  } }}
      sx={{ height:28 , minHeight:28 , maxWidth:"100%" , overflow:'hidden' , padding:0 , "& svg":{ right:0 } }}
      slotProps={{
        notchedOutline:{ style:{ border:"none" } },
        input:{ style:{ fontSize:"0.5rem" } }
      }}
    >
      {allLangs.map((lang) => (
        <MenuItem key={lang.value} value={lang.value} style={{ fontSize:"0.8rem" }} >{lang.label}</MenuItem>
      ))}
    </Select>

  )


}