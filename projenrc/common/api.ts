import {
  DocumentationFormat,
  Language,
  Library,
  ModelLanguage,
  TypeSafeApiProject,
} from "@aws/pdk/type-safe-api";
import { Project } from "projen";

export const typescriptProject = ({
  parent,
  serviceName,
}: {
  parent: Project;
  serviceName: string;
}) =>
  new TypeSafeApiProject({
    parent: parent,
    outdir: `packages/${serviceName.toLowerCase()}`,
    name: `@newwwie/${serviceName.toLowerCase()}`,
    infrastructure: {
      language: Language.TYPESCRIPT,
    },
    model: {
      language: ModelLanguage.SMITHY,
      options: {
        smithy: {
          serviceName: {
            namespace: "com.newwwie",
            serviceName: serviceName,
          },
        },
      },
    },
    runtime: {
      languages: [Language.TYPESCRIPT],
    },
    documentation: {
      formats: [DocumentationFormat.HTML_REDOC],
    },
    library: {
      libraries: [Library.TYPESCRIPT_REACT_QUERY_HOOKS],
    },
    handlers: {
      languages: [Language.TYPESCRIPT],
    },
  });
