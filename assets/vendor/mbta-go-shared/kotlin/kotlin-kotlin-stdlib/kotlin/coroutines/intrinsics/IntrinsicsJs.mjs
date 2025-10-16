import { InterceptedCoroutine142wh200e9wbr as InterceptedCoroutine } from '../InterceptedCoroutine.mjs';
import { NotImplementedErrorfzlkpv14xxr8 as NotImplementedError } from '../../Standard.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../hacks.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from '../Continuation.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../js/typeCheckUtils.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function intercepted(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4 instanceof InterceptedCoroutine() ? _this__u8e3s4 : null;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.rd();
  return tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
}
function createCoroutineUnintercepted(_this__u8e3s4, receiver, completion) {
  // Inline function 'kotlin.coroutines.intrinsics.createCoroutineFromSuspendFunction' call
  return new (createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1())(completion, _this__u8e3s4, receiver, completion);
}
function invokeSuspendSuperTypeWithReceiver(_this__u8e3s4, receiver, completion) {
  throw NotImplementedError().me('It is intrinsic method');
}
function startCoroutineUninterceptedOrReturnNonGeneratorVersion(_this__u8e3s4, receiver, completion) {
  var tmp;
  if (!(completion instanceof InterceptedCoroutine())) {
    tmp = createSimpleCoroutineForSuspendFunction(completion);
  } else {
    tmp = completion;
  }
  var wrappedCompletion = tmp;
  // Inline function 'kotlin.js.asDynamic' call
  var a = _this__u8e3s4;
  return typeof a === 'function' ? a(receiver, wrappedCompletion) : _this__u8e3s4.ne(receiver, wrappedCompletion);
}
function startCoroutineUninterceptedOrReturnNonGeneratorVersion_0(_this__u8e3s4, receiver, param, completion) {
  var tmp;
  if (!(completion instanceof InterceptedCoroutine())) {
    tmp = createSimpleCoroutineForSuspendFunction(completion);
  } else {
    tmp = completion;
  }
  var wrappedCompletion = tmp;
  // Inline function 'kotlin.js.asDynamic' call
  var a = _this__u8e3s4;
  return typeof a === 'function' ? a(receiver, param, wrappedCompletion) : _this__u8e3s4.oe(receiver, param, wrappedCompletion);
}
function createSimpleCoroutineForSuspendFunction(completion) {
  return new (createSimpleCoroutineForSuspendFunction$1())(completion);
}
function invokeSuspendSuperTypeWithReceiverAndParam(_this__u8e3s4, receiver, param, completion) {
  throw NotImplementedError().me('It is intrinsic method');
}
function createCoroutineUnintercepted_0(_this__u8e3s4, completion) {
  // Inline function 'kotlin.coroutines.intrinsics.createCoroutineFromSuspendFunction' call
  return new (createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$2())(completion, _this__u8e3s4, completion);
}
function invokeSuspendSuperType(_this__u8e3s4, completion) {
  throw NotImplementedError().me('It is intrinsic method');
}
var createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1Class;
function createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1() {
  if (createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor($completion, $this_createCoroutineUnintercepted, $receiver, $completion$1, $box) {
        if ($box === VOID)
          $box = {};
        $box.xe_1 = $this_createCoroutineUnintercepted;
        $box.ye_1 = $receiver;
        $box.ze_1 = $completion$1;
        super(isInterface($completion, Continuation()) ? $completion : THROW_CCE(), $box);
      }
      nd() {
        if (this.id_1 != null)
          throw this.id_1;
        // Inline function 'kotlin.js.asDynamic' call
        var a = this.xe_1;
        return typeof a === 'function' ? a(this.ye_1, this.ze_1) : this.xe_1.ne(this.ye_1, this.ze_1);
      }
    }
    initMetadataForClass($);
    createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1Class = $;
  }
  return createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1Class;
}
var createSimpleCoroutineForSuspendFunction$1Class;
function createSimpleCoroutineForSuspendFunction$1() {
  if (createSimpleCoroutineForSuspendFunction$1Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor($completion) {
        super(isInterface($completion, Continuation()) ? $completion : THROW_CCE());
      }
      nd() {
        if (this.id_1 != null)
          throw this.id_1;
        return this.hd_1;
      }
    }
    initMetadataForClass($);
    createSimpleCoroutineForSuspendFunction$1Class = $;
  }
  return createSimpleCoroutineForSuspendFunction$1Class;
}
var createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$2Class;
function createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$2() {
  if (createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$2Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor($completion, $this_createCoroutineUnintercepted, $completion$1, $box) {
        if ($box === VOID)
          $box = {};
        $box.qf_1 = $this_createCoroutineUnintercepted;
        $box.rf_1 = $completion$1;
        super(isInterface($completion, Continuation()) ? $completion : THROW_CCE(), $box);
      }
      nd() {
        if (this.id_1 != null)
          throw this.id_1;
        // Inline function 'kotlin.js.asDynamic' call
        var a = this.qf_1;
        return typeof a === 'function' ? a(this.rf_1) : this.qf_1.sf(this.rf_1);
      }
    }
    initMetadataForClass($);
    createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$2Class = $;
  }
  return createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$2Class;
}
//region block: exports
export {
  createCoroutineUnintercepted_0 as createCoroutineUnintercepted21q5ochlctscl,
  createCoroutineUnintercepted as createCoroutineUnintercepted3gya308dmbbtg,
  intercepted as intercepted2ogpsikxxj4u0,
  startCoroutineUninterceptedOrReturnNonGeneratorVersion as startCoroutineUninterceptedOrReturnNonGeneratorVersionyfrrvzbtl8bf,
  startCoroutineUninterceptedOrReturnNonGeneratorVersion_0 as startCoroutineUninterceptedOrReturnNonGeneratorVersioncvnobqk7h8r9,
};
//endregion

//# sourceMappingURL=IntrinsicsJs.mjs.map
