/**
 * Converts headers + rows into a well-formed CSV string, quoting any field
 * that contains a comma, quote, or newline.
 */
export function arrayToCsv(headers: string[], rows: Array<Array<string | number>>): string {
  const escapeCell = (value: string | number): string => {
    const stringValue = String(value);
    return /[",\n]/.test(stringValue)
      ? `"${stringValue.replace(/"/g, '""')}"`
      : stringValue;
  };

  const lines = [
    headers.map(escapeCell).join(","),
    ...rows.map((row) => row.map(escapeCell).join(",")),
  ];

  return lines.join("\n");
}

/** Triggers a browser download of the given CSV content as `filename`. */
export function downloadCsv(filename: string, csvContent: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
