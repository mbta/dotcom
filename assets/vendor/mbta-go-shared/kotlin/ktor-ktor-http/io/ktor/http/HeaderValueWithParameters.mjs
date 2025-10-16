import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  emptyList1g2z5xcrvp2zy as emptyList,
  get_lastIndex1yw0x4k50k51w as get_lastIndex,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { equals2v6cggk171b6e as equals } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  Char19o2r8palgjof as Char,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  first3kg261hmihapu as first,
  last2n4gf5az1lkn4 as last,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/_Strings.mjs';
import {
  indexOf1xbs558u7wr52 as indexOf,
  get_lastIndexld83bqhfgcdd as get_lastIndex_0,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_HeaderFieldValueSeparators() {
  _init_properties_HeaderValueWithParameters_kt__z6luvy();
  return HeaderFieldValueSeparators;
}
var HeaderFieldValueSeparators;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var HeaderValueWithParametersClass;
function HeaderValueWithParameters() {
  if (HeaderValueWithParametersClass === VOID) {
    class $ {
      static i3q(content, parameters) {
        parameters = parameters === VOID ? emptyList() : parameters;
        var $this = createThis(this);
        $this.y3n_1 = content;
        $this.z3n_1 = parameters;
        return $this;
      }
      n3q(name) {
        var inductionVariable = 0;
        var last = get_lastIndex(this.z3n_1);
        if (inductionVariable <= last)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var parameter = this.z3n_1.e1(index);
            if (equals(parameter.a3o_1, name, true)) {
              return parameter.b3o_1;
            }
          }
           while (!(index === last));
        return null;
      }
      toString() {
        var tmp;
        if (this.z3n_1.h1()) {
          tmp = this.y3n_1;
        } else {
          var tmp_0 = this.y3n_1.length;
          // Inline function 'kotlin.collections.sumOf' call
          var sum = 0;
          var _iterator__ex2g4s = this.z3n_1.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            var tmp_1 = sum;
            sum = tmp_1 + ((element.a3o_1.length + element.b3o_1.length | 0) + 3 | 0) | 0;
          }
          var size = tmp_0 + sum | 0;
          // Inline function 'kotlin.apply' call
          var this_0 = StringBuilder().kc(size);
          this_0.hc(this.y3n_1);
          var inductionVariable = 0;
          var last = get_lastIndex(this.z3n_1);
          if (inductionVariable <= last)
            do {
              var index = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var element_0 = this.z3n_1.e1(index);
              this_0.hc('; ');
              this_0.hc(element_0.a3o_1);
              this_0.hc('=');
              // Inline function 'io.ktor.http.escapeIfNeededTo' call
              var this_1 = element_0.b3o_1;
              if (needQuotes(this_1))
                this_0.hc(quote(this_1));
              else
                this_0.hc(this_1);
            }
             while (!(index === last));
          tmp = this_0.toString();
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'HeaderValueWithParameters');
    HeaderValueWithParametersClass = $;
  }
  return HeaderValueWithParametersClass;
}
function needQuotes(_this__u8e3s4) {
  _init_properties_HeaderValueWithParameters_kt__z6luvy();
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(_this__u8e3s4) === 0)
    return true;
  if (isQuoted(_this__u8e3s4))
    return false;
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  while (inductionVariable < last) {
    var element = charCodeAt(_this__u8e3s4, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    if (get_HeaderFieldValueSeparators().j1(new (Char())(element)))
      return true;
  }
  return false;
}
function quote(_this__u8e3s4) {
  _init_properties_HeaderValueWithParameters_kt__z6luvy();
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  quoteTo(_this__u8e3s4, this_0);
  return this_0.toString();
}
function isQuoted(_this__u8e3s4) {
  _init_properties_HeaderValueWithParameters_kt__z6luvy();
  if (_this__u8e3s4.length < 2) {
    return false;
  }
  if (!(first(_this__u8e3s4) === _Char___init__impl__6a9atx(34)) || !(last(_this__u8e3s4) === _Char___init__impl__6a9atx(34))) {
    return false;
  }
  var startIndex = 1;
  $l$loop: do {
    var index = indexOf(_this__u8e3s4, _Char___init__impl__6a9atx(34), startIndex);
    if (index === get_lastIndex_0(_this__u8e3s4)) {
      break $l$loop;
    }
    var slashesCount = 0;
    var slashIndex = index - 1 | 0;
    while (charCodeAt(_this__u8e3s4, slashIndex) === _Char___init__impl__6a9atx(92)) {
      slashesCount = slashesCount + 1 | 0;
      slashIndex = slashIndex - 1 | 0;
    }
    if ((slashesCount % 2 | 0) === 0) {
      return false;
    }
    startIndex = index + 1 | 0;
  }
   while (startIndex < _this__u8e3s4.length);
  return true;
}
function quoteTo(_this__u8e3s4, out) {
  _init_properties_HeaderValueWithParameters_kt__z6luvy();
  out.hc('"');
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  while (inductionVariable < last) {
    var element = charCodeAt(_this__u8e3s4, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    var ch = element;
    if (ch === _Char___init__impl__6a9atx(92))
      out.hc('\\\\');
    else if (ch === _Char___init__impl__6a9atx(10))
      out.hc('\\n');
    else if (ch === _Char___init__impl__6a9atx(13))
      out.hc('\\r');
    else if (ch === _Char___init__impl__6a9atx(9))
      out.hc('\\t');
    else if (ch === _Char___init__impl__6a9atx(34))
      out.hc('\\"');
    else
      out.ic(ch);
  }
  out.hc('"');
}
var properties_initialized_HeaderValueWithParameters_kt_yu5xg;
function _init_properties_HeaderValueWithParameters_kt__z6luvy() {
  if (!properties_initialized_HeaderValueWithParameters_kt_yu5xg) {
    properties_initialized_HeaderValueWithParameters_kt_yu5xg = true;
    HeaderFieldValueSeparators = setOf([new (Char())(_Char___init__impl__6a9atx(40)), new (Char())(_Char___init__impl__6a9atx(41)), new (Char())(_Char___init__impl__6a9atx(60)), new (Char())(_Char___init__impl__6a9atx(62)), new (Char())(_Char___init__impl__6a9atx(64)), new (Char())(_Char___init__impl__6a9atx(44)), new (Char())(_Char___init__impl__6a9atx(59)), new (Char())(_Char___init__impl__6a9atx(58)), new (Char())(_Char___init__impl__6a9atx(92)), new (Char())(_Char___init__impl__6a9atx(34)), new (Char())(_Char___init__impl__6a9atx(47)), new (Char())(_Char___init__impl__6a9atx(91)), new (Char())(_Char___init__impl__6a9atx(93)), new (Char())(_Char___init__impl__6a9atx(63)), new (Char())(_Char___init__impl__6a9atx(61)), new (Char())(_Char___init__impl__6a9atx(123)), new (Char())(_Char___init__impl__6a9atx(125)), new (Char())(_Char___init__impl__6a9atx(32)), new (Char())(_Char___init__impl__6a9atx(9)), new (Char())(_Char___init__impl__6a9atx(10)), new (Char())(_Char___init__impl__6a9atx(13))]);
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instance2y99io54syq2d,
  HeaderValueWithParameters as HeaderValueWithParameters2awuza444hhll,
};
//endregion

//# sourceMappingURL=HeaderValueWithParameters.mjs.map
