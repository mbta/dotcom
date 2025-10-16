import { IOException1wyutdmfe71nu as IOException } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/-PlatformJs.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ClosedByteChannelExceptionClass;
function ClosedByteChannelException() {
  if (ClosedByteChannelExceptionClass === VOID) {
    class $ extends IOException() {
      static c3f(cause) {
        cause = cause === VOID ? null : cause;
        var $this = this.w32(cause == null ? null : cause.message, cause);
        captureStack($this, $this.b3f_1);
        return $this;
      }
    }
    initMetadataForClass($, 'ClosedByteChannelException', $.c3f);
    ClosedByteChannelExceptionClass = $;
  }
  return ClosedByteChannelExceptionClass;
}
var ClosedReadChannelExceptionClass;
function ClosedReadChannelException() {
  if (ClosedReadChannelExceptionClass === VOID) {
    class $ extends ClosedByteChannelException() {
      static w33(cause) {
        cause = cause === VOID ? null : cause;
        var $this = this.c3f(cause);
        captureStack($this, $this.v33_1);
        return $this;
      }
    }
    initMetadataForClass($, 'ClosedReadChannelException', $.w33);
    ClosedReadChannelExceptionClass = $;
  }
  return ClosedReadChannelExceptionClass;
}
var ClosedWriteChannelExceptionClass;
function ClosedWriteChannelException() {
  if (ClosedWriteChannelExceptionClass === VOID) {
    class $ extends ClosedByteChannelException() {
      static b34(cause) {
        cause = cause === VOID ? null : cause;
        var $this = this.c3f(cause);
        captureStack($this, $this.a34_1);
        return $this;
      }
    }
    initMetadataForClass($, 'ClosedWriteChannelException', $.b34);
    ClosedWriteChannelExceptionClass = $;
  }
  return ClosedWriteChannelExceptionClass;
}
//region block: exports
export {
  ClosedByteChannelException as ClosedByteChannelException3il8gfpye60w,
  ClosedReadChannelException as ClosedReadChannelException9jdpzh6uy12w,
  ClosedWriteChannelException as ClosedWriteChannelException1eeenxj0c4bxu,
};
//endregion

//# sourceMappingURL=Exceptions.mjs.map
