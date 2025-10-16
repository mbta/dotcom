import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { FeatureCollection377neeb1a2i00 as FeatureCollection } from './style/FeatureCollection.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { plus310ted5e4i90h as plus } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { nearestPointOnLine3rajp5no0390g as nearestPointOnLine } from '../../../../../../spatial-k-turf/io/github/dellisd/spatialk/turf/Miscellaneous.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { Point298ix16jijg5m as Point } from '../../../../../../spatial-k-geojson/io/github/dellisd/spatialk/geojson/Point.mjs';
import { Feature1c2ymjiu5ok1c as Feature } from './style/Feature.mjs';
import { FeaturePropertiesBuildersu8whofa628t as FeaturePropertiesBuilder } from './style/FeatureProperties.mjs';
import { Paire9pteg33gng7 as Pair } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import {
  toMap1vec9topfei08 as toMap,
  emptyMapr06gerzljqtm as emptyMap,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { get_entries2xkklea9ps4e2 as get_entries } from '../model/MapStopRoute.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { FeatureProperty3gcsh4e95qpxl as FeatureProperty } from './style/FeatureProperty.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Dispatchers.mjs';
import { withContexte657h72vdbqn as withContext } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_map_StopFeatureData$stable;
var com_mbta_tid_mbta_app_map_StopFeaturesBuilder$stable;
var StopFeatureDataClass;
function StopFeatureData() {
  if (StopFeatureDataClass === VOID) {
    class $ {
      constructor(stop, feature) {
        this.a8v_1 = stop;
        this.b8v_1 = feature;
      }
      toString() {
        return 'StopFeatureData(stop=' + this.a8v_1.toString() + ', feature=' + this.b8v_1.toString() + ')';
      }
      hashCode() {
        var result = this.a8v_1.hashCode();
        result = imul(result, 31) + this.b8v_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopFeatureData()))
          return false;
        var tmp0_other_with_cast = other instanceof StopFeatureData() ? other : THROW_CCE();
        if (!this.a8v_1.equals(tmp0_other_with_cast.a8v_1))
          return false;
        if (!this.b8v_1.equals(tmp0_other_with_cast.b8v_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'StopFeatureData');
    StopFeatureDataClass = $;
  }
  return StopFeatureDataClass;
}
function buildCollection($this, stopFeatures) {
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(stopFeatures, 10));
  var _iterator__ex2g4s = stopFeatures.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = item.b8v_1;
    destination.i(tmp$ret$0);
  }
  return new (FeatureCollection())(destination);
}
function generateStopFeatures($this, stops, routeSourceDetails) {
  // Inline function 'kotlin.collections.mutableSetOf' call
  var touchedStopIds = LinkedHashSet().f1();
  var routeStops = generateRouteAssociatedStops($this, stops, routeSourceDetails, touchedStopIds);
  var otherStops = generateRemainingStops($this, stops, touchedStopIds);
  return plus(otherStops, routeStops);
}
function generateRouteAssociatedStops($this, stops, routeSourceDetails, touchedStopIds) {
  // Inline function 'kotlin.collections.flatMap' call
  // Inline function 'kotlin.collections.flatMapTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = routeSourceDetails.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    // Inline function 'kotlin.collections.flatMap' call
    var tmp0 = element.v8p_1;
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination_0 = ArrayList().g1();
    var _iterator__ex2g4s_0 = tmp0.x();
    while (_iterator__ex2g4s_0.y()) {
      var element_0 = _iterator__ex2g4s_0.z();
      // Inline function 'kotlin.collections.mapNotNull' call
      var tmp0_0 = element_0.s8p_1;
      // Inline function 'kotlin.collections.mapNotNullTo' call
      var destination_1 = ArrayList().g1();
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s_1 = tmp0_0.x();
      while (_iterator__ex2g4s_1.y()) {
        var element_1 = _iterator__ex2g4s_1.z();
        var tmp$ret$0;
        $l$block_0: {
          var tmp0_elvis_lhs = stops.j3(element_1);
          var tmp;
          if (tmp0_elvis_lhs == null) {
            tmp$ret$0 = null;
            break $l$block_0;
          } else {
            tmp = tmp0_elvis_lhs;
          }
          var stopOnRoute = tmp;
          var tmp1_elvis_lhs = stopOnRoute.c8v_1.g8r_1;
          var tmp2_elvis_lhs = stops.j3(tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs);
          var mapStop = tmp2_elvis_lhs == null ? stopOnRoute : tmp2_elvis_lhs;
          var stop = mapStop.c8v_1;
          if (touchedStopIds.j1(stop.v8q_1) || mapStop.e8v_1.h1()) {
            tmp$ret$0 = null;
            break $l$block_0;
          }
          var snappedCoord = nearestPointOnLine(element_0.r8p_1, stop.i8r_1).l1z_1;
          touchedStopIds.i(stop.v8q_1);
          tmp$ret$0 = new (StopFeatureData())(mapStop, generateStopFeature(StopFeaturesBuilder_getInstance(), mapStop, snappedCoord));
        }
        var tmp0_safe_receiver = tmp$ret$0;
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          destination_1.i(tmp0_safe_receiver);
        }
      }
      var list = destination_1;
      addAll(destination_0, list);
    }
    var list_0 = destination_0;
    addAll(destination, list_0);
  }
  return destination;
}
function generateRemainingStops($this, stops, touchedStopIds) {
  // Inline function 'kotlin.collections.mapNotNull' call
  var tmp0 = stops.l3();
  // Inline function 'kotlin.collections.mapNotNullTo' call
  var destination = ArrayList().g1();
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = tmp0.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var tmp$ret$0;
    $l$block: {
      var stop = element.c8v_1;
      if (touchedStopIds.j1(stop.v8q_1) || element.e8v_1.h1() || !(stop.g8r_1 == null)) {
        tmp$ret$0 = null;
        break $l$block;
      }
      touchedStopIds.i(stop.v8q_1);
      tmp$ret$0 = new (StopFeatureData())(element, generateStopFeature$default(StopFeaturesBuilder_getInstance(), element));
    }
    var tmp0_safe_receiver = tmp$ret$0;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      destination.i(tmp0_safe_receiver);
    }
  }
  return destination;
}
function generateStopFeature($this, mapStop, overrideLocation) {
  var stop = mapStop.c8v_1;
  return new (Feature())(stop.v8q_1, Point().v1y(overrideLocation == null ? stop.i8r_1 : overrideLocation), generateStopFeatureProperties($this, mapStop));
}
function generateStopFeature$default($this, mapStop, overrideLocation, $super) {
  overrideLocation = overrideLocation === VOID ? null : overrideLocation;
  return generateStopFeature($this, mapStop, overrideLocation);
}
function generateStopFeatureProperties($this, mapStop) {
  // Inline function 'com.mbta.tid.mbta_app.map.style.buildFeatureProperties' call
  var builder = new (FeaturePropertiesBuilder())();
  var stop = mapStop.c8v_1;
  builder.a8q(StopFeaturesBuilder_getInstance().j8v_1, stop.v8q_1);
  builder.a8q(StopFeaturesBuilder_getInstance().m8v_1, stop.y8q_1);
  builder.r8v(StopFeaturesBuilder_getInstance().k8v_1, mapStop.g8v_1);
  var tmp = StopFeaturesBuilder_getInstance().l8v_1;
  // Inline function 'kotlin.collections.map' call
  var this_0 = mapStop.e8v_1;
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = item.w3_1;
    destination.i(tmp$ret$0);
  }
  builder.s8v(tmp, destination);
  var tmp_0 = StopFeaturesBuilder_getInstance().n8v_1;
  // Inline function 'kotlin.collections.map' call
  var this_1 = mapStop.d8v_1;
  // Inline function 'kotlin.collections.mapTo' call
  var destination_0 = ArrayList().w(this_1.c1());
  // Inline function 'kotlin.collections.iterator' call
  var _iterator__ex2g4s_0 = this_1.t1().x();
  while (_iterator__ex2g4s_0.y()) {
    var item_0 = _iterator__ex2g4s_0.z();
    // Inline function 'kotlin.collections.component1' call
    var routeType = item_0.u1();
    // Inline function 'kotlin.collections.component2' call
    var routes = item_0.v1();
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_1 = ArrayList().w(collectionSizeOrDefault(routes, 10));
    var _iterator__ex2g4s_1 = routes.x();
    while (_iterator__ex2g4s_1.y()) {
      var item_1 = _iterator__ex2g4s_1.z();
      var tmp$ret$6 = item_1.o8r_1;
      destination_1.i(tmp$ret$6);
    }
    var tmp$ret$9 = new (Pair())(routeType.w3_1, destination_1);
    destination_0.i(tmp$ret$9);
  }
  builder.t8v(tmp_0, toMap(destination_0));
  var tmp_1 = StopFeaturesBuilder_getInstance().o8v_1;
  // Inline function 'kotlin.collections.orEmpty' call
  var tmp0_elvis_lhs = mapStop.h8v_1;
  // Inline function 'kotlin.collections.map' call
  var this_2 = tmp0_elvis_lhs == null ? emptyMap() : tmp0_elvis_lhs;
  // Inline function 'kotlin.collections.mapTo' call
  var destination_2 = ArrayList().w(this_2.c1());
  // Inline function 'kotlin.collections.iterator' call
  var _iterator__ex2g4s_2 = this_2.t1().x();
  while (_iterator__ex2g4s_2.y()) {
    var item_2 = _iterator__ex2g4s_2.z();
    // Inline function 'kotlin.collections.component1' call
    var routeType_0 = item_2.u1();
    // Inline function 'kotlin.collections.component2' call
    var alertState = item_2.v1();
    var tmp$ret$16 = new (Pair())(routeType_0.w3_1, alertState.w3_1);
    destination_2.i(tmp$ret$16);
  }
  builder.u8v(tmp_1, toMap(destination_2));
  var tmp_2 = StopFeaturesBuilder_getInstance().q8v_1;
  // Inline function 'kotlin.collections.flatMap' call
  var tmp0 = mapStop.f8v_1;
  // Inline function 'kotlin.collections.flatMapTo' call
  var destination_3 = ArrayList().g1();
  // Inline function 'kotlin.collections.iterator' call
  var _iterator__ex2g4s_3 = tmp0.t1().x();
  while (_iterator__ex2g4s_3.y()) {
    var element = _iterator__ex2g4s_3.z();
    // Inline function 'kotlin.collections.component1' call
    var routeId = element.u1();
    // Inline function 'kotlin.collections.component2' call
    var directions = element.v1();
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_4 = ArrayList().w(collectionSizeOrDefault(directions, 10));
    var _iterator__ex2g4s_4 = directions.x();
    while (_iterator__ex2g4s_4.y()) {
      var item_3 = _iterator__ex2g4s_4.z();
      var tmp$ret$22 = routeId + '/' + item_3;
      destination_4.i(tmp$ret$22);
    }
    var list = destination_4;
    addAll(destination_3, list);
  }
  builder.s8v(tmp_2, destination_3);
  var topRouteOrdinal = mapStop.e8v_1.h1() ? get_entries().c1() : mapStop.e8v_1.e1(0).x3_1;
  var tmp_3 = StopFeaturesBuilder_getInstance().p8v_1;
  var tmp_4;
  // Inline function 'kotlin.collections.count' call
  if (mapStop.e8v_1.c1() > 1) {
    tmp_4 = 1;
  } else {
    tmp_4 = -topRouteOrdinal | 0;
  }
  builder.v8v(tmp_3, tmp_4);
  return builder.b8q();
}
var StopFeaturesBuilder$buildCollection$slambdaClass;
function StopFeaturesBuilder$buildCollection$slambda() {
  if (StopFeaturesBuilder$buildCollection$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($stops, $routeSourceDetails, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.e8w_1 = $stops;
        $box.f8w_1 = $routeSourceDetails;
        super(resultContinuation, $box);
      }
      h8w($this$withContext, $completion) {
        var tmp = this.y3e($this$withContext, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.h8w((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              var stopFeatures = generateStopFeatures(StopFeaturesBuilder_getInstance(), this.e8w_1, this.f8w_1);
              return buildCollection(StopFeaturesBuilder_getInstance(), stopFeatures);
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
        var i = new (StopFeaturesBuilder$buildCollection$slambda())(this.e8w_1, this.f8w_1, completion);
        i.g8w_1 = $this$withContext;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    StopFeaturesBuilder$buildCollection$slambdaClass = $;
  }
  return StopFeaturesBuilder$buildCollection$slambdaClass;
}
function StopFeaturesBuilder$buildCollection$slambda_0($stops, $routeSourceDetails, resultContinuation) {
  var i = new (StopFeaturesBuilder$buildCollection$slambda())($stops, $routeSourceDetails, resultContinuation);
  var l = function ($this$withContext, $completion) {
    return i.h8w($this$withContext, $completion);
  };
  l.$arity = 1;
  return l;
}
var StopFeaturesBuilderClass;
function StopFeaturesBuilder() {
  if (StopFeaturesBuilderClass === VOID) {
    class $ {
      constructor() {
        StopFeaturesBuilder_instance = this;
        this.i8v_1 = 'stop-source';
        this.j8v_1 = new (FeatureProperty())('id');
        this.k8v_1 = new (FeatureProperty())('isTerminal');
        this.l8v_1 = new (FeatureProperty())('mapRoutes');
        this.m8v_1 = new (FeatureProperty())('name');
        this.n8v_1 = new (FeatureProperty())('routeIds');
        this.o8v_1 = new (FeatureProperty())('serviceStatus');
        this.p8v_1 = new (FeatureProperty())('sortOrder');
        this.q8v_1 = new (FeatureProperty())('allRouteDirections');
      }
      i8w(globalMapData, routeSourceDetails, coroutineDispatcher, $completion) {
        // Inline function 'kotlin.collections.orEmpty' call
        var tmp0_elvis_lhs = globalMapData == null ? null : globalMapData.g8u_1;
        var tmp$ret$0 = tmp0_elvis_lhs == null ? emptyMap() : tmp0_elvis_lhs;
        return this.j8w(tmp$ret$0, routeSourceDetails, coroutineDispatcher, $completion);
      }
      k8w(globalMapData, routeSourceDetails, coroutineDispatcher, $completion, $super) {
        coroutineDispatcher = coroutineDispatcher === VOID ? Dispatchers_getInstance().u28_1 : coroutineDispatcher;
        return $super === VOID ? this.i8w(globalMapData, routeSourceDetails, coroutineDispatcher, $completion) : $super.i8w.call(this, globalMapData, routeSourceDetails, coroutineDispatcher, $completion);
      }
      j8w(stops, routeSourceDetails, coroutineDispatcher, $completion) {
        return withContext(coroutineDispatcher, StopFeaturesBuilder$buildCollection$slambda_0(stops, routeSourceDetails, null), $completion);
      }
    }
    initMetadataForObject($, 'StopFeaturesBuilder', VOID, VOID, VOID, [3]);
    StopFeaturesBuilderClass = $;
  }
  return StopFeaturesBuilderClass;
}
var StopFeaturesBuilder_instance;
function StopFeaturesBuilder_getInstance() {
  if (StopFeaturesBuilder_instance === VOID)
    new (StopFeaturesBuilder())();
  return StopFeaturesBuilder_instance;
}
//region block: init
com_mbta_tid_mbta_app_map_StopFeatureData$stable = 8;
com_mbta_tid_mbta_app_map_StopFeaturesBuilder$stable = 0;
//endregion
//region block: exports
export {
  StopFeaturesBuilder_getInstance as StopFeaturesBuilder_getInstance120lghlo8jmwi,
};
//endregion

//# sourceMappingURL=StopFeaturesBuilder.mjs.map
