import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
  Result3t1vadv16kmzk as Result,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  newThrowablezl37abp36p5f as newThrowable,
  protoOf180f3jzyo7rfj as protoOf,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString1h6jjoch8cjt8 as toString_0 } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/numberConversions.mjs';
import { stackTraceToString2670q6lbhdojj as stackTraceToString } from '../../../../../kotlin-kotlin-stdlib/kotlin/throwableExtensions.mjs';
import { get_DEVELOPMENT_MODE18ax9b1n971lk as get_DEVELOPMENT_MODE } from './ByteChannel.jsAndWasmShared.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  ClosedReadChannelException9jdpzh6uy12w as ClosedReadChannelException,
  ClosedWriteChannelException1eeenxj0c4bxu as ClosedWriteChannelException,
} from './Exceptions.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { rethrowCloseCauseIfNeededeln8lm5agg4u as rethrowCloseCauseIfNeeded } from './ByteReadChannelOperations.mjs';
import {
  toLongw1zpgk99d84b as toLong,
  numberToLong1a4cndvg6c52s as numberToLong,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CancellableContinuationImpl.mjs';
import { returnIfSuspendedqak8u4r448cu as returnIfSuspended } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coroutineInternalJS.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  get_CLOSED3uiwvc5y98ftj as get_CLOSED,
  CloseToken4utf44psnuyc as CloseToken,
} from './CloseToken.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { atomic$ref$130aurmcwdfdf1 as atomic$ref$1 } from '../../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import {
  awaitContent$default62rpipafmnr4 as awaitContent$default,
  ByteReadChannel2wzou76jce72d as ByteReadChannel,
} from './ByteReadChannel.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        this.y32_1 = new (Closed())(null);
        var tmp = this;
        // Inline function 'kotlin.Companion.success' call
        tmp.z32_1 = _Result___init__impl__xyqfz8(Unit_instance);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance_0;
