// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormProvider as RHFForm } from 'react-hook-form';

export type TFormProps = {
  onSubmit?: () => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<any>;
};

export function Form({ children, methods, className, onSubmit, style }:TFormProps): JSX.Element {


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

    <RHFForm {...methods}>
      <form onSubmit={onSubmit} noValidate autoComplete="off" style={style} className={className}>
        {children}
      </form>
    </RHFForm>

  )


}