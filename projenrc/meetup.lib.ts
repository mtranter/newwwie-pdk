import { Project } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";
import { commonProjectOptions } from "./common/options";

export const meetupClientProject = ({
  parent,
  typesPackageName,
}: {
  parent: Project;
  typesPackageName: string;
}) => {
  const project = new TypeScriptProject({
    parent,
    outdir: "packages/meetupclient",
    name: "@newwwie/meetup-client",
    ...commonProjectOptions,
  });
  project.addDeps(typesPackageName);

  return project;
};
