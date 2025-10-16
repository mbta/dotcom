import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../SerializationExceptions.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { Char19o2r8palgjof as Char } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { NoOpEncoder_getInstance3if0k9o02xdwe as NoOpEncoder_getInstance } from '../internal/NoOpEncoder.mjs';
import {
  encodeNotNullMark352dnk5r97tvq as encodeNotNullMark,
  beginCollection27i47rk9upjw4 as beginCollection,
  encodeSerializableValue1mu7jsn2oheqi as encodeSerializableValue,
  encodeNullableSerializableValue22qo2euy9x1r4 as encodeNullableSerializableValue,
  shouldEncodeElementDefault1vy568gzcy4z0 as shouldEncodeElementDefault,
  Encoderqvmrpqtq8hnu as Encoder,
  CompositeEncoderknecpkexzn3v as CompositeEncoder,
} from './Encoding.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AbstractEncoderClass;
function AbstractEncoder() {
  if (AbstractEncoderClass === VOID) {
    class $ {
      static o14() {
        return createThis(this);
      }
      v13(descriptor) {
        return this;
      }
      w13(descriptor) {
      }
      p14(descriptor, index) {
        return true;
      }
      q14(value) {
        throw SerializationException().w10('Non-serializable ' + toString(getKClassFromExpression(value)) + ' is not supported by ' + toString(getKClassFromExpression(this)) + ' encoder');
      }
      r14() {
        throw SerializationException().w10("'null' is not supported by default");
      }
      s14(value) {
        return this.q14(value);
      }
      t14(value) {
        return this.q14(value);
      }
      u14(value) {
        return this.q14(value);
      }
      v14(value) {
        return this.q14(value);
      }
      w14(value) {
        return this.q14(value);
      }
      x14(value) {
        return this.q14(value);
      }
      y14(value) {
        return this.q14(value);
      }
      z14(value) {
        return this.q14(new (Char())(value));
      }
      a15(value) {
        return this.q14(value);
      }
      b15(enumDescriptor, index) {
        return this.q14(index);
      }
      c15(descriptor) {
        return this;
      }
      d15(descriptor, index, value) {
        if (this.p14(descriptor, index)) {
          this.s14(value);
        }
      }
      e15(descriptor, index, value) {
        if (this.p14(descriptor, index)) {
          this.t14(value);
        }
      }
      f15(descriptor, index, value) {
        if (this.p14(descriptor, index)) {
          this.u14(value);
        }
      }
      g15(descriptor, index, value) {
        if (this.p14(descriptor, index)) {
          this.v14(value);
        }
      }
      h15(descriptor, index, value) {
        if (this.p14(descriptor, index)) {
          this.w14(value);
        }
      }
      i15(descriptor, index, value) {
        if (this.p14(descriptor, index)) {
          this.x14(value);
        }
      }
      j15(descriptor, index, value) {
        if (this.p14(descriptor, index)) {
          this.y14(value);
        }
      }
      k15(descriptor, index, value) {
        if (this.p14(descriptor, index)) {
          this.z14(value);
        }
      }
      l15(descriptor, index, value) {
        if (this.p14(descriptor, index)) {
          this.a15(value);
        }
      }
      m15(descriptor, index) {
        return this.p14(descriptor, index) ? this.c15(descriptor.e12(index)) : NoOpEncoder_getInstance();
      }
      n15(descriptor, index, serializer, value) {
        if (this.p14(descriptor, index)) {
          this.o15(serializer, value);
        }
      }
      p15(descriptor, index, serializer, value) {
        if (this.p14(descriptor, index)) {
          this.q15(serializer, value);
        }
      }
    }
    protoOf($).r15 = encodeNotNullMark;
    protoOf($).s15 = beginCollection;
    protoOf($).o15 = encodeSerializableValue;
    protoOf($).q15 = encodeNullableSerializableValue;
    protoOf($).t15 = shouldEncodeElementDefault;
    initMetadataForClass($, 'AbstractEncoder', VOID, VOID, [Encoder(), CompositeEncoder()]);
    AbstractEncoderClass = $;
  }
  return AbstractEncoderClass;
}
//region block: exports
export {
  AbstractEncoder as AbstractEncoder2gxtu3xmy3f8j,
};
//endregion

//# sourceMappingURL=AbstractEncoder.mjs.map
