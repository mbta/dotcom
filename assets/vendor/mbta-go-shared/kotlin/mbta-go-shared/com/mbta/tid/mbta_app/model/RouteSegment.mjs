import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  createThis2j2avj17cvnv2 as createThis,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer,
  LinkedHashMapSerializermaoj2nyji7op as LinkedHashMapSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import {
  listOf1jh22dvmctj1r as listOf,
  emptyList1g2z5xcrvp2zy as emptyList,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { Paire9pteg33gng7 as Pair } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  windowed33b2v83r9sjlq as windowed,
  dropLast1vpiyky649o34 as dropLast,
  last1vo29oleiqj36 as last,
  first58ocm7j58k3q as first,
  plus310ted5e4i90h as plus,
  drop3na99dw9feawf as drop,
  toSet2orjxp16sotqu as toSet,
  distinct10qe1scfdvu5k as distinct,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  listOfvhqybd2zx248 as listOf_0,
  checkIndexOverflow3frtmheghr0th as checkIndexOverflow,
  mapCapacity1h45rc3eh9p2l as mapCapacity,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { plus18eogev54fmsa as plus_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Sets.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { Collection1k04j3hzsbod0 as Collection } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  Effect_Suspension_getInstance1338w023uv0es as Effect_Suspension_getInstance,
  Effect_Shuttle_getInstance2rh99ranmvvoj as Effect_Shuttle_getInstance,
} from './Alert.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_RoutePatternKey_$serializer$stable;
var com_mbta_tid_mbta_app_model_RoutePatternKey$stable;
var com_mbta_tid_mbta_app_model_RouteSegment_StopAlertState$stable;
var com_mbta_tid_mbta_app_model_RouteSegment_$serializer$stable;
var com_mbta_tid_mbta_app_model_RouteSegment$stable;
var com_mbta_tid_mbta_app_model_AlertAwareRouteSegment$stable;
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
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.RoutePatternKey', this, 2);
        tmp0_serialDesc.p1b('route_id', false);
        tmp0_serialDesc.p1b('route_pattern_id', false);
        this.j9e_1 = tmp0_serialDesc;
      }
      k9e(encoder, value) {
        var tmp0_desc = this.j9e_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.l15(tmp0_desc, 0, value.l9e_1);
        tmp1_output.l15(tmp0_desc, 1, value.m9e_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.k9e(encoder, value instanceof RoutePatternKey() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.j9e_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        if (tmp6_input.l14()) {
          tmp4_local0 = tmp6_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp6_input.f14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp6_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp6_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp6_input.f14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp6_input.w13(tmp0_desc);
        return RoutePatternKey().n9e(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.j9e_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), StringSerializer_getInstance()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var RoutePatternKeyClass;
function RoutePatternKey() {
  if (RoutePatternKeyClass === VOID) {
    class $ {
      toString() {
        return 'RoutePatternKey(routeId=' + this.l9e_1 + ', routePatternId=' + this.m9e_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.l9e_1);
        result = imul(result, 31) + getStringHashCode(this.m9e_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RoutePatternKey()))
          return false;
        var tmp0_other_with_cast = other instanceof RoutePatternKey() ? other : THROW_CCE();
        if (!(this.l9e_1 === tmp0_other_with_cast.l9e_1))
          return false;
        if (!(this.m9e_1 === tmp0_other_with_cast.m9e_1))
          return false;
        return true;
      }
      static n9e(seen0, routeId, routePatternId, serializationConstructorMarker) {
        if (!(3 === (3 & seen0))) {
          throwMissingFieldException(seen0, 3, $serializer_getInstance().j9e_1);
        }
        var $this = createThis(this);
        $this.l9e_1 = routeId;
        $this.m9e_1 = routePatternId;
        return $this;
      }
    }
    initMetadataForClass($, 'RoutePatternKey', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    RoutePatternKeyClass = $;
  }
  return RoutePatternKeyClass;
}
function RouteSegment$Companion$$childSerializers$_anonymous__yio5fk() {
  return new (ArrayListSerializer())(StringSerializer_getInstance());
}
function RouteSegment$Companion$$childSerializers$_anonymous__yio5fk_0() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), new (ArrayListSerializer())($serializer_getInstance()));
}
function RouteSegment$Companion$alertingSegments$lambda(_destruct__k2r9zo) {
  // Inline function 'kotlin.collections.component1' call
  var firstStop = _destruct__k2r9zo.e1(0);
  // Inline function 'kotlin.collections.component2' call
  var secondStop = _destruct__k2r9zo.e1(1);
  var firstStopId = firstStop.ch();
  var firstStopAlerting = firstStop.dh();
  var secondStopId = secondStop.ch();
  var secondStopAlerting = secondStop.dh();
  var tmp;
  if (firstStopAlerting.o9e_1 && secondStopAlerting.o9e_1) {
    tmp = SegmentAlertState_Suspension_getInstance();
  } else if (firstStopAlerting.p9e_1 && secondStopAlerting.p9e_1) {
    tmp = SegmentAlertState_Shuttle_getInstance();
  } else {
    tmp = SegmentAlertState_Normal_getInstance();
  }
  var segmentState = tmp;
  return new (Pair())(segmentState, listOf([firstStopId, secondStopId]));
}
var StopAlertStateClass;
function StopAlertState() {
  if (StopAlertStateClass === VOID) {
    class $ {
      constructor(hasSuspension, hasShuttle) {
        this.o9e_1 = hasSuspension;
        this.p9e_1 = hasShuttle;
      }
      toString() {
        return 'StopAlertState(hasSuspension=' + this.o9e_1 + ', hasShuttle=' + this.p9e_1 + ')';
      }
      hashCode() {
        var result = getBooleanHashCode(this.o9e_1);
        result = imul(result, 31) + getBooleanHashCode(this.p9e_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopAlertState()))
          return false;
        var tmp0_other_with_cast = other instanceof StopAlertState() ? other : THROW_CCE();
        if (!(this.o9e_1 === tmp0_other_with_cast.o9e_1))
          return false;
        if (!(this.p9e_1 === tmp0_other_with_cast.p9e_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'StopAlertState');
    StopAlertStateClass = $;
  }
  return StopAlertStateClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, RouteSegment$Companion$$childSerializers$_anonymous__yio5fk);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.q9e_1 = [null, null, null, tmp_1, lazy(tmp_2, RouteSegment$Companion$$childSerializers$_anonymous__yio5fk_0)];
      }
      r9e(stopIds, stopsAlertState) {
        if (stopIds.h1()) {
          // Inline function 'kotlin.collections.listOf' call
          return emptyList();
        }
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(stopIds, 10));
        var _iterator__ex2g4s = stopIds.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          // Inline function 'kotlin.collections.getOrElse' call
          var tmp0_elvis_lhs = stopsAlertState.j3(item);
          var tmp;
          if (tmp0_elvis_lhs == null) {
            tmp = new (StopAlertState())(false, false);
          } else {
            tmp = tmp0_elvis_lhs;
          }
          var tmp$ret$2 = tmp;
          var tmp$ret$3 = new (Pair())(item, tmp$ret$2);
          destination.i(tmp$ret$3);
        }
        var tmp_0 = destination;
        var stopPairSegments = windowed(tmp_0, 2, 1, VOID, RouteSegment$Companion$alertingSegments$lambda);
        // Inline function 'kotlin.collections.fold' call
        var accumulator = emptyList();
        var _iterator__ex2g4s_0 = stopPairSegments.x();
        while (_iterator__ex2g4s_0.y()) {
          var element = _iterator__ex2g4s_0.z();
          var tmp0 = accumulator;
          var tmp$ret$6;
          $l$block: {
            if (tmp0.h1()) {
              tmp$ret$6 = listOf_0(element);
              break $l$block;
            }
            var oldSegments = dropLast(tmp0, 1);
            var lastSegment = last(tmp0);
            // Inline function 'kotlin.check' call
            if (!(last(lastSegment.bh_1) === first(element.bh_1))) {
              throw IllegalStateException().o5('Check failed.');
            }
            var tmp_1;
            if (lastSegment.ah_1.equals(element.ah_1)) {
              tmp_1 = plus(oldSegments, listOf_0(new (Pair())(lastSegment.ah_1, plus(lastSegment.bh_1, drop(element.bh_1, 1)))));
            } else {
              tmp_1 = plus(tmp0, listOf_0(element));
            }
            tmp$ret$6 = tmp_1;
          }
          accumulator = tmp$ret$6;
        }
        return accumulator;
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 === VOID)
    new (Companion_0())();
  return Companion_instance_0;
}
var $serializerClass_0;
function $serializer_0() {
  if ($serializerClass_0 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_0 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.RouteSegment', this, 5);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('source_route_pattern_id', false);
        tmp0_serialDesc.p1b('source_route_id', false);
        tmp0_serialDesc.p1b('stop_ids', false);
        tmp0_serialDesc.p1b('other_patterns_by_stop_id', false);
        this.s9e_1 = tmp0_serialDesc;
      }
      t9e(encoder, value) {
        var tmp0_desc = this.s9e_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().q9e_1;
        tmp1_output.l15(tmp0_desc, 0, value.j8q_1);
        tmp1_output.l15(tmp0_desc, 1, value.k8q_1);
        tmp1_output.l15(tmp0_desc, 2, value.l8q_1);
        tmp1_output.n15(tmp0_desc, 3, tmp2_cached[3].v1(), value.m8q_1);
        tmp1_output.n15(tmp0_desc, 4, tmp2_cached[4].v1(), value.n8q_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.t9e(encoder, value instanceof RouteSegment() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.s9e_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = null;
        var tmp9_input = decoder.v13(tmp0_desc);
        var tmp10_cached = Companion_getInstance_0().q9e_1;
        if (tmp9_input.l14()) {
          tmp4_local0 = tmp9_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp9_input.f14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp9_input.f14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp9_input.h14(tmp0_desc, 3, tmp10_cached[3].v1(), tmp7_local3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp9_input.h14(tmp0_desc, 4, tmp10_cached[4].v1(), tmp8_local4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp9_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp9_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp9_input.f14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp9_input.f14(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp9_input.h14(tmp0_desc, 3, tmp10_cached[3].v1(), tmp7_local3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp9_input.h14(tmp0_desc, 4, tmp10_cached[4].v1(), tmp8_local4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp9_input.w13(tmp0_desc);
        return RouteSegment().u9e(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, null);
      }
      fz() {
        return this.s9e_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_0().q9e_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), tmp0_cached[3].v1(), tmp0_cached[4].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_0 = $;
  }
  return $serializerClass_0;
}
var $serializer_instance_0;
function $serializer_getInstance_0() {
  if ($serializer_instance_0 === VOID)
    new ($serializer_0())();
  return $serializer_instance_0;
}
function RouteSegment$alertStateByStopId$lambda($routes) {
  return function (informedEntity) {
    return !(informedEntity.w8x_1 == null) && $routes._v.j1(informedEntity.w8x_1);
  };
}
var RouteSegmentClass;
function RouteSegment() {
  if (RouteSegmentClass === VOID) {
    class $ {
      o8q(alertsByStop) {
        var stopsAlertState = this.v9e(alertsByStop);
        var alertingSegments = Companion_getInstance_0().r9e(this.m8q_1, stopsAlertState);
        // Inline function 'kotlin.collections.mapIndexed' call
        // Inline function 'kotlin.collections.mapIndexedTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(alertingSegments, 10));
        var index = 0;
        var _iterator__ex2g4s = alertingSegments.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var _unary__edvuaz = index;
          index = _unary__edvuaz + 1 | 0;
          var index_0 = checkIndexOverflow(_unary__edvuaz);
          var alertState = item.ch();
          var segmentStops = item.dh();
          var stopIdSet = toSet(segmentStops);
          var tmp0_id = this.j8q_1 + '-' + index_0;
          var tmp1_sourceRoutePatternId = this.k8q_1;
          var tmp2_sourceRouteId = this.l8q_1;
          // Inline function 'kotlin.collections.filter' call
          var tmp0 = this.n8q_1;
          // Inline function 'kotlin.collections.filterTo' call
          var destination_0 = LinkedHashMap().sc();
          // Inline function 'kotlin.collections.iterator' call
          var _iterator__ex2g4s_0 = tmp0.t1().x();
          while (_iterator__ex2g4s_0.y()) {
            var element = _iterator__ex2g4s_0.z();
            if (stopIdSet.j1(element.u1())) {
              destination_0.t3(element.u1(), element.v1());
            }
          }
          var tmp$ret$4 = new (AlertAwareRouteSegment())(tmp0_id, tmp1_sourceRoutePatternId, tmp2_sourceRouteId, segmentStops, destination_0, alertState);
          destination.i(tmp$ret$4);
        }
        return destination;
      }
      v9e(alertsByStop) {
        // Inline function 'kotlin.collections.associateWith' call
        var this_0 = this.m8q_1;
        var result = LinkedHashMap().tc(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16));
        // Inline function 'kotlin.collections.associateWithTo' call
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp;
          if (!alertsByStop.h3(element)) {
            tmp = new (StopAlertState())(false, false);
          } else {
            // Inline function 'kotlin.collections.getOrElse' call
            var tmp0_elvis_lhs = this.n8q_1.j3(element);
            var tmp_0;
            if (tmp0_elvis_lhs == null) {
              // Inline function 'kotlin.collections.listOf' call
              tmp_0 = emptyList();
            } else {
              tmp_0 = tmp0_elvis_lhs;
            }
            // Inline function 'kotlin.collections.map' call
            var this_1 = tmp_0;
            // Inline function 'kotlin.collections.mapTo' call
            var destination = ArrayList().w(collectionSizeOrDefault(this_1, 10));
            var _iterator__ex2g4s_0 = this_1.x();
            while (_iterator__ex2g4s_0.y()) {
              var item = _iterator__ex2g4s_0.z();
              var tmp$ret$3 = item.l9e_1;
              destination.i(tmp$ret$3);
            }
            var routes = {_v: toSet(destination)};
            routes._v = plus_0(routes._v, this.l8q_1);
            var tmp0_safe_receiver = alertsByStop.j3(element);
            // Inline function 'kotlin.collections.orEmpty' call
            var tmp0_elvis_lhs_0 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.h90_1;
            var tmp_1 = tmp0_elvis_lhs_0 == null ? emptyList() : tmp0_elvis_lhs_0;
            var tmp1_safe_receiver = alertsByStop.j3(element);
            var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.i90_1;
            var tmp3_safe_receiver = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.l3();
            var tmp_2;
            if (tmp3_safe_receiver == null) {
              tmp_2 = null;
            } else {
              // Inline function 'kotlin.collections.flatMap' call
              // Inline function 'kotlin.collections.flatMapTo' call
              var destination_0 = ArrayList().g1();
              var _iterator__ex2g4s_1 = tmp3_safe_receiver.x();
              while (_iterator__ex2g4s_1.y()) {
                var element_0 = _iterator__ex2g4s_1.z();
                var list = element_0.h90_1;
                addAll(destination_0, list);
              }
              tmp_2 = destination_0;
            }
            // Inline function 'kotlin.collections.orEmpty' call
            var tmp0_elvis_lhs_1 = tmp_2;
            var tmp$ret$10 = tmp0_elvis_lhs_1 == null ? emptyList() : tmp0_elvis_lhs_1;
            var allServiceAlerts = distinct(plus(tmp_1, tmp$ret$10));
            // Inline function 'kotlin.collections.filter' call
            // Inline function 'kotlin.collections.filterTo' call
            var destination_1 = ArrayList().g1();
            var _iterator__ex2g4s_2 = allServiceAlerts.x();
            while (_iterator__ex2g4s_2.y()) {
              var element_1 = _iterator__ex2g4s_2.z();
              if (element_1.o8z(RouteSegment$alertStateByStopId$lambda(routes))) {
                destination_1.i(element_1);
              }
            }
            var serviceAlerts = destination_1;
            var tmp$ret$14;
            $l$block_0: {
              // Inline function 'kotlin.collections.any' call
              var tmp_3;
              if (isInterface(serviceAlerts, Collection())) {
                tmp_3 = serviceAlerts.h1();
              } else {
                tmp_3 = false;
              }
              if (tmp_3) {
                tmp$ret$14 = false;
                break $l$block_0;
              }
              var _iterator__ex2g4s_3 = serviceAlerts.x();
              while (_iterator__ex2g4s_3.y()) {
                var element_2 = _iterator__ex2g4s_3.z();
                if (element_2.a8z_1.equals(Effect_Suspension_getInstance())) {
                  tmp$ret$14 = true;
                  break $l$block_0;
                }
              }
              tmp$ret$14 = false;
            }
            var tmp_4 = tmp$ret$14;
            var tmp$ret$16;
            $l$block_2: {
              // Inline function 'kotlin.collections.any' call
              var tmp_5;
              if (isInterface(serviceAlerts, Collection())) {
                tmp_5 = serviceAlerts.h1();
              } else {
                tmp_5 = false;
              }
              if (tmp_5) {
                tmp$ret$16 = false;
                break $l$block_2;
              }
              var _iterator__ex2g4s_4 = serviceAlerts.x();
              while (_iterator__ex2g4s_4.y()) {
                var element_3 = _iterator__ex2g4s_4.z();
                if (element_3.a8z_1.equals(Effect_Shuttle_getInstance())) {
                  tmp$ret$16 = true;
                  break $l$block_2;
                }
              }
              tmp$ret$16 = false;
            }
            tmp = new (StopAlertState())(tmp_4, tmp$ret$16);
          }
          var tmp$ret$18 = tmp;
          result.t3(element, tmp$ret$18);
        }
        // Inline function 'kotlin.collections.filterValues' call
        var result_0 = LinkedHashMap().sc();
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s_5 = result.t1().x();
        while (_iterator__ex2g4s_5.y()) {
          var entry = _iterator__ex2g4s_5.z();
          var it = entry.v1();
          if (it.o9e_1 || it.p9e_1) {
            result_0.t3(entry.u1(), entry.v1());
          }
        }
        return result_0;
      }
      toString() {
        return 'RouteSegment(id=' + this.j8q_1 + ', sourceRoutePatternId=' + this.k8q_1 + ', sourceRouteId=' + this.l8q_1 + ', stopIds=' + toString(this.m8q_1) + ', otherPatternsByStopId=' + toString(this.n8q_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.j8q_1);
        result = imul(result, 31) + getStringHashCode(this.k8q_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.l8q_1) | 0;
        result = imul(result, 31) + hashCode(this.m8q_1) | 0;
        result = imul(result, 31) + hashCode(this.n8q_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteSegment()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteSegment() ? other : THROW_CCE();
        if (!(this.j8q_1 === tmp0_other_with_cast.j8q_1))
          return false;
        if (!(this.k8q_1 === tmp0_other_with_cast.k8q_1))
          return false;
        if (!(this.l8q_1 === tmp0_other_with_cast.l8q_1))
          return false;
        if (!equals(this.m8q_1, tmp0_other_with_cast.m8q_1))
          return false;
        if (!equals(this.n8q_1, tmp0_other_with_cast.n8q_1))
          return false;
        return true;
      }
      static u9e(seen0, id, sourceRoutePatternId, sourceRouteId, stopIds, otherPatternsByStopId, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(31 === (31 & seen0))) {
          throwMissingFieldException(seen0, 31, $serializer_getInstance_0().s9e_1);
        }
        var $this = createThis(this);
        $this.j8q_1 = id;
        $this.k8q_1 = sourceRoutePatternId;
        $this.l8q_1 = sourceRouteId;
        $this.m8q_1 = stopIds;
        $this.n8q_1 = otherPatternsByStopId;
        return $this;
      }
    }
    initMetadataForClass($, 'RouteSegment', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
    RouteSegmentClass = $;
  }
  return RouteSegmentClass;
}
var AlertAwareRouteSegmentClass;
function AlertAwareRouteSegment() {
  if (AlertAwareRouteSegmentClass === VOID) {
    class $ {
      constructor(id, sourceRoutePatternId, sourceRouteId, stopIds, otherPatternsByStopId, alertState) {
        this.p8q_1 = id;
        this.q8q_1 = sourceRoutePatternId;
        this.r8q_1 = sourceRouteId;
        this.s8q_1 = stopIds;
        this.t8q_1 = otherPatternsByStopId;
        this.u8q_1 = alertState;
      }
      toString() {
        return 'AlertAwareRouteSegment(id=' + this.p8q_1 + ', sourceRoutePatternId=' + this.q8q_1 + ', sourceRouteId=' + this.r8q_1 + ', stopIds=' + toString(this.s8q_1) + ', otherPatternsByStopId=' + toString(this.t8q_1) + ', alertState=' + this.u8q_1.toString() + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.p8q_1);
        result = imul(result, 31) + getStringHashCode(this.q8q_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.r8q_1) | 0;
        result = imul(result, 31) + hashCode(this.s8q_1) | 0;
        result = imul(result, 31) + hashCode(this.t8q_1) | 0;
        result = imul(result, 31) + this.u8q_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof AlertAwareRouteSegment()))
          return false;
        var tmp0_other_with_cast = other instanceof AlertAwareRouteSegment() ? other : THROW_CCE();
        if (!(this.p8q_1 === tmp0_other_with_cast.p8q_1))
          return false;
        if (!(this.q8q_1 === tmp0_other_with_cast.q8q_1))
          return false;
        if (!(this.r8q_1 === tmp0_other_with_cast.r8q_1))
          return false;
        if (!equals(this.s8q_1, tmp0_other_with_cast.s8q_1))
          return false;
        if (!equals(this.t8q_1, tmp0_other_with_cast.t8q_1))
          return false;
        if (!this.u8q_1.equals(tmp0_other_with_cast.u8q_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'AlertAwareRouteSegment');
    AlertAwareRouteSegmentClass = $;
  }
  return AlertAwareRouteSegmentClass;
}
var SegmentAlertState_Suspension_instance;
var SegmentAlertState_Shuttle_instance;
var SegmentAlertState_Normal_instance;
var SegmentAlertState_entriesInitialized;
function SegmentAlertState_initEntries() {
  if (SegmentAlertState_entriesInitialized)
    return Unit_instance;
  SegmentAlertState_entriesInitialized = true;
  SegmentAlertState_Suspension_instance = new (SegmentAlertState())('Suspension', 0);
  SegmentAlertState_Shuttle_instance = new (SegmentAlertState())('Shuttle', 1);
  SegmentAlertState_Normal_instance = new (SegmentAlertState())('Normal', 2);
}
var SegmentAlertStateClass;
function SegmentAlertState() {
  if (SegmentAlertStateClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'SegmentAlertState');
    SegmentAlertStateClass = $;
  }
  return SegmentAlertStateClass;
}
function SegmentAlertState_Suspension_getInstance() {
  SegmentAlertState_initEntries();
  return SegmentAlertState_Suspension_instance;
}
function SegmentAlertState_Shuttle_getInstance() {
  SegmentAlertState_initEntries();
  return SegmentAlertState_Shuttle_instance;
}
function SegmentAlertState_Normal_getInstance() {
  SegmentAlertState_initEntries();
  return SegmentAlertState_Normal_instance;
}
//region block: init
com_mbta_tid_mbta_app_model_RoutePatternKey_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_RoutePatternKey$stable = 0;
com_mbta_tid_mbta_app_model_RouteSegment_StopAlertState$stable = 0;
com_mbta_tid_mbta_app_model_RouteSegment_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_RouteSegment$stable = 8;
com_mbta_tid_mbta_app_model_AlertAwareRouteSegment$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  $serializer_getInstance_0 as $serializer_getInstance26f3p7caf21tq,
};
//endregion

//# sourceMappingURL=RouteSegment.mjs.map
