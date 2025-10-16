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
import {
  DoubleSerializer_getInstance3da4hv5ndgjlx as DoubleSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { Serializer_getInstance1l5ru82blsodh as Serializer_getInstance } from '../utils/EasternTimeInstant.mjs';
import { Position2rurtvk7dypvc as Position } from '../../../../../../spatial-k-geojson/io/github/dellisd/spatialk/geojson/Position.mjs';
import { PositionSerializer_instance3ntez750wdkar as PositionSerializer_instance } from '../../../../../../spatial-k-geojson/io/github/dellisd/spatialk/geojson/serialization/PositionSerializer.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { getNumberHashCode2l4nbdcihl25f as getNumberHashCode } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/bitUtils.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_Vehicle_$serializer$stable;
var com_mbta_tid_mbta_app_model_Vehicle$stable;
function _get_$cachedSerializer__te6jhj($this) {
  return $this.u9m_1.v1();
}
function Vehicle$CurrentStatus$Companion$_anonymous__x3kppg() {
  var tmp = values();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['incoming_at', 'stopped_at', 'in_transit_to'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.Vehicle.CurrentStatus', tmp, tmp_0, tmp$ret$5, null);
}
var CurrentStatus_IncomingAt_instance;
var CurrentStatus_StoppedAt_instance;
var CurrentStatus_InTransitTo_instance;
function values() {
  return [CurrentStatus_IncomingAt_getInstance(), CurrentStatus_StoppedAt_getInstance(), CurrentStatus_InTransitTo_getInstance()];
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.u9m_1 = lazy(tmp_0, Vehicle$CurrentStatus$Companion$_anonymous__x3kppg);
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
  CurrentStatus_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var CurrentStatus_entriesInitialized;
function CurrentStatus_initEntries() {
  if (CurrentStatus_entriesInitialized)
    return Unit_instance;
  CurrentStatus_entriesInitialized = true;
  CurrentStatus_IncomingAt_instance = new (CurrentStatus())('IncomingAt', 0);
  CurrentStatus_StoppedAt_instance = new (CurrentStatus())('StoppedAt', 1);
  CurrentStatus_InTransitTo_instance = new (CurrentStatus())('InTransitTo', 2);
  Companion_getInstance();
}
function Vehicle$Companion$$childSerializers$_anonymous__mwmd36() {
  return Companion_getInstance().r1n();
}
var CurrentStatusClass;
function CurrentStatus() {
  if (CurrentStatusClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'CurrentStatus', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    CurrentStatusClass = $;
  }
  return CurrentStatusClass;
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
        tmp.v9m_1 = [null, null, lazy(tmp_0, Vehicle$Companion$$childSerializers$_anonymous__mwmd36), null, null, null, null, null, null, null, null, null];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.Vehicle', this, 12);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('bearing', false);
        tmp0_serialDesc.p1b('current_status', false);
        tmp0_serialDesc.p1b('current_stop_sequence', false);
        tmp0_serialDesc.p1b('direction_id', false);
        tmp0_serialDesc.p1b('latitude', false);
        tmp0_serialDesc.p1b('longitude', false);
        tmp0_serialDesc.p1b('updated_at', false);
        tmp0_serialDesc.p1b('route_id', false);
        tmp0_serialDesc.p1b('stop_id', false);
        tmp0_serialDesc.p1b('trip_id', false);
        tmp0_serialDesc.p1b('position', true);
        this.w9m_1 = tmp0_serialDesc;
      }
      x9m(encoder, value) {
        var tmp0_desc = this.w9m_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().v9m_1;
        tmp1_output.l15(tmp0_desc, 0, value.j9h_1);
        tmp1_output.p15(tmp0_desc, 1, DoubleSerializer_getInstance(), value.k9h_1);
        tmp1_output.n15(tmp0_desc, 2, tmp2_cached[2].v1(), value.l9h_1);
        tmp1_output.p15(tmp0_desc, 3, IntSerializer_getInstance(), value.m9h_1);
        tmp1_output.g15(tmp0_desc, 4, value.n9h_1);
        tmp1_output.j15(tmp0_desc, 5, value.o9h_1);
        tmp1_output.j15(tmp0_desc, 6, value.p9h_1);
        tmp1_output.n15(tmp0_desc, 7, Serializer_getInstance(), value.q9h_1);
        tmp1_output.p15(tmp0_desc, 8, StringSerializer_getInstance(), value.r9h_1);
        tmp1_output.p15(tmp0_desc, 9, StringSerializer_getInstance(), value.s9h_1);
        tmp1_output.p15(tmp0_desc, 10, StringSerializer_getInstance(), value.t9h_1);
        var tmp;
        if (tmp1_output.t15(tmp0_desc, 11)) {
          tmp = true;
        } else {
          var tmp0_latitude = value.o9h_1;
          var tmp1_longitude = value.p9h_1;
          tmp = !value.u9h_1.equals(Position().v1x(tmp1_longitude, tmp0_latitude));
        }
        if (tmp) {
          tmp1_output.n15(tmp0_desc, 11, PositionSerializer_instance, value.u9h_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.x9m(encoder, value instanceof Vehicle() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.w9m_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = 0;
        var tmp9_local5 = 0.0;
        var tmp10_local6 = 0.0;
        var tmp11_local7 = null;
        var tmp12_local8 = null;
        var tmp13_local9 = null;
        var tmp14_local10 = null;
        var tmp15_local11 = null;
        var tmp16_input = decoder.v13(tmp0_desc);
        var tmp17_cached = Companion_getInstance_0().v9m_1;
        if (tmp16_input.l14()) {
          tmp4_local0 = tmp16_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp16_input.j14(tmp0_desc, 1, DoubleSerializer_getInstance(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp16_input.h14(tmp0_desc, 2, tmp17_cached[2].v1(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp16_input.j14(tmp0_desc, 3, IntSerializer_getInstance(), tmp7_local3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp16_input.a14(tmp0_desc, 4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp16_input.d14(tmp0_desc, 5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
          tmp10_local6 = tmp16_input.d14(tmp0_desc, 6);
          tmp3_bitMask0 = tmp3_bitMask0 | 64;
          tmp11_local7 = tmp16_input.h14(tmp0_desc, 7, Serializer_getInstance(), tmp11_local7);
          tmp3_bitMask0 = tmp3_bitMask0 | 128;
          tmp12_local8 = tmp16_input.j14(tmp0_desc, 8, StringSerializer_getInstance(), tmp12_local8);
          tmp3_bitMask0 = tmp3_bitMask0 | 256;
          tmp13_local9 = tmp16_input.j14(tmp0_desc, 9, StringSerializer_getInstance(), tmp13_local9);
          tmp3_bitMask0 = tmp3_bitMask0 | 512;
          tmp14_local10 = tmp16_input.j14(tmp0_desc, 10, StringSerializer_getInstance(), tmp14_local10);
          tmp3_bitMask0 = tmp3_bitMask0 | 1024;
          tmp15_local11 = tmp16_input.h14(tmp0_desc, 11, PositionSerializer_instance, tmp15_local11);
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
                tmp5_local1 = tmp16_input.j14(tmp0_desc, 1, DoubleSerializer_getInstance(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp16_input.h14(tmp0_desc, 2, tmp17_cached[2].v1(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp16_input.j14(tmp0_desc, 3, IntSerializer_getInstance(), tmp7_local3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp16_input.a14(tmp0_desc, 4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp16_input.d14(tmp0_desc, 5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              case 6:
                tmp10_local6 = tmp16_input.d14(tmp0_desc, 6);
                tmp3_bitMask0 = tmp3_bitMask0 | 64;
                break;
              case 7:
                tmp11_local7 = tmp16_input.h14(tmp0_desc, 7, Serializer_getInstance(), tmp11_local7);
                tmp3_bitMask0 = tmp3_bitMask0 | 128;
                break;
              case 8:
                tmp12_local8 = tmp16_input.j14(tmp0_desc, 8, StringSerializer_getInstance(), tmp12_local8);
                tmp3_bitMask0 = tmp3_bitMask0 | 256;
                break;
              case 9:
                tmp13_local9 = tmp16_input.j14(tmp0_desc, 9, StringSerializer_getInstance(), tmp13_local9);
                tmp3_bitMask0 = tmp3_bitMask0 | 512;
                break;
              case 10:
                tmp14_local10 = tmp16_input.j14(tmp0_desc, 10, StringSerializer_getInstance(), tmp14_local10);
                tmp3_bitMask0 = tmp3_bitMask0 | 1024;
                break;
              case 11:
                tmp15_local11 = tmp16_input.h14(tmp0_desc, 11, PositionSerializer_instance, tmp15_local11);
                tmp3_bitMask0 = tmp3_bitMask0 | 2048;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp16_input.w13(tmp0_desc);
        return Vehicle().y9m(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, tmp12_local8, tmp13_local9, tmp14_local10, tmp15_local11, null);
      }
      fz() {
        return this.w9m_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_0().v9m_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), get_nullable(DoubleSerializer_getInstance()), tmp0_cached[2].v1(), get_nullable(IntSerializer_getInstance()), IntSerializer_getInstance(), DoubleSerializer_getInstance(), DoubleSerializer_getInstance(), Serializer_getInstance(), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), PositionSerializer_instance];
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
function CurrentStatus_IncomingAt_getInstance() {
  CurrentStatus_initEntries();
  return CurrentStatus_IncomingAt_instance;
}
function CurrentStatus_StoppedAt_getInstance() {
  CurrentStatus_initEntries();
  return CurrentStatus_StoppedAt_instance;
}
function CurrentStatus_InTransitTo_getInstance() {
  CurrentStatus_initEntries();
  return CurrentStatus_InTransitTo_instance;
}
var VehicleClass;
function Vehicle() {
  if (VehicleClass === VOID) {
    class $ {
      toString() {
        return 'Vehicle(id=' + this.j9h_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.j9h_1);
        result = imul(result, 31) + (this.k9h_1 == null ? 0 : getNumberHashCode(this.k9h_1)) | 0;
        result = imul(result, 31) + this.l9h_1.hashCode() | 0;
        result = imul(result, 31) + (this.m9h_1 == null ? 0 : this.m9h_1) | 0;
        result = imul(result, 31) + this.n9h_1 | 0;
        result = imul(result, 31) + getNumberHashCode(this.o9h_1) | 0;
        result = imul(result, 31) + getNumberHashCode(this.p9h_1) | 0;
        result = imul(result, 31) + this.q9h_1.hashCode() | 0;
        result = imul(result, 31) + (this.r9h_1 == null ? 0 : getStringHashCode(this.r9h_1)) | 0;
        result = imul(result, 31) + (this.s9h_1 == null ? 0 : getStringHashCode(this.s9h_1)) | 0;
        result = imul(result, 31) + (this.t9h_1 == null ? 0 : getStringHashCode(this.t9h_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Vehicle()))
          return false;
        var tmp0_other_with_cast = other instanceof Vehicle() ? other : THROW_CCE();
        if (!(this.j9h_1 === tmp0_other_with_cast.j9h_1))
          return false;
        if (!equals(this.k9h_1, tmp0_other_with_cast.k9h_1))
          return false;
        if (!this.l9h_1.equals(tmp0_other_with_cast.l9h_1))
          return false;
        if (!(this.m9h_1 == tmp0_other_with_cast.m9h_1))
          return false;
        if (!(this.n9h_1 === tmp0_other_with_cast.n9h_1))
          return false;
        if (!equals(this.o9h_1, tmp0_other_with_cast.o9h_1))
          return false;
        if (!equals(this.p9h_1, tmp0_other_with_cast.p9h_1))
          return false;
        if (!this.q9h_1.equals(tmp0_other_with_cast.q9h_1))
          return false;
        if (!(this.r9h_1 == tmp0_other_with_cast.r9h_1))
          return false;
        if (!(this.s9h_1 == tmp0_other_with_cast.s9h_1))
          return false;
        if (!(this.t9h_1 == tmp0_other_with_cast.t9h_1))
          return false;
        return true;
      }
      static y9m(seen0, id, bearing, currentStatus, currentStopSequence, directionId, latitude, longitude, updatedAt, routeId, stopId, tripId, position, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(2047 === (2047 & seen0))) {
          throwMissingFieldException(seen0, 2047, $serializer_getInstance().w9m_1);
        }
        var $this = createThis(this);
        $this.j9h_1 = id;
        $this.k9h_1 = bearing;
        $this.l9h_1 = currentStatus;
        $this.m9h_1 = currentStopSequence;
        $this.n9h_1 = directionId;
        $this.o9h_1 = latitude;
        $this.p9h_1 = longitude;
        $this.q9h_1 = updatedAt;
        $this.r9h_1 = routeId;
        $this.s9h_1 = stopId;
        $this.t9h_1 = tripId;
        if (0 === (seen0 & 2048)) {
          var tmp = $this;
          var tmp0_latitude = $this.o9h_1;
          var tmp1_longitude = $this.p9h_1;
          tmp.u9h_1 = Position().v1x(tmp1_longitude, tmp0_latitude);
        } else
          $this.u9h_1 = position;
        return $this;
      }
    }
    initMetadataForClass($, 'Vehicle', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    VehicleClass = $;
  }
  return VehicleClass;
}
//region block: init
com_mbta_tid_mbta_app_model_Vehicle_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_Vehicle$stable = 8;
//endregion
//region block: exports
export {
  CurrentStatus_StoppedAt_getInstance as CurrentStatus_StoppedAt_getInstanceyckhkey9js9v,
  $serializer_getInstance as $serializer_getInstanceh32qatkbuui,
};
//endregion

//# sourceMappingURL=Vehicle.mjs.map
