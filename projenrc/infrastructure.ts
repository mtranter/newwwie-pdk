import { Project } from "projen";
import { InfrastructureTsProject } from "@aws/pdk/infrastructure";
import { CloudscapeReactTsWebsiteProject } from "@aws/pdk/cloudscape-react-ts-website";
import { TypeSafeApiProject } from "@aws/pdk/type-safe-api";

export const infraProject = ({
  parent,
  websites,
  apis,
}: {
  parent: Project;
  websites: CloudscapeReactTsWebsiteProject[];
  apis: TypeSafeApiProject[];
}) =>
  new InfrastructureTsProject({
    parent,
    outdir: "packages/infra",
    name: "@newwwie/infra",
    cloudscapeReactTsWebsites: websites,
    typeSafeApis: apis,
  });
