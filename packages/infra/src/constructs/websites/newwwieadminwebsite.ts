import { UserIdentity } from "@aws/pdk/identity";
import { StaticWebsite } from "@aws/pdk/static-website";
import { Stack } from "aws-cdk-lib";
import { NagSuppressions } from "cdk-nag";
import { Construct } from "constructs";
import { AdminApi } from "../apis/adminapi";

/**
 * Website construct props
 */
export interface NewwwieadminwebsiteProps {
  /**
   * Instance of an API to configure the website to integrate with
   */
  readonly adminapi: AdminApi;

  /**
   * Instance of the UserIdentity.
   */
  readonly userIdentity: UserIdentity;
}

/**
 * Construct to deploy a Static Website
 */
export class Newwwieadminwebsite extends Construct {
  constructor(scope: Construct, id: string, props?: NewwwieadminwebsiteProps) {
    super(scope, id);

    const website = new StaticWebsite(this, id, {
      websiteContentPath: "../adminwebsite/build",
      runtimeOptions: {
        jsonPayload: {
          region: Stack.of(this).region,
          identityPoolId: props?.userIdentity.identityPool.identityPoolId,
          userPoolId: props?.userIdentity.userPool?.userPoolId,
          userPoolWebClientId:
            props?.userIdentity.userPoolClient?.userPoolClientId,
          typeSafeApis: { AdminApi: props?.adminapi.api.api.urlForPath() },
          typeSafeWebSocketApis: {},
        },
      },
    });

    NagSuppressions.addResourceSuppressions(
      website,
      [
        {
          id: "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
          reason:
            "Suppressed to allow unrestricted access. Not recommended in production.",
        },
      ],
      true,
    );
  }
}
