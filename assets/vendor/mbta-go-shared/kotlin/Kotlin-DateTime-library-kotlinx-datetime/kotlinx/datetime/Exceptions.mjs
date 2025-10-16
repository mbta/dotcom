import { captureStack1fzi4aczwc4hg as captureStack } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  RuntimeException1r3t0zl97011n as RuntimeException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function init_kotlinx_datetime_DateTimeFormatException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.o80_1);
}
var DateTimeFormatExceptionClass;
function DateTimeFormatException() {
  if (DateTimeFormatExceptionClass === VOID) {
    class $ extends IllegalArgumentException() {
      static o81() {
        var $this = this.wf();
        init_kotlinx_datetime_DateTimeFormatException($this);
        return $this;
      }
      static p80(message) {
        var $this = this.q(message);
        init_kotlinx_datetime_DateTimeFormatException($this);
        return $this;
      }
      static p81(message, cause) {
        var $this = this.xf(message, cause);
        init_kotlinx_datetime_DateTimeFormatException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'DateTimeFormatException', $.o81);
    DateTimeFormatExceptionClass = $;
  }
  return DateTimeFormatExceptionClass;
}
function init_kotlinx_datetime_IllegalTimeZoneException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.t81_1);
}
var IllegalTimeZoneExceptionClass;
function IllegalTimeZoneException() {
  if (IllegalTimeZoneExceptionClass === VOID) {
    class $ extends IllegalArgumentException() {
      static u81() {
        var $this = this.wf();
        init_kotlinx_datetime_IllegalTimeZoneException($this);
        return $this;
      }
      static v81(message) {
        var $this = this.q(message);
        init_kotlinx_datetime_IllegalTimeZoneException($this);
        return $this;
      }
      static w81(cause) {
        var $this = this.zf(cause);
        init_kotlinx_datetime_IllegalTimeZoneException($this);
        return $this;
      }
      static x81(message, cause) {
        var $this = this.xf(message, cause);
        init_kotlinx_datetime_IllegalTimeZoneException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'IllegalTimeZoneException', $.u81);
    IllegalTimeZoneExceptionClass = $;
  }
  return IllegalTimeZoneExceptionClass;
}
function init_kotlinx_datetime_DateTimeArithmeticException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.a82_1);
}
var DateTimeArithmeticExceptionClass;
function DateTimeArithmeticException() {
  if (DateTimeArithmeticExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static b82() {
        var $this = this.o2();
        init_kotlinx_datetime_DateTimeArithmeticException($this);
        return $this;
      }
      static c82(message, cause) {
        var $this = this.yf(message, cause);
        init_kotlinx_datetime_DateTimeArithmeticException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'DateTimeArithmeticException', $.b82);
    DateTimeArithmeticExceptionClass = $;
  }
  return DateTimeArithmeticExceptionClass;
}
//region block: exports
export {
  DateTimeArithmeticException as DateTimeArithmeticException3b9ehoczpp1e2,
  DateTimeFormatException as DateTimeFormatException2onfeknbywaob,
  IllegalTimeZoneException as IllegalTimeZoneException2q01rvpc2etsw,
};
//endregion

//# sourceMappingURL=Exceptions.mjs.map
