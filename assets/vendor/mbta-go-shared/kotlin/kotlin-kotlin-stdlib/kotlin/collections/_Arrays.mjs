import {
  emptyList1g2z5xcrvp2zy as emptyList,
  asCollection2jt8ak1h50iom as asCollection,
} from './CollectionsKt.mjs';
import {
  listOfvhqybd2zx248 as listOf,
  setOf1u3mizs95ngxo as setOf,
  mapCapacity1h45rc3eh9p2l as mapCapacity,
} from './collectionJs.mjs';
import { IndexingIterable2a6g9uso7i6wu as IndexingIterable } from './Iterables.mjs';
import { IntRange1cx8zvxgibbj2 as IntRange } from '../ranges/PrimitiveRanges.mjs';
import { equals2au1ep9vhcato as equals } from '../js/coreRuntime.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../text/StringBuilderJs.mjs';
import { emptySetcxexqki71qfa as emptySet } from './Sets.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from './LinkedHashSet.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../exceptions.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from './ArrayListJs.mjs';
import { appendElement7nmjunfw9r4 as appendElement } from '../text/Appendable.mjs';
import { to2cs3ny02qtbcb as to } from '../Tuples.mjs';
import { arrayIterator3lgwvgteckzhv as arrayIterator } from '../js/arrays.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function toList(_this__u8e3s4) {
  switch (_this__u8e3s4.length) {
    case 0:
      return emptyList();
    case 1:
      return listOf(_this__u8e3s4[0]);
    default:
      return toMutableList(_this__u8e3s4);
  }
}
function withIndex(_this__u8e3s4) {
  return new (IndexingIterable())(withIndex$lambda(_this__u8e3s4));
}
function get_indices(_this__u8e3s4) {
  return new (IntRange())(0, get_lastIndex_0(_this__u8e3s4));
}
function get_indices_0(_this__u8e3s4) {
  return new (IntRange())(0, get_lastIndex_1(_this__u8e3s4));
}
function get_lastIndex(_this__u8e3s4) {
  return _this__u8e3s4.length - 1 | 0;
}
function indexOf(_this__u8e3s4, element) {
  if (element == null) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (_this__u8e3s4[index] == null) {
          return index;
        }
      }
       while (inductionVariable <= last);
  } else {
    var inductionVariable_0 = 0;
    var last_0 = _this__u8e3s4.length - 1 | 0;
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        if (equals(element, _this__u8e3s4[index_0])) {
          return index_0;
        }
      }
       while (inductionVariable_0 <= last_0);
  }
  return -1;
}
function contains(_this__u8e3s4, element) {
  return indexOf_0(_this__u8e3s4, element) >= 0;
}
function contains_0(_this__u8e3s4, element) {
  return indexOf_1(_this__u8e3s4, element) >= 0;
}
function contains_1(_this__u8e3s4, element) {
  return indexOf_2(_this__u8e3s4, element) >= 0;
}
function contains_2(_this__u8e3s4, element) {
  return indexOf_3(_this__u8e3s4, element) >= 0;
}
function joinToString(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  return joinTo(_this__u8e3s4, StringBuilder().f(), separator, prefix, postfix, limit, truncated, transform).toString();
}
function lastIndexOf(_this__u8e3s4, element) {
  if (element == null) {
    var inductionVariable = _this__u8e3s4.length - 1 | 0;
    if (0 <= inductionVariable)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        if (_this__u8e3s4[index] == null) {
          return index;
        }
      }
       while (0 <= inductionVariable);
  } else {
    var inductionVariable_0 = _this__u8e3s4.length - 1 | 0;
    if (0 <= inductionVariable_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + -1 | 0;
        if (equals(element, _this__u8e3s4[index_0])) {
          return index_0;
        }
      }
       while (0 <= inductionVariable_0);
  }
  return -1;
}
function toSet(_this__u8e3s4) {
  switch (_this__u8e3s4.length) {
    case 0:
      return emptySet();
    case 1:
      return setOf(_this__u8e3s4[0]);
    default:
      return toCollection(_this__u8e3s4, LinkedHashSet().h(mapCapacity(_this__u8e3s4.length)));
  }
}
function toCollection(_this__u8e3s4, destination) {
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  while (inductionVariable < last) {
    var item = _this__u8e3s4[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    destination.i(item);
  }
  return destination;
}
function single(_this__u8e3s4) {
  var tmp;
  switch (_this__u8e3s4.length) {
    case 0:
      throw NoSuchElementException().m('Array is empty.');
    case 1:
      tmp = _this__u8e3s4[0];
      break;
    default:
      throw IllegalArgumentException().q('Array has more than one element.');
  }
  return tmp;
}
function toMutableList(_this__u8e3s4) {
  return ArrayList().u(asCollection(_this__u8e3s4));
}
function get_lastIndex_0(_this__u8e3s4) {
  return _this__u8e3s4.length - 1 | 0;
}
function get_lastIndex_1(_this__u8e3s4) {
  return _this__u8e3s4.length - 1 | 0;
}
function indexOf_0(_this__u8e3s4, element) {
  var inductionVariable = 0;
  var last = _this__u8e3s4.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (element === _this__u8e3s4[index]) {
        return index;
      }
    }
     while (inductionVariable <= last);
  return -1;
}
function indexOf_1(_this__u8e3s4, element) {
  var inductionVariable = 0;
  var last = _this__u8e3s4.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (element.equals(_this__u8e3s4[index])) {
        return index;
      }
    }
     while (inductionVariable <= last);
  return -1;
}
function indexOf_2(_this__u8e3s4, element) {
  var inductionVariable = 0;
  var last = _this__u8e3s4.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (element === _this__u8e3s4[index]) {
        return index;
      }
    }
     while (inductionVariable <= last);
  return -1;
}
function indexOf_3(_this__u8e3s4, element) {
  var inductionVariable = 0;
  var last = _this__u8e3s4.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (element === _this__u8e3s4[index]) {
        return index;
      }
    }
     while (inductionVariable <= last);
  return -1;
}
function joinTo(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  buffer.v(prefix);
  var count = 0;
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  $l$loop: while (inductionVariable < last) {
    var element = _this__u8e3s4[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    count = count + 1 | 0;
    if (count > 1) {
      buffer.v(separator);
    }
    if (limit < 0 || count <= limit) {
      if (!(transform == null))
        buffer.v(transform(element));
      else
        buffer.v(element.toString());
    } else
      break $l$loop;
  }
  if (limit >= 0 && count > limit) {
    buffer.v(truncated);
  }
  buffer.v(postfix);
  return buffer;
}
function contains_3(_this__u8e3s4, element) {
  return indexOf(_this__u8e3s4, element) >= 0;
}
function joinToString_0(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  return joinTo_0(_this__u8e3s4, StringBuilder().f(), separator, prefix, postfix, limit, truncated, transform).toString();
}
function joinTo_0(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  buffer.v(prefix);
  var count = 0;
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  $l$loop: while (inductionVariable < last) {
    var element = _this__u8e3s4[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    count = count + 1 | 0;
    if (count > 1) {
      buffer.v(separator);
    }
    if (limit < 0 || count <= limit) {
      appendElement(buffer, element, transform);
    } else
      break $l$loop;
  }
  if (limit >= 0 && count > limit) {
    buffer.v(truncated);
  }
  buffer.v(postfix);
  return buffer;
}
function zip(_this__u8e3s4, other) {
  // Inline function 'kotlin.collections.zip' call
  var tmp0 = _this__u8e3s4.length;
  // Inline function 'kotlin.comparisons.minOf' call
  var b = other.length;
  var size = Math.min(tmp0, b);
  var list = ArrayList().w(size);
  var inductionVariable = 0;
  if (inductionVariable < size)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var tmp0_0 = _this__u8e3s4[i];
      var t2 = other[i];
      var tmp$ret$1 = to(tmp0_0, t2);
      list.i(tmp$ret$1);
    }
     while (inductionVariable < size);
  return list;
}
function getOrNull(_this__u8e3s4, index) {
  return (0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false) ? _this__u8e3s4[index] : null;
}
function getOrNull_0(_this__u8e3s4, index) {
  return (0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false) ? _this__u8e3s4[index] : null;
}
function joinToString_1(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  return joinTo_1(_this__u8e3s4, StringBuilder().f(), separator, prefix, postfix, limit, truncated, transform).toString();
}
function firstOrNull(_this__u8e3s4) {
  var tmp;
  // Inline function 'kotlin.collections.isEmpty' call
  if (_this__u8e3s4.length === 0) {
    tmp = null;
  } else {
    tmp = _this__u8e3s4[0];
  }
  return tmp;
}
function joinTo_1(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  buffer.v(prefix);
  var count = 0;
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  $l$loop: while (inductionVariable < last) {
    var element = _this__u8e3s4[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    count = count + 1 | 0;
    if (count > 1) {
      buffer.v(separator);
    }
    if (limit < 0 || count <= limit) {
      if (!(transform == null))
        buffer.v(transform(element));
      else
        buffer.v(element.toString());
    } else
      break $l$loop;
  }
  if (limit >= 0 && count > limit) {
    buffer.v(truncated);
  }
  buffer.v(postfix);
  return buffer;
}
function withIndex$lambda($this_withIndex) {
  return function () {
    return arrayIterator($this_withIndex);
  };
}
//region block: exports
export {
  contains_0 as contains2ejsq2kq1axf2,
  contains as contains3u8qpdzrl9an,
  contains_2 as contains1a3ax1gghv0nr,
  contains_1 as containscs3vsq7ynpxl,
  contains_3 as contains1tccixv8iwdcq,
  firstOrNull as firstOrNull1gk7vzkf4h3nq,
  getOrNull as getOrNull1d60i0672n7ns,
  getOrNull_0 as getOrNull2un4612fzb00u,
  indexOf as indexOf3ic8eacwbbrog,
  get_indices_0 as get_indices377latqcai313,
  get_indices as get_indicesc04v40g017hw,
  joinToString_1 as joinToString39rl9p9h59k3o,
  joinToString as joinToString26w4x2pxjux6a,
  joinToString_0 as joinToStringxqcavsxcmh4q,
  get_lastIndex as get_lastIndex1y2f6o9u8hnf7,
  get_lastIndex_0 as get_lastIndexx0qsydpfv3mu,
  lastIndexOf as lastIndexOf38r7ehtcodylq,
  single as single2hobxym0rz0fw,
  toCollection as toCollection105f1cp28k3eu,
  toList as toList383f556t1dixk,
  toSet as toSet1glep2u1u9tcb,
  withIndex as withIndex3s8q7w1g0hyfn,
  zip as zip2suipyqmdw72q,
};
//endregion

//# sourceMappingURL=_Arrays.mjs.map
