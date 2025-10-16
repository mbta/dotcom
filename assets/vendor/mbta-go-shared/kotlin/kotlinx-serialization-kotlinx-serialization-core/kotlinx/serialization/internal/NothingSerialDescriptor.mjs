import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { OBJECT_getInstance26229tfe4t547 as OBJECT_getInstance } from '../descriptors/SerialKinds.mjs';
import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  get_isNullable36pbikm8xb7bz as get_isNullable,
  get_isInline5x26qrhi9qs6 as get_isInline,
  get_annotationshjxdbdcl8kmv as get_annotations,
  SerialDescriptor2pelqekb5ic3a as SerialDescriptor,
} from '../descriptors/SerialDescriptor.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function error($this) {
  throw IllegalStateException().o5('Descriptor for type `kotlin.Nothing` does not have elements');
}
var NothingSerialDescriptorClass;
function NothingSerialDescriptor() {
  if (NothingSerialDescriptorClass === VOID) {
    class $ {
      constructor() {
        NothingSerialDescriptor_instance = this;
        this.j1c_1 = OBJECT_getInstance();
        this.k1c_1 = 'kotlin.Nothing';
      }
      x11() {
        return this.j1c_1;
      }
      j10() {
        return this.k1c_1;
      }
      z11() {
        return 0;
      }
      b12(index) {
        error(this);
      }
      c12(name) {
        error(this);
      }
      f12(index) {
        error(this);
      }
      e12(index) {
        error(this);
      }
      d12(index) {
        error(this);
      }
      toString() {
        return 'NothingSerialDescriptor';
      }
      equals(other) {
        return this === other;
      }
      hashCode() {
        return getStringHashCode(this.k1c_1) + imul(31, this.j1c_1.hashCode()) | 0;
      }
    }
    protoOf($).t11 = get_isNullable;
    protoOf($).y11 = get_isInline;
    protoOf($).a12 = get_annotations;
    initMetadataForObject($, 'NothingSerialDescriptor', VOID, VOID, [SerialDescriptor()]);
    NothingSerialDescriptorClass = $;
  }
  return NothingSerialDescriptorClass;
}
var NothingSerialDescriptor_instance;
function NothingSerialDescriptor_getInstance() {
  if (NothingSerialDescriptor_instance === VOID)
    new (NothingSerialDescriptor())();
  return NothingSerialDescriptor_instance;
}
//region block: exports
export {
  NothingSerialDescriptor_getInstance as NothingSerialDescriptor_getInstance39ckonyn56mmu,
};
//endregion

//# sourceMappingURL=NothingSerialDescriptor.mjs.map
