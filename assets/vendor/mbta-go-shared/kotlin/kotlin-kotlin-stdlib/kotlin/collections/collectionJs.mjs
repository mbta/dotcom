import {
  collectionToArrayCommonImplq0mfhcp9jn08 as collectionToArrayCommonImpl,
  throwIndexOverflow28kwzhaoae5ib as throwIndexOverflow,
  throwCountOverflow18of2v929seka as throwCountOverflow,
} from './CollectionsKt.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from './ArrayListJs.mjs';
import { hashSetOf1p9d9akkobppk as hashSetOf } from './Sets.mjs';
import { hashMapOf2phwdlwszpif7 as hashMapOf } from './Maps.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { naturalOrder3459ca049ngp6 as naturalOrder } from '../comparisons/Comparisons.mjs';
import { sortArrayWith2peqe6a4xxbw8 as sortArrayWith } from './ArraySorting.mjs';
import { Companion_instanceovl8he3jiijf as Companion_instance } from './AbstractList.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
//region block: imports
var isView = ArrayBuffer.isView;
//endregion
//region block: pre-declaration
//endregion
function collectionToArray(collection) {
  return collectionToArrayCommonImpl(collection);
}
function terminateCollectionToArray(collectionSize, array) {
  return array;
}
function arrayOfNulls(reference, size) {
  // Inline function 'kotlin.arrayOfNulls' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return Array(size);
}
function listOf(element) {
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [element];
  return ArrayList().j5(tmp$ret$2);
}
function setOf(element) {
  return hashSetOf([element]);
}
function sortWith(_this__u8e3s4, comparator) {
  collectionsSort(_this__u8e3s4, comparator);
}
function mapOf(pair) {
  return hashMapOf([pair]);
}
function mapCapacity(expectedSize) {
  return expectedSize;
}
function checkIndexOverflow(index) {
  if (index < 0) {
    throwIndexOverflow();
  }
  return index;
}
function checkCountOverflow(count) {
  if (count < 0) {
    throwCountOverflow();
  }
  return count;
}
function sort(_this__u8e3s4) {
  collectionsSort(_this__u8e3s4, naturalOrder());
}
function copyToArray(collection) {
  var tmp;
  // Inline function 'kotlin.js.asDynamic' call
  if (collection.toArray !== undefined) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    tmp = collection.toArray();
  } else {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = collectionToArray(collection);
  }
  return tmp;
}
function collectionsSort(list, comparator) {
  if (list.c1() <= 1)
    return Unit_instance;
  var array = copyToArray(list);
  sortArrayWith(array, comparator);
  var inductionVariable = 0;
  var last = array.length;
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      list.q3(i, array[i]);
    }
     while (inductionVariable < last);
}
function arrayCopy(source, destination, destinationOffset, startIndex, endIndex) {
  Companion_instance.q6(startIndex, endIndex, source.length);
  var rangeSize = endIndex - startIndex | 0;
  Companion_instance.q6(destinationOffset, destinationOffset + rangeSize | 0, destination.length);
  if (isView(destination) && isView(source)) {
    // Inline function 'kotlin.js.asDynamic' call
    var subrange = source.subarray(startIndex, endIndex);
    // Inline function 'kotlin.js.asDynamic' call
    destination.set(subrange, destinationOffset);
  } else {
    if (!(source === destination) || destinationOffset <= startIndex) {
      var inductionVariable = 0;
      if (inductionVariable < rangeSize)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          destination[destinationOffset + index | 0] = source[startIndex + index | 0];
        }
         while (inductionVariable < rangeSize);
    } else {
      var inductionVariable_0 = rangeSize - 1 | 0;
      if (0 <= inductionVariable_0)
        do {
          var index_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + -1 | 0;
          destination[destinationOffset + index_0 | 0] = source[startIndex + index_0 | 0];
        }
         while (0 <= inductionVariable_0);
    }
  }
}
function checkBuilderCapacity(capacity) {
  // Inline function 'kotlin.require' call
  if (!(capacity >= 0)) {
    var message = 'capacity must be non-negative.';
    throw IllegalArgumentException().q(toString(message));
  }
}
//region block: exports
export {
  arrayCopy as arrayCopytctsywo3h7gj,
  arrayOfNulls as arrayOfNulls3cqbl98qmfq5b,
  checkBuilderCapacity as checkBuilderCapacity1h6g02949wvv,
  checkCountOverflow as checkCountOverflow1ro2fe1r4xvgf,
  checkIndexOverflow as checkIndexOverflow3frtmheghr0th,
  collectionToArray as collectionToArray1y0om6a7tdy9a,
  copyToArray as copyToArray2j022khrow2yi,
  listOf as listOfvhqybd2zx248,
  mapCapacity as mapCapacity1h45rc3eh9p2l,
  mapOf as mapOf2zpbbmyqk8xpf,
  setOf as setOf1u3mizs95ngxo,
  sortWith as sortWith4fnm6b3vw03s,
  sort as sort15ai02l4kxbfa,
  terminateCollectionToArray as terminateCollectionToArray12671uhv05xea,
};
//endregion

//# sourceMappingURL=collectionJs.mjs.map
