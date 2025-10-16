import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  createCoroutineUnintercepted3gya308dmbbtg as createCoroutineUnintercepted,
  intercepted2ogpsikxxj4u0 as intercepted,
} from './intrinsics/IntrinsicsJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
} from '../Result.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ContinuationClass;
function Continuation() {
  if (ContinuationClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Continuation');
    ContinuationClass = $;
  }
  return ContinuationClass;
}
function startCoroutine(_this__u8e3s4, receiver, completion) {
  // Inline function 'kotlin.coroutines.resume' call
  var this_0 = intercepted(createCoroutineUnintercepted(_this__u8e3s4, receiver, completion));
  // Inline function 'kotlin.Companion.success' call
  var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
  this_0.qd(tmp$ret$0);
}
//region block: exports
export {
  Continuation as Continuation1aa2oekvx7jm7,
  startCoroutine as startCoroutine327fwvtqvedik,
};
//endregion

//# sourceMappingURL=Continuation.mjs.map
