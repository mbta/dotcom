import { JsonClassDiscriminator3irfencugy52m as JsonClassDiscriminator } from '../JsonAnnotations.mjs';
import { JsonEncodingException1thxguokvyir3 as JsonEncodingException } from './JsonExceptions.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { SealedClassSerializeriwipiibk55zc as SealedClassSerializer } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SealedSerializer.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { jsonCachedSerialNameslxufy2gu43jt as jsonCachedSerialNames } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/JsonInternalDependencies.mjs';
import {
  ENUMlmq49cvwy4ow as ENUM,
  PrimitiveKindndgbuh6is7ze as PrimitiveKind,
  PolymorphicKindla9gurooefwb as PolymorphicKind,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function classDiscriminator(_this__u8e3s4, json) {
  var _iterator__ex2g4s = _this__u8e3s4.a12().x();
  while (_iterator__ex2g4s.y()) {
    var annotation = _iterator__ex2g4s.z();
    if (annotation instanceof JsonClassDiscriminator())
      return annotation.m1t_1;
  }
  return json.e1l_1.y1m_1;
}
function throwJsonElementPolymorphicException(serialName, element) {
  throw JsonEncodingException().q1q('Class with serial name ' + serialName + ' cannot be serialized polymorphically because it is represented as ' + getKClassFromExpression(element).gh() + '. Make sure that its JsonTransformingSerializer returns JsonObject, so class discriminator can be added to it.');
}
function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
  if (!(serializer instanceof SealedClassSerializer()))
    return Unit_instance;
  if (jsonCachedSerialNames(actualSerializer.fz()).j1(classDiscriminator)) {
    var baseName = serializer.fz().j10();
    var actualName = actualSerializer.fz().j10();
    // Inline function 'kotlin.error' call
    var message = "Sealed class '" + actualName + "' cannot be serialized as base class '" + baseName + "' because" + (" it has property name that conflicts with JSON class discriminator '" + classDiscriminator + "'. ") + 'You can either change class discriminator in JsonConfiguration, rename property with @SerialName annotation or fall back to array polymorphism';
    throw IllegalStateException().o5(toString(message));
  }
}
function checkKind(kind) {
  if (kind instanceof ENUM()) {
    // Inline function 'kotlin.error' call
    var message = "Enums cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
    throw IllegalStateException().o5(toString(message));
  }
  if (kind instanceof PrimitiveKind()) {
    // Inline function 'kotlin.error' call
    var message_0 = "Primitives cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
    throw IllegalStateException().o5(toString(message_0));
  }
  if (kind instanceof PolymorphicKind()) {
    // Inline function 'kotlin.error' call
    var message_1 = 'Actual serializer for polymorphic cannot be polymorphic itself';
    throw IllegalStateException().o5(toString(message_1));
  }
}
function access$validateIfSealed$tPolymorphicKt(serializer, actualSerializer, classDiscriminator) {
  return validateIfSealed(serializer, actualSerializer, classDiscriminator);
}
//region block: exports
export {
  access$validateIfSealed$tPolymorphicKt as access$validateIfSealed$tPolymorphicKt4rflg4qeqfyp,
  checkKind as checkKind2e7hdnuk9c0tp,
  classDiscriminator as classDiscriminator9fd3hvqsgfqq,
  throwJsonElementPolymorphicException as throwJsonElementPolymorphicException318k7fndarnuv,
};
//endregion

//# sourceMappingURL=Polymorphic.mjs.map
