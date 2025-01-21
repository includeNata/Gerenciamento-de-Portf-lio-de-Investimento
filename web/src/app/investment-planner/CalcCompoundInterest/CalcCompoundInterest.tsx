"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const schemaData = Yup.object({
  valueInitial: Yup.number().required("Campo obrigatório"),
  valueMonthly: Yup.number(),
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

  function submit(e: SchemaDataType) {
    const { valueInitial, valueMonthly, interestRate, months } = e;

    let totalAmount = 0;

    const monthRate = interestRate / 100 / 12;
    const monthsLoop = value === "month" ? months : months * 12;

    let amountFromInitial = 0;
    let amountFromMonthlyContributions = amountFromInitial;
    let calcRateMonthAccumulate = 0;
    console.log(monthsLoop);

    for (let i = 1; i < monthsLoop + 1; i++) {
      amountFromInitial = valueMonthly + amountFromInitial;
      const calcRateMonth = amountFromMonthlyContributions * monthRate;
      calcRateMonthAccumulate += calcRateMonth;
      amountFromMonthlyContributions = amountFromInitial + calcRateMonthAccumulate;
    }

    totalAmount = amountFromMonthlyContributions + valueInitial;
    setValuesInterest([totalAmount, calcRateMonthAccumulate, valueMonthly * monthsLoop + valueInitial]);
  }

  return (
    <form
      className="flex w-full flex-col items-start justify-start gap-8 rounded-lg p-6 dark:bg-gray-700 dark:text-white"
      onSubmit={handleSubmit(submit)}
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Calculadora de Juros Compostos</h2>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="valor-inicial" className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Valor Inicial:
          </Label>
          <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
            <span className="flex items-center justify-center bg-zinc-300 px-4 py-2 text-sm text-gray-700 dark:bg-gray-600 dark:text-gray-100">
              R$
            </span>
            <Input
              id="valor-inicial"
              {...register("valueInitial")}
              type="number"
              placeholder="0,00"
              className="h-full w-full rounded-r-lg border-none bg-transparent px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-0 dark:text-white"
            />
          </div>
          {errors.valueInitial && <span className="text-red-500">{errors.valueInitial.message}</span>}
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="valor-mensal" className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Valor Mensal:
          </Label>
          <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
            <span className="flex items-center justify-center bg-zinc-300 px-4 py-2 text-sm text-gray-700 dark:bg-gray-600 dark:text-gray-100">
              R$
            </span>
            <Input
              id="valor-mensal"
              {...register("valueMonthly")}
              type="number"
              placeholder="0,00"
              className="h-full w-full rounded-r-lg border-none bg-transparent px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-0 dark:text-white"
            />
          </div>
          {errors.valueMonthly && <span className="text-red-500">{errors.valueMonthly.message}</span>}
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="taxa-juros" className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Taxa de Juros (%):
          </Label>
          <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
            <span className="flex items-center justify-center bg-zinc-300 px-4 py-2 text-sm text-gray-700 dark:bg-gray-600 dark:text-gray-100">
              %
            </span>
            <Input
              id="taxa-juros"
              {...register("interestRate")}
              type="number"
              placeholder="0,00"
              className="h-full w-full rounded-r-lg border-none bg-transparent px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-0 dark:text-white"
            />
          </div>
          {errors.interestRate && <span className="text-red-500">{errors.interestRate.message}</span>}
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="tempo" className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Tempo (Meses):
          </Label>
          <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
            <Input
              id="tempo"
              {...register("months")}
              type="number"
              placeholder="12"
              className="h-full w-full rounded-r-lg border-none bg-transparent px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-0 dark:text-white"
            />

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-24 justify-between dark:bg-gray-600 dark:text-gray-100"
                >
                  {value ? frameworks.find((framework) => framework.value === value)?.label : setValue("month")}
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
          </div>
          {errors.months && <span className="text-red-500">{errors.months.message}</span>}
        </div>
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
    </form>
  );
}
