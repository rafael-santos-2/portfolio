export function sortTableData<T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return order === "asc" ? 1 : -1;
    if (valueB == null) return order === "asc" ? -1 : 1;

    if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "boolean" && typeof valueB === "boolean") {
      return order === "asc" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
    }

    if (valueA instanceof Date && valueB instanceof Date) {
      return order === "asc" ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
    }

    if (Array.isArray(valueA) && Array.isArray(valueB)) {
      return order === "asc" ? valueA.length - valueB.length : valueB.length - valueA.length;
    }

    return 0;
  });
}