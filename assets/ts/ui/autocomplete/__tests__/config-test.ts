import {
  createAutocomplete,
  AutocompleteState,
  GetSourcesParams,
  OnSelectParams,
  StateUpdater
} from "@algolia/autocomplete-core";
import { AutocompleteSource } from "@algolia/autocomplete-js";
import { waitFor } from "@testing-library/react";
import { Item } from "../__autocomplete";
import configs, { TRIP_PLANNER } from "./../config";

const sourceIds = (sources: any[]) =>
  (sources as AutocompleteSource<any>[]).map(s => s.sourceId);
const baseSourceParams = ({
  query: undefined,
  setIsOpen: jest.fn()
} as unknown) as GetSourcesParams<Item>;

describe("Basic configuration", () => {
  const config = configs["basic-config"];

  test("has an OnStateChange handler", () => {
    expect(config().onStateChange).toBeTruthy();
  });

  test("has an OnSubmit handler", () => {
    Object.defineProperty(window, "location", {
      value: {
        assign: jest.fn()
      }
    });

    expect(config().onSubmit).toBeTruthy();
    //@ts-ignore
    config().onSubmit!({ state: { query: "the best place" } });
    expect(window.location.assign).toHaveBeenCalledExactlyOnceWith(
      "/search?query=the best place"
    );
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config();
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(0);
    expect(sourceIds(sources)).toEqual([]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(1);
    expect(sourceIds(sourcesWithQuery)).toEqual(["algolia"]);
  });
});

describe("Retail sales locations configuration", () => {
  const config = configs["retail-locations"];

  test("sets initial state", () => {
    expect(config().initialState).toBeTruthy();
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config();
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(2);
    expect(sourceIds(sources)).toEqual(["geolocation", "popular"]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(1);
    expect(sourceIds(sourcesWithQuery)).toEqual(["locations"]);
  });
});

describe("Proposed sales locations configuration", () => {
  const config = configs["proposed-locations"];

  test("sets initial state", () => {
    expect(config().initialState).toBeTruthy();
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config();
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(2);
    expect(sourceIds(sources)).toEqual(["geolocation", "popular"]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(1);
    expect(sourceIds(sourcesWithQuery)).toEqual(["locations"]);
  });
});

describe("Trip planner configuration", () => {
  const setupCloseUpdate = () => {
    const pushToLiveView = jest.fn();
    const options = TRIP_PLANNER({
      pushToLiveView,
      initialState: () => ""
    });
    const autocomplete = createAutocomplete({
      ...options
    });
    autocomplete.setQuery("Melrose Highlands");
    autocomplete.setIsOpen(true);
    return { options, autocomplete, pushToLiveView };
  };

  test("selecting a suggestion cancels the preceding close-only update", async () => {
    const { options, autocomplete, pushToLiveView } = setupCloseUpdate();
    const sources = await options.getSources!({
      ...baseSourceParams,
      query: "Melrose"
    });
    const source = sources[0];
    if (!source || typeof source === "boolean") {
      throw new Error("Expected an autocomplete source");
    }
    const item = {
      name: "Melrose Highlands",
      stop_id: "place-WR-0075",
      latitude: 42.469464,
      longitude: -71.068297
    };

    autocomplete.setIsOpen(false);
    source.onSelect!({
      ...baseSourceParams,
      item,
      setQuery: autocomplete.setQuery,
      source: {
        ...source,
        getItemInputValue: () => item.name,
        getItemUrl: () => undefined,
        onSelect: source.onSelect!,
        onActive: jest.fn(),
        onResolve: jest.fn()
      },
      event: new MouseEvent("click"),
      itemInputValue: item.name,
      itemUrl: undefined
    });

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(pushToLiveView).toHaveBeenCalledExactlyOnceWith(item);

    autocomplete.setIsOpen(true);
    autocomplete.setIsOpen(false);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(pushToLiveView).toHaveBeenCalledExactlyOnceWith(item);

    autocomplete.setIsOpen(true);
    autocomplete.setQuery("A different location");
    autocomplete.setIsOpen(false);

    await waitFor(() => {
      expect(pushToLiveView).toHaveBeenLastCalledWith({
        name: "A different location"
      });
    });
  });

  test("closing without a selection still sends the typed text", async () => {
    const { autocomplete, pushToLiveView } = setupCloseUpdate();
    autocomplete.setIsOpen(false);

    await waitFor(() => {
      expect(pushToLiveView).toHaveBeenCalledExactlyOnceWith({
        name: "Melrose Highlands"
      });
    });
  });

  test("reset cancels the close-only update", async () => {
    const { options, autocomplete, pushToLiveView } = setupCloseUpdate();
    autocomplete.setIsOpen(false);
    options.onReset!({ ...baseSourceParams, event: new Event("reset") });

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(pushToLiveView).toHaveBeenCalledExactlyOnceWith({});
  });

  const pushToLiveViewMock = jest.fn();
  const config = configs["trip-planner"]({
    pushToLiveView: pushToLiveViewMock,
    initialState: jest.fn()
  });

  test("sets initial state", () => {
    expect(config.initialState).toBeTruthy();
  });

  test("has on OnReset handler", () => {
    const { onReset } = config;
    expect(onReset).toBeFunction();
    //@ts-ignore
    onReset();
    expect(pushToLiveViewMock).toHaveBeenCalledWith({});
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config;
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(2);
    expect(sourceIds(sources)).toEqual(["geolocation", "popular"]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(3);
    expect(sourceIds(sourcesWithQuery)).toEqual([
      "algolia",
      "locations",
      "popular"
    ]);
  });

  test("sources have OnSelect handler", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config;
    // @ts-ignore
    const [source] = await getSources(paramsWithQuery);
    // @ts-ignore
    const { onSelect } = source;
    expect(onSelect).toBeFunction();
    const item = { arbitrary: "thing" };
    onSelect!({ item, setQuery: jest.fn() });
    expect(pushToLiveViewMock).toHaveBeenCalledWith(item);
  });

  test("geolocation selection sends only coordinates to LiveView", async () => {
    const { options, autocomplete, pushToLiveView } = setupCloseUpdate();
    const mockCoordinates = {
      latitude: 40,
      longitude: -71
    };
    (global.navigator as any).geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce(success =>
        Promise.resolve(
          success({
            coords: mockCoordinates
          })
        )
      )
    };

    const { getSources } = options;
    const mockSetQuery = jest.fn(autocomplete.setQuery);
    // @ts-ignore
    const [geolocationSource] = await getSources(baseSourceParams);
    autocomplete.setIsOpen(false);
    (geolocationSource as AutocompleteSource<any>)?.onSelect!({
      setContext: jest.fn() as StateUpdater<
        AutocompleteState<{ value: string }>["context"]
      >,
      setQuery: mockSetQuery as StateUpdater<
        AutocompleteState<{ value: string }>["query"]
      >
    } as OnSelectParams<{ value: string }>);

    await waitFor(() => {
      expect(mockSetQuery).toHaveBeenCalledWith(
        `${mockCoordinates.latitude}, ${mockCoordinates.longitude}`
      );
      expect(pushToLiveView).toHaveBeenCalledExactlyOnceWith(mockCoordinates);
    });
    autocomplete.setIsOpen(true);
    autocomplete.setIsOpen(false);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(pushToLiveView).toHaveBeenCalledTimes(1);
  });
});
