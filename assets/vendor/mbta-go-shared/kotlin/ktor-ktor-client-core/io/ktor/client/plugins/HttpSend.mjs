import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import {
  OutgoingContent3t2ohmyam9o76 as OutgoingContent,
  NullBody_instance2i6w0hfghwfg0 as NullBody_instance,
} from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import {
  getKClassFromExpression3vpejubogshaw as getKClassFromExpression,
  getKClass1s3j9wy1cofik as getKClass,
} from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  toString1pkumu07cwy4m as toString,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { contentType2zzm38yxo3syt as contentType } from '../../../../../ktor-ktor-http/io/ktor/http/HttpMessageProperties.mjs';
import {
  toString30pk9tzaqopn as toString_0,
  arrayOf1akklvh2at202 as arrayOf,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { trimMarginhyd3fsmh8iev as trimMargin } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/Indent.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { reversed22y3au42jl32b as reversed } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { cancel36mj9lv3a0whl as cancel } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { HttpClientCall2j6myj8ctykar as HttpClientCall } from '../call/HttpClientCall.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance } from '../request/HttpRequestPipeline.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var SenderClass;
function Sender() {
  if (SenderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Sender', VOID, VOID, VOID, [1]);
    SenderClass = $;
  }
  return SenderClass;
}
var HttpSend$Plugin$install$slambdaClass;
function HttpSend$Plugin$install$slambda() {
  if (HttpSend$Plugin$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($plugin, $scope, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.y5f_1 = $plugin;
        $box.z5f_1 = $scope;
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
                var tmp_0 = this.b5g_1;
                if (!(tmp_0 instanceof OutgoingContent())) {
                  var message = trimMargin('\n|Fail to prepare request body for sending. \n|The body type is: ' + toString(getKClassFromExpression(this.b5g_1)) + ', with Content-Type: ' + toString_0(contentType(this.a5g_1.o3m_1)) + '.\n|\n|If you expect serialized body, please check that you have installed the corresponding plugin(like `ContentNegotiation`) and set `Content-Type` header.');
                  throw IllegalStateException().o5(toString(message));
                }

                var tmp0 = this.a5g_1.o3m_1;
                var body = this.b5g_1;
                if (body == null) {
                  tmp0.j4q_1 = NullBody_instance;
                  var tmp_1 = getKClass(OutgoingContent());
                  var tmp_2;
                  try {
                    tmp_2 = createKType(getKClass(OutgoingContent()), arrayOf([]), false);
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
                  tmp0.i4x(new (TypeInfo())(tmp_1, tmp_2));
                } else {
                  if (body instanceof OutgoingContent()) {
                    tmp0.j4q_1 = body;
                    tmp0.i4x(null);
                  } else {
                    tmp0.j4q_1 = body;
                    var tmp_4 = getKClass(OutgoingContent());
                    var tmp_5;
                    try {
                      tmp_5 = createKType(getKClass(OutgoingContent()), arrayOf([]), false);
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
                    tmp0.i4x(new (TypeInfo())(tmp_4, tmp_5));
                  }
                }

                this.c5g_1 = new (DefaultSender())(this.y5f_1.f5g_1, this.z5f_1);
                this.d5g_1 = this.c5g_1;
                var _iterator__ex2g4s = reversed(this.y5f_1.g5g_1).x();
                while (_iterator__ex2g4s.y()) {
                  var interceptor = _iterator__ex2g4s.z();
                  this.d5g_1 = new (InterceptedSender())(interceptor, this.d5g_1);
                }

                this.fd_1 = 1;
                suspendResult = this.d5g_1.p5f(this.a5g_1.o3m_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.e5g_1 = suspendResult;
                this.fd_1 = 2;
                suspendResult = this.a5g_1.q3l(this.e5g_1, this);
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
        var i = new (HttpSend$Plugin$install$slambda())(this.y5f_1, this.z5f_1, completion);
        i.a5g_1 = $this$intercept;
        i.b5g_1 = content;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpSend$Plugin$install$slambdaClass = $;
  }
  return HttpSend$Plugin$install$slambdaClass;
}
function HttpSend$Plugin$install$slambda_0($plugin, $scope, resultContinuation) {
  var i = new (HttpSend$Plugin$install$slambda())($plugin, $scope, resultContinuation);
  var l = function ($this$intercept, content, $completion) {
    return i.z4o($this$intercept, content, $completion);
  };
  l.$arity = 2;
  return l;
}
var $executeCOROUTINE$Class;
function $executeCOROUTINE$() {
  if ($executeCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, requestBuilder, resultContinuation) {
        super(resultContinuation);
        this.p5g_1 = _this__u8e3s4;
        this.q5g_1 = requestBuilder;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                var tmp0_safe_receiver = this.p5g_1.u5g_1;
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  cancel(tmp0_safe_receiver);
                }

                if (this.p5g_1.t5g_1 >= this.p5g_1.r5g_1) {
                  throw SendCountExceedException().z5g('Max send count ' + this.p5g_1.r5g_1 + ' exceeded. Consider increasing the property ' + 'maxSendCount if more is required.');
                }

                var _unary__edvuaz = this.p5g_1.t5g_1;
                this.p5g_1.t5g_1 = _unary__edvuaz + 1 | 0;
                this.fd_1 = 1;
                suspendResult = this.p5g_1.s5g_1.h4o_1.n3m(this.q5g_1, this.q5g_1.j4q_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var sendResult = suspendResult;
                var tmp1_elvis_lhs = sendResult instanceof HttpClientCall() ? sendResult : null;
                var tmp_0;
                if (tmp1_elvis_lhs == null) {
                  var message = 'Failed to execute send pipeline. Expected [HttpClientCall], but received ' + toString(sendResult);
                  throw IllegalStateException().o5(toString(message));
                } else {
                  tmp_0 = tmp1_elvis_lhs;
                }

                var call = tmp_0;
                this.p5g_1.u5g_1 = call;
                return call;
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
var ConfigClass;
function Config() {
  if (ConfigClass === VOID) {
    class $ {
      constructor() {
        this.a5h_1 = 20;
      }
    }
    initMetadataForClass($, 'Config', Config);
    ConfigClass = $;
  }
  return ConfigClass;
}
var PluginClass;
function Plugin() {
  if (PluginClass === VOID) {
    class $ {
      constructor() {
        Plugin_instance = this;
        var tmp = this;
        // Inline function 'io.ktor.util.AttributeKey' call
        var name = 'HttpSend';
        // Inline function 'io.ktor.util.reflect.typeInfo' call
        var tmp_0 = getKClass(HttpSend());
        // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
        var tmp_1;
        try {
          tmp_1 = createKType(getKClass(HttpSend()), arrayOf([]), false);
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
        tmp.b5h_1 = new (AttributeKey())(name, tmp$ret$1);
      }
      u1() {
        return this.b5h_1;
      }
      c5h(block) {
        // Inline function 'kotlin.apply' call
        var this_0 = new (Config())();
        block(this_0);
        var config = this_0;
        return new (HttpSend())(config.a5h_1);
      }
      m4r(block) {
        return this.c5h(block);
      }
      d5h(plugin, scope) {
        var tmp = Phases_getInstance().g4z_1;
        scope.f4o_1.s3m(tmp, HttpSend$Plugin$install$slambda_0(plugin, scope, null));
      }
      n4r(plugin, scope) {
        return this.d5h(plugin instanceof HttpSend() ? plugin : THROW_CCE(), scope);
      }
    }
    initMetadataForObject($, 'Plugin');
    PluginClass = $;
  }
  return PluginClass;
}
var Plugin_instance;
function Plugin_getInstance() {
  if (Plugin_instance === VOID)
    new (Plugin())();
  return Plugin_instance;
}
var InterceptedSenderClass;
function InterceptedSender() {
  if (InterceptedSenderClass === VOID) {
    class $ {
      constructor(interceptor, nextSender) {
        this.e5h_1 = interceptor;
        this.f5h_1 = nextSender;
      }
      p5f(requestBuilder, $completion) {
        return this.e5h_1(this.f5h_1, requestBuilder, $completion);
      }
    }
    initMetadataForClass($, 'InterceptedSender', VOID, VOID, [Sender()], [1]);
    InterceptedSenderClass = $;
  }
  return InterceptedSenderClass;
}
var DefaultSenderClass;
function DefaultSender() {
  if (DefaultSenderClass === VOID) {
    class $ {
      constructor(maxSendCount, client) {
        this.r5g_1 = maxSendCount;
        this.s5g_1 = client;
        this.t5g_1 = 0;
        this.u5g_1 = null;
      }
      p5f(requestBuilder, $completion) {
        var tmp = new ($executeCOROUTINE$())(this, requestBuilder, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    initMetadataForClass($, 'DefaultSender', VOID, VOID, [Sender()], [1]);
    DefaultSenderClass = $;
  }
  return DefaultSenderClass;
}
var HttpSendClass;
function HttpSend() {
  if (HttpSendClass === VOID) {
    class $ {
      constructor(maxSendCount) {
        Plugin_getInstance();
        maxSendCount = maxSendCount === VOID ? 20 : maxSendCount;
        this.f5g_1 = maxSendCount;
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.g5g_1 = ArrayList().g1();
      }
      g5h(block) {
        // Inline function 'kotlin.collections.plusAssign' call
        this.g5g_1.i(block);
      }
    }
    initMetadataForClass($, 'HttpSend');
    HttpSendClass = $;
  }
  return HttpSendClass;
}
var SendCountExceedExceptionClass;
function SendCountExceedException() {
  if (SendCountExceedExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static z5g(message) {
        var $this = this.o5(message);
        captureStack($this, $this.y5g_1);
        return $this;
      }
    }
    initMetadataForClass($, 'SendCountExceedException');
    SendCountExceedExceptionClass = $;
  }
  return SendCountExceedExceptionClass;
}
//region block: exports
export {
  Plugin_getInstance as Plugin_getInstanceqq5mcce07h6c,
  Sender as Sender4pyqqer9k7up,
};
//endregion

//# sourceMappingURL=HttpSend.mjs.map
