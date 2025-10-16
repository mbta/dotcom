import { AutoCloseable1l5p57f9lp7kv as AutoCloseable } from '../../../../../../kotlin-kotlin-stdlib/kotlin/AutoCloseableJs.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function close() {
  this.z24();
}
var ObjectPoolClass;
function ObjectPool() {
  if (ObjectPoolClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ObjectPool', VOID, VOID, [AutoCloseable()]);
    ObjectPoolClass = $;
  }
  return ObjectPoolClass;
}
var NoPoolImplClass;
function NoPoolImpl() {
  if (NoPoolImplClass === VOID) {
    class $ {
      q3g(instance) {
        return Unit_instance;
      }
      z24() {
        return Unit_instance;
      }
    }
    protoOf($).v6 = close;
    initMetadataForClass($, 'NoPoolImpl', VOID, VOID, [ObjectPool()]);
    NoPoolImplClass = $;
  }
  return NoPoolImplClass;
}
//region block: exports
export {
  NoPoolImpl as NoPoolImplgos9n8jphzjp,
  close as close1s6qtnweux4fu,
  ObjectPool as ObjectPool3iks1t8z0qq3m,
};
//endregion

//# sourceMappingURL=Pool.mjs.map
