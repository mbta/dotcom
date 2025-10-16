import { EOFExceptionh831u25jcq9n as EOFException } from './-PlatformJs.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IndexOutOfBoundsException1qfr429iumro0 as IndexOutOfBoundsException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  toShort36kaw0zjdq3ex as toShort,
  toLongw1zpgk99d84b as toLong,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import {
  checkBoundsw7d8y6z7j2xc as checkBounds,
  checkOffsetAndCountazlu23xkuwoi as checkOffsetAndCount,
  get_HEX_DIGIT_CHARS28oau3fmf5vf6 as get_HEX_DIGIT_CHARS,
} from './-Util.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { isEmpty39cntv762vey6 as isEmpty } from './Segment.mjs';
import { PeekSource3frbthc9yehpr as PeekSource } from './PeekSource.mjs';
import { buffered3kq86cdmguv3h as buffered } from './Core.mjs';
import { SegmentPool_instance2tnq68w4zk3rz as SegmentPool_instance } from './SegmentPool.mjs';
import {
  write$default3ial01y23he0s as write$default,
  Sink189iybvk4puo6 as Sink,
} from './Sink.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import {
  UnsafeBufferOperations_instance3evgtpck8fkab as UnsafeBufferOperations_instance,
  get_SegmentReadContextImpl28xxxurlbcmul as get_SegmentReadContextImpl,
} from './unsafe/UnsafeBufferOperations.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Source1shr0ps16u4p4 as Source } from './Source.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function throwEof($this, byteCount) {
  throw EOFException().r2z("Buffer doesn't contain required number of bytes (size: " + $this.c1().toString() + ', required: ' + byteCount.toString() + ')');
}
var BufferClass;
function Buffer() {
  if (BufferClass === VOID) {
    class $ {
      constructor() {
        this.l2z_1 = null;
        this.m2z_1 = null;
        this.n2z_1 = new (Long())(0, 0);
      }
      c1() {
        return this.n2z_1;
      }
      s2z() {
        return this;
      }
      t2z() {
        return this.c1().equals(new (Long())(0, 0));
      }
      u2z(byteCount) {
        // Inline function 'kotlin.require' call
        if (!(byteCount.d2(new (Long())(0, 0)) >= 0)) {
          var message = 'byteCount: ' + byteCount.toString();
          throw IllegalArgumentException().q(toString(message));
        }
        if (this.c1().d2(byteCount) < 0) {
          throw EOFException().r2z("Buffer doesn't contain required number of bytes (size: " + this.c1().toString() + ', required: ' + byteCount.toString() + ')');
        }
      }
      v2z(byteCount) {
        // Inline function 'kotlin.require' call
        if (!(byteCount.d2(new (Long())(0, 0)) >= 0)) {
          var message = 'byteCount: ' + byteCount.toString() + ' < 0';
          throw IllegalArgumentException().q(toString(message));
        }
        return this.c1().d2(byteCount) >= 0;
      }
      w2z() {
        var tmp0_elvis_lhs = this.l2z_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          throwEof(this, new (Long())(1, 0));
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var segment = tmp;
        var segmentSize = segment.c1();
        if (segmentSize === 0) {
          this.e30();
          return this.w2z();
        }
        var v = segment.f30();
        this.n2z_1 = this.n2z_1.g4(new (Long())(1, 0));
        if (segmentSize === 1) {
          this.e30();
        }
        return v;
      }
      g30() {
        var tmp0_elvis_lhs = this.l2z_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          throwEof(this, new (Long())(2, 0));
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var segment = tmp;
        var segmentSize = segment.c1();
        if (segmentSize < 2) {
          this.u2z(new (Long())(2, 0));
          if (segmentSize === 0) {
            this.e30();
            return this.g30();
          }
          // Inline function 'kotlinx.io.and' call
          var tmp_0 = (this.w2z() & 255) << 8;
          // Inline function 'kotlinx.io.and' call
          var tmp$ret$1 = this.w2z() & 255;
          return toShort(tmp_0 | tmp$ret$1);
        }
        var v = segment.h30();
        this.n2z_1 = this.n2z_1.g4(new (Long())(2, 0));
        if (segmentSize === 2) {
          this.e30();
        }
        return v;
      }
      i30() {
        return Unit_instance;
      }
      j30(out, startIndex, endIndex) {
        checkBounds(this.c1(), startIndex, endIndex);
        if (startIndex.equals(endIndex))
          return Unit_instance;
        var currentOffset = startIndex;
        var remainingByteCount = endIndex.g4(startIndex);
        out.n2z_1 = out.n2z_1.f4(remainingByteCount);
        var s = this.l2z_1;
        while (currentOffset.d2(toLong(ensureNotNull(s).z2z_1 - s.y2z_1 | 0)) >= 0) {
          currentOffset = currentOffset.g4(toLong(s.z2z_1 - s.y2z_1 | 0));
          s = s.c30_1;
        }
        while (remainingByteCount.d2(new (Long())(0, 0)) > 0) {
          var copy = ensureNotNull(s).k30();
          copy.y2z_1 = copy.y2z_1 + currentOffset.f2() | 0;
          var tmp = copy;
          var tmp0 = copy.y2z_1 + remainingByteCount.f2() | 0;
          // Inline function 'kotlin.comparisons.minOf' call
          var b = copy.z2z_1;
          tmp.z2z_1 = Math.min(tmp0, b);
          // Inline function 'kotlinx.io.Buffer.pushSegment' call
          if (out.l2z_1 == null) {
            out.l2z_1 = copy;
            out.m2z_1 = copy;
          } else if (false) {
            out.m2z_1 = ensureNotNull(out.m2z_1).l30(copy).m30();
            if (ensureNotNull(out.m2z_1).d30_1 == null) {
              out.l2z_1 = out.m2z_1;
            }
          } else {
            out.m2z_1 = ensureNotNull(out.m2z_1).l30(copy);
          }
          remainingByteCount = remainingByteCount.g4(toLong(copy.z2z_1 - copy.y2z_1 | 0));
          currentOffset = new (Long())(0, 0);
          s = s.c30_1;
        }
      }
      n30() {
        var result = this.c1();
        if (result.equals(new (Long())(0, 0)))
          return new (Long())(0, 0);
        var tail = ensureNotNull(this.m2z_1);
        if (tail.z2z_1 < 8192 && tail.b30_1) {
          result = result.g4(toLong(tail.z2z_1 - tail.y2z_1 | 0));
        }
        return result;
      }
      o30(position) {
        if (position.d2(new (Long())(0, 0)) < 0 || position.d2(this.c1()) >= 0) {
          throw IndexOutOfBoundsException().jg('position (' + position.toString() + ') is not within the range [0..size(' + this.c1().toString() + '))');
        }
        if (position.equals(new (Long())(0, 0))) {
          return ensureNotNull(this.l2z_1).p30(0);
        }
        // Inline function 'kotlinx.io.seek' call
        if (this.l2z_1 == null) {
          var offset = new (Long())(-1, -1);
          return ensureNotNull(null).p30(position.g4(offset).f2());
        }
        if (this.c1().g4(position).d2(position) < 0) {
          var s = this.m2z_1;
          var offset_0 = this.c1();
          $l$loop: while (!(s == null) && offset_0.d2(position) > 0) {
            offset_0 = offset_0.g4(toLong(s.z2z_1 - s.y2z_1 | 0));
            if (offset_0.d2(position) <= 0)
              break $l$loop;
            s = s.d30_1;
          }
          var tmp0 = s;
          var offset_1 = offset_0;
          return ensureNotNull(tmp0).p30(position.g4(offset_1).f2());
        } else {
          var s_0 = this.l2z_1;
          var offset_2 = new (Long())(0, 0);
          $l$loop_0: while (!(s_0 == null)) {
            var tmp0_0 = offset_2;
            // Inline function 'kotlin.Long.plus' call
            var other = s_0.z2z_1 - s_0.y2z_1 | 0;
            var nextOffset = tmp0_0.f4(toLong(other));
            if (nextOffset.d2(position) > 0)
              break $l$loop_0;
            s_0 = s_0.c30_1;
            offset_2 = nextOffset;
          }
          var tmp0_1 = s_0;
          var offset_3 = offset_2;
          return ensureNotNull(tmp0_1).p30(position.g4(offset_3).f2());
        }
      }
      p3() {
        return this.q30(this.c1());
      }
      q30(byteCount) {
        // Inline function 'kotlinx.io.checkByteCount' call
        // Inline function 'kotlin.require' call
        if (!(byteCount.d2(new (Long())(0, 0)) >= 0)) {
          var message = 'byteCount (' + byteCount.toString() + ') < 0';
          throw IllegalArgumentException().q(toString(message));
        }
        var remainingByteCount = byteCount;
        while (remainingByteCount.d2(new (Long())(0, 0)) > 0) {
          var tmp0_elvis_lhs = this.l2z_1;
          var tmp;
          if (tmp0_elvis_lhs == null) {
            throw EOFException().r2z('Buffer exhausted before skipping ' + byteCount.toString() + ' bytes.');
          } else {
            tmp = tmp0_elvis_lhs;
          }
          var head = tmp;
          var tmp0 = remainingByteCount;
          // Inline function 'kotlinx.io.minOf' call
          var b = head.z2z_1 - head.y2z_1 | 0;
          // Inline function 'kotlin.comparisons.minOf' call
          var b_0 = toLong(b);
          var toSkip = (tmp0.d2(b_0) <= 0 ? tmp0 : b_0).f2();
          this.n2z_1 = this.n2z_1.g4(toLong(toSkip));
          remainingByteCount = remainingByteCount.g4(toLong(toSkip));
          head.y2z_1 = head.y2z_1 + toSkip | 0;
          if (head.y2z_1 === head.z2z_1) {
            this.e30();
          }
        }
      }
      r30(sink, startIndex, endIndex) {
        // Inline function 'kotlinx.io.checkBounds' call
        var size = sink.length;
        checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
        var tmp0_elvis_lhs = this.l2z_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return -1;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var s = tmp;
        var tmp0 = endIndex - startIndex | 0;
        // Inline function 'kotlin.comparisons.minOf' call
        var b = s.c1();
        var toCopy = Math.min(tmp0, b);
        s.s30(sink, startIndex, startIndex + toCopy | 0);
        this.n2z_1 = this.n2z_1.g4(toLong(toCopy));
        if (isEmpty(s)) {
          this.e30();
        }
        return toCopy;
      }
      t30(sink, byteCount) {
        // Inline function 'kotlinx.io.checkByteCount' call
        // Inline function 'kotlin.require' call
        if (!(byteCount.d2(new (Long())(0, 0)) >= 0)) {
          var message = 'byteCount (' + byteCount.toString() + ') < 0';
          throw IllegalArgumentException().q(toString(message));
        }
        if (this.c1().equals(new (Long())(0, 0)))
          return new (Long())(-1, -1);
        var bytesWritten = byteCount.d2(this.c1()) > 0 ? this.c1() : byteCount;
        sink.u30(this, bytesWritten);
        return bytesWritten;
      }
      v30(sink, byteCount) {
        // Inline function 'kotlinx.io.checkByteCount' call
        // Inline function 'kotlin.require' call
        if (!(byteCount.d2(new (Long())(0, 0)) >= 0)) {
          var message = 'byteCount (' + byteCount.toString() + ') < 0';
          throw IllegalArgumentException().q(toString(message));
        }
        if (this.c1().d2(byteCount) < 0) {
          sink.u30(this, this.c1());
          throw EOFException().r2z('Buffer exhausted before writing ' + byteCount.toString() + ' bytes. Only ' + this.c1().toString() + ' bytes were written.');
        }
        sink.u30(this, byteCount);
      }
      w30(sink) {
        var byteCount = this.c1();
        if (byteCount.d2(new (Long())(0, 0)) > 0) {
          sink.u30(this, byteCount);
        }
        return byteCount;
      }
      x30() {
        return buffered(new (PeekSource())(this));
      }
      y30(minimumCapacity) {
        // Inline function 'kotlin.require' call
        if (!(minimumCapacity >= 1 && minimumCapacity <= 8192)) {
          var message = 'unexpected capacity (' + minimumCapacity + '), should be in range [1, 8192]';
          throw IllegalArgumentException().q(toString(message));
        }
        if (this.m2z_1 == null) {
          var result = SegmentPool_instance.b31();
          this.l2z_1 = result;
          this.m2z_1 = result;
          return result;
        }
        var t = ensureNotNull(this.m2z_1);
        if ((t.z2z_1 + minimumCapacity | 0) > 8192 || !t.b30_1) {
          var newTail = t.l30(SegmentPool_instance.b31());
          this.m2z_1 = newTail;
          return newTail;
        }
        return t;
      }
      c31(source, startIndex, endIndex) {
        // Inline function 'kotlinx.io.checkBounds' call
        var size = source.length;
        checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
        var currentOffset = startIndex;
        while (currentOffset < endIndex) {
          var tail = this.y30(1);
          var tmp0 = endIndex - currentOffset | 0;
          // Inline function 'kotlin.comparisons.minOf' call
          var b = tail.d31();
          var toCopy = Math.min(tmp0, b);
          tail.e31(source, currentOffset, currentOffset + toCopy | 0);
          currentOffset = currentOffset + toCopy | 0;
        }
        var tmp = this;
        var tmp0_0 = this.n2z_1;
        // Inline function 'kotlin.Long.plus' call
        var other = endIndex - startIndex | 0;
        tmp.n2z_1 = tmp0_0.f4(toLong(other));
      }
      u30(source, byteCount) {
        // Inline function 'kotlin.require' call
        if (!!(source === this)) {
          var message = 'source == this';
          throw IllegalArgumentException().q(toString(message));
        }
        checkOffsetAndCount(source.n2z_1, new (Long())(0, 0), byteCount);
        var remainingByteCount = byteCount;
        while (remainingByteCount.d2(new (Long())(0, 0)) > 0) {
          if (remainingByteCount.d2(toLong(ensureNotNull(source.l2z_1).c1())) < 0) {
            var tail = this.m2z_1;
            var tmp;
            if (!(tail == null) && tail.b30_1) {
              var tmp0 = remainingByteCount;
              // Inline function 'kotlin.Long.plus' call
              var other = tail.z2z_1;
              var tmp0_0 = tmp0.f4(toLong(other));
              // Inline function 'kotlin.Long.minus' call
              var other_0 = tail.g31() ? 0 : tail.y2z_1;
              tmp = tmp0_0.g4(toLong(other_0)).d2(new (Long())(8192, 0)) <= 0;
            } else {
              tmp = false;
            }
            if (tmp) {
              ensureNotNull(source.l2z_1).i31(tail, remainingByteCount.f2());
              source.n2z_1 = source.n2z_1.g4(remainingByteCount);
              this.n2z_1 = this.n2z_1.f4(remainingByteCount);
              return Unit_instance;
            } else {
              source.l2z_1 = ensureNotNull(source.l2z_1).h31(remainingByteCount.f2());
            }
          }
          var segmentToMove = ensureNotNull(source.l2z_1);
          var movedByteCount = toLong(segmentToMove.c1());
          source.l2z_1 = segmentToMove.j31();
          if (source.l2z_1 == null) {
            source.m2z_1 = null;
          }
          // Inline function 'kotlinx.io.Buffer.pushSegment' call
          if (this.l2z_1 == null) {
            this.l2z_1 = segmentToMove;
            this.m2z_1 = segmentToMove;
          } else if (true) {
            this.m2z_1 = ensureNotNull(this.m2z_1).l30(segmentToMove).m30();
            if (ensureNotNull(this.m2z_1).d30_1 == null) {
              this.l2z_1 = this.m2z_1;
            }
          } else {
            this.m2z_1 = ensureNotNull(this.m2z_1).l30(segmentToMove);
          }
          source.n2z_1 = source.n2z_1.g4(movedByteCount);
          this.n2z_1 = this.n2z_1.f4(movedByteCount);
          remainingByteCount = remainingByteCount.g4(movedByteCount);
        }
      }
      k31(source) {
        var totalBytesRead = new (Long())(0, 0);
        $l$loop: while (true) {
          var readCount = source.t30(this, new (Long())(8192, 0));
          if (readCount.equals(new (Long())(-1, -1)))
            break $l$loop;
          totalBytesRead = totalBytesRead.f4(readCount);
        }
        return totalBytesRead;
      }
      l31(byte) {
        this.y30(1).m31(byte);
        this.n2z_1 = this.n2z_1.f4(new (Long())(1, 0));
      }
      n31(short) {
        this.y30(2).o31(short);
        this.n2z_1 = this.n2z_1.f4(new (Long())(2, 0));
      }
      v6() {
        return Unit_instance;
      }
      toString() {
        if (this.c1().equals(new (Long())(0, 0)))
          return 'Buffer(size=0)';
        var maxPrintableBytes = 64;
        // Inline function 'kotlinx.io.minOf' call
        var b = this.c1();
        // Inline function 'kotlin.comparisons.minOf' call
        var a = toLong(maxPrintableBytes);
        var len = (a.d2(b) <= 0 ? a : b).f2();
        var builder = StringBuilder().kc(imul(len, 2) + (this.c1().d2(toLong(maxPrintableBytes)) > 0 ? 1 : 0) | 0);
        var bytesWritten = 0;
        // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.forEachSegment' call
        var curr = this.l2z_1;
        while (!(curr == null)) {
          var tmp0 = get_SegmentReadContextImpl();
          var segment = curr;
          var idx = 0;
          while (bytesWritten < len && idx < segment.c1()) {
            var _unary__edvuaz = idx;
            idx = _unary__edvuaz + 1 | 0;
            var b_0 = tmp0.p31(segment, _unary__edvuaz);
            bytesWritten = bytesWritten + 1 | 0;
            var tmp = get_HEX_DIGIT_CHARS();
            // Inline function 'kotlinx.io.shr' call
            var tmp$ret$2 = b_0 >> 4;
            var tmp_0 = builder.ic(tmp[tmp$ret$2 & 15]);
            var tmp_1 = get_HEX_DIGIT_CHARS();
            // Inline function 'kotlinx.io.and' call
            var tmp$ret$3 = b_0 & 15;
            tmp_0.ic(tmp_1[tmp$ret$3]);
          }
          curr = curr.c30_1;
        }
        if (this.c1().d2(toLong(maxPrintableBytes)) > 0) {
          builder.ic(_Char___init__impl__6a9atx(8230));
        }
        return 'Buffer(size=' + this.c1().toString() + ' hex=' + builder.toString() + ')';
      }
      e30() {
        var oldHead = ensureNotNull(this.l2z_1);
        var nextHead = oldHead.c30_1;
        this.l2z_1 = nextHead;
        if (nextHead == null) {
          this.m2z_1 = null;
        } else {
          nextHead.d30_1 = null;
        }
        oldHead.c30_1 = null;
        SegmentPool_instance.q31(oldHead);
      }
      r31() {
        var oldTail = ensureNotNull(this.m2z_1);
        var newTail = oldTail.d30_1;
        this.m2z_1 = newTail;
        if (newTail == null) {
          this.l2z_1 = null;
        } else {
          newTail.c30_1 = null;
        }
        oldTail.d30_1 = null;
        SegmentPool_instance.q31(oldTail);
      }
    }
    protoOf($).f31 = write$default;
    initMetadataForClass($, 'Buffer', Buffer, VOID, [Source(), Sink()]);
    BufferClass = $;
  }
  return BufferClass;
}
//region block: exports
export {
  Buffer as Buffergs925ekssbch,
};
//endregion

//# sourceMappingURL=Buffer.mjs.map
