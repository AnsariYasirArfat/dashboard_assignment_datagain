import { AppealLetterTable } from "@/components/appeal-letter/AppealLetterTable";
import { SearchAndFilters } from "@/components/appeal-letter/SearchAndFilters";
import { PageHeader } from "@/components/appeal-letter/PageHeader";

export default function HomePage() {
  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <PageHeader title="Appeal Letter" badge="05" />

      <div className="bg-white dark:bg-black rounded-lg p-4 flex flex-col flex-1 min-h-0">
        {/* Search and Filters */}
        <div className="flex-shrink-0 mb-6">
          <SearchAndFilters />
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0">
          <AppealLetterTable />
        </div>
      </div>
    </div>
  );
}
