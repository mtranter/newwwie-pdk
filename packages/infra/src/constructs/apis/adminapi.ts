import { UserIdentity } from "@aws/pdk/identity";
import { Authorizers, Integrations } from "@aws/pdk/type-safe-api";
import {
  Api,
  ApproveSlackInvitesFunction,
  ListSlackInviteRequestsFunction,
  ListSlackMembersFunction,
} from "@newwwie/adminapi-typescript-infra";
import { Stack } from "aws-cdk-lib";
import { Cors } from "aws-cdk-lib/aws-apigateway";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import {
  AccountPrincipal,
  AnyPrincipal,
  Effect,
  PolicyDocument,
  PolicyStatement,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

/**
 * Api construct props.
 */
export interface AdminApiProps {
  /**
   * Instance of the UserIdentity.
   */
  readonly userIdentity: UserIdentity;

  readonly table: Table;
}

/**
 * Infrastructure construct to deploy a Type Safe API.
 */
export class AdminApi extends Construct {
  /**
   * API instance
   */
  public readonly api: Api;

  constructor(scope: Construct, id: string, props: AdminApiProps) {
    super(scope, id);
    const commonLambdaProps = {
      environment: {
        TABLE_NAME: props.table.tableName,
      },
    };
    const createSlackInvite = new ListSlackInviteRequestsFunction(
      this,
      "ListSlackInviteRequestsFunction",
      commonLambdaProps,
    );
    const approveSlackMembers = new ApproveSlackInvitesFunction(
      this,
      "ApproveSlackInvitesFunction",
      commonLambdaProps,
    );
    const listMembers = new ListSlackMembersFunction(
      this,
      "ListSlackMembersFunction",
      commonLambdaProps,
    );
    props.table.grantReadWriteData(createSlackInvite);
    props.table.grantReadWriteData(approveSlackMembers);
    props.table.grantReadWriteData(listMembers);

    this.api = new Api(this, id, {
      defaultAuthorizer: Authorizers.iam(),
      corsOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
      integrations: {
        listSlackInviteRequests: {
          integration: Integrations.lambda(createSlackInvite),
        },
        listSlackMembers: {
          integration: Integrations.lambda(listMembers),
        },
        approveSlackInvites: {
          integration: Integrations.lambda(approveSlackMembers),
        },
      },
      policy: new PolicyDocument({
        statements: [
          // Here we grant any AWS credentials from the account that the prototype is deployed in to call the api.
          // Machine to machine fine-grained access can be defined here using more specific principals (eg roles or
          // users) and resources (ie which api paths may be invoked by which principal) if required.
          // If doing so, the cognito identity pool authenticated role must still be granted access for cognito users to
          // still be granted access to the API.
          new PolicyStatement({
            effect: Effect.ALLOW,
            principals: [new AccountPrincipal(Stack.of(this).account)],
            actions: ["execute-api:Invoke"],
            resources: ["execute-api:/*"],
          }),
          // Open up OPTIONS to allow browsers to make unauthenticated preflight requests
          new PolicyStatement({
            effect: Effect.ALLOW,
            principals: [new AnyPrincipal()],
            actions: ["execute-api:Invoke"],
            resources: ["execute-api:/*/OPTIONS/*"],
          }),
        ],
      }),
    });

    // Grant authenticated users access to invoke the api
    props?.userIdentity.identityPool.authenticatedRole.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["execute-api:Invoke"],
        resources: [this.api.api.arnForExecuteApi("*", "/*", "*")],
      }),
    );
  }
}
