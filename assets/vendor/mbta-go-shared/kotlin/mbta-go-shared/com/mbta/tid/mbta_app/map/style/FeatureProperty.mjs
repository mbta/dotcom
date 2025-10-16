import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_map_style_FeatureProperty$stable;
var FeaturePropertyClass;
function FeatureProperty() {
  if (FeaturePropertyClass === VOID) {
    class $ {
      constructor(key) {
        this.x8w_1 = key;
      }
      toString() {
        return 'FeatureProperty(key=' + this.x8w_1 + ')';
      }
      hashCode() {
        return getStringHashCode(this.x8w_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof FeatureProperty()))
          return false;
        var tmp0_other_with_cast = other instanceof FeatureProperty() ? other : THROW_CCE();
        if (!(this.x8w_1 === tmp0_other_with_cast.x8w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'FeatureProperty');
    FeaturePropertyClass = $;
  }
  return FeaturePropertyClass;
}
//region block: init
com_mbta_tid_mbta_app_map_style_FeatureProperty$stable = 0;
//endregion
//region block: exports
export {
  FeatureProperty as FeatureProperty3gcsh4e95qpxl,
};
//endregion

//# sourceMappingURL=FeatureProperty.mjs.map
