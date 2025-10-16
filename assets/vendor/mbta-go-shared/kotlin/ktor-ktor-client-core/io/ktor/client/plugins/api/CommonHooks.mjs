import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance } from '../../request/HttpRequestPipeline.mjs';
import {
  isSuspendFunction153vlp5l2npj9 as isSuspendFunction,
  isInterface3d6p8outrmvmk as isInterface,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import {
  Sender4pyqqer9k7up as Sender,
  Plugin_getInstanceqq5mcce07h6c as Plugin_getInstance,
} from '../HttpSend.mjs';
import { HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder } from '../../request/HttpRequest.mjs';
import { plugin3vxt624hnu3pv as plugin } from '../HttpClientPlugin.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var SetupRequest$install$slambdaClass;
function SetupRequest$install$slambda() {
  if (SetupRequest$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.k5k_1 = $handler;
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
                suspendResult = this.k5k_1(this.l5k_1.o3m_1, this);
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
        var i = new (SetupRequest$install$slambda())(this.k5k_1, completion);
        i.l5k_1 = $this$intercept;
        i.m5k_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    SetupRequest$install$slambdaClass = $;
  }
  return SetupRequest$install$slambdaClass;
}
function SetupRequest$install$slambda_0($handler, resultContinuation) {
  var i = new (SetupRequest$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.z4o($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var SetupRequestClass;
function SetupRequest() {
  if (SetupRequestClass === VOID) {
    class $ {
      n5k(client, handler) {
        var tmp = Phases_getInstance().c4z_1;
        client.f4o_1.s3m(tmp, SetupRequest$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.n5k(client, (!(handler == null) ? isSuspendFunction(handler, 1) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'SetupRequest');
    SetupRequestClass = $;
  }
  return SetupRequestClass;
}
var SetupRequest_instance;
function SetupRequest_getInstance() {
  return SetupRequest_instance;
}
var SenderClass;
function Sender_0() {
  if (SenderClass === VOID) {
    class $ {
      constructor(httpSendSender, coroutineContext) {
        this.o59_1 = httpSendSender;
        this.p59_1 = coroutineContext;
      }
      w20() {
        return this.p59_1;
      }
      q59(requestBuilder, $completion) {
        return this.o59_1.p5f(requestBuilder, $completion);
      }
    }
    initMetadataForClass($, 'Sender', VOID, VOID, [CoroutineScope()], [1]);
    SenderClass = $;
  }
  return SenderClass;
}
var Send$install$slambdaClass;
function Send$install$slambda() {
  if (Send$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, $client, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.w5k_1 = $handler;
        $box.x5k_1 = $client;
        super(resultContinuation, $box);
      }
      a5l($this$intercept, request, $completion) {
        var tmp = this.b5l($this$intercept, request, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = (!(p1 == null) ? isInterface(p1, Sender()) : false) ? p1 : THROW_CCE();
        return this.a5l(tmp, p2 instanceof HttpRequestBuilder() ? p2 : THROW_CCE(), $completion);
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
                suspendResult = this.w5k_1(new (Sender_0())(this.y5k_1, this.x5k_1.e4o_1), this.z5k_1, this);
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
      b5l($this$intercept, request, completion) {
        var i = new (Send$install$slambda())(this.w5k_1, this.x5k_1, completion);
        i.y5k_1 = $this$intercept;
        i.z5k_1 = request;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    Send$install$slambdaClass = $;
  }
  return Send$install$slambdaClass;
}
function Send$install$slambda_0($handler, $client, resultContinuation) {
  var i = new (Send$install$slambda())($handler, $client, resultContinuation);
  var l = function ($this$intercept, request, $completion) {
    return i.a5l($this$intercept, request, $completion);
  };
  l.$arity = 2;
  return l;
}
var SendClass;
function Send() {
  if (SendClass === VOID) {
    class $ {
      c5l(client, handler) {
        var tmp = plugin(client, Plugin_getInstance());
        tmp.g5h(Send$install$slambda_0(handler, client, null));
      }
      h4z(client, handler) {
        return this.c5l(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'Send');
    SendClass = $;
  }
  return SendClass;
}
var Send_instance;
function Send_getInstance() {
  return Send_instance;
}
//region block: init
SetupRequest_instance = new (SetupRequest())();
Send_instance = new (Send())();
//endregion
//region block: exports
export {
  Send_instance as Send_instance19u839hbvwh8q,
  SetupRequest_instance as SetupRequest_instance16261rb0s0wyp,
  Sender_0 as Sender1wtdgti85uk42,
};
//endregion

//# sourceMappingURL=CommonHooks.mjs.map
