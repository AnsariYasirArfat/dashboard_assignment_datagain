"use client";

import { PageHeader } from "@/components/appeal-letter/PageHeader";
import { AppealLetterForm } from "@/components/appeal-letter/AppealLetterForm";
import { useAppSelector } from "@/store/hook";
import { useEffect, useState } from "react";
import { AppealData } from "@/data/appeal-letter";

interface EditAppealLetterProps {
  params: {
    letterId: string;
  };
}

export default function EditAppealLetter({ params }: EditAppealLetterProps) {
  const { letterId } = params;
  const [appealData, setAppealData] = useState<AppealData | null>(null);
  const { data } = useAppSelector((state) => state.appealLetter);

  useEffect(() => {
    const foundData = data.find((item) => item.id === letterId);
    if (foundData) {
      setAppealData(foundData);
    }
  }, [letterId, data]);

  if (!appealData) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader title="Edit Appeal Letter" />
        <div className="bg-white dark:bg-black rounded-lg p-4 flex flex-col flex-1 min-h-0">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Edit Appeal Letter" />
      <div className="bg-white dark:bg-black rounded-lg p-4 flex flex-col flex-1 min-h-0">
        <AppealLetterForm mode="edit" initialData={appealData} />
      </div>
    </div>
  );
}
