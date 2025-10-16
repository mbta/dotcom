import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Application_getInstanceq87g3bor693u as Application_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/ContentTypes.mjs';
import { serialization1fpeds7cruos4 as serialization } from '../../../../../../ktor-ktor-serialization-kotlinx/io/ktor/serialization/kotlinx/KotlinxSerializationConverter.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Jsonsmkyu9xjl7fv as Json } from '../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/Json.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_DefaultJson() {
  _init_properties_JsonSupport_kt__yf438r();
  return DefaultJson;
}
var DefaultJson;
function json(_this__u8e3s4, json, contentType) {
  json = json === VOID ? get_DefaultJson() : json;
  contentType = contentType === VOID ? Application_getInstance().t3o_1 : contentType;
  _init_properties_JsonSupport_kt__yf438r();
  serialization(_this__u8e3s4, contentType, json);
}
function DefaultJson$lambda($this$Json) {
  _init_properties_JsonSupport_kt__yf438r();
  $this$Json.w1l_1 = true;
  $this$Json.z1l_1 = true;
  $this$Json.k1m_1 = true;
  $this$Json.l1m_1 = true;
  $this$Json.a1m_1 = false;
  $this$Json.m1m_1 = false;
  return Unit_instance;
}
var properties_initialized_JsonSupport_kt_9cgd93;
function _init_properties_JsonSupport_kt__yf438r() {
  if (!properties_initialized_JsonSupport_kt_9cgd93) {
    properties_initialized_JsonSupport_kt_9cgd93 = true;
    DefaultJson = Json(VOID, DefaultJson$lambda);
  }
}
//region block: exports
export {
  json as jsonu6qnfo3b405p,
};
//endregion

//# sourceMappingURL=JsonSupport.mjs.map
