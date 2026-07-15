"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from "react";
import { InputAdornment, TextField } from "@mui/material";
import Icon from "@/components/icon";
import type { TTableFiltersProps } from "./table-filters.type";
import css from "./table-filters.module.css";


export function TableFilters({ search, onSearchChange, placeholder = "Zoeken...", components }: TTableFiltersProps): JSX.Element {


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

    <div className={css.filters}>

      <TextField
        placeholder={placeholder}
        size="small"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Icon name="search" />
              </InputAdornment>
            ),
          },
        }}
      />

      {components}

    </div>

  );


}
