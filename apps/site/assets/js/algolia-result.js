import hogan from "hogan.js";
import * as Icons from "./icons";

export const SELECTORS = {
  result: "js-search-result"
};

export const TEMPLATES = {
  poweredByGoogleLogo: hogan.compile(
    `<div class="c-search-result__hit c-search-result__google">{{{logo}}}</div>`
  ),
  fontAwesomeIcon: hogan.compile(
    `<span aria-hidden="true" class="c-search-result__content-icon fa {{icon}}"></span>`
  ),
  formattedDate: hogan.compile(
    `<span class="c-search-result__event-date">{{date}}</span>`
  ),
  locations: hogan.compile(`
    <a id="hit-{{id}}" class="c-search-result__link u-no-underline" url={{hitUrl}}>
      <span>{{{hitIcon}}}</span>
      <span class="c-search-result__hit-name">{{{hitTitle}}}</span>
    </a>
  `),
  usemylocation: hogan.compile(`
    <a id="search-bar__my-location" class="c-search-bar__my-location">
      <i aria-hidden="true" class="fa fa-location-arrow "></i>
      Use my location
      <i aria-hidden="true" id="search-result__loading-indicator" class="fa fa-cog fa-spin c-search-result__loading-indicator"></i>
    </a>
  `),
  projects: hogan.compile(`
    {{#hasDate}}
    <div class="c-search-result__hit--vertical">
    {{/hasDate}}
    {{#id}}
    <a id="hit-{{id}}" class="${
      SELECTORS.result
    } c-search-result__link" href="{{hitUrl}}">
    {{/id}}
    {{^id}}
    <a class="${
      SELECTORS.result
    } c-search-result__link u-no-underline" href="{{hitUrl}}" data-queryid="{{analyticsData.queryID}}" data-hit-position="{{analyticsData.position}}" data-objectid="{{analyticsData.objectID}}">
    {{/id}}
      <span>{{{hitIcon}}}</span>
      <span class="c-search-result__hit-name">{{{hitTitle}}}</span>
    </a>
    {{#hasDate}}
    </div>
    {{/hasDate}}
  `),
  default: hogan.compile(`
    {{#hasDate}}
    <div class="c-search-result__hit--vertical">
    {{/hasDate}}
    {{#id}}
    <a id="hit-{{id}}" class="${
      SELECTORS.result
    } c-search-result__link" href="{{hitUrl}}">
    {{/id}}
    {{^id}}
    <a class="${
      SELECTORS.result
    } c-search-result__link u-no-underline" href="{{hitUrl}}" data-queryid="{{analyticsData.queryID}}" data-hit-position="{{analyticsData.position}}" data-objectid="{{analyticsData.objectID}}">
    {{/id}}
      <span>{{{hitIcon}}}</span>
      <span class="c-search-result__hit-name">{{{hitTitle}}}</span>
    </a>
    <span class="c-search-result__feature-icons">
      {{#hitFeatureIcons}}
        {{{.}}}
      {{/hitFeatureIcons}}
    </span>
    {{#hasDate}}
    </div>
    {{/hasDate}}
  `)
};

export function renderResult(hit, index, searchType) {
  if (searchType) {
    return TEMPLATES[searchType].render(parseResult(hit, index, searchType));
  }
  if (TEMPLATES[index]) {
    return TEMPLATES[index].render(parseResult(hit, index));
  }
  return TEMPLATES.default.render(parseResult(hit, index));
}

export function parseResult(hit, index, searchType) {
  return Object.assign(hit, {
    hitIcon: getIcon(hit, index, searchType),
    hitUrl: getUrl(hit, index),
    hitTitle: getTitle(hit, index),
    hasDate:
      index == "events" ||
      index == "news" ||
      index == "pages" ||
      index == "documents" ||
      null,
    hitFeatureIcons: getFeatureIcons(hit, index),
    id: hit.place_id || null
  });
}

export function getIcon(hit, type, searchType) {
  if (searchType) {
    if (searchType === "projects") {
      console.log(hit.related_transit_gtfs_id, "related transit id");
      console.log(hit.related_transit_gtfs_ancestry, "related ancestry");
      const icons = iconFromGTFS(
        hit.related_transit_gtfs_id,
        hit.related_transit_gtfs_ancestry
      );
      if (Array.isArray(icons)) {
        return icons.join(" ");
      }
      return icons;
    }
  }
  switch (type) {
    case "locations":
      hit._content_type = "locations";
      return _contentIcon(hit);
    case "stops":
      return _getStopOrStationIcon(hit);

    case "routes":
      const iconName = _iconFromRoute(hit.route);
      return Icons.getFeatureIcon(iconName);

    case "popular":
      return getPopularIcon(hit.icon);

    case "drupal":
    case "pages":
    case "documents":
    case "events":
    case "news":
      return _contentIcon(hit);

    case "usemylocation":
      return "";

    default:
      console.error(`AlgoliaResult.getIcon not implemented for index: ${type}`);
      return "";
  }
}

