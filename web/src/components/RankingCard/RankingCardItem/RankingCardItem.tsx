"use client";
import { ArrowDownLeft, ArrowUpRight, Building2 } from "lucide-react";
import { useEffect, useState } from "react";

import { getLogo } from "@/api/getLogo";
import { useMutationHook } from "@/hook/useMutationHook";
import { logoNameMapping } from "@/util/logoNameMapping";

interface RankingCardItemProps {
  item: unknown;
  formatMarketCap: () => string;
  index: number;
}

export default function RankingCardItem({ item, formatMarketCap, index }: RankingCardItemProps) {
  const [img, setImage] = useState<string | undefined>("/path-to-placeholder-image");

  const { mutateAsync, isLoading } = useMutationHook({
    mutationFn: getLogo,
    mutationKey: ["query-logo", item.name],
    gcTime: Infinity,
    options: {
      onMutate: (variables) => {
        console.log(variables);
      },
      onSuccess: (data) => {
        if (data && data[0]?.icon) {
          setImage(data[0].icon);
        }
      },
    },
  });

  useEffect(() => {
    if (item.name) {
      console.log(logoNameMapping[item.name]);
      mutateAsync({ name: logoNameMapping[item.name] || item.name.split(" ")[0] });
    }
  }, [item.name, mutateAsync]);

  return (
    <li
      key={index}
      className="flex items-center justify-between rounded-lg border-b border-b-[#F2F2F2] p-2 hover:bg-[#F2F2F2]"
    >
      <div className="flex items-center gap-2">
        {isLoading || img === "/path-to-placeholder-image" ? (
          <Building2 size={28} />
        ) : (
          <img src={img} alt={item.name} className="h-8 w-8 rounded-full" />
        )}
        <div>
          <h3 className="text-sm">{item.stock}</h3>
          <p className="text-[10px] text-gray-500">{item.name}</p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="text-sm font-semibold text-green-500">R${item.close}</p>

        <div className="flex items-center gap-[2px]">
          <p className="text-[10px]">{item.change.toFixed(2)}%</p>
          {item.change > 0 ? <ArrowUpRight size={10} /> : <ArrowDownLeft size={10} />}
        </div>
      </div>

      <span className="w-16 text-right text-base font-semibold">{formatMarketCap(item.market_cap)}</span>
    </li>
  );
}
