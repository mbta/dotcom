import React, { ReactElement } from "react";

interface Props {
  modeName: string;
}

const titleCase = (str: string): string => {
  const words = str.split(" ");
  const titleCasedWords = words.map(
    word => word[0].toUpperCase() + word.slice(1)
  );
  return titleCasedWords.join(" ");
};

const pillText = (modeName: string): string =>
  titleCase(modeName.replace(/-/g, " "));

const RoutePill = ({ modeName }: Props): ReactElement<HTMLElement> => {
  const className = `m-stop-page__header-feature m-stop-page__header-description u-small-caps u-bg--${modeName}`;
  return <span className={className}>{pillText(modeName)}</span>;
};

export default RoutePill;
