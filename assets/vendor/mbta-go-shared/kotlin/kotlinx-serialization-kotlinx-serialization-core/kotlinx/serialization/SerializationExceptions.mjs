import {
  captureStack1fzi4aczwc4hg as captureStack,
  toString1pkumu07cwy4m as toString,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function init_kotlinx_serialization_SerializationException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.u10_1);
}
var SerializationExceptionClass;
function SerializationException() {
  if (SerializationExceptionClass === VOID) {
    class $ extends IllegalArgumentException() {
      static v10() {
        var $this = this.wf();
        init_kotlinx_serialization_SerializationException($this);
        return $this;
      }
      static w10(message) {
        var $this = this.q(message);
        init_kotlinx_serialization_SerializationException($this);
        return $this;
      }
      static x10(message, cause) {
        var $this = this.xf(message, cause);
        init_kotlinx_serialization_SerializationException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'SerializationException', $.v10);
    SerializationExceptionClass = $;
  }
  return SerializationExceptionClass;
}
var MissingFieldExceptionClass;
function MissingFieldException() {
  if (MissingFieldExceptionClass === VOID) {
    class $ extends SerializationException() {
      static e11(missingFields, message, cause) {
        var $this = this.x10(message, cause);
        captureStack($this, $this.d11_1);
        $this.c11_1 = missingFields;
        return $this;
      }
      static f11(missingFields, serialName) {
        return this.e11(missingFields, missingFields.c1() === 1 ? "Field '" + missingFields.e1(0) + "' is required for type with serial name '" + serialName + "', but it was missing" : 'Fields ' + toString(missingFields) + " are required for type with serial name '" + serialName + "', but they were missing", null);
      }
      static g11(missingField, serialName) {
        return this.e11(listOf(missingField), "Field '" + missingField + "' is required for type with serial name '" + serialName + "', but it was missing", null);
      }
    }
    initMetadataForClass($, 'MissingFieldException');
    MissingFieldExceptionClass = $;
  }
  return MissingFieldExceptionClass;
}
var UnknownFieldExceptionClass;
function UnknownFieldException() {
  if (UnknownFieldExceptionClass === VOID) {
    class $ extends SerializationException() {
      static m11(message) {
        var $this = this.w10(message);
        captureStack($this, $this.l11_1);
        return $this;
      }
      static n11(index) {
        return this.m11('An unknown field for index ' + index);
      }
    }
    initMetadataForClass($, 'UnknownFieldException');
    UnknownFieldExceptionClass = $;
  }
  return UnknownFieldExceptionClass;
}
//region block: exports
export {
  MissingFieldException as MissingFieldException24tqif29emcmi,
  SerializationException as SerializationExceptioneqrdve3ts2n9,
  UnknownFieldException as UnknownFieldExceptiona60e3a6v1xqo,
};
//endregion

//# sourceMappingURL=SerializationExceptions.mjs.map
