import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  toString1pkumu07cwy4m as toString,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var UnsupportedContentTypeExceptionClass;
function UnsupportedContentTypeException() {
  if (UnsupportedContentTypeExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static g4v(content) {
        var $this = this.o5('Failed to write body: ' + toString(getKClassFromExpression(content)));
        captureStack($this, $this.f4v_1);
        return $this;
      }
    }
    initMetadataForClass($, 'UnsupportedContentTypeException');
    UnsupportedContentTypeExceptionClass = $;
  }
  return UnsupportedContentTypeExceptionClass;
}
function checkContentLength(contentLength, bodySize, method) {
}
//region block: exports
export {
  UnsupportedContentTypeException as UnsupportedContentTypeException1omj39t4jp3a7,
  checkContentLength as checkContentLength1q7i15kkn2eie,
};
//endregion

//# sourceMappingURL=utils.mjs.map
