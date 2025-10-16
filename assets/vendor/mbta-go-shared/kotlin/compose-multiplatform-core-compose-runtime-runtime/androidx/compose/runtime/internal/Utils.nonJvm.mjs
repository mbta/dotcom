import { println2shhhgwwt4c61 as println } from '../../../../../kotlin-kotlin-stdlib/kotlin/io/console.mjs';
import { printStackTrace18lnx7a39cni as printStackTrace } from '../../../../../kotlin-kotlin-stdlib/kotlin/throwableExtensions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_internal_PlatformOptimizedCancellationException$stable;
function logError(message, e) {
  println(message);
  printStackTrace(e);
}
function invokeComposable(composer, composable) {
  var realFn = typeof composable === 'function' ? composable : THROW_CCE();
  realFn(composer, 1);
}
var PlatformOptimizedCancellationExceptionClass;
function PlatformOptimizedCancellationException() {
  if (PlatformOptimizedCancellationExceptionClass === VOID) {
    class $ extends CancellationException() {
      static p73(message) {
        message = message === VOID ? null : message;
        var $this = this.he(message);
        captureStack($this, $this.o73_1);
        return $this;
      }
    }
    initMetadataForClass($, 'PlatformOptimizedCancellationException');
    PlatformOptimizedCancellationExceptionClass = $;
  }
  return PlatformOptimizedCancellationExceptionClass;
}
//region block: init
androidx_compose_runtime_internal_PlatformOptimizedCancellationException$stable = 8;
//endregion
//region block: exports
export {
  PlatformOptimizedCancellationException as PlatformOptimizedCancellationException2pl94xdzfhvls,
  invokeComposable as invokeComposable2jcctdnzf8swj,
  logError as logError1eqn95da3znh9,
};
//endregion

//# sourceMappingURL=Utils.nonJvm.mjs.map
