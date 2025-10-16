import { Companion_getInstance1l4me3i7xzo7h as Companion_getInstance } from '../response/TripSchedulesResponse.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { $serializer_getInstance26yboyslys3kt as $serializer_getInstance } from '../StopDetailsFilters.mjs';
import { $serializer_getInstancekv1idx7l1joz as $serializer_getInstance_0 } from '../Trip.mjs';
import { $serializer_getInstance116spp5uj4ju7 as $serializer_getInstance_1 } from '../response/PredictionsStreamDataResponse.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { $serializer_getInstanceh32qatkbuui as $serializer_getInstance_2 } from '../Vehicle.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import { BooleanSerializer_getInstance1t8habeqgiyq1 as BooleanSerializer_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  hashCodeq5arwsb9dgti as hashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_stopDetailsPage_TripData_$serializer$stable;
var com_mbta_tid_mbta_app_model_stopDetailsPage_TripData$stable;
function TripData$Companion$$childSerializers$_anonymous__4n1waj() {
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
        tmp.p9q_1 = [null, null, lazy(tmp_0, TripData$Companion$$childSerializers$_anonymous__4n1waj), null, null, null];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.stopDetailsPage.TripData', this, 6);
        tmp0_serialDesc.p1b('tripFilter', false);
        tmp0_serialDesc.p1b('trip', false);
        tmp0_serialDesc.p1b('tripSchedules', false);
        tmp0_serialDesc.p1b('tripPredictions', false);
        tmp0_serialDesc.p1b('tripPredictionsLoaded', true);
        tmp0_serialDesc.p1b('vehicle', false);
        this.q9q_1 = tmp0_serialDesc;
      }
      r9q(encoder, value) {
        var tmp0_desc = this.q9q_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().p9q_1;
        tmp1_output.n15(tmp0_desc, 0, $serializer_getInstance(), value.s9q_1);
        tmp1_output.n15(tmp0_desc, 1, $serializer_getInstance_0(), value.t9q_1);
        tmp1_output.p15(tmp0_desc, 2, tmp2_cached[2].v1(), value.u9q_1);
        tmp1_output.p15(tmp0_desc, 3, $serializer_getInstance_1(), value.v9q_1);
        if (tmp1_output.t15(tmp0_desc, 4) ? true : !(value.w9q_1 === false)) {
          tmp1_output.d15(tmp0_desc, 4, value.w9q_1);
        }
        tmp1_output.p15(tmp0_desc, 5, $serializer_getInstance_2(), value.x9q_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.r9q(encoder, value instanceof TripData() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.q9q_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = false;
        var tmp9_local5 = null;
        var tmp10_input = decoder.v13(tmp0_desc);
        var tmp11_cached = Companion_getInstance_0().p9q_1;
        if (tmp10_input.l14()) {
          tmp4_local0 = tmp10_input.h14(tmp0_desc, 0, $serializer_getInstance(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp10_input.h14(tmp0_desc, 1, $serializer_getInstance_0(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp10_input.j14(tmp0_desc, 2, tmp11_cached[2].v1(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp10_input.j14(tmp0_desc, 3, $serializer_getInstance_1(), tmp7_local3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp10_input.x13(tmp0_desc, 4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp10_input.j14(tmp0_desc, 5, $serializer_getInstance_2(), tmp9_local5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp10_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp10_input.h14(tmp0_desc, 0, $serializer_getInstance(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp10_input.h14(tmp0_desc, 1, $serializer_getInstance_0(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp10_input.j14(tmp0_desc, 2, tmp11_cached[2].v1(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp10_input.j14(tmp0_desc, 3, $serializer_getInstance_1(), tmp7_local3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp10_input.x13(tmp0_desc, 4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp10_input.j14(tmp0_desc, 5, $serializer_getInstance_2(), tmp9_local5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp10_input.w13(tmp0_desc);
        return TripData().y9q(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, null);
      }
      fz() {
        return this.q9q_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_0().p9q_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [$serializer_getInstance(), $serializer_getInstance_0(), get_nullable(tmp0_cached[2].v1()), get_nullable($serializer_getInstance_1()), BooleanSerializer_getInstance(), get_nullable($serializer_getInstance_2())];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance_3() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var TripDataClass;
function TripData() {
  if (TripDataClass === VOID) {
    class $ {
      constructor(tripFilter, trip, tripSchedules, tripPredictions, tripPredictionsLoaded, vehicle) {
        Companion_getInstance_0();
        tripPredictionsLoaded = tripPredictionsLoaded === VOID ? false : tripPredictionsLoaded;
        this.s9q_1 = tripFilter;
        this.t9q_1 = trip;
        this.u9q_1 = tripSchedules;
        this.v9q_1 = tripPredictions;
        this.w9q_1 = tripPredictionsLoaded;
        this.x9q_1 = vehicle;
      }
      toString() {
        return 'TripData(tripFilter=' + this.s9q_1.toString() + ', trip=' + this.t9q_1.toString() + ', tripSchedules=' + toString(this.u9q_1) + ', tripPredictions=' + toString(this.v9q_1) + ', tripPredictionsLoaded=' + this.w9q_1 + ', vehicle=' + toString(this.x9q_1) + ')';
      }
      hashCode() {
        var result = this.s9q_1.hashCode();
        result = imul(result, 31) + this.t9q_1.hashCode() | 0;
        result = imul(result, 31) + (this.u9q_1 == null ? 0 : hashCode(this.u9q_1)) | 0;
        result = imul(result, 31) + (this.v9q_1 == null ? 0 : this.v9q_1.hashCode()) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.w9q_1) | 0;
        result = imul(result, 31) + (this.x9q_1 == null ? 0 : this.x9q_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TripData()))
          return false;
        var tmp0_other_with_cast = other instanceof TripData() ? other : THROW_CCE();
        if (!this.s9q_1.equals(tmp0_other_with_cast.s9q_1))
          return false;
        if (!this.t9q_1.equals(tmp0_other_with_cast.t9q_1))
          return false;
        if (!equals(this.u9q_1, tmp0_other_with_cast.u9q_1))
          return false;
        if (!equals(this.v9q_1, tmp0_other_with_cast.v9q_1))
          return false;
        if (!(this.w9q_1 === tmp0_other_with_cast.w9q_1))
          return false;
        if (!equals(this.x9q_1, tmp0_other_with_cast.x9q_1))
          return false;
        return true;
      }
      static y9q(seen0, tripFilter, trip, tripSchedules, tripPredictions, tripPredictionsLoaded, vehicle, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(47 === (47 & seen0))) {
          throwMissingFieldException(seen0, 47, $serializer_getInstance_3().q9q_1);
        }
        var $this = createThis(this);
        $this.s9q_1 = tripFilter;
        $this.t9q_1 = trip;
        $this.u9q_1 = tripSchedules;
        $this.v9q_1 = tripPredictions;
        if (0 === (seen0 & 16))
          $this.w9q_1 = false;
        else
          $this.w9q_1 = tripPredictionsLoaded;
        $this.x9q_1 = vehicle;
        return $this;
      }
    }
    initMetadataForClass($, 'TripData', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_3});
    TripDataClass = $;
  }
  return TripDataClass;
}
//region block: init
com_mbta_tid_mbta_app_model_stopDetailsPage_TripData_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_stopDetailsPage_TripData$stable = 8;
//endregion
//region block: exports
export {
  TripData as TripData1ibdueofpgzgt,
};
//endregion

//# sourceMappingURL=TripData.mjs.map
