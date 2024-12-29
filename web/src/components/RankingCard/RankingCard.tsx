import { twMerge } from "tailwind-merge";

import RankingCardItem from "./RankingCardItem/RankingCardItem";

interface RankingCardProps {
  title: string;
  data: unknown[];
  onViewAll: () => void;
  styleRankingCard?: string;
}

export default function RankingCard({ title, data, onViewAll, styleRankingCard }: RankingCardProps) {
  function formatMarketCap(value) {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else {
      return value.toLocaleString();
    }
  }

  return (
    <div className={twMerge("w-full rounded-lg border p-4 shadow-sm", styleRankingCard)}>
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          className="rounded-md border px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
          onClick={onViewAll}
        >
          View All
        </button>
      </header>

      <ul className="space-y-4 overflow-y-auto">
        {data.map((item, index) => (
          <RankingCardItem item={item} formatMarketCap={formatMarketCap} index={index} key={index} />
        ))}
      </ul>
    </div>
  );
}
