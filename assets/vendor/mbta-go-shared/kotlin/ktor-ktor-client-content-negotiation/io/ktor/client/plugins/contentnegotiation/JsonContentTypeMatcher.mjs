import { Application_getInstanceq87g3bor693u as Application_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/ContentTypes.mjs';
import { endsWith3cq61xxngobwh as endsWith } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var JsonContentTypeMatcherClass;
function JsonContentTypeMatcher() {
  if (JsonContentTypeMatcherClass === VOID) {
    class $ {
      q5z(contentType) {
        if (contentType.m3q(Application_getInstance().t3o_1)) {
          return true;
        }
        var value = contentType.l3q().toString();
        return Application_getInstance().n3p(value) && endsWith(value, '+json', true);
      }
    }
    initMetadataForObject($, 'JsonContentTypeMatcher');
    JsonContentTypeMatcherClass = $;
  }
  return JsonContentTypeMatcherClass;
}
var JsonContentTypeMatcher_instance;
function JsonContentTypeMatcher_getInstance() {
  return JsonContentTypeMatcher_instance;
}
//region block: init
JsonContentTypeMatcher_instance = new (JsonContentTypeMatcher())();
//endregion
//region block: exports
export {
  JsonContentTypeMatcher_instance as JsonContentTypeMatcher_instance3m8a4vixdkiwx,
};
//endregion

//# sourceMappingURL=JsonContentTypeMatcher.mjs.map
