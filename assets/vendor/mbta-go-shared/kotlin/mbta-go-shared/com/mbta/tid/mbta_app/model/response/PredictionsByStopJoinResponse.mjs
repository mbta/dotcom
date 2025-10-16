import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { $serializer_getInstance2h4hs9jntxuz4 as $serializer_getInstance } from '../Prediction.mjs';
import { LinkedHashMapSerializermaoj2nyji7op as LinkedHashMapSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { $serializer_getInstancekv1idx7l1joz as $serializer_getInstance_0 } from '../Trip.mjs';
import { $serializer_getInstanceh32qatkbuui as $serializer_getInstance_1 } from '../Vehicle.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  emptyMapr06gerzljqtm as emptyMap,
  plus2lr02ok6jhhxu as plus,
  plus2m1vv33moko5t as plus_0,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
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
import { Paire9pteg33gng7 as Pair } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { PredictionsStreamDataResponsedyjhmd0qdfji as PredictionsStreamDataResponse } from './PredictionsStreamDataResponse.mjs';
import { sum1ib1hqt64m6qf as sum } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_response_PredictionsByStopJoinResponse_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_PredictionsByStopJoinResponse$stable;
function PredictionsByStopJoinResponse$Companion$$childSerializers$_anonymous__f7kae6() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance()));
}
function PredictionsByStopJoinResponse$Companion$$childSerializers$_anonymous__f7kae6_0() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance_0());
}
function PredictionsByStopJoinResponse$Companion$$childSerializers$_anonymous__f7kae6_1() {
  return new (LinkedHashMapSerializer())(StringSerializer_getInstance(), $serializer_getInstance_1());
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, PredictionsByStopJoinResponse$Companion$$childSerializers$_anonymous__f7kae6);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_3 = lazy(tmp_2, PredictionsByStopJoinResponse$Companion$$childSerializers$_anonymous__f7kae6_0);
        var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.z9n_1 = [tmp_1, tmp_3, lazy(tmp_4, PredictionsByStopJoinResponse$Companion$$childSerializers$_anonymous__f7kae6_1)];
        this.a9o_1 = new (PredictionsByStopJoinResponse())(emptyMap(), emptyMap(), emptyMap());
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.response.PredictionsByStopJoinResponse', this, 3);
        tmp0_serialDesc.p1b('predictions_by_stop', false);
        tmp0_serialDesc.p1b('trips', false);
        tmp0_serialDesc.p1b('vehicles', false);
        this.b9o_1 = tmp0_serialDesc;
      }
      c9o(encoder, value) {
        var tmp0_desc = this.b9o_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().z9n_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.d9o_1);
        tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.e9o_1);
        tmp1_output.n15(tmp0_desc, 2, tmp2_cached[2].v1(), value.f9o_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.c9o(encoder, value instanceof PredictionsByStopJoinResponse() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.b9o_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_input = decoder.v13(tmp0_desc);
        var tmp8_cached = Companion_getInstance().z9n_1;
        if (tmp7_input.l14()) {
          tmp4_local0 = tmp7_input.h14(tmp0_desc, 0, tmp8_cached[0].v1(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp7_input.h14(tmp0_desc, 1, tmp8_cached[1].v1(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp7_input.h14(tmp0_desc, 2, tmp8_cached[2].v1(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp7_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp7_input.h14(tmp0_desc, 0, tmp8_cached[0].v1(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp7_input.h14(tmp0_desc, 1, tmp8_cached[1].v1(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp7_input.h14(tmp0_desc, 2, tmp8_cached[2].v1(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp7_input.w13(tmp0_desc);
        return PredictionsByStopJoinResponse().g9o(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
      }
      fz() {
        return this.b9o_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().z9n_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [tmp0_cached[0].v1(), tmp0_cached[1].v1(), tmp0_cached[2].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance_2() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var PredictionsByStopJoinResponseClass;
function PredictionsByStopJoinResponse() {
  if (PredictionsByStopJoinResponseClass === VOID) {
    class $ {
      constructor(predictionsByStop, trips, vehicles) {
        Companion_getInstance();
        this.d9o_1 = predictionsByStop;
        this.e9o_1 = trips;
        this.f9o_1 = vehicles;
      }
      h9o(updatedPredictions) {
        var updatedPredictionsByStop = plus(this.d9o_1, new (Pair())(updatedPredictions.i9o_1, updatedPredictions.j9o_1));
        // Inline function 'kotlin.collections.mutableSetOf' call
        var usedTrips = LinkedHashSet().f1();
        // Inline function 'kotlin.collections.mutableSetOf' call
        var usedVehicles = LinkedHashSet().f1();
        // Inline function 'kotlin.collections.flatMap' call
        // Inline function 'kotlin.collections.flatMapTo' call
        var destination = ArrayList().g1();
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = updatedPredictionsByStop.t1().x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var list = element.v1().l3();
          addAll(destination, list);
        }
        var predictions = destination;
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s_0 = predictions.x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          usedTrips.i(element_0.q95_1);
          if (!(element_0.r95_1 == null)) {
            usedVehicles.i(element_0.r95_1);
          }
        }
        // Inline function 'kotlin.collections.filterKeys' call
        var this_0 = plus_0(this.e9o_1, updatedPredictions.k9o_1);
        var result = LinkedHashMap().sc();
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s_1 = this_0.t1().x();
        while (_iterator__ex2g4s_1.y()) {
          var entry = _iterator__ex2g4s_1.z();
          var it = entry.u1();
          if (usedTrips.j1(it)) {
            result.t3(entry.u1(), entry.v1());
          }
        }
        var updatedTrips = result;
        // Inline function 'kotlin.collections.filterKeys' call
        var this_1 = plus_0(this.f9o_1, updatedPredictions.l9o_1);
        var result_0 = LinkedHashMap().sc();
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s_2 = this_1.t1().x();
        while (_iterator__ex2g4s_2.y()) {
          var entry_0 = _iterator__ex2g4s_2.z();
          var it_0 = entry_0.u1();
          if (usedVehicles.j1(it_0)) {
            result_0.t3(entry_0.u1(), entry_0.v1());
          }
        }
        var updatedVehicles = result_0;
        return new (PredictionsByStopJoinResponse())(updatedPredictionsByStop, updatedTrips, updatedVehicles);
      }
      m9o() {
        // Inline function 'kotlin.collections.flatMap' call
        var tmp0 = this.d9o_1;
        // Inline function 'kotlin.collections.flatMapTo' call
        var destination = ArrayList().g1();
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = tmp0.t1().x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var list = element.v1().l3();
          addAll(destination, list);
        }
        // Inline function 'kotlin.collections.associateBy' call
        var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(destination, 10)), 16);
        // Inline function 'kotlin.collections.associateByTo' call
        var destination_0 = LinkedHashMap().tc(capacity);
        var _iterator__ex2g4s_0 = destination.x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          var tmp$ret$4 = element_0.g95_1;
          destination_0.t3(tmp$ret$4, element_0);
        }
        var predictionsById = destination_0;
        return new (PredictionsStreamDataResponse())(predictionsById, this.e9o_1, this.f9o_1);
      }
      n9o() {
        // Inline function 'kotlin.collections.map' call
        var this_0 = this.d9o_1;
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(this_0.c1());
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = this_0.t1().x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$1 = item.v1().c1();
          destination.i(tmp$ret$1);
        }
        return sum(destination);
      }
      toString() {
        return '[PredictionsByStopJoinResponse]';
      }
      hashCode() {
        var result = hashCode(this.d9o_1);
        result = imul(result, 31) + hashCode(this.e9o_1) | 0;
        result = imul(result, 31) + hashCode(this.f9o_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof PredictionsByStopJoinResponse()))
          return false;
        var tmp0_other_with_cast = other instanceof PredictionsByStopJoinResponse() ? other : THROW_CCE();
        if (!equals(this.d9o_1, tmp0_other_with_cast.d9o_1))
          return false;
        if (!equals(this.e9o_1, tmp0_other_with_cast.e9o_1))
          return false;
        if (!equals(this.f9o_1, tmp0_other_with_cast.f9o_1))
          return false;
        return true;
      }
      static g9o(seen0, predictionsByStop, trips, vehicles, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(7 === (7 & seen0))) {
          throwMissingFieldException(seen0, 7, $serializer_getInstance_2().b9o_1);
        }
        var $this = createThis(this);
        $this.d9o_1 = predictionsByStop;
        $this.e9o_1 = trips;
        $this.f9o_1 = vehicles;
        return $this;
      }
    }
    initMetadataForClass($, 'PredictionsByStopJoinResponse', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_2});
    PredictionsByStopJoinResponseClass = $;
  }
  return PredictionsByStopJoinResponseClass;
}
function orEmpty(_this__u8e3s4) {
  return _this__u8e3s4 == null ? Companion_getInstance().a9o_1 : _this__u8e3s4;
}
//region block: init
com_mbta_tid_mbta_app_model_response_PredictionsByStopJoinResponse_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_PredictionsByStopJoinResponse$stable = 8;
//endregion
//region block: exports
export {
  PredictionsByStopJoinResponse as PredictionsByStopJoinResponsegggkmsb0lwae,
  orEmpty as orEmpty2aq3yu4qeqrer,
};
//endregion

//# sourceMappingURL=PredictionsByStopJoinResponse.mjs.map
