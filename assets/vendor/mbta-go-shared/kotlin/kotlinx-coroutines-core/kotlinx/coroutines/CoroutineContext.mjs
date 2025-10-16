import {
  NodeDispatcher_getInstance3tzr0otbafhkb as NodeDispatcher_getInstance,
  SetTimeoutDispatcher_getInstance3itz9uvzqmi9x as SetTimeoutDispatcher_getInstance,
} from './JSDispatcher.mjs';
import { asCoroutineDispatcher25c53h6jk6y75 as asCoroutineDispatcher } from './Window.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from './Dispatchers.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Delay9umexudtwyie as Delay } from './Delay.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Key_instance17k9ki7fvysxq as Key_instance } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/ContinuationInterceptor.mjs';
import { ScopeCoroutine2c07fgm3ekmnx as ScopeCoroutine } from './internal/Scopes.mjs';
import { recoverResult92pymwoef8np as recoverResult } from './CompletionState.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function createDefaultDispatcher() {
  var tmp;
  if (isJsdom()) {
    tmp = NodeDispatcher_getInstance();
  } else {
    var tmp_0;
    var tmp_1;
    if (!(typeof window === 'undefined')) {
      // Inline function 'kotlin.js.asDynamic' call
      tmp_1 = window != null;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      // Inline function 'kotlin.js.asDynamic' call
      tmp_0 = !(typeof window.addEventListener === 'undefined');
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = asCoroutineDispatcher(window);
    } else {
      if (typeof process === 'undefined' || typeof process.nextTick === 'undefined') {
        tmp = SetTimeoutDispatcher_getInstance();
      } else {
        tmp = NodeDispatcher_getInstance();
      }
    }
  }
  return tmp;
}
function isJsdom() {
  return !(typeof navigator === 'undefined') && navigator != null && navigator.userAgent != null && !(typeof navigator.userAgent === 'undefined') && !(typeof navigator.userAgent.match === 'undefined') && navigator.userAgent.match('\\bjsdom\\b');
}
function toDebugString(_this__u8e3s4) {
  return toString(_this__u8e3s4);
}
function get_DefaultDelay() {
  var tmp = Dispatchers_getInstance().u28_1;
  return isInterface(tmp, Delay()) ? tmp : THROW_CCE();
}
function newCoroutineContext(_this__u8e3s4, context) {
  var combined = _this__u8e3s4.w20().ir(context);
  return !(combined === Dispatchers_getInstance().u28_1) && combined.sd(Key_instance) == null ? combined.ir(Dispatchers_getInstance().u28_1) : combined;
}
function newCoroutineContext_0(_this__u8e3s4, addedContext) {
  return _this__u8e3s4.ir(addedContext);
}
var UndispatchedCoroutineClass;
function UndispatchedCoroutine() {
  if (UndispatchedCoroutineClass === VOID) {
    class $ extends ScopeCoroutine() {
      g21(state) {
        return this.p23_1.qd(recoverResult(state, this.p23_1));
      }
    }
    initMetadataForClass($, 'UndispatchedCoroutine', VOID, VOID, VOID, [0]);
    UndispatchedCoroutineClass = $;
  }
  return UndispatchedCoroutineClass;
}
function get_coroutineName(_this__u8e3s4) {
  return null;
}
//region block: exports
export {
  get_DefaultDelay as get_DefaultDelay3q9fawcutqbnw,
  UndispatchedCoroutine as UndispatchedCoroutine1g5upie8aljdz,
  get_coroutineName as get_coroutineName3a0vy840b4l1i,
  createDefaultDispatcher as createDefaultDispatcher34z5li45gie67,
  newCoroutineContext as newCoroutineContext2tdpc8c02iv5t,
  newCoroutineContext_0 as newCoroutineContext1x74axajiiptk,
  toDebugString as toDebugString2sjrkc0z7k0mx,
};
//endregion

//# sourceMappingURL=CoroutineContext.mjs.map
