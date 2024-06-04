import { Project } from "projen";
import { website } from "./common/website";
import { TypeSafeApiProject } from "@aws/pdk/type-safe-api";

export const publicWebsite = ({
  parent,
  apis,
}: {
  parent: Project;
  apis: TypeSafeApiProject[];
}) => {
  
  const site = website({ parent, name: "PublicWebsite", apis });

  const websiteDependencies = [
    "tailwindcss",
    "@radix-ui/react-label",
    "@radix-ui/react-slot",
    "@tailwindcss/typography",
    "@tailwindcss/forms",
    "@tailwindcss/aspect-ratio",
    "@tailwindcss/container-queries",
    "@hookform/resolvers",
    "clsx",
    "tailwind-merge",
    "tailwindcss-animate",
    "class-variance-authority",
    "lucide-react",
    "zod",
    "react-hook-form",
  ];
  
  site.addDeps(...websiteDependencies);

  return site;
}
