import React from "react";
import { createRoot } from "react-dom/client";

import { NewTab } from "./NewTab";
import { PageRoot } from "../../components/PageRoot/PageRoot";

const container = document.querySelector("#root");

if (!container) {
  throw new Error("Could not find the root element!");
}

const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <PageRoot>
    <NewTab />
  </PageRoot>
);
