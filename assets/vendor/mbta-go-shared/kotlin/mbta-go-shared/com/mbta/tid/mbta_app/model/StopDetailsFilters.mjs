import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
  BooleanSerializer_getInstance1t8habeqgiyq1 as BooleanSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  createThis2j2avj17cvnv2 as createThis,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_StopDetailsFilter_$serializer$stable;
var com_mbta_tid_mbta_app_model_StopDetailsFilter$stable;
var com_mbta_tid_mbta_app_model_TripDetailsFilter_$serializer$stable;
var com_mbta_tid_mbta_app_model_TripDetailsFilter$stable;
var com_mbta_tid_mbta_app_model_StopDetailsPageFilters_$serializer$stable;
var com_mbta_tid_mbta_app_model_StopDetailsPageFilters$stable;
var com_mbta_tid_mbta_app_model_TripDetailsPageFilter_$serializer$stable;
var com_mbta_tid_mbta_app_model_TripDetailsPageFilter$stable;
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.StopDetailsFilter', this, 3);
        tmp0_serialDesc.p1b('routeId', false);
        tmp0_serialDesc.p1b('directionId', false);
        tmp0_serialDesc.p1b('autoFilter', true);
        this.e9g_1 = tmp0_serialDesc;
      }
      f9g(encoder, value) {
        var tmp0_desc = this.e9g_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.l15(tmp0_desc, 0, value.v8u_1);
        tmp1_output.g15(tmp0_desc, 1, value.w8u_1);
        if (tmp1_output.t15(tmp0_desc, 2) ? true : !(value.x8u_1 === false)) {
          tmp1_output.d15(tmp0_desc, 2, value.x8u_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.f9g(encoder, value instanceof StopDetailsFilter() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.e9g_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = 0;
        var tmp6_local2 = false;
        var tmp7_input = decoder.v13(tmp0_desc);
        if (tmp7_input.l14()) {
          tmp4_local0 = tmp7_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp7_input.a14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp7_input.x13(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp7_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp7_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp7_input.a14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp7_input.x13(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp7_input.w13(tmp0_desc);
        return StopDetailsFilter().g9g(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
      }
      fz() {
        return this.e9g_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), IntSerializer_getInstance(), BooleanSerializer_getInstance()];
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
var StopDetailsFilterClass;
function StopDetailsFilter() {
  if (StopDetailsFilterClass === VOID) {
    class $ {
      constructor(routeId, directionId, autoFilter) {
        autoFilter = autoFilter === VOID ? false : autoFilter;
        this.v8u_1 = routeId;
        this.w8u_1 = directionId;
        this.x8u_1 = autoFilter;
      }
      toString() {
        return 'StopDetailsFilter(routeId=' + this.v8u_1 + ', directionId=' + this.w8u_1 + ', autoFilter=' + this.x8u_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.v8u_1);
        result = imul(result, 31) + this.w8u_1 | 0;
        result = imul(result, 31) + getBooleanHashCode(this.x8u_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopDetailsFilter()))
          return false;
        var tmp0_other_with_cast = other instanceof StopDetailsFilter() ? other : THROW_CCE();
        if (!(this.v8u_1 === tmp0_other_with_cast.v8u_1))
          return false;
        if (!(this.w8u_1 === tmp0_other_with_cast.w8u_1))
          return false;
        if (!(this.x8u_1 === tmp0_other_with_cast.x8u_1))
          return false;
        return true;
      }
      static g9g(seen0, routeId, directionId, autoFilter, serializationConstructorMarker) {
        if (!(3 === (3 & seen0))) {
          throwMissingFieldException(seen0, 3, $serializer_getInstance().e9g_1);
        }
        var $this = createThis(this);
        $this.v8u_1 = routeId;
        $this.w8u_1 = directionId;
        if (0 === (seen0 & 4))
          $this.x8u_1 = false;
        else
          $this.x8u_1 = autoFilter;
        return $this;
      }
    }
    initMetadataForClass($, 'StopDetailsFilter', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    StopDetailsFilterClass = $;
  }
  return StopDetailsFilterClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  return Companion_instance_0;
}
var $serializerClass_0;
function $serializer_0() {
  if ($serializerClass_0 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_0 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.TripDetailsFilter', this, 4);
        tmp0_serialDesc.p1b('tripId', false);
        tmp0_serialDesc.p1b('vehicleId', false);
        tmp0_serialDesc.p1b('stopSequence', false);
        tmp0_serialDesc.p1b('selectionLock', true);
        this.h9g_1 = tmp0_serialDesc;
      }
      i9g(encoder, value) {
        var tmp0_desc = this.h9g_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.l15(tmp0_desc, 0, value.j9g_1);
        tmp1_output.p15(tmp0_desc, 1, StringSerializer_getInstance(), value.k9g_1);
        tmp1_output.p15(tmp0_desc, 2, IntSerializer_getInstance(), value.l9g_1);
        if (tmp1_output.t15(tmp0_desc, 3) ? true : !(value.m9g_1 === false)) {
          tmp1_output.d15(tmp0_desc, 3, value.m9g_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.i9g(encoder, value instanceof TripDetailsFilter() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.h9g_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = false;
        var tmp8_input = decoder.v13(tmp0_desc);
        if (tmp8_input.l14()) {
          tmp4_local0 = tmp8_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp8_input.j14(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp8_input.j14(tmp0_desc, 2, IntSerializer_getInstance(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp8_input.x13(tmp0_desc, 3);
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
                tmp6_local2 = tmp8_input.j14(tmp0_desc, 2, IntSerializer_getInstance(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp8_input.x13(tmp0_desc, 3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp8_input.w13(tmp0_desc);
        return TripDetailsFilter().n9g(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, null);
      }
      fz() {
        return this.h9g_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), get_nullable(IntSerializer_getInstance()), BooleanSerializer_getInstance()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_0 = $;
  }
  return $serializerClass_0;
}
var $serializer_instance_0;
function $serializer_getInstance_0() {
  if ($serializer_instance_0 === VOID)
    new ($serializer_0())();
  return $serializer_instance_0;
}
var TripDetailsFilterClass;
function TripDetailsFilter() {
  if (TripDetailsFilterClass === VOID) {
    class $ {
      constructor(tripId, vehicleId, stopSequence, selectionLock) {
        selectionLock = selectionLock === VOID ? false : selectionLock;
        this.j9g_1 = tripId;
        this.k9g_1 = vehicleId;
        this.l9g_1 = stopSequence;
        this.m9g_1 = selectionLock;
      }
      o9g(tripId, vehicleId, stopSequence, selectionLock) {
        return new (TripDetailsFilter())(tripId, vehicleId, stopSequence, selectionLock);
      }
      p9g(tripId, vehicleId, stopSequence, selectionLock, $super) {
        tripId = tripId === VOID ? this.j9g_1 : tripId;
        vehicleId = vehicleId === VOID ? this.k9g_1 : vehicleId;
        stopSequence = stopSequence === VOID ? this.l9g_1 : stopSequence;
        selectionLock = selectionLock === VOID ? this.m9g_1 : selectionLock;
        return $super === VOID ? this.o9g(tripId, vehicleId, stopSequence, selectionLock) : $super.o9g.call(this, tripId, vehicleId, stopSequence, selectionLock);
      }
      toString() {
        return 'TripDetailsFilter(tripId=' + this.j9g_1 + ', vehicleId=' + this.k9g_1 + ', stopSequence=' + this.l9g_1 + ', selectionLock=' + this.m9g_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.j9g_1);
        result = imul(result, 31) + (this.k9g_1 == null ? 0 : getStringHashCode(this.k9g_1)) | 0;
        result = imul(result, 31) + (this.l9g_1 == null ? 0 : this.l9g_1) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.m9g_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TripDetailsFilter()))
          return false;
        var tmp0_other_with_cast = other instanceof TripDetailsFilter() ? other : THROW_CCE();
        if (!(this.j9g_1 === tmp0_other_with_cast.j9g_1))
          return false;
        if (!(this.k9g_1 == tmp0_other_with_cast.k9g_1))
          return false;
        if (!(this.l9g_1 == tmp0_other_with_cast.l9g_1))
          return false;
        if (!(this.m9g_1 === tmp0_other_with_cast.m9g_1))
          return false;
        return true;
      }
      static n9g(seen0, tripId, vehicleId, stopSequence, selectionLock, serializationConstructorMarker) {
        if (!(7 === (7 & seen0))) {
          throwMissingFieldException(seen0, 7, $serializer_getInstance_0().h9g_1);
        }
        var $this = createThis(this);
        $this.j9g_1 = tripId;
        $this.k9g_1 = vehicleId;
        $this.l9g_1 = stopSequence;
        if (0 === (seen0 & 8))
          $this.m9g_1 = false;
        else
          $this.m9g_1 = selectionLock;
        return $this;
      }
    }
    initMetadataForClass($, 'TripDetailsFilter', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
    TripDetailsFilterClass = $;
  }
  return TripDetailsFilterClass;
}
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  return Companion_instance_1;
}
var $serializerClass_1;
function $serializer_1() {
  if ($serializerClass_1 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_1 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.StopDetailsPageFilters', this, 3);
        tmp0_serialDesc.p1b('stopId', false);
        tmp0_serialDesc.p1b('stopFilter', false);
        tmp0_serialDesc.p1b('tripFilter', false);
        this.q9g_1 = tmp0_serialDesc;
      }
      r9g(encoder, value) {
        var tmp0_desc = this.q9g_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.l15(tmp0_desc, 0, value.s9g_1);
        tmp1_output.p15(tmp0_desc, 1, $serializer_getInstance(), value.t9g_1);
        tmp1_output.p15(tmp0_desc, 2, $serializer_getInstance_0(), value.u9g_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.r9g(encoder, value instanceof StopDetailsPageFilters() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.q9g_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_input = decoder.v13(tmp0_desc);
        if (tmp7_input.l14()) {
          tmp4_local0 = tmp7_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp7_input.j14(tmp0_desc, 1, $serializer_getInstance(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp7_input.j14(tmp0_desc, 2, $serializer_getInstance_0(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp7_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp7_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp7_input.j14(tmp0_desc, 1, $serializer_getInstance(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp7_input.j14(tmp0_desc, 2, $serializer_getInstance_0(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp7_input.w13(tmp0_desc);
        return StopDetailsPageFilters().v9g(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
      }
      fz() {
        return this.q9g_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), get_nullable($serializer_getInstance()), get_nullable($serializer_getInstance_0())];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_1 = $;
  }
  return $serializerClass_1;
}
var $serializer_instance_1;
function $serializer_getInstance_1() {
  if ($serializer_instance_1 === VOID)
    new ($serializer_1())();
  return $serializer_instance_1;
}
var StopDetailsPageFiltersClass;
function StopDetailsPageFilters() {
  if (StopDetailsPageFiltersClass === VOID) {
    class $ {
      constructor(stopId, stopFilter, tripFilter) {
        this.s9g_1 = stopId;
        this.t9g_1 = stopFilter;
        this.u9g_1 = tripFilter;
      }
      toString() {
        return 'StopDetailsPageFilters(stopId=' + this.s9g_1 + ', stopFilter=' + toString(this.t9g_1) + ', tripFilter=' + toString(this.u9g_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.s9g_1);
        result = imul(result, 31) + (this.t9g_1 == null ? 0 : this.t9g_1.hashCode()) | 0;
        result = imul(result, 31) + (this.u9g_1 == null ? 0 : this.u9g_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopDetailsPageFilters()))
          return false;
        var tmp0_other_with_cast = other instanceof StopDetailsPageFilters() ? other : THROW_CCE();
        if (!(this.s9g_1 === tmp0_other_with_cast.s9g_1))
          return false;
        if (!equals(this.t9g_1, tmp0_other_with_cast.t9g_1))
          return false;
        if (!equals(this.u9g_1, tmp0_other_with_cast.u9g_1))
          return false;
        return true;
      }
      static v9g(seen0, stopId, stopFilter, tripFilter, serializationConstructorMarker) {
        if (!(7 === (7 & seen0))) {
          throwMissingFieldException(seen0, 7, $serializer_getInstance_1().q9g_1);
        }
        var $this = createThis(this);
        $this.s9g_1 = stopId;
        $this.t9g_1 = stopFilter;
        $this.u9g_1 = tripFilter;
        return $this;
      }
    }
    initMetadataForClass($, 'StopDetailsPageFilters', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_1});
    StopDetailsPageFiltersClass = $;
  }
  return StopDetailsPageFiltersClass;
}
var CompanionClass_2;
function Companion_2() {
  if (CompanionClass_2 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_2 = $;
  }
  return CompanionClass_2;
}
var Companion_instance_2;
function Companion_getInstance_2() {
  return Companion_instance_2;
}
var $serializerClass_2;
function $serializer_2() {
  if ($serializerClass_2 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_2 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.TripDetailsPageFilter', this, 6);
        tmp0_serialDesc.p1b('tripId', false);
        tmp0_serialDesc.p1b('vehicleId', false);
        tmp0_serialDesc.p1b('routeId', false);
        tmp0_serialDesc.p1b('directionId', false);
        tmp0_serialDesc.p1b('stopId', false);
        tmp0_serialDesc.p1b('stopSequence', false);
        this.w9g_1 = tmp0_serialDesc;
      }
      x9g(encoder, value) {
        var tmp0_desc = this.w9g_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.l15(tmp0_desc, 0, value.y9g_1);
        tmp1_output.p15(tmp0_desc, 1, StringSerializer_getInstance(), value.z9g_1);
        tmp1_output.l15(tmp0_desc, 2, value.a9h_1);
        tmp1_output.g15(tmp0_desc, 3, value.b9h_1);
        tmp1_output.l15(tmp0_desc, 4, value.c9h_1);
        tmp1_output.p15(tmp0_desc, 5, IntSerializer_getInstance(), value.d9h_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.x9g(encoder, value instanceof TripDetailsPageFilter() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.w9g_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = 0;
        var tmp8_local4 = null;
        var tmp9_local5 = null;
        var tmp10_input = decoder.v13(tmp0_desc);
        if (tmp10_input.l14()) {
          tmp4_local0 = tmp10_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp10_input.j14(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp10_input.f14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp10_input.a14(tmp0_desc, 3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp10_input.f14(tmp0_desc, 4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp10_input.j14(tmp0_desc, 5, IntSerializer_getInstance(), tmp9_local5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp10_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp10_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp10_input.j14(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp10_input.f14(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp10_input.a14(tmp0_desc, 3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp10_input.f14(tmp0_desc, 4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp10_input.j14(tmp0_desc, 5, IntSerializer_getInstance(), tmp9_local5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp10_input.w13(tmp0_desc);
        return TripDetailsPageFilter().e9h(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, null);
      }
      fz() {
        return this.w9g_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), StringSerializer_getInstance(), IntSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(IntSerializer_getInstance())];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_2 = $;
  }
  return $serializerClass_2;
}
var $serializer_instance_2;
function $serializer_getInstance_2() {
  if ($serializer_instance_2 === VOID)
    new ($serializer_2())();
  return $serializer_instance_2;
}
var TripDetailsPageFilterClass;
function TripDetailsPageFilter() {
  if (TripDetailsPageFilterClass === VOID) {
    class $ {
      static f9h(tripId, vehicleId, routeId, directionId, stopId, stopSequence) {
        var $this = createThis(this);
        $this.y9g_1 = tripId;
        $this.z9g_1 = vehicleId;
        $this.a9h_1 = routeId;
        $this.b9h_1 = directionId;
        $this.c9h_1 = stopId;
        $this.d9h_1 = stopSequence;
        return $this;
      }
      static g9h(stopId, stopFilter, tripFilter) {
        return this.f9h(tripFilter.j9g_1, tripFilter.k9g_1, stopFilter.v8u_1, stopFilter.w8u_1, stopId, tripFilter.l9g_1);
      }
      toString() {
        return 'TripDetailsPageFilter(tripId=' + this.y9g_1 + ', vehicleId=' + this.z9g_1 + ', routeId=' + this.a9h_1 + ', directionId=' + this.b9h_1 + ', stopId=' + this.c9h_1 + ', stopSequence=' + this.d9h_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.y9g_1);
        result = imul(result, 31) + (this.z9g_1 == null ? 0 : getStringHashCode(this.z9g_1)) | 0;
        result = imul(result, 31) + getStringHashCode(this.a9h_1) | 0;
        result = imul(result, 31) + this.b9h_1 | 0;
        result = imul(result, 31) + getStringHashCode(this.c9h_1) | 0;
        result = imul(result, 31) + (this.d9h_1 == null ? 0 : this.d9h_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TripDetailsPageFilter()))
          return false;
        var tmp0_other_with_cast = other instanceof TripDetailsPageFilter() ? other : THROW_CCE();
        if (!(this.y9g_1 === tmp0_other_with_cast.y9g_1))
          return false;
        if (!(this.z9g_1 == tmp0_other_with_cast.z9g_1))
          return false;
        if (!(this.a9h_1 === tmp0_other_with_cast.a9h_1))
          return false;
        if (!(this.b9h_1 === tmp0_other_with_cast.b9h_1))
          return false;
        if (!(this.c9h_1 === tmp0_other_with_cast.c9h_1))
          return false;
        if (!(this.d9h_1 == tmp0_other_with_cast.d9h_1))
          return false;
        return true;
      }
      static e9h(seen0, tripId, vehicleId, routeId, directionId, stopId, stopSequence, serializationConstructorMarker) {
        if (!(63 === (63 & seen0))) {
          throwMissingFieldException(seen0, 63, $serializer_getInstance_2().w9g_1);
        }
        var $this = createThis(this);
        $this.y9g_1 = tripId;
        $this.z9g_1 = vehicleId;
        $this.a9h_1 = routeId;
        $this.b9h_1 = directionId;
        $this.c9h_1 = stopId;
        $this.d9h_1 = stopSequence;
        return $this;
      }
    }
    initMetadataForClass($, 'TripDetailsPageFilter', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_2});
    TripDetailsPageFilterClass = $;
  }
  return TripDetailsPageFilterClass;
}
//region block: init
com_mbta_tid_mbta_app_model_StopDetailsFilter_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_StopDetailsFilter$stable = 0;
com_mbta_tid_mbta_app_model_TripDetailsFilter_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_TripDetailsFilter$stable = 0;
com_mbta_tid_mbta_app_model_StopDetailsPageFilters_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_StopDetailsPageFilters$stable = 0;
com_mbta_tid_mbta_app_model_TripDetailsPageFilter_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_TripDetailsPageFilter$stable = 0;
Companion_instance = new (Companion())();
Companion_instance_0 = new (Companion_0())();
Companion_instance_1 = new (Companion_1())();
Companion_instance_2 = new (Companion_2())();
//endregion
//region block: exports
export {
  StopDetailsFilter as StopDetailsFilterp30x6nsimkbe,
  StopDetailsPageFilters as StopDetailsPageFilters7s483ou4udd1,
  TripDetailsFilter as TripDetailsFilter20app8tx6q526,
  TripDetailsPageFilter as TripDetailsPageFilterzcsn1gr2vd10,
  $serializer_getInstance as $serializer_getInstance2d5oenje96dnl,
  $serializer_getInstance_0 as $serializer_getInstance3dtfp35y3etv6,
  $serializer_getInstance_2 as $serializer_getInstance26yboyslys3kt,
};
//endregion

//# sourceMappingURL=StopDetailsFilters.mjs.map
