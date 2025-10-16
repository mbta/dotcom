import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function SerializersModuleCollector$contextual$lambda($serializer) {
  return function (it) {
    return $serializer;
  };
}
function contextual(kClass, serializer) {
  return this.v1k(kClass, SerializersModuleCollector$contextual$lambda(serializer));
}
var SerializersModuleCollectorClass;
function SerializersModuleCollector() {
  if (SerializersModuleCollectorClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'SerializersModuleCollector');
    SerializersModuleCollectorClass = $;
  }
  return SerializersModuleCollectorClass;
}
//region block: exports
export {
  contextual as contextual3hpp1gupsu4al,
  SerializersModuleCollector as SerializersModuleCollector3dddz14wd7brg,
};
//endregion

//# sourceMappingURL=SerializersModuleCollector.mjs.map
