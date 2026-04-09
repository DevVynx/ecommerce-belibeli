"use client";
import { useEffect, useState } from "react";

type FlashSaleTimerProps = {
  endDate: string;
};

const formatDigit = (digit: number) => digit.toString().padStart(2, "0");

export const FlashSaleTimer = ({ endDate }: FlashSaleTimerProps) => {
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const formatedDate = new Date(endDate).getTime();
    if (!formatedDate) return;

    const interval = setInterval(() => {
      const diff = formatedDate - Date.now();
      setTimer({
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex items-center gap-1">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 font-bold text-white">
        {formatDigit(timer.hours)}
      </span>
      <span className="text-lg font-bold text-red-500">:</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 font-bold text-white">
        {formatDigit(timer.minutes)}
      </span>
      <span className="text-lg font-bold text-red-500">:</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 font-bold text-white">
        {formatDigit(timer.seconds)}
      </span>
    </div>
  );
};
