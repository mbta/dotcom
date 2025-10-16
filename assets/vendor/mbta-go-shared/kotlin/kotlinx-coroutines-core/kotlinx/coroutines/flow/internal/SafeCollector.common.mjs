import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { ScopeCoroutine2c07fgm3ekmnx as ScopeCoroutine } from '../../internal/Scopes.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Key_instance2tirv2rj82ml4 as Key_instance,
  Job29shfjfygy86k as Job,
} from '../../Job.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function checkContext(_this__u8e3s4, currentContext) {
  var result = currentContext.hr(0, checkContext$lambda(_this__u8e3s4));
  if (!(result === _this__u8e3s4.d2s_1)) {
    // Inline function 'kotlin.error' call
    var message = 'Flow invariant is violated:\n' + ('\t\tFlow was collected in ' + toString(_this__u8e3s4.c2s_1) + ',\n') + ('\t\tbut emission happened in ' + toString(currentContext) + '.\n') + "\t\tPlease refer to 'flow' documentation or use 'flowOn' instead";
    throw IllegalStateException().o5(toString(message));
  }
}
function transitiveCoroutineParent(_this__u8e3s4, collectJob) {
  var $this = _this__u8e3s4;
  var collectJob_0 = collectJob;
  $l$1: do {
    $l$0: do {
      if ($this === null)
        return null;
      if ($this === collectJob_0)
        return $this;
      if (!($this instanceof ScopeCoroutine()))
        return $this;
      var tmp0 = $this.q21();
      var tmp1 = collectJob_0;
      $this = tmp0;
      collectJob_0 = tmp1;
      continue $l$0;
    }
     while (false);
  }
   while (true);
}
function checkContext$lambda($this_checkContext) {
  return function (count, element) {
    var key = element.u1();
    var collectElement = $this_checkContext.c2s_1.sd(key);
    var tmp;
    if (!(key === Key_instance)) {
      return !(element === collectElement) ? -2147483648 : count + 1 | 0;
    }
    var collectJob = (collectElement == null ? true : isInterface(collectElement, Job())) ? collectElement : THROW_CCE();
    var emissionParentJob = transitiveCoroutineParent(isInterface(element, Job()) ? element : THROW_CCE(), collectJob);
    var tmp_0;
    if (!(emissionParentJob === collectJob)) {
      var message = 'Flow invariant is violated:\n\t\tEmission from another coroutine is detected.\n' + ('\t\tChild of ' + toString_0(emissionParentJob) + ', expected child of ' + toString_0(collectJob) + '.\n') + '\t\tFlowCollector is not thread-safe and concurrent emissions are prohibited.\n' + "\t\tTo mitigate this restriction please use 'channelFlow' builder instead of 'flow'";
      throw IllegalStateException().o5(toString(message));
    }
    return collectJob == null ? count : count + 1 | 0;
  };
}
//region block: exports
export {
  checkContext as checkContext31s2o65fax7nj,
};
//endregion

//# sourceMappingURL=SafeCollector.common.mjs.map
