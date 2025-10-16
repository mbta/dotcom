import {
  naturalOrder3459ca049ngp6 as naturalOrder,
  nullsLast1ekilojjh9nz2 as nullsLast,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/comparisons/Comparisons.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_stopTime() {
  var tmp0_elvis_lhs = this.t95();
  return tmp0_elvis_lhs == null ? this.u95() : tmp0_elvis_lhs;
}
function stopTimeAfter(now) {
  var tmp0_safe_receiver = this.t95();
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.takeUnless' call
    var tmp_0;
    if (!(tmp0_safe_receiver.q8y(now) < 0)) {
      tmp_0 = tmp0_safe_receiver;
    } else {
      tmp_0 = null;
    }
    tmp = tmp_0;
  }
  var tmp1_elvis_lhs = tmp;
  return tmp1_elvis_lhs == null ? this.u95() : tmp1_elvis_lhs;
}
function hasArrivedButNotDeparted(now) {
  var tmp;
  var tmp0_safe_receiver = this.t95();
  var tmp_0;
  if (tmp0_safe_receiver == null) {
    tmp_0 = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp_0 = tmp0_safe_receiver.q8y(now) <= 0;
  }
  var tmp1_elvis_lhs = tmp_0;
  if (tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs) {
    var tmp2_safe_receiver = this.u95();
    var tmp_1;
    if (tmp2_safe_receiver == null) {
      tmp_1 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_1 = tmp2_safe_receiver.q8y(now) >= 0;
    }
    var tmp3_elvis_lhs = tmp_1;
    tmp = tmp3_elvis_lhs == null ? false : tmp3_elvis_lhs;
  } else {
    tmp = false;
  }
  return tmp;
}
function compareTo(other) {
  // Inline function 'kotlin.comparisons.nullsLast' call
  return nullsLast(naturalOrder()).compare(this.v95(), other.v95());
}
var TripStopTimeClass;
function TripStopTime() {
  if (TripStopTimeClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'TripStopTime', VOID, VOID, [Comparable()]);
    TripStopTimeClass = $;
  }
  return TripStopTimeClass;
}
//region block: exports
export {
  compareTo as compareTo1lrsc1ydfqdy6,
  hasArrivedButNotDeparted as hasArrivedButNotDeparted1kdg27h8y55if,
  get_stopTime as get_stopTime2bonaxdpa1ssu,
  stopTimeAfter as stopTimeAfter15191k7ntm3c3,
  TripStopTime as TripStopTime3p281vyy0x1rq,
};
//endregion

//# sourceMappingURL=TripStopTime.mjs.map
