import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var InstanceCreationExceptionClass;
function InstanceCreationException() {
  if (InstanceCreationExceptionClass === VOID) {
    class $ extends Exception() {
      static t7w(msg, parent) {
        var $this = this.uf(msg, parent);
        captureStack($this, $this.s7w_1);
        return $this;
      }
    }
    initMetadataForClass($, 'InstanceCreationException');
    InstanceCreationExceptionClass = $;
  }
  return InstanceCreationExceptionClass;
}
//region block: exports
export {
  InstanceCreationException as InstanceCreationException2qnx8u7c4m9w8,
};
//endregion

//# sourceMappingURL=InstanceCreationException.mjs.map
