import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CaseInsensitiveMap3bv985x2xrppt as CaseInsensitiveMap } from '../../../../../../ktor-ktor-utils/io/ktor/util/CaseInsensitiveMap.mjs';
import { GZipEncoder_getInstance2spxn7rjznc6w as GZipEncoder_getInstance } from '../../../../../../ktor-ktor-utils/io/ktor/util/ContentEncodersJs.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  captureStack1fzi4aczwc4hg as captureStack,
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { OutgoingContent3t2ohmyam9o76 as OutgoingContent } from '../../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { PipelinePhase2q3d54imxjlma as PipelinePhase } from '../../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelinePhase.mjs';
import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance } from '../../../../../../ktor-ktor-client-core/io/ktor/client/request/HttpRequestPipeline.mjs';
import {
  isSuspendFunction153vlp5l2npj9 as isSuspendFunction,
  isCharSequence1ju9jr1w86plq as isCharSequence,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  HttpResponse1532ob1hsse1y as HttpResponse,
  get_request3dwcif5y0fvf1 as get_request,
} from '../../../../../../ktor-ktor-client-core/io/ktor/client/statement/HttpResponse.mjs';
import { Phases_getInstance2gb8yk5kt1qdy as Phases_getInstance_0 } from '../../../../../../ktor-ktor-client-core/io/ktor/client/statement/HttpResponsePipeline.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { take9j4462mea726 as take } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/_Strings.mjs';
import { get_isTraceEnabled82xibuu04nxp as get_isTraceEnabled } from '../../../../../../ktor-ktor-utils/io/ktor/util/logging/LoggerJs.mjs';
import { shouldDecode1vlfgaq10c2lk as shouldDecode } from './ContentEncoding.jsAndWasmShared.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import {
  split2bvyvnrlcifjv as split,
  trim11nh7r46at6sx as trim,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { asReversed308kw52j6ls1u as asReversed } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ReversedViews.mjs';
