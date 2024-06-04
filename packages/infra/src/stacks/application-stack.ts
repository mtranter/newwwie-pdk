import { UserIdentity } from "@aws/pdk/identity";
import { Stack, StackProps } from "aws-cdk-lib";
import { CfnUserPool, Mfa } from "aws-cdk-lib/aws-cognito";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { AdminApi } from "../constructs/apis/adminapi";
import { PublicApi } from "../constructs/apis/publicapi";
import { Adminwebsite } from "../constructs/websites/adminwebsite";
import { Publicwebsite } from "../constructs/websites/publicwebsite";

export class ApplicationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const userIdentity = new UserIdentity(this, `${id}UserIdentity`);
    const cfnUserPool = userIdentity.userPool.node.defaultChild as CfnUserPool;
    cfnUserPool.mfaConfiguration = Mfa.OPTIONAL;

    const table = new Table(this, "Table", {
      tableName: "newwwie-pdk",
      partitionKey: {
        name: "hk",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    const publicapi = new PublicApi(this, "PublicApi", { table });
    const adminapi = new AdminApi(this, "AdminApi", {
      userIdentity,
      table,
    });
    new Publicwebsite(this, "Publicwebsite", {
      userIdentity,
      publicapi,
    });
    new Adminwebsite(this, "Adminwebsite", {
      userIdentity,
      adminapi,
    });
  }
}