function Companion_getInstance() {
  if (Companion_instance_0 === VOID)
    new (Companion())();
  return Companion_instance_0;
}
var EmptyClass;
function Empty() {
  if (EmptyClass === VOID) {
    class $ {
      toString() {
        return 'Empty';
      }
      hashCode() {
        return -231472095;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Empty()))
          return false;
        other instanceof Empty() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Empty');
    EmptyClass = $;
  }
  return EmptyClass;
}
var Empty_instance;
function Empty_getInstance() {
  return Empty_instance;
}
var ClosedClass;
function Closed() {
  if (ClosedClass === VOID) {
    class $ {
      constructor(cause) {
        this.a33_1 = cause;
      }
      toString() {
        return 'Closed(cause=' + toString(this.a33_1) + ')';
      }
      hashCode() {
        return this.a33_1 == null ? 0 : hashCode(this.a33_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Closed()))
          return false;
        var tmp0_other_with_cast = other instanceof Closed() ? other : THROW_CCE();
        if (!equals(this.a33_1, tmp0_other_with_cast.a33_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Closed');
    ClosedClass = $;
  }
  return ClosedClass;
}
function resume() {
  return this.c33().qd(Companion_getInstance().z32_1);
}
function resume_0(throwable) {
  var tmp = this.c33();
  var tmp_0;
  if (throwable == null) {
    tmp_0 = null;
  } else {
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.Companion.failure' call
    var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(throwable));
    tmp_0 = new (Result())(tmp$ret$2);
  }
  var tmp1_elvis_lhs = tmp_0;
  return tmp.qd(tmp1_elvis_lhs == null ? Companion_getInstance().z32_1 : tmp1_elvis_lhs.yw_1);
}
var TaskClass;
function Task() {
  if (TaskClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Task');
    TaskClass = $;
  }
  return TaskClass;
}
var ReadClass;
function Read() {
  if (ReadClass === VOID) {
    class $ {
      constructor(continuation) {
        this.g33_1 = continuation;
        this.h33_1 = null;
        if (get_DEVELOPMENT_MODE()) {
          var tmp = this;
          // Inline function 'kotlin.also' call
          var this_0 = newThrowable('ReadTask 0x' + toString_0(hashCode(this.g33_1), 16));
          stackTraceToString(this_0);
          tmp.h33_1 = this_0;
        }
      }
      c33() {
        return this.g33_1;
      }
      b33() {
        return this.h33_1;
      }
      d33() {
        return 'read';
      }
    }
    protoOf($).e33 = resume;
    protoOf($).f33 = resume_0;
    initMetadataForClass($, 'Read', VOID, VOID, [Task()]);
    ReadClass = $;
  }
  return ReadClass;
}
var WriteClass;
function Write() {
  if (WriteClass === VOID) {
    class $ {
      constructor(continuation) {
        this.i33_1 = continuation;
        this.j33_1 = null;
        if (get_DEVELOPMENT_MODE()) {
          var tmp = this;
          // Inline function 'kotlin.also' call
          var this_0 = newThrowable('WriteTask 0x' + toString_0(hashCode(this.i33_1), 16));
          stackTraceToString(this_0);
          tmp.j33_1 = this_0;
        }
      }
      c33() {
        return this.i33_1;
      }
      b33() {
        return this.j33_1;
      }
      d33() {
        return 'write';
      }
    }
    protoOf($).e33 = resume;
    protoOf($).f33 = resume_0;
    initMetadataForClass($, 'Write', VOID, VOID, [Task()]);
    WriteClass = $;
  }
  return WriteClass;
}
function moveFlushToReadBuffer($this) {
  // Inline function 'io.ktor.utils.io.locks.synchronized' call
  $this.n33_1;
  $this.l33_1.w30($this.p33_1);
  $this.m33_1 = 0;
  // Inline function 'io.ktor.utils.io.ByteChannel.resumeSlot' call
  var current = $this.o33_1.kotlinx$atomicfu$value;
  var tmp;
  if (current instanceof Write()) {
    tmp = $this.o33_1.atomicfu$compareAndSet(current, Empty_instance);
  } else {
    tmp = false;
  }
  if (tmp) {
    current.e33();
  }
}
function closeSlot($this, cause) {
  var closeContinuation = !(cause == null) ? new (Closed())(cause) : Companion_getInstance().y32_1;
  var continuation = $this.o33_1.atomicfu$getAndSet(closeContinuation);
  if (isInterface(continuation, Task())) {
    continuation.f33(cause);
  }
}
function ClosedReadChannelException$_init_$ref_ix0089() {
  var l = function (p0) {
    return ClosedReadChannelException().w33(p0);
  };
  l.callableName = '<init>';
  return l;
}
function ClosedWriteChannelException$_init_$ref_ef15ty() {
  var l = function (p0) {
    return ClosedWriteChannelException().b34(p0);
  };
  l.callableName = '<init>';
  return l;
}
var $awaitContentCOROUTINE$Class;
function $awaitContentCOROUTINE$() {
  if ($awaitContentCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, min, resultContinuation) {
        super(resultContinuation);
        this.k34_1 = _this__u8e3s4;
        this.l34_1 = min;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                rethrowCloseCauseIfNeeded(this.k34_1);
                if (this.k34_1.p33_1.c1().d2(toLong(this.l34_1)) >= 0)
                  return true;
                var tmp_0 = this;
                tmp_0.m34_1 = this.k34_1;
                this.n34_1 = this.m34_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!(numberToLong(this.k34_1.m33_1).f4(this.k34_1.p33_1.c1()).d2(toLong(this.l34_1)) < 0 && this.k34_1.r33_1.kotlinx$atomicfu$value == null)) {
                  this.fd_1 = 3;
                  continue $sm;
                }

                this.fd_1 = 2;
                var cancellable = new (CancellableContinuationImpl())(intercepted(this), 1);
                cancellable.f26();
                var tmp0 = this.n34_1;
                var tmp2 = new (Read())(cancellable);
                l$ret$1: do {
                  var previous = tmp0.o33_1.kotlinx$atomicfu$value;
                  if (!(previous instanceof Closed())) {
                    if (!tmp0.o33_1.atomicfu$compareAndSet(previous, tmp2)) {
                      tmp2.e33();
                      break l$ret$1;
                    }
                  }
                  if (previous instanceof Read()) {
                    previous.f33(ConcurrentIOException().s34(tmp2.d33(), previous.b33()));
                  } else {
                    if (isInterface(previous, Task())) {
                      previous.e33();
                    } else {
                      if (previous instanceof Closed()) {
                        tmp2.f33(previous.a33_1);
                        break l$ret$1;
                      } else {
                        if (!equals(previous, Empty_instance)) {
                          noWhenBranchMatchedException();
                        }
                      }
                    }
                  }
                  if (!(numberToLong(this.k34_1.m33_1).f4(this.k34_1.p33_1.c1()).d2(toLong(this.l34_1)) < 0 && this.k34_1.r33_1.kotlinx$atomicfu$value == null)) {
                    var current = tmp0.o33_1.kotlinx$atomicfu$value;
                    var tmp_1;
                    if (current instanceof Read()) {
                      tmp_1 = tmp0.o33_1.atomicfu$compareAndSet(current, Empty_instance);
                    } else {
                      tmp_1 = false;
                    }
                    if (tmp_1) {
                      current.e33();
                    }
                  }
                }
                 while (false);
                suspendResult = returnIfSuspended(cancellable.e23(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.fd_1 = 1;
                continue $sm;
              case 3:
                if (this.k34_1.p33_1.c1().d2(new (Long())(1048576, 0)) < 0) {
                  moveFlushToReadBuffer(this.k34_1);
                }

                return this.k34_1.p33_1.c1().d2(toLong(this.l34_1)) >= 0;
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
    $awaitContentCOROUTINE$Class = $;
  }
  return $awaitContentCOROUTINE$Class;
}
var $flushCOROUTINE$Class;
function $flushCOROUTINE$() {
  if ($flushCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.b35_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                rethrowCloseCauseIfNeeded(this.b35_1);
                this.b35_1.e35();
                if (this.b35_1.m33_1 < 1048576)
                  return Unit_instance;
                var tmp_0 = this;
                tmp_0.c35_1 = this.b35_1;
                this.d35_1 = this.c35_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!(this.b35_1.m33_1 >= 1048576 && this.b35_1.r33_1.kotlinx$atomicfu$value == null)) {
                  this.fd_1 = 3;
                  continue $sm;
                }

                this.fd_1 = 2;
                var cancellable = new (CancellableContinuationImpl())(intercepted(this), 1);
                cancellable.f26();
                var tmp0 = this.d35_1;
                var tmp2 = new (Write())(cancellable);
                l$ret$1: do {
                  var previous = tmp0.o33_1.kotlinx$atomicfu$value;
                  if (!(previous instanceof Closed())) {
                    if (!tmp0.o33_1.atomicfu$compareAndSet(previous, tmp2)) {
                      tmp2.e33();
                      break l$ret$1;
                    }
                  }
                  if (previous instanceof Write()) {
                    previous.f33(ConcurrentIOException().s34(tmp2.d33(), previous.b33()));
                  } else {
                    if (isInterface(previous, Task())) {
                      previous.e33();
                    } else {
                      if (previous instanceof Closed()) {
                        tmp2.f33(previous.a33_1);
                        break l$ret$1;
                      } else {
                        if (!equals(previous, Empty_instance)) {
                          noWhenBranchMatchedException();
                        }
                      }
                    }
                  }
                  if (!(this.b35_1.m33_1 >= 1048576 && this.b35_1.r33_1.kotlinx$atomicfu$value == null)) {
                    var current = tmp0.o33_1.kotlinx$atomicfu$value;
                    var tmp_1;
                    if (current instanceof Write()) {
                      tmp_1 = tmp0.o33_1.atomicfu$compareAndSet(current, Empty_instance);
                    } else {
                      tmp_1 = false;
                    }
                    if (tmp_1) {
                      current.e33();
                    }
                  }
                }
                 while (false);
                suspendResult = returnIfSuspended(cancellable.e23(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.fd_1 = 1;
                continue $sm;
              case 3:
                return Unit_instance;
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
    $flushCOROUTINE$Class = $;
  }
  return $flushCOROUTINE$Class;
}
var $flushAndCloseCOROUTINE$Class;
function $flushAndCloseCOROUTINE$() {
  if ($flushAndCloseCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.n35_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                var tmp_0 = this;
                tmp_0.o35_1 = this.n35_1;
                this.p35_1 = this.o35_1;
                this.gd_1 = 2;
                var tmp_1 = this;
                tmp_1.r35_1 = Companion_instance;
                var tmp_2 = this;
                tmp_2.s35_1 = this.p35_1;
                this.t35_1 = this.s35_1;
                this.fd_1 = 1;
                suspendResult = this.t35_1.u35(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var tmp_3 = this;
                this.r35_1;
                tmp_3.q35_1 = _Result___init__impl__xyqfz8(Unit_instance);
                this.gd_1 = 4;
                this.fd_1 = 3;
                continue $sm;
              case 2:
                this.gd_1 = 4;
                var tmp_4 = this.id_1;
                if (tmp_4 instanceof Error) {
                  var e = this.id_1;
                  var tmp_5 = this;
                  tmp_5.q35_1 = _Result___init__impl__xyqfz8(createFailure(e));
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 3:
                this.gd_1 = 4;
                if (!this.n35_1.r33_1.atomicfu$compareAndSet(null, get_CLOSED()))
                  return Unit_instance;
                closeSlot(this.n35_1, null);
                return Unit_instance;
              case 4:
                throw this.id_1;
            }
          } catch ($p) {
            var e_0 = $p;
            if (this.gd_1 === 4) {
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
    $flushAndCloseCOROUTINE$Class = $;
  }
  return $flushAndCloseCOROUTINE$Class;
}
var ByteChannelClass;
function ByteChannel() {
  if (ByteChannelClass === VOID) {
    class $ {
      constructor(autoFlush) {
        autoFlush = autoFlush === VOID ? false : autoFlush;
        this.k33_1 = autoFlush;
        this.l33_1 = new (Buffer())();
        this.m33_1 = 0;
        this.n33_1 = new Object();
        this.o33_1 = atomic$ref$1(Empty_instance);
        this.p33_1 = new (Buffer())();
        this.q33_1 = new (Buffer())();
        this.r33_1 = atomic$ref$1(null);
      }
      v35() {
        var tmp0_safe_receiver = this.r33_1.kotlinx$atomicfu$value;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.x35(ClosedReadChannelException$_init_$ref_ix0089());
        }
        if (this.p33_1.t2z()) {
          moveFlushToReadBuffer(this);
        }
        return this.p33_1;
      }
      y35() {
        if (this.z35()) {
          var tmp0_safe_receiver = this.r33_1.kotlinx$atomicfu$value;
          var tmp;
          if (tmp0_safe_receiver == null) {
            tmp = null;
          } else {
            tmp = tmp0_safe_receiver.x35(ClosedWriteChannelException$_init_$ref_ef15ty());
          }
          if (tmp == null)
            throw ClosedWriteChannelException().b34();
        }
        return this.q33_1;
      }
      a36() {
        var tmp0_safe_receiver = this.r33_1.kotlinx$atomicfu$value;
        return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.b36();
      }
      z35() {
        return !(this.r33_1.kotlinx$atomicfu$value == null);
      }
      c36() {
        return !(this.a36() == null) || (this.z35() && this.m33_1 === 0 && this.p33_1.t2z());
      }
      d36(min, $completion) {
        var tmp = new ($awaitContentCOROUTINE$())(this, min, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      u35($completion) {
        var tmp = new ($flushCOROUTINE$())(this, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      e35() {
        if (this.q33_1.t2z())
          return Unit_instance;
        // Inline function 'io.ktor.utils.io.locks.synchronized' call
        this.n33_1;
        var count = this.q33_1.c1().f2();
        this.l33_1.k31(this.q33_1);
        this.m33_1 = this.m33_1 + count | 0;
        // Inline function 'io.ktor.utils.io.ByteChannel.resumeSlot' call
        var current = this.o33_1.kotlinx$atomicfu$value;
        var tmp;
        if (current instanceof Read()) {
          tmp = this.o33_1.atomicfu$compareAndSet(current, Empty_instance);
        } else {
          tmp = false;
        }
        if (tmp) {
          current.e33();
        }
      }
      v6() {
        this.e35();
        if (!this.r33_1.atomicfu$compareAndSet(null, get_CLOSED()))
          return Unit_instance;
        closeSlot(this, null);
      }
      f36($completion) {
        var tmp = new ($flushAndCloseCOROUTINE$())(this, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      g36(cause) {
        if (!(this.r33_1.kotlinx$atomicfu$value == null))
          return Unit_instance;
        var closedToken = new (CloseToken())(cause);
        this.r33_1.atomicfu$compareAndSet(null, closedToken);
        var wrappedCause = closedToken.b36();
        closeSlot(this, wrappedCause);
      }
      toString() {
        return 'ByteChannel[' + hashCode(this) + ']';
      }
    }
    protoOf($).e36 = awaitContent$default;
    initMetadataForClass($, 'ByteChannel', ByteChannel, VOID, [ByteReadChannel()], [1, 0]);
    ByteChannelClass = $;
  }
  return ByteChannelClass;
}
var ConcurrentIOExceptionClass;
function ConcurrentIOException() {
  if (ConcurrentIOExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static s34(taskName, cause) {
        cause = cause === VOID ? null : cause;
        var $this = this.je('Concurrent ' + taskName + ' attempts', cause);
        captureStack($this, $this.r34_1);
        return $this;
      }
    }
    initMetadataForClass($, 'ConcurrentIOException');
    ConcurrentIOExceptionClass = $;
  }
  return ConcurrentIOExceptionClass;
}
//region block: init
Empty_instance = new (Empty())();
//endregion
//region block: exports
export {
  ByteChannel as ByteChannel3cxdguezl3lu7,
};
//endregion

//# sourceMappingURL=ByteChannel.mjs.map
