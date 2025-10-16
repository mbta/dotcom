import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
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
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_Trip_$serializer$stable;
var com_mbta_tid_mbta_app_model_Trip$stable;
function Trip$Companion$$childSerializers$_anonymous__ix1nuj() {
  return new (ArrayListSerializer())(StringSerializer_getInstance());
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
        tmp.l9i_1 = [null, null, null, null, null, null, lazy(tmp_0, Trip$Companion$$childSerializers$_anonymous__ix1nuj)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.Trip', this, 7);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('direction_id', false);
        tmp0_serialDesc.p1b('headsign', false);
        tmp0_serialDesc.p1b('route_id', false);
        tmp0_serialDesc.p1b('route_pattern_id', true);
        tmp0_serialDesc.p1b('shape_id', true);
        tmp0_serialDesc.p1b('stop_ids', true);
        this.m9i_1 = tmp0_serialDesc;
      }
      n9i(encoder, value) {
        var tmp0_desc = this.m9i_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().l9i_1;
        tmp1_output.l15(tmp0_desc, 0, value.o8t_1);
        tmp1_output.g15(tmp0_desc, 1, value.p8t_1);
        tmp1_output.l15(tmp0_desc, 2, value.q8t_1);
        tmp1_output.l15(tmp0_desc, 3, value.r8t_1);
        if (tmp1_output.t15(tmp0_desc, 4) ? true : !(value.s8t_1 == null)) {
          tmp1_output.p15(tmp0_desc, 4, StringSerializer_getInstance(), value.s8t_1);
        }
        if (tmp1_output.t15(tmp0_desc, 5) ? true : !(value.t8t_1 == null)) {
          tmp1_output.p15(tmp0_desc, 5, StringSerializer_getInstance(), value.t8t_1);
        }
        if (tmp1_output.t15(tmp0_desc, 6) ? true : !(value.u8t_1 == null)) {
          tmp1_output.p15(tmp0_desc, 6, tmp2_cached[6].v1(), value.u8t_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.n9i(encoder, value instanceof Trip() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.m9i_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = 0;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = null;
        var tmp9_local5 = null;
        var tmp10_local6 = null;
        var tmp11_input = decoder.v13(tmp0_desc);
        var tmp12_cached = Companion_getInstance().l9i_1;
        if (tmp11_input.l14()) {
          tmp4_local0 = tmp11_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp11_input.a14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp11_input.f14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp11_input.f14(tmp0_desc, 3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp11_input.j14(tmp0_desc, 4, StringSerializer_getInstance(), tmp8_local4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp11_input.j14(tmp0_desc, 5, StringSerializer_getInstance(), tmp9_local5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
          tmp10_local6 = tmp11_input.j14(tmp0_desc, 6, tmp12_cached[6].v1(), tmp10_local6);
          tmp3_bitMask0 = tmp3_bitMask0 | 64;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp11_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp11_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp11_input.a14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp11_input.f14(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp11_input.f14(tmp0_desc, 3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp11_input.j14(tmp0_desc, 4, StringSerializer_getInstance(), tmp8_local4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp11_input.j14(tmp0_desc, 5, StringSerializer_getInstance(), tmp9_local5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              case 6:
                tmp10_local6 = tmp11_input.j14(tmp0_desc, 6, tmp12_cached[6].v1(), tmp10_local6);
                tmp3_bitMask0 = tmp3_bitMask0 | 64;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp11_input.w13(tmp0_desc);
        return Trip().o9i(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, null);
      }
      fz() {
        return this.m9i_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().l9i_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), IntSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), get_nullable(tmp0_cached[6].v1())];
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
var TripClass;
function Trip() {
  if (TripClass === VOID) {
    class $ {
      toString() {
        return 'Trip(id=' + this.o8t_1 + ', directionId=' + this.p8t_1 + ', headsign=' + this.q8t_1 + ', routeId=' + this.r8t_1 + ', routePatternId=' + this.s8t_1 + ', shapeId=' + this.t8t_1 + ', stopIds=' + toString(this.u8t_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.o8t_1);
        result = imul(result, 31) + this.p8t_1 | 0;
        result = imul(result, 31) + getStringHashCode(this.q8t_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.r8t_1) | 0;
        result = imul(result, 31) + (this.s8t_1 == null ? 0 : getStringHashCode(this.s8t_1)) | 0;
        result = imul(result, 31) + (this.t8t_1 == null ? 0 : getStringHashCode(this.t8t_1)) | 0;
        result = imul(result, 31) + (this.u8t_1 == null ? 0 : hashCode(this.u8t_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Trip()))
          return false;
        var tmp0_other_with_cast = other instanceof Trip() ? other : THROW_CCE();
        if (!(this.o8t_1 === tmp0_other_with_cast.o8t_1))
          return false;
        if (!(this.p8t_1 === tmp0_other_with_cast.p8t_1))
          return false;
        if (!(this.q8t_1 === tmp0_other_with_cast.q8t_1))
          return false;
        if (!(this.r8t_1 === tmp0_other_with_cast.r8t_1))
          return false;
        if (!(this.s8t_1 == tmp0_other_with_cast.s8t_1))
          return false;
        if (!(this.t8t_1 == tmp0_other_with_cast.t8t_1))
          return false;
        if (!equals(this.u8t_1, tmp0_other_with_cast.u8t_1))
          return false;
        return true;
      }
      static o9i(seen0, id, directionId, headsign, routeId, routePatternId, shapeId, stopIds, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(15 === (15 & seen0))) {
          throwMissingFieldException(seen0, 15, $serializer_getInstance().m9i_1);
        }
        var $this = createThis(this);
        $this.o8t_1 = id;
        $this.p8t_1 = directionId;
        $this.q8t_1 = headsign;
        $this.r8t_1 = routeId;
        if (0 === (seen0 & 16))
          $this.s8t_1 = null;
        else
          $this.s8t_1 = routePatternId;
        if (0 === (seen0 & 32))
          $this.t8t_1 = null;
        else
          $this.t8t_1 = shapeId;
        if (0 === (seen0 & 64))
          $this.u8t_1 = null;
        else
          $this.u8t_1 = stopIds;
        return $this;
      }
    }
    initMetadataForClass($, 'Trip', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    TripClass = $;
  }
  return TripClass;
}
//region block: init
com_mbta_tid_mbta_app_model_Trip_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_Trip$stable = 8;
//endregion
//region block: exports
export {
  $serializer_getInstance as $serializer_getInstancekv1idx7l1joz,
};
//endregion

//# sourceMappingURL=Trip.mjs.map
