"use client";
import { Calendar, ChevronDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MoneyFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Week");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = [
    {
      name: "Dec 14",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Dec 15",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Dec 16",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Dec 17",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Dec 18",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Dec 19",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Dec 20",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function selectMonth(month: string) {
    setSelectedMonth(month);
    setIsOpen(false);
  }

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-[#333] p-4">
      <header className="flex w-full flex-col gap-4">
        <h2 className="text-xl">Money Flow</h2>

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-[#01B8E3]" />
            <span className="text-xs text-[#01B8E3]">+6,79%</span>
          </div>

          <div className="relative inline-block">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 rounded-full border border-gray-400 bg-gray-800 px-3 py-1 text-white hover:bg-gray-700"
            >
              <span>
                <Calendar size={14} />
              </span>
              <span className="text-sm">{selectedMonth}</span>
              <span>
                <ChevronDown size={14} />
              </span>
            </button>

            {isOpen && (
              <div className="absolute mt-2 w-full rounded-lg bg-white shadow-lg">
                <ul className="">
                  {months.map((month) => (
                    <li
                      key={month}
                      onClick={() => selectMonth(month)}
                      className="cursor-pointer px-4 py-2 text-xs text-gray-800 hover:bg-gray-200"
                    >
                      {month}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 10,
            left: -25,
            bottom: 0,
            right: 0,
          }}
        >
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
