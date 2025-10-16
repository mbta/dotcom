import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var StringQualifierClass;
function StringQualifier() {
  if (StringQualifierClass === VOID) {
    class $ {
      constructor(value) {
        this.x7y_1 = value;
      }
      v1() {
        return this.x7y_1;
      }
      toString() {
        return this.x7y_1;
      }
      hashCode() {
        return getStringHashCode(this.x7y_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StringQualifier()))
          return false;
        var tmp0_other_with_cast = other instanceof StringQualifier() ? other : THROW_CCE();
        if (!(this.x7y_1 === tmp0_other_with_cast.x7y_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'StringQualifier');
    StringQualifierClass = $;
  }
  return StringQualifierClass;
}
//region block: exports
export {
  StringQualifier as StringQualifier24qdtqrwld0hk,
};
//endregion

//# sourceMappingURL=StringQualifier.mjs.map
