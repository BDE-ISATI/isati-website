function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function parsePbDate(iso?: string): Date | null {
  if (!iso) return null;
  const date = new Date(iso.replace(" ", "T"));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function toDateTimeInput(iso?: string): string {
  const date = parsePbDate(iso);
  if (!date) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function fromDateTimeInput(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}
