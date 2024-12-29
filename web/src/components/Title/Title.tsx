interface TitleProps {
  name: string;
  icon: react.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
}

export default function Title({ name, icon }: TitleProps) {
  return (
    <header className="flex items-center gap-3">
      {icon && icon}

      <h2 className="text-xl font-semibold">{name}</h2>
    </header>
  );
}
