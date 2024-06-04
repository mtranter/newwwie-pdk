import useSigV4Client from "@aws-northstar/ui/components/CognitoAuth/hooks/useSigv4Client";
import {
  DefaultApi as AdminApiApi,
  Configuration as AdminApiApiConfiguration,
} from "@newwwie/adminapi-typescript-react-query-hooks";
import { useContext, useMemo } from "react";
import { RuntimeConfigContext } from "../components/RuntimeContext";

export const useAdminApiApiClient = () => {
  const client = useSigV4Client();
  const runtimeContext = useContext(RuntimeConfigContext);

  return useMemo(() => {
    return runtimeContext?.typeSafeApis?.AdminApi
      ? new AdminApiApi(
          new AdminApiApiConfiguration({
            basePath: runtimeContext.typeSafeApis.AdminApi,
            fetchApi: client,
          }),
        )
      : undefined;
  }, [client, runtimeContext?.typeSafeApis?.AdminApi]);
};
