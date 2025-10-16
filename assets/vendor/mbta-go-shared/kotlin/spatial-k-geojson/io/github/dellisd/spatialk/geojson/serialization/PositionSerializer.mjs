import { LIST_getInstancey7k5h8d5cvxt as LIST_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { buildSerialDescriptor2873qmkp8r2ib as buildSerialDescriptor } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import { JsonDecoder1rijst5ne6qla as JsonDecoder } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonDecoder.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  get_jsonArray18sglwhl4pclz as get_jsonArray,
  get_jsonPrimitivez17tyd5rw1ql as get_jsonPrimitive,
  get_double1785hcxaminy4 as get_double,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonElement.mjs';
import { getOrNull1go7ef9ldk0df as getOrNull } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { Position2rurtvk7dypvc as Position } from '../Position.mjs';
import { JsonEncoder1qlse6simkfi1 as JsonEncoder } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonEncoder.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  JsonArrayBuilderu8edol6ui3pj as JsonArrayBuilder,
  addyiu3vei5emo4 as add,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonElementBuilders.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var PositionSerializerClass;
function PositionSerializer() {
  if (PositionSerializerClass === VOID) {
    class $ {
      fz() {
        return buildSerialDescriptor('Position', LIST_getInstance(), []);
      }
      hz(decoder) {
        var tmp0_elvis_lhs = isInterface(decoder, JsonDecoder()) ? decoder : null;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          throw SerializationException().w10('This class can only be loaded from JSON');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var input = tmp;
        var array = get_jsonArray(input.h1n());
        var tmp_0 = get_double(get_jsonPrimitive(array.e1(0)));
        var tmp_1 = get_double(get_jsonPrimitive(array.e1(1)));
        var tmp1_safe_receiver = getOrNull(array, 2);
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : get_jsonPrimitive(tmp1_safe_receiver);
        return Position().a1z(tmp_0, tmp_1, tmp2_safe_receiver == null ? null : get_double(tmp2_safe_receiver));
      }
      k1z(encoder, value) {
        if ((isInterface(encoder, JsonEncoder()) ? encoder : null) == null)
          throw SerializationException().w10('This class can only be saved as JSON');
        // Inline function 'kotlinx.serialization.json.buildJsonArray' call
        var builder = new (JsonArrayBuilder())();
        add(builder, value.b1z());
        add(builder, value.c1z());
        if (!(value.d1z() == null)) {
          add(builder, value.d1z());
        }
        var array = builder.o1m();
        encoder.y1o(array);
      }
      gz(encoder, value) {
        return this.k1z(encoder, value instanceof Position() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'PositionSerializer', VOID, VOID, [KSerializer()]);
    PositionSerializerClass = $;
  }
  return PositionSerializerClass;
}
var PositionSerializer_instance;
function PositionSerializer_getInstance() {
  return PositionSerializer_instance;
}
//region block: init
PositionSerializer_instance = new (PositionSerializer())();
//endregion
//region block: exports
export {
  PositionSerializer_getInstance as PositionSerializer_getInstance13wixpw811m18,
  PositionSerializer_instance as PositionSerializer_instance3ntez750wdkar,
};
//endregion

//# sourceMappingURL=PositionSerializer.mjs.map
