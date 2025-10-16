import {
  findPolymorphicSerializer1nm87hvemahcj as findPolymorphicSerializer,
  findPolymorphicSerializerk638ixyjovk5 as findPolymorphicSerializer_0,
} from '../PolymorphicSerializer.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  SerializationStrategyh6ouydnm6hci as SerializationStrategy,
  KSerializerzf77vz1967fq as KSerializer,
} from '../KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../SerializationExceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function decodeSequentially($this, compositeDecoder) {
  var klassName = compositeDecoder.f14($this.fz(), 0);
  var serializer = findPolymorphicSerializer($this, compositeDecoder, klassName);
  return compositeDecoder.i14($this.fz(), 1, serializer);
}
var AbstractPolymorphicSerializerClass;
function AbstractPolymorphicSerializer() {
  if (AbstractPolymorphicSerializerClass === VOID) {
    class $ {
      static vz() {
        return createThis(this);
      }
      yz(encoder, value) {
        var actualSerializer = findPolymorphicSerializer_0(this, encoder, value);
        // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
        var descriptor = this.fz();
        var composite = encoder.v13(descriptor);
        composite.l15(this.fz(), 0, actualSerializer.fz().j10());
        var tmp = this.fz();
        // Inline function 'kotlinx.serialization.internal.cast' call
        var tmp$ret$0 = isInterface(actualSerializer, SerializationStrategy()) ? actualSerializer : THROW_CCE();
        composite.n15(tmp, 1, tmp$ret$0, value);
        composite.w13(descriptor);
      }
      gz(encoder, value) {
        return this.yz(encoder, !(value == null) ? value : THROW_CCE());
      }
      hz(decoder) {
        // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
        var descriptor = this.fz();
        var composite = decoder.v13(descriptor);
        var tmp$ret$0;
        $l$block: {
          var klassName = null;
          var value = null;
          if (composite.l14()) {
            tmp$ret$0 = decodeSequentially(this, composite);
            break $l$block;
          }
          mainLoop: while (true) {
            var index = composite.m14(this.fz());
            switch (index) {
              case -1:
                break mainLoop;
              case 0:
                klassName = composite.f14(this.fz(), index);
                break;
              case 1:
                var tmp0 = klassName;
                var tmp$ret$2;
                $l$block_0: {
                  // Inline function 'kotlin.requireNotNull' call
                  if (tmp0 == null) {
                    var message = 'Cannot read polymorphic value before its type token';
                    throw IllegalArgumentException().q(toString(message));
                  } else {
                    tmp$ret$2 = tmp0;
                    break $l$block_0;
                  }
                }

                klassName = tmp$ret$2;
                var serializer = findPolymorphicSerializer(this, composite, klassName);
                value = composite.i14(this.fz(), index, serializer);
                break;
              default:
                var tmp0_elvis_lhs = klassName;
                throw SerializationException().w10('Invalid index in polymorphic deserialization of ' + (tmp0_elvis_lhs == null ? 'unknown class' : tmp0_elvis_lhs) + ('\n Expected 0, 1 or DECODE_DONE(-1), but found ' + index));
            }
          }
          var tmp0_0 = value;
          var tmp$ret$4;
          $l$block_1: {
            // Inline function 'kotlin.requireNotNull' call
            if (tmp0_0 == null) {
              var message_0 = 'Polymorphic value has not been read for class ' + klassName;
              throw IllegalArgumentException().q(toString(message_0));
            } else {
              tmp$ret$4 = tmp0_0;
              break $l$block_1;
            }
          }
          var tmp = tmp$ret$4;
          tmp$ret$0 = !(tmp == null) ? tmp : THROW_CCE();
        }
        var result = tmp$ret$0;
        composite.w13(descriptor);
        return result;
      }
      zz(decoder, klassName) {
        return decoder.k14().u15(this.wz(), klassName);
      }
      a10(encoder, value) {
        return encoder.k14().v15(this.wz(), value);
      }
    }
    initMetadataForClass($, 'AbstractPolymorphicSerializer', VOID, VOID, [KSerializer()]);
    AbstractPolymorphicSerializerClass = $;
  }
  return AbstractPolymorphicSerializerClass;
}
function throwSubtypeNotRegistered(subClass, baseClass) {
  var tmp0_elvis_lhs = subClass.gh();
  throwSubtypeNotRegistered_0(tmp0_elvis_lhs == null ? toString(subClass) : tmp0_elvis_lhs, baseClass);
}
function throwSubtypeNotRegistered_0(subClassName, baseClass) {
  var scope = "in the polymorphic scope of '" + baseClass.gh() + "'";
  throw SerializationException().w10(subClassName == null ? 'Class discriminator was missing and no default serializers were registered ' + scope + '.' : "Serializer for subclass '" + subClassName + "' is not found " + scope + '.\n' + ("Check if class with serial name '" + subClassName + "' exists and serializer is registered in a corresponding SerializersModule.\n") + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.gh() + "' has to be sealed and '@Serializable'."));
}
//region block: exports
export {
  AbstractPolymorphicSerializer as AbstractPolymorphicSerializer1ccxwp48nfy58,
  throwSubtypeNotRegistered_0 as throwSubtypeNotRegistered2cr459177l268,
  throwSubtypeNotRegistered as throwSubtypeNotRegistered343gt7v9eqwun,
};
//endregion

//# sourceMappingURL=AbstractPolymorphicSerializer.mjs.map
