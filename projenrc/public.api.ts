import { Project } from "projen";
import { typescriptProject } from "./common/api";

export const publicApi = ({
  parent,
  typesPackageName,
  meetupClientPackageName,
  dynamoDbDataAccessPackageName
}: {
  parent: Project;
  typesPackageName: string;
  meetupClientPackageName: string;
  dynamoDbDataAccessPackageName: string;
}) => {
  const project = typescriptProject({ parent, serviceName: "PublicApi" });
  project.handlers.typescript?.addDeps(typesPackageName);
  project.handlers.typescript?.addDeps(meetupClientPackageName);
  project.handlers.typescript?.addDeps(dynamoDbDataAccessPackageName);
  project.handlers.typescript?.addDeps("uuid");
  project.handlers.typescript?.addDevDeps("@types/uuid");
  return project;
};
