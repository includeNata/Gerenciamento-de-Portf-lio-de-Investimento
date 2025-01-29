"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import * as Yup from "yup";

import InputForm from "@/components/InputForm/InputForm";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const schemaData = Yup.object({
  valueInitial: Yup.number().required("Campo obrigatório"),
  valueMonthly: Yup.number().required("Campo obrigatório"),
  interestRate: Yup.number().required("Campo obrigatório"),
  months: Yup.number().required("Campo obrigatório"),
});

type SchemaDataType = Yup.InferType<typeof schemaData>;

const frameworks = [
  {
    value: "month",
    label: "Mês (s)",
  },
  {
    value: "year",
    label: "Ano (s)",
  },
];

export default function CalcCompoundInterest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaData),
    defaultValues: {
      valueInitial: 0,
      valueMonthly: 0,
      interestRate: 0,
      months: 12,
    },
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("month");
  const [valuesInterest, setValuesInterest] = useState<number[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: number; totalAmount: number; accumulatedInterest: number }[]>(
    [],
  );

  function submit(e: SchemaDataType) {
    const { valueInitial, valueMonthly, interestRate, months } = e;

    let totalAmount = 0;
    let accumulatedInterest = 0;

    const monthRate = interestRate / 100 / 12;
    const monthsLoop = value === "month" ? months : months * 12;

    let amountFromInitial = valueInitial;
    let amountFromMonthlyContributions = valueInitial;
    let calcRateMonthAccumulate = 0;

    const monthlyInterestData = [];

    for (let i = 1; i <= monthsLoop; i++) {
      amountFromInitial += valueMonthly;
      const calcRateMonth = amountFromMonthlyContributions * monthRate;
      calcRateMonthAccumulate += calcRateMonth;
      amountFromMonthlyContributions = amountFromInitial + calcRateMonthAccumulate;

      totalAmount = amountFromMonthlyContributions;
      accumulatedInterest = calcRateMonthAccumulate;

      monthlyInterestData.push({
        month: i,
        totalAmount: amountFromInitial,
        accumulatedInterest: Number(accumulatedInterest),
      });
    }

    setMonthlyData(monthlyInterestData);
    setValuesInterest([
      Number(totalAmount.toFixed(2)),
      Number(accumulatedInterest.toFixed(2)),
      Number(valueMonthly * monthsLoop + valueInitial),
    ]);
  }

  return (
    <form
      className="flex w-full flex-col items-start justify-start gap-8 rounded-lg p-6 dark:bg-gray-700 dark:text-white"
      onSubmit={handleSubmit(submit)}
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Calculadora de Juros Compostos</h2>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <InputForm
          errors={errors}
          register={register}
          spanText="R$"
          title="Valor inicial"
          type="number"
          placeholder="0,00"
          htmlFor="valor-inicial"
          name="valueInitial"
        />

        <InputForm
          errors={errors}
          register={register}
          spanText="R$"
          title="Contribuição mensal"
          type="number"
          placeholder="0,00"
          htmlFor="contribuicao-mensal"
          name="valueMonthly"
        />

        <InputForm
          errors={errors}
          register={register}
          spanText="%"
          title="Taxa de Juros (%):"
          type="number"
          placeholder="0,00"
          htmlFor="taxa-juros"
          name="interestRate"
        />

        <InputForm
          errors={errors}
          register={register}
          title="Quantidade de meses"
          type="number"
          placeholder="0"
          htmlFor="quantidade-meses"
          name="months"
          options={
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-24 justify-between dark:bg-gray-600 dark:text-gray-100"
                  onClick={() => {
                    if (!value) setValue("month");
                  }}
                >
                  {value ? (frameworks.find((framework) => framework.value === value)?.label as string) : "Mês (s)"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          {framework.label}
                          <Check className={cn("ml-auto", value === framework.value ? "opacity-100" : "opacity-0")} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          }
        />
      </div>

      <div className="mt-6 flex w-full justify-end gap-4">
        <Button type="submit" variant="secondary" onClick={() => reset()}>
          Limpar
        </Button>
        <Button
          type="submit"
          className="w-full rounded-lg bg-purple-600 px-6 py-2 font-medium text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:w-auto"
        >
          Calcular
        </Button>
      </div>

      {valuesInterest.length > 0 && (
        <div className="mt-8 grid w-full grid-cols-1 justify-center gap-6 sm:grid-cols-3">
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 sm:w-auto">
            <span className="text-lg font-medium text-gray-700 dark:text-white">Montante Total</span>
            <span className="mt-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">
              {valuesInterest[0].toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 sm:w-auto">
            <span className="text-lg font-medium text-gray-700 dark:text-white">Juros Acumulados</span>
            <span className="mt-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">
              {valuesInterest[1].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 sm:w-auto">
            <span className="text-lg font-medium text-gray-700 dark:text-white">Contribuições Mensais Totais</span>
            <span className="mt-2 text-2xl font-semibold text-purple-600 dark:text-purple-400">
              {valuesInterest[2].toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
      )}

      {monthlyData.length > 0 && (
        <div className="mt-8 w-full">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Tabela de Juros Mensais</h3>
          <div className="h-[25.125rem] overflow-auto">
            <table className="mt-4 w-full table-auto border-collapse dark:text-white">
              <thead className="sticky top-0 bg-white dark:bg-gray-800">
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Mês</th>
                  <th className="px-4 py-2 text-left">Total Investido (R$)</th>
                  <th className="px-4 py-2 text-left">Juros Acumulados (R$)</th>
                  <th className="px-4 py-2 text-left">Total Acumulados (R$)</th>
                </tr>
              </thead>
              <tbody className="">
                {monthlyData.map((data, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{data.month}</td>
                    <td className="px-4 py-2">
                      {data.totalAmount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {data.accumulatedInterest.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {(data.totalAmount + data.accumulatedInterest).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {monthlyData.length > 0 && (
        <div className="mt-8 flex w-full flex-col gap-6">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">Gráfico de Juros Compostos</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "8px",
                  padding: "10px",
                }}
                labelFormatter={(label) => `Mês ${label}`}
                formatter={(value) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalAmount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Total Investido"
              />
              <Line type="monotone" dataKey="accumulatedInterest" stroke="#82ca9d" name="Juros Acumulados" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </form>
  );
}
