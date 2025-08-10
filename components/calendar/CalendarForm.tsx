"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { addItem, updateItem, closeDialog, openViewDialog, CalendarItemType } from "@/store/reducers/calendarSlice";

const toISODate = (d: Date | string) =>
  (typeof d === "string" ? new Date(d) : d).toISOString().split("T")[0];

const combineISO = (date: string, time?: string) => {
  const t = time && time.length ? `${time}:00` : "00:00:00";
  return new Date(`${date}T${t}`).toISOString();
};

const addMinutes = (iso: string, minutes: number) =>
  new Date(new Date(iso).getTime() + minutes * 60000).toISOString();

export default function CalendarForm() {
  const dispatch = useAppDispatch();
  const { dialog } = useAppSelector((s) => s.calendar);
  
  const isEdit = dialog.mode === "edit";
  const editItem = dialog.selectedItem;
  
  const [itemType, setItemType] = useState<CalendarItemType>("event");
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
  const [remDuration, setRemDuration] = useState("15");

  useEffect(() => {
    if (isEdit && editItem) {
      // Populate form with existing data
      setItemType(editItem.type);
      setTitle(editItem.title);
      setAllDay(editItem.allDay || false);
      
      const startDate = new Date(editItem.start);
      setEvStartDate(toISODate(startDate));
      setRemDate(toISODate(startDate));
      
      if (!editItem.allDay) {
        setEvStartTime(`${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`);
        setRemTime(`${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`);
      }
      
      if (editItem.end) {
        const endDate = new Date(editItem.end);
        setEvEndDate(toISODate(endDate));
        if (!editItem.allDay) {
          setEvEndTime(`${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`);
        }
      }
    } else if (dialog.clickedDateInfo) {
      // New item from date click
      const d = toISODate(dialog.clickedDateInfo.dateStr);
      setEvStartDate(d);
      setEvEndDate(d);
      setRemDate(d);
      setAllDay(dialog.clickedDateInfo.allDay);
      
      if (!dialog.clickedDateInfo.allDay && dialog.clickedDateInfo.timeStr) {
        setEvStartTime(dialog.clickedDateInfo.timeStr);
        setRemTime(dialog.clickedDateInfo.timeStr);
      } else {
        setEvStartTime("");
        setRemTime("");
      }
    }
  }, [dialog.clickedDateInfo, isEdit, editItem]);

  const reset = () => {
    setItemType("event");
    setTitle("");
    setAllDay(true);
    setEvStartTime("");
    setEvEndTime("");
    setRemTime("");
    setRemDuration("15");
  };

  const handleSave = () => {
    const finalTitle = title.trim() || "(No title)";

    if (itemType === "event") {
      if (!evStartDate) return;
      if (!allDay && !evStartTime) return;

      const startISO = allDay
        ? new Date(evStartDate).toISOString()
        : combineISO(evStartDate, evStartTime);

      let endISO: string | undefined;
      if (allDay) {
        endISO = evEndDate ? new Date(evEndDate).toISOString() : undefined;
      } else {
        if (evEndDate && evEndTime) {
          endISO = combineISO(evEndDate, evEndTime);
          if (new Date(endISO) < new Date(startISO)) {
            endISO = addMinutes(startISO, 60);
          }
        } else {
          endISO = addMinutes(startISO, 60);
        }
      }

      const itemData = {
        title: finalTitle,
        start: startISO,
        end: endISO,
        allDay,
        type: "event" as const,
      };

      if (isEdit && editItem) {
        dispatch(updateItem({ ...itemData, id: editItem.id }));
        const updatedItem = { ...itemData, id: editItem.id };
        dispatch(closeDialog());
        dispatch(openViewDialog(updatedItem));
      } else {
        dispatch(addItem(itemData));
        dispatch(closeDialog());
      }
    } else {
      if (!remDate || !remTime) return;
      const startISO = combineISO(remDate, remTime);
      const duration = Math.max(5, parseInt(remDuration || "15", 10));
      const endISO = addMinutes(startISO, duration);

      const itemData = {
        title: finalTitle,
        start: startISO,
        end: endISO,
        allDay: false,
        type: "reminder" as const,
      };

      if (isEdit && editItem) {
        dispatch(updateItem({ ...itemData, id: editItem.id }));
        const updatedItem = { ...itemData, id: editItem.id };
        dispatch(closeDialog());
        dispatch(openViewDialog(updatedItem));
      } else {
        dispatch(addItem(itemData));
        dispatch(closeDialog());
      }
    }

    if (!isEdit) {
      reset();
    }
  };

  const handleCancel = () => {
    dispatch(closeDialog());
  };

  return (
    <>
      {/* Title Input - Always visible */}
      <div className="space-y-2">
        <Label>Title</Label>
        <Input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          maxLength={80} 
          placeholder="Event/Reminder title" 
        />
      </div>

      {/* Type Selection Buttons - Only for new items */}
      {!isEdit && (
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className={`${itemType === "event" ? "bg-custom-teal hover:bg-custom-teal/90" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
            onClick={() => setItemType("event")}
          >
            Event
          </Button>
          <Button 
            className={`${itemType === "reminder" ? "bg-custom-teal hover:bg-custom-teal/90" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
            onClick={() => setItemType("reminder")}
          >
            Reminder
          </Button>
        </div>
      )}

      {/* Event Form */}
      {itemType === "event" && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="allDay" 
              checked={allDay} 
              onCheckedChange={(checked) => setAllDay(checked as boolean)} 
            />
            <Label htmlFor="allDay">All Day</Label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Start date</Label>
              <Input 
                type="date" 
                value={evStartDate} 
                onChange={(e) => setEvStartDate(e.target.value)} 
              />
              {!allDay && (
                <Input 
                  type="time" 
                  value={evStartTime} 
                  onChange={(e) => setEvStartTime(e.target.value)} 
                />
              )}
            </div>
            <div className="space-y-2">
              <Label>End date (optional)</Label>
              <Input 
                type="date" 
                value={evEndDate} 
                onChange={(e) => setEvEndDate(e.target.value)} 
              />
              {!allDay && (
                <Input 
                  type="time" 
                  value={evEndTime} 
                  onChange={(e) => setEvEndTime(e.target.value)} 
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reminder Form */}
      {itemType === "reminder" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2 col-span-2">
              <Label>Date</Label>
              <Input 
                type="date" 
                value={remDate} 
                onChange={(e) => setRemDate(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input 
                type="time" 
                value={remTime} 
                onChange={(e) => setRemTime(e.target.value)} 
              />
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

      {/* Footer */}
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
        <Button className="bg-custom-teal hover:bg-custom-teal/90" onClick={handleSave}>
          {isEdit ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
}