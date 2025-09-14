import React from "react";
import { createRoot } from "react-dom/client";

import { Panel } from "./Panel";
import { PageRoot } from "../../components/PageRoot/PageRoot";

const container = document.querySelector("#root");

if (!container) {
  throw new Error("Could not find the root element!");
}

const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <PageRoot>
    <Panel />
  </PageRoot>
);
