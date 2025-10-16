import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  URLBuilder1hwx1b9569i61 as URLBuilder,
  takeFromkqlcz7c6dx2r as takeFrom,
} from '../../../../../ktor-ktor-http/io/ktor/http/URLUtils.mjs';
import { ParametersBuilder1ry9ntvvg567r as ParametersBuilder } from '../../../../../ktor-ktor-http/io/ktor/http/Parameters.mjs';
import { appendAlltwnjnu28pmtx as appendAll } from '../../../../../ktor-ktor-utils/io/ktor/util/StringValues.mjs';
import { first58ocm7j58k3q as first } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { checkBuilderCapacity1h6g02949wvv as checkBuilderCapacity } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance } from '../request/HttpRequestPipeline.mjs';
import { HeadersBuilder3h7sn3kkvu98m as HeadersBuilder } from '../../../../../ktor-ktor-http/io/ktor/http/Headers.mjs';
import { URLBuilder2mz8zkz4u9ray as URLBuilder_0 } from '../../../../../ktor-ktor-http/io/ktor/http/URLBuilder.mjs';
import { AttributesJsFn25rjfgcprgprf as AttributesJsFn } from '../../../../../ktor-ktor-utils/io/ktor/util/AttributesJs.mjs';
import { takeFrom3rd40szpqy350 as takeFrom_0 } from '../../../../../ktor-ktor-http/io/ktor/http/URLParser.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_LOGGER() {
  _init_properties_DefaultRequest_kt__yzsodq();
  return LOGGER;
}
var LOGGER;
function defaultRequest(_this__u8e3s4, block) {
  _init_properties_DefaultRequest_kt__yzsodq();
  var tmp = Plugin_getInstance();
  _this__u8e3s4.o4r(tmp, defaultRequest$lambda(block));
}
function mergeUrls($this, baseUrl, requestUrl) {
  if (requestUrl.p3y_1 == null) {
    requestUrl.p3y_1 = baseUrl.k3z_1;
  }
  // Inline function 'kotlin.text.isNotEmpty' call
  var this_0 = requestUrl.m3y_1;
  if (charSequenceLength(this_0) > 0)
    return Unit_instance;
  var resultUrl = URLBuilder(baseUrl);
  // Inline function 'kotlin.with' call
  resultUrl.p3y_1 = requestUrl.p3y_1;
  if (!(requestUrl.o3y_1 === 0)) {
    resultUrl.u3z(requestUrl.o3y_1);
  }
  resultUrl.t3y_1 = concatenatePath(Plugin_getInstance(), resultUrl.t3y_1, requestUrl.t3y_1);
  // Inline function 'kotlin.text.isNotEmpty' call
  var this_1 = requestUrl.s3y_1;
  if (charSequenceLength(this_1) > 0) {
    resultUrl.s3y_1 = requestUrl.s3y_1;
  }
  // Inline function 'kotlin.apply' call
  var this_2 = ParametersBuilder();
  appendAll(this_2, resultUrl.u3y_1);
  var defaultParameters = this_2;
  resultUrl.h40(requestUrl.u3y_1);
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = defaultParameters.a3j().x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    // Inline function 'kotlin.collections.component1' call
    var key = element.u1();
    // Inline function 'kotlin.collections.component2' call
    var values = element.v1();
    if (!resultUrl.u3y_1.g3j(key)) {
      resultUrl.u3y_1.f3j(key, values);
    }
  }
  takeFrom(requestUrl, resultUrl);
}
function concatenatePath($this, parent, child) {
  if (child.h1())
    return parent;
  if (parent.h1())
    return child;
  // Inline function 'kotlin.text.isEmpty' call
  var this_0 = first(child);
  if (charSequenceLength(this_0) === 0)
    return child;
  // Inline function 'kotlin.collections.buildList' call
  // Inline function 'kotlin.collections.buildListInternal' call
  var capacity = (parent.c1() + child.c1() | 0) - 1 | 0;
  checkBuilderCapacity(capacity);
  // Inline function 'kotlin.apply' call
  var this_1 = ArrayList().w(capacity);
  var inductionVariable = 0;
  var last = parent.c1() - 1 | 0;
  if (inductionVariable < last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      this_1.i(parent.e1(index));
    }
     while (inductionVariable < last);
  this_1.d1(child);
  return this_1.k5();
}
var DefaultRequest$Plugin$install$slambdaClass;
function DefaultRequest$Plugin$install$slambda() {
  if (DefaultRequest$Plugin$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($plugin, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.l51_1 = $plugin;
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
            if (tmp === 0) {
              this.gd_1 = 1;
              var originalUrlString = this.m51_1.o3m_1.g4q_1.toString();
              var this_0 = new (DefaultRequestBuilder())();
              appendAll(this_0.o51_1, this.m51_1.o3m_1.i4q_1);
              var userHeaders = this_0.o51_1.r3q();
              this.l51_1.r51_1(this_0);
              var _iterator__ex2g4s = userHeaders.a3j().x();
              while (_iterator__ex2g4s.y()) {
                var element = _iterator__ex2g4s.z();
                l$ret$1: do {
                  var key = element.u1();
                  var oldValues = element.v1();
                  var newValues = this_0.o51_1.y3i(key);
                  if (newValues == null) {
                    this_0.o51_1.f3j(key, oldValues);
                    break l$ret$1;
                  }
                  if (equals(newValues, oldValues) || key === HttpHeaders_getInstance().l3r_1) {
                    break l$ret$1;
                  }
                  this_0.o51_1.m3j(key);
                  this_0.o51_1.f3j(key, oldValues);
                  this_0.o51_1.l3j(key, newValues);
                }
                 while (false);
              }
              var defaultRequest = this_0;
              var defaultUrl = defaultRequest.p51_1.r3q();
              mergeUrls(Plugin_getInstance(), defaultUrl, this.m51_1.o3m_1.g4q_1);
              var _iterator__ex2g4s_0 = defaultRequest.q51_1.l3h().x();
              while (_iterator__ex2g4s_0.y()) {
                var element_0 = _iterator__ex2g4s_0.z();
                if (!this.m51_1.o3m_1.l4q_1.h3h(element_0)) {
                  this.m51_1.o3m_1.l4q_1.i3h(element_0 instanceof AttributeKey() ? element_0 : THROW_CCE(), defaultRequest.q51_1.f3h(element_0));
                }
              }
              this.m51_1.o3m_1.i4q_1.p3();
              this.m51_1.o3m_1.i4q_1.k3j(defaultRequest.o51_1.r3q());
              get_LOGGER().u3n('Applied DefaultRequest to ' + originalUrlString + '. New url: ' + this.m51_1.o3m_1.g4q_1.toString());
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
      a4p($this$intercept, it, completion) {
        var i = new (DefaultRequest$Plugin$install$slambda())(this.l51_1, completion);
        i.m51_1 = $this$intercept;
        i.n51_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    DefaultRequest$Plugin$install$slambdaClass = $;
  }
  return DefaultRequest$Plugin$install$slambdaClass;
}
function DefaultRequest$Plugin$install$slambda_0($plugin, resultContinuation) {
  var i = new (DefaultRequest$Plugin$install$slambda())($plugin, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.z4o($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var PluginClass;
function Plugin() {
  if (PluginClass === VOID) {
    class $ {
      constructor() {
        Plugin_instance = this;
        var tmp = this;
        // Inline function 'io.ktor.util.AttributeKey' call
        var name = 'DefaultRequest';
        // Inline function 'io.ktor.util.reflect.typeInfo' call
        var tmp_0 = getKClass(DefaultRequest());
        // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
        var tmp_1;
        try {
          tmp_1 = createKType(getKClass(DefaultRequest()), arrayOf([]), false);
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
        tmp.s51_1 = new (AttributeKey())(name, tmp$ret$1);
      }
      u1() {
        return this.s51_1;
      }
      t51(block) {
        return new (DefaultRequest())(block);
      }
      m4r(block) {
        return this.t51(block);
      }
      u51(plugin, scope) {
        var tmp = Phases_getInstance().c4z_1;
        scope.f4o_1.s3m(tmp, DefaultRequest$Plugin$install$slambda_0(plugin, null));
      }
      n4r(plugin, scope) {
        return this.u51(plugin instanceof DefaultRequest() ? plugin : THROW_CCE(), scope);
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
var DefaultRequestBuilderClass;
function DefaultRequestBuilder() {
  if (DefaultRequestBuilderClass === VOID) {
    class $ {
      constructor() {
        this.o51_1 = new (HeadersBuilder())();
        this.p51_1 = new (URLBuilder_0())();
        this.q51_1 = AttributesJsFn(true);
      }
      l3v() {
        return this.o51_1;
      }
      v51(urlString) {
        takeFrom_0(this.p51_1, urlString);
      }
    }
    initMetadataForClass($, 'DefaultRequestBuilder');
    DefaultRequestBuilderClass = $;
  }
  return DefaultRequestBuilderClass;
}
var DefaultRequestClass;
function DefaultRequest() {
  if (DefaultRequestClass === VOID) {
    class $ {
      constructor(block) {
        Plugin_getInstance();
        this.r51_1 = block;
      }
    }
    initMetadataForClass($, 'DefaultRequest');
    DefaultRequestClass = $;
  }
  return DefaultRequestClass;
}
function defaultRequest$lambda($block) {
  return function ($this$install) {
    $block($this$install);
    return Unit_instance;
  };
}
var properties_initialized_DefaultRequest_kt_au5efk;
function _init_properties_DefaultRequest_kt__yzsodq() {
  if (!properties_initialized_DefaultRequest_kt_au5efk) {
    properties_initialized_DefaultRequest_kt_au5efk = true;
    LOGGER = KtorSimpleLogger('io.ktor.client.plugins.DefaultRequest');
  }
}
//region block: exports
export {
  defaultRequest as defaultRequest2ux1d5xxixv6z,
};
//endregion

//# sourceMappingURL=DefaultRequest.mjs.map
