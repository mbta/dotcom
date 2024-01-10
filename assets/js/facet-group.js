import { FacetItem } from "./facet-item";

export class FacetGroup {
  constructor(facetData, parent) {
    this._facetMap = {};
    this._parent = parent;
    this._item = new FacetItem(facetData, this);
  }

  addToMap(facets, facetItem) {
    this._facetMap[facets] = facetItem;
  }

  render(container, style) {
    this._item.render(container, style);
  }

  sumChildren() {
    return true;
  }

  updateCount() {
    return true;
  }

  updateCounts(facetResults) {
    Object.keys(this._facetMap).forEach(key => {
      let count = 0;
      key.split(",").forEach(facet => {
        if (facetResults[facet]) {
          count += facetResults[facet];
        }
      });
      this._facetMap[key].updateCount(count);
    });
  }

  update() {
    this._parent.update();
  }

  updateState() {
    this._parent.updateState();
  }

  getFacetsForQuery() {
    return this._item.getActiveFacets();
  }

  shouldDisableQuery() {
    return this._item.allChildrenStatus(false);
  }

  modifySearch(search, queryId) {
    if (!this.shouldDisableQuery()) {
      search.updateFacetFilters(queryId, this.getFacetsForQuery());
      search.addActiveQuery(queryId);
    }
  }

  reset() {
    this._item.reset();
  }

  selectedFacetNames() {
    return this._item.selectedFacetNames([]);
  }

  loadFacet(id) {
    this._item.loadFacet(id);
  }
}
