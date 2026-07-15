import { Popup } from "@/components/popup";
import { IPopupLogin } from "./popup-login.type";

import css from "./popup-login.module.css";
import Form_login from "@/widgets/forms/login/form-login";
import { Button, Stack, Typography } from "@mui/material";

export default function Popup_login({ open, onClose }: IPopupLogin) {
  return (
    <Popup
      open={open || false}
      style={{ width: 400 }}
      onClose={() => onClose?.(false)}
      position={{
        horizontal: { desktop: "center" },
        vertical: { desktop: "center" },
      }}
    >
      <div className={css.container}>
        <Stack gap={1} padding={3} paddingBottom={0}>
          <Typography variant="h3" textAlign="center">
            Sign in
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            textAlign="center"
          >
            Welcome back, login and see all your purchased products and much
            more.
          </Typography>
        </Stack>

        <Form_login onClose={onClose} />

        <Button fullWidth variant="text" color="inherit">
          No account yet? Register here!
        </Button>
      </div>
    </Popup>
  );
}
