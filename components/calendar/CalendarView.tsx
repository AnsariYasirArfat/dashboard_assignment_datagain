"use client";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { openEditDialog, deleteItem, closeDialog } from "@/store/reducers/calendarSlice";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function CalendarView() {
  const { dialog } = useAppSelector((s) => s.calendar);
  const dispatch = useAppDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const item = dialog.selectedItem;
  if (!item) return null;

  const handleEdit = () => {
    dispatch(openEditDialog(item));
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteItem(item.id));
    dispatch(closeDialog());
    setShowDeleteConfirm(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const formatDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      if (item.allDay) {
        return format(date, "MMM dd, yyyy");
      }
      return format(date, "MMM dd, yyyy 'at' h:mm a");
    } catch {
      return isoString;
    }
  };

  return (
    <>
      {/* Header with actions */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {item.type === "event" ? "Event" : "Reminder"} Details
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="p-2 h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteClick}
            className="p-2 h-8 w-8 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <p className="text-lg font-semibold">{item.title}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
          <p className="capitalize">{item.type}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start</label>
          <p>{formatDateTime(item.start)}</p>
        </div>

        {item.end && (
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End</label>
            <p>{formatDateTime(item.end)}</p>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">All Day</label>
          <p>{item.allDay ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end pt-4">
        <Button onClick={() => dispatch(closeDialog())}>Close</Button>
      </div>

      
      <ConfirmModal
        open={showDeleteConfirm}
        title="Delete Calendar Item"
        description={`Are you sure you want to delete "${item.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}