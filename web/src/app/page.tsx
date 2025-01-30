"use client";
import { DollarSign, Globe, MapPinHouse, Medal, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { getListCrypto } from "@/api/getListCryptos";
import handler from "@/api/rss";
import { Footer } from "@/components/Footer/Footer";
import RankingCard from "@/components/RankingCard/RankingCard";
import RankingCardFiis from "@/components/RankingCard/RankingCardFB/RankingCardFiis/RankingCardFiis";
import RankingCardCryptoMoreVisited from "@/components/RankingCard/RankingCardICrypto/RankingCardCryptoMoreVisited/RankingCardCryptoMoreVisited";
import RankingCardCryptosRise from "@/components/RankingCard/RankingCardICrypto/RankingCardCryptosRise/RankingCardCryptosRise";
import RankingCardICrypto from "@/components/RankingCard/RankingCardICrypto/RankingCardICrypto";
import Title from "@/components/Title/Title";
import { useQueryHook } from "@/hook/useQueryHook";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = useState<any[]>([]);
  const { data: dataListCrypto, isLoading: isLoadingListCrypto } = useQueryHook({
    queryKey: ["query-list-crypto"],
    staleTime: 3000,
    options: {
      queryFn: getListCrypto,
    },
    onError(err) {
      console.log(err);
    },
    onSuccess(data) {
      console.log(data);
    },
  });

  useEffect(() => {
    (async () => {
      const response = await handler();
      setItems(response || []); // Default to an empty array if response is undefined
    })();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <main className="relative flex h-[calc(65vh-_53px)] w-full flex-col items-start justify-end gap-20 px-16">
        <Image
          src="/Group 15.png"
          alt=""
          className="left-[auto!important] right-[0%!important] z-0 h-[42.25rem!important] w-[40.625rem!important]"
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

      <section className="flex h-auto w-11/12 flex-col gap-3 px-16">
        <Title name="Rankings de Criptos" icon={<DollarSign size={20} />} />
        <div className="flex h-full w-full flex-wrap items-start justify-start gap-3">
          <div className="flex w-full items-center justify-between">
            <RankingCardCryptosRise
              title="Cryptos em Alta"
              data={dataListCrypto}
              onViewAll={() => console.log("Clicked!")}
              styleRankingCard="w-[65%]"
            />

            <RankingCardICrypto
              title="Crypto Mais Visitados"
              data={isLoadingListCrypto ? [] : dataListCrypto?.filter((_: any, index: number) => index < 4)}
              onViewAll={() => console.log("Clicked!")}
              styleRankingCard="w-[30%] h-[242px] overflow-auto"
            />
          </div>

          <RankingCardCryptoMoreVisited
            title="Crypto Mais Visitados"
            data={isLoadingListCrypto ? [] : dataListCrypto?.filter((_: any, index: number) => index < 4)}
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-full"
          />
        </div>
      </section>

      <div className="flex h-full w-11/12 items-start justify-between px-16">
        <section className="flex h-full w-[60%] flex-wrap items-start justify-start gap-3">
          <Title name="Rankings de FIIs" icon={<MapPinHouse size={20} />} />
          <div className="flex h-full w-full flex-wrap items-start justify-start gap-3">
            <div className="flex w-full items-center justify-between">
              <RankingCardFiis
                title="FIIs Markets"
                data={isLoadingListCrypto ? [] : dataListCrypto?.filter((_: any, index: number) => index < 4)}
                onViewAll={() => console.log("Clicked!")}
              />
            </div>
          </div>
        </section>
        <section className="flex h-full w-[35%] flex-wrap items-start justify-start gap-3">
          <Title name="Rankings de BDRs" icon={<Globe size={20} />} />
          <div className="flex h-full w-full flex-wrap items-start justify-start gap-3">
            <div className="flex w-full items-center justify-between">
              <RankingCardFiis
                title="BDRs Mais Visitados"
                data={isLoadingListCrypto ? [] : dataListCrypto?.filter((_: any, index: number) => index < 4)}
                onViewAll={() => console.log("Clicked!")}
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
