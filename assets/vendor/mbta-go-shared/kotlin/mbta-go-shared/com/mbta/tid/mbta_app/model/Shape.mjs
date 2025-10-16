import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
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
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_Shape_$serializer$stable;
var com_mbta_tid_mbta_app_model_Shape$stable;
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.Shape', this, 2);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('polyline', true);
        this.w9f_1 = tmp0_serialDesc;
      }
      x9f(encoder, value) {
        var tmp0_desc = this.w9f_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.l15(tmp0_desc, 0, value.c8q_1);
        if (tmp1_output.t15(tmp0_desc, 1) ? true : !(value.d8q_1 == null)) {
          tmp1_output.p15(tmp0_desc, 1, StringSerializer_getInstance(), value.d8q_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.x9f(encoder, value instanceof Shape() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.w9f_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        if (tmp6_input.l14()) {
          tmp4_local0 = tmp6_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp6_input.j14(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp6_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp6_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp6_input.j14(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp6_input.w13(tmp0_desc);
        return Shape().y9f(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.w9f_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance())];
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
var ShapeClass;
function Shape() {
  if (ShapeClass === VOID) {
    class $ {
      toString() {
        return 'Shape(id=' + this.c8q_1 + ', polyline=' + this.d8q_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.c8q_1);
        result = imul(result, 31) + (this.d8q_1 == null ? 0 : getStringHashCode(this.d8q_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Shape()))
          return false;
        var tmp0_other_with_cast = other instanceof Shape() ? other : THROW_CCE();
        if (!(this.c8q_1 === tmp0_other_with_cast.c8q_1))
          return false;
        if (!(this.d8q_1 == tmp0_other_with_cast.d8q_1))
          return false;
        return true;
      }
      static y9f(seen0, id, polyline, serializationConstructorMarker) {
        if (!(1 === (1 & seen0))) {
          throwMissingFieldException(seen0, 1, $serializer_getInstance().w9f_1);
        }
        var $this = createThis(this);
        $this.c8q_1 = id;
        if (0 === (seen0 & 2))
          $this.d8q_1 = null;
        else
          $this.d8q_1 = polyline;
        return $this;
      }
    }
    initMetadataForClass($, 'Shape', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    ShapeClass = $;
  }
  return ShapeClass;
}
//region block: init
com_mbta_tid_mbta_app_model_Shape_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_Shape$stable = 0;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  $serializer_getInstance as $serializer_getInstance9lwaz40e9hrj,
};
//endregion

//# sourceMappingURL=Shape.mjs.map
