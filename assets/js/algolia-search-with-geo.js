import Algolia from "./algolia-search";
import * as MapsHelpers from "./maps-helpers";

export class AlgoliaWithGeo extends Algolia {
  constructor(indices, defaultParams, bounds, hitLimit) {
    super(indices, defaultParams);
    this._locationEnabled = true;
    this._hitLimit = hitLimit ? hitLimit : 5;
  }

  /*
   * Writing a comment because this logic is confusing:
   * Here is the table of when things should be disabled
   * or enabled based on the state of things
   *
   * loc_enabled | activeQueryIds len > 0 | enableLocation | enableAlgolia
   * true          true                    true             true
   * true          false                   true             false
   * false         false                   true             true
   * false         true                    false            true
   */
  _doSearch(allQueries) {
    let algoliaResults = {};
    let locationResults = {};
    if (!(this._locationEnabled && this._activeQueryIds.length == 0)) {
      algoliaResults = this._sendQueries(allQueries)
        .then(this._processAlgoliaResults())
        .catch(err => console.error(err));
    }

    if (!(!this._locationEnabled && this._activeQueryIds.length > 0)) {
      locationResults = MapsHelpers.autocomplete({
        input: this._lastQuery,
        hitLimit: this._hitLimit
      }).catch(error =>
        console.error("Error while contacting AWS Location Service:", error)
      );
    }

    return Promise.all([algoliaResults, locationResults])
      .then(resultsList => {
        this.updateWidgets(
          resultsList.reduce((acc, res) => Object.assign(acc, res))
        );
      })
      .catch(err => console.error(err));
  }

  reset() {
    super.reset();
    this._locationEnabled = false;
  }

  enableLocationSearch(enabled) {
    this._locationEnabled = enabled;
  }
}
