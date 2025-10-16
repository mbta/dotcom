import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../KSerializer.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { cachedSerialNames31jc5fovi62px as cachedSerialNames } from './Platform.common.mjs';
import { SerialDescriptor2pelqekb5ic3a as SerialDescriptor } from '../descriptors/SerialDescriptor.mjs';
import { CachedNames2minxlyafeo07 as CachedNames } from './CachedNames.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var NullableSerializerClass;
function NullableSerializer() {
  if (NullableSerializerClass === VOID) {
    class $ {
      constructor(serializer) {
        this.l1c_1 = serializer;
        this.m1c_1 = new (SerialDescriptorForNullable())(this.l1c_1.fz());
      }
      fz() {
        return this.m1c_1;
      }
      n1c(encoder, value) {
        if (!(value == null)) {
          encoder.r15();
          encoder.o15(this.l1c_1, value);
        } else {
          encoder.r14();
        }
      }
      gz(encoder, value) {
        return this.n1c(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
      }
      hz(decoder) {
        return decoder.g13() ? decoder.u13(this.l1c_1) : decoder.h13();
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof NullableSerializer()))
          THROW_CCE();
        if (!equals(this.l1c_1, other.l1c_1))
          return false;
        return true;
      }
      hashCode() {
        return hashCode(this.l1c_1);
      }
    }
    initMetadataForClass($, 'NullableSerializer', VOID, VOID, [KSerializer()]);
    NullableSerializerClass = $;
  }
  return NullableSerializerClass;
}
var SerialDescriptorForNullableClass;
function SerialDescriptorForNullable() {
  if (SerialDescriptorForNullableClass === VOID) {
    class $ {
      constructor(original) {
        this.g12_1 = original;
        this.h12_1 = this.g12_1.j10() + '?';
        this.i12_1 = cachedSerialNames(this.g12_1);
      }
      j10() {
        return this.h12_1;
      }
      c13() {
        return this.i12_1;
      }
      t11() {
        return true;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof SerialDescriptorForNullable()))
          return false;
        if (!equals(this.g12_1, other.g12_1))
          return false;
        return true;
      }
      toString() {
        return toString(this.g12_1) + '?';
      }
      hashCode() {
        return imul(hashCode(this.g12_1), 31);
      }
      x11() {
        return this.g12_1.x11();
      }
      y11() {
        return this.g12_1.y11();
      }
      z11() {
        return this.g12_1.z11();
      }
      a12() {
        return this.g12_1.a12();
      }
      b12(index) {
        return this.g12_1.b12(index);
      }
      c12(name) {
        return this.g12_1.c12(name);
      }
      d12(index) {
        return this.g12_1.d12(index);
      }
      e12(index) {
        return this.g12_1.e12(index);
      }
      f12(index) {
        return this.g12_1.f12(index);
      }
    }
    initMetadataForClass($, 'SerialDescriptorForNullable', VOID, VOID, [SerialDescriptor(), CachedNames()]);
    SerialDescriptorForNullableClass = $;
  }
  return SerialDescriptorForNullableClass;
}
//region block: exports
export {
  NullableSerializer as NullableSerializer41etqlj0tdq5,
  SerialDescriptorForNullable as SerialDescriptorForNullable2slcv65za9oog,
};
//endregion

//# sourceMappingURL=NullableSerializer.mjs.map
