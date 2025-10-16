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
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
  BooleanSerializer_getInstance1t8habeqgiyq1 as BooleanSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Companion_getInstance335ayeei16c3d as Companion_getInstance } from './RouteType.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_StopResult_$serializer$stable;
var com_mbta_tid_mbta_app_model_StopResult$stable;
var com_mbta_tid_mbta_app_model_StopResultRoute_$serializer$stable;
var com_mbta_tid_mbta_app_model_StopResultRoute$stable;
function StopResult$Companion$$childSerializers$_anonymous__an6iqz() {
  return new (ArrayListSerializer())($serializer_getInstance_0());
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.v9h_1 = [null, null, null, null, null, lazy(tmp_0, StopResult$Companion$$childSerializers$_anonymous__an6iqz)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.StopResult', this, 6);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('rank', false);
        tmp0_serialDesc.p1b('name', false);
        tmp0_serialDesc.p1b('zone', false);
        tmp0_serialDesc.p1b('station?', false);
        tmp0_serialDesc.p1b('routes', false);
        this.w9h_1 = tmp0_serialDesc;
      }
      x9h(encoder, value) {
        var tmp0_desc = this.w9h_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().v9h_1;
        tmp1_output.l15(tmp0_desc, 0, value.y9h_1);
        tmp1_output.g15(tmp0_desc, 1, value.z9h_1);
        tmp1_output.l15(tmp0_desc, 2, value.a9i_1);
        tmp1_output.p15(tmp0_desc, 3, StringSerializer_getInstance(), value.b9i_1);
        tmp1_output.d15(tmp0_desc, 4, value.c9i_1);
        tmp1_output.n15(tmp0_desc, 5, tmp2_cached[5].v1(), value.d9i_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.x9h(encoder, value instanceof StopResult() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.w9h_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = 0;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = false;
        var tmp9_local5 = null;
        var tmp10_input = decoder.v13(tmp0_desc);
        var tmp11_cached = Companion_getInstance_0().v9h_1;
        if (tmp10_input.l14()) {
          tmp4_local0 = tmp10_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp10_input.a14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp10_input.f14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp10_input.j14(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp10_input.x13(tmp0_desc, 4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp10_input.h14(tmp0_desc, 5, tmp11_cached[5].v1(), tmp9_local5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp10_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp10_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp10_input.a14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp10_input.f14(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp10_input.j14(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp10_input.x13(tmp0_desc, 4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp10_input.h14(tmp0_desc, 5, tmp11_cached[5].v1(), tmp9_local5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp10_input.w13(tmp0_desc);
        return StopResult().e9i(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, null);
      }
      fz() {
        return this.w9h_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_0().v9h_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), IntSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), BooleanSerializer_getInstance(), tmp0_cached[5].v1()];
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
var StopResultClass;
function StopResult() {
  if (StopResultClass === VOID) {
    class $ {
      toString() {
        return 'StopResult(id=' + this.y9h_1 + ', rank=' + this.z9h_1 + ', name=' + this.a9i_1 + ', zone=' + this.b9i_1 + ', isStation=' + this.c9i_1 + ', routes=' + toString(this.d9i_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.y9h_1);
        result = imul(result, 31) + this.z9h_1 | 0;
        result = imul(result, 31) + getStringHashCode(this.a9i_1) | 0;
        result = imul(result, 31) + (this.b9i_1 == null ? 0 : getStringHashCode(this.b9i_1)) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.c9i_1) | 0;
        result = imul(result, 31) + hashCode(this.d9i_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopResult()))
          return false;
        var tmp0_other_with_cast = other instanceof StopResult() ? other : THROW_CCE();
        if (!(this.y9h_1 === tmp0_other_with_cast.y9h_1))
          return false;
        if (!(this.z9h_1 === tmp0_other_with_cast.z9h_1))
          return false;
        if (!(this.a9i_1 === tmp0_other_with_cast.a9i_1))
          return false;
        if (!(this.b9i_1 == tmp0_other_with_cast.b9i_1))
          return false;
        if (!(this.c9i_1 === tmp0_other_with_cast.c9i_1))
          return false;
        if (!equals(this.d9i_1, tmp0_other_with_cast.d9i_1))
          return false;
        return true;
      }
      static e9i(seen0, id, rank, name, zone, isStation, routes, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(63 === (63 & seen0))) {
          throwMissingFieldException(seen0, 63, $serializer_getInstance().w9h_1);
        }
        var $this = createThis(this);
        $this.y9h_1 = id;
        $this.z9h_1 = rank;
        $this.a9i_1 = name;
        $this.b9i_1 = zone;
        $this.c9i_1 = isStation;
        $this.d9i_1 = routes;
        return $this;
      }
    }
    initMetadataForClass($, 'StopResult', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    StopResultClass = $;
  }
  return StopResultClass;
}
function StopResultRoute$Companion$$childSerializers$_anonymous__qs5p5s() {
  return Companion_getInstance().r1n();
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.f9i_1 = [lazy(tmp_0, StopResultRoute$Companion$$childSerializers$_anonymous__qs5p5s), null];
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_1() {
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.StopResultRoute', this, 2);
        tmp0_serialDesc.p1b('type', false);
        tmp0_serialDesc.p1b('icon', false);
        this.g9i_1 = tmp0_serialDesc;
      }
      h9i(encoder, value) {
        var tmp0_desc = this.g9i_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_1().f9i_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.i9i_1);
        tmp1_output.l15(tmp0_desc, 1, value.j9i_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.h9i(encoder, value instanceof StopResultRoute() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.g9i_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        var tmp7_cached = Companion_getInstance_1().f9i_1;
        if (tmp6_input.l14()) {
          tmp4_local0 = tmp6_input.h14(tmp0_desc, 0, tmp7_cached[0].v1(), tmp4_local0);
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
                tmp4_local0 = tmp6_input.h14(tmp0_desc, 0, tmp7_cached[0].v1(), tmp4_local0);
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
        return StopResultRoute().k9i(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.g9i_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [Companion_getInstance_1().f9i_1[0].v1(), StringSerializer_getInstance()];
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
var StopResultRouteClass;
function StopResultRoute() {
  if (StopResultRouteClass === VOID) {
    class $ {
      toString() {
        return 'StopResultRoute(type=' + this.i9i_1.toString() + ', icon=' + this.j9i_1 + ')';
      }
      hashCode() {
        var result = this.i9i_1.hashCode();
        result = imul(result, 31) + getStringHashCode(this.j9i_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopResultRoute()))
          return false;
        var tmp0_other_with_cast = other instanceof StopResultRoute() ? other : THROW_CCE();
        if (!this.i9i_1.equals(tmp0_other_with_cast.i9i_1))
          return false;
        if (!(this.j9i_1 === tmp0_other_with_cast.j9i_1))
          return false;
        return true;
      }
      static k9i(seen0, type, icon, serializationConstructorMarker) {
        Companion_getInstance_1();
        if (!(3 === (3 & seen0))) {
          throwMissingFieldException(seen0, 3, $serializer_getInstance_0().g9i_1);
        }
        var $this = createThis(this);
        $this.i9i_1 = type;
        $this.j9i_1 = icon;
        return $this;
      }
    }
    initMetadataForClass($, 'StopResultRoute', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
    StopResultRouteClass = $;
  }
  return StopResultRouteClass;
}
//region block: init
com_mbta_tid_mbta_app_model_StopResult_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_StopResult$stable = 8;
com_mbta_tid_mbta_app_model_StopResultRoute_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_StopResultRoute$stable = 0;
//endregion
//region block: exports
export {
  $serializer_getInstance as $serializer_getInstanceonqzihfrc8m9,
};
//endregion

//# sourceMappingURL=StopResult.mjs.map
