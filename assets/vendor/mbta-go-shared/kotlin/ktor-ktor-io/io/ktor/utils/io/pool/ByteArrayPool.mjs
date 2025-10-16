import { DefaultPool2gb1fm4epwgu9 as DefaultPool } from './DefaultPool.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_ByteArrayPool() {
  _init_properties_ByteArrayPool_kt__kfi3uj();
  return ByteArrayPool;
}
var ByteArrayPool;
var ByteArrayPool$1Class;
function ByteArrayPool$1() {
  if (ByteArrayPool$1Class === VOID) {
    class $ extends DefaultPool() {
      constructor() {
        super(128);
      }
      i3g() {
        return new Int8Array(4096);
      }
    }
    initMetadataForClass($);
    ByteArrayPool$1Class = $;
  }
  return ByteArrayPool$1Class;
}
var properties_initialized_ByteArrayPool_kt_td6pfh;
function _init_properties_ByteArrayPool_kt__kfi3uj() {
  if (!properties_initialized_ByteArrayPool_kt_td6pfh) {
    properties_initialized_ByteArrayPool_kt_td6pfh = true;
    ByteArrayPool = new (ByteArrayPool$1())();
  }
}
//region block: exports
export {
  get_ByteArrayPool as get_ByteArrayPool3f7yrgvqxz9ct,
};
//endregion

//# sourceMappingURL=ByteArrayPool.mjs.map
