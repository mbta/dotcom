import React from "react";
import { FallbackRender } from "@sentry/react";

// Adapted from the templates in DotcomWeb.ErrorView
// To be used in an ErrorBoundary
const ErrorPage: FallbackRender = errorData => {
  // eslint-disable-next-line no-console
  console.error("from Sentry", JSON.stringify(errorData));
  return (
    <div className="container error-page">
      <div className="row">
        <div className="col-md-6">
          <h1 className="u-mt-1">Oh no! We&#39;re experiencing delays.</h1>
          <p className="error-paragraph font-bold">
            Something went wrong on our end.
          </p>
          <div className="error-links">
            Go to{" "}
            <a className="c-call-to-action" href="/">
              {`the MBTA's home page`}
            </a>{" "}
            or{" "}
            <a className="c-call-to-action" href="/customer-support">
              report an issue
            </a>
            .
          </div>
        </div>
        <div className="col-md-6">
          <img alt="" src="/images/error-bus.gif" className="u-w-100" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
