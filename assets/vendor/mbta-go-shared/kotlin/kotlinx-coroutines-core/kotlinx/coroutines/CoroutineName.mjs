import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { AbstractCoroutineContextElement2rpehg0hv5szw as AbstractCoroutineContextElement } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var KeyClass;
function Key() {
  if (KeyClass === VOID) {
    class $ {}
    initMetadataForObject($, 'Key');
    KeyClass = $;
  }
  return KeyClass;
}
var Key_instance;
function Key_getInstance() {
  return Key_instance;
}
var CoroutineNameClass;
function CoroutineName() {
  if (CoroutineNameClass === VOID) {
    class $ extends AbstractCoroutineContextElement() {
      constructor(name) {
        super(Key_instance);
        this.t28_1 = name;
      }
      toString() {
        return 'CoroutineName(' + this.t28_1 + ')';
      }
      hashCode() {
        return getStringHashCode(this.t28_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof CoroutineName()))
          return false;
        var tmp0_other_with_cast = other instanceof CoroutineName() ? other : THROW_CCE();
        if (!(this.t28_1 === tmp0_other_with_cast.t28_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'CoroutineName');
    CoroutineNameClass = $;
  }
  return CoroutineNameClass;
}
//region block: init
Key_instance = new (Key())();
//endregion
//region block: exports
export {
  CoroutineName as CoroutineName2g5zosw74tf0f,
};
//endregion

//# sourceMappingURL=CoroutineName.mjs.map
