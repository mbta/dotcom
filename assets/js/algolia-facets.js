import { FacetBar } from "./facet-bar";
import * as Icons from "./icons";

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */

export class AlgoliaFacets {
  constructor(selectors, search, parent) {
    this.selectors = selectors;
    this._closeModalBtn = null;
    this._showFacetsBtn = null;
    this._parent = parent;
    this._facetsContainer = null;
    this._bind();
    const facets = {
      routes: {
        queryId: "routes",
        facetName: "route.type",
        item: {
          id: "lines-routes",
          name: "Lines and Routes",
          items: [
            {
              id: "subway",
              name: "Subway",
              facets: ["0", "1"],
              icon: Icons.getFeatureIcon("subway")
            },
            {
              id: "bus",
              name: "Bus",
              facets: ["3"],
              icon: Icons.getFeatureIcon("bus")
            },
            {
              id: "commuter-rail",
              name: "Commuter Rail",
              facets: ["2"],
              icon: Icons.getFeatureIcon("commuter_rail")
            },
            {
              id: "ferry",
              name: "Ferry",
              facets: ["4"],
              icon: Icons.getFeatureIcon("ferry")
            }
          ]
        }
      },
      stops: {
        queryId: "stops",
        facetName: "stop.station?",
        item: {
          id: "stops",
          name: "Stations and Stops",
          items: [
            {
              id: "facet-station",
              name: "Stations",
              facets: ["true"],
              icon: Icons.getFeatureIcon("station")
            },
            {
              id: "facet-stop",
              name: "Stops",
              facets: ["false"],
              icon: Icons.getFeatureIcon("stop")
            }
          ]
        }
      },
      pages: {
        queryId: "pages",
        facetName: "_content_type",
        item: {
          id: "page",
          name: "Pages",
          facets: [
            "page",
            "search_result",
            "landing_page",
            "person",
            "diversion"
          ],
          icon: this._faIcon("fa-info")
        }
      },
      projects: {
        queryId: "projects",
        facetName: "_content_type",
        item: {
          id: "projects",
          name: "Projects",
          facets: ["project", "project_update"],
          icon: this._faIcon("fa-info")
        }
      },

      documents: {
        queryId: "documents",
        facetName: "_content_type",
        item: {
          id: "document",
          name: "Documents",
          prefix: "search_api_datasource",
          facets: ["entity:file"],
          icon: this._faIcon("fa-file-o")
        }
      },
      events: {
        queryId: "events",
        facetName: "_content_type",
        item: {
          id: "event",
          name: "Events",
          icon: this._faIcon("fa-calendar"),
          facets: ["event"]
        }
      },
      news: {
        queryId: "news",
        facetName: "_content_type",
        item: {
          id: "news",
          name: "News",
          icon: this._faIcon("fa-newspaper-o"),
          facets: ["news_entry"]
        }
      }
    };

    this._facetBar = new FacetBar("search-facets", search, facets, this);
  }

  _bind() {
    this.onClickCloseModalBtn = this.onClickCloseModalBtn.bind(this);
    this.onClickShowFacetsBtn = this.onClickShowFacetsBtn.bind(this);
  }

  onClickShowFacetsBtn(ev) {
    this._facetsContainer.classList.add("c-search__facets-container--open");
    this._closeModalBtn.classList.add("c-search__close-modal-button--open");
    document.body.classList.add("c-search__open-modal");
  }

  onClickCloseModalBtn(ev) {
    this._facetsContainer.classList.remove("c-search__facets-container--open");
    this._closeModalBtn.classList.remove("c-search__close-modal-button--open");
    document.body.classList.remove("c-search__open-modal");
  }

  _faIcon(icon) {
    return `<span aria-hidden="true" class="c-search-result__content-icon fa ${icon}"></span>`;
  }

  init() {
    this._closeModalBtn = document.getElementById(
      this.selectors.closeModalButton
    );
    this._showFacetsBtn = document.getElementById(
      this.selectors.showFacetsButton
    );
    this._facetsContainer = document.getElementById(
      this.selectors.facetsContainer
    );
    if (this._closeModalBtn && this._showFacetsBtn && this._facetsContainer) {
      this.addEventListeners();
    }
  }

  addEventListeners() {
    this._closeModalBtn.removeEventListener("click", this.onClickCloseModalBtn);
    this._closeModalBtn.addEventListener("click", this.onClickCloseModalBtn);

    this._showFacetsBtn.removeEventListener("click", this.onClickShowFacetsBtn);
    this._showFacetsBtn.addEventListener("click", this.onClickShowFacetsBtn);
  }

  reset() {
    this._facetBar.reset();
  }

  render(results) {
    const facetResults = {};
    Object.keys(results).forEach(key => {
      if (key.startsWith("facets-")) {
        const { facets } = results[key];
        Object.keys(facets).forEach(prefix => {
          const values = facets[prefix];
          Object.keys(values).forEach(facet => {
            facetResults[`${prefix}:${facet}`] = values[facet];
          });
        });
      }
    });

    this._facetBar.updateCounts(facetResults);
  }

  selectedFacetNames() {
    return this._facetBar.selectedFacetNames();
  }

  loadState(facets) {
    this._facetBar.loadState(facets);
  }

  updateState() {
    this._parent.updateHistory();
  }
}
