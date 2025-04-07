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
  alerts: Alert[];
  directionId: DirectionId;
  handleStopClick: (stop: RouteStop) => void;
  liveData?: LiveDataByStop;
  otherRouteStops: RouteStop[];
  route: Route;
  routeStopList: IndexedRouteStop[];
  stopTree: StopTree | null;
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
  alerts,
  handleStopClick,
  liveData,
  mergingInBranches,
  splittingOffBranches,
  stopId,
  stopTree
}: {
  alerts: Alert[];
  handleStopClick: (stop: RouteStop) => void;
  liveData?: LiveDataByStop;
  mergingInBranches: StopId[][];
  splittingOffBranches: StopId[];
  stopId: StopId;
  stopTree: StopTree;
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
            alerts={alerts}
            handleStopClick={handleStopClick}
            key={`branch-${startingId}`}
            liveData={liveData}
            stopIds={nonStartingStops} // Strip the merge stop
            stopTree={stopTree}
          />
        ]
      : [];
    const children = [
      <StopCard
        alerts={alertsByStop(alerts, startingId)}
        key={`stop-card-${startingId}`}
        liveData={liveData?.[startingId]}
        onClick={handleStopClick}
        routeStopList={[]}
        stopId={startingId}
        stopTree={stopTree}
      />,
      ...expandableBranch,
      <NextStopOrBranch
        alerts={alerts}
        handleStopClick={handleStopClick}
        key={`tail-${startingId}`}
        liveData={liveData}
        mergingInBranches={remainingMergingInBranches}
        splittingOffBranches={splittingOffBranches}
        stopId={stopId}
        stopTree={stopTree}
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
          alerts={alertsByStop(alerts, stopId)}
          key={stopId}
          liveData={liveData?.[stopId]}
          onClick={handleStopClick}
          routeStopList={[]}
          stopId={stopId}
          stopTree={stopTree}
        />,
        <NextStopOrBranch
          alerts={alerts}
          handleStopClick={handleStopClick}
          key={`${stopId}-${nextId}`}
          liveData={liveData}
          mergingInBranches={mergingInBranches}
          splittingOffBranches={newSplittingOffBranches}
          stopId={nextId}
          stopTree={stopTree}
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
        alerts={alertsByStop(alerts, stopId)}
        key={stopId}
        liveData={liveData?.[stopId]}
        onClick={handleStopClick}
        routeStopList={[]}
        stopId={stopId}
        stopTree={stopTree}
      />,
      <NextStopOrBranch
        alerts={alerts}
        handleStopClick={handleStopClick}
        key={`${stopId}-${nextId}`}
        liveData={liveData}
        mergingInBranches={mergingInBranchesWithNext}
        splittingOffBranches={[]}
        stopId={nextId}
        stopTree={stopTree}
      />
    ];

    return <>{children}</>;
  }

  return (
    <StopCard
      alerts={alertsByStop(alerts, stopId)}
      key={stopId}
      liveData={liveData?.[stopId]}
      onClick={handleStopClick}
      routeStopList={[]}
      stopId={stopId}
      stopTree={stopTree}
    />
  );
};

const LineDiagramWithStops = ({
  alerts,
  directionId,
  handleStopClick,
  liveData,
  otherRouteStops,
  route,
  routeStopList,
  stopTree
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
            alerts={alerts}
            directionId={directionId}
            liveData={liveData}
            route={route}
            stopTree={stopTree}
          />
        ) : (
          <SimpleDiagram
            alerts={alerts}
            directionId={directionId}
            liveData={liveData}
            route={route}
            routeStopList={routeStopList}
          />
        )}
        <ol>
          {stopTree ? (
            <NextStopOrBranch
              alerts={alerts}
              handleStopClick={handleStopClick}
              liveData={liveData}
              mergingInBranches={[]}
              splittingOffBranches={[]}
              stopId={longestPathStartingId(stopTree)}
              stopTree={stopTree}
            />
          ) : (
            <>
              {routeStopList.map(routeStop => (
                <StopCard
                  alerts={alertsByStop(alerts, routeStop.id)}
                  key={`stop-card-${routeStop.routeIndex}`}
                  liveData={liveData?.[routeStop.id]}
                  onClick={handleStopClick}
                  routeStopList={routeStopList}
                  stopId={routeStop.id}
                  stopTree={null}
                />
              ))}
            </>
          )}
        </ol>
        <OtherStopList
          alerts={alerts}
          handleStopClick={handleStopClick}
          otherRouteStops={otherRouteStops}
          route={route}
          stopTree={stopTree}
        />
      </div>
    </StopRefContext.Provider>
  );
};

export default LineDiagramWithStops;
