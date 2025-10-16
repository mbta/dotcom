import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { removePrefix279df90bhrqqg as removePrefix } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  safeMultiply1xb0xo3cufzd3 as safeMultiply,
  safeAdd2ojtf0puot5k0 as safeAdd,
} from './mathNative.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_POWERS_OF_TEN() {
  _init_properties_math_kt__tgcmt4();
  return POWERS_OF_TEN;
}
var POWERS_OF_TEN;
var DecimalFractionClass;
function DecimalFraction() {
  if (DecimalFractionClass === VOID) {
    class $ {
      constructor(fractionalPart, digits) {
        this.y86_1 = fractionalPart;
        this.z86_1 = digits;
        // Inline function 'kotlin.require' call
        if (!(this.z86_1 >= 0)) {
          var message = 'Digits must be non-negative, but was ' + this.z86_1;
          throw IllegalArgumentException().q(toString(message));
        }
      }
      a87(newDigits) {
        return newDigits === this.z86_1 ? this.y86_1 : newDigits > this.z86_1 ? imul(this.y86_1, get_POWERS_OF_TEN()[newDigits - this.z86_1 | 0]) : this.y86_1 / get_POWERS_OF_TEN()[this.z86_1 - newDigits | 0] | 0;
      }
      j8f(other) {
        var tmp0 = this.z86_1;
        // Inline function 'kotlin.comparisons.maxOf' call
        var b = other.z86_1;
        // Inline function 'kotlin.let' call
        var maxPrecision = Math.max(tmp0, b);
        return compareTo(this.a87(maxPrecision), other.a87(maxPrecision));
      }
      d(other) {
        return this.j8f(other instanceof DecimalFraction() ? other : THROW_CCE());
      }
      equals(other) {
        var tmp;
        if (other instanceof DecimalFraction()) {
          tmp = this.j8f(other) === 0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      toString() {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        var denominator = get_POWERS_OF_TEN()[this.z86_1];
        this_0.ej(this.y86_1 / denominator | 0);
        this_0.ic(_Char___init__impl__6a9atx(46));
        this_0.hc(removePrefix((denominator + (this.y86_1 % denominator | 0) | 0).toString(), '1'));
        return this_0.toString();
      }
      hashCode() {
        throw UnsupportedOperationException().f6('DecimalFraction is not supposed to be used as a hash key');
      }
    }
    initMetadataForClass($, 'DecimalFraction', VOID, VOID, [Comparable()]);
    DecimalFractionClass = $;
  }
  return DecimalFractionClass;
}
function multiplyAndAdd(d, n, r) {
  _init_properties_math_kt__tgcmt4();
  var md = d;
  var mr = r;
  if (d.d2(new (Long())(0, 0)) > 0 && r.d2(new (Long())(0, 0)) < 0) {
    md = md.l4();
    mr = mr.f4(n);
  } else if (d.d2(new (Long())(0, 0)) < 0 && r.d2(new (Long())(0, 0)) > 0) {
    md = md.k4();
    mr = mr.g4(n);
  }
  return safeAdd(safeMultiply(md, n), mr);
}
var properties_initialized_math_kt_amm9wq;
function _init_properties_math_kt__tgcmt4() {
  if (!properties_initialized_math_kt_amm9wq) {
    properties_initialized_math_kt_amm9wq = true;
    // Inline function 'kotlin.intArrayOf' call
    POWERS_OF_TEN = new Int32Array([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000]);
  }
}
//region block: exports
export {
  DecimalFraction as DecimalFraction15n0off36xuu9,
  get_POWERS_OF_TEN as get_POWERS_OF_TEN1o6pqgdjh70q1,
  multiplyAndAdd as multiplyAndAdd2gfolze8k1tuw,
};
//endregion

//# sourceMappingURL=math.mjs.map
