"use client"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableRow } from "@/components/ui/table";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState("Stock");
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
  ]

  return (
    <main className="w-screen h-screen flex bg-[#222] text-white">
      <aside className="w-1/4 h-full border-r border-r-[#555555]">

      </aside>

      <section className="w-3/4 h-full">
        <header className="w-full h-16 p-3 border-b border-b-[#555555]">

        </header>

        <section className="w-full h-1/2 px-4 overflow-hidden">
          <div className="w-8/12 h-auto flex flex-col gap-4 bg-[#333] p-4 rounded-lg">
            <header className="w-full flex items-center justify-between pb-2 border-b border-b-[#444444]">
              <h2 className="text-xl">Market</h2>

              <div className="flex gap-3">
                <div className="flex items-center justify-center w-44 h-10 border-2 border-[#CACACA] rounded-full">
                  <button
                    className={`text-sm flex-1 text-center py-1 rounded-full transition-colors ${
                      selected === "Stock" ? "bg-[#444444] text-white" : "text-gray-400"
                    }`}
                    onClick={() => setSelected("Stock")}
                  >
                    Stock
                  </button>
                  <button
                    className={`text-sm flex-1 text-center py-1 rounded-full transition-colors ${
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

            <div className="w-full">
              <Table>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell><CircleDollarSign /></TableCell>
                      <TableCell className="font-medium flex flex-col">
                        <span className="font-medium text-sm">
                          {invoice.invoice}
                        </span>
                        <span className="text-xs text-[#BFBFBF]">HAPVIDA</span>
                      </TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
