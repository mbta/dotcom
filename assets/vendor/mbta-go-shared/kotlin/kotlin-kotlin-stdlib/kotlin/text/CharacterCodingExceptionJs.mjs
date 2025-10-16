import { Exceptiondt2hlxn7j7vw as Exception } from '../exceptions.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CharacterCodingExceptionClass;
function CharacterCodingException() {
  if (CharacterCodingExceptionClass === VOID) {
    class $ extends Exception() {
      static yi(message) {
        var $this = this.h6(message);
        captureStack($this, $this.xi_1);
        return $this;
      }
      static zi() {
        return this.yi(null);
      }
    }
    initMetadataForClass($, 'CharacterCodingException', $.zi);
    CharacterCodingExceptionClass = $;
  }
  return CharacterCodingExceptionClass;
}
//region block: exports
export {
  CharacterCodingException as CharacterCodingException3mvgnmpleqbz9,
};
//endregion

//# sourceMappingURL=CharacterCodingExceptionJs.mjs.map
