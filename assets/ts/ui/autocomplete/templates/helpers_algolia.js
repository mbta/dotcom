/* eslint-disable */
import hogan from "hogan.js";

function iconsFromGTFSAncestries(ancestries) {
  return ancestries
    .map(anc => anc.toLowerCase())
    .filter(anc => anc !== "subway")
    .map(anc => getFeatureIcon(anc));
}

function iconsFromGTFSAncestry(ancestry) {
  if (Array.isArray(ancestry)) {
    return iconsFromGTFSAncestries(ancestry);
  }
  return iconsFromGTFSAncestries([ancestry]);
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

function iconFromGTFSId(id) {
  const toSubway = _subwayRouteIcon(id);
  if (toSubway) {
    return getFeatureIcon(toSubway);
  }
  if (id in ["commuter_rail", "bus", "ferry", "silver_line"]) {
    return getFeatureIcon(id);
  }
  if (id.includes("CR-")) {
    return getFeatureIcon("commuter_rail");
  }
  return getFeatureIcon(id);
}

function iconsFromGTFSIds(id) {
  if (Array.isArray(id)) {
    return id.map(icon => iconFromGTFSId(icon));
  }
  return [iconFromGTFSId(id)];
}

export function iconFromGTFS(id, ancestry) {
  if (!id) {
    return TEMPLATES.fontAwesomeIcon.render({ icon: "fa-info" });
  }
  let icons = iconsFromGTFSIds(id);
  if (ancestry) {
    icons = icons.concat(iconsFromGTFSAncestry(ancestry));
  }
  return icons;
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

export function contentIcon(hit) {
  let icon;

  if (hit.search_api_datasource === "entity:file") {
    icon = _fileIcon(hit);
  } else if (hit._content_url === "/projects/red-blue-connector") {
    return worldCupIcon();
  } else {
    const iconMapper = {
      search_result: "fa-info",
      news_entry: "fa-newspaper-o",
      event: "fa-calendar",
      project: "fa-wrench",
      project_update: "fa-wrench",
      page: "fa-info",
      landing_page: "fa-info",
      person: "fa-user",
      locations: "fa-map-marker"
    };

    icon = iconMapper[hit._content_type] || "fa-info";
  }

  return TEMPLATES.fontAwesomeIcon.render({ icon });
}

function worldCupIcon() {
  return TEMPLATES.worldCupIcon.render();
}

function _getStopOrStationIcon(hit) {
  if (hit.stop["station?"]) {
    return getFeatureIcon("station");
  }
  return getFeatureIcon("stop");
}

function _iconFromRoute(route) {
  switch (route.type) {
    case 2:
      return "commuter_rail";

    case 3:
      if (route.name.startsWith("SL")) {
        return "silver_line";
      }
      return "bus";

    case 4:
      return "ferry";

    default:
      return _subwayRouteIcon(route.id);
  }
}

export function getPopularIcon(icon) {
  switch (icon) {
    case "airplane":
      return TEMPLATES.fontAwesomeIcon.render({ icon: "fa-plane-departure" });
    default:
      return getFeatureIcon(icon);
  }
}

export function getIcon(hit, type) {
  switch (type) {
    case "locations":
      return contentIcon({ ...hit, _content_type: "locations" });
    case "stops":
      return _getStopOrStationIcon(hit);

    case "routes":
      return getFeatureIcon(_iconFromRoute(hit.route));

    case "popular":
      return getPopularIcon(hit.icon);

    case "projects":
      // eslint-disable-next-line no-use-before-define
      return getTransitIcons(hit);

    case "drupal":
    case "pages":
    case "documents":
    case "events":
    case "news":
      return contentIcon(hit);

    case "usemylocation":
      return "";

    default:
      return "";
  }
}

function getTransitIcons(hit) {
  if (
    hit.related_transit_gtfs_id === null &&
    hit.related_transit_gtfs_ancestry == null
  ) {
    return "";
  }
  const icons = iconFromGTFS(
    hit.related_transit_gtfs_id,
    hit.related_transit_gtfs_ancestry
  );
  if (Array.isArray(icons)) {
    const uniqueIcons = _.uniq(icons);
    return uniqueIcons.join(" ");
  }
  return icons;
}

function _stopsWithAlerts() {
  const stopsWithAlertsDiv = document.getElementById("stops-with-alerts");
  if (!stopsWithAlertsDiv) return "";
  const {
    dataset: { stopsWithAlerts }
  } = stopsWithAlertsDiv;
  return stopsWithAlerts;
}

function _routesWithAlerts() {
  const routesWithAlertsDiv = document.getElementById("routes-with-alerts");
  if (!routesWithAlertsDiv) return "";
  const {
    dataset: { routesWithAlerts }
  } = routesWithAlertsDiv;
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

    default:
      hasAlert = false;
  }

  return hasAlert ? ["alert"] : [];
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

function _featuresToIcons(features) {
  return features.map(feature =>
    getFeatureIcon(_standardizeFeatureName(feature))
  );
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
  }
  return features;
}

function _getCommuterRailZone(hit) {
  if (hit.zone) {
    return [`<span class="c-icon__cr-zone text-sm">Zone ${hit.zone}</span>`];
  }
  if (hit.icon === "station") {
    // the north/south station popular result
    return [`<span class="c-icon__cr-zone text-sm">Zone 1A</span>`];
  }
  return [];
}

function _stopIcons(hit, type) {
  const isBusStop = type === "stops" && !hit.stop["station?"];
  const featuresToFilter = isBusStop
    ? ["access", "parking_lot", "bus"]
    : ["access", "parking_lot"];
  const filteredFeatures = hit.features.filter(
    feature => !featuresToFilter.includes(feature)
  );
  const alertFeature = _getAlertIcon(hit, type);
  const allFeatures = alertFeature.concat(filteredFeatures);
  const allFeaturesSorted = _sortFeatures(allFeatures);
  const allIcons = _featuresToIcons(allFeaturesSorted);

  const zoneIcon = _getCommuterRailZone(hit);

  if (isBusStop) {
    return hit.routes
      .filter(route => route.type === 3)
      .map(route => {
        return route.display_name
          .replace("Bus: ", "")
          .split(", ")
          .map(
            num =>
              `<span class="c-icon__bus-pill--small u-bg--bus mr-1">${num}</span>`
          )
          .join("");
      });
  }

  return allIcons.concat(zoneIcon);
}

function _formatDate(date) {
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return TEMPLATES.formattedDate.render({ date: formattedDate });
}

function pagesdocumentsDate(hit) {
  if (hit._file_created !== undefined) {
    const date = new Date(hit._file_created * 1000);
    return [_formatDate(date)];
  }
  return [];
}

function projectsDate(hit) {
  if (hit._content_posted_on) {
    const date = new Date(hit._content_posted_on * 1000);
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
    return [];
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

    case "projects":
      return projectsDate(hit);

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

function getFeatureIcon(feature) {
  const icon = document.getElementById(`icon-feature-${feature}`);
  if (icon) {
    return icon.innerHTML;
  }
  return "";
}

const TEMPLATES = {
  fontAwesomeIcon: hogan.compile(
    `<span aria-hidden="true" class="c-search-result__content-icon fa {{icon}}"></span>`
  ),
  formattedDate: hogan.compile(
    `<span class="c-search-result__event-date">{{date}}</span>`
  ),
  worldCupIcon: hogan.compile(
    `<img src="/icon-svg/football.svg" class="c-search-result__content-icon worldcup" />`
  )
};
