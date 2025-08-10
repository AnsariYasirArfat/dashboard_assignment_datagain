import { PageHeader } from "@/components/appeal-letter/PageHeader";
import Calendar from "@/components/calendar/Calendar";

export default function Summary() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Summary" />
      <div className="bg-white dark:bg-black rounded-lg p-4 flex flex-col flex-1 min-h-0 overflow-auto">
        <Calendar />
      </div>
    </div>
  );
}
