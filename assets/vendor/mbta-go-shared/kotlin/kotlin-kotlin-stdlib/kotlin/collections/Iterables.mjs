import { ArrayList3it5z8td81qkl as ArrayList } from './ArrayListJs.mjs';
import { addAll1k27qatfgp3k5 as addAll } from './MutableCollections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { Collection1k04j3hzsbod0 as Collection } from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { IndexingIterator2403qllmopoxd as IndexingIterator } from './Iterators.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function flatten(_this__u8e3s4) {
  var result = ArrayList().g1();
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    addAll(result, element);
  }
  return result;
}
function collectionSizeOrDefault(_this__u8e3s4, default_0) {
  var tmp;
  if (isInterface(_this__u8e3s4, Collection())) {
    tmp = _this__u8e3s4.c1();
  } else {
    tmp = default_0;
  }
  return tmp;
}
var IndexingIterableClass;
function IndexingIterable() {
  if (IndexingIterableClass === VOID) {
    class $ {
      constructor(iteratorFactory) {
        this.do_1 = iteratorFactory;
      }
      x() {
        return new (IndexingIterator())(this.do_1());
      }
    }
    initMetadataForClass($, 'IndexingIterable');
    IndexingIterableClass = $;
  }
  return IndexingIterableClass;
}
function collectionSizeOrNull(_this__u8e3s4) {
  var tmp;
  if (isInterface(_this__u8e3s4, Collection())) {
    tmp = _this__u8e3s4.c1();
  } else {
    tmp = null;
  }
  return tmp;
}
//region block: exports
export {
  IndexingIterable as IndexingIterable2a6g9uso7i6wu,
  collectionSizeOrDefault as collectionSizeOrDefault36dulx8yinfqm,
  collectionSizeOrNull as collectionSizeOrNull1v5nsm81on7r9,
  flatten as flatten2dh4kibw1u0qq,
};
//endregion

//# sourceMappingURL=Iterables.mjs.map
