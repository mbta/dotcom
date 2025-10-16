import { Identity_instance2sdakxmqbsi8a as Identity_instance } from './Encoders.mjs';
import {
  predictCompressedLength3qxfkee0oh44c as predictCompressedLength,
  ContentEncodernh7878uk7tcc as ContentEncoder,
} from './ContentEncoder.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var GZipEncoderClass;
function GZipEncoder() {
  if (GZipEncoderClass === VOID) {
    class $ {
      constructor() {
        GZipEncoder_instance = this;
        this.o3n_1 = Identity_instance;
        this.p3n_1 = 'gzip';
      }
      y3() {
        return this.p3n_1;
      }
      v3h(source, coroutineContext) {
        return this.o3n_1.v3h(source, coroutineContext);
      }
      w3h(source, coroutineContext) {
        return this.o3n_1.w3h(source, coroutineContext);
      }
      x3h(source, coroutineContext) {
        return this.o3n_1.x3h(source, coroutineContext);
      }
    }
    protoOf($).u3h = predictCompressedLength;
    initMetadataForObject($, 'GZipEncoder', VOID, VOID, [ContentEncoder()]);
    GZipEncoderClass = $;
  }
  return GZipEncoderClass;
}
var GZipEncoder_instance;
function GZipEncoder_getInstance() {
  if (GZipEncoder_instance === VOID)
    new (GZipEncoder())();
  return GZipEncoder_instance;
}
//region block: exports
export {
  GZipEncoder_getInstance as GZipEncoder_getInstance2spxn7rjznc6w,
};
//endregion

//# sourceMappingURL=ContentEncodersJs.mjs.map
