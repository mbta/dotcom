import { $serializer_getInstance310rpur9aq1rx as $serializer_getInstance } from './MapFriendlyRouteResponse.mjs';
import {
  ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer,
  LinkedHashMapSerializermaoj2nyji7op as LinkedHashMapSerializer,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { $serializer_getInstance3k7ozqhkqyrf6 as $serializer_getInstance_0 } from '../Stop.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_response_StopMapResponse_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_StopMapResponse$stable;
function StopMapResponse$Companion$$childSerializers$_anonymous__y87yfj() {
  return new (ArrayListSerializer())($serializer_getInstance());
}
function StopMapResponse$Companion$$childSerializers$_anonymous__y87yfj_0() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance_0());
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, StopMapResponse$Companion$$childSerializers$_anonymous__y87yfj);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.e9p_1 = [tmp_1, lazy(tmp_2, StopMapResponse$Companion$$childSerializers$_anonymous__y87yfj_0)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.response.StopMapResponse', this, 2);
        tmp0_serialDesc.p1b('map_friendly_route_shapes', false);
        tmp0_serialDesc.p1b('child_stops', false);
        this.f9p_1 = tmp0_serialDesc;
      }
      g9p(encoder, value) {
        var tmp0_desc = this.f9p_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().e9p_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.y8u_1);
        tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.z8u_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.g9p(encoder, value instanceof StopMapResponse() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.f9p_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        var tmp7_cached = Companion_getInstance().e9p_1;
        if (tmp6_input.l14()) {
          tmp4_local0 = tmp6_input.h14(tmp0_desc, 0, tmp7_cached[0].v1(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp6_input.h14(tmp0_desc, 1, tmp7_cached[1].v1(), tmp5_local1);
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
                tmp5_local1 = tmp6_input.h14(tmp0_desc, 1, tmp7_cached[1].v1(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp6_input.w13(tmp0_desc);
        return StopMapResponse().h9p(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.f9p_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().e9p_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [tmp0_cached[0].v1(), tmp0_cached[1].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance_1() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var StopMapResponseClass;
function StopMapResponse() {
  if (StopMapResponseClass === VOID) {
    class $ {
      toString() {
        return '[StopMapResponse]';
      }
      hashCode() {
        var result = hashCode(this.y8u_1);
        result = imul(result, 31) + hashCode(this.z8u_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopMapResponse()))
          return false;
        var tmp0_other_with_cast = other instanceof StopMapResponse() ? other : THROW_CCE();
        if (!equals(this.y8u_1, tmp0_other_with_cast.y8u_1))
          return false;
        if (!equals(this.z8u_1, tmp0_other_with_cast.z8u_1))
          return false;
        return true;
      }
      static h9p(seen0, routeShapes, childStops, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(3 === (3 & seen0))) {
          throwMissingFieldException(seen0, 3, $serializer_getInstance_1().f9p_1);
        }
        var $this = createThis(this);
        $this.y8u_1 = routeShapes;
        $this.z8u_1 = childStops;
        return $this;
      }
    }
    initMetadataForClass($, 'StopMapResponse', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_1});
    StopMapResponseClass = $;
  }
  return StopMapResponseClass;
}
//region block: init
com_mbta_tid_mbta_app_model_response_StopMapResponse_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_StopMapResponse$stable = 8;
//endregion
//region block: exports
export {
  StopMapResponse as StopMapResponse22k9v86rlet4l,
};
//endregion

//# sourceMappingURL=StopMapResponse.mjs.map
