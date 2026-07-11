import type { ExploreBeachItem } from "@/types/explore.type";
import { ResultCardEmpty, ResultCardItem } from "./ui/result-card-item";

interface ResultSectionProps {
  beaches: ExploreBeachItem[];
}

export function ResultSection({ beaches }: ResultSectionProps) {
  if (beaches.length === 0) {
    return <ResultCardEmpty />;
  }

  return (
    <>
      {beaches.map((beach) => (
        <ResultCardItem key={beach.id} beach={beach} />
      ))}
    </>
  );
}
