import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { HttpClientEngineCapability33x11oaa7ywe5 as HttpClientEngineCapability } from '../engine/HttpClientEngineCapability.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IOException1wyutdmfe71nu as IOException } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/-PlatformJs.mjs';
import {
  toString1pkumu07cwy4m as toString,
  captureStack1fzi4aczwc4hg as captureStack,
  createThis2j2avj17cvnv2 as createThis,
  equals2au1ep9vhcato as equals,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { CopyableThrowable1mvc99jcyvivf as CopyableThrowable } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Debug.common.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  getKClass1s3j9wy1cofik as getKClass,
  getKClassFromExpression3vpejubogshaw as getKClassFromExpression,
} from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { ClientUpgradeContent299vg0lx1tyfp as ClientUpgradeContent } from '../request/ClientUpgradeContent.mjs';
import { isWebsocket1w1xog9vfgwm1 as isWebsocket } from '../../../../../ktor-ktor-http/io/ktor/http/URLProtocol.mjs';
import { SSEClientContent14bbfeddoyr65 as SSEClientContent } from './sse/SSEClientContent.mjs';
import { CoroutineName2g5zosw74tf0f as CoroutineName } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineName.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import {
  Send_instance19u839hbvwh8q as Send_instance,
  Sender1wtdgti85uk42 as Sender,
} from './api/CommonHooks.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder } from '../request/HttpRequest.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { delayolwo40i9ucjz as delay } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Delay.mjs';
import { get_isTraceEnabled82xibuu04nxp as get_isTraceEnabled } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/LoggerJs.mjs';
import { cancel1xim2hrvjmwpn as cancel } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
import { createClientPluginjwpvufjows5r as createClientPlugin } from './api/CreatePluginUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_LOGGER() {
  _init_properties_HttpTimeout_kt__pucqrr();
  return LOGGER;
}
var LOGGER;
function get_HttpTimeout() {
  _init_properties_HttpTimeout_kt__pucqrr();
  return HttpTimeout;
}
var HttpTimeout;
var HttpTimeoutCapabilityClass;
function HttpTimeoutCapability() {
  if (HttpTimeoutCapabilityClass === VOID) {
    class $ {
      toString() {
        return 'HttpTimeoutCapability';
      }
      hashCode() {
        return 2058496954;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof HttpTimeoutCapability()))
          return false;
        other instanceof HttpTimeoutCapability() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'HttpTimeoutCapability', VOID, VOID, [HttpClientEngineCapability()]);
    HttpTimeoutCapabilityClass = $;
  }
  return HttpTimeoutCapabilityClass;
}
var HttpTimeoutCapability_instance;
function HttpTimeoutCapability_getInstance() {
  return HttpTimeoutCapability_instance;
}
var HttpRequestTimeoutExceptionClass;
function HttpRequestTimeoutException() {
  if (HttpRequestTimeoutExceptionClass === VOID) {
    class $ extends IOException() {
      static m5h(url, timeoutMillis, cause) {
        cause = cause === VOID ? null : cause;
        var $this = this.w32('Request timeout has expired [url=' + url + ', request_timeout=' + toString(timeoutMillis == null ? 'unknown' : timeoutMillis) + ' ms]', cause);
        captureStack($this, $this.l5h_1);
        $this.j5h_1 = url;
        $this.k5h_1 = timeoutMillis;
        return $this;
      }
      static n5h(request) {
        var tmp = request.g4q_1.i40();
        var tmp0_safe_receiver = request.o5h(HttpTimeoutCapability_instance);
        return this.m5h(tmp, tmp0_safe_receiver == null ? null : tmp0_safe_receiver.s5h());
      }
      z28() {
        return HttpRequestTimeoutException().m5h(this.j5h_1, this.k5h_1, this.cause);
      }
    }
    initMetadataForClass($, 'HttpRequestTimeoutException', VOID, VOID, [IOException(), CopyableThrowable()]);
    HttpRequestTimeoutExceptionClass = $;
  }
  return HttpRequestTimeoutExceptionClass;
}
function checkTimeoutValue($this, value) {
  // Inline function 'kotlin.require' call
  if (!(value == null || value.d2(new (Long())(0, 0)) > 0)) {
    var message = 'Only positive timeout values are allowed, for infinite timeout use HttpTimeoutConfig.INFINITE_TIMEOUT_MS';
    throw IllegalArgumentException().q(toString(message));
  }
  return value;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.t5h_1 = new (Long())(-1, 2147483647);
        var tmp = this;
        // Inline function 'io.ktor.util.AttributeKey' call
        var name = 'TimeoutConfiguration';
        // Inline function 'io.ktor.util.reflect.typeInfo' call
        var tmp_0 = getKClass(HttpTimeoutConfig());
        // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
        var tmp_1;
        try {
          tmp_1 = createKType(getKClass(HttpTimeoutConfig()), arrayOf([]), false);
        } catch ($p) {
          var tmp_2;
          if ($p instanceof Error) {
            var _unused_var__etf5q3 = $p;
            tmp_2 = null;
          } else {
            throw $p;
          }
          tmp_1 = tmp_2;
        }
        var tmp$ret$0 = tmp_1;
        var tmp$ret$1 = new (TypeInfo())(tmp_0, tmp$ret$0);
        tmp.u5h_1 = new (AttributeKey())(name, tmp$ret$1);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function init_io_ktor_client_plugins_HttpTimeoutConfig(_this__u8e3s4) {
  Companion_getInstance();
  _this__u8e3s4.p5h_1 = new (Long())(0, 0);
  _this__u8e3s4.q5h_1 = new (Long())(0, 0);
  _this__u8e3s4.r5h_1 = new (Long())(0, 0);
}
var HttpTimeoutConfigClass;
function HttpTimeoutConfig() {
  if (HttpTimeoutConfigClass === VOID) {
    class $ {
      static v5h(requestTimeoutMillis, connectTimeoutMillis, socketTimeoutMillis) {
        Companion_getInstance();
        requestTimeoutMillis = requestTimeoutMillis === VOID ? null : requestTimeoutMillis;
        connectTimeoutMillis = connectTimeoutMillis === VOID ? null : connectTimeoutMillis;
        socketTimeoutMillis = socketTimeoutMillis === VOID ? null : socketTimeoutMillis;
        var $this = createThis(this);
        init_io_ktor_client_plugins_HttpTimeoutConfig($this);
        $this.w5h(requestTimeoutMillis);
        $this.x5h(connectTimeoutMillis);
        $this.y5h(socketTimeoutMillis);
        return $this;
      }
      w5h(value) {
        this.p5h_1 = checkTimeoutValue(this, value);
      }
      s5h() {
        return this.p5h_1;
      }
      x5h(value) {
        this.q5h_1 = checkTimeoutValue(this, value);
      }
      z5h() {
        return this.q5h_1;
      }
      y5h(value) {
        this.r5h_1 = checkTimeoutValue(this, value);
      }
      a5i() {
        return this.r5h_1;
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof HttpTimeoutConfig()))
          THROW_CCE();
        if (!equals(this.p5h_1, other.p5h_1))
          return false;
        if (!equals(this.q5h_1, other.q5h_1))
          return false;
        if (!equals(this.r5h_1, other.r5h_1))
          return false;
        return true;
      }
      hashCode() {
        var tmp0_safe_receiver = this.p5h_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.hashCode();
        var result = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        var tmp = imul(31, result);
        var tmp2_safe_receiver = this.q5h_1;
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.hashCode();
        result = tmp + (tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs) | 0;
        var tmp_0 = imul(31, result);
        var tmp4_safe_receiver = this.r5h_1;
        var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.hashCode();
        result = tmp_0 + (tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs) | 0;
        return result;
      }
    }
    initMetadataForClass($, 'HttpTimeoutConfig', $.v5h);
    HttpTimeoutConfigClass = $;
  }
  return HttpTimeoutConfigClass;
}
function get_supportsRequestTimeout(_this__u8e3s4) {
  _init_properties_HttpTimeout_kt__pucqrr();
  var tmp;
  var tmp_0;
  if (!isWebsocket(_this__u8e3s4.g4q_1.y3y())) {
    var tmp_1 = _this__u8e3s4.j4q_1;
    tmp_0 = !(tmp_1 instanceof ClientUpgradeContent());
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    var tmp_2 = _this__u8e3s4.j4q_1;
    tmp = !(tmp_2 instanceof SSEClientContent());
  } else {
    tmp = false;
  }
  return tmp;
}
function applyRequestTimeout(_this__u8e3s4, request, requestTimeout) {
  _init_properties_HttpTimeout_kt__pucqrr();
  if (requestTimeout == null || equals(requestTimeout, new (Long())(-1, 2147483647)))
    return Unit_instance;
  var executionContext = request.k4q_1;
  var tmp = new (CoroutineName())('request-timeout');
  var killer = launch(_this__u8e3s4, tmp, VOID, applyRequestTimeout$slambda_0(requestTimeout, request, executionContext, null));
  var tmp_0 = request.k4q_1;
  tmp_0.z21(applyRequestTimeout$lambda(killer));
}
function timeout(_this__u8e3s4, block) {
  _init_properties_HttpTimeout_kt__pucqrr();
  var tmp = HttpTimeoutCapability_instance;
  // Inline function 'kotlin.apply' call
  var this_0 = HttpTimeoutConfig().v5h();
  block(this_0);
  return _this__u8e3s4.b5i(tmp, this_0);
}
function HttpTimeoutConfig$_init_$ref_dl1k0m() {
  return function () {
    return HttpTimeoutConfig().v5h();
  };
}
function HttpTimeout$lambda($this$createClientPlugin) {
  _init_properties_HttpTimeout_kt__pucqrr();
  var requestTimeoutMillis = $this$createClientPlugin.c50_1.s5h();
  var connectTimeoutMillis = $this$createClientPlugin.c50_1.z5h();
  var socketTimeoutMillis = $this$createClientPlugin.c50_1.a5i();
  var tmp = Send_instance;
  $this$createClientPlugin.f50(tmp, HttpTimeout$lambda$slambda_0(connectTimeoutMillis, socketTimeoutMillis, requestTimeoutMillis, null));
  return Unit_instance;
}
function invoke$hasNotNullTimeouts(requestTimeoutMillis, connectTimeoutMillis, socketTimeoutMillis, supportsRequestTimeout) {
  return supportsRequestTimeout && !(requestTimeoutMillis == null) || !(connectTimeoutMillis == null) || !(socketTimeoutMillis == null);
}
var HttpTimeout$lambda$slambdaClass;
function HttpTimeout$lambda$slambda() {
  if (HttpTimeout$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($connectTimeoutMillis, $socketTimeoutMillis, $requestTimeoutMillis, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.k5i_1 = $connectTimeoutMillis;
        $box.l5i_1 = $socketTimeoutMillis;
        $box.m5i_1 = $requestTimeoutMillis;
        super(resultContinuation, $box);
      }
      m59($this$on, request, $completion) {
        var tmp = this.n59($this$on, request, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = p1 instanceof Sender() ? p1 : THROW_CCE();
        return this.m59(tmp, p2 instanceof HttpRequestBuilder() ? p2 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.p5i_1 = get_supportsRequestTimeout(this.o5i_1);
                this.q5i_1 = this.o5i_1.o5h(HttpTimeoutCapability_instance);
                if (this.q5i_1 == null && invoke$hasNotNullTimeouts(this.m5i_1, this.k5i_1, this.l5i_1, this.p5i_1)) {
                  this.q5i_1 = HttpTimeoutConfig().v5h();
                  this.o5i_1.b5i(HttpTimeoutCapability_instance, this.q5i_1);
                }

                var tmp0_safe_receiver = this.q5i_1;
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  var tmp0_elvis_lhs = tmp0_safe_receiver.z5h();
                  tmp0_safe_receiver.x5h(tmp0_elvis_lhs == null ? this.k5i_1 : tmp0_elvis_lhs);
                  var tmp1_elvis_lhs = tmp0_safe_receiver.a5i();
                  tmp0_safe_receiver.y5h(tmp1_elvis_lhs == null ? this.l5i_1 : tmp1_elvis_lhs);
                  if (this.p5i_1) {
                    var tmp2_elvis_lhs = tmp0_safe_receiver.s5h();
                    tmp0_safe_receiver.w5h(tmp2_elvis_lhs == null ? this.m5i_1 : tmp2_elvis_lhs);
                    applyRequestTimeout(this.n5i_1, this.o5i_1, tmp0_safe_receiver.s5h());
                  }
                }

                this.fd_1 = 1;
                suspendResult = this.n5i_1.q59(this.o5i_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return suspendResult;
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
      n59($this$on, request, completion) {
        var i = new (HttpTimeout$lambda$slambda())(this.k5i_1, this.l5i_1, this.m5i_1, completion);
        i.n5i_1 = $this$on;
        i.o5i_1 = request;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpTimeout$lambda$slambdaClass = $;
  }
  return HttpTimeout$lambda$slambdaClass;
}
function HttpTimeout$lambda$slambda_0($connectTimeoutMillis, $socketTimeoutMillis, $requestTimeoutMillis, resultContinuation) {
  var i = new (HttpTimeout$lambda$slambda())($connectTimeoutMillis, $socketTimeoutMillis, $requestTimeoutMillis, resultContinuation);
  var l = function ($this$on, request, $completion) {
    return i.m59($this$on, request, $completion);
  };
  l.$arity = 2;
  return l;
}
var applyRequestTimeout$slambdaClass;
function applyRequestTimeout$slambda() {
  if (applyRequestTimeout$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($requestTimeout, $request, $executionContext, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.z5i_1 = $requestTimeout;
        $box.a5j_1 = $request;
        $box.b5j_1 = $executionContext;
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
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = delay(this.z5i_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var cause = HttpRequestTimeoutException().n5h(this.a5j_1);
                var this_0 = get_LOGGER();
                if (get_isTraceEnabled(this_0)) {
                  this_0.u3n('Request timeout: ' + this.a5j_1.g4q_1.toString());
                }

                cancel(this.b5j_1, ensureNotNull(cause.message), cause);
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
      y3e($this$launch, completion) {
        var i = new (applyRequestTimeout$slambda())(this.z5i_1, this.a5j_1, this.b5j_1, completion);
        i.c5j_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    applyRequestTimeout$slambdaClass = $;
  }
  return applyRequestTimeout$slambdaClass;
}
function applyRequestTimeout$slambda_0($requestTimeout, $request, $executionContext, resultContinuation) {
  var i = new (applyRequestTimeout$slambda())($requestTimeout, $request, $executionContext, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
function applyRequestTimeout$lambda($killer) {
  return function (it) {
    $killer.h22();
    return Unit_instance;
  };
}
var properties_initialized_HttpTimeout_kt_9oyjbd;
function _init_properties_HttpTimeout_kt__pucqrr() {
  if (!properties_initialized_HttpTimeout_kt_9oyjbd) {
    properties_initialized_HttpTimeout_kt_9oyjbd = true;
    LOGGER = KtorSimpleLogger('io.ktor.client.plugins.HttpTimeout');
    var tmp = HttpTimeoutConfig$_init_$ref_dl1k0m();
    HttpTimeout = createClientPlugin('HttpTimeout', tmp, HttpTimeout$lambda);
  }
}
//region block: init
HttpTimeoutCapability_instance = new (HttpTimeoutCapability())();
//endregion
//region block: exports
export {
  HttpTimeoutCapability_instance as HttpTimeoutCapability_instance17ok7dpkdbr0y,
  get_HttpTimeout as get_HttpTimeout3mcrbvfnvmyx2,
  timeout as timeout39ggydbhmf7b9,
};
//endregion

//# sourceMappingURL=HttpTimeout.mjs.map
