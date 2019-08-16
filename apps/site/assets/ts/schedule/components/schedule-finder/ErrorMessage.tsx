import React, { ReactElement } from "react";

interface ErrorMessageProps {
  directionError: boolean;
  originError: boolean;
}

const ErrorMessage = ({
  directionError,
  originError
}: ErrorMessageProps): ReactElement<HTMLElement> | null => {
  if (!directionError && !originError) {
    return null;
  }

  let message = "an origin and direction";
  if (!directionError && originError) {
    message = "an origin";
  }
  if (directionError && !originError) {
    message = "a direction";
  }

  return (
    <div className="error-container">
      <span role="alert">Please provide {message}</span>
    </div>
  );
};

export default ErrorMessage;
