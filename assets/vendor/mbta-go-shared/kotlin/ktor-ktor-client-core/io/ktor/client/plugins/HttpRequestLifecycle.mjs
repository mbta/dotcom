import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForFunctionReferencen3g5fpj34t8u as initMetadataForFunctionReference,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance } from '../request/HttpRequestPipeline.mjs';
import { isSuspendFunction153vlp5l2npj9 as isSuspendFunction } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder } from '../request/HttpRequest.mjs';
import { SupervisorJobythnfxkr3jxc as SupervisorJob } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Supervisor.mjs';
import {
  Key_instance2tirv2rj82ml4 as Key_instance,
  cancel1xim2hrvjmwpn as cancel,
} from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
import { createClientPlugin16sdkdabbewya as createClientPlugin } from './api/CreatePluginUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_LOGGER() {
  _init_properties_HttpRequestLifecycle_kt__jgkmfx();
  return LOGGER;
}
var LOGGER;
function get_HttpRequestLifecycle() {
  _init_properties_HttpRequestLifecycle_kt__jgkmfx();
  return HttpRequestLifecycle;
}
var HttpRequestLifecycle;
var $invokeCOROUTINE$Class;
function $invokeCOROUTINE$() {
  if ($invokeCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.l5e_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.m5e_1 = this.l5e_1.n5e_1;
                this.fd_1 = 1;
                suspendResult = this.m5e_1.r3l(this);
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
    }
    initMetadataForCoroutine($);
    $invokeCOROUTINE$Class = $;
  }
  return $invokeCOROUTINE$Class;
}
var PipelineContext$proceed$refClass;
function PipelineContext$proceed$ref() {
  if (PipelineContext$proceed$refClass === VOID) {
    class $ {
      constructor(p0) {
        this.n5e_1 = p0;
      }
      n3d($completion) {
        var tmp = new ($invokeCOROUTINE$())(this, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      sf($completion) {
        return this.n3d($completion);
      }
    }
    initMetadataForFunctionReference($, VOID, VOID, [0]);
    PipelineContext$proceed$refClass = $;
  }
  return PipelineContext$proceed$refClass;
}
function PipelineContext$proceed$ref_0(p0) {
  var i = new (PipelineContext$proceed$ref())(p0);
  var l = function ($completion) {
    return i.n3d($completion);
  };
  l.$arity = 0;
  return l;
}
var SetupRequestContext$install$slambdaClass;
function SetupRequestContext$install$slambda() {
  if (SetupRequestContext$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.w5e_1 = $handler;
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
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = this.w5e_1(this.x5e_1.o3m_1, PipelineContext$proceed$ref_0(this.x5e_1), this);
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
      a4p($this$intercept, it, completion) {
        var i = new (SetupRequestContext$install$slambda())(this.w5e_1, completion);
        i.x5e_1 = $this$intercept;
        i.y5e_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    SetupRequestContext$install$slambdaClass = $;
  }
  return SetupRequestContext$install$slambdaClass;
}
function SetupRequestContext$install$slambda_0($handler, resultContinuation) {
  var i = new (SetupRequestContext$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.z4o($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var SetupRequestContextClass;
function SetupRequestContext() {
  if (SetupRequestContextClass === VOID) {
    class $ {
      z5e(client, handler) {
        var tmp = Phases_getInstance().c4z_1;
        client.f4o_1.s3m(tmp, SetupRequestContext$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.z5e(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'SetupRequestContext');
    SetupRequestContextClass = $;
  }
  return SetupRequestContextClass;
}
var SetupRequestContext_instance;
function SetupRequestContext_getInstance() {
  return SetupRequestContext_instance;
}
function attachToClientEngineJob(requestJob, clientEngineJob) {
  _init_properties_HttpRequestLifecycle_kt__jgkmfx();
  var handler = clientEngineJob.z21(attachToClientEngineJob$lambda(requestJob));
  requestJob.z21(attachToClientEngineJob$lambda_0(handler));
}
function HttpRequestLifecycle$lambda($this$createClientPlugin) {
  _init_properties_HttpRequestLifecycle_kt__jgkmfx();
  var tmp = SetupRequestContext_instance;
  $this$createClientPlugin.f50(tmp, HttpRequestLifecycle$lambda$slambda_0($this$createClientPlugin, null));
  return Unit_instance;
}
var HttpRequestLifecycle$lambda$slambdaClass;
function HttpRequestLifecycle$lambda$slambda() {
  if (HttpRequestLifecycle$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($this_createClientPlugin, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.i5f_1 = $this_createClientPlugin;
        super(resultContinuation, $box);
      }
      n5f(request, proceed, $completion) {
        var tmp = this.o5f(request, proceed, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = p1 instanceof HttpRequestBuilder() ? p1 : THROW_CCE();
        return this.n5f(tmp, (!(p2 == null) ? isSuspendFunction(p2, 0) : false) ? p2 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 6;
                this.l5f_1 = SupervisorJob(this.j5f_1.k4q_1);
                attachToClientEngineJob(this.l5f_1, ensureNotNull(this.i5f_1.b50_1.e4o_1.sd(Key_instance)));
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 4;
                this.gd_1 = 3;
                this.j5f_1.k4q_1 = this.l5f_1;
                this.fd_1 = 2;
                suspendResult = this.k5f_1(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.m5f_1 = suspendResult;
                this.gd_1 = 6;
                this.fd_1 = 5;
                continue $sm;
              case 3:
                this.gd_1 = 4;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Error) {
                  var cause = this.id_1;
                  var tmp_1 = this;
                  this.l5f_1.h28(cause);
                  throw cause;
                } else {
                  throw this.id_1;
                }

              case 4:
                this.gd_1 = 6;
                var t = this.id_1;
                this.l5f_1.i28();
                throw t;
              case 5:
                this.gd_1 = 6;
                this.l5f_1.i28();
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
      o5f(request, proceed, completion) {
        var i = new (HttpRequestLifecycle$lambda$slambda())(this.i5f_1, completion);
        i.j5f_1 = request;
        i.k5f_1 = proceed;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpRequestLifecycle$lambda$slambdaClass = $;
  }
  return HttpRequestLifecycle$lambda$slambdaClass;
}
function HttpRequestLifecycle$lambda$slambda_0($this_createClientPlugin, resultContinuation) {
  var i = new (HttpRequestLifecycle$lambda$slambda())($this_createClientPlugin, resultContinuation);
  var l = function (request, proceed, $completion) {
    return i.n5f(request, proceed, $completion);
  };
  l.$arity = 2;
  return l;
}
function attachToClientEngineJob$lambda($requestJob) {
  return function (cause) {
    if (!(cause == null)) {
      get_LOGGER().u3n('Cancelling request because engine Job failed with error: ' + toString(cause));
      cancel($requestJob, 'Engine failed', cause);
    } else {
      get_LOGGER().u3n('Cancelling request because engine Job completed');
      $requestJob.i28();
    }
    return Unit_instance;
  };
}
function attachToClientEngineJob$lambda_0($handler) {
  return function (it) {
    $handler.z24();
    return Unit_instance;
  };
}
var properties_initialized_HttpRequestLifecycle_kt_3hmcrf;
function _init_properties_HttpRequestLifecycle_kt__jgkmfx() {
  if (!properties_initialized_HttpRequestLifecycle_kt_3hmcrf) {
    properties_initialized_HttpRequestLifecycle_kt_3hmcrf = true;
    LOGGER = KtorSimpleLogger('io.ktor.client.plugins.HttpRequestLifecycle');
    HttpRequestLifecycle = createClientPlugin('RequestLifecycle', HttpRequestLifecycle$lambda);
  }
}
//region block: init
SetupRequestContext_instance = new (SetupRequestContext())();
//endregion
//region block: exports
export {
  get_HttpRequestLifecycle as get_HttpRequestLifecycle1e7j0z243lnj5,
};
//endregion

//# sourceMappingURL=HttpRequestLifecycle.mjs.map
