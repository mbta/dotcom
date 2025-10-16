import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { $serializer_getInstance2x6fqe4f90uut as $serializer_getInstance } from '../Alert.mjs';
import { LinkedHashMapSerializermaoj2nyji7op as LinkedHashMapSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
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
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_response_AlertsStreamDataResponse_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_AlertsStreamDataResponse$stable;
function AlertsStreamDataResponse$Companion$$childSerializers$_anonymous__sv9ll4() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance());
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
        tmp.z9m_1 = [lazy(tmp_0, AlertsStreamDataResponse$Companion$$childSerializers$_anonymous__sv9ll4)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.response.AlertsStreamDataResponse', this, 1);
        tmp0_serialDesc.p1b('alerts', false);
        this.a9n_1 = tmp0_serialDesc;
      }
      b9n(encoder, value) {
        var tmp0_desc = this.a9n_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().z9m_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.y91_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.b9n(encoder, value instanceof AlertsStreamDataResponse() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.a9n_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_input = decoder.v13(tmp0_desc);
        var tmp6_cached = Companion_getInstance().z9m_1;
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
        return AlertsStreamDataResponse().c9n(tmp3_bitMask0, tmp4_local0, null);
      }
      fz() {
        return this.a9n_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [Companion_getInstance().z9m_1[0].v1()];
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
var AlertsStreamDataResponseClass;
function AlertsStreamDataResponse() {
  if (AlertsStreamDataResponseClass === VOID) {
    class $ {
      constructor(alerts) {
        Companion_getInstance();
        this.y91_1 = alerts;
      }
      d9n(globalResponse) {
        var tmp;
        if (globalResponse == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.collections.mapValues' call
          var this_0 = this.y91_1;
          // Inline function 'kotlin.collections.mapValuesTo' call
          var destination = LinkedHashMap().tc(mapCapacity(this_0.c1()));
          // Inline function 'kotlin.collections.associateByTo' call
          var _iterator__ex2g4s = this_0.t1().x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            var tmp_0 = element.u1();
            // Inline function 'kotlin.collections.component2' call
            var alert = element.v1();
            // Inline function 'kotlin.collections.mapNotNull' call
            var tmp0 = alert.d8z_1;
            // Inline function 'kotlin.collections.mapNotNullTo' call
            var destination_0 = ArrayList().g1();
            // Inline function 'kotlin.collections.forEach' call
            var _iterator__ex2g4s_0 = tmp0.x();
            while (_iterator__ex2g4s_0.y()) {
              var element_0 = _iterator__ex2g4s_0.z();
              var tmp0_safe_receiver = globalResponse.e9n(element_0.v8x_1);
              if (tmp0_safe_receiver == null)
                null;
              else {
                // Inline function 'kotlin.let' call
                destination_0.i(tmp0_safe_receiver);
              }
            }
            // Inline function 'kotlin.collections.associateBy' call
            var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(destination_0, 10)), 16);
            // Inline function 'kotlin.collections.associateByTo' call
            var destination_1 = LinkedHashMap().tc(capacity);
            var _iterator__ex2g4s_1 = destination_0.x();
            while (_iterator__ex2g4s_1.y()) {
              var element_1 = _iterator__ex2g4s_1.z();
              var tmp$ret$9 = element_1.j91_1;
              destination_1.t3(tmp$ret$9, element_1);
            }
            var facilities = destination_1;
            var tmp$ret$12 = facilities.h1() ? alert : alert.e90(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, facilities);
            destination.t3(tmp_0, tmp$ret$12);
          }
          tmp = new (AlertsStreamDataResponse())(destination);
        }
        var tmp1_elvis_lhs = tmp;
        return tmp1_elvis_lhs == null ? this : tmp1_elvis_lhs;
      }
      toString() {
        return '[AlertsStreamDataResponse]';
      }
      hashCode() {
        return hashCode(this.y91_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof AlertsStreamDataResponse()))
          return false;
        var tmp0_other_with_cast = other instanceof AlertsStreamDataResponse() ? other : THROW_CCE();
        if (!equals(this.y91_1, tmp0_other_with_cast.y91_1))
          return false;
        return true;
      }
      static c9n(seen0, alerts, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(1 === (1 & seen0))) {
          throwMissingFieldException(seen0, 1, $serializer_getInstance_0().a9n_1);
        }
        var $this = createThis(this);
        $this.y91_1 = alerts;
        return $this;
      }
    }
    initMetadataForClass($, 'AlertsStreamDataResponse', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
    AlertsStreamDataResponseClass = $;
  }
  return AlertsStreamDataResponseClass;
}
//region block: init
com_mbta_tid_mbta_app_model_response_AlertsStreamDataResponse_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_AlertsStreamDataResponse$stable = 8;
//endregion
//region block: exports
export {
  AlertsStreamDataResponse as AlertsStreamDataResponse12y031ndw7qai,
};
//endregion

//# sourceMappingURL=AlertsStreamDataResponse.mjs.map
