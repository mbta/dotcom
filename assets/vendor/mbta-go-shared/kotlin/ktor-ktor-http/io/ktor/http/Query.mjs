import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  Companion_getInstance30d3mgq58m8dc as Companion_getInstance,
  ParametersBuilder1ry9ntvvg567r as ParametersBuilder,
} from './Parameters.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { get_lastIndexld83bqhfgcdd as get_lastIndex } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import {
  charCodeAt1yspne1d8erbm as charCodeAt,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { substringiqarkczpya5m as substring } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { decodeURLQueryComponent1psnpw5x5jp3h as decodeURLQueryComponent } from './Codecs.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { isWhitespace25occ8z1ed1s9 as isWhitespace } from '../../../../kotlin-kotlin-stdlib/kotlin/text/charJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function parseQueryString(query, startIndex, limit, decode) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  limit = limit === VOID ? 1000 : limit;
  decode = decode === VOID ? true : decode;
  var tmp;
  if (startIndex > get_lastIndex(query)) {
    tmp = Companion_getInstance().j3y_1;
  } else {
    // Inline function 'io.ktor.http.Companion.build' call
    Companion_getInstance();
    // Inline function 'kotlin.apply' call
    var this_0 = ParametersBuilder();
    parse(this_0, query, startIndex, limit, decode);
    tmp = this_0.r3q();
  }
  return tmp;
}
function parse(_this__u8e3s4, query, startIndex, limit, decode) {
  var count = 0;
  var nameIndex = startIndex;
  var equalIndex = -1;
  var inductionVariable = startIndex;
  var last = get_lastIndex(query);
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (count === limit) {
        return Unit_instance;
      }
      var tmp0_subject = charCodeAt(query, index);
      if (tmp0_subject === _Char___init__impl__6a9atx(38)) {
        appendParam(_this__u8e3s4, query, nameIndex, equalIndex, index, decode);
        nameIndex = index + 1 | 0;
        equalIndex = -1;
        count = count + 1 | 0;
      } else if (tmp0_subject === _Char___init__impl__6a9atx(61)) {
        if (equalIndex === -1) {
          equalIndex = index;
        }
      }
    }
     while (!(index === last));
  if (count === limit) {
    return Unit_instance;
  }
  appendParam(_this__u8e3s4, query, nameIndex, equalIndex, query.length, decode);
}
function appendParam(_this__u8e3s4, query, nameIndex, equalIndex, endIndex, decode) {
  if (equalIndex === -1) {
    var spaceNameIndex = trimStart(nameIndex, endIndex, query);
    var spaceEndIndex = trimEnd(spaceNameIndex, endIndex, query);
    if (spaceEndIndex > spaceNameIndex) {
      var name = decode ? decodeURLQueryComponent(query, spaceNameIndex, spaceEndIndex) : substring(query, spaceNameIndex, spaceEndIndex);
      _this__u8e3s4.f3j(name, emptyList());
    }
    return Unit_instance;
  }
  var spaceNameIndex_0 = trimStart(nameIndex, equalIndex, query);
  var spaceEqualIndex = trimEnd(spaceNameIndex_0, equalIndex, query);
  if (spaceEqualIndex > spaceNameIndex_0) {
    var name_0 = decode ? decodeURLQueryComponent(query, spaceNameIndex_0, spaceEqualIndex) : substring(query, spaceNameIndex_0, spaceEqualIndex);
    var spaceValueIndex = trimStart(equalIndex + 1 | 0, endIndex, query);
    var spaceEndIndex_0 = trimEnd(spaceValueIndex, endIndex, query);
    var value = decode ? decodeURLQueryComponent(query, spaceValueIndex, spaceEndIndex_0, true) : substring(query, spaceValueIndex, spaceEndIndex_0);
    _this__u8e3s4.j3j(name_0, value);
  }
}
function trimStart(start, end, query) {
  var spaceIndex = start;
  while (spaceIndex < end && isWhitespace(charSequenceGet(query, spaceIndex))) {
    spaceIndex = spaceIndex + 1 | 0;
  }
  return spaceIndex;
}
function trimEnd(start, end, text) {
  var spaceIndex = end;
  while (spaceIndex > start && isWhitespace(charSequenceGet(text, spaceIndex - 1 | 0))) {
    spaceIndex = spaceIndex - 1 | 0;
  }
  return spaceIndex;
}
//region block: exports
export {
  parseQueryString as parseQueryString1nwcni3n22i7m,
};
//endregion

//# sourceMappingURL=Query.mjs.map
