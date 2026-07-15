"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect, useState } from "react";
import { useTranslate } from "@/providers/language";
import { Table, TTableHeadCell , Icon , Header } from "@/components";
import { useFilters } from "@/hooks/use-filters";
import { useTable } from "@/hooks/use-table";
import { Checkbox, Chip, Stack, TableCell } from "@mui/material";
import { IUser, USER_ROLES } from "@/types/database";
import { formatUsername } from "@/utils/formatters";
import { formatDateTime } from "@/utils/date";
import { get_users } from "@/database/users/users";
import { useRouter } from "next/navigation";
import { useBoolean } from "minimal-shared/hooks";
import { IHeaderAction } from "@/components/header/header.type";
import Popup_user from "@/widgets/popups/user/popup-user";
import { ITableFilters, ITableUser } from "./view-team-list.type";
import { PATHS } from "@/config/paths";


export default function ViewTeamList(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  // const DEFAULT_ROWS_PER_PAGE = 10;
  const { t } = useTranslate();
  const { filters , changed , setFilter } = useFilters<ITableFilters>({ direction:"asc" , sort:"lastName" , page:0 });
  const ROUTER = useRouter();
  const TABLE = useTable({
    defaultOrderBy: filters.sort ?? "lastName",
    defaultOrder: filters.direction ?? "asc",
    defaultPage: filters.page ?? 0,
    defaultRowsPerPage: filters.rows ?? 10,
    onSort: (column, order) => { setFilter({sort:column , direction:order}); },
    onPage: (page, rowsPerPage) => { setFilter({ page:page , rows:rowsPerPage }); },
  });


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const createPopup = useBoolean(false);

  const [ loading , set_loading ] = useState<boolean>(true);
  const [ data , set_data ] = useState<ITableUser[]>([]);
  const [ total , set_total ] = useState<number>(0);
  // ----------------------------------------------------------------------------------------------------




  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function handleRowClick(row: IUser) {
    ROUTER.push(PATHS.PLATFORM.TEAM.DETAILS.ROOT(row.id));
  }

  async function handle_query(f:ITableFilters){
    try {

      set_loading(true);
      if( f.page !== TABLE.page ){ TABLE.onResetPage(); }
      
      const resp = await get_users<ITableUser>({
        addings:["invoice_reference"],
        filters:[
          ...(f.search ? [[
            { field:"firstName" , op:"regex" as const , value:`(?i)${f.search}` },
            { field:"lastName"  , op:"regex" as const , value:`(?i)${f.search}` },
          ]] : []),
          ...(f.role ? [
            { field:"role" , op:"==" as const , value:f.role },
          ] : []),
        ],
        sort:{ field:f.sort || "lastName" , direction:f.direction || "asc" },
        offset: (f.page || 0) * TABLE.rowsPerPage,
        limit: TABLE.rowsPerPage,
        count: true
      });

      set_data(resp.data);
      set_total(resp.total);

    } catch (error) {
      console.warn(error)
    } finally {

      set_loading(false);

    }
  }
  // ----------------------------------------------------------------------------------------------------





  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {

    // Initial call for first page with filters in URL
    // eslint-disable-next-line react-hooks/set-state-in-effect -- triggers the data query when url-driven filters change
    handle_query(changed);

    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally re-runs only when filters (changed) update, not on every handle_query re-creation
  }, [ changed ]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  const TEAM_HEAD_CELLS: TTableHeadCell[] = [
    { id: "lastName", label: "Naam", required: true },
    { id: "email", label: "E-mail", required: true },
    { id: "invoice_reference", label: "Factuur", required: true },
    { id: "role", label: "Rol", required: true },
    { id: "date_created", label: "Aangemaakt" },
  ];

  const TABS = [
    { value: "", label: "Alles" },
    ...USER_ROLES.map((r) => ({ value: r.value, label: r.label })),
  ];

  const ACTIONS:IHeaderAction[] = [
    {
      fix:true,
      variant:"contained",
      label: t("team.create.title"),
      icon: <Icon name="plus" />,
      onClick: createPopup.onTrue,
    }
  ];

  return (

    <>

      <Header title={t('team.title')} actions={ACTIONS} icon={<Icon name="user-group" />}/>

      <Popup_user open={createPopup.value} onClose={() => {createPopup.onFalse()}} />

      <Table<ITableUser>

        id="team-list"
        table={TABLE}
        headCells={TEAM_HEAD_CELLS}
        scrollRestore

        data={ data }
        loading={ loading }
        totalCount={ total }

        search={filters.search}
        searchPlaceholder="Zoek op naam"
        onSearchChange={(v) => { setFilter("search", v); }}

        tabs={TABS}
        tabValue={filters.role}
        onTabChange={(v) => { setFilter("role", v); }}

        onRowClick={(row) => handleRowClick(row)}
        renderRow={(row, isVisible, selection) => (
          <>
            {selection && (
              <TableCell sx={{ minWidth:20 }} width={20} padding="checkbox" onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={selection.selected} onChange={selection.onSelect} />
              </TableCell>
            )}
            <TableCell sx={{ minWidth:200 }} width={200} >
              <Stack direction="row" alignItems="center" gap={1}>
                {formatUsername(row)}
                {row.is_disabled && (
                  <Chip label={t("team.list.disabled")} size="small" color="warning" variant="outlined" />
                )}
              </Stack>
            </TableCell>
            <TableCell sx={{ minWidth:200 }} width={200}>{row.email}</TableCell>
            <TableCell sx={{ minWidth:100 }} width={100}>{row.invoice_reference}</TableCell>
            <TableCell sx={{ minWidth:100 }} width={100}>{row.role}</TableCell>
            {isVisible("date_created") && <TableCell sx={{ minWidth:100 }} width={100}>{formatDateTime(row.date_created)}</TableCell>}
          </>
        )}
      />

    </>

  )


}
