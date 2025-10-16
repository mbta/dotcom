import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { URLBuilder2mz8zkz4u9ray as URLBuilder } from '../../../../../ktor-ktor-http/io/ktor/http/URLBuilder.mjs';
import { Companion_getInstance1p3cpld7r1jz3 as Companion_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpMethod.mjs';
import { HeadersBuilder3h7sn3kkvu98m as HeadersBuilder } from '../../../../../ktor-ktor-http/io/ktor/http/Headers.mjs';
import { EmptyContent_getInstance116ybdh9l8hek as EmptyContent_getInstance } from '../utils/Content.mjs';
import { SupervisorJobythnfxkr3jxc as SupervisorJob } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Supervisor.mjs';
import { AttributesJsFn25rjfgcprgprf as AttributesJsFn } from '../../../../../ktor-ktor-utils/io/ktor/util/AttributesJs.mjs';
import { get_BodyTypeAttributeKey1jqpsdtzeru4e as get_BodyTypeAttributeKey } from './RequestBody.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { OutgoingContent3t2ohmyam9o76 as OutgoingContent } from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { takeFromkqlcz7c6dx2r as takeFrom } from '../../../../../ktor-ktor-http/io/ktor/http/URLUtils.mjs';
import { appendAlltwnjnu28pmtx as appendAll } from '../../../../../ktor-ktor-utils/io/ktor/util/StringValues.mjs';
import {
  putAll10o0q8e6mgnzr as putAll,
  AttributeKey3aq8ytwgx54f7 as AttributeKey,
} from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { get_ENGINE_CAPABILITIES_KEYr1fjz8liznxo as get_ENGINE_CAPABILITIES_KEY } from '../engine/HttpClientEngineCapability.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { GMTDate36bhedawynxlf as GMTDate } from '../../../../../ktor-ktor-utils/io/ktor/util/date/DateJs.mjs';
import { ClientUpgradeContent299vg0lx1tyfp as ClientUpgradeContent } from './ClientUpgradeContent.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_ResponseAdapterAttributeKey() {
  _init_properties_HttpRequest_kt__813lx1();
  return ResponseAdapterAttributeKey;
}
var ResponseAdapterAttributeKey;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  return Companion_instance;
}
function HttpRequestBuilder$setCapability$lambda() {
  // Inline function 'kotlin.collections.mutableMapOf' call
  return LinkedHashMap().sc();
}
var HttpRequestBuilderClass;
function HttpRequestBuilder() {
  if (HttpRequestBuilderClass === VOID) {
    class $ {
      constructor() {
        this.g4q_1 = new (URLBuilder())();
        this.h4q_1 = Companion_getInstance().m3v_1;
        this.i4q_1 = new (HeadersBuilder())();
        this.j4q_1 = EmptyContent_getInstance();
        this.k4q_1 = SupervisorJob();
        this.l4q_1 = AttributesJsFn(true);
      }
      l3v() {
        return this.i4q_1;
      }
      i4x(value) {
        if (!(value == null)) {
          this.l4q_1.i3h(get_BodyTypeAttributeKey(), value);
        } else {
          this.l4q_1.j3h(get_BodyTypeAttributeKey());
        }
      }
      g5m() {
        return this.l4q_1.g3h(get_BodyTypeAttributeKey());
      }
      l5p(block) {
        return block(this.g4q_1, this.g4q_1);
      }
      r3q() {
        var tmp = this.g4q_1.r3q();
        var tmp_0 = this.h4q_1;
        var tmp_1 = this.i4q_1.r3q();
        var tmp_2 = this.j4q_1;
        var tmp0_elvis_lhs = tmp_2 instanceof OutgoingContent() ? tmp_2 : null;
        var tmp_3;
        if (tmp0_elvis_lhs == null) {
          var message = 'No request transformation found: ' + toString(this.j4q_1);
          throw IllegalStateException().o5(toString(message));
        } else {
          tmp_3 = tmp0_elvis_lhs;
        }
        return new (HttpRequestData())(tmp, tmp_0, tmp_1, tmp_3, this.k4q_1, this.l4q_1);
      }
      h4x(builder) {
        this.k4q_1 = builder.k4q_1;
        return this.m5p(builder);
      }
      m5p(builder) {
        this.h4q_1 = builder.h4q_1;
        this.j4q_1 = builder.j4q_1;
        this.i4x(builder.g5m());
        takeFrom(this.g4q_1, builder.g4q_1);
        this.g4q_1.t3y_1 = this.g4q_1.t3y_1;
        appendAll(this.i4q_1, builder.i4q_1);
        putAll(this.l4q_1, builder.l4q_1);
        return this;
      }
      b5i(key, capability) {
        var tmp = get_ENGINE_CAPABILITIES_KEY();
        var capabilities = this.l4q_1.k3h(tmp, HttpRequestBuilder$setCapability$lambda);
        // Inline function 'kotlin.collections.set' call
        capabilities.t3(key, capability);
      }
      o5h(key) {
        var tmp0_safe_receiver = this.l4q_1.g3h(get_ENGINE_CAPABILITIES_KEY());
        var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j3(key);
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
    }
    initMetadataForClass($, 'HttpRequestBuilder', HttpRequestBuilder);
    HttpRequestBuilderClass = $;
  }
  return HttpRequestBuilderClass;
}
function get_coroutineContext() {
  return this.d4s().w20();
}
var HttpRequestClass;
function HttpRequest() {
  if (HttpRequestClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'HttpRequest', VOID, VOID, [CoroutineScope()]);
    HttpRequestClass = $;
  }
  return HttpRequestClass;
}
var HttpRequestDataClass;
function HttpRequestData() {
  if (HttpRequestDataClass === VOID) {
    class $ {
      constructor(url, method, headers, body, executionContext, attributes) {
        this.i4w_1 = url;
        this.j4w_1 = method;
        this.k4w_1 = headers;
        this.l4w_1 = body;
        this.m4w_1 = executionContext;
        this.n4w_1 = attributes;
        var tmp = this;
        var tmp0_safe_receiver = this.n4w_1.g3h(get_ENGINE_CAPABILITIES_KEY());
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.k3();
        tmp.o4w_1 = tmp1_elvis_lhs == null ? emptySet() : tmp1_elvis_lhs;
      }
      toString() {
        return 'HttpRequestData(url=' + this.i4w_1.toString() + ', method=' + this.j4w_1.toString() + ')';
      }
    }
    initMetadataForClass($, 'HttpRequestData');
    HttpRequestDataClass = $;
  }
  return HttpRequestDataClass;
}
var ResponseAdapterClass;
function ResponseAdapter() {
  if (ResponseAdapterClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ResponseAdapter');
    ResponseAdapterClass = $;
  }
  return ResponseAdapterClass;
}
var HttpResponseDataClass;
function HttpResponseData() {
  if (HttpResponseDataClass === VOID) {
    class $ {
      constructor(statusCode, requestTime, headers, version, body, callContext) {
        this.u4t_1 = statusCode;
        this.v4t_1 = requestTime;
        this.w4t_1 = headers;
        this.x4t_1 = version;
        this.y4t_1 = body;
        this.z4t_1 = callContext;
        this.a4u_1 = GMTDate();
      }
      toString() {
        return 'HttpResponseData=(statusCode=' + this.u4t_1.toString() + ')';
      }
    }
    initMetadataForClass($, 'HttpResponseData');
    HttpResponseDataClass = $;
  }
  return HttpResponseDataClass;
}
function isUpgradeRequest(_this__u8e3s4) {
  _init_properties_HttpRequest_kt__813lx1();
  var tmp = _this__u8e3s4.l4w_1;
  return tmp instanceof ClientUpgradeContent();
}
var properties_initialized_HttpRequest_kt_zh09pz;
function _init_properties_HttpRequest_kt__813lx1() {
  if (!properties_initialized_HttpRequest_kt_zh09pz) {
    properties_initialized_HttpRequest_kt_zh09pz = true;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'ResponseAdapterAttributeKey';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp = getKClass(ResponseAdapter());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_0;
    try {
      tmp_0 = createKType(getKClass(ResponseAdapter()), arrayOf([]), false);
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
    ResponseAdapterAttributeKey = new (AttributeKey())(name, tmp$ret$1);
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  get_coroutineContext as get_coroutineContext1djaai1ellg0c,
  HttpRequestBuilder as HttpRequestBuilder15f2nnx9sjuv1,
  HttpRequest as HttpRequest3fsc4149kgwfg,
  HttpResponseData as HttpResponseData2dozo5khuplr6,
  get_ResponseAdapterAttributeKey as get_ResponseAdapterAttributeKey1ll13ywinsgvd,
  isUpgradeRequest as isUpgradeRequest3msdo2i9hxs68,
};
//endregion

//# sourceMappingURL=HttpRequest.mjs.map
