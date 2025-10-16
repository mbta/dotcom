import { toString30pk9tzaqopn as toString } from '../Library.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  equals2au1ep9vhcato as equals,
} from '../js/coreRuntime.mjs';
import { Collection1k04j3hzsbod0 as Collection } from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from './_Collections.mjs';
import { collectionToArray1y0om6a7tdy9a as collectionToArray } from './collectionJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function AbstractCollection$toString$lambda(this$0) {
  return function (it) {
    return it === this$0 ? '(this Collection)' : toString(it);
  };
}
var AbstractCollectionClass;
function AbstractCollection() {
  if (AbstractCollectionClass === VOID) {
    class $ {
      static x6($box) {
        return createThis(this, $box);
      }
      j1(element) {
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.any' call
          var tmp;
          if (isInterface(this, Collection())) {
            tmp = this.h1();
          } else {
            tmp = false;
          }
          if (tmp) {
            tmp$ret$0 = false;
            break $l$block_0;
          }
          var _iterator__ex2g4s = this.x();
          while (_iterator__ex2g4s.y()) {
            var element_0 = _iterator__ex2g4s.z();
            if (equals(element_0, element)) {
              tmp$ret$0 = true;
              break $l$block_0;
            }
          }
          tmp$ret$0 = false;
        }
        return tmp$ret$0;
      }
      d3(elements) {
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.all' call
          var tmp;
          if (isInterface(elements, Collection())) {
            tmp = elements.h1();
          } else {
            tmp = false;
          }
          if (tmp) {
            tmp$ret$0 = true;
            break $l$block_0;
          }
          var _iterator__ex2g4s = elements.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (!this.j1(element)) {
              tmp$ret$0 = false;
              break $l$block_0;
            }
          }
          tmp$ret$0 = true;
        }
        return tmp$ret$0;
      }
      h1() {
        return this.c1() === 0;
      }
      toString() {
        return joinToString(this, ', ', '[', ']', VOID, VOID, AbstractCollection$toString$lambda(this));
      }
      toArray() {
        return collectionToArray(this);
      }
    }
    initMetadataForClass($, 'AbstractCollection', VOID, VOID, [Collection()]);
    AbstractCollectionClass = $;
  }
  return AbstractCollectionClass;
}
//region block: exports
export {
  AbstractCollection as AbstractCollection1g9uvtcheckwb,
};
//endregion

//# sourceMappingURL=AbstractCollection.mjs.map
