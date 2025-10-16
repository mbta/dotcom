import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { isAsciiDigit3p3aq858xklh as isAsciiDigit } from '../util.mjs';
import {
  substringiqarkczpya5m as substring,
  substring3saq8ornu0luv as substring_0,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { ConstantNumberConsumer1fkn3mtvfbopz as ConstantNumberConsumer } from './parser/NumberConsumer.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import {
  NumberSpanParserOperation3qyp02c4km7yu as NumberSpanParserOperation,
  PlainStringParserOperation3o6zmwb0f0e6n as PlainStringParserOperation,
  SignParserj94qlnys16wg as SignParser,
  UnconditionalModification151pp4lqfue9i as UnconditionalModification,
} from './parser/ParserOperation.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { get_lastIndexld83bqhfgcdd as get_lastIndex } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import {
  emptyList1g2z5xcrvp2zy as emptyList,
  listOf1jh22dvmctj1r as listOf_0,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  ParserStructure2cqp7gjft5io4 as ParserStructure,
  concat2z827ubu7ap26 as concat,
} from './parser/Parser.mjs';
import { ConstantStringFormatterStructure25vvm6os5tq8f as ConstantStringFormatterStructure } from './formatter/FormatterOperation.mjs';
import {
  toSet2orjxp16sotqu as toSet,
  distinct10qe1scfdvu5k as distinct,
  joinToString1cxrrlmo0chqs as joinToString,
  singleo93pzdgfc557 as single,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  SignedFormatter14cujr8xyyuqw as SignedFormatter,
  ConditionalFormatter2qfqdnibwbifo as ConditionalFormatter,
  ConcatenatedFormattergumn65iplrh1 as ConcatenatedFormatter,
} from './formatter/Formatter.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  ComparisonPredicate21wq2zjdls3fu as ComparisonPredicate,
  conjunctionPredicate3qd2h4fxtw47e as conjunctionPredicate,
  Truth_instanceh2d1wku1pkam as Truth_instance,
  Truth1p2zb9jq6ku60 as Truth,
} from './Predicate.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CachedFormatStructureClass;
function CachedFormatStructure() {
  if (CachedFormatStructureClass === VOID) {
    class $ extends ConcatenatedFormatStructure() {
      constructor(formats) {
        super(formats);
        this.q82_1 = super.s82();
        this.r82_1 = super.u82();
      }
      s82() {
        return this.q82_1;
      }
      u82() {
        return this.r82_1;
      }
    }
    initMetadataForClass($, 'CachedFormatStructure');
    CachedFormatStructureClass = $;
  }
  return CachedFormatStructureClass;
}
var BasicFormatStructureClass;
function BasicFormatStructure() {
  if (BasicFormatStructureClass === VOID) {
    class $ {
      constructor(directive) {
        this.f8c_1 = directive;
      }
      toString() {
        return 'BasicFormatStructure(' + toString(this.f8c_1) + ')';
      }
      equals(other) {
        var tmp;
        if (other instanceof BasicFormatStructure()) {
          tmp = equals(this.f8c_1, other.f8c_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.f8c_1);
      }
      u82() {
        return this.f8c_1.u82();
      }
      s82() {
        return this.f8c_1.s82();
      }
    }
    initMetadataForClass($, 'BasicFormatStructure', VOID, VOID, [NonConcatenatedFormatStructure()]);
    BasicFormatStructureClass = $;
  }
  return BasicFormatStructureClass;
}
var ConstantFormatStructureClass;
function ConstantFormatStructure() {
  if (ConstantFormatStructureClass === VOID) {
    class $ {
      constructor(string) {
        this.g8c_1 = string;
      }
      toString() {
        return 'ConstantFormatStructure(' + this.g8c_1 + ')';
      }
      equals(other) {
        var tmp;
        if (other instanceof ConstantFormatStructure()) {
          tmp = this.g8c_1 === other.g8c_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return getStringHashCode(this.g8c_1);
      }
      u82() {
        var tmp;
        // Inline function 'kotlin.text.isEmpty' call
        var this_0 = this.g8c_1;
        if (charSequenceLength(this_0) === 0) {
          tmp = emptyList();
        } else {
          // Inline function 'kotlin.collections.buildList' call
          // Inline function 'kotlin.collections.buildListInternal' call
          // Inline function 'kotlin.apply' call
          var this_1 = ArrayList().g1();
          var tmp_0;
          if (isAsciiDigit(charCodeAt(this.g8c_1, 0))) {
            var tmp0 = this.g8c_1;
            var tmp$ret$2;
            $l$block: {
              // Inline function 'kotlin.text.takeWhile' call
              var inductionVariable = 0;
              var last = tmp0.length;
              if (inductionVariable < last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var it = charCodeAt(tmp0, index);
                  if (!isAsciiDigit(it)) {
                    tmp$ret$2 = substring(tmp0, 0, index);
                    break $l$block;
                  }
                }
                 while (inductionVariable < last);
              tmp$ret$2 = tmp0;
            }
            this_1.i(new (NumberSpanParserOperation())(listOf(new (ConstantNumberConsumer())(tmp$ret$2))));
            var tmp0_0 = this.g8c_1;
            var tmp$ret$4;
            $l$block_0: {
              // Inline function 'kotlin.text.dropWhile' call
              var inductionVariable_0 = 0;
              var last_0 = charSequenceLength(tmp0_0) - 1 | 0;
              if (inductionVariable_0 <= last_0)
                do {
                  var index_0 = inductionVariable_0;
                  inductionVariable_0 = inductionVariable_0 + 1 | 0;
                  var it_0 = charCodeAt(tmp0_0, index_0);
                  if (!isAsciiDigit(it_0)) {
                    tmp$ret$4 = substring_0(tmp0_0, index_0);
                    break $l$block_0;
                  }
                }
                 while (inductionVariable_0 <= last_0);
              tmp$ret$4 = '';
            }
            tmp_0 = tmp$ret$4;
          } else {
            tmp_0 = this.g8c_1;
          }
          var suffix = tmp_0;
          // Inline function 'kotlin.text.isNotEmpty' call
          if (charSequenceLength(suffix) > 0) {
            if (isAsciiDigit(charCodeAt(suffix, suffix.length - 1 | 0))) {
              var tmp$ret$7;
              $l$block_1: {
                // Inline function 'kotlin.text.dropLastWhile' call
                var inductionVariable_1 = get_lastIndex(suffix);
                if (0 <= inductionVariable_1)
                  do {
                    var index_1 = inductionVariable_1;
                    inductionVariable_1 = inductionVariable_1 + -1 | 0;
                    var it_1 = charCodeAt(suffix, index_1);
                    if (!isAsciiDigit(it_1)) {
                      tmp$ret$7 = substring(suffix, 0, index_1 + 1 | 0);
                      break $l$block_1;
                    }
                  }
                   while (0 <= inductionVariable_1);
                tmp$ret$7 = '';
              }
              this_1.i(new (PlainStringParserOperation())(tmp$ret$7));
              var tmp$ret$9;
              $l$block_2: {
                // Inline function 'kotlin.text.takeLastWhile' call
                var inductionVariable_2 = get_lastIndex(suffix);
                if (0 <= inductionVariable_2)
                  do {
                    var index_2 = inductionVariable_2;
                    inductionVariable_2 = inductionVariable_2 + -1 | 0;
                    var it_2 = charCodeAt(suffix, index_2);
                    if (!isAsciiDigit(it_2)) {
                      tmp$ret$9 = substring_0(suffix, index_2 + 1 | 0);
                      break $l$block_2;
                    }
                  }
                   while (0 <= inductionVariable_2);
                tmp$ret$9 = suffix;
              }
              this_1.i(new (NumberSpanParserOperation())(listOf(new (ConstantNumberConsumer())(tmp$ret$9))));
            } else {
              this_1.i(new (PlainStringParserOperation())(suffix));
            }
          }
          tmp = this_1.k5();
        }
        return new (ParserStructure())(tmp, emptyList());
      }
      s82() {
        return new (ConstantStringFormatterStructure())(this.g8c_1);
      }
    }
    initMetadataForClass($, 'ConstantFormatStructure', VOID, VOID, [NonConcatenatedFormatStructure()]);
    ConstantFormatStructureClass = $;
  }
  return ConstantFormatStructureClass;
}
function formatter$checkIfAllNegative(this$0, value) {
  var seenNonZero = false;
  var _iterator__ex2g4s = this$0.j8c_1.x();
  $l$loop: while (_iterator__ex2g4s.y()) {
    var check = _iterator__ex2g4s.z();
    if (check.w89().e8c(value) === true)
      seenNonZero = true;
    else if (check.y89(value))
      continue $l$loop;
    else
      return false;
  }
  return seenNonZero;
}
function SignedFormatStructure$parser$lambda(this$0) {
  return function (value, isNegative) {
    var _iterator__ex2g4s = this$0.j8c_1.x();
    while (_iterator__ex2g4s.y()) {
      var field = _iterator__ex2g4s.z();
      var wasNegative = field.w89().e8c(value) === true;
      field.w89().d8c(value, !(isNegative === wasNegative));
    }
    return Unit_instance;
  };
}
function SignedFormatStructure$formatter$checkIfAllNegative$ref(this$0) {
  var l = function (p0) {
    return formatter$checkIfAllNegative(this$0, p0);
  };
  l.callableName = 'checkIfAllNegative';
  return l;
}
var SignedFormatStructureClass;
function SignedFormatStructure() {
  if (SignedFormatStructureClass === VOID) {
    class $ {
      constructor(format, withPlusSign) {
        this.h8c_1 = format;
        this.i8c_1 = withPlusSign;
        var tmp = this;
        // Inline function 'kotlin.collections.mapNotNull' call
        var tmp0 = basicFormats(this.h8c_1);
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp0_safe_receiver = element.p85().z8b();
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination.i(tmp0_safe_receiver);
          }
        }
        tmp.j8c_1 = toSet(destination);
        // Inline function 'kotlin.collections.isNotEmpty' call
        // Inline function 'kotlin.require' call
        if (!!this.j8c_1.h1()) {
          var message = 'Signed format must contain at least one field with a sign';
          throw IllegalArgumentException().q(toString(message));
        }
      }
      toString() {
        return 'SignedFormatStructure(' + toString(this.h8c_1) + ')';
      }
      equals(other) {
        var tmp;
        var tmp_0;
        if (other instanceof SignedFormatStructure()) {
          tmp_0 = equals(this.h8c_1, other.h8c_1);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = this.i8c_1 === other.i8c_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return imul(31, hashCode(this.h8c_1)) + getBooleanHashCode(this.i8c_1) | 0;
      }
      u82() {
        return concat(listOf_0([new (ParserStructure())(listOf(new (SignParser())(SignedFormatStructure$parser$lambda(this), this.i8c_1, 'sign for ' + toString(this.j8c_1))), emptyList()), this.h8c_1.u82()]));
      }
      s82() {
        var innerFormat = this.h8c_1.s82();
        return new (SignedFormatter())(innerFormat, SignedFormatStructure$formatter$checkIfAllNegative$ref(this), this.i8c_1);
      }
    }
    initMetadataForClass($, 'SignedFormatStructure', VOID, VOID, [NonConcatenatedFormatStructure()]);
    SignedFormatStructureClass = $;
  }
  return SignedFormatStructureClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      k8c(field) {
        var default_0 = field.y8b();
        // Inline function 'kotlin.require' call
        if (!!(default_0 == null)) {
          var message = "The field '" + field.y3() + "' does not define a default value";
          throw IllegalArgumentException().q(toString(message));
        }
        return new (PropertyWithDefault())(field.t8b(), default_0);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var PropertyWithDefaultClass;
function PropertyWithDefault() {
  if (PropertyWithDefaultClass === VOID) {
    class $ {
      constructor(accessor, defaultValue) {
        this.l8c_1 = accessor;
        this.m8c_1 = defaultValue;
      }
    }
    initMetadataForClass($, 'PropertyWithDefault');
    PropertyWithDefaultClass = $;
  }
  return PropertyWithDefaultClass;
}
function OptionalFormatStructure$parser$lambda(this$0) {
  return function (it) {
    var _iterator__ex2g4s = this$0.p8c_1.x();
    while (_iterator__ex2g4s.y()) {
      var field = _iterator__ex2g4s.z();
      // Inline function 'kotlinx.datetime.internal.format.PropertyWithDefault.assignDefault' call
      field.l8c_1.d8c(it, field.m8c_1);
    }
    return Unit_instance;
  };
}
function Accessor$getter$ref(p0) {
  var l = function (_this__u8e3s4) {
    return p0.e8c(_this__u8e3s4);
  };
  l.callableName = 'getter';
  return l;
}
function Predicate$test$ref(p0) {
  var l = function (_this__u8e3s4) {
    return p0.q8c(_this__u8e3s4);
  };
  l.callableName = 'test';
  return l;
}
function Truth$test$ref(p0) {
  var l = function (_this__u8e3s4) {
    return p0.r8c(_this__u8e3s4);
  };
  l.callableName = 'test';
  return l;
}
var OptionalFormatStructureClass;
function OptionalFormatStructure() {
  if (OptionalFormatStructureClass === VOID) {
    class $ {
      constructor(onZero, format) {
        this.n8c_1 = onZero;
        this.o8c_1 = format;
        var tmp = this;
        // Inline function 'kotlin.collections.map' call
        var this_0 = basicFormats(this.o8c_1);
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = item.p85();
          destination.i(tmp$ret$0);
        }
        // Inline function 'kotlin.collections.map' call
        var this_1 = distinct(destination);
        // Inline function 'kotlin.collections.mapTo' call
        var destination_0 = ArrayList().w(collectionSizeOrDefault(this_1, 10));
        var _iterator__ex2g4s_0 = this_1.x();
        while (_iterator__ex2g4s_0.y()) {
          var item_0 = _iterator__ex2g4s_0.z();
          var tmp$ret$3 = Companion_instance.k8c(item_0);
          destination_0.i(tmp$ret$3);
        }
        tmp.p8c_1 = destination_0;
      }
      toString() {
        return 'Optional(' + this.n8c_1 + ', ' + toString(this.o8c_1) + ')';
      }
      equals(other) {
        var tmp;
        var tmp_0;
        if (other instanceof OptionalFormatStructure()) {
          tmp_0 = this.n8c_1 === other.n8c_1;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = equals(this.o8c_1, other.o8c_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return imul(31, getStringHashCode(this.n8c_1)) + hashCode(this.o8c_1) | 0;
      }
      u82() {
        var tmp = emptyList();
        var tmp_0 = this.o8c_1.u82();
        var tmp_1 = (new (ConstantFormatStructure())(this.n8c_1)).u82();
        var tmp_2;
        if (this.p8c_1.h1()) {
          tmp_2 = emptyList();
        } else {
          tmp_2 = listOf(new (UnconditionalModification())(OptionalFormatStructure$parser$lambda(this)));
        }
        return new (ParserStructure())(tmp, listOf_0([tmp_0, concat(listOf_0([tmp_1, new (ParserStructure())(tmp_2, emptyList())]))]));
      }
      s82() {
        var formatter = this.o8c_1.s82();
        // Inline function 'kotlin.collections.map' call
        var this_0 = this.p8c_1;
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          // Inline function 'kotlinx.datetime.internal.format.PropertyWithDefault.isDefaultComparisonPredicate' call
          var tmp$ret$1 = new (ComparisonPredicate())(item.m8c_1, Accessor$getter$ref(item.l8c_1));
          destination.i(tmp$ret$1);
        }
        var predicate = conjunctionPredicate(destination);
        var tmp;
        if (predicate instanceof Truth()) {
          tmp = new (ConstantStringFormatterStructure())(this.n8c_1);
        } else {
          var tmp_0 = to(Predicate$test$ref(predicate), new (ConstantStringFormatterStructure())(this.n8c_1));
          tmp = new (ConditionalFormatter())(listOf_0([tmp_0, to(Truth$test$ref(Truth_instance), formatter)]));
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'OptionalFormatStructure', VOID, VOID, [NonConcatenatedFormatStructure()]);
    OptionalFormatStructureClass = $;
  }
  return OptionalFormatStructureClass;
}
var AlternativesParsingFormatStructureClass;
function AlternativesParsingFormatStructure() {
  if (AlternativesParsingFormatStructureClass === VOID) {
    class $ {
      constructor(mainFormat, formats) {
        this.s8c_1 = mainFormat;
        this.t8c_1 = formats;
      }
      toString() {
        return 'AlternativesParsing(' + toString(this.t8c_1) + ')';
      }
      equals(other) {
        var tmp;
        var tmp_0;
        if (other instanceof AlternativesParsingFormatStructure()) {
          tmp_0 = equals(this.s8c_1, other.s8c_1);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = equals(this.t8c_1, other.t8c_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return imul(31, hashCode(this.s8c_1)) + hashCode(this.t8c_1) | 0;
      }
      u82() {
        var tmp = emptyList();
        // Inline function 'kotlin.collections.buildList' call
        // Inline function 'kotlin.collections.buildListInternal' call
        // Inline function 'kotlin.apply' call
        var this_0 = ArrayList().g1();
        this_0.i(this.s8c_1.u82());
        var _iterator__ex2g4s = this.t8c_1.x();
        while (_iterator__ex2g4s.y()) {
          var format = _iterator__ex2g4s.z();
          this_0.i(format.u82());
        }
        var tmp$ret$3 = this_0.k5();
        return new (ParserStructure())(tmp, tmp$ret$3);
      }
      s82() {
        return this.s8c_1.s82();
      }
    }
    initMetadataForClass($, 'AlternativesParsingFormatStructure', VOID, VOID, [NonConcatenatedFormatStructure()]);
    AlternativesParsingFormatStructureClass = $;
  }
  return AlternativesParsingFormatStructureClass;
}
var ConcatenatedFormatStructureClass;
function ConcatenatedFormatStructure() {
  if (ConcatenatedFormatStructureClass === VOID) {
    class $ {
      constructor(formats) {
        this.x83_1 = formats;
      }
      toString() {
        return 'ConcatenatedFormatStructure(' + joinToString(this.x83_1, ', ') + ')';
      }
      equals(other) {
        var tmp;
        if (other instanceof ConcatenatedFormatStructure()) {
          tmp = equals(this.x83_1, other.x83_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.x83_1);
      }
      u82() {
        // Inline function 'kotlin.collections.map' call
        var this_0 = this.x83_1;
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = item.u82();
          destination.i(tmp$ret$0);
        }
        return concat(destination);
      }
      s82() {
        // Inline function 'kotlin.collections.map' call
        var this_0 = this.x83_1;
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = item.s82();
          destination.i(tmp$ret$0);
        }
        var formatters = destination;
        var tmp;
        if (formatters.c1() === 1) {
          tmp = single(formatters);
        } else {
          tmp = new (ConcatenatedFormatter())(formatters);
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'ConcatenatedFormatStructure');
    ConcatenatedFormatStructureClass = $;
  }
  return ConcatenatedFormatStructureClass;
}
var NonConcatenatedFormatStructureClass;
function NonConcatenatedFormatStructure() {
  if (NonConcatenatedFormatStructureClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'NonConcatenatedFormatStructure');
    NonConcatenatedFormatStructureClass = $;
  }
  return NonConcatenatedFormatStructureClass;
}
function basicFormats(format) {
  // Inline function 'kotlin.collections.buildList' call
  // Inline function 'kotlin.collections.buildListInternal' call
  // Inline function 'kotlin.apply' call
  var this_0 = ArrayList().g1();
  basicFormats$_anonymous_$rec_hkf0lf(this_0, format);
  return this_0.k5();
}
function basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format) {
  if (format instanceof BasicFormatStructure())
    $this_buildList.i(format.f8c_1);
  else {
    if (format instanceof ConcatenatedFormatStructure()) {
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s = format.x83_1.x();
      while (_iterator__ex2g4s.y()) {
        var element = _iterator__ex2g4s.z();
        basicFormats$_anonymous_$rec_hkf0lf($this_buildList, element);
      }
    } else {
      if (!(format instanceof ConstantFormatStructure())) {
        if (format instanceof SignedFormatStructure()) {
          basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format.h8c_1);
        } else {
          if (format instanceof AlternativesParsingFormatStructure()) {
            basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format.s8c_1);
            // Inline function 'kotlin.collections.forEach' call
            var _iterator__ex2g4s_0 = format.t8c_1.x();
            while (_iterator__ex2g4s_0.y()) {
              var element_0 = _iterator__ex2g4s_0.z();
              basicFormats$_anonymous_$rec_hkf0lf($this_buildList, element_0);
            }
          } else {
            if (format instanceof OptionalFormatStructure()) {
              basicFormats$_anonymous_$rec_hkf0lf($this_buildList, format.o8c_1);
            } else {
              noWhenBranchMatchedException();
            }
          }
        }
      }
    }
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  AlternativesParsingFormatStructure as AlternativesParsingFormatStructure1jbxrbmj8ihe6,
  BasicFormatStructure as BasicFormatStructure1rp1tyv3u2fjw,
  CachedFormatStructure as CachedFormatStructurec5vu2vku3yjz,
  ConcatenatedFormatStructure as ConcatenatedFormatStructure27s7lx6ixzw2f,
  ConstantFormatStructure as ConstantFormatStructure2ckhnu4xssh81,
  NonConcatenatedFormatStructure as NonConcatenatedFormatStructure1tep5eavrzcwp,
  OptionalFormatStructure as OptionalFormatStructure1lur7h5l20ekc,
  SignedFormatStructure as SignedFormatStructure3e3cmtnnik1yf,
};
//endregion

//# sourceMappingURL=FormatStructure.mjs.map
