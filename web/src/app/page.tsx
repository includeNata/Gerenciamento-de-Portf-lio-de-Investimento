"use client";
import { Medal, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import handler from "@/api/rss";
import RankingCard from "@/components/RankingCard/RankingCard";
import Title from "@/components/Title/Title";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await handler();
      setItems(response);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <header className="fixed top-0 z-10 flex w-full items-center justify-between border-b border-b-[#9265E2] px-8 py-2">
        <div className="h-6 w-6 rounded-full bg-gray-600"></div>

        <ul className="flex gap-11">
          <li className="list-none font-semibold">Home</li>
          <li className="list-none font-semibold">Ações</li>
          <li className="list-none font-semibold">FIIs</li>
          <li className="list-none font-semibold">Cripto</li>
        </ul>

        <div className="flex gap-9">
          <ModeToggle />

          <div className="flex gap-6">
            <Button
              variant="default"
              className="h-auto bg-white px-6 py-1 font-semibold text-black shadow-md hover:bg-white hover:opacity-90"
            >
              Login
            </Button>

            <Button
              variant="default"
              className="h-auto rounded-lg border border-transparent bg-[#735ca5] px-6 py-1 font-semibold text-white shadow-lg hover:bg-[#735ca5] hover:opacity-90"
            >
              Register
            </Button>
          </div>
        </div>
      </header>

      <main className="flex h-[calc(65vh-_53px)] w-full flex-col items-start justify-end gap-20 px-16">
        <Image
          src="/Group 15.png"
          alt=""
          className="left-[auto!important] right-[0%!important] z-0 h-[90%!important] w-[50%!important]"
          fill
        />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="m-0 w-9/12 text-[3.5rem] font-semibold leading-[4rem]">
              Construa Seu Futuro Financeiro com Sabedoria
            </h1>
            <span className="w-1/2 text-xl text-[#8B8B8B]">
              Invista com confiança, transforme seu futuro financeiro e alcance seus objetivos com inteligência e
              segurança.
            </span>
          </div>

          <div className="ronuded-full flex w-1/3 items-center rounded-full border border-zinc-700 px-4 py-1.5">
            <input type="text" placeholder="Buscar Ativo" className="w-full border-none text-base outline-none" />

            <Search size={16} />
          </div>
        </div>
      </main>

      <section className="grid w-11/12 gap-3 px-16">
        <Title name="Rankings de Ativos" icon={<Medal size={20} />} />
        <div className="flex w-full items-center justify-between">
          <RankingCard
            title="New Rankings"
            data={[
              {
                stock: "HAPV3",
                name: "HAPVIDA",
                close: 2.21,
                change: -0.896860986547086,
                volume: 27813000,
                market_cap: 16801583439.999998,
                logo: "https://s3-symbol-logo.tradingview.com/hapvida--big.svg",
                sector: "Health Services",
                type: "stock",
              },
              {
                stock: "CVCB3",
                name: "CVC BRASIL",
                close: 1.41,
                change: -1.3986013986014,
                volume: 27179800,
                market_cap: 751583213,
                logo: "https://s3-symbol-logo.tradingview.com/cvc-brasil-on-nm--big.svg",
                sector: "Consumer Services",
                type: "stock",
              },
              {
                stock: "MGLU3",
                name: "MAGAZINE LUIZA",
                close: 6.38,
                change: -2.297090352220526,
                volume: 24666900,
                market_cap: 4361457925,
                logo: "https://s3-symbol-logo.tradingview.com/magaz-luiza-on-nm--big.svg",
                sector: "Retail Trade",
                type: "stock",
              },
              {
                stock: "B3SA3",
                name: "B3",
                close: 10.36,
                change: 0.2904162633107392,
                volume: 23844500,
                market_cap: 54113633985,
                logo: "https://s3-symbol-logo.tradingview.com/b3-on-nm--big.svg",
                sector: "Finance",
                type: "stock",
              },
            ]}
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-[30%]"
          />
          <RankingCard
            title="New Rankings"
            data={[
              {
                stock: "HAPV3",
                name: "HAPVIDA",
                close: 2.21,
                change: -0.896860986547086,
                volume: 27813000,
                market_cap: 16801583439.999998,
                logo: "https://s3-symbol-logo.tradingview.com/hapvida--big.svg",
                sector: "Health Services",
                type: "stock",
              },
              {
                stock: "CVCB3",
                name: "CVC BRASIL",
                close: 1.41,
                change: -1.3986013986014,
                volume: 27179800,
                market_cap: 751583213,
                logo: "https://s3-symbol-logo.tradingview.com/cvc-brasil-on-nm--big.svg",
                sector: "Consumer Services",
                type: "stock",
              },
              {
                stock: "MGLU3",
                name: "MAGAZINE LUIZA",
                close: 6.38,
                change: -2.297090352220526,
                volume: 24666900,
                market_cap: 4361457925,
                logo: "https://s3-symbol-logo.tradingview.com/magaz-luiza-on-nm--big.svg",
                sector: "Retail Trade",
                type: "stock",
              },
              {
                stock: "B3SA3",
                name: "B3",
                close: 10.36,
                change: 0.2904162633107392,
                volume: 23844500,
                market_cap: 54113633985,
                logo: "https://s3-symbol-logo.tradingview.com/b3-on-nm--big.svg",
                sector: "Finance",
                type: "stock",
              },
            ]}
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-[30%]"
          />
          <RankingCard
            title="New Rankings"
            data={[
              {
                stock: "HAPV3",
                name: "HAPVIDA",
                close: 2.21,
                change: -0.896860986547086,
                volume: 27813000,
                market_cap: 16801583439.999998,
                logo: "https://s3-symbol-logo.tradingview.com/hapvida--big.svg",
                sector: "Health Services",
                type: "stock",
              },
              {
                stock: "CVCB3",
                name: "CVC BRASIL",
                close: 1.41,
                change: -1.3986013986014,
                volume: 27179800,
                market_cap: 751583213,
                logo: "https://s3-symbol-logo.tradingview.com/cvc-brasil-on-nm--big.svg",
                sector: "Consumer Services",
                type: "stock",
              },
              {
                stock: "MGLU3",
                name: "MAGAZINE LUIZA",
                close: 6.38,
                change: -2.297090352220526,
                volume: 24666900,
                market_cap: 4361457925,
                logo: "https://s3-symbol-logo.tradingview.com/magaz-luiza-on-nm--big.svg",
                sector: "Retail Trade",
                type: "stock",
              },
              {
                stock: "B3SA3",
                name: "B3",
                close: 10.36,
                change: 0.2904162633107392,
                volume: 23844500,
                market_cap: 54113633985,
                logo: "https://s3-symbol-logo.tradingview.com/b3-on-nm--big.svg",
                sector: "Finance",
                type: "stock",
              },
            ]}
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-[30%]"
          />
        </div>
      </section>
    </div>
  );
}
