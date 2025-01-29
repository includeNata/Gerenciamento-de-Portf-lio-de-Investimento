import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-b-[#9265E2] bg-white px-8 py-2 dark:border-b-[#9265E2]/70 dark:bg-gray-900">
      <div className="h-6 w-6 rounded-full bg-gray-600"></div>

      <ul className="flex gap-11">
        <li className="list-none font-semibold">Home</li>
        <li className="list-none font-semibold">Ações</li>
        <li className="list-none font-semibold">FIIs</li>
        <li className="list-none font-semibold">Cripto</li>
      </ul>

      <div className="flex gap-9">
        <ModeToggle />

        <div className="flex gap-6">
          <Button
            variant="default"
            className="h-auto bg-white px-6 py-1 font-semibold text-black shadow-md hover:bg-white hover:opacity-90"
          >
            Login
          </Button>

          <Button
            variant="default"
            className="h-auto rounded-lg border border-transparent bg-[#735ca5] px-6 py-1 font-semibold text-white shadow-lg hover:bg-[#735ca5] hover:opacity-90"
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
