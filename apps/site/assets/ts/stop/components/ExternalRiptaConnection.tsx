import React, { ReactElement } from "react";
import { TypedRoutes } from "./__stop";
import PillLink from "./PillLink";

export const bgClass = (color: string | undefined): string =>
  color ? `u-bg--${color}` : "";

const riptaRouteIDs = ["CR-Providence"];

// used to display the external link to the ripta website
const containsRIPTARoute = (routes: TypedRoutes[]): boolean => {
  return routes.some(route => {
    return route.routes.some(route2 => {
      return riptaRouteIDs.includes(route2.route.id);
    });
  });
};

const ExternalRiptaConnection = ({
  routes
}: {
  routes: TypedRoutes[];
}): ReactElement<HTMLElement> => {
  if (containsRIPTARoute(routes)) {
    return (
      <div className="mt-16 m-external-connections">
        <div className="u-bold">EXTERNAL CONNECTIONS</div>
        <div className="m-route-pills">
          <PillLink
            displayText="RIPTA"
            linkText="https://www.ripta.com/"
            backgroundColor="gray"
            externalLink
          />
        </div>
      </div>
    );
  }

  return <></>;
};

export default ExternalRiptaConnection;
