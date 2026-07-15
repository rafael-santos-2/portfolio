'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import { Chip, TableCell } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Table, TTableHeadCell } from '@/components/table';
import { PATHS } from '@/config/paths';
import { useTable } from '@/hooks/use-table';


// TYPES
// ----------------------------------------------------------------------------------------------------
type TRow = {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive';
  age: number;
};


// DATA
// ----------------------------------------------------------------------------------------------------
const DUMMY_ROWS: TRow[] = [
  { id: '1',  name: 'Jan Janssen',       role: 'Admin',  status: 'active',   age: 34 },
  { id: '2',  name: 'Lien Pieters',      role: 'Editor', status: 'active',   age: 28 },
  { id: '3',  name: 'Tom De Smedt',      role: 'Viewer', status: 'inactive', age: 45 },
  { id: '4',  name: 'Sara Claes',        role: 'Admin',  status: 'active',   age: 31 },
  { id: '5',  name: 'Wout Bergmans',     role: 'Editor', status: 'inactive', age: 52 },
  { id: '6',  name: 'Nathalie Meys',     role: 'Viewer', status: 'active',   age: 27 },
  { id: '7',  name: 'Dries Van Acker',   role: 'Admin',  status: 'active',   age: 39 },
  { id: '8',  name: 'Elisa Storms',      role: 'Editor', status: 'inactive', age: 23 },
  { id: '9',  name: 'Pieter Declercq',   role: 'Viewer', status: 'active',   age: 41 },
  { id: '10', name: 'Karen Vermeersch',  role: 'Admin',  status: 'inactive', age: 36 },
  { id: '11', name: 'Bram Goossens',     role: 'Editor', status: 'active',   age: 29 },
  { id: '12', name: 'Ines Van den Berg', role: 'Viewer', status: 'active',   age: 33 },
  { id: '13', name: 'Mathieu Jacobs',    role: 'Admin',  status: 'inactive', age: 48 },
  { id: '14', name: 'Sophie Claerhout',  role: 'Editor', status: 'active',   age: 25 },
  { id: '15', name: 'Axel Maes',         role: 'Viewer', status: 'inactive', age: 57 },
  { id: '16', name: 'Laura Desmet',      role: 'Admin',  status: 'active',   age: 32 },
  { id: '17', name: 'Robbe Hendrickx',   role: 'Editor', status: 'active',   age: 22 },
  { id: '18', name: 'Amber Willems',     role: 'Viewer', status: 'inactive', age: 44 },
  { id: '19', name: 'Cedric Bogaert',    role: 'Admin',  status: 'active',   age: 38 },
  { id: '20', name: 'Fien De Wolf',      role: 'Editor', status: 'active',   age: 30 },
  { id: '21', name: 'Nicolas Peeters',   role: 'Viewer', status: 'inactive', age: 53 },
  { id: '22', name: 'Hanne Claes',       role: 'Admin',  status: 'active',   age: 26 },
  { id: '23', name: 'Jonas Leclercq',    role: 'Editor', status: 'active',   age: 35 },
  { id: '24', name: 'Elien Vande Velde', role: 'Viewer', status: 'inactive', age: 42 },
  { id: '25', name: 'Arthur Nijs',       role: 'Admin',  status: 'active',   age: 27 },
  { id: '26', name: 'Tine Baert',        role: 'Editor', status: 'inactive', age: 49 },
  { id: '27', name: 'Stef Cools',        role: 'Viewer', status: 'active',   age: 31 },
  { id: '28', name: 'Jolien Aerts',      role: 'Admin',  status: 'active',   age: 24 },
  { id: '29', name: 'Maxim De Backer',   role: 'Editor', status: 'inactive', age: 46 },
  { id: '30', name: 'Charlotte Hermans', role: 'Viewer', status: 'active',   age: 37 },
  { id: '31', name: 'Ruben Vandenberghe',role: 'Admin',  status: 'inactive', age: 55 },
  { id: '32', name: 'Katrien Smeets',    role: 'Editor', status: 'active',   age: 28 },
  { id: '33', name: 'Tibo Lemmens',      role: 'Viewer', status: 'active',   age: 33 },
  { id: '34', name: 'Flore Pieters',     role: 'Admin',  status: 'inactive', age: 40 },
  { id: '35', name: 'Warre De Groote',   role: 'Editor', status: 'active',   age: 23 },
  { id: '36', name: 'Noor Stevens',      role: 'Viewer', status: 'active',   age: 29 },
  { id: '37', name: 'Lander Michiels',   role: 'Admin',  status: 'inactive', age: 51 },
  { id: '38', name: 'Yara Van Damme',    role: 'Editor', status: 'active',   age: 26 },
  { id: '39', name: 'Simon Wouters',     role: 'Viewer', status: 'inactive', age: 43 },
  { id: '40', name: 'Silke Dubois',      role: 'Admin',  status: 'active',   age: 35 },
];

const HEAD_CELLS: TTableHeadCell[] = [
  { id: 'name',   label: 'Name' },
  { id: 'role',   label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'age',    label: 'Age' },
];


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsTable(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const ROUTER = useRouter();
  const TABLE = useTable();

  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');


  // COMPUTED
  // ----------------------------------------------------------------------------------------------------

  const filtered = DUMMY_ROWS.filter((r) => {
    const matchTab = tab === 'all' || r.status === tab;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.role.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Header title="Table" />

      {/* Table */}
      <Table<TRow>
        id="components-table-test"
        data={filtered}
        totalCount={filtered.length}
        table={TABLE}
        headCells={HEAD_CELLS}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or role..."
        tabs={[
          { value: 'all',      label: 'All',      count: DUMMY_ROWS.length },
          { value: 'active',   label: 'Active',   count: DUMMY_ROWS.filter(r => r.status === 'active').length },
          { value: 'inactive', label: 'Inactive', count: DUMMY_ROWS.filter(r => r.status === 'inactive').length },
        ]}
        tabValue={tab}
        onTabChange={setTab}
        onRowClick={(row) => ROUTER.push(PATHS.PLATFORM.COMPONENTS.TABLE_DETAIL(row.id))}
        scrollRestore
        renderRow={(row, isVisible) => (
          <>
            {isVisible('name')   && <TableCell>{row.name}</TableCell>}
            {isVisible('role')   && <TableCell>{row.role}</TableCell>}
            {isVisible('status') && (
              <TableCell>
                <Chip
                  label={row.status}
                  size="small"
                  color={row.status === 'active' ? 'success' : 'default'}
                />
              </TableCell>
            )}
            {isVisible('age') && <TableCell>{row.age}</TableCell>}
          </>
        )}
      />

    </div>
  );

}
