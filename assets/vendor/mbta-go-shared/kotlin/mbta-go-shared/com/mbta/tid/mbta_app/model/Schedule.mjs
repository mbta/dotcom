import { createAnnotatedEnumSerializer20ay4pme9p2h9 as createAnnotatedEnumSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Enums.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  SerializerFactory1qv9hivitncuv as SerializerFactory,
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { Serializer_getInstance1l5ru82blsodh as Serializer_getInstance } from '../utils/EasternTimeInstant.mjs';
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import {
  get_stopTime2bonaxdpa1ssu as get_stopTime,
  stopTimeAfter15191k7ntm3c3 as stopTimeAfter,
  compareTo1lrsc1ydfqdy6 as compareTo,
  TripStopTime3p281vyy0x1rq as TripStopTime,
} from './TripStopTime.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_Schedule_$serializer$stable;
var com_mbta_tid_mbta_app_model_Schedule$stable;
function _get_$cachedSerializer__te6jhj($this) {
  return $this.x9e_1.v1();
}
function Schedule$StopEdgeType$Companion$_anonymous__rv63rd() {
  var tmp = values();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['regular', 'unavailable', 'call_agency', 'coordinate_with_driver'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null, null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.Schedule.StopEdgeType', tmp, tmp_0, tmp$ret$5, null);
}
var StopEdgeType_Regular_instance;
var StopEdgeType_Unavailable_instance;
var StopEdgeType_CallAgency_instance;
var StopEdgeType_CoordinateWithDriver_instance;
function values() {
  return [StopEdgeType_Regular_getInstance(), StopEdgeType_Unavailable_getInstance(), StopEdgeType_CallAgency_getInstance(), StopEdgeType_CoordinateWithDriver_getInstance()];
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.x9e_1 = lazy(tmp_0, Schedule$StopEdgeType$Companion$_anonymous__rv63rd);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
    }
    initMetadataForCompanion($, VOID, [SerializerFactory()]);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  StopEdgeType_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var StopEdgeType_entriesInitialized;
function StopEdgeType_initEntries() {
  if (StopEdgeType_entriesInitialized)
    return Unit_instance;
  StopEdgeType_entriesInitialized = true;
  StopEdgeType_Regular_instance = new (StopEdgeType())('Regular', 0);
  StopEdgeType_Unavailable_instance = new (StopEdgeType())('Unavailable', 1);
  StopEdgeType_CallAgency_instance = new (StopEdgeType())('CallAgency', 2);
  StopEdgeType_CoordinateWithDriver_instance = new (StopEdgeType())('CoordinateWithDriver', 3);
  Companion_getInstance();
}
function Schedule$Companion$$childSerializers$_anonymous__ldkn83() {
  return Companion_getInstance().r1n();
}
function Schedule$Companion$$childSerializers$_anonymous__ldkn83_0() {
  return Companion_getInstance().r1n();
}
var StopEdgeTypeClass;
function StopEdgeType() {
  if (StopEdgeTypeClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'StopEdgeType', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    StopEdgeTypeClass = $;
  }
  return StopEdgeTypeClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, Schedule$Companion$$childSerializers$_anonymous__ldkn83);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.y9e_1 = [null, null, null, tmp_1, lazy(tmp_2, Schedule$Companion$$childSerializers$_anonymous__ldkn83_0), null, null, null, null, null];
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 === VOID)
    new (Companion_0())();
  return Companion_instance_0;
}
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.Schedule', this, 10);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('arrival_time', false);
        tmp0_serialDesc.p1b('departure_time', false);
        tmp0_serialDesc.p1b('drop_off_type', false);
        tmp0_serialDesc.p1b('pick_up_type', false);
        tmp0_serialDesc.p1b('stop_headsign', false);
        tmp0_serialDesc.p1b('stop_sequence', false);
        tmp0_serialDesc.p1b('route_id', false);
        tmp0_serialDesc.p1b('stop_id', false);
        tmp0_serialDesc.p1b('trip_id', false);
        this.z9e_1 = tmp0_serialDesc;
      }
      a9f(encoder, value) {
        var tmp0_desc = this.z9e_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().y9e_1;
        tmp1_output.l15(tmp0_desc, 0, value.b9f_1);
        tmp1_output.p15(tmp0_desc, 1, Serializer_getInstance(), value.c9f_1);
        tmp1_output.p15(tmp0_desc, 2, Serializer_getInstance(), value.d9f_1);
        tmp1_output.n15(tmp0_desc, 3, tmp2_cached[3].v1(), value.e9f_1);
        tmp1_output.n15(tmp0_desc, 4, tmp2_cached[4].v1(), value.f9f_1);
        tmp1_output.p15(tmp0_desc, 5, StringSerializer_getInstance(), value.g9f_1);
        tmp1_output.g15(tmp0_desc, 6, value.h9f_1);
        tmp1_output.l15(tmp0_desc, 7, value.i9f_1);
        tmp1_output.l15(tmp0_desc, 8, value.j9f_1);
        tmp1_output.l15(tmp0_desc, 9, value.k9f_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.a9f(encoder, value instanceof Schedule() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.z9e_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = null;
        var tmp9_local5 = null;
        var tmp10_local6 = 0;
        var tmp11_local7 = null;
        var tmp12_local8 = null;
        var tmp13_local9 = null;
        var tmp14_input = decoder.v13(tmp0_desc);
        var tmp15_cached = Companion_getInstance_0().y9e_1;
        if (tmp14_input.l14()) {
          tmp4_local0 = tmp14_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp14_input.j14(tmp0_desc, 1, Serializer_getInstance(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp14_input.j14(tmp0_desc, 2, Serializer_getInstance(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp14_input.h14(tmp0_desc, 3, tmp15_cached[3].v1(), tmp7_local3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp14_input.h14(tmp0_desc, 4, tmp15_cached[4].v1(), tmp8_local4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp14_input.j14(tmp0_desc, 5, StringSerializer_getInstance(), tmp9_local5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
          tmp10_local6 = tmp14_input.a14(tmp0_desc, 6);
          tmp3_bitMask0 = tmp3_bitMask0 | 64;
          tmp11_local7 = tmp14_input.f14(tmp0_desc, 7);
          tmp3_bitMask0 = tmp3_bitMask0 | 128;
          tmp12_local8 = tmp14_input.f14(tmp0_desc, 8);
          tmp3_bitMask0 = tmp3_bitMask0 | 256;
          tmp13_local9 = tmp14_input.f14(tmp0_desc, 9);
          tmp3_bitMask0 = tmp3_bitMask0 | 512;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp14_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp14_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp14_input.j14(tmp0_desc, 1, Serializer_getInstance(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp14_input.j14(tmp0_desc, 2, Serializer_getInstance(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp14_input.h14(tmp0_desc, 3, tmp15_cached[3].v1(), tmp7_local3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp14_input.h14(tmp0_desc, 4, tmp15_cached[4].v1(), tmp8_local4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp14_input.j14(tmp0_desc, 5, StringSerializer_getInstance(), tmp9_local5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              case 6:
                tmp10_local6 = tmp14_input.a14(tmp0_desc, 6);
                tmp3_bitMask0 = tmp3_bitMask0 | 64;
                break;
              case 7:
                tmp11_local7 = tmp14_input.f14(tmp0_desc, 7);
                tmp3_bitMask0 = tmp3_bitMask0 | 128;
                break;
              case 8:
                tmp12_local8 = tmp14_input.f14(tmp0_desc, 8);
                tmp3_bitMask0 = tmp3_bitMask0 | 256;
                break;
              case 9:
                tmp13_local9 = tmp14_input.f14(tmp0_desc, 9);
                tmp3_bitMask0 = tmp3_bitMask0 | 512;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp14_input.w13(tmp0_desc);
        return Schedule().l9f(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, tmp12_local8, tmp13_local9, null);
      }
      fz() {
        return this.z9e_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_0().y9e_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), get_nullable(Serializer_getInstance()), get_nullable(Serializer_getInstance()), tmp0_cached[3].v1(), tmp0_cached[4].v1(), get_nullable(StringSerializer_getInstance()), IntSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance()];
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
function StopEdgeType_Regular_getInstance() {
  StopEdgeType_initEntries();
  return StopEdgeType_Regular_instance;
}
function StopEdgeType_Unavailable_getInstance() {
  StopEdgeType_initEntries();
  return StopEdgeType_Unavailable_instance;
}
function StopEdgeType_CallAgency_getInstance() {
  StopEdgeType_initEntries();
  return StopEdgeType_CallAgency_instance;
}
function StopEdgeType_CoordinateWithDriver_getInstance() {
  StopEdgeType_initEntries();
  return StopEdgeType_CoordinateWithDriver_instance;
}
var ScheduleClass;
function Schedule() {
  if (ScheduleClass === VOID) {
    class $ {
      t95() {
        return this.c9f_1;
      }
      u95() {
        return this.d9f_1;
      }
      toString() {
        return 'Schedule(id=' + this.b9f_1 + ', arrivalTime=' + toString(this.c9f_1) + ', departureTime=' + toString(this.d9f_1) + ', dropOffType=' + this.e9f_1.toString() + ', pickUpType=' + this.f9f_1.toString() + ', stopHeadsign=' + this.g9f_1 + ', stopSequence=' + this.h9f_1 + ', routeId=' + this.i9f_1 + ', stopId=' + this.j9f_1 + ', tripId=' + this.k9f_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.b9f_1);
        result = imul(result, 31) + (this.c9f_1 == null ? 0 : this.c9f_1.hashCode()) | 0;
        result = imul(result, 31) + (this.d9f_1 == null ? 0 : this.d9f_1.hashCode()) | 0;
        result = imul(result, 31) + this.e9f_1.hashCode() | 0;
        result = imul(result, 31) + this.f9f_1.hashCode() | 0;
        result = imul(result, 31) + (this.g9f_1 == null ? 0 : getStringHashCode(this.g9f_1)) | 0;
        result = imul(result, 31) + this.h9f_1 | 0;
        result = imul(result, 31) + getStringHashCode(this.i9f_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.j9f_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.k9f_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Schedule()))
          return false;
        var tmp0_other_with_cast = other instanceof Schedule() ? other : THROW_CCE();
        if (!(this.b9f_1 === tmp0_other_with_cast.b9f_1))
          return false;
        if (!equals(this.c9f_1, tmp0_other_with_cast.c9f_1))
          return false;
        if (!equals(this.d9f_1, tmp0_other_with_cast.d9f_1))
          return false;
        if (!this.e9f_1.equals(tmp0_other_with_cast.e9f_1))
          return false;
        if (!this.f9f_1.equals(tmp0_other_with_cast.f9f_1))
          return false;
        if (!(this.g9f_1 == tmp0_other_with_cast.g9f_1))
          return false;
        if (!(this.h9f_1 === tmp0_other_with_cast.h9f_1))
          return false;
        if (!(this.i9f_1 === tmp0_other_with_cast.i9f_1))
          return false;
        if (!(this.j9f_1 === tmp0_other_with_cast.j9f_1))
          return false;
        if (!(this.k9f_1 === tmp0_other_with_cast.k9f_1))
          return false;
        return true;
      }
      static l9f(seen0, id, arrivalTime, departureTime, dropOffType, pickUpType, stopHeadsign, stopSequence, routeId, stopId, tripId, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(1023 === (1023 & seen0))) {
          throwMissingFieldException(seen0, 1023, $serializer_getInstance().z9e_1);
        }
        var $this = createThis(this);
        $this.b9f_1 = id;
        $this.c9f_1 = arrivalTime;
        $this.d9f_1 = departureTime;
        $this.e9f_1 = dropOffType;
        $this.f9f_1 = pickUpType;
        $this.g9f_1 = stopHeadsign;
        $this.h9f_1 = stopSequence;
        $this.i9f_1 = routeId;
        $this.j9f_1 = stopId;
        $this.k9f_1 = tripId;
        return $this;
      }
      d(other) {
        return this.y95((!(other == null) ? isInterface(other, TripStopTime()) : false) ? other : THROW_CCE());
      }
    }
    protoOf($).v95 = get_stopTime;
    protoOf($).w95 = stopTimeAfter;
    protoOf($).y95 = compareTo;
    initMetadataForClass($, 'Schedule', VOID, VOID, [TripStopTime()], VOID, VOID, {0: $serializer_getInstance});
    ScheduleClass = $;
  }
  return ScheduleClass;
}
//region block: init
com_mbta_tid_mbta_app_model_Schedule_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_Schedule$stable = 8;
//endregion
//region block: exports
export {
  StopEdgeType_Unavailable_getInstance as StopEdgeType_Unavailable_getInstance3pzdo8pszozo6,
  $serializer_getInstance as $serializer_getInstance3jn5acmdty8at,
};
//endregion

//# sourceMappingURL=Schedule.mjs.map
