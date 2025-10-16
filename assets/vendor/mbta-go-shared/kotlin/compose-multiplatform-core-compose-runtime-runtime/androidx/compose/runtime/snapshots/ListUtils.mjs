import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { HashSet2dzve9y63nf0v as HashSet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/HashSet.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Char19o2r8palgjof as Char } from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { isCharSequence1ju9jr1w86plq as isCharSequence } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function fastJoinToString(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  return fastJoinTo(_this__u8e3s4, StringBuilder().f(), separator, prefix, postfix, limit, truncated, transform).toString();
}
function fastToSet(_this__u8e3s4) {
  // Inline function 'kotlin.also' call
  var this_0 = HashSet().b1(_this__u8e3s4.c1());
  // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
  var inductionVariable = 0;
  var last = _this__u8e3s4.c1() - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var item = _this__u8e3s4.e1(index);
      this_0.i(item);
    }
     while (inductionVariable <= last);
  return this_0;
}
function fastJoinTo(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  buffer.v(prefix);
  var count = 0;
  var inductionVariable = 0;
  var last = _this__u8e3s4.c1() - 1 | 0;
  if (inductionVariable <= last)
    $l$loop: do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var element = _this__u8e3s4.e1(index);
      count = count + 1 | 0;
      if (count > 1) {
        buffer.v(separator);
      }
      if (limit < 0 || count <= limit) {
        appendElement(buffer, element, transform);
      } else
        break $l$loop;
    }
     while (inductionVariable <= last);
  if (limit >= 0 && count > limit) {
    buffer.v(truncated);
  }
  buffer.v(postfix);
  return buffer;
}
function appendElement(_this__u8e3s4, element, transform) {
  if (!(transform == null))
    _this__u8e3s4.v(transform(element));
  else {
    if (element == null ? true : isCharSequence(element))
      _this__u8e3s4.v(element);
    else {
      if (element instanceof Char())
        _this__u8e3s4.ic(element.r2_1);
      else {
        _this__u8e3s4.v(toString(element));
      }
    }
  }
}
//region block: exports
export {
  fastJoinToString as fastJoinToString3fmn550rqarje,
  fastToSet as fastToSetbv5eqobkexj6,
};
//endregion

//# sourceMappingURL=ListUtils.mjs.map
