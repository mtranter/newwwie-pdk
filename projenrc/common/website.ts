import { CloudscapeReactTsWebsiteProject } from "@aws/pdk/cloudscape-react-ts-website";
import { TypeSafeApiProject } from "@aws/pdk/type-safe-api";
import { Project } from "projen";
import { commonProjectOptions } from "./options";

export const website = ({
  parent,
  name,
  apis,
}: {
  parent: Project;
  name: string;
  apis: TypeSafeApiProject[];
}) =>
  new CloudscapeReactTsWebsiteProject({
    parent: parent,
    outdir: `packages/${name.toLowerCase()}`,
    name: `@newwwie/${name.toLowerCase()}`,
    typeSafeApis: apis,
    tsconfig: {
      ...commonProjectOptions.tsconfig,
      compilerOptions: {
        ...commonProjectOptions.tsconfig!.compilerOptions,
        baseUrl: ".",
        paths: {
          "@/*": ["./src/*"],
        },
      },
    },
  });
