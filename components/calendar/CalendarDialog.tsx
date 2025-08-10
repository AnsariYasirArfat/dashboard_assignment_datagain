"use client";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { closeDialog } from "@/store/reducers/calendarSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CalendarForm from "./CalendarForm";
import CalendarView from "./CalendarView";

export default function CalendarDialog() {
  const { dialog } = useAppSelector((s) => s.calendar);
  const dispatch = useAppDispatch();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeDialog());
    }
  };

  const renderContent = () => {
    switch (dialog.mode) {
      case "add":
      case "edit":
        return <CalendarForm />;
      case "view":
        return <CalendarView />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (dialog.mode) {
      case "add":
        return "Add to Calendar";
      case "edit":
        return "Edit Calendar Item";
      case "view":
        return "View Calendar Item";
      default:
        return "";
    }
  };

  return (
    <Dialog open={dialog.open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
