import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var TypeInfoClass;
function TypeInfo() {
  if (TypeInfoClass === VOID) {
    class $ {
      constructor(type, kotlinType) {
        kotlinType = kotlinType === VOID ? null : kotlinType;
        this.g3n_1 = type;
        this.h3n_1 = kotlinType;
      }
      hashCode() {
        var tmp0_safe_receiver = this.h3n_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
        return tmp1_elvis_lhs == null ? this.g3n_1.hashCode() : tmp1_elvis_lhs;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TypeInfo()))
          return false;
        var tmp;
        if (!(this.h3n_1 == null) || !(other.h3n_1 == null)) {
          tmp = equals(this.h3n_1, other.h3n_1);
        } else {
          tmp = this.g3n_1.equals(other.g3n_1);
        }
        return tmp;
      }
      toString() {
        var tmp0_elvis_lhs = this.h3n_1;
        return 'TypeInfo(' + toString(tmp0_elvis_lhs == null ? this.g3n_1 : tmp0_elvis_lhs) + ')';
      }
    }
    initMetadataForClass($, 'TypeInfo');
    TypeInfoClass = $;
  }
  return TypeInfoClass;
}
//region block: exports
export {
  TypeInfo as TypeInfo2nbxsuf4v8os2,
};
//endregion

//# sourceMappingURL=Type.mjs.map
