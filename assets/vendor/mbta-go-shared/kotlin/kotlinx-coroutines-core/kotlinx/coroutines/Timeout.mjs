import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initCause1uc19zhi9fkfi as initCause } from './internal/StackTraceRecovery.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CopyableThrowable1mvc99jcyvivf as CopyableThrowable } from './Debug.common.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  toDelayMillis3fd263ql63uu2 as toDelayMillis,
  get_delaynv5kl66dta33 as get_delay,
  DelayWithTimeoutDiagnostics19ibxwhhgbjz0 as DelayWithTimeoutDiagnostics,
} from './Delay.mjs';
import { ScopeCoroutine2c07fgm3ekmnx as ScopeCoroutine } from './internal/Scopes.mjs';
import { Runnablezd7bpy5et5p0 as Runnable } from './Runnable.mjs';
import { disposeOnCompletion1zvxmj809ax5i as disposeOnCompletion } from './Job.mjs';
import { startUndispatchedOrReturnIgnoreTimeout3dcuyudwff859 as startUndispatchedOrReturnIgnoreTimeout } from './intrinsics/Undispatched.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance,
  toDurationba1nlt78o6vu as toDuration,
} from '../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_MILLISECONDS_getInstance15owevua4zjxe as DurationUnit_MILLISECONDS_getInstance } from '../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { returnIfSuspendedqak8u4r448cu as returnIfSuspended } from '../../../kotlin-kotlin-stdlib/kotlin/js/coroutineInternalJS.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var TimeoutCancellationExceptionClass;
function TimeoutCancellationException() {
  if (TimeoutCancellationExceptionClass === VOID) {
    class $ extends CancellationException() {
      static e2e(message, coroutine) {
        var $this = this.he(message);
        captureStack($this, $this.d2e_1);
        $this.c2e_1 = coroutine;
        return $this;
      }
      static f2e(message) {
        return this.e2e(message, null);
      }
      z28() {
        var tmp0_elvis_lhs = this.message;
        // Inline function 'kotlin.also' call
        var this_0 = TimeoutCancellationException().e2e(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, this.c2e_1);
        initCause(this_0, this);
        return this_0;
      }
    }
    initMetadataForClass($, 'TimeoutCancellationException', VOID, VOID, [CancellationException(), CopyableThrowable()]);
    TimeoutCancellationExceptionClass = $;
  }
  return TimeoutCancellationExceptionClass;
}
function withTimeoutOrNull(timeMillis, block, $completion) {
  var tmp = new ($withTimeoutOrNullCOROUTINE$())(timeMillis, block, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function withTimeout(timeout, block, $completion) {
  return withTimeout_0(toDelayMillis(timeout), block, $completion);
}
var TimeoutCoroutineClass;
function TimeoutCoroutine() {
  if (TimeoutCoroutineClass === VOID) {
    class $ extends ScopeCoroutine() {
      constructor(time, uCont) {
        super(uCont.ld(), uCont);
        this.v2e_1 = time;
      }
      z26() {
        this.l22(TimeoutCancellationException_0(this.v2e_1, get_delay(this.v20_1), this));
      }
      j21() {
        return super.j21() + '(timeMillis=' + this.v2e_1.toString() + ')';
      }
    }
    initMetadataForClass($, 'TimeoutCoroutine', VOID, VOID, [ScopeCoroutine(), Runnable()], [0]);
    TimeoutCoroutineClass = $;
  }
  return TimeoutCoroutineClass;
}
function setupTimeout(coroutine, block) {
  var cont = coroutine.p23_1;
  var context = cont.ld();
  disposeOnCompletion(coroutine, get_delay(context).b29(coroutine.v2e_1, coroutine, coroutine.v20_1));
  return startUndispatchedOrReturnIgnoreTimeout(coroutine, coroutine, block);
}
function withTimeout_0(timeMillis, block, $completion) {
  if (timeMillis.d2(new (Long())(0, 0)) <= 0)
    throw TimeoutCancellationException().f2e('Timed out immediately');
  return setupTimeout(new (TimeoutCoroutine())(timeMillis, $completion), block);
}
function TimeoutCancellationException_0(time, delay, coroutine) {
  var tmp0_safe_receiver = isInterface(delay, DelayWithTimeoutDiagnostics()) ? delay : null;
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.time.Companion.milliseconds' call
    Companion_getInstance();
    var tmp$ret$0 = toDuration(time, DurationUnit_MILLISECONDS_getInstance());
    tmp = tmp0_safe_receiver.c29(tmp$ret$0);
  }
  var tmp1_elvis_lhs = tmp;
  var message = tmp1_elvis_lhs == null ? 'Timed out waiting for ' + time.toString() + ' ms' : tmp1_elvis_lhs;
  return TimeoutCancellationException().e2e(message, coroutine);
}
var $withTimeoutOrNullCOROUTINE$Class;
function $withTimeoutOrNullCOROUTINE$() {
  if ($withTimeoutOrNullCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(timeMillis, block, resultContinuation) {
        super(resultContinuation);
        this.o2e_1 = timeMillis;
        this.p2e_1 = block;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                if (this.o2e_1.d2(new (Long())(0, 0)) <= 0)
                  return null;
                this.q2e_1 = {_v: null};
                this.gd_1 = 2;
                this.fd_1 = 1;
                var timeoutCoroutine = new (TimeoutCoroutine())(this.o2e_1, this);
                this.q2e_1._v = timeoutCoroutine;
                suspendResult = returnIfSuspended(setupTimeout(timeoutCoroutine, this.p2e_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return suspendResult;
              case 2:
                this.gd_1 = 3;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof TimeoutCancellationException()) {
                  var e = this.id_1;
                  if (e.c2e_1 === this.q2e_1._v) {
                    return null;
                  }
                  throw e;
                } else {
                  throw this.id_1;
                }

              case 3:
                throw this.id_1;
            }
          } catch ($p) {
            var e_0 = $p;
            if (this.gd_1 === 3) {
              throw e_0;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_0;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $withTimeoutOrNullCOROUTINE$Class = $;
  }
  return $withTimeoutOrNullCOROUTINE$Class;
}
//region block: exports
export {
  withTimeoutOrNull as withTimeoutOrNull1j8ayhfbyp4sk,
  withTimeout as withTimeout1xcycxinug3ct,
  TimeoutCancellationException as TimeoutCancellationException198b5zwr3v3uw,
};
//endregion

//# sourceMappingURL=Timeout.mjs.map
