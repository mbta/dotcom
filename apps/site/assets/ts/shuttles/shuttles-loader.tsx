import React from "react";
import { render } from "react-dom";
import ShuttlesPage from "./components/ShuttlesPage";

const shuttles = (): void => {
  const shuttlesPageDataEl = document.getElementById("shuttles-page-data");
  if (!shuttlesPageDataEl) return;
  const shuttlesPageData = JSON.parse(shuttlesPageDataEl.innerHTML);

  const shuttlesRootEl = document.getElementById("react-shuttles-root");
  if (!shuttlesRootEl) {
    return;
  }

  render(<ShuttlesPage {...shuttlesPageData} />, shuttlesRootEl);
};

export default shuttles;
