import React, { ReactElement } from "react";
import { busIcon, commuterRailIcon, ferryIcon, genericSubwayIcon } from "../../helpers/icon";

interface Props {
  iconFn(classes: string): JSX.Element;
  name: string;
};

const FilterButton = ({iconFn, name}: Props): ReactElement<HTMLElement> => (
  <a href="#" className="btn btn-secondary filter-and-search__filter-button">
    {iconFn("c-svg__icon filter-and-search__mode-icon")} {name}
  </a>
);

export default FilterButton;
