import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance } from '../../request/HttpRequestPipeline.mjs';
import {
  isSuspendFunction153vlp5l2npj9 as isSuspendFunction,
  isInterface3d6p8outrmvmk as isInterface,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  HttpResponseContainer3r9yzy4mwwvc9 as HttpResponseContainer,
  Phases_getInstance3cv4l5wlctlnh as Phases_getInstance_0,
} from '../../statement/HttpResponsePipeline.mjs';
import { ByteReadChannel2wzou76jce72d as ByteReadChannel } from '../../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannel.mjs';
import { NullBody1903zz7riiwr0 as NullBody } from '../../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var TransformResponseBodyContextClass;
function TransformResponseBodyContext() {
  if (TransformResponseBodyContextClass === VOID) {
    class $ {}
    initMetadataForClass($, 'TransformResponseBodyContext');
    TransformResponseBodyContextClass = $;
  }
  return TransformResponseBodyContextClass;
}
var OnRequestContextClass;
function OnRequestContext() {
  if (OnRequestContextClass === VOID) {
    class $ {}
    initMetadataForClass($, 'OnRequestContext');
    OnRequestContextClass = $;
  }
  return OnRequestContextClass;
}
var RequestHook$install$slambdaClass;
function RequestHook$install$slambda() {
  if (RequestHook$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.q5l_1 = $handler;
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
                suspendResult = this.q5l_1(new (OnRequestContext())(), this.r5l_1.o3m_1, this.r5l_1.p3l(), this);
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
        var i = new (RequestHook$install$slambda())(this.q5l_1, completion);
        i.r5l_1 = $this$intercept;
        i.s5l_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    RequestHook$install$slambdaClass = $;
  }
  return RequestHook$install$slambdaClass;
}
function RequestHook$install$slambda_0($handler, resultContinuation) {
  var i = new (RequestHook$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.z4o($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var RequestHookClass;
function RequestHook() {
  if (RequestHookClass === VOID) {
    class $ {
      t5l(client, handler) {
        var tmp = Phases_getInstance().d4z_1;
        client.f4o_1.s3m(tmp, RequestHook$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.t5l(client, (!(handler == null) ? isSuspendFunction(handler, 3) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'RequestHook');
    RequestHookClass = $;
  }
  return RequestHookClass;
}
var RequestHook_instance;
function RequestHook_getInstance() {
  return RequestHook_instance;
}
var TransformRequestBodyContextClass;
function TransformRequestBodyContext() {
  if (TransformRequestBodyContextClass === VOID) {
    class $ {}
    initMetadataForClass($, 'TransformRequestBodyContext');
    TransformRequestBodyContextClass = $;
  }
  return TransformRequestBodyContextClass;
}
var TransformRequestBodyHook$install$slambdaClass;
function TransformRequestBodyHook$install$slambda() {
  if (TransformRequestBodyHook$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.c5m_1 = $handler;
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
                this.gd_1 = 4;
                this.fd_1 = 1;
                suspendResult = this.c5m_1(new (TransformRequestBodyContext())(), this.d5m_1.o3m_1, this.d5m_1.p3l(), this.d5m_1.o3m_1.g5m(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.f5m_1 = suspendResult;
                if (!(this.f5m_1 == null)) {
                  this.fd_1 = 2;
                  suspendResult = this.d5m_1.q3l(this.f5m_1, this);
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
      a4p($this$intercept, it, completion) {
        var i = new (TransformRequestBodyHook$install$slambda())(this.c5m_1, completion);
        i.d5m_1 = $this$intercept;
        i.e5m_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    TransformRequestBodyHook$install$slambdaClass = $;
  }
  return TransformRequestBodyHook$install$slambdaClass;
}
function TransformRequestBodyHook$install$slambda_0($handler, resultContinuation) {
  var i = new (TransformRequestBodyHook$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.z4o($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var TransformRequestBodyHookClass;
function TransformRequestBodyHook() {
  if (TransformRequestBodyHookClass === VOID) {
    class $ {
      h5m(client, handler) {
        var tmp = Phases_getInstance().e4z_1;
        client.f4o_1.s3m(tmp, TransformRequestBodyHook$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.h5m(client, (!(handler == null) ? isSuspendFunction(handler, 4) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'TransformRequestBodyHook');
    TransformRequestBodyHookClass = $;
  }
  return TransformRequestBodyHookClass;
}
var TransformRequestBodyHook_instance;
function TransformRequestBodyHook_getInstance() {
  return TransformRequestBodyHook_instance;
}
var TransformResponseBodyHook$install$slambdaClass;
function TransformResponseBodyHook$install$slambda() {
  if (TransformResponseBodyHook$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.q5m_1 = $handler;
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
                this.t5m_1 = this.r5m_1.p3l();
                this.u5m_1 = this.t5m_1.ch();
                this.v5m_1 = this.t5m_1.dh();
                var tmp_0 = this.v5m_1;
                if (!isInterface(tmp_0, ByteReadChannel()))
                  return Unit_instance;
                this.fd_1 = 1;
                suspendResult = this.q5m_1(new (TransformResponseBodyContext())(), this.r5m_1.o3m_1.g4p(), this.v5m_1, this.u5m_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.w5m_1 = suspendResult;
                var tmp_1 = this;
                var tmp_2;
                if (this.w5m_1 == null) {
                  return Unit_instance;
                } else {
                  tmp_2 = this.w5m_1;
                }

                tmp_1.x5m_1 = tmp_2;
                var tmp_3;
                var tmp_4 = this.x5m_1;
                if (!(tmp_4 instanceof NullBody())) {
                  tmp_3 = !this.u5m_1.g3n_1.hh(this.x5m_1);
                } else {
                  tmp_3 = false;
                }

                if (tmp_3) {
                  throw IllegalStateException().o5('transformResponseBody returned ' + toString(this.x5m_1) + ' but expected value of type ' + this.u5m_1.toString());
                }

                this.fd_1 = 2;
                suspendResult = this.r5m_1.q3l(new (HttpResponseContainer())(this.u5m_1, this.x5m_1), this);
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
      v4p($this$intercept, it, completion) {
        var i = new (TransformResponseBodyHook$install$slambda())(this.q5m_1, completion);
        i.r5m_1 = $this$intercept;
        i.s5m_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    TransformResponseBodyHook$install$slambdaClass = $;
  }
  return TransformResponseBodyHook$install$slambdaClass;
}
function TransformResponseBodyHook$install$slambda_0($handler, resultContinuation) {
  var i = new (TransformResponseBodyHook$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.u4p($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var TransformResponseBodyHookClass;
function TransformResponseBodyHook() {
  if (TransformResponseBodyHookClass === VOID) {
    class $ {
      y5m(client, handler) {
        var tmp = Phases_getInstance_0().h4r_1;
        client.g4o_1.s3m(tmp, TransformResponseBodyHook$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.y5m(client, (!(handler == null) ? isSuspendFunction(handler, 4) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'TransformResponseBodyHook');
    TransformResponseBodyHookClass = $;
  }
  return TransformResponseBodyHookClass;
}
var TransformResponseBodyHook_instance;
function TransformResponseBodyHook_getInstance() {
  return TransformResponseBodyHook_instance;
}
//region block: init
RequestHook_instance = new (RequestHook())();
TransformRequestBodyHook_instance = new (TransformRequestBodyHook())();
TransformResponseBodyHook_instance = new (TransformResponseBodyHook())();
//endregion
//region block: exports
export {
  RequestHook_instance as RequestHook_instance6h3qdveebntl,
  TransformRequestBodyHook_instance as TransformRequestBodyHook_instance3boa13k1g7not,
  TransformResponseBodyHook_instance as TransformResponseBodyHook_instance1qcjlll12mq8h,
  OnRequestContext as OnRequestContext1tmu5b6bhlblg,
  TransformRequestBodyContext as TransformRequestBodyContext3ll40opqaho0d,
  TransformResponseBodyContext as TransformResponseBodyContext1axf7xx6ifwbj,
};
//endregion

//# sourceMappingURL=KtorCallContexts.mjs.map
