"use client";

export function DeltaLabel({ value }: { value: number }) {
  const sign = value >= 0 ? "+" : "";
  const color = value >= 0 ? "text-emerald-500" : "text-red-500";
  return (
    <>
      <span className={color}>{sign}{value}%</span> vs período anterior
    </>
  );
}
