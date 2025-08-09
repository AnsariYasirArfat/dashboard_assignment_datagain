"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useAppDispatch } from "@/store/hook";
import { addItem, CalendarItemType } from "@/store/reducers/calendarSlice";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  dateISO: string | null;
}

const toISODate = (d: Date | string) =>
  (typeof d === "string" ? new Date(d) : d).toISOString().split("T")[0];

const combineISO = (date: string, time?: string) => {
  // time "HH:MM" → ISO; if missing, uses 00:00
  const t = time && time.length ? `${time}:00` : "00:00:00";
  return new Date(`${date}T${t}`).toISOString();
};

const addMinutes = (iso: string, minutes: number) =>
  new Date(new Date(iso).getTime() + minutes * 60000).toISOString();

export default function AddItemDialog({ open, onOpenChange, dateISO }: AddItemDialogProps) {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<CalendarItemType | null>(null);

  // Shared
  const [title, setTitle] = useState("");

  // Event fields
  const [allDay, setAllDay] = useState(true);
  const [evStartDate, setEvStartDate] = useState("");
  const [evStartTime, setEvStartTime] = useState("");
  const [evEndDate, setEvEndDate] = useState("");
  const [evEndTime, setEvEndTime] = useState("");

  // Reminder fields
  const [remDate, setRemDate] = useState("");
  const [remTime, setRemTime] = useState("");
  const [remDuration, setRemDuration] = useState("15"); // minutes

  useEffect(() => {
    if (dateISO) {
      const d = toISODate(dateISO);
      setEvStartDate(d);
      setEvEndDate(d);
      setRemDate(d);
      setAllDay(true);
      setEvStartTime("");
      setEvEndTime("");
      setRemTime("");
    }
  }, [dateISO]);

  const reset = () => {
    setMode(null);
    setTitle("");
    setAllDay(true);
    setEvStartTime("");
    setEvEndTime("");
    setRemTime("");
    setRemDuration("15");
  };

  const handleSave = () => {
    if (!mode) return;
    if (!title.trim()) return;

    if (mode === "event") {
      if (!evStartDate) return;
      if (!allDay && !evStartTime) return;

      const startISO = allDay
        ? new Date(evStartDate).toISOString()
        : combineISO(evStartDate, evStartTime);

      let endISO: string | undefined;
      if (allDay) {
        // allDay end optional; leave undefined or make same-day end
        endISO = evEndDate ? new Date(evEndDate).toISOString() : undefined;
      } else {
        if (evEndDate && evEndTime) {
          endISO = combineISO(evEndDate, evEndTime);
          if (new Date(endISO) < new Date(startISO)) {
            // if user inverted, auto-fix to +60 min
            endISO = addMinutes(startISO, 60);
          }
        } else {
          endISO = addMinutes(startISO, 60); // default 60 min
        }
      }

      dispatch(
        addItem({
          title: title.trim(),
          start: startISO,
          end: endISO,
          allDay,
          type: "event",
        })
      );
    } else {
      // reminder: a timed point with small duration
      if (!remDate || !remTime) return;
      const startISO = combineISO(remDate, remTime);
      const duration = Math.max(5, parseInt(remDuration || "15", 10));
      const endISO = addMinutes(startISO, duration);

      dispatch(
        addItem({
          title: title.trim(),
          start: startISO,
          end: endISO,
          allDay: false,
          type: "reminder",
        })
      );
    }

    onOpenChange(false);
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode ? (mode === "event" ? "Add Event" : "Add Reminder") : "Add to calendar"}
          </DialogTitle>
        </DialogHeader>

        {!mode ? (
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-custom-teal hover:bg-custom-teal/90" onClick={() => setMode("event")}>
              Add Event
            </Button>
            <Button variant="outline" onClick={() => setMode("reminder")}>
              Add Reminder
            </Button>
          </div>
        ) : mode === "event" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} placeholder="Event title" />
            </div>

            <div className="space-y-2">
              <Label>All Day</Label>
              <Select value={allDay ? "yes" : "no"} onValueChange={(v) => setAllDay(v === "yes")}>
                <SelectTrigger><SelectValue placeholder="All day?" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Start date</Label>
                <Input type="date" value={evStartDate} onChange={(e) => setEvStartDate(e.target.value)} />
                {!allDay && (
                  <Input type="time" value={evStartTime} onChange={(e) => setEvStartTime(e.target.value)} />
                )}
              </div>
              <div className="space-y-2">
                <Label>End date (optional)</Label>
                <Input type="date" value={evEndDate} onChange={(e) => setEvEndDate(e.target.value)} />
                {!allDay && (
                  <Input type="time" value={evEndTime} onChange={(e) => setEvEndTime(e.target.value)} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} placeholder="Reminder title" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2 col-span-2">
                <Label>Date</Label>
                <Input type="date" value={remDate} onChange={(e) => setRemDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" value={remTime} onChange={(e) => setRemTime(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={remDuration} onValueChange={(v) => setRemDuration(v)}>
                <SelectTrigger><SelectValue placeholder="Duration (min)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 min</SelectItem>
                  <SelectItem value="10">10 min</SelectItem>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          {mode && <Button className="bg-custom-teal hover:bg-custom-teal/90" onClick={handleSave}>Save</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
