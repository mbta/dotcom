import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Companion_getInstance1tlsnvk3i2534 as Companion_getInstance } from './TripDetailsStopList.mjs';
import {
  lastOrNull1aq5oz189qoe1 as lastOrNull,
  plus310ted5e4i90h as plus,
  toSet2orjxp16sotqu as toSet,
  first58ocm7j58k3q as first,
  last1vo29oleiqj36 as last,
  distinct10qe1scfdvu5k as distinct,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { get_lastIndex1yw0x4k50k51w as get_lastIndex } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  VPos_Top_getInstancejnhiffg1g3of as VPos_Top_getInstance,
  VPos_Bottom_getInstance36lsp88bpc25p as VPos_Bottom_getInstance,
  StickConnection2cmejkbgvu4gf as StickConnection,
} from './RouteBranchSegment.mjs';
import {
  Triple1vhi3d0dgpnjb as Triple,
  to2cs3ny02qtbcb as to,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { Collection1k04j3hzsbod0 as Collection } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Dispatchers.mjs';
import { withContexte657h72vdbqn as withContext } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_RouteDetailsStopList_Segment$stable;
var com_mbta_tid_mbta_app_model_RouteDetailsStopList_Entry$stable;
var com_mbta_tid_mbta_app_model_RouteDetailsStopList_RouteParameters$stable;
var com_mbta_tid_mbta_app_model_RouteDetailsStopList$stable;
var RouteDetailsStopList$Companion$fromPieces$slambdaClass;
function RouteDetailsStopList$Companion$fromPieces$slambda() {
  if (RouteDetailsStopList$Companion$fromPieces$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($routeStops, $routeId, $directionId, $globalData, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.j9c_1 = $routeStops;
        $box.k9c_1 = $routeId;
        $box.l9c_1 = $directionId;
        $box.m9c_1 = $globalData;
        super(resultContinuation, $box);
      }
      o9c($this$withContext, $completion) {
        var tmp = this.y3e($this$withContext, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.o9c((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              if (this.j9c_1 == null || !(this.j9c_1.p9c_1 === this.k9c_1) || !(this.j9c_1.q9c_1 === this.l9c_1))
                return null;
              var tmp0 = this.j9c_1.r9c_1;
              var destination = ArrayList().g1();
              var _iterator__ex2g4s = tmp0.x();
              while (_iterator__ex2g4s.y()) {
                var element = _iterator__ex2g4s.z();
                var tmp0_0 = element.z96_1;
                var destination_0 = ArrayList().g1();
                var _iterator__ex2g4s_0 = tmp0_0.x();
                while (_iterator__ex2g4s_0.y()) {
                  var element_0 = _iterator__ex2g4s_0.z();
                  var tmp$ret$0 = Unit_instance;
                  l$ret$1: do {
                    var stopId = element_0.i96_1;
                    var tmp0_safe_receiver = this.m9c_1.a9b(element_0.i96_1);
                    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.s9c(this.m9c_1);
                    var tmp_0;
                    if (tmp1_elvis_lhs == null) {
                      tmp$ret$0 = null;
                      break l$ret$1;
                    } else {
                      tmp_0 = tmp1_elvis_lhs;
                    }
                    var stop = tmp_0;
                    var transferRoutes = Companion_getInstance().u9c(stopId, this.k9c_1, this.m9c_1);
                    tmp$ret$0 = new (Entry())(stop, element_0.j96_1, element_0.k96_1, transferRoutes);
                  }
                   while (false);
                  var tmp0_safe_receiver_0 = tmp$ret$0;
                  if (tmp0_safe_receiver_0 == null)
                    null;
                  else {
                    destination_0.i(tmp0_safe_receiver_0);
                  }
                }
                var this_0 = new (Segment())(destination_0, element.b97_1);
                var tmp_1;
                if (!this_0.v9c_1.h1()) {
                  tmp_1 = this_0;
                } else {
                  tmp_1 = null;
                }
                var tmp0_safe_receiver_1 = tmp_1;
                if (tmp0_safe_receiver_1 == null)
                  null;
                else {
                  destination.i(tmp0_safe_receiver_1);
                }
              }
              var accumulator = ArrayList().g1();
              var _iterator__ex2g4s_1 = destination.x();
              while (_iterator__ex2g4s_1.y()) {
                var element_1 = _iterator__ex2g4s_1.z();
                var acc = accumulator;
                var tmp_2;
                var tmp0_safe_receiver_2 = lastOrNull(acc);
                if ((tmp0_safe_receiver_2 == null ? null : tmp0_safe_receiver_2.w9c_1) === false) {
                  tmp_2 = !element_1.w9c_1;
                } else {
                  tmp_2 = false;
                }
                if (tmp_2) {
                  var priorSegment = acc.s3(get_lastIndex(acc));
                  acc.i(priorSegment.x9c(plus(priorSegment.v9c_1, element_1.v9c_1)));
                } else {
                  acc.i(element_1);
                }
                accumulator = acc;
              }
              var segments = accumulator;
              return new (RouteDetailsStopList())(this.l9c_1, segments);
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      y3e($this$withContext, completion) {
        var i = new (RouteDetailsStopList$Companion$fromPieces$slambda())(this.j9c_1, this.k9c_1, this.l9c_1, this.m9c_1, completion);
        i.n9c_1 = $this$withContext;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    RouteDetailsStopList$Companion$fromPieces$slambdaClass = $;
  }
  return RouteDetailsStopList$Companion$fromPieces$slambdaClass;
}
function RouteDetailsStopList$Companion$fromPieces$slambda_0($routeStops, $routeId, $directionId, $globalData, resultContinuation) {
  var i = new (RouteDetailsStopList$Companion$fromPieces$slambda())($routeStops, $routeId, $directionId, $globalData, resultContinuation);
  var l = function ($this$withContext, $completion) {
    return i.o9c($this$withContext, $completion);
  };
  l.$arity = 1;
  return l;
}
var SegmentClass;
function Segment() {
  if (SegmentClass === VOID) {
    class $ {
      constructor(stops, isTypical) {
        this.v9c_1 = stops;
        this.w9c_1 = isTypical;
      }
      y9c() {
        // Inline function 'kotlin.collections.map' call
        var this_0 = this.v9c_1;
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = item.a9d_1;
          destination.i(tmp$ret$0);
        }
        var lanesWithStops = toSet(destination);
        // Inline function 'kotlin.collections.filter' call
        var tmp0 = first(this.v9c_1).b9d_1;
        // Inline function 'kotlin.collections.filterTo' call
        var destination_0 = ArrayList().g1();
        var _iterator__ex2g4s_0 = tmp0.x();
        while (_iterator__ex2g4s_0.y()) {
          var element = _iterator__ex2g4s_0.z();
          if (element.t96_1.equals(VPos_Top_getInstance())) {
            destination_0.i(element);
          }
        }
        var connectionsBefore = destination_0;
        // Inline function 'kotlin.collections.filter' call
        var tmp0_0 = last(this.v9c_1).b9d_1;
        // Inline function 'kotlin.collections.filterTo' call
        var destination_1 = ArrayList().g1();
        var _iterator__ex2g4s_1 = tmp0_0.x();
        while (_iterator__ex2g4s_1.y()) {
          var element_0 = _iterator__ex2g4s_1.z();
          if (element_0.u96_1.equals(VPos_Bottom_getInstance())) {
            destination_1.i(element_0);
          }
        }
        var connectionsAfter = destination_1;
        // Inline function 'kotlin.collections.mapNotNull' call
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination_2 = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s_2 = connectionsBefore.x();
        while (_iterator__ex2g4s_2.y()) {
          var element_1 = _iterator__ex2g4s_2.z();
          // Inline function 'kotlin.collections.find' call
          var tmp$ret$10;
          $l$block: {
            // Inline function 'kotlin.collections.firstOrNull' call
            var _iterator__ex2g4s_3 = connectionsAfter.x();
            while (_iterator__ex2g4s_3.y()) {
              var element_2 = _iterator__ex2g4s_3.z();
              if (element_1.s96_1.equals(element_2.r96_1) && element_1.u96_1.equals(element_2.t96_1)) {
                tmp$ret$10 = element_2;
                break $l$block;
              }
            }
            tmp$ret$10 = null;
          }
          var second = tmp$ret$10;
          var tmp;
          if (!(second == null)) {
            tmp = new (Triple())(element_1, second, new (StickConnection())(element_1.p96_1, second.q96_1, element_1.r96_1, second.s96_1, element_1.t96_1, second.u96_1));
          } else {
            tmp = null;
          }
          var tmp0_safe_receiver = tmp;
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination_2.i(tmp0_safe_receiver);
          }
        }
        var connectionsTransitive = destination_2;
        // Inline function 'kotlin.collections.filter' call
        // Inline function 'kotlin.collections.filterTo' call
        var destination_3 = ArrayList().g1();
        var _iterator__ex2g4s_4 = connectionsBefore.x();
        while (_iterator__ex2g4s_4.y()) {
          var element_3 = _iterator__ex2g4s_4.z();
          var tmp$ret$19;
          $l$block_1: {
            // Inline function 'kotlin.collections.any' call
            var tmp_0;
            if (isInterface(connectionsTransitive, Collection())) {
              tmp_0 = connectionsTransitive.h1();
            } else {
              tmp_0 = false;
            }
            if (tmp_0) {
              tmp$ret$19 = false;
              break $l$block_1;
            }
            var _iterator__ex2g4s_5 = connectionsTransitive.x();
            while (_iterator__ex2g4s_5.y()) {
              var element_4 = _iterator__ex2g4s_5.z();
              if (element_4.zw_1.equals(element_3)) {
                tmp$ret$19 = true;
                break $l$block_1;
              }
            }
            tmp$ret$19 = false;
          }
          if (!tmp$ret$19) {
            destination_3.i(element_3);
          }
        }
        var tmp_1 = destination_3;
        // Inline function 'kotlin.collections.filter' call
        // Inline function 'kotlin.collections.filterTo' call
        var destination_4 = ArrayList().g1();
        var _iterator__ex2g4s_6 = connectionsAfter.x();
        while (_iterator__ex2g4s_6.y()) {
          var element_5 = _iterator__ex2g4s_6.z();
          var tmp$ret$24;
          $l$block_3: {
            // Inline function 'kotlin.collections.any' call
            var tmp_2;
            if (isInterface(connectionsTransitive, Collection())) {
              tmp_2 = connectionsTransitive.h1();
            } else {
              tmp_2 = false;
            }
            if (tmp_2) {
              tmp$ret$24 = false;
              break $l$block_3;
            }
            var _iterator__ex2g4s_7 = connectionsTransitive.x();
            while (_iterator__ex2g4s_7.y()) {
              var element_6 = _iterator__ex2g4s_7.z();
              if (element_6.ax_1.equals(element_5)) {
                tmp$ret$24 = true;
                break $l$block_3;
              }
            }
            tmp$ret$24 = false;
          }
          if (!tmp$ret$24) {
            destination_4.i(element_5);
          }
        }
        var tmp_3 = plus(tmp_1, destination_4);
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination_5 = ArrayList().w(collectionSizeOrDefault(connectionsTransitive, 10));
        var _iterator__ex2g4s_8 = connectionsTransitive.x();
        while (_iterator__ex2g4s_8.y()) {
          var item_0 = _iterator__ex2g4s_8.z();
          var tmp$ret$29 = item_0.bx_1;
          destination_5.i(tmp$ret$29);
        }
        var connections = distinct(plus(tmp_3, destination_5));
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination_6 = ArrayList().w(collectionSizeOrDefault(connections, 10));
        var _iterator__ex2g4s_9 = connections.x();
        while (_iterator__ex2g4s_9.y()) {
          var item_1 = _iterator__ex2g4s_9.z();
          var tmp$ret$32 = to(item_1, lanesWithStops.j1(item_1.r96_1) && lanesWithStops.j1(item_1.s96_1));
          destination_6.i(tmp$ret$32);
        }
        var stickConnections = destination_6;
        var tmp$ret$35;
        $l$block_5: {
          // Inline function 'kotlin.collections.any' call
          var tmp_4;
          if (isInterface(stickConnections, Collection())) {
            tmp_4 = stickConnections.h1();
          } else {
            tmp_4 = false;
          }
          if (tmp_4) {
            tmp$ret$35 = false;
            break $l$block_5;
          }
          var _iterator__ex2g4s_10 = stickConnections.x();
          while (_iterator__ex2g4s_10.y()) {
            var element_7 = _iterator__ex2g4s_10.z();
            var connection = element_7.ch();
            var twisted = element_7.dh();
            if (twisted && (!connection.t96_1.equals(VPos_Top_getInstance()) || !connection.u96_1.equals(VPos_Bottom_getInstance()))) {
              tmp$ret$35 = true;
              break $l$block_5;
            }
          }
          tmp$ret$35 = false;
        }
        var terminatedTwist = tmp$ret$35;
        return terminatedTwist ? null : stickConnections;
      }
      d9d(stops, isTypical) {
        return new (Segment())(stops, isTypical);
      }
      x9c(stops, isTypical, $super) {
        stops = stops === VOID ? this.v9c_1 : stops;
        isTypical = isTypical === VOID ? this.w9c_1 : isTypical;
        return $super === VOID ? this.d9d(stops, isTypical) : $super.d9d.call(this, stops, isTypical);
      }
      toString() {
        return 'Segment(stops=' + toString(this.v9c_1) + ', isTypical=' + this.w9c_1 + ')';
      }
      hashCode() {
        var result = hashCode(this.v9c_1);
        result = imul(result, 31) + getBooleanHashCode(this.w9c_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Segment()))
          return false;
        var tmp0_other_with_cast = other instanceof Segment() ? other : THROW_CCE();
        if (!equals(this.v9c_1, tmp0_other_with_cast.v9c_1))
          return false;
        if (!(this.w9c_1 === tmp0_other_with_cast.w9c_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Segment');
    SegmentClass = $;
  }
  return SegmentClass;
}
var EntryClass;
function Entry() {
  if (EntryClass === VOID) {
    class $ {
      constructor(stop, stopLane, stickConnections, connectingRoutes) {
        this.z9c_1 = stop;
        this.a9d_1 = stopLane;
        this.b9d_1 = stickConnections;
        this.c9d_1 = connectingRoutes;
      }
      toString() {
        return 'Entry(stop=' + this.z9c_1.toString() + ', stopLane=' + this.a9d_1.toString() + ', stickConnections=' + toString(this.b9d_1) + ', connectingRoutes=' + toString(this.c9d_1) + ')';
      }
      hashCode() {
        var result = this.z9c_1.hashCode();
        result = imul(result, 31) + this.a9d_1.hashCode() | 0;
        result = imul(result, 31) + hashCode(this.b9d_1) | 0;
        result = imul(result, 31) + hashCode(this.c9d_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Entry()))
          return false;
        var tmp0_other_with_cast = other instanceof Entry() ? other : THROW_CCE();
        if (!this.z9c_1.equals(tmp0_other_with_cast.z9c_1))
          return false;
        if (!this.a9d_1.equals(tmp0_other_with_cast.a9d_1))
          return false;
        if (!equals(this.b9d_1, tmp0_other_with_cast.b9d_1))
          return false;
        if (!equals(this.c9d_1, tmp0_other_with_cast.c9d_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Entry');
    EntryClass = $;
  }
  return EntryClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      e9d(routeId, directionId, routeStops, globalData, $completion) {
        var tmp = Dispatchers_getInstance().u28_1;
        return withContext(tmp, RouteDetailsStopList$Companion$fromPieces$slambda_0(routeStops, routeId, directionId, globalData, null), $completion);
      }
    }
    initMetadataForCompanion($, VOID, VOID, [4]);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  return Companion_instance;
}
var RouteDetailsStopListClass;
function RouteDetailsStopList() {
  if (RouteDetailsStopListClass === VOID) {
    class $ {
      constructor(directionId, segments) {
        this.f9d_1 = directionId;
        this.g9d_1 = segments;
      }
      toString() {
        return 'RouteDetailsStopList(directionId=' + this.f9d_1 + ', segments=' + toString(this.g9d_1) + ')';
      }
      hashCode() {
        var result = this.f9d_1;
        result = imul(result, 31) + hashCode(this.g9d_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteDetailsStopList()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteDetailsStopList() ? other : THROW_CCE();
        if (!(this.f9d_1 === tmp0_other_with_cast.f9d_1))
          return false;
        if (!equals(this.g9d_1, tmp0_other_with_cast.g9d_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'RouteDetailsStopList');
    RouteDetailsStopListClass = $;
  }
  return RouteDetailsStopListClass;
}
//region block: init
com_mbta_tid_mbta_app_model_RouteDetailsStopList_Segment$stable = 8;
com_mbta_tid_mbta_app_model_RouteDetailsStopList_Entry$stable = 8;
com_mbta_tid_mbta_app_model_RouteDetailsStopList_RouteParameters$stable = 8;
com_mbta_tid_mbta_app_model_RouteDetailsStopList$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instance2uzhn407fxjfi,
};
//endregion

//# sourceMappingURL=RouteDetailsStopList.mjs.map
