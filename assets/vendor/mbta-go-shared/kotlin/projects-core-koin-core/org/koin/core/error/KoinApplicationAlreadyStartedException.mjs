import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var KoinApplicationAlreadyStartedExceptionClass;
function KoinApplicationAlreadyStartedException() {
  if (KoinApplicationAlreadyStartedExceptionClass === VOID) {
    class $ extends Exception() {
      static w7w(msg) {
        var $this = this.h6(msg);
        captureStack($this, $this.v7w_1);
        return $this;
      }
    }
    initMetadataForClass($, 'KoinApplicationAlreadyStartedException');
    KoinApplicationAlreadyStartedExceptionClass = $;
  }
  return KoinApplicationAlreadyStartedExceptionClass;
}
//region block: exports
export {
  KoinApplicationAlreadyStartedException as KoinApplicationAlreadyStartedExceptionetw68vfoztgk,
};
//endregion

//# sourceMappingURL=KoinApplicationAlreadyStartedException.mjs.map
