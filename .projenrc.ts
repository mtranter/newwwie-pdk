import { monorepo } from "@aws/pdk";
import { javascript } from "projen";
import { adminApi } from "./projenrc/admin.api";
import { adminWebsite } from "./projenrc/admin.website";
import { dynamoLibProject } from "./projenrc/dynamo.lib";
import { infraProject } from "./projenrc/infrastructure";
import { meetupClientProject } from "./projenrc/meetup.lib";
import { publicApi } from "./projenrc/public.api";
import { publicWebsite } from "./projenrc/public.website";
import { typesProject } from "./projenrc/types.lib";

const project = new monorepo.MonorepoTsProject({
  devDeps: ["@aws/pdk"],
  name: "newwwie-pdk",
  packageManager: javascript.NodePackageManager.PNPM,
  projenrcTs: true,
});

const types = typesProject({ parent: project });
const meetupClient = meetupClientProject({
  parent: project,
  typesPackageName: types.package.packageName,
});
const dynamoLib = dynamoLibProject({
  parent: project,
  typesPackageName: types.package.packageName,
});

const publicApiInstance = publicApi({
  parent: project,
  typesPackageName: types.package.packageName,
  meetupClientPackageName: meetupClient.package.packageName,
  dynamoDbDataAccessPackageName: dynamoLib.package.packageName,
});
const adminApiInstance = adminApi({
  parent: project,
  typesPackageName: types.package.packageName,
  dynamoDbDataAccessPackageName: dynamoLib.package.packageName,
});
const publicWebsiteInstance = publicWebsite({
  parent: project,
  apis: [publicApiInstance],
});
const adminWebsiteInstance = adminWebsite({
  parent: project,
  apis: [adminApiInstance],
});

infraProject({
  parent: project,
  websites: [publicWebsiteInstance, adminWebsiteInstance],
  apis: [publicApiInstance, adminApiInstance],
});

project.synth();
