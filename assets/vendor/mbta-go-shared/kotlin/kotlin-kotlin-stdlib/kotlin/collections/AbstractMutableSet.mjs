import { AbstractMutableCollections0bg6c40ztuj as AbstractMutableCollection } from './AbstractMutableCollectionJs.mjs';
import {
  KtSetjrjc7fhfd6b9 as KtSet,
  KtMutableSetwuwn7k5m570a as KtMutableSet,
} from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { Companion_instancebp0pjgpwp9ql as Companion_instance } from './AbstractSet.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AbstractMutableSetClass;
function AbstractMutableSet() {
  if (AbstractMutableSetClass === VOID) {
    class $ extends AbstractMutableCollection() {
      static m8() {
        return this.w6();
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
    initMetadataForClass($, 'AbstractMutableSet', VOID, VOID, [AbstractMutableCollection(), KtMutableSet()]);
    AbstractMutableSetClass = $;
  }
  return AbstractMutableSetClass;
}
//region block: exports
export {
  AbstractMutableSet as AbstractMutableSetthfi6jds1k2h,
};
//endregion

//# sourceMappingURL=AbstractMutableSet.mjs.map
