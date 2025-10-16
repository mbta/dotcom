import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initCauseBridge1upxfqhavblt6 as initCauseBridge } from '../../../../ktor-ktor-utils/io/ktor/util/internal/ExceptionUtilsJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CopyableThrowable1mvc99jcyvivf as CopyableThrowable } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Debug.common.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var FrameTooBigExceptionClass;
function FrameTooBigException() {
  if (FrameTooBigExceptionClass === VOID) {
    class $ extends Exception() {
      static n4g(frameSize) {
        var $this = this.tf();
        captureStack($this, $this.m4g_1);
        $this.l4g_1 = frameSize;
        delete $this.message;
        return $this;
      }
      p2() {
        return 'Frame is too big: ' + this.l4g_1.toString();
      }
      z28() {
        // Inline function 'kotlin.also' call
        var this_0 = FrameTooBigException().n4g(this.l4g_1);
        initCauseBridge(this_0, this);
        return this_0;
      }
      get message() {
        return this.p2();
      }
    }
    initMetadataForClass($, 'FrameTooBigException', VOID, VOID, [Exception(), CopyableThrowable()]);
    FrameTooBigExceptionClass = $;
  }
  return FrameTooBigExceptionClass;
}
//region block: exports
export {
  FrameTooBigException as FrameTooBigException1rgdafsgu31sm,
};
//endregion

//# sourceMappingURL=FrameTooBigException.mjs.map
