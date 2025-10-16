import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { AlertAssociatedStop2hutr5hxjcd7b as AlertAssociatedStop } from './AlertAssociatedStop.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  mapCapacity1h45rc3eh9p2l as mapCapacity,
  setOf1u3mizs95ngxo as setOf,
  listOfvhqybd2zx248 as listOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { plus1ogy4liedzq5j as plus } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Sets.mjs';
import {
  emptyList1g2z5xcrvp2zy as emptyList,
  listOf1jh22dvmctj1r as listOf_0,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { startsWith26w8qjqapeeq6 as startsWith } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import {
  Typicality_Typical_getInstance1vjbpi9hmbchb as Typicality_Typical_getInstance,
  Typicality_CanonicalOnly_getInstance18yuid4mj5env as Typicality_CanonicalOnly_getInstance,
} from './RoutePattern.mjs';
import { Collection1k04j3hzsbod0 as Collection } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { RouteType_BUS_getInstance1q03qahihhdox as RouteType_BUS_getInstance } from './RouteType.mjs';
import {
  first58ocm7j58k3q as first,
  last1vo29oleiqj36 as last,
  intersect7qttw6wlmz1n as intersect,
  sorted354mfsiv4s7x5 as sorted,
  plus20p0vtfmu0596 as plus_0,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { setOf45ia9pnfhe90 as setOf_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import {
  Companion_getInstance20mcswkvz9maw as Companion_getInstance,
  MapStopRoute_BUS_getInstancex8m68nhekpzs as MapStopRoute_BUS_getInstance,
  MapStopRoute_SILVER_getInstancexhszh5yjw7w as MapStopRoute_SILVER_getInstance,
} from './MapStopRoute.mjs';
import {
  emptyMapr06gerzljqtm as emptyMap,
  toMap1vec9topfei08 as toMap,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { LocationType_STOP_getInstance3b47w50r35o9j as LocationType_STOP_getInstance } from './LocationType.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_MapStop$stable;
var com_mbta_tid_mbta_app_model_GlobalMapData$stable;
var MapStopClass;
function MapStop() {
  if (MapStopClass === VOID) {
    class $ {
      constructor(stop, routes, routeTypes, routeDirections, isTerminal, alerts) {
        this.c8v_1 = stop;
        this.d8v_1 = routes;
        this.e8v_1 = routeTypes;
        this.f8v_1 = routeDirections;
        this.g8v_1 = isTerminal;
        this.h8v_1 = alerts;
      }
      toString() {
        return 'MapStop(stop=' + this.c8v_1.toString() + ', routes=' + toString(this.d8v_1) + ', routeTypes=' + toString(this.e8v_1) + ', routeDirections=' + toString(this.f8v_1) + ', isTerminal=' + this.g8v_1 + ', alerts=' + toString_0(this.h8v_1) + ')';
      }
      hashCode() {
        var result = this.c8v_1.hashCode();
        result = imul(result, 31) + hashCode(this.d8v_1) | 0;
        result = imul(result, 31) + hashCode(this.e8v_1) | 0;
        result = imul(result, 31) + hashCode(this.f8v_1) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.g8v_1) | 0;
        result = imul(result, 31) + (this.h8v_1 == null ? 0 : hashCode(this.h8v_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof MapStop()))
          return false;
        var tmp0_other_with_cast = other instanceof MapStop() ? other : THROW_CCE();
        if (!this.c8v_1.equals(tmp0_other_with_cast.c8v_1))
          return false;
        if (!equals(this.d8v_1, tmp0_other_with_cast.d8v_1))
          return false;
        if (!equals(this.e8v_1, tmp0_other_with_cast.e8v_1))
          return false;
        if (!equals(this.f8v_1, tmp0_other_with_cast.f8v_1))
          return false;
        if (!(this.g8v_1 === tmp0_other_with_cast.g8v_1))
          return false;
        if (!equals(this.h8v_1, tmp0_other_with_cast.h8v_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'MapStop');
    MapStopClass = $;
  }
  return MapStopClass;
}
function generateAlertingStopFor($this, stop, alertsByStop, nullStopAlerts, globalData) {
  var alertingStop = AlertAssociatedStop().l90(stop, alertsByStop, nullStopAlerts, globalData);
  if (alertingStop.g90_1.h1() && alertingStop.i90_1.h1()) {
    return null;
  }
  return alertingStop;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      x91(globalData, alerts, filterAtTime) {
        var tmp1_safe_receiver = alerts == null ? null : alerts.y91_1;
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.l3();
        var tmp;
        if (tmp2_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.collections.filter' call
          // Inline function 'kotlin.collections.filterTo' call
          var destination = ArrayList().g1();
          var _iterator__ex2g4s = tmp2_safe_receiver.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (element.c90(filterAtTime)) {
              destination.i(element);
            }
          }
          tmp = destination;
        }
        var tmp3_elvis_lhs = tmp;
        var tmp_0;
        if (tmp3_elvis_lhs == null) {
          return null;
        } else {
          tmp_0 = tmp3_elvis_lhs;
        }
        var activeAlerts = tmp_0;
        // Inline function 'kotlin.collections.mutableMapOf' call
        var alertsByStop = LinkedHashMap().sc();
        // Inline function 'kotlin.collections.mutableSetOf' call
        var nullStopAlerts = LinkedHashSet().f1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s_0 = activeAlerts.x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          // Inline function 'kotlin.collections.forEach' call
          var _iterator__ex2g4s_1 = element_0.d8z_1.x();
          while (_iterator__ex2g4s_1.y()) {
            var element_1 = _iterator__ex2g4s_1.z();
            if (!(element_1.y8x_1 == null)) {
              // Inline function 'kotlin.collections.getOrPut' call
              var key = element_1.y8x_1;
              var value = alertsByStop.j3(key);
              var tmp_1;
              if (value == null) {
                // Inline function 'kotlin.collections.mutableSetOf' call
                var answer = LinkedHashSet().f1();
                alertsByStop.t3(key, answer);
                tmp_1 = answer;
              } else {
                tmp_1 = value;
              }
              var alertSet = tmp_1;
              alertSet.i(element_0);
            } else {
              nullStopAlerts.i(element_0);
            }
          }
        }
        // Inline function 'kotlin.collections.mapNotNull' call
        var tmp0 = globalData.n8u_1.l3();
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination_0 = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s_2 = tmp0.x();
        while (_iterator__ex2g4s_2.y()) {
          var element_2 = _iterator__ex2g4s_2.z();
          var tmp_2;
          if (!(element_2.g8r_1 == null)) {
            tmp_2 = null;
          } else {
            tmp_2 = generateAlertingStopFor(Companion_instance, element_2, alertsByStop, nullStopAlerts, globalData);
          }
          var tmp0_safe_receiver = tmp_2;
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination_0.i(tmp0_safe_receiver);
          }
        }
        // Inline function 'kotlin.collections.associateBy' call
        var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(destination_0, 10)), 16);
        // Inline function 'kotlin.collections.associateByTo' call
        var destination_1 = LinkedHashMap().tc(capacity);
        var _iterator__ex2g4s_3 = destination_0.x();
        while (_iterator__ex2g4s_3.y()) {
          var element_3 = _iterator__ex2g4s_3.z();
          var tmp$ret$19 = element_3.f90_1.v8q_1;
          destination_1.t3(tmp$ret$19, element_3);
        }
        var alertingStopsById = destination_1;
        return alertingStopsById;
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
var GlobalMapDataClass;
function GlobalMapData() {
  if (GlobalMapDataClass === VOID) {
    class $ {
      static z91(mapStops, alertsByStop) {
        var $this = createThis(this);
        $this.g8u_1 = mapStops;
        $this.h8u_1 = alertsByStop;
        return $this;
      }
      static a92(globalData, alerts, filterAtTime) {
        return this.b92(globalData, Companion_instance.x91(globalData, alerts, filterAtTime));
      }
      static b92(globalData, alertsByStop) {
        // Inline function 'kotlin.collections.map' call
        var this_0 = globalData.n8u_1.l3();
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var stopIdSet = plus(setOf(item.v8q_1), item.e8r_1);
          // Inline function 'kotlin.collections.flatMap' call
          // Inline function 'kotlin.collections.flatMapTo' call
          var destination_0 = ArrayList().g1();
          var _iterator__ex2g4s_0 = stopIdSet.x();
          while (_iterator__ex2g4s_0.y()) {
            var element = _iterator__ex2g4s_0.z();
            var tmp0_elvis_lhs = globalData.k8u_1.j3(element);
            var tmp;
            if (tmp0_elvis_lhs == null) {
              // Inline function 'kotlin.collections.listOf' call
              tmp = emptyList();
            } else {
              tmp = tmp0_elvis_lhs;
            }
            var list = tmp;
            addAll(destination_0, list);
          }
          // Inline function 'kotlin.collections.mapNotNull' call
          // Inline function 'kotlin.collections.mapNotNullTo' call
          var destination_1 = ArrayList().g1();
          // Inline function 'kotlin.collections.forEach' call
          var _iterator__ex2g4s_1 = destination_0.x();
          while (_iterator__ex2g4s_1.y()) {
            var element_0 = _iterator__ex2g4s_1.z();
            var tmp0_safe_receiver = globalData.m8u_1.j3(element_0);
            if (tmp0_safe_receiver == null)
              null;
            else {
              // Inline function 'kotlin.let' call
              destination_1.i(tmp0_safe_receiver);
            }
          }
          var patterns = destination_1;
          // Inline function 'kotlin.collections.filter' call
          // Inline function 'kotlin.collections.filterTo' call
          var destination_2 = ArrayList().g1();
          var _iterator__ex2g4s_2 = patterns.x();
          while (_iterator__ex2g4s_2.y()) {
            var element_1 = _iterator__ex2g4s_2.z();
            if (!startsWith(element_1.x8z_1, 'Shuttle-') && (equals(element_1.v8z_1, Typicality_Typical_getInstance()) || equals(element_1.v8z_1, Typicality_CanonicalOnly_getInstance()))) {
              destination_2.i(element_1);
            }
          }
          var typicalPatterns = destination_2;
          var tmp$ret$14;
          $l$block_3: {
            // Inline function 'kotlin.collections.any' call
            var tmp_0;
            if (isInterface(typicalPatterns, Collection())) {
              tmp_0 = typicalPatterns.h1();
            } else {
              tmp_0 = false;
            }
            if (tmp_0) {
              tmp$ret$14 = false;
              break $l$block_3;
            }
            var _iterator__ex2g4s_3 = typicalPatterns.x();
            while (_iterator__ex2g4s_3.y()) {
              var element_2 = _iterator__ex2g4s_3.z();
              var tmp$ret$15;
              $l$block_2: {
                var route = globalData.l8u_1.j3(element_2.x8z_1);
                if (route == null || route.p8r_1.equals(RouteType_BUS_getInstance())) {
                  tmp$ret$15 = false;
                  break $l$block_2;
                }
                var tmp0_elvis_lhs_0 = globalData.o8u_1.j3(element_2.w8z_1);
                var tmp_1;
                if (tmp0_elvis_lhs_0 == null) {
                  tmp$ret$15 = false;
                  break $l$block_2;
                } else {
                  tmp_1 = tmp0_elvis_lhs_0;
                }
                var trip = tmp_1;
                var tmp1_elvis_lhs = trip.u8t_1;
                var tmp_2;
                if (tmp1_elvis_lhs == null) {
                  // Inline function 'kotlin.collections.listOf' call
                  tmp_2 = emptyList();
                } else {
                  tmp_2 = tmp1_elvis_lhs;
                }
                var tripIds = tmp_2;
                if (tripIds.c1() < 2) {
                  tmp$ret$15 = false;
                  break $l$block_2;
                }
                // Inline function 'kotlin.collections.isNotEmpty' call
                tmp$ret$15 = !intersect(setOf_0([first(tripIds), last(tripIds)]), stopIdSet).h1();
              }
              if (tmp$ret$15) {
                tmp$ret$14 = true;
                break $l$block_3;
              }
            }
            tmp$ret$14 = false;
          }
          var isTerminal = tmp$ret$14;
          // Inline function 'kotlin.collections.mutableSetOf' call
          var allRoutes = LinkedHashSet().f1();
          // Inline function 'kotlin.collections.mutableMapOf' call
          var routeDirections = LinkedHashMap().sc();
          var _iterator__ex2g4s_4 = sorted(typicalPatterns).x();
          $l$loop: while (_iterator__ex2g4s_4.y()) {
            var pattern = _iterator__ex2g4s_4.z();
            // Inline function 'kotlin.collections.getOrPut' call
            var key = pattern.x8z_1;
            var value = routeDirections.j3(key);
            var tmp_3;
            if (value == null) {
              // Inline function 'kotlin.collections.mutableSetOf' call
              var answer = LinkedHashSet().f1();
              routeDirections.t3(key, answer);
              tmp_3 = answer;
            } else {
              tmp_3 = value;
            }
            tmp_3.i(pattern.s8z_1);
            var tmp0_elvis_lhs_1 = globalData.l8u_1.j3(pattern.x8z_1);
            var tmp_4;
            if (tmp0_elvis_lhs_1 == null) {
              continue $l$loop;
            } else {
              tmp_4 = tmp0_elvis_lhs_1;
            }
            var route_0 = tmp_4;
            allRoutes.i(route_0);
          }
          // Inline function 'kotlin.collections.mutableListOf' call
          var mapRouteList = ArrayList().g1();
          // Inline function 'kotlin.collections.mutableMapOf' call
          var categorizedRoutes = LinkedHashMap().sc();
          var _iterator__ex2g4s_5 = sorted(allRoutes).x();
          $l$loop_0: while (_iterator__ex2g4s_5.y()) {
            var route_1 = _iterator__ex2g4s_5.z();
            var tmp1_elvis_lhs_0 = Companion_getInstance().n90(route_1);
            var tmp_5;
            if (tmp1_elvis_lhs_0 == null) {
              continue $l$loop_0;
            } else {
              tmp_5 = tmp1_elvis_lhs_0;
            }
            var category = tmp_5;
            if (!mapRouteList.j1(category)) {
              // Inline function 'kotlin.collections.plusAssign' call
              mapRouteList.i(category);
            }
            var tmp2_elvis_lhs = categorizedRoutes.j3(category);
            var tmp_6;
            if (tmp2_elvis_lhs == null) {
              // Inline function 'kotlin.collections.listOf' call
              tmp_6 = emptyList();
            } else {
              tmp_6 = tmp2_elvis_lhs;
            }
            // Inline function 'kotlin.collections.set' call
            var value_0 = plus_0(tmp_6, route_1);
            categorizedRoutes.t3(category, value_0);
          }
          var categorizedAlerts = null;
          if (!(alertsByStop == null)) {
            var alertsHere = alertsByStop.j3(item.v8q_1);
            var tmp4_elvis_lhs = alertsHere == null ? null : alertsHere.j90_1;
            categorizedAlerts = tmp4_elvis_lhs == null ? emptyMap() : tmp4_elvis_lhs;
          }
          if (equals(mapRouteList, listOf_0([MapStopRoute_SILVER_getInstance(), MapStopRoute_BUS_getInstance()]))) {
            mapRouteList.m3(MapStopRoute_SILVER_getInstance());
          } else if (equals(mapRouteList, listOf(MapStopRoute_SILVER_getInstance())) && item.z8q_1.equals(LocationType_STOP_getInstance())) {
            mapRouteList.q3(0, MapStopRoute_BUS_getInstance());
          }
          var tmp$ret$28 = to(item.v8q_1, new (MapStop())(item, categorizedRoutes, mapRouteList, routeDirections, isTerminal, categorizedAlerts));
          destination.i(tmp$ret$28);
        }
        return this.z91(toMap(destination), alertsByStop);
      }
      toString() {
        return '[GlobalMapData]';
      }
      hashCode() {
        var result = hashCode(this.g8u_1);
        result = imul(result, 31) + (this.h8u_1 == null ? 0 : hashCode(this.h8u_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof GlobalMapData()))
          return false;
        var tmp0_other_with_cast = other instanceof GlobalMapData() ? other : THROW_CCE();
        if (!equals(this.g8u_1, tmp0_other_with_cast.g8u_1))
          return false;
        if (!equals(this.h8u_1, tmp0_other_with_cast.h8u_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'GlobalMapData');
    GlobalMapDataClass = $;
  }
  return GlobalMapDataClass;
}
//region block: init
com_mbta_tid_mbta_app_model_MapStop$stable = 8;
com_mbta_tid_mbta_app_model_GlobalMapData$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  GlobalMapData as GlobalMapDataev36xa1ksrjm,
};
//endregion

//# sourceMappingURL=GlobalMapData.mjs.map
