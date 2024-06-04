/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import "./index.css";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RuntimeContextProvider from "./components/RuntimeContext";
import Home from "./pages/Home";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider locale="en" messages={[messages]}>
      <BrowserRouter>
        <RuntimeContextProvider>
          <Home />
        </RuntimeContextProvider>
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>,
);
