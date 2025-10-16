import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { $serializer_getInstanceh32qatkbuui as $serializer_getInstance } from '../Vehicle.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_response_VehicleStreamDataResponse_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_VehicleStreamDataResponse$stable;
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.response.VehicleStreamDataResponse', this, 1);
        tmp0_serialDesc.p1b('vehicle', false);
        this.x9p_1 = tmp0_serialDesc;
      }
      y9p(encoder, value) {
        var tmp0_desc = this.x9p_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.p15(tmp0_desc, 0, $serializer_getInstance(), value.z9p_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.y9p(encoder, value instanceof VehicleStreamDataResponse() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.x9p_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_input = decoder.v13(tmp0_desc);
        if (tmp5_input.l14()) {
          tmp4_local0 = tmp5_input.j14(tmp0_desc, 0, $serializer_getInstance(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp5_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp5_input.j14(tmp0_desc, 0, $serializer_getInstance(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp5_input.w13(tmp0_desc);
        return VehicleStreamDataResponse().a9q(tmp3_bitMask0, tmp4_local0, null);
      }
      fz() {
        return this.x9p_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [get_nullable($serializer_getInstance())];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance_0() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var VehicleStreamDataResponseClass;
function VehicleStreamDataResponse() {
  if (VehicleStreamDataResponseClass === VOID) {
    class $ {
      toString() {
        return 'VehicleStreamDataResponse(vehicle=' + toString(this.z9p_1) + ')';
      }
      hashCode() {
        return this.z9p_1 == null ? 0 : this.z9p_1.hashCode();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof VehicleStreamDataResponse()))
          return false;
        var tmp0_other_with_cast = other instanceof VehicleStreamDataResponse() ? other : THROW_CCE();
        if (!equals(this.z9p_1, tmp0_other_with_cast.z9p_1))
          return false;
        return true;
      }
      static a9q(seen0, vehicle, serializationConstructorMarker) {
        if (!(1 === (1 & seen0))) {
          throwMissingFieldException(seen0, 1, $serializer_getInstance_0().x9p_1);
        }
        var $this = createThis(this);
        $this.z9p_1 = vehicle;
        return $this;
      }
    }
    initMetadataForClass($, 'VehicleStreamDataResponse', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
    VehicleStreamDataResponseClass = $;
  }
  return VehicleStreamDataResponseClass;
}
//region block: init
com_mbta_tid_mbta_app_model_response_VehicleStreamDataResponse_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_VehicleStreamDataResponse$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  VehicleStreamDataResponse as VehicleStreamDataResponse3adnxumyrbh41,
};
//endregion

//# sourceMappingURL=VehicleStreamDataResponse.mjs.map
