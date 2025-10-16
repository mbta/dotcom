import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ContentConvertExceptionClass;
function ContentConvertException() {
  if (ContentConvertExceptionClass === VOID) {
    class $ extends Exception() {
      static d4l(message, cause) {
        cause = cause === VOID ? null : cause;
        var $this = this.uf(message, cause);
        captureStack($this, $this.c4l_1);
        return $this;
      }
    }
    initMetadataForClass($, 'ContentConvertException');
    ContentConvertExceptionClass = $;
  }
  return ContentConvertExceptionClass;
}
var JsonConvertExceptionClass;
function JsonConvertException() {
  if (JsonConvertExceptionClass === VOID) {
    class $ extends ContentConvertException() {
      static h4l(message, cause) {
        cause = cause === VOID ? null : cause;
        var $this = this.d4l(message, cause);
        captureStack($this, $this.g4l_1);
        return $this;
      }
    }
    initMetadataForClass($, 'JsonConvertException');
    JsonConvertExceptionClass = $;
  }
  return JsonConvertExceptionClass;
}
//region block: exports
export {
  ContentConvertException as ContentConvertExceptione8d7sn5vn4zf,
  JsonConvertException as JsonConvertExceptiongnc5x6xwaf77,
};
//endregion

//# sourceMappingURL=ContentConvertException.mjs.map
