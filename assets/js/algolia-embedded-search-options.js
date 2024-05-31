export const PAGE_IDS = ["search-stop"];

export const PAGE_IDS_WITHOUT_GOOGLE = ["search-projects"];

export const FACET_MAP = {
  "search-stop": "stations,stops,locations",
  "search-projects": "projects"
};

const FACET_FILTER_MAP = {
  "search-stop": [],
  "search-projects": ["_content_type:project", "_content_type:project_update"]
};

const determineIndex = isProjectsSearch => {
  if (isProjectsSearch) return "drupal";
  return "stops";
};

export const buildOptions = pageId => {
  const selectors = {
    input: `${pageId}__input`,
    container: `${pageId}__container`,
    goBtn: `${pageId}__input-go-btn`,
    locationLoadingIndicator: `${pageId}__loading-indicator`,
    resetButton: `${pageId}__reset`,
    announcer: `${pageId}__announcer`
  };

  const params = {};

  const indices = {};

  const isProjectsSearch = pageId === "search-projects";

  const index = determineIndex(isProjectsSearch);

  params[index] = {
    hitsPerPage: 5,
    facets: [FACET_MAP[pageId]],
    facetFilters: [FACET_FILTER_MAP[pageId]]
  };

  indices[index] = {
    indexName: index,
    query: ""
  };

  return {
    selectors,
    params,
    indices
  };
};
