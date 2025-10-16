import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  format$default2wn8ht1tr5xi2 as format$default,
  FormatterStructure1ss012tmsg37r as FormatterStructure,
} from './Formatter.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { get_POWERS_OF_TEN1o6pqgdjh70q1 as get_POWERS_OF_TEN } from '../../math.mjs';
import { substring3saq8ornu0luv as substring } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { abs1kdzbjes1idip as abs } from '../../../../../../kotlin-kotlin-stdlib/kotlin/math/math.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var UnsignedIntFormatterStructureClass;
function UnsignedIntFormatterStructure() {
  if (UnsignedIntFormatterStructureClass === VOID) {
    class $ {
      constructor(number, zeroPadding) {
        this.f8d_1 = number;
        this.g8d_1 = zeroPadding;
        // Inline function 'kotlin.require' call
        if (!(this.g8d_1 >= 0)) {
          var message = 'The minimum number of digits (' + this.g8d_1 + ') is negative';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(this.g8d_1 <= 9)) {
          var message_0 = 'The minimum number of digits (' + this.g8d_1 + ') exceeds the length of an Int';
          throw IllegalArgumentException().q(toString(message_0));
        }
      }
      x8c(obj, builder, minusNotRequired) {
        var num = this.f8d_1(obj);
        var numberStr = num.toString();
        // Inline function 'kotlin.repeat' call
        var times = this.g8d_1 - numberStr.length | 0;
        var inductionVariable = 0;
        if (inductionVariable < times)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            builder.ic(_Char___init__impl__6a9atx(48));
          }
           while (inductionVariable < times);
        builder.v(numberStr);
      }
    }
    protoOf($).t82 = format$default;
    initMetadataForClass($, 'UnsignedIntFormatterStructure', VOID, VOID, [FormatterStructure()]);
    UnsignedIntFormatterStructureClass = $;
  }
  return UnsignedIntFormatterStructureClass;
}
var DecimalFractionFormatterStructureClass;
function DecimalFractionFormatterStructure() {
  if (DecimalFractionFormatterStructureClass === VOID) {
    class $ {
      constructor(number, minDigits, maxDigits, zerosToAdd) {
        this.h8d_1 = number;
        this.i8d_1 = minDigits;
        this.j8d_1 = maxDigits;
        this.k8d_1 = zerosToAdd;
        var containsArg = this.i8d_1;
        // Inline function 'kotlin.require' call
        if (!(1 <= containsArg ? containsArg <= 9 : false)) {
          var message = 'The minimum number of digits (' + this.i8d_1 + ') is not in range 1..9';
          throw IllegalArgumentException().q(toString(message));
        }
        var containsLower = this.i8d_1;
        var containsArg_0 = this.j8d_1;
        // Inline function 'kotlin.require' call
        if (!(containsLower <= containsArg_0 ? containsArg_0 <= 9 : false)) {
          var message_0 = 'The maximum number of digits (' + this.j8d_1 + ') is not in range ' + this.i8d_1 + '..9';
          throw IllegalArgumentException().q(toString(message_0));
        }
      }
      x8c(obj, builder, minusNotRequired) {
        var number = this.h8d_1(obj);
        var numberWithRequiredPrecision = number.a87(this.j8d_1);
        var zerosToStrip = 0;
        while (this.j8d_1 > (this.i8d_1 + zerosToStrip | 0) && (numberWithRequiredPrecision % get_POWERS_OF_TEN()[zerosToStrip + 1 | 0] | 0) === 0) {
          zerosToStrip = zerosToStrip + 1 | 0;
        }
        var zerosToAddBack = this.k8d_1.e1((this.j8d_1 - zerosToStrip | 0) - 1 | 0);
        if (zerosToStrip >= zerosToAddBack)
          zerosToStrip = zerosToStrip - zerosToAddBack | 0;
        var digitsToOutput = this.j8d_1 - zerosToStrip | 0;
        var numberToOutput = numberWithRequiredPrecision / get_POWERS_OF_TEN()[zerosToStrip] | 0;
        builder.v(substring((numberToOutput + get_POWERS_OF_TEN()[digitsToOutput] | 0).toString(), 1));
      }
    }
    protoOf($).t82 = format$default;
    initMetadataForClass($, 'DecimalFractionFormatterStructure', VOID, VOID, [FormatterStructure()]);
    DecimalFractionFormatterStructureClass = $;
  }
  return DecimalFractionFormatterStructureClass;
}
var SignedIntFormatterStructureClass;
function SignedIntFormatterStructure() {
  if (SignedIntFormatterStructureClass === VOID) {
    class $ {
      constructor(number, zeroPadding, outputPlusOnExceededWidth) {
        this.l8d_1 = number;
        this.m8d_1 = zeroPadding;
        this.n8d_1 = outputPlusOnExceededWidth;
        // Inline function 'kotlin.require' call
        if (!(this.m8d_1 >= 0)) {
          var message = 'The minimum number of digits (' + this.m8d_1 + ') is negative';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(this.m8d_1 <= 9)) {
          var message_0 = 'The minimum number of digits (' + this.m8d_1 + ') exceeds the length of an Int';
          throw IllegalArgumentException().q(toString(message_0));
        }
      }
      x8c(obj, builder, minusNotRequired) {
        var innerBuilder = StringBuilder().f();
        // Inline function 'kotlin.let' call
        var it = this.l8d_1(obj);
        var number = minusNotRequired && it < 0 ? -it | 0 : it;
        if (!(this.n8d_1 == null) && number >= get_POWERS_OF_TEN()[this.n8d_1]) {
          innerBuilder.ic(_Char___init__impl__6a9atx(43));
        }
        // Inline function 'kotlin.math.absoluteValue' call
        if (abs(number) < get_POWERS_OF_TEN()[this.m8d_1 - 1 | 0]) {
          if (number >= 0) {
            innerBuilder.ej(number + get_POWERS_OF_TEN()[this.m8d_1] | 0).lj(0);
          } else {
            innerBuilder.ej(number - get_POWERS_OF_TEN()[this.m8d_1] | 0).lj(1);
          }
        } else {
          innerBuilder.ej(number);
        }
        builder.v(innerBuilder);
      }
    }
    protoOf($).t82 = format$default;
    initMetadataForClass($, 'SignedIntFormatterStructure', VOID, VOID, [FormatterStructure()]);
    SignedIntFormatterStructureClass = $;
  }
  return SignedIntFormatterStructureClass;
}
var ConstantStringFormatterStructureClass;
function ConstantStringFormatterStructure() {
  if (ConstantStringFormatterStructureClass === VOID) {
    class $ {
      constructor(string) {
        this.o8d_1 = string;
      }
      x8c(obj, builder, minusNotRequired) {
        builder.v(this.o8d_1);
      }
    }
    protoOf($).t82 = format$default;
    initMetadataForClass($, 'ConstantStringFormatterStructure', VOID, VOID, [FormatterStructure()]);
    ConstantStringFormatterStructureClass = $;
  }
  return ConstantStringFormatterStructureClass;
}
//region block: exports
export {
  ConstantStringFormatterStructure as ConstantStringFormatterStructure25vvm6os5tq8f,
  DecimalFractionFormatterStructure as DecimalFractionFormatterStructure2fby7dmyhkzn1,
  SignedIntFormatterStructure as SignedIntFormatterStructureuogj4y4pj858,
  UnsignedIntFormatterStructure as UnsignedIntFormatterStructure2iqfxgv3d2ejy,
};
//endregion

//# sourceMappingURL=FormatterOperation.mjs.map
