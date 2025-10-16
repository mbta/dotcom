import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_map_StopLayerGenerator_State$stable;
var com_mbta_tid_mbta_app_map_StopLayerGenerator$stable;
var StateClass;
function State() {
  if (StateClass === VOID) {
    class $ {
      constructor(selectedStopId, stopFilter) {
        selectedStopId = selectedStopId === VOID ? null : selectedStopId;
        stopFilter = stopFilter === VOID ? null : stopFilter;
        this.l8w_1 = selectedStopId;
        this.m8w_1 = stopFilter;
      }
      toString() {
        return 'State(selectedStopId=' + this.l8w_1 + ', stopFilter=' + toString(this.m8w_1) + ')';
      }
      hashCode() {
        var result = this.l8w_1 == null ? 0 : getStringHashCode(this.l8w_1);
        result = imul(result, 31) + (this.m8w_1 == null ? 0 : this.m8w_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof State()))
          return false;
        var tmp0_other_with_cast = other instanceof State() ? other : THROW_CCE();
        if (!(this.l8w_1 == tmp0_other_with_cast.l8w_1))
          return false;
        if (!equals(this.m8w_1, tmp0_other_with_cast.m8w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'State', State);
    StateClass = $;
  }
  return StateClass;
}
//region block: init
com_mbta_tid_mbta_app_map_StopLayerGenerator_State$stable = 0;
com_mbta_tid_mbta_app_map_StopLayerGenerator$stable = 0;
//endregion
//region block: exports
export {
  State as State3429eegrfde1f,
};
//endregion

//# sourceMappingURL=StopLayerGenerator.mjs.map
