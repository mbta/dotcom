import { Companion_getInstance3phx56r817z7b as Companion_getInstance } from './Visit.mjs';
import { ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import {
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import { take3onnpy6q7ctcz as take } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_history_VisitHistory_$serializer$stable;
var com_mbta_tid_mbta_app_history_VisitHistory$stable;
function VisitHistory$Companion$$childSerializers$_anonymous__r7eo4f() {
  return new (ArrayListSerializer())(Companion_getInstance().r1n());
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
        tmp.p8o_1 = [lazy(tmp_0, VisitHistory$Companion$$childSerializers$_anonymous__r7eo4f)];
        this.q8o_1 = 10;
        this.r8o_1 = 50;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.history.VisitHistory', this, 1);
        tmp0_serialDesc.p1b('visits', true);
        this.s8o_1 = tmp0_serialDesc;
      }
      t8o(encoder, value) {
        var tmp0_desc = this.s8o_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().p8o_1;
        var tmp;
        if (tmp1_output.t15(tmp0_desc, 0)) {
          tmp = true;
        } else {
          var tmp_0 = value.u8o_1;
          // Inline function 'kotlin.collections.mutableListOf' call
          var tmp$ret$0 = ArrayList().g1();
          tmp = !equals(tmp_0, tmp$ret$0);
        }
        if (tmp) {
          tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.u8o_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.t8o(encoder, value instanceof VisitHistory() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.s8o_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_input = decoder.v13(tmp0_desc);
        var tmp6_cached = Companion_getInstance_0().p8o_1;
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
        return VisitHistory().v8o(tmp3_bitMask0, tmp4_local0, null);
      }
      fz() {
        return this.s8o_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [Companion_getInstance_0().p8o_1[0].v1()];
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
var VisitHistoryClass;
function VisitHistory() {
  if (VisitHistoryClass === VOID) {
    class $ {
      constructor() {
        Companion_getInstance_0();
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.u8o_1 = ArrayList().g1();
      }
      w8o(n) {
        return take(this.u8o_1, n);
      }
      x8o(n, $super) {
        n = n === VOID ? 10 : n;
        return $super === VOID ? this.w8o(n) : $super.w8o.call(this, n);
      }
      static v8o(seen0, visits, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(0 === (0 & seen0))) {
          throwMissingFieldException(seen0, 0, $serializer_getInstance().s8o_1);
        }
        var $this = createThis(this);
        if (0 === (seen0 & 1)) {
          var tmp = $this;
          // Inline function 'kotlin.collections.mutableListOf' call
          tmp.u8o_1 = ArrayList().g1();
        } else
          $this.u8o_1 = visits;
        return $this;
      }
    }
    initMetadataForClass($, 'VisitHistory', VisitHistory, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    VisitHistoryClass = $;
  }
  return VisitHistoryClass;
}
//region block: init
com_mbta_tid_mbta_app_history_VisitHistory_$serializer$stable = 8;
com_mbta_tid_mbta_app_history_VisitHistory$stable = 8;
//endregion
//region block: exports
export {
  VisitHistory as VisitHistory3b9hof6750f59,
};
//endregion

//# sourceMappingURL=VisitHistory.mjs.map
