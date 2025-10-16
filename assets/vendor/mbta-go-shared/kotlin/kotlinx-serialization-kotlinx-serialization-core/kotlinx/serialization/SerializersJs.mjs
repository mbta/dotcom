import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  toString1pkumu07cwy4m as toString,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var SerializableWithClass;
function SerializableWith() {
  if (SerializableWithClass === VOID) {
    class $ {
      constructor(serializer) {
        this.b1l_1 = serializer;
      }
      equals(other) {
        if (!(other instanceof SerializableWith()))
          return false;
        var tmp0_other_with_cast = other instanceof SerializableWith() ? other : THROW_CCE();
        if (!this.b1l_1.equals(tmp0_other_with_cast.b1l_1))
          return false;
        return true;
      }
      hashCode() {
        return imul(getStringHashCode('serializer'), 127) ^ this.b1l_1.hashCode();
      }
      toString() {
        return '@kotlinx.serialization.SerializableWith(' + 'serializer=' + toString(this.b1l_1) + ')';
      }
    }
    initMetadataForClass($, 'SerializableWith', VOID, VOID, VOID, VOID, 0);
    SerializableWithClass = $;
  }
  return SerializableWithClass;
}
//region block: exports
export {
  SerializableWith as SerializableWithd2dap36updxd,
};
//endregion

//# sourceMappingURL=SerializersJs.mjs.map
