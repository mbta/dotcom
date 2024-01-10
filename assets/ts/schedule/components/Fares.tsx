import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import { Fare } from "./__schedule";
import { RouteType } from "../../__v3api";

const fareItem = (fare: Fare): ReactElement<HTMLElement> => (
  <p key={fare.title} className="m-schedule-page__fare">
    <span>{fare.title}</span>
    <span>{fare.price}</span>
  </p>
);

interface Props {
  fares: Fare[];
  fareLink: string;
  routeType: RouteType;
}

const Fares = ({
  fares,
  fareLink,
  routeType
}: Props): ReactElement<HTMLElement> | null =>
  fares.length > 0 ? (
    <ExpandableBlock
      header={{ text: "Fares", iconSvgText: null }}
      initiallyExpanded={false}
      id="fares"
    >
      <>
        {fares.map(f => fareItem(f))}
        {routeType === 2 && (
          <p>
            <a className="c-call-to-action" href="/fares/commuter-rail-fares">
              Commuter Rail Fares
            </a>
          </p>
        )}
        <p className="m-schedule-page__link">
          <a className="c-call-to-action" href={fareLink}>
            More about fares
          </a>
        </p>
      </>
    </ExpandableBlock>
  ) : null;

export default Fares;
