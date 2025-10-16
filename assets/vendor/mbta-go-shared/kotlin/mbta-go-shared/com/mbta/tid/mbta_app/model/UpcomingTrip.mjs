import {
  createThis2j2avj17cvnv2 as createThis,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { resolveParentId3ngqc2n7fgyov as resolveParentId } from '../utils/resolveParentId.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { plus1ogy4liedzq5j as plus } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Sets.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { KtMap140uvy3s5zad8 as KtMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  sorted354mfsiv4s7x5 as sorted,
  take3onnpy6q7ctcz as take,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { ScheduleRelationship_Cancelled_getInstance3gcqjojivixxs as ScheduleRelationship_Cancelled_getInstance } from './Prediction.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  naturalOrder3459ca049ngp6 as naturalOrder,
  nullsLast1ekilojjh9nz2 as nullsLast,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/comparisons/Comparisons.mjs';
import { StopEdgeType_Unavailable_getInstance3pzdo8pszozo6 as StopEdgeType_Unavailable_getInstance } from './Schedule.mjs';
import {
  Companion_getInstancedmznu1ehz4t5 as Companion_getInstance,
  Skippedszanll7bzihn as Skipped,
  Hidden1xjtkgly930t3 as Hidden,
  ScheduleMinutes3id9itxod5ru4 as ScheduleMinutes,
  ScheduleTime3aijuiff19ws6 as ScheduleTime,
} from './TripInstantDisplay.mjs';
import { get_silverRoutessxztys6i4f4z as get_silverRoutes } from './MapStopRoute.mjs';
import { FormattedTrip3c5m45gvmcph2 as FormattedTrip } from './UpcomingFormat.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { Paire9pteg33gng7 as Pair } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_UpcomingTrip$stable;
var UpcomingTrip$Companion$tripsFromData$UpcomingTripKeyClass;
function UpcomingTrip$Companion$tripsFromData$UpcomingTripKey() {
  if (UpcomingTrip$Companion$tripsFromData$UpcomingTripKeyClass === VOID) {
    class $ {
      static p9m($stops, tripId, rootStopId, stopSequence) {
        var $this = createThis(this);
        $this.o9m_1 = $stops;
        $this.l9m_1 = tripId;
        $this.m9m_1 = rootStopId;
        $this.n9m_1 = stopSequence;
        return $this;
      }
      static q9m($stops, schedule) {
        return this.p9m($stops, schedule.k9f_1, resolveParentId($stops, schedule.j9f_1), schedule.h9f_1);
      }
      static r9m($stops, prediction) {
        return this.p9m($stops, prediction.q95_1, resolveParentId($stops, prediction.p95_1), prediction.n95_1);
      }
      toString() {
        return 'UpcomingTripKey(tripId=' + this.l9m_1 + ', rootStopId=' + this.m9m_1 + ', stopSequence=' + this.n9m_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.l9m_1);
        result = imul(result, 31) + (this.m9m_1 == null ? 0 : getStringHashCode(this.m9m_1)) | 0;
        result = imul(result, 31) + (this.n9m_1 == null ? 0 : this.n9m_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof UpcomingTrip$Companion$tripsFromData$UpcomingTripKey()))
          return false;
        var tmp0_other_with_cast = other instanceof UpcomingTrip$Companion$tripsFromData$UpcomingTripKey() ? other : THROW_CCE();
        if (!(this.l9m_1 === tmp0_other_with_cast.l9m_1))
          return false;
        if (!(this.m9m_1 == tmp0_other_with_cast.m9m_1))
          return false;
        if (!(this.n9m_1 == tmp0_other_with_cast.n9m_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'UpcomingTripKey');
    UpcomingTrip$Companion$tripsFromData$UpcomingTripKeyClass = $;
  }
  return UpcomingTrip$Companion$tripsFromData$UpcomingTripKeyClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      u9b(stops, schedules, predictions, trips, vehicles, filterAtTime) {
        // Inline function 'kotlin.collections.associateBy' call
        var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(schedules, 10)), 16);
        // Inline function 'kotlin.collections.associateByTo' call
        var destination = LinkedHashMap().tc(capacity);
        var _iterator__ex2g4s = schedules.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp$ret$0 = UpcomingTrip$Companion$tripsFromData$UpcomingTripKey().q9m(stops, element);
          destination.t3(tmp$ret$0, element);
        }
        var schedulesMap = destination;
        // Inline function 'kotlin.collections.associateBy' call
        var capacity_0 = coerceAtLeast(mapCapacity(collectionSizeOrDefault(predictions, 10)), 16);
        // Inline function 'kotlin.collections.associateByTo' call
        var destination_0 = LinkedHashMap().tc(capacity_0);
        var _iterator__ex2g4s_0 = predictions.x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          var tmp$ret$3 = UpcomingTrip$Companion$tripsFromData$UpcomingTripKey().r9m(stops, element_0);
          destination_0.t3(tmp$ret$3, element_0);
        }
        var predictionsMap = destination_0;
        var keys = plus(schedulesMap.k3(), predictionsMap.k3());
        // Inline function 'kotlin.collections.mapNotNull' call
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination_1 = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s_1 = keys.x();
        while (_iterator__ex2g4s_1.y()) {
          var element_1 = _iterator__ex2g4s_1.z();
          var tmp$ret$6;
          $l$block: {
            var prediction = predictionsMap.j3(element_1);
            var tmp0_elvis_lhs = trips.j3(element_1.l9m_1);
            var tmp;
            if (tmp0_elvis_lhs == null) {
              tmp$ret$6 = null;
              break $l$block;
            } else {
              tmp = tmp0_elvis_lhs;
            }
            var tmp_0 = tmp;
            var tmp_1 = schedulesMap.j3(element_1);
            // Inline function 'kotlin.collections.get' call
            var key = prediction == null ? null : prediction.p95_1;
            var tmp_2 = (isInterface(stops, KtMap()) ? stops : THROW_CCE()).j3(key);
            var tmp2_safe_receiver = predictionsMap.j3(element_1);
            var tmp_3;
            if (tmp2_safe_receiver == null) {
              tmp_3 = null;
            } else {
              // Inline function 'kotlin.let' call
              // Inline function 'kotlin.collections.get' call
              var key_0 = tmp2_safe_receiver.r95_1;
              tmp_3 = (isInterface(vehicles, KtMap()) ? vehicles : THROW_CCE()).j3(key_0);
            }
            tmp$ret$6 = new (UpcomingTrip())(tmp_0, tmp_1, prediction, tmp_2, tmp_3);
          }
          var tmp0_safe_receiver = tmp$ret$6;
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination_1.i(tmp0_safe_receiver);
          }
        }
        // Inline function 'kotlin.collections.filter' call
        var tmp0 = sorted(destination_1);
        // Inline function 'kotlin.collections.filterTo' call
        var destination_2 = ArrayList().g1();
        var _iterator__ex2g4s_2 = tmp0.x();
        while (_iterator__ex2g4s_2.y()) {
          var element_2 = _iterator__ex2g4s_2.z();
          var tmp$ret$17;
          $l$block_1: {
            if (!(element_2.x8t_1 == null)) {
              tmp$ret$17 = true;
              break $l$block_1;
            }
            var tmp0_safe_receiver_0 = element_2.w8t_1;
            var tmp1_elvis_lhs = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.v95();
            var tmp_4;
            if (tmp1_elvis_lhs == null) {
              tmp$ret$17 = true;
              break $l$block_1;
            } else {
              tmp_4 = tmp1_elvis_lhs;
            }
            var scheduleTime = tmp_4;
            tmp$ret$17 = scheduleTime.q8y(filterAtTime) >= 0;
          }
          if (tmp$ret$17) {
            destination_2.i(element_2);
          }
        }
        return destination_2;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  return Companion_instance;
}
var UpcomingTripClass;
function UpcomingTrip() {
  if (UpcomingTripClass === VOID) {
    class $ {
      constructor(trip, schedule, prediction, predictionStop, vehicle) {
        schedule = schedule === VOID ? null : schedule;
        prediction = prediction === VOID ? null : prediction;
        predictionStop = predictionStop === VOID ? null : predictionStop;
        vehicle = vehicle === VOID ? null : vehicle;
        this.v8t_1 = trip;
        this.w8t_1 = schedule;
        this.x8t_1 = prediction;
        this.y8t_1 = predictionStop;
        this.z8t_1 = vehicle;
        var tmp = this;
        var tmp0_safe_receiver = this.x8t_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n95_1;
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          var tmp2_safe_receiver = this.w8t_1;
          tmp_0 = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.h9f_1;
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        tmp.a8u_1 = this.v8t_1.o8t_1 + '-' + tmp_0;
        var tmp_1 = this;
        var tmp_2;
        if (!(this.x8t_1 == null) && !this.x8t_1.l95_1.equals(ScheduleRelationship_Cancelled_getInstance()) && !(this.x8t_1.v95() == null && !(this.x8t_1.m95_1 == null))) {
          tmp_2 = this.x8t_1.v95();
        } else {
          var tmp0_safe_receiver_0 = this.w8t_1;
          tmp_2 = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.v95();
        }
        tmp_1.b8u_1 = tmp_2;
        var tmp_3 = this;
        // Inline function 'kotlin.run' call
        var tmp0_safe_receiver_1 = this.x8t_1;
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_1 == null ? null : tmp0_safe_receiver_1.p95_1;
        var tmp_4;
        if (tmp1_elvis_lhs_0 == null) {
          var tmp2_safe_receiver_0 = this.w8t_1;
          tmp_4 = tmp2_safe_receiver_0 == null ? null : tmp2_safe_receiver_0.j9f_1;
        } else {
          tmp_4 = tmp1_elvis_lhs_0;
        }
        tmp_3.c8u_1 = tmp_4;
        var tmp_5 = this;
        // Inline function 'kotlin.run' call
        var tmp_6;
        if (!(this.w8t_1 == null)) {
          var tmp0_safe_receiver_2 = this.x8t_1;
          tmp_6 = !((tmp0_safe_receiver_2 == null ? null : tmp0_safe_receiver_2.n95_1) == null);
        } else {
          tmp_6 = false;
        }
        if (tmp_6) {
          // Inline function 'kotlin.check' call
          if (!(this.w8t_1.h9f_1 === this.x8t_1.n95_1)) {
            throw IllegalStateException().o5('Check failed.');
          }
        }
        var tmp1_safe_receiver = this.x8t_1;
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.n95_1;
        var tmp_7;
        if (tmp2_elvis_lhs == null) {
          var tmp3_safe_receiver = this.w8t_1;
          tmp_7 = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.h9f_1;
        } else {
          tmp_7 = tmp2_elvis_lhs;
        }
        tmp_5.d8u_1 = tmp_7;
        var tmp_8 = this;
        var tmp_9;
        var tmp0_safe_receiver_3 = this.y8t_1;
        if ((tmp0_safe_receiver_3 == null ? null : tmp0_safe_receiver_3.k8r_1) === true) {
          tmp_9 = this.y8t_1.b8r_1;
        } else {
          tmp_9 = null;
        }
        tmp_8.e8u_1 = tmp_9;
      }
      i97() {
        var tmp0_safe_receiver = this.w8t_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.g9f_1;
        return tmp1_elvis_lhs == null ? this.v8t_1.q8t_1 : tmp1_elvis_lhs;
      }
      t21() {
        var tmp;
        var tmp0_safe_receiver = this.w8t_1;
        if (!((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v95()) == null)) {
          var tmp1_safe_receiver = this.x8t_1;
          tmp = equals(tmp1_safe_receiver == null ? null : tmp1_safe_receiver.l95_1, ScheduleRelationship_Cancelled_getInstance());
        } else {
          tmp = false;
        }
        return tmp;
      }
      a9c() {
        return !(this.b8u_1 == null);
      }
      h97(currentTime, cutoffTime) {
        var tmp;
        if (!(this.b8u_1 == null) && this.b8u_1.q8y(cutoffTime) < 0) {
          var tmp_0;
          if (this.b8u_1.q8y(currentTime) >= 0) {
            tmp_0 = true;
          } else {
            var tmp_1;
            if (!(this.x8t_1 == null)) {
              var tmp_2;
              var tmp0_safe_receiver = this.z8t_1;
              if (this.x8t_1.p95_1 === (tmp0_safe_receiver == null ? null : tmp0_safe_receiver.s9h_1)) {
                tmp_2 = true;
              } else {
                tmp_2 = !(this.x8t_1.m95_1 == null);
              }
              tmp_1 = tmp_2;
            } else {
              tmp_1 = false;
            }
            tmp_0 = tmp_1;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      s9m(other) {
        // Inline function 'kotlin.comparisons.nullsLast' call
        return nullsLast(naturalOrder()).compare(this.b8u_1, other.b8u_1);
      }
      d(other) {
        return this.s9m(other instanceof UpcomingTrip() ? other : THROW_CCE());
      }
      z9b() {
        var tmp;
        if (!(this.w8t_1 == null)) {
          tmp = !this.w8t_1.e9f_1.equals(StopEdgeType_Unavailable_getInstance());
        } else {
          var tmp0_safe_receiver = this.x8t_1;
          tmp = !((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.h95_1) == null);
        }
        var hasArrival = tmp;
        var tmp_0;
        if (!(this.w8t_1 == null)) {
          tmp_0 = !this.w8t_1.f9f_1.equals(StopEdgeType_Unavailable_getInstance());
        } else {
          var tmp1_safe_receiver = this.x8t_1;
          tmp_0 = !((tmp1_safe_receiver == null ? null : tmp1_safe_receiver.i95_1) == null);
        }
        var hasDeparture = tmp_0;
        var tmp_1;
        if (!hasArrival && !hasDeparture) {
          tmp_1 = null;
        } else {
          tmp_1 = !hasDeparture;
        }
        return tmp_1;
      }
      f9m(now, routeType, context) {
        return Companion_getInstance().b9m(this.x8t_1, this.w8t_1, this.z8t_1, routeType, now, context);
      }
      u9k(now, route, context) {
        return this.t9m(now, route.p8r_1, context, route.p8r_1.w94() || get_silverRoutes().j1(route.o8r_1));
      }
      t9m(now, routeType, context, hideSchedule) {
        // Inline function 'kotlin.takeUnless' call
        var this_0 = FormattedTrip().e9m(this, routeType, now, context);
        var tmp;
        var tmp_0;
        var tmp_1;
        var tmp_2 = this_0.p92_1;
        if (tmp_2 instanceof Hidden()) {
          tmp_1 = true;
        } else {
          var tmp_3 = this_0.p92_1;
          tmp_1 = tmp_3 instanceof Skipped();
        }
        if (tmp_1) {
          tmp_0 = true;
        } else {
          var tmp_4;
          if (hideSchedule) {
            var tmp_5;
            var tmp_6 = this_0.p92_1;
            if (tmp_6 instanceof ScheduleTime()) {
              tmp_5 = true;
            } else {
              var tmp_7 = this_0.p92_1;
              tmp_5 = tmp_7 instanceof ScheduleMinutes();
            }
            tmp_4 = tmp_5;
          } else {
            tmp_4 = false;
          }
          tmp_0 = tmp_4;
        }
        if (!tmp_0) {
          tmp = this_0;
        } else {
          tmp = null;
        }
        return tmp;
      }
      toString() {
        return 'UpcomingTrip(trip=' + this.v8t_1.toString() + ', schedule=' + toString(this.w8t_1) + ', prediction=' + toString(this.x8t_1) + ', predictionStop=' + toString(this.y8t_1) + ', vehicle=' + toString(this.z8t_1) + ')';
      }
      hashCode() {
        var result = this.v8t_1.hashCode();
        result = imul(result, 31) + (this.w8t_1 == null ? 0 : this.w8t_1.hashCode()) | 0;
        result = imul(result, 31) + (this.x8t_1 == null ? 0 : this.x8t_1.hashCode()) | 0;
        result = imul(result, 31) + (this.y8t_1 == null ? 0 : this.y8t_1.hashCode()) | 0;
        result = imul(result, 31) + (this.z8t_1 == null ? 0 : this.z8t_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof UpcomingTrip()))
          return false;
        var tmp0_other_with_cast = other instanceof UpcomingTrip() ? other : THROW_CCE();
        if (!this.v8t_1.equals(tmp0_other_with_cast.v8t_1))
          return false;
        if (!equals(this.w8t_1, tmp0_other_with_cast.w8t_1))
          return false;
        if (!equals(this.x8t_1, tmp0_other_with_cast.x8t_1))
          return false;
        if (!equals(this.y8t_1, tmp0_other_with_cast.y8t_1))
          return false;
        if (!equals(this.z8t_1, tmp0_other_with_cast.z8t_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'UpcomingTrip', VOID, VOID, [Comparable()]);
    UpcomingTripClass = $;
  }
  return UpcomingTripClass;
}
function isArrivalOnly(_this__u8e3s4) {
  // Inline function 'kotlin.collections.mutableSetOf' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination = LinkedHashSet().f1();
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$1 = item.z9b();
    destination.i(tmp$ret$1);
  }
  // Inline function 'kotlin.let' call
  return destination.j1(true) && !destination.j1(false);
}
function withFormat(_this__u8e3s4, now, route, context, limit) {
  // Inline function 'kotlin.collections.mapNotNull' call
  // Inline function 'kotlin.collections.mapNotNullTo' call
  var destination = ArrayList().g1();
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var tmp$ret$0;
    $l$block: {
      var tmp0_elvis_lhs = element.u9k(now, route, context);
      var tmp;
      if (tmp0_elvis_lhs == null) {
        tmp$ret$0 = null;
        break $l$block;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      var format = tmp;
      tmp$ret$0 = new (Pair())(element, format);
    }
    var tmp0_safe_receiver = tmp$ret$0;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      destination.i(tmp0_safe_receiver);
    }
  }
  // Inline function 'kotlin.run' call
  return !(limit == null) ? take(destination, limit) : destination;
}
//region block: init
com_mbta_tid_mbta_app_model_UpcomingTrip$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  UpcomingTrip as UpcomingTrip3oaamz2dfy19j,
  isArrivalOnly as isArrivalOnly1pdrlf49c0z93,
  withFormat as withFormat312p97ewmp5ey,
  Companion_instance as Companion_instance3rl60mnp81ynu,
};
//endregion

//# sourceMappingURL=UpcomingTrip.mjs.map
