import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  Companion_getInstance2zbi981hww1p4 as Companion_getInstance,
  LineEndingMode__toString_impl_j4h76r32i8wewde0kag as LineEndingMode__toString_impl_j4h76r,
  LineEndingMode__contains_impl_q5pr682au50lo4lfj91 as LineEndingMode__contains_impl_q5pr68,
} from './LineEndingMode.mjs';
import { ByteChannelScanner1h148q1m3y1ey as ByteChannelScanner } from './ByteChannelScanner.mjs';
import {
  IOException1wyutdmfe71nu as IOException,
  EOFExceptionh831u25jcq9n as EOFException,
} from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/-PlatformJs.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { BytePacketBuilder2biodf4wxvlba as BytePacketBuilder } from './core/BytePacketBuilder.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  get_remaining1lapv95kcmm0y as get_remaining,
  discard3ugntd47xyll6 as discard,
} from './core/ByteReadPacket.mjs';
import { readAvailable27gpepp0hyyts as readAvailable } from './core/Input.mjs';
import { readBytesj5m5qe40si0k as readBytes } from './core/Buffers.mjs';
import { close3semq7pafb42g as close } from './ByteWriteChannelOperations.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { readStringo8i62qxt5m4m as readString } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Utf8.mjs';
import { TooLongLineException2d6ls946t46wx as TooLongLineException } from './charsets/Encoding.mjs';
import {
  toLongw1zpgk99d84b as toLong,
  numberToLong1a4cndvg6c52s as numberToLong,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { closeFinally1sadm0w9gt3u4 as closeFinally } from '../../../../../kotlin-kotlin-stdlib/kotlin/AutoCloseableJs.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { readByteString2hnsbql6t4ads as readByteString } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/ByteStrings.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function readRemaining(_this__u8e3s4, $completion) {
  var tmp = new ($readRemainingCOROUTINE$())(_this__u8e3s4, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function discard_0(_this__u8e3s4, max, $completion) {
  max = max === VOID ? new (Long())(-1, 2147483647) : max;
  var tmp = new ($discardCOROUTINE$())(_this__u8e3s4, max, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function readAvailable_0(_this__u8e3s4, buffer, offset, length, $completion) {
  offset = offset === VOID ? 0 : offset;
  length = length === VOID ? buffer.length - offset | 0 : length;
  var tmp = new ($readAvailableCOROUTINE$())(_this__u8e3s4, buffer, offset, length, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function toByteArray(_this__u8e3s4, $completion) {
  var tmp = new ($toByteArrayCOROUTINE$())(_this__u8e3s4, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function copyTo(_this__u8e3s4, channel, limit, $completion) {
  var tmp = new ($copyToCOROUTINE$())(_this__u8e3s4, channel, limit, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function rethrowCloseCauseIfNeeded(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.a36();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    throw tmp0_safe_receiver;
  }
}
function get_availableForRead(_this__u8e3s4) {
  return _this__u8e3s4.v35().s2z().c1().f2();
}
function readBuffer(_this__u8e3s4, $completion) {
  var tmp = new ($readBufferCOROUTINE$())(_this__u8e3s4, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function readUTF8LineTo(_this__u8e3s4, out, max, lineEnding, $completion) {
  max = max === VOID ? 2147483647 : max;
  lineEnding = lineEnding === VOID ? Companion_getInstance().w3a_1 : lineEnding;
  var tmp = new ($readUTF8LineToCOROUTINE$())(_this__u8e3s4, out, max, lineEnding, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function rethrowCloseCauseIfNeeded_0(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.a36();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    throw tmp0_safe_receiver;
  }
}
function rethrowCloseCauseIfNeeded_1(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.a36();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    throw tmp0_safe_receiver;
  }
}
function skipIfFound(_this__u8e3s4, byteString, $completion) {
  var tmp = new ($skipIfFoundCOROUTINE$())(_this__u8e3s4, byteString, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function readPacket(_this__u8e3s4, packet, $completion) {
  var tmp = new ($readPacketCOROUTINE$())(_this__u8e3s4, packet, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function readUntil(_this__u8e3s4, matchString, writeChannel, limit, ignoreMissing, $completion) {
  limit = limit === VOID ? new (Long())(-1, 2147483647) : limit;
  ignoreMissing = ignoreMissing === VOID ? false : ignoreMissing;
  return (new (ByteChannelScanner())(_this__u8e3s4, matchString, writeChannel, limit)).z37(ignoreMissing, $completion);
}
function peek(_this__u8e3s4, count, $completion) {
  var tmp = new ($peekCOROUTINE$())(_this__u8e3s4, count, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function readUTF8LineTo$checkLineEndingAllowed($lineEnding, lineEndingToCheck) {
  if (!LineEndingMode__contains_impl_q5pr68($lineEnding, lineEndingToCheck)) {
    throw IOException().v32('Unexpected line ending ' + LineEndingMode__toString_impl_j4h76r(lineEndingToCheck) + ', while expected ' + LineEndingMode__toString_impl_j4h76r($lineEnding));
  }
}
var $readRemainingCOROUTINE$Class;
function $readRemainingCOROUTINE$() {
  if ($readRemainingCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.l38_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                this.m38_1 = BytePacketBuilder();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!!this.l38_1.c36()) {
                  this.fd_1 = 3;
                  continue $sm;
                }

                this.m38_1.k31(this.l38_1.v35());
                this.fd_1 = 2;
                suspendResult = this.l38_1.e36(VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.fd_1 = 1;
                continue $sm;
              case 3:
                rethrowCloseCauseIfNeeded(this.l38_1);
                return this.m38_1.s2z();
              case 4:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 4) {
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
    $readRemainingCOROUTINE$Class = $;
  }
  return $readRemainingCOROUTINE$Class;
}
var $discardCOROUTINE$Class;
function $discardCOROUTINE$() {
  if ($discardCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, max, resultContinuation) {
        super(resultContinuation);
        this.v38_1 = _this__u8e3s4;
        this.w38_1 = max;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 5;
                this.x38_1 = this.w38_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!(this.x38_1.d2(new (Long())(0, 0)) > 0 && !this.v38_1.c36())) {
                  this.fd_1 = 4;
                  continue $sm;
                }

                if (get_availableForRead(this.v38_1) === 0) {
                  this.fd_1 = 2;
                  suspendResult = this.v38_1.e36(VOID, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 3;
                  continue $sm;
                }

              case 2:
                this.fd_1 = 3;
                continue $sm;
              case 3:
                var tmp0 = this.x38_1;
                var b = get_remaining(this.v38_1.v35());
                var count = tmp0.d2(b) <= 0 ? tmp0 : b;
                discard(this.v38_1.v35(), count);
                this.x38_1 = this.x38_1.g4(count);
                this.fd_1 = 1;
                continue $sm;
              case 4:
                return this.w38_1.g4(this.x38_1);
              case 5:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 5) {
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
    $discardCOROUTINE$Class = $;
  }
  return $discardCOROUTINE$Class;
}
var $readAvailableCOROUTINE$Class;
function $readAvailableCOROUTINE$() {
  if ($readAvailableCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, buffer, offset, length, resultContinuation) {
        super(resultContinuation);
        this.g39_1 = _this__u8e3s4;
        this.h39_1 = buffer;
        this.i39_1 = offset;
        this.j39_1 = length;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                if (this.g39_1.c36())
                  return -1;
                if (this.g39_1.v35().t2z()) {
                  this.fd_1 = 1;
                  suspendResult = this.g39_1.e36(VOID, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 1:
                this.fd_1 = 2;
                continue $sm;
              case 2:
                if (this.g39_1.c36())
                  return -1;
                return readAvailable(this.g39_1.v35(), this.h39_1, this.i39_1, this.j39_1);
              case 3:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 3) {
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
    $readAvailableCOROUTINE$Class = $;
  }
  return $readAvailableCOROUTINE$Class;
}
var $toByteArrayCOROUTINE$Class;
function $toByteArrayCOROUTINE$() {
  if ($toByteArrayCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.s39_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = readBuffer(this.s39_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var ARGUMENT = suspendResult;
                return readBytes(ARGUMENT);
              case 2:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 2) {
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
    $toByteArrayCOROUTINE$Class = $;
  }
  return $toByteArrayCOROUTINE$Class;
}
var $copyToCOROUTINE$Class;
function $copyToCOROUTINE$() {
  if ($copyToCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, channel, limit, resultContinuation) {
        super(resultContinuation);
        this.b3a_1 = _this__u8e3s4;
        this.c3a_1 = channel;
        this.d3a_1 = limit;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 12;
                this.e3a_1 = this.d3a_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 8;
                this.gd_1 = 7;
                this.fd_1 = 2;
                continue $sm;
              case 2:
                if (!(!this.b3a_1.c36() && this.e3a_1.d2(new (Long())(0, 0)) > 0)) {
                  this.fd_1 = 6;
                  continue $sm;
                }

                if (this.b3a_1.v35().t2z()) {
                  this.fd_1 = 3;
                  suspendResult = this.b3a_1.e36(VOID, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 4;
                  continue $sm;
                }

              case 3:
                this.fd_1 = 4;
                continue $sm;
              case 4:
                var tmp_0 = this;
                var tmp0 = this.e3a_1;
                var b = get_remaining(this.b3a_1.v35());
                tmp_0.g3a_1 = tmp0.d2(b) <= 0 ? tmp0 : b;
                this.b3a_1.v35().v30(this.c3a_1.y35(), this.g3a_1);
                this.e3a_1 = this.e3a_1.g4(this.g3a_1);
                this.fd_1 = 5;
                suspendResult = this.c3a_1.u35(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                this.fd_1 = 2;
                continue $sm;
              case 6:
                this.f3a_1 = Unit_instance;
                this.gd_1 = 12;
                this.fd_1 = 10;
                continue $sm;
              case 7:
                this.gd_1 = 8;
                var tmp_1 = this.id_1;
                if (tmp_1 instanceof Error) {
                  this.h3a_1 = this.id_1;
                  var tmp_2 = this;
                  this.b3a_1.g36(this.h3a_1);
                  close(this.c3a_1, this.h3a_1);
                  throw this.h3a_1;
                } else {
                  throw this.id_1;
                }

              case 8:
                this.gd_1 = 12;
                this.i3a_1 = this.id_1;
                this.fd_1 = 9;
                suspendResult = this.c3a_1.u35(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 9:
                throw this.i3a_1;
              case 10:
                this.gd_1 = 12;
                this.fd_1 = 11;
                suspendResult = this.c3a_1.u35(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 11:
                return this.d3a_1.g4(this.e3a_1);
              case 12:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 12) {
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
    $copyToCOROUTINE$Class = $;
  }
  return $copyToCOROUTINE$Class;
}
var $readBufferCOROUTINE$Class;
function $readBufferCOROUTINE$() {
  if ($readBufferCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.r3a_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                this.s3a_1 = new (Buffer())();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!!this.r3a_1.c36()) {
                  this.fd_1 = 3;
                  continue $sm;
                }

                this.s3a_1.k31(this.r3a_1.v35());
                this.fd_1 = 2;
                suspendResult = this.r3a_1.e36(VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.fd_1 = 1;
                continue $sm;
              case 3:
                var tmp0_safe_receiver = this.r3a_1.a36();
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  throw tmp0_safe_receiver;
                }

                return this.s3a_1;
              case 4:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 4) {
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
    $readBufferCOROUTINE$Class = $;
  }
  return $readBufferCOROUTINE$Class;
}
var $readUTF8LineToCOROUTINE$Class;
function $readUTF8LineToCOROUTINE$() {
  if ($readUTF8LineToCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, out, max, lineEnding, resultContinuation) {
        super(resultContinuation);
        this.g3b_1 = _this__u8e3s4;
        this.h3b_1 = out;
        this.i3b_1 = max;
        this.j3b_1 = lineEnding;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 21;
                if (this.g3b_1.v35().t2z()) {
                  this.fd_1 = 1;
                  suspendResult = this.g3b_1.e36(VOID, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 1:
                this.fd_1 = 2;
                continue $sm;
              case 2:
                if (this.g3b_1.c36())
                  return false;
                var tmp_0 = this;
                tmp_0.k3b_1 = new (Buffer())();
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.m3b_1 = this.k3b_1;
                this.n3b_1 = null;
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.fd_1 = 5;
                continue $sm;
              case 5:
                this.fd_1 = 6;
                continue $sm;
              case 6:
                this.gd_1 = 18;
                this.gd_1 = 17;
                var tmp_1 = this;
                tmp_1.p3b_1 = this.m3b_1;
                this.q3b_1 = this.p3b_1;
                this.fd_1 = 7;
                continue $sm;
              case 7:
                if (!!this.g3b_1.c36()) {
                  this.fd_1 = 14;
                  continue $sm;
                }

                this.fd_1 = 8;
                continue $sm;
              case 8:
                if (!!this.g3b_1.v35().t2z()) {
                  this.fd_1 = 12;
                  continue $sm;
                }

                this.r3b_1 = this.g3b_1.v35().w2z();
                if (this.r3b_1 === 13) {
                  if (this.g3b_1.v35().t2z()) {
                    this.fd_1 = 10;
                    suspendResult = this.g3b_1.e36(VOID, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    this.fd_1 = 11;
                    continue $sm;
                  }
                } else {
                  if (this.r3b_1 === 10) {
                    readUTF8LineTo$checkLineEndingAllowed(this.j3b_1, Companion_getInstance().u3a_1);
                    this.h3b_1.v(readString(this.q3b_1));
                    this.o3b_1 = true;
                    this.gd_1 = 21;
                    this.fd_1 = 15;
                    continue $sm;
                  } else {
                    this.q3b_1.l31(this.r3b_1);
                    this.fd_1 = 9;
                    continue $sm;
                  }
                }

              case 9:
                this.fd_1 = 8;
                continue $sm;
              case 10:
                this.fd_1 = 11;
                continue $sm;
              case 11:
                if (this.g3b_1.v35().s2z().o30(new (Long())(0, 0)) === 10) {
                  readUTF8LineTo$checkLineEndingAllowed(this.j3b_1, Companion_getInstance().v3a_1);
                  discard(this.g3b_1.v35(), new (Long())(1, 0));
                } else {
                  readUTF8LineTo$checkLineEndingAllowed(this.j3b_1, Companion_getInstance().t3a_1);
                }

                this.h3b_1.v(readString(this.q3b_1));
                this.o3b_1 = true;
                this.gd_1 = 21;
                this.fd_1 = 15;
                continue $sm;
              case 12:
                if (this.q3b_1.c1().d2(toLong(this.i3b_1)) >= 0) {
                  throw TooLongLineException().c3d('Line exceeds limit of ' + this.i3b_1 + ' characters');
                }

                this.fd_1 = 13;
                suspendResult = this.g3b_1.e36(VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 13:
                this.fd_1 = 7;
                continue $sm;
              case 14:
                var tmp_2 = this;
                var this_0 = this.q3b_1.c1().d2(new (Long())(0, 0)) > 0;
                if (this_0) {
                  this.h3b_1.v(readString(this.q3b_1));
                }

                tmp_2.o3b_1 = this_0;
                this.gd_1 = 21;
                this.fd_1 = 15;
                var tmp_3 = this;
                continue $sm;
              case 15:
                var tmp_4 = this.o3b_1;
                this.gd_1 = 21;
                closeFinally(this.m3b_1, this.n3b_1);
                return tmp_4;
              case 16:
                this.gd_1 = 21;
                var tmp_5 = this;
                closeFinally(this.m3b_1, this.n3b_1);
                tmp_5.l3b_1 = Unit_instance;
                this.fd_1 = 20;
                continue $sm;
              case 17:
                this.gd_1 = 18;
                var tmp_6 = this.id_1;
                if (tmp_6 instanceof Error) {
                  var e = this.id_1;
                  var tmp_7 = this;
                  this.n3b_1 = e;
                  throw e;
                } else {
                  throw this.id_1;
                }

              case 18:
                this.gd_1 = 21;
                var t = this.id_1;
                closeFinally(this.m3b_1, this.n3b_1);
                throw t;
              case 19:
                this.gd_1 = 21;
                closeFinally(this.m3b_1, this.n3b_1);
                if (false) {
                  this.fd_1 = 3;
                  continue $sm;
                }

                this.fd_1 = 20;
                continue $sm;
              case 20:
                return Unit_instance;
              case 21:
                throw this.id_1;
            }
          } catch ($p) {
            var e_0 = $p;
            if (this.gd_1 === 21) {
              throw e_0;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_0;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $readUTF8LineToCOROUTINE$Class = $;
  }
  return $readUTF8LineToCOROUTINE$Class;
}
var $skipIfFoundCOROUTINE$Class;
function $skipIfFoundCOROUTINE$() {
  if ($skipIfFoundCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, byteString, resultContinuation) {
        super(resultContinuation);
        this.a3c_1 = _this__u8e3s4;
        this.b3c_1 = byteString;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                this.fd_1 = 1;
                suspendResult = peek(this.a3c_1, this.b3c_1.c1(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.c3c_1 = suspendResult;
                if (equals(this.c3c_1, this.b3c_1)) {
                  this.fd_1 = 3;
                  suspendResult = discard_0(this.a3c_1, toLong(this.b3c_1.c1()), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 2:
                return false;
              case 3:
                return true;
              case 4:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 4) {
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
    $skipIfFoundCOROUTINE$Class = $;
  }
  return $skipIfFoundCOROUTINE$Class;
}
var $readPacketCOROUTINE$Class;
function $readPacketCOROUTINE$() {
  if ($readPacketCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, packet, resultContinuation) {
        super(resultContinuation);
        this.l3c_1 = _this__u8e3s4;
        this.m3c_1 = packet;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 6;
                this.n3c_1 = new (Buffer())();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!(this.n3c_1.c1().d2(toLong(this.m3c_1)) < 0)) {
                  this.fd_1 = 5;
                  continue $sm;
                }

                if (this.l3c_1.v35().t2z()) {
                  this.fd_1 = 2;
                  suspendResult = this.l3c_1.e36(VOID, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 3;
                  continue $sm;
                }

              case 2:
                this.fd_1 = 3;
                continue $sm;
              case 3:
                if (this.l3c_1.c36()) {
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  this.fd_1 = 4;
                  continue $sm;
                }

              case 4:
                if (get_remaining(this.l3c_1.v35()).d2(numberToLong(this.m3c_1).g4(this.n3c_1.c1())) > 0) {
                  this.l3c_1.v35().v30(this.n3c_1, numberToLong(this.m3c_1).g4(this.n3c_1.c1()));
                } else {
                  this.l3c_1.v35().w30(this.n3c_1);
                }

                this.fd_1 = 1;
                continue $sm;
              case 5:
                if (this.n3c_1.c1().d2(toLong(this.m3c_1)) < 0) {
                  throw EOFException().r2z('Not enough data available, required ' + this.m3c_1 + ' bytes but only ' + this.n3c_1.c1().toString() + ' available');
                }

                return this.n3c_1;
              case 6:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 6) {
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
    $readPacketCOROUTINE$Class = $;
  }
  return $readPacketCOROUTINE$Class;
}
var $peekCOROUTINE$Class;
function $peekCOROUTINE$() {
  if ($peekCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, count, resultContinuation) {
        super(resultContinuation);
        this.w3c_1 = _this__u8e3s4;
        this.x3c_1 = count;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                if (this.w3c_1.c36())
                  return null;
                this.fd_1 = 1;
                suspendResult = this.w3c_1.d36(this.x3c_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var ARGUMENT = suspendResult;
                if (!ARGUMENT) {
                  return null;
                } else {
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 2:
                return readByteString(this.w3c_1.v35().x30(), this.x3c_1);
              case 3:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 3) {
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
    $peekCOROUTINE$Class = $;
  }
  return $peekCOROUTINE$Class;
}
//region block: exports
export {
  copyTo as copyTo2vm7vz7rr51or,
  readAvailable_0 as readAvailable22vc1bmbuj93x,
  readPacket as readPacket2q2gamtzwxjd1,
  readRemaining as readRemaining1x8kk1vq7p6gm,
  readUTF8LineTo as readUTF8LineTo3cgartetbq4tk,
  readUntil as readUntil2jtfemvkt7z1f,
  skipIfFound as skipIfFound1yms04v7e3tuk,
  toByteArray as toByteArrayafjflk7yznm4,
  rethrowCloseCauseIfNeeded_0 as rethrowCloseCauseIfNeededeln8lm5agg4u,
  rethrowCloseCauseIfNeeded_1 as rethrowCloseCauseIfNeeded2q8fs9csuucwc,
};
//endregion

//# sourceMappingURL=ByteReadChannelOperations.mjs.map
