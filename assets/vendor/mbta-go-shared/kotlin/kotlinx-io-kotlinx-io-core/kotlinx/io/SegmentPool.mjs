import {
  Companion_instance29y027cxvr5b5 as Companion_instance,
  AlwaysSharedCopyTracker_getInstance2jydy734jdx86 as AlwaysSharedCopyTracker_getInstance,
} from './Segment.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var SegmentPoolClass;
function SegmentPool() {
  if (SegmentPoolClass === VOID) {
    class $ {
      constructor() {
        this.z30_1 = 0;
        this.a31_1 = 0;
      }
      b31() {
        return Companion_instance.d32();
      }
      q31(segment) {
      }
      h32() {
        return AlwaysSharedCopyTracker_getInstance();
      }
    }
    initMetadataForObject($, 'SegmentPool');
    SegmentPoolClass = $;
  }
  return SegmentPoolClass;
}
var SegmentPool_instance;
function SegmentPool_getInstance() {
  return SegmentPool_instance;
}
//region block: init
SegmentPool_instance = new (SegmentPool())();
//endregion
//region block: exports
export {
  SegmentPool_instance as SegmentPool_instance2tnq68w4zk3rz,
};
//endregion

//# sourceMappingURL=SegmentPool.mjs.map