import { headers1dh5cg56ach6i as headers } from '../../../../../../ktor-ktor-http/io/ktor/http/Headers.mjs';
import { replaceResponse3ut5eo3odxj99 as replaceResponse } from '../../../../../../ktor-ktor-client-core/io/ktor/client/call/DelegatedCall.mjs';
import { OnRequestContext1tmu5b6bhlblg as OnRequestContext } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/api/KtorCallContexts.mjs';
import { HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder } from '../../../../../../ktor-ktor-client-core/io/ktor/client/request/HttpRequest.mjs';
import { compressed3r8j7meefwnqs as compressed } from '../../../../../../ktor-ktor-http/io/ktor/http/content/CompressedContent.mjs';
import { contentLength2suzxu1lzutku as contentLength } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpMessageProperties.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { Companion_getInstance1p3cpld7r1jz3 as Companion_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpMethod.mjs';
import { equals2v6cggk171b6e as equals_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
import { createClientPluginjwpvufjows5r as createClientPlugin } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/api/CreatePluginUtils.mjs';
import { KtList3hktaavzmj137 as KtList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  createKType1lgox3mzhchp5 as createKType,
  createInvariantKTypeProjection3sfd0u0y62ozd as createInvariantKTypeProjection,
} from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_LOGGER() {
  _init_properties_ContentEncoding_kt__4smi0q();
  return LOGGER;
}
var LOGGER;
function get_ContentEncoding() {
  _init_properties_ContentEncoding_kt__4smi0q();
  return ContentEncoding;
}
var ContentEncoding;
function get_CompressionListAttribute() {
  _init_properties_ContentEncoding_kt__4smi0q();
  return CompressionListAttribute;
}
var CompressionListAttribute;
function get_DecompressionListAttribute() {
  _init_properties_ContentEncoding_kt__4smi0q();
  return DecompressionListAttribute;
}
var DecompressionListAttribute;
var Mode_CompressRequest_instance;
var Mode_DecompressResponse_instance;
var Mode_All_instance;
var Mode_entriesInitialized;
function Mode_initEntries() {
  if (Mode_entriesInitialized)
    return Unit_instance;
  Mode_entriesInitialized = true;
  Mode_CompressRequest_instance = new (Mode())('CompressRequest', 0, true, false);
  Mode_DecompressResponse_instance = new (Mode())('DecompressResponse', 1, false, true);
  Mode_All_instance = new (Mode())('All', 2, true, true);
}
var ModeClass;
function Mode() {
  if (ModeClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, request, response) {
        super(name, ordinal);
        this.y62_1 = request;
        this.z62_1 = response;
      }
    }
    initMetadataForClass($, 'Mode');
    ModeClass = $;
  }
  return ModeClass;
}
function Mode_DecompressResponse_getInstance() {
  Mode_initEntries();
  return Mode_DecompressResponse_instance;
}
var ContentEncodingConfigClass;
function ContentEncodingConfig() {
  if (ContentEncodingConfigClass === VOID) {
    class $ {
      constructor() {
        this.a63_1 = new (CaseInsensitiveMap())();
        this.b63_1 = new (CaseInsensitiveMap())();
        this.c63_1 = Mode_DecompressResponse_getInstance();
      }
      d63(quality) {
        this.e63(GZipEncoder_getInstance(), quality);
      }
      e63(encoder, quality) {
        var name = encoder.y3();
        var tmp0 = this.a63_1;
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        // Inline function 'kotlin.collections.set' call
        var key = name.toLowerCase();
        tmp0.t3(key, encoder);
        if (quality == null) {
          this.b63_1.u3(name);
        } else {
          // Inline function 'kotlin.collections.set' call
          this.b63_1.t3(name, quality);
        }
      }
    }
    initMetadataForClass($, 'ContentEncodingConfig', ContentEncodingConfig);
    ContentEncodingConfigClass = $;
  }
  return ContentEncodingConfigClass;
}
var UnsupportedContentEncodingExceptionClass;
function UnsupportedContentEncodingException() {
  if (UnsupportedContentEncodingExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static j63(encoding) {
        var $this = this.o5('Content-Encoding: ' + encoding + ' unsupported.');
        captureStack($this, $this.i63_1);
        return $this;
      }
    }
    initMetadataForClass($, 'UnsupportedContentEncodingException');
    UnsupportedContentEncodingExceptionClass = $;
  }
  return UnsupportedContentEncodingExceptionClass;
}
var AfterRenderHook$install$slambdaClass;
function AfterRenderHook$install$slambda() {
  if (AfterRenderHook$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.s63_1 = $handler;
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
                var tmp_0 = this.t63_1.p3l();
                suspendResult = this.s63_1(this.t63_1.o3m_1, tmp_0 instanceof OutgoingContent() ? tmp_0 : THROW_CCE(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.v63_1 = suspendResult;
                if (!(this.v63_1 == null)) {
                  this.fd_1 = 2;
                  suspendResult = this.t63_1.q3l(this.v63_1, this);
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
        var i = new (AfterRenderHook$install$slambda())(this.s63_1, completion);
        i.t63_1 = $this$intercept;
        i.u63_1 = it;
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
  var l = function ($this$intercept, it, $completion) {
    return i.z4o($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var AfterRenderHookClass;
function AfterRenderHook() {
  if (AfterRenderHookClass === VOID) {
    class $ {
      constructor() {
        AfterRenderHook_instance = this;
        this.w63_1 = new (PipelinePhase())('AfterRender');
      }
      b4z(client, handler) {
        client.f4o_1.p3m(Phases_getInstance().f4z_1, this.w63_1);
        client.f4o_1.s3m(this.w63_1, AfterRenderHook$install$slambda_0(handler, null));
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
  if (AfterRenderHook_instance === VOID)
    new (AfterRenderHook())();
  return AfterRenderHook_instance;
}
var ReceiveStateHook$install$slambdaClass;
function ReceiveStateHook$install$slambda() {
  if (ReceiveStateHook$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handler, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.f64_1 = $handler;
        super(resultContinuation, $box);
      }
      u4z($this$intercept, it, $completion) {
        var tmp = this.v4z($this$intercept, it, $completion);
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
                suspendResult = this.f64_1(this.h64_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.i64_1 = suspendResult;
                if (!(this.i64_1 == null)) {
                  this.fd_1 = 2;
                  suspendResult = this.g64_1.q3l(this.i64_1, this);
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
      v4z($this$intercept, it, completion) {
        var i = new (ReceiveStateHook$install$slambda())(this.f64_1, completion);
        i.g64_1 = $this$intercept;
        i.h64_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    ReceiveStateHook$install$slambdaClass = $;
  }
  return ReceiveStateHook$install$slambdaClass;
}
function ReceiveStateHook$install$slambda_0($handler, resultContinuation) {
  var i = new (ReceiveStateHook$install$slambda())($handler, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.u4z($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var ReceiveStateHookClass;
function ReceiveStateHook() {
  if (ReceiveStateHookClass === VOID) {
    class $ {
      w4z(client, handler) {
        var tmp = Phases_getInstance_0().y4z_1;
        client.i4o_1.s3m(tmp, ReceiveStateHook$install$slambda_0(handler, null));
      }
      h4z(client, handler) {
        return this.w4z(client, (!(handler == null) ? isSuspendFunction(handler, 1) : false) ? handler : THROW_CCE());
      }
    }
    initMetadataForObject($, 'ReceiveStateHook');
    ReceiveStateHookClass = $;
  }
  return ReceiveStateHookClass;
}
var ReceiveStateHook_instance;
function ReceiveStateHook_getInstance() {
  return ReceiveStateHook_instance;
}
function ContentEncodingConfig$_init_$ref_5w7vdj() {
  var l = function () {
    return new (ContentEncodingConfig())();
  };
  l.callableName = '<init>';
  return l;
}
function ContentEncoding$lambda($this$createClientPlugin) {
  _init_properties_ContentEncoding_kt__4smi0q();
  var encoders = $this$createClientPlugin.c50_1.a63_1;
  var qualityValues = $this$createClientPlugin.c50_1.b63_1;
  var mode = $this$createClientPlugin.c50_1.c63_1;
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  var _iterator__ex2g4s = encoders.l3().x();
  $l$loop: while (_iterator__ex2g4s.y()) {
    var encoder = _iterator__ex2g4s.z();
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(this_0) > 0) {
      this_0.ic(_Char___init__impl__6a9atx(44));
    }
    this_0.hc(encoder.y3());
    var tmp0_elvis_lhs = qualityValues.j3(encoder.y3());
    var tmp;
    if (tmp0_elvis_lhs == null) {
      continue $l$loop;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var quality = tmp;
    // Inline function 'kotlin.check' call
    if (!(0.0 <= quality ? quality <= 1.0 : false)) {
      var message = 'Invalid quality value: ' + quality + ' for encoder: ' + toString(encoder);
      throw IllegalStateException().o5(toString(message));
    }
    var qualityValue = take(quality.toString(), 5);
    this_0.hc(';q=' + qualityValue);
  }
  var requestHeader = this_0.toString();
  $this$createClientPlugin.w5j(ContentEncoding$lambda$slambda_0(mode, requestHeader, null));
  var tmp_0 = AfterRenderHook_getInstance();
  $this$createClientPlugin.f50(tmp_0, ContentEncoding$lambda$slambda_2(mode, $this$createClientPlugin, encoders, null));
  var tmp_1 = ReceiveStateHook_instance;
  $this$createClientPlugin.f50(tmp_1, ContentEncoding$lambda$slambda_4(mode, encoders, null));
  return Unit_instance;
}
function invoke$decodeContent(_this__u8e3s4, encoders) {
  var current = _this__u8e3s4.l4s();
  var _iterator__ex2g4s = encoders.x();
  while (_iterator__ex2g4s.y()) {
    var encoder = _iterator__ex2g4s.z();
    // Inline function 'io.ktor.util.logging.trace' call
    var this_0 = get_LOGGER();
    if (get_isTraceEnabled(this_0)) {
      var tmp$ret$0 = 'Decoding response with ' + toString(encoder) + ' for ' + _this__u8e3s4.d4s().w4r().f4s().toString();
      this_0.u3n(tmp$ret$0);
    }
    current = encoder.x3h(current, _this__u8e3s4.w20());
  }
  return current;
}
function invoke$decode(encoders, response) {
  if (!shouldDecode(response))
    return response;
  var tmp0_elvis_lhs = response.l3v().lk(HttpHeaders_getInstance().f3r_1);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    var message = HttpHeaders_getInstance().f3r_1 + ' unavailable';
    throw IllegalStateException().o5(toString(message));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var contentEncodingHeader = tmp;
  // Inline function 'kotlin.collections.map' call
  var this_0 = split(contentEncodingHeader, [',']);
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    // Inline function 'kotlin.text.trim' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$3 = toString(trim(isCharSequence(item) ? item : THROW_CCE())).toLowerCase();
    destination.i(tmp$ret$3);
  }
  var encodings = destination;
  // Inline function 'kotlin.collections.map' call
  var this_1 = asReversed(encodings);
  // Inline function 'kotlin.collections.mapTo' call
  var destination_0 = ArrayList().w(collectionSizeOrDefault(this_1, 10));
  var _iterator__ex2g4s_0 = this_1.x();
  while (_iterator__ex2g4s_0.y()) {
    var item_0 = _iterator__ex2g4s_0.z();
    var tmp0_elvis_lhs_0 = encoders.j3(item_0);
    var tmp_0;
    if (tmp0_elvis_lhs_0 == null) {
      throw UnsupportedContentEncodingException().j63(item_0);
    } else {
      tmp_0 = tmp0_elvis_lhs_0;
    }
    var tmp$ret$6 = tmp_0;
    destination_0.i(tmp$ret$6);
  }
  var selectedEncoders = destination_0;
  var headers_0 = headers(ContentEncoding$lambda$decode$lambda(response, encodings));
  response.d4s().x4r().i3h(get_DecompressionListAttribute(), encodings);
  var tmp_1 = response.d4s();
  return replaceResponse(tmp_1, headers_0, ContentEncoding$lambda$decode$lambda_0(selectedEncoders)).g4p();
}
var ContentEncoding$lambda$slambdaClass;
function ContentEncoding$lambda$slambda() {
  if (ContentEncoding$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($mode, $requestHeader, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.r64_1 = $mode;
        $box.s64_1 = $requestHeader;
        super(resultContinuation, $box);
      }
      w64($this$onRequest, request, _unused_var__etf5q3, $completion) {
        var tmp = this.x64($this$onRequest, request, _unused_var__etf5q3, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      y64(p1, p2, p3, $completion) {
        var tmp = p1 instanceof OnRequestContext() ? p1 : THROW_CCE();
        var tmp_0 = p2 instanceof HttpRequestBuilder() ? p2 : THROW_CCE();
        return this.w64(tmp, tmp_0, !(p3 == null) ? p3 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              if (!this.r64_1.z62_1)
                return Unit_instance;
              if (this.u64_1.i4q_1.g3j(HttpHeaders_getInstance().u3q_1))
                return Unit_instance;
              var this_0 = get_LOGGER();
              if (get_isTraceEnabled(this_0)) {
                this_0.u3n('Adding Accept-Encoding=' + this.s64_1 + ' for ' + this.u64_1.g4q_1.toString());
              }
              this.u64_1.i4q_1.h3j(HttpHeaders_getInstance().u3q_1, this.s64_1);
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
      x64($this$onRequest, request, _unused_var__etf5q3, completion) {
        var i = new (ContentEncoding$lambda$slambda())(this.r64_1, this.s64_1, completion);
        i.t64_1 = $this$onRequest;
        i.u64_1 = request;
        i.v64_1 = _unused_var__etf5q3;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [3]);
    ContentEncoding$lambda$slambdaClass = $;
  }
  return ContentEncoding$lambda$slambdaClass;
}
function ContentEncoding$lambda$slambda_0($mode, $requestHeader, resultContinuation) {
  var i = new (ContentEncoding$lambda$slambda())($mode, $requestHeader, resultContinuation);
  var l = function ($this$onRequest, request, _unused_var__etf5q3, $completion) {
    return i.w64($this$onRequest, request, _unused_var__etf5q3, $completion);
  };
  l.$arity = 3;
  return l;
}
var ContentEncoding$lambda$slambdaClass_0;
function ContentEncoding$lambda$slambda_1() {
  if (ContentEncoding$lambda$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($mode, $this_createClientPlugin, $encoders, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.h65_1 = $mode;
        $box.i65_1 = $this_createClientPlugin;
        $box.j65_1 = $encoders;
        super(resultContinuation, $box);
      }
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
              if (!this.h65_1.y62_1)
                return null;
              var tmp0_elvis_lhs = this.k65_1.l4q_1.g3h(get_CompressionListAttribute());
              var tmp_0;
              if (tmp0_elvis_lhs == null) {
                this.i65_1;
                var this_0 = get_LOGGER();
                if (get_isTraceEnabled(this_0)) {
                  this_0.u3n('Skipping request compression for ' + this.k65_1.g4q_1.toString() + ' because no compressions set');
                }
                return null;
              } else {
                tmp_0 = tmp0_elvis_lhs;
              }
              var encoderNames = tmp_0;
              var this_1 = get_LOGGER();
              if (get_isTraceEnabled(this_1)) {
                this_1.u3n('Compressing request body for ' + this.k65_1.g4q_1.toString() + ' using ' + toString(encoderNames));
              }
              var destination = ArrayList().w(collectionSizeOrDefault(encoderNames, 10));
              var _iterator__ex2g4s = encoderNames.x();
              while (_iterator__ex2g4s.y()) {
                var item = _iterator__ex2g4s.z();
                var tmp0_elvis_lhs_0 = this.j65_1.j3(item);
                var tmp_1;
                if (tmp0_elvis_lhs_0 == null) {
                  throw UnsupportedContentEncodingException().j63(item);
                } else {
                  tmp_1 = tmp0_elvis_lhs_0;
                }
                destination.i(tmp_1);
              }
              var selectedEncoders = destination;
              if (selectedEncoders.h1())
                return null;
              var accumulator = this.l65_1;
              var _iterator__ex2g4s_0 = selectedEncoders.x();
              while (_iterator__ex2g4s_0.y()) {
                var element = _iterator__ex2g4s_0.z();
                var compressed_0 = accumulator;
                var tmp0_elvis_lhs_1 = compressed(compressed_0, element, this.k65_1.k4q_1);
                accumulator = tmp0_elvis_lhs_1 == null ? compressed_0 : tmp0_elvis_lhs_1;
              }
              return accumulator;
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
        var i = new (ContentEncoding$lambda$slambda_1())(this.h65_1, this.i65_1, this.j65_1, completion);
        i.k65_1 = request;
        i.l65_1 = content;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    ContentEncoding$lambda$slambdaClass_0 = $;
  }
  return ContentEncoding$lambda$slambdaClass_0;
}
function ContentEncoding$lambda$slambda_2($mode, $this_createClientPlugin, $encoders, resultContinuation) {
  var i = new (ContentEncoding$lambda$slambda_1())($mode, $this_createClientPlugin, $encoders, resultContinuation);
  var l = function (request, content, $completion) {
    return i.q50(request, content, $completion);
  };
  l.$arity = 2;
  return l;
}
var ContentEncoding$lambda$slambdaClass_1;
function ContentEncoding$lambda$slambda_3() {
  if (ContentEncoding$lambda$slambdaClass_1 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($mode, $encoders, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.u65_1 = $mode;
        $box.v65_1 = $encoders;
        super(resultContinuation, $box);
      }
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
              if (!this.u65_1.z62_1)
                return null;
              var method = get_request(this.w65_1).e4s();
              var contentLength_0 = contentLength(this.w65_1);
              if (equals(contentLength_0, new (Long())(0, 0)))
                return null;
              if (contentLength_0 == null && method.equals(Companion_getInstance().r3v_1))
                return null;
              return invoke$decode(this.v65_1, this.w65_1);
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
        var i = new (ContentEncoding$lambda$slambda_3())(this.u65_1, this.v65_1, completion);
        i.w65_1 = response;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    ContentEncoding$lambda$slambdaClass_1 = $;
  }
  return ContentEncoding$lambda$slambdaClass_1;
}
function ContentEncoding$lambda$slambda_4($mode, $encoders, resultContinuation) {
  var i = new (ContentEncoding$lambda$slambda_3())($mode, $encoders, resultContinuation);
  var l = function (response, $completion) {
    return i.b51(response, $completion);
  };
  l.$arity = 1;
  return l;
}
function ContentEncoding$lambda$decode$lambda$lambda($this_headers) {
  return function (name, values) {
    var tmp;
    if (equals_0(name, HttpHeaders_getInstance().f3r_1, true) || equals_0(name, HttpHeaders_getInstance().h3r_1, true)) {
      return Unit_instance;
    }
    $this_headers.f3j(name, values);
    return Unit_instance;
  };
}
function ContentEncoding$lambda$decode$lambda($response, $encodings) {
  return function ($this$headers) {
    var tmp = $response.l3v();
    tmp.b3j(ContentEncoding$lambda$decode$lambda$lambda($this$headers));
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = $encodings;
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList().g1();
    var _iterator__ex2g4s = tmp0.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      if (!$encodings.j1(element)) {
        destination.i(element);
      }
    }
    var remainingEncodings = destination;
    var tmp_0;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!remainingEncodings.h1()) {
      $this$headers.j3j(HttpHeaders_getInstance().f3r_1, joinToString(remainingEncodings, ','));
      tmp_0 = Unit_instance;
    }
    return Unit_instance;
  };
}
function ContentEncoding$lambda$decode$lambda_0($selectedEncoders) {
  return function ($this$replaceResponse) {
    return invoke$decodeContent($this$replaceResponse, $selectedEncoders);
  };
}
var properties_initialized_ContentEncoding_kt_nayzok;
function _init_properties_ContentEncoding_kt__4smi0q() {
  if (!properties_initialized_ContentEncoding_kt_nayzok) {
    properties_initialized_ContentEncoding_kt_nayzok = true;
    LOGGER = KtorSimpleLogger('io.ktor.client.plugins.compression.ContentEncoding');
    var tmp = ContentEncodingConfig$_init_$ref_5w7vdj();
    ContentEncoding = createClientPlugin('HttpEncoding', tmp, ContentEncoding$lambda);
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'CompressionListAttribute';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp_0 = getKClass(KtList());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_1;
    try {
      tmp_1 = createKType(getKClass(KtList()), arrayOf([createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().mi(), arrayOf([]), false))]), false);
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
    CompressionListAttribute = new (AttributeKey())(name, tmp$ret$1);
    // Inline function 'io.ktor.util.AttributeKey' call
    var name_0 = 'DecompressionListAttribute';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp_3 = getKClass(KtList());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_4;
    try {
      tmp_4 = createKType(getKClass(KtList()), arrayOf([createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().mi(), arrayOf([]), false))]), false);
    } catch ($p) {
      var tmp_5;
      if ($p instanceof Error) {
        var _unused_var__etf5q3_0 = $p;
        tmp_5 = null;
      } else {
        throw $p;
      }
      tmp_4 = tmp_5;
    }
    var tmp$ret$0_0 = tmp_4;
    var tmp$ret$1_0 = new (TypeInfo())(tmp_3, tmp$ret$0_0);
    DecompressionListAttribute = new (AttributeKey())(name_0, tmp$ret$1_0);
  }
}
//region block: init
ReceiveStateHook_instance = new (ReceiveStateHook())();
//endregion
//region block: exports
export {
  get_ContentEncoding as get_ContentEncoding3ntb7mwovz4dd,
};
//endregion

//# sourceMappingURL=ContentEncoding.mjs.map
