import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  emptyList1g2z5xcrvp2zy as emptyList,
  listOf1jh22dvmctj1r as listOf,
  mutableListOf6oorvk2mtdmp as mutableListOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  listOfvhqybd2zx248 as listOf_0,
  checkCountOverflow1ro2fe1r4xvgf as checkCountOverflow,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import {
  ParserStructure2cqp7gjft5io4 as ParserStructure,
  concat2z827ubu7ap26 as concat,
} from './Parser.mjs';
import { repeat2w4c6j8zoq09o as repeat } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Collection1k04j3hzsbod0 as Collection } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Companion_instance1vkshgwp6j1o1 as Companion_instance } from './ParseResult.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { isAsciiDigit3p3aq858xklh as isAsciiDigit } from '../../util.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { UnsignedIntConsumer25zhux255gkqb as UnsignedIntConsumer } from './NumberConsumer.mjs';
import {
  toString3o7ifthqydp6e as toString_0,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function spaceAndZeroPaddedUnsignedInt(minDigits, maxDigits, spacePadding, setter, name, withMinus) {
  withMinus = withMinus === VOID ? false : withMinus;
  var minNumberLength = (minDigits == null ? 1 : minDigits) + (withMinus ? 1 : 0) | 0;
  var tmp;
  if (maxDigits == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = withMinus ? maxDigits + 1 | 0 : maxDigits;
  }
  var tmp2_elvis_lhs = tmp;
  var maxNumberLength = tmp2_elvis_lhs == null ? 2147483647 : tmp2_elvis_lhs;
  var spacePadding_0 = spacePadding == null ? 0 : spacePadding;
  // Inline function 'kotlin.comparisons.minOf' call
  var maxPaddedNumberLength = Math.min(maxNumberLength, spacePadding_0);
  if (minNumberLength >= maxPaddedNumberLength)
    return spaceAndZeroPaddedUnsignedInt$numberOfRequiredLengths(withMinus, setter, name, minNumberLength, maxNumberLength);
  var accumulated = spaceAndZeroPaddedUnsignedInt$numberOfRequiredLengths(withMinus, setter, name, minNumberLength, minNumberLength);
  var inductionVariable = minNumberLength;
  if (inductionVariable < maxPaddedNumberLength)
    do {
      var accumulatedWidth = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      accumulated = new (ParserStructure())(emptyList(), listOf([spaceAndZeroPaddedUnsignedInt$numberOfRequiredLengths(withMinus, setter, name, accumulatedWidth + 1 | 0, accumulatedWidth + 1 | 0), concat(listOf([new (ParserStructure())(listOf_0(new (PlainStringParserOperation())(' ')), emptyList()), accumulated]))]));
    }
     while (inductionVariable < maxPaddedNumberLength);
  var tmp_0;
  if (spacePadding_0 > maxNumberLength) {
    var prepadding = new (PlainStringParserOperation())(repeat(' ', spacePadding_0 - maxNumberLength | 0));
    tmp_0 = concat(listOf([new (ParserStructure())(listOf_0(prepadding), emptyList()), accumulated]));
  } else if (spacePadding_0 === maxNumberLength) {
    tmp_0 = accumulated;
  } else {
    var r = new (ParserStructure())(emptyList(), listOf([spaceAndZeroPaddedUnsignedInt$numberOfRequiredLengths(withMinus, setter, name, spacePadding_0 + 1 | 0, maxNumberLength), accumulated]));
    tmp_0 = r;
  }
  return tmp_0;
}
function _get_whatThisExpects__4pg11j($this) {
  // Inline function 'kotlin.collections.map' call
  var this_0 = $this.b8f_1;
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var length = item.a();
    var tmp$ret$0 = (length == null ? 'at least one digit' : '' + length + ' digits') + (' for ' + item.v8d_1);
    destination.i(tmp$ret$0);
  }
  var consumerLengths = destination;
  var tmp;
  if ($this.d8f_1) {
    tmp = 'a number with at least ' + $this.c8f_1 + ' digits: ' + toString(consumerLengths);
  } else {
    tmp = 'a number with exactly ' + $this.c8f_1 + ' digits: ' + toString(consumerLengths);
  }
  return tmp;
}
function NumberSpanParserOperation$consume$lambda(this$0) {
  return function () {
    return 'Unexpected end of input: yet to parse ' + _get_whatThisExpects__4pg11j(this$0);
  };
}
function NumberSpanParserOperation$consume$lambda_0($digitsInRow, this$0) {
  return function () {
    return 'Only found ' + $digitsInRow._v + ' digits in a row, but need to parse ' + _get_whatThisExpects__4pg11j(this$0);
  };
}
function NumberSpanParserOperation$consume$lambda_1($numberString, this$0, $i, $error) {
  return function () {
    return "Can not interpret the string '" + $numberString + "' as " + this$0.b8f_1.e1($i).v8d_1 + ': ' + $error.a8e();
  };
}
var NumberSpanParserOperationClass;
function NumberSpanParserOperation() {
  if (NumberSpanParserOperationClass === VOID) {
    class $ {
      constructor(consumers) {
        this.b8f_1 = consumers;
        var tmp = this;
        // Inline function 'kotlin.collections.sumOf' call
        var sum = 0;
        var _iterator__ex2g4s = this.b8f_1.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp_0 = sum;
          var tmp0_elvis_lhs = element.a();
          sum = tmp_0 + (tmp0_elvis_lhs == null ? 1 : tmp0_elvis_lhs) | 0;
        }
        tmp.c8f_1 = sum;
        var tmp_1 = this;
        var tmp0 = this.b8f_1;
        var tmp$ret$2;
        $l$block_0: {
          // Inline function 'kotlin.collections.any' call
          var tmp_2;
          if (isInterface(tmp0, Collection())) {
            tmp_2 = tmp0.h1();
          } else {
            tmp_2 = false;
          }
          if (tmp_2) {
            tmp$ret$2 = false;
            break $l$block_0;
          }
          var _iterator__ex2g4s_0 = tmp0.x();
          while (_iterator__ex2g4s_0.y()) {
            var element_0 = _iterator__ex2g4s_0.z();
            if (element_0.a() == null) {
              tmp$ret$2 = true;
              break $l$block_0;
            }
          }
          tmp$ret$2 = false;
        }
        tmp_1.d8f_1 = tmp$ret$2;
        var tmp0_0 = this.b8f_1;
        var tmp$ret$4;
        $l$block_2: {
          // Inline function 'kotlin.collections.all' call
          var tmp_3;
          if (isInterface(tmp0_0, Collection())) {
            tmp_3 = tmp0_0.h1();
          } else {
            tmp_3 = false;
          }
          if (tmp_3) {
            tmp$ret$4 = true;
            break $l$block_2;
          }
          var _iterator__ex2g4s_1 = tmp0_0.x();
          while (_iterator__ex2g4s_1.y()) {
            var element_1 = _iterator__ex2g4s_1.z();
            var tmp0_elvis_lhs_0 = element_1.a();
            if (!((tmp0_elvis_lhs_0 == null ? 2147483647 : tmp0_elvis_lhs_0) > 0)) {
              tmp$ret$4 = false;
              break $l$block_2;
            }
          }
          tmp$ret$4 = true;
        }
        // Inline function 'kotlin.require' call
        // Inline function 'kotlin.require' call
        if (!tmp$ret$4) {
          var message = 'Failed requirement.';
          throw IllegalArgumentException().q(toString(message));
        }
        var tmp0_1 = this.b8f_1;
        var tmp$ret$9;
        $l$block_3: {
          // Inline function 'kotlin.collections.count' call
          var tmp_4;
          if (isInterface(tmp0_1, Collection())) {
            tmp_4 = tmp0_1.h1();
          } else {
            tmp_4 = false;
          }
          if (tmp_4) {
            tmp$ret$9 = 0;
            break $l$block_3;
          }
          var count = 0;
          var _iterator__ex2g4s_2 = tmp0_1.x();
          while (_iterator__ex2g4s_2.y()) {
            var element_2 = _iterator__ex2g4s_2.z();
            if (element_2.a() == null) {
              count = count + 1 | 0;
              checkCountOverflow(count);
            }
          }
          tmp$ret$9 = count;
        }
        // Inline function 'kotlin.require' call
        if (!(tmp$ret$9 <= 1)) {
          // Inline function 'kotlin.collections.filter' call
          var tmp0_2 = this.b8f_1;
          // Inline function 'kotlin.collections.filterTo' call
          var destination = ArrayList().g1();
          var _iterator__ex2g4s_3 = tmp0_2.x();
          while (_iterator__ex2g4s_3.y()) {
            var element_3 = _iterator__ex2g4s_3.z();
            if (element_3.a() == null) {
              destination.i(element_3);
            }
          }
          // Inline function 'kotlin.collections.map' call
          // Inline function 'kotlin.collections.mapTo' call
          var destination_0 = ArrayList().w(collectionSizeOrDefault(destination, 10));
          var _iterator__ex2g4s_4 = destination.x();
          while (_iterator__ex2g4s_4.y()) {
            var item = _iterator__ex2g4s_4.z();
            var tmp$ret$14 = item.v8d_1;
            destination_0.i(tmp$ret$14);
          }
          var fieldNames = destination_0;
          var message_0 = 'At most one variable-length numeric field in a row is allowed, but got several: ' + toString(fieldNames) + '. ' + "Parsing is undefined: for example, with variable-length month number and variable-length day of month, '111' can be parsed as Jan 11th or Nov 1st.";
          throw IllegalArgumentException().q(toString(message_0));
        }
      }
      v8e(storage, input, startIndex) {
        if ((startIndex + this.c8f_1 | 0) > charSequenceLength(input)) {
          var tmp = Companion_instance;
          return tmp.o8e(startIndex, NumberSpanParserOperation$consume$lambda(this));
        }
        var digitsInRow = {_v: 0};
        while ((startIndex + digitsInRow._v | 0) < charSequenceLength(input) && isAsciiDigit(charSequenceGet(input, startIndex + digitsInRow._v | 0))) {
          digitsInRow._v = digitsInRow._v + 1 | 0;
          digitsInRow._v;
        }
        if (digitsInRow._v < this.c8f_1) {
          var tmp_0 = Companion_instance;
          return tmp_0.o8e(startIndex, NumberSpanParserOperation$consume$lambda_0(digitsInRow, this));
        }
        var index = startIndex;
        var inductionVariable = 0;
        var last = this.b8f_1.c1() - 1 | 0;
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp0_elvis_lhs = this.b8f_1.e1(i).a();
            var length = tmp0_elvis_lhs == null ? (digitsInRow._v - this.c8f_1 | 0) + 1 | 0 : tmp0_elvis_lhs;
            var error = this.b8f_1.e1(i).w8d(storage, input, index, index + length | 0);
            if (!(error == null)) {
              var tmp2 = index;
              // Inline function 'kotlin.text.substring' call
              var endIndex = index + length | 0;
              var numberString = toString(charSequenceSubSequence(input, tmp2, endIndex));
              var tmp_1 = Companion_instance;
              var tmp_2 = index;
              return tmp_1.o8e(tmp_2, NumberSpanParserOperation$consume$lambda_1(numberString, this, i, error));
            }
            index = index + length | 0;
          }
           while (inductionVariable <= last);
        return Companion_instance.n8e(index);
      }
      toString() {
        return _get_whatThisExpects__4pg11j(this);
      }
    }
    initMetadataForClass($, 'NumberSpanParserOperation');
    NumberSpanParserOperationClass = $;
  }
  return NumberSpanParserOperationClass;
}
function SignedIntParser(minDigits, maxDigits, spacePadding, setter, name, plusOnExceedsWidth) {
  var parsers = mutableListOf([spaceAndZeroPaddedUnsignedInt(minDigits, maxDigits, spacePadding, setter, name, true)]);
  if (!(plusOnExceedsWidth == null)) {
    parsers.i(spaceAndZeroPaddedUnsignedInt(minDigits, plusOnExceedsWidth, spacePadding, setter, name));
    parsers.i(new (ParserStructure())(listOf([new (PlainStringParserOperation())('+'), new (NumberSpanParserOperation())(listOf_0(new (UnsignedIntConsumer())(plusOnExceedsWidth + 1 | 0, maxDigits, setter, name, false)))]), emptyList()));
  } else {
    parsers.i(spaceAndZeroPaddedUnsignedInt(minDigits, maxDigits, spacePadding, setter, name));
  }
  return new (ParserStructure())(emptyList(), parsers);
}
function PlainStringParserOperation$consume$lambda(this$0) {
  return function () {
    return "Unexpected end of input: yet to parse '" + this$0.e8f_1 + "'";
  };
}
function PlainStringParserOperation$consume$lambda_0(this$0, $input, $startIndex, $i) {
  return function () {
    var tmp0 = $input;
    var tmp2 = $startIndex;
    // Inline function 'kotlin.text.substring' call
    var endIndex = ($startIndex + $i | 0) + 1 | 0;
    var tmp$ret$0 = toString(charSequenceSubSequence(tmp0, tmp2, endIndex));
    return 'Expected ' + this$0.e8f_1 + ' but got ' + tmp$ret$0;
  };
}
var PlainStringParserOperationClass;
function PlainStringParserOperation() {
  if (PlainStringParserOperationClass === VOID) {
    class $ {
      constructor(string) {
        this.e8f_1 = string;
        // Inline function 'kotlin.text.isNotEmpty' call
        var this_0 = this.e8f_1;
        // Inline function 'kotlin.require' call
        if (!(charSequenceLength(this_0) > 0)) {
          var message = 'Empty string is not allowed';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!!isAsciiDigit(charCodeAt(this.e8f_1, 0))) {
          var message_0 = "String '" + this.e8f_1 + "' starts with a digit";
          throw IllegalArgumentException().q(toString(message_0));
        }
        // Inline function 'kotlin.require' call
        if (!!isAsciiDigit(charCodeAt(this.e8f_1, this.e8f_1.length - 1 | 0))) {
          var message_1 = "String '" + this.e8f_1 + "' ends with a digit";
          throw IllegalArgumentException().q(toString(message_1));
        }
      }
      v8e(storage, input, startIndex) {
        if ((startIndex + this.e8f_1.length | 0) > charSequenceLength(input)) {
          var tmp = Companion_instance;
          return tmp.o8e(startIndex, PlainStringParserOperation$consume$lambda(this));
        }
        var inductionVariable = 0;
        var last = charSequenceLength(this.e8f_1) - 1 | 0;
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (!(charSequenceGet(input, startIndex + i | 0) === charCodeAt(this.e8f_1, i))) {
              var tmp_0 = Companion_instance;
              return tmp_0.o8e(startIndex, PlainStringParserOperation$consume$lambda_0(this, input, startIndex, i));
            }
          }
           while (inductionVariable <= last);
        return Companion_instance.n8e(startIndex + this.e8f_1.length | 0);
      }
      toString() {
        return "'" + this.e8f_1 + "'";
      }
    }
    initMetadataForClass($, 'PlainStringParserOperation');
    PlainStringParserOperationClass = $;
  }
  return PlainStringParserOperationClass;
}
function SignParser$consume$lambda(this$0, $char) {
  return function () {
    return 'Expected ' + this$0.h8f_1 + ' but got ' + toString_0($char);
  };
}
var SignParserClass;
function SignParser() {
  if (SignParserClass === VOID) {
    class $ {
      constructor(isNegativeSetter, withPlusSign, whatThisExpects) {
        this.f8f_1 = isNegativeSetter;
        this.g8f_1 = withPlusSign;
        this.h8f_1 = whatThisExpects;
      }
      v8e(storage, input, startIndex) {
        if (startIndex >= charSequenceLength(input))
          return Companion_instance.n8e(startIndex);
        var char = charSequenceGet(input, startIndex);
        if (char === _Char___init__impl__6a9atx(45)) {
          this.f8f_1(storage, true);
          return Companion_instance.n8e(startIndex + 1 | 0);
        }
        if (char === _Char___init__impl__6a9atx(43) && this.g8f_1) {
          this.f8f_1(storage, false);
          return Companion_instance.n8e(startIndex + 1 | 0);
        }
        var tmp = Companion_instance;
        return tmp.o8e(startIndex, SignParser$consume$lambda(this, char));
      }
      toString() {
        return this.h8f_1;
      }
    }
    initMetadataForClass($, 'SignParser');
    SignParserClass = $;
  }
  return SignParserClass;
}
var UnconditionalModificationClass;
function UnconditionalModification() {
  if (UnconditionalModificationClass === VOID) {
    class $ {
      constructor(operation) {
        this.i8f_1 = operation;
      }
      v8e(storage, input, startIndex) {
        this.i8f_1(storage);
        return Companion_instance.n8e(startIndex);
      }
    }
    initMetadataForClass($, 'UnconditionalModification');
    UnconditionalModificationClass = $;
  }
  return UnconditionalModificationClass;
}
function spaceAndZeroPaddedUnsignedInt$numberOfRequiredLengths($withMinus, $setter, $name, minNumberLength, maxNumberLength) {
  // Inline function 'kotlin.check' call
  if (!(maxNumberLength >= (1 + ($withMinus ? 1 : 0) | 0))) {
    throw IllegalStateException().o5('Check failed.');
  }
  // Inline function 'kotlin.collections.buildList' call
  // Inline function 'kotlin.collections.buildListInternal' call
  // Inline function 'kotlin.apply' call
  var this_0 = ArrayList().g1();
  if ($withMinus) {
    this_0.i(new (PlainStringParserOperation())('-'));
  }
  this_0.i(new (NumberSpanParserOperation())(listOf_0(new (UnsignedIntConsumer())(minNumberLength - ($withMinus ? 1 : 0) | 0, maxNumberLength - ($withMinus ? 1 : 0) | 0, $setter, $name, $withMinus))));
  var tmp$ret$4 = this_0.k5();
  return new (ParserStructure())(tmp$ret$4, emptyList());
}
//region block: exports
export {
  NumberSpanParserOperation as NumberSpanParserOperation3qyp02c4km7yu,
  PlainStringParserOperation as PlainStringParserOperation3o6zmwb0f0e6n,
  SignParser as SignParserj94qlnys16wg,
  SignedIntParser as SignedIntParsergn6823y2nf4q,
  UnconditionalModification as UnconditionalModification151pp4lqfue9i,
  spaceAndZeroPaddedUnsignedInt as spaceAndZeroPaddedUnsignedInt3iec50j4qusnr,
};
//endregion

//# sourceMappingURL=ParserOperation.mjs.map
