import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_map_style_Feature$stable;
var FeatureClass;
function Feature() {
  if (FeatureClass === VOID) {
    class $ {
      constructor(id, geometry, properties) {
        id = id === VOID ? null : id;
        this.n8w_1 = id;
        this.o8w_1 = geometry;
        this.p8w_1 = properties;
      }
      toString() {
        return 'Feature(id=' + this.n8w_1 + ', geometry=' + this.o8w_1.toString() + ', properties=' + this.p8w_1.toString() + ')';
      }
      hashCode() {
        var result = this.n8w_1 == null ? 0 : getStringHashCode(this.n8w_1);
        result = imul(result, 31) + hashCode(this.o8w_1) | 0;
        result = imul(result, 31) + this.p8w_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Feature()))
          return false;
        var tmp0_other_with_cast = other instanceof Feature() ? other : THROW_CCE();
        if (!(this.n8w_1 == tmp0_other_with_cast.n8w_1))
          return false;
        if (!equals(this.o8w_1, tmp0_other_with_cast.o8w_1))
          return false;
        if (!this.p8w_1.equals(tmp0_other_with_cast.p8w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Feature');
    FeatureClass = $;
  }
  return FeatureClass;
}
//region block: init
com_mbta_tid_mbta_app_map_style_Feature$stable = 8;
//endregion
//region block: exports
export {
  Feature as Feature1c2ymjiu5ok1c,
};
//endregion

//# sourceMappingURL=Feature.mjs.map
