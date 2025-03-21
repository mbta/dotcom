import { partition } from "lodash";
import React, { ReactElement } from "react";
import {
  longestPath,
  longestPathStartingId,
  newBranchesStartingInSlice,
  nextStopIds
} from "../../../helpers/stop-tree";
import { hasPredictionTime } from "../../../models/prediction";
import { Alert, DirectionId, Route } from "../../../__v3api";
import { IndexedRouteStop, RouteStop, StopId, StopTree } from "../__schedule";
import { Diagram, SimpleDiagram } from "./graphics/Diagram";
import useTreeStopPositions, { RefMap } from "./graphics/useTreeStopPositions";
import ExpandableBranch from "./ExpandableBranch";
import StopCard from "./StopCard";
import { LiveDataByStop } from "./__line-diagram";
import { alertsByStop } from "../../../models/alert";
import OtherStopList from "./OtherStopList";

interface Props {
  stopTree: StopTree | null;
  routeStopList: IndexedRouteStop[];
  route: Route;
  directionId: DirectionId;
  alerts: Alert[];
  handleStopClick: (stop: RouteStop) => void;
  liveData?: LiveDataByStop;
  otherRouteStops: RouteStop[];
}

export const StopRefContext = React.createContext<[RefMap, () => void]>([
  new Map(),
  () => {}
]);

const stopsToTerminus = (stopTree: StopTree, stopId: StopId): StopId[] => [
  stopId,
  ...nextStopIds(stopTree, stopId).flatMap(nextId =>
    stopsToTerminus(stopTree, nextId)
  )
];

const nextPrimaryAndBranches = (
  stopTree: StopTree,
  stopIds: StopId[]
): [StopId, StopId[]] => {
  const primaryPath = longestPath(stopTree);
  const [primary, branches] = partition(stopIds, id =>
    primaryPath.includes(id)
  );

  return [primary[0], branches];
};

const NextStopOrBranch = ({
  stopTree,
  stopId,
  alerts,
  mergingInBranches,
  splittingOffBranches,
  handleStopClick,
  liveData
}: {
  stopTree: StopTree;
  stopId: StopId;
  alerts: Alert[];
  mergingInBranches: StopId[][];
  splittingOffBranches: StopId[];
  handleStopClick: (stop: RouteStop) => void;
  liveData?: LiveDataByStop;
}): ReactElement<HTMLElement> => {
  // Splitting off branch
  if (splittingOffBranches.length) {
    const splittingOffBranch =
      splittingOffBranches[splittingOffBranches.length - 1];
    const remainingSplittingOffBranches = splittingOffBranches.slice(0, -1);

    const branchStopIds = stopsToTerminus(stopTree, splittingOffBranch);
    const terminalStopId = branchStopIds[branchStopIds.length - 1];
    const nonTerminalStops = branchStopIds.slice(0, -1);
    const expandableBranch = nonTerminalStops.length
      ? [
          <ExpandableBranch
            key={`branch-${terminalStopId}`}
            stopTree={stopTree}
            // Strip the terminus stop
            stopIds={nonTerminalStops}
            alerts={alerts}
            handleStopClick={handleStopClick}
            liveData={liveData}
          />
        ]
      : [];
    const children = [
      ...expandableBranch,
      <StopCard
        key={`stop-card-${terminalStopId}`}
        stopTree={stopTree}
        routeStopList={[]}
        stopId={terminalStopId}
        alerts={alertsByStop(alerts, terminalStopId)}
        onClick={handleStopClick}
        liveData={liveData?.[terminalStopId]}
      />,
      <NextStopOrBranch
        key={`tail-${terminalStopId}`}
        stopTree={stopTree}
        stopId={stopId}
        alerts={alerts}
        mergingInBranches={mergingInBranches}
        splittingOffBranches={remainingSplittingOffBranches}
        handleStopClick={handleStopClick}
        liveData={liveData}
      />
    ];

    return <>{children}</>;
  }

  const newMergingInBranches: StopId[][] = mergingInBranches.concat(
    newBranchesStartingInSlice(stopTree, stopId).map(id => [id])
  );

  const mergingBranch: StopId[] | undefined = newMergingInBranches.find(
    branch => branch[branch.length - 1] === stopId
  );

  // Merging in branch
  if (mergingBranch) {
    const remainingMergingInBranches = mergingInBranches.filter(
      branch => branch !== mergingBranch
    );
    const startingId: StopId = mergingBranch[0];
    const nonStartingStops = mergingBranch.slice(1, -1);

    const expandableBranch = nonStartingStops.length
      ? [
          <ExpandableBranch
            key={`branch-${startingId}`}
            stopTree={stopTree}
            // Strip the merge stop
            stopIds={nonStartingStops}
            alerts={alerts}
            handleStopClick={handleStopClick}
            liveData={liveData}
          />
        ]
      : [];
    const children = [
      <StopCard
        key={`stop-card-${startingId}`}
        stopTree={stopTree}
        routeStopList={[]}
        stopId={startingId}
        alerts={alertsByStop(alerts, startingId)}
        onClick={handleStopClick}
        liveData={liveData?.[startingId]}
      />,
      ...expandableBranch,
      <NextStopOrBranch
        key={`tail-${startingId}`}
        stopTree={stopTree}
        stopId={stopId}
        alerts={alerts}
        mergingInBranches={remainingMergingInBranches}
        splittingOffBranches={splittingOffBranches}
        handleStopClick={handleStopClick}
        liveData={liveData}
      />
    ];

    return <>{children}</>;
  }

  // Primary branch
  const nextIds = nextStopIds(stopTree, stopId);
  if (nextIds.length) {
    const [nextId, newSplittingOffBranches] = nextPrimaryAndBranches(
      stopTree,
      nextIds
    );

    if (newSplittingOffBranches.length) {
      // Display splitting off branches before any next stops on the primary branch
      const children = [
        <StopCard
          key={stopId}
          stopTree={stopTree}
          routeStopList={[]}
          stopId={stopId}
          alerts={alertsByStop(alerts, stopId)}
          onClick={handleStopClick}
          liveData={liveData?.[stopId]}
        />,
        <NextStopOrBranch
          key={`${stopId}-${nextId}`}
          stopTree={stopTree}
          stopId={nextId}
          alerts={alerts}
          mergingInBranches={mergingInBranches}
          splittingOffBranches={newSplittingOffBranches}
          handleStopClick={handleStopClick}
          liveData={liveData}
        />
      ];

      return <>{children}</>;
    }

    const mergingInBranchesWithNext = newMergingInBranches.map(branch => {
      const lastStopId: StopId = branch[branch.length - 1];
      return branch.concat(nextStopIds(stopTree, lastStopId));
    });

    const children = [
      <StopCard
        key={stopId}
        stopTree={stopTree}
        routeStopList={[]}
        stopId={stopId}
        alerts={alertsByStop(alerts, stopId)}
        onClick={handleStopClick}
        liveData={liveData?.[stopId]}
      />,
      <NextStopOrBranch
        key={`${stopId}-${nextId}`}
        stopTree={stopTree}
        stopId={nextId}
        alerts={alerts}
        mergingInBranches={mergingInBranchesWithNext}
        splittingOffBranches={[]}
        handleStopClick={handleStopClick}
        liveData={liveData}
      />
    ];

    return <>{children}</>;
  }

  return (
    <StopCard
      key={stopId}
      stopTree={stopTree}
      routeStopList={[]}
      stopId={stopId}
      alerts={alertsByStop(alerts, stopId)}
      onClick={handleStopClick}
      liveData={liveData?.[stopId]}
    />
  );
};

