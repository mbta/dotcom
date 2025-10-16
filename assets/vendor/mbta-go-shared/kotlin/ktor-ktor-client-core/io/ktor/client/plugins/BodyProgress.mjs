import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { OutgoingContent3t2ohmyam9o76 as OutgoingContent } from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { PipelinePhase2q3d54imxjlma as PipelinePhase } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelinePhase.mjs';
import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance } from '../request/HttpRequestPipeline.mjs';
import { isSuspendFunction153vlp5l2npj9 as isSuspendFunction } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { HttpResponse1532ob1hsse1y as HttpResponse } from '../statement/HttpResponse.mjs';
import { Phases_getInstance2gb8yk5kt1qdy as Phases_getInstance_0 } from '../statement/HttpResponsePipeline.mjs';
import { contentLength2suzxu1lzutku as contentLength } from '../../../../../ktor-ktor-http/io/ktor/http/HttpMessageProperties.mjs';
import { observable2pw4p3n7s3klf as observable } from '../utils/ByteChannelUtils.mjs';
import { replaceResponse3ut5eo3odxj99 as replaceResponse } from '../call/DelegatedCall.mjs';
import { HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder } from '../request/HttpRequest.mjs';
import {
  ObservableContent3ft2pt0w2oysd as ObservableContent,
  ProgressListener886sg277haqw as ProgressListener,
} from '../content/ObservableContent.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { createClientPlugin16sdkdabbewya as createClientPlugin } from './api/CreatePluginUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_UploadProgressListenerAttributeKey() {
  _init_properties_BodyProgress_kt__s0v569();
  return UploadProgressListenerAttributeKey;
}
var UploadProgressListenerAttributeKey;
function get_DownloadProgressListenerAttributeKey() {
  _init_properties_BodyProgress_kt__s0v569();
  return DownloadProgressListenerAttributeKey;
}
var DownloadProgressListenerAttributeKey;
function get_BodyProgress() {
  _init_properties_BodyProgress_kt__s0v569();
  return BodyProgress;
}
var BodyProgress;
var AfterRenderHook$install$slambdaClass;
function AfterRenderHook$install$slambda() {
  if (AfterRenderHook$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.w4y_1 = $handler;
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
                var tmp_0 = this.y4y_1;
                if (!(tmp_0 instanceof OutgoingContent()))
                  return Unit_instance;
                this.fd_1 = 1;
                suspendResult = this.w4y_1(this.x4y_1.o3m_1, this.y4y_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.z4y_1 = suspendResult;
                var tmp_1 = this;
                var tmp_2;
                if (this.z4y_1 == null) {
                  return Unit_instance;
                } else {
                  tmp_2 = this.z4y_1;
                }

                tmp_1.a4z_1 = tmp_2;
                this.fd_1 = 2;
                suspendResult = this.x4y_1.q3l(this.a4z_1, this);
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
        var i = new (AfterRenderHook$install$slambda())(this.w4y_1, completion);
        i.x4y_1 = $this$intercept;
        i.y4y_1 = content;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    AfterRenderHook$install$slambdaClass = $;
  }
  return AfterRenderHook$install$slambdaClass;
}
function AfterRenderHook$install$slambda_0($handler, resultContinuation) {
  var i = new (AfterRenderHook$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, content, $completion) {
    return i.z4o($this$intercept, content, $completion);
  };
  l.$arity = 2;
  return l;
}
var AfterRenderHookClass;
function AfterRenderHook() {
  if (AfterRenderHookClass === VOID) {
    class $ {
      b4z(client, handler) {
        var observableContentPhase = new (PipelinePhase())('ObservableContent');
        client.f4o_1.p3m(Phases_getInstance().f4z_1, observableContentPhase);
        client.f4o_1.s3m(observableContentPhase, AfterRenderHook$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.b4z(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'AfterRenderHook');
    AfterRenderHookClass = $;
  }
  return AfterRenderHookClass;
}
var AfterRenderHook_instance;
function AfterRenderHook_getInstance() {
  return AfterRenderHook_instance;
}
var AfterReceiveHook$install$slambdaClass;
function AfterReceiveHook$install$slambda() {
  if (AfterReceiveHook$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.q4z_1 = $handler;
        super(resultContinuation, $box);
      }
      u4z($this$intercept, response, $completion) {
        var tmp = this.v4z($this$intercept, response, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = p1 instanceof PipelineContext() ? p1 : THROW_CCE();
        return this.u4z(tmp, p2 instanceof HttpResponse() ? p2 : THROW_CCE(), $completion);
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
                suspendResult = this.q4z_1(this.s4z_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.t4z_1 = suspendResult;
                if (!(this.t4z_1 == null)) {
                  this.fd_1 = 2;
                  suspendResult = this.r4z_1.q3l(this.t4z_1, this);
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
      v4z($this$intercept, response, completion) {
        var i = new (AfterReceiveHook$install$slambda())(this.q4z_1, completion);
        i.r4z_1 = $this$intercept;
        i.s4z_1 = response;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    AfterReceiveHook$install$slambdaClass = $;
  }
  return AfterReceiveHook$install$slambdaClass;
}
function AfterReceiveHook$install$slambda_0($handler, resultContinuation) {
  var i = new (AfterReceiveHook$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, response, $completion) {
    return i.u4z($this$intercept, response, $completion);
  };
  l.$arity = 2;
  return l;
}
var AfterReceiveHookClass;
function AfterReceiveHook() {
  if (AfterReceiveHookClass === VOID) {
    class $ {
      w4z(client, handler) {
        var tmp = Phases_getInstance_0().z4z_1;
        client.i4o_1.s3m(tmp, AfterReceiveHook$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.w4z(client, (!(handler == null) ? isSuspendFunction(handler, 1) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'AfterReceiveHook');
    AfterReceiveHookClass = $;
  }
  return AfterReceiveHookClass;
}
var AfterReceiveHook_instance;
function AfterReceiveHook_getInstance() {
  return AfterReceiveHook_instance;
}
function withObservableDownload(_this__u8e3s4, listener) {
  _init_properties_BodyProgress_kt__s0v569();
  var observableByteChannel = observable(_this__u8e3s4.l4s(), _this__u8e3s4.w20(), contentLength(_this__u8e3s4), listener);
  var tmp = _this__u8e3s4.d4s();
  return replaceResponse(tmp, VOID, withObservableDownload$lambda(observableByteChannel)).g4p();
}
function BodyProgress$lambda($this$createClientPlugin) {
  _init_properties_BodyProgress_kt__s0v569();
  var tmp = AfterRenderHook_instance;
  $this$createClientPlugin.f50(tmp, BodyProgress$lambda$slambda_0(null));
  var tmp_0 = AfterReceiveHook_instance;
  $this$createClientPlugin.f50(tmp_0, BodyProgress$lambda$slambda_2(null));
  return Unit_instance;
}
var BodyProgress$lambda$slambdaClass;
function BodyProgress$lambda$slambda() {
  if (BodyProgress$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      q50(request, content, $completion) {
        var tmp = this.r50(request, content, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = p1 instanceof HttpRequestBuilder() ? p1 : THROW_CCE();
        return this.q50(tmp, p2 instanceof OutgoingContent() ? p2 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              var tmp0_elvis_lhs = this.o50_1.l4q_1.g3h(get_UploadProgressListenerAttributeKey());
              var tmp_0;
              if (tmp0_elvis_lhs == null) {
                return null;
              } else {
                tmp_0 = tmp0_elvis_lhs;
              }
              var listener = tmp_0;
              return new (ObservableContent())(this.p50_1, this.o50_1.k4q_1, listener);
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      r50(request, content, completion) {
        var i = new (BodyProgress$lambda$slambda())(completion);
        i.o50_1 = request;
        i.p50_1 = content;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    BodyProgress$lambda$slambdaClass = $;
  }
  return BodyProgress$lambda$slambdaClass;
}
function BodyProgress$lambda$slambda_0(resultContinuation) {
  var i = new (BodyProgress$lambda$slambda())(resultContinuation);
  var l = function (request, content, $completion) {
    return i.q50(request, content, $completion);
  };
  l.$arity = 2;
  return l;
}
var BodyProgress$lambda$slambdaClass_0;
function BodyProgress$lambda$slambda_1() {
  if (BodyProgress$lambda$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      b51(response, $completion) {
        var tmp = this.c51(response, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.b51(p1 instanceof HttpResponse() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              var tmp0_elvis_lhs = this.a51_1.d4s().w4r().x4r().g3h(get_DownloadProgressListenerAttributeKey());
              var tmp_0;
              if (tmp0_elvis_lhs == null) {
                return null;
              } else {
                tmp_0 = tmp0_elvis_lhs;
              }
              var listener = tmp_0;
              return withObservableDownload(this.a51_1, listener);
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      c51(response, completion) {
        var i = new (BodyProgress$lambda$slambda_1())(completion);
        i.a51_1 = response;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    BodyProgress$lambda$slambdaClass_0 = $;
  }
  return BodyProgress$lambda$slambdaClass_0;
}
function BodyProgress$lambda$slambda_2(resultContinuation) {
  var i = new (BodyProgress$lambda$slambda_1())(resultContinuation);
  var l = function (response, $completion) {
    return i.b51(response, $completion);
  };
  l.$arity = 1;
  return l;
}
function withObservableDownload$lambda($observableByteChannel) {
  return function ($this$replaceResponse) {
    return $observableByteChannel;
  };
}
var properties_initialized_BodyProgress_kt_pmfrhr;
function _init_properties_BodyProgress_kt__s0v569() {
  if (!properties_initialized_BodyProgress_kt_pmfrhr) {
    properties_initialized_BodyProgress_kt_pmfrhr = true;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'UploadProgressListenerAttributeKey';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp = getKClass(ProgressListener());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_0;
    try {
      tmp_0 = createKType(getKClass(ProgressListener()), arrayOf([]), false);
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
    UploadProgressListenerAttributeKey = new (AttributeKey())(name, tmp$ret$1);
    // Inline function 'io.ktor.util.AttributeKey' call
    var name_0 = 'DownloadProgressListenerAttributeKey';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp_2 = getKClass(ProgressListener());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_3;
    try {
      tmp_3 = createKType(getKClass(ProgressListener()), arrayOf([]), false);
    } catch ($p) {
      var tmp_4;
      if ($p instanceof Error) {
        var _unused_var__etf5q3_0 = $p;
        tmp_4 = null;
      } else {
        throw $p;
      }
      tmp_3 = tmp_4;
    }
    var tmp$ret$0_0 = tmp_3;
    var tmp$ret$1_0 = new (TypeInfo())(tmp_2, tmp$ret$0_0);
    DownloadProgressListenerAttributeKey = new (AttributeKey())(name_0, tmp$ret$1_0);
    BodyProgress = createClientPlugin('BodyProgress', BodyProgress$lambda);
  }
}
//region block: init
AfterRenderHook_instance = new (AfterRenderHook())();
AfterReceiveHook_instance = new (AfterReceiveHook())();
//endregion
//region block: exports
export {
  get_BodyProgress as get_BodyProgresstom4nhodv8bj,
};
//endregion

//# sourceMappingURL=BodyProgress.mjs.map
