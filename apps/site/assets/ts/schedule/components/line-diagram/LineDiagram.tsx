import React, { ReactElement, useState } from "react";
import { useInterval } from "use-interval";
import { useFetch } from "react-async";

import {
  LineDiagramStop,
  LineDiagramVehicle,
  RoutePatternsByDirection,
  SimpleStopMap,
  RouteStop,
  StopData,
  ServiceInSelector,
  ScheduleNote as ScheduleNoteType
} from "../__schedule";
import SingleStop from "./SingleStop";
import Modal from "../../../components/Modal";
import ScheduleModalContent from "../schedule-finder/ScheduleModalContent";
import { DirectionId, Headsign, Route } from "../../../__v3api";
import ExpandableBranch from "./ExpandableBranch";
import useFilteredList from "../../../hooks/useFilteredList";
import SearchBox from "../../../components/SearchBox";

interface Props {
  lineDiagram: LineDiagramStop[];
  route: Route;
  directionId: DirectionId;
  routePatternsByDirection: RoutePatternsByDirection;
  services: ServiceInSelector[];
  stops: SimpleStopMap;
  today: string;
  scheduleNote: ScheduleNoteType | null;
}

export interface LiveDataByStop {
  [stopId: string]: LiveData;
}

export interface LiveData {
  headsigns: Headsign[];
  vehicles: LineDiagramVehicle[];
}

const getMergeStops = (lineDiagram: LineDiagramStop[]): LineDiagramStop[] =>
  lineDiagram.filter(
    ({ stop_data: stopData }: LineDiagramStop) =>
      stopData.some(sd => sd.type === "merge") && stopData.length > 1
  );

const getTreeDirection = (
  lineDiagram: LineDiagramStop[]
): "outward" | "inward" => {
  // determines if tree should fan out or collect branches as we go down the page
  // use the position of the merge stop to find this. assume default of outward
  const mergeStops = getMergeStops(lineDiagram);
  let direction: "outward" | "inward" = "outward";
  if (mergeStops) {
    const mergeIndices = mergeStops.map((ms: LineDiagramStop) =>
      lineDiagram.indexOf(ms)
    );
    const branchTerminiIndices = lineDiagram
      .filter(
        (lds: LineDiagramStop) =>
          lds.route_stop["is_terminus?"] && lds.stop_data.length > 1
      )
      .map((lds: LineDiagramStop) => lineDiagram.indexOf(lds));

    direction = branchTerminiIndices.some(i => mergeIndices[0] > i)
      ? "inward"
      : "outward";
  }

  return direction;
};