function getPopularIcon(icon) {
  switch (icon) {
    case "airplane":
      return TEMPLATES.fontAwesomeIcon.render({ icon: "fa-plane" });
    default:
      return Icons.getFeatureIcon(icon);
  }
}

function _fileIcon(hit) {
  switch (hit._file_type) {
    case "application/pdf":
      return "fa-file-pdf-o";

    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.ms-powerpoint":
      return "fa-file-powerpoint-o";

    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
      return "fa-file-excel-o";

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/msword":
      return "fa-file-word-o";

    default:
      return "fa-file-o";
  }
}

function _contentIcon(hit) {
  let icon;

  if (hit.search_api_datasource === "entity:file") {
    icon = _fileIcon(hit);
  } else {
    const iconMapper = {
      search_result: "fa-info",
      news_entry: "fa-newspaper-o",
      event: "fa-calendar",
      page: "fa-info",
      landing_page: "fa-info",
      person: "fa-user",
      locations: "fa-map-marker"
    };
    icon = iconMapper[hit._content_type] || "fa-info";
  }

  return TEMPLATES.fontAwesomeIcon.render({ icon: icon });
}

function _subwayRouteIcon(routeId) {
  if (routeId.includes("Green-")) {
    return routeId.toLowerCase().replace("-", "_line_");
  }

  const mapper = {
    Green: "green_line",
    Red: "red_line",
    Orange: "orange_line",
    Blue: "blue_line",
    Mattapan: "mattapan_line"
  };

  return mapper[routeId];
}

export function iconFromGTFS(id, ancestry) {
  if (!id) {
    return TEMPLATES.fontAwesomeIcon.render({ icon: "fa-info" });
  }
  let icons = iconsFromGTFSIds(id);
  if (ancestry) {
    icons = [...new Set([...icons, ...iconsFromGTFSAncestry(ancestry)])];
  }
  return icons;
}

function iconsFromGTFSAncestry(ancestry) {
  if (Array.isArray(ancestry)) {
    return iconsFromGTFSAncestries(ancestry);
  }
  return iconsFromGTFSAncestries([ancestry]);
}

function iconsFromGTFSAncestries(ancestries) {
  return ancestries
    .map(anc => anc.toLowerCase())
    .filter(anc => anc !== "subway")
    .map(anc => Icons.getFeatureIcon(anc));
}

function iconsFromGTFSIds(id) {
  if (Array.isArray(id)) {
    return id.map(icon => iconFromGTFSId(icon));
  } else {
    return [iconFromGTFSId(id)];
  }
}

function iconFromGTFSId(id) {
  const toSubway = _subwayRouteIcon(id);
  if (toSubway) {
    return Icons.getFeatureIcon(toSubway);
  }
  if (id === "Silver Line") return Icons.getFeatureIcon("bus");
  if (id in ["commuter_rail", "bus", "ferry"]) {
    return Icons.getFeatureIcon(id);
  }
  if (id.includes("CR-")) {
    return Icons.getFeatureIcon("commuter_rail");
  }
  return Icons.getFeatureIcon(id);
}

function _iconFromRoute(route) {
  switch (route.type) {
    case 2:
      return "commuter_rail";

    case 3:
      return "bus";

    case 4:
      return "ferry";

    default:
      return _subwayRouteIcon(route.id);
  }
}

function getRouteTitle(hit) {
  const name = hit._highlightResult.route.name.value;
  switch (hit.route.type) {
    case 3:
      return `${name} <span class="c-search-result__long-name">${
        hit._highlightResult.route.long_name.value
      }</span>`;
    default:
      return name;
  }
}

export function getTitle(hit, type) {
  switch (type) {
    case "locations":
      const orig = hit.description.split("");
      hit.matched_substrings.forEach(match => {
        orig[match.offset] = "<em>" + orig[match.offset];
        if (match.offset + match.length < orig.length) {
          orig[match.offset + match.length] =
            "</em>" + orig[match.offset + match.length];
        }
      });
      return orig.join("");
    case "stops":
      return hit._highlightResult.stop.name.value;

    case "routes":
      return getRouteTitle(hit);

    case "popular":
      return hit.name;

    case "drupal":
    case "pages":
    case "documents":
    case "events":
    case "news":
      return _contentTitle(hit);

    case "usemylocation":
      return "";

    default:
      console.error(
        `AlgoliaResult.getTitle not implemented for index: ${type}`
      );
      return "";
  }
}

function _contentTitle(hit) {
  if (hit._content_type === "search_result") {
    return hit._highlightResult.search_result_title.value;
  } else if (hit.search_api_datasource === "entity:file") {
    return hit._highlightResult.file_name_raw.value;
  } else {
    return hit._highlightResult.content_title.value;
  }
}

