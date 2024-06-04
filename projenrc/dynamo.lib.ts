import { Project } from "projen";
import { TypeScriptProject } from "projen/lib/typescript";
import { commonProjectOptions } from "./common/options";

export const dynamoLibProject = ({
  parent,
  typesPackageName,
}: {
  parent: Project;
  typesPackageName: string;
}) => {
  const project = new TypeScriptProject({
    parent,
    outdir: "packages/dynamodb-data-access",
    name: "@newwwie/dynamodb-data-access",
    ...commonProjectOptions,
  });
  project.addDeps(typesPackageName);
  project.addDeps("funamots");
  project.addDeps("@aws-sdk/client-dynamodb");

  return project;
};
