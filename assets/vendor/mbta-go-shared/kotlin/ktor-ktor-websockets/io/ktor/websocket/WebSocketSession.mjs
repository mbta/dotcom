import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  CloseReason10cphaqpp3ct7 as CloseReason,
  Codes_NORMAL_getInstance2p2d63s1iongn as Codes_NORMAL_getInstance,
  Codes_INTERNAL_ERROR_getInstance3iys9whrnik2e as Codes_INTERNAL_ERROR_getInstance,
} from './CloseReason.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Close3tx65evcwi73t as Close } from './FrameJs.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function send(frame, $completion) {
  return this.a4a().l2l(frame, $completion);
}
var WebSocketSessionClass;
function WebSocketSession() {
  if (WebSocketSessionClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'WebSocketSession', VOID, VOID, [CoroutineScope()], [1, 0]);
    WebSocketSessionClass = $;
  }
  return WebSocketSessionClass;
}
function close(_this__u8e3s4, reason, $completion) {
  reason = reason === VOID ? CloseReason().u49(Codes_NORMAL_getInstance(), '') : reason;
  var tmp = new ($closeCOROUTINE$())(_this__u8e3s4, reason, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function closeExceptionally(_this__u8e3s4, cause, $completion) {
  var tmp;
  if (cause instanceof CancellationException()) {
    tmp = CloseReason().u49(Codes_NORMAL_getInstance(), '');
  } else {
    tmp = CloseReason().u49(Codes_INTERNAL_ERROR_getInstance(), cause.toString());
  }
  var reason = tmp;
  return close(_this__u8e3s4, reason, $completion);
}
var $closeCOROUTINE$Class;
function $closeCOROUTINE$() {
  if ($closeCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, reason, resultContinuation) {
        super(resultContinuation);
        this.c4k_1 = _this__u8e3s4;
        this.d4k_1 = reason;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                this.gd_1 = 3;
                this.fd_1 = 1;
                suspendResult = this.c4k_1.b4a(Close().x4e(this.d4k_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.fd_1 = 2;
                suspendResult = this.c4k_1.u35(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.gd_1 = 4;
                this.fd_1 = 5;
                continue $sm;
              case 3:
                this.gd_1 = 4;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Error) {
                  var _unused_var__etf5q3 = this.id_1;
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 4:
                throw this.id_1;
              case 5:
                this.gd_1 = 4;
                return Unit_instance;
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
    $closeCOROUTINE$Class = $;
  }
  return $closeCOROUTINE$Class;
}
//region block: exports
export {
  send as sendvcq8td68z5o6,
  closeExceptionally as closeExceptionally3egz2k4475aku,
  close as closenu460w3uw8s7,
  WebSocketSession as WebSocketSessionzi1ianvyj32u,
};
//endregion

//# sourceMappingURL=WebSocketSession.mjs.map
