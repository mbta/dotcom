import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_map_style_FeatureCollection$stable;
var FeatureCollectionClass;
function FeatureCollection() {
  if (FeatureCollectionClass === VOID) {
    class $ {
      constructor(features) {
        this.q8w_1 = features;
      }
      toString() {
        return 'FeatureCollection(features=' + toString(this.q8w_1) + ')';
      }
      hashCode() {
        return hashCode(this.q8w_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof FeatureCollection()))
          return false;
        var tmp0_other_with_cast = other instanceof FeatureCollection() ? other : THROW_CCE();
        if (!equals(this.q8w_1, tmp0_other_with_cast.q8w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'FeatureCollection');
    FeatureCollectionClass = $;
  }
  return FeatureCollectionClass;
}
//region block: init
com_mbta_tid_mbta_app_map_style_FeatureCollection$stable = 8;
//endregion
//region block: exports
export {
  FeatureCollection as FeatureCollection377neeb1a2i00,
};
//endregion

//# sourceMappingURL=FeatureCollection.mjs.map
