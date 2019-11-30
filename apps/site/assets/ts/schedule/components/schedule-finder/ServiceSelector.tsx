import React, { ReactElement, useEffect, useState, useReducer } from "react";
import SelectContainer from "./SelectContainer";
import {
  ServicesKeyedByGroup,
  groupServiceByDate,
  groupByType,
  ServiceOptGroupName,
  ServiceByOptGroup,
  hasMultipleWeekdaySchedules
} from "../../../helpers/service";
import { reducer } from "../../../helpers/fetch";
import ScheduleTable from "./ScheduleTable";
import { SelectedDirection } from "../ScheduleFinder";
import { EnhancedRoutePattern, ServiceInSelector } from "../__schedule";
import ServiceOptGroup from "./ServiceOptGroup";
import { Journey } from "../__trips";

// until we come up with a good integration test for async with loading
// some lines in this file have been ignored from codecov

const optGroupNames: ServiceOptGroupName[] = ["current", "holiday", "future"];

const optGroupTitles: { [key in ServiceOptGroupName]: string } = {
  current: "Current Schedules",
  holiday: "Holiday Schedules",
  future: "Future Schedules"
};

interface Props {
  stopId: string;
  services: ServiceInSelector[];
  ratingEndDate: string;
  routeId: string;
  directionId: SelectedDirection;
  routePatterns: EnhancedRoutePattern[];
}

const getSelectedService = (
  services: ServiceInSelector[],
  selectedServiceId: string
): ServiceInSelector => {
  const selectedService = services.find(
    service => service.id === selectedServiceId
  );
  return selectedService!;
};

const getServicesByOptGroup = (
  services: ServiceInSelector[],
  ratingEndDate: string
): ServicesKeyedByGroup =>
  services
    .reduce(
      (acc, service) => [...acc, ...groupServiceByDate(service, ratingEndDate)],
      [] as ServiceByOptGroup[]
    )
    .reduce(groupByType, { current: [], holiday: [], future: [] });

const getDefaultServiceId = (services: ServiceInSelector[]): string => {
  const currentService = services.find(
    service => service["default_service?"] === true
  );
  return currentService ? currentService.id : services[0].id;
};

type fetchAction =
  | { type: "FETCH_COMPLETE"; payload: Journey[] }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

export const fetchData = (
  routeId: string,
  stopId: string,
  selectedService: ServiceInSelector,
  selectedDirection: SelectedDirection,
  isCurrentService: boolean,
  dispatch: (action: fetchAction) => void
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });
  return (
    window.fetch &&
    window
      .fetch(
        `/schedules/finder_api/journeys?id=${routeId}&date=${
          selectedService.end_date
        }&direction=${selectedDirection}&stop=${stopId}&is_current=${isCurrentService}`
      )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(json => dispatch({ type: "FETCH_COMPLETE", payload: json }))
      // @ts-ignore
      .catch(() => dispatch({ type: "FETCH_ERROR" }))
  );
};

export const ServiceSelector = ({
  stopId,
  services,
  ratingEndDate,
  routeId,
  directionId,
  routePatterns
}: Props): ReactElement<HTMLElement> | null => {
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: false
  });

  useEffect(
    () => {
      const selectedService = services.find(
        service => service.id === selectedServiceId
      );

      if (services.length <= 0) return;

      const defaultServiceId = getDefaultServiceId(services);
      const isCurrentService = selectedServiceId === defaultServiceId;

      /* istanbul ignore next */
      if (!selectedService) return;

      fetchData(
        routeId,
        stopId,
        selectedService,
        directionId,
        isCurrentService,
        dispatch
      );
    },
    [services, routeId, directionId, stopId, selectedServiceId]
  );

  if (services.length <= 0) return null;

  const servicesByOptGroup = getServicesByOptGroup(services, ratingEndDate);
  const defaultServiceId = getDefaultServiceId(services);

  if (!selectedServiceId) {
    setSelectedServiceId(defaultServiceId);
  }

  const selectedService = getSelectedService(services, selectedServiceId);

  return (
    <>
      <h3>Daily Schedule</h3>
      <div className="schedule-finder__service-selector">
        <SelectContainer id="service_selector_container" error={false}>
          <select
            id="service_selector"
            className="c-select-custom"
            defaultValue={defaultServiceId}
            onChange={(e): void => {
              setSelectedServiceId(e.target.value);
            }}
          >
            {optGroupNames.map((group: ServiceOptGroupName) => {
              const multipleWeekdays = hasMultipleWeekdaySchedules(
                servicesByOptGroup[group].map(service => service.service)
              );

              return (
                <ServiceOptGroup
                  key={group}
                  group={group}
                  label={optGroupTitles[group]}
                  services={servicesByOptGroup[group]}
                  multipleWeekdays={multipleWeekdays}
                />
              );
            })}
          </select>
        </SelectContainer>
      </div>

      {state.isLoading && (
        <div className="c-spinner__container">
          <div className="c-spinner">Loading...</div>
        </div>
      )}

      {/* istanbul ignore next */ !state.isLoading &&
        /* istanbul ignore next */ state.data && (
          /* istanbul ignore next */ <ScheduleTable
            journeys={state.data!}
            routePatterns={routePatterns}
            input={{
              route: routeId,
              origin: stopId,
              direction: directionId,
              date: selectedService.end_date
            }}
          />
        )}
    </>
  );
};

export default ServiceSelector;
