import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import {
  Charsets_getInstanceqs70pvl4noow as Charsets_getInstance,
  get_name2f11g4r0d5pxp as get_name,
} from '../../../../../ktor-ktor-io/io/ktor/utils/io/charsets/Charset.js.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance } from '../request/HttpRequestPipeline.mjs';
import {
  isSuspendFunction153vlp5l2npj9 as isSuspendFunction,
  isInterface3d6p8outrmvmk as isInterface,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { toList2zksu85ukrmi as toList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Maps.mjs';
import {
  sortedWith2csnbbb21k0lg as sortedWith,
  firstOrNull1982767dljvdy as firstOrNull,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { roundToInt1ue8x8yshtznx as roundToInt } from '../../../../../kotlin-kotlin-stdlib/kotlin/math/math.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { Comparator2b3maoeh98xtg as Comparator } from '../../../../../kotlin-kotlin-stdlib/kotlin/ComparatorJs.mjs';
import {
  Text_getInstance1qa6l8g2r3h9g as Text_getInstance,
  charset1dribv3ku48b1 as charset,
  withCharset27k3t3dvzhi4n as withCharset,
} from '../../../../../ktor-ktor-http/io/ktor/http/ContentTypes.mjs';
import { TextContent1rb6ftlpvl1d2 as TextContent } from '../../../../../ktor-ktor-http/io/ktor/http/content/TextContent.mjs';
import {
  charset3qqtyytkmxogi as charset_0,
  contentType2zzm38yxo3syt as contentType,
} from '../../../../../ktor-ktor-http/io/ktor/http/HttpMessageProperties.mjs';
import { readText27783kyxjxi1g as readText } from '../../../../../ktor-ktor-io/io/ktor/utils/io/core/Strings.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { compareValues1n2ayl87ihzfk as compareValues } from '../../../../../kotlin-kotlin-stdlib/kotlin/comparisons/Comparisons.mjs';
import { HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder } from '../request/HttpRequest.mjs';
import { TransformResponseBodyContext1axf7xx6ifwbj as TransformResponseBodyContext } from './api/KtorCallContexts.mjs';
import { HttpResponse1532ob1hsse1y as HttpResponse } from '../statement/HttpResponse.mjs';
import { ByteReadChannel2wzou76jce72d as ByteReadChannel } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannel.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { readRemaining1x8kk1vq7p6gm as readRemaining } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannelOperations.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
import { createClientPluginjwpvufjows5r as createClientPlugin } from './api/CreatePluginUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_LOGGER() {
  _init_properties_HttpPlainText_kt__iy89z1();
  return LOGGER;
}
var LOGGER;
function get_HttpPlainText() {
  _init_properties_HttpPlainText_kt__iy89z1();
  return HttpPlainText;
}
var HttpPlainText;
var HttpPlainTextConfigClass;
function HttpPlainTextConfig() {
  if (HttpPlainTextConfigClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.mutableSetOf' call
        tmp.y5a_1 = LinkedHashSet().f1();
        var tmp_0 = this;
        // Inline function 'kotlin.collections.mutableMapOf' call
        tmp_0.z5a_1 = LinkedHashMap().sc();
        this.a5b_1 = null;
        this.b5b_1 = Charsets_getInstance().a3g_1;
      }
    }
    initMetadataForClass($, 'HttpPlainTextConfig', HttpPlainTextConfig);
    HttpPlainTextConfigClass = $;
  }
  return HttpPlainTextConfigClass;
}
var RenderRequestHook$install$slambdaClass;
function RenderRequestHook$install$slambda() {
  if (RenderRequestHook$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.k5b_1 = $handler;
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
                this.gd_1 = 4;
                this.fd_1 = 1;
                suspendResult = this.k5b_1(this.l5b_1.o3m_1, this.m5b_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.n5b_1 = suspendResult;
                if (!(this.n5b_1 == null)) {
                  this.fd_1 = 2;
                  suspendResult = this.l5b_1.q3l(this.n5b_1, this);
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
      a4p($this$intercept, content, completion) {
        var i = new (RenderRequestHook$install$slambda())(this.k5b_1, completion);
        i.l5b_1 = $this$intercept;
        i.m5b_1 = content;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    RenderRequestHook$install$slambdaClass = $;
  }
  return RenderRequestHook$install$slambdaClass;
}
function RenderRequestHook$install$slambda_0($handler, resultContinuation) {
  var i = new (RenderRequestHook$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, content, $completion) {
    return i.z4o($this$intercept, content, $completion);
  };
  l.$arity = 2;
  return l;
}
var RenderRequestHookClass;
function RenderRequestHook() {
  if (RenderRequestHookClass === VOID) {
    class $ {
      o5b(client, handler) {
        var tmp = Phases_getInstance().f4z_1;
        client.f4o_1.s3m(tmp, RenderRequestHook$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.o5b(client, (!(handler == null) ? isSuspendFunction(handler, 2) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'RenderRequestHook');
    RenderRequestHookClass = $;
  }
  return RenderRequestHookClass;
}
var RenderRequestHook_instance;
function RenderRequestHook_getInstance() {
  return RenderRequestHook_instance;
}
function HttpPlainTextConfig$_init_$ref_isjudo() {
  var l = function () {
    return new (HttpPlainTextConfig())();
  };
  l.callableName = '<init>';
  return l;
}
function HttpPlainText$lambda($this$createClientPlugin) {
  _init_properties_HttpPlainText_kt__iy89z1();
  // Inline function 'kotlin.collections.sortedByDescending' call
  var this_0 = toList($this$createClientPlugin.c50_1.z5a_1);
  // Inline function 'kotlin.comparisons.compareByDescending' call
  var tmp = HttpPlainText$lambda$lambda;
  var tmp$ret$0 = new (sam$kotlin_Comparator$0())(tmp);
  var withQuality = sortedWith(this_0, tmp$ret$0);
  var responseCharsetFallback = $this$createClientPlugin.c50_1.b5b_1;
  // Inline function 'kotlin.collections.filter' call
  var tmp0 = $this$createClientPlugin.c50_1.y5a_1;
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = tmp0.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    if (!$this$createClientPlugin.c50_1.z5a_1.h3(element)) {
      destination.i(element);
    }
  }
  // Inline function 'kotlin.collections.sortedBy' call
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp_0 = HttpPlainText$lambda$lambda_0;
  var tmp$ret$5 = new (sam$kotlin_Comparator$0())(tmp_0);
  var withoutQuality = sortedWith(destination, tmp$ret$5);
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_1 = StringBuilder().f();
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_0 = withoutQuality.x();
  while (_iterator__ex2g4s_0.y()) {
    var element_0 = _iterator__ex2g4s_0.z();
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(this_1) > 0) {
      this_1.hc(',');
    }
    this_1.hc(get_name(element_0));
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_1 = withQuality.x();
  while (_iterator__ex2g4s_1.y()) {
    var element_1 = _iterator__ex2g4s_1.z();
    var charset = element_1.ch();
    var quality = element_1.dh();
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(this_1) > 0) {
      this_1.hc(',');
    }
    // Inline function 'kotlin.check' call
    if (!(0.0 <= quality ? quality <= 1.0 : false)) {
      throw IllegalStateException().o5('Check failed.');
    }
    // Inline function 'kotlin.math.roundToInt' call
    var this_2 = 100 * quality;
    var truncatedQuality = roundToInt(this_2) / 100.0;
    this_1.hc(get_name(charset) + ';q=' + truncatedQuality);
  }
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(this_1) === 0) {
    this_1.hc(get_name(responseCharsetFallback));
  }
  var acceptCharsetHeader = this_1.toString();
  var tmp0_elvis_lhs = $this$createClientPlugin.c50_1.a5b_1;
  var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? firstOrNull(withoutQuality) : tmp0_elvis_lhs;
  var tmp_1;
  if (tmp1_elvis_lhs == null) {
    var tmp2_safe_receiver = firstOrNull(withQuality);
    tmp_1 = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.ah_1;
  } else {
    tmp_1 = tmp1_elvis_lhs;
  }
  var tmp3_elvis_lhs = tmp_1;
  var requestCharset = tmp3_elvis_lhs == null ? Charsets_getInstance().a3g_1 : tmp3_elvis_lhs;
  var tmp_2 = RenderRequestHook_instance;
  $this$createClientPlugin.f50(tmp_2, HttpPlainText$lambda$slambda_0(acceptCharsetHeader, requestCharset, null));
  $this$createClientPlugin.p5b(HttpPlainText$lambda$slambda_2(responseCharsetFallback, null));
  return Unit_instance;
}
var sam$kotlin_Comparator$0Class;
function sam$kotlin_Comparator$0() {
  if (sam$kotlin_Comparator$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.q5b_1 = function_0;
      }
      al(a, b) {
        return this.q5b_1(a, b);
      }
      compare(a, b) {
        return this.al(a, b);
      }
      z4() {
        return this.q5b_1;
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, Comparator()) : false) {
          var tmp_0;
          if (!(other == null) ? isInterface(other, FunctionAdapter()) : false) {
            tmp_0 = equals(this.z4(), other.z4());
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.z4());
      }
    }
    initMetadataForClass($, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator(), FunctionAdapter()]);
    sam$kotlin_Comparator$0Class = $;
  }
  return sam$kotlin_Comparator$0Class;
}
function invoke$wrapContent(requestCharset, request, content, requestContentType) {
  var contentType = requestContentType == null ? Text_getInstance().z3p_1 : requestContentType;
  var tmp2_elvis_lhs = requestContentType == null ? null : charset(requestContentType);
  var charset_0 = tmp2_elvis_lhs == null ? requestCharset : tmp2_elvis_lhs;
  get_LOGGER().u3n('Sending request body to ' + request.g4q_1.toString() + ' as text/plain with charset ' + charset_0.toString());
  return new (TextContent())(content, withCharset(contentType, charset_0));
}
function invoke$read(responseCharsetFallback, call, body) {
  var tmp0_elvis_lhs = charset_0(call.g4p());
  var actualCharset = tmp0_elvis_lhs == null ? responseCharsetFallback : tmp0_elvis_lhs;
  get_LOGGER().u3n('Reading response body for ' + call.w4r().f4s().toString() + ' as String with charset ' + actualCharset.toString());
  return readText(body, actualCharset);
}
function invoke$addCharsetHeaders(acceptCharsetHeader, context) {
  if (!(context.i4q_1.lk(HttpHeaders_getInstance().t3q_1) == null))
    return Unit_instance;
  get_LOGGER().u3n('Adding Accept-Charset=' + acceptCharsetHeader + ' to ' + context.g4q_1.toString());
  context.i4q_1.h3j(HttpHeaders_getInstance().t3q_1, acceptCharsetHeader);
}
function HttpPlainText$lambda$lambda(a, b) {
  _init_properties_HttpPlainText_kt__iy89z1();
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.bh_1;
  var tmp$ret$1 = a.bh_1;
  return compareValues(tmp, tmp$ret$1);
}
function HttpPlainText$lambda$lambda_0(a, b) {
  _init_properties_HttpPlainText_kt__iy89z1();
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = get_name(a);
  var tmp$ret$1 = get_name(b);
  return compareValues(tmp, tmp$ret$1);
}
var HttpPlainText$lambda$slambdaClass;
function HttpPlainText$lambda$slambda() {
  if (HttpPlainText$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($acceptCharsetHeader, $requestCharset, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.z5b_1 = $acceptCharsetHeader;
        $box.a5c_1 = $requestCharset;
        super(resultContinuation, $box);
      }
      d5c(request, content, $completion) {
        var tmp = this.e5c(request, content, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = p1 instanceof HttpRequestBuilder() ? p1 : THROW_CCE();
        return this.d5c(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              invoke$addCharsetHeaders(this.z5b_1, this.b5c_1);
              var tmp_0 = this.c5c_1;
              if (!(typeof tmp_0 === 'string'))
                return null;
              var contentType_0 = contentType(this.b5c_1);
              if (!(contentType_0 == null) && !(contentType_0.g3o_1 === Text_getInstance().z3p_1.g3o_1)) {
                return null;
              }
              return invoke$wrapContent(this.a5c_1, this.b5c_1, this.c5c_1, contentType_0);
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      e5c(request, content, completion) {
        var i = new (HttpPlainText$lambda$slambda())(this.z5b_1, this.a5c_1, completion);
        i.b5c_1 = request;
        i.c5c_1 = content;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpPlainText$lambda$slambdaClass = $;
  }
  return HttpPlainText$lambda$slambdaClass;
}
function HttpPlainText$lambda$slambda_0($acceptCharsetHeader, $requestCharset, resultContinuation) {
  var i = new (HttpPlainText$lambda$slambda())($acceptCharsetHeader, $requestCharset, resultContinuation);
  var l = function (request, content, $completion) {
    return i.d5c(request, content, $completion);
  };
  l.$arity = 2;
  return l;
}
var HttpPlainText$lambda$slambdaClass_0;
function HttpPlainText$lambda$slambda_1() {
  if (HttpPlainText$lambda$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($responseCharsetFallback, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.n5c_1 = $responseCharsetFallback;
        super(resultContinuation, $box);
      }
      s5c($this$transformResponseBody, response, content, requestedType, $completion) {
        var tmp = this.t5c($this$transformResponseBody, response, content, requestedType, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      u5c(p1, p2, p3, p4, $completion) {
        var tmp = p1 instanceof TransformResponseBodyContext() ? p1 : THROW_CCE();
        var tmp_0 = p2 instanceof HttpResponse() ? p2 : THROW_CCE();
        var tmp_1 = (!(p3 == null) ? isInterface(p3, ByteReadChannel()) : false) ? p3 : THROW_CCE();
        return this.s5c(tmp, tmp_0, tmp_1, p4 instanceof TypeInfo() ? p4 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                if (!this.r5c_1.g3n_1.equals(PrimitiveClasses_getInstance().mi()))
                  return null;
                this.fd_1 = 1;
                suspendResult = readRemaining(this.q5c_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var bodyBytes = suspendResult;
                return invoke$read(this.n5c_1, this.p5c_1.d4s(), bodyBytes);
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
      t5c($this$transformResponseBody, response, content, requestedType, completion) {
        var i = new (HttpPlainText$lambda$slambda_1())(this.n5c_1, completion);
        i.o5c_1 = $this$transformResponseBody;
        i.p5c_1 = response;
        i.q5c_1 = content;
        i.r5c_1 = requestedType;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [4]);
    HttpPlainText$lambda$slambdaClass_0 = $;
  }
  return HttpPlainText$lambda$slambdaClass_0;
}
function HttpPlainText$lambda$slambda_2($responseCharsetFallback, resultContinuation) {
  var i = new (HttpPlainText$lambda$slambda_1())($responseCharsetFallback, resultContinuation);
  var l = function ($this$transformResponseBody, response, content, requestedType, $completion) {
    return i.s5c($this$transformResponseBody, response, content, requestedType, $completion);
  };
  l.$arity = 4;
  return l;
}
var properties_initialized_HttpPlainText_kt_2nx4ox;
function _init_properties_HttpPlainText_kt__iy89z1() {
  if (!properties_initialized_HttpPlainText_kt_2nx4ox) {
    properties_initialized_HttpPlainText_kt_2nx4ox = true;
    LOGGER = KtorSimpleLogger('io.ktor.client.plugins.HttpPlainText');
    var tmp = HttpPlainTextConfig$_init_$ref_isjudo();
    HttpPlainText = createClientPlugin('HttpPlainText', tmp, HttpPlainText$lambda);
  }
}
//region block: init
RenderRequestHook_instance = new (RenderRequestHook())();
//endregion
//region block: exports
export {
  get_HttpPlainText as get_HttpPlainText2hd9sygnz4kij,
};
//endregion

//# sourceMappingURL=HttpPlainText.mjs.map
