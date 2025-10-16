import { AbstractCollection1g9uvtcheckwb as AbstractCollection } from './AbstractCollection.mjs';
import { equals2au1ep9vhcato as equals } from '../js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import {
  MutableIterablez3x4ksk1fmrm as MutableIterable,
  Collection1k04j3hzsbod0 as Collection,
} from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { removeAll3cm9rh0qak2y6 as removeAll } from './MutableCollections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function AbstractMutableCollection$removeAll$lambda($elements) {
  return function (it) {
    return $elements.j1(it);
  };
}
function AbstractMutableCollection$retainAll$lambda($elements) {
  return function (it) {
    return !$elements.j1(it);
  };
}
var AbstractMutableCollectionClass;
function AbstractMutableCollection() {
  if (AbstractMutableCollectionClass === VOID) {
    class $ extends AbstractCollection() {
      static w6() {
        return this.x6();
      }
      m3(element) {
        this.y6();
        var iterator = this.x();
        while (iterator.y()) {
          if (equals(iterator.z(), element)) {
            iterator.z6();
            return true;
          }
        }
        return false;
      }
      d1(elements) {
        this.y6();
        var modified = false;
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          if (this.i(element))
            modified = true;
        }
        return modified;
      }
      h2(elements) {
        this.y6();
        var tmp = isInterface(this, MutableIterable()) ? this : THROW_CCE();
        return removeAll(tmp, AbstractMutableCollection$removeAll$lambda(elements));
      }
      o3(elements) {
        this.y6();
        var tmp = isInterface(this, MutableIterable()) ? this : THROW_CCE();
        return removeAll(tmp, AbstractMutableCollection$retainAll$lambda(elements));
      }
      p3() {
        this.y6();
        var iterator = this.x();
        while (iterator.y()) {
          iterator.z();
          iterator.z6();
        }
      }
      toJSON() {
        return this.toArray();
      }
      y6() {
      }
    }
    initMetadataForClass($, 'AbstractMutableCollection', VOID, VOID, [AbstractCollection(), Collection(), MutableIterable()]);
    AbstractMutableCollectionClass = $;
  }
  return AbstractMutableCollectionClass;
}
//region block: exports
export {
  AbstractMutableCollection as AbstractMutableCollections0bg6c40ztuj,
};
//endregion

//# sourceMappingURL=AbstractMutableCollectionJs.mjs.map
