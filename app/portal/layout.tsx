// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from "react";
import LayoutPlatformComponent from "@/layouts/platform/layout-platform";
import { Guard } from "@/guards";

export default async function LayoutPlatform({ children }:{children: React.ReactNode}): Promise<JSX.Element> {


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
  
    <Guard auth>

      <LayoutPlatformComponent>

        {children}

      </LayoutPlatformComponent>
    
    </Guard>
    
  )


}