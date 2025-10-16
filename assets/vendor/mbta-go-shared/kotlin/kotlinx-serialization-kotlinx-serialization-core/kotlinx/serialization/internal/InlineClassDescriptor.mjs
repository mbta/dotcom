import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from './PluginGeneratedSerialDescriptor.mjs';
import { contentEqualsaf55p28mnw74 as contentEquals } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import {
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from './PluginHelperInterfaces.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function InlinePrimitiveDescriptor(name, primitiveSerializer) {
  return new (InlineClassDescriptor())(name, new (InlinePrimitiveDescriptor$1())(primitiveSerializer));
}
var InlineClassDescriptorClass;
function InlineClassDescriptor() {
  if (InlineClassDescriptorClass === VOID) {
    class $ extends PluginGeneratedSerialDescriptor() {
      constructor(name, generatedSerializer) {
        super(name, generatedSerializer, 1);
        this.d1c_1 = true;
      }
      y11() {
        return this.d1c_1;
      }
      hashCode() {
        return imul(super.hashCode(), 31);
      }
      equals(other) {
        var tmp$ret$0;
        $l$block_5: {
          // Inline function 'kotlinx.serialization.internal.equalsImpl' call
          if (this === other) {
            tmp$ret$0 = true;
            break $l$block_5;
          }
          if (!(other instanceof InlineClassDescriptor())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!(this.j10() === other.j10())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!(other.d1c_1 && contentEquals(this.o1b(), other.o1b()))) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!(this.z11() === other.z11())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          var inductionVariable = 0;
          var last = this.z11();
          if (inductionVariable < last)
            do {
              var index = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              if (!(this.e12(index).j10() === other.e12(index).j10())) {
                tmp$ret$0 = false;
                break $l$block_5;
              }
              if (!equals(this.e12(index).x11(), other.e12(index).x11())) {
                tmp$ret$0 = false;
                break $l$block_5;
              }
            }
             while (inductionVariable < last);
          tmp$ret$0 = true;
        }
        return tmp$ret$0;
      }
    }
    initMetadataForClass($, 'InlineClassDescriptor');
    InlineClassDescriptorClass = $;
  }
  return InlineClassDescriptorClass;
}
var InlinePrimitiveDescriptor$1Class;
function InlinePrimitiveDescriptor$1() {
  if (InlinePrimitiveDescriptor$1Class === VOID) {
    class $ {
      constructor($primitiveSerializer) {
        this.e1c_1 = $primitiveSerializer;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [this.e1c_1];
      }
      fz() {
        var message = 'unsupported';
        throw IllegalStateException().o5(toString(message));
      }
      gz(encoder, value) {
        // Inline function 'kotlin.error' call
        var message = 'unsupported';
        throw IllegalStateException().o5(toString(message));
      }
      hz(decoder) {
        // Inline function 'kotlin.error' call
        var message = 'unsupported';
        throw IllegalStateException().o5(toString(message));
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForClass($, VOID, VOID, VOID, [GeneratedSerializer()]);
    InlinePrimitiveDescriptor$1Class = $;
  }
  return InlinePrimitiveDescriptor$1Class;
}
//region block: exports
export {
  InlinePrimitiveDescriptor as InlinePrimitiveDescriptor3i6ccn1a4fw94,
};
//endregion

//# sourceMappingURL=InlineClassDescriptor.mjs.map
