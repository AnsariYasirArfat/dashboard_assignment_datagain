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
      <div className="rounded-lg border bg-white dark:bg-black p-2">
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
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          selectable
          dayMaxEventRows
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>

      <CalendarDialog />
    </>
  );
}
