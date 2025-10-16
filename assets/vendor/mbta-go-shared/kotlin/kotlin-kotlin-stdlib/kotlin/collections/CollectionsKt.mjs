import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { asList2ho2pewtsfvv as asList } from './_ArraysJs.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../js/rangeTo.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from './ArrayListJs.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { compareValues1n2ayl87ihzfk as compareValues } from '../comparisons/Comparisons.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import {
  KtList3hktaavzmj137 as KtList,
  asJsReadonlyArrayView237cu3jwn119s as asJsReadonlyArrayView,
  Collection1k04j3hzsbod0 as Collection,
} from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import {
  IndexOutOfBoundsException1qfr429iumro0 as IndexOutOfBoundsException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  ArithmeticException18dajwq7kbp38 as ArithmeticException,
} from '../exceptions.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../js/coreRuntime.mjs';
import { RandomAccess1jbw8sdogqb8x as RandomAccess } from './RandomAccess.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { listOfvhqybd2zx248 as listOf } from './collectionJs.mjs';
import { contains1tccixv8iwdcq as contains } from './_Arrays.mjs';
import { arrayIterator3lgwvgteckzhv as arrayIterator } from '../js/arrays.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function collectionToArrayCommonImpl(collection) {
  if (collection.h1()) {
    // Inline function 'kotlin.emptyArray' call
    return [];
  }
  // Inline function 'kotlin.arrayOfNulls' call
  var size = collection.c1();
  var destination = Array(size);
  var iterator = collection.x();
  var index = 0;
  while (iterator.y()) {
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    destination[_unary__edvuaz] = iterator.z();
  }
  return destination;
}
function emptyList() {
  return EmptyList_getInstance();
}
function listOf_0(elements) {
  return elements.length > 0 ? asList(elements) : emptyList();
}
function get_lastIndex(_this__u8e3s4) {
  return _this__u8e3s4.c1() - 1 | 0;
}
function get_indices(_this__u8e3s4) {
  return numberRangeToNumber(0, _this__u8e3s4.c1() - 1 | 0);
}
function mutableListOf(elements) {
  var tmp;
  if (elements.length === 0) {
    tmp = ArrayList().g1();
  } else {
    // Inline function 'kotlin.collections.asArrayList' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = ArrayList().j5(elements);
  }
  return tmp;
}
function arrayListOf(elements) {
  var tmp;
  if (elements.length === 0) {
    tmp = ArrayList().g1();
  } else {
    // Inline function 'kotlin.collections.asArrayList' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = ArrayList().j5(elements);
  }
  return tmp;
}
function binarySearch(_this__u8e3s4, element, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? _this__u8e3s4.c1() : toIndex;
  rangeCheck(_this__u8e3s4.c1(), fromIndex, toIndex);
  var low = fromIndex;
  var high = toIndex - 1 | 0;
  while (low <= high) {
    var mid = (low + high | 0) >>> 1 | 0;
    var midVal = _this__u8e3s4.e1(mid);
    var cmp = compareValues(midVal, element);
    if (cmp < 0)
      low = mid + 1 | 0;
    else if (cmp > 0)
      high = mid - 1 | 0;
    else
      return mid;
  }
  return -(low + 1 | 0) | 0;
}
var EmptyListClass;
function EmptyList() {
  if (EmptyListClass === VOID) {
    class $ {
      constructor() {
        EmptyList_instance = this;
        this.sn_1 = new (Long())(-1478467534, -1720727600);
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, KtList()) : false) {
          tmp = other.h1();
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return 1;
      }
      toString() {
        return '[]';
      }
      c1() {
        return 0;
      }
      h1() {
        return true;
      }
      tn(element) {
        return false;
      }
      j1(element) {
        if (!false)
          return false;
        var tmp;
        if (false) {
          tmp = element;
        } else {
          tmp = THROW_CCE();
        }
        return this.tn(tmp);
      }
      un(elements) {
        return elements.h1();
      }
      d3(elements) {
        return this.un(elements);
      }
      e1(index) {
        throw IndexOutOfBoundsException().jg("Empty list doesn't contain element at index " + index + '.');
      }
      vn(element) {
        return -1;
      }
      l1(element) {
        if (!false)
          return -1;
        var tmp;
        if (false) {
          tmp = element;
        } else {
          tmp = THROW_CCE();
        }
        return this.vn(tmp);
      }
      wn(element) {
        return -1;
      }
      e3(element) {
        if (!false)
          return -1;
        var tmp;
        if (false) {
          tmp = element;
        } else {
          tmp = THROW_CCE();
        }
        return this.wn(tmp);
      }
      x() {
        return EmptyIterator_instance;
      }
      f3() {
        return EmptyIterator_instance;
      }
      k1(index) {
        if (!(index === 0))
          throw IndexOutOfBoundsException().jg('Index: ' + index);
        return EmptyIterator_instance;
      }
      g3(fromIndex, toIndex) {
        if (fromIndex === 0 && toIndex === 0)
          return this;
        throw IndexOutOfBoundsException().jg('fromIndex: ' + fromIndex + ', toIndex: ' + toIndex);
      }
    }
    protoOf($).asJsReadonlyArrayView = asJsReadonlyArrayView;
    initMetadataForObject($, 'EmptyList', VOID, VOID, [KtList(), RandomAccess()]);
    EmptyListClass = $;
  }
  return EmptyListClass;
}
var EmptyList_instance;
function EmptyList_getInstance() {
  if (EmptyList_instance === VOID)
    new (EmptyList())();
  return EmptyList_instance;
}
function rangeCheck(size, fromIndex, toIndex) {
  if (fromIndex > toIndex)
    throw IllegalArgumentException().q('fromIndex (' + fromIndex + ') is greater than toIndex (' + toIndex + ').');
  else if (fromIndex < 0)
    throw IndexOutOfBoundsException().jg('fromIndex (' + fromIndex + ') is less than zero.');
  else if (toIndex > size)
    throw IndexOutOfBoundsException().jg('toIndex (' + toIndex + ') is greater than size (' + size + ').');
}
var EmptyIteratorClass;
function EmptyIterator() {
  if (EmptyIteratorClass === VOID) {
    class $ {
      y() {
        return false;
      }
      j7() {
        return false;
      }
      k7() {
        return 0;
      }
      m7() {
        return -1;
      }
      z() {
        throw NoSuchElementException().m1();
      }
      l7() {
        throw NoSuchElementException().m1();
      }
    }
    initMetadataForObject($, 'EmptyIterator');
    EmptyIteratorClass = $;
  }
  return EmptyIteratorClass;
}
var EmptyIterator_instance;
function EmptyIterator_getInstance() {
  return EmptyIterator_instance;
}
function optimizeReadOnlyList(_this__u8e3s4) {
  switch (_this__u8e3s4.c1()) {
    case 0:
      return emptyList();
    case 1:
      return listOf(_this__u8e3s4.e1(0));
    default:
      return _this__u8e3s4;
  }
}
function throwIndexOverflow() {
  throw ArithmeticException().og('Index overflow has happened.');
}
function throwCountOverflow() {
  throw ArithmeticException().og('Count overflow has happened.');
}
function asCollection(_this__u8e3s4, isVarargs) {
  isVarargs = isVarargs === VOID ? false : isVarargs;
  return new (ArrayAsCollection())(_this__u8e3s4, isVarargs);
}
var ArrayAsCollectionClass;
function ArrayAsCollection() {
  if (ArrayAsCollectionClass === VOID) {
    class $ {
      constructor(values, isVarargs) {
        this.xn_1 = values;
        this.yn_1 = isVarargs;
      }
      c1() {
        return this.xn_1.length;
      }
      h1() {
        // Inline function 'kotlin.collections.isEmpty' call
        return this.xn_1.length === 0;
      }
      zn(element) {
        return contains(this.xn_1, element);
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.zn((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      ao(elements) {
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.all' call
          var tmp;
          if (isInterface(elements, Collection())) {
            tmp = elements.h1();
          } else {
            tmp = false;
          }
          if (tmp) {
            tmp$ret$0 = true;
            break $l$block_0;
          }
          var _iterator__ex2g4s = elements.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (!this.zn(element)) {
              tmp$ret$0 = false;
              break $l$block_0;
            }
          }
          tmp$ret$0 = true;
        }
        return tmp$ret$0;
      }
      d3(elements) {
        return this.ao(elements);
      }
      x() {
        return arrayIterator(this.xn_1);
      }
    }
    initMetadataForClass($, 'ArrayAsCollection', VOID, VOID, [Collection()]);
    ArrayAsCollectionClass = $;
  }
  return ArrayAsCollectionClass;
}
//region block: init
EmptyIterator_instance = new (EmptyIterator())();
//endregion
//region block: exports
export {
  EmptyIterator_instance as EmptyIterator_instance23xvvm1c2fncv,
  EmptyList_getInstance as EmptyList_getInstance2itxsgbwg3ef6,
  arrayListOf as arrayListOf1fz8nib0ncbow,
  asCollection as asCollection2jt8ak1h50iom,
  binarySearch as binarySearch1nmlzx9onl5pm,
  collectionToArrayCommonImpl as collectionToArrayCommonImplq0mfhcp9jn08,
  emptyList as emptyList1g2z5xcrvp2zy,
  get_indices as get_indices3txodfl5wuu5j,
  get_lastIndex as get_lastIndex1yw0x4k50k51w,
  listOf_0 as listOf1jh22dvmctj1r,
  mutableListOf as mutableListOf6oorvk2mtdmp,
  optimizeReadOnlyList as optimizeReadOnlyList2kolyxeo5m6k3,
  throwCountOverflow as throwCountOverflow18of2v929seka,
  throwIndexOverflow as throwIndexOverflow28kwzhaoae5ib,
};
//endregion

//# sourceMappingURL=CollectionsKt.mjs.map
