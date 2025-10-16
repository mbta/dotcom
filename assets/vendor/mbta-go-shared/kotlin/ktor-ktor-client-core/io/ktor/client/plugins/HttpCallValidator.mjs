import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance } from '../request/HttpRequestPipeline.mjs';
import {
  isSuspendFunction153vlp5l2npj9 as isSuspendFunction,
  isInterface3d6p8outrmvmk as isInterface,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  HttpResponseContainer3r9yzy4mwwvc9 as HttpResponseContainer,
  Phases_getInstance3cv4l5wlctlnh as Phases_getInstance_0,
} from '../statement/HttpResponsePipeline.mjs';
import { PipelinePhase2q3d54imxjlma as PipelinePhase } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelinePhase.mjs';
import { reversed22y3au42jl32b as reversed } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  SetupRequest_instance16261rb0s0wyp as SetupRequest_instance,
  Send_instance19u839hbvwh8q as Send_instance,
  Sender1wtdgti85uk42 as Sender,
} from './api/CommonHooks.mjs';
import {
  HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder,
  HttpRequest3fsc4149kgwfg as HttpRequest,
  get_coroutineContext1djaai1ellg0c as get_coroutineContext,
} from '../request/HttpRequest.mjs';
import { unwrapCancellationException1zvbmufui4i9c as unwrapCancellationException } from '../utils/ExceptionUtils.nonJvm.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { OutgoingContent3t2ohmyam9o76 as OutgoingContent } from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
import { createClientPluginjwpvufjows5r as createClientPlugin } from './api/CreatePluginUtils.mjs';
import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_LOGGER() {
  _init_properties_HttpCallValidator_kt__r6yh2y();
  return LOGGER;
}
var LOGGER;
function get_HttpCallValidator() {
  _init_properties_HttpCallValidator_kt__r6yh2y();
  return HttpCallValidator;
}
var HttpCallValidator;
function get_ExpectSuccessAttributeKey() {
  _init_properties_HttpCallValidator_kt__r6yh2y();
  return ExpectSuccessAttributeKey;
}
var ExpectSuccessAttributeKey;
var HttpCallValidatorConfigClass;
function HttpCallValidatorConfig() {
  if (HttpCallValidatorConfigClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.r53_1 = ArrayList().g1();
        var tmp_0 = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp_0.s53_1 = ArrayList().g1();
        this.t53_1 = true;
      }
      u53(block) {
        // Inline function 'kotlin.collections.plusAssign' call
        this.r53_1.i(block);
      }
    }
    initMetadataForClass($, 'HttpCallValidatorConfig', HttpCallValidatorConfig);
    HttpCallValidatorConfigClass = $;
  }
  return HttpCallValidatorConfigClass;
}
var ExceptionHandlerWrapperClass;
function ExceptionHandlerWrapper() {
  if (ExceptionHandlerWrapperClass === VOID) {
    class $ {}
    initMetadataForClass($, 'ExceptionHandlerWrapper');
    ExceptionHandlerWrapperClass = $;
  }
  return ExceptionHandlerWrapperClass;
}
var RequestExceptionHandlerWrapperClass;
function RequestExceptionHandlerWrapper() {
  if (RequestExceptionHandlerWrapperClass === VOID) {
    class $ {}
    initMetadataForClass($, 'RequestExceptionHandlerWrapper');
    RequestExceptionHandlerWrapperClass = $;
  }
  return RequestExceptionHandlerWrapperClass;
}
var RequestError$install$slambdaClass;
function RequestError$install$slambda() {
  if (RequestError$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.n56_1 = $handler;
        super(resultContinuation, $box);
      }
      z4o($this$intercept, it, $completion) {
        var tmp = this.a4p($this$intercept, it, $completion);
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
                this.gd_1 = 5;
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = this.o56_1.r3l(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.q56_1 = suspendResult;
                this.gd_1 = 5;
                this.fd_1 = 4;
                continue $sm;
              case 2:
                this.gd_1 = 5;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Error) {
                  this.r56_1 = this.id_1;
                  this.fd_1 = 3;
                  suspendResult = this.n56_1(HttpRequest_0(this.o56_1.o3m_1), this.r56_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 3:
                var error = suspendResult;
                var tmp_1 = this;
                if (!(error == null))
                  throw error;
                tmp_1.q56_1 = Unit_instance;
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.gd_1 = 5;
                return Unit_instance;
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
      a4p($this$intercept, it, completion) {
        var i = new (RequestError$install$slambda())(this.n56_1, completion);
        i.o56_1 = $this$intercept;
        i.p56_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    RequestError$install$slambdaClass = $;
  }
  return RequestError$install$slambdaClass;
}
function RequestError$install$slambda_0($handler, resultContinuation) {
  var i = new (RequestError$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.z4o($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var RequestErrorClass;
function RequestError() {
  if (RequestErrorClass === VOID) {
    class $ {
      s56(client, handler) {
        var tmp = Phases_getInstance().c4z_1;
        client.f4o_1.s3m(tmp, RequestError$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.s56(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'RequestError');
    RequestErrorClass = $;
  }
  return RequestErrorClass;
}
var RequestError_instance;
function RequestError_getInstance() {
  return RequestError_instance;
}
var ReceiveError$install$slambdaClass;
function ReceiveError$install$slambda() {
  if (ReceiveError$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.b57_1 = $handler;
        super(resultContinuation, $box);
      }
      u4p($this$intercept, it, $completion) {
        var tmp = this.v4p($this$intercept, it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = p1 instanceof PipelineContext() ? p1 : THROW_CCE();
        return this.u4p(tmp, p2 instanceof HttpResponseContainer() ? p2 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 5;
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = this.c57_1.r3l(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.e57_1 = suspendResult;
                this.gd_1 = 5;
                this.fd_1 = 4;
                continue $sm;
              case 2:
                this.gd_1 = 5;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Error) {
                  this.f57_1 = this.id_1;
                  this.fd_1 = 3;
                  suspendResult = this.b57_1(this.c57_1.o3m_1.w4r(), this.f57_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 3:
                var error = suspendResult;
                var tmp_1 = this;
                if (!(error == null))
                  throw error;
                tmp_1.e57_1 = Unit_instance;
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.gd_1 = 5;
                return Unit_instance;
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
      v4p($this$intercept, it, completion) {
        var i = new (ReceiveError$install$slambda())(this.b57_1, completion);
        i.c57_1 = $this$intercept;
        i.d57_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    ReceiveError$install$slambdaClass = $;
  }
  return ReceiveError$install$slambdaClass;
}
function ReceiveError$install$slambda_0($handler, resultContinuation) {
  var i = new (ReceiveError$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.u4p($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var ReceiveErrorClass;
function ReceiveError() {
  if (ReceiveErrorClass === VOID) {
    class $ {
      s56(client, handler) {
        var BeforeReceive = new (PipelinePhase())('BeforeReceive');
        client.g4o_1.r3m(Phases_getInstance_0().f4r_1, BeforeReceive);
        client.g4o_1.s3m(BeforeReceive, ReceiveError$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.s56(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'ReceiveError');
    ReceiveErrorClass = $;
  }
  return ReceiveErrorClass;
}
var ReceiveError_instance;
function ReceiveError_getInstance() {
  return ReceiveError_instance;
}
function HttpRequest_0(builder) {
  _init_properties_HttpCallValidator_kt__r6yh2y();
  return new (HttpRequest$1())(builder);
}
function HttpResponseValidator(_this__u8e3s4, block) {
  _init_properties_HttpCallValidator_kt__r6yh2y();
  _this__u8e3s4.o4r(get_HttpCallValidator(), block);
}
function HttpCallValidatorConfig$_init_$ref_m1o2g9() {
  var l = function () {
    return new (HttpCallValidatorConfig())();
  };
  l.callableName = '<init>';
  return l;
}
function HttpCallValidator$lambda($this$createClientPlugin) {
  _init_properties_HttpCallValidator_kt__r6yh2y();
  var responseValidators = reversed($this$createClientPlugin.c50_1.r53_1);
  var callExceptionHandlers = reversed($this$createClientPlugin.c50_1.s53_1);
  var expectSuccess = $this$createClientPlugin.c50_1.t53_1;
  var tmp = SetupRequest_instance;
  $this$createClientPlugin.f50(tmp, HttpCallValidator$lambda$slambda_0(expectSuccess, null));
  var tmp_0 = Send_instance;
  $this$createClientPlugin.f50(tmp_0, HttpCallValidator$lambda$slambda_2(responseValidators, null));
  var tmp_1 = RequestError_instance;
  $this$createClientPlugin.f50(tmp_1, HttpCallValidator$lambda$slambda_4(callExceptionHandlers, null));
  var tmp_2 = ReceiveError_instance;
  $this$createClientPlugin.f50(tmp_2, HttpCallValidator$lambda$slambda_6(callExceptionHandlers, null));
  return Unit_instance;
}
function invoke$validateResponse(responseValidators, response, $completion) {
  var tmp = new ($invoke$validateResponseCOROUTINE$())(responseValidators, response, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function invoke$processException(callExceptionHandlers, cause, request, $completion) {
  var tmp = new ($invoke$processExceptionCOROUTINE$())(callExceptionHandlers, cause, request, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function HttpCallValidator$lambda$slambda$lambda($expectSuccess) {
  return function () {
    return $expectSuccess;
  };
}
var HttpCallValidator$lambda$slambdaClass;
function HttpCallValidator$lambda$slambda() {
  if (HttpCallValidator$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($expectSuccess, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.w58_1 = $expectSuccess;
        super(resultContinuation, $box);
      }
      y58(request, $completion) {
        var tmp = this.z58(request, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.y58(p1 instanceof HttpRequestBuilder() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              var tmp_0 = get_ExpectSuccessAttributeKey();
              this.x58_1.l4q_1.k3h(tmp_0, HttpCallValidator$lambda$slambda$lambda(this.w58_1));
              return Unit_instance;
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      z58(request, completion) {
        var i = new (HttpCallValidator$lambda$slambda())(this.w58_1, completion);
        i.x58_1 = request;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    HttpCallValidator$lambda$slambdaClass = $;
  }
  return HttpCallValidator$lambda$slambdaClass;
}
function HttpCallValidator$lambda$slambda_0($expectSuccess, resultContinuation) {
  var i = new (HttpCallValidator$lambda$slambda())($expectSuccess, resultContinuation);
  var l = function (request, $completion) {
    return i.y58(request, $completion);
  };
  l.$arity = 1;
  return l;
}
var HttpCallValidator$lambda$slambdaClass_0;
function HttpCallValidator$lambda$slambda_1() {
  if (HttpCallValidator$lambda$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($responseValidators, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.i59_1 = $responseValidators;
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
                this.gd_1 = 3;
                this.fd_1 = 1;
                suspendResult = this.j59_1.q59(this.k59_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.l59_1 = suspendResult;
                this.fd_1 = 2;
                suspendResult = invoke$validateResponse(this.i59_1, this.l59_1.g4p(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                return this.l59_1;
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
      n59($this$on, request, completion) {
        var i = new (HttpCallValidator$lambda$slambda_1())(this.i59_1, completion);
        i.j59_1 = $this$on;
        i.k59_1 = request;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpCallValidator$lambda$slambdaClass_0 = $;
  }
  return HttpCallValidator$lambda$slambdaClass_0;
}
function HttpCallValidator$lambda$slambda_2($responseValidators, resultContinuation) {
  var i = new (HttpCallValidator$lambda$slambda_1())($responseValidators, resultContinuation);
  var l = function ($this$on, request, $completion) {
    return i.m59($this$on, request, $completion);
  };
  l.$arity = 2;
  return l;
}
var HttpCallValidator$lambda$slambdaClass_1;
function HttpCallValidator$lambda$slambda_3() {
  if (HttpCallValidator$lambda$slambdaClass_1 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($callExceptionHandlers, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.z59_1 = $callExceptionHandlers;
        super(resultContinuation, $box);
      }
      d5a(request, cause, $completion) {
        var tmp = this.e5a(request, cause, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = (!(p1 == null) ? isInterface(p1, HttpRequest()) : false) ? p1 : THROW_CCE();
        return this.d5a(tmp, p2 instanceof Error ? p2 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.c5a_1 = unwrapCancellationException(this.b5a_1);
                this.fd_1 = 1;
                suspendResult = invoke$processException(this.z59_1, this.c5a_1, this.a5a_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return this.c5a_1;
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
      e5a(request, cause, completion) {
        var i = new (HttpCallValidator$lambda$slambda_3())(this.z59_1, completion);
        i.a5a_1 = request;
        i.b5a_1 = cause;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpCallValidator$lambda$slambdaClass_1 = $;
  }
  return HttpCallValidator$lambda$slambdaClass_1;
}
function HttpCallValidator$lambda$slambda_4($callExceptionHandlers, resultContinuation) {
  var i = new (HttpCallValidator$lambda$slambda_3())($callExceptionHandlers, resultContinuation);
  var l = function (request, cause, $completion) {
    return i.d5a(request, cause, $completion);
  };
  l.$arity = 2;
  return l;
}
var HttpCallValidator$lambda$slambdaClass_2;
function HttpCallValidator$lambda$slambda_5() {
  if (HttpCallValidator$lambda$slambdaClass_2 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($callExceptionHandlers, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.n5a_1 = $callExceptionHandlers;
        super(resultContinuation, $box);
      }
      d5a(request, cause, $completion) {
        var tmp = this.e5a(request, cause, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = (!(p1 == null) ? isInterface(p1, HttpRequest()) : false) ? p1 : THROW_CCE();
        return this.d5a(tmp, p2 instanceof Error ? p2 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.q5a_1 = unwrapCancellationException(this.p5a_1);
                this.fd_1 = 1;
                suspendResult = invoke$processException(this.n5a_1, this.q5a_1, this.o5a_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return this.q5a_1;
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
      e5a(request, cause, completion) {
        var i = new (HttpCallValidator$lambda$slambda_5())(this.n5a_1, completion);
        i.o5a_1 = request;
        i.p5a_1 = cause;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpCallValidator$lambda$slambdaClass_2 = $;
  }
  return HttpCallValidator$lambda$slambdaClass_2;
}
function HttpCallValidator$lambda$slambda_6($callExceptionHandlers, resultContinuation) {
  var i = new (HttpCallValidator$lambda$slambda_5())($callExceptionHandlers, resultContinuation);
  var l = function (request, cause, $completion) {
    return i.d5a(request, cause, $completion);
  };
  l.$arity = 2;
  return l;
}
var $invoke$validateResponseCOROUTINE$Class;
function $invoke$validateResponseCOROUTINE$() {
  if ($invoke$validateResponseCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(responseValidators, response, resultContinuation) {
        super(resultContinuation);
        this.o57_1 = responseValidators;
        this.p57_1 = response;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                get_LOGGER().u3n('Validating response for request ' + this.p57_1.d4s().w4r().f4s().toString());
                var tmp_0 = this;
                tmp_0.q57_1 = this.o57_1;
                this.r57_1 = this.q57_1;
                this.s57_1 = this.r57_1.x();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!this.s57_1.y()) {
                  this.fd_1 = 3;
                  continue $sm;
                }

                this.t57_1 = this.s57_1.z();
                var tmp_1 = this;
                tmp_1.u57_1 = this.t57_1;
                this.v57_1 = this.u57_1;
                this.fd_1 = 2;
                suspendResult = this.v57_1(this.p57_1, this);
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
    $invoke$validateResponseCOROUTINE$Class = $;
  }
  return $invoke$validateResponseCOROUTINE$Class;
}
var $invoke$processExceptionCOROUTINE$Class;
function $invoke$processExceptionCOROUTINE$() {
  if ($invoke$processExceptionCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(callExceptionHandlers, cause, request, resultContinuation) {
        super(resultContinuation);
        this.e58_1 = callExceptionHandlers;
        this.f58_1 = cause;
        this.g58_1 = request;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 6;
                get_LOGGER().u3n('Processing exception ' + this.f58_1.toString() + ' for request ' + this.g58_1.f4s().toString());
                var tmp_0 = this;
                tmp_0.h58_1 = this.e58_1;
                this.i58_1 = this.h58_1;
                this.j58_1 = this.i58_1.x();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!this.j58_1.y()) {
                  this.fd_1 = 5;
                  continue $sm;
                }

                this.k58_1 = this.j58_1.z();
                var tmp_1 = this;
                tmp_1.l58_1 = this.k58_1;
                this.m58_1 = this.l58_1;
                this.n58_1 = this.m58_1;
                var tmp_2 = this.n58_1;
                if (tmp_2 instanceof ExceptionHandlerWrapper()) {
                  this.fd_1 = 3;
                  suspendResult = this.m58_1.s5a_1(this.f58_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var tmp_3 = this.n58_1;
                  if (tmp_3 instanceof RequestExceptionHandlerWrapper()) {
                    this.fd_1 = 2;
                    suspendResult = this.m58_1.r5a_1(this.f58_1, this.g58_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    noWhenBranchMatchedException();
                  }
                }

                break;
              case 2:
                this.fd_1 = 4;
                continue $sm;
              case 3:
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.fd_1 = 1;
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
    }
    initMetadataForCoroutine($);
    $invoke$processExceptionCOROUTINE$Class = $;
  }
  return $invoke$processExceptionCOROUTINE$Class;
}
var HttpRequest$1Class;
function HttpRequest$1() {
  if (HttpRequest$1Class === VOID) {
    class $ {
      constructor($builder) {
        this.x5a_1 = $builder;
        this.t5a_1 = $builder.h4q_1;
        this.u5a_1 = $builder.g4q_1.r3q();
        this.v5a_1 = $builder.l4q_1;
        this.w5a_1 = $builder.i4q_1.r3q();
      }
      d4s() {
        var message = 'Call is not initialized';
        throw IllegalStateException().o5(toString(message));
      }
      e4s() {
        return this.t5a_1;
      }
      f4s() {
        return this.u5a_1;
      }
      x4r() {
        return this.v5a_1;
      }
      l3v() {
        return this.w5a_1;
      }
      n1n() {
        var tmp = this.x5a_1.j4q_1;
        var tmp0_elvis_lhs = tmp instanceof OutgoingContent() ? tmp : null;
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          var message = 'Content was not transformed to OutgoingContent yet. Current body is ' + toString(this.x5a_1.j4q_1);
          throw IllegalStateException().o5(toString(message));
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        return tmp_0;
      }
    }
    protoOf($).w20 = get_coroutineContext;
    initMetadataForClass($, VOID, VOID, VOID, [HttpRequest()]);
    HttpRequest$1Class = $;
  }
  return HttpRequest$1Class;
}
var properties_initialized_HttpCallValidator_kt_xrx49w;
function _init_properties_HttpCallValidator_kt__r6yh2y() {
  if (!properties_initialized_HttpCallValidator_kt_xrx49w) {
    properties_initialized_HttpCallValidator_kt_xrx49w = true;
    LOGGER = KtorSimpleLogger('io.ktor.client.plugins.HttpCallValidator');
    var tmp = HttpCallValidatorConfig$_init_$ref_m1o2g9();
    HttpCallValidator = createClientPlugin('HttpResponseValidator', tmp, HttpCallValidator$lambda);
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'ExpectSuccessAttributeKey';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp_0 = PrimitiveClasses_getInstance().fi();
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_1;
    try {
      tmp_1 = createKType(PrimitiveClasses_getInstance().fi(), arrayOf([]), false);
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
    ExpectSuccessAttributeKey = new (AttributeKey())(name, tmp$ret$1);
  }
}
//region block: init
RequestError_instance = new (RequestError())();
ReceiveError_instance = new (ReceiveError())();
//endregion
//region block: exports
export {
  get_ExpectSuccessAttributeKey as get_ExpectSuccessAttributeKey20jj5fup38v1g,
  get_HttpCallValidator as get_HttpCallValidator3iji36qylbtbr,
  HttpResponseValidator as HttpResponseValidator2d6ie1tmzg8fi,
};
//endregion

//# sourceMappingURL=HttpCallValidator.mjs.map
