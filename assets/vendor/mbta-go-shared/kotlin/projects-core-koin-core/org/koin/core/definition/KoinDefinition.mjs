import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var KoinDefinitionClass;
function KoinDefinition() {
  if (KoinDefinitionClass === VOID) {
    class $ {
      constructor(module_0, factory) {
        this.j7w_1 = module_0;
        this.k7w_1 = factory;
      }
      toString() {
        return 'KoinDefinition(module=' + toString(this.j7w_1) + ', factory=' + toString(this.k7w_1) + ')';
      }
      hashCode() {
        var result = this.j7w_1.hashCode();
        result = imul(result, 31) + hashCode(this.k7w_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof KoinDefinition()))
          return false;
        var tmp0_other_with_cast = other instanceof KoinDefinition() ? other : THROW_CCE();
        if (!this.j7w_1.equals(tmp0_other_with_cast.j7w_1))
          return false;
        if (!equals(this.k7w_1, tmp0_other_with_cast.k7w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'KoinDefinition');
    KoinDefinitionClass = $;
  }
  return KoinDefinitionClass;
}
//region block: exports
export {
  KoinDefinition as KoinDefinition2pr0kscd0vkk6,
};
//endregion

//# sourceMappingURL=KoinDefinition.mjs.map
