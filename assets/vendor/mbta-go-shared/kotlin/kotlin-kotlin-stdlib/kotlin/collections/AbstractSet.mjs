import { hashCodeq5arwsb9dgti as hashCode } from '../js/coreRuntime.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { AbstractCollection1g9uvtcheckwb as AbstractCollection } from './AbstractCollection.mjs';
import { KtSetjrjc7fhfd6b9 as KtSet } from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      o8(c) {
        var hashCode_0 = 0;
        var _iterator__ex2g4s = c.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp = hashCode_0;
          var tmp1_elvis_lhs = element == null ? null : hashCode(element);
          hashCode_0 = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        }
        return hashCode_0;
      }
      n8(c, other) {
        if (!(c.c1() === other.c1()))
          return false;
        return c.d3(other);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var AbstractSetClass;
function AbstractSet() {
  if (AbstractSetClass === VOID) {
    class $ extends AbstractCollection() {
      static an($box) {
        return this.x6($box);
      }
      equals(other) {
        if (other === this)
          return true;
        if (!(!(other == null) ? isInterface(other, KtSet()) : false))
          return false;
        return Companion_instance.n8(this, other);
      }
      hashCode() {
        return Companion_instance.o8(this);
      }
    }
    initMetadataForClass($, 'AbstractSet', VOID, VOID, [AbstractCollection(), KtSet()]);
    AbstractSetClass = $;
  }
  return AbstractSetClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instancebp0pjgpwp9ql,
  AbstractSet as AbstractSet2mw1ev10zm1bz,
};
//endregion

//# sourceMappingURL=AbstractSet.mjs.map
