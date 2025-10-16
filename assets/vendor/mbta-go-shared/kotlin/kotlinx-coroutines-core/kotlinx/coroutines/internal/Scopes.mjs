import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../CoroutineScope.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { AbstractCoroutine2jzyhqo91sb0o as AbstractCoroutine } from '../AbstractCoroutine.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { recoverResult92pymwoef8np as recoverResult } from '../CompletionState.mjs';
import { resumeCancellableWith2mw849xp548hg as resumeCancellableWith } from './DispatchedContinuation.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ContextScopeClass;
function ContextScope() {
  if (ContextScopeClass === VOID) {
    class $ {
      constructor(context) {
        this.g2v_1 = context;
      }
      w20() {
        return this.g2v_1;
      }
      toString() {
        return 'CoroutineScope(coroutineContext=' + toString(this.g2v_1) + ')';
      }
    }
    initMetadataForClass($, 'ContextScope', VOID, VOID, [CoroutineScope()]);
    ContextScopeClass = $;
  }
  return ContextScopeClass;
}
var ScopeCoroutineClass;
function ScopeCoroutine() {
  if (ScopeCoroutineClass === VOID) {
    class $ extends AbstractCoroutine() {
      constructor(context, uCont) {
        super(context, true, true);
        this.p23_1 = uCont;
      }
      r22() {
        return true;
      }
      h21(state) {
        resumeCancellableWith(intercepted(this.p23_1), recoverResult(state, this.p23_1));
      }
      q23() {
      }
      g21(state) {
        this.p23_1.qd(recoverResult(state, this.p23_1));
      }
    }
    initMetadataForClass($, 'ScopeCoroutine', VOID, VOID, VOID, [0]);
    ScopeCoroutineClass = $;
  }
  return ScopeCoroutineClass;
}
//region block: exports
export {
  ContextScope as ContextScoper0znlsj7ufhq,
  ScopeCoroutine as ScopeCoroutine2c07fgm3ekmnx,
};
//endregion

//# sourceMappingURL=Scopes.mjs.map
