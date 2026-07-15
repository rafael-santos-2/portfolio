"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import { Chip, TableCell } from "@mui/material";
import { Header } from "@/components/header";
import { IHeaderAction } from "@/components/header/header.type";
import Icon from "@/components/icon";
import { Table, TTableHeadCell } from "@/components/table";
import { PATHS } from "@/config/paths";
import { useTable } from "@/hooks/use-table";
import { stream_members } from "@/database/members/members";
import { useBoolean } from "minimal-shared/hooks";
import { useRouter } from "next/navigation";
import { IMember } from "@/types/database";
import { formatDateTime } from "@/utils/date";
import Popup_user from "@/widgets/popups/user/popup-user";


const MEMBER_HEAD_CELLS: TTableHeadCell[] = [
  { id: "firstName", label: "Naam", required: true },
  { id: "email",     label: "E-mail", required: true },
  { id: "role",      label: "Rol", required: true },
  { id: "is_active", label: "Status" },
  { id: "date_created", label: "Aangemaakt" },
];

type TMemberTab = "all" | "active" | "inactive";


export default function ViewMembersList(): JSX.Element {
  const createPopup = useBoolean(false);
  const ROUTER = useRouter();
  const TABLE = useTable();

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<IMember[]>([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TMemberTab>("all");

  const actions: IHeaderAction[] = [
    {
      fix: true,
      shape: "icon",
      variant: "outlined",
      label: "Member toevoegen",
      icon: <Icon name="plus" />,
      onClick: createPopup.onTrue,
    },
  ];

  const filteredMembers = useMemo(() => {
    const q = search.toLowerCase();
    return members.filter((m) => {
      const matchSearch =
        !q ||
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q);
      const matchTab =
        tab === "all" ||
        (tab === "active" && m.is_active) ||
        (tab === "inactive" && !m.is_active);
      return !m.is_deleted && matchSearch && matchTab;
    });
  }, [members, search, tab]);

  useEffect(() => {
    const unsubscribe = stream_members((data) => {
      setMembers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header title="Members" actions={actions} icon={<Icon name="user-group" />} />

      <Popup_user open={createPopup.value} onClose={createPopup.onFalse} />

      <Table<IMember>
        id="tester-members-list"
        table={TABLE}
        data={filteredMembers}
        totalCount={filteredMembers.length}
        loading={loading}
        headCells={MEMBER_HEAD_CELLS}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Zoek op naam, e-mail of rol..."
        tabs={[
          { value: "all",      label: "Alle members", count: members.filter((m) => !m.is_deleted).length },
          { value: "active",   label: "Actief",        count: members.filter((m) => !m.is_deleted && m.is_active).length },
          { value: "inactive", label: "Inactief",      count: members.filter((m) => !m.is_deleted && !m.is_active).length },
        ]}
        tabValue={tab}
        onTabChange={(v) => setTab(v as TMemberTab)}
        scrollRestore
        emptyText="Geen members gevonden."
        onRowClick={(row) => ROUTER.push(PATHS.PLATFORM.TESTER.MEMBER_DETAIL(row.id))}
        renderRow={(row, isVisible) => (
          <>
            {isVisible("firstName") && <TableCell>{`${row.firstName} ${row.lastName}`.trim()}</TableCell>}
            {isVisible("email")     && <TableCell>{row.email}</TableCell>}
            {isVisible("role")      && <TableCell>{row.role}</TableCell>}
            {isVisible("is_active") && (
              <TableCell>
                <Chip
                  label={row.is_active ? "Actief" : "Inactief"}
                  size="small"
                  color={row.is_active ? "success" : "default"}
                  variant={row.is_active ? "filled" : "outlined"}
                />
              </TableCell>
            )}
            {isVisible("date_created") && <TableCell>{formatDateTime(row.date_created)}</TableCell>}
          </>
        )}
      />
    </>
  );
}
