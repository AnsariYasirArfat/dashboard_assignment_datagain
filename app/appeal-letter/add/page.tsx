import { PageHeader } from "@/components/appeal-letter/PageHeader";
import { AppealLetterForm } from "@/components/appeal-letter/AppealLetterForm";

export default function AddAppealLetter() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Add Appeal Letter" />
      <div className="bg-white dark:bg-black rounded-lg p-4 flex flex-col flex-1 min-h-0">
        <AppealLetterForm mode="add" />
      </div>
    </div>
  );
}
