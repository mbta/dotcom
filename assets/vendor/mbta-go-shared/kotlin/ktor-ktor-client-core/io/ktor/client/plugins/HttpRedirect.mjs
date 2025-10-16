import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Companion_getInstanceud97dyzf471m as Companion_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpStatusCode.mjs';
import {
  Send_instance19u839hbvwh8q as Send_instance,
  Sender1wtdgti85uk42 as Sender,
} from './api/CommonHooks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder } from '../request/HttpRequest.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { get_authority2s3hk87lssumy as get_authority } from '../../../../../ktor-ktor-http/io/ktor/http/Url.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { takeFrom3rd40szpqy350 as takeFrom } from '../../../../../ktor-ktor-http/io/ktor/http/URLParser.mjs';
import { isSecurex1qiiavqi0xu as isSecure } from '../../../../../ktor-ktor-http/io/ktor/http/URLProtocol.mjs';
import { get_authorityakhc3pgcrb9j as get_authority_0 } from '../../../../../ktor-ktor-http/io/ktor/http/URLBuilder.mjs';
import { Companion_getInstance1p3cpld7r1jz3 as Companion_getInstance_0 } from '../../../../../ktor-ktor-http/io/ktor/http/HttpMethod.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
import { EventDefinition1fymk8xrdelhn as EventDefinition } from '../../../../../ktor-ktor-events/io/ktor/events/Events.mjs';
import { createClientPluginjwpvufjows5r as createClientPlugin } from './api/CreatePluginUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_ALLOWED_FOR_REDIRECT() {
  _init_properties_HttpRedirect_kt__ure7fo();
  return ALLOWED_FOR_REDIRECT;
}
var ALLOWED_FOR_REDIRECT;
function get_LOGGER() {
  _init_properties_HttpRedirect_kt__ure7fo();
  return LOGGER;
}
var LOGGER;
function get_HttpResponseRedirectEvent() {
  _init_properties_HttpRedirect_kt__ure7fo();
  return HttpResponseRedirectEvent;
}
var HttpResponseRedirectEvent;
function get_HttpRedirect() {
  _init_properties_HttpRedirect_kt__ure7fo();
  return HttpRedirect;
}
var HttpRedirect;
var HttpRedirectConfigClass;
function HttpRedirectConfig() {
  if (HttpRedirectConfigClass === VOID) {
    class $ {
      constructor() {
        this.v5c_1 = true;
        this.w5c_1 = false;
      }
    }
    initMetadataForClass($, 'HttpRedirectConfig', HttpRedirectConfig);
    HttpRedirectConfigClass = $;
  }
  return HttpRedirectConfigClass;
}
function isRedirect(_this__u8e3s4) {
  _init_properties_HttpRedirect_kt__ure7fo();
  var tmp0_subject = _this__u8e3s4.g3y_1;
  return tmp0_subject === Companion_getInstance().p3w_1.g3y_1 || tmp0_subject === Companion_getInstance().q3w_1.g3y_1 || (tmp0_subject === Companion_getInstance().v3w_1.g3y_1 || (tmp0_subject === Companion_getInstance().w3w_1.g3y_1 || tmp0_subject === Companion_getInstance().r3w_1.g3y_1)) ? true : false;
}
function HttpRedirectConfig$_init_$ref_rhym9t() {
  var l = function () {
    return new (HttpRedirectConfig())();
  };
  l.callableName = '<init>';
  return l;
}
function HttpRedirect$lambda($this$createClientPlugin) {
  _init_properties_HttpRedirect_kt__ure7fo();
  var checkHttpMethod = $this$createClientPlugin.c50_1.v5c_1;
  var allowHttpsDowngrade = $this$createClientPlugin.c50_1.w5c_1;
  var tmp = Send_instance;
  $this$createClientPlugin.f50(tmp, HttpRedirect$lambda$slambda_0(checkHttpMethod, allowHttpsDowngrade, $this$createClientPlugin, null));
  return Unit_instance;
}
function invoke$handleCall(_this__u8e3s4, context, origin, allowHttpsDowngrade, client, $completion) {
  var tmp = new ($invoke$handleCallCOROUTINE$())(_this__u8e3s4, context, origin, allowHttpsDowngrade, client, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
var HttpRedirect$lambda$slambdaClass;
function HttpRedirect$lambda$slambda() {
  if (HttpRedirect$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($checkHttpMethod, $allowHttpsDowngrade, $this_createClientPlugin, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.x5d_1 = $checkHttpMethod;
        $box.y5d_1 = $allowHttpsDowngrade;
        $box.z5d_1 = $this_createClientPlugin;
        super(resultContinuation, $box);
      }
      m59($this$on, request, $completion) {
        var tmp = this.n59($this$on, request, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = p1 instanceof Sender() ? p1 : THROW_CCE();
        return this.m59(tmp, p2 instanceof HttpRequestBuilder() ? p2 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                this.fd_1 = 1;
                suspendResult = this.a5e_1.q59(this.b5e_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.c5e_1 = suspendResult;
                if (this.x5d_1 && !get_ALLOWED_FOR_REDIRECT().j1(this.c5e_1.w4r().e4s())) {
                  return this.c5e_1;
                }

                this.fd_1 = 2;
                suspendResult = invoke$handleCall(this.a5e_1, this.b5e_1, this.c5e_1, this.y5d_1, this.z5d_1.b50_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                return suspendResult;
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
      n59($this$on, request, completion) {
        var i = new (HttpRedirect$lambda$slambda())(this.x5d_1, this.y5d_1, this.z5d_1, completion);
        i.a5e_1 = $this$on;
        i.b5e_1 = request;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    HttpRedirect$lambda$slambdaClass = $;
  }
  return HttpRedirect$lambda$slambdaClass;
}
function HttpRedirect$lambda$slambda_0($checkHttpMethod, $allowHttpsDowngrade, $this_createClientPlugin, resultContinuation) {
  var i = new (HttpRedirect$lambda$slambda())($checkHttpMethod, $allowHttpsDowngrade, $this_createClientPlugin, resultContinuation);
  var l = function ($this$on, request, $completion) {
    return i.m59($this$on, request, $completion);
  };
  l.$arity = 2;
  return l;
}
var $invoke$handleCallCOROUTINE$Class;
function $invoke$handleCallCOROUTINE$() {
  if ($invoke$handleCallCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, context, origin, allowHttpsDowngrade, client, resultContinuation) {
        super(resultContinuation);
        this.f5d_1 = _this__u8e3s4;
        this.g5d_1 = context;
        this.h5d_1 = origin;
        this.i5d_1 = allowHttpsDowngrade;
        this.j5d_1 = client;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                if (!isRedirect(this.h5d_1.g4p().m4s()))
                  return this.h5d_1;
                this.k5d_1 = this.h5d_1;
                this.l5d_1 = this.g5d_1;
                this.m5d_1 = this.h5d_1.w4r().f4s().l3z_1;
                this.n5d_1 = get_authority(this.h5d_1.w4r().f4s());
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!true) {
                  this.fd_1 = 4;
                  continue $sm;
                }

                this.j5d_1.l4o_1.w4n(get_HttpResponseRedirectEvent(), this.k5d_1.g4p());
                this.o5d_1 = this.k5d_1.g4p().l3v().lk(HttpHeaders_getInstance().g3s_1);
                get_LOGGER().u3n('Received redirect response to ' + this.o5d_1 + ' for request ' + this.g5d_1.g4q_1.toString());
                var tmp_0 = this;
                var this_0 = new (HttpRequestBuilder())();
                this_0.h4x(this.l5d_1);
                this_0.g4q_1.v3y_1.p3();
                var tmp0_safe_receiver = this.o5d_1;
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  takeFrom(this_0.g4q_1, tmp0_safe_receiver);
                }

                if (!this.i5d_1 && isSecure(this.m5d_1) && !isSecure(this_0.g4q_1.y3y())) {
                  get_LOGGER().u3n('Can not redirect ' + this.g5d_1.g4q_1.toString() + ' because of security downgrade');
                  return this.k5d_1;
                }

                if (!(this.n5d_1 === get_authority_0(this_0.g4q_1))) {
                  this_0.i4q_1.m3j(HttpHeaders_getInstance().b3r_1);
                  get_LOGGER().u3n('Removing Authorization header from redirect for ' + this.g5d_1.g4q_1.toString());
                }

                tmp_0.l5d_1 = this_0;
                this.fd_1 = 2;
                suspendResult = this.f5d_1.q59(this.l5d_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.k5d_1 = suspendResult;
                if (!isRedirect(this.k5d_1.g4p().m4s()))
                  return this.k5d_1;
                this.fd_1 = 1;
                continue $sm;
              case 3:
                throw this.id_1;
              case 4:
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
    }
    initMetadataForCoroutine($);
    $invoke$handleCallCOROUTINE$Class = $;
  }
  return $invoke$handleCallCOROUTINE$Class;
}
var properties_initialized_HttpRedirect_kt_klj746;
function _init_properties_HttpRedirect_kt__ure7fo() {
  if (!properties_initialized_HttpRedirect_kt_klj746) {
    properties_initialized_HttpRedirect_kt_klj746 = true;
    ALLOWED_FOR_REDIRECT = setOf([Companion_getInstance_0().m3v_1, Companion_getInstance_0().r3v_1]);
    LOGGER = KtorSimpleLogger('io.ktor.client.plugins.HttpRedirect');
    HttpResponseRedirectEvent = new (EventDefinition())();
    var tmp = HttpRedirectConfig$_init_$ref_rhym9t();
    HttpRedirect = createClientPlugin('HttpRedirect', tmp, HttpRedirect$lambda);
  }
}
//region block: exports
export {
  get_HttpRedirect as get_HttpRedirect1lgx3wewnhrb0,
};
//endregion

//# sourceMappingURL=HttpRedirect.mjs.map
