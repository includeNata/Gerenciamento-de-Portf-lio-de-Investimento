"use client";
import { listMarket } from "@/api/listMarket";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState("Stock");
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
    <main className="w-screen h-screen flex bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
      <aside className="w-1/4 h-full border-r border-gray-700 p-2">
        {/* Espaço reservado para o menu lateral */}
      </aside>

      <section className="w-3/4 h-full flex flex-col">
        <header className="w-full h-12 p-2 flex items-center border-b border-gray-700">
          {/* Espaço reservado para o cabeçalho */}
        </header>

        <section className="flex-1 px-4 py-2 overflow-hidden">
          <div className="w-2/3 bg-gray-800 p-4 rounded-lg shadow-md">
            <header className="w-full flex items-center justify-between pb-2 border-b border-b-[#444444]">
              <h2 className="text-xl">Market</h2>

              <div className="flex gap-3">
                <div className="flex items-center justify-center w-44 h-9 border-2 border-[#CACACA] rounded-full">
                  <button className={`h-full text-sm flex-1 text-center rounded-full transition-colors ${
                      selected === "Stock" ? "bg-[#444444] text-white" : "text-gray-400"
                    }`}
                    onClick={() => setSelected("Stock")}
                  >
                  Stock
                </button>
                  <button className={`h-full text-sm flex-1 text-center rounded-full transition-colors ${
                        selected === "REF" ? "bg-[#444444] text-white" : "text-gray-400"
                    }`}
                    onClick={() => setSelected("REF")}
                  >
                    REF
                  </button>
                </div>
                <Button variant="outline" className="bg-[#222] border-[#CACACA] px-5 py-2 rounded-full">
                  View All
                </Button>
              </div>
            </header>

            <div className="mt-3 overflow-x-auto">
              <Table>
                <TableBody>
                  {invoices.length > 0 ? (
                    invoices
                      .slice(0, 6)
                      .map((invoice) => (
                        <TableRow key={invoice.invoice || Math.random()}>
                          <TableCell className="py-2 px-3">
                            {invoice.logo ? (
                              <Image
                                src={invoice.logo}
                                alt={`${invoice.stock || "Logo"}`}
                                width={24}
                                height={24}
                                className="rounded-full"
                              />
                            ) : (
                              <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                                N/A
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="py-2 px-3">
                            <span className="text-sm font-medium">{invoice.stock || "N/A"}</span>
                            <br />
                            <span className="text-xs text-gray-400">{invoice.name || "N/A"}</span>
                          </TableCell>
                          <TableCell className="py-2 px-3">
                            <span
                              className={`text-sm ${parseFloat(invoice.close) > 0 ? "text-green-400" : "text-red-400"
                                }`}
                            >
                              ${parseFloat(invoice.close).toFixed(2)}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              {parseFloat(invoice.change).toFixed(2)}%
                              {invoice.change > 0 ? <ArrowUpRight size={10} /> : <ArrowDownLeft size={10} />}
                            </span>
                          </TableCell>
                          <TableCell className="py-3 px-4 text-right">
                            <Button
                              variant="default"
                              className="w-2/3 bg-blue-600 hover:bg-blue-500 text-sm rounded-full"
                            >
                              {invoice.sector || "Without Sector"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-gray-400 text-sm">
                        No data available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </section >
      </section >
    </main >
  );
}
