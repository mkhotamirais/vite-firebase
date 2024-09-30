import React from "react";
import { SiVite, SiFirebase, SiShadcnui, SiTailwindcss, SiZod, SiFramer, SiTypescript } from "react-icons/si";

const iconsLogo = [
  { title: "Vite", icon: SiVite },
  { title: "Firebase", icon: SiFirebase },
  { title: "Shadcn UI", icon: SiShadcnui },
  { title: "Tailwindcss", icon: SiTailwindcss },
  { title: "Zod", icon: SiZod },
  { title: "Framer", icon: SiFramer },
  { title: "Typescript", icon: SiTypescript },
];

export default function HomeTools() {
  return (
    <div className="flex gap-8 flex-wrap justify-center pt-8">
      {iconsLogo.map((item, i) => (
        <div title={item.title} key={i} className={item.title === "Firebase" ? "text-primary" : ""}>
          {React.createElement(item.icon, { size: 32 })}
        </div>
      ))}
    </div>
  );
}
