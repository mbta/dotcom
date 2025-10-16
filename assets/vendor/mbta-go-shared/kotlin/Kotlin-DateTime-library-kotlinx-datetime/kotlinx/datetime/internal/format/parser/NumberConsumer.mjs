import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { DecimalFraction15n0off36xuu9 as DecimalFraction } from '../../math.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { asciiDigitToInt1lum15k9ieezj as asciiDigitToInt } from '../../util.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/rangeTo.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var FractionPartConsumerClass;
function FractionPartConsumer() {
  if (FractionPartConsumerClass === VOID) {
    class $ extends NumberConsumer() {
      constructor(minLength, maxLength, setter, name) {
        super(minLength === maxLength ? minLength : null, name);
        this.r8d_1 = minLength;
        this.s8d_1 = maxLength;
        this.t8d_1 = setter;
        var containsArg = this.r8d_1;
        // Inline function 'kotlin.require' call
        if (!(1 <= containsArg ? containsArg <= 9 : false)) {
          var message = 'Invalid minimum length ' + this.r8d_1 + ' for field ' + this.v8d_1 + ': expected 1..9';
          throw IllegalArgumentException().q(toString(message));
        }
        var containsLower = this.r8d_1;
        var containsArg_0 = this.s8d_1;
        // Inline function 'kotlin.require' call
        if (!(containsLower <= containsArg_0 ? containsArg_0 <= 9 : false)) {
          var message_0 = 'Invalid maximum length ' + this.s8d_1 + ' for field ' + this.v8d_1 + ': expected ' + this.r8d_1 + '..9';
          throw IllegalArgumentException().q(toString(message_0));
        }
      }
      w8d(storage, input, start, end) {
        return (end - start | 0) < this.r8d_1 ? new (TooFewDigits())(this.r8d_1) : (end - start | 0) > this.s8d_1 ? new (TooManyDigits())(this.s8d_1) : setWithoutReassigning(this.t8d_1, storage, new (DecimalFraction())(parseAsciiInt(input, start, end), end - start | 0));
      }
    }
    initMetadataForClass($, 'FractionPartConsumer');
    FractionPartConsumerClass = $;
  }
  return FractionPartConsumerClass;
}
var ConstantNumberConsumerClass;
function ConstantNumberConsumer() {
  if (ConstantNumberConsumerClass === VOID) {
    class $ extends NumberConsumer() {
      constructor(expected) {
        super(expected.length, 'the predefined string ' + expected);
        this.z8d_1 = expected;
      }
      w8d(storage, input, start, end) {
        var tmp;
        // Inline function 'kotlin.text.substring' call
        if (toString(charSequenceSubSequence(input, start, end)) === this.z8d_1) {
          tmp = null;
        } else {
          tmp = new (WrongConstant())(this.z8d_1);
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'ConstantNumberConsumer');
    ConstantNumberConsumerClass = $;
  }
  return ConstantNumberConsumerClass;
}
var NumberConsumerClass;
function NumberConsumer() {
  if (NumberConsumerClass === VOID) {
    class $ {
      constructor(length, whatThisExpects) {
        this.u8d_1 = length;
        this.v8d_1 = whatThisExpects;
      }
      a() {
        return this.u8d_1;
      }
    }
    initMetadataForClass($, 'NumberConsumer');
    NumberConsumerClass = $;
  }
  return NumberConsumerClass;
}
var ExpectedIntClass;
function ExpectedInt() {
  if (ExpectedIntClass === VOID) {
    class $ {
      a8e() {
        return 'expected an Int value';
      }
    }
    initMetadataForObject($, 'ExpectedInt');
    ExpectedIntClass = $;
  }
  return ExpectedIntClass;
}
var ExpectedInt_instance;
function ExpectedInt_getInstance() {
  return ExpectedInt_instance;
}
var TooManyDigitsClass;
function TooManyDigits() {
  if (TooManyDigitsClass === VOID) {
    class $ {
      constructor(maxDigits) {
        this.b8e_1 = maxDigits;
      }
      a8e() {
        return 'expected at most ' + this.b8e_1 + ' digits';
      }
    }
    initMetadataForClass($, 'TooManyDigits');
    TooManyDigitsClass = $;
  }
  return TooManyDigitsClass;
}
var TooFewDigitsClass;
function TooFewDigits() {
  if (TooFewDigitsClass === VOID) {
    class $ {
      constructor(minDigits) {
        this.c8e_1 = minDigits;
      }
      a8e() {
        return 'expected at least ' + this.c8e_1 + ' digits';
      }
    }
    initMetadataForClass($, 'TooFewDigits');
    TooFewDigitsClass = $;
  }
  return TooFewDigitsClass;
}
var WrongConstantClass;
function WrongConstant() {
  if (WrongConstantClass === VOID) {
    class $ {
      constructor(expected) {
        this.d8e_1 = expected;
      }
      a8e() {
        return "expected '" + this.d8e_1 + "'";
      }
    }
    initMetadataForClass($, 'WrongConstant');
    WrongConstantClass = $;
  }
  return WrongConstantClass;
}
var ConflictingClass;
function Conflicting() {
  if (ConflictingClass === VOID) {
    class $ {
      constructor(conflicting) {
        this.e8e_1 = conflicting;
      }
      a8e() {
        return "attempted to overwrite the existing value '" + toString(this.e8e_1) + "'";
      }
    }
    initMetadataForClass($, 'Conflicting');
    ConflictingClass = $;
  }
  return ConflictingClass;
}
function setWithoutReassigning(_this__u8e3s4, receiver, value) {
  var tmp0_elvis_lhs = _this__u8e3s4.d8c(receiver, value);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var conflictingValue = tmp;
  return new (Conflicting())(conflictingValue);
}
function parseAsciiInt(_this__u8e3s4, start, end) {
  var result = 0;
  var inductionVariable = start;
  if (inductionVariable < end)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var digit = charSequenceGet(_this__u8e3s4, i);
      result = imul(result, 10) + asciiDigitToInt(digit) | 0;
    }
     while (inductionVariable < end);
  return result;
}
var UnsignedIntConsumerClass;
function UnsignedIntConsumer() {
  if (UnsignedIntConsumerClass === VOID) {
    class $ extends NumberConsumer() {
      constructor(minLength, maxLength, setter, name, multiplyByMinus1) {
        multiplyByMinus1 = multiplyByMinus1 === VOID ? false : multiplyByMinus1;
        super(minLength == maxLength ? minLength : null, name);
        this.h8e_1 = minLength;
        this.i8e_1 = maxLength;
        this.j8e_1 = setter;
        this.k8e_1 = multiplyByMinus1;
        // Inline function 'kotlin.require' call
        if (!(this.a() == null || numberRangeToNumber(1, 9).hs(this.a()))) {
          var message = 'Invalid length for field ' + this.v8d_1 + ': ' + this.a();
          throw IllegalArgumentException().q(toString(message));
        }
      }
      w8d(storage, input, start, end) {
        var tmp;
        if (!(this.i8e_1 == null) && (end - start | 0) > this.i8e_1) {
          tmp = new (TooManyDigits())(this.i8e_1);
        } else if (!(this.h8e_1 == null) && (end - start | 0) < this.h8e_1) {
          tmp = new (TooFewDigits())(this.h8e_1);
        } else {
          var result = parseAsciiIntOrNull(input, start, end);
          tmp = result == null ? ExpectedInt_instance : setWithoutReassigning(this.j8e_1, storage, this.k8e_1 ? -result | 0 : result);
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'UnsignedIntConsumer');
    UnsignedIntConsumerClass = $;
  }
  return UnsignedIntConsumerClass;
}
function parseAsciiIntOrNull(_this__u8e3s4, start, end) {
  var result = 0;
  var inductionVariable = start;
  if (inductionVariable < end)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var digit = charSequenceGet(_this__u8e3s4, i);
      result = imul(result, 10) + asciiDigitToInt(digit) | 0;
      if (result < 0)
        return null;
    }
     while (inductionVariable < end);
  return result;
}
//region block: init
ExpectedInt_instance = new (ExpectedInt())();
//endregion
//region block: exports
export {
  ConstantNumberConsumer as ConstantNumberConsumer1fkn3mtvfbopz,
  FractionPartConsumer as FractionPartConsumerf0mxqojimz2s,
  UnsignedIntConsumer as UnsignedIntConsumer25zhux255gkqb,
};
//endregion

//# sourceMappingURL=NumberConsumer.mjs.map
