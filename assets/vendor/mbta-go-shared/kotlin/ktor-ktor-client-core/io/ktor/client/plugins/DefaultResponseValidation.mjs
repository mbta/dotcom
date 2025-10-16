import {
  HttpResponseValidator2d6ie1tmzg8fi as HttpResponseValidator,
  get_ExpectSuccessAttributeKey20jj5fup38v1g as get_ExpectSuccessAttributeKey,
} from './HttpCallValidator.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  Unit_instance1fbcbse1fwigr as Unit_instance,
  Unitkvevlwgzwiuc as Unit,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  HttpResponse1532ob1hsse1y as HttpResponse,
  bodyAsText1is16t8kuttw9 as bodyAsText,
} from '../statement/HttpResponse.mjs';
import { save1zsice73vjdpw as save } from '../call/SavedCall.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { MalformedInputExceptionbvc6h5ij0ias as MalformedInputException } from '../../../../../ktor-ktor-io/io/ktor/utils/io/charsets/Charset.js.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_ValidateMark() {
  _init_properties_DefaultResponseValidation_kt__wcn8vr();
  return ValidateMark;
}
var ValidateMark;
function get_LOGGER() {
  _init_properties_DefaultResponseValidation_kt__wcn8vr();
  return LOGGER;
}
var LOGGER;
function addDefaultResponseValidation(_this__u8e3s4) {
  _init_properties_DefaultResponseValidation_kt__wcn8vr();
  HttpResponseValidator(_this__u8e3s4, addDefaultResponseValidation$lambda(_this__u8e3s4));
}
var ResponseExceptionClass;
function ResponseException() {
  if (ResponseExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static b52(response, cachedResponseText) {
        var $this = this.o5('Bad response: ' + response.toString() + '. Text: "' + cachedResponseText + '"');
        captureStack($this, $this.a52_1);
        $this.z51_1 = response;
        return $this;
      }
    }
    initMetadataForClass($, 'ResponseException');
    ResponseExceptionClass = $;
  }
  return ResponseExceptionClass;
}
var RedirectResponseExceptionClass;
function RedirectResponseException() {
  if (RedirectResponseExceptionClass === VOID) {
    class $ extends ResponseException() {
      static j52(response, cachedResponseText) {
        var $this = this.b52(response, cachedResponseText);
        captureStack($this, $this.i52_1);
        $this.h52_1 = 'Unhandled redirect: ' + response.d4s().w4r().e4s().u3v_1 + ' ' + response.d4s().w4r().f4s().toString() + '. ' + ('Status: ' + response.m4s().toString() + '. Text: "' + cachedResponseText + '"');
        delete $this.message;
        return $this;
      }
      p2() {
        return this.h52_1;
      }
      get message() {
        return this.p2();
      }
    }
    initMetadataForClass($, 'RedirectResponseException');
    RedirectResponseExceptionClass = $;
  }
  return RedirectResponseExceptionClass;
}
var ClientRequestExceptionClass;
function ClientRequestException() {
  if (ClientRequestExceptionClass === VOID) {
    class $ extends ResponseException() {
      static r52(response, cachedResponseText) {
        var $this = this.b52(response, cachedResponseText);
        captureStack($this, $this.q52_1);
        $this.p52_1 = 'Client request(' + response.d4s().w4r().e4s().u3v_1 + ' ' + response.d4s().w4r().f4s().toString() + ') ' + ('invalid: ' + response.m4s().toString() + '. Text: "' + cachedResponseText + '"');
        delete $this.message;
        return $this;
      }
      p2() {
        return this.p52_1;
      }
      get message() {
        return this.p2();
      }
    }
    initMetadataForClass($, 'ClientRequestException');
    ClientRequestExceptionClass = $;
  }
  return ClientRequestExceptionClass;
}
var ServerResponseExceptionClass;
function ServerResponseException() {
  if (ServerResponseExceptionClass === VOID) {
    class $ extends ResponseException() {
      static z52(response, cachedResponseText) {
        var $this = this.b52(response, cachedResponseText);
        captureStack($this, $this.y52_1);
        $this.x52_1 = 'Server error(' + response.d4s().w4r().e4s().u3v_1 + ' ' + response.d4s().w4r().f4s().toString() + ': ' + (response.m4s().toString() + '. Text: "' + cachedResponseText + '"');
        delete $this.message;
        return $this;
      }
      p2() {
        return this.x52_1;
      }
      get message() {
        return this.p2();
      }
    }
    initMetadataForClass($, 'ServerResponseException');
    ServerResponseExceptionClass = $;
  }
  return ServerResponseExceptionClass;
}
var addDefaultResponseValidation$lambda$slambdaClass;
function addDefaultResponseValidation$lambda$slambda() {
  if (addDefaultResponseValidation$lambda$slambdaClass === VOID) {
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
                this.gd_1 = 5;
                this.j53_1 = this.i53_1.d4s().x4r().f3h(get_ExpectSuccessAttributeKey());
                if (!this.j53_1) {
                  get_LOGGER().u3n('Skipping default response validation for ' + this.i53_1.d4s().w4r().f4s().toString());
                  return Unit_instance;
                }

                this.k53_1 = this.i53_1.m4s().g3y_1;
                this.l53_1 = this.i53_1.d4s();
                if (this.k53_1 < 300 || this.l53_1.x4r().h3h(get_ValidateMark())) {
                  return Unit_instance;
                }

                this.fd_1 = 1;
                suspendResult = save(this.l53_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.m53_1 = suspendResult;
                var tmp_0 = this;
                var this_0 = this.m53_1;
                this_0.x4r().i3h(get_ValidateMark(), Unit_instance);
                tmp_0.n53_1 = this_0;
                this.o53_1 = this.n53_1.g4p();
                this.gd_1 = 3;
                this.fd_1 = 2;
                suspendResult = bodyAsText(this.o53_1, VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.p53_1 = suspendResult;
                this.gd_1 = 5;
                this.fd_1 = 4;
                continue $sm;
              case 3:
                this.gd_1 = 5;
                var tmp_1 = this.id_1;
                if (tmp_1 instanceof MalformedInputException()) {
                  var _unused_var__etf5q3 = this.id_1;
                  var tmp_2 = this;
                  tmp_2.p53_1 = '<body failed decoding>';
                  this.fd_1 = 4;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 4:
                this.gd_1 = 5;
                var exceptionResponseText = this.p53_1;
                var tmp0_subject = this.k53_1;
                var exception = (300 <= tmp0_subject ? tmp0_subject <= 399 : false) ? RedirectResponseException().j52(this.o53_1, exceptionResponseText) : (400 <= tmp0_subject ? tmp0_subject <= 499 : false) ? ClientRequestException().r52(this.o53_1, exceptionResponseText) : (500 <= tmp0_subject ? tmp0_subject <= 599 : false) ? ServerResponseException().z52(this.o53_1, exceptionResponseText) : ResponseException().b52(this.o53_1, exceptionResponseText);
                get_LOGGER().u3n('Default response validation for ' + this.i53_1.d4s().w4r().f4s().toString() + ' failed with ' + exception.toString());
                throw exception;
              case 5:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 5) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      c51(response, completion) {
        var i = new (addDefaultResponseValidation$lambda$slambda())(completion);
        i.i53_1 = response;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    addDefaultResponseValidation$lambda$slambdaClass = $;
  }
  return addDefaultResponseValidation$lambda$slambdaClass;
}
function addDefaultResponseValidation$lambda$slambda_0(resultContinuation) {
  var i = new (addDefaultResponseValidation$lambda$slambda())(resultContinuation);
  var l = function (response, $completion) {
    return i.q53(response, $completion);
  };
  l.$arity = 1;
  return l;
}
function addDefaultResponseValidation$lambda($this_addDefaultResponseValidation) {
  return function ($this$HttpResponseValidator) {
    $this$HttpResponseValidator.t53_1 = $this_addDefaultResponseValidation.a4r_1;
    $this$HttpResponseValidator.u53(addDefaultResponseValidation$lambda$slambda_0(null));
    return Unit_instance;
  };
}
var properties_initialized_DefaultResponseValidation_kt_akvzqt;
function _init_properties_DefaultResponseValidation_kt__wcn8vr() {
  if (!properties_initialized_DefaultResponseValidation_kt_akvzqt) {
    properties_initialized_DefaultResponseValidation_kt_akvzqt = true;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'ValidateMark';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp = getKClass(Unit());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_0;
    try {
      tmp_0 = createKType(getKClass(Unit()), arrayOf([]), false);
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
    ValidateMark = new (AttributeKey())(name, tmp$ret$1);
    LOGGER = KtorSimpleLogger('io.ktor.client.plugins.DefaultResponseValidation');
  }
}
//region block: exports
export {
  ClientRequestException as ClientRequestExceptionj69ilxf38oeq,
  RedirectResponseException as RedirectResponseException2ui4bcjl4a483,
  ResponseException as ResponseException2ofl6x4wye9sn,
  ServerResponseException as ServerResponseException340iruvt5onmi,
  addDefaultResponseValidation as addDefaultResponseValidation1d06vtgr9flaj,
};
//endregion

//# sourceMappingURL=DefaultResponseValidation.mjs.map
