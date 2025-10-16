import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import {
  mutableListOf6oorvk2mtdmp as mutableListOf,
  emptyList1g2z5xcrvp2zy as emptyList,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  removeLastOrNull3odnlbetbttd4 as removeLastOrNull,
  addAll1k27qatfgp3k5 as addAll,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import {
  _ParseResult___get_value__impl__86mnxf37bv6rxl6i4e as _ParseResult___get_value__impl__86mnxf,
  ParseError1ji8h7fh6q5w9 as ParseError,
} from './ParseResult.mjs';
import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  Exceptiondt2hlxn7j7vw as Exception,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  sortWith4fnm6b3vw03s as sortWith,
  listOfvhqybd2zx248 as listOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Comparator2b3maoeh98xtg as Comparator } from '../../../../../../kotlin-kotlin-stdlib/kotlin/ComparatorJs.mjs';
import { compareValues1n2ayl87ihzfk as compareValues } from '../../../../../../kotlin-kotlin-stdlib/kotlin/comparisons/Comparisons.mjs';
import {
  joinToString1cxrrlmo0chqs as joinToString,
  joinTo3lkanfaxbzac2 as joinTo,
  plus310ted5e4i90h as plus,
  toMutableList20rdgwi7d3cwi as toMutableList,
  firstOrNull1982767dljvdy as firstOrNull,
  drop3na99dw9feawf as drop,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  NumberSpanParserOperation3qyp02c4km7yu as NumberSpanParserOperation,
  UnconditionalModification151pp4lqfue9i as UnconditionalModification,
} from './ParserOperation.mjs';
import { Collection1k04j3hzsbod0 as Collection } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function _Parser___init__impl__gdyfby(commands) {
  return commands;
}
function _get_commands__a20n1($this) {
  return $this;
}
function Parser__match_impl_nzt83d($this, input, initialContainer, startIndex) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var errors = ArrayList().g1();
  // Inline function 'kotlinx.datetime.internal.format.parser.Parser.parse' call
  var parseOptions = mutableListOf([new (ParserState())(initialContainer, _get_commands__a20n1($this), startIndex)]);
  iterate_over_alternatives: while (true) {
    var tmp0_elvis_lhs = removeLastOrNull(parseOptions);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      break iterate_over_alternatives;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var state = tmp;
    var output = state.p8e_1.t84();
    var inputPosition = state.r8e_1;
    var parserStructure = state.q8e_1;
    // Inline function 'kotlin.run' call
    $l$block: {
      var inductionVariable = 0;
      var last = parserStructure.t8e_1.c1() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var ix = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.datetime.internal.format.parser.ParseResult.match' call
          var this_0 = parserStructure.t8e_1.e1(ix).v8e(output, input, inputPosition);
          var tmp0_subject = _ParseResult___get_value__impl__86mnxf(this_0);
          if (typeof tmp0_subject === 'number') {
            inputPosition = _ParseResult___get_value__impl__86mnxf(this_0);
          } else {
            if (tmp0_subject instanceof ParseError()) {
              var it = _ParseResult___get_value__impl__86mnxf(this_0);
              errors.i(it);
              break $l$block;
            } else {
              // Inline function 'kotlin.error' call
              var message = 'Unexpected parse result: ' + toString(_ParseResult___get_value__impl__86mnxf(this_0));
              throw IllegalStateException().o5(toString(message));
            }
          }
        }
         while (inductionVariable <= last);
      if (parserStructure.u8e_1.h1()) {
        if (false || inputPosition === charSequenceLength(input)) {
          return output;
        } else {
          var tmp_0 = inputPosition;
          var it_0 = new (ParseError())(tmp_0, Parser$match$lambda);
          errors.i(it_0);
        }
      } else {
        var inductionVariable_0 = parserStructure.u8e_1.c1() - 1 | 0;
        if (0 <= inductionVariable_0)
          do {
            var ix_0 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + -1 | 0;
            parseOptions.i(new (ParserState())(output, parserStructure.u8e_1.e1(ix_0), inputPosition));
          }
           while (0 <= inductionVariable_0);
      }
    }
  }
  // Inline function 'kotlin.collections.sortByDescending' call
  if (errors.c1() > 1) {
    // Inline function 'kotlin.comparisons.compareByDescending' call
    var tmp_1 = Parser$match$lambda_0;
    var tmp$ret$8 = new (sam$kotlin_Comparator$0())(tmp_1);
    sortWith(errors, tmp$ret$8);
  }
  throw ParseException().y8e(errors);
}
function Parser__match$default_impl_x2xlti($this, input, initialContainer, startIndex, $super) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  var tmp;
  if ($super === VOID) {
    tmp = Parser__match_impl_nzt83d($this, input, initialContainer, startIndex);
  } else {
    var tmp_0 = $super;
    tmp = (tmp_0 == null ? null : new (Parser())(tmp_0)).z8e.call(new (Parser())($this), input, initialContainer, startIndex);
  }
  return tmp;
}
var ParserStateClass;
function ParserState() {
  if (ParserStateClass === VOID) {
    class $ {
      constructor(output, parserStructure, inputPosition) {
        this.p8e_1 = output;
        this.q8e_1 = parserStructure;
        this.r8e_1 = inputPosition;
      }
    }
    initMetadataForClass($, 'ParserState');
    ParserStateClass = $;
  }
  return ParserStateClass;
}
function Parser__toString_impl_x33iea($this) {
  return 'Parser(commands=' + $this.toString() + ')';
}
function Parser__hashCode_impl_bbxllf($this) {
  return hashCode($this);
}
function Parser__equals_impl_djxokv($this, other) {
  if (!(other instanceof Parser()))
    return false;
  var tmp0_other_with_cast = other instanceof Parser() ? other.s8e_1 : THROW_CCE();
  if (!equals($this, tmp0_other_with_cast))
    return false;
  return true;
}
var sam$kotlin_Comparator$0Class;
function sam$kotlin_Comparator$0() {
  if (sam$kotlin_Comparator$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.a8f_1 = function_0;
      }
      al(a, b) {
        return this.a8f_1(a, b);
      }
      compare(a, b) {
        return this.al(a, b);
      }
      z4() {
        return this.a8f_1;
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, Comparator()) : false) {
          var tmp_0;
          if (!(other == null) ? isInterface(other, FunctionAdapter()) : false) {
            tmp_0 = equals(this.z4(), other.z4());
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.z4());
      }
    }
    initMetadataForClass($, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator(), FunctionAdapter()]);
    sam$kotlin_Comparator$0Class = $;
  }
  return sam$kotlin_Comparator$0Class;
}
function Parser$match$lambda() {
  return 'There is more input to consume';
}
function Parser$match$lambda_0(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.l8e_1;
  var tmp$ret$1 = a.l8e_1;
  return compareValues(tmp, tmp$ret$1);
}
var ParserClass;
function Parser() {
  if (ParserClass === VOID) {
    class $ {
      constructor(commands) {
        this.s8e_1 = commands;
      }
      toString() {
        return Parser__toString_impl_x33iea(this.s8e_1);
      }
      hashCode() {
        return Parser__hashCode_impl_bbxllf(this.s8e_1);
      }
      equals(other) {
        return Parser__equals_impl_djxokv(this.s8e_1, other);
      }
    }
    initMetadataForClass($, 'Parser');
    ParserClass = $;
  }
  return ParserClass;
}
var ParserStructureClass;
function ParserStructure() {
  if (ParserStructureClass === VOID) {
    class $ {
      constructor(operations, followedBy) {
        this.t8e_1 = operations;
        this.u8e_1 = followedBy;
      }
      toString() {
        return joinToString(this.t8e_1, ', ') + '(' + joinToString(this.u8e_1, ';') + ')';
      }
    }
    initMetadataForClass($, 'ParserStructure');
    ParserStructureClass = $;
  }
  return ParserStructureClass;
}
var ParseExceptionClass;
function ParseException() {
  if (ParseExceptionClass === VOID) {
    class $ extends Exception() {
      static y8e(errors) {
        var $this = this.h6(formatError(errors));
        captureStack($this, $this.x8e_1);
        return $this;
      }
    }
    initMetadataForClass($, 'ParseException');
    ParseExceptionClass = $;
  }
  return ParseExceptionClass;
}
function concat(_this__u8e3s4) {
  // Inline function 'kotlin.collections.foldRight' call
  var accumulator = new (ParserStructure())(emptyList(), emptyList());
  if (!_this__u8e3s4.h1()) {
    var iterator = _this__u8e3s4.k1(_this__u8e3s4.c1());
    while (iterator.j7()) {
      var tmp0 = iterator.l7();
      var acc = accumulator;
      accumulator = concat$append(tmp0, acc);
    }
  }
  var naiveParser = accumulator;
  return concat$simplify(naiveParser, emptyList());
}
function formatError(errors) {
  if (errors.c1() === 1) {
    return 'Position ' + errors.e1(0).l8e_1 + ': ' + errors.e1(0).m8e_1();
  }
  var averageMessageLength = 33;
  var tmp0_buffer = StringBuilder().kc(imul(averageMessageLength, errors.c1()));
  return joinTo(errors, tmp0_buffer, ', ', 'Errors: ', VOID, VOID, VOID, formatError$lambda).toString();
}
function concat$append(_this__u8e3s4, other) {
  var tmp;
  if (_this__u8e3s4.u8e_1.h1()) {
    tmp = new (ParserStructure())(plus(_this__u8e3s4.t8e_1, other.t8e_1), other.u8e_1);
  } else {
    // Inline function 'kotlin.collections.map' call
    var this_0 = _this__u8e3s4.u8e_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.x();
    while (_iterator__ex2g4s.y()) {
      var item = _iterator__ex2g4s.z();
      var tmp$ret$0 = concat$append(item, other);
      destination.i(tmp$ret$0);
    }
    tmp = new (ParserStructure())(_this__u8e3s4.t8e_1, destination);
  }
  return tmp;
}
function concat$simplify(_this__u8e3s4, unconditionalModifications) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var newOperations = ArrayList().g1();
  var currentNumberSpan = null;
  var unconditionalModificationsForTails = toMutableList(unconditionalModifications);
  var _iterator__ex2g4s = _this__u8e3s4.t8e_1.x();
  while (_iterator__ex2g4s.y()) {
    var op = _iterator__ex2g4s.z();
    if (op instanceof NumberSpanParserOperation()) {
      if (!(currentNumberSpan == null)) {
        currentNumberSpan.d1(op.b8f_1);
      } else {
        currentNumberSpan = toMutableList(op.b8f_1);
      }
    } else {
      if (op instanceof UnconditionalModification()) {
        unconditionalModificationsForTails.i(op);
      } else {
        if (!(currentNumberSpan == null)) {
          newOperations.i(new (NumberSpanParserOperation())(currentNumberSpan));
          currentNumberSpan = null;
        }
        newOperations.i(op);
      }
    }
  }
  // Inline function 'kotlin.collections.flatMap' call
  var tmp0 = _this__u8e3s4.u8e_1;
  // Inline function 'kotlin.collections.flatMapTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s_0 = tmp0.x();
  while (_iterator__ex2g4s_0.y()) {
    var element = _iterator__ex2g4s_0.z();
    var simplified = concat$simplify(element, unconditionalModificationsForTails);
    var tmp;
    if (simplified.t8e_1.h1()) {
      // Inline function 'kotlin.collections.ifEmpty' call
      var this_0 = simplified.u8e_1;
      var tmp_0;
      if (this_0.h1()) {
        tmp_0 = listOf(simplified);
      } else {
        tmp_0 = this_0;
      }
      tmp = tmp_0;
    } else {
      tmp = listOf(simplified);
    }
    var list = tmp;
    addAll(destination, list);
  }
  // Inline function 'kotlin.collections.ifEmpty' call
  var tmp_1;
  if (destination.h1()) {
    tmp_1 = listOf(new (ParserStructure())(unconditionalModificationsForTails, emptyList()));
  } else {
    tmp_1 = destination;
  }
  var mergedTails = tmp_1;
  var tmp_2;
  if (currentNumberSpan == null) {
    tmp_2 = new (ParserStructure())(newOperations, mergedTails);
  } else {
    var tmp$ret$8;
    $l$block_0: {
      // Inline function 'kotlin.collections.none' call
      var tmp_3;
      if (isInterface(mergedTails, Collection())) {
        tmp_3 = mergedTails.h1();
      } else {
        tmp_3 = false;
      }
      if (tmp_3) {
        tmp$ret$8 = true;
        break $l$block_0;
      }
      var _iterator__ex2g4s_1 = mergedTails.x();
      while (_iterator__ex2g4s_1.y()) {
        var element_0 = _iterator__ex2g4s_1.z();
        var tmp0_safe_receiver = firstOrNull(element_0.t8e_1);
        var tmp_4;
        if (tmp0_safe_receiver == null) {
          tmp_4 = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp_4 = tmp0_safe_receiver instanceof NumberSpanParserOperation();
        }
        if (tmp_4 === true) {
          tmp$ret$8 = false;
          break $l$block_0;
        }
      }
      tmp$ret$8 = true;
    }
    if (tmp$ret$8) {
      newOperations.i(new (NumberSpanParserOperation())(currentNumberSpan));
      tmp_2 = new (ParserStructure())(newOperations, mergedTails);
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList().w(collectionSizeOrDefault(mergedTails, 10));
      var _iterator__ex2g4s_2 = mergedTails.x();
      while (_iterator__ex2g4s_2.y()) {
        var item = _iterator__ex2g4s_2.z();
        var firstOperation = firstOrNull(item.t8e_1);
        var tmp_5;
        if (firstOperation instanceof NumberSpanParserOperation()) {
          tmp_5 = new (ParserStructure())(plus(listOf(new (NumberSpanParserOperation())(plus(currentNumberSpan, firstOperation.b8f_1))), drop(item.t8e_1, 1)), item.u8e_1);
        } else {
          if (firstOperation == null) {
            tmp_5 = new (ParserStructure())(listOf(new (NumberSpanParserOperation())(currentNumberSpan)), item.u8e_1);
          } else {
            tmp_5 = new (ParserStructure())(plus(listOf(new (NumberSpanParserOperation())(currentNumberSpan)), item.t8e_1), item.u8e_1);
          }
        }
        var tmp$ret$12 = tmp_5;
        destination_0.i(tmp$ret$12);
      }
      var newTails = destination_0;
      tmp_2 = new (ParserStructure())(newOperations, newTails);
    }
  }
  return tmp_2;
}
function formatError$lambda(it) {
  return 'position ' + it.l8e_1 + ": '" + it.m8e_1() + "'";
}
//region block: exports
export {
  Parser__match$default_impl_x2xlti as Parser__match$default_impl_x2xltijmohcu4bbet7,
  _Parser___init__impl__gdyfby as _Parser___init__impl__gdyfby1vnq12cpoy9z1,
  ParseException as ParseException603g9fc07eag,
  ParserStructure as ParserStructure2cqp7gjft5io4,
  concat as concat2z827ubu7ap26,
};
//endregion

//# sourceMappingURL=Parser.mjs.map