const LineDiagramWithStops = ({
  stopTree,
  routeStopList,
  route,
  directionId,
  alerts,
  handleStopClick,
  liveData,
  otherRouteStops
}: Props): ReactElement<HTMLElement> => {
  // create a ref for each stop - we will use this to track the location of the stop so we can place the line diagram bubbles
  const [stopRefsMap, updateAllStopCoords] = useTreeStopPositions(
    stopTree || routeStopList
  );

  const anyCrowding = Object.values(
    liveData || {}
  ).some(({ headsigns }): boolean =>
    headsigns
      ? headsigns
          .filter(hasPredictionTime)
          .some(
            ({ time_data_with_crowding_list: timeData }): boolean =>
              !!timeData[0].crowding
          )
      : false
  );

  return (
    <StopRefContext.Provider value={[stopRefsMap, updateAllStopCoords]}>
      <div
        className={`m-schedule-diagram ${
          !anyCrowding ? "u-no-crowding-data" : ""
        }`}
      >
        {stopTree ? (
          <Diagram
            stopTree={stopTree}
            route={route}
            directionId={directionId}
            alerts={alerts}
            liveData={liveData}
          />
        ) : (
          <SimpleDiagram
            routeStopList={routeStopList}
            route={route}
            directionId={directionId}
            alerts={alerts}
            liveData={liveData}
          />
        )}
        <ol>
          {stopTree ? (
            <NextStopOrBranch
              stopTree={stopTree}
              stopId={longestPathStartingId(stopTree)}
              alerts={alerts}
              mergingInBranches={[]}
              splittingOffBranches={[]}
              handleStopClick={handleStopClick}
              liveData={liveData}
            />
          ) : (
            <>
              {routeStopList.map(routeStop => (
                <StopCard
                  key={`stop-card-${routeStop.routeIndex}`}
                  stopTree={null}
                  routeStopList={routeStopList}
                  stopId={routeStop.id}
                  alerts={alertsByStop(alerts, routeStop.id)}
                  onClick={handleStopClick}
                  liveData={liveData?.[routeStop.id]}
                />
              ))}
            </>
          )}
          <OtherStopList
            alerts={alerts}
            handleStopClick={handleStopClick}
            otherRouteStops={otherRouteStops}
            stopTree={stopTree}
          />
        </ol>
      </div>
    </StopRefContext.Provider>
  );
};

export default LineDiagramWithStops;
