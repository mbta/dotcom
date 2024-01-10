import React, { ReactElement } from "react";

const Loading = (): ReactElement<HTMLElement> => (
  <div className="c-spinner__container">
    <div className="c-spinner">Loading...</div>
  </div>
);

export default Loading;
