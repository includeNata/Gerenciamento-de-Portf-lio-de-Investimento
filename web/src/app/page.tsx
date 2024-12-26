"use client";
import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { listMarket } from "@/api/listMarket";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function Home() {
  const [selected, setSelected] = useState("Stock");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await listMarket();
        setInvoices(response.stocks || []);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    })();
  }, []);

  return (
    <main className="flex h-screen w-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
      <aside className="h-full w-1/6 border-r border-gray-700 p-2">{/* Espaço reservado para o menu lateral */}</aside>

      <section className="flex h-full w-5/6 flex-col">
        <header className="flex h-12 w-full items-center border-b border-gray-700 p-2">
          {/* Espaço reservado para o cabeçalho */}
        </header>

        <section className="flex gap-3 px-4 py-2">
          <div className="w-full rounded-lg bg-[#FAFBFC]/10 p-4">
            <header className="flex w-full flex-col gap-4">
              <h2 className="text-xl">Money Flow</h2>

              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#01B8E3]" />
                  <span className="text-xs text-[#01B8E3]">+6,79%</span>
                </div>
              </div>
            </header>
          </div>
          <div className="w-full rounded-lg bg-[#333] p-4 shadow-md">
            <header className="flex w-full items-center justify-between border-b border-b-[#444444] pb-2">
              <h2 className="text-xl">Market</h2>

              <div className="flex gap-3">
                <div className="flex h-9 w-44 items-center justify-center rounded-full border-2 border-[#CACACA]">
                  <button
                    className={`h-full flex-1 rounded-full text-center text-sm transition-colors ${
                      selected === "Stock" ? "bg-[#444444] text-white" : "text-gray-400"
                    }`}
                    onClick={() => setSelected("Stock")}
                  >
                    Stock
                  </button>
                  <button
                    className={`h-full flex-1 rounded-full text-center text-sm transition-colors ${
                      selected === "REF" ? "bg-[#444444] text-white" : "text-gray-400"
                    }`}
                    onClick={() => setSelected("REF")}
                  >
                    REF
                  </button>
                </div>
                <Button variant="outline" className="rounded-full border-[#CACACA] bg-[#222] px-5 py-2">
                  View All
                </Button>
              </div>
            </header>

            <div className="mt-3 w-full overflow-x-auto">
              <Table>
                <TableBody>
                  {invoices.length > 0 ? (
                    invoices.slice(0, 6).map((invoice) => (
                      <TableRow key={invoice.invoice || Math.random()}>
                        <TableCell className="px-3 py-2">
                          {invoice.logo ? (
                            <Image
                              src={invoice.logo}
                              alt={`${invoice.stock || "Logo"}`}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-xs">
                              N/A
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="px-3 py-2">
                          <span className="text-sm font-medium">{invoice.stock || "N/A"}</span>
                          <br />
                          <span className="text-xs text-gray-400">{invoice.name || "N/A"}</span>
                        </TableCell>
                        <TableCell className="px-3 py-2">
                          <span
                            className={`text-sm ${parseFloat(invoice.close) > 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            ${parseFloat(invoice.close).toFixed(2)}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            {parseFloat(invoice.change).toFixed(2)}%
                            {invoice.change > 0 ? <ArrowUpRight size={10} /> : <ArrowDownLeft size={10} />}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-right">
                          <Button
                            variant="default"
                            className="w-10/12 rounded-full bg-blue-600 text-xs hover:bg-blue-500"
                          >
                            {invoice.sector || "Without Sector"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="py-4 text-center text-sm text-gray-400">
                        No data available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
