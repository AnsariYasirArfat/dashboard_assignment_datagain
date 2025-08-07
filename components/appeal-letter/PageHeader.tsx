import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  title: string;
  badge?: string;
}
export function PageHeader({ title, badge }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-custom-teal border-b-4 pb-4 w-fit ms-4 mt-4">
      <h1 className="text-base font-semibold ">{title}</h1>
      {badge && (
        <Badge
          variant="destructive"
          className="bg-custom-red text-white text-xs px-2 py-0.5 rounded-full"
        >
          {badge}
        </Badge>
      )}
    </div>
  );
}
