import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { parseMultipart2ddxudhdihg70 as parseMultipart } from './Multipart.mjs';
import { MultiPartData57syw40llxls as MultiPartData } from '../../../../../ktor-ktor-http/io/ktor/http/content/Multipart.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CIOMultipartDataBaseClass;
function CIOMultipartDataBase() {
  if (CIOMultipartDataBaseClass === VOID) {
    class $ {
      constructor(coroutineContext, channel, contentType, contentLength, formFieldLimit) {
        formFieldLimit = formFieldLimit === VOID ? new (Long())(65536, 0) : formFieldLimit;
        this.v42_1 = coroutineContext;
        this.w42_1 = null;
        this.x42_1 = parseMultipart(this, channel, contentType, contentLength, formFieldLimit);
      }
      w20() {
        return this.v42_1;
      }
    }
    initMetadataForClass($, 'CIOMultipartDataBase', VOID, VOID, [MultiPartData(), CoroutineScope()], [0, 1]);
    CIOMultipartDataBaseClass = $;
  }
  return CIOMultipartDataBaseClass;
}
//region block: exports
export {
  CIOMultipartDataBase as CIOMultipartDataBase3o5u8w437tq5s,
};
//endregion

//# sourceMappingURL=CIOMultipartDataBase.mjs.map
