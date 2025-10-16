import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import {
  Job13y4jkazwjho0 as Job,
  Key_instance2tirv2rj82ml4 as Key_instance,
} from './Job.mjs';
import {
  ContextScoper0znlsj7ufhq as ContextScope,
  ScopeCoroutine2c07fgm3ekmnx as ScopeCoroutine,
} from './internal/Scopes.mjs';
import { CancellationExceptionjngvjj221x3v as CancellationException } from './Exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { startUndispatchedOrReturn1od7ryhr362dr as startUndispatchedOrReturn } from './intrinsics/Undispatched.mjs';
import { SupervisorJobythnfxkr3jxc as SupervisorJob } from './Supervisor.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from './Dispatchers.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CoroutineScopeClass;
function CoroutineScope() {
  if (CoroutineScopeClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'CoroutineScope');
    CoroutineScopeClass = $;
  }
  return CoroutineScopeClass;
}
var GlobalScopeClass;
function GlobalScope() {
  if (GlobalScopeClass === VOID) {
    class $ {
      w20() {
        return EmptyCoroutineContext_getInstance();
      }
    }
    initMetadataForObject($, 'GlobalScope', VOID, VOID, [CoroutineScope()]);
    GlobalScopeClass = $;
  }
  return GlobalScopeClass;
}
var GlobalScope_instance;
function GlobalScope_getInstance() {
  return GlobalScope_instance;
}
function CoroutineScope_0(context) {
  return new (ContextScope())(!(context.sd(Key_instance) == null) ? context : context.ir(Job()));
}
function cancel(_this__u8e3s4, message, cause) {
  cause = cause === VOID ? null : cause;
  return cancel_0(_this__u8e3s4, CancellationException(message, cause));
}
function cancel_0(_this__u8e3s4, cause) {
  cause = cause === VOID ? null : cause;
  var tmp0_elvis_lhs = _this__u8e3s4.w20().sd(Key_instance);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    var message = 'Scope cannot be cancelled because it does not have a job: ' + toString(_this__u8e3s4);
    throw IllegalStateException().o5(toString(message));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var job = tmp;
  job.g22(cause);
}
function coroutineScope(block, $completion) {
  var coroutine = new (ScopeCoroutine())($completion.ld(), $completion);
  return startUndispatchedOrReturn(coroutine, coroutine, block);
}
function MainScope() {
  return new (ContextScope())(SupervisorJob().ir(Dispatchers_getInstance().y28()));
}
//region block: init
GlobalScope_instance = new (GlobalScope())();
//endregion
//region block: exports
export {
  coroutineScope as coroutineScope284yy3flyb2v2,
  GlobalScope_instance as GlobalScope_instance1sfulufhd2ijt,
  CoroutineScope_0 as CoroutineScopelux7s7zphw7e,
  CoroutineScope as CoroutineScopefcb5f5dwqcas,
  MainScope as MainScope1gi1r4abhrtmm,
  cancel_0 as cancel36mj9lv3a0whl,
  cancel as cancel2ztysw4v4hav6,
};
//endregion

//# sourceMappingURL=CoroutineScope.mjs.map
