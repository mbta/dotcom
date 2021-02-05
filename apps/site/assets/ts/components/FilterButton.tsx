import React, { ReactElement } from "react";

type IsSelectedFunction<T> = (identifier: T) => boolean;

interface Props<T> {
  identifier: T;
  icon: ReactElement<HTMLElement> | string | null;
  name: string;
  isSelected: IsSelectedFunction<T>;
  onClick: (identifier: T) => () => void;
}

// The second, dummy type parameter below works around a quirk of using
// generics in TSX files. In a TSX file, if you have a single type parameter
// in angle brackets like <TypeName>, the compiler will try to interpret that
// as an opening "TypeName" TSX tag. The dummy type parameter keeps the compiler
// from trying to interpret the type params as a tag.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FilterButton = <T, _>({
  identifier,
  icon,
  name,
  isSelected,
  onClick
}: Props<T>): ReactElement<HTMLElement> => (
  <button
    className={`btn btn-secondary btn-sm m-tnm-sidebar__filter-btn ${
      isSelected(identifier) ? "active" : "inactive"
    }`}
    id={`mode-button__${identifier}`}
    onClick={onClick(identifier)}
    type="button"
    aria-label={
      isSelected(identifier)
        ? `remove filter by ${identifier}`
        : `add filter by ${identifier}`
    }
  >
    {icon}
    {name}
  </button>
);

export default FilterButton;
