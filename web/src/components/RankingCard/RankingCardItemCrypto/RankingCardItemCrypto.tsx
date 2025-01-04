"use client";
import { useState } from "react";

interface RankingCardItemCryptoProps {
  item: unknown;
  formatMarketCap: () => string;
  index: number;
}

export default function RankingCardItemCrypto({ item, formatMarketCap, index }: RankingCardItemCryptoProps) {
  const [img, setImage] = useState<string | [] | undefined>("/path-to-placeholder-image");

  return (
    <li
      key={index}
      className="flex items-center justify-between rounded-lg border-b border-b-[#F2F2F2] p-2 hover:bg-[#F2F2F2]"
    ></li>
  );
}
