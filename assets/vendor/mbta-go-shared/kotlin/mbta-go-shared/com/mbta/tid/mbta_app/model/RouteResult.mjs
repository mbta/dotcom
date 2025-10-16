import { Companion_getInstance335ayeei16c3d as Companion_getInstance } from './RouteType.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_RouteResult_$serializer$stable;
var com_mbta_tid_mbta_app_model_RouteResult$stable;
function RouteResult$Companion$$childSerializers$_anonymous__9z5wk() {
  return Companion_getInstance().r1n();
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
        tmp.a9e_1 = [null, null, null, null, lazy(tmp_0, RouteResult$Companion$$childSerializers$_anonymous__9z5wk)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.RouteResult', this, 5);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('rank', false);
        tmp0_serialDesc.p1b('long_name', false);
        tmp0_serialDesc.p1b('name', false);
        tmp0_serialDesc.p1b('route_type', false);
        this.b9e_1 = tmp0_serialDesc;
      }
      c9e(encoder, value) {
        var tmp0_desc = this.b9e_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().a9e_1;
        tmp1_output.l15(tmp0_desc, 0, value.d9e_1);
        tmp1_output.g15(tmp0_desc, 1, value.e9e_1);
        tmp1_output.l15(tmp0_desc, 2, value.f9e_1);
        tmp1_output.l15(tmp0_desc, 3, value.g9e_1);
        tmp1_output.n15(tmp0_desc, 4, tmp2_cached[4].v1(), value.h9e_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.c9e(encoder, value instanceof RouteResult() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.b9e_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = 0;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = null;
        var tmp9_input = decoder.v13(tmp0_desc);
        var tmp10_cached = Companion_getInstance_0().a9e_1;
        if (tmp9_input.l14()) {
          tmp4_local0 = tmp9_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp9_input.a14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp9_input.f14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp9_input.f14(tmp0_desc, 3);
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
                tmp5_local1 = tmp9_input.a14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp9_input.f14(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp9_input.f14(tmp0_desc, 3);
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
        return RouteResult().i9e(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, null);
      }
      fz() {
        return this.b9e_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_0().a9e_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), IntSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), tmp0_cached[4].v1()];
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
var RouteResultClass;
function RouteResult() {
  if (RouteResultClass === VOID) {
    class $ {
      toString() {
        return 'RouteResult(id=' + this.d9e_1 + ', rank=' + this.e9e_1 + ', longName=' + this.f9e_1 + ', shortName=' + this.g9e_1 + ', routeType=' + this.h9e_1.toString() + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.d9e_1);
        result = imul(result, 31) + this.e9e_1 | 0;
        result = imul(result, 31) + getStringHashCode(this.f9e_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.g9e_1) | 0;
        result = imul(result, 31) + this.h9e_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteResult()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteResult() ? other : THROW_CCE();
        if (!(this.d9e_1 === tmp0_other_with_cast.d9e_1))
          return false;
        if (!(this.e9e_1 === tmp0_other_with_cast.e9e_1))
          return false;
        if (!(this.f9e_1 === tmp0_other_with_cast.f9e_1))
          return false;
        if (!(this.g9e_1 === tmp0_other_with_cast.g9e_1))
          return false;
        if (!this.h9e_1.equals(tmp0_other_with_cast.h9e_1))
          return false;
        return true;
      }
      static i9e(seen0, id, rank, longName, shortName, routeType, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(31 === (31 & seen0))) {
          throwMissingFieldException(seen0, 31, $serializer_getInstance().b9e_1);
        }
        var $this = createThis(this);
        $this.d9e_1 = id;
        $this.e9e_1 = rank;
        $this.f9e_1 = longName;
        $this.g9e_1 = shortName;
        $this.h9e_1 = routeType;
        return $this;
      }
    }
    initMetadataForClass($, 'RouteResult', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    RouteResultClass = $;
  }
  return RouteResultClass;
}
//region block: init
com_mbta_tid_mbta_app_model_RouteResult_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_RouteResult$stable = 0;
//endregion
//region block: exports
export {
  $serializer_getInstance as $serializer_getInstance2ax2q0y9qwxlq,
};
//endregion

//# sourceMappingURL=RouteResult.mjs.map
