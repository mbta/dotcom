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
  BooleanSerializer_getInstance1t8habeqgiyq1 as BooleanSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import {
  get_stopTime2bonaxdpa1ssu as get_stopTime,
  stopTimeAfter15191k7ntm3c3 as stopTimeAfter,
  hasArrivedButNotDeparted1kdg27h8y55if as hasArrivedButNotDeparted,
  compareTo1lrsc1ydfqdy6 as compareTo,
  TripStopTime3p281vyy0x1rq as TripStopTime,
} from './TripStopTime.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance,
  toDuration7gy6v749ektt as toDuration,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import {
  DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance,
  DurationUnit_MINUTES_getInstancejlptjvjgjkm8 as DurationUnit_MINUTES_getInstance,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_ARRIVAL_CUTOFF() {
  _init_properties_Prediction_kt__plv17z();
  return ARRIVAL_CUTOFF;
}
var ARRIVAL_CUTOFF;
function get_APPROACH_CUTOFF() {
  _init_properties_Prediction_kt__plv17z();
  return APPROACH_CUTOFF;
}
var APPROACH_CUTOFF;
function get_BOARDING_CUTOFF() {
  _init_properties_Prediction_kt__plv17z();
  return BOARDING_CUTOFF;
}
var BOARDING_CUTOFF;
function get_SCHEDULE_CLOCK_CUTOFF() {
  _init_properties_Prediction_kt__plv17z();
  return SCHEDULE_CLOCK_CUTOFF;
}
var SCHEDULE_CLOCK_CUTOFF;
var com_mbta_tid_mbta_app_model_Prediction_$serializer$stable;
var com_mbta_tid_mbta_app_model_Prediction$stable;
function _get_$cachedSerializer__te6jhj($this) {
  return $this.c95_1.v1();
}
function Prediction$ScheduleRelationship$Companion$_anonymous__joi6yd() {
  var tmp = values();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['added', 'cancelled', 'no_data', 'skipped', 'unscheduled', 'scheduled'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null, null, null, null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.Prediction.ScheduleRelationship', tmp, tmp_0, tmp$ret$5, null);
}
var ScheduleRelationship_Added_instance;
var ScheduleRelationship_Cancelled_instance;
var ScheduleRelationship_NoData_instance;
var ScheduleRelationship_Skipped_instance;
var ScheduleRelationship_Unscheduled_instance;
var ScheduleRelationship_Scheduled_instance;
function values() {
  return [ScheduleRelationship_Added_getInstance(), ScheduleRelationship_Cancelled_getInstance(), ScheduleRelationship_NoData_getInstance(), ScheduleRelationship_Skipped_getInstance(), ScheduleRelationship_Unscheduled_getInstance(), ScheduleRelationship_Scheduled_getInstance()];
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.c95_1 = lazy(tmp_0, Prediction$ScheduleRelationship$Companion$_anonymous__joi6yd);
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
function Companion_getInstance_0() {
  ScheduleRelationship_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var ScheduleRelationship_entriesInitialized;
function ScheduleRelationship_initEntries() {
  if (ScheduleRelationship_entriesInitialized)
    return Unit_instance;
  ScheduleRelationship_entriesInitialized = true;
  ScheduleRelationship_Added_instance = new (ScheduleRelationship())('Added', 0);
  ScheduleRelationship_Cancelled_instance = new (ScheduleRelationship())('Cancelled', 1);
  ScheduleRelationship_NoData_instance = new (ScheduleRelationship())('NoData', 2);
  ScheduleRelationship_Skipped_instance = new (ScheduleRelationship())('Skipped', 3);
  ScheduleRelationship_Unscheduled_instance = new (ScheduleRelationship())('Unscheduled', 4);
  ScheduleRelationship_Scheduled_instance = new (ScheduleRelationship())('Scheduled', 5);
  Companion_getInstance_0();
}
function Prediction$Companion$$childSerializers$_anonymous__y7j1jv() {
  return Companion_getInstance_0().r1n();
}
var ScheduleRelationshipClass;
function ScheduleRelationship() {
  if (ScheduleRelationshipClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'ScheduleRelationship', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_0});
    ScheduleRelationshipClass = $;
  }
  return ScheduleRelationshipClass;
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
        tmp.d95_1 = [null, null, null, null, null, lazy(tmp_0, Prediction$Companion$$childSerializers$_anonymous__y7j1jv), null, null, null, null, null, null];
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
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.Prediction', this, 12);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('arrival_time', false);
        tmp0_serialDesc.p1b('departure_time', false);
        tmp0_serialDesc.p1b('direction_id', false);
        tmp0_serialDesc.p1b('revenue', false);
        tmp0_serialDesc.p1b('schedule_relationship', false);
        tmp0_serialDesc.p1b('status', false);
        tmp0_serialDesc.p1b('stop_sequence', false);
        tmp0_serialDesc.p1b('route_id', false);
        tmp0_serialDesc.p1b('stop_id', false);
        tmp0_serialDesc.p1b('trip_id', false);
        tmp0_serialDesc.p1b('vehicle_id', false);
        this.e95_1 = tmp0_serialDesc;
      }
      f95(encoder, value) {
        var tmp0_desc = this.e95_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_1().d95_1;
        tmp1_output.l15(tmp0_desc, 0, value.g95_1);
        tmp1_output.p15(tmp0_desc, 1, Serializer_getInstance(), value.h95_1);
        tmp1_output.p15(tmp0_desc, 2, Serializer_getInstance(), value.i95_1);
        tmp1_output.g15(tmp0_desc, 3, value.j95_1);
        tmp1_output.d15(tmp0_desc, 4, value.k95_1);
        tmp1_output.n15(tmp0_desc, 5, tmp2_cached[5].v1(), value.l95_1);
        tmp1_output.p15(tmp0_desc, 6, StringSerializer_getInstance(), value.m95_1);
        tmp1_output.g15(tmp0_desc, 7, value.n95_1);
        tmp1_output.l15(tmp0_desc, 8, value.o95_1);
        tmp1_output.l15(tmp0_desc, 9, value.p95_1);
        tmp1_output.l15(tmp0_desc, 10, value.q95_1);
        tmp1_output.p15(tmp0_desc, 11, StringSerializer_getInstance(), value.r95_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.f95(encoder, value instanceof Prediction() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.e95_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = 0;
        var tmp8_local4 = false;
        var tmp9_local5 = null;
        var tmp10_local6 = null;
        var tmp11_local7 = 0;
        var tmp12_local8 = null;
        var tmp13_local9 = null;
        var tmp14_local10 = null;
        var tmp15_local11 = null;
        var tmp16_input = decoder.v13(tmp0_desc);
        var tmp17_cached = Companion_getInstance_1().d95_1;
        if (tmp16_input.l14()) {
          tmp4_local0 = tmp16_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp16_input.j14(tmp0_desc, 1, Serializer_getInstance(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp16_input.j14(tmp0_desc, 2, Serializer_getInstance(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp16_input.a14(tmp0_desc, 3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp16_input.x13(tmp0_desc, 4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp16_input.h14(tmp0_desc, 5, tmp17_cached[5].v1(), tmp9_local5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
          tmp10_local6 = tmp16_input.j14(tmp0_desc, 6, StringSerializer_getInstance(), tmp10_local6);
          tmp3_bitMask0 = tmp3_bitMask0 | 64;
          tmp11_local7 = tmp16_input.a14(tmp0_desc, 7);
          tmp3_bitMask0 = tmp3_bitMask0 | 128;
          tmp12_local8 = tmp16_input.f14(tmp0_desc, 8);
          tmp3_bitMask0 = tmp3_bitMask0 | 256;
          tmp13_local9 = tmp16_input.f14(tmp0_desc, 9);
          tmp3_bitMask0 = tmp3_bitMask0 | 512;
          tmp14_local10 = tmp16_input.f14(tmp0_desc, 10);
          tmp3_bitMask0 = tmp3_bitMask0 | 1024;
          tmp15_local11 = tmp16_input.j14(tmp0_desc, 11, StringSerializer_getInstance(), tmp15_local11);
          tmp3_bitMask0 = tmp3_bitMask0 | 2048;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp16_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp16_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp16_input.j14(tmp0_desc, 1, Serializer_getInstance(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp16_input.j14(tmp0_desc, 2, Serializer_getInstance(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp16_input.a14(tmp0_desc, 3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp16_input.x13(tmp0_desc, 4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp16_input.h14(tmp0_desc, 5, tmp17_cached[5].v1(), tmp9_local5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              case 6:
                tmp10_local6 = tmp16_input.j14(tmp0_desc, 6, StringSerializer_getInstance(), tmp10_local6);
                tmp3_bitMask0 = tmp3_bitMask0 | 64;
                break;
              case 7:
                tmp11_local7 = tmp16_input.a14(tmp0_desc, 7);
                tmp3_bitMask0 = tmp3_bitMask0 | 128;
                break;
              case 8:
                tmp12_local8 = tmp16_input.f14(tmp0_desc, 8);
                tmp3_bitMask0 = tmp3_bitMask0 | 256;
                break;
              case 9:
                tmp13_local9 = tmp16_input.f14(tmp0_desc, 9);
                tmp3_bitMask0 = tmp3_bitMask0 | 512;
                break;
              case 10:
                tmp14_local10 = tmp16_input.f14(tmp0_desc, 10);
                tmp3_bitMask0 = tmp3_bitMask0 | 1024;
                break;
              case 11:
                tmp15_local11 = tmp16_input.j14(tmp0_desc, 11, StringSerializer_getInstance(), tmp15_local11);
                tmp3_bitMask0 = tmp3_bitMask0 | 2048;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp16_input.w13(tmp0_desc);
        return Prediction().s95(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, tmp12_local8, tmp13_local9, tmp14_local10, tmp15_local11, null);
      }
      fz() {
        return this.e95_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_1().d95_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), get_nullable(Serializer_getInstance()), get_nullable(Serializer_getInstance()), IntSerializer_getInstance(), BooleanSerializer_getInstance(), tmp0_cached[5].v1(), get_nullable(StringSerializer_getInstance()), IntSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance())];
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
function ScheduleRelationship_Added_getInstance() {
  ScheduleRelationship_initEntries();
  return ScheduleRelationship_Added_instance;
}
function ScheduleRelationship_Cancelled_getInstance() {
  ScheduleRelationship_initEntries();
  return ScheduleRelationship_Cancelled_instance;
}
function ScheduleRelationship_NoData_getInstance() {
  ScheduleRelationship_initEntries();
  return ScheduleRelationship_NoData_instance;
}
function ScheduleRelationship_Skipped_getInstance() {
  ScheduleRelationship_initEntries();
  return ScheduleRelationship_Skipped_instance;
}
function ScheduleRelationship_Unscheduled_getInstance() {
  ScheduleRelationship_initEntries();
  return ScheduleRelationship_Unscheduled_instance;
}
function ScheduleRelationship_Scheduled_getInstance() {
  ScheduleRelationship_initEntries();
  return ScheduleRelationship_Scheduled_instance;
}
var PredictionClass;
function Prediction() {
  if (PredictionClass === VOID) {
    class $ {
      t95() {
        return this.h95_1;
      }
      u95() {
        return this.i95_1;
      }
      toString() {
        return 'Prediction(id=' + this.g95_1 + ', arrivalTime=' + toString(this.h95_1) + ', departureTime=' + toString(this.i95_1) + ', directionId=' + this.j95_1 + ', revenue=' + this.k95_1 + ', scheduleRelationship=' + this.l95_1.toString() + ', status=' + this.m95_1 + ', stopSequence=' + this.n95_1 + ', routeId=' + this.o95_1 + ', stopId=' + this.p95_1 + ', tripId=' + this.q95_1 + ', vehicleId=' + this.r95_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.g95_1);
        result = imul(result, 31) + (this.h95_1 == null ? 0 : this.h95_1.hashCode()) | 0;
        result = imul(result, 31) + (this.i95_1 == null ? 0 : this.i95_1.hashCode()) | 0;
        result = imul(result, 31) + this.j95_1 | 0;
        result = imul(result, 31) + getBooleanHashCode(this.k95_1) | 0;
        result = imul(result, 31) + this.l95_1.hashCode() | 0;
        result = imul(result, 31) + (this.m95_1 == null ? 0 : getStringHashCode(this.m95_1)) | 0;
        result = imul(result, 31) + this.n95_1 | 0;
        result = imul(result, 31) + getStringHashCode(this.o95_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.p95_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.q95_1) | 0;
        result = imul(result, 31) + (this.r95_1 == null ? 0 : getStringHashCode(this.r95_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Prediction()))
          return false;
        var tmp0_other_with_cast = other instanceof Prediction() ? other : THROW_CCE();
        if (!(this.g95_1 === tmp0_other_with_cast.g95_1))
          return false;
        if (!equals(this.h95_1, tmp0_other_with_cast.h95_1))
          return false;
        if (!equals(this.i95_1, tmp0_other_with_cast.i95_1))
          return false;
        if (!(this.j95_1 === tmp0_other_with_cast.j95_1))
          return false;
        if (!(this.k95_1 === tmp0_other_with_cast.k95_1))
          return false;
        if (!this.l95_1.equals(tmp0_other_with_cast.l95_1))
          return false;
        if (!(this.m95_1 == tmp0_other_with_cast.m95_1))
          return false;
        if (!(this.n95_1 === tmp0_other_with_cast.n95_1))
          return false;
        if (!(this.o95_1 === tmp0_other_with_cast.o95_1))
          return false;
        if (!(this.p95_1 === tmp0_other_with_cast.p95_1))
          return false;
        if (!(this.q95_1 === tmp0_other_with_cast.q95_1))
          return false;
        if (!(this.r95_1 == tmp0_other_with_cast.r95_1))
          return false;
        return true;
      }
      static s95(seen0, id, arrivalTime, departureTime, directionId, revenue, scheduleRelationship, status, stopSequence, routeId, stopId, tripId, vehicleId, serializationConstructorMarker) {
        Companion_getInstance_1();
        if (!(4095 === (4095 & seen0))) {
          throwMissingFieldException(seen0, 4095, $serializer_getInstance().e95_1);
        }
        var $this = createThis(this);
        $this.g95_1 = id;
        $this.h95_1 = arrivalTime;
        $this.i95_1 = departureTime;
        $this.j95_1 = directionId;
        $this.k95_1 = revenue;
        $this.l95_1 = scheduleRelationship;
        $this.m95_1 = status;
        $this.n95_1 = stopSequence;
        $this.o95_1 = routeId;
        $this.p95_1 = stopId;
        $this.q95_1 = tripId;
        $this.r95_1 = vehicleId;
        return $this;
      }
      d(other) {
        return this.y95((!(other == null) ? isInterface(other, TripStopTime()) : false) ? other : THROW_CCE());
      }
    }
    protoOf($).v95 = get_stopTime;
    protoOf($).w95 = stopTimeAfter;
    protoOf($).x95 = hasArrivedButNotDeparted;
    protoOf($).y95 = compareTo;
    initMetadataForClass($, 'Prediction', VOID, VOID, [TripStopTime()], VOID, VOID, {0: $serializer_getInstance});
    PredictionClass = $;
  }
  return PredictionClass;
}
var properties_initialized_Prediction_kt_kamozz;
function _init_properties_Prediction_kt__plv17z() {
  if (!properties_initialized_Prediction_kt_kamozz) {
    properties_initialized_Prediction_kt_kamozz = true;
    // Inline function 'kotlin.time.Companion.seconds' call
    Companion_getInstance();
    ARRIVAL_CUTOFF = toDuration(30, DurationUnit_SECONDS_getInstance());
    // Inline function 'kotlin.time.Companion.seconds' call
    Companion_getInstance();
    APPROACH_CUTOFF = toDuration(60, DurationUnit_SECONDS_getInstance());
    // Inline function 'kotlin.time.Companion.seconds' call
    Companion_getInstance();
    BOARDING_CUTOFF = toDuration(90, DurationUnit_SECONDS_getInstance());
    // Inline function 'kotlin.time.Companion.minutes' call
    Companion_getInstance();
    SCHEDULE_CLOCK_CUTOFF = toDuration(60, DurationUnit_MINUTES_getInstance());
    com_mbta_tid_mbta_app_model_Prediction_$serializer$stable = 8;
    com_mbta_tid_mbta_app_model_Prediction$stable = 8;
  }
}
//region block: exports
export {
  get_APPROACH_CUTOFF as get_APPROACH_CUTOFF2jusrpzx3r4vs,
  get_ARRIVAL_CUTOFF as get_ARRIVAL_CUTOFF1p3vhejkg7kx2,
  get_BOARDING_CUTOFF as get_BOARDING_CUTOFFjt2hwbdoze6x,
  get_SCHEDULE_CLOCK_CUTOFF as get_SCHEDULE_CLOCK_CUTOFF20l46eoxwx97l,
  ScheduleRelationship_Cancelled_getInstance as ScheduleRelationship_Cancelled_getInstance3gcqjojivixxs,
  ScheduleRelationship_Skipped_getInstance as ScheduleRelationship_Skipped_getInstanceiclzjn4iwm8y,
  $serializer_getInstance as $serializer_getInstance2h4hs9jntxuz4,
};
//endregion

//# sourceMappingURL=Prediction.mjs.map
