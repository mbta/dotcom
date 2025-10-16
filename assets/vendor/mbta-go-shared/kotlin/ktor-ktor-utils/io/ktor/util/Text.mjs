import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { get_lastIndexld83bqhfgcdd as get_lastIndex } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import {
  toString3o7ifthqydp6e as toString,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__plus_impl_qi7pgj3akekecdud2w6 as Char__plus_impl_qi7pgj,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { equals2v6cggk171b6e as equals } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function toLowerCasePreservingASCIIRules(_this__u8e3s4) {
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.text.indexOfFirst' call
    var inductionVariable = 0;
    var last = charSequenceLength(_this__u8e3s4) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var it = charSequenceGet(_this__u8e3s4, index);
        if (!(toLowerCasePreservingASCII(it) === it)) {
          tmp$ret$1 = index;
          break $l$block;
        }
      }
       while (inductionVariable <= last);
    tmp$ret$1 = -1;
  }
  var firstIndex = tmp$ret$1;
  if (firstIndex === -1) {
    return _this__u8e3s4;
  }
  var original = _this__u8e3s4;
  // Inline function 'kotlin.text.buildString' call
  var capacity = _this__u8e3s4.length;
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().kc(capacity);
  this_0.bj(original, 0, firstIndex);
  var inductionVariable_0 = firstIndex;
  var last_0 = get_lastIndex(original);
  if (inductionVariable_0 <= last_0)
    do {
      var index_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      this_0.ic(toLowerCasePreservingASCII(charCodeAt(original, index_0)));
    }
     while (!(index_0 === last_0));
  return this_0.toString();
}
function toLowerCasePreservingASCII(ch) {
  var tmp;
  if (_Char___init__impl__6a9atx(65) <= ch ? ch <= _Char___init__impl__6a9atx(90) : false) {
    tmp = Char__plus_impl_qi7pgj(ch, 32);
  } else if (_Char___init__impl__6a9atx(0) <= ch ? ch <= _Char___init__impl__6a9atx(127) : false) {
    tmp = ch;
  } else {
    // Inline function 'kotlin.text.lowercaseChar' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp$ret$2 = toString(ch).toLowerCase();
    tmp = charCodeAt(tmp$ret$2, 0);
  }
  return tmp;
}
var CaseInsensitiveStringClass;
function CaseInsensitiveString() {
  if (CaseInsensitiveStringClass === VOID) {
    class $ {
      constructor(content) {
        this.m3h_1 = content;
        var temp = 0;
        var indexedObject = this.m3h_1;
        var inductionVariable = 0;
        var last = indexedObject.length;
        while (inductionVariable < last) {
          var element = charCodeAt(indexedObject, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          var tmp = imul(temp, 31);
          // Inline function 'kotlin.text.lowercaseChar' call
          // Inline function 'kotlin.text.lowercase' call
          // Inline function 'kotlin.js.asDynamic' call
          // Inline function 'kotlin.js.unsafeCast' call
          var tmp$ret$2 = toString(element).toLowerCase();
          // Inline function 'kotlin.code' call
          var this_0 = charCodeAt(tmp$ret$2, 0);
          temp = tmp + Char__toInt_impl_vasixd(this_0) | 0;
        }
        this.n3h_1 = temp;
      }
      equals(other) {
        var tmp0_safe_receiver = other instanceof CaseInsensitiveString() ? other : null;
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m3h_1;
        return (tmp1_safe_receiver == null ? null : equals(tmp1_safe_receiver, this.m3h_1, true)) === true;
      }
      hashCode() {
        return this.n3h_1;
      }
      toString() {
        return this.m3h_1;
      }
    }
    initMetadataForClass($, 'CaseInsensitiveString');
    CaseInsensitiveStringClass = $;
  }
  return CaseInsensitiveStringClass;
}
function caseInsensitive(_this__u8e3s4) {
  return new (CaseInsensitiveString())(_this__u8e3s4);
}
//region block: exports
export {
  CaseInsensitiveString as CaseInsensitiveStringghw1fh6uf9mm,
  caseInsensitive as caseInsensitive293j1l8ok4b2v,
  toLowerCasePreservingASCIIRules as toLowerCasePreservingASCIIRulesa2d90zyoc6kw,
};
//endregion

//# sourceMappingURL=Text.mjs.map
