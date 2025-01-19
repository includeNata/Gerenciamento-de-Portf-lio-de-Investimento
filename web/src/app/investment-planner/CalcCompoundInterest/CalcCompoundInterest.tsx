import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schemaData = Yup.object({
  valueInitial: Yup.number().required("Campo obrigatório"),
  valueMonthly: Yup.number(),
  interestRate: Yup.number().required("Campo obrigatório"),
  months: Yup.number().required("Campo obrigatório"),
});

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

  function submit(e: typeof schemaData) {
    console.log(e);
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
    </form>
  );
}
