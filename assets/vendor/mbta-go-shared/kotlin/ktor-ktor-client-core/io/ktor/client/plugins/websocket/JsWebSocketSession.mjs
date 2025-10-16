import {
  Companion_getInstance3hj6iykoiauw8 as Companion_getInstance,
  Codes_CLOSED_ABNORMALLY_getInstance36fk4x8bui0mi as Codes_CLOSED_ABNORMALLY_getInstance,
  CloseReason10cphaqpp3ct7 as CloseReason,
  Codes_NORMAL_getInstance2p2d63s1iongn as Codes_NORMAL_getInstance,
} from '../../../../../../ktor-ktor-websockets/io/ktor/websocket/CloseReason.mjs';
import {
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  Text3e6ukp9joohql as Text,
  Binary3tlzyfojm51s4 as Binary,
  Close3tx65evcwi73t as Close,
} from '../../../../../../ktor-ktor-websockets/io/ktor/websocket/FrameJs.mjs';
import { WebSocketExceptionb5mwyitzck0i as WebSocketException } from './WebSockets.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { decodeToString1dbzcjd620q25 as decodeToString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { writeFully359t6q8kam2g5 as writeFully } from '../../../../../../ktor-ktor-io/io/ktor/utils/io/core/BytePacketBuilder.mjs';
import { readText3frapgncbqrcg as readText } from '../../../../../../ktor-ktor-io/io/ktor/utils/io/Deprecation.mjs';
import { cancelConsumed2i0oizqhmljf6 as cancelConsumed } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/channels/Channels.common.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { CompletableDeferred2lnqvsbvx74d3 as CompletableDeferred } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CompletableDeferred.mjs';
import { Channel3r72atmcithql as Channel } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/channels/Channel.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { Key_instance2tirv2rj82ml4 as Key_instance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { sendvcq8td68z5o6 as send } from '../../../../../../ktor-ktor-websockets/io/ktor/websocket/WebSocketSession.mjs';
import { DefaultWebSocketSession3h8506yqzs5fx as DefaultWebSocketSession } from '../../../../../../ktor-ktor-websockets/io/ktor/websocket/DefaultWebSocketSession.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function isReservedStatusCode($this, _this__u8e3s4) {
  // Inline function 'kotlin.let' call
  var resolved = Companion_getInstance().q49(_this__u8e3s4);
  return resolved == null || equals(resolved, Codes_CLOSED_ABNORMALLY_getInstance());
}
function JsWebSocketSession$lambda(this$0) {
  return function (it) {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var event = it;
    var data = event.data;
    var tmp;
    if (data instanceof ArrayBuffer) {
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$3 = new Int8Array(data);
      tmp = Binary().n4k(true, tmp$ret$3);
    } else {
      if (!(data == null) ? typeof data === 'string' : false) {
        tmp = Text().x4k(data);
      } else {
        var error = IllegalStateException().o5('Unknown frame type: ' + event.type);
        this$0.j5y_1.h28(error);
        throw error;
      }
    }
    var frame = tmp;
    this$0.k5y_1.m2l(frame);
    return Unit_instance;
  };
}
function JsWebSocketSession$lambda_0(this$0) {
  return function (it) {
    var cause = WebSocketException().m5n(toString(it));
    this$0.j5y_1.h28(cause);
    this$0.k5y_1.w2l(cause);
    this$0.l5y_1.a2m();
    return Unit_instance;
  };
}
function JsWebSocketSession$lambda_1(this$0) {
  return function (event) {
    var tmp = event.code;
    var tmp_0 = (!(tmp == null) ? typeof tmp === 'number' : false) ? tmp : THROW_CCE();
    var tmp_1 = event.reason;
    var reason = CloseReason().t49(tmp_0, (!(tmp_1 == null) ? typeof tmp_1 === 'string' : false) ? tmp_1 : THROW_CCE());
    this$0.j5y_1.g28(reason);
    this$0.k5y_1.m2l(Close().x4e(reason));
    this$0.k5y_1.y2l();
    this$0.l5y_1.a2m();
    return Unit_instance;
  };
}
var JsWebSocketSession$slambdaClass;
function JsWebSocketSession$slambda() {
  if (JsWebSocketSession$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.x5y_1 = this$0;
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
                var tmp_0 = this;
                tmp_0.z5y_1 = this.x5y_1.l5y_1;
                this.a5z_1 = this.z5y_1;
                var tmp_1 = this;
                tmp_1.b5z_1 = this.a5z_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.d5z_1 = this.b5z_1;
                this.e5z_1 = null;
                this.fd_1 = 2;
                continue $sm;
              case 2:
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.gd_1 = 9;
                this.gd_1 = 8;
                var tmp_2 = this;
                tmp_2.g5z_1 = this.d5z_1;
                this.h5z_1 = this.g5z_1;
                this.i5z_1 = this.h5z_1.x();
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.fd_1 = 5;
                suspendResult = this.i5z_1.n2i(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                if (!suspendResult) {
                  this.fd_1 = 6;
                  continue $sm;
                }

                var e = this.i5z_1.z();
                switch (e.z4e_1.x3_1) {
                  case 0:
                    var text = e.a4f_1;
                    this.x5y_1.i5y_1.send(decodeToString(text, 0, 0 + text.length | 0));
                    break;
                  case 1:
                    var tmp_3 = e.a4f_1;
                    var source = tmp_3 instanceof Int8Array ? tmp_3 : THROW_CCE();
                    var frameData = source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength | 0);
                    this.x5y_1.i5y_1.send(frameData);
                    break;
                  case 2:
                    var builder = new (Buffer())();
                    writeFully(builder, e.a4f_1);
                    var data = builder;
                    var code = data.g30();
                    var reason = readText(data);
                    this.x5y_1.j5y_1.g28(CloseReason().t49(code, reason));
                    if (isReservedStatusCode(this.x5y_1, code)) {
                      this.x5y_1.i5y_1.close();
                    } else {
                      this.x5y_1.i5y_1.close(code, reason);
                    }

                    break;
                  case 3:
                  case 4:
                    break;
                  default:
                    noWhenBranchMatchedException();
                    break;
                }

                this.fd_1 = 4;
                continue $sm;
              case 6:
                var tmp_4 = this;
                tmp_4.f5z_1 = Unit_instance;
                this.gd_1 = 10;
                this.fd_1 = 7;
                var tmp_5 = this;
                continue $sm;
              case 7:
                this.gd_1 = 10;
                var tmp_6 = this;
                cancelConsumed(this.d5z_1, this.e5z_1);
                tmp_6.c5z_1 = Unit_instance;
                this.fd_1 = 12;
                continue $sm;
              case 8:
                this.gd_1 = 9;
                var tmp_7 = this.id_1;
                if (tmp_7 instanceof Error) {
                  var e_0 = this.id_1;
                  var tmp_8 = this;
                  this.e5z_1 = e_0;
                  throw e_0;
                } else {
                  throw this.id_1;
                }

              case 9:
                this.gd_1 = 10;
                var t = this.id_1;
                cancelConsumed(this.d5z_1, this.e5z_1);
                throw t;
              case 10:
                throw this.id_1;
              case 11:
                this.gd_1 = 10;
                cancelConsumed(this.d5z_1, this.e5z_1);
                if (false) {
                  this.fd_1 = 1;
                  continue $sm;
                }

                this.fd_1 = 12;
                continue $sm;
              case 12:
                return Unit_instance;
            }
          } catch ($p) {
            var e_1 = $p;
            if (this.gd_1 === 10) {
              throw e_1;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_1;
            }
          }
         while (true);
      }
      y3e($this$launch, completion) {
        var i = new (JsWebSocketSession$slambda())(this.x5y_1, completion);
        i.y5y_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    JsWebSocketSession$slambdaClass = $;
  }
  return JsWebSocketSession$slambdaClass;
}
function JsWebSocketSession$slambda_0(this$0, resultContinuation) {
  var i = new (JsWebSocketSession$slambda())(this$0, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
function JsWebSocketSession$lambda_2(this$0) {
  return function (cause) {
    var tmp;
    if (cause == null) {
      this$0.i5y_1.close();
      tmp = Unit_instance;
    } else {
      this$0.i5y_1.close(Codes_NORMAL_getInstance().n49_1, 'Client failed');
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
var JsWebSocketSessionClass;
function JsWebSocketSession() {
  if (JsWebSocketSessionClass === VOID) {
    class $ {
      constructor(coroutineContext, websocket) {
        this.h5y_1 = coroutineContext;
        this.i5y_1 = websocket;
        this.j5y_1 = CompletableDeferred();
        this.k5y_1 = Channel(2147483647);
        this.l5y_1 = Channel(2147483647);
        this.m5y_1 = this.k5y_1;
        this.n5y_1 = this.l5y_1;
        this.o5y_1 = this.j5y_1;
        // Inline function 'org.w3c.dom.ARRAYBUFFER' call
        // Inline function 'kotlin.js.asDynamic' call
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp$ret$2 = 'arraybuffer';
        this.i5y_1.binaryType = tmp$ret$2;
        this.i5y_1.addEventListener('message', JsWebSocketSession$lambda(this));
        this.i5y_1.addEventListener('error', JsWebSocketSession$lambda_0(this));
        this.i5y_1.addEventListener('close', JsWebSocketSession$lambda_1(this));
        launch(this, VOID, VOID, JsWebSocketSession$slambda_0(this, null));
        var tmp0_safe_receiver = this.h5y_1.sd(Key_instance);
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.z21(JsWebSocketSession$lambda_2(this));
        }
      }
      w20() {
        return this.h5y_1;
      }
      z49() {
        return this.m5y_1;
      }
      a4a() {
        return this.n5y_1;
      }
      x49(_) {
        throw WebSocketException().m5n('Max frame size switch is not supported in Js engine.');
      }
      y49() {
        return new (Long())(-1, 2147483647);
      }
      w49(negotiatedExtensions) {
        // Inline function 'kotlin.require' call
        if (!negotiatedExtensions.h1()) {
          var message = 'Extensions are not supported.';
          throw IllegalArgumentException().q(toString(message));
        }
      }
      u35($completion) {
        return Unit_instance;
      }
    }
    protoOf($).b4a = send;
    initMetadataForClass($, 'JsWebSocketSession', VOID, VOID, [DefaultWebSocketSession()], [0, 1]);
    JsWebSocketSessionClass = $;
  }
  return JsWebSocketSessionClass;
}
//region block: exports
export {
  JsWebSocketSession as JsWebSocketSession2h93x4rgbt7zw,
};
//endregion

//# sourceMappingURL=JsWebSocketSession.mjs.map
