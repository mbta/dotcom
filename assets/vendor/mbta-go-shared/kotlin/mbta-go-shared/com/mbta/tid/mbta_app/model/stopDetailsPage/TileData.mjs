import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  toString1pkumu07cwy4m as toString_0,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_stopDetailsPage_TileData$stable;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var TileDataClass;
function TileData() {
  if (TileDataClass === VOID) {
    class $ {
      constructor(route, headsign, formatted, upcoming) {
        this.k9q_1 = route;
        this.l9q_1 = headsign;
        this.m9q_1 = formatted;
        this.n9q_1 = upcoming;
        this.o9q_1 = this.n9q_1.a8u_1;
      }
      toString() {
        return 'TileData(route=' + toString(this.k9q_1) + ', headsign=' + this.l9q_1 + ', formatted=' + toString_0(this.m9q_1) + ', upcoming=' + this.n9q_1.toString() + ')';
      }
      hashCode() {
        var result = this.k9q_1 == null ? 0 : this.k9q_1.hashCode();
        result = imul(result, 31) + (this.l9q_1 == null ? 0 : getStringHashCode(this.l9q_1)) | 0;
        result = imul(result, 31) + hashCode(this.m9q_1) | 0;
        result = imul(result, 31) + this.n9q_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TileData()))
          return false;
        var tmp0_other_with_cast = other instanceof TileData() ? other : THROW_CCE();
        if (!equals(this.k9q_1, tmp0_other_with_cast.k9q_1))
          return false;
        if (!(this.l9q_1 == tmp0_other_with_cast.l9q_1))
          return false;
        if (!equals(this.m9q_1, tmp0_other_with_cast.m9q_1))
          return false;
        if (!this.n9q_1.equals(tmp0_other_with_cast.n9q_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'TileData');
    TileDataClass = $;
  }
  return TileDataClass;
}
//region block: init
com_mbta_tid_mbta_app_model_stopDetailsPage_TileData$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  TileData as TileData39ttynq0l9fw1,
};
//endregion

//# sourceMappingURL=TileData.mjs.map
