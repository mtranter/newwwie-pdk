import { Project } from "projen";
import { typescriptProject } from "./common/api";

export const adminApi = ({
  parent,
  typesPackageName,
  dynamoDbDataAccessPackageName
}: {
  parent: Project;
  typesPackageName: string;
  dynamoDbDataAccessPackageName: string;
}) => {
  const project = typescriptProject({ parent, serviceName: "AdminApi" });
  project.handlers.typescript?.addDeps(typesPackageName);
  project.handlers.typescript?.addDeps(dynamoDbDataAccessPackageName);
  return project;
};
