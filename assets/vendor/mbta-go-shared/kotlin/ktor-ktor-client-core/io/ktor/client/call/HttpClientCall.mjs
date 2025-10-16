import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { instanceOf2cx3k00nj6a0p as instanceOf } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/TypeInfoJs.mjs';
import { get_isSaved1yor47kvbhumv as get_isSaved } from '../plugins/SaveBody.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { HttpResponseContainer3r9yzy4mwwvc9 as HttpResponseContainer } from '../statement/HttpResponsePipeline.mjs';
import { NullBody_instance2i6w0hfghwfg0 as NullBody_instance } from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import {
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
  captureStack1fzi4aczwc4hg as captureStack,
  toString1pkumu07cwy4m as toString,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  cancel2ztysw4v4hav6 as cancel,
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
} from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { atomic$boolean$1iggki4z65a2h as atomic$boolean$1 } from '../../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { throwUninitializedPropertyAccessExceptionyynx7gkm73wd as throwUninitializedPropertyAccessException } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { DefaultHttpRequest19v463zllbymg as DefaultHttpRequest } from '../request/DefaultHttpRequest.mjs';
import { DefaultHttpResponse2wnrinzo0twhn as DefaultHttpResponse } from '../statement/DefaultHttpResponse.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ByteReadChannel2wzou76jce72d as ByteReadChannel } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannel.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { get_request3dwcif5y0fvf1 as get_request } from '../statement/HttpResponse.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { trimIndent1qytc1wvt8suh as trimIndent } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/Indent.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        // Inline function 'io.ktor.util.AttributeKey' call
        var name = 'CustomResponse';
        // Inline function 'io.ktor.util.reflect.typeInfo' call
        var tmp_0 = PrimitiveClasses_getInstance().ci();
        // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
        var tmp_1;
        try {
          tmp_1 = createKType(PrimitiveClasses_getInstance().ci(), arrayOf([]), false);
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
        tmp.q4s_1 = new (AttributeKey())(name, tmp$ret$1);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var $bodyNullableCOROUTINE$Class;
function $bodyNullableCOROUTINE$() {
  if ($bodyNullableCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, info, resultContinuation) {
        super(resultContinuation);
        this.z4s_1 = _this__u8e3s4;
        this.a4t_1 = info;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 5;
                this.gd_1 = 4;
                if (instanceOf(this.z4s_1.g4p(), this.a4t_1.g3n_1))
                  return this.z4s_1.g4p();
                if (!this.z4s_1.y4r() && !get_isSaved(this.z4s_1.g4p()) && !this.z4s_1.c4p_1.atomicfu$compareAndSet(false, true)) {
                  throw DoubleReceiveException().k4t(this.z4s_1);
                }

                this.b4t_1 = this.z4s_1.x4r().g3h(Companion_getInstance().q4s_1);
                if (this.b4t_1 == null) {
                  this.fd_1 = 1;
                  suspendResult = this.z4s_1.z4r(this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.c4t_1 = this.b4t_1;
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 1:
                this.c4t_1 = suspendResult;
                this.fd_1 = 2;
                continue $sm;
              case 2:
                this.d4t_1 = this.c4t_1;
                this.e4t_1 = new (HttpResponseContainer())(this.a4t_1, this.d4t_1);
                this.fd_1 = 3;
                suspendResult = this.z4s_1.b4p_1.g4o_1.n3m(this.z4s_1, this.e4t_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 3:
                var ARGUMENT = suspendResult;
                var this_0 = ARGUMENT.m4t_1;
                var tmp_0;
                if (!equals(this_0, NullBody_instance)) {
                  tmp_0 = this_0;
                } else {
                  tmp_0 = null;
                }

                var result = tmp_0;
                if (!(result == null) && !instanceOf(result, this.a4t_1.g3n_1)) {
                  var from = getKClassFromExpression(result);
                  var to = this.a4t_1.g3n_1;
                  throw NoTransformationFoundException().s4t(this.z4s_1.g4p(), from, to);
                }

                return result;
              case 4:
                this.gd_1 = 5;
                var tmp_1 = this.id_1;
                if (tmp_1 instanceof Error) {
                  var cause = this.id_1;
                  cancel(this.z4s_1.g4p(), 'Receive failed', cause);
                  throw cause;
                } else {
                  throw this.id_1;
                }

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
    }
    initMetadataForCoroutine($);
    $bodyNullableCOROUTINE$Class = $;
  }
  return $bodyNullableCOROUTINE$Class;
}
var HttpClientCallClass;
function HttpClientCall() {
  if (HttpClientCallClass === VOID) {
    class $ {
      static v4r(client) {
        Companion_getInstance();
        var $this = createThis(this);
        $this.b4p_1 = client;
        $this.c4p_1 = atomic$boolean$1(false);
        $this.f4p_1 = false;
        return $this;
      }
      w20() {
        return this.g4p().w20();
      }
      x4r() {
        return this.w4r().x4r();
      }
      w4r() {
        var tmp = this.d4p_1;
        if (!(tmp == null))
          return tmp;
        else {
          throwUninitializedPropertyAccessException('request');
        }
      }
      g4p() {
        var tmp = this.e4p_1;
        if (!(tmp == null))
          return tmp;
        else {
          throwUninitializedPropertyAccessException('response');
        }
      }
      static t4t(client, requestData, responseData) {
        Companion_getInstance();
        var $this = this.v4r(client);
        $this.d4p_1 = new (DefaultHttpRequest())($this, requestData);
        $this.e4p_1 = new (DefaultHttpResponse())($this, responseData);
        $this.x4r().j3h(Companion_getInstance().q4s_1);
        var tmp = responseData.y4t_1;
        if (!isInterface(tmp, ByteReadChannel())) {
          $this.x4r().i3h(Companion_getInstance().q4s_1, responseData.y4t_1);
        }
        return $this;
      }
      y4r() {
        return this.f4p_1;
      }
      z4r($completion) {
        return this.g4p().l4s();
      }
      a4s(info, $completion) {
        var tmp = new ($bodyNullableCOROUTINE$())(this, info, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      toString() {
        return 'HttpClientCall[' + this.w4r().f4s().toString() + ', ' + this.g4p().m4s().toString() + ']';
      }
      h4p(response) {
        this.e4p_1 = response;
      }
    }
    initMetadataForClass($, 'HttpClientCall', VOID, VOID, [CoroutineScope()], [0, 1]);
    HttpClientCallClass = $;
  }
  return HttpClientCallClass;
}
var DoubleReceiveExceptionClass;
function DoubleReceiveException() {
  if (DoubleReceiveExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static k4t(call) {
        var $this = this.ge();
        captureStack($this, $this.j4t_1);
        $this.i4t_1 = 'Response already received: ' + call.toString();
        delete $this.message;
        return $this;
      }
      p2() {
        return this.i4t_1;
      }
      get message() {
        return this.p2();
      }
    }
    initMetadataForClass($, 'DoubleReceiveException');
    DoubleReceiveExceptionClass = $;
  }
  return DoubleReceiveExceptionClass;
}
var NoTransformationFoundExceptionClass;
function NoTransformationFoundException() {
  if (NoTransformationFoundExceptionClass === VOID) {
    class $ extends UnsupportedOperationException() {
      static s4t(response, from, to) {
        var $this = this.i5();
        captureStack($this, $this.r4t_1);
        $this.q4t_1 = trimIndent("\n        Expected response body of the type '" + toString(to) + "' but was '" + toString(from) + "'\n        In response from `" + get_request(response).f4s().toString() + '`\n        Response status `' + response.m4s().toString() + '`\n        Response header `ContentType: ' + response.l3v().lk(HttpHeaders_getInstance().k3r_1) + '` \n        Request header `Accept: ' + get_request(response).l3v().lk(HttpHeaders_getInstance().s3q_1) + '`\n        \n        You can read how to resolve NoTransformationFoundException at FAQ: \n        https://ktor.io/docs/faq.html#no-transformation-found-exception\n    ');
        delete $this.message;
        return $this;
      }
      p2() {
        return this.q4t_1;
      }
      get message() {
        return this.p2();
      }
    }
    initMetadataForClass($, 'NoTransformationFoundException');
    NoTransformationFoundExceptionClass = $;
  }
  return NoTransformationFoundExceptionClass;
}
//region block: exports
export {
  HttpClientCall as HttpClientCall2j6myj8ctykar,
};
//endregion

//# sourceMappingURL=HttpClientCall.mjs.map
