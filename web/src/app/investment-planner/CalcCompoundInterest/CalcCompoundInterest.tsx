import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CalcCompoundInterest() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-8 rounded-lg p-6 dark:bg-gray-700 dark:text-white">
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
              type="number"
              placeholder="0,00"
              className="h-full w-full rounded-r-lg border-none bg-transparent px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-0 dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="valor-inicial" className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Valor Mensal:
          </Label>
          <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
            <span className="flex items-center justify-center bg-zinc-300 px-4 py-2 text-sm text-gray-700 dark:bg-gray-600 dark:text-gray-100">
              R$
            </span>
            <Input
              id="valor-inicial"
              type="number"
              placeholder="0,00"
              className="h-full w-full rounded-r-lg border-none bg-transparent px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-0 dark:text-white"
            />
          </div>
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
              type="number"
              placeholder="0,00"
              className="h-full w-full rounded-r-lg border-none bg-transparent px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-0 dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="tempo" className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Tempo (Meses):
          </Label>
          <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
            <Input
              id="tempo"
              type="number"
              placeholder="12"
              className="h-full w-full rounded-r-lg border-none bg-transparent px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-0 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full justify-end">
        <button className="w-full rounded-lg bg-purple-600 px-6 py-2 font-medium text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 sm:w-auto">
          Calcular
        </button>
      </div>
    </div>
  );
}
