import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
  Result__exceptionOrNull_impl_p6xea9ty3elzpd9eo3 as Result__exceptionOrNull_impl_p6xea9,
  _Result___get_isFailure__impl__jpirivrr0d11rbi6gb as _Result___get_isFailure__impl__jpiriv,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { pipelineStartCoroutineUninterceptedOrReturn3fvxhza76tp2 as pipelineStartCoroutineUninterceptedOrReturn } from './PipelineJs.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { recoverStackTraceBridge1qu82j8ymuquf as recoverStackTraceBridge } from './StackTraceRecover.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/Continuation.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from './PipelineContext.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function loop($this, direct) {
  do {
    var currentIndex = $this.c3n_1;
    if (currentIndex === $this.x3m_1.c1()) {
      if (!direct) {
        // Inline function 'kotlin.Companion.success' call
        var value = $this.z3m_1;
        var tmp$ret$0 = _Result___init__impl__xyqfz8(value);
        resumeRootWith($this, tmp$ret$0);
        return false;
      }
      return true;
    }
    $this.c3n_1 = currentIndex + 1 | 0;
    var next = $this.x3m_1.e1(currentIndex);
    try {
      var result = pipelineStartCoroutineUninterceptedOrReturn(next, $this, $this.z3m_1, $this.y3m_1);
      if (result === get_COROUTINE_SUSPENDED())
        return false;
    } catch ($p) {
      if ($p instanceof Error) {
        var cause = $p;
        // Inline function 'kotlin.Companion.failure' call
        var tmp$ret$1 = _Result___init__impl__xyqfz8(createFailure(cause));
        resumeRootWith($this, tmp$ret$1);
        return false;
      } else {
        throw $p;
      }
    }
  }
   while (true);
}
function resumeRootWith($this, result) {
  if ($this.b3n_1 < 0) {
    // Inline function 'kotlin.error' call
    var message = 'No more continuations to resume';
    throw IllegalStateException().o5(toString(message));
  }
  var next = ensureNotNull($this.a3n_1[$this.b3n_1]);
  var _unary__edvuaz = $this.b3n_1;
  $this.b3n_1 = _unary__edvuaz - 1 | 0;
  $this.a3n_1[_unary__edvuaz] = null;
  if (!_Result___get_isFailure__impl__jpiriv(result)) {
    next.qd(result);
  } else {
    var exception = recoverStackTraceBridge(ensureNotNull(Result__exceptionOrNull_impl_p6xea9(result)), next);
    // Inline function 'kotlin.coroutines.resumeWithException' call
    // Inline function 'kotlin.Companion.failure' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
    next.qd(tmp$ret$0);
  }
}
function discardLastRootContinuation($this) {
  if ($this.b3n_1 < 0)
    throw IllegalStateException().o5('No more continuations to resume');
  var _unary__edvuaz = $this.b3n_1;
  $this.b3n_1 = _unary__edvuaz - 1 | 0;
  $this.a3n_1[_unary__edvuaz] = null;
}
var SuspendFunctionGun$continuation$1Class;
function SuspendFunctionGun$continuation$1() {
  if (SuspendFunctionGun$continuation$1Class === VOID) {
    class $ {
      constructor(this$0) {
        this.e3n_1 = this$0;
        this.d3n_1 = -2147483648;
      }
      ld() {
        var continuation = this.e3n_1.a3n_1[this.e3n_1.b3n_1];
        if (!(continuation === this) && !(continuation == null))
          return continuation.ld();
        var index = this.e3n_1.b3n_1 - 1 | 0;
        while (index >= 0) {
          var _unary__edvuaz = index;
          index = _unary__edvuaz - 1 | 0;
          var cont = this.e3n_1.a3n_1[_unary__edvuaz];
          if (!(cont === this) && !(cont == null))
            return cont.ld();
        }
        // Inline function 'kotlin.error' call
        var message = 'Not started';
        throw IllegalStateException().o5(toString(message));
      }
      xo(result) {
        if (_Result___get_isFailure__impl__jpiriv(result)) {
          // Inline function 'kotlin.Companion.failure' call
          var exception = ensureNotNull(Result__exceptionOrNull_impl_p6xea9(result));
          var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
          resumeRootWith(this.e3n_1, tmp$ret$0);
          return Unit_instance;
        }
        loop(this.e3n_1, false);
      }
      qd(result) {
        return this.xo(result);
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, [Continuation()]);
    SuspendFunctionGun$continuation$1Class = $;
  }
  return SuspendFunctionGun$continuation$1Class;
}
var SuspendFunctionGunClass;
function SuspendFunctionGun() {
  if (SuspendFunctionGunClass === VOID) {
    class $ extends PipelineContext() {
      constructor(initial, context, blocks) {
        super(context);
        this.x3m_1 = blocks;
        var tmp = this;
        tmp.y3m_1 = new (SuspendFunctionGun$continuation$1())(this);
        this.z3m_1 = initial;
        var tmp_0 = this;
        // Inline function 'kotlin.arrayOfNulls' call
        var size = this.x3m_1.c1();
        tmp_0.a3n_1 = Array(size);
        this.b3n_1 = -1;
        this.c3n_1 = 0;
      }
      w20() {
        return this.y3m_1.ld();
      }
      p3l() {
        return this.z3m_1;
      }
      r3l($completion) {
        var tmp$ret$0;
        $l$block_0: {
          if (this.c3n_1 === this.x3m_1.c1()) {
            tmp$ret$0 = this.z3m_1;
            break $l$block_0;
          }
          this.f3n(intercepted($completion));
          if (loop(this, true)) {
            discardLastRootContinuation(this);
            tmp$ret$0 = this.z3m_1;
            break $l$block_0;
          }
          tmp$ret$0 = get_COROUTINE_SUSPENDED();
        }
        return tmp$ret$0;
      }
      q3l(subject, $completion) {
        this.z3m_1 = subject;
        return this.r3l($completion);
      }
      s3l(initial, $completion) {
        this.c3n_1 = 0;
        if (this.c3n_1 === this.x3m_1.c1())
          return initial;
        this.z3m_1 = initial;
        if (this.b3n_1 >= 0)
          throw IllegalStateException().o5('Already started');
        return this.r3l($completion);
      }
      f3n(continuation) {
        this.b3n_1 = this.b3n_1 + 1 | 0;
        this.a3n_1[this.b3n_1] = continuation;
      }
    }
    initMetadataForClass($, 'SuspendFunctionGun', VOID, VOID, VOID, [0, 1]);
    SuspendFunctionGunClass = $;
  }
  return SuspendFunctionGunClass;
}
//region block: exports
export {
  SuspendFunctionGun as SuspendFunctionGun278ui80hj12zj,
};
//endregion

//# sourceMappingURL=SuspendFunctionGun.mjs.map