export function getUrl(hit, type) {
  switch (type) {
    case "stops":
      return `/stops/${hit.stop.id}`;

    case "routes":
      return `/schedules/${hit.route.id}`;

    case "popular":
      return hit.url;

    case "drupal":
    case "pages":
    case "documents":
    case "events":
    case "news":
      return _contentUrl(hit);

    case "locations":
      return "";
    case "usemylocation":
      return "#";

    default:
      console.error(`AlgoliaResult.getUrl not implemented for index: ${type}`);
      return "#";
  }
}

function _contentUrl(hit) {
  if (hit.search_api_datasource === "entity:file") {
    return "/sites/default/files/" + hit._file_uri.replace(/public:\/\//, "");
  } else if (hit._content_type == "search_result") {
    return hit._search_result_url.replace(/internal:/, "");
  } else {
    return hit._content_url;
  }
}

function _getCommuterRailZone(hit) {
  if (hit.zone) {
    return [`<span class="c-icon__cr-zone">Zone ${hit.zone}</span>`];
  } else {
    return [];
  }
}

function _stopsWithAlerts() {
  const stopsWithAlertsDiv = document.getElementById("stops-with-alerts");
  let stopsWithAlerts = "";
  if (stopsWithAlertsDiv) {
    stopsWithAlerts = stopsWithAlertsDiv.dataset.stopsWithAlerts;
  }
  return stopsWithAlerts;
}

function _routesWithAlerts() {
  const routesWithAlertsDiv = document.getElementById("routes-with-alerts");
  let routesWithAlerts = "";
  if (routesWithAlertsDiv) {
    routesWithAlerts = routesWithAlertsDiv.dataset.routesWithAlerts;
  }

  return routesWithAlerts;
}

function _getAlertIcon(hit, type) {
  let hasAlert = false;
  switch (type) {
    case "stops":
      hasAlert = _stopsWithAlerts().includes(hit.stop.id);
      break;

    case "routes":
      hasAlert = _routesWithAlerts().includes(hit.route.id);
      break;
  }

  return hasAlert ? ["alert"] : [];
}

function _featuresToIcons(features) {
  return features.map(feature => {
    return Icons.getFeatureIcon(_standardizeFeatureName(feature));
  });
}

function _standardizeFeatureName(feature) {
  switch (feature) {
    case "Red":
    case "Blue":
    case "Orange":
    case "Green":
    case "Green-B":
    case "Green-C":
    case "Green-D":
    case "Green-E":
    case "Mattapan":
      return _subwayRouteIcon(feature);

    default:
      return feature;
  }
}

function _sortFeatures(features) {
  const featuresWithoutBranches = features.filter(
    feature => !feature.includes("Green-")
  );
  const branches = features.filter(feature => feature.includes("Green-"));
  if (branches.length > 0) {
    const greenLinePosition = featuresWithoutBranches.findIndex(
      feature => feature === "green_line"
    );

    featuresWithoutBranches.splice(greenLinePosition + 1, 0, ...branches);
    return featuresWithoutBranches;
  } else {
    return features;
  }
}

export function getFeatureIcons(hit, type) {
  const alertFeature = _getAlertIcon(hit, type);
  switch (type) {
    case "popular":
    case "stops":
      return _stopIcons(hit, type);

    case "routes":
      return _featuresToIcons(alertFeature);

    case "pages":
    case "documents":
      return pagesdocumentsDate(hit);
    case "events":
    case "news":
      return _contentDate(hit);

    default:
      return [];
  }
}

function _stopIcons(hit, type) {
  const filteredFeatures = hit.features.filter(
    feature => feature != "access" && feature != "parking_lot"
  );

  const alertFeature = _getAlertIcon(hit, type);
  const allFeatures = alertFeature.concat(filteredFeatures);
  const allFeaturesSorted = _sortFeatures(allFeatures);
  const allIcons = _featuresToIcons(allFeaturesSorted);

  const zoneIcon = _getCommuterRailZone(hit);

  return allIcons.concat(zoneIcon);
}

function pagesdocumentsDate(hit) {
  if (hit._file_created !== undefined) {
    const date = new Date(hit._file_created * 1000);
    return [_formatDate(date)];
  }
  return [];
}

function _contentDate(hit) {
  const dateString = hit._content_url.split("/")[2];
  try {
    const dateStringWithTime = `${dateString}T01:00:00`;
    const date = new Date(dateStringWithTime);
    return [_formatDate(date)];
  } catch (err) {
    console.error(
      `Invalid date detected in AlgoliaResult.getFeatureIcons (${dateString})`
    );
    return [];
  }
}

function _formatDate(date) {
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return TEMPLATES.formattedDate.render({ date: formattedDate });
}

function _getStopOrStationIcon(hit) {
  if (hit.stop["station?"]) {
    return Icons.getFeatureIcon("station");
  } else {
    return Icons.getFeatureIcon("stop");
  }
}
