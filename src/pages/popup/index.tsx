import React from "react";
import { createRoot } from "react-dom/client";

import { PageRoot } from "../../components/PageRoot/PageRoot";
import { Popup } from "./Popup";

// Note: 'root' is the preferred id here,
// you won't have to configure Modal component if you use 'root' document.
const container = document.querySelector("#root");

if (!container) {
  throw new Error("Could not find the root element!");
}

const root = createRoot(container);
root.render(
  <PageRoot>
    <Popup />
  </PageRoot>
);
