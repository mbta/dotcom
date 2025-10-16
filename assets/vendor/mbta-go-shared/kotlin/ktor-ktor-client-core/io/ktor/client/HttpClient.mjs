import {
  cancel36mj9lv3a0whl as cancel,
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
} from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { HttpClientCall2j6myj8ctykar as HttpClientCall } from './call/HttpClientCall.mjs';
import {
  toString1pkumu07cwy4m as toString,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { defaultTransformers2r9wd7ftt31zw as defaultTransformers } from './plugins/DefaultTransform.mjs';
import {
  HttpResponseContainer3r9yzy4mwwvc9 as HttpResponseContainer,
  HttpResponsePipeline14ucx7kbf4hm2 as HttpResponsePipeline,
  HttpReceivePipeline1ousblrss634z as HttpReceivePipeline,
  Phases_getInstance3cv4l5wlctlnh as Phases_getInstance,
} from './statement/HttpResponsePipeline.mjs';
import {
  get_HttpResponseReceiveFailed2q0s5em07bm9j as get_HttpResponseReceiveFailed,
  HttpResponseReceiveFailk4vfmxmwithf as HttpResponseReceiveFail,
  get_HttpRequestCreated2xa7wfn254wyu as get_HttpRequestCreated,
} from './utils/ClientEvents.mjs';
import { HttpClientConfigo6p492ed655g as HttpClientConfig } from './HttpClientConfig.mjs';
import { atomic$boolean$1iggki4z65a2h as atomic$boolean$1 } from '../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import {
  Key_instance2tirv2rj82ml4 as Key_instance,
  Job13y4jkazwjho0 as Job,
} from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import {
  HttpRequestPipeline1v7xct5dgezuy as HttpRequestPipeline,
  HttpSendPipeline3tm1hram7cjxt as HttpSendPipeline,
  Phases_getInstance18vqybk3y2ism as Phases_getInstance_0,
} from './request/HttpRequestPipeline.mjs';
import { AttributesJsFn25rjfgcprgprf as AttributesJsFn } from '../../../../ktor-ktor-utils/io/ktor/util/AttributesJs.mjs';
import { Events63tfxre48w4z as Events } from '../../../../ktor-ktor-events/io/ktor/events/Events.mjs';
import { get_HttpRequestLifecycle1e7j0z243lnj5 as get_HttpRequestLifecycle } from './plugins/HttpRequestLifecycle.mjs';
import { get_BodyProgresstom4nhodv8bj as get_BodyProgress } from './plugins/BodyProgress.mjs';
import { get_SaveBody3aignvhtsnvcr as get_SaveBody } from './plugins/SaveBody.mjs';
import { Plugin_getInstanceqq5mcce07h6c as Plugin_getInstance } from './plugins/HttpSend.mjs';
import { get_HttpCallValidator3iji36qylbtbr as get_HttpCallValidator } from './plugins/HttpCallValidator.mjs';
import { get_HttpRedirect1lgx3wewnhrb0 as get_HttpRedirect } from './plugins/HttpRedirect.mjs';
import { get_HttpPlainText2hd9sygnz4kij as get_HttpPlainText } from './plugins/HttpPlainText.mjs';
import { addDefaultResponseValidation1d06vtgr9flaj as addDefaultResponseValidation } from './plugins/DefaultResponseValidation.mjs';
import { get_PLUGIN_INSTALLED_LIST1ftwjhwye1pz5 as get_PLUGIN_INSTALLED_LIST } from './plugins/HttpClientPlugin.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { AutoCloseable1l5p57f9lp7kv as AutoCloseable } from '../../../../kotlin-kotlin-stdlib/kotlin/AutoCloseableJs.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function HttpClient$lambda(this$0) {
  return function (it) {
    var tmp;
    if (!(it == null)) {
      cancel(this$0.z4n_1);
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
var HttpClient$slambdaClass;
function HttpClient$slambda() {
  if (HttpClient$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.v4o_1 = this$0;
        super(resultContinuation, $box);
      }
      z4o($this$intercept, call, $completion) {
        var tmp = this.a4p($this$intercept, call, $completion);
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
                var tmp_0 = this.x4o_1;
                if (!(tmp_0 instanceof HttpClientCall())) {
                  var message = 'Error: HttpClientCall expected, but found ' + toString(this.x4o_1) + '(' + toString(getKClassFromExpression(this.x4o_1)) + ').';
                  throw IllegalStateException().o5(toString(message));
                }

                this.fd_1 = 1;
                suspendResult = this.v4o_1.i4o_1.n3m(Unit_instance, this.x4o_1.g4p(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.y4o_1 = suspendResult;
                this.x4o_1.h4p(this.y4o_1);
                this.fd_1 = 2;
                suspendResult = this.w4o_1.q3l(this.x4o_1, this);
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
      a4p($this$intercept, call, completion) {
        var i = new (HttpClient$slambda())(this.v4o_1, completion);
        i.w4o_1 = $this$intercept;
        i.x4o_1 = call;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpClient$slambdaClass = $;
  }
  return HttpClient$slambdaClass;
}
function HttpClient$slambda_0(this$0, resultContinuation) {
  var i = new (HttpClient$slambda())(this$0, resultContinuation);
  var l = function ($this$intercept, call, $completion) {
    return i.z4o($this$intercept, call, $completion);
  };
  l.$arity = 2;
  return l;
}
function HttpClient$lambda_0($this$install) {
  defaultTransformers($this$install);
  return Unit_instance;
}
var HttpClient$slambdaClass_0;
function HttpClient$slambda_1() {
  if (HttpClient$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.q4p_1 = this$0;
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
                this.gd_1 = 3;
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = this.r4p_1.r3l(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.t4p_1 = suspendResult;
                this.gd_1 = 3;
                this.fd_1 = 4;
                continue $sm;
              case 2:
                this.gd_1 = 3;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Error) {
                  var cause = this.id_1;
                  var tmp_1 = this;
                  this.q4p_1.l4o_1.w4n(get_HttpResponseReceiveFailed(), new (HttpResponseReceiveFail())(this.r4p_1.o3m_1.g4p(), cause));
                  throw cause;
                } else {
                  throw this.id_1;
                }

              case 3:
                throw this.id_1;
              case 4:
                this.gd_1 = 3;
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
      v4p($this$intercept, it, completion) {
        var i = new (HttpClient$slambda_1())(this.q4p_1, completion);
        i.r4p_1 = $this$intercept;
        i.s4p_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpClient$slambdaClass_0 = $;
  }
  return HttpClient$slambdaClass_0;
}
function HttpClient$slambda_2(this$0, resultContinuation) {
  var i = new (HttpClient$slambda_1())(this$0, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.u4p($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var $executeCOROUTINE$Class;
function $executeCOROUTINE$() {
  if ($executeCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, builder, resultContinuation) {
        super(resultContinuation);
        this.e4q_1 = _this__u8e3s4;
        this.f4q_1 = builder;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.e4q_1.l4o_1.w4n(get_HttpRequestCreated(), this.f4q_1);
                this.fd_1 = 1;
                suspendResult = this.e4q_1.f4o_1.n3m(this.f4q_1, this.f4q_1.j4q_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return suspendResult instanceof HttpClientCall() ? suspendResult : THROW_CCE();
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
    $executeCOROUTINE$Class = $;
  }
  return $executeCOROUTINE$Class;
}
var HttpClientClass;
function HttpClient() {
  if (HttpClientClass === VOID) {
    class $ {
      static m4q(engine, userConfig) {
        userConfig = userConfig === VOID ? new (HttpClientConfig())() : userConfig;
        var $this = createThis(this);
        $this.z4n_1 = engine;
        $this.a4o_1 = userConfig;
        $this.b4o_1 = false;
        $this.c4o_1 = atomic$boolean$1(false);
        $this.d4o_1 = Job($this.z4n_1.w20().sd(Key_instance));
        $this.e4o_1 = $this.z4n_1.w20().ir($this.d4o_1);
        $this.f4o_1 = new (HttpRequestPipeline())();
        $this.g4o_1 = new (HttpResponsePipeline())();
        $this.h4o_1 = new (HttpSendPipeline())();
        $this.i4o_1 = new (HttpReceivePipeline())();
        $this.j4o_1 = AttributesJsFn(true);
        $this.k4o_1 = $this.z4n_1.n4q();
        $this.l4o_1 = new (Events())();
        $this.m4o_1 = new (HttpClientConfig())();
        if ($this.b4o_1) {
          $this.d4o_1.z21(HttpClient$lambda($this));
        }
        $this.z4n_1.o4q($this);
        var tmp = Phases_getInstance_0().t4q_1;
        $this.h4o_1.s3m(tmp, HttpClient$slambda_0($this, null));
        // Inline function 'kotlin.with' call
        var $this$with = $this.a4o_1;
        $this.m4o_1.c4r(get_HttpRequestLifecycle());
        $this.m4o_1.c4r(get_BodyProgress());
        $this.m4o_1.c4r(get_SaveBody());
        if ($this$with.z4q_1) {
          $this.m4o_1.d4r('DefaultTransformers', HttpClient$lambda_0);
        }
        $this.m4o_1.c4r(Plugin_getInstance());
        $this.m4o_1.c4r(get_HttpCallValidator());
        if ($this$with.y4q_1) {
          $this.m4o_1.c4r(get_HttpRedirect());
        }
        $this.m4o_1.e4r($this$with);
        if ($this$with.z4q_1) {
          $this.m4o_1.c4r(get_HttpPlainText());
        }
        addDefaultResponseValidation($this.m4o_1);
        $this.m4o_1.o4q($this);
        var tmp_0 = Phases_getInstance().f4r_1;
        $this.g4o_1.s3m(tmp_0, HttpClient$slambda_2($this, null));
        return $this;
      }
      static k4r(engine, userConfig, manageEngine) {
        var $this = this.m4q(engine, userConfig);
        $this.b4o_1 = manageEngine;
        return $this;
      }
      w20() {
        return this.e4o_1;
      }
      l4r(builder, $completion) {
        var tmp = new ($executeCOROUTINE$())(this, builder, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      v6() {
        var success = this.c4o_1.atomicfu$compareAndSet(false, true);
        if (!success)
          return Unit_instance;
        var installedFeatures = this.j4o_1.f3h(get_PLUGIN_INSTALLED_LIST());
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = installedFeatures.l3h().x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var plugin = installedFeatures.f3h(element instanceof AttributeKey() ? element : THROW_CCE());
          if (isInterface(plugin, AutoCloseable())) {
            plugin.v6();
          }
        }
        this.d4o_1.i28();
        if (this.b4o_1) {
          this.z4n_1.v6();
        }
      }
      toString() {
        return 'HttpClient[' + toString(this.z4n_1) + ']';
      }
    }
    initMetadataForClass($, 'HttpClient', VOID, VOID, [CoroutineScope(), AutoCloseable()], [1]);
    HttpClientClass = $;
  }
  return HttpClientClass;
}
function HttpClient_0(engine, block) {
  // Inline function 'kotlin.apply' call
  var this_0 = new (HttpClientConfig())();
  block(this_0);
  return HttpClient().k4r(engine, this_0, false);
}
//region block: exports
export {
  HttpClient_0 as HttpClienthpouyso1j6ge,
};
//endregion

//# sourceMappingURL=HttpClient.mjs.map
