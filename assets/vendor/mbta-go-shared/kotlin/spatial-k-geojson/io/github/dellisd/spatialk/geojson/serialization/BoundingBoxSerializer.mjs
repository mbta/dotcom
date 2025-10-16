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
import { BoundingBox1jv7w73fxljkp as BoundingBox } from '../BoundingBox.mjs';
import { JsonEncoder1qlse6simkfi1 as JsonEncoder } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonEncoder.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  JsonArrayBuilderu8edol6ui3pj as JsonArrayBuilder,
  addyiu3vei5emo4 as add,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonElementBuilders.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var BoundingBoxSerializerClass;
function BoundingBoxSerializer() {
  if (BoundingBoxSerializerClass === VOID) {
    class $ {
      constructor() {
        this.e1z_1 = 4;
        this.f1z_1 = 6;
      }
      fz() {
        return buildSerialDescriptor('BoundingBox', LIST_getInstance(), []);
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
        var tmp_0;
        switch (array.c1()) {
          case 4:
            tmp_0 = BoundingBox().q1x(get_double(get_jsonPrimitive(array.e1(0))), get_double(get_jsonPrimitive(array.e1(1))), get_double(get_jsonPrimitive(array.e1(2))), get_double(get_jsonPrimitive(array.e1(3))));
            break;
          case 6:
            tmp_0 = BoundingBox().r1x(get_double(get_jsonPrimitive(array.e1(0))), get_double(get_jsonPrimitive(array.e1(1))), get_double(get_jsonPrimitive(array.e1(2))), get_double(get_jsonPrimitive(array.e1(3))), get_double(get_jsonPrimitive(array.e1(4))), get_double(get_jsonPrimitive(array.e1(5))));
            break;
          default:
            throw SerializationException().w10('Expected array of size 4 or 6. Got array of size ' + array.c1());
        }
        return tmp_0;
      }
      g1z(encoder, value) {
        if ((isInterface(encoder, JsonEncoder()) ? encoder : null) == null)
          throw SerializationException().w10('This class can only be saved as JSON');
        encoder.y1o(this.h1z(value));
      }
      gz(encoder, value) {
        return this.g1z(encoder, value instanceof BoundingBox() ? value : THROW_CCE());
      }
      h1z(_this__u8e3s4) {
        // Inline function 'kotlinx.serialization.json.buildJsonArray' call
        var builder = new (JsonArrayBuilder())();
        // Inline function 'kotlin.collections.forEach' call
        var indexedObject = _this__u8e3s4.o1x_1;
        var inductionVariable = 0;
        var last = indexedObject.length;
        while (inductionVariable < last) {
          var element = indexedObject[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          add(builder, element);
        }
        return builder.o1m();
      }
    }
    initMetadataForObject($, 'BoundingBoxSerializer', VOID, VOID, [KSerializer()]);
    BoundingBoxSerializerClass = $;
  }
  return BoundingBoxSerializerClass;
}
var BoundingBoxSerializer_instance;
function BoundingBoxSerializer_getInstance() {
  return BoundingBoxSerializer_instance;
}
//region block: init
BoundingBoxSerializer_instance = new (BoundingBoxSerializer())();
//endregion
//region block: exports
export {
  BoundingBoxSerializer_getInstance as BoundingBoxSerializer_getInstanceenvs9yobi01n,
  BoundingBoxSerializer_instance as BoundingBoxSerializer_instance1ogrnw1yjt4t8,
};
//endregion

//# sourceMappingURL=BoundingBoxSerializer.mjs.map
