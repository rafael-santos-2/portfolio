"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import { Header } from "@/components/header";
import Icon from "@/components/icon";
import { Loader } from "@/components/loader";
import { PATHS } from "@/config/paths";
import { stream_member } from "@/database/members/members";
import MemberDetails from "@/sections/members/details/member-details";
import { IMember } from "@/types/database";
import ViewEmpty from "@/views/general/empty/view-empty";

export default function ViewMemberDetails({ id }: { id: string }): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<IMember | null>(null);

  const full_name = useMemo(() => {
    if (!member) {
      return "";
    }
    return `${member.firstName} ${member.lastName}`.trim();
  }, [member]);

  useEffect(() => {
    const UNSUNBSCRIBE = stream_member(id, (data) => {
      setMember(data);
      setLoading(false);
    });

    return () => UNSUNBSCRIBE();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!member || member.is_deleted) {
    return (
      <ViewEmpty
        title="Member niet gevonden"
        actions={
          <Button
            LinkComponent={Link}
            href={PATHS.PLATFORM.TESTER.MEMBERS}
            variant="contained"
          >
            Terug naar members
          </Button>
        }
      />
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header
        back={PATHS.PLATFORM.TESTER.MEMBERS}
        icon={<Icon name="user-group" />}
        title={full_name || "Member details"}
      />

      <MemberDetails member={member} />
    </div>
  );
}
