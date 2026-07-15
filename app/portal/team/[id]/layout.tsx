"use client";

import Icon from "@/components/icon";
import { Loader } from '@/components/loader';
import { PATHS } from "@/config/paths";
import { delete_user, disable_user, stream_user } from "@/database/users/users";
import { useTranslate } from "@/providers/language";
import { IUser } from "@/types/database";
import { formatUsername } from "@/utils/formatters";
import ViewEmpty from "@/views/general/empty/view-empty";
import { Header } from '@/components/header';
import { Button } from "@mui/material";
import { useBoolean } from "minimal-shared/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, ReactNode, use, useEffect, useState } from "react";
import { toast } from "sonner";
import { IHeaderAction } from "@/components/header/header.type";
import { usePopup } from "@/hooks/use-popup";
import { Popup_confirm } from "@/components";


export default function LayoutPlatformTeam({ children, params }: { children: ReactNode, params: Promise<{ id: string }> }): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { id } = use(params);
  const { t } = useTranslate();
  const ROUTER = useRouter();
  const POPUP_DELETE = usePopup<boolean>(<Popup_confirm title="Delete" description="Are you sure you want to delete this user" />);
  const POPUP_DISABLE = usePopup<boolean>(<Popup_confirm title="Disable" description="Are you sure you want to disable this user" />);


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const loading = useBoolean(false);
  const [user, setUser] = useState<IUser | null>(null);

  const popupDelete = useBoolean(false);
  const deleting = useBoolean(false);

  const popupDisable = useBoolean(false);
  const disabling = useBoolean(false);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function handle_delete(): Promise<void> {
    try {

      deleting.onTrue();

      const resp = await POPUP_DELETE.open();
      if( !resp ) return;
      
      await delete_user(id);
      toast.success(t("team.details.toasts.deleteSuccess"));
      ROUTER.push(PATHS.PLATFORM.TEAM.ROOT);

    } catch (error) {
      console.error("[TEAM LAYOUT] Cannot delete user.", error);
      toast.error(t("team.details.toasts.deleteError"));
    } finally {
      deleting.onFalse();
      popupDelete.onFalse();
    }
  }

  async function handle_disable(): Promise<void> {

    if ( !user ) { return; }
    try {
      disabling.onTrue();
      const shouldDisable = !user.is_disabled;

      const resp = await POPUP_DISABLE.open({
        title: user.is_disabled ? t("team.details.confirm.enable.title", { name: formatUsername(user) }) : t("team.details.confirm.disable.title", { name: formatUsername(user) }),
        description: user.is_disabled ? t("team.details.confirm.enable.description", { name: formatUsername(user) }) : t("team.details.confirm.disable.description", { name: formatUsername(user) })
      });
      if( !resp ) return;
      
      await disable_user(id, shouldDisable);
      toast.success(shouldDisable ? t("team.details.toasts.disableSuccess") : t("team.details.toasts.enableSuccess"));

    } catch (error) {
      console.error("[TEAM LAYOUT] Cannot toggle user disabled state.", error);
      toast.error(user.is_disabled ? t("team.details.toasts.enableError") : t("team.details.toasts.disableError"));
    } finally {
      disabling.onFalse();
      popupDisable.onFalse();
    }

  }


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    const stream = stream_user(id, (data) => { setUser(data); loading.onFalse(); });
    return () => stream();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  if (loading.value) { return <Loader /> }
  if (!user) {
    return (
      <ViewEmpty
        title={t("team.details.notFound")}
        actions={
          <Button LinkComponent={Link} href={PATHS.PLATFORM.TEAM.ROOT} variant="contained" color="primary">
            {t("team.details.return")}
          </Button>
        }
      />
    )
  }

  const ACTIONS: IHeaderAction[] = [
    {
      color: user.is_disabled ? "success" : "warning",
      fix: false,
      icon: <Icon name="ban" />,
      label: user.is_disabled ? t("team.details.enable") : t("team.details.disable"),
      disabled: !user || disabling.value,
      onClick: handle_disable,
      variant: "text",
    },
    {
      color: "error",
      fix: false,
      icon: <Icon name="trash" />,
      label: t("team.details.delete"),
      disabled: !user,
      onClick: handle_delete,
      variant: "text",
    },
  ];

  return (

    <>

      <Header back icon={<Icon name="user-group" />} title={t("team.details.title", { name: formatUsername(user) })} actions={ACTIONS} />

      {children}

    </>

  )


}
