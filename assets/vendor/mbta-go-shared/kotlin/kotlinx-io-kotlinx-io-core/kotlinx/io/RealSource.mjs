import { Buffergs925ekssbch as Buffer } from './Buffer.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { EOFExceptionh831u25jcq9n as EOFException } from './-PlatformJs.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { checkBoundsw7d8y6z7j2xc as checkBounds } from './-Util.mjs';
import { PeekSource3frbthc9yehpr as PeekSource } from './PeekSource.mjs';
import { buffered3kq86cdmguv3h as buffered } from './Core.mjs';
import { Source1shr0ps16u4p4 as Source } from './Source.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var RealSourceClass;
function RealSource() {
  if (RealSourceClass === VOID) {
    class $ {
      constructor(source) {
        this.y31_1 = source;
        this.z31_1 = false;
        this.a32_1 = new (Buffer())();
      }
      s2z() {
        return this.a32_1;
      }
      t30(sink, byteCount) {
        // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
        // Inline function 'kotlin.check' call
        if (!!this.z31_1) {
          var message = 'Source is closed.';
          throw IllegalStateException().o5(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(byteCount.d2(new (Long())(0, 0)) >= 0)) {
          var message_0 = 'byteCount: ' + byteCount.toString();
          throw IllegalArgumentException().q(toString(message_0));
        }
        if (this.a32_1.c1().equals(new (Long())(0, 0))) {
          var read = this.y31_1.t30(this.a32_1, new (Long())(8192, 0));
          if (read.equals(new (Long())(-1, -1)))
            return new (Long())(-1, -1);
        }
        // Inline function 'kotlin.comparisons.minOf' call
        var b = this.a32_1.c1();
        var toRead = byteCount.d2(b) <= 0 ? byteCount : b;
        return this.a32_1.t30(sink, toRead);
      }
      t2z() {
        // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
        // Inline function 'kotlin.check' call
        if (!!this.z31_1) {
          var message = 'Source is closed.';
          throw IllegalStateException().o5(toString(message));
        }
        return this.a32_1.t2z() && this.y31_1.t30(this.a32_1, new (Long())(8192, 0)).equals(new (Long())(-1, -1));
      }
      u2z(byteCount) {
        if (!this.v2z(byteCount))
          throw EOFException().r2z("Source doesn't contain required number of bytes (" + byteCount.toString() + ').');
      }
      v2z(byteCount) {
        // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
        // Inline function 'kotlin.check' call
        if (!!this.z31_1) {
          var message = 'Source is closed.';
          throw IllegalStateException().o5(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(byteCount.d2(new (Long())(0, 0)) >= 0)) {
          var message_0 = 'byteCount: ' + byteCount.toString();
          throw IllegalArgumentException().q(toString(message_0));
        }
        while (this.a32_1.c1().d2(byteCount) < 0) {
          if (this.y31_1.t30(this.a32_1, new (Long())(8192, 0)).equals(new (Long())(-1, -1)))
            return false;
        }
        return true;
      }
      w2z() {
        this.u2z(new (Long())(1, 0));
        return this.a32_1.w2z();
      }
      r30(sink, startIndex, endIndex) {
        // Inline function 'kotlinx.io.checkBounds' call
        var size = sink.length;
        checkBounds(toLong(size), toLong(startIndex), toLong(endIndex));
        if (this.a32_1.c1().equals(new (Long())(0, 0))) {
          var read = this.y31_1.t30(this.a32_1, new (Long())(8192, 0));
          if (read.equals(new (Long())(-1, -1)))
            return -1;
        }
        var tmp0 = endIndex - startIndex | 0;
        // Inline function 'kotlinx.io.minOf' call
        var b = this.a32_1.c1();
        // Inline function 'kotlin.comparisons.minOf' call
        var a = toLong(tmp0);
        var toRead = (a.d2(b) <= 0 ? a : b).f2();
        return this.a32_1.r30(sink, startIndex, startIndex + toRead | 0);
      }
      v30(sink, byteCount) {
        try {
          this.u2z(byteCount);
        } catch ($p) {
          if ($p instanceof EOFException()) {
            var e = $p;
            sink.u30(this.a32_1, this.a32_1.c1());
            throw e;
          } else {
            throw $p;
          }
        }
        this.a32_1.v30(sink, byteCount);
      }
      w30(sink) {
        var totalBytesWritten = new (Long())(0, 0);
        while (!this.y31_1.t30(this.a32_1, new (Long())(8192, 0)).equals(new (Long())(-1, -1))) {
          var emitByteCount = this.a32_1.n30();
          if (emitByteCount.d2(new (Long())(0, 0)) > 0) {
            totalBytesWritten = totalBytesWritten.f4(emitByteCount);
            sink.u30(this.a32_1, emitByteCount);
          }
        }
        if (this.a32_1.c1().d2(new (Long())(0, 0)) > 0) {
          totalBytesWritten = totalBytesWritten.f4(this.a32_1.c1());
          sink.u30(this.a32_1, this.a32_1.c1());
        }
        return totalBytesWritten;
      }
      g30() {
        this.u2z(new (Long())(2, 0));
        return this.a32_1.g30();
      }
      x30() {
        // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
        // Inline function 'kotlin.check' call
        if (!!this.z31_1) {
          var message = 'Source is closed.';
          throw IllegalStateException().o5(toString(message));
        }
        return buffered(new (PeekSource())(this));
      }
      v6() {
        if (this.z31_1)
          return Unit_instance;
        this.z31_1 = true;
        this.y31_1.v6();
        this.a32_1.p3();
      }
      toString() {
        return 'buffered(' + toString(this.y31_1) + ')';
      }
    }
    initMetadataForClass($, 'RealSource', VOID, VOID, [Source()]);
    RealSourceClass = $;
  }
  return RealSourceClass;
}
//region block: exports
export {
  RealSource as RealSource1sojixeyllf40,
};
//endregion

//# sourceMappingURL=RealSource.mjs.map
