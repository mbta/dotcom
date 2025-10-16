import { get_json30ncetgsyi7ak as get_json } from '../Json.mjs';
import { jsonu6qnfo3b405p as json } from '../../../../../../ktor-ktor-serialization-kotlinx-json/io/ktor/serialization/kotlinx/json/JsonSupport.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { KotlinxWebsocketSerializationConverter1qaps8wgq4zyw as KotlinxWebsocketSerializationConverter } from '../../../../../../ktor-ktor-serialization-kotlinx/io/ktor/serialization/kotlinx/KotlinxWebsocketSerializationConverter.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  HttpResponse1532ob1hsse1y as HttpResponse,
  bodyAsText1is16t8kuttw9 as bodyAsText,
} from '../../../../../../ktor-ktor-client-core/io/ktor/client/statement/HttpResponse.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  ResponseException2ofl6x4wye9sn as ResponseException,
  ServerResponseException340iruvt5onmi as ServerResponseException,
  ClientRequestExceptionj69ilxf38oeq as ClientRequestException,
  RedirectResponseException2ui4bcjl4a483 as RedirectResponseException,
} from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/DefaultResponseValidation.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { get_ContentNegotiationcp59ye9rorjc as get_ContentNegotiation } from '../../../../../../ktor-ktor-client-content-negotiation/io/ktor/client/plugins/contentnegotiation/ContentNegotiation.mjs';
import { Plugin_getInstance2h23y5kubyaup as Plugin_getInstance } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/websocket/WebSockets.mjs';
import { get_ContentEncoding3ntb7mwovz4dd as get_ContentEncoding } from '../../../../../../ktor-ktor-client-encoding/io/ktor/client/plugins/compression/ContentEncoding.mjs';
import { get_HttpTimeout3mcrbvfnvmyx2 as get_HttpTimeout } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/HttpTimeout.mjs';
import { defaultRequest2ux1d5xxixv6z as defaultRequest } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/DefaultRequest.mjs';
import { HttpResponseValidator2d6ie1tmzg8fi as HttpResponseValidator } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/HttpCallValidator.mjs';
import { HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder } from '../../../../../../ktor-ktor-client-core/io/ktor/client/request/HttpRequest.mjs';
import { Companion_getInstance1p3cpld7r1jz3 as Companion_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpMethod.mjs';
import { HttpStatement3zxb33q8lku as HttpStatement } from '../../../../../../ktor-ktor-client-core/io/ktor/client/statement/HttpStatement.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { HttpClienthpouyso1j6ge as HttpClient } from '../../../../../../ktor-ktor-client-core/io/ktor/client/HttpClient.mjs';
import { getPlatform1wwkyh4cue7su as getPlatform } from '../Platform.js.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_network_MobileBackendClient$stable;
function MobileBackendClient$httpClient$lambda$lambda($this$install) {
  json($this$install, get_json());
  return Unit_instance;
}
function MobileBackendClient$httpClient$lambda$lambda_0($this$install) {
  $this$install.z5o_1 = new (KotlinxWebsocketSerializationConverter())(get_json());
  return Unit_instance;
}
function MobileBackendClient$httpClient$lambda$lambda_1($this$install) {
  $this$install.d63(0.9);
  return Unit_instance;
}
function MobileBackendClient$httpClient$lambda$lambda_2($this$install) {
  $this$install.w5h(new (Long())(8000, 0));
  return Unit_instance;
}
function MobileBackendClient$httpClient$lambda$lambda_3(this$0) {
  return function ($this$defaultRequest) {
    $this$defaultRequest.v51(this$0.e8m_1);
    return Unit_instance;
  };
}
function MobileBackendClient$httpClient$lambda$lambda_4($this$HttpResponseValidator) {
  $this$HttpResponseValidator.u53(MobileBackendClient$httpClient$lambda$lambda$slambda_0(null));
  return Unit_instance;
}
var MobileBackendClient$httpClient$lambda$lambda$slambdaClass;
function MobileBackendClient$httpClient$lambda$lambda$slambda() {
  if (MobileBackendClient$httpClient$lambda$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      q53(response, $completion) {
        var tmp = this.c51(response, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.q53(p1 instanceof HttpResponse() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 6;
                this.i9r_1 = this.h9r_1.m4s().g3y_1;
                if (this.i9r_1 === 200) {
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  if (this.i9r_1 === 304) {
                    this.fd_1 = 5;
                    continue $sm;
                  } else {
                    var containsArg = this.i9r_1;
                    if (300 <= containsArg ? containsArg <= 399 : false) {
                      this.fd_1 = 4;
                      suspendResult = bodyAsText(this.h9r_1, VOID, this);
                      if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                      }
                      continue $sm;
                    } else {
                      var containsArg_0 = this.i9r_1;
                      if (400 <= containsArg_0 ? containsArg_0 <= 499 : false) {
                        this.fd_1 = 3;
                        suspendResult = bodyAsText(this.h9r_1, VOID, this);
                        if (suspendResult === get_COROUTINE_SUSPENDED()) {
                          return suspendResult;
                        }
                        continue $sm;
                      } else {
                        var containsArg_1 = this.i9r_1;
                        if (500 <= containsArg_1 ? containsArg_1 <= 599 : false) {
                          this.fd_1 = 2;
                          suspendResult = bodyAsText(this.h9r_1, VOID, this);
                          if (suspendResult === get_COROUTINE_SUSPENDED()) {
                            return suspendResult;
                          }
                          continue $sm;
                        } else {
                          this.fd_1 = 1;
                          suspendResult = bodyAsText(this.h9r_1, VOID, this);
                          if (suspendResult === get_COROUTINE_SUSPENDED()) {
                            return suspendResult;
                          }
                          continue $sm;
                        }
                      }
                    }
                  }
                }

              case 1:
                var ARGUMENT = suspendResult;
                throw ResponseException().b52(this.h9r_1, ARGUMENT);
              case 2:
                var ARGUMENT_0 = suspendResult;
                throw ServerResponseException().z52(this.h9r_1, ARGUMENT_0);
              case 3:
                var ARGUMENT_1 = suspendResult;
                throw ClientRequestException().r52(this.h9r_1, ARGUMENT_1);
              case 4:
                var ARGUMENT_2 = suspendResult;
                throw RedirectResponseException().j52(this.h9r_1, ARGUMENT_2);
              case 5:
                return Unit_instance;
              case 6:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 6) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      c51(response, completion) {
        var i = new (MobileBackendClient$httpClient$lambda$lambda$slambda())(completion);
        i.h9r_1 = response;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    MobileBackendClient$httpClient$lambda$lambda$slambdaClass = $;
  }
  return MobileBackendClient$httpClient$lambda$lambda$slambdaClass;
}
function MobileBackendClient$httpClient$lambda$lambda$slambda_0(resultContinuation) {
  var i = new (MobileBackendClient$httpClient$lambda$lambda$slambda())(resultContinuation);
  var l = function (response, $completion) {
    return i.q53(response, $completion);
  };
  l.$arity = 1;
  return l;
}
function MobileBackendClient$httpClient$lambda(this$0) {
  return function ($this$HttpClient) {
    var tmp = get_ContentNegotiation();
    $this$HttpClient.o4r(tmp, MobileBackendClient$httpClient$lambda$lambda);
    var tmp_0 = Plugin_getInstance();
    $this$HttpClient.o4r(tmp_0, MobileBackendClient$httpClient$lambda$lambda_0);
    var tmp_1 = get_ContentEncoding();
    $this$HttpClient.o4r(tmp_1, MobileBackendClient$httpClient$lambda$lambda_1);
    var tmp_2 = get_HttpTimeout();
    $this$HttpClient.o4r(tmp_2, MobileBackendClient$httpClient$lambda$lambda_2);
    defaultRequest($this$HttpClient, MobileBackendClient$httpClient$lambda$lambda_3(this$0));
    HttpResponseValidator($this$HttpClient, MobileBackendClient$httpClient$lambda$lambda_4);
    return Unit_instance;
  };
}
var $getCOROUTINE$Class;
function $getCOROUTINE$() {
  if ($getCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, request, resultContinuation) {
        super(resultContinuation);
        this.r9r_1 = _this__u8e3s4;
        this.s9r_1 = request;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                var tmp_0 = this;
                tmp_0.t9r_1 = this.r9r_1.f8m_1;
                var tmp_1 = this;
                tmp_1.u9r_1 = this.s9r_1;
                this.v9r_1 = this.t9r_1;
                this.w9r_1 = this.u9r_1;
                var tmp_2 = this;
                tmp_2.x9r_1 = this.v9r_1;
                var tmp_3 = this;
                var this_0 = new (HttpRequestBuilder())();
                this.w9r_1(this_0);
                tmp_3.y9r_1 = this_0;
                this.z9r_1 = this.x9r_1;
                this.a9s_1 = this.y9r_1;
                this.a9s_1.h4q_1 = Companion_getInstance().m3v_1;
                var tmp_4 = this;
                tmp_4.b9s_1 = this.z9r_1;
                var tmp_5 = this;
                tmp_5.c9s_1 = this.a9s_1;
                this.d9s_1 = this.b9s_1;
                this.e9s_1 = this.c9s_1;
                this.fd_1 = 1;
                suspendResult = (new (HttpStatement())(this.e9s_1, this.d9s_1)).x5s(this);
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
    }
    initMetadataForCoroutine($);
    $getCOROUTINE$Class = $;
  }
  return $getCOROUTINE$Class;
}
var MobileBackendClientClass;
function MobileBackendClient() {
  if (MobileBackendClientClass === VOID) {
    class $ {
      static f9s(engine, backendRoot) {
        var $this = createThis(this);
        $this.e8m_1 = backendRoot;
        var tmp = $this;
        tmp.f8m_1 = HttpClient(engine, MobileBackendClient$httpClient$lambda($this));
        return $this;
      }
      static g8m(backendRoot) {
        return this.f9s(getPlatform().g9s(), backendRoot);
      }
      h9s(request, $completion) {
        var tmp = new ($getCOROUTINE$())(this, request, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    initMetadataForClass($, 'MobileBackendClient', VOID, VOID, VOID, [1]);
    MobileBackendClientClass = $;
  }
  return MobileBackendClientClass;
}
//region block: init
com_mbta_tid_mbta_app_network_MobileBackendClient$stable = 8;
//endregion
//region block: exports
export {
  MobileBackendClient as MobileBackendClientz9b3ukda94t9,
};
//endregion

//# sourceMappingURL=MobileBackendClient.mjs.map
