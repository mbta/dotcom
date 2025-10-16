import { $serializer_getInstance2ax2q0y9qwxlq as $serializer_getInstance } from './RouteResult.mjs';
import { ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { $serializer_getInstanceonqzihfrc8m9 as $serializer_getInstance_0 } from './StopResult.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_SearchResults_$serializer$stable;
var com_mbta_tid_mbta_app_model_SearchResults$stable;
function SearchResults$Companion$$childSerializers$_anonymous__q1kzzw() {
  return new (ArrayListSerializer())($serializer_getInstance());
}
function SearchResults$Companion$$childSerializers$_anonymous__q1kzzw_0() {
  return new (ArrayListSerializer())($serializer_getInstance_0());
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, SearchResults$Companion$$childSerializers$_anonymous__q1kzzw);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.m9f_1 = [tmp_1, lazy(tmp_2, SearchResults$Companion$$childSerializers$_anonymous__q1kzzw_0)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.SearchResults', this, 2);
        tmp0_serialDesc.p1b('routes', true);
        tmp0_serialDesc.p1b('stops', true);
        this.n9f_1 = tmp0_serialDesc;
      }
      o9f(encoder, value) {
        var tmp0_desc = this.n9f_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().m9f_1;
        if (tmp1_output.t15(tmp0_desc, 0) ? true : !equals(value.p9f_1, emptyList())) {
          tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.p9f_1);
        }
        if (tmp1_output.t15(tmp0_desc, 1) ? true : !equals(value.q9f_1, emptyList())) {
          tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.q9f_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.o9f(encoder, value instanceof SearchResults() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.n9f_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        var tmp7_cached = Companion_getInstance().m9f_1;
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
        return SearchResults().r9f(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.n9f_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().m9f_1;
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
var SearchResultsClass;
function SearchResults() {
  if (SearchResultsClass === VOID) {
    class $ {
      constructor(routes, stops) {
        Companion_getInstance();
        routes = routes === VOID ? emptyList() : routes;
        stops = stops === VOID ? emptyList() : stops;
        this.p9f_1 = routes;
        this.q9f_1 = stops;
      }
      toString() {
        return 'SearchResults(routes=' + toString(this.p9f_1) + ', stops=' + toString(this.q9f_1) + ')';
      }
      hashCode() {
        var result = hashCode(this.p9f_1);
        result = imul(result, 31) + hashCode(this.q9f_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof SearchResults()))
          return false;
        var tmp0_other_with_cast = other instanceof SearchResults() ? other : THROW_CCE();
        if (!equals(this.p9f_1, tmp0_other_with_cast.p9f_1))
          return false;
        if (!equals(this.q9f_1, tmp0_other_with_cast.q9f_1))
          return false;
        return true;
      }
      static r9f(seen0, routes, stops, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(0 === (0 & seen0))) {
          throwMissingFieldException(seen0, 0, $serializer_getInstance_1().n9f_1);
        }
        var $this = createThis(this);
        if (0 === (seen0 & 1))
          $this.p9f_1 = emptyList();
        else
          $this.p9f_1 = routes;
        if (0 === (seen0 & 2))
          $this.q9f_1 = emptyList();
        else
          $this.q9f_1 = stops;
        return $this;
      }
    }
    initMetadataForClass($, 'SearchResults', SearchResults, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_1});
    SearchResultsClass = $;
  }
  return SearchResultsClass;
}
//region block: init
com_mbta_tid_mbta_app_model_SearchResults_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_SearchResults$stable = 8;
//endregion
//region block: exports
export {
  $serializer_getInstance_1 as $serializer_getInstance2o0xr5rhzt99o,
};
//endregion

//# sourceMappingURL=SearchResults.mjs.map
