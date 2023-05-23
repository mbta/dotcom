import React from "react";
import { Route } from "../__v3api";
import { isASilverLineRoute } from "../models/route";
import { breakTextAtSlash } from "./text";
import { busClass } from "./css";

const routeName = (route: Route): JSX.Element => (
  <span className={busClass(route)}>
    {isASilverLineRoute(route.id)
      ? `Silver Line ${route.name}`
      : breakTextAtSlash(route.name)}
  </span>
);

export default routeName;
