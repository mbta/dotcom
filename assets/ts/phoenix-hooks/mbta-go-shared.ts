import { FilteredStopDetails, Nullable, State } from "mbta-go-shared";
import { ViewHook } from "phoenix_live_view";

// const { Approaching,Arriving, Boarding, Cancelled, Disruption, Hidden, Minutes, ScheduleMinutes, ScheduleTime, ScheduleTimeWithStatus, Skipped, Time, TimeWithSchedule, TimeWithStatus } = State.UpcomingFormat;

interface FSDHook extends ViewHook {
  fsd: FilteredStopDetails;
}

/* The enum-based formats serialize to empty %{}, so we need to fix those */
function PredictionFormat(tile: State.Tile): Object {
  const { format } = tile;
  let betterFormat: string | Nullable<State.UpcomingFormat>;
  console.log(format.toString())
  switch (true) {
    case format === State.UpcomingFormat.Approaching:
      betterFormat = { minutes: 1 };
      break;
    case format === State.UpcomingFormat.Arriving:
      betterFormat = { code: "Arriving" };
      break;
    case format === State.UpcomingFormat.Boarding:
      betterFormat = { code: "Boarding" };
      break;
    case format === State.UpcomingFormat.Now:
      betterFormat = { code: "Now" };
      break;
    case format instanceof State.UpcomingFormat.Skipped:
    case format instanceof State.UpcomingFormat.Cancelled:
      betterFormat = { bypassed: format.scheduledTime };
      break;
    default:
      betterFormat = format;
  }

  return { ...tile, format: betterFormat };
}

const FSDHook: Partial<FSDHook> = {
  mounted() {
    const { dataset } = this.el!;
    const { backendUrl, route, direction, stop } = dataset;
    if (backendUrl && route && direction && stop) {
      this.fsd = new FilteredStopDetails(backendUrl);
      this.fsd.setFilters(
        stop,
        route,
        parseInt(direction, 10),
        null,
        null,
        null
      );
      this.fsd.setActive(true);

      this.fsd.onNewState((state: State | null | undefined) => {
        if (state && state.upcomingTripTiles) {
          const departures = state.upcomingTripTiles
            .asJsReadonlyArrayView()
            .filter(({ format }) => format !== State.UpcomingFormat.Hidden)
            .map(PredictionFormat);

          console.log(departures);

          if (this.pushEvent) {
            this.pushEvent("fsd", { departures });
          }
        }
      });
    } else {
      // eslint-disable-next-line no-console
      console.error("Could not set up FilteredStopDetails");
    }
  },
  updated() {
    if (this.fsd) {
      const { dataset } = this.el!;
      const { route, direction, stop } = dataset;
      if (route && direction && stop) {
        this.fsd.setFilters(
          stop,
          route,
          parseInt(direction, 10),
          null,
          null,
          null
        );
      }
    }
  },
  destroyed() {
    if (this.fsd) {
      this.fsd.setActive(false);
    }
  },
  disconnected() {
    if (this.fsd) {
      this.fsd.setActive(false);
    }
  },
  reconnected() {
    if (this.fsd) {
      const { dataset } = this.el!;
      const { route, direction, stop } = dataset;
      if (route && direction && stop) {
        this.fsd.setFilters(
          stop,
          route,
          parseInt(direction, 10),
          null,
          null,
          null
        );
      }
    }
  }
};

export default FSDHook;
