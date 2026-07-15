"use client";

import { Loader } from '@/components/loader';
import { IUser } from "@/types/database";
import { useBoolean } from "minimal-shared/hooks";
import { JSX, useEffect, useState } from "react";
import ViewEmpty from "../general/empty/view-empty";
import { Button } from "@mui/material";
import Link from "next/link";
import { PATHS } from "@/config/paths";
import { useTranslate } from "@/providers/language";
import TeamDetails from "@/sections/team/details/team-details";
import { stream_user } from "@/database/users/users";


export default function ViewTeamDetails({ id }: { id:string }): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const loading = useBoolean(true);
  const [user, setUser] = useState<IUser | null>(null);
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
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
  return <TeamDetails user={user} />


}