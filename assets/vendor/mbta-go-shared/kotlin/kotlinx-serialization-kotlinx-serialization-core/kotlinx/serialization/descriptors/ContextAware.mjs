import {
  equals2au1ep9vhcato as equals,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  toString1pkumu07cwy4m as toString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { SerialDescriptor2pelqekb5ic3a as SerialDescriptor } from './SerialDescriptor.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { SerialDescriptorForNullable2slcv65za9oog as SerialDescriptorForNullable } from '../internal/NullableSerializer.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function withContext(_this__u8e3s4, context) {
  return new (ContextDescriptor())(_this__u8e3s4, context);
}
var ContextDescriptorClass;
function ContextDescriptor() {
  if (ContextDescriptorClass === VOID) {
    class $ {
      constructor(original, kClass) {
        this.u11_1 = original;
        this.v11_1 = kClass;
        this.w11_1 = this.u11_1.j10() + '<' + this.v11_1.gh() + '>';
      }
      j10() {
        return this.w11_1;
      }
      equals(other) {
        var tmp0_elvis_lhs = other instanceof ContextDescriptor() ? other : null;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return false;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var another = tmp;
        return equals(this.u11_1, another.u11_1) && another.v11_1.equals(this.v11_1);
      }
      hashCode() {
        var result = this.v11_1.hashCode();
        result = imul(31, result) + getStringHashCode(this.w11_1) | 0;
        return result;
      }
      toString() {
        return 'ContextDescriptor(kClass: ' + toString(this.v11_1) + ', original: ' + toString(this.u11_1) + ')';
      }
      x11() {
        return this.u11_1.x11();
      }
      t11() {
        return this.u11_1.t11();
      }
      y11() {
        return this.u11_1.y11();
      }
      z11() {
        return this.u11_1.z11();
      }
      a12() {
        return this.u11_1.a12();
      }
      b12(index) {
        return this.u11_1.b12(index);
      }
      c12(name) {
        return this.u11_1.c12(name);
      }
      d12(index) {
        return this.u11_1.d12(index);
      }
      e12(index) {
        return this.u11_1.e12(index);
      }
      f12(index) {
        return this.u11_1.f12(index);
      }
    }
    initMetadataForClass($, 'ContextDescriptor', VOID, VOID, [SerialDescriptor()]);
    ContextDescriptorClass = $;
  }
  return ContextDescriptorClass;
}
function getContextualDescriptor(_this__u8e3s4, descriptor) {
  var tmp0_safe_receiver = get_capturedKClass(descriptor);
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    var tmp0_safe_receiver_0 = _this__u8e3s4.p11(tmp0_safe_receiver);
    tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.fz();
  }
  return tmp;
}
function get_capturedKClass(_this__u8e3s4) {
  var tmp;
  if (_this__u8e3s4 instanceof ContextDescriptor()) {
    tmp = _this__u8e3s4.v11_1;
  } else {
    if (_this__u8e3s4 instanceof SerialDescriptorForNullable()) {
      tmp = get_capturedKClass(_this__u8e3s4.g12_1);
    } else {
      tmp = null;
    }
  }
  return tmp;
}
//region block: exports
export {
  getContextualDescriptor as getContextualDescriptor2n1gf3b895yb8,
  withContext as withContext3ge61vpog00ae,
};
//endregion

//# sourceMappingURL=ContextAware.mjs.map
