"use client";

import { JSX } from "react";
import { Chip, Typography } from "@mui/material";
import { IMember } from "@/types/database";
import { formatDateTime } from "@/utils/date";
import { InfoItem } from "@/widgets/info/info-item";
import css from "./member-details-info.module.css";


export default function MemberDetailsInfo({ member }: { member: IMember }): JSX.Element {
  return (
    <div className={css.container}>
      <Typography variant="subtitle2">Member info</Typography>

      <div className={css.grid}>
        <InfoItem title="Volledige naam" value={`${member.firstName} ${member.lastName}`.trim()} />
        <InfoItem title="E-mail" value={member.email} copyable />
        <InfoItem title="Rol" value={member.role} />
        <InfoItem
          title="Status"
          value={
            <Chip
              label={member.is_active ? "Actief" : "Inactief"}
              size="small"
              color={member.is_active ? "success" : "default"}
              variant={member.is_active ? "filled" : "outlined"}
            />
          }
        />
        <InfoItem title="ID" value={member.id} copyable />
        <InfoItem title="Aangemaakt op" value={formatDateTime(member.date_created)} emptyLabel="Niet beschikbaar" />
        <InfoItem title="Laatst aangepast" value={formatDateTime(member.date_updated)} emptyLabel="Nog niet aangepast" />
        <InfoItem title="Aangemaakt door" value={member.id_creator} emptyLabel="Niet beschikbaar" />
      </div>
    </div>
  );
}
