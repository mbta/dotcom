import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { KtMutableMap1kqeifoi36kpz as KtMutableMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  getStarKTypeProjection2j4m947xjbiiv as getStarKTypeProjection,
  createKType1lgox3mzhchp5 as createKType,
  createInvariantKTypeProjection3sfd0u0y62ozd as createInvariantKTypeProjection,
} from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { HttpTimeoutCapability_instance17ok7dpkdbr0y as HttpTimeoutCapability_instance } from '../plugins/HttpTimeout.mjs';
import { setOf1u3mizs95ngxo as setOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_ENGINE_CAPABILITIES_KEY() {
  _init_properties_HttpClientEngineCapability_kt__ifvyst();
  return ENGINE_CAPABILITIES_KEY;
}
var ENGINE_CAPABILITIES_KEY;
var DEFAULT_CAPABILITIES;
var HttpClientEngineCapabilityClass;
function HttpClientEngineCapability() {
  if (HttpClientEngineCapabilityClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'HttpClientEngineCapability');
    HttpClientEngineCapabilityClass = $;
  }
  return HttpClientEngineCapabilityClass;
}
var properties_initialized_HttpClientEngineCapability_kt_qarzcf;
function _init_properties_HttpClientEngineCapability_kt__ifvyst() {
  if (!properties_initialized_HttpClientEngineCapability_kt_qarzcf) {
    properties_initialized_HttpClientEngineCapability_kt_qarzcf = true;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'EngineCapabilities';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp = getKClass(KtMutableMap());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_0;
    try {
      tmp_0 = createKType(getKClass(KtMutableMap()), arrayOf([createInvariantKTypeProjection(createKType(getKClass(HttpClientEngineCapability()), arrayOf([getStarKTypeProjection()]), false)), createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().ci(), arrayOf([]), false))]), false);
    } catch ($p) {
      var tmp_1;
      if ($p instanceof Error) {
        var _unused_var__etf5q3 = $p;
        tmp_1 = null;
      } else {
        throw $p;
      }
      tmp_0 = tmp_1;
    }
    var tmp$ret$0 = tmp_0;
    var tmp$ret$1 = new (TypeInfo())(tmp, tmp$ret$0);
    ENGINE_CAPABILITIES_KEY = new (AttributeKey())(name, tmp$ret$1);
    DEFAULT_CAPABILITIES = setOf(HttpTimeoutCapability_instance);
  }
}
//region block: exports
export {
  get_ENGINE_CAPABILITIES_KEY as get_ENGINE_CAPABILITIES_KEYr1fjz8liznxo,
  HttpClientEngineCapability as HttpClientEngineCapability33x11oaa7ywe5,
};
//endregion

//# sourceMappingURL=HttpClientEngineCapability.mjs.map
