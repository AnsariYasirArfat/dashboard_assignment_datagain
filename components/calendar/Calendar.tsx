"use client";
import dynamic from "next/dynamic";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { openAddDialog, openViewDialog } from "@/store/reducers/calendarSlice";
import { EventClickArg } from "@fullcalendar/core";
import CalendarDialog from "./CalendarDialog";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});

const typeColors = {
  event: {
    backgroundColor: "#3fc3ac",
    borderColor: "#3fc3ac",
    textColor: "#083a37",
  },
  reminder: {
    backgroundColor: "#f28372",
    borderColor: "#f28372",
    textColor: "#4a1f1a",
  },
};

export default function Calendar() {
  const items = useAppSelector((s) => s.calendar.items);
  const dispatch = useAppDispatch();

  const events = useMemo(
    () =>
      items.map((x) => ({
        id: x.id,
        title: x.title,
        start: x.start,
        end: x.end,
        allDay: x.allDay,
        ...typeColors[x.type],
        display: x.type === "reminder" ? "list-item" : "auto",
      })),
    [items]
  );

  const handleDateClick = (info: DateClickArg) => {
    console.log("Date click: ", info);
    const timeStr = !info.allDay
      ? `${info.date.getHours().toString().padStart(2, "0")}:${info.date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : undefined;

    dispatch(
      openAddDialog({
        dateStr: info.dateStr,
        allDay: info.allDay,
        date: info.date,
        timeStr,
      })
    );
  };

  const handleEventClick = (info: EventClickArg) => {
    console.log("event click : ", info);
    const item = items.find(x => x.id === info.event.id);
    if (item) {
      dispatch(openViewDialog(item));
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-white dark:bg-black p-2 responsive-calendar">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          height="100%"
          contentHeight="auto"
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          slotDuration="00:30:00"
          selectable
          dayMaxEventRows
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          windowResizeDelay={100}
          views={{
            dayGridMonth: {
              titleFormat: { year: 'numeric', month: 'long' },
              dayHeaderFormat: { weekday: 'short' },
            },
            timeGridWeek: {
              titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
              dayHeaderFormat: { weekday: 'short', day: 'numeric' },
            },
            timeGridDay: {
              titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
              dayHeaderFormat: { weekday: 'long' },
            },
            listMonth: {
              titleFormat: { year: 'numeric', month: 'long' },
            },
          }}
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week', 
            day: 'Day',
            list: 'List',
          }}
        />
      </div>

      <CalendarDialog />

      {/* Custom CSS for responsive design */}
      <style jsx global>{`
        .responsive-calendar {
          font-size: 14px;
        }
        
        /* Responsive header toolbar */
        @media (max-width: 768px) {
          .responsive-calendar .fc-header-toolbar {
            flex-direction: column;
            gap: 8px;
          }
          
          .responsive-calendar .fc-toolbar-chunk {
            display: flex;
            justify-content: center;
            width: 100%;
          }
          
          .responsive-calendar .fc-button {
            font-size: 12px;
            padding: 6px 12px;
            min-height: 32px;
          }
          
          .responsive-calendar .fc-toolbar-title {
            font-size: 18px !important;
            text-align: center;
          }
          
          .responsive-calendar .fc-day-header {
            font-size: 12px !important;
            padding: 4px 2px !important;
          }
          
          .responsive-calendar .fc-daygrid-day-number {
            font-size: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-calendar .fc-toolbar-title {
            font-size: 16px !important;
          }
          
          .responsive-calendar .fc-button {
            font-size: 11px;
            padding: 4px 8px;
            min-height: 28px;
          }
          
          .responsive-calendar .fc-day-header {
            font-size: 11px !important;
            padding: 2px 1px !important;
          }
          
          .responsive-calendar .fc-daygrid-day-number {
            font-size: 11px !important;
          }
        }
        
        /* Ensure proper time slot display for week/day views */
        .responsive-calendar .fc-timegrid-slot {
          min-height: 40px;
        }
        
        .responsive-calendar .fc-timegrid-slot-label {
          font-size: 12px;
        }
        
        /* Better mobile navigation */
        @media (max-width: 640px) {
          .responsive-calendar .fc-header-toolbar .fc-toolbar-chunk:last-child {
            order: -1;
          }
          
          .responsive-calendar .fc-header-toolbar .fc-toolbar-chunk:first-child {
            order: 1;
          }
        }
      `}</style>
    </>
  );
}
