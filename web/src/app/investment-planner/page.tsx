"use client";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableHeader } from "@/components/ui/table";

import CalcCompoundInterest from "./CalcCompoundInterest/CalcCompoundInterest";
import PopoverAddConfig from "./PopoverAddConfig/PopoverAddConfig";

export default function InvestmentPlanner() {
  const [investmentValue, setInvestmentValue] = useState(1000);

  const [dataInfos, setDataInfos] = useState([
    { name: "Criptomoeda", value: 25, color: "#0088FE" },
    { name: "Tesouro Direto", value: 35, color: "#00C49F" },
    { name: "Ações", value: 20, color: "#FFBB28" },
    { name: "FIIs", value: 20, color: "#FF8042" },
  ]);

  const totalPercentage = dataInfos.reduce((acc, entry) => acc + entry.value, 0);

  const totalValue = dataInfos.reduce((acc, entry) => acc + (investmentValue * entry.value) / 100, 0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-16 dark:bg-gray-900 dark:text-white">
      <main className="mt-[52px] flex h-[calc(85vh_-_52px)] w-full flex-col items-start justify-center rounded-lg">
        <h2 className="mb-6 text-3xl font-semibold text-gray-800 dark:text-gray-200">Distribuição de Investimentos</h2>

        <div className="flex w-full items-center justify-between gap-6">
          <div className="flex w-full flex-col rounded-lg border p-3 shadow-lg dark:border-gray-700">
            <h3 className="mb-4 text-lg font-bold text-purple-600 dark:text-purple-400">Gráfico</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={dataInfos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataInfos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex w-full flex-wrap justify-center gap-6">
              {dataInfos.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      backgroundColor: entry.color,
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-full w-full flex-col rounded-lg border p-3 shadow-lg dark:border-gray-700">
            <h3 className="mb-4 text-lg font-bold text-purple-600 dark:text-purple-400">Tabela de Investimentos</h3>
            <Table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <TableHeader>
                <tr>
                  <th className="py-2 text-left">Investimento</th>
                  <th className="py-2 text-left">Percentual</th>
                  <th className="py-2 text-left">Valor</th>
                </tr>
              </TableHeader>
              <TableBody>
                {dataInfos.map((entry, index) => (
                  <tr key={index} className="border-b dark:border-gray-600">
                    <td className="py-2">{entry.name}</td>
                    <td className="py-2">{entry.value}%</td>
                    <td className="py-2">{((investmentValue * entry.value) / 100).toFixed(2)}</td>
                  </tr>
                ))}

                <tr className="border-t font-semibold dark:border-gray-600">
                  <td className="py-2">Total</td>
                  <td className="py-2"></td>
                  <td className="py-2">{totalValue.toFixed(2)}</td>
                </tr>
              </TableBody>
            </Table>
          </div>

          <div className="flex h-full w-full flex-col rounded-lg border p-3 shadow-lg dark:border-gray-700">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">Configurações</h3>

              <PopoverAddConfig dataInfos={dataInfos} setDataInfos={setDataInfos} />
            </div>
            <div className="flex h-full w-full flex-col items-start justify-center gap-4">
              {dataInfos.map((item, index: number) => (
                <div key={item.name} className="flex w-full flex-col">
                  <div className="mb-1 text-[14px] font-semibold text-gray-600 dark:text-gray-300">{`${item.name.charAt(0).toUpperCase() + item.name.slice(1)} ${item.value}%`}</div>
                  <Slider
                    onValueChange={(value) => handleChangeSlider(index, value[0])}
                    style={{ height: "20px" }}
                    value={[item.value]}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
              <span className={`${totalPercentage > 100 && "text-red-600"}`}>
                Soma das porcentagens: {totalPercentage}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full items-center gap-4 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-800">
          <input
            type="number"
            value={investmentValue}
            onChange={handleInputChange}
            placeholder="Insira o valor"
            className="w-full appearance-none bg-transparent text-sm text-gray-700 outline-none dark:text-gray-300"
          />
          <button className="rounded-full bg-purple-600 px-4 py-1 text-sm text-white hover:bg-purple-700">
            Calcular
          </button>
        </div>
      </main>

      <CalcCompoundInterest />
    </div>
  );

  function handleChangeSlider(index: number, value: number) {
    const newDataInfos = [...dataInfos];
    newDataInfos[index].value = value;
    setDataInfos(newDataInfos);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInvestmentValue(Number(event.target.value));
  }
}
