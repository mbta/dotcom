import { InterceptedCoroutine142wh200e9wbr as InterceptedCoroutine } from './InterceptedCoroutine.mjs';
import {
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../hacks.mjs';
import {
  _Result___get_value__impl__bjfvqg2ei4op8d4d2m as _Result___get_value__impl__bjfvqg,
  _Result___get_isFailure__impl__jpirivrr0d11rbi6gb as _Result___get_isFailure__impl__jpiriv,
  Result__exceptionOrNull_impl_p6xea9ty3elzpd9eo3 as Result__exceptionOrNull_impl_p6xea9,
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../Result.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from './intrinsics/Intrinsics.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from './Continuation.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CoroutineImplClass;
function CoroutineImpl() {
  if (CoroutineImplClass === VOID) {
    class $ extends InterceptedCoroutine() {
      constructor(resultContinuation, $box) {
        super($box);
        this.ed_1 = resultContinuation;
        this.fd_1 = 0;
        this.gd_1 = 0;
        this.hd_1 = null;
        this.id_1 = null;
        this.jd_1 = null;
        var tmp = this;
        var tmp0_safe_receiver = this.ed_1;
        tmp.kd_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.ld();
      }
      ld() {
        return ensureNotNull(this.kd_1);
      }
      md(result) {
        var current = this;
        // Inline function 'kotlin.Result.getOrNull' call
        var tmp;
        if (_Result___get_isFailure__impl__jpiriv(result)) {
          tmp = null;
        } else {
          var tmp_0 = _Result___get_value__impl__bjfvqg(result);
          tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
        }
        var currentResult = tmp;
        var currentException = Result__exceptionOrNull_impl_p6xea9(result);
        while (true) {
          // Inline function 'kotlin.with' call
          var $this$with = current;
          if (currentException == null) {
            $this$with.hd_1 = currentResult;
          } else {
            $this$with.fd_1 = $this$with.gd_1;
            $this$with.id_1 = currentException;
          }
          try {
            var outcome = $this$with.nd();
            if (outcome === get_COROUTINE_SUSPENDED())
              return Unit_instance;
            currentResult = outcome;
            currentException = null;
          } catch ($p) {
            var exception = $p;
            currentResult = null;
            // Inline function 'kotlin.js.unsafeCast' call
            currentException = exception;
          }
          $this$with.pd();
          var completion = ensureNotNull($this$with.ed_1);
          if (completion instanceof CoroutineImpl()) {
            current = completion;
          } else {
            if (!(currentException == null)) {
              // Inline function 'kotlin.coroutines.resumeWithException' call
              // Inline function 'kotlin.Companion.failure' call
              var exception_0 = ensureNotNull(currentException);
              var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception_0));
              completion.qd(tmp$ret$2);
            } else {
              // Inline function 'kotlin.coroutines.resume' call
              // Inline function 'kotlin.Companion.success' call
              var value = currentResult;
              var tmp$ret$4 = _Result___init__impl__xyqfz8(value);
              completion.qd(tmp$ret$4);
            }
            return Unit_instance;
          }
        }
      }
      qd(result) {
        return this.md(result);
      }
    }
    initMetadataForClass($, 'CoroutineImpl', VOID, VOID, [InterceptedCoroutine(), Continuation()]);
    CoroutineImplClass = $;
  }
  return CoroutineImplClass;
}
var CompletedContinuationClass;
function CompletedContinuation() {
  if (CompletedContinuationClass === VOID) {
    class $ {
      ld() {
        var message = 'This continuation is already complete';
        throw IllegalStateException().o5(toString(message));
      }
      md(result) {
        // Inline function 'kotlin.error' call
        var message = 'This continuation is already complete';
        throw IllegalStateException().o5(toString(message));
      }
      qd(result) {
        return this.md(result);
      }
      toString() {
        return 'This continuation is already complete';
      }
    }
    initMetadataForObject($, 'CompletedContinuation', VOID, VOID, [Continuation()]);
    CompletedContinuationClass = $;
  }
  return CompletedContinuationClass;
}
var CompletedContinuation_instance;
function CompletedContinuation_getInstance() {
  return CompletedContinuation_instance;
}
//region block: init
CompletedContinuation_instance = new (CompletedContinuation())();
//endregion
//region block: exports
export {
  CompletedContinuation_instance as CompletedContinuation_instance3dg1zdo5y8x70,
  CoroutineImpl as CoroutineImpl2sn3kjnwmfr10,
};
//endregion

//# sourceMappingURL=CoroutineImpl.mjs.map
