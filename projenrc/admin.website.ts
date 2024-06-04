import { Project } from "projen";
import { website } from "./common/website";
import { TypeSafeApiProject } from "@aws/pdk/type-safe-api";

export const adminWebsite = ({
  parent,
  apis,
}: {
  parent: Project;
  apis: TypeSafeApiProject[];
}) => website({ parent, name: "AdminWebsite", apis });
