import React from "react";
import { render } from "react-dom";
import ShuttlesPage from "./components/ShuttlesPage";

const shuttles = (): void => {
  const shuttlesRootEl = document.getElementById("react-shuttles-root");
  if (!shuttlesRootEl) {
    return;
  }

  render(<ShuttlesPage />, shuttlesRootEl);
};

export default shuttles;
