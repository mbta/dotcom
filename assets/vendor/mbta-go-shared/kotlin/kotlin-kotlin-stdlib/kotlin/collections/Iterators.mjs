import { checkIndexOverflow3frtmheghr0th as checkIndexOverflow } from './collectionJs.mjs';
import { IndexedValue22atz80p92rrf as IndexedValue } from './IndexedValue.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var IndexingIteratorClass;
function IndexingIterator() {
  if (IndexingIteratorClass === VOID) {
    class $ {
      constructor(iterator) {
        this.eo_1 = iterator;
        this.fo_1 = 0;
      }
      y() {
        return this.eo_1.y();
      }
      z() {
        var _unary__edvuaz = this.fo_1;
        this.fo_1 = _unary__edvuaz + 1 | 0;
        return new (IndexedValue())(checkIndexOverflow(_unary__edvuaz), this.eo_1.z());
      }
    }
    initMetadataForClass($, 'IndexingIterator');
    IndexingIteratorClass = $;
  }
  return IndexingIteratorClass;
}
//region block: exports
export {
  IndexingIterator as IndexingIterator2403qllmopoxd,
};
//endregion

//# sourceMappingURL=Iterators.mjs.map
