"use client";
import dynamic from "next/dynamic";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useMemo, useState } from "react";
import { useAppSelector } from "@/store/hook";
import AddItemDialog from "./AddItemDialog";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clickedDateISO, setClickedDateISO] = useState<string | null>(null);

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
          dateClick={(info) => {
            setClickedDateISO(info.dateStr);
            setDialogOpen(true);
          }}
        />
      </div>

      <AddItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dateISO={clickedDateISO}
      />
    </>
  );
}
