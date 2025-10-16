import { setOf1u3mizs95ngxo as setOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
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
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_Line_$serializer$stable;
var com_mbta_tid_mbta_app_model_Line$stable;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.s92_1 = setOf('line-Green');
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.Line', this, 7);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('color', false);
        tmp0_serialDesc.p1b('long_name', false);
        tmp0_serialDesc.p1b('short_name', false);
        tmp0_serialDesc.p1b('sort_order', false);
        tmp0_serialDesc.p1b('text_color', false);
        tmp0_serialDesc.p1b('isGrouped', true);
        this.t92_1 = tmp0_serialDesc;
      }
      u92(encoder, value) {
        var tmp0_desc = this.t92_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.l15(tmp0_desc, 0, value.v92_1);
        tmp1_output.l15(tmp0_desc, 1, value.w92_1);
        tmp1_output.l15(tmp0_desc, 2, value.x92_1);
        tmp1_output.l15(tmp0_desc, 3, value.y92_1);
        tmp1_output.g15(tmp0_desc, 4, value.z92_1);
        tmp1_output.l15(tmp0_desc, 5, value.a93_1);
        if (tmp1_output.t15(tmp0_desc, 6) ? true : !(value.b93_1 === Companion_getInstance().s92_1.j1(value.v92_1))) {
          tmp1_output.d15(tmp0_desc, 6, value.b93_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.u92(encoder, value instanceof Line() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.t92_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = 0;
        var tmp9_local5 = null;
        var tmp10_local6 = false;
        var tmp11_input = decoder.v13(tmp0_desc);
        if (tmp11_input.l14()) {
          tmp4_local0 = tmp11_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp11_input.f14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp11_input.f14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp11_input.f14(tmp0_desc, 3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp11_input.a14(tmp0_desc, 4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp11_input.f14(tmp0_desc, 5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
          tmp10_local6 = tmp11_input.x13(tmp0_desc, 6);
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
                tmp5_local1 = tmp11_input.f14(tmp0_desc, 1);
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
                tmp8_local4 = tmp11_input.a14(tmp0_desc, 4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp11_input.f14(tmp0_desc, 5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              case 6:
                tmp10_local6 = tmp11_input.x13(tmp0_desc, 6);
                tmp3_bitMask0 = tmp3_bitMask0 | 64;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp11_input.w13(tmp0_desc);
        return Line().c93(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, null);
      }
      fz() {
        return this.t92_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), StringSerializer_getInstance(), IntSerializer_getInstance(), StringSerializer_getInstance(), BooleanSerializer_getInstance()];
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
var LineClass;
function Line() {
  if (LineClass === VOID) {
    class $ {
      toString() {
        return 'Line(id=' + this.v92_1 + ', color=' + this.w92_1 + ', longName=' + this.x92_1 + ', shortName=' + this.y92_1 + ', sortOrder=' + this.z92_1 + ', textColor=' + this.a93_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.v92_1);
        result = imul(result, 31) + getStringHashCode(this.w92_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.x92_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.y92_1) | 0;
        result = imul(result, 31) + this.z92_1 | 0;
        result = imul(result, 31) + getStringHashCode(this.a93_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Line()))
          return false;
        var tmp0_other_with_cast = other instanceof Line() ? other : THROW_CCE();
        if (!(this.v92_1 === tmp0_other_with_cast.v92_1))
          return false;
        if (!(this.w92_1 === tmp0_other_with_cast.w92_1))
          return false;
        if (!(this.x92_1 === tmp0_other_with_cast.x92_1))
          return false;
        if (!(this.y92_1 === tmp0_other_with_cast.y92_1))
          return false;
        if (!(this.z92_1 === tmp0_other_with_cast.z92_1))
          return false;
        if (!(this.a93_1 === tmp0_other_with_cast.a93_1))
          return false;
        return true;
      }
      static c93(seen0, id, color, longName, shortName, sortOrder, textColor, isGrouped, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(63 === (63 & seen0))) {
          throwMissingFieldException(seen0, 63, $serializer_getInstance().t92_1);
        }
        var $this = createThis(this);
        $this.v92_1 = id;
        $this.w92_1 = color;
        $this.x92_1 = longName;
        $this.y92_1 = shortName;
        $this.z92_1 = sortOrder;
        $this.a93_1 = textColor;
        if (0 === (seen0 & 64))
          $this.b93_1 = Companion_getInstance().s92_1.j1($this.v92_1);
        else
          $this.b93_1 = isGrouped;
        return $this;
      }
    }
    initMetadataForClass($, 'Line', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    LineClass = $;
  }
  return LineClass;
}
//region block: init
com_mbta_tid_mbta_app_model_Line_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_Line$stable = 0;
//endregion
//region block: exports
export {
  $serializer_getInstance as $serializer_getInstance1nx8umnktgatc,
};
//endregion

//# sourceMappingURL=Line.mjs.map
