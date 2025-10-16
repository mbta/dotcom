import { NoPoolImplgos9n8jphzjp as NoPoolImpl } from '../../../../../../ktor-ktor-io/io/ktor/utils/io/pool/Pool.mjs';
import { charArray2ujmm1qusno00 as charArray } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { DefaultPool2gb1fm4epwgu9 as DefaultPool } from '../../../../../../ktor-ktor-io/io/ktor/utils/io/pool/DefaultPool.mjs';
import { isPoolingDisabled1inadkvos9bby as isPoolingDisabled } from './CharArrayPoolJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_CharArrayPool() {
  _init_properties_CharArrayPool_kt__u4nq0d();
  return CharArrayPool;
}
var CharArrayPool;
var CharArrayPool$1Class;
function CharArrayPool$1() {
  if (CharArrayPool$1Class === VOID) {
    class $ extends NoPoolImpl() {
      p3g() {
        return charArray(2048);
      }
    }
    initMetadataForClass($);
    CharArrayPool$1Class = $;
  }
  return CharArrayPool$1Class;
}
var CharArrayPool$2Class;
function CharArrayPool$2() {
  if (CharArrayPool$2Class === VOID) {
    class $ extends DefaultPool() {
      constructor() {
        super(4096);
      }
      i3g() {
        return charArray(2048);
      }
    }
    initMetadataForClass($);
    CharArrayPool$2Class = $;
  }
  return CharArrayPool$2Class;
}
var properties_initialized_CharArrayPool_kt_aq0u0f;
function _init_properties_CharArrayPool_kt__u4nq0d() {
  if (!properties_initialized_CharArrayPool_kt_aq0u0f) {
    properties_initialized_CharArrayPool_kt_aq0u0f = true;
    var tmp;
    if (isPoolingDisabled()) {
      tmp = new (CharArrayPool$1())();
    } else {
      tmp = new (CharArrayPool$2())();
    }
    CharArrayPool = tmp;
  }
}
//region block: exports
export {
  get_CharArrayPool as get_CharArrayPool2nrc6vmvck4s9,
};
//endregion

//# sourceMappingURL=CharArrayPool.mjs.map
