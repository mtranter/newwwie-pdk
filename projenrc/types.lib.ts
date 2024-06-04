import { Project } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";
import { commonProjectOptions } from "./common/options";

export const typesProject = ({ parent }: { parent: Project }) =>
  new TypeScriptProject({
    parent,
    outdir: "packages/types",
    name: "@newwwie/types",
    ...commonProjectOptions,
  });
