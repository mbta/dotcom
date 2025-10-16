import { Companion_getInstance1vpmeriayw6j4 as Companion_getInstance } from './LocationType.mjs';
import {
  Companion_getInstance335ayeei16c3d as Companion_getInstance_0,
  RouteType_COMMUTER_RAIL_getInstancerf8k2n6webhv as RouteType_COMMUTER_RAIL_getInstance,
  RouteType_BUS_getInstance1q03qahihhdox as RouteType_BUS_getInstance,
} from './RouteType.mjs';
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  DoubleSerializer_getInstance3da4hv5ndgjlx as DoubleSerializer_getInstance,
  BooleanSerializer_getInstance1t8habeqgiyq1 as BooleanSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import {
  Companion_getInstance1w27xdg2svvu0 as Companion_getInstance_1,
  WheelchairBoardingStatus_ACCESSIBLE_getInstance1z7usa87cdfwh as WheelchairBoardingStatus_ACCESSIBLE_getInstance,
} from './WheelchairBoardingStatus.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Paire9pteg33gng7 as Pair } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import {
  toSet2orjxp16sotqu as toSet,
  contains2gm06f5aa19ov as contains,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { plus18eogev54fmsa as plus } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Sets.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Position2rurtvk7dypvc as Position } from '../../../../../../spatial-k-geojson/io/github/dellisd/spatialk/geojson/Position.mjs';
