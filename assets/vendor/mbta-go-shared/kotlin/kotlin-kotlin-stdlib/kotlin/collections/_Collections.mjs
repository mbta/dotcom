import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../text/StringBuilderJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { appendElement7nmjunfw9r4 as appendElement } from '../text/Appendable.mjs';
import { HashSet2dzve9y63nf0v as HashSet } from './HashSet.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from './Iterables.mjs';
import {
  mapCapacity1h45rc3eh9p2l as mapCapacity,
  setOf1u3mizs95ngxo as setOf,
  listOfvhqybd2zx248 as listOf,
  copyToArray2j022khrow2yi as copyToArray,
  sort15ai02l4kxbfa as sort,
  sortWith4fnm6b3vw03s as sortWith,
  checkIndexOverflow3frtmheghr0th as checkIndexOverflow,
} from './collectionJs.mjs';
import {
  booleanArray2jdug9b51huk7 as booleanArray,
  longArray288a0fctlmjmj as longArray,
} from '../js/arrays.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from './ArrayListJs.mjs';
import {
  emptySetcxexqki71qfa as emptySet,
  optimizeReadOnlySetbkgqv9johc5 as optimizeReadOnlySet,
} from './Sets.mjs';
import {
  KtList3hktaavzmj137 as KtList,
  Collection1k04j3hzsbod0 as Collection,
} from './Collections.mjs';
import {
  isInterface3d6p8outrmvmk as isInterface,
  isArray1hxjqtqy632bc as isArray,
} from '../js/typeCheckUtils.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from './LinkedHashSet.mjs';
import {
  addAll1k27qatfgp3k5 as addAll,
  retainAll12dge99qrkea2 as retainAll,
} from './MutableCollections.mjs';
import {
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../exceptions.mjs';
import {
  get_lastIndex1yw0x4k50k51w as get_lastIndex,
  emptyList1g2z5xcrvp2zy as emptyList,
  optimizeReadOnlyList2kolyxeo5m6k3 as optimizeReadOnlyList,
} from './CollectionsKt.mjs';
import { reversenv3adafjrtzo as reverse } from './_CollectionsJs.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
} from '../js/coreRuntime.mjs';
import { RandomAccess1jbw8sdogqb8x as RandomAccess } from './RandomAccess.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import {
  sort1opyk0uibi7i3 as sort_0,
  asList2ho2pewtsfvv as asList,
  sortWith23lt7r6b8svqd as sortWith_0,
} from './_ArraysJs.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../js/compareTo.mjs';
import {
  checkWindowSizeStepcg5bise2nnst as checkWindowSizeStep,
  MovingSubList31cw34af0kxls as MovingSubList,
  windowedIterator1l52d653czu3r as windowedIterator,
} from './SlidingWindow.mjs';
import {
  coerceAtMost322komnqp70ag as coerceAtMost,
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
} from '../ranges/_Ranges.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function joinToString(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  return joinTo(_this__u8e3s4, StringBuilder().f(), separator, prefix, postfix, limit, truncated, transform).toString();
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
  var _iterator__ex2g4s = _this__u8e3s4.x();
  $l$loop: while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
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
function toHashSet(_this__u8e3s4) {
  return toCollection(_this__u8e3s4, HashSet().b1(mapCapacity(collectionSizeOrDefault(_this__u8e3s4, 12))));
}
function toBooleanArray(_this__u8e3s4) {
  var result = booleanArray(_this__u8e3s4.c1());
  var index = 0;
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    result[_unary__edvuaz] = element;
  }
  return result;
}
function plus(_this__u8e3s4, element) {
  var result = ArrayList().w(_this__u8e3s4.c1() + 1 | 0);
  result.d1(_this__u8e3s4);
  result.i(element);
  return result;
}
function toSet(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection())) {
    var tmp;
    switch (_this__u8e3s4.c1()) {
      case 0:
        tmp = emptySet();
        break;
      case 1:
        var tmp_0;
        if (isInterface(_this__u8e3s4, KtList())) {
          tmp_0 = _this__u8e3s4.e1(0);
        } else {
          tmp_0 = _this__u8e3s4.x().z();
        }

        tmp = setOf(tmp_0);
        break;
      default:
        tmp = toCollection(_this__u8e3s4, LinkedHashSet().h(mapCapacity(_this__u8e3s4.c1())));
        break;
    }
    return tmp;
  }
  return optimizeReadOnlySet(toCollection(_this__u8e3s4, LinkedHashSet().f1()));
}
function plus_0(_this__u8e3s4, elements) {
  if (isInterface(elements, Collection())) {
    var result = ArrayList().w(_this__u8e3s4.c1() + elements.c1() | 0);
    result.d1(_this__u8e3s4);
    result.d1(elements);
    return result;
  } else {
    var result_0 = ArrayList().u(_this__u8e3s4);
    addAll(result_0, elements);
    return result_0;
  }
}
function plus_1(_this__u8e3s4, elements) {
  if (isInterface(_this__u8e3s4, Collection()))
    return plus_0(_this__u8e3s4, elements);
  var result = ArrayList().g1();
  addAll(result, _this__u8e3s4);
  addAll(result, elements);
  return result;
}
function asSequence(_this__u8e3s4) {
  // Inline function 'kotlin.sequences.Sequence' call
  return new (asSequence$$inlined$Sequence$1())(_this__u8e3s4);
}
function firstOrNull(_this__u8e3s4) {
  return _this__u8e3s4.h1() ? null : _this__u8e3s4.e1(0);
}
function last(_this__u8e3s4) {
  if (_this__u8e3s4.h1())
    throw NoSuchElementException().m('List is empty.');
  return _this__u8e3s4.e1(get_lastIndex(_this__u8e3s4));
}
function toLongArray(_this__u8e3s4) {
  var result = longArray(_this__u8e3s4.c1());
  var index = 0;
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    result[_unary__edvuaz] = element;
  }
  return result;
}
function toByteArray(_this__u8e3s4) {
  var result = new Int8Array(_this__u8e3s4.c1());
  var index = 0;
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    result[_unary__edvuaz] = element;
  }
  return result;
}
function reversed(_this__u8e3s4) {
  var tmp;
  if (isInterface(_this__u8e3s4, Collection())) {
    tmp = _this__u8e3s4.c1() <= 1;
  } else {
    tmp = false;
  }
  if (tmp)
    return toList(_this__u8e3s4);
  var list = toMutableList_0(_this__u8e3s4);
  reverse(list);
  return list;
}
function toMutableSet(_this__u8e3s4) {
  var tmp;
  if (isInterface(_this__u8e3s4, Collection())) {
    tmp = LinkedHashSet().i1(_this__u8e3s4);
  } else {
    tmp = toCollection(_this__u8e3s4, LinkedHashSet().f1());
  }
  return tmp;
}
function contains(_this__u8e3s4, element) {
  if (isInterface(_this__u8e3s4, Collection()))
    return _this__u8e3s4.j1(element);
  return indexOf_0(_this__u8e3s4, element) >= 0;
}
function toList(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection())) {
    var tmp;
    switch (_this__u8e3s4.c1()) {
      case 0:
        tmp = emptyList();
        break;
      case 1:
        var tmp_0;
        if (isInterface(_this__u8e3s4, KtList())) {
          tmp_0 = _this__u8e3s4.e1(0);
        } else {
          tmp_0 = _this__u8e3s4.x().z();
        }

        tmp = listOf(tmp_0);
        break;
      default:
        tmp = toMutableList(_this__u8e3s4);
        break;
    }
    return tmp;
  }
  return optimizeReadOnlyList(toMutableList_0(_this__u8e3s4));
}
function drop(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = 'Requested element count ' + n + ' is less than zero.';
    throw IllegalArgumentException().q(toString(message));
  }
  if (n === 0)
    return toList(_this__u8e3s4);
  var list;
  if (isInterface(_this__u8e3s4, Collection())) {
    var resultSize = _this__u8e3s4.c1() - n | 0;
    if (resultSize <= 0)
      return emptyList();
    if (resultSize === 1)
      return listOf(last_0(_this__u8e3s4));
    list = ArrayList().w(resultSize);
    if (isInterface(_this__u8e3s4, KtList())) {
      if (isInterface(_this__u8e3s4, RandomAccess())) {
        var inductionVariable = n;
        var last = _this__u8e3s4.c1();
        if (inductionVariable < last)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            list.i(_this__u8e3s4.e1(index));
          }
           while (inductionVariable < last);
      } else {
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = _this__u8e3s4.k1(n);
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          list.i(item);
        }
      }
      return list;
    }
  } else {
    list = ArrayList().g1();
  }
  var count = 0;
  var _iterator__ex2g4s_0 = _this__u8e3s4.x();
  while (_iterator__ex2g4s_0.y()) {
    var item_0 = _iterator__ex2g4s_0.z();
    if (count >= n)
      list.i(item_0);
    else {
      count = count + 1 | 0;
    }
  }
  return optimizeReadOnlyList(list);
}
function minus(_this__u8e3s4, element) {
  var result = ArrayList().w(collectionSizeOrDefault(_this__u8e3s4, 10));
  var removed = false;
  // Inline function 'kotlin.collections.filterTo' call
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var element_0 = _iterator__ex2g4s.z();
    var tmp;
    if (!removed && equals(element_0, element)) {
      removed = true;
      tmp = false;
    } else {
      tmp = true;
    }
    if (tmp) {
      result.i(element_0);
    }
  }
  return result;
}
function distinct(_this__u8e3s4) {
  return toList(toMutableSet(_this__u8e3s4));
}
function first(_this__u8e3s4) {
  if (_this__u8e3s4.h1())
    throw NoSuchElementException().m('List is empty.');
  return _this__u8e3s4.e1(0);
}
function lastOrNull(_this__u8e3s4) {
  return _this__u8e3s4.h1() ? null : _this__u8e3s4.e1(_this__u8e3s4.c1() - 1 | 0);
}
function toMutableList(_this__u8e3s4) {
  return ArrayList().u(_this__u8e3s4);
}
function getOrNull(_this__u8e3s4, index) {
  return (0 <= index ? index < _this__u8e3s4.c1() : false) ? _this__u8e3s4.e1(index) : null;
}
function single(_this__u8e3s4) {
  var tmp;
  switch (_this__u8e3s4.c1()) {
    case 0:
      throw NoSuchElementException().m('List is empty.');
    case 1:
      tmp = _this__u8e3s4.e1(0);
      break;
    default:
      throw IllegalArgumentException().q('List has more than one element.');
  }
  return tmp;
}
function take(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = 'Requested element count ' + n + ' is less than zero.';
    throw IllegalArgumentException().q(toString(message));
  }
  if (n === 0)
    return emptyList();
  if (isInterface(_this__u8e3s4, Collection())) {
    if (n >= _this__u8e3s4.c1())
      return toList(_this__u8e3s4);
    if (n === 1)
      return listOf(first_0(_this__u8e3s4));
  }
  var count = 0;
  var list = ArrayList().w(n);
  var _iterator__ex2g4s = _this__u8e3s4.x();
  $l$loop: while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    list.i(item);
    count = count + 1 | 0;
    if (count === n)
      break $l$loop;
  }
  return optimizeReadOnlyList(list);
}
function singleOrNull(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, KtList()))
    return _this__u8e3s4.c1() === 1 ? _this__u8e3s4.e1(0) : null;
  else {
    var iterator = _this__u8e3s4.x();
    if (!iterator.y())
      return null;
    var single = iterator.z();
    if (iterator.y())
      return null;
    return single;
  }
}
function indexOf(_this__u8e3s4, element) {
  return _this__u8e3s4.l1(element);
}
function first_0(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, KtList()))
    return first(_this__u8e3s4);
  else {
    var iterator = _this__u8e3s4.x();
    if (!iterator.y())
      throw NoSuchElementException().m('Collection is empty.');
    return iterator.z();
  }
}
function intersect(_this__u8e3s4, other) {
  var set = toMutableSet(_this__u8e3s4);
  retainAll(set, other);
  return set;
}
function sorted(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection())) {
    if (_this__u8e3s4.c1() <= 1)
      return toList(_this__u8e3s4);
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp = copyToArray(_this__u8e3s4);
    // Inline function 'kotlin.apply' call
    var this_0 = isArray(tmp) ? tmp : THROW_CCE();
    sort_0(this_0);
    return asList(this_0);
  }
  // Inline function 'kotlin.apply' call
  var this_1 = toMutableList_0(_this__u8e3s4);
  sort(this_1);
  return this_1;
}
function singleOrNull_0(_this__u8e3s4) {
  return _this__u8e3s4.c1() === 1 ? _this__u8e3s4.e1(0) : null;
}
function firstOrNull_0(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, KtList())) {
    if (_this__u8e3s4.h1())
      return null;
    else
      return _this__u8e3s4.e1(0);
  } else {
    var iterator = _this__u8e3s4.x();
    if (!iterator.y())
      return null;
    return iterator.z();
  }
}
function min(_this__u8e3s4) {
  var iterator = _this__u8e3s4.x();
  if (!iterator.y())
    throw NoSuchElementException().m1();
  var min = iterator.z();
  while (iterator.y()) {
    var e = iterator.z();
    if (compareTo(min, e) > 0)
      min = e;
  }
  return min;
}
function sortedWith(_this__u8e3s4, comparator) {
  if (isInterface(_this__u8e3s4, Collection())) {
    if (_this__u8e3s4.c1() <= 1)
      return toList(_this__u8e3s4);
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp = copyToArray(_this__u8e3s4);
    // Inline function 'kotlin.apply' call
    var this_0 = isArray(tmp) ? tmp : THROW_CCE();
    sortWith_0(this_0, comparator);
    return asList(this_0);
  }
  // Inline function 'kotlin.apply' call
  var this_1 = toMutableList_0(_this__u8e3s4);
  sortWith(this_1, comparator);
  return this_1;
}
function windowed(_this__u8e3s4, size, step, partialWindows, transform) {
  step = step === VOID ? 1 : step;
  partialWindows = partialWindows === VOID ? false : partialWindows;
  checkWindowSizeStep(size, step);
  var tmp;
  if (isInterface(_this__u8e3s4, RandomAccess())) {
    tmp = isInterface(_this__u8e3s4, KtList());
  } else {
    tmp = false;
  }
  if (tmp) {
    var thisSize = _this__u8e3s4.c1();
    var resultCapacity = (thisSize / step | 0) + ((thisSize % step | 0) === 0 ? 0 : 1) | 0;
    var result = ArrayList().w(resultCapacity);
    var window_0 = MovingSubList().q1(_this__u8e3s4);
    var index = 0;
    $l$loop: while (0 <= index ? index < thisSize : false) {
      var windowSize = coerceAtMost(size, thisSize - index | 0);
      if (!partialWindows && windowSize < size)
        break $l$loop;
      window_0.r1(index, index + windowSize | 0);
      result.i(transform(window_0));
      index = index + step | 0;
    }
    return result;
  }
  var result_0 = ArrayList().g1();
  // Inline function 'kotlin.collections.forEach' call
  // Inline function 'kotlin.collections.iterator' call
  var _iterator__ex2g4s = windowedIterator(_this__u8e3s4.x(), size, step, partialWindows, true);
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    result_0.i(transform(element));
  }
  return result_0;
}
function dropLast(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = 'Requested element count ' + n + ' is less than zero.';
    throw IllegalArgumentException().q(toString(message));
  }
  return take(_this__u8e3s4, coerceAtLeast(_this__u8e3s4.c1() - n | 0, 0));
}
function filterNotNull(_this__u8e3s4) {
  return filterNotNullTo(_this__u8e3s4, ArrayList().g1());
}
function sum(_this__u8e3s4) {
  var sum = 0;
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    sum = sum + element | 0;
  }
  return sum;
}
function single_0(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, KtList()))
    return single(_this__u8e3s4);
  else {
    var iterator = _this__u8e3s4.x();
    if (!iterator.y())
      throw NoSuchElementException().m('Collection is empty.');
    var single_0 = iterator.z();
    if (iterator.y())
      throw IllegalArgumentException().q('Collection has more than one element.');
    return single_0;
  }
}
function toCollection(_this__u8e3s4, destination) {
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    destination.i(item);
  }
  return destination;
}
function toMutableList_0(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection()))
    return toMutableList(_this__u8e3s4);
  return toCollection(_this__u8e3s4, ArrayList().g1());
}
function indexOf_0(_this__u8e3s4, element) {
  if (isInterface(_this__u8e3s4, KtList()))
    return _this__u8e3s4.l1(element);
  var index = 0;
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    checkIndexOverflow(index);
    if (equals(element, item))
      return index;
    index = index + 1 | 0;
  }
  return -1;
}
function last_0(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, KtList()))
    return last(_this__u8e3s4);
  else {
    var iterator = _this__u8e3s4.x();
    if (!iterator.y())
      throw NoSuchElementException().m('Collection is empty.');
    var last_0 = iterator.z();
    while (iterator.y())
      last_0 = iterator.z();
    return last_0;
  }
}
function filterNotNullTo(_this__u8e3s4, destination) {
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    if (!(element == null)) {
      destination.i(element);
    }
  }
  return destination;
}
function minOrNull(_this__u8e3s4) {
  var iterator = _this__u8e3s4.x();
  if (!iterator.y())
    return null;
  var min = iterator.z();
  while (iterator.y()) {
    var e = iterator.z();
    if (compareTo(min, e) > 0)
      min = e;
  }
  return min;
}
function toDoubleArray(_this__u8e3s4) {
  var result = new Float64Array(_this__u8e3s4.c1());
  var index = 0;
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    result[_unary__edvuaz] = element;
  }
  return result;
}
var asSequence$$inlined$Sequence$1Class;
function asSequence$$inlined$Sequence$1() {
  if (asSequence$$inlined$Sequence$1Class === VOID) {
    class $ {
      constructor($this_asSequence) {
        this.s1_1 = $this_asSequence;
      }
      x() {
        return this.s1_1.x();
      }
    }
    initMetadataForClass($);
    asSequence$$inlined$Sequence$1Class = $;
  }
  return asSequence$$inlined$Sequence$1Class;
}
//region block: exports
export {
  asSequence as asSequence2phdjljfh9jhx,
  contains as contains2gm06f5aa19ov,
  distinct as distinct10qe1scfdvu5k,
  dropLast as dropLast1vpiyky649o34,
  drop as drop3na99dw9feawf,
  filterNotNull as filterNotNull3qfgcwmxhwfxe,
  firstOrNull as firstOrNull1982767dljvdy,
  firstOrNull_0 as firstOrNullf6vlo6vdgu1e,
  first as first58ocm7j58k3q,
  first_0 as first28gmhyvs4kf06,
  getOrNull as getOrNull1go7ef9ldk0df,
  indexOf as indexOfa2zokh3tu4p6,
  intersect as intersect7qttw6wlmz1n,
  joinToString as joinToString1cxrrlmo0chqs,
  joinTo as joinTo3lkanfaxbzac2,
  lastOrNull as lastOrNull1aq5oz189qoe1,
  last as last1vo29oleiqj36,
  minOrNull as minOrNull1g8m0136x75mg,
  minus as minus1djrl64vbav3y,
  min as minjeab1ybpajdx,
  plus_1 as plus39kp8wyage607,
  plus_0 as plus310ted5e4i90h,
  plus as plus20p0vtfmu0596,
  reversed as reversed22y3au42jl32b,
  singleOrNull_0 as singleOrNullrknfaxokm1sl,
  singleOrNull as singleOrNull21olsob387p54,
  single as singleo93pzdgfc557,
  single_0 as single3ds7xj9roxi5z,
  sortedWith as sortedWith2csnbbb21k0lg,
  sorted as sorted354mfsiv4s7x5,
  sum as sum1ib1hqt64m6qf,
  take as take3onnpy6q7ctcz,
  toBooleanArray as toBooleanArray2u3qw7fjwsmuh,
  toByteArray as toByteArray3caw0hip00os,
  toDoubleArray as toDoubleArray1tu5g57mgriew,
  toHashSet as toHashSet1qrcsl3g8ugc8,
  toList as toList3jhuyej2anx2q,
  toLongArray as toLongArray23ixicpzp5r3w,
  toMutableList as toMutableList20rdgwi7d3cwi,
  toMutableSet as toMutableSetjdpdbr9jsqq8,
  toSet as toSet2orjxp16sotqu,
  windowed as windowed33b2v83r9sjlq,
};
//endregion

//# sourceMappingURL=_Collections.mjs.map
