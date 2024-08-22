import { GetSourcesParams } from "@algolia/autocomplete-core";
import { Item } from "../__autocomplete";
import configs from "./../config";
import { AutocompleteSource } from "@algolia/autocomplete-js";
import { waitFor } from "@testing-library/dom";

afterEach(() => jest.resetAllMocks());

const sourceIds = (sources: any[]) =>
  (sources as AutocompleteSource<any>[]).map(s => s.sourceId);
const baseSourceParams = ({
  query: undefined,
  setIsOpen: jest.fn()
} as unknown) as GetSourcesParams<Item>;

describe("Basic configuration", () => {
  const config = configs["basic-config"];

  test("has an OnStateChange handler", () => {
    expect(config.onStateChange).toBeTruthy();
  });

  test("has an OnSubmit handler", () => {
    Object.defineProperty(window, "location", {
      value: {
        assign: jest.fn()
      }
    });

    expect(config.onSubmit).toBeTruthy();
    //@ts-ignore
    config.onSubmit!({ state: { query: "the best place" } });
    expect(window.location.assign).toHaveBeenCalledExactlyOnceWith(
      "/search?query=the best place"
    );
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config;
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(1);
    expect(sourceIds(sources)).toEqual(["geolocation"]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(2);
    expect(sourceIds(sourcesWithQuery)).toEqual(["algolia", "locations"]);
  });
});

describe("Transit near me configuration", () => {
  const config = configs["transit-near-me"];

  test("sets initial state", () => {
    expect(config.initialState).toBeTruthy();
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config;
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(1);
    expect(sourceIds(sources)).toEqual(["geolocation"]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(1);
    expect(sourceIds(sourcesWithQuery)).toEqual(["locations"]);
  });
});

describe("Retail sales locations configuration", () => {
  const config = configs["retail-locations"];

  test("sets initial state", () => {
    expect(config.initialState).toBeTruthy();
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
    expect(sourcesWithQuery).toHaveLength(1);
    expect(sourceIds(sourcesWithQuery)).toEqual(["locations"]);
  });
});

describe("Proposed sales locations configuration", () => {
  const config = configs["proposed-locations"];

  test("sets initial state", () => {
    expect(config.initialState).toBeTruthy();
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
    expect(sourcesWithQuery).toHaveLength(1);
    expect(sourceIds(sourcesWithQuery)).toEqual(["locations"]);
  });
});
