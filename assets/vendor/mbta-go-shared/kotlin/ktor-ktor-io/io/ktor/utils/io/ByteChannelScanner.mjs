import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { IOException1wyutdmfe71nu as IOException } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/-PlatformJs.mjs';
import { decodeToString2ede220pr5xir as decodeToString } from '../../../../../kotlinx-io-kotlinx-io-bytestring/kotlinx/io/bytestring/ByteString.mjs';
import { replace3le3ie7l9k8aq as replace } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { indexOf29nspdgx2e3ap as indexOf } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Sources.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { flushIfNeeded2ae8rmpc1excy as flushIfNeeded } from './ByteWriteChannel.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { writeByte32j1f6pu0p5dj as writeByte } from './ByteWriteChannelOperations.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function buildPartialMatchTable($this) {
  var table = new Int32Array($this.i36_1.c1());
  var j = 0;
  var inductionVariable = 1;
  var last = $this.i36_1.c1();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      while (j > 0 && !($this.i36_1.e1(i) === $this.i36_1.e1(j))) {
        j = table[j - 1 | 0];
      }
      if ($this.i36_1.e1(i) === $this.i36_1.e1(j)) {
        j = j + 1 | 0;
      }
      table[i] = j;
    }
     while (inductionVariable < last);
  return table;
}
function advanceToNextPotentialMatch($this, $completion) {
  var tmp = new ($advanceToNextPotentialMatchCOROUTINE$())($this, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function checkFullMatch($this, $completion) {
  var tmp = new ($checkFullMatchCOROUTINE$())($this, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function checkBounds($this, extra) {
  if ($this.o36_1.f4(extra).d2($this.k36_1) > 0) {
    throw IOException().v32('Limit of ' + $this.k36_1.toString() + ' bytes exceeded ' + ('while searching for "' + toSingleLineString($this, $this.i36_1) + '"'));
  }
}
function toSingleLineString($this, _this__u8e3s4) {
  return replace(decodeToString(_this__u8e3s4), '\n', '\\n');
}
var $findNextCOROUTINE$Class;
function $findNextCOROUTINE$() {
  if ($findNextCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, ignoreMissing, resultContinuation) {
        super(resultContinuation);
        this.w37_1 = _this__u8e3s4;
        this.x37_1 = ignoreMissing;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 9;
                this.w37_1.o36_1 = new (Long())(0, 0);
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!this.w37_1.l36_1.t2z()) {
                  this.y37_1 = true;
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  suspendResult = this.w37_1.h36_1.e36(VOID, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                }

              case 2:
                this.y37_1 = suspendResult;
                this.fd_1 = 3;
                continue $sm;
              case 3:
                if (!this.y37_1) {
                  this.fd_1 = 7;
                  continue $sm;
                }

                this.fd_1 = 4;
                suspendResult = advanceToNextPotentialMatch(this.w37_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 4:
                this.fd_1 = 5;
                suspendResult = checkFullMatch(this.w37_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                if (suspendResult) {
                  return this.w37_1.o36_1;
                } else {
                  this.fd_1 = 6;
                  continue $sm;
                }

              case 6:
                this.fd_1 = 1;
                continue $sm;
              case 7:
                if (!this.x37_1) {
                  throw IOException().v32('Expected "' + toSingleLineString(this.w37_1, this.w37_1.i36_1) + '" but encountered end of input');
                }

                this.w37_1.o36_1 = this.w37_1.o36_1.f4(this.w37_1.n36_1.w30(this.w37_1.j36_1.y35()));
                this.fd_1 = 8;
                suspendResult = this.w37_1.j36_1.u35(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 8:
                return this.w37_1.o36_1;
              case 9:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 9) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $findNextCOROUTINE$Class = $;
  }
  return $findNextCOROUTINE$Class;
}
var $advanceToNextPotentialMatchCOROUTINE$Class;
function $advanceToNextPotentialMatchCOROUTINE$() {
  if ($advanceToNextPotentialMatchCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.y36_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 8;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!this.y36_1.l36_1.t2z()) {
                  this.z36_1 = true;
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  suspendResult = this.y36_1.h36_1.e36(VOID, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                }

              case 2:
                this.z36_1 = suspendResult;
                this.fd_1 = 3;
                continue $sm;
              case 3:
                if (!this.z36_1) {
                  this.fd_1 = 7;
                  continue $sm;
                }

                this.a37_1 = indexOf(this.y36_1.l36_1, this.y36_1.i36_1.e1(0));
                if (this.a37_1.equals(new (Long())(-1, -1))) {
                  var tmp_0 = this.y36_1.l36_1;
                  checkBounds(this.y36_1, (tmp_0 instanceof Buffer() ? tmp_0 : THROW_CCE()).c1());
                  this.y36_1.o36_1 = this.y36_1.o36_1.f4(this.y36_1.l36_1.w30(this.y36_1.j36_1.y35()));
                  this.fd_1 = 5;
                  suspendResult = flushIfNeeded(this.y36_1.j36_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  checkBounds(this.y36_1, this.a37_1);
                  var tmp_1 = this.y36_1;
                  var tmp_2 = this.y36_1.o36_1;
                  var tmp_3 = this.y36_1.j36_1.y35();
                  tmp_1.o36_1 = tmp_2.f4(this.y36_1.l36_1.t30(tmp_3 instanceof Buffer() ? tmp_3 : THROW_CCE(), this.a37_1));
                  this.fd_1 = 4;
                  suspendResult = flushIfNeeded(this.y36_1.j36_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                }

              case 4:
                return Unit_instance;
              case 5:
                this.fd_1 = 6;
                continue $sm;
              case 6:
                this.fd_1 = 1;
                continue $sm;
              case 7:
                return Unit_instance;
              case 8:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 8) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $advanceToNextPotentialMatchCOROUTINE$Class = $;
  }
  return $advanceToNextPotentialMatchCOROUTINE$Class;
}
var $checkFullMatchCOROUTINE$Class;
function $checkFullMatchCOROUTINE$() {
  if ($checkFullMatchCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.j37_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 8;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!this.j37_1.l36_1.t2z()) {
                  this.k37_1 = true;
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  suspendResult = this.j37_1.h36_1.e36(VOID, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                }

              case 2:
                this.k37_1 = suspendResult;
                this.fd_1 = 3;
                continue $sm;
              case 3:
                if (!this.k37_1) {
                  this.fd_1 = 7;
                  continue $sm;
                }

                this.l37_1 = this.j37_1.l36_1.w2z();
                if (this.j37_1.p36_1 > 0 && !(this.l37_1 === this.j37_1.i36_1.e1(this.j37_1.p36_1))) {
                  this.m37_1 = this.j37_1.p36_1;
                  while (this.j37_1.p36_1 > 0 && !(this.l37_1 === this.j37_1.i36_1.e1(this.j37_1.p36_1))) {
                    this.j37_1.p36_1 = this.j37_1.m36_1[this.j37_1.p36_1 - 1 | 0];
                  }
                  this.n37_1 = toLong(this.m37_1 - this.j37_1.p36_1 | 0);
                  checkBounds(this.j37_1, this.n37_1);
                  var tmp_0 = this.j37_1;
                  var tmp_1 = this.j37_1.o36_1;
                  var tmp_2 = this.j37_1.j36_1.y35();
                  tmp_0.o36_1 = tmp_1.f4(this.j37_1.n36_1.t30(tmp_2 instanceof Buffer() ? tmp_2 : THROW_CCE(), this.n37_1));
                  if (this.j37_1.p36_1 === 0 && !(this.l37_1 === this.j37_1.i36_1.e1(this.j37_1.p36_1))) {
                    this.fd_1 = 6;
                    suspendResult = writeByte(this.j37_1.j36_1, this.l37_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    this.fd_1 = 4;
                    continue $sm;
                  }
                } else {
                  this.fd_1 = 5;
                  continue $sm;
                }

              case 4:
                this.fd_1 = 5;
                continue $sm;
              case 5:
                this.j37_1.p36_1 = this.j37_1.p36_1 + 1 | 0;
                if (this.j37_1.p36_1 === this.j37_1.i36_1.c1()) {
                  return true;
                }

                this.j37_1.n36_1.l31(this.l37_1);
                this.fd_1 = 1;
                continue $sm;
              case 6:
                var _unary__edvuaz = this.j37_1.o36_1;
                this.j37_1.o36_1 = _unary__edvuaz.k4();
                return false;
              case 7:
                return false;
              case 8:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 8) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $checkFullMatchCOROUTINE$Class = $;
  }
  return $checkFullMatchCOROUTINE$Class;
}
var ByteChannelScannerClass;
function ByteChannelScanner() {
  if (ByteChannelScannerClass === VOID) {
    class $ {
      constructor(channel, matchString, writeChannel, limit) {
        limit = limit === VOID ? new (Long())(-1, 2147483647) : limit;
        this.h36_1 = channel;
        this.i36_1 = matchString;
        this.j36_1 = writeChannel;
        this.k36_1 = limit;
        // Inline function 'kotlin.require' call
        if (!(this.i36_1.c1() > 0)) {
          var message = 'Empty match string not permitted for scanning';
          throw IllegalArgumentException().q(toString(message));
        }
        this.l36_1 = this.h36_1.v35();
        this.m36_1 = buildPartialMatchTable(this);
        this.n36_1 = new (Buffer())();
        this.o36_1 = new (Long())(0, 0);
        this.p36_1 = 0;
      }
      z37(ignoreMissing, $completion) {
        var tmp = new ($findNextCOROUTINE$())(this, ignoreMissing, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    initMetadataForClass($, 'ByteChannelScanner', VOID, VOID, VOID, [1, 0]);
    ByteChannelScannerClass = $;
  }
  return ByteChannelScannerClass;
}
//region block: exports
export {
  ByteChannelScanner as ByteChannelScanner1h148q1m3y1ey,
};
//endregion

//# sourceMappingURL=ByteChannelScanner.mjs.map
