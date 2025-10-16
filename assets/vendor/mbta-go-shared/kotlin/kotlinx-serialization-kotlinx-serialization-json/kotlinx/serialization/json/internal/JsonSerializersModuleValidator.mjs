import {
  CONTEXTUAL_getInstance1845118lbzky0 as CONTEXTUAL_getInstance,
  PolymorphicKindla9gurooefwb as PolymorphicKind,
  PrimitiveKindndgbuh6is7ze as PrimitiveKind,
  LIST_getInstancey7k5h8d5cvxt as LIST_getInstance,
  MAP_getInstance3s1t6byguxmp9 as MAP_getInstance,
  ENUMlmq49cvwy4ow as ENUM,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import {
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ClassDiscriminatorMode_NONE_getInstance1g0i4x2dh4wbf as ClassDiscriminatorMode_NONE_getInstance } from '../JsonConfiguration.mjs';
import {
  contextual3hpp1gupsu4al as contextual,
  SerializersModuleCollector3dddz14wd7brg as SerializersModuleCollector,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/modules/SerializersModuleCollector.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function checkKind($this, descriptor, actualClass) {
  var kind = descriptor.x11();
  var tmp;
  if (kind instanceof PolymorphicKind()) {
    tmp = true;
  } else {
    tmp = equals(kind, CONTEXTUAL_getInstance());
  }
  if (tmp) {
    throw IllegalArgumentException().q('Serializer for ' + actualClass.gh() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
  }
  if ($this.l1r_1)
    return Unit_instance;
  if (!$this.m1r_1)
    return Unit_instance;
  var tmp_0;
  var tmp_1;
  if (equals(kind, LIST_getInstance()) || equals(kind, MAP_getInstance())) {
    tmp_1 = true;
  } else {
    tmp_1 = kind instanceof PrimitiveKind();
  }
  if (tmp_1) {
    tmp_0 = true;
  } else {
    tmp_0 = kind instanceof ENUM();
  }
  if (tmp_0) {
    throw IllegalArgumentException().q('Serializer for ' + actualClass.gh() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
  }
}
function checkDiscriminatorCollisions($this, descriptor, actualClass) {
  var inductionVariable = 0;
  var last = descriptor.z11();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var name = descriptor.b12(i);
      if (name === $this.k1r_1) {
        throw IllegalArgumentException().q('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, rename property with @SerialName annotation or fall back to array polymorphism');
      }
    }
     while (inductionVariable < last);
}
var JsonSerializersModuleValidatorClass;
function JsonSerializersModuleValidator() {
  if (JsonSerializersModuleValidatorClass === VOID) {
    class $ {
      constructor(configuration) {
        this.k1r_1 = configuration.y1m_1;
        this.l1r_1 = configuration.x1m_1;
        this.m1r_1 = !configuration.f1n_1.equals(ClassDiscriminatorMode_NONE_getInstance());
      }
      v1k(kClass, provider) {
      }
      y1k(baseClass, actualClass, actualSerializer) {
        var descriptor = actualSerializer.fz();
        checkKind(this, descriptor, actualClass);
        if (!this.l1r_1 && this.m1r_1) {
          checkDiscriminatorCollisions(this, descriptor, actualClass);
        }
      }
      z1k(baseClass, defaultSerializerProvider) {
      }
      a1l(baseClass, defaultDeserializerProvider) {
      }
    }
    protoOf($).x1k = contextual;
    initMetadataForClass($, 'JsonSerializersModuleValidator', VOID, VOID, [SerializersModuleCollector()]);
    JsonSerializersModuleValidatorClass = $;
  }
  return JsonSerializersModuleValidatorClass;
}
//region block: exports
export {
  JsonSerializersModuleValidator as JsonSerializersModuleValidator1v682i122jgoa,
};
//endregion

//# sourceMappingURL=JsonSerializersModuleValidator.mjs.map
