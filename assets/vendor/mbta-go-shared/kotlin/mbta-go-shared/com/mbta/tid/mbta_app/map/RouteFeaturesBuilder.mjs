import {
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { FeaturePropertiesBuildersu8whofa628t as FeaturePropertiesBuilder } from './style/FeatureProperties.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Feature1c2ymjiu5ok1c as Feature } from './style/Feature.mjs';
import { FeatureCollection377neeb1a2i00 as FeatureCollection } from './style/FeatureCollection.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { Polyline_instance2zt93g8h2nyz6 as Polyline_instance } from './Polyline.mjs';
import { LineStringssyj4jv3rpxh as LineString } from '../../../../../../spatial-k-geojson/io/github/dellisd/spatialk/geojson/LineString.mjs';
import { emptyMapr06gerzljqtm as emptyMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import {
  firstOrNull1982767dljvdy as firstOrNull,
  lastOrNull1aq5oz189qoe1 as lastOrNull,
  toSet2orjxp16sotqu as toSet,
  asSequence2phdjljfh9jhx as asSequence,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { lineSlice2l7yxvqv4c4cj as lineSlice } from '../../../../../../spatial-k-turf/io/github/dellisd/spatialk/turf/Miscellaneous.mjs';
import {
  RouteType_HEAVY_RAIL_getInstance1zhtyakatbhop as RouteType_HEAVY_RAIL_getInstance,
  RouteType_LIGHT_RAIL_getInstance1acz6wfw7kzbn as RouteType_LIGHT_RAIL_getInstance,
  RouteType_COMMUTER_RAIL_getInstancerf8k2n6webhv as RouteType_COMMUTER_RAIL_getInstance,
} from '../model/RouteType.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { FeatureProperty3gcsh4e95qpxl as FeatureProperty } from './style/FeatureProperty.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Dispatchers.mjs';
import { withContexte657h72vdbqn as withContext } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import {
  setOf1u3mizs95ngxo as setOf,
  listOfvhqybd2zx248 as listOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { get_greenRoutes14cffg8xal11q as get_greenRoutes } from '../model/MapStopRoute.mjs';
import {
  flatMap1gb3cjy1dqv3d as flatMap,
  mapsbvh18eqox7a as map,
  toSet2morh2kqexfa2 as toSet_0,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/sequences/_Sequences.mjs';
import { RouteWithSegmentedShapes3k6p6watr7yao as RouteWithSegmentedShapes } from '../model/response/MapFriendlyRouteResponse.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_map_RouteLineData$stable;
var com_mbta_tid_mbta_app_map_RouteSourceData$stable;
var com_mbta_tid_mbta_app_map_RouteFeaturesBuilder$stable;
var RouteLineDataClass;
function RouteLineData() {
  if (RouteLineDataClass === VOID) {
    class $ {
      constructor(id, sourceRoutePatternId, line, stopIds, alertState) {
        this.p8p_1 = id;
        this.q8p_1 = sourceRoutePatternId;
        this.r8p_1 = line;
        this.s8p_1 = stopIds;
        this.t8p_1 = alertState;
      }
      toString() {
        return 'RouteLineData(id=' + this.p8p_1 + ', sourceRoutePatternId=' + this.q8p_1 + ', line=' + this.r8p_1.toString() + ', stopIds=' + toString(this.s8p_1) + ', alertState=' + this.t8p_1.toString() + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.p8p_1);
        result = imul(result, 31) + getStringHashCode(this.q8p_1) | 0;
        result = imul(result, 31) + this.r8p_1.hashCode() | 0;
        result = imul(result, 31) + hashCode(this.s8p_1) | 0;
        result = imul(result, 31) + this.t8p_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteLineData()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteLineData() ? other : THROW_CCE();
        if (!(this.p8p_1 === tmp0_other_with_cast.p8p_1))
          return false;
        if (!(this.q8p_1 === tmp0_other_with_cast.q8p_1))
          return false;
        if (!this.r8p_1.equals(tmp0_other_with_cast.r8p_1))
          return false;
        if (!equals(this.s8p_1, tmp0_other_with_cast.s8p_1))
          return false;
        if (!this.t8p_1.equals(tmp0_other_with_cast.t8p_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'RouteLineData');
    RouteLineDataClass = $;
  }
  return RouteLineDataClass;
}
var RouteSourceDataClass;
function RouteSourceData() {
  if (RouteSourceDataClass === VOID) {
    class $ {
      constructor(routeId, lines, features) {
        this.u8p_1 = routeId;
        this.v8p_1 = lines;
        this.w8p_1 = features;
      }
      toString() {
        return 'RouteSourceData(routeId=' + this.u8p_1 + ', lines=' + toString(this.v8p_1) + ', features=' + this.w8p_1.toString() + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.u8p_1);
        result = imul(result, 31) + hashCode(this.v8p_1) | 0;
        result = imul(result, 31) + this.w8p_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteSourceData()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteSourceData() ? other : THROW_CCE();
        if (!(this.u8p_1 === tmp0_other_with_cast.u8p_1))
          return false;
        if (!equals(this.v8p_1, tmp0_other_with_cast.v8p_1))
          return false;
        if (!this.w8p_1.equals(tmp0_other_with_cast.w8p_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'RouteSourceData');
    RouteSourceDataClass = $;
  }
  return RouteSourceDataClass;
}
function generateRouteSource($this, routeId, routeShapes, stopsById, alertsByStop) {
  var routeLines = generateRouteLines($this, routeId, routeShapes, stopsById, alertsByStop);
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(routeLines, 10));
  var _iterator__ex2g4s = routeLines.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    // Inline function 'com.mbta.tid.mbta_app.map.style.buildFeatureProperties' call
    var builder = new (FeaturePropertiesBuilder())();
    builder.a8q(RouteFeaturesBuilder_getInstance().y8p_1, item.t8p_1.w3_1);
    var tmp$ret$1 = builder.b8q();
    var tmp$ret$2 = new (Feature())(VOID, item.r8p_1, tmp$ret$1);
    destination.i(tmp$ret$2);
  }
  var routeFeatures = destination;
  var featureCollection = new (FeatureCollection())(routeFeatures);
  return new (RouteSourceData())(routeId, routeLines, featureCollection);
}
function generateRouteLines($this, routeId, routeShapes, stopsById, alertsByStop) {
  // Inline function 'kotlin.collections.flatMap' call
  // Inline function 'kotlin.collections.flatMapTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = routeShapes.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var list = routeShapeToLineData(RouteFeaturesBuilder_getInstance(), element, stopsById, alertsByStop);
    addAll(destination, list);
  }
  return destination;
}
function routeShapeToLineData($this, routePatternShape, stopsById, alertsByStop) {
  var tmp0_elvis_lhs = routePatternShape.i8q_1.d8q_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return emptyList();
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var polyline = tmp;
  var coordinates = Polyline_instance.o8p(polyline);
  var fullLineString = LineString().i1y(coordinates);
  // Inline function 'kotlin.collections.flatMap' call
  var tmp0 = routePatternShape.h8q_1;
  // Inline function 'kotlin.collections.flatMapTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = tmp0.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var list = element.o8q(alertsByStop == null ? emptyMap() : alertsByStop);
    addAll(destination, list);
  }
  var alertAwareSegments = destination;
  // Inline function 'kotlin.collections.mapNotNull' call
  // Inline function 'kotlin.collections.mapNotNullTo' call
  var destination_0 = ArrayList().g1();
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_0 = alertAwareSegments.x();
  while (_iterator__ex2g4s_0.y()) {
    var element_0 = _iterator__ex2g4s_0.z();
    var tmp0_safe_receiver = routeSegmentToRouteLineData(RouteFeaturesBuilder_getInstance(), element_0, fullLineString, stopsById);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      destination_0.i(tmp0_safe_receiver);
    }
  }
  return destination_0;
}
function routeSegmentToRouteLineData($this, segment, fullLineString, stopsById) {
  var tmp0_elvis_lhs = firstOrNull(segment.s8q_1);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var firstStopId = tmp;
  var tmp2_elvis_lhs = stopsById == null ? null : stopsById.j3(firstStopId);
  var tmp_0;
  if (tmp2_elvis_lhs == null) {
    return null;
  } else {
    tmp_0 = tmp2_elvis_lhs;
  }
  var firstStop = tmp_0;
  var tmp3_elvis_lhs = lastOrNull(segment.s8q_1);
  var tmp_1;
  if (tmp3_elvis_lhs == null) {
    return null;
  } else {
    tmp_1 = tmp3_elvis_lhs;
  }
  var lastStopId = tmp_1;
  var tmp4_elvis_lhs = stopsById.j3(lastStopId);
  var tmp_2;
  if (tmp4_elvis_lhs == null) {
    return null;
  } else {
    tmp_2 = tmp4_elvis_lhs;
  }
  var lastStop = tmp_2;
  var lineSegment = lineSlice(firstStop.i8r_1, lastStop.i8r_1, fullLineString);
  return new (RouteLineData())(segment.p8q_1, segment.q8q_1, lineSegment, segment.s8q_1, segment.u8q_1);
}
function forRailAtStop($this, stopShapes, railShapes, routesById) {
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = stopShapes.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var tmp$ret$0;
    $l$block: {
      var tmp1_safe_receiver = routesById == null ? null : routesById.j3(element.m8r_1);
      var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.p8r_1;
      var tmp;
      if (tmp2_elvis_lhs == null) {
        tmp$ret$0 = false;
        break $l$block;
      } else {
        tmp = tmp2_elvis_lhs;
      }
      var routeType = tmp;
      tmp$ret$0 = routeType.equals(RouteType_HEAVY_RAIL_getInstance()) || routeType.equals(RouteType_LIGHT_RAIL_getInstance()) || routeType.equals(RouteType_COMMUTER_RAIL_getInstance());
    }
    if (tmp$ret$0) {
      destination.i(element);
    }
  }
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination_0 = ArrayList().w(collectionSizeOrDefault(destination, 10));
  var _iterator__ex2g4s_0 = destination.x();
  while (_iterator__ex2g4s_0.y()) {
    var item = _iterator__ex2g4s_0.z();
    var tmp$ret$3 = item.m8r_1;
    destination_0.i(tmp$ret$3);
  }
  var stopRailRouteIds = toSet(destination_0);
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination_1 = ArrayList().g1();
  var _iterator__ex2g4s_1 = railShapes.x();
  while (_iterator__ex2g4s_1.y()) {
    var element_0 = _iterator__ex2g4s_1.z();
    if (stopRailRouteIds.j1(element_0.m8r_1)) {
      destination_1.i(element_0);
    }
  }
  return destination_1;
}
var RouteFeaturesBuilder$generateRouteSources$slambdaClass;
function RouteFeaturesBuilder$generateRouteSources$slambda() {
  if (RouteFeaturesBuilder$generateRouteSources$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($routeData, $stopsById, $alertsByStop, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.k8s_1 = $routeData;
        $box.l8s_1 = $stopsById;
        $box.m8s_1 = $alertsByStop;
        super(resultContinuation, $box);
      }
      o8s($this$withContext, $completion) {
        var tmp = this.y3e($this$withContext, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.o8s((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              var this_0 = this.k8s_1;
              var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
              var _iterator__ex2g4s = this_0.x();
              while (_iterator__ex2g4s.y()) {
                var item = _iterator__ex2g4s.z();
                destination.i(generateRouteSource(RouteFeaturesBuilder_getInstance(), item.m8r_1, item.n8r_1, this.l8s_1, this.m8s_1));
              }
              return destination;
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
        var i = new (RouteFeaturesBuilder$generateRouteSources$slambda())(this.k8s_1, this.l8s_1, this.m8s_1, completion);
        i.n8s_1 = $this$withContext;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    RouteFeaturesBuilder$generateRouteSources$slambdaClass = $;
  }
  return RouteFeaturesBuilder$generateRouteSources$slambdaClass;
}
function RouteFeaturesBuilder$generateRouteSources$slambda_0($routeData, $stopsById, $alertsByStop, resultContinuation) {
  var i = new (RouteFeaturesBuilder$generateRouteSources$slambda())($routeData, $stopsById, $alertsByStop, resultContinuation);
  var l = function ($this$withContext, $completion) {
    return i.o8s($this$withContext, $completion);
  };
  l.$arity = 1;
  return l;
}
function RouteFeaturesBuilder$filteredRouteShapesForStop$lambda(it) {
  return it.q8s_1;
}
function RouteFeaturesBuilder$filteredRouteShapesForStop$lambda_0(it) {
  return it.w8s_1;
}
function RouteFeaturesBuilder$filteredRouteShapesForStop$lambda_1(it) {
  return it.e8t_1;
}
function RouteFeaturesBuilder$filteredRouteShapesForStop$lambda_2(it) {
  return it.v8t_1.s8t_1;
}
var RouteFeaturesBuilderClass;
function RouteFeaturesBuilder() {
  if (RouteFeaturesBuilderClass === VOID) {
    class $ {
      constructor() {
        RouteFeaturesBuilder_instance = this;
        this.x8p_1 = 'route-source';
        this.y8p_1 = new (FeatureProperty())('alertState');
      }
      f8u(routeData, globalData, globalMapData, coroutineDispatcher, $completion) {
        // Inline function 'kotlin.collections.orEmpty' call
        var tmp0_elvis_lhs = globalMapData == null ? null : globalMapData.h8u_1;
        var tmp$ret$0 = tmp0_elvis_lhs == null ? emptyMap() : tmp0_elvis_lhs;
        return this.r8u(routeData, globalData.n8u_1, tmp$ret$0, coroutineDispatcher, $completion);
      }
      s8u(routeData, globalData, globalMapData, coroutineDispatcher, $completion, $super) {
        coroutineDispatcher = coroutineDispatcher === VOID ? Dispatchers_getInstance().u28_1 : coroutineDispatcher;
        return $super === VOID ? this.f8u(routeData, globalData, globalMapData, coroutineDispatcher, $completion) : $super.f8u.call(this, routeData, globalData, globalMapData, coroutineDispatcher, $completion);
      }
      r8u(routeData, stopsById, alertsByStop, coroutineDispatcher, $completion) {
        return withContext(coroutineDispatcher, RouteFeaturesBuilder$generateRouteSources$slambda_0(routeData, stopsById, alertsByStop, null), $completion);
      }
      t8u(stopShapes, railShapes, globalData) {
        return forRailAtStop(this, stopShapes, railShapes, globalData == null ? null : globalData.l8u_1);
      }
      u8u(stopMapData, filter, routeCardData) {
        var tmp;
        if (filter.v8u_1 === 'line-Green') {
          tmp = get_greenRoutes();
        } else {
          tmp = setOf(filter.v8u_1);
        }
        var filterRoutes = tmp;
        // Inline function 'kotlin.collections.filter' call
        var tmp0 = stopMapData.y8u_1;
        // Inline function 'kotlin.collections.filterTo' call
        var destination = ArrayList().g1();
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          if (filterRoutes.j1(element.m8r_1)) {
            destination.i(element);
          }
        }
        var targetRouteData = destination;
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!targetRouteData.h1()) {
          var tmp_0;
          if (routeCardData == null) {
            tmp_0 = null;
          } else {
            // Inline function 'kotlin.let' call
            var tmp_1 = asSequence(routeCardData);
            var tmp_2 = flatMap(tmp_1, RouteFeaturesBuilder$filteredRouteShapesForStop$lambda);
            var tmp_3 = flatMap(tmp_2, RouteFeaturesBuilder$filteredRouteShapesForStop$lambda_0);
            var tmp_4 = flatMap(tmp_3, RouteFeaturesBuilder$filteredRouteShapesForStop$lambda_1);
            var targetRoutePatternIds = toSet_0(map(tmp_4, RouteFeaturesBuilder$filteredRouteShapesForStop$lambda_2));
            // Inline function 'kotlin.collections.map' call
            // Inline function 'kotlin.collections.mapTo' call
            var destination_0 = ArrayList().w(collectionSizeOrDefault(targetRouteData, 10));
            var _iterator__ex2g4s_0 = targetRouteData.x();
            while (_iterator__ex2g4s_0.y()) {
              var item = _iterator__ex2g4s_0.z();
              // Inline function 'kotlin.collections.filter' call
              var tmp0_0 = item.n8r_1;
              // Inline function 'kotlin.collections.filterTo' call
              var destination_1 = ArrayList().g1();
              var _iterator__ex2g4s_1 = tmp0_0.x();
              while (_iterator__ex2g4s_1.y()) {
                var element_0 = _iterator__ex2g4s_1.z();
                if (element_0.g8q_1 === filter.w8u_1 && targetRoutePatternIds.j1(element_0.e8q_1)) {
                  destination_1.i(element_0);
                }
              }
              var filteredShapes = destination_1;
              var tmp$ret$7 = new (RouteWithSegmentedShapes())(item.m8r_1, filteredShapes);
              destination_0.i(tmp$ret$7);
            }
            tmp_0 = destination_0;
          }
          var tmp1_elvis_lhs = tmp_0;
          var tmp_5;
          if (tmp1_elvis_lhs == null) {
            // Inline function 'kotlin.collections.map' call
            // Inline function 'kotlin.collections.mapTo' call
            var destination_2 = ArrayList().w(collectionSizeOrDefault(targetRouteData, 10));
            var _iterator__ex2g4s_2 = targetRouteData.x();
            while (_iterator__ex2g4s_2.y()) {
              var item_0 = _iterator__ex2g4s_2.z();
              // Inline function 'kotlin.collections.filter' call
              var tmp0_1 = item_0.n8r_1;
              // Inline function 'kotlin.collections.filterTo' call
              var destination_3 = ArrayList().g1();
              var _iterator__ex2g4s_3 = tmp0_1.x();
              while (_iterator__ex2g4s_3.y()) {
                var element_1 = _iterator__ex2g4s_3.z();
                if (element_1.g8q_1 === filter.w8u_1) {
                  destination_3.i(element_1);
                }
              }
              var filteredShapes_0 = destination_3;
              var tmp$ret$15 = new (RouteWithSegmentedShapes())(item_0.m8r_1, filteredShapes_0);
              destination_2.i(tmp$ret$15);
            }
            tmp_5 = destination_2;
          } else {
            tmp_5 = tmp1_elvis_lhs;
          }
          return tmp_5;
        }
        return listOf(new (RouteWithSegmentedShapes())(filter.v8u_1, emptyList()));
      }
    }
    initMetadataForObject($, 'RouteFeaturesBuilder', VOID, VOID, VOID, [4]);
    RouteFeaturesBuilderClass = $;
  }
  return RouteFeaturesBuilderClass;
}
var RouteFeaturesBuilder_instance;
function RouteFeaturesBuilder_getInstance() {
  if (RouteFeaturesBuilder_instance === VOID)
    new (RouteFeaturesBuilder())();
  return RouteFeaturesBuilder_instance;
}
//region block: init
com_mbta_tid_mbta_app_map_RouteLineData$stable = 8;
com_mbta_tid_mbta_app_map_RouteSourceData$stable = 8;
com_mbta_tid_mbta_app_map_RouteFeaturesBuilder$stable = 0;
//endregion
//region block: exports
export {
  RouteFeaturesBuilder_getInstance as RouteFeaturesBuilder_getInstance3tbcn35ity7of,
};
//endregion

//# sourceMappingURL=RouteFeaturesBuilder.mjs.map
