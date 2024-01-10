import { FacetGroup } from "./facet-group";

export class FacetLocationGroup extends FacetGroup {
  constructor(data, parent) {
    super(data, parent);
  }

  modifySearch(search, queryId) {
    search.enableLocationSearch(this._item.isChecked());
  }

  updateCounts(facetResults) {
    this._item.updateCount(facetResults["locations"]);
  }
}
