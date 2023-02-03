import React, { ReactElement } from "react";
import { SuggestedTransfer } from "./__stop";
import StopCard from "./StopCard";

interface Props {
  suggestedTransfers: SuggestedTransfer[];
}

const SuggestedTransfers = ({
  suggestedTransfers
}: Props): ReactElement<HTMLElement> | null =>
  suggestedTransfers.length === 0 ? null : (
    <div>
      <h2>Suggested Transfers Nearby</h2>
      <div className="m-stop-page__transfers">
        {suggestedTransfers.map(
          ({
            stop,
            distance,
            routes_with_direction: routesWithDirection
          }: SuggestedTransfer) => (
            <StopCard
              key={`transfer${stop.id}`}
              stop={stop}
              distance={distance}
              routesWithDirection={routesWithDirection}
            />
          )
        )}
      </div>
    </div>
  );

export default SuggestedTransfers;
