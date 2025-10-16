import {
  createThis2j2avj17cvnv2 as createThis,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { equals2v6cggk171b6e as equals_0 } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { toDoubleOrNullkxwozihadygj as toDoubleOrNull } from '../../../../kotlin-kotlin-stdlib/kotlin/text/numberConversions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { LazyThreadSafetyMode_NONE_getInstance2ezxh11hvaa3w as LazyThreadSafetyMode_NONE_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  get_lastIndexld83bqhfgcdd as get_lastIndex,
  trim11nh7r46at6sx as trim,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import {
  charCodeAt1yspne1d8erbm as charCodeAt,
  charSequenceLength3278n89t01tmv as charSequenceLength,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  toString3o7ifthqydp6e as toString_0,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { substringiqarkczpya5m as substring } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import {
  isCharSequence1ju9jr1w86plq as isCharSequence,
  isInterface3d6p8outrmvmk as isInterface,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { sortedWith2csnbbb21k0lg as sortedWith } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { Comparator2b3maoeh98xtg as Comparator } from '../../../../kotlin-kotlin-stdlib/kotlin/ComparatorJs.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { compareValues1n2ayl87ihzfk as compareValues } from '../../../../kotlin-kotlin-stdlib/kotlin/comparisons/Comparisons.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var HeaderValueParamClass;
function HeaderValueParam() {
  if (HeaderValueParamClass === VOID) {
    class $ {
      static q3u(name, value, escapeValue) {
        var $this = createThis(this);
        $this.a3o_1 = name;
        $this.b3o_1 = value;
        $this.c3o_1 = escapeValue;
        return $this;
      }
      static k3q(name, value) {
        return this.q3u(name, value, false);
      }
      equals(other) {
        var tmp;
        var tmp_0;
        if (other instanceof HeaderValueParam()) {
          tmp_0 = equals_0(other.a3o_1, this.a3o_1, true);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = equals_0(other.b3o_1, this.b3o_1, true);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$1 = this.a3o_1.toLowerCase();
        var result = getStringHashCode(tmp$ret$1);
        var tmp = result;
        var tmp_0 = imul(31, result);
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$3 = this.b3o_1.toLowerCase();
        result = tmp + (tmp_0 + getStringHashCode(tmp$ret$3) | 0) | 0;
        return result;
      }
      ch() {
        return this.a3o_1;
      }
      dh() {
        return this.b3o_1;
      }
      toString() {
        return 'HeaderValueParam(name=' + this.a3o_1 + ', value=' + this.b3o_1 + ', escapeValue=' + this.c3o_1 + ')';
      }
    }
    initMetadataForClass($, 'HeaderValueParam');
    HeaderValueParamClass = $;
  }
  return HeaderValueParamClass;
}
var HeaderValueClass;
function HeaderValue() {
  if (HeaderValueClass === VOID) {
    class $ {
      constructor(value, params) {
        params = params === VOID ? emptyList() : params;
        this.j3o_1 = value;
        this.k3o_1 = params;
        var tmp = this;
        var tmp0 = this.k3o_1;
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.collections.firstOrNull' call
          var _iterator__ex2g4s = tmp0.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (element.a3o_1 === 'q') {
              tmp$ret$1 = element;
              break $l$block;
            }
          }
          tmp$ret$1 = null;
        }
        var tmp0_safe_receiver = tmp$ret$1;
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.b3o_1;
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : toDoubleOrNull(tmp1_safe_receiver);
        var tmp_0;
        if (tmp2_safe_receiver == null) {
          tmp_0 = null;
        } else {
          // Inline function 'kotlin.takeIf' call
          var tmp_1;
          if (0.0 <= tmp2_safe_receiver ? tmp2_safe_receiver <= 1.0 : false) {
            tmp_1 = tmp2_safe_receiver;
          } else {
            tmp_1 = null;
          }
          tmp_0 = tmp_1;
        }
        var tmp3_elvis_lhs = tmp_0;
        tmp.l3o_1 = tmp3_elvis_lhs == null ? 1.0 : tmp3_elvis_lhs;
      }
      ch() {
        return this.j3o_1;
      }
      toString() {
        return 'HeaderValue(value=' + this.j3o_1 + ', params=' + toString(this.k3o_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.j3o_1);
        result = imul(result, 31) + hashCode(this.k3o_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof HeaderValue()))
          return false;
        var tmp0_other_with_cast = other instanceof HeaderValue() ? other : THROW_CCE();
        if (!(this.j3o_1 === tmp0_other_with_cast.j3o_1))
          return false;
        if (!equals(this.k3o_1, tmp0_other_with_cast.k3o_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'HeaderValue');
    HeaderValueClass = $;
  }
  return HeaderValueClass;
}
function parseHeaderValue(text) {
  return parseHeaderValue_0(text, false);
}
function parseHeaderValue_0(text, parametersOnly) {
  if (text == null) {
    return emptyList();
  }
  var position = 0;
  var tmp = LazyThreadSafetyMode_NONE_getInstance();
  var items = lazy(tmp, parseHeaderValue$lambda);
  while (position <= get_lastIndex(text)) {
    position = parseHeaderValueItem(text, position, items, parametersOnly);
  }
  return valueOrEmpty(items);
}
function parseHeaderValueItem(text, start, items, parametersOnly) {
  var position = start;
  var tmp = LazyThreadSafetyMode_NONE_getInstance();
  var parameters = lazy(tmp, parseHeaderValueItem$lambda);
  var valueEnd = parametersOnly ? position : null;
  while (position <= get_lastIndex(text)) {
    var tmp0_subject = charCodeAt(text, position);
    if (tmp0_subject === _Char___init__impl__6a9atx(44)) {
      var tmp_0 = items.v1();
      var tmp1_elvis_lhs = valueEnd;
      tmp_0.i(new (HeaderValue())(subtrim(text, start, tmp1_elvis_lhs == null ? position : tmp1_elvis_lhs), valueOrEmpty(parameters)));
      return position + 1 | 0;
    } else if (tmp0_subject === _Char___init__impl__6a9atx(59)) {
      if (valueEnd == null)
        valueEnd = position;
      position = parseHeaderValueParameter(text, position + 1 | 0, parameters);
    } else {
      var tmp_1;
      if (parametersOnly) {
        tmp_1 = parseHeaderValueParameter(text, position, parameters);
      } else {
        tmp_1 = position + 1 | 0;
      }
      position = tmp_1;
    }
  }
  var tmp_2 = items.v1();
  var tmp2_elvis_lhs = valueEnd;
  tmp_2.i(new (HeaderValue())(subtrim(text, start, tmp2_elvis_lhs == null ? position : tmp2_elvis_lhs), valueOrEmpty(parameters)));
  return position;
}
function valueOrEmpty(_this__u8e3s4) {
  return _this__u8e3s4.xw() ? _this__u8e3s4.v1() : emptyList();
}
function subtrim(_this__u8e3s4, start, end) {
  // Inline function 'kotlin.text.trim' call
  var this_0 = substring(_this__u8e3s4, start, end);
  return toString(trim(isCharSequence(this_0) ? this_0 : THROW_CCE()));
}
function parseHeaderValueParameter(text, start, parameters) {
  var position = start;
  while (position <= get_lastIndex(text)) {
    var tmp0_subject = charCodeAt(text, position);
    if (tmp0_subject === _Char___init__impl__6a9atx(61)) {
      var _destruct__k2r9zo = parseHeaderValueParameterValue(text, position + 1 | 0);
      var paramEnd = _destruct__k2r9zo.ch();
      var paramValue = _destruct__k2r9zo.dh();
      parseHeaderValueParameter$addParam(parameters, text, start, position, paramValue);
      return paramEnd;
    } else if (tmp0_subject === _Char___init__impl__6a9atx(59) || tmp0_subject === _Char___init__impl__6a9atx(44)) {
      parseHeaderValueParameter$addParam(parameters, text, start, position, '');
      return position;
    } else {
      position = position + 1 | 0;
    }
  }
  parseHeaderValueParameter$addParam(parameters, text, start, position, '');
  return position;
}
function parseHeaderValueParameterValue(value, start) {
  if (value.length === start) {
    return to(start, '');
  }
  var position = start;
  if (charCodeAt(value, start) === _Char___init__impl__6a9atx(34)) {
    return parseHeaderValueParameterValueQuoted(value, position + 1 | 0);
  }
  while (position <= get_lastIndex(value)) {
    var tmp0_subject = charCodeAt(value, position);
    if (tmp0_subject === _Char___init__impl__6a9atx(59) || tmp0_subject === _Char___init__impl__6a9atx(44))
      return to(position, subtrim(value, start, position));
    else {
      position = position + 1 | 0;
    }
  }
  return to(position, subtrim(value, start, position));
}
function parseHeaderValueParameterValueQuoted(value, start) {
  var position = start;
  var builder = StringBuilder().f();
  loop: while (position <= get_lastIndex(value)) {
    var currentChar = charCodeAt(value, position);
    if (currentChar === _Char___init__impl__6a9atx(34) && nextIsDelimiterOrEnd(value, position)) {
      return to(position + 1 | 0, builder.toString());
    } else if (currentChar === _Char___init__impl__6a9atx(92) && position < (get_lastIndex(value) - 2 | 0)) {
      builder.ic(charCodeAt(value, position + 1 | 0));
      position = position + 2 | 0;
      continue loop;
    }
    builder.ic(currentChar);
    position = position + 1 | 0;
  }
  var tmp = position;
  var tmp0 = _Char___init__impl__6a9atx(34);
  // Inline function 'kotlin.text.plus' call
  var other = builder.toString();
  var tmp$ret$0 = toString_0(tmp0) + other;
  return to(tmp, tmp$ret$0);
}
function nextIsDelimiterOrEnd(_this__u8e3s4, start) {
  var position = start + 1 | 0;
  loop: while (position < _this__u8e3s4.length && charCodeAt(_this__u8e3s4, position) === _Char___init__impl__6a9atx(32)) {
    position = position + 1 | 0;
  }
  return position === _this__u8e3s4.length || charCodeAt(_this__u8e3s4, position) === _Char___init__impl__6a9atx(59) || charCodeAt(_this__u8e3s4, position) === _Char___init__impl__6a9atx(44);
}
function parseAndSortHeader(header) {
  // Inline function 'kotlin.collections.sortedByDescending' call
  var this_0 = parseHeaderValue(header);
  // Inline function 'kotlin.comparisons.compareByDescending' call
  var tmp = parseAndSortHeader$lambda;
  var tmp$ret$0 = new (sam$kotlin_Comparator$0())(tmp);
  return sortedWith(this_0, tmp$ret$0);
}
var sam$kotlin_Comparator$0Class;
function sam$kotlin_Comparator$0() {
  if (sam$kotlin_Comparator$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.r3u_1 = function_0;
      }
      al(a, b) {
        return this.r3u_1(a, b);
      }
      compare(a, b) {
        return this.al(a, b);
      }
      z4() {
        return this.r3u_1;
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
function parseHeaderValueParameter$addParam($parameters, text, start, end, value) {
  var name = subtrim(text, start, end);
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(name) === 0) {
    return Unit_instance;
  }
  $parameters.v1().i(HeaderValueParam().k3q(name, value));
}
function parseHeaderValue$lambda() {
  // Inline function 'kotlin.collections.arrayListOf' call
  return ArrayList().g1();
}
function parseHeaderValueItem$lambda() {
  // Inline function 'kotlin.collections.arrayListOf' call
  return ArrayList().g1();
}
function parseAndSortHeader$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.l3o_1;
  var tmp$ret$1 = a.l3o_1;
  return compareValues(tmp, tmp$ret$1);
}
//region block: exports
export {
  HeaderValueParam as HeaderValueParam1kbqez3tb3lqp,
  parseAndSortHeader as parseAndSortHeader33xgq5fx7y6j1,
  parseHeaderValue as parseHeaderValuealpos28fgp6t,
};
//endregion

//# sourceMappingURL=HttpHeaderValueParser.mjs.map
