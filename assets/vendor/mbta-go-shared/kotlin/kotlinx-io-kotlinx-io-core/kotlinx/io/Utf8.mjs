import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  UnsafeBufferOperations_instance3evgtpck8fkab as UnsafeBufferOperations_instance,
  get_SegmentReadContextImpl28xxxurlbcmul as get_SegmentReadContextImpl,
  get_SegmentWriteContextImpl3givuabmefymf as get_SegmentWriteContextImpl,
} from './unsafe/UnsafeBufferOperations.mjs';
import { commonToUtf8String1v18whmp1g8m7 as commonToUtf8String } from './internal/-Utf8.mjs';
import {
  toLongw1zpgk99d84b as toLong,
  toByte4i43936u611k as toByte,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { readByteArray1fhzfwi2j014k as readByteArray } from './Sources.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { checkBoundsw7d8y6z7j2xc as checkBounds } from './-Util.mjs';
import { charCodeAt1yspne1d8erbm as charCodeAt } from '../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
} from '../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { isEmpty39cntv762vey6 as isEmpty } from './Segment.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function readString(_this__u8e3s4) {
  _this__u8e3s4.v2z(new (Long())(-1, 2147483647));
  return commonReadUtf8(_this__u8e3s4.s2z(), _this__u8e3s4.s2z().c1());
}
function readString_0(_this__u8e3s4, byteCount) {
  _this__u8e3s4.u2z(byteCount);
  return commonReadUtf8(_this__u8e3s4.s2z(), byteCount);
}
function readString_1(_this__u8e3s4) {
  return commonReadUtf8(_this__u8e3s4, _this__u8e3s4.c1());
}
function commonReadUtf8(_this__u8e3s4, byteCount) {
  if (byteCount.equals(new (Long())(0, 0)))
    return '';
  // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.forEachSegment' call
  var curr = _this__u8e3s4.l2z_1;
  while (!(curr == null)) {
    get_SegmentReadContextImpl();
    if (toLong(curr.c1()).d2(byteCount) >= 0) {
      var result = '';
      // Inline function 'kotlinx.io.unsafe.withData' call
      var tmp0 = curr.j32(true);
      var tmp2 = curr.y2z_1;
      var tmp0_0 = curr.z2z_1;
      // Inline function 'kotlin.math.min' call
      var b = tmp2 + byteCount.f2() | 0;
      var tmp$ret$0 = Math.min(tmp0_0, b);
      result = commonToUtf8String(tmp0, tmp2, tmp$ret$0);
      _this__u8e3s4.q30(byteCount);
      return result;
    }
    return commonToUtf8String(readByteArray(_this__u8e3s4, byteCount.f2()));
  }
  // Inline function 'kotlin.error' call
  var message = 'Unreacheable';
  throw IllegalStateException().o5(toString(message));
}
function writeString(_this__u8e3s4, string, startIndex, endIndex) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? string.length : endIndex;
  // Inline function 'kotlinx.io.checkBounds' call
  var size = string.length;
  checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
  // Inline function 'kotlinx.io.writeToInternalBuffer' call
  // Inline function 'kotlinx.io.commonWriteUtf8' call
  var this_0 = _this__u8e3s4.s2z();
  var i = startIndex;
  while (i < endIndex) {
    var p0 = i;
    // Inline function 'kotlin.code' call
    var this_1 = charCodeAt(string, p0);
    var c = Char__toInt_impl_vasixd(this_1);
    if (c < 128) {
      $l$block_0: {
        // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
        var tail = this_0.y30(1);
        var ctx = get_SegmentWriteContextImpl();
        var segmentOffset = -i | 0;
        // Inline function 'kotlin.comparisons.minOf' call
        var b = i + tail.d31() | 0;
        var runLimit = Math.min(endIndex, b);
        var _unary__edvuaz = i;
        i = _unary__edvuaz + 1 | 0;
        ctx.r32(tail, segmentOffset + _unary__edvuaz | 0, toByte(c));
        $l$loop: while (i < runLimit) {
          var p0_0 = i;
          // Inline function 'kotlin.code' call
          var this_2 = charCodeAt(string, p0_0);
          c = Char__toInt_impl_vasixd(this_2);
          if (c >= 128)
            break $l$loop;
          var _unary__edvuaz_0 = i;
          i = _unary__edvuaz_0 + 1 | 0;
          ctx.r32(tail, segmentOffset + _unary__edvuaz_0 | 0, toByte(c));
        }
        var bytesWritten = i + segmentOffset | 0;
        if (bytesWritten === 1) {
          tail.z2z_1 = tail.z2z_1 + bytesWritten | 0;
          var tmp = this_0;
          // Inline function 'kotlin.Long.plus' call
          tmp.n2z_1 = this_0.n2z_1.f4(toLong(bytesWritten));
          break $l$block_0;
        }
        // Inline function 'kotlin.check' call
        if (!(0 <= bytesWritten ? bytesWritten <= tail.d31() : false)) {
          var message = 'Invalid number of bytes written: ' + bytesWritten + '. Should be in 0..' + tail.d31();
          throw IllegalStateException().o5(toString(message));
        }
        if (!(bytesWritten === 0)) {
          tail.z2z_1 = tail.z2z_1 + bytesWritten | 0;
          var tmp_0 = this_0;
          // Inline function 'kotlin.Long.plus' call
          tmp_0.n2z_1 = this_0.n2z_1.f4(toLong(bytesWritten));
          break $l$block_0;
        }
        if (isEmpty(tail)) {
          this_0.r31();
        }
      }
    } else if (c < 2048) {
      $l$block_2: {
        // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
        var tail_0 = this_0.y30(2);
        get_SegmentWriteContextImpl().q32(tail_0, 0, toByte(c >> 6 | 192), toByte(c & 63 | 128));
        var bytesWritten_0 = 2;
        if (bytesWritten_0 === 2) {
          tail_0.z2z_1 = tail_0.z2z_1 + bytesWritten_0 | 0;
          var tmp_1 = this_0;
          // Inline function 'kotlin.Long.plus' call
          tmp_1.n2z_1 = this_0.n2z_1.f4(toLong(bytesWritten_0));
          break $l$block_2;
        }
        // Inline function 'kotlin.check' call
        if (!(0 <= bytesWritten_0 ? bytesWritten_0 <= tail_0.d31() : false)) {
          var message_0 = 'Invalid number of bytes written: ' + bytesWritten_0 + '. Should be in 0..' + tail_0.d31();
          throw IllegalStateException().o5(toString(message_0));
        }
        if (!(bytesWritten_0 === 0)) {
          tail_0.z2z_1 = tail_0.z2z_1 + bytesWritten_0 | 0;
          var tmp_2 = this_0;
          // Inline function 'kotlin.Long.plus' call
          tmp_2.n2z_1 = this_0.n2z_1.f4(toLong(bytesWritten_0));
          break $l$block_2;
        }
        if (isEmpty(tail_0)) {
          this_0.r31();
        }
      }
      i = i + 1 | 0;
    } else if (c < 55296 || c > 57343) {
      $l$block_4: {
        // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
        var tail_1 = this_0.y30(3);
        get_SegmentWriteContextImpl().p32(tail_1, 0, toByte(c >> 12 | 224), toByte(c >> 6 & 63 | 128), toByte(c & 63 | 128));
        var bytesWritten_1 = 3;
        if (bytesWritten_1 === 3) {
          tail_1.z2z_1 = tail_1.z2z_1 + bytesWritten_1 | 0;
          var tmp_3 = this_0;
          // Inline function 'kotlin.Long.plus' call
          tmp_3.n2z_1 = this_0.n2z_1.f4(toLong(bytesWritten_1));
          break $l$block_4;
        }
        // Inline function 'kotlin.check' call
        if (!(0 <= bytesWritten_1 ? bytesWritten_1 <= tail_1.d31() : false)) {
          var message_1 = 'Invalid number of bytes written: ' + bytesWritten_1 + '. Should be in 0..' + tail_1.d31();
          throw IllegalStateException().o5(toString(message_1));
        }
        if (!(bytesWritten_1 === 0)) {
          tail_1.z2z_1 = tail_1.z2z_1 + bytesWritten_1 | 0;
          var tmp_4 = this_0;
          // Inline function 'kotlin.Long.plus' call
          tmp_4.n2z_1 = this_0.n2z_1.f4(toLong(bytesWritten_1));
          break $l$block_4;
        }
        if (isEmpty(tail_1)) {
          this_0.r31();
        }
      }
      i = i + 1 | 0;
    } else {
      var tmp_5;
      if ((i + 1 | 0) < endIndex) {
        var p0_1 = i + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_3 = charCodeAt(string, p0_1);
        tmp_5 = Char__toInt_impl_vasixd(this_3);
      } else {
        tmp_5 = 0;
      }
      var low = tmp_5;
      if (c > 56319 || !(56320 <= low ? low <= 57343 : false)) {
        // Inline function 'kotlin.code' call
        var this_4 = _Char___init__impl__6a9atx(63);
        var tmp$ret$26 = Char__toInt_impl_vasixd(this_4);
        this_0.l31(toByte(tmp$ret$26));
        i = i + 1 | 0;
      } else {
        var codePoint = 65536 + ((c & 1023) << 10 | low & 1023) | 0;
        $l$block_6: {
          // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
          var tail_2 = this_0.y30(4);
          get_SegmentWriteContextImpl().o32(tail_2, 0, toByte(codePoint >> 18 | 240), toByte(codePoint >> 12 & 63 | 128), toByte(codePoint >> 6 & 63 | 128), toByte(codePoint & 63 | 128));
          var bytesWritten_2 = 4;
          if (bytesWritten_2 === 4) {
            tail_2.z2z_1 = tail_2.z2z_1 + bytesWritten_2 | 0;
            var tmp_6 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_6.n2z_1 = this_0.n2z_1.f4(toLong(bytesWritten_2));
            break $l$block_6;
          }
          // Inline function 'kotlin.check' call
          if (!(0 <= bytesWritten_2 ? bytesWritten_2 <= tail_2.d31() : false)) {
            var message_2 = 'Invalid number of bytes written: ' + bytesWritten_2 + '. Should be in 0..' + tail_2.d31();
            throw IllegalStateException().o5(toString(message_2));
          }
          if (!(bytesWritten_2 === 0)) {
            tail_2.z2z_1 = tail_2.z2z_1 + bytesWritten_2 | 0;
            var tmp_7 = this_0;
            // Inline function 'kotlin.Long.plus' call
            tmp_7.n2z_1 = this_0.n2z_1.f4(toLong(bytesWritten_2));
            break $l$block_6;
          }
          if (isEmpty(tail_2)) {
            this_0.r31();
          }
        }
        i = i + 2 | 0;
      }
    }
  }
  _this__u8e3s4.i30();
}
//region block: exports
export {
  readString as readString2nvggcfaijfhd,
  readString_0 as readString3v6duspiz33tv,
  readString_1 as readStringo8i62qxt5m4m,
  writeString as writeString33ca4btrgctw7,
};
//endregion

//# sourceMappingURL=Utf8.mjs.map