import { PositionSerializer_instance3ntez750wdkar as PositionSerializer_instance } from '../../../../../../spatial-k-geojson/io/github/dellisd/spatialk/geojson/serialization/PositionSerializer.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import { distance3gqyxdnyutkd7 as distance } from '../../../../../../spatial-k-turf/io/github/dellisd/spatialk/turf/Measurement.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { getNumberHashCode2l4nbdcihl25f as getNumberHashCode } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/bitUtils.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_Stop_$serializer$stable;
var com_mbta_tid_mbta_app_model_Stop$stable;
function Stop$Companion$$childSerializers$_anonymous__xc22u0() {
  return Companion_getInstance().r1n();
}
function Stop$Companion$$childSerializers$_anonymous__xc22u0_0() {
  return Companion_getInstance_0().r1n();
}
function Stop$Companion$$childSerializers$_anonymous__xc22u0_1() {
  return new (ArrayListSerializer())(StringSerializer_getInstance());
}
function Stop$Companion$$childSerializers$_anonymous__xc22u0_2() {
  return new (ArrayListSerializer())(StringSerializer_getInstance());
}
function Stop$Companion$$childSerializers$_anonymous__xc22u0_3() {
  return Companion_getInstance_1().r1n();
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, Stop$Companion$$childSerializers$_anonymous__xc22u0);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_3 = lazy(tmp_2, Stop$Companion$$childSerializers$_anonymous__xc22u0_0);
        var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_5 = lazy(tmp_4, Stop$Companion$$childSerializers$_anonymous__xc22u0_1);
        var tmp_6 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_7 = lazy(tmp_6, Stop$Companion$$childSerializers$_anonymous__xc22u0_2);
        var tmp_8 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.i9b_1 = [null, null, null, null, tmp_1, null, null, null, tmp_3, tmp_5, tmp_7, null, lazy(tmp_8, Stop$Companion$$childSerializers$_anonymous__xc22u0_3), null, null, null, null];
        this.j9b_1 = setOf(['place-north', 'place-sstat', 'place-bbsta', 'place-rugg']);
      }
      a9g(stopId1, stopId2, stops) {
        if (stopId1 === stopId2)
          return true;
        var tmp0_elvis_lhs = stops.j3(stopId1);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return false;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var stop1 = tmp;
        var tmp1_elvis_lhs = stops.j3(stopId2);
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          return false;
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        var stop2 = tmp_0;
        var parent1 = stop1.d9a(stops);
        var parent2 = stop2.d9a(stops);
        return parent1.v8q_1 === parent2.v8q_1;
      }
      k9b(stopIds, globalData) {
        // Inline function 'kotlin.collections.mapNotNull' call
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = stopIds.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var stop = globalData.n8u_1.j3(element);
          var tmp;
          if (!(stop == null)) {
            tmp = new (Pair())(stop.s9c(globalData), stop);
          } else {
            tmp = null;
          }
          var tmp0_safe_receiver = tmp;
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination.i(tmp0_safe_receiver);
          }
        }
        // Inline function 'kotlin.collections.groupBy' call
        // Inline function 'kotlin.collections.groupByTo' call
        var destination_0 = LinkedHashMap().sc();
        var _iterator__ex2g4s_0 = destination.x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          var key = element_0.ah_1;
          // Inline function 'kotlin.collections.getOrPut' call
          var value = destination_0.j3(key);
          var tmp_0;
          if (value == null) {
            var answer = ArrayList().g1();
            destination_0.t3(key, answer);
            tmp_0 = answer;
          } else {
            tmp_0 = value;
          }
          var list = tmp_0;
          var tmp$ret$10 = element_0.bh_1.v8q_1;
          list.i(tmp$ret$10);
        }
        // Inline function 'kotlin.collections.mapValues' call
        // Inline function 'kotlin.collections.mapValuesTo' call
        var destination_1 = LinkedHashMap().tc(mapCapacity(destination_0.c1()));
        // Inline function 'kotlin.collections.associateByTo' call
        var _iterator__ex2g4s_1 = destination_0.t1().x();
        while (_iterator__ex2g4s_1.y()) {
          var element_1 = _iterator__ex2g4s_1.z();
          var tmp_1 = element_1.u1();
          var tmp$ret$14 = plus(toSet(element_1.v1()), element_1.u1().v8q_1);
          destination_1.t3(tmp_1, tmp$ret$14);
        }
        return destination_1;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_2() {
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.Stop', this, 17);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('latitude', false);
        tmp0_serialDesc.p1b('longitude', false);
        tmp0_serialDesc.p1b('name', false);
        tmp0_serialDesc.p1b('location_type', false);
        tmp0_serialDesc.p1b('description', true);
        tmp0_serialDesc.p1b('platform_code', true);
        tmp0_serialDesc.p1b('platform_name', true);
        tmp0_serialDesc.p1b('vehicle_type', true);
        tmp0_serialDesc.p1b('child_stop_ids', true);
        tmp0_serialDesc.p1b('connecting_stop_ids', true);
        tmp0_serialDesc.p1b('parent_station_id', true);
        tmp0_serialDesc.p1b('wheelchair_boarding', true);
        tmp0_serialDesc.p1b('position', true);
        tmp0_serialDesc.p1b('isCRCore', true);
        tmp0_serialDesc.p1b('shouldShowTrackNumber', true);
        tmp0_serialDesc.p1b('isWheelchairAccessible', true);
        this.b9g_1 = tmp0_serialDesc;
      }
      c9g(encoder, value) {
        var tmp0_desc = this.b9g_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_2().i9b_1;
        tmp1_output.l15(tmp0_desc, 0, value.v8q_1);
        tmp1_output.j15(tmp0_desc, 1, value.w8q_1);
        tmp1_output.j15(tmp0_desc, 2, value.x8q_1);
        tmp1_output.l15(tmp0_desc, 3, value.y8q_1);
        tmp1_output.n15(tmp0_desc, 4, tmp2_cached[4].v1(), value.z8q_1);
        if (tmp1_output.t15(tmp0_desc, 5) ? true : !(value.a8r_1 == null)) {
          tmp1_output.p15(tmp0_desc, 5, StringSerializer_getInstance(), value.a8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 6) ? true : !(value.b8r_1 == null)) {
          tmp1_output.p15(tmp0_desc, 6, StringSerializer_getInstance(), value.b8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 7) ? true : !(value.c8r_1 == null)) {
          tmp1_output.p15(tmp0_desc, 7, StringSerializer_getInstance(), value.c8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 8) ? true : !(value.d8r_1 == null)) {
          tmp1_output.p15(tmp0_desc, 8, tmp2_cached[8].v1(), value.d8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 9) ? true : !equals(value.e8r_1, emptyList())) {
          tmp1_output.n15(tmp0_desc, 9, tmp2_cached[9].v1(), value.e8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 10) ? true : !equals(value.f8r_1, emptyList())) {
          tmp1_output.n15(tmp0_desc, 10, tmp2_cached[10].v1(), value.f8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 11) ? true : !(value.g8r_1 == null)) {
          tmp1_output.p15(tmp0_desc, 11, StringSerializer_getInstance(), value.g8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 12) ? true : !(value.h8r_1 == null)) {
          tmp1_output.p15(tmp0_desc, 12, tmp2_cached[12].v1(), value.h8r_1);
        }
        var tmp;
        if (tmp1_output.t15(tmp0_desc, 13)) {
          tmp = true;
        } else {
          var tmp0_latitude = value.w8q_1;
          var tmp1_longitude = value.x8q_1;
          tmp = !value.i8r_1.equals(Position().v1x(tmp1_longitude, tmp0_latitude));
        }
        if (tmp) {
          tmp1_output.n15(tmp0_desc, 13, PositionSerializer_instance, value.i8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 14) ? true : !(value.j8r_1 === (Companion_getInstance_2().j9b_1.j1(value.v8q_1) || contains(Companion_getInstance_2().j9b_1, value.g8r_1)))) {
          tmp1_output.d15(tmp0_desc, 14, value.j8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 15) ? true : !(value.k8r_1 === (equals(value.d8r_1, RouteType_COMMUTER_RAIL_getInstance()) && value.j8r_1))) {
          tmp1_output.d15(tmp0_desc, 15, value.k8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 16) ? true : !(value.l8r_1 === (equals(value.h8r_1, WheelchairBoardingStatus_ACCESSIBLE_getInstance()) || equals(value.d8r_1, RouteType_BUS_getInstance())))) {
          tmp1_output.d15(tmp0_desc, 16, value.l8r_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.c9g(encoder, value instanceof Stop() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.b9g_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = 0.0;
        var tmp6_local2 = 0.0;
        var tmp7_local3 = null;
        var tmp8_local4 = null;
        var tmp9_local5 = null;
        var tmp10_local6 = null;
        var tmp11_local7 = null;
        var tmp12_local8 = null;
        var tmp13_local9 = null;
        var tmp14_local10 = null;
        var tmp15_local11 = null;
        var tmp16_local12 = null;
        var tmp17_local13 = null;
        var tmp18_local14 = false;
        var tmp19_local15 = false;
        var tmp20_local16 = false;
        var tmp21_input = decoder.v13(tmp0_desc);
        var tmp22_cached = Companion_getInstance_2().i9b_1;
        if (tmp21_input.l14()) {
          tmp4_local0 = tmp21_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp21_input.d14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp21_input.d14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp21_input.f14(tmp0_desc, 3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp21_input.h14(tmp0_desc, 4, tmp22_cached[4].v1(), tmp8_local4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp21_input.j14(tmp0_desc, 5, StringSerializer_getInstance(), tmp9_local5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
          tmp10_local6 = tmp21_input.j14(tmp0_desc, 6, StringSerializer_getInstance(), tmp10_local6);
          tmp3_bitMask0 = tmp3_bitMask0 | 64;
          tmp11_local7 = tmp21_input.j14(tmp0_desc, 7, StringSerializer_getInstance(), tmp11_local7);
          tmp3_bitMask0 = tmp3_bitMask0 | 128;
          tmp12_local8 = tmp21_input.j14(tmp0_desc, 8, tmp22_cached[8].v1(), tmp12_local8);
          tmp3_bitMask0 = tmp3_bitMask0 | 256;
          tmp13_local9 = tmp21_input.h14(tmp0_desc, 9, tmp22_cached[9].v1(), tmp13_local9);
          tmp3_bitMask0 = tmp3_bitMask0 | 512;
          tmp14_local10 = tmp21_input.h14(tmp0_desc, 10, tmp22_cached[10].v1(), tmp14_local10);
          tmp3_bitMask0 = tmp3_bitMask0 | 1024;
          tmp15_local11 = tmp21_input.j14(tmp0_desc, 11, StringSerializer_getInstance(), tmp15_local11);
          tmp3_bitMask0 = tmp3_bitMask0 | 2048;
          tmp16_local12 = tmp21_input.j14(tmp0_desc, 12, tmp22_cached[12].v1(), tmp16_local12);
          tmp3_bitMask0 = tmp3_bitMask0 | 4096;
          tmp17_local13 = tmp21_input.h14(tmp0_desc, 13, PositionSerializer_instance, tmp17_local13);
          tmp3_bitMask0 = tmp3_bitMask0 | 8192;
          tmp18_local14 = tmp21_input.x13(tmp0_desc, 14);
          tmp3_bitMask0 = tmp3_bitMask0 | 16384;
          tmp19_local15 = tmp21_input.x13(tmp0_desc, 15);
          tmp3_bitMask0 = tmp3_bitMask0 | 32768;
          tmp20_local16 = tmp21_input.x13(tmp0_desc, 16);
          tmp3_bitMask0 = tmp3_bitMask0 | 65536;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp21_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp21_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp21_input.d14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp21_input.d14(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp21_input.f14(tmp0_desc, 3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp21_input.h14(tmp0_desc, 4, tmp22_cached[4].v1(), tmp8_local4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp21_input.j14(tmp0_desc, 5, StringSerializer_getInstance(), tmp9_local5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              case 6:
                tmp10_local6 = tmp21_input.j14(tmp0_desc, 6, StringSerializer_getInstance(), tmp10_local6);
                tmp3_bitMask0 = tmp3_bitMask0 | 64;
                break;
              case 7:
                tmp11_local7 = tmp21_input.j14(tmp0_desc, 7, StringSerializer_getInstance(), tmp11_local7);
                tmp3_bitMask0 = tmp3_bitMask0 | 128;
                break;
              case 8:
                tmp12_local8 = tmp21_input.j14(tmp0_desc, 8, tmp22_cached[8].v1(), tmp12_local8);
                tmp3_bitMask0 = tmp3_bitMask0 | 256;
                break;
              case 9:
                tmp13_local9 = tmp21_input.h14(tmp0_desc, 9, tmp22_cached[9].v1(), tmp13_local9);
                tmp3_bitMask0 = tmp3_bitMask0 | 512;
                break;
              case 10:
                tmp14_local10 = tmp21_input.h14(tmp0_desc, 10, tmp22_cached[10].v1(), tmp14_local10);
                tmp3_bitMask0 = tmp3_bitMask0 | 1024;
                break;
              case 11:
                tmp15_local11 = tmp21_input.j14(tmp0_desc, 11, StringSerializer_getInstance(), tmp15_local11);
                tmp3_bitMask0 = tmp3_bitMask0 | 2048;
                break;
              case 12:
                tmp16_local12 = tmp21_input.j14(tmp0_desc, 12, tmp22_cached[12].v1(), tmp16_local12);
                tmp3_bitMask0 = tmp3_bitMask0 | 4096;
                break;
              case 13:
                tmp17_local13 = tmp21_input.h14(tmp0_desc, 13, PositionSerializer_instance, tmp17_local13);
                tmp3_bitMask0 = tmp3_bitMask0 | 8192;
                break;
              case 14:
                tmp18_local14 = tmp21_input.x13(tmp0_desc, 14);
                tmp3_bitMask0 = tmp3_bitMask0 | 16384;
                break;
              case 15:
                tmp19_local15 = tmp21_input.x13(tmp0_desc, 15);
                tmp3_bitMask0 = tmp3_bitMask0 | 32768;
                break;
              case 16:
                tmp20_local16 = tmp21_input.x13(tmp0_desc, 16);
                tmp3_bitMask0 = tmp3_bitMask0 | 65536;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp21_input.w13(tmp0_desc);
        return Stop().d9g(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, tmp12_local8, tmp13_local9, tmp14_local10, tmp15_local11, tmp16_local12, tmp17_local13, tmp18_local14, tmp19_local15, tmp20_local16, null);
      }
      fz() {
        return this.b9g_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_2().i9b_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), DoubleSerializer_getInstance(), DoubleSerializer_getInstance(), StringSerializer_getInstance(), tmp0_cached[4].v1(), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(tmp0_cached[8].v1()), tmp0_cached[9].v1(), tmp0_cached[10].v1(), get_nullable(StringSerializer_getInstance()), get_nullable(tmp0_cached[12].v1()), PositionSerializer_instance, BooleanSerializer_getInstance(), BooleanSerializer_getInstance(), BooleanSerializer_getInstance()];
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
var StopClass;
function Stop() {
  if (StopClass === VOID) {
    class $ {
      d9a(stops) {
        if (this.g8r_1 == null)
          return this;
        var tmp0_elvis_lhs = stops.j3(this.g8r_1);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return this;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var parentStation = tmp;
        return parentStation.d9a(stops);
      }
      s9c(global) {
        return this.d9a(global.n8u_1);
      }
      y94(position) {
        return distance(position, this.i8r_1);
      }
      toString() {
        return 'Stop(id=' + this.v8q_1 + ', latitude=' + this.w8q_1 + ', longitude=' + this.x8q_1 + ', name=' + this.y8q_1 + ', locationType=' + this.z8q_1.toString() + ', description=' + this.a8r_1 + ', platformCode=' + this.b8r_1 + ', platformName=' + this.c8r_1 + ', vehicleType=' + toString_0(this.d8r_1) + ', childStopIds=' + toString(this.e8r_1) + ', connectingStopIds=' + toString(this.f8r_1) + ', parentStationId=' + this.g8r_1 + ', wheelchairBoarding=' + toString_0(this.h8r_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.v8q_1);
        result = imul(result, 31) + getNumberHashCode(this.w8q_1) | 0;
        result = imul(result, 31) + getNumberHashCode(this.x8q_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.y8q_1) | 0;
        result = imul(result, 31) + this.z8q_1.hashCode() | 0;
        result = imul(result, 31) + (this.a8r_1 == null ? 0 : getStringHashCode(this.a8r_1)) | 0;
        result = imul(result, 31) + (this.b8r_1 == null ? 0 : getStringHashCode(this.b8r_1)) | 0;
        result = imul(result, 31) + (this.c8r_1 == null ? 0 : getStringHashCode(this.c8r_1)) | 0;
        result = imul(result, 31) + (this.d8r_1 == null ? 0 : this.d8r_1.hashCode()) | 0;
        result = imul(result, 31) + hashCode(this.e8r_1) | 0;
        result = imul(result, 31) + hashCode(this.f8r_1) | 0;
        result = imul(result, 31) + (this.g8r_1 == null ? 0 : getStringHashCode(this.g8r_1)) | 0;
        result = imul(result, 31) + (this.h8r_1 == null ? 0 : this.h8r_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Stop()))
          return false;
        var tmp0_other_with_cast = other instanceof Stop() ? other : THROW_CCE();
        if (!(this.v8q_1 === tmp0_other_with_cast.v8q_1))
          return false;
        if (!equals(this.w8q_1, tmp0_other_with_cast.w8q_1))
          return false;
        if (!equals(this.x8q_1, tmp0_other_with_cast.x8q_1))
          return false;
        if (!(this.y8q_1 === tmp0_other_with_cast.y8q_1))
          return false;
        if (!this.z8q_1.equals(tmp0_other_with_cast.z8q_1))
          return false;
        if (!(this.a8r_1 == tmp0_other_with_cast.a8r_1))
          return false;
        if (!(this.b8r_1 == tmp0_other_with_cast.b8r_1))
          return false;
        if (!(this.c8r_1 == tmp0_other_with_cast.c8r_1))
          return false;
        if (!equals(this.d8r_1, tmp0_other_with_cast.d8r_1))
          return false;
        if (!equals(this.e8r_1, tmp0_other_with_cast.e8r_1))
          return false;
        if (!equals(this.f8r_1, tmp0_other_with_cast.f8r_1))
          return false;
        if (!(this.g8r_1 == tmp0_other_with_cast.g8r_1))
          return false;
        if (!equals(this.h8r_1, tmp0_other_with_cast.h8r_1))
          return false;
        return true;
      }
      static d9g(seen0, id, latitude, longitude, name, locationType, description, platformCode, platformName, vehicleType, childStopIds, connectingStopIds, parentStationId, wheelchairBoarding, position, isCRCore, shouldShowTrackNumber, isWheelchairAccessible, serializationConstructorMarker) {
        Companion_getInstance_2();
        if (!(31 === (31 & seen0))) {
          throwMissingFieldException(seen0, 31, $serializer_getInstance().b9g_1);
        }
        var $this = createThis(this);
        $this.v8q_1 = id;
        $this.w8q_1 = latitude;
        $this.x8q_1 = longitude;
        $this.y8q_1 = name;
        $this.z8q_1 = locationType;
        if (0 === (seen0 & 32))
          $this.a8r_1 = null;
        else
          $this.a8r_1 = description;
        if (0 === (seen0 & 64))
          $this.b8r_1 = null;
        else
          $this.b8r_1 = platformCode;
        if (0 === (seen0 & 128))
          $this.c8r_1 = null;
        else
          $this.c8r_1 = platformName;
        if (0 === (seen0 & 256))
          $this.d8r_1 = null;
        else
          $this.d8r_1 = vehicleType;
        if (0 === (seen0 & 512))
          $this.e8r_1 = emptyList();
        else
          $this.e8r_1 = childStopIds;
        if (0 === (seen0 & 1024))
          $this.f8r_1 = emptyList();
        else
          $this.f8r_1 = connectingStopIds;
        if (0 === (seen0 & 2048))
          $this.g8r_1 = null;
        else
          $this.g8r_1 = parentStationId;
        if (0 === (seen0 & 4096))
          $this.h8r_1 = null;
        else
          $this.h8r_1 = wheelchairBoarding;
        if (0 === (seen0 & 8192)) {
          var tmp = $this;
          var tmp0_latitude = $this.w8q_1;
          var tmp1_longitude = $this.x8q_1;
          tmp.i8r_1 = Position().v1x(tmp1_longitude, tmp0_latitude);
        } else
          $this.i8r_1 = position;
        if (0 === (seen0 & 16384))
          $this.j8r_1 = Companion_getInstance_2().j9b_1.j1($this.v8q_1) || contains(Companion_getInstance_2().j9b_1, $this.g8r_1);
        else
          $this.j8r_1 = isCRCore;
        if (0 === (seen0 & 32768))
          $this.k8r_1 = (equals($this.d8r_1, RouteType_COMMUTER_RAIL_getInstance()) && $this.j8r_1);
        else
          $this.k8r_1 = shouldShowTrackNumber;
        if (0 === (seen0 & 65536))
          $this.l8r_1 = equals($this.h8r_1, WheelchairBoardingStatus_ACCESSIBLE_getInstance()) || equals($this.d8r_1, RouteType_BUS_getInstance());
        else
          $this.l8r_1 = isWheelchairAccessible;
        return $this;
      }
    }
    initMetadataForClass($, 'Stop', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    StopClass = $;
  }
  return StopClass;
}
//region block: init
com_mbta_tid_mbta_app_model_Stop_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_Stop$stable = 8;
//endregion
//region block: exports
export {
  $serializer_getInstance as $serializer_getInstance3k7ozqhkqyrf6,
  Companion_getInstance_2 as Companion_getInstance2quiddekkvdc7,
};
//endregion

//# sourceMappingURL=Stop.mjs.map
