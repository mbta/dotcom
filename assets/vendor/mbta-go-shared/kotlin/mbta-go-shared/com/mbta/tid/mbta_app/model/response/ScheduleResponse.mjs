import { $serializer_getInstance3jn5acmdty8at as $serializer_getInstance } from '../Schedule.mjs';
import {
  ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer,
  LinkedHashMapSerializermaoj2nyji7op as LinkedHashMapSerializer,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { $serializer_getInstancekv1idx7l1joz as $serializer_getInstance_0 } from '../Trip.mjs';
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
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_response_ScheduleResponse_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_ScheduleResponse$stable;
function ScheduleResponse$Companion$$childSerializers$_anonymous__v3pxyq() {
  return new (ArrayListSerializer())($serializer_getInstance());
}
function ScheduleResponse$Companion$$childSerializers$_anonymous__v3pxyq_0() {
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
        var tmp_1 = lazy(tmp_0, ScheduleResponse$Companion$$childSerializers$_anonymous__v3pxyq);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.w9o_1 = [tmp_1, lazy(tmp_2, ScheduleResponse$Companion$$childSerializers$_anonymous__v3pxyq_0)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.response.ScheduleResponse', this, 2);
        tmp0_serialDesc.p1b('schedules', false);
        tmp0_serialDesc.p1b('trips', false);
        this.x9o_1 = tmp0_serialDesc;
      }
      y9o(encoder, value) {
        var tmp0_desc = this.x9o_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().w9o_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.p9b_1);
        tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.q9b_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.y9o(encoder, value instanceof ScheduleResponse() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.x9o_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        var tmp7_cached = Companion_getInstance().w9o_1;
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
        return ScheduleResponse().z9o(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.x9o_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().w9o_1;
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
var ScheduleResponseClass;
function ScheduleResponse() {
  if (ScheduleResponseClass === VOID) {
    class $ {
      constructor(schedules, trips) {
        Companion_getInstance();
        this.p9b_1 = schedules;
        this.q9b_1 = trips;
      }
      v9b() {
        var scheduledTrips = this.q9b_1;
        // Inline function 'kotlin.collections.mutableMapOf' call
        var hasSchedules = LinkedHashMap().sc();
        var _iterator__ex2g4s = this.p9b_1.x();
        $l$loop: while (_iterator__ex2g4s.y()) {
          var schedule = _iterator__ex2g4s.z();
          var trip = scheduledTrips.j3(schedule.k9f_1);
          var tmp1_elvis_lhs = trip == null ? null : trip.s8t_1;
          var tmp;
          if (tmp1_elvis_lhs == null) {
            continue $l$loop;
          } else {
            tmp = tmp1_elvis_lhs;
          }
          var patternId = tmp;
          // Inline function 'kotlin.collections.set' call
          hasSchedules.t3(patternId, true);
        }
        return hasSchedules;
      }
      toString() {
        return '[ScheduleResponse]';
      }
      hashCode() {
        var result = hashCode(this.p9b_1);
        result = imul(result, 31) + hashCode(this.q9b_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ScheduleResponse()))
          return false;
        var tmp0_other_with_cast = other instanceof ScheduleResponse() ? other : THROW_CCE();
        if (!equals(this.p9b_1, tmp0_other_with_cast.p9b_1))
          return false;
        if (!equals(this.q9b_1, tmp0_other_with_cast.q9b_1))
          return false;
        return true;
      }
      static z9o(seen0, schedules, trips, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(3 === (3 & seen0))) {
          throwMissingFieldException(seen0, 3, $serializer_getInstance_1().x9o_1);
        }
        var $this = createThis(this);
        $this.p9b_1 = schedules;
        $this.q9b_1 = trips;
        return $this;
      }
    }
    initMetadataForClass($, 'ScheduleResponse', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_1});
    ScheduleResponseClass = $;
  }
  return ScheduleResponseClass;
}
//region block: init
com_mbta_tid_mbta_app_model_response_ScheduleResponse_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_ScheduleResponse$stable = 8;
//endregion
//region block: exports
export {
  ScheduleResponse as ScheduleResponse3fcyp336niye,
};
//endregion

//# sourceMappingURL=ScheduleResponse.mjs.map
