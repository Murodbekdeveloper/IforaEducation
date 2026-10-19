import ResultsView from "@/components/dashboard/ResultsView";
import { getResults, getRewards } from "@/lib/api";

export default async function ResultsPage() {
  const [results, rewards] = await Promise.all([getResults(), getRewards()]);

  return <ResultsView results={results} rewards={rewards} />;
}
