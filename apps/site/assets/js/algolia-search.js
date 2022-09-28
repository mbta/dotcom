class Algolia {
  constructor(queries, defaultParams) {
    this._queries = queries;
    this._activeQueryIds = Object.keys(queries);
    this._defaultParams = defaultParams;
    this._viewMoreInc = 20;
    this._lastQuery = "";
    this._doBlankSearch = true;
    this._widgets = [];
    this.errorContainer = document.getElementById("algolia-error");
    this.reset();
  }

  get widgets() {
    return this._widgets;
  }

  reset() {
    Object.keys(this._queries).forEach(this.resetDefaultParams());
    this._lastQuery = "";
    this.resetWidgets();
  }

  resetDefaultParams() {
    return queryId => {
      if (this._defaultParams[queryId]) {
        this._queries[queryId].params = JSON.parse(
          JSON.stringify(this._defaultParams[queryId])
        );
      } else {
        console.error(
          "default params not set for queryId",
          queryId,
          this._defaultParams
        );
      }
    };
  }

  addPage(group) {
    if (this._queries[group]) {
      this._queries[group].params.hitsPerPage += this._viewMoreInc;
    }
  }

  search(opts = {}) {
    this.toggleError(false);

    if (!(typeof opts.query == "string")) {
      opts.query = this._lastQuery;
    }

    if (opts.query.length > 0) {
      const allQueries = this._buildAllQueries(opts);
      this._lastQuery = opts.query;
      return this._doSearch(allQueries);
    } else {
      this.updateWidgets({});

      // This code handles the case where the user backspaces to an empty search string
      if (this._lastQuery.length > 0) {
        this.reset();
      }
      return Promise.resolve({});
    }
  }

  _doSearch(allQueries) {
    return this._sendQueries(allQueries)
      .then(this._processAlgoliaResults())
      .then(results => {
        this.updateWidgets(results);
        return results;
      })
      .catch(err => console.log(err));
  }

  _addAnalyticsData(result) {
    result.hits.forEach((hit, i) => {
      hit.analyticsData = {
        queryID: result.queryID,
        position: result.hitsPerPage * result.page + i + 1,
        objectID: hit.objectID
      };
    });
  }

  _sendQueries(queries) {
    const body = { requests: queries };
    return new Promise((resolve, reject) => {
      window.jQuery
        .ajax({
          type: "POST",
          url: "/search/query",
          data: JSON.stringify(body),
          dataType: "json",
          contentType: "application/json"
        })
        .done(resolve)
        .fail(reject);
    });
  }

  _buildAllQueries(opts) {
    const requestedQueryIds =
      this._activeQueryIds.length > 0
        ? this._activeQueryIds
        : Object.keys(this._queries);
    const queries = [];
    requestedQueryIds.forEach(queryId => {
      queries.push(this._buildQuery(queryId, opts));
    });

    return queries;
  }

  _buildQuery(queryId, { query }) {
    const currentQuery = this._queries[queryId];
    currentQuery.query = query;
    currentQuery.params = currentQuery.params || {};
    currentQuery.params.clickAnalytics = true;
    return currentQuery;
  }

  updateAllParams(key, value) {
    Object.keys(this._queries).forEach(
      key => (this._queries[key].params[key] = value)
    );
  }

  updateActiveQueries(queryIds) {
    this._activeQueryIds = queryIds;
  }

  removeActiveQuery(queryId) {
    const i = this._activeQueryIds.indexOf(queryId);
    if (i != -1) {
      this._activeQueryIds.splice(i, 1);
    }
  }

  addActiveQuery(queryId) {
    if (this._activeQueryIds.indexOf(queryId) == -1) {
      this._activeQueryIds.push(queryId);
    }
  }

  updateFacetFilters(queryId, filters) {
    this._queries[queryId].params["facetFilters"][0] = filters;
  }

  addFacetFilter(queryId, filter) {
    if (
      this._queries[queryId].params["facetFilters"][0].indexOf(filter) == -1
    ) {
      this._queries[queryId].params["facetFilters"][0].push(filter);
    }
  }

  removeFacetFilter(queryId, filter) {
    const i = this._queries[queryId].params["facetFilters"][0].indexOf(filter);
    if (i != -1) {
      this._queries[queryId].params["facetFilters"][0].splice(i, 1);
    }
  }

  updateParams(queryId, params) {
    this._queries[queryId].params = params;
  }

  updateParamsByKey(queryId, key, value) {
    this._queries[queryId].params[key] = value;
  }

  getParams(queryId) {
    return this._queries[queryId].params;
  }

  addWidget(widget) {
    widget.init(this);
    this._widgets.push(widget);
  }

  updateWidgets(results) {
    if (results["error"]) {
      this.toggleError(true);
    } else {
      this._widgets.forEach(function(widget) {
        if (typeof widget.render === "function") {
          widget.render(results);
        }
      });
    }
  }

  resetWidgets() {
    this._widgets.forEach(function(widget) {
      if (typeof widget.reset === "function") {
        widget.reset();
      }
    });
  }

  _processAlgoliaResults() {
    return response => {
      if (response["error"]) {
        return Promise.resolve(response);
      } else {
        let searchedQueries = this._activeQueryIds.slice(0);
        if (this._activeQueryIds.length == 0) {
          searchedQueries = Object.keys(this._queries);
        }
        const facetLength = Object.keys(this._queries).length;
        const searchResults = response.results.slice(0, searchedQueries.length);
        const facetResults = response.results.slice(
          searchedQueries.length,
          searchedQueries.length + facetLength
        );
        const results = {};
        searchResults.forEach((result, i) => {
          this._addAnalyticsData(result);
          results[searchedQueries[i]] = result;
        });
        facetResults.forEach((result, i) => {
          results[`facets-${Object.keys(this._queries)[i]}`] = result;
        });
        return Promise.resolve(results);
      }
    };
  }

  toggleError(hasError) {
    if (hasError === true) {
      this.errorContainer.style.display = "block";
    } else {
      this.errorContainer.style.display = "none";
    }
  }
}

export default Algolia;
