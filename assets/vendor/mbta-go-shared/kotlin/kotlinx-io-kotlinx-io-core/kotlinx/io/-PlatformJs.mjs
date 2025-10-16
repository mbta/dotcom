import { captureStack1fzi4aczwc4hg as captureStack } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Exceptiondt2hlxn7j7vw as Exception } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function init_kotlinx_io_IOException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.t32_1);
}
var IOExceptionClass;
function IOException() {
  if (IOExceptionClass === VOID) {
    class $ extends Exception() {
      static u32() {
        var $this = this.tf();
        init_kotlinx_io_IOException($this);
        return $this;
      }
      static v32(message) {
        var $this = this.h6(message);
        init_kotlinx_io_IOException($this);
        return $this;
      }
      static w32(message, cause) {
        var $this = this.uf(message, cause);
        init_kotlinx_io_IOException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'IOException', $.u32);
    IOExceptionClass = $;
  }
  return IOExceptionClass;
}
function init_kotlinx_io_EOFException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.q2z_1);
}
var EOFExceptionClass;
function EOFException() {
  if (EOFExceptionClass === VOID) {
    class $ extends IOException() {
      static x32() {
        var $this = this.u32();
        init_kotlinx_io_EOFException($this);
        return $this;
      }
      static r2z(message) {
        var $this = this.v32(message);
        init_kotlinx_io_EOFException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'EOFException', $.x32);
    EOFExceptionClass = $;
  }
  return EOFExceptionClass;
}
//region block: exports
export {
  EOFException as EOFExceptionh831u25jcq9n,
  IOException as IOException1wyutdmfe71nu,
};
//endregion

//# sourceMappingURL=-PlatformJs.mjs.map
