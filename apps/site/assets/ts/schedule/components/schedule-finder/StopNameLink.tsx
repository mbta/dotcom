import React, { ReactElement } from "react";
import { SimpleStop } from "../__schedule";

interface Props {
  selectedOrigin: string;
  stops: SimpleStop[];
}

const StopNameLink = ({
  selectedOrigin,
  stops
}: Props): ReactElement<HTMLElement> | null => {
  const stop = stops.find(({ id }) => id === selectedOrigin);
  return <a href={`/stops/${stop!.id}`}>{stop!.name}</a>;
};

export default StopNameLink;
