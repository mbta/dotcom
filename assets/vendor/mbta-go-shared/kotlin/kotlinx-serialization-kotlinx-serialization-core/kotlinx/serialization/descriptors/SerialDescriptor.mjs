import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_isNullable() {
  return false;
}
function get_isInline() {
  return false;
}
function get_annotations() {
  return emptyList();
}
var SerialDescriptorClass;
function SerialDescriptor() {
  if (SerialDescriptorClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'SerialDescriptor');
    SerialDescriptorClass = $;
  }
  return SerialDescriptorClass;
}
function get_elementDescriptors(_this__u8e3s4) {
  // Inline function 'kotlin.collections.Iterable' call
  return new (elementDescriptors$$inlined$Iterable$1())(_this__u8e3s4);
}
function get_elementNames(_this__u8e3s4) {
  // Inline function 'kotlin.collections.Iterable' call
  return new (elementNames$$inlined$Iterable$1())(_this__u8e3s4);
}
var elementDescriptors$1Class;
function elementDescriptors$1() {
  if (elementDescriptors$1Class === VOID) {
    class $ {
      constructor($this_elementDescriptors) {
        this.k12_1 = $this_elementDescriptors;
        this.j12_1 = $this_elementDescriptors.z11();
      }
      y() {
        return this.j12_1 > 0;
      }
      z() {
        var tmp = this.k12_1.z11();
        var _unary__edvuaz = this.j12_1;
        this.j12_1 = _unary__edvuaz - 1 | 0;
        return this.k12_1.e12(tmp - _unary__edvuaz | 0);
      }
    }
    initMetadataForClass($);
    elementDescriptors$1Class = $;
  }
  return elementDescriptors$1Class;
}
var elementDescriptors$$inlined$Iterable$1Class;
function elementDescriptors$$inlined$Iterable$1() {
  if (elementDescriptors$$inlined$Iterable$1Class === VOID) {
    class $ {
      constructor($this_elementDescriptors) {
        this.l12_1 = $this_elementDescriptors;
      }
      x() {
        return new (elementDescriptors$1())(this.l12_1);
      }
    }
    initMetadataForClass($);
    elementDescriptors$$inlined$Iterable$1Class = $;
  }
  return elementDescriptors$$inlined$Iterable$1Class;
}
var elementNames$1Class;
function elementNames$1() {
  if (elementNames$1Class === VOID) {
    class $ {
      constructor($this_elementNames) {
        this.n12_1 = $this_elementNames;
        this.m12_1 = $this_elementNames.z11();
      }
      y() {
        return this.m12_1 > 0;
      }
      z() {
        var tmp = this.n12_1.z11();
        var _unary__edvuaz = this.m12_1;
        this.m12_1 = _unary__edvuaz - 1 | 0;
        return this.n12_1.b12(tmp - _unary__edvuaz | 0);
      }
    }
    initMetadataForClass($);
    elementNames$1Class = $;
  }
  return elementNames$1Class;
}
var elementNames$$inlined$Iterable$1Class;
function elementNames$$inlined$Iterable$1() {
  if (elementNames$$inlined$Iterable$1Class === VOID) {
    class $ {
      constructor($this_elementNames) {
        this.o12_1 = $this_elementNames;
      }
      x() {
        return new (elementNames$1())(this.o12_1);
      }
    }
    initMetadataForClass($);
    elementNames$$inlined$Iterable$1Class = $;
  }
  return elementNames$$inlined$Iterable$1Class;
}
//region block: exports
export {
  get_annotations as get_annotationshjxdbdcl8kmv,
  get_isInline as get_isInline5x26qrhi9qs6,
  get_isNullable as get_isNullable36pbikm8xb7bz,
  SerialDescriptor as SerialDescriptor2pelqekb5ic3a,
  get_elementDescriptors as get_elementDescriptors13xxljc24xo44,
  get_elementNames as get_elementNamesl5b6t976dltd,
};
//endregion

//# sourceMappingURL=SerialDescriptor.mjs.map
