import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance } from '../request/HttpRequestPipeline.mjs';
import {
  Phases_getInstance3cv4l5wlctlnh as Phases_getInstance_0,
  HttpResponseContainer3r9yzy4mwwvc9 as HttpResponseContainer,
} from '../statement/HttpResponsePipeline.mjs';
import {
  platformResponseDefaultTransformers258gm9ywvn5cc as platformResponseDefaultTransformers,
  platformRequestDefaultTransformv8a3p2llr8mo as platformRequestDefaultTransform,
} from './DefaultTransformJs.mjs';
import {
  ByteArrayContent2n0wb43y6ugs1 as ByteArrayContent,
  ReadChannelContentz1amb4hnpqp4 as ReadChannelContent,
  OutgoingContent3t2ohmyam9o76 as OutgoingContent,
} from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  Application_getInstanceq87g3bor693u as Application_getInstance,
  Text_getInstance1qa6l8g2r3h9g as Text_getInstance,
  Companion_getInstancecf9b3ybko8sp as Companion_getInstance,
  MultiPart_getInstance1zzge3g94afj6 as MultiPart_getInstance,
} from '../../../../../ktor-ktor-http/io/ktor/http/ContentTypes.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import {
  toLongkk4waq8msp1k as toLong_0,
  toInt2q8uldh7sc951 as toInt,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/text/numberConversions.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  Unit_instance1fbcbse1fwigr as Unit_instance,
  Unitkvevlwgzwiuc as Unit,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import {
  contentType2zzm38yxo3syt as contentType,
  contentLength2suzxu1lzutku as contentLength,
} from '../../../../../ktor-ktor-http/io/ktor/http/HttpMessageProperties.mjs';
import {
  ByteReadChannel2wzou76jce72d as ByteReadChannel,
  canceldn4b3cdqcfny as cancel,
} from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannel.mjs';
import {
  isInterface3d6p8outrmvmk as isInterface,
  isByteArray4nnzfn1x4o3w as isByteArray,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { TextContent1rb6ftlpvl1d2 as TextContent } from '../../../../../ktor-ktor-http/io/ktor/http/content/TextContent.mjs';
import {
  getKClassFromExpression3vpejubogshaw as getKClassFromExpression,
  getKClass1s3j9wy1cofik as getKClass,
} from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  WriterScope3b0bo1enaee6b as WriterScope,
  writer1eia5its2a1fh as writer,
  invokeOnCompletion1ziuxzoag0iwj as invokeOnCompletion,
} from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteWriteChannelOperations.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  copyTo2vm7vz7rr51or as copyTo,
  toByteArrayafjflk7yznm4 as toByteArray,
  readRemaining1x8kk1vq7p6gm as readRemaining,
} from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannelOperations.mjs';
import {
  cancel2ztysw4v4hav6 as cancel_0,
  cancel36mj9lv3a0whl as cancel_1,
} from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { CIOMultipartDataBase3o5u8w437tq5s as CIOMultipartDataBase } from '../../../../../ktor-ktor-http-cio/io/ktor/http/cio/CIOMultipartDataBase.mjs';
import { MultiPartData57syw40llxls as MultiPartData } from '../../../../../ktor-ktor-http/io/ktor/http/content/Multipart.mjs';
import { HttpStatusCode3o1wkms10pg4k as HttpStatusCode } from '../../../../../ktor-ktor-http/io/ktor/http/HttpStatusCode.mjs';
import {
  Key_instance2tirv2rj82ml4 as Key_instance,
  Job13y4jkazwjho0 as Job,
} from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { Source1shr0ps16u4p4 as Source } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Source.mjs';
import { checkContentLength1q7i15kkn2eie as checkContentLength } from '../call/utils.mjs';
import { readText3frapgncbqrcg as readText } from '../../../../../ktor-ktor-io/io/ktor/utils/io/Deprecation.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_LOGGER() {
  _init_properties_DefaultTransform_kt__20knxx();
  return LOGGER;
}
var LOGGER;
function defaultTransformers(_this__u8e3s4) {
  _init_properties_DefaultTransform_kt__20knxx();
  var tmp = Phases_getInstance().f4z_1;
  _this__u8e3s4.f4o_1.s3m(tmp, defaultTransformers$slambda_0(null));
  var tmp_0 = Phases_getInstance_0().g4r_1;
  _this__u8e3s4.g4o_1.s3m(tmp_0, defaultTransformers$slambda_2(_this__u8e3s4, null));
  platformResponseDefaultTransformers(_this__u8e3s4);
}
var defaultTransformers$2$content$1Class;
function defaultTransformers$2$content$1() {
  if (defaultTransformers$2$content$1Class === VOID) {
    class $ extends ByteArrayContent() {
      constructor($contentType, $body, $box) {
        if ($box === VOID)
          $box = {};
        $box.y53_1 = $body;
        super($box);
        var tmp = this;
        tmp.w53_1 = $contentType == null ? Application_getInstance().w3o_1 : $contentType;
        this.x53_1 = toLong($body.length);
      }
      d41() {
        return this.w53_1;
      }
      e41() {
        return this.x53_1;
      }
      f41() {
        return this.y53_1;
      }
    }
    initMetadataForClass($);
    defaultTransformers$2$content$1Class = $;
  }
  return defaultTransformers$2$content$1Class;
}
var defaultTransformers$2$content$2Class;
function defaultTransformers$2$content$2() {
  if (defaultTransformers$2$content$2Class === VOID) {
    class $ extends ReadChannelContent() {
      constructor($this_intercept, $contentType, $body, $box) {
        if ($box === VOID)
          $box = {};
        $box.c54_1 = $body;
        super($box);
        var tmp = this;
        var tmp0_safe_receiver = $this_intercept.o3m_1.i4q_1.lk(HttpHeaders_getInstance().h3r_1);
        tmp.a54_1 = tmp0_safe_receiver == null ? null : toLong_0(tmp0_safe_receiver);
        var tmp_0 = this;
        tmp_0.b54_1 = $contentType == null ? Application_getInstance().w3o_1 : $contentType;
      }
      e41() {
        return this.a54_1;
      }
      d41() {
        return this.b54_1;
      }
      q41() {
        return this.c54_1;
      }
    }
    initMetadataForClass($);
    defaultTransformers$2$content$2Class = $;
  }
  return defaultTransformers$2$content$2Class;
}
var defaultTransformers$slambdaClass;
function defaultTransformers$slambda() {
  if (defaultTransformers$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      z4o($this$intercept, body, $completion) {
        var tmp = this.a4p($this$intercept, body, $completion);
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
                if (this.l54_1.o3m_1.i4q_1.lk(HttpHeaders_getInstance().s3q_1) == null) {
                  this.l54_1.o3m_1.i4q_1.j3j(HttpHeaders_getInstance().s3q_1, '*/*');
                }

                this.n54_1 = contentType(this.l54_1.o3m_1);
                var tmp_0 = this;
                var tmp0_subject = this.m54_1;
                var tmp_1;
                if (typeof tmp0_subject === 'string') {
                  var tmp1_elvis_lhs = this.n54_1;
                  tmp_1 = new (TextContent())(this.m54_1, tmp1_elvis_lhs == null ? Text_getInstance().z3p_1 : tmp1_elvis_lhs);
                } else {
                  if (isByteArray(tmp0_subject)) {
                    tmp_1 = new (defaultTransformers$2$content$1())(this.n54_1, this.m54_1);
                  } else {
                    if (isInterface(tmp0_subject, ByteReadChannel())) {
                      tmp_1 = new (defaultTransformers$2$content$2())(this.l54_1, this.n54_1, this.m54_1);
                    } else {
                      if (tmp0_subject instanceof OutgoingContent()) {
                        tmp_1 = this.m54_1;
                      } else {
                        tmp_1 = platformRequestDefaultTransform(this.n54_1, this.l54_1.o3m_1, this.m54_1);
                      }
                    }
                  }
                }

                tmp_0.o54_1 = tmp_1;
                var tmp2_safe_receiver = this.o54_1;
                if (!((tmp2_safe_receiver == null ? null : tmp2_safe_receiver.d41()) == null)) {
                  this.l54_1.o3m_1.i4q_1.m3j(HttpHeaders_getInstance().k3r_1);
                  get_LOGGER().u3n('Transformed with default transformers request body for ' + this.l54_1.o3m_1.g4q_1.toString() + ' from ' + toString(getKClassFromExpression(this.m54_1)));
                  this.fd_1 = 1;
                  suspendResult = this.l54_1.q3l(this.o54_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 1:
                this.fd_1 = 2;
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
      a4p($this$intercept, body, completion) {
        var i = new (defaultTransformers$slambda())(completion);
        i.l54_1 = $this$intercept;
        i.m54_1 = body;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    defaultTransformers$slambdaClass = $;
  }
  return defaultTransformers$slambdaClass;
}
function defaultTransformers$slambda_0(resultContinuation) {
  var i = new (defaultTransformers$slambda())(resultContinuation);
  var l = function ($this$intercept, body, $completion) {
    return i.z4o($this$intercept, body, $completion);
  };
  l.$arity = 2;
  return l;
}
var defaultTransformers$slambda$slambdaClass;
function defaultTransformers$slambda$slambda() {
  if (defaultTransformers$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($body, $response, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.x54_1 = $body;
        $box.y54_1 = $response;
        super(resultContinuation, $box);
      }
      r47($this$writer, $completion) {
        var tmp = this.s47($this$writer, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.r47(p1 instanceof WriterScope() ? p1 : THROW_CCE(), $completion);
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
                suspendResult = copyTo(this.x54_1, this.z54_1.q3d_1, new (Long())(-1, 2147483647), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.a55_1 = suspendResult;
                this.gd_1 = 3;
                this.fd_1 = 4;
                continue $sm;
              case 2:
                this.gd_1 = 3;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof CancellationException()) {
                  var cause = this.id_1;
                  var tmp_1 = this;
                  cancel_1(this.y54_1, cause);
                  throw cause;
                } else {
                  var tmp_2 = this.id_1;
                  if (tmp_2 instanceof Error) {
                    var cause_0 = this.id_1;
                    var tmp_3 = this;
                    cancel_0(this.y54_1, 'Receive failed', cause_0);
                    throw cause_0;
                  } else {
                    throw this.id_1;
                  }
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
      s47($this$writer, completion) {
        var i = new (defaultTransformers$slambda$slambda())(this.x54_1, this.y54_1, completion);
        i.z54_1 = $this$writer;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    defaultTransformers$slambda$slambdaClass = $;
  }
  return defaultTransformers$slambda$slambdaClass;
}
function defaultTransformers$slambda$slambda_0($body, $response, resultContinuation) {
  var i = new (defaultTransformers$slambda$slambda())($body, $response, resultContinuation);
  var l = function ($this$writer, $completion) {
    return i.r47($this$writer, $completion);
  };
  l.$arity = 1;
  return l;
}
function defaultTransformers$slambda$lambda($responseJobHolder) {
  return function (it) {
    $responseJobHolder.i28();
    return Unit_instance;
  };
}
var defaultTransformers$slambdaClass_0;
function defaultTransformers$slambda_1() {
  if (defaultTransformers$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($this_defaultTransformers, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.j55_1 = $this_defaultTransformers;
        super(resultContinuation, $box);
      }
      u4p($this$intercept, _destruct__k2r9zo, $completion) {
        var tmp = this.v4p($this$intercept, _destruct__k2r9zo, $completion);
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
                this.gd_1 = 12;
                this.m55_1 = this.l55_1.ch();
                this.n55_1 = this.l55_1.dh();
                var tmp_0 = this.n55_1;
                if (!isInterface(tmp_0, ByteReadChannel()))
                  return Unit_instance;
                this.o55_1 = this.k55_1.o3m_1.g4p();
                this.p55_1 = this.m55_1.g3n_1;
                if (this.p55_1.equals(getKClass(Unit()))) {
                  cancel(this.n55_1);
                  this.fd_1 = 10;
                  suspendResult = this.k55_1.q3l(new (HttpResponseContainer())(this.m55_1, Unit_instance), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (this.p55_1.equals(PrimitiveClasses_getInstance().ii())) {
                    this.fd_1 = 8;
                    suspendResult = readRemaining(this.n55_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    if (this.p55_1.equals(getKClass(Source())) || this.p55_1.equals(getKClass(Source()))) {
                      this.fd_1 = 6;
                      suspendResult = readRemaining(this.n55_1, this);
                      if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                      }
                      continue $sm;
                    } else {
                      if (this.p55_1.equals(PrimitiveClasses_getInstance().qi())) {
                        this.fd_1 = 4;
                        suspendResult = toByteArray(this.n55_1, this);
                        if (suspendResult === get_COROUTINE_SUSPENDED()) {
                          return suspendResult;
                        }
                        continue $sm;
                      } else {
                        if (this.p55_1.equals(getKClass(ByteReadChannel()))) {
                          this.r55_1 = Job(this.o55_1.w20().sd(Key_instance));
                          var tmp_1 = this;
                          var this_0 = writer(this.k55_1, this.j55_1.e4o_1, VOID, defaultTransformers$slambda$slambda_0(this.n55_1, this.o55_1, null));
                          invokeOnCompletion(this_0, defaultTransformers$slambda$lambda(this.r55_1));
                          tmp_1.s55_1 = this_0.o3d_1;
                          this.fd_1 = 3;
                          suspendResult = this.k55_1.q3l(new (HttpResponseContainer())(this.m55_1, this.s55_1), this);
                          if (suspendResult === get_COROUTINE_SUSPENDED()) {
                            return suspendResult;
                          }
                          continue $sm;
                        } else {
                          if (this.p55_1.equals(getKClass(HttpStatusCode()))) {
                            cancel(this.n55_1);
                            this.fd_1 = 2;
                            suspendResult = this.k55_1.q3l(new (HttpResponseContainer())(this.m55_1, this.o55_1.m4s()), this);
                            if (suspendResult === get_COROUTINE_SUSPENDED()) {
                              return suspendResult;
                            }
                            continue $sm;
                          } else {
                            if (this.p55_1.equals(getKClass(MultiPartData()))) {
                              var tmp_2 = this;
                              var tmp0 = this.k55_1.o3m_1.g4p().l3v().lk(HttpHeaders_getInstance().k3r_1);
                              var tmp$ret$0;
                              l$ret$1: do {
                                if (tmp0 == null) {
                                  var message = 'No content type provided for multipart';
                                  throw IllegalStateException().o5(toString(message));
                                } else {
                                  tmp$ret$0 = tmp0;
                                  break l$ret$1;
                                }
                              }
                               while (false);
                              tmp_2.t55_1 = tmp$ret$0;
                              this.u55_1 = Companion_getInstance().dx(this.t55_1);
                              if (!this.u55_1.m3q(MultiPart_getInstance().t3p_1)) {
                                var message_0 = 'Expected multipart/form-data, got ' + this.u55_1.toString();
                                throw IllegalStateException().o5(toString(message_0));
                              }
                              var tmp_3 = this;
                              var tmp1_safe_receiver = this.k55_1.o3m_1.g4p().l3v().lk(HttpHeaders_getInstance().h3r_1);
                              tmp_3.v55_1 = tmp1_safe_receiver == null ? null : toLong_0(tmp1_safe_receiver);
                              this.w55_1 = new (CIOMultipartDataBase())(this.k55_1.w20(), this.n55_1, this.t55_1, this.v55_1);
                              this.x55_1 = new (HttpResponseContainer())(this.m55_1, this.w55_1);
                              this.fd_1 = 1;
                              suspendResult = this.k55_1.q3l(this.x55_1, this);
                              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                                return suspendResult;
                              }
                              continue $sm;
                            } else {
                              this.q55_1 = null;
                              this.fd_1 = 11;
                              continue $sm;
                            }
                          }
                        }
                      }
                    }
                  }
                }

              case 1:
                this.q55_1 = suspendResult;
                this.fd_1 = 11;
                continue $sm;
              case 2:
                this.q55_1 = suspendResult;
                this.fd_1 = 11;
                continue $sm;
              case 3:
                this.q55_1 = suspendResult;
                this.fd_1 = 11;
                continue $sm;
              case 4:
                this.y55_1 = suspendResult;
                checkContentLength(contentLength(this.k55_1.o3m_1.g4p()), toLong(this.y55_1.length), this.k55_1.o3m_1.w4r().e4s());
                this.fd_1 = 5;
                suspendResult = this.k55_1.q3l(new (HttpResponseContainer())(this.m55_1, this.y55_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                this.q55_1 = suspendResult;
                this.fd_1 = 11;
                continue $sm;
              case 6:
                this.z55_1 = suspendResult;
                this.a56_1 = new (HttpResponseContainer())(this.m55_1, this.z55_1);
                this.fd_1 = 7;
                suspendResult = this.k55_1.q3l(this.a56_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 7:
                this.q55_1 = suspendResult;
                this.fd_1 = 11;
                continue $sm;
              case 8:
                this.b56_1 = suspendResult;
                this.c56_1 = readText(this.b56_1);
                this.d56_1 = toInt(this.c56_1);
                this.e56_1 = new (HttpResponseContainer())(this.m55_1, this.d56_1);
                this.fd_1 = 9;
                suspendResult = this.k55_1.q3l(this.e56_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 9:
                this.q55_1 = suspendResult;
                this.fd_1 = 11;
                continue $sm;
              case 10:
                this.q55_1 = suspendResult;
                this.fd_1 = 11;
                continue $sm;
              case 11:
                var result = this.q55_1;
                if (!(result == null)) {
                  get_LOGGER().u3n('Transformed with default transformers response body ' + ('for ' + this.k55_1.o3m_1.w4r().f4s().toString() + ' to ' + toString(this.m55_1.g3n_1)));
                }

                return Unit_instance;
              case 12:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 12) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      v4p($this$intercept, _destruct__k2r9zo, completion) {
        var i = new (defaultTransformers$slambda_1())(this.j55_1, completion);
        i.k55_1 = $this$intercept;
        i.l55_1 = _destruct__k2r9zo;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    defaultTransformers$slambdaClass_0 = $;
  }
  return defaultTransformers$slambdaClass_0;
}
function defaultTransformers$slambda_2($this_defaultTransformers, resultContinuation) {
  var i = new (defaultTransformers$slambda_1())($this_defaultTransformers, resultContinuation);
  var l = function ($this$intercept, _destruct__k2r9zo, $completion) {
    return i.u4p($this$intercept, _destruct__k2r9zo, $completion);
  };
  l.$arity = 2;
  return l;
}
var properties_initialized_DefaultTransform_kt_ossax9;
function _init_properties_DefaultTransform_kt__20knxx() {
  if (!properties_initialized_DefaultTransform_kt_ossax9) {
    properties_initialized_DefaultTransform_kt_ossax9 = true;
    LOGGER = KtorSimpleLogger('io.ktor.client.plugins.defaultTransformers');
  }
}
//region block: exports
export {
  defaultTransformers as defaultTransformers2r9wd7ftt31zw,
};
//endregion

//# sourceMappingURL=DefaultTransform.mjs.map
