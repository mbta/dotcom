import { Error3ofk6owajcepa as Error_0 } from './exceptions.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from './js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from './js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var NotImplementedErrorClass;
function NotImplementedError() {
  if (NotImplementedErrorClass === VOID) {
    class $ extends Error_0() {
      static me(message) {
        message = message === VOID ? 'An operation is not implemented.' : message;
        var $this = this.dg(message);
        captureStack($this, $this.le_1);
        return $this;
      }
    }
    initMetadataForClass($, 'NotImplementedError', $.me);
    NotImplementedErrorClass = $;
  }
  return NotImplementedErrorClass;
}
//region block: exports
export {
  NotImplementedError as NotImplementedErrorfzlkpv14xxr8,
};
//endregion

//# sourceMappingURL=Standard.mjs.map
