import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_OpaqueKey$stable;
var OpaqueKeyClass;
function OpaqueKey() {
  if (OpaqueKeyClass === VOID) {
    class $ {
      constructor(key) {
        this.s73_1 = key;
      }
      toString() {
        return 'OpaqueKey(key=' + this.s73_1 + ')';
      }
      hashCode() {
        return getStringHashCode(this.s73_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof OpaqueKey()))
          return false;
        var tmp0_other_with_cast = other instanceof OpaqueKey() ? other : THROW_CCE();
        if (!(this.s73_1 === tmp0_other_with_cast.s73_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'OpaqueKey');
    OpaqueKeyClass = $;
  }
  return OpaqueKeyClass;
}
//region block: init
androidx_compose_runtime_OpaqueKey$stable = 0;
//endregion
//region block: exports
export {
  OpaqueKey as OpaqueKey1binuex8ctph5,
};
//endregion

//# sourceMappingURL=OpaqueKey.mjs.map
