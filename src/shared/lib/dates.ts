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

export function formatRemaining(ms: number): string {
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const clock = [Math.floor((total % 86400) / 3600), Math.floor((total % 3600) / 60), total % 60]
    .map((v) => pad(v))
    .join(":");
  return days > 0 ? `${days} j ${clock}` : clock;
}

const relativeFormat = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });
const shortDateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });

export function formatRelative(date: Date, now: number): string {
  const seconds = Math.round((date.getTime() - now) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 60) return "à l'instant";
  if (abs < 3600) return relativeFormat.format(Math.trunc(seconds / 60), "minute");
  if (abs < 86400) return relativeFormat.format(Math.trunc(seconds / 3600), "hour");
  if (abs < 7 * 86400) return relativeFormat.format(Math.trunc(seconds / 86400), "day");
  return shortDateFormat.format(date);
}
