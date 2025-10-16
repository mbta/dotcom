import { setOf45ia9pnfhe90 as setOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import {
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KtMap140uvy3s5zad8 as KtMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { Typicality_Typical_getInstance1vjbpi9hmbchb as Typicality_Typical_getInstance } from './RoutePattern.mjs';
import { Paire9pteg33gng7 as Pair } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import {
  listOf1jh22dvmctj1r as listOf,
  emptyList1g2z5xcrvp2zy as emptyList,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { mapOf1xd03cq9cnmy8 as mapOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import {
  indexOfa2zokh3tu4p6 as indexOf,
  getOrNull1go7ef9ldk0df as getOrNull,
  first28gmhyvs4kf06 as first,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_Direction$stable;
function govCenterSpecialCase($this, directionsByDestination) {
  var govCenterDestinations = setOf(['Government Center', $this.o90_1]);
  if (equals(directionsByDestination.k3(), govCenterDestinations)) {
    return directionsByDestination.j3($this.o90_1);
  }
  return null;
}
function getStopListForPattern($this, pattern, global) {
  var tmp0 = global.o8u_1;
  // Inline function 'kotlin.collections.get' call
  var key = pattern == null ? null : pattern.w8z_1;
  var tmp1_safe_receiver = (isInterface(tmp0, KtMap()) ? tmp0 : THROW_CCE()).j3(key);
  var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.u8t_1;
  var tmp;
  if (tmp2_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList().w(collectionSizeOrDefault(tmp2_safe_receiver, 10));
    var _iterator__ex2g4s = tmp2_safe_receiver.x();
    while (_iterator__ex2g4s.y()) {
      var item = _iterator__ex2g4s.z();
      var tmp0_safe_receiver = global.n8u_1.j3(item);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.g8r_1;
      var tmp$ret$1 = tmp1_elvis_lhs == null ? item : tmp1_elvis_lhs;
      destination.i(tmp$ret$1);
    }
    tmp = destination;
  }
  return tmp;
}
function getTypicalStopListByDirection($this, patterns, global) {
  // Inline function 'kotlin.collections.groupBy' call
  // Inline function 'kotlin.collections.groupByTo' call
  var destination = LinkedHashMap().sc();
  var _iterator__ex2g4s = patterns.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var key = element.s8z_1;
    // Inline function 'kotlin.collections.getOrPut' call
    var value = destination.j3(key);
    var tmp;
    if (value == null) {
      var answer = ArrayList().g1();
      destination.t3(key, answer);
      tmp = answer;
    } else {
      tmp = value;
    }
    var list = tmp;
    list.i(element);
  }
  // Inline function 'kotlin.collections.mapValues' call
  // Inline function 'kotlin.collections.mapValuesTo' call
  var destination_0 = LinkedHashMap().tc(mapCapacity(destination.c1()));
  // Inline function 'kotlin.collections.associateByTo' call
  var _iterator__ex2g4s_0 = destination.t1().x();
  while (_iterator__ex2g4s_0.y()) {
    var element_0 = _iterator__ex2g4s_0.z();
    var tmp_0 = element_0.u1();
    var tmp_1 = Companion_getInstance();
    var tmp0 = element_0.v1();
    var tmp$ret$7;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s_1 = tmp0.x();
      while (_iterator__ex2g4s_1.y()) {
        var element_1 = _iterator__ex2g4s_1.z();
        if (equals(element_1.v8z_1, Typicality_Typical_getInstance())) {
          tmp$ret$7 = element_1;
          break $l$block;
        }
      }
      tmp$ret$7 = null;
    }
    var tmp$ret$8 = getStopListForPattern(tmp_1, tmp$ret$7, global);
    destination_0.t3(tmp_0, tmp$ret$8);
  }
  return destination_0;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.o90_1 = 'North Station & North';
        this.p90_1 = mapOf([new (Pair())('Green', listOf([listOf([new (Pair())('place-armnl', 'Copley & West'), new (Pair())('place-hymnl', 'Kenmore & West'), new (Pair())('place-prmnl', null), new (Pair())('place-kencl', null)]), listOf([new (Pair())('place-boyls', 'Park St & North'), new (Pair())('place-pktrm', 'Gov Ctr & North'), new (Pair())('place-haecl', this.o90_1), new (Pair())('place-spmnl', 'Lechmere & North'), new (Pair())('place-lech', null)])])), new (Pair())('Red', listOf([listOf([new (Pair())('place-jfk', null), new (Pair())('place-asmnl', 'Ashmont'), new (Pair())('place-brntn', 'Braintree')]), null]))]);
        this.q90_1 = mapOf([new (Pair())('Green-B', 'Green'), new (Pair())('Green-C', 'Green'), new (Pair())('Green-D', 'Green'), new (Pair())('Green-E', 'Green')]);
      }
      r90(directionId, routeId, stopId, routeStopIds) {
        var tmp0_elvis_lhs = this.q90_1.j3(routeId);
        var tmp1_elvis_lhs = this.p90_1.j3(tmp0_elvis_lhs == null ? routeId : tmp0_elvis_lhs);
        var tmp;
        if (tmp1_elvis_lhs == null) {
          return null;
        } else {
          tmp = tmp1_elvis_lhs;
        }
        var routeCases = tmp;
        var tmp2_elvis_lhs = routeCases.e1(directionId);
        var tmp_0;
        if (tmp2_elvis_lhs == null) {
          return null;
        } else {
          tmp_0 = tmp2_elvis_lhs;
        }
        var directionCases = tmp_0;
        var tmp_1;
        if (routeStopIds == null) {
          return null;
        } else {
          tmp_1 = routeStopIds;
        }
        var stops = tmp_1;
        var stopIndex = indexOf(stops, stopId);
        if (stopIndex === -1) {
          return null;
        }
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.collections.firstOrNull' call
          var _iterator__ex2g4s = directionCases.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            var caseStopId = element.ch();
            if (stopIndex <= stops.l1(caseStopId)) {
              tmp$ret$1 = element;
              break $l$block;
            }
          }
          tmp$ret$1 = null;
        }
        var tmp4_safe_receiver = tmp$ret$1;
        return tmp4_safe_receiver == null ? null : tmp4_safe_receiver.bh_1;
      }
      s90(global, stop, route, patterns) {
        var tmp0_elvis_lhs = this.q90_1.j3(route.o8r_1);
        if (!this.p90_1.h3(tmp0_elvis_lhs == null ? route.o8r_1 : tmp0_elvis_lhs)) {
          // Inline function 'kotlin.collections.map' call
          var this_0 = listOf([0, 1]);
          // Inline function 'kotlin.collections.mapTo' call
          var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
          var _iterator__ex2g4s = this_0.x();
          while (_iterator__ex2g4s.y()) {
            var item = _iterator__ex2g4s.z();
            var tmp$ret$0 = Direction().w90(item, route);
            destination.i(tmp$ret$0);
          }
          return destination;
        }
        var stopListByDirection = getTypicalStopListByDirection(this, patterns, global);
        // Inline function 'kotlin.collections.map' call
        var this_1 = listOf([0, 1]);
        // Inline function 'kotlin.collections.mapTo' call
        var destination_0 = ArrayList().w(collectionSizeOrDefault(this_1, 10));
        var _iterator__ex2g4s_0 = this_1.x();
        while (_iterator__ex2g4s_0.y()) {
          var item_0 = _iterator__ex2g4s_0.z();
          var tmp$ret$3 = Direction().w90(item_0, route, stop, stopListByDirection.j3(item_0));
          destination_0.i(tmp$ret$3);
        }
        return destination_0;
      }
      x90(global, stop, patterns) {
        if (patterns.h1()) {
          // Inline function 'kotlin.collections.map' call
          var this_0 = listOf([0, 1]);
          // Inline function 'kotlin.collections.mapTo' call
          var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
          var _iterator__ex2g4s = this_0.x();
          while (_iterator__ex2g4s.y()) {
            var item = _iterator__ex2g4s.z();
            var tmp$ret$0 = Direction().y90('', '', item);
            destination.i(tmp$ret$0);
          }
          return destination;
        }
        // Inline function 'kotlin.collections.groupBy' call
        // Inline function 'kotlin.collections.groupByTo' call
        var destination_0 = LinkedHashMap().sc();
        var _iterator__ex2g4s_0 = patterns.x();
        while (_iterator__ex2g4s_0.y()) {
          var element = _iterator__ex2g4s_0.z();
          var key = element.x8z_1;
          // Inline function 'kotlin.collections.getOrPut' call
          var value = destination_0.j3(key);
          var tmp;
          if (value == null) {
            var answer = ArrayList().g1();
            destination_0.t3(key, answer);
            tmp = answer;
          } else {
            tmp = value;
          }
          var list = tmp;
          list.i(element);
        }
        // Inline function 'kotlin.collections.mapValues' call
        // Inline function 'kotlin.collections.mapValuesTo' call
        var destination_1 = LinkedHashMap().tc(mapCapacity(destination_0.c1()));
        // Inline function 'kotlin.collections.associateByTo' call
        var _iterator__ex2g4s_1 = destination_0.t1().x();
        while (_iterator__ex2g4s_1.y()) {
          var element_0 = _iterator__ex2g4s_1.z();
          var tmp_0 = element_0.u1();
          var tmp0_elvis_lhs = global.l8u_1.j3(element_0.u1());
          var tmp_1;
          if (tmp0_elvis_lhs == null) {
            return emptyList();
          } else {
            tmp_1 = tmp0_elvis_lhs;
          }
          var route = tmp_1;
          var tmp$ret$9 = Companion_getInstance().s90(global, stop, route, element_0.v1());
          destination_1.t3(tmp_0, tmp$ret$9);
        }
        var directionsByRoute = destination_1;
        // Inline function 'kotlin.collections.map' call
        var this_1 = listOf([0, 1]);
        // Inline function 'kotlin.collections.mapTo' call
        var destination_2 = ArrayList().w(collectionSizeOrDefault(this_1, 10));
        var _iterator__ex2g4s_2 = this_1.x();
        while (_iterator__ex2g4s_2.y()) {
          var item_0 = _iterator__ex2g4s_2.z();
          var tmp$ret$25;
          $l$block: {
            // Inline function 'kotlin.collections.mapNotNull' call
            // Inline function 'kotlin.collections.mapNotNullTo' call
            var destination_3 = ArrayList().g1();
            // Inline function 'kotlin.collections.forEach' call
            // Inline function 'kotlin.collections.iterator' call
            var _iterator__ex2g4s_3 = directionsByRoute.t1().x();
            while (_iterator__ex2g4s_3.y()) {
              var element_1 = _iterator__ex2g4s_3.z();
              var tmp0_safe_receiver = getOrNull(element_1.v1(), item_0);
              if (tmp0_safe_receiver == null)
                null;
              else {
                // Inline function 'kotlin.let' call
                destination_3.i(tmp0_safe_receiver);
              }
            }
            // Inline function 'kotlin.collections.associateBy' call
            var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(destination_3, 10)), 16);
            // Inline function 'kotlin.collections.associateByTo' call
            var destination_4 = LinkedHashMap().tc(capacity);
            var _iterator__ex2g4s_4 = destination_3.x();
            while (_iterator__ex2g4s_4.y()) {
              var element_2 = _iterator__ex2g4s_4.z();
              var tmp$ret$21 = element_2.u90_1;
              destination_4.t3(tmp$ret$21, element_2);
            }
            var directionsByDestination = destination_4;
            var tmp_2;
            if (directionsByDestination.c1() === 1) {
              tmp_2 = first(directionsByDestination.l3());
            } else {
              // Inline function 'kotlin.collections.isNotEmpty' call
              if (!directionsByDestination.h1()) {
                var specialCase = govCenterSpecialCase(Companion_getInstance(), directionsByDestination);
                if (!(specialCase == null)) {
                  tmp$ret$25 = specialCase;
                  break $l$block;
                }
                var representativeDirection = first(directionsByDestination.l3());
                tmp_2 = Direction().y90(representativeDirection.t90_1, null, item_0);
              } else {
                tmp_2 = Direction().y90('', '', item_0);
              }
            }
            tmp$ret$25 = tmp_2;
          }
          destination_2.i(tmp$ret$25);
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
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var DirectionClass;
function Direction() {
  if (DirectionClass === VOID) {
    class $ {
      static y90(name, destination, id) {
        Companion_getInstance();
        var $this = createThis(this);
        $this.t90_1 = name;
        $this.u90_1 = destination;
        $this.v90_1 = id;
        return $this;
      }
      static w90(directionId, route, stop, routeStopIds, patternDestination) {
        Companion_getInstance();
        stop = stop === VOID ? null : stop;
        routeStopIds = routeStopIds === VOID ? null : routeStopIds;
        patternDestination = patternDestination === VOID ? null : patternDestination;
        var tmp0_elvis_lhs = route.r8r_1.e1(directionId);
        var tmp = tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs;
        var tmp_0 = Companion_getInstance();
        var tmp2_elvis_lhs = tmp_0.r90(directionId, route.o8r_1, stop == null ? null : stop.v8q_1, routeStopIds);
        var tmp3_elvis_lhs = tmp2_elvis_lhs == null ? patternDestination : tmp2_elvis_lhs;
        return this.y90(tmp, tmp3_elvis_lhs == null ? route.s8r_1.e1(directionId) : tmp3_elvis_lhs, directionId);
      }
      toString() {
        return 'Direction(name=' + this.t90_1 + ', destination=' + this.u90_1 + ', id=' + this.v90_1 + ')';
      }
      hashCode() {
        var result = this.t90_1 == null ? 0 : getStringHashCode(this.t90_1);
        result = imul(result, 31) + (this.u90_1 == null ? 0 : getStringHashCode(this.u90_1)) | 0;
        result = imul(result, 31) + this.v90_1 | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Direction()))
          return false;
        var tmp0_other_with_cast = other instanceof Direction() ? other : THROW_CCE();
        if (!(this.t90_1 == tmp0_other_with_cast.t90_1))
          return false;
        if (!(this.u90_1 == tmp0_other_with_cast.u90_1))
          return false;
        if (!(this.v90_1 === tmp0_other_with_cast.v90_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Direction');
    DirectionClass = $;
  }
  return DirectionClass;
}
//region block: init
com_mbta_tid_mbta_app_model_Direction$stable = 8;
//endregion
//region block: exports
export {
  Companion_getInstance as Companion_getInstance2e2qcwwp7c5i2,
};
//endregion

//# sourceMappingURL=Direction.mjs.map
