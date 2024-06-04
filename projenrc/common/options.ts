import { NodePackageManager } from "projen/lib/javascript";
import { TypeScriptProjectOptions } from "projen/lib/typescript";

export const commonProjectOptions = {
  defaultReleaseBranch: "main",
  packageManager: NodePackageManager.PNPM,
  prettier: true,
  eslint: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      singleQuote: true,
    },
  },
  tsconfig: {
    compilerOptions: {
      lib: ["es2019", "dom"],
      skipLibCheck: true,
    },
  },
  tsconfigDev: {
    compilerOptions: {
      types: ["jest", "node"],
    },
  },
} satisfies Partial<TypeScriptProjectOptions>
