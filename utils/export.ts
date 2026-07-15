// EXAMPLE
// ----------------------------------------------------------------------------------------------------
//
//  const columns = ['Naam', 'Email', 'Status'];
//  const rows    = users.map(u => [u.name, u.email, u.is_active ? 'Actief' : 'Inactief']);
//  export_csv('users_export_20250420.csv', columns, rows);
//
// ----------------------------------------------------------------------------------------------------

export function export_csv(filename: string, columns: string[], rows: (string | number | boolean | null | undefined)[][]): void {
  const csv = [columns, ...rows]
    .map(row => row.map(val => String(val ?? '')).join(';'))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ----------------------------------------------------------------------------------------------------