const LineDiagram = ({
  lineDiagram,
  route,
  directionId,
  routePatternsByDirection,
  services,
  stops,
  today,
  scheduleNote
}: Props): ReactElement<HTMLElement> | null => {
  const routeType = route.type;
  const routeColor: string = route.color || "#000";
  const [modalState, setModalState] = useState<{
    selectedOrigin: RouteStop;
    directionId: DirectionId;
    modalOpen: boolean;
  }>({
    selectedOrigin: lineDiagram[0].route_stop,
    directionId,
    modalOpen: false
  });

  const {
    data: maybeLiveData,
    isLoading: liveDataIsLoading,
    // @ts-ignore https://github.com/async-library/react-async/issues/244
    reload: reloadLiveData
  } = useFetch(
    `/schedules/line_api/realtime?id=${route.id}&direction_id=${directionId}`,
    {},
    { json: true, watch: directionId }
  );
  const liveData = (maybeLiveData || {}) as LiveDataByStop;

  useInterval(() => {
    requestAnimationFrame(() => {
      if (!document.hidden && !liveDataIsLoading) reloadLiveData();
    });
  }, 15000);

  const handleStopClick = (stop: RouteStop): void => {
    const { "is_beginning?": isBeginning, "is_terminus?": isTerminus } = stop;
    const isDestination = isTerminus && !isBeginning;
    const reverseDirectionId = directionId === 0 ? 1 : 0;

    setModalState({
      selectedOrigin: stop,
      directionId: isDestination ? reverseDirectionId : directionId,
      modalOpen: true
    });
  };

  const treeDirection = getTreeDirection(lineDiagram);

  // identify stops where the diagram will branch off
  const mergeIndices = lineDiagram
    .filter((lds: LineDiagramStop, idx: number) => {
      if (idx > 0 && idx < lineDiagram.length - 1) {
        let adjacentStopData: StopData[];
        if (treeDirection === "inward") {
          adjacentStopData = lineDiagram[idx + 1].stop_data;
        } else {
          adjacentStopData = lineDiagram[idx - 1].stop_data;
        }
        return adjacentStopData.some(sd => sd.type === "merge");
      }
      return false;
    })
    .map((ms: LineDiagramStop) => {
      const i = lineDiagram.indexOf(ms);
      return treeDirection === "inward" ? i + 1 : i - 1;
    });

  // identify the stops where we should collapse branches
  const toggledStopIndices = mergeIndices.length
    ? lineDiagram
        .filter(
          ({ route_stop: routeStop, stop_data: stopData }: LineDiagramStop) =>
            (stopData.some(sd => sd.type === "stop") &&
              stopData.some(sd => sd.type === "line")) ||
            (stopData.length === 1 &&
              routeStop.branch &&
              stopData[0].type !== "terminus")
        )
        .map((ms: LineDiagramStop) => lineDiagram.indexOf(ms))
    : [];

  // build list of stops including branching
  let branchedLineDiagram: (LineDiagramStop | LineDiagramStop[])[] = [];
  if (mergeIndices.length) {
    lineDiagram.forEach((ld, ldIndex) => {
      if (toggledStopIndices.includes(ldIndex)) {
        if (
          Array.isArray(branchedLineDiagram[branchedLineDiagram.length - 1])
        ) {
          (branchedLineDiagram[
            branchedLineDiagram.length - 1
          ] as LineDiagramStop[]).push(ld);
        } else {
          branchedLineDiagram.push([ld]);
        }
      } else {
        branchedLineDiagram.push(ld);
      }
    });
  } else {
    branchedLineDiagram = lineDiagram;
  }

  const [stopQuery, setStopQuery, filteredStops] = useFilteredList(
    lineDiagram,
    "route_stop.name"
  );

  const FilteredStopList = (
    <div
      className={`m-schedule-diagram m-schedule-diagram--${treeDirection} m-schedule-diagram--searched`}
    >
      {filteredStops.length ? (
        (filteredStops as LineDiagramStop[]).map((stop: LineDiagramStop) => (
          <SingleStop
            key={stop.route_stop.id}
            stop={stop}
            onClick={handleStopClick}
            color={routeColor}
            liveData={liveData[stop.route_stop.id]}
            searchQuery={stopQuery}
          />
        ))
      ) : (
        /* istanbul ignore next */ <div className="c-alert-item c-alert-item--low c-alert-item__top-text-container">
          No stops {route.direction_names[directionId]} to{" "}
          {route.direction_destinations[directionId]} matching{" "}
          <b className="u-highlight">{stopQuery}</b>. Try changing your
          direction or adjusting your search.
        </div>
      )}
    </div>
  );

  const stationsOrStops =
    routeType === 0 || routeType === 1 || routeType === 2
      ? "Stations"
      : "Stops";

  return (
    <>
      <h3 className="m-schedule-diagram__heading">{stationsOrStops}</h3>
      <SearchBox
        id="stop-search"
        labelText={`Search for a ${stationsOrStops.toLowerCase().slice(0, -1)}`}
        onChange={setStopQuery}
        className="m-schedule-diagram__filter"
      />
      {stopQuery !== "" ? (
        FilteredStopList
      ) : (
        <div
          className={`m-schedule-diagram m-schedule-diagram--${treeDirection}`}
        >
          {branchedLineDiagram.map(
            (stopOrStops: LineDiagramStop | LineDiagramStop[], bldIndex) => {
              if (Array.isArray(stopOrStops)) {
                if (stopOrStops.length > 2) {
                  let willMerge = false;
                  const adjacentIndex =
                    treeDirection === "inward" ? bldIndex + 1 : bldIndex - 1;
                  const adjacentStop = branchedLineDiagram[
                    adjacentIndex
                  ] as LineDiagramStop;
                  if (adjacentStop && !Array.isArray(adjacentStop)) {
                    willMerge = mergeIndices.includes(
                      lineDiagram.indexOf(adjacentStop)
                    );
                  }

                  return (
                    <ExpandableBranch
                      key={`${stopOrStops[0].route_stop.id}-${
                        stopOrStops.length
                      }-stops`}
                      branchData={stopOrStops}
                      onStopClick={handleStopClick}
                      color={routeColor}
                      willMerge={willMerge}
                      liveDataByStop={liveData}
                    />
                  );
                }

                // is an array of 1-2 stops; show as expanded
                return (
                  <div
                    key={`${stopOrStops[0].route_stop.id}-${
                      stopOrStops.length
                    }-stops`}
                    className="m-schedule-diagram__expanded"
                  >
                    {stopOrStops.map(stop => (
                      <SingleStop
                        key={stop.route_stop.id}
                        stop={stop}
                        onClick={handleStopClick}
                        color={routeColor}
                        liveData={liveData[stop.route_stop.id]}
                      />
                    ))}
                  </div>
                );
              }

              return (
                <SingleStop
                  key={stopOrStops.route_stop.id}
                  stop={stopOrStops}
                  onClick={handleStopClick}
                  color={routeColor}
                  liveData={liveData[stopOrStops.route_stop.id]}
                />
              );
            }
          )}
        </div>
      )}
      <Modal
        openState={modalState.modalOpen}
        closeModal={() => {
          setModalState({ ...modalState, modalOpen: false });
        }}
        ariaLabel={{
          label: `Schedules to ${route.direction_names[directionId]}`
        }}
      >
        {() => (
          <ScheduleModalContent
            route={route}
            selectedDirection={modalState.directionId}
            selectedOrigin={modalState.selectedOrigin.id}
            services={services}
            stops={stops[directionId]}
            routePatternsByDirection={routePatternsByDirection}
            today={today}
            scheduleNote={scheduleNote}
          />
        )}
      </Modal>
    </>
  );
};

export default LineDiagram;
