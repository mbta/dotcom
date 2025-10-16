import {
  singleOrNullrknfaxokm1sl as singleOrNull,
  toSet2orjxp16sotqu as toSet,
  first28gmhyvs4kf06 as first,
  firstOrNull1982767dljvdy as firstOrNull,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  StopDetailsFilterp30x6nsimkbe as StopDetailsFilter,
  TripDetailsFilter20app8tx6q526 as TripDetailsFilter,
} from './StopDetailsFilters.mjs';
import { noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  Branched1ipw2yg7vafq5 as Branched,
  Singleb6svork69pg4 as Single,
} from './LeafFormat.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { Some1vxe3j1x21foa as Some } from './UpcomingFormat.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_StopDetailsUtils_ScreenReaderContext$stable;
var com_mbta_tid_mbta_app_model_StopDetailsUtils$stable;
var StopDetailsUtilsClass;
function StopDetailsUtils() {
  if (StopDetailsUtilsClass === VOID) {
    class $ {
      h9h(routeCardData) {
        var tmp1_elvis_lhs = routeCardData == null ? null : singleOrNull(routeCardData);
        var tmp;
        if (tmp1_elvis_lhs == null) {
          return null;
        } else {
          tmp = tmp1_elvis_lhs;
        }
        var route = tmp;
        // Inline function 'kotlin.collections.flatMap' call
        var tmp0 = route.q8s_1;
        // Inline function 'kotlin.collections.flatMapTo' call
        var destination = ArrayList().g1();
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var list = element.w8s_1;
          addAll(destination, list);
        }
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination_0 = ArrayList().w(collectionSizeOrDefault(destination, 10));
        var _iterator__ex2g4s_0 = destination.x();
        while (_iterator__ex2g4s_0.y()) {
          var item = _iterator__ex2g4s_0.z();
          var tmp$ret$3 = item.b8t_1;
          destination_0.i(tmp$ret$3);
        }
        var directions = toSet(destination_0);
        if (!(directions.c1() === 1)) {
          return null;
        }
        var direction = first(directions);
        return new (StopDetailsFilter())(route.p8s_1.d8h(), direction, true);
      }
      i9h(routeCardData, stopFilter, currentTripFilter, filterAtTime, globalData) {
        var tmp;
        if (routeCardData == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.collections.find' call
          var tmp$ret$1;
          $l$block: {
            // Inline function 'kotlin.collections.firstOrNull' call
            var _iterator__ex2g4s = routeCardData.x();
            while (_iterator__ex2g4s.y()) {
              var element = _iterator__ex2g4s.z();
              var tmp_0 = element.p8s_1.d8h();
              if (tmp_0 === (stopFilter == null ? null : stopFilter.v8u_1)) {
                tmp$ret$1 = element;
                break $l$block;
              }
            }
            tmp$ret$1 = null;
          }
          tmp = tmp$ret$1;
        }
        var tmp1_elvis_lhs = tmp;
        var tmp_1;
        if (tmp1_elvis_lhs == null) {
          return null;
        } else {
          tmp_1 = tmp1_elvis_lhs;
        }
        var route = tmp_1;
        var tmp2_safe_receiver = singleOrNull(route.q8s_1);
        var tmp3_safe_receiver = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.w8s_1;
        var tmp_2;
        if (tmp3_safe_receiver == null) {
          tmp_2 = null;
        } else {
          // Inline function 'kotlin.collections.find' call
          var tmp$ret$4;
          $l$block_0: {
            // Inline function 'kotlin.collections.firstOrNull' call
            var _iterator__ex2g4s_0 = tmp3_safe_receiver.x();
            while (_iterator__ex2g4s_0.y()) {
              var element_0 = _iterator__ex2g4s_0.z();
              if (element_0.b8t_1 === (stopFilter == null ? null : stopFilter.w8u_1)) {
                tmp$ret$4 = element_0;
                break $l$block_0;
              }
            }
            tmp$ret$4 = null;
          }
          tmp_2 = tmp$ret$4;
        }
        var tmp4_elvis_lhs = tmp_2;
        var tmp_3;
        if (tmp4_elvis_lhs == null) {
          return null;
        } else {
          tmp_3 = tmp4_elvis_lhs;
        }
        var leaf = tmp_3;
        if ((currentTripFilter == null ? null : currentTripFilter.m9g_1) === true)
          return currentTripFilter;
        var leafFormat = leaf.c9b(filterAtTime, globalData);
        var tmp_4;
        if (leafFormat instanceof Single()) {
          tmp_4 = listOf(leafFormat.i92_1);
        } else {
          if (leafFormat instanceof Branched()) {
            // Inline function 'kotlin.collections.map' call
            var this_0 = leafFormat.q92_1;
            // Inline function 'kotlin.collections.mapTo' call
            var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
            var _iterator__ex2g4s_1 = this_0.x();
            while (_iterator__ex2g4s_1.y()) {
              var item = _iterator__ex2g4s_1.z();
              var tmp$ret$6 = item.e92_1;
              destination.i(tmp$ret$6);
            }
            tmp_4 = destination;
          } else {
            noWhenBranchMatchedException();
          }
        }
        var formats = tmp_4;
        // Inline function 'kotlin.collections.flatMap' call
        // Inline function 'kotlin.collections.flatMapTo' call
        var destination_0 = ArrayList().g1();
        var _iterator__ex2g4s_2 = formats.x();
        while (_iterator__ex2g4s_2.y()) {
          var element_1 = _iterator__ex2g4s_2.z();
          var tmp_5;
          if (element_1 instanceof Some()) {
            // Inline function 'kotlin.collections.map' call
            var this_1 = element_1.k92_1;
            // Inline function 'kotlin.collections.mapTo' call
            var destination_1 = ArrayList().w(collectionSizeOrDefault(this_1, 10));
            var _iterator__ex2g4s_3 = this_1.x();
            while (_iterator__ex2g4s_3.y()) {
              var item_0 = _iterator__ex2g4s_3.z();
              var tmp$ret$9 = item_0.n92_1;
              destination_1.i(tmp$ret$9);
            }
            tmp_5 = destination_1;
          } else {
            tmp_5 = emptyList();
          }
          var list = tmp_5;
          addAll(destination_0, list);
        }
        var relevantTrips = destination_0;
        // Inline function 'kotlin.collections.find' call
        var tmp$ret$16;
        $l$block_1: {
          // Inline function 'kotlin.collections.firstOrNull' call
          var _iterator__ex2g4s_4 = relevantTrips.x();
          while (_iterator__ex2g4s_4.y()) {
            var element_2 = _iterator__ex2g4s_4.z();
            if (element_2.v8t_1.o8t_1 === (currentTripFilter == null ? null : currentTripFilter.j9g_1)) {
              tmp$ret$16 = element_2;
              break $l$block_1;
            }
          }
          tmp$ret$16 = null;
        }
        var alreadySelectedTrip = tmp$ret$16;
        if (!(currentTripFilter == null) && !(alreadySelectedTrip == null)) {
          var tmp7_safe_receiver = alreadySelectedTrip.z8t_1;
          return currentTripFilter.p9g(VOID, tmp7_safe_receiver == null ? null : tmp7_safe_receiver.j9h_1);
        }
        var tmp8_elvis_lhs = firstOrNull(relevantTrips);
        var tmp_6;
        if (tmp8_elvis_lhs == null) {
          return null;
        } else {
          tmp_6 = tmp8_elvis_lhs;
        }
        var filterTrip = tmp_6;
        var cancelIndex = 1;
        while (filterTrip.t21() && relevantTrips.c1() > cancelIndex) {
          var nextTrip = relevantTrips.e1(cancelIndex);
          if (!nextTrip.t21()) {
            filterTrip = nextTrip;
          }
          cancelIndex = cancelIndex + 1 | 0;
        }
        var tmp_7 = filterTrip.v8t_1.o8t_1;
        var tmp9_safe_receiver = filterTrip.z8t_1;
        return new (TripDetailsFilter())(tmp_7, tmp9_safe_receiver == null ? null : tmp9_safe_receiver.j9h_1, filterTrip.d8u_1);
      }
    }
    initMetadataForObject($, 'StopDetailsUtils');
    StopDetailsUtilsClass = $;
  }
  return StopDetailsUtilsClass;
}
var StopDetailsUtils_instance;
function StopDetailsUtils_getInstance() {
  return StopDetailsUtils_instance;
}
//region block: init
com_mbta_tid_mbta_app_model_StopDetailsUtils_ScreenReaderContext$stable = 0;
com_mbta_tid_mbta_app_model_StopDetailsUtils$stable = 0;
StopDetailsUtils_instance = new (StopDetailsUtils())();
//endregion
//region block: exports
export {
  StopDetailsUtils_instance as StopDetailsUtils_instance25wj8p9ce6rir,
};
//endregion

//# sourceMappingURL=StopDetailsUtils.mjs.map
