import { toLongw1zpgk99d84b as toLong } from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { checkBoundsw7d8y6z7j2xc as checkBounds } from './-Util.mjs';
import { EOFExceptionh831u25jcq9n as EOFException } from './-PlatformJs.mjs';
import { indexOfnhqfh629ytad as indexOf } from './Buffers.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function readByteArray(_this__u8e3s4) {
  return readByteArrayImpl(_this__u8e3s4, -1);
}
function readByteArrayImpl(_this__u8e3s4, size) {
  var arraySize = size;
  if (size === -1) {
    var fetchSize = new (Long())(2147483647, 0);
    while (_this__u8e3s4.s2z().c1().d2(new (Long())(2147483647, 0)) < 0 && _this__u8e3s4.v2z(fetchSize)) {
      // Inline function 'kotlin.Long.times' call
      fetchSize = fetchSize.h4(toLong(2));
    }
    // Inline function 'kotlin.check' call
    if (!(_this__u8e3s4.s2z().c1().d2(new (Long())(2147483647, 0)) < 0)) {
      var message = "Can't create an array of size " + _this__u8e3s4.s2z().c1().toString();
      throw IllegalStateException().o5(toString(message));
    }
    arraySize = _this__u8e3s4.s2z().c1().f2();
  } else {
    _this__u8e3s4.u2z(toLong(size));
  }
  var array = new Int8Array(arraySize);
  readTo(_this__u8e3s4.s2z(), array);
  return array;
}
function readTo(_this__u8e3s4, sink, startIndex, endIndex) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? sink.length : endIndex;
  // Inline function 'kotlinx.io.checkBounds' call
  var size = sink.length;
  checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
  var offset = startIndex;
  while (offset < endIndex) {
    var bytesRead = _this__u8e3s4.r30(sink, offset, endIndex);
    if (bytesRead === -1) {
      throw EOFException().r2z('Source exhausted before reading ' + (endIndex - startIndex | 0) + ' bytes. ' + ('Only ' + bytesRead + ' bytes were read.'));
    }
    offset = offset + bytesRead | 0;
  }
}
function readByteArray_0(_this__u8e3s4, byteCount) {
  // Inline function 'kotlinx.io.checkByteCount' call
  var byteCount_0 = toLong(byteCount);
  // Inline function 'kotlin.require' call
  if (!(byteCount_0.d2(new (Long())(0, 0)) >= 0)) {
    var message = 'byteCount (' + byteCount_0.toString() + ') < 0';
    throw IllegalArgumentException().q(toString(message));
  }
  return readByteArrayImpl(_this__u8e3s4, byteCount);
}
function indexOf_0(_this__u8e3s4, byte, startIndex, endIndex) {
  startIndex = startIndex === VOID ? new (Long())(0, 0) : startIndex;
  endIndex = endIndex === VOID ? new (Long())(-1, 2147483647) : endIndex;
  // Inline function 'kotlin.require' call
  if (!((new (Long())(0, 0)).d2(startIndex) <= 0 ? startIndex.d2(endIndex) <= 0 : false)) {
    var tmp;
    if (endIndex.d2(new (Long())(0, 0)) < 0) {
      tmp = 'startIndex (' + startIndex.toString() + ') and endIndex (' + endIndex.toString() + ') should be non negative';
    } else {
      tmp = 'startIndex (' + startIndex.toString() + ') is not within the range [0..endIndex(' + endIndex.toString() + '))';
    }
    var message = tmp;
    throw IllegalArgumentException().q(toString(message));
  }
  if (startIndex.equals(endIndex))
    return new (Long())(-1, -1);
  var offset = startIndex;
  $l$loop: while (true) {
    var tmp_0;
    if (offset.d2(endIndex) < 0) {
      // Inline function 'kotlin.Long.plus' call
      var tmp$ret$2 = offset.f4(toLong(1));
      tmp_0 = _this__u8e3s4.v2z(tmp$ret$2);
    } else {
      tmp_0 = false;
    }
    if (!tmp_0) {
      break $l$loop;
    }
    var tmp_1 = _this__u8e3s4.s2z();
    var tmp_2 = offset;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = _this__u8e3s4.s2z().c1();
    var tmp$ret$3 = endIndex.d2(b) <= 0 ? endIndex : b;
    var idx = indexOf(tmp_1, byte, tmp_2, tmp$ret$3);
    if (!idx.equals(new (Long())(-1, -1))) {
      return idx;
    }
    offset = _this__u8e3s4.s2z().c1();
  }
  return new (Long())(-1, -1);
}
//region block: exports
export {
  indexOf_0 as indexOf29nspdgx2e3ap,
  readByteArray_0 as readByteArray1fhzfwi2j014k,
  readByteArray as readByteArray1ri21h2rciakw,
};
//endregion

//# sourceMappingURL=Sources.mjs.map
