import { Companion_getInstance335ayeei16c3d as Companion_getInstance } from './RouteType.mjs';
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  BooleanSerializer_getInstance1t8habeqgiyq1 as BooleanSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import { ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  replace3le3ie7l9k8aq as replace,
  startsWith26w8qjqapeeq6 as startsWith,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_Route_$serializer$stable;
var com_mbta_tid_mbta_app_model_Route$stable;
function Route$Companion$$childSerializers$_anonymous__mfidwf() {
  return Companion_getInstance().r1n();
}
function Route$Companion$$childSerializers$_anonymous__mfidwf_0() {
  return new (ArrayListSerializer())(get_nullable(StringSerializer_getInstance()));
}
function Route$Companion$$childSerializers$_anonymous__mfidwf_1() {
  return new (ArrayListSerializer())(get_nullable(StringSerializer_getInstance()));
}
function Route$Companion$$childSerializers$_anonymous__mfidwf_2() {
  return new (ArrayListSerializer())(StringSerializer_getInstance());
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, Route$Companion$$childSerializers$_anonymous__mfidwf);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_3 = lazy(tmp_2, Route$Companion$$childSerializers$_anonymous__mfidwf_0);
        var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_5 = lazy(tmp_4, Route$Companion$$childSerializers$_anonymous__mfidwf_1);
        var tmp_6 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.z95_1 = [null, tmp_1, null, tmp_3, tmp_5, null, null, null, null, null, null, lazy(tmp_6, Route$Companion$$childSerializers$_anonymous__mfidwf_2), null, null];
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.Route', this, 14);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('type', false);
        tmp0_serialDesc.p1b('color', false);
        tmp0_serialDesc.p1b('direction_names', false);
        tmp0_serialDesc.p1b('direction_destinations', false);
        tmp0_serialDesc.p1b('listed_route', true);
        tmp0_serialDesc.p1b('long_name', false);
        tmp0_serialDesc.p1b('short_name', false);
        tmp0_serialDesc.p1b('sort_order', false);
        tmp0_serialDesc.p1b('text_color', false);
        tmp0_serialDesc.p1b('line_id', true);
        tmp0_serialDesc.p1b('route_pattern_ids', true);
        tmp0_serialDesc.p1b('label', true);
        tmp0_serialDesc.p1b('isShuttle', true);
        this.a96_1 = tmp0_serialDesc;
      }
      b96(encoder, value) {
        var tmp0_desc = this.a96_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().z95_1;
        tmp1_output.l15(tmp0_desc, 0, value.o8r_1);
        tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.p8r_1);
        tmp1_output.l15(tmp0_desc, 2, value.q8r_1);
        tmp1_output.n15(tmp0_desc, 3, tmp2_cached[3].v1(), value.r8r_1);
        tmp1_output.n15(tmp0_desc, 4, tmp2_cached[4].v1(), value.s8r_1);
        if (tmp1_output.t15(tmp0_desc, 5) ? true : !(value.t8r_1 === true)) {
          tmp1_output.d15(tmp0_desc, 5, value.t8r_1);
        }
        tmp1_output.l15(tmp0_desc, 6, value.u8r_1);
        tmp1_output.l15(tmp0_desc, 7, value.v8r_1);
        tmp1_output.g15(tmp0_desc, 8, value.w8r_1);
        tmp1_output.l15(tmp0_desc, 9, value.x8r_1);
        if (tmp1_output.t15(tmp0_desc, 10) ? true : !(value.y8r_1 == null)) {
          tmp1_output.p15(tmp0_desc, 10, StringSerializer_getInstance(), value.y8r_1);
        }
        if (tmp1_output.t15(tmp0_desc, 11) ? true : !(value.z8r_1 == null)) {
          tmp1_output.p15(tmp0_desc, 11, tmp2_cached[11].v1(), value.z8r_1);
        }
        var tmp;
        if (tmp1_output.t15(tmp0_desc, 12)) {
          tmp = true;
        } else {
          var tmp0 = value.p8r_1.x3_1;
          tmp = !(value.a8s_1 === (tmp0 === 3 ? value.v8r_1 : tmp0 === 2 ? replace(value.u8r_1, '/', ' / ') : value.u8r_1));
        }
        if (tmp) {
          tmp1_output.l15(tmp0_desc, 12, value.a8s_1);
        }
        if (tmp1_output.t15(tmp0_desc, 13) ? true : !(value.b8s_1 === startsWith(value.o8r_1, 'Shuttle'))) {
          tmp1_output.d15(tmp0_desc, 13, value.b8s_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.b96(encoder, value instanceof Route() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.a96_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = null;
        var tmp9_local5 = false;
        var tmp10_local6 = null;
        var tmp11_local7 = null;
        var tmp12_local8 = 0;
        var tmp13_local9 = null;
        var tmp14_local10 = null;
        var tmp15_local11 = null;
        var tmp16_local12 = null;
        var tmp17_local13 = false;
        var tmp18_input = decoder.v13(tmp0_desc);
        var tmp19_cached = Companion_getInstance_0().z95_1;
        if (tmp18_input.l14()) {
          tmp4_local0 = tmp18_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp18_input.h14(tmp0_desc, 1, tmp19_cached[1].v1(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp18_input.f14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp18_input.h14(tmp0_desc, 3, tmp19_cached[3].v1(), tmp7_local3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp18_input.h14(tmp0_desc, 4, tmp19_cached[4].v1(), tmp8_local4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp18_input.x13(tmp0_desc, 5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
          tmp10_local6 = tmp18_input.f14(tmp0_desc, 6);
          tmp3_bitMask0 = tmp3_bitMask0 | 64;
          tmp11_local7 = tmp18_input.f14(tmp0_desc, 7);
          tmp3_bitMask0 = tmp3_bitMask0 | 128;
          tmp12_local8 = tmp18_input.a14(tmp0_desc, 8);
          tmp3_bitMask0 = tmp3_bitMask0 | 256;
          tmp13_local9 = tmp18_input.f14(tmp0_desc, 9);
          tmp3_bitMask0 = tmp3_bitMask0 | 512;
          tmp14_local10 = tmp18_input.j14(tmp0_desc, 10, StringSerializer_getInstance(), tmp14_local10);
          tmp3_bitMask0 = tmp3_bitMask0 | 1024;
          tmp15_local11 = tmp18_input.j14(tmp0_desc, 11, tmp19_cached[11].v1(), tmp15_local11);
          tmp3_bitMask0 = tmp3_bitMask0 | 2048;
          tmp16_local12 = tmp18_input.f14(tmp0_desc, 12);
          tmp3_bitMask0 = tmp3_bitMask0 | 4096;
          tmp17_local13 = tmp18_input.x13(tmp0_desc, 13);
          tmp3_bitMask0 = tmp3_bitMask0 | 8192;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp18_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp18_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp18_input.h14(tmp0_desc, 1, tmp19_cached[1].v1(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp18_input.f14(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp18_input.h14(tmp0_desc, 3, tmp19_cached[3].v1(), tmp7_local3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp18_input.h14(tmp0_desc, 4, tmp19_cached[4].v1(), tmp8_local4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp18_input.x13(tmp0_desc, 5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              case 6:
                tmp10_local6 = tmp18_input.f14(tmp0_desc, 6);
                tmp3_bitMask0 = tmp3_bitMask0 | 64;
                break;
              case 7:
                tmp11_local7 = tmp18_input.f14(tmp0_desc, 7);
                tmp3_bitMask0 = tmp3_bitMask0 | 128;
                break;
              case 8:
                tmp12_local8 = tmp18_input.a14(tmp0_desc, 8);
                tmp3_bitMask0 = tmp3_bitMask0 | 256;
                break;
              case 9:
                tmp13_local9 = tmp18_input.f14(tmp0_desc, 9);
                tmp3_bitMask0 = tmp3_bitMask0 | 512;
                break;
              case 10:
                tmp14_local10 = tmp18_input.j14(tmp0_desc, 10, StringSerializer_getInstance(), tmp14_local10);
                tmp3_bitMask0 = tmp3_bitMask0 | 1024;
                break;
              case 11:
                tmp15_local11 = tmp18_input.j14(tmp0_desc, 11, tmp19_cached[11].v1(), tmp15_local11);
                tmp3_bitMask0 = tmp3_bitMask0 | 2048;
                break;
              case 12:
                tmp16_local12 = tmp18_input.f14(tmp0_desc, 12);
                tmp3_bitMask0 = tmp3_bitMask0 | 4096;
                break;
              case 13:
                tmp17_local13 = tmp18_input.x13(tmp0_desc, 13);
                tmp3_bitMask0 = tmp3_bitMask0 | 8192;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp18_input.w13(tmp0_desc);
        return Route().c96(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, tmp12_local8, tmp13_local9, tmp14_local10, tmp15_local11, tmp16_local12, tmp17_local13, null);
      }
      fz() {
        return this.a96_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_0().z95_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), tmp0_cached[1].v1(), StringSerializer_getInstance(), tmp0_cached[3].v1(), tmp0_cached[4].v1(), BooleanSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), IntSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), get_nullable(tmp0_cached[11].v1()), StringSerializer_getInstance(), BooleanSerializer_getInstance()];
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
var RouteClass;
function Route() {
  if (RouteClass === VOID) {
    class $ {
      d96(other) {
        return compareTo(this.w8r_1, other.w8r_1);
      }
      d(other) {
        return this.d96(other instanceof Route() ? other : THROW_CCE());
      }
      toString() {
        return 'Route(id=' + this.o8r_1 + ', type=' + this.p8r_1.toString() + ', color=' + this.q8r_1 + ', directionNames=' + toString(this.r8r_1) + ', directionDestinations=' + toString(this.s8r_1) + ', isListedRoute=' + this.t8r_1 + ', longName=' + this.u8r_1 + ', shortName=' + this.v8r_1 + ', sortOrder=' + this.w8r_1 + ', textColor=' + this.x8r_1 + ', lineId=' + this.y8r_1 + ', routePatternIds=' + toString_0(this.z8r_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.o8r_1);
        result = imul(result, 31) + this.p8r_1.hashCode() | 0;
        result = imul(result, 31) + getStringHashCode(this.q8r_1) | 0;
        result = imul(result, 31) + hashCode(this.r8r_1) | 0;
        result = imul(result, 31) + hashCode(this.s8r_1) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.t8r_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.u8r_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.v8r_1) | 0;
        result = imul(result, 31) + this.w8r_1 | 0;
        result = imul(result, 31) + getStringHashCode(this.x8r_1) | 0;
        result = imul(result, 31) + (this.y8r_1 == null ? 0 : getStringHashCode(this.y8r_1)) | 0;
        result = imul(result, 31) + (this.z8r_1 == null ? 0 : hashCode(this.z8r_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Route()))
          return false;
        var tmp0_other_with_cast = other instanceof Route() ? other : THROW_CCE();
        if (!(this.o8r_1 === tmp0_other_with_cast.o8r_1))
          return false;
        if (!this.p8r_1.equals(tmp0_other_with_cast.p8r_1))
          return false;
        if (!(this.q8r_1 === tmp0_other_with_cast.q8r_1))
          return false;
        if (!equals(this.r8r_1, tmp0_other_with_cast.r8r_1))
          return false;
        if (!equals(this.s8r_1, tmp0_other_with_cast.s8r_1))
          return false;
        if (!(this.t8r_1 === tmp0_other_with_cast.t8r_1))
          return false;
        if (!(this.u8r_1 === tmp0_other_with_cast.u8r_1))
          return false;
        if (!(this.v8r_1 === tmp0_other_with_cast.v8r_1))
          return false;
        if (!(this.w8r_1 === tmp0_other_with_cast.w8r_1))
          return false;
        if (!(this.x8r_1 === tmp0_other_with_cast.x8r_1))
          return false;
        if (!(this.y8r_1 == tmp0_other_with_cast.y8r_1))
          return false;
        if (!equals(this.z8r_1, tmp0_other_with_cast.z8r_1))
          return false;
        return true;
      }
      static c96(seen0, id, type, color, directionNames, directionDestinations, isListedRoute, longName, shortName, sortOrder, textColor, lineId, routePatternIds, label, isShuttle, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(991 === (991 & seen0))) {
          throwMissingFieldException(seen0, 991, $serializer_getInstance().a96_1);
        }
        var $this = createThis(this);
        $this.o8r_1 = id;
        $this.p8r_1 = type;
        $this.q8r_1 = color;
        $this.r8r_1 = directionNames;
        $this.s8r_1 = directionDestinations;
        if (0 === (seen0 & 32))
          $this.t8r_1 = true;
        else
          $this.t8r_1 = isListedRoute;
        $this.u8r_1 = longName;
        $this.v8r_1 = shortName;
        $this.w8r_1 = sortOrder;
        $this.x8r_1 = textColor;
        if (0 === (seen0 & 1024))
          $this.y8r_1 = null;
        else
          $this.y8r_1 = lineId;
        if (0 === (seen0 & 2048))
          $this.z8r_1 = null;
        else
          $this.z8r_1 = routePatternIds;
        if (0 === (seen0 & 4096)) {
          var tmp = $this;
          switch ($this.p8r_1.x3_1) {
            case 3:
              tmp.a8s_1 = $this.v8r_1;
              break;
            case 2:
              tmp.a8s_1 = replace($this.u8r_1, '/', ' / ');
              break;
            default:
              tmp.a8s_1 = $this.u8r_1;
              break;
          }
        } else
          $this.a8s_1 = label;
        if (0 === (seen0 & 8192))
          $this.b8s_1 = startsWith($this.o8r_1, 'Shuttle');
        else
          $this.b8s_1 = isShuttle;
        return $this;
      }
    }
    initMetadataForClass($, 'Route', VOID, VOID, [Comparable()], VOID, VOID, {0: $serializer_getInstance});
    RouteClass = $;
  }
  return RouteClass;
}
//region block: init
com_mbta_tid_mbta_app_model_Route_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_Route$stable = 8;
//endregion
//region block: exports
export {
  $serializer_getInstance as $serializer_getInstance2rgwnys7nm1qs,
};
//endregion

//# sourceMappingURL=Route.mjs.map
