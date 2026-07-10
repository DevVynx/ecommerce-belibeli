import * as PopoverPrimitive from "@radix-ui/react-popover";
import { format, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/shared/components/shadcn-ui/button";
import { Calendar } from "@/shared/components/shadcn-ui/calendar";
import { Popover, PopoverTrigger } from "@/shared/components/shadcn-ui/popover";
import { ScrollArea } from "@/shared/components/shadcn-ui/scroll-area";
import { parseISOToDateAndTime, toBrazilISOString } from "@/shared/utils/date/dateTimeISO";
import { cn } from "@/shared/utils/lib/utils";

const PopoverContentNoPortal = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-[--radix-popover-content-transform-origin] rounded-md border p-4 shadow-md outline-none",
      className
    )}
    {...props}
  />
));
PopoverContentNoPortal.displayName = PopoverPrimitive.Content.displayName;

function generateTimeSlots(disabledBeforeTime?: string) {
  const slots: { time: string; available: boolean }[] = [];

  if (!disabledBeforeTime) {
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        slots.push({
          time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
          available: true,
        });
      }
    }
    return slots;
  }

  const [bh = 0, bm = 0] = disabledBeforeTime.split(":").map(Number);

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      slots.push({ time, available: h > bh || (h === bh && m >= bm) });
    }
  }

  return slots;
}

type DateTimePickerProps = {
  value: string | null;
  onChange: (iso: string | null) => void;
  minDate?: Date;
  disabledBeforeTime?: string;
  disabledBeforeDate?: Date;
  defaultTime?: string;
  placeholder?: string;
  hideAgora?: boolean;
  disabled?: boolean;
};

export function DateTimePicker({
  value,
  onChange,
  minDate,
  disabledBeforeTime,
  disabledBeforeDate,
  defaultTime = "00:00",
  placeholder = "Selecionar data",
  hideAgora = false,
  disabled = false,
}: DateTimePickerProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const isInternalRef = useRef(false);

  const parsed = parseISOToDateAndTime(value);
  const [selectedDate, setSelectedDate] = useState<Date>(parsed?.date ?? new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(parsed?.time ?? null);

  useEffect(() => {
    if (isInternalRef.current) {
      isInternalRef.current = false;
      return;
    }
    const p = parseISOToDateAndTime(value);
    if (p) {
      setSelectedDate(p.date);
      setSelectedTime(p.time);
    }
  }, [value]);

  const sameDay =
    selectedDate && disabledBeforeDate ? isSameDay(selectedDate, disabledBeforeDate) : false;

  const effectiveDisabledTime = sameDay ? disabledBeforeTime : undefined;
  const timeSlots = generateTimeSlots(effectiveDisabledTime);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) return;
    setSelectedDate(newDate);
    setSelectedTime(null);

    const isToday = disabledBeforeDate ? isSameDay(newDate, disabledBeforeDate) : false;
    const time = isToday && disabledBeforeTime ? disabledBeforeTime : defaultTime;
    const iso = toBrazilISOString(newDate, time);
    isInternalRef.current = true;
    onChange(iso);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    const iso = toBrazilISOString(selectedDate, time);
    isInternalRef.current = true;
    onChange(iso);
    setOpen(false);
  };

  const handleAgora = () => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    setSelectedDate(date);
    setSelectedTime(time);
    const iso = toBrazilISOString(date, time);
    isInternalRef.current = true;
    onChange(iso);
    setOpen(false);
  };

  const showAgora =
    !hideAgora && disabledBeforeDate && isSameDay(new Date(disabledBeforeDate), new Date());

  return (
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            id={id}
            variant="outline"
            disabled={disabled}
            className={cn(
              "group/pick-date w-full justify-between font-normal",
              !parsed && "text-muted-foreground"
            )}
          >
          <span className="truncate">
            {parsed ? `${format(parsed.date, "dd/MM/yyyy")} ${parsed.time}` : placeholder}
          </span>
          <CalendarIcon
            aria-hidden="true"
            className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContentNoPortal align="start" className="w-auto p-0">
        <div className="flex max-sm:flex-col">
          <Calendar
            locale={ptBR}
            disabled={minDate ? [{ before: minDate }] : undefined}
            mode="single"
            onSelect={handleDateSelect}
            selected={selectedDate}
          />
          <div className="relative w-full max-sm:h-48 sm:w-40">
            <div className="absolute inset-0 py-4 max-sm:border-t">
              <ScrollArea className="h-full sm:border-s">
                <div className="space-y-3">
                  <div className="flex h-5 shrink-0 items-center px-5">
                    <p className="text-sm font-medium">
                      {format(selectedDate, "EEEE, d", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                    {showAgora && (
                      <Button
                        type="button"
                        size="sm"
                        variant={selectedTime === null ? "default" : "outline"}
                        className="w-full text-sm font-semibold"
                        onClick={handleAgora}
                      >
                        Agora
                      </Button>
                    )}
                    {timeSlots.map(({ time, available }) => (
                      <Button
                        type="button"
                        key={time}
                        size="sm"
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full"
                        disabled={!available}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </PopoverContentNoPortal>
    </Popover>
  );
}
