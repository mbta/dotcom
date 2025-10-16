import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import {
  Serializer_getInstance1l5ru82blsodh as Serializer_getInstance,
  Companion_getInstance2mow8xipgd4ir as Companion_getInstance,
} from '../utils/EasternTimeInstant.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
  SerializerFactory1qv9hivitncuv as SerializerFactory,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { SealedClassSerializeriwipiibk55zc as SealedClassSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SealedSerializer.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_history_Visit_StopVisit_$serializer$stable;
var com_mbta_tid_mbta_app_history_Visit_StopVisit$stable;
var com_mbta_tid_mbta_app_history_Visit$stable;
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
function Companion_getInstance_0() {
  return Companion_instance;
}
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.history.Visit.StopVisit', this, 2);
        tmp0_serialDesc.p1b('timestamp', true);
        tmp0_serialDesc.p1b('stopId', false);
        this.f8o_1 = tmp0_serialDesc;
      }
      g8o(encoder, value) {
        var tmp0_desc = this.f8o_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        if (tmp1_output.t15(tmp0_desc, 0) ? true : !value.h8o_1.equals(Companion_getInstance().j8o())) {
          tmp1_output.n15(tmp0_desc, 0, Serializer_getInstance(), value.h8o_1);
        }
        tmp1_output.l15(tmp0_desc, 1, value.l8o_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.g8o(encoder, value instanceof StopVisit() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.f8o_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        if (tmp6_input.l14()) {
          tmp4_local0 = tmp6_input.h14(tmp0_desc, 0, Serializer_getInstance(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp6_input.f14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp6_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp6_input.h14(tmp0_desc, 0, Serializer_getInstance(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp6_input.f14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp6_input.w13(tmp0_desc);
        return StopVisit().m8o(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.f8o_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [Serializer_getInstance(), StringSerializer_getInstance()];
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
function _get_$cachedSerializer__te6jhj($this) {
  return $this.n8o_1.v1();
}
function Visit$Companion$_anonymous__eqltfg() {
  var tmp = getKClass(Visit());
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = [getKClass(StopVisit())];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_1 = [$serializer_getInstance()];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$8 = [];
  return SealedClassSerializer().m10('com.mbta.tid.mbta_app.history.Visit', tmp, tmp_0, tmp_1, tmp$ret$8);
}
var StopVisitClass;
function StopVisit() {
  if (StopVisitClass === VOID) {
    class $ extends Visit() {
      toString() {
        return 'StopVisit(stopId=' + this.l8o_1 + ')';
      }
      hashCode() {
        return getStringHashCode(this.l8o_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopVisit()))
          return false;
        var tmp0_other_with_cast = other instanceof StopVisit() ? other : THROW_CCE();
        if (!(this.l8o_1 === tmp0_other_with_cast.l8o_1))
          return false;
        return true;
      }
      static m8o(seen0, timestamp, stopId, serializationConstructorMarker) {
        if (!(2 === (2 & seen0))) {
          throwMissingFieldException(seen0, 2, $serializer_getInstance().f8o_1);
        }
        var $this = this.o8o(seen0, timestamp, serializationConstructorMarker);
        $this.l8o_1 = stopId;
        return $this;
      }
    }
    initMetadataForClass($, 'StopVisit', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    StopVisitClass = $;
  }
  return StopVisitClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.n8o_1 = lazy(tmp_0, Visit$Companion$_anonymous__eqltfg);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
    }
    initMetadataForCompanion($, VOID, [SerializerFactory()]);
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
var VisitClass;
function Visit() {
  if (VisitClass === VOID) {
    class $ {
      static o8o(seen0, timestamp, serializationConstructorMarker) {
        Companion_getInstance_1();
        var $this = createThis(this);
        if (0 === (seen0 & 1))
          $this.h8o_1 = Companion_getInstance().j8o();
        else
          $this.h8o_1 = timestamp;
        return $this;
      }
    }
    initMetadataForClass($, 'Visit', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_1});
    VisitClass = $;
  }
  return VisitClass;
}
//region block: init
com_mbta_tid_mbta_app_history_Visit_StopVisit_$serializer$stable = 8;
com_mbta_tid_mbta_app_history_Visit_StopVisit$stable = 8;
com_mbta_tid_mbta_app_history_Visit$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  StopVisit as StopVisittp1rzgviw50g,
  Companion_getInstance_1 as Companion_getInstance3phx56r817z7b,
};
//endregion

//# sourceMappingURL=Visit.mjs.map
