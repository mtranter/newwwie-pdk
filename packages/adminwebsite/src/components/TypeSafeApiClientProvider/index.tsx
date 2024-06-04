/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { DefaultApiClientProvider as AdminApiApiClientProvider } from "@newwwie/adminapi-typescript-react-query-hooks";
import React from "react";
import { useAdminApiApiClient } from "../../hooks/useTypeSafeApiClient";

/**
 * Sets up the Type Safe Api clients.
 */
const TypeSafeApiClientProvider: React.FC<any> = ({ children }) => {
  const AdminApiClient = useAdminApiApiClient();

  return (
    <AdminApiApiClientProvider apiClient={AdminApiClient!}>
      {children}
    </AdminApiApiClientProvider>
  );
};

export default TypeSafeApiClientProvider;
