import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ClientPluginBuilder3nx9qxmpfnzts as ClientPluginBuilder } from './ClientPluginBuilder.mjs';
import { AutoCloseable1l5p57f9lp7kv as AutoCloseable } from '../../../../../../kotlin-kotlin-stdlib/kotlin/AutoCloseableJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function ClientPluginInstance$onClose$lambda() {
  return Unit_instance;
}
var ClientPluginInstanceClass;
function ClientPluginInstance() {
  if (ClientPluginInstanceClass === VOID) {
    class $ {
      constructor(key, config, body) {
        this.y5j_1 = key;
        this.z5j_1 = config;
        this.a5k_1 = body;
        var tmp = this;
        tmp.b5k_1 = ClientPluginInstance$onClose$lambda;
      }
      o4q(scope) {
        var tmp0 = new (ClientPluginBuilder())(this.y5j_1, scope, this.z5j_1);
        // Inline function 'kotlin.apply' call
        this.a5k_1(tmp0);
        var pluginBuilder = tmp0;
        this.b5k_1 = pluginBuilder.e50_1;
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = pluginBuilder.d50_1.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          element.o4q(scope);
        }
      }
      v6() {
        this.b5k_1();
      }
    }
    initMetadataForClass($, 'ClientPluginInstance', VOID, VOID, [AutoCloseable()]);
    ClientPluginInstanceClass = $;
  }
  return ClientPluginInstanceClass;
}
//region block: exports
export {
  ClientPluginInstance as ClientPluginInstance3k1rpw72h98wh,
};
//endregion

//# sourceMappingURL=ClientPluginInstance.mjs.map
