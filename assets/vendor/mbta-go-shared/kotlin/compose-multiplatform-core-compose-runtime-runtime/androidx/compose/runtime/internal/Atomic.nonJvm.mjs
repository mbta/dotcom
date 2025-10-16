import {
  atomic$ref$130aurmcwdfdf1 as atomic$ref$1,
  atomic$int$11d5swdyn6j0pu as atomic$int$1,
} from '../../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_internal_AtomicReference$stable;
var androidx_compose_runtime_internal_AtomicInt$stable;
var AtomicReferenceClass;
function AtomicReference() {
  if (AtomicReferenceClass === VOID) {
    class $ {
      constructor(value) {
        this.t6z_1 = atomic$ref$1(value);
      }
      r29() {
        return this.t6z_1.kotlinx$atomicfu$value;
      }
      v2u(value) {
        this.t6z_1.kotlinx$atomicfu$value = value;
      }
      h2r(value) {
        return this.t6z_1.atomicfu$getAndSet(value);
      }
      g2r(expect, newValue) {
        return this.t6z_1.atomicfu$compareAndSet(expect, newValue);
      }
    }
    initMetadataForClass($, 'AtomicReference');
    AtomicReferenceClass = $;
  }
  return AtomicReferenceClass;
}
var AtomicIntClass;
function AtomicInt() {
  if (AtomicIntClass === VOID) {
    class $ {
      constructor(value) {
        this.l6j_1 = atomic$int$1(value);
      }
      r29() {
        return this.l6j_1.kotlinx$atomicfu$value;
      }
      c6c(amount) {
        return this.l6j_1.atomicfu$addAndGet(amount);
      }
      m6j(expect, newValue) {
        return this.l6j_1.atomicfu$compareAndSet(expect, newValue);
      }
    }
    initMetadataForClass($, 'AtomicInt');
    AtomicIntClass = $;
  }
  return AtomicIntClass;
}
//region block: init
androidx_compose_runtime_internal_AtomicReference$stable = 8;
androidx_compose_runtime_internal_AtomicInt$stable = 8;
//endregion
//region block: exports
export {
  AtomicInt as AtomicInt39yq0tdckiqjq,
  AtomicReference as AtomicReference2swys664hkpdq,
};
//endregion

//# sourceMappingURL=Atomic.nonJvm.mjs.map
