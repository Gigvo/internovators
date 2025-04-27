"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayPickerProps } from "react-day-picker";
import "react-day-picker/style.css";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: DayPickerProps) {
  // 1) Controlled month state
  const [month, setMonth] = React.useState<Date>(new Date());
  const prevMonth = new Date(month.getFullYear(), month.getMonth() - 1, 1);
  const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);

  return (
    <div className={cn("p-3 rounded-lg border", className)}>
      {/* 2) Hide the built-in nav */}
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        hideNavigation
        showOutsideDays={showOutsideDays}
        classNames={{
          // wrap / spacing
          months: "flex flex-col sm:flex-row gap-2",
          month: "flex flex-col gap-4",

          // caption + nav
          caption: "flex justify-center items-center relative pb-2",
          caption_label: "text-sm font-medium",
          nav: "flex items-center justify-center w-full",

          // table
          table: "w-full border-collapse table-fixed",

          // head row & cells
          head_row: "flex justify-between", // flex just for spacing
          head_cell:
            "w-8 text-center p-0 font-medium text-[0.8rem] text-muted-foreground",

          // each week row
          row: "flex justify-between mt-1",

          // day‐cells
          cell: cn(
            "p-0 text-center",
            props.mode === "range"
              ? "[&:has(>.day-range-start)]:rounded-l-md [&:has(>.day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),

          // the day button itself
          day_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
          ),

          // range + selected + today + outside + disabled
          day_range_start:
            "aria-selected:bg-primary aria-selected:text-primary-foreground",
          day_range_end:
            "aria-selected:bg-primary aria-selected:text-primary-foreground",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "text-muted-foreground aria-selected:text-muted-foreground",
          disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",

          // allow any overrides
          ...classNames,
        }}
        {...props}
      />

      {/* 3) Your Prev/Next buttons BELOW the grid */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setMonth(prevMonth)}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          onClick={() => setMonth(nextMonth)}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
