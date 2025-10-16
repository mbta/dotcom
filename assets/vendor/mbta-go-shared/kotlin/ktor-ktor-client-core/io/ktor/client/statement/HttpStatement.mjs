import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { HttpRequestBuilder15f2nnx9sjuv1 as HttpRequestBuilder } from '../request/HttpRequest.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { save1zsice73vjdpw as save } from '../call/SavedCall.mjs';
import { unwrapCancellationException1zvbmufui4i9c as unwrapCancellationException } from '../utils/ExceptionUtils.nonJvm.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Key_instance2tirv2rj82ml4 as Key_instance } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import {
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CompletableJob1w6swnu15iclo as CompletableJob } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CompletableJob.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { canceldn4b3cdqcfny as cancel } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannel.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var $fetchResponseCOROUTINE$Class;
function $fetchResponseCOROUTINE$() {
  if ($fetchResponseCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.y5r_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 7;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 6;
                this.a5s_1 = (new (HttpRequestBuilder())()).h4x(this.y5r_1.e5s_1);
                this.fd_1 = 2;
                suspendResult = this.y5r_1.f5s_1.l4r(this.a5s_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.b5s_1 = suspendResult;
                this.fd_1 = 3;
                suspendResult = save(this.b5s_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 3:
                this.c5s_1 = suspendResult;
                this.d5s_1 = this.c5s_1.g4p();
                this.fd_1 = 4;
                suspendResult = this.y5r_1.g5s(this.b5s_1.g4p(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 4:
                var tmp_0 = this;
                return this.d5s_1;
              case 5:
                return this.z5r_1;
              case 6:
                this.gd_1 = 7;
                var tmp_1 = this.id_1;
                if (tmp_1 instanceof CancellationException()) {
                  var cause = this.id_1;
                  throw unwrapCancellationException(cause);
                } else {
                  throw this.id_1;
                }

              case 7:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 7) {
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
    $fetchResponseCOROUTINE$Class = $;
  }
  return $fetchResponseCOROUTINE$Class;
}
var $cleanupCOROUTINE$Class;
function $cleanupCOROUTINE$() {
  if ($cleanupCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
        super(resultContinuation);
        this.p5s_1 = _this__u8e3s4;
        this.q5s_1 = _this__u8e3s4_0;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                var tmp_0 = this;
                var tmp_1 = ensureNotNull(this.q5s_1.w20().sd(Key_instance));
                tmp_0.r5s_1 = isInterface(tmp_1, CompletableJob()) ? tmp_1 : THROW_CCE();
                var tmp_2 = this;
                tmp_2.s5s_1 = this.r5s_1;
                this.t5s_1 = this.s5s_1;
                var tmp_3 = this;
                tmp_3.u5s_1 = this.t5s_1;
                this.v5s_1 = this.u5s_1;
                this.v5s_1.i28();
                this.gd_1 = 1;
                cancel(this.q5s_1.l4s());
                this.gd_1 = 4;
                this.fd_1 = 2;
                continue $sm;
              case 1:
                this.gd_1 = 4;
                var tmp_4 = this.id_1;
                if (tmp_4 instanceof Error) {
                  this.w5s_1 = this.id_1;
                  this.fd_1 = 2;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 2:
                this.gd_1 = 4;
                this.fd_1 = 3;
                suspendResult = this.v5s_1.d22(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

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
    }
    initMetadataForCoroutine($);
    $cleanupCOROUTINE$Class = $;
  }
  return $cleanupCOROUTINE$Class;
}
var HttpStatementClass;
function HttpStatement() {
  if (HttpStatementClass === VOID) {
    class $ {
      constructor(builder, client) {
        this.e5s_1 = builder;
        this.f5s_1 = client;
      }
      x5s($completion) {
        return this.y5s($completion);
      }
      y5s($completion) {
        var tmp = new ($fetchResponseCOROUTINE$())(this, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      g5s(_this__u8e3s4, $completion) {
        var tmp = new ($cleanupCOROUTINE$())(this, _this__u8e3s4, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      toString() {
        return 'HttpStatement[' + this.e5s_1.g4q_1.toString() + ']';
      }
    }
    initMetadataForClass($, 'HttpStatement', VOID, VOID, VOID, [1, 0]);
    HttpStatementClass = $;
  }
  return HttpStatementClass;
}
//region block: exports
export {
  HttpStatement as HttpStatement3zxb33q8lku,
};
//endregion

//# sourceMappingURL=HttpStatement.mjs.map
