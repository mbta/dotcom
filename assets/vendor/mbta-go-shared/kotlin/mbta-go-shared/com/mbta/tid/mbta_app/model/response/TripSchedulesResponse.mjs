import { $serializer_getInstance3jn5acmdty8at as $serializer_getInstance } from '../Schedule.mjs';
import { ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
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
  SerializerFactory1qv9hivitncuv as SerializerFactory,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { ObjectSerializer2kjkucmygguwd as ObjectSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/ObjectSerializer.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { SealedClassSerializeriwipiibk55zc as SealedClassSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SealedSerializer.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  distinct10qe1scfdvu5k as distinct,
  singleOrNullrknfaxokm1sl as singleOrNull,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_response_TripSchedulesResponse_Schedules_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_TripSchedulesResponse_Schedules$stable;
var com_mbta_tid_mbta_app_model_response_TripSchedulesResponse_StopIds_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_TripSchedulesResponse_StopIds$stable;
var com_mbta_tid_mbta_app_model_response_TripSchedulesResponse_Unknown$stable;
var com_mbta_tid_mbta_app_model_response_TripSchedulesResponse$stable;
function TripSchedulesResponse$Schedules$Companion$$childSerializers$_anonymous__p0yz9i() {
  return new (ArrayListSerializer())($serializer_getInstance());
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
        tmp.m9p_1 = [lazy(tmp_0, TripSchedulesResponse$Schedules$Companion$$childSerializers$_anonymous__p0yz9i)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('schedules', this, 1);
        tmp0_serialDesc.p1b('schedules', false);
        this.n9p_1 = tmp0_serialDesc;
      }
      o9p(encoder, value) {
        var tmp0_desc = this.n9p_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().m9p_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.h9k_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.o9p(encoder, value instanceof Schedules() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.n9p_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_input = decoder.v13(tmp0_desc);
        var tmp6_cached = Companion_getInstance().m9p_1;
        if (tmp5_input.l14()) {
          tmp4_local0 = tmp5_input.h14(tmp0_desc, 0, tmp6_cached[0].v1(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp5_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp5_input.h14(tmp0_desc, 0, tmp6_cached[0].v1(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp5_input.w13(tmp0_desc);
        return Schedules().p9p(tmp3_bitMask0, tmp4_local0, null);
      }
      fz() {
        return this.n9p_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [Companion_getInstance().m9p_1[0].v1()];
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
function TripSchedulesResponse$StopIds$Companion$$childSerializers$_anonymous__fv363k() {
  return new (ArrayListSerializer())(StringSerializer_getInstance());
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
        tmp.q9p_1 = [lazy(tmp_0, TripSchedulesResponse$StopIds$Companion$$childSerializers$_anonymous__fv363k)];
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
var $serializerClass_0;
function $serializer_0() {
  if ($serializerClass_0 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_0 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('stop_ids', this, 1);
        tmp0_serialDesc.p1b('stop_ids', false);
        this.r9p_1 = tmp0_serialDesc;
      }
      s9p(encoder, value) {
        var tmp0_desc = this.r9p_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().q9p_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.g9k_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.s9p(encoder, value instanceof StopIds() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.r9p_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_input = decoder.v13(tmp0_desc);
        var tmp6_cached = Companion_getInstance_0().q9p_1;
        if (tmp5_input.l14()) {
          tmp4_local0 = tmp5_input.h14(tmp0_desc, 0, tmp6_cached[0].v1(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp5_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp5_input.h14(tmp0_desc, 0, tmp6_cached[0].v1(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp5_input.w13(tmp0_desc);
        return StopIds().t9p(tmp3_bitMask0, tmp4_local0, null);
      }
      fz() {
        return this.r9p_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [Companion_getInstance_0().q9p_1[0].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_0 = $;
  }
  return $serializerClass_0;
}
var $serializer_instance_0;
function $serializer_getInstance_1() {
  if ($serializer_instance_0 === VOID)
    new ($serializer_0())();
  return $serializer_instance_0;
}
function _get_$cachedSerializer__te6jhj($this) {
  return $this.u9p_1.v1();
}
function TripSchedulesResponse$Unknown$_anonymous__vkqzfr() {
  var tmp = Unknown_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('unknown', tmp, tmp$ret$2);
}
function _get_$cachedSerializer__te6jhj_0($this) {
  return $this.v9p_1.v1();
}
function TripSchedulesResponse$Companion$_anonymous__28uixj() {
  var tmp = getKClass(TripSchedulesResponse());
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = [getKClass(Schedules()), getKClass(StopIds()), getKClass(Unknown())];
  var tmp_1 = $serializer_getInstance_0();
  var tmp_2 = $serializer_getInstance_1();
  var tmp_3 = Unknown_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_4 = [tmp_1, tmp_2, ObjectSerializer().s1c('unknown', tmp_3, tmp$ret$5)];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$11 = [];
  return SealedClassSerializer().m10('com.mbta.tid.mbta_app.model.response.TripSchedulesResponse', tmp, tmp_0, tmp_4, tmp$ret$11);
}
var SchedulesClass;
function Schedules() {
  if (SchedulesClass === VOID) {
    class $ extends TripSchedulesResponse() {
      w9i(globalData) {
        // Inline function 'kotlin.collections.mapNotNull' call
        var tmp0 = this.h9k_1;
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp0_safe_receiver = globalData.n8u_1.j3(element.j9f_1);
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination.i(tmp0_safe_receiver);
          }
        }
        return destination;
      }
      f9k() {
        // Inline function 'kotlin.collections.map' call
        var this_0 = this.h9k_1;
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = item.i9f_1;
          destination.i(tmp$ret$0);
        }
        return singleOrNull(distinct(destination));
      }
      toString() {
        return '[TripSchedulesResponse.Schedules]';
      }
      hashCode() {
        return hashCode(this.h9k_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Schedules()))
          return false;
        var tmp0_other_with_cast = other instanceof Schedules() ? other : THROW_CCE();
        if (!equals(this.h9k_1, tmp0_other_with_cast.h9k_1))
          return false;
        return true;
      }
      static p9p(seen0, schedules, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(1 === (1 & seen0))) {
          throwMissingFieldException(seen0, 1, $serializer_getInstance_0().n9p_1);
        }
        var $this = this.w9p(seen0, serializationConstructorMarker);
        $this.h9k_1 = schedules;
        return $this;
      }
    }
    initMetadataForClass($, 'Schedules', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
    SchedulesClass = $;
  }
  return SchedulesClass;
}
var StopIdsClass;
function StopIds() {
  if (StopIdsClass === VOID) {
    class $ extends TripSchedulesResponse() {
      w9i(globalData) {
        // Inline function 'kotlin.collections.mapNotNull' call
        var tmp0 = this.g9k_1;
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp0_safe_receiver = globalData.n8u_1.j3(element);
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination.i(tmp0_safe_receiver);
          }
        }
        return destination;
      }
      f9k() {
        return null;
      }
      toString() {
        return 'StopIds(stopIds=' + toString(this.g9k_1) + ')';
      }
      hashCode() {
        return hashCode(this.g9k_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopIds()))
          return false;
        var tmp0_other_with_cast = other instanceof StopIds() ? other : THROW_CCE();
        if (!equals(this.g9k_1, tmp0_other_with_cast.g9k_1))
          return false;
        return true;
      }
      static t9p(seen0, stopIds, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(1 === (1 & seen0))) {
          throwMissingFieldException(seen0, 1, $serializer_getInstance_1().r9p_1);
        }
        var $this = this.w9p(seen0, serializationConstructorMarker);
        $this.g9k_1 = stopIds;
        return $this;
      }
    }
    initMetadataForClass($, 'StopIds', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_1});
    StopIdsClass = $;
  }
  return StopIdsClass;
}
var UnknownClass;
function Unknown() {
  if (UnknownClass === VOID) {
    class $ extends TripSchedulesResponse() {
      constructor() {
        Unknown_instance = null;
        super();
        Unknown_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.u9p_1 = lazy(tmp_0, TripSchedulesResponse$Unknown$_anonymous__vkqzfr);
      }
      w9i(globalData) {
        return null;
      }
      f9k() {
        return null;
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
      toString() {
        return 'Unknown';
      }
      hashCode() {
        return -1735575208;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Unknown()))
          return false;
        other instanceof Unknown() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Unknown', VOID, VOID, [TripSchedulesResponse(), SerializerFactory()], VOID, VOID, {0: Unknown_getInstance});
    UnknownClass = $;
  }
  return UnknownClass;
}
var Unknown_instance;
function Unknown_getInstance() {
  if (Unknown_instance === VOID)
    new (Unknown())();
  return Unknown_instance;
}
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {
      constructor() {
        Companion_instance_1 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.v9p_1 = lazy(tmp_0, TripSchedulesResponse$Companion$_anonymous__28uixj);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_0(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
    }
    initMetadataForCompanion($, VOID, [SerializerFactory()]);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  if (Companion_instance_1 === VOID)
    new (Companion_1())();
  return Companion_instance_1;
}
var TripSchedulesResponseClass;
function TripSchedulesResponse() {
  if (TripSchedulesResponseClass === VOID) {
    class $ {
      constructor() {
        Companion_getInstance_1();
      }
      static w9p(seen0, serializationConstructorMarker) {
        Companion_getInstance_1();
        return createThis(this);
      }
    }
    initMetadataForClass($, 'TripSchedulesResponse', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_1});
    TripSchedulesResponseClass = $;
  }
  return TripSchedulesResponseClass;
}
//region block: init
com_mbta_tid_mbta_app_model_response_TripSchedulesResponse_Schedules_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_TripSchedulesResponse_Schedules$stable = 8;
com_mbta_tid_mbta_app_model_response_TripSchedulesResponse_StopIds_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_TripSchedulesResponse_StopIds$stable = 8;
com_mbta_tid_mbta_app_model_response_TripSchedulesResponse_Unknown$stable = 0;
com_mbta_tid_mbta_app_model_response_TripSchedulesResponse$stable = 0;
//endregion
//region block: exports
export {
  Schedules as Schedules27wq07sv4ax5p,
  StopIds as StopIds3tadmr5i08nzw,
  TripSchedulesResponse as TripSchedulesResponse2psx5op7t9p57,
  Companion_getInstance_1 as Companion_getInstance1l4me3i7xzo7h,
};
//endregion

//# sourceMappingURL=TripSchedulesResponse.mjs.map
