export type ParsedDateTime = {
  date: Date;
  time: string | null;
};

export function toBrazilISOString(date: Date, time: string): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}T${time}:00-03:00`;
}

export function parseISOToDateAndTime(value: string | null): ParsedDateTime | null {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  const match = value.match(/T(\d{2}:\d{2})/);
  return { date: d, time: match?.[1] ?? null };
}

export function add30Min(time: string): string {
  const [h = 0, m = 0] = time.split(":").map(Number);
  const total = h * 60 + m + 30;
  const nh = Math.floor(total / 60) % 24;
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

export function getCurrentSlot(): string {
  const now = new Date();
  const m = now.getMinutes();
  const h = now.getHours();
  const ceilM = Math.ceil(m / 30) * 30;
  const finalH = ceilM === 60 ? h + 1 : h;
  const finalM = ceilM === 60 ? 0 : ceilM;
  return `${String(finalH).padStart(2, "0")}:${String(finalM).padStart(2, "0")}`;
}

export function getTodayMidnight(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getEndsAtConstraints(startsAt: string) {
  const startsAtDate = startsAt ? new Date(startsAt) : null;
  const startsAtTime = startsAt?.match(/T(\d{2}:\d{2})/)?.[1];

  const rawTime = startsAtTime ? add30Min(startsAtTime) : undefined;

  if (rawTime === "00:00" && startsAtDate) {
    return {
      disabledBeforeDate: new Date(startsAtDate.getTime() + 86400000),
      disabledBeforeTime: undefined as string | undefined,
    };
  }

  return {
    disabledBeforeDate: startsAtDate ?? undefined,
    disabledBeforeTime: rawTime,
  };
}
