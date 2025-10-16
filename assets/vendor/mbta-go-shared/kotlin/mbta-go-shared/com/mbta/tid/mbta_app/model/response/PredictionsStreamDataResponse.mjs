import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { $serializer_getInstance2h4hs9jntxuz4 as $serializer_getInstance } from '../Prediction.mjs';
import { LinkedHashMapSerializermaoj2nyji7op as LinkedHashMapSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { $serializer_getInstancekv1idx7l1joz as $serializer_getInstance_0 } from '../Trip.mjs';
import { $serializer_getInstanceh32qatkbuui as $serializer_getInstance_1 } from '../Vehicle.mjs';
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
var com_mbta_tid_mbta_app_model_response_PredictionsStreamDataResponse_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_PredictionsStreamDataResponse$stable;
function PredictionsStreamDataResponse$Companion$$childSerializers$_anonymous__8izsbp() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance());
}
function PredictionsStreamDataResponse$Companion$$childSerializers$_anonymous__8izsbp_0() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance_0());
}
function PredictionsStreamDataResponse$Companion$$childSerializers$_anonymous__8izsbp_1() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance_1());
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, PredictionsStreamDataResponse$Companion$$childSerializers$_anonymous__8izsbp);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_3 = lazy(tmp_2, PredictionsStreamDataResponse$Companion$$childSerializers$_anonymous__8izsbp_0);
        var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.s9o_1 = [tmp_1, tmp_3, lazy(tmp_4, PredictionsStreamDataResponse$Companion$$childSerializers$_anonymous__8izsbp_1)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.response.PredictionsStreamDataResponse', this, 3);
        tmp0_serialDesc.p1b('predictions', false);
        tmp0_serialDesc.p1b('trips', false);
        tmp0_serialDesc.p1b('vehicles', false);
        this.t9o_1 = tmp0_serialDesc;
      }
      u9o(encoder, value) {
        var tmp0_desc = this.t9o_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().s9o_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.r9b_1);
        tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.s9b_1);
        tmp1_output.n15(tmp0_desc, 2, tmp2_cached[2].v1(), value.t9b_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.u9o(encoder, value instanceof PredictionsStreamDataResponse() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.t9o_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_input = decoder.v13(tmp0_desc);
        var tmp8_cached = Companion_getInstance().s9o_1;
        if (tmp7_input.l14()) {
          tmp4_local0 = tmp7_input.h14(tmp0_desc, 0, tmp8_cached[0].v1(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp7_input.h14(tmp0_desc, 1, tmp8_cached[1].v1(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp7_input.h14(tmp0_desc, 2, tmp8_cached[2].v1(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp7_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp7_input.h14(tmp0_desc, 0, tmp8_cached[0].v1(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp7_input.h14(tmp0_desc, 1, tmp8_cached[1].v1(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp7_input.h14(tmp0_desc, 2, tmp8_cached[2].v1(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp7_input.w13(tmp0_desc);
        return PredictionsStreamDataResponse().v9o(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
      }
      fz() {
        return this.t9o_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().s9o_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [tmp0_cached[0].v1(), tmp0_cached[1].v1(), tmp0_cached[2].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance_2() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var PredictionsStreamDataResponseClass;
function PredictionsStreamDataResponse() {
  if (PredictionsStreamDataResponseClass === VOID) {
    class $ {
      constructor(predictions, trips, vehicles) {
        Companion_getInstance();
        this.r9b_1 = predictions;
        this.s9b_1 = trips;
        this.t9b_1 = vehicles;
      }
      n9o() {
        return this.r9b_1.c1();
      }
      toString() {
        return '[PredictionsStreamDataResponse]';
      }
      hashCode() {
        var result = hashCode(this.r9b_1);
        result = imul(result, 31) + hashCode(this.s9b_1) | 0;
        result = imul(result, 31) + hashCode(this.t9b_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof PredictionsStreamDataResponse()))
          return false;
        var tmp0_other_with_cast = other instanceof PredictionsStreamDataResponse() ? other : THROW_CCE();
        if (!equals(this.r9b_1, tmp0_other_with_cast.r9b_1))
          return false;
        if (!equals(this.s9b_1, tmp0_other_with_cast.s9b_1))
          return false;
        if (!equals(this.t9b_1, tmp0_other_with_cast.t9b_1))
          return false;
        return true;
      }
      static v9o(seen0, predictions, trips, vehicles, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(7 === (7 & seen0))) {
          throwMissingFieldException(seen0, 7, $serializer_getInstance_2().t9o_1);
        }
        var $this = createThis(this);
        $this.r9b_1 = predictions;
        $this.s9b_1 = trips;
        $this.t9b_1 = vehicles;
        return $this;
      }
    }
    initMetadataForClass($, 'PredictionsStreamDataResponse', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_2});
    PredictionsStreamDataResponseClass = $;
  }
  return PredictionsStreamDataResponseClass;
}
//region block: init
com_mbta_tid_mbta_app_model_response_PredictionsStreamDataResponse_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_PredictionsStreamDataResponse$stable = 8;
//endregion
//region block: exports
export {
  PredictionsStreamDataResponse as PredictionsStreamDataResponsedyjhmd0qdfji,
  $serializer_getInstance_2 as $serializer_getInstance116spp5uj4ju7,
};
//endregion

//# sourceMappingURL=PredictionsStreamDataResponse.mjs.map
