import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { split2bvyvnrlcifjv as split } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { getKClassDefaultName10xviqhaeh8cx as getKClassDefaultName } from './KoinPlatformTools.mjs';
import { LazyThreadSafetyMode_NONE_getInstance2ezxh11hvaa3w as LazyThreadSafetyMode_NONE_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { GlobalContext_instance2tuwjv46mw3fi as GlobalContext_instance } from '../core/context/GlobalContext.mjs';
import { ConcurrentMutableMap19j4cpqgqiyz3 as ConcurrentMutableMap } from '../../../../Stately-stately-concurrent-collections/co/touchlab/stately/collections/ConcurrentMutableMap.mjs';
import { ConcurrentMutableSet1jjjkxl24hnbl as ConcurrentMutableSet } from '../../../../Stately-stately-concurrent-collections/co/touchlab/stately/collections/ConcurrentMutableSet.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var KoinPlatformToolsClass;
function KoinPlatformTools() {
  if (KoinPlatformToolsClass === VOID) {
    class $ {
      o7x(e) {
        return e.toString() + toString(split(Exception().tf().toString(), ['\n']));
      }
      p7z(kClass) {
        var tmp0_elvis_lhs = kClass.gh();
        return tmp0_elvis_lhs == null ? getKClassDefaultName(this, kClass) : tmp0_elvis_lhs;
      }
      s7z() {
        return LazyThreadSafetyMode_NONE_getInstance();
      }
      s7v() {
        return GlobalContext_instance;
      }
      e7y(lock, block) {
        return block();
      }
      z7y() {
        return ConcurrentMutableMap().n7u();
      }
      h7z() {
        return ConcurrentMutableSet().o7u();
      }
    }
    initMetadataForObject($, 'KoinPlatformTools');
    KoinPlatformToolsClass = $;
  }
  return KoinPlatformToolsClass;
}
var KoinPlatformTools_instance;
function KoinPlatformTools_getInstance() {
  return KoinPlatformTools_instance;
}
//region block: init
KoinPlatformTools_instance = new (KoinPlatformTools())();
//endregion
//region block: exports
export {
  KoinPlatformTools_instance as KoinPlatformTools_instance10q51i7yyudwo,
};
//endregion

//# sourceMappingURL=PlatformTools.mjs.map
