import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { callContext1odsh8w96ni1o as callContext } from '../Utils.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { get_CLIENT_CONFIG1oazdiwjd1qe0 as get_CLIENT_CONFIG } from '../HttpClientEngine.mjs';
import {
  isUpgradeRequest3msdo2i9hxs68 as isUpgradeRequest,
  get_ResponseAdapterAttributeKey1ll13ywinsgvd as get_ResponseAdapterAttributeKey,
  HttpResponseData2dozo5khuplr6 as HttpResponseData,
} from '../../request/HttpRequest.mjs';
import { GMTDate36bhedawynxlf as GMTDate } from '../../../../../../ktor-ktor-utils/io/ktor/util/date/DateJs.mjs';
import { toRaw1h0h8pil2htkg as toRaw } from './JsUtils.mjs';
import { Companion_getInstance3d30v5zmeaq83 as Companion_getInstance } from '../../JsRequestUtils.mjs';
import {
  get_job2zvlvce9o9a29 as get_job,
  cancel2en0dn4yvpufo as cancel,
} from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import {
  commonFetch2g1apdy1t4019 as commonFetch,
  readBody4gczno2wau05 as readBody,
} from './compatibility/Utils.mjs';
import {
  HttpStatusCode3o1wkms10pg4k as HttpStatusCode,
  Companion_getInstanceud97dyzf471m as Companion_getInstance_0,
} from '../../../../../../ktor-ktor-http/io/ktor/http/HttpStatusCode.mjs';
import { Companion_getInstance312jiahuid5ey as Companion_getInstance_1 } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpProtocolVersion.mjs';
import { CoroutineScopelux7s7zphw7e as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { equals2v6cggk171b6e as equals } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { flatten2dh4kibw1u0qq as flatten } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { copyToArray2j022khrow2yi as copyToArray } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { await20nhgj9iqzkt as await_0 } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Promise.mjs';
import { PlatformUtils_getInstance350nj2wi6ds9r as PlatformUtils_getInstance } from '../../../../../../ktor-ktor-utils/io/ktor/util/PlatformUtils.mjs';
import { JsWebSocketSession2h93x4rgbt7zw as JsWebSocketSession } from '../../plugins/websocket/JsWebSocketSession.mjs';
import { CancellationExceptionjngvjj221x3v as CancellationException } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Exceptions.mjs';
import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  Companion_getInstance2krh5pmq7pw0k as Companion_getInstance_2,
  headersOf2tgdoojg8tifn as headersOf,
} from '../../../../../../ktor-ktor-http/io/ktor/http/Headers.mjs';
import { HttpClientEngineBase2tgisnw4e4drr as HttpClientEngineBase } from '../HttpClientEngineBase.mjs';
import { HttpTimeoutCapability_instance17ok7dpkdbr0y as HttpTimeoutCapability_instance } from '../../plugins/HttpTimeout.mjs';
import {
  WebSocketCapability_instance1i2v7csb8ym2x as WebSocketCapability_instance,
  WebSocketExceptionb5mwyitzck0i as WebSocketException,
} from '../../plugins/websocket/WebSockets.mjs';
import { SSECapability_instance1wir06c0sdhub as SSECapability_instance } from '../../plugins/sse/SSE.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { buildHeaders3beu05fiq9iq2 as buildHeaders } from '../../utils/headers.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CancellableContinuationImpl.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { dropCompressionHeaders12falb2m2fkr1 as dropCompressionHeaders } from '../../utils/HeadersUtils.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  createFailure8paxfkfa5dc7 as createFailure,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function createWebSocket($this, urlString_capturingHack, headers, $completion) {
  var tmp = new ($createWebSocketCOROUTINE$())($this, urlString_capturingHack, headers, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function executeWebSocketRequest($this, request, callContext, $completion) {
  var tmp = new ($executeWebSocketRequestCOROUTINE$())($this, request, callContext, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function JsClientEngine$execute$lambda(_this__u8e3s4) {
  return Unit_instance;
}
var JsClientEngine$createWebSocket$headers_capturingHack$1Class;
function JsClientEngine$createWebSocket$headers_capturingHack$1() {
  if (JsClientEngine$createWebSocket$headers_capturingHack$1Class === VOID) {
    class $ {}
    initMetadataForClass($);
    JsClientEngine$createWebSocket$headers_capturingHack$1Class = $;
  }
  return JsClientEngine$createWebSocket$headers_capturingHack$1Class;
}
function JsClientEngine$createWebSocket$lambda($headers_capturingHack) {
  return function (name, values) {
    $headers_capturingHack[name] = joinToString(values, ',');
    return Unit_instance;
  };
}
var $executeCOROUTINE$Class;
function $executeCOROUTINE$() {
  if ($executeCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, data, resultContinuation) {
        super(resultContinuation);
        this.w5v_1 = _this__u8e3s4;
        this.x5v_1 = data;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 6;
                this.fd_1 = 1;
                suspendResult = callContext(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.y5v_1 = suspendResult;
                this.z5v_1 = this.x5v_1.n4w_1.f3h(get_CLIENT_CONFIG());
                if (isUpgradeRequest(this.x5v_1)) {
                  this.fd_1 = 5;
                  suspendResult = executeWebSocketRequest(this.w5v_1, this.x5v_1, this.y5v_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 2:
                this.a5w_1 = GMTDate();
                this.fd_1 = 3;
                suspendResult = toRaw(this.x5v_1, this.z5v_1, this.y5v_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 3:
                this.b5w_1 = suspendResult;
                var tmp_0 = this;
                var tmp0_safe_receiver = this.x5v_1.n4w_1.g3h(Companion_getInstance().z5t_1);
                var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.d5w_1;
                var tmp_1;
                if (tmp1_elvis_lhs == null) {
                  tmp_1 = JsClientEngine$execute$lambda;
                } else {
                  tmp_1 = tmp1_elvis_lhs;
                }

                tmp_0.c5w_1 = tmp_1;
                this.fd_1 = 4;
                suspendResult = commonFetch(this.x5v_1.i4w_1.toString(), this.b5w_1, this.c5w_1, this.w5v_1.i5w_1, get_job(this.y5v_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 4:
                var rawResponse = suspendResult;
                var status = new (HttpStatusCode())(rawResponse.status, rawResponse.statusText);
                var headers = mapToKtor(rawResponse.headers, this.x5v_1.j4w_1, this.x5v_1.n4w_1);
                var version = Companion_getInstance_1().w3v_1;
                var body = readBody(CoroutineScope(this.y5v_1), rawResponse);
                var tmp2_safe_receiver = this.x5v_1.n4w_1.g3h(get_ResponseAdapterAttributeKey());
                var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.n5p(this.x5v_1, status, headers, body, this.x5v_1.l4w_1, this.y5v_1);
                var responseBody = tmp3_elvis_lhs == null ? body : tmp3_elvis_lhs;
                return new (HttpResponseData())(status, this.a5w_1, headers, version, responseBody, this.y5v_1);
              case 5:
                return suspendResult;
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
    $executeCOROUTINE$Class = $;
  }
  return $executeCOROUTINE$Class;
}
var $createWebSocketCOROUTINE$Class;
function $createWebSocketCOROUTINE$() {
  if ($createWebSocketCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, urlString_capturingHack, headers, resultContinuation) {
        super(resultContinuation);
        this.r5u_1 = _this__u8e3s4;
        this.s5u_1 = urlString_capturingHack;
        this.t5u_1 = headers;
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
                var tmp0 = this.t5u_1.z3i();
                var destination = ArrayList().g1();
                var _iterator__ex2g4s = tmp0.x();
                while (_iterator__ex2g4s.y()) {
                  var element = _iterator__ex2g4s.z();
                  if (equals(element, HttpHeaders_getInstance().f3t_1, true)) {
                    destination.i(element);
                  }
                }

                tmp_0.u5u_1 = destination;
                var tmp_1 = this;
                var tmp0_0 = this.u5u_1;
                var destination_0 = ArrayList().g1();
                var _iterator__ex2g4s_0 = tmp0_0.x();
                while (_iterator__ex2g4s_0.y()) {
                  var element_0 = _iterator__ex2g4s_0.z();
                  var tmp0_safe_receiver = this.t5u_1.y3i(element_0);
                  if (tmp0_safe_receiver == null)
                    null;
                  else {
                    destination_0.i(tmp0_safe_receiver);
                  }
                }

                var this_0 = flatten(destination_0);
                tmp_1.v5u_1 = copyToArray(this_0);
                if (PlatformUtils_getInstance().p3i_1) {
                  this.w5u_1 = new WebSocket(this.s5u_1, this.v5u_1);
                  this.fd_1 = 2;
                  continue $sm;
                } else {
                  this.x5u_1 = import('ws');
                  this.fd_1 = 1;
                  suspendResult = await_0(this.x5u_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                }

              case 1:
                var ws_capturingHack = suspendResult.default;
                var headers_capturingHack = new (JsClientEngine$createWebSocket$headers_capturingHack$1())();
                this.t5u_1.b3j(JsClientEngine$createWebSocket$lambda(headers_capturingHack));
                this.w5u_1 = new ws_capturingHack(this.s5u_1, this.v5u_1, {headers: headers_capturingHack});
                this.fd_1 = 2;
                continue $sm;
              case 2:
                return this.w5u_1;
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
    $createWebSocketCOROUTINE$Class = $;
  }
  return $createWebSocketCOROUTINE$Class;
}
var $executeWebSocketRequestCOROUTINE$Class;
function $executeWebSocketRequestCOROUTINE$() {
  if ($executeWebSocketRequestCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, request, callContext, resultContinuation) {
        super(resultContinuation);
        this.g5v_1 = _this__u8e3s4;
        this.h5v_1 = request;
        this.i5v_1 = callContext;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 5;
                this.j5v_1 = GMTDate();
                this.k5v_1 = this.h5v_1.i4w_1.toString();
                this.fd_1 = 1;
                suspendResult = createWebSocket(this.g5v_1, this.k5v_1, this.h5v_1.k4w_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.l5v_1 = suspendResult;
                this.m5v_1 = new (JsWebSocketSession())(this.i5v_1, this.l5v_1);
                this.gd_1 = 3;
                this.fd_1 = 2;
                suspendResult = awaitConnection(this.l5v_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.n5v_1 = suspendResult;
                this.gd_1 = 5;
                this.fd_1 = 4;
                continue $sm;
              case 3:
                this.gd_1 = 5;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Error) {
                  var cause = this.id_1;
                  var tmp_1 = this;
                  cancel(this.i5v_1, CancellationException('Failed to connect to ' + this.k5v_1, cause));
                  throw cause;
                } else {
                  throw this.id_1;
                }

              case 4:
                this.gd_1 = 5;
                var this_0 = this.l5v_1.protocol;
                var tmp_2;
                if (charSequenceLength(this_0) > 0) {
                  tmp_2 = this_0;
                } else {
                  tmp_2 = null;
                }

                var protocol = tmp_2;
                var headers = !(protocol == null) ? headersOf(HttpHeaders_getInstance().f3t_1, protocol) : Companion_getInstance_2().o3q_1;
                return new (HttpResponseData())(Companion_getInstance_0().e3w_1, this.j5v_1, headers, Companion_getInstance_1().w3v_1, this.m5v_1, this.i5v_1);
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
    $executeWebSocketRequestCOROUTINE$Class = $;
  }
  return $executeWebSocketRequestCOROUTINE$Class;
}
var JsClientEngineClass;
function JsClientEngine() {
  if (JsClientEngineClass === VOID) {
    class $ extends HttpClientEngineBase() {
      constructor(config) {
        super('ktor-js');
        this.i5w_1 = config;
        this.j5w_1 = setOf([HttpTimeoutCapability_instance, WebSocketCapability_instance, SSECapability_instance]);
        // Inline function 'kotlin.check' call
        if (!(this.i5w_1.f4y_1 == null)) {
          var message = 'Proxy unsupported in Js engine.';
          throw IllegalStateException().o5(toString(message));
        }
      }
      n4q() {
        return this.i5w_1;
      }
      p4w() {
        return this.j5w_1;
      }
      b4y(data, $completion) {
        var tmp = new ($executeCOROUTINE$())(this, data, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    initMetadataForClass($, 'JsClientEngine', VOID, VOID, VOID, [1, 2]);
    JsClientEngineClass = $;
  }
  return JsClientEngineClass;
}
function mapToKtor(_this__u8e3s4, method, attributes) {
  return buildHeaders(mapToKtor$lambda(_this__u8e3s4, method, attributes));
}
function awaitConnection(_this__u8e3s4, $completion) {
  var cancellable = new (CancellableContinuationImpl())(intercepted($completion), 1);
  cancellable.f26();
  $l$block: {
    if (cancellable.t21()) {
      break $l$block;
    }
    var eventListener = awaitConnection$lambda(cancellable, _this__u8e3s4);
    _this__u8e3s4.addEventListener('open', eventListener);
    _this__u8e3s4.addEventListener('error', eventListener);
    cancellable.n24(awaitConnection$lambda_0(_this__u8e3s4, eventListener));
  }
  return cancellable.e23();
}
function asString(_this__u8e3s4) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  var tmp = JSON;
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = ['message', 'target', 'type', 'isTrusted'];
  this_0.hc(tmp.stringify(_this__u8e3s4, tmp$ret$2));
  return this_0.toString();
}
function mapToKtor$lambda$lambda($this_buildHeaders) {
  return function (value, key) {
    $this_buildHeaders.j3j(key, value);
    return Unit_instance;
  };
}
function mapToKtor$lambda($this_mapToKtor, $method, $attributes) {
  return function ($this$buildHeaders) {
    // Inline function 'kotlin.js.asDynamic' call
    $this_mapToKtor.forEach(mapToKtor$lambda$lambda($this$buildHeaders));
    dropCompressionHeaders($this$buildHeaders, $method, $attributes, PlatformUtils_getInstance().p3i_1);
    return Unit_instance;
  };
}
function awaitConnection$lambda($continuation, $this_awaitConnection) {
  return function (event) {
    var tmp0_subject = event.type;
    var tmp;
    if (tmp0_subject === 'open') {
      var tmp0 = $continuation;
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var value = $this_awaitConnection;
      var tmp$ret$0 = _Result___init__impl__xyqfz8(value);
      tmp0.qd(tmp$ret$0);
      tmp = Unit_instance;
    } else if (tmp0_subject === 'error') {
      var tmp0_0 = $continuation;
      // Inline function 'kotlin.coroutines.resumeWithException' call
      // Inline function 'kotlin.Companion.failure' call
      var exception = WebSocketException().m5n(asString(event));
      var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception));
      tmp0_0.qd(tmp$ret$2);
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
function awaitConnection$lambda_0($this_awaitConnection, $eventListener) {
  return function (it) {
    $this_awaitConnection.removeEventListener('open', $eventListener);
    $this_awaitConnection.removeEventListener('error', $eventListener);
    var tmp;
    if (!(it == null)) {
      $this_awaitConnection.close();
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
//region block: exports
export {
  JsClientEngine as JsClientEngine2d6599fsx5fyf,
};
//endregion

//# sourceMappingURL=JsClientEngine.mjs.map
