import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { $serializer_getInstance2yltxzzp1bu5u as $serializer_getInstance } from '../Facility.mjs';
import {
  LinkedHashMapSerializermaoj2nyji7op as LinkedHashMapSerializer,
  ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { $serializer_getInstance1nx8umnktgatc as $serializer_getInstance_0 } from '../Line.mjs';
import { $serializer_getInstance2rgwnys7nm1qs as $serializer_getInstance_1 } from '../Route.mjs';
import {
  $serializer_getInstance2kfvl6yrgc8qq as $serializer_getInstance_2,
  Typicality_Typical_getInstance1vjbpi9hmbchb as Typicality_Typical_getInstance,
} from '../RoutePattern.mjs';
import { $serializer_getInstance3k7ozqhkqyrf6 as $serializer_getInstance_3 } from '../Stop.mjs';
import { $serializer_getInstancekv1idx7l1joz as $serializer_getInstance_4 } from '../Trip.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { KtMap140uvy3s5zad8 as KtMap } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import {
  plus310ted5e4i90h as plus,
  distinct10qe1scfdvu5k as distinct,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import {
  LocationType_STOP_getInstance3b47w50r35o9j as LocationType_STOP_getInstance,
  LocationType_STATION_getInstancebecdlasuojyi as LocationType_STATION_getInstance,
} from '../LocationType.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { KdTree3czapt4kbklp as KdTree } from '../../kdTree/KdTree.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_response_GlobalResponse_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_GlobalResponse$stable;
function GlobalResponse$Companion$$childSerializers$_anonymous__h97mca() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance());
}
function GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_0() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance_0());
}
function GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_1() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), new (ArrayListSerializer())(StringSerializer_getInstance()));
}
function GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_2() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance_1());
}
function GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_3() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance_2());
}
function GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_4() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance_3());
}
function GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_5() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance_4());
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, GlobalResponse$Companion$$childSerializers$_anonymous__h97mca);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_3 = lazy(tmp_2, GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_0);
        var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_5 = lazy(tmp_4, GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_1);
        var tmp_6 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_7 = lazy(tmp_6, GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_2);
        var tmp_8 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_9 = lazy(tmp_8, GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_3);
        var tmp_10 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_11 = lazy(tmp_10, GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_4);
        var tmp_12 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.j9n_1 = [tmp_1, tmp_3, tmp_5, tmp_7, tmp_9, tmp_11, lazy(tmp_12, GlobalResponse$Companion$$childSerializers$_anonymous__h97mca_5)];
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
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.response.GlobalResponse', this, 7);
        tmp0_serialDesc.p1b('facilities', false);
        tmp0_serialDesc.p1b('lines', false);
        tmp0_serialDesc.p1b('pattern_ids_by_stop', false);
        tmp0_serialDesc.p1b('routes', false);
        tmp0_serialDesc.p1b('route_patterns', false);
        tmp0_serialDesc.p1b('stops', false);
        tmp0_serialDesc.p1b('trips', false);
        this.k9n_1 = tmp0_serialDesc;
      }
      l9n(encoder, value) {
        var tmp0_desc = this.k9n_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().j9n_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.i8u_1);
        tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.j8u_1);
        tmp1_output.n15(tmp0_desc, 2, tmp2_cached[2].v1(), value.k8u_1);
        tmp1_output.n15(tmp0_desc, 3, tmp2_cached[3].v1(), value.l8u_1);
        tmp1_output.n15(tmp0_desc, 4, tmp2_cached[4].v1(), value.m8u_1);
        tmp1_output.n15(tmp0_desc, 5, tmp2_cached[5].v1(), value.n8u_1);
        tmp1_output.n15(tmp0_desc, 6, tmp2_cached[6].v1(), value.o8u_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.l9n(encoder, value instanceof GlobalResponse() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.k9n_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = null;
        var tmp9_local5 = null;
        var tmp10_local6 = null;
        var tmp13_input = decoder.v13(tmp0_desc);
        var tmp14_cached = Companion_getInstance().j9n_1;
        if (tmp13_input.l14()) {
          tmp4_local0 = tmp13_input.h14(tmp0_desc, 0, tmp14_cached[0].v1(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp13_input.h14(tmp0_desc, 1, tmp14_cached[1].v1(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp13_input.h14(tmp0_desc, 2, tmp14_cached[2].v1(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp13_input.h14(tmp0_desc, 3, tmp14_cached[3].v1(), tmp7_local3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp13_input.h14(tmp0_desc, 4, tmp14_cached[4].v1(), tmp8_local4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp13_input.h14(tmp0_desc, 5, tmp14_cached[5].v1(), tmp9_local5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
          tmp10_local6 = tmp13_input.h14(tmp0_desc, 6, tmp14_cached[6].v1(), tmp10_local6);
          tmp3_bitMask0 = tmp3_bitMask0 | 64;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp13_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp13_input.h14(tmp0_desc, 0, tmp14_cached[0].v1(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp13_input.h14(tmp0_desc, 1, tmp14_cached[1].v1(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp13_input.h14(tmp0_desc, 2, tmp14_cached[2].v1(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp13_input.h14(tmp0_desc, 3, tmp14_cached[3].v1(), tmp7_local3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp13_input.h14(tmp0_desc, 4, tmp14_cached[4].v1(), tmp8_local4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp13_input.h14(tmp0_desc, 5, tmp14_cached[5].v1(), tmp9_local5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              case 6:
                tmp10_local6 = tmp13_input.h14(tmp0_desc, 6, tmp14_cached[6].v1(), tmp10_local6);
                tmp3_bitMask0 = tmp3_bitMask0 | 64;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp13_input.w13(tmp0_desc);
        return GlobalResponse().m9n(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, null);
      }
      fz() {
        return this.k9n_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().j9n_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [tmp0_cached[0].v1(), tmp0_cached[1].v1(), tmp0_cached[2].v1(), tmp0_cached[3].v1(), tmp0_cached[4].v1(), tmp0_cached[5].v1(), tmp0_cached[6].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance_5() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var GlobalResponseClass;
function GlobalResponse() {
  if (GlobalResponseClass === VOID) {
    class $ {
      e9n(facilityId) {
        // Inline function 'kotlin.collections.get' call
        var this_0 = this.i8u_1;
        return (isInterface(this_0, KtMap()) ? this_0 : THROW_CCE()).j3(facilityId);
      }
      s97(routeId) {
        // Inline function 'kotlin.collections.get' call
        var this_0 = this.l8u_1;
        return (isInterface(this_0, KtMap()) ? this_0 : THROW_CCE()).j3(routeId);
      }
      a9b(stopId) {
        // Inline function 'kotlin.collections.get' call
        var this_0 = this.n8u_1;
        return (isInterface(this_0, KtMap()) ? this_0 : THROW_CCE()).j3(stopId);
      }
      n9n(lineId) {
        var tmp;
        if (!(lineId == null)) {
          tmp = this.j8u_1.j3(lineId);
        } else {
          tmp = null;
        }
        return tmp;
      }
      o9n(stopId) {
        var tmp0_elvis_lhs = this.n8u_1.j3(stopId);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return emptyList();
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var stop = tmp;
        var stopIds = plus(stop.e8r_1, listOf(stopId));
        // Inline function 'kotlin.collections.flatMap' call
        // Inline function 'kotlin.collections.flatMapTo' call
        var destination = ArrayList().g1();
        var _iterator__ex2g4s = stopIds.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp0_elvis_lhs_0 = this.k8u_1.j3(element);
          var list = tmp0_elvis_lhs_0 == null ? emptyList() : tmp0_elvis_lhs_0;
          addAll(destination, list);
        }
        var patternIds = destination;
        // Inline function 'kotlin.collections.mapNotNull' call
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination_0 = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s_0 = patternIds.x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          var tmp0_safe_receiver = this.m8u_1.j3(element_0);
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination_0.i(tmp0_safe_receiver);
          }
        }
        return destination_0;
      }
      p9n(stopId) {
        // Inline function 'kotlin.collections.mapNotNull' call
        var tmp0 = this.o9n(stopId);
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp$ret$0;
          $l$block: {
            if (!equals(element.v8z_1, Typicality_Typical_getInstance())) {
              tmp$ret$0 = null;
              break $l$block;
            }
            tmp$ret$0 = this.l8u_1.j3(element.x8z_1);
          }
          var tmp0_safe_receiver = tmp$ret$0;
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination.i(tmp0_safe_receiver);
          }
        }
        return distinct(destination);
      }
      toString() {
        return '[GlobalResponse]';
      }
      hashCode() {
        var result = hashCode(this.i8u_1);
        result = imul(result, 31) + hashCode(this.j8u_1) | 0;
        result = imul(result, 31) + hashCode(this.k8u_1) | 0;
        result = imul(result, 31) + hashCode(this.l8u_1) | 0;
        result = imul(result, 31) + hashCode(this.m8u_1) | 0;
        result = imul(result, 31) + hashCode(this.n8u_1) | 0;
        result = imul(result, 31) + hashCode(this.o8u_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof GlobalResponse()))
          return false;
        var tmp0_other_with_cast = other instanceof GlobalResponse() ? other : THROW_CCE();
        if (!equals(this.i8u_1, tmp0_other_with_cast.i8u_1))
          return false;
        if (!equals(this.j8u_1, tmp0_other_with_cast.j8u_1))
          return false;
        if (!equals(this.k8u_1, tmp0_other_with_cast.k8u_1))
          return false;
        if (!equals(this.l8u_1, tmp0_other_with_cast.l8u_1))
          return false;
        if (!equals(this.m8u_1, tmp0_other_with_cast.m8u_1))
          return false;
        if (!equals(this.n8u_1, tmp0_other_with_cast.n8u_1))
          return false;
        if (!equals(this.o8u_1, tmp0_other_with_cast.o8u_1))
          return false;
        return true;
      }
      static m9n(seen0, facilities, lines, patternIdsByStop, routes, routePatterns, stops, trips, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(127 === (127 & seen0))) {
          throwMissingFieldException(seen0, 127, $serializer_getInstance_5().k9n_1);
        }
        var $this = createThis(this);
        $this.i8u_1 = facilities;
        $this.j8u_1 = lines;
        $this.k8u_1 = patternIdsByStop;
        $this.l8u_1 = routes;
        $this.m8u_1 = routePatterns;
        $this.n8u_1 = stops;
        $this.o8u_1 = trips;
        var tmp = $this;
        // Inline function 'kotlin.collections.filter' call
        var tmp0 = $this.n8u_1.l3();
        // Inline function 'kotlin.collections.filterTo' call
        var destination = ArrayList().g1();
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          if (setOf([LocationType_STOP_getInstance(), LocationType_STATION_getInstance()]).j1(element.z8q_1) && !(element.d8r_1 == null)) {
            destination.i(element);
          }
        }
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination_0 = ArrayList().w(collectionSizeOrDefault(destination, 10));
        var _iterator__ex2g4s_0 = destination.x();
        while (_iterator__ex2g4s_0.y()) {
          var item = _iterator__ex2g4s_0.z();
          var tmp$ret$3 = to(item.v8q_1, item.i8r_1);
          destination_0.i(tmp$ret$3);
        }
        tmp.p8u_1 = new (KdTree())(destination_0);
        var tmp_0 = $this;
        // Inline function 'kotlin.collections.filter' call
        var tmp0_0 = $this.l8u_1.l3();
        // Inline function 'kotlin.collections.filterTo' call
        var destination_1 = ArrayList().g1();
        var _iterator__ex2g4s_1 = tmp0_0.x();
        while (_iterator__ex2g4s_1.y()) {
          var element_0 = _iterator__ex2g4s_1.z();
          if (!(element_0.y8r_1 == null) && !element_0.b8s_1) {
            destination_1.i(element_0);
          }
        }
        // Inline function 'kotlin.collections.groupBy' call
        // Inline function 'kotlin.collections.groupByTo' call
        var destination_2 = LinkedHashMap().sc();
        var _iterator__ex2g4s_2 = destination_1.x();
        while (_iterator__ex2g4s_2.y()) {
          var element_1 = _iterator__ex2g4s_2.z();
          var key = ensureNotNull(element_1.y8r_1);
          // Inline function 'kotlin.collections.getOrPut' call
          var value = destination_2.j3(key);
          var tmp_1;
          if (value == null) {
            var answer = ArrayList().g1();
            destination_2.t3(key, answer);
            tmp_1 = answer;
          } else {
            tmp_1 = value;
          }
          var list = tmp_1;
          list.i(element_1);
        }
        tmp_0.q8u_1 = destination_2;
        return $this;
      }
    }
    initMetadataForClass($, 'GlobalResponse', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_5});
    GlobalResponseClass = $;
  }
  return GlobalResponseClass;
}
//region block: init
com_mbta_tid_mbta_app_model_response_GlobalResponse_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_GlobalResponse$stable = 8;
//endregion
//region block: exports
export {
  GlobalResponse as GlobalResponse31u5crlky5fkx,
};
//endregion

//# sourceMappingURL=GlobalResponse.mjs.map
