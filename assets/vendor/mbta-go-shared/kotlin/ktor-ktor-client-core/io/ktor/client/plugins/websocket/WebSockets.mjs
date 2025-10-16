import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { HttpClientEngineCapability33x11oaa7ywe5 as HttpClientEngineCapability } from '../../engine/HttpClientEngineCapability.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  captureStack1fzi4aczwc4hg as captureStack,
  toString1pkumu07cwy4m as toString,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { get_isTraceEnabled82xibuu04nxp as get_isTraceEnabled } from '../../../../../../ktor-ktor-utils/io/ktor/util/logging/LoggerJs.mjs';
import { isWebsocket1w1xog9vfgwm1 as isWebsocket } from '../../../../../../ktor-ktor-http/io/ktor/http/URLProtocol.mjs';
import { WebSocketContentagsn4p79ffe0 as WebSocketContent } from './WebSocketContent.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  HttpResponseContainer3r9yzy4mwwvc9 as HttpResponseContainer,
  Phases_getInstance3cv4l5wlctlnh as Phases_getInstance,
} from '../../statement/HttpResponsePipeline.mjs';
import { get_request3dwcif5y0fvf1 as get_request } from '../../statement/HttpResponse.mjs';
import { Companion_getInstanceud97dyzf471m as Companion_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpStatusCode.mjs';
import {
  getKClassFromExpression3vpejubogshaw as getKClassFromExpression,
  getKClass1s3j9wy1cofik as getKClass,
} from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { WebSocketSessionzi1ianvyj32u as WebSocketSession } from '../../../../../../ktor-ktor-websockets/io/ktor/websocket/WebSocketSession.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  DelegatingClientWebSocketSessiono1sywc6weckz as DelegatingClientWebSocketSession,
  DefaultClientWebSocketSession1n8ok3lng45wy as DefaultClientWebSocketSession,
} from './ClientSessions.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { parseWebSocketExtensionszyo25w86ylog as parseWebSocketExtensions } from '../../../../../../ktor-ktor-websockets/io/ktor/websocket/WebSocketExtensionHeader.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { header3kx6g3yb4df1r as header } from '../../request/utils.mjs';
import {
  WebSocketExtensionsConfig3sf1f7u7xi63m as WebSocketExtensionsConfig,
  WebSocketExtensionixqq2y77p4e0 as WebSocketExtension,
} from '../../../../../../ktor-ktor-websockets/io/ktor/websocket/WebSocketExtension.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  createKType1lgox3mzhchp5 as createKType,
  getStarKTypeProjection2j4m947xjbiiv as getStarKTypeProjection,
  createInvariantKTypeProjection3sfd0u0y62ozd as createInvariantKTypeProjection,
} from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { Phases_getInstance3gwf7ca9zp4r6 as Phases_getInstance_0 } from '../../request/HttpRequestPipeline.mjs';
import {
  DefaultWebSocketSession3h8506yqzs5fx as DefaultWebSocketSession,
  DefaultWebSocketSession2pi4wuih6mkcj as DefaultWebSocketSession_0,
} from '../../../../../../ktor-ktor-websockets/io/ktor/websocket/DefaultWebSocketSession.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { KtList3hktaavzmj137 as KtList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_REQUEST_EXTENSIONS_KEY() {
  _init_properties_WebSockets_kt__jaqpbo();
  return REQUEST_EXTENSIONS_KEY;
}
var REQUEST_EXTENSIONS_KEY;
function get_LOGGER() {
  _init_properties_WebSockets_kt__jaqpbo();
  return LOGGER;
}
var LOGGER;
var WebSocketCapabilityClass;
function WebSocketCapability() {
  if (WebSocketCapabilityClass === VOID) {
    class $ {
      toString() {
        return 'WebSocketCapability';
      }
      hashCode() {
        return -1146563391;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof WebSocketCapability()))
          return false;
        other instanceof WebSocketCapability() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'WebSocketCapability', VOID, VOID, [HttpClientEngineCapability()]);
    WebSocketCapabilityClass = $;
  }
  return WebSocketCapabilityClass;
}
var WebSocketCapability_instance;
function WebSocketCapability_getInstance() {
  return WebSocketCapability_instance;
}
var WebSocketExceptionClass;
function WebSocketException() {
  if (WebSocketExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static l5n(message, cause) {
        var $this = this.je(message, cause);
        captureStack($this, $this.k5n_1);
        return $this;
      }
      static m5n(message) {
        return this.l5n(message, null);
      }
    }
    initMetadataForClass($, 'WebSocketException');
    WebSocketExceptionClass = $;
  }
  return WebSocketExceptionClass;
}
var WebSockets$Plugin$install$slambdaClass;
function WebSockets$Plugin$install$slambda() {
  if (WebSockets$Plugin$install$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($extensionsSupported, $plugin, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.v5n_1 = $extensionsSupported;
        $box.w5n_1 = $plugin;
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
                if (!isWebsocket(this.x5n_1.o3m_1.g4q_1.y3y())) {
                  var this_0 = get_LOGGER();
                  if (get_isTraceEnabled(this_0)) {
                    this_0.u3n('Skipping WebSocket plugin for non-websocket request: ' + this.x5n_1.o3m_1.g4q_1.toString());
                  }
                  return Unit_instance;
                }

                var this_1 = get_LOGGER();
                if (get_isTraceEnabled(this_1)) {
                  this_1.u3n('Sending WebSocket request ' + this.x5n_1.o3m_1.g4q_1.toString());
                }

                this.x5n_1.o3m_1.b5i(WebSocketCapability_instance, Unit_instance);
                if (this.v5n_1) {
                  installExtensions(this.w5n_1, this.x5n_1.o3m_1);
                }

                this.fd_1 = 1;
                suspendResult = this.x5n_1.q3l(new (WebSocketContent())(), this);
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
        var i = new (WebSockets$Plugin$install$slambda())(this.v5n_1, this.w5n_1, completion);
        i.x5n_1 = $this$intercept;
        i.y5n_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    WebSockets$Plugin$install$slambdaClass = $;
  }
  return WebSockets$Plugin$install$slambdaClass;
}
function WebSockets$Plugin$install$slambda_0($extensionsSupported, $plugin, resultContinuation) {
  var i = new (WebSockets$Plugin$install$slambda())($extensionsSupported, $plugin, resultContinuation);
  var l = function ($this$intercept, it, $completion) {
    return i.z4o($this$intercept, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var WebSockets$Plugin$install$slambdaClass_0;
function WebSockets$Plugin$install$slambda_1() {
  if (WebSockets$Plugin$install$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($plugin, $extensionsSupported, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.h5o_1 = $plugin;
        $box.i5o_1 = $extensionsSupported;
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
                this.gd_1 = 2;
                this.l5o_1 = this.k5o_1.ch();
                this.m5o_1 = this.k5o_1.dh();
                this.n5o_1 = this.j5o_1.o3m_1.g4p();
                this.o5o_1 = this.n5o_1.m4s();
                this.p5o_1 = get_request(this.n5o_1).n1n();
                var tmp_0 = this.p5o_1;
                if (!(tmp_0 instanceof WebSocketContent())) {
                  var this_0 = get_LOGGER();
                  if (get_isTraceEnabled(this_0)) {
                    this_0.u3n('Skipping non-websocket response from ' + this.j5o_1.o3m_1.w4r().f4s().toString() + ': ' + toString(this.p5o_1));
                  }
                  return Unit_instance;
                }

                if (!this.o5o_1.equals(Companion_getInstance().e3w_1)) {
                  throw WebSocketException().m5n('Handshake exception, expected status code ' + Companion_getInstance().e3w_1.g3y_1 + ' but was ' + this.o5o_1.g3y_1);
                }

                var tmp_1 = this.m5o_1;
                if (!isInterface(tmp_1, WebSocketSession())) {
                  throw WebSocketException().m5n('Handshake exception, expected `WebSocketSession` content but was ' + toString(getKClassFromExpression(this.m5o_1)));
                }

                var this_1 = get_LOGGER();
                if (get_isTraceEnabled(this_1)) {
                  this_1.u3n('Receive websocket session from ' + this.j5o_1.o3m_1.w4r().f4s().toString() + ': ' + toString(this.m5o_1));
                }

                if (!this.h5o_1.s5o_1.equals(new (Long())(2147483647, 0))) {
                  this.m5o_1.x49(this.h5o_1.s5o_1);
                }

                var tmp_2 = this;
                var tmp_3;
                if (this.l5o_1.g3n_1.equals(getKClass(DefaultClientWebSocketSession()))) {
                  var defaultSession = this.h5o_1.v5o(this.m5o_1);
                  var clientSession = new (DefaultClientWebSocketSession())(this.j5o_1.o3m_1, defaultSession);
                  var tmp_4;
                  if (this.i5o_1) {
                    tmp_4 = completeNegotiation(this.h5o_1, this.j5o_1.o3m_1);
                  } else {
                    tmp_4 = emptyList();
                  }
                  var negotiated = tmp_4;
                  clientSession.w49(negotiated);
                  tmp_3 = clientSession;
                } else {
                  tmp_3 = new (DelegatingClientWebSocketSession())(this.j5o_1.o3m_1, this.m5o_1);
                }

                tmp_2.q5o_1 = tmp_3;
                this.fd_1 = 1;
                suspendResult = this.j5o_1.q3l(new (HttpResponseContainer())(this.l5o_1, this.q5o_1), this);
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
      v4p($this$intercept, _destruct__k2r9zo, completion) {
        var i = new (WebSockets$Plugin$install$slambda_1())(this.h5o_1, this.i5o_1, completion);
        i.j5o_1 = $this$intercept;
        i.k5o_1 = _destruct__k2r9zo;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    WebSockets$Plugin$install$slambdaClass_0 = $;
  }
  return WebSockets$Plugin$install$slambdaClass_0;
}
function WebSockets$Plugin$install$slambda_2($plugin, $extensionsSupported, resultContinuation) {
  var i = new (WebSockets$Plugin$install$slambda_1())($plugin, $extensionsSupported, resultContinuation);
  var l = function ($this$intercept, _destruct__k2r9zo, $completion) {
    return i.u4p($this$intercept, _destruct__k2r9zo, $completion);
  };
  l.$arity = 2;
  return l;
}
function installExtensions($this, context) {
  var installed = $this.t5o_1.r3q();
  context.l4q_1.i3h(get_REQUEST_EXTENSIONS_KEY(), installed);
  // Inline function 'kotlin.collections.flatMap' call
  // Inline function 'kotlin.collections.flatMapTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = installed.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var list = element.o4j();
    addAll(destination, list);
  }
  var protocols = destination;
  addNegotiatedProtocols($this, context, protocols);
}
function completeNegotiation($this, call) {
  var tmp0_safe_receiver = call.g4p().l3v().lk(HttpHeaders_getInstance().d3t_1);
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = parseWebSocketExtensions(tmp0_safe_receiver);
  }
  var tmp1_elvis_lhs = tmp;
  var serverExtensions = tmp1_elvis_lhs == null ? emptyList() : tmp1_elvis_lhs;
  var clientExtensions = call.x4r().f3h(get_REQUEST_EXTENSIONS_KEY());
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = clientExtensions.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    if (element.p4j(serverExtensions)) {
      destination.i(element);
    }
  }
  return destination;
}
function addNegotiatedProtocols($this, context, protocols) {
  if (protocols.h1())
    return Unit_instance;
  var headerValue = joinToString(protocols, ',');
  header(context, HttpHeaders_getInstance().d3t_1, headerValue);
}
var ConfigClass;
function Config() {
  if (ConfigClass === VOID) {
    class $ {
      constructor() {
        this.w5o_1 = new (WebSocketExtensionsConfig())();
        this.x5o_1 = new (Long())(0, 0);
        this.y5o_1 = new (Long())(2147483647, 0);
        this.z5o_1 = null;
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
        var name = 'Websocket';
        // Inline function 'io.ktor.util.reflect.typeInfo' call
        var tmp_0 = getKClass(WebSockets());
        // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
        var tmp_1;
        try {
          tmp_1 = createKType(getKClass(WebSockets()), arrayOf([]), false);
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
        tmp.a5p_1 = new (AttributeKey())(name, tmp$ret$1);
      }
      u1() {
        return this.a5p_1;
      }
      b5p(block) {
        // Inline function 'kotlin.apply' call
        var this_0 = new (Config())();
        block(this_0);
        var config = this_0;
        return new (WebSockets())(config.x5o_1, config.y5o_1, config.w5o_1, config.z5o_1);
      }
      m4r(block) {
        return this.b5p(block);
      }
      c5p(plugin, scope) {
        var extensionsSupported = scope.z4n_1.p4w().j1(WebSocketExtensionsCapability_instance);
        var tmp = Phases_getInstance_0().f4z_1;
        scope.f4o_1.s3m(tmp, WebSockets$Plugin$install$slambda_0(extensionsSupported, plugin, null));
        var tmp_0 = Phases_getInstance().h4r_1;
        scope.g4o_1.s3m(tmp_0, WebSockets$Plugin$install$slambda_2(plugin, extensionsSupported, null));
      }
      n4r(plugin, scope) {
        return this.c5p(plugin instanceof WebSockets() ? plugin : THROW_CCE(), scope);
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
var WebSocketsClass;
function WebSockets() {
  if (WebSocketsClass === VOID) {
    class $ {
      constructor(pingIntervalMillis, maxFrameSize, extensionsConfig, contentConverter) {
        Plugin_getInstance();
        contentConverter = contentConverter === VOID ? null : contentConverter;
        this.r5o_1 = pingIntervalMillis;
        this.s5o_1 = maxFrameSize;
        this.t5o_1 = extensionsConfig;
        this.u5o_1 = contentConverter;
      }
      v5o(session) {
        if (isInterface(session, DefaultWebSocketSession()))
          return session;
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$0 = this.r5o_1.h4(toLong(2));
        // Inline function 'kotlin.also' call
        var this_0 = DefaultWebSocketSession_0(session, this.r5o_1, tmp$ret$0);
        this_0.x49(this.s5o_1);
        return this_0;
      }
    }
    initMetadataForClass($, 'WebSockets');
    WebSocketsClass = $;
  }
  return WebSocketsClass;
}
var WebSocketExtensionsCapabilityClass;
function WebSocketExtensionsCapability() {
  if (WebSocketExtensionsCapabilityClass === VOID) {
    class $ {
      toString() {
        return 'WebSocketExtensionsCapability';
      }
      hashCode() {
        return 806573237;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof WebSocketExtensionsCapability()))
          return false;
        other instanceof WebSocketExtensionsCapability() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'WebSocketExtensionsCapability', VOID, VOID, [HttpClientEngineCapability()]);
    WebSocketExtensionsCapabilityClass = $;
  }
  return WebSocketExtensionsCapabilityClass;
}
var WebSocketExtensionsCapability_instance;
function WebSocketExtensionsCapability_getInstance() {
  return WebSocketExtensionsCapability_instance;
}
var properties_initialized_WebSockets_kt_2t2hw2;
function _init_properties_WebSockets_kt__jaqpbo() {
  if (!properties_initialized_WebSockets_kt_2t2hw2) {
    properties_initialized_WebSockets_kt_2t2hw2 = true;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'Websocket extensions';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp = getKClass(KtList());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_0;
    try {
      tmp_0 = createKType(getKClass(KtList()), arrayOf([createInvariantKTypeProjection(createKType(getKClass(WebSocketExtension()), arrayOf([getStarKTypeProjection()]), false))]), false);
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
    REQUEST_EXTENSIONS_KEY = new (AttributeKey())(name, tmp$ret$1);
    LOGGER = KtorSimpleLogger('io.ktor.client.plugins.websocket.WebSockets');
  }
}
//region block: init
WebSocketCapability_instance = new (WebSocketCapability())();
WebSocketExtensionsCapability_instance = new (WebSocketExtensionsCapability())();
//endregion
//region block: exports
export {
  WebSocketCapability_instance as WebSocketCapability_instance1i2v7csb8ym2x,
  Plugin_getInstance as Plugin_getInstance2h23y5kubyaup,
  WebSocketException as WebSocketExceptionb5mwyitzck0i,
};
//endregion

//# sourceMappingURL=WebSockets.mjs.map
