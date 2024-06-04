import { Authorizers, Integrations } from "@aws/pdk/type-safe-api";
import {
  Api,
  CreateSlackInviteFunction,
} from "@newwwie/publicapi-typescript-infra";
import { Cors } from "aws-cdk-lib/aws-apigateway";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

/**
 * Api construct props.
 */
export interface PublicApiProps {
  table: Table;
}

/**
 * Infrastructure construct to deploy a Type Safe API.
 */
export class PublicApi extends Construct {
  /**
   * API instance
   */
  public readonly api: Api;

  constructor(scope: Construct, id: string, props: PublicApiProps) {
    super(scope, id);
    const createSlackInvite = new CreateSlackInviteFunction(
      this,
      "CreateSlackInviteFunction",
      {
        environment: {
          TABLE_NAME: props.table.tableName,
        },
      },
    );
    props.table.grantWriteData(createSlackInvite);
    this.api = new Api(this, id, {
      defaultAuthorizer: Authorizers.none(),
      corsOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
      integrations: {
        createSlackInvite: {
          integration: Integrations.lambda(createSlackInvite),
        },
      },
    });
  }
}
