import {
  get_HttpResponseCancelled3685lnxbzknld as get_HttpResponseCancelled,
  get_HttpRequestIsReadyForSending2qftypei374ml as get_HttpRequestIsReadyForSending,
  get_HttpResponseReceived23ai4hzotyx3a as get_HttpResponseReceived,
} from '../utils/ClientEvents.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Key_instance2tirv2rj82ml4 as Key_instance,
  get_job2zvlvce9o9a29 as get_job,
  Job13y4jkazwjho0 as Job,
} from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder } from '../request/HttpRequest.mjs';
import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  createKType1lgox3mzhchp5 as createKType,
  getStarKTypeProjection2j4m947xjbiiv as getStarKTypeProjection,
} from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import {
  OutgoingContent3t2ohmyam9o76 as OutgoingContent,
  NullBody_instance2i6w0hfghwfg0 as NullBody_instance,
} from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { HttpClientCall2j6myj8ctykar as HttpClientCall } from '../call/HttpClientCall.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { ClientEngineClosedException1qtw9cl0kd5fk as ClientEngineClosedException } from './HttpClientEngineBase.mjs';
import { KtorCallContextElementudwxlrp3zgdl as KtorCallContextElement } from './Utils.mjs';
import { asyncz02dsa2nb2zt as async } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { Phases_getInstance18vqybk3y2ism as Phases_getInstance } from '../request/HttpRequestPipeline.mjs';
import { AutoCloseable1l5p57f9lp7kv as AutoCloseable } from '../../../../../kotlin-kotlin-stdlib/kotlin/AutoCloseableJs.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import {
  HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance,
  UnsafeHeaderException3ncvrrp48xjzq as UnsafeHeaderException,
} from '../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { CoroutineName2g5zosw74tf0f as CoroutineName } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineName.mjs';
import { HttpClientConfigo6p492ed655g as HttpClientConfig } from '../HttpClientConfig.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_CALL_COROUTINE() {
  _init_properties_HttpClientEngine_kt__h91z5h();
  return CALL_COROUTINE;
}
var CALL_COROUTINE;
function get_CLIENT_CONFIG() {
  _init_properties_HttpClientEngine_kt__h91z5h();
  return CLIENT_CONFIG;
}
var CLIENT_CONFIG;
function HttpClientEngine$install$slambda$lambda($client, $response) {
  return function (it) {
    var tmp;
    if (!(it == null)) {
      $client.l4o_1.w4n(get_HttpResponseCancelled(), $response);
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
function _get_closed__iwkfs1($this) {
  var tmp0_safe_receiver = $this.w20().sd(Key_instance);
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.x20();
  return !(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs);
}
function executeWithinCallContext($this, requestData, $completion) {
  var tmp = new ($executeWithinCallContextCOROUTINE$())($this, requestData, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function checkExtensions($this, requestData) {
  var _iterator__ex2g4s = requestData.o4w_1.x();
  while (_iterator__ex2g4s.y()) {
    var requestedExtension = _iterator__ex2g4s.z();
    // Inline function 'kotlin.require' call
    if (!$this.p4w().j1(requestedExtension)) {
      var message = "Engine doesn't support " + toString(requestedExtension);
      throw IllegalArgumentException().q(toString(message));
    }
  }
}
var HttpClientEngine$install$slambdaClass;
function HttpClientEngine$install$slambda() {
  if (HttpClientEngine$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($client, this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.y4w_1 = $client;
        $box.z4w_1 = this$0;
        super(resultContinuation, $box);
      }
      z4o($this$intercept, content, $completion) {
        var tmp = this.a4p($this$intercept, content, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = p1 instanceof PipelineContext() ? p1 : THROW_CCE();
        return this.z4o(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
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
                var this_0 = new (HttpRequestBuilder())();
                this_0.h4x(this.a4x_1.o3m_1);
                var body = this.b4x_1;
                if (body == null) {
                  this_0.j4q_1 = NullBody_instance;
                  var tmp_1 = PrimitiveClasses_getInstance().ci();
                  var tmp_2;
                  try {
                    tmp_2 = createKType(PrimitiveClasses_getInstance().ci(), arrayOf([]), false);
                  } catch ($p) {
                    var tmp_3;
                    if ($p instanceof Error) {
                      var _unused_var__etf5q3 = $p;
                      tmp_3 = null;
                    } else {
                      throw $p;
                    }
                    tmp_2 = tmp_3;
                  }
                  this_0.i4x(new (TypeInfo())(tmp_1, tmp_2));
                } else {
                  if (body instanceof OutgoingContent()) {
                    this_0.j4q_1 = body;
                    this_0.i4x(null);
                  } else {
                    this_0.j4q_1 = body;
                    var tmp_4 = PrimitiveClasses_getInstance().ci();
                    var tmp_5;
                    try {
                      tmp_5 = createKType(PrimitiveClasses_getInstance().ci(), arrayOf([]), false);
                    } catch ($p) {
                      var tmp_6;
                      if ($p instanceof Error) {
                        var _unused_var__etf5q3_0 = $p;
                        tmp_6 = null;
                      } else {
                        throw $p;
                      }
                      tmp_5 = tmp_6;
                    }
                    this_0.i4x(new (TypeInfo())(tmp_4, tmp_5));
                  }
                }

                tmp_0.c4x_1 = this_0;
                this.y4w_1.l4o_1.w4n(get_HttpRequestIsReadyForSending(), this.c4x_1);
                var tmp_7 = this;
                var this_1 = this.c4x_1.r3q();
                this_1.n4w_1.i3h(get_CLIENT_CONFIG(), this.y4w_1.m4o_1);
                tmp_7.d4x_1 = this_1;
                validateHeaders(this.d4x_1);
                checkExtensions(this.z4w_1, this.d4x_1);
                this.fd_1 = 1;
                suspendResult = executeWithinCallContext(this.z4w_1, this.d4x_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.e4x_1 = suspendResult;
                this.f4x_1 = HttpClientCall().t4t(this.y4w_1, this.d4x_1, this.e4x_1);
                this.g4x_1 = this.f4x_1.g4p();
                this.y4w_1.l4o_1.w4n(get_HttpResponseReceived(), this.g4x_1);
                var tmp_8 = get_job(this.g4x_1.w20());
                tmp_8.z21(HttpClientEngine$install$slambda$lambda(this.y4w_1, this.g4x_1));
                this.fd_1 = 2;
                suspendResult = this.a4x_1.q3l(this.f4x_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
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
      a4p($this$intercept, content, completion) {
        var i = new (HttpClientEngine$install$slambda())(this.y4w_1, this.z4w_1, completion);
        i.a4x_1 = $this$intercept;
        i.b4x_1 = content;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpClientEngine$install$slambdaClass = $;
  }
  return HttpClientEngine$install$slambdaClass;
}
function HttpClientEngine$install$slambda_0($client, this$0, resultContinuation) {
  var i = new (HttpClientEngine$install$slambda())($client, this$0, resultContinuation);
  var l = function ($this$intercept, content, $completion) {
    return i.z4o($this$intercept, content, $completion);
  };
  l.$arity = 2;
  return l;
}
var HttpClientEngine$executeWithinCallContext$slambdaClass;
function HttpClientEngine$executeWithinCallContext$slambda() {
  if (HttpClientEngine$executeWithinCallContext$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $requestData, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.r4x_1 = this$0;
        $box.s4x_1 = $requestData;
        super(resultContinuation, $box);
      }
      u4x($this$async, $completion) {
        var tmp = this.y3e($this$async, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.u4x((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                if (_get_closed__iwkfs1(this.r4x_1)) {
                  throw ClientEngineClosedException().a4y();
                }

                this.fd_1 = 1;
                suspendResult = this.r4x_1.b4y(this.s4x_1, this);
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
      y3e($this$async, completion) {
        var i = new (HttpClientEngine$executeWithinCallContext$slambda())(this.r4x_1, this.s4x_1, completion);
        i.t4x_1 = $this$async;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    HttpClientEngine$executeWithinCallContext$slambdaClass = $;
  }
  return HttpClientEngine$executeWithinCallContext$slambdaClass;
}
function HttpClientEngine$executeWithinCallContext$slambda_0(this$0, $requestData, resultContinuation) {
  var i = new (HttpClientEngine$executeWithinCallContext$slambda())(this$0, $requestData, resultContinuation);
  var l = function ($this$async, $completion) {
    return i.u4x($this$async, $completion);
  };
  l.$arity = 1;
  return l;
}
var $executeWithinCallContextCOROUTINE$Class;
function $executeWithinCallContextCOROUTINE$() {
  if ($executeWithinCallContextCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, requestData, resultContinuation) {
        super(resultContinuation);
        this.e4w_1 = _this__u8e3s4;
        this.f4w_1 = requestData;
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
                suspendResult = createCallContext(this.e4w_1, this.f4w_1.m4w_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.g4w_1 = suspendResult;
                this.h4w_1 = this.g4w_1.ir(new (KtorCallContextElement())(this.g4w_1));
                this.fd_1 = 2;
                suspendResult = async(this.e4w_1, this.h4w_1, VOID, HttpClientEngine$executeWithinCallContext$slambda_0(this.e4w_1, this.f4w_1, null)).e24(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                return suspendResult;
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
    $executeWithinCallContextCOROUTINE$Class = $;
  }
  return $executeWithinCallContextCOROUTINE$Class;
}
function get_supportedCapabilities() {
  return emptySet();
}
function install(client) {
  var tmp = Phases_getInstance().s4q_1;
  client.h4o_1.s3m(tmp, HttpClientEngine$install$slambda_0(client, this, null));
}
var HttpClientEngineClass;
function HttpClientEngine() {
  if (HttpClientEngineClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'HttpClientEngine', VOID, VOID, [CoroutineScope(), AutoCloseable()], [1]);
    HttpClientEngineClass = $;
  }
  return HttpClientEngineClass;
}
function validateHeaders(request) {
  _init_properties_HttpClientEngine_kt__h91z5h();
  var requestHeaders = request.k4w_1;
  // Inline function 'kotlin.collections.filter' call
  var tmp0 = requestHeaders.z3i();
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = tmp0.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    if (HttpHeaders_getInstance().n3u_1.j1(element)) {
      destination.i(element);
    }
  }
  var unsafeRequestHeaders = destination;
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!unsafeRequestHeaders.h1()) {
    throw UnsafeHeaderException().k3v(toString(unsafeRequestHeaders));
  }
}
function createCallContext(_this__u8e3s4, parentJob, $completion) {
  var callJob = Job(parentJob);
  var callContext = _this__u8e3s4.w20().ir(callJob).ir(get_CALL_COROUTINE());
  $l$block: {
    // Inline function 'io.ktor.client.engine.attachToUserJob' call
    // Inline function 'kotlin.js.getCoroutineContext' call
    var tmp0_elvis_lhs = $completion.ld().sd(Key_instance);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var userJob = tmp;
    var cleanupHandler = userJob.b22(true, VOID, createCallContext$lambda(callJob));
    callJob.z21(createCallContext$lambda_0(cleanupHandler));
  }
  return callContext;
}
function createCallContext$lambda($callJob) {
  return function (cause) {
    if (cause == null)
      return Unit_instance;
    $callJob.g22(CancellationException().he(cause.message));
    return Unit_instance;
  };
}
function createCallContext$lambda_0($cleanupHandler) {
  return function (it) {
    $cleanupHandler.z24();
    return Unit_instance;
  };
}
var properties_initialized_HttpClientEngine_kt_5uiebb;
function _init_properties_HttpClientEngine_kt__h91z5h() {
  if (!properties_initialized_HttpClientEngine_kt_5uiebb) {
    properties_initialized_HttpClientEngine_kt_5uiebb = true;
    CALL_COROUTINE = new (CoroutineName())('call-context');
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'client-config';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp = getKClass(HttpClientConfig());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_0;
    try {
      tmp_0 = createKType(getKClass(HttpClientConfig()), arrayOf([getStarKTypeProjection()]), false);
    } catch ($p) {
      var tmp_1;
      if ($p instanceof Error) {
        var _unused_var__etf5q3 = $p;
        tmp_1 = null;
      } else {
        throw $p;
      }
      tmp_0 = tmp_1;
    }
    var tmp$ret$0 = tmp_0;
    var tmp$ret$1 = new (TypeInfo())(tmp, tmp$ret$0);
    CLIENT_CONFIG = new (AttributeKey())(name, tmp$ret$1);
  }
}
//region block: exports
export {
  get_CLIENT_CONFIG as get_CLIENT_CONFIG1oazdiwjd1qe0,
  install as install34ed8l0uhurm0,
  get_supportedCapabilities as get_supportedCapabilities36x6e2ixit204,
  HttpClientEngine as HttpClientEngine3f41d0b7i209y,
};
//endregion

//# sourceMappingURL=HttpClientEngine.mjs.map
