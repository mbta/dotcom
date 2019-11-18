import React, { ReactElement } from "react";
import { Stop, Shape, Coordinates } from "./__shuttles";

interface Props {
  shapes: Shape[];
  stops: Stop[];
  center?: Coordinates;
}

const ShuttlesMap = ({
  shapes,
  stops,
  center
}: Props): ReactElement<HTMLElement> => (
  <div
    className="m-shuttles-map"
    style={{
      border: "1px dotted gray",
      backgroundColor: "#ee000011",
      height: "444px",
      fontSize: "12px"
    }}
  >
    Center?: {JSON.stringify(center)}
    <details>
      <summary>Shapes: ({shapes.length})</summary>
      {shapes.map(shape => (
        <p key={shape.id}>
          {shape.id} ({shape.is_shuttle_route ? "shuttle" : "not shuttle"}):{" "}
          {shape.direction_id}
        </p>
      ))}
    </details>
    <details>
      <summary>Stops: ({stops.length})</summary>
      {stops.map(stop => (
        <p key={stop.id}>
          {stop.id} {stop.name} ({stop.type}) - ({stop.latitude},
          {stop.longitude})
        </p>
      ))}
    </details>
  </div>
);

export default ShuttlesMap;
