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
import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_Facility_$serializer$stable;
var com_mbta_tid_mbta_app_model_Facility$stable;
function _get_$cachedSerializer__te6jhj($this) {
  return $this.f91_1.v1();
}
function Facility$Type$Companion$_anonymous__3j2xqs() {
  var tmp = values();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['bike_storage', 'bridge_plate', 'electric_car_chargers', 'elevated_subplatform', 'elevator', 'escalator', 'fare_media_assistance_facility', 'fare_media_assistant', 'fare_vending_machine', 'fare_vending_retailer', 'fully_elevated_platform', 'other', 'parking_area', 'pick_drop', 'portable_boarding_lift', 'ramp', 'taxi_stand', 'ticket_window'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.Facility.Type', tmp, tmp_0, tmp$ret$5, null);
}
var Type_BikeStorage_instance;
var Type_BridgePlate_instance;
var Type_ElectricCarChargers_instance;
var Type_ElevatedSubplatform_instance;
var Type_Elevator_instance;
var Type_Escalator_instance;
var Type_FareMediaAssistanceFacility_instance;
var Type_FareMediaAssistant_instance;
var Type_FareVendingMachine_instance;
var Type_FareVendingRetailer_instance;
var Type_FullyElevatedPlatform_instance;
var Type_Other_instance;
var Type_ParkingArea_instance;
var Type_PickDrop_instance;
var Type_PortableBoardingLift_instance;
var Type_Ramp_instance;
var Type_TaxiStand_instance;
var Type_TicketWindow_instance;
function values() {
  return [Type_BikeStorage_getInstance(), Type_BridgePlate_getInstance(), Type_ElectricCarChargers_getInstance(), Type_ElevatedSubplatform_getInstance(), Type_Elevator_getInstance(), Type_Escalator_getInstance(), Type_FareMediaAssistanceFacility_getInstance(), Type_FareMediaAssistant_getInstance(), Type_FareVendingMachine_getInstance(), Type_FareVendingRetailer_getInstance(), Type_FullyElevatedPlatform_getInstance(), Type_Other_getInstance(), Type_ParkingArea_getInstance(), Type_PickDrop_getInstance(), Type_PortableBoardingLift_getInstance(), Type_Ramp_getInstance(), Type_TaxiStand_getInstance(), Type_TicketWindow_getInstance()];
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.f91_1 = lazy(tmp_0, Facility$Type$Companion$_anonymous__3j2xqs);
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
  Type_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var Type_entriesInitialized;
function Type_initEntries() {
  if (Type_entriesInitialized)
    return Unit_instance;
  Type_entriesInitialized = true;
  Type_BikeStorage_instance = new (Type())('BikeStorage', 0);
  Type_BridgePlate_instance = new (Type())('BridgePlate', 1);
  Type_ElectricCarChargers_instance = new (Type())('ElectricCarChargers', 2);
  Type_ElevatedSubplatform_instance = new (Type())('ElevatedSubplatform', 3);
  Type_Elevator_instance = new (Type())('Elevator', 4);
  Type_Escalator_instance = new (Type())('Escalator', 5);
  Type_FareMediaAssistanceFacility_instance = new (Type())('FareMediaAssistanceFacility', 6);
  Type_FareMediaAssistant_instance = new (Type())('FareMediaAssistant', 7);
  Type_FareVendingMachine_instance = new (Type())('FareVendingMachine', 8);
  Type_FareVendingRetailer_instance = new (Type())('FareVendingRetailer', 9);
  Type_FullyElevatedPlatform_instance = new (Type())('FullyElevatedPlatform', 10);
  Type_Other_instance = new (Type())('Other', 11);
  Type_ParkingArea_instance = new (Type())('ParkingArea', 12);
  Type_PickDrop_instance = new (Type())('PickDrop', 13);
  Type_PortableBoardingLift_instance = new (Type())('PortableBoardingLift', 14);
  Type_Ramp_instance = new (Type())('Ramp', 15);
  Type_TaxiStand_instance = new (Type())('TaxiStand', 16);
  Type_TicketWindow_instance = new (Type())('TicketWindow', 17);
  Companion_getInstance();
}
function Facility$Companion$$childSerializers$_anonymous__ee9im1() {
  return Companion_getInstance().r1n();
}
var TypeClass;
function Type() {
  if (TypeClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Type', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    TypeClass = $;
  }
  return TypeClass;
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
        tmp.g91_1 = [null, null, null, lazy(tmp_0, Facility$Companion$$childSerializers$_anonymous__ee9im1)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.Facility', this, 4);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('long_name', true);
        tmp0_serialDesc.p1b('short_name', true);
        tmp0_serialDesc.p1b('type', true);
        this.h91_1 = tmp0_serialDesc;
      }
      i91(encoder, value) {
        var tmp0_desc = this.h91_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().g91_1;
        tmp1_output.l15(tmp0_desc, 0, value.j91_1);
        if (tmp1_output.t15(tmp0_desc, 1) ? true : !(value.k91_1 == null)) {
          tmp1_output.p15(tmp0_desc, 1, StringSerializer_getInstance(), value.k91_1);
        }
        if (tmp1_output.t15(tmp0_desc, 2) ? true : !(value.l91_1 == null)) {
          tmp1_output.p15(tmp0_desc, 2, StringSerializer_getInstance(), value.l91_1);
        }
        if (tmp1_output.t15(tmp0_desc, 3) ? true : !value.m91_1.equals(Type_Other_getInstance())) {
          tmp1_output.n15(tmp0_desc, 3, tmp2_cached[3].v1(), value.m91_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.i91(encoder, value instanceof Facility() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.h91_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_input = decoder.v13(tmp0_desc);
        var tmp9_cached = Companion_getInstance_0().g91_1;
        if (tmp8_input.l14()) {
          tmp4_local0 = tmp8_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp8_input.j14(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp8_input.j14(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp8_input.h14(tmp0_desc, 3, tmp9_cached[3].v1(), tmp7_local3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp8_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp8_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp8_input.j14(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp8_input.j14(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp8_input.h14(tmp0_desc, 3, tmp9_cached[3].v1(), tmp7_local3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp8_input.w13(tmp0_desc);
        return Facility().n91(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
      }
      fz() {
        return this.h91_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_0().g91_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), tmp0_cached[3].v1()];
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
function Type_BikeStorage_getInstance() {
  Type_initEntries();
  return Type_BikeStorage_instance;
}
function Type_BridgePlate_getInstance() {
  Type_initEntries();
  return Type_BridgePlate_instance;
}
function Type_ElectricCarChargers_getInstance() {
  Type_initEntries();
  return Type_ElectricCarChargers_instance;
}
function Type_ElevatedSubplatform_getInstance() {
  Type_initEntries();
  return Type_ElevatedSubplatform_instance;
}
function Type_Elevator_getInstance() {
  Type_initEntries();
  return Type_Elevator_instance;
}
function Type_Escalator_getInstance() {
  Type_initEntries();
  return Type_Escalator_instance;
}
function Type_FareMediaAssistanceFacility_getInstance() {
  Type_initEntries();
  return Type_FareMediaAssistanceFacility_instance;
}
function Type_FareMediaAssistant_getInstance() {
  Type_initEntries();
  return Type_FareMediaAssistant_instance;
}
function Type_FareVendingMachine_getInstance() {
  Type_initEntries();
  return Type_FareVendingMachine_instance;
}
function Type_FareVendingRetailer_getInstance() {
  Type_initEntries();
  return Type_FareVendingRetailer_instance;
}
function Type_FullyElevatedPlatform_getInstance() {
  Type_initEntries();
  return Type_FullyElevatedPlatform_instance;
}
function Type_Other_getInstance() {
  Type_initEntries();
  return Type_Other_instance;
}
function Type_ParkingArea_getInstance() {
  Type_initEntries();
  return Type_ParkingArea_instance;
}
function Type_PickDrop_getInstance() {
  Type_initEntries();
  return Type_PickDrop_instance;
}
function Type_PortableBoardingLift_getInstance() {
  Type_initEntries();
  return Type_PortableBoardingLift_instance;
}
function Type_Ramp_getInstance() {
  Type_initEntries();
  return Type_Ramp_instance;
}
function Type_TaxiStand_getInstance() {
  Type_initEntries();
  return Type_TaxiStand_instance;
}
function Type_TicketWindow_getInstance() {
  Type_initEntries();
  return Type_TicketWindow_instance;
}
var FacilityClass;
function Facility() {
  if (FacilityClass === VOID) {
    class $ {
      toString() {
        return 'Facility(id=' + this.j91_1 + ', longName=' + this.k91_1 + ', shortName=' + this.l91_1 + ', type=' + this.m91_1.toString() + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.j91_1);
        result = imul(result, 31) + (this.k91_1 == null ? 0 : getStringHashCode(this.k91_1)) | 0;
        result = imul(result, 31) + (this.l91_1 == null ? 0 : getStringHashCode(this.l91_1)) | 0;
        result = imul(result, 31) + this.m91_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Facility()))
          return false;
        var tmp0_other_with_cast = other instanceof Facility() ? other : THROW_CCE();
        if (!(this.j91_1 === tmp0_other_with_cast.j91_1))
          return false;
        if (!(this.k91_1 == tmp0_other_with_cast.k91_1))
          return false;
        if (!(this.l91_1 == tmp0_other_with_cast.l91_1))
          return false;
        if (!this.m91_1.equals(tmp0_other_with_cast.m91_1))
          return false;
        return true;
      }
      static n91(seen0, id, longName, shortName, type, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(1 === (1 & seen0))) {
          throwMissingFieldException(seen0, 1, $serializer_getInstance().h91_1);
        }
        var $this = createThis(this);
        $this.j91_1 = id;
        if (0 === (seen0 & 2))
          $this.k91_1 = null;
        else
          $this.k91_1 = longName;
        if (0 === (seen0 & 4))
          $this.l91_1 = null;
        else
          $this.l91_1 = shortName;
        if (0 === (seen0 & 8))
          $this.m91_1 = Type_Other_getInstance();
        else
          $this.m91_1 = type;
        return $this;
      }
    }
    initMetadataForClass($, 'Facility', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    FacilityClass = $;
  }
  return FacilityClass;
}
//region block: init
com_mbta_tid_mbta_app_model_Facility_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_Facility$stable = 0;
//endregion
//region block: exports
export {
  $serializer_getInstance as $serializer_getInstance2yltxzzp1bu5u,
};
//endregion

//# sourceMappingURL=Facility.mjs.map
