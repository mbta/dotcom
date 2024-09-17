import hogan from "hogan.js";
import * as AlgoliaResult from "./algolia-result";
import * as MapsHelpers from "./maps-helpers";
// eslint-disable-next-line import/extensions
import * as QueryHelpers from "../ts/helpers/query";

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

const TEMPLATES = {
  contentResults: hogan.compile(`
    <div class="c-search-results__section">
      {{#hasHits}}
        <div class="c-search-result__header">
          {{title}}
          {{#isLocation}}
          <div id="search-result__use-my-location" class="c-search-result__header--location">
          <i aria-hidden="true" class="fa fa-location-arrow "></i>
          Use my location
          <i aria-hidden="true" id="search-result__loading-indicator" class="fa fa-cog fa-spin c-search-result__loading-indicator"></i>
          </div>
          {{/isLocation}}
        </div>
        <div class="c-search-results__hits">
          {{#hits}}
              {{{.}}}
          {{/hits}}
          {{#showMore}}
            <div id="show-more--{{group}}" class="c-search-results__show-more" data-group="{{group}}">
              Show more
            </div>
          {{/showMore}}
        </div>
      {{/hasHits}}
    </div>
 `)
};

export class AlgoliaResults {
  constructor(id, parent) {
    this._parent = parent;
    this._groups = [
      "routes",
      "stops",
      "pages",
      "projects",
      "documents",
      "events",
      "news",
      "locations"
    ];
    this._container = document.getElementById(id);
    if (!this._container) {
      console.error(`could not find results container with id: ${id}`);
    }
    this._container.innerHTML = "";
    this._bind();
  }

  _bind() {
    this.onClickShowMore = this.onClickShowMore.bind(this);
    this.onClickResult = this.onClickResult.bind(this);
    this.addResultClickHandler = this.addResultClickHandler.bind(this);
    this._showLocation = this._showLocation.bind(this);
  }

  _addLocationListeners(results) {
    if (results.locations) {
      results.locations.hits.forEach((hit, idx) => {
        const elem = document.getElementById(`hit-location-${idx}`);
        if (elem) {
          elem.addEventListener(
            "click",
            this._locationSearch(hit.street_address)
          );
        }
      });
      const useLocation = document.getElementById(
        "search-result__use-my-location"
      );
      if (useLocation) {
        useLocation.addEventListener("click", () => {
          this._useMyLocation()
            .then(pos => {
              this._locationSearchByGeo(
                pos.coords.latitude,
                pos.coords.longitude
              );
            })
            .catch(err => {
              console.error(err);
            });
        });
      }
    }
  }

  _addShowMoreListener(groupName) {
    const el = document.getElementById(`show-more--${groupName}`);
    if (el) {
      el.removeEventListener("click", this.onClickShowMore);
      el.addEventListener("click", this.onClickShowMore);
    }
  }

  onClickResult(ev) {
    if (ev.currentTarget.href) {
      ev.preventDefault();

      window.jQuery.post(
        "/search/click",
        {
          queryID: ev.currentTarget.getAttribute("data-queryid"),
          position: ev.currentTarget.getAttribute("data-hit-position"),
          objectID: ev.currentTarget.getAttribute("data-objectid")
        },
        this.onClickResultCallback(ev.currentTarget.href)
      );
    }
  }

  onClickResultCallback(href) {
    return response => {
      this.reset();
      window.location.assign(
        href +
          QueryHelpers.paramsToString(
            this._parent.getParams(),
            window.encodeURIComponent
          )
      );
    };
  }

  onClickShowMore(ev) {
    this._parent.onClickShowMore(ev.target.getAttribute("data-group"));
  }

  _showLocation(latitude, longitude, address) {
    const params = this._parent.getParams();
    params.latitude = latitude;
    params.longitude = longitude;
    params.address = address;
    const qs = QueryHelpers.paramsToString(params, window.encodeURIComponent);
    window.location.assign(`/transit-near-me${qs}`);
  }

  _locationSearchByGeo(latitude, longitude) {
    MapsHelpers.reverseGeocode(parseFloat(latitude), parseFloat(longitude))
      .then(result => {
        document.getElementById(
          "search-result__loading-indicator"
        ).style.display = "none";
        this._showLocation(latitude, longitude, result);
      })
      .catch(err => {
        console.error(
          "Problem with retrieving location using the Google Maps API."
        );
      });
  }

  _locationSearch(address) {
    return () => {
      MapsHelpers.lookupPlace(address)
        .then(result => {
          this._showLocation(
            result.latitude,
            result.longitude,
            result.formatted
          );
        })
        .catch(err => {
          console.error(err);
        });
    };
  }

  _useMyLocation() {
    document.getElementById("search-result__loading-indicator").style.display =
      "inline-block";
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          return resolve(pos);
        },
        err => {
          return reject(err);
        }
      );
    });
  }

  init() {}

  reset() {
    this.render({});
  }

  render(results) {
    if (this._container) {
      this._container.innerHTML = this._groups
        .map(group => this._renderGroup(results, group))
        .join("");

      Array.from(
        document.getElementsByClassName(AlgoliaResult.SELECTORS.result)
      ).forEach(this.addResultClickHandler);

      this._groups.forEach(group => this._addShowMoreListener(group));
      this._addLocationListeners(results);
    }
  }

  _renderGroup(results, group) {
    if (!results[group]) {
      return "";
    }

    return TEMPLATES.contentResults.render({
      title: AlgoliaResults.indexTitles[group] || "",
      isLocation: group == "locations" || null,
      nbHits: results[group].nbHits,
      hasHits: results[group].nbHits > 0,
      showMore: results[group].hits.length < results[group].nbHits,
      group,
      googleLogo: null,
      hits: results[group].hits.map(this.renderResult(group, results[group]))
    });
  }

  renderResult(index, groupData) {
    return (hit, idx) => {
      return `
        <div class="c-search-result__hit">
          ${AlgoliaResult.renderResult(hit, index)}
        </div>
      `;
    };
  }

  addResultClickHandler(el) {
    el.removeEventListener("click", this.onClickResult);
    el.addEventListener("click", this.onClickResult);
  }
}

AlgoliaResults.indexTitles = {
  locations: "Locations",
  stops: "Stations and Stops",
  routes: "Lines and Routes",
  projects: "Projects",
  pages: "Pages",
  documents: "Documents",
  events: "Events",
  news: "News"
};
