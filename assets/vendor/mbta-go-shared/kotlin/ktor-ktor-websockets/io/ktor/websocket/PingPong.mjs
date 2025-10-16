import {
  Channel3r72atmcithql as Channel,
  ClosedSendChannelException29m33prpq9jaw as ClosedSendChannelException,
  ClosedReceiveChannelException3ofg6gf5f5b38 as ClosedReceiveChannelException,
} from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/channels/Channel.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Job13y4jkazwjho0 as Job,
  Key_instance2tirv2rj82ml4 as Key_instance,
} from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import {
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { get_LOGGER1pnacb4n2g1eb as get_LOGGER } from './DefaultWebSocketSession.mjs';
import {
  Pong3m3cas9hmc9ec as Pong,
  Ping3nta6l7sdq1r9 as Ping,
} from './FrameJs.mjs';
import { cancelConsumed2i0oizqhmljf6 as cancelConsumed } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/channels/Channels.common.mjs';
import { initMetadataForLambda3af3he42mmnh as initMetadataForLambda } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { Charsets_getInstanceqs70pvl4noow as Charsets_getInstance } from '../../../../ktor-ktor-io/io/ktor/utils/io/charsets/Charset.js.mjs';
import { toByteArray1i3ns5jnoqlv6 as toByteArray } from '../../../../ktor-ktor-io/io/ktor/utils/io/core/Strings.mjs';
import { decodeToString1dbzcjd620q25 as decodeToString } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { getTimeMillis12o7k17x9fmwi as getTimeMillis } from '../../../../ktor-ktor-utils/io/ktor/util/date/DateJs.mjs';
import { Randomei1bbeye8rr8 as Random } from '../../../../kotlin-kotlin-stdlib/kotlin/random/Random.mjs';
import { withTimeoutOrNull1j8ayhfbyp4sk as withTimeoutOrNull } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Timeout.mjs';
import { hex2ofqpe9ngcu1i as hex } from '../../../../ktor-ktor-utils/io/ktor/util/Crypto.mjs';
import {
  CloseReason10cphaqpp3ct7 as CloseReason,
  Codes_INTERNAL_ERROR_getInstance3iys9whrnik2e as Codes_INTERNAL_ERROR_getInstance,
} from './CloseReason.mjs';
import { ClosedByteChannelException3il8gfpye60w as ClosedByteChannelException } from '../../../../ktor-ktor-io/io/ktor/utils/io/Exceptions.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { CoroutineName2g5zosw74tf0f as CoroutineName } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineName.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_PongerCoroutineName() {
  _init_properties_PingPong_kt__9aqxey();
  return PongerCoroutineName;
}
var PongerCoroutineName;
function get_PingerCoroutineName() {
  _init_properties_PingPong_kt__9aqxey();
  return PingerCoroutineName;
}
var PingerCoroutineName;
function ponger(_this__u8e3s4, outgoing) {
  _init_properties_PingPong_kt__9aqxey();
  var channel = Channel(5);
  var tmp = get_PongerCoroutineName();
  launch(_this__u8e3s4, tmp, VOID, ponger$slambda_0(channel, outgoing, null));
  return channel;
}
function pinger(_this__u8e3s4, outgoing, periodMillis, timeoutMillis, onTimeout) {
  _init_properties_PingPong_kt__9aqxey();
  var actorJob = Job();
  var channel = Channel(2147483647);
  var tmp = actorJob.ir(get_PingerCoroutineName());
  launch(_this__u8e3s4, tmp, VOID, pinger$slambda_0(periodMillis, timeoutMillis, onTimeout, channel, outgoing, null));
  var tmp_0 = ensureNotNull(_this__u8e3s4.w20().sd(Key_instance));
  tmp_0.z21(pinger$lambda(actorJob));
  return channel;
}
var ponger$slambdaClass;
function ponger$slambda() {
  if (ponger$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($channel, $outgoing, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.c4h_1 = $channel;
        $box.d4h_1 = $outgoing;
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
                this.gd_1 = 14;
                this.gd_1 = 13;
                var tmp_0 = this;
                tmp_0.f4h_1 = this.c4h_1;
                this.g4h_1 = this.f4h_1;
                var tmp_1 = this;
                tmp_1.h4h_1 = this.g4h_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.j4h_1 = this.h4h_1;
                this.k4h_1 = null;
                this.fd_1 = 2;
                continue $sm;
              case 2:
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.gd_1 = 10;
                this.gd_1 = 9;
                var tmp_2 = this;
                tmp_2.m4h_1 = this.j4h_1;
                this.n4h_1 = this.m4h_1;
                this.o4h_1 = this.n4h_1.x();
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.fd_1 = 5;
                suspendResult = this.o4h_1.n2i(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                if (!suspendResult) {
                  this.fd_1 = 7;
                  continue $sm;
                }

                this.p4h_1 = this.o4h_1.z();
                var tmp_3 = this;
                tmp_3.q4h_1 = this.p4h_1;
                this.r4h_1 = this.q4h_1;
                get_LOGGER().u3n('Received ping message, sending pong message');
                this.fd_1 = 6;
                suspendResult = this.d4h_1.l2l(Pong().n4c(this.r4h_1.a4f_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 6:
                this.fd_1 = 4;
                continue $sm;
              case 7:
                var tmp_4 = this;
                tmp_4.l4h_1 = Unit_instance;
                this.fd_1 = 8;
                var tmp_5 = this;
                continue $sm;
              case 8:
                this.gd_1 = 13;
                var tmp_6 = this;
                cancelConsumed(this.j4h_1, this.k4h_1);
                tmp_6.i4h_1 = Unit_instance;
                this.fd_1 = 12;
                continue $sm;
              case 9:
                this.gd_1 = 10;
                var tmp_7 = this.id_1;
                if (tmp_7 instanceof Error) {
                  var e = this.id_1;
                  var tmp_8 = this;
                  this.k4h_1 = e;
                  throw e;
                } else {
                  throw this.id_1;
                }

              case 10:
                this.gd_1 = 13;
                var t = this.id_1;
                cancelConsumed(this.j4h_1, this.k4h_1);
                throw t;
              case 11:
                this.gd_1 = 13;
                cancelConsumed(this.j4h_1, this.k4h_1);
                if (false) {
                  this.fd_1 = 1;
                  continue $sm;
                }

                this.fd_1 = 12;
                continue $sm;
              case 12:
                this.gd_1 = 14;
                this.fd_1 = 15;
                continue $sm;
              case 13:
                this.gd_1 = 14;
                var tmp_9 = this.id_1;
                if (tmp_9 instanceof ClosedSendChannelException()) {
                  var _unused_var__etf5q3 = this.id_1;
                  this.fd_1 = 15;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 14:
                throw this.id_1;
              case 15:
                this.gd_1 = 14;
                return Unit_instance;
            }
          } catch ($p) {
            var e_0 = $p;
            if (this.gd_1 === 14) {
              throw e_0;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_0;
            }
          }
         while (true);
      }
      y3e($this$launch, completion) {
        var i = new (ponger$slambda())(this.c4h_1, this.d4h_1, completion);
        i.e4h_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    ponger$slambdaClass = $;
  }
  return ponger$slambdaClass;
}
function ponger$slambda_0($channel, $outgoing, resultContinuation) {
  var i = new (ponger$slambda())($channel, $outgoing, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var pinger$slambda$slambdaClass;
function pinger$slambda$slambda() {
  if (pinger$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($channel, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.a4i_1 = $channel;
        super(resultContinuation, $box);
      }
      x3e($this$withTimeoutOrNull, $completion) {
        var tmp = this.y3e($this$withTimeoutOrNull, $completion);
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
                continue $sm;
              case 1:
                if (!true) {
                  this.fd_1 = 4;
                  continue $sm;
                }

                this.fd_1 = 2;
                suspendResult = this.a4i_1.p2l(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.fd_1 = 1;
                continue $sm;
              case 3:
                throw this.id_1;
              case 4:
                return Unit_instance;
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
      y3e($this$withTimeoutOrNull, completion) {
        var i = new (pinger$slambda$slambda())(this.a4i_1, completion);
        i.b4i_1 = $this$withTimeoutOrNull;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    pinger$slambda$slambdaClass = $;
  }
  return pinger$slambda$slambdaClass;
}
function pinger$slambda$slambda_0($channel, resultContinuation) {
  var i = new (pinger$slambda$slambda())($channel, resultContinuation);
  var l = function ($this$withTimeoutOrNull, $completion) {
    return i.x3e($this$withTimeoutOrNull, $completion);
  };
  l.$arity = 1;
  return l;
}
var pinger$slambda$slambdaClass_0;
function pinger$slambda$slambda_1() {
  if (pinger$slambda$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($outgoing, $pingMessage, $channel, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.k4i_1 = $outgoing;
        $box.l4i_1 = $pingMessage;
        $box.m4i_1 = $channel;
        super(resultContinuation, $box);
      }
      x3e($this$withTimeoutOrNull, $completion) {
        var tmp = this.y3e($this$withTimeoutOrNull, $completion);
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
                this.gd_1 = 6;
                get_LOGGER().u3n('WebSocket Pinger: sending ping frame');
                this.fd_1 = 1;
                suspendResult = this.k4i_1.l2l(Ping().v4i(toByteArray(this.l4i_1, Charsets_getInstance().b3g_1)), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.fd_1 = 2;
                continue $sm;
              case 2:
                if (!true) {
                  this.fd_1 = 5;
                  continue $sm;
                }

                this.fd_1 = 3;
                suspendResult = this.m4i_1.p2l(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 3:
                var msg = suspendResult;
                if (decodeToString(msg.a4f_1, 0, 0 + msg.a4f_1.length | 0) === this.l4i_1) {
                  get_LOGGER().u3n('WebSocket Pinger: received valid pong frame ' + msg.toString());
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  this.fd_1 = 4;
                  continue $sm;
                }

              case 4:
                get_LOGGER().u3n('WebSocket Pinger: received invalid pong frame ' + msg.toString() + ', continue waiting');
                this.fd_1 = 2;
                continue $sm;
              case 5:
                return Unit_instance;
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
      y3e($this$withTimeoutOrNull, completion) {
        var i = new (pinger$slambda$slambda_1())(this.k4i_1, this.l4i_1, this.m4i_1, completion);
        i.n4i_1 = $this$withTimeoutOrNull;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    pinger$slambda$slambdaClass_0 = $;
  }
  return pinger$slambda$slambdaClass_0;
}
function pinger$slambda$slambda_2($outgoing, $pingMessage, $channel, resultContinuation) {
  var i = new (pinger$slambda$slambda_1())($outgoing, $pingMessage, $channel, resultContinuation);
  var l = function ($this$withTimeoutOrNull, $completion) {
    return i.x3e($this$withTimeoutOrNull, $completion);
  };
  l.$arity = 1;
  return l;
}
var pinger$slambdaClass;
function pinger$slambda() {
  if (pinger$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($periodMillis, $timeoutMillis, $onTimeout, $channel, $outgoing, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.e4j_1 = $periodMillis;
        $box.f4j_1 = $timeoutMillis;
        $box.g4j_1 = $onTimeout;
        $box.h4j_1 = $channel;
        $box.i4j_1 = $outgoing;
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
                this.gd_1 = 9;
                get_LOGGER().u3n('Starting WebSocket pinger coroutine with period ' + this.e4j_1.toString() + ' ms and timeout ' + this.f4j_1.toString() + ' ms');
                this.k4j_1 = Random(getTimeMillis());
                this.l4j_1 = new Int8Array(32);
                this.gd_1 = 7;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!true) {
                  this.fd_1 = 6;
                  continue $sm;
                }

                this.fd_1 = 2;
                suspendResult = withTimeoutOrNull(this.e4j_1, pinger$slambda$slambda_0(this.h4j_1, null), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.k4j_1.wr(this.l4j_1);
                this.m4j_1 = '[ping ' + hex(this.l4j_1) + ' ping]';
                this.fd_1 = 3;
                suspendResult = withTimeoutOrNull(this.f4j_1, pinger$slambda$slambda_2(this.i4j_1, this.m4j_1, this.h4j_1, null), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 3:
                this.n4j_1 = suspendResult;
                if (this.n4j_1 == null) {
                  get_LOGGER().u3n('WebSocket pinger has timed out');
                  this.fd_1 = 5;
                  suspendResult = this.g4j_1(CloseReason().u49(Codes_INTERNAL_ERROR_getInstance(), 'Ping timeout'), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 4;
                  continue $sm;
                }

              case 4:
                this.fd_1 = 1;
                continue $sm;
              case 5:
                this.fd_1 = 6;
                continue $sm;
              case 6:
                this.gd_1 = 9;
                this.fd_1 = 8;
                continue $sm;
              case 7:
                this.gd_1 = 9;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof CancellationException()) {
                  var ignore = this.id_1;
                  this.fd_1 = 8;
                  continue $sm;
                } else {
                  var tmp_1 = this.id_1;
                  if (tmp_1 instanceof ClosedReceiveChannelException()) {
                    var ignore_0 = this.id_1;
                    this.fd_1 = 8;
                    continue $sm;
                  } else {
                    var tmp_2 = this.id_1;
                    if (tmp_2 instanceof ClosedSendChannelException()) {
                      var ignore_1 = this.id_1;
                      this.fd_1 = 8;
                      continue $sm;
                    } else {
                      var tmp_3 = this.id_1;
                      if (tmp_3 instanceof ClosedByteChannelException()) {
                        var ignore_2 = this.id_1;
                        this.fd_1 = 8;
                        continue $sm;
                      } else {
                        throw this.id_1;
                      }
                    }
                  }
                }

              case 8:
                this.gd_1 = 9;
                return Unit_instance;
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
      y3e($this$launch, completion) {
        var i = new (pinger$slambda())(this.e4j_1, this.f4j_1, this.g4j_1, this.h4j_1, this.i4j_1, completion);
        i.j4j_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    pinger$slambdaClass = $;
  }
  return pinger$slambdaClass;
}
function pinger$slambda_0($periodMillis, $timeoutMillis, $onTimeout, $channel, $outgoing, resultContinuation) {
  var i = new (pinger$slambda())($periodMillis, $timeoutMillis, $onTimeout, $channel, $outgoing, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
function pinger$lambda($actorJob) {
  return function (it) {
    $actorJob.h22();
    return Unit_instance;
  };
}
var properties_initialized_PingPong_kt_fbfhmc;
function _init_properties_PingPong_kt__9aqxey() {
  if (!properties_initialized_PingPong_kt_fbfhmc) {
    properties_initialized_PingPong_kt_fbfhmc = true;
    PongerCoroutineName = new (CoroutineName())('ws-ponger');
    PingerCoroutineName = new (CoroutineName())('ws-pinger');
  }
}
//region block: exports
export {
  pinger as pingerd16zvjbf6m9o,
  ponger as ponger270tezdl2mu68,
};
//endregion

//# sourceMappingURL=PingPong.mjs.map
