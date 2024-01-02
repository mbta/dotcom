import React, { ReactElement } from "react";

const Feedback = (): ReactElement<HTMLElement> => {
  const url =
    /* istanbul ignore next */
    typeof document !== "undefined"
      ? `/customer-support?comments=${document.title}`
      : `/customer-support`;
  return (
    <div className="c-feedback">
      <h3>Feedback</h3>
      Please report issues with cleanliness, signage, and any other concerns you
      may have. We will do our best to address the issues as soon as possible.
      <a href={url} className="btn btn-secondary c-feedback__button">
        Contact us
      </a>
    </div>
  );
};

export default Feedback;
