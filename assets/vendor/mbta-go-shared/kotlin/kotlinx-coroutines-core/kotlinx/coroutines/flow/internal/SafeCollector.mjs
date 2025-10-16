import { ensureActive2yo7199srjlgl as ensureActive } from '../../Job.mjs';
import { checkContext31s2o65fax7nj as checkContext } from './SafeCollector.common.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../FlowCollector.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function SafeCollector$collectContextSize$lambda(count, _unused_var__etf5q3) {
  return count + 1 | 0;
}
var SafeCollectorClass;
function SafeCollector() {
  if (SafeCollectorClass === VOID) {
    class $ {
      constructor(collector, collectContext) {
        this.b2s_1 = collector;
        this.c2s_1 = collectContext;
        var tmp = this;
        tmp.d2s_1 = this.c2s_1.hr(0, SafeCollector$collectContextSize$lambda);
        this.e2s_1 = null;
      }
      z2n(value, $completion) {
        // Inline function 'kotlinx.coroutines.currentCoroutineContext' call
        // Inline function 'kotlin.js.getCoroutineContext' call
        var currentContext = $completion.ld();
        ensureActive(currentContext);
        if (!(this.e2s_1 === currentContext)) {
          checkContext(this, currentContext);
          this.e2s_1 = currentContext;
        }
        return this.b2s_1.z2n(value, $completion);
      }
      pd() {
      }
    }
    initMetadataForClass($, 'SafeCollector', VOID, VOID, [FlowCollector()], [1]);
    SafeCollectorClass = $;
  }
  return SafeCollectorClass;
}
//region block: exports
export {
  SafeCollector as SafeCollector3ss0wp8n80f6m,
};
//endregion

//# sourceMappingURL=SafeCollector.mjs.map
