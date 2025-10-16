import { get_lastIndex1yw0x4k50k51w as get_lastIndex } from './CollectionsKt.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from '../exceptions.mjs';
import { asList2ho2pewtsfvv as asList } from './_ArraysJs.mjs';
import {
  Collection1k04j3hzsbod0 as Collection,
  MutableIterablez3x4ksk1fmrm as MutableIterable,
} from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { toList3jhuyej2anx2q as toList } from './_Collections.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { RandomAccess1jbw8sdogqb8x as RandomAccess } from './RandomAccess.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function removeFirstOrNull(_this__u8e3s4) {
  return _this__u8e3s4.h1() ? null : _this__u8e3s4.s3(0);
}
function removeLast(_this__u8e3s4) {
  var tmp;
  if (_this__u8e3s4.h1()) {
    throw NoSuchElementException().m('List is empty.');
  } else {
    tmp = _this__u8e3s4.s3(get_lastIndex(_this__u8e3s4));
  }
  return tmp;
}
function removeAll(_this__u8e3s4, predicate) {
  return filterInPlace(_this__u8e3s4, predicate, true);
}
function addAll(_this__u8e3s4, elements) {
  return _this__u8e3s4.d1(asList(elements));
}
function removeLastOrNull(_this__u8e3s4) {
  return _this__u8e3s4.h1() ? null : _this__u8e3s4.s3(get_lastIndex(_this__u8e3s4));
}
function addAll_0(_this__u8e3s4, elements) {
  if (isInterface(elements, Collection()))
    return _this__u8e3s4.d1(elements);
  else {
    var result = false;
    var _iterator__ex2g4s = elements.x();
    while (_iterator__ex2g4s.y()) {
      var item = _iterator__ex2g4s.z();
      if (_this__u8e3s4.i(item))
        result = true;
    }
    return result;
  }
}
function filterInPlace(_this__u8e3s4, predicate, predicateResultToRemove) {
  var result = false;
  // Inline function 'kotlin.with' call
  var $this$with = _this__u8e3s4.x();
  while ($this$with.y())
    if (predicate($this$with.z()) === predicateResultToRemove) {
      $this$with.z6();
      result = true;
    }
  return result;
}
function retainAll(_this__u8e3s4, elements) {
  return _this__u8e3s4.o3(convertToListIfNotCollection(elements));
}
function convertToListIfNotCollection(_this__u8e3s4) {
  var tmp;
  if (isInterface(_this__u8e3s4, Collection())) {
    tmp = _this__u8e3s4;
  } else {
    tmp = toList(_this__u8e3s4);
  }
  return tmp;
}
function removeAll_0(_this__u8e3s4, predicate) {
  return filterInPlace_0(_this__u8e3s4, predicate, true);
}
function filterInPlace_0(_this__u8e3s4, predicate, predicateResultToRemove) {
  if (!isInterface(_this__u8e3s4, RandomAccess())) {
    return filterInPlace(isInterface(_this__u8e3s4, MutableIterable()) ? _this__u8e3s4 : THROW_CCE(), predicate, predicateResultToRemove);
  }
  var writeIndex = 0;
  var inductionVariable = 0;
  var last = get_lastIndex(_this__u8e3s4);
  if (inductionVariable <= last)
    $l$loop: do {
      var readIndex = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var element = _this__u8e3s4.e1(readIndex);
      if (predicate(element) === predicateResultToRemove)
        continue $l$loop;
      if (!(writeIndex === readIndex)) {
        _this__u8e3s4.q3(writeIndex, element);
      }
      writeIndex = writeIndex + 1 | 0;
    }
     while (!(readIndex === last));
  if (writeIndex < _this__u8e3s4.c1()) {
    var inductionVariable_0 = get_lastIndex(_this__u8e3s4);
    var last_0 = writeIndex;
    if (last_0 <= inductionVariable_0)
      do {
        var removeIndex = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + -1 | 0;
        _this__u8e3s4.s3(removeIndex);
      }
       while (!(removeIndex === last_0));
    return true;
  } else {
    return false;
  }
}
//region block: exports
export {
  addAll as addAll21mdhg523wnoa,
  addAll_0 as addAll1k27qatfgp3k5,
  convertToListIfNotCollection as convertToListIfNotCollection2y7m25iq802o0,
  removeAll as removeAll3cm9rh0qak2y6,
  removeAll_0 as removeAll3o43e67jmwdpc,
  removeFirstOrNull as removeFirstOrNull15yg2tczrh8a7,
  removeLastOrNull as removeLastOrNull3odnlbetbttd4,
  removeLast as removeLast3759euu1xvfa3,
  retainAll as retainAll12dge99qrkea2,
};
//endregion

//# sourceMappingURL=MutableCollections.mjs.map
