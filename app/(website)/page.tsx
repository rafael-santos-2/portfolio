"use client";

import { Popup_confirm } from "@/components";
import Icon from "@/components/icon";
import { Popup, Popup_header } from "@/components/popup";
import { PATHS } from "@/config/paths";
import { Guard } from "@/guards";
import { usePopup } from "@/hooks/use-popup";
import Popup_login from "@/widgets/popups/login/popup-login";
import IconFlagCountry from "@/components/icon/assets/flag-country";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";


export default function Page(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const POPUP_LOGIN = usePopup<boolean>(<Popup_login />);
  const POPUP_CONFIRM = usePopup<boolean>(<Popup_confirm title="Delete test" description="This is a test for the deletion" />);
  const ROUTER = useRouter();


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [popup_test, set_popup_test] = useState(false);
  const [popup_test_2, set_popup_test_2] = useState(false);


  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function handle_delete(){

    try {
      
      const resp = await POPUP_CONFIRM.open({title:"New title"});
      console.log(resp)

    } catch (error) {
      console.error(error)
    }

  }
  async function handle_open_login() {
    try {

      const resp = await POPUP_LOGIN.open();
      if( resp ){ ROUTER.push(PATHS.PLATFORM.ROOT) }
      
    } catch (error) {
      console.error("Error opening login popup:", error);
    }
  }



  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
  
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100dvh", textAlign: "center", gap: "1rem" }}>
    
      Start page
      
      <br/>
      <br/>

      Redirect this to login or platform if no public pages are needed.

      <br/>
      <br/>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button LinkComponent={Link} href={PATHS.AUTH.SIGN_IN} variant="outlined">Go to login</Button>
        <Button LinkComponent={Link} href={PATHS.PLATFORM.ROOT} variant="contained">Go to platform</Button>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        Test popups

        <Button onClick={handle_open_login} variant="outlined">Login async</Button>
        <Button onClick={() => set_popup_test(true)} variant="outlined">Test sync</Button>

      </div>




      <Stack direction="row" gap={2} flexWrap="wrap" justifyContent="center" sx={{ borderTop: "1px solid lightgrey", pt: 2, width: "100%" }}>
        {["BE", "NL", "FR", "DE", "GB", "US", "JP", "BR", "ZA", "AU"].map((code) => (
          <Stack key={code} alignItems="center" gap={0.5}>
            <IconFlagCountry country={code} size={32} />
            <Typography variant="caption">{code}</Typography>
          </Stack>
        ))}
      </Stack>

      {/* <Popup_login open={popup_test} onClose={() => set_popup_test(false)} /> */}
      <Popup  open={popup_test} onClose={() => set_popup_test(false)}>

        <Popup_header variant="default" subtitle="Test me" title="Test popup" closeable actions={[

          { 
            fix: true,
            icon: <Icon name="camera" />,
            label: "Go to login",
            onClick: () => {},
            color: "primary",
            shape: "button"
          },
          {
            icon: <Icon name="camera" />,
            label: "Test",
            onClick: () => {},
            color:"inherit"

          },
          {
            icon: <Icon name="camera" />,
            label: "Test 2",
            onClick: () => {},
          },
          {
            icon: <Icon name="camera" />,
            label: "Test 3",
            onClick: () => {},
          },

        ]} />

        <Guard auth  >
          <Typography>This content is protected by auth guard. You should not see this if you are not authenticated.</Typography>
        </Guard>

        <Button onClick={handle_delete} >Delete me</Button>
        <Button onClick={() => set_popup_test_2(true)} >Open tweede popup</Button>

      </Popup>
      <Popup  open={popup_test_2} onClose={() => set_popup_test_2(false)} style={{ height:400 }}>
        Hellooooo
      </Popup>

    </div>
    
  )


}