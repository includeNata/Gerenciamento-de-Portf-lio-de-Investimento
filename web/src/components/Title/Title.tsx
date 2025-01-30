import React from "react";

interface TitleProps {
  name: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

export default function Title({ name, icon }: TitleProps) {
  return (
    <header className="flex items-center gap-3">
      {icon && icon}

      <h2 className="text-xl font-semibold">{name}</h2>
    </header>
  );
}
