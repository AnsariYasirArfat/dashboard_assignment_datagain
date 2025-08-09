import { PageHeader } from "@/components/appeal-letter/PageHeader";

export default function Summary() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Summary" />
      <div className="bg-white dark:bg-black rounded-lg p-4 flex flex-col flex-1 min-h-0">
        {/* Summary content goes here */}
      </div>
    </div>
  );
}
