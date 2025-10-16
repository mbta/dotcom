import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Charsets_getInstanceqs70pvl4noow as Charsets_getInstance } from '../../../../../ktor-ktor-io/io/ktor/utils/io/charsets/Charset.js.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { charset3qqtyytkmxogi as charset } from '../../../../../ktor-ktor-http/io/ktor/http/HttpMessageProperties.mjs';
import { Source1shr0ps16u4p4 as Source } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Source.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { decode1t43jmuxrxpmo as decode } from '../../../../../ktor-ktor-io/io/ktor/utils/io/charsets/Encoding.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var HttpResponseClass;
function HttpResponse() {
  if (HttpResponseClass === VOID) {
    class $ {
      toString() {
        return 'HttpResponse[' + get_request(this).f4s().toString() + ', ' + this.m4s().toString() + ']';
      }
    }
    initMetadataForClass($, 'HttpResponse', VOID, VOID, [CoroutineScope()]);
    HttpResponseClass = $;
  }
  return HttpResponseClass;
}
function get_request(_this__u8e3s4) {
  return _this__u8e3s4.d4s().w4r();
}
function bodyAsText(_this__u8e3s4, fallbackCharset, $completion) {
  fallbackCharset = fallbackCharset === VOID ? Charsets_getInstance().a3g_1 : fallbackCharset;
  var tmp = new ($bodyAsTextCOROUTINE$())(_this__u8e3s4, fallbackCharset, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
var $bodyAsTextCOROUTINE$Class;
function $bodyAsTextCOROUTINE$() {
  if ($bodyAsTextCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, fallbackCharset, resultContinuation) {
        super(resultContinuation);
        this.u5q_1 = _this__u8e3s4;
        this.v5q_1 = fallbackCharset;
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
                var tmp0_elvis_lhs = charset(this.u5q_1);
                tmp_0.w5q_1 = tmp0_elvis_lhs == null ? this.v5q_1 : tmp0_elvis_lhs;
                this.x5q_1 = this.w5q_1.e3g();
                var tmp_1 = this;
                tmp_1.y5q_1 = this.u5q_1;
                this.z5q_1 = this.y5q_1;
                this.fd_1 = 1;
                var tmp_2 = this.z5q_1.d4s();
                var tmp_3 = getKClass(Source());
                var tmp_4;
                try {
                  tmp_4 = createKType(getKClass(Source()), arrayOf([]), false);
                } catch ($p) {
                  var tmp_5;
                  if ($p instanceof Error) {
                    var _unused_var__etf5q3 = $p;
                    tmp_5 = null;
                  } else {
                    throw $p;
                  }
                  tmp_4 = tmp_5;
                }

                suspendResult = tmp_2.a4s(new (TypeInfo())(tmp_3, tmp_4), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var input = (!(suspendResult == null) ? isInterface(suspendResult, Source()) : false) ? suspendResult : THROW_CCE();
                return decode(this.x5q_1, input);
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
    $bodyAsTextCOROUTINE$Class = $;
  }
  return $bodyAsTextCOROUTINE$Class;
}
//region block: exports
export {
  bodyAsText as bodyAsText1is16t8kuttw9,
  HttpResponse as HttpResponse1532ob1hsse1y,
  get_request as get_request3dwcif5y0fvf1,
};
//endregion

//# sourceMappingURL=HttpResponse.mjs.map
