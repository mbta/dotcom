import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { SuspendFunctionGun278ui80hj12zj as SuspendFunctionGun } from './SuspendFunctionGun.mjs';
import { DebugPipelineContext2zfnr2i0vcihk as DebugPipelineContext } from './DebugPipelineContext.mjs';
import { get_DISABLE_SFGk0o6djov1myf as get_DISABLE_SFG } from './PipelineContext.js.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var PipelineContextClass;
function PipelineContext() {
  if (PipelineContextClass === VOID) {
    class $ {
      constructor(context) {
        this.o3m_1 = context;
      }
    }
    initMetadataForClass($, 'PipelineContext', VOID, VOID, [CoroutineScope()], [1, 0]);
    PipelineContextClass = $;
  }
  return PipelineContextClass;
}
function pipelineContextFor(context, interceptors, subject, coroutineContext, debugMode) {
  debugMode = debugMode === VOID ? false : debugMode;
  var tmp;
  if (get_DISABLE_SFG() || debugMode) {
    tmp = new (DebugPipelineContext())(context, interceptors, subject, coroutineContext);
  } else {
    tmp = new (SuspendFunctionGun())(subject, context, interceptors);
  }
  return tmp;
}
//region block: exports
export {
  PipelineContext as PipelineContext34fsb0mycu471,
  pipelineContextFor as pipelineContextFor1bwb6ae3xig1h,
};
//endregion

//# sourceMappingURL=PipelineContext.mjs.map
