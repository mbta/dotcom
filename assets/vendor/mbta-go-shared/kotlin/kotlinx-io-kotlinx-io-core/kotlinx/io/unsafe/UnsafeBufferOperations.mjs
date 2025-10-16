import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_SegmentReadContextImpl() {
  _init_properties_UnsafeBufferOperations_kt__xw75gy();
  return SegmentReadContextImpl;
}
var SegmentReadContextImpl;
function get_SegmentWriteContextImpl() {
  _init_properties_UnsafeBufferOperations_kt__xw75gy();
  return SegmentWriteContextImpl;
}
var SegmentWriteContextImpl;
var BufferIterationContextImpl;
var UnsafeBufferOperationsClass;
function UnsafeBufferOperations() {
  if (UnsafeBufferOperationsClass === VOID) {
    class $ {}
    initMetadataForObject($, 'UnsafeBufferOperations');
    UnsafeBufferOperationsClass = $;
  }
  return UnsafeBufferOperationsClass;
}
var UnsafeBufferOperations_instance;
function UnsafeBufferOperations_getInstance() {
  return UnsafeBufferOperations_instance;
}
var SegmentReadContextImpl$1Class;
function SegmentReadContextImpl$1() {
  if (SegmentReadContextImpl$1Class === VOID) {
    class $ {
      p31(segment, offset) {
        return segment.p30(offset);
      }
    }
    initMetadataForClass($);
    SegmentReadContextImpl$1Class = $;
  }
  return SegmentReadContextImpl$1Class;
}
var SegmentWriteContextImpl$1Class;
function SegmentWriteContextImpl$1() {
  if (SegmentWriteContextImpl$1Class === VOID) {
    class $ {
      r32(segment, offset, value) {
        segment.k32(offset, value);
      }
      q32(segment, offset, b0, b1) {
        segment.l32(offset, b0, b1);
      }
      p32(segment, offset, b0, b1, b2) {
        segment.m32(offset, b0, b1, b2);
      }
      o32(segment, offset, b0, b1, b2, b3) {
        segment.n32(offset, b0, b1, b2, b3);
      }
    }
    initMetadataForClass($);
    SegmentWriteContextImpl$1Class = $;
  }
  return SegmentWriteContextImpl$1Class;
}
var BufferIterationContextImpl$1Class;
function BufferIterationContextImpl$1() {
  if (BufferIterationContextImpl$1Class === VOID) {
    class $ {
      p31(segment, offset) {
        return get_SegmentReadContextImpl().p31(segment, offset);
      }
    }
    initMetadataForClass($);
    BufferIterationContextImpl$1Class = $;
  }
  return BufferIterationContextImpl$1Class;
}
var properties_initialized_UnsafeBufferOperations_kt_2xfgoc;
function _init_properties_UnsafeBufferOperations_kt__xw75gy() {
  if (!properties_initialized_UnsafeBufferOperations_kt_2xfgoc) {
    properties_initialized_UnsafeBufferOperations_kt_2xfgoc = true;
    SegmentReadContextImpl = new (SegmentReadContextImpl$1())();
    SegmentWriteContextImpl = new (SegmentWriteContextImpl$1())();
    BufferIterationContextImpl = new (BufferIterationContextImpl$1())();
  }
}
//region block: init
UnsafeBufferOperations_instance = new (UnsafeBufferOperations())();
//endregion
//region block: exports
export {
  UnsafeBufferOperations_instance as UnsafeBufferOperations_instance3evgtpck8fkab,
  get_SegmentReadContextImpl as get_SegmentReadContextImpl28xxxurlbcmul,
  get_SegmentWriteContextImpl as get_SegmentWriteContextImpl3givuabmefymf,
};
//endregion

//# sourceMappingURL=UnsafeBufferOperations.mjs.map
