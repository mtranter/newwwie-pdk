import {
  DefaultApi,
  Configuration,
} from "@newwwie/publicapi-typescript-react-query-hooks";
import { useContext, useMemo } from "react";
import { RuntimeConfigContext } from "../components/RuntimeContext";

export const usePublicApiApiClient = () => {
  const runtimeContext = useContext(RuntimeConfigContext);

  return useMemo(() => {
    return runtimeContext?.typeSafeApis?.PublicApi
      ? new DefaultApi(
          new Configuration({
            basePath: runtimeContext.typeSafeApis.PublicApi,
            fetchApi: fetch,
          }),
        )
      : undefined;
  }, [runtimeContext?.typeSafeApis?.PublicApi]);
};
