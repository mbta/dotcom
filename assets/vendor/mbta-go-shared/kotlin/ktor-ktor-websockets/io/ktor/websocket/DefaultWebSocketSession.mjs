import {
  WebSocketSessionzi1ianvyj32u as WebSocketSession,
  closenu460w3uw8s7 as close,
  closeExceptionally3egz2k4475aku as closeExceptionally,
  sendvcq8td68z5o6 as send,
} from './WebSocketSession.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Dispatchers.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { CoroutineStart_UNDISPATCHED_getInstance1s89xhsoy2cne as CoroutineStart_UNDISPATCHED_getInstance } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineStart.mjs';
import {
  pingerd16zvjbf6m9o as pinger,
  ponger270tezdl2mu68 as ponger,
} from './PingPong.mjs';
import {
  ChannelResult2y4k69ac6y3du as ChannelResult,
  _ChannelResult___get_isSuccess__impl__odq1z91n9ra3wwc3tz2 as _ChannelResult___get_isSuccess__impl__odq1z9,
  ClosedSendChannelException29m33prpq9jaw as ClosedSendChannelException,
  ClosedReceiveChannelException3ofg6gf5f5b38 as ClosedReceiveChannelException,
  Channel3r72atmcithql as Channel,
} from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/channels/Channel.mjs';
import {
  Pong3m3cas9hmc9ec as Pong,
  Ping3nta6l7sdq1r9 as Ping,
  Close3tx65evcwi73t as Close,
  Companion_getInstance1mgzkubcxut8z as Companion_getInstance,
  Binary3tlzyfojm51s4 as Binary,
  Text3e6ukp9joohql as Text,
} from './FrameJs.mjs';
import {
  NonDisposableHandle_instancebt9v9qa8gc6h as NonDisposableHandle_instance,
  readReason2qq1b0s02pdpy as readReason,
} from './FrameCommon.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { get_isTraceEnabled82xibuu04nxp as get_isTraceEnabled } from '../../../../ktor-ktor-utils/io/ktor/util/logging/LoggerJs.mjs';
import {
  BytePacketBuilder2biodf4wxvlba as BytePacketBuilder,
  writeFully359t6q8kam2g5 as writeFully,
  buildjygoh729rhy8 as build,
  get_size2imoy2jq11jxl as get_size,
} from '../../../../ktor-ktor-io/io/ktor/utils/io/core/BytePacketBuilder.mjs';
import { readByteArray1ri21h2rciakw as readByteArray } from '../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Sources.mjs';
import { cancelConsumed2i0oizqhmljf6 as cancelConsumed } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/channels/Channels.common.mjs';
import {
  CloseReason10cphaqpp3ct7 as CloseReason,
  Codes_CLOSED_ABNORMALLY_getInstance36fk4x8bui0mi as Codes_CLOSED_ABNORMALLY_getInstance,
  Codes_NORMAL_getInstance2p2d63s1iongn as Codes_NORMAL_getInstance,
  Codes_TOO_BIG_getInstance13r0uoqvuqq4y as Codes_TOO_BIG_getInstance,
} from './CloseReason.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { ChannelIOException2i3t76lsrbgox as ChannelIOException } from '../../../../ktor-ktor-utils/io/ktor/util/cio/Channels.mjs';
import { IOException1wyutdmfe71nu as IOException } from '../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/-PlatformJs.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { FrameTooBigException1rgdafsgu31sm as FrameTooBigException } from './FrameTooBigException.mjs';
import {
  atomic$ref$130aurmcwdfdf1 as atomic$ref$1,
  atomic$boolean$1iggki4z65a2h as atomic$boolean$1,
} from '../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { CompletableDeferred2lnqvsbvx74d3 as CompletableDeferred } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CompletableDeferred.mjs';
import { get_OUTGOING_CHANNEL_CAPACITY2ancx42jsldm9 as get_OUTGOING_CHANNEL_CAPACITY } from './UtilsJs.mjs';
import {
  Key_instance2tirv2rj82ml4 as Key_instance,
  Job13y4jkazwjho0 as Job,
} from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { CoroutineName2g5zosw74tf0f as CoroutineName } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineName.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_LOGGER() {
  _init_properties_DefaultWebSocketSession_kt__469s0y();
  return LOGGER;
}
var LOGGER;
function get_IncomingProcessorCoroutineName() {
  _init_properties_DefaultWebSocketSession_kt__469s0y();
  return IncomingProcessorCoroutineName;
}
var IncomingProcessorCoroutineName;
function get_OutgoingProcessorCoroutineName() {
  _init_properties_DefaultWebSocketSession_kt__469s0y();
  return OutgoingProcessorCoroutineName;
}
var OutgoingProcessorCoroutineName;
function get_NORMAL_CLOSE() {
  _init_properties_DefaultWebSocketSession_kt__469s0y();
  return NORMAL_CLOSE;
}
var NORMAL_CLOSE;
var DefaultWebSocketSessionClass;
function DefaultWebSocketSession() {
  if (DefaultWebSocketSessionClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'DefaultWebSocketSession', VOID, VOID, [WebSocketSession()], [1, 0]);
    DefaultWebSocketSessionClass = $;
  }
  return DefaultWebSocketSessionClass;
}
function DefaultWebSocketSession_0(session, pingIntervalMillis, timeoutMillis) {
  pingIntervalMillis = pingIntervalMillis === VOID ? new (Long())(0, 0) : pingIntervalMillis;
  timeoutMillis = timeoutMillis === VOID ? new (Long())(15000, 0) : timeoutMillis;
  _init_properties_DefaultWebSocketSession_kt__469s0y();
  // Inline function 'kotlin.require' call
  if (!!isInterface(session, DefaultWebSocketSession())) {
    var message = 'Cannot wrap other DefaultWebSocketSession';
    throw IllegalArgumentException().q(toString(message));
  }
  return new (DefaultWebSocketSessionImpl())(session, pingIntervalMillis, timeoutMillis);
}
function runIncomingProcessor($this, ponger) {
  var tmp = get_IncomingProcessorCoroutineName().ir(Dispatchers_getInstance().v28_1);
  return launch($this, tmp, VOID, DefaultWebSocketSessionImpl$runIncomingProcessor$slambda_0($this, ponger, null));
}
function runOutgoingProcessor($this) {
  var tmp = get_OutgoingProcessorCoroutineName().ir(Dispatchers_getInstance().v28_1);
  var tmp_0 = CoroutineStart_UNDISPATCHED_getInstance();
  return launch($this, tmp, tmp_0, DefaultWebSocketSessionImpl$runOutgoingProcessor$slambda_0($this, null));
}
function outgoingProcessorLoop($this, $completion) {
  var tmp = new ($outgoingProcessorLoopCOROUTINE$())($this, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function sendCloseSequence($this, reason, exception, $completion) {
  var tmp = new ($sendCloseSequenceCOROUTINE$())($this, reason, exception, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function sendCloseSequence$default($this, reason, exception, $completion, $super) {
  exception = exception === VOID ? null : exception;
  return sendCloseSequence($this, reason, exception, $completion);
}
function tryClose($this) {
  return $this.i4b_1.atomicfu$compareAndSet(false, true);
}
function runOrCancelPinger($this) {
  var interval = $this.n4b_1;
  var tmp;
  if ($this.i4b_1.kotlinx$atomicfu$value) {
    tmp = null;
  } else if (interval.d2(new (Long())(0, 0)) > 0) {
    var tmp_0 = $this.d4b_1.a4a();
    var tmp_1 = $this.o4b_1;
    tmp = pinger($this, tmp_0, interval, tmp_1, DefaultWebSocketSessionImpl$runOrCancelPinger$slambda_0($this, null));
  } else {
    tmp = null;
  }
  var newPinger = tmp;
  var tmp0_safe_receiver = $this.e4b_1.atomicfu$getAndSet(newPinger);
  if (tmp0_safe_receiver == null)
    null;
  else
    tmp0_safe_receiver.y2l();
  var tmp2_safe_receiver = newPinger == null ? null : new (ChannelResult())(newPinger.m2l(Companion_getInstance_0().q4b_1));
  if (tmp2_safe_receiver == null)
    null;
  else
    _ChannelResult___get_isSuccess__impl__odq1z9(tmp2_safe_receiver.a2j_1);
  if ($this.i4b_1.kotlinx$atomicfu$value && !(newPinger == null)) {
    runOrCancelPinger($this);
  }
}
function checkMaxFrameSize($this, packet, frame, $completion) {
  var tmp = new ($checkMaxFrameSizeCOROUTINE$())($this, packet, frame, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function processIncomingExtensions($this, frame) {
  // Inline function 'kotlin.collections.fold' call
  var accumulator = frame;
  var _iterator__ex2g4s = $this.d4c().x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var current = accumulator;
    accumulator = element.e4c(current);
  }
  return accumulator;
}
function processOutgoingExtensions($this, frame) {
  // Inline function 'kotlin.collections.fold' call
  var accumulator = frame;
  var _iterator__ex2g4s = $this.d4c().x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var current = accumulator;
    accumulator = element.f4c(current);
  }
  return accumulator;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.q4b_1 = Pong().n4c(new Int8Array(0), NonDisposableHandle_instance);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var DefaultWebSocketSessionImpl$start$slambdaClass;
function DefaultWebSocketSessionImpl$start$slambda() {
  if (DefaultWebSocketSessionImpl$start$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($incomingJob, $outgoingJob, this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.w4c_1 = $incomingJob;
        $box.x4c_1 = $outgoingJob;
        $box.y4c_1 = this$0;
        super(resultContinuation, $box);
      }
      x3e($this$launch, $completion) {
        var tmp = this.y3e($this$launch, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                this.fd_1 = 1;
                suspendResult = this.w4c_1.d22(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.fd_1 = 2;
                suspendResult = this.x4c_1.d22(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.y4c_1.j4b_1.h22();
                return Unit_instance;
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
      y3e($this$launch, completion) {
        var i = new (DefaultWebSocketSessionImpl$start$slambda())(this.w4c_1, this.x4c_1, this.y4c_1, completion);
        i.z4c_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    DefaultWebSocketSessionImpl$start$slambdaClass = $;
  }
  return DefaultWebSocketSessionImpl$start$slambdaClass;
}
function DefaultWebSocketSessionImpl$start$slambda_0($incomingJob, $outgoingJob, this$0, resultContinuation) {
  var i = new (DefaultWebSocketSessionImpl$start$slambda())($incomingJob, $outgoingJob, this$0, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var DefaultWebSocketSessionImpl$runIncomingProcessor$slambdaClass;
function DefaultWebSocketSessionImpl$runIncomingProcessor$slambda() {
  if (DefaultWebSocketSessionImpl$runIncomingProcessor$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $ponger, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.i4d_1 = this$0;
        $box.j4d_1 = $ponger;
        super(resultContinuation, $box);
      }
      x3e($this$launch, $completion) {
        var tmp = this.y3e($this$launch, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 39;
                this.l4d_1 = null;
                this.m4d_1 = null;
                this.n4d_1 = false;
                this.o4d_1 = Unit_instance;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.fd_1 = 2;
                continue $sm;
              case 2:
                this.gd_1 = 33;
                this.gd_1 = 32;
                var tmp_0 = this;
                tmp_0.q4d_1 = this.i4d_1.d4b_1.z49();
                this.r4d_1 = this.q4d_1;
                var tmp_1 = this;
                tmp_1.s4d_1 = this.r4d_1;
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.u4d_1 = this.s4d_1;
                this.v4d_1 = null;
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.fd_1 = 5;
                continue $sm;
              case 5:
                this.fd_1 = 6;
                continue $sm;
              case 6:
                this.gd_1 = 29;
                this.gd_1 = 28;
                var tmp_2 = this;
                tmp_2.y4d_1 = this.u4d_1;
                this.z4d_1 = this.y4d_1;
                this.a4e_1 = this.z4d_1.x();
                this.fd_1 = 7;
                continue $sm;
              case 7:
                this.fd_1 = 8;
                suspendResult = this.a4e_1.n2i(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 8:
                if (!suspendResult) {
                  this.fd_1 = 26;
                  continue $sm;
                }

                this.b4e_1 = this.a4e_1.z();
                var tmp_3 = this;
                tmp_3.c4e_1 = this.b4e_1;
                this.fd_1 = 9;
                continue $sm;
              case 9:
                this.e4e_1 = this.c4e_1;
                var this_0 = get_LOGGER();
                if (get_isTraceEnabled(this_0)) {
                  this_0.u3n('WebSocketSession(' + toString(this.k4d_1) + ') receiving frame ' + this.e4e_1.toString());
                }

                this.f4e_1 = this.e4e_1;
                var tmp_4 = this.f4e_1;
                if (tmp_4 instanceof Close()) {
                  if (!this.i4d_1.a4a().u2i()) {
                    this.fd_1 = 18;
                    var tmp_5 = this.i4d_1.a4a();
                    var tmp1_elvis_lhs = readReason(this.e4e_1);
                    suspendResult = tmp_5.l2l(Close().x4e(tmp1_elvis_lhs == null ? get_NORMAL_CLOSE() : tmp1_elvis_lhs), this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    this.fd_1 = 19;
                    continue $sm;
                  }
                } else {
                  var tmp_6 = this.f4e_1;
                  if (tmp_6 instanceof Pong()) {
                    this.h4e_1 = this.i4d_1.e4b_1.kotlinx$atomicfu$value;
                    if (this.h4e_1 == null) {
                      this.i4e_1 = null;
                      this.fd_1 = 17;
                      continue $sm;
                    } else {
                      this.fd_1 = 16;
                      suspendResult = this.h4e_1.l2l(this.e4e_1, this);
                      if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                      }
                      continue $sm;
                    }
                  } else {
                    var tmp_7 = this.f4e_1;
                    if (tmp_7 instanceof Ping()) {
                      this.fd_1 = 15;
                      suspendResult = this.j4d_1.l2l(this.e4e_1, this);
                      if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                      }
                      continue $sm;
                    } else {
                      this.fd_1 = 10;
                      suspendResult = checkMaxFrameSize(this.i4d_1, this.m4d_1, this.e4e_1, this);
                      if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                      }
                      continue $sm;
                    }
                  }
                }

              case 10:
                if (!this.e4e_1.y4e_1) {
                  if (this.l4d_1 == null) {
                    this.l4d_1 = this.e4e_1;
                  }
                  if (this.m4d_1 == null) {
                    this.m4d_1 = BytePacketBuilder();
                  }
                  writeFully(ensureNotNull(this.m4d_1), this.e4e_1.a4f_1);
                  this.d4e_1 = Unit_instance;
                  this.fd_1 = 21;
                  continue $sm;
                } else {
                  this.fd_1 = 11;
                  continue $sm;
                }

              case 11:
                if (this.l4d_1 == null) {
                  this.fd_1 = 14;
                  suspendResult = this.i4d_1.g4b_1.l2l(processIncomingExtensions(this.i4d_1, this.e4e_1), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 12;
                  continue $sm;
                }

              case 12:
                writeFully(ensureNotNull(this.m4d_1), this.e4e_1.a4f_1);
                this.j4e_1 = Companion_getInstance().g4f(true, ensureNotNull(this.l4d_1).z4e_1, readByteArray(build(ensureNotNull(this.m4d_1))), ensureNotNull(this.l4d_1).c4f_1, ensureNotNull(this.l4d_1).d4f_1, ensureNotNull(this.l4d_1).e4f_1);
                this.l4d_1 = null;
                this.fd_1 = 13;
                suspendResult = this.i4d_1.g4b_1.l2l(processIncomingExtensions(this.i4d_1, this.j4e_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 13:
                var tmp_8 = this;
                tmp_8.g4e_1 = Unit_instance;
                this.fd_1 = 20;
                continue $sm;
              case 14:
                this.d4e_1 = Unit_instance;
                this.fd_1 = 21;
                continue $sm;
              case 15:
                var tmp_9 = this;
                tmp_9.g4e_1 = Unit_instance;
                this.fd_1 = 20;
                continue $sm;
              case 16:
                var tmp_10 = this;
                tmp_10.i4e_1 = Unit_instance;
                this.fd_1 = 17;
                continue $sm;
              case 17:
                this.g4e_1 = this.i4e_1;
                this.fd_1 = 20;
                continue $sm;
              case 18:
                this.fd_1 = 19;
                continue $sm;
              case 19:
                this.n4d_1 = true;
                this.x4d_1 = Unit_instance;
                this.fd_1 = 22;
                var tmp_11 = this;
                continue $sm;
              case 20:
                this.d4e_1 = Unit_instance;
                if (false) {
                  this.fd_1 = 9;
                  continue $sm;
                }

                this.fd_1 = 21;
                continue $sm;
              case 21:
                this.fd_1 = 7;
                continue $sm;
              case 22:
                this.gd_1 = 32;
                var tmp_12 = this;
                cancelConsumed(this.u4d_1, this.v4d_1);
                tmp_12.p4d_1 = Unit_instance;
                this.gd_1 = 39;
                this.fd_1 = 23;
                continue $sm;
              case 23:
                this.gd_1 = 39;
                this.j4d_1.y2l();
                var tmp0_safe_receiver = this.m4d_1;
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  tmp0_safe_receiver.v6();
                }

                this.i4d_1.g4b_1.y2l();
                if (!this.n4d_1) {
                  this.fd_1 = 24;
                  suspendResult = close(this.i4d_1, CloseReason().u49(Codes_CLOSED_ABNORMALLY_getInstance(), 'Connection was closed without close frame'), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 25;
                  continue $sm;
                }

              case 24:
                this.fd_1 = 25;
                continue $sm;
              case 25:
                var tmp_13 = this;
                return Unit_instance;
              case 26:
                var tmp_14 = this;
                tmp_14.w4d_1 = Unit_instance;
                this.fd_1 = 27;
                var tmp_15 = this;
                continue $sm;
              case 27:
                this.gd_1 = 32;
                var tmp_16 = this;
                cancelConsumed(this.u4d_1, this.v4d_1);
                tmp_16.t4d_1 = Unit_instance;
                this.fd_1 = 31;
                continue $sm;
              case 28:
                this.gd_1 = 29;
                var tmp_17 = this.id_1;
                if (tmp_17 instanceof Error) {
                  this.k4e_1 = this.id_1;
                  var tmp_18 = this;
                  this.v4d_1 = this.k4e_1;
                  throw this.k4e_1;
                } else {
                  throw this.id_1;
                }

              case 29:
                this.gd_1 = 32;
                this.l4e_1 = this.id_1;
                cancelConsumed(this.u4d_1, this.v4d_1);
                throw this.l4e_1;
              case 30:
                this.gd_1 = 32;
                cancelConsumed(this.u4d_1, this.v4d_1);
                if (false) {
                  this.fd_1 = 3;
                  continue $sm;
                }

                this.fd_1 = 31;
                continue $sm;
              case 31:
                this.o4d_1 = Unit_instance;
                this.gd_1 = 39;
                this.fd_1 = 36;
                continue $sm;
              case 32:
                this.gd_1 = 33;
                var tmp_19 = this.id_1;
                if (tmp_19 instanceof ClosedSendChannelException()) {
                  this.m4e_1 = this.id_1;
                  var tmp_20 = this;
                  tmp_20.o4d_1 = Unit_instance;
                  this.gd_1 = 39;
                  this.fd_1 = 36;
                  continue $sm;
                } else {
                  var tmp_21 = this.id_1;
                  if (tmp_21 instanceof Error) {
                    this.n4e_1 = this.id_1;
                    var tmp_22 = this;
                    this.j4d_1.y2l();
                    tmp_22.o4d_1 = this.i4d_1.g4b_1.w2l(this.n4e_1);
                    this.gd_1 = 39;
                    this.fd_1 = 36;
                    continue $sm;
                  } else {
                    throw this.id_1;
                  }
                }

              case 33:
                this.gd_1 = 39;
                this.o4e_1 = this.id_1;
                this.j4d_1.y2l();
                var tmp0_safe_receiver_0 = this.m4d_1;
                if (tmp0_safe_receiver_0 == null)
                  null;
                else {
                  tmp0_safe_receiver_0.v6();
                }

                this.i4d_1.g4b_1.y2l();
                if (!this.n4d_1) {
                  this.fd_1 = 34;
                  suspendResult = close(this.i4d_1, CloseReason().u49(Codes_CLOSED_ABNORMALLY_getInstance(), 'Connection was closed without close frame'), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 35;
                  continue $sm;
                }

              case 34:
                this.fd_1 = 35;
                continue $sm;
              case 35:
                throw this.o4e_1;
              case 36:
                this.p4e_1 = this.o4d_1;
                this.gd_1 = 39;
                this.j4d_1.y2l();
                var tmp0_safe_receiver_1 = this.m4d_1;
                if (tmp0_safe_receiver_1 == null)
                  null;
                else {
                  tmp0_safe_receiver_1.v6();
                }

                this.i4d_1.g4b_1.y2l();
                if (!this.n4d_1) {
                  this.fd_1 = 37;
                  suspendResult = close(this.i4d_1, CloseReason().u49(Codes_CLOSED_ABNORMALLY_getInstance(), 'Connection was closed without close frame'), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 38;
                  continue $sm;
                }

              case 37:
                this.fd_1 = 38;
                continue $sm;
              case 38:
                return Unit_instance;
              case 39:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 39) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      y3e($this$launch, completion) {
        var i = new (DefaultWebSocketSessionImpl$runIncomingProcessor$slambda())(this.i4d_1, this.j4d_1, completion);
        i.k4d_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    DefaultWebSocketSessionImpl$runIncomingProcessor$slambdaClass = $;
  }
  return DefaultWebSocketSessionImpl$runIncomingProcessor$slambdaClass;
}
function DefaultWebSocketSessionImpl$runIncomingProcessor$slambda_0(this$0, $ponger, resultContinuation) {
  var i = new (DefaultWebSocketSessionImpl$runIncomingProcessor$slambda())(this$0, $ponger, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var DefaultWebSocketSessionImpl$runOutgoingProcessor$slambdaClass;
function DefaultWebSocketSessionImpl$runOutgoingProcessor$slambda() {
  if (DefaultWebSocketSessionImpl$runOutgoingProcessor$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.p4f_1 = this$0;
        super(resultContinuation, $box);
      }
      x3e($this$launch, $completion) {
        var tmp = this.y3e($this$launch, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 10;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 6;
                this.gd_1 = 3;
                this.fd_1 = 2;
                suspendResult = outgoingProcessorLoop(this.p4f_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.r4f_1 = suspendResult;
                this.gd_1 = 10;
                this.fd_1 = 8;
                continue $sm;
              case 3:
                this.gd_1 = 6;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof ClosedSendChannelException()) {
                  this.s4f_1 = this.id_1;
                  var tmp_1 = this;
                  tmp_1.r4f_1 = Unit_instance;
                  this.gd_1 = 10;
                  this.fd_1 = 8;
                  continue $sm;
                } else {
                  var tmp_2 = this.id_1;
                  if (tmp_2 instanceof ClosedReceiveChannelException()) {
                    this.t4f_1 = this.id_1;
                    var tmp_3 = this;
                    tmp_3.r4f_1 = Unit_instance;
                    this.gd_1 = 10;
                    this.fd_1 = 8;
                    continue $sm;
                  } else {
                    var tmp_4 = this.id_1;
                    if (tmp_4 instanceof CancellationException()) {
                      this.u4f_1 = this.id_1;
                      this.fd_1 = 4;
                      suspendResult = sendCloseSequence$default(this.p4f_1, CloseReason().u49(Codes_NORMAL_getInstance(), ''), VOID, this);
                      if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                      }
                      continue $sm;
                    } else {
                      var tmp_5 = this.id_1;
                      if (tmp_5 instanceof ChannelIOException()) {
                        this.v4f_1 = this.id_1;
                        var tmp_6 = this;
                        tmp_6.r4f_1 = Unit_instance;
                        this.gd_1 = 10;
                        this.fd_1 = 8;
                        continue $sm;
                      } else {
                        var tmp_7 = this.id_1;
                        if (tmp_7 instanceof Error) {
                          this.w4f_1 = this.id_1;
                          this.p4f_1.h4b_1.g22(CancellationException().ie('Failed to send frame', this.w4f_1));
                          this.fd_1 = 5;
                          suspendResult = closeExceptionally(this.p4f_1.d4b_1, this.w4f_1, this);
                          if (suspendResult === get_COROUTINE_SUSPENDED()) {
                            return suspendResult;
                          }
                          continue $sm;
                        } else {
                          throw this.id_1;
                        }
                      }
                    }
                  }
                }

              case 4:
                this.r4f_1 = suspendResult;
                this.gd_1 = 10;
                this.fd_1 = 8;
                continue $sm;
              case 5:
                this.r4f_1 = suspendResult;
                this.gd_1 = 10;
                this.fd_1 = 8;
                continue $sm;
              case 6:
                this.gd_1 = 10;
                this.x4f_1 = this.id_1;
                this.p4f_1.h4b_1.a2m();
                this.fd_1 = 7;
                suspendResult = close(this.p4f_1.d4b_1, VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 7:
                throw this.x4f_1;
              case 8:
                this.gd_1 = 10;
                this.p4f_1.h4b_1.a2m();
                this.fd_1 = 9;
                suspendResult = close(this.p4f_1.d4b_1, VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 9:
                return Unit_instance;
              case 10:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 10) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      y3e($this$launch, completion) {
        var i = new (DefaultWebSocketSessionImpl$runOutgoingProcessor$slambda())(this.p4f_1, completion);
        i.q4f_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    DefaultWebSocketSessionImpl$runOutgoingProcessor$slambdaClass = $;
  }
  return DefaultWebSocketSessionImpl$runOutgoingProcessor$slambdaClass;
}
function DefaultWebSocketSessionImpl$runOutgoingProcessor$slambda_0(this$0, resultContinuation) {
  var i = new (DefaultWebSocketSessionImpl$runOutgoingProcessor$slambda())(this$0, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var DefaultWebSocketSessionImpl$runOrCancelPinger$slambdaClass;
function DefaultWebSocketSessionImpl$runOrCancelPinger$slambda() {
  if (DefaultWebSocketSessionImpl$runOrCancelPinger$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.g4g_1 = this$0;
        super(resultContinuation, $box);
      }
      i4g(it, $completion) {
        var tmp = this.j4g(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.i4g(p1 instanceof CloseReason() ? p1 : THROW_CCE(), $completion);
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
                suspendResult = sendCloseSequence(this.g4g_1, this.h4g_1, IOException().v32('Ping timeout'), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return Unit_instance;
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
      j4g(it, completion) {
        var i = new (DefaultWebSocketSessionImpl$runOrCancelPinger$slambda())(this.g4g_1, completion);
        i.h4g_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    DefaultWebSocketSessionImpl$runOrCancelPinger$slambdaClass = $;
  }
  return DefaultWebSocketSessionImpl$runOrCancelPinger$slambdaClass;
}
function DefaultWebSocketSessionImpl$runOrCancelPinger$slambda_0(this$0, resultContinuation) {
  var i = new (DefaultWebSocketSessionImpl$runOrCancelPinger$slambda())(this$0, resultContinuation);
  var l = function (it, $completion) {
    return i.i4g(it, $completion);
  };
  l.$arity = 1;
  return l;
}
var $outgoingProcessorLoopCOROUTINE$Class;
function $outgoingProcessorLoopCOROUTINE$() {
  if ($outgoingProcessorLoopCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.k4a_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 7;
                this.l4a_1 = this.k4a_1.h4b_1.x();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.fd_1 = 2;
                suspendResult = this.l4a_1.n2i(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                if (!suspendResult) {
                  this.fd_1 = 6;
                  continue $sm;
                }

                this.m4a_1 = this.l4a_1.z();
                var this_0 = get_LOGGER();
                if (get_isTraceEnabled(this_0)) {
                  this_0.u3n('Sending ' + this.m4a_1.toString() + ' from session ' + toString(this.k4a_1));
                }

                this.n4a_1 = this.m4a_1;
                var tmp_0 = this.n4a_1;
                if (tmp_0 instanceof Close()) {
                  this.fd_1 = 3;
                  suspendResult = sendCloseSequence$default(this.k4a_1, readReason(this.m4a_1), VOID, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var tmp_1;
                  var tmp_2 = this.n4a_1;
                  if (tmp_2 instanceof Text()) {
                    tmp_1 = true;
                  } else {
                    var tmp_3 = this.n4a_1;
                    tmp_1 = tmp_3 instanceof Binary();
                  }
                  if (tmp_1) {
                    this.o4a_1 = processOutgoingExtensions(this.k4a_1, this.m4a_1);
                    this.fd_1 = 4;
                    continue $sm;
                  } else {
                    this.o4a_1 = this.m4a_1;
                    this.fd_1 = 4;
                    continue $sm;
                  }
                }

              case 3:
                this.fd_1 = 6;
                var tmp_4 = this;
                continue $sm;
              case 4:
                this.p4a_1 = this.o4a_1;
                this.fd_1 = 5;
                suspendResult = this.k4a_1.d4b_1.a4a().l2l(this.p4a_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                this.fd_1 = 1;
                continue $sm;
              case 6:
                return Unit_instance;
              case 7:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 7) {
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
    $outgoingProcessorLoopCOROUTINE$Class = $;
  }
  return $outgoingProcessorLoopCOROUTINE$Class;
}
var $sendCloseSequenceCOROUTINE$Class;
function $sendCloseSequenceCOROUTINE$() {
  if ($sendCloseSequenceCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, reason, exception, resultContinuation) {
        super(resultContinuation);
        this.y4a_1 = _this__u8e3s4;
        this.z4a_1 = reason;
        this.a4b_1 = exception;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 6;
                if (!tryClose(this.y4a_1))
                  return Unit_instance;
                var this_0 = get_LOGGER();
                if (get_isTraceEnabled(this_0)) {
                  this_0.u3n('Sending Close Sequence for session ' + toString(this.y4a_1) + ' with reason ' + toString_0(this.z4a_1) + ' and exception ' + toString_0(this.a4b_1));
                }

                this.y4a_1.j4b_1.i28();
                var tmp_0 = this;
                var tmp0_elvis_lhs = this.z4a_1;
                tmp_0.b4b_1 = tmp0_elvis_lhs == null ? CloseReason().u49(Codes_NORMAL_getInstance(), '') : tmp0_elvis_lhs;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 5;
                runOrCancelPinger(this.y4a_1);
                if (!(this.b4b_1.r49_1 === Codes_CLOSED_ABNORMALLY_getInstance().n49_1)) {
                  this.fd_1 = 2;
                  suspendResult = this.y4a_1.d4b_1.a4a().l2l(Close().x4e(this.b4b_1), this);
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
                this.c4b_1 = Unit_instance;
                this.gd_1 = 6;
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.gd_1 = 6;
                this.y4a_1.f4b_1.g28(this.b4b_1);
                if (!(this.a4b_1 == null)) {
                  this.y4a_1.h4b_1.w2l(this.a4b_1);
                  this.y4a_1.g4b_1.w2l(this.a4b_1);
                }

                return Unit_instance;
              case 5:
                this.gd_1 = 6;
                var t = this.id_1;
                this.y4a_1.f4b_1.g28(this.b4b_1);
                if (!(this.a4b_1 == null)) {
                  this.y4a_1.h4b_1.w2l(this.a4b_1);
                  this.y4a_1.g4b_1.w2l(this.a4b_1);
                }

                throw t;
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
    $sendCloseSequenceCOROUTINE$Class = $;
  }
  return $sendCloseSequenceCOROUTINE$Class;
}
var $checkMaxFrameSizeCOROUTINE$Class;
function $checkMaxFrameSizeCOROUTINE$() {
  if ($checkMaxFrameSizeCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, packet, frame, resultContinuation) {
        super(resultContinuation);
        this.z4b_1 = _this__u8e3s4;
        this.a4c_1 = packet;
        this.b4c_1 = frame;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                var tmp_0 = this;
                var tmp_1 = this.b4c_1.a4f_1.length;
                var tmp0_safe_receiver = this.a4c_1;
                var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : get_size(tmp0_safe_receiver);
                tmp_0.c4c_1 = tmp_1 + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
                if (toLong(this.c4c_1).d2(this.z4b_1.y49()) > 0) {
                  var tmp2_safe_receiver = this.a4c_1;
                  if (tmp2_safe_receiver == null)
                    null;
                  else {
                    tmp2_safe_receiver.v6();
                  }
                  this.fd_1 = 2;
                  suspendResult = close(this.z4b_1, CloseReason().u49(Codes_TOO_BIG_getInstance(), 'Frame is too big: ' + this.c4c_1 + '. Max size is ' + this.z4b_1.y49().toString()), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 1;
                  continue $sm;
                }

              case 1:
                return Unit_instance;
              case 2:
                throw FrameTooBigException().n4g(toLong(this.c4c_1));
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
    $checkMaxFrameSizeCOROUTINE$Class = $;
  }
  return $checkMaxFrameSizeCOROUTINE$Class;
}
var DefaultWebSocketSessionImplClass;
function DefaultWebSocketSessionImpl() {
  if (DefaultWebSocketSessionImplClass === VOID) {
    class $ {
      constructor(raw, pingIntervalMillis, timeoutMillis) {
        Companion_getInstance_0();
        this.d4b_1 = raw;
        this.e4b_1 = atomic$ref$1(null);
        this.f4b_1 = CompletableDeferred();
        this.g4b_1 = Channel(8);
        this.h4b_1 = Channel(get_OUTGOING_CHANNEL_CAPACITY());
        this.i4b_1 = atomic$boolean$1(false);
        this.j4b_1 = Job(this.d4b_1.w20().sd(Key_instance));
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.k4b_1 = ArrayList().g1();
        this.l4b_1 = atomic$boolean$1(false);
        this.m4b_1 = this.d4b_1.w20().ir(this.j4b_1).ir(new (CoroutineName())('ws-default'));
        this.n4b_1 = pingIntervalMillis;
        this.o4b_1 = timeoutMillis;
        this.p4b_1 = this.f4b_1;
      }
      z49() {
        return this.g4b_1;
      }
      a4a() {
        return this.h4b_1;
      }
      d4c() {
        return this.k4b_1;
      }
      w20() {
        return this.m4b_1;
      }
      x49(value) {
        this.d4b_1.x49(value);
      }
      y49() {
        return this.d4b_1.y49();
      }
      w49(negotiatedExtensions) {
        if (!this.l4b_1.atomicfu$compareAndSet(false, true)) {
          // Inline function 'kotlin.error' call
          var message = 'WebSocket session ' + toString(this) + ' is already started.';
          throw IllegalStateException().o5(toString(message));
        }
        // Inline function 'io.ktor.util.logging.trace' call
        var this_0 = get_LOGGER();
        if (get_isTraceEnabled(this_0)) {
          var tmp$ret$0 = 'Starting default WebSocketSession(' + toString(this) + ') ' + ('with negotiated extensions: ' + joinToString(negotiatedExtensions));
          this_0.u3n(tmp$ret$0);
        }
        this.k4b_1.d1(negotiatedExtensions);
        runOrCancelPinger(this);
        var incomingJob = runIncomingProcessor(this, ponger(this, this.a4a()));
        var outgoingJob = runOutgoingProcessor(this);
        launch(this, VOID, VOID, DefaultWebSocketSessionImpl$start$slambda_0(incomingJob, outgoingJob, this, null));
      }
      u35($completion) {
        return this.d4b_1.u35($completion);
      }
    }
    protoOf($).b4a = send;
    initMetadataForClass($, 'DefaultWebSocketSessionImpl', VOID, VOID, [DefaultWebSocketSession(), WebSocketSession()], [1, 0, 2]);
    DefaultWebSocketSessionImplClass = $;
  }
  return DefaultWebSocketSessionImplClass;
}
var properties_initialized_DefaultWebSocketSession_kt_6cjlhc;
function _init_properties_DefaultWebSocketSession_kt__469s0y() {
  if (!properties_initialized_DefaultWebSocketSession_kt_6cjlhc) {
    properties_initialized_DefaultWebSocketSession_kt_6cjlhc = true;
    LOGGER = KtorSimpleLogger('io.ktor.websocket.WebSocket');
    IncomingProcessorCoroutineName = new (CoroutineName())('ws-incoming-processor');
    OutgoingProcessorCoroutineName = new (CoroutineName())('ws-outgoing-processor');
    NORMAL_CLOSE = CloseReason().u49(Codes_NORMAL_getInstance(), 'OK');
  }
}
//region block: exports
export {
  DefaultWebSocketSession_0 as DefaultWebSocketSession2pi4wuih6mkcj,
  DefaultWebSocketSession as DefaultWebSocketSession3h8506yqzs5fx,
  get_LOGGER as get_LOGGER1pnacb4n2g1eb,
};
//endregion

//# sourceMappingURL=DefaultWebSocketSession.mjs.map
