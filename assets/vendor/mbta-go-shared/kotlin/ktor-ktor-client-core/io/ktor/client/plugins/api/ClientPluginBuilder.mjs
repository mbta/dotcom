import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import {
  RequestHook_instance6h3qdveebntl as RequestHook_instance,
  TransformRequestBodyHook_instance3boa13k1g7not as TransformRequestBodyHook_instance,
  TransformResponseBodyHook_instance1qcjlll12mq8h as TransformResponseBodyHook_instance,
} from './KtorCallContexts.mjs';
import { HookHandler356pvj77mag23 as HookHandler } from './ClientHook.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function ClientPluginBuilder$onClose$lambda() {
  return Unit_instance;
}
var ClientPluginBuilderClass;
function ClientPluginBuilder() {
  if (ClientPluginBuilderClass === VOID) {
    class $ {
      constructor(key, client, pluginConfig) {
        this.a50_1 = key;
        this.b50_1 = client;
        this.c50_1 = pluginConfig;
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.d50_1 = ArrayList().g1();
        var tmp_0 = this;
        tmp_0.e50_1 = ClientPluginBuilder$onClose$lambda;
      }
      w5j(block) {
        this.f50(RequestHook_instance, block);
      }
      x5j(block) {
        this.f50(TransformRequestBodyHook_instance, block);
      }
      p5b(block) {
        this.f50(TransformResponseBodyHook_instance, block);
      }
      f50(hook, handler) {
        this.d50_1.i(new (HookHandler())(hook, handler));
      }
    }
    initMetadataForClass($, 'ClientPluginBuilder');
    ClientPluginBuilderClass = $;
  }
  return ClientPluginBuilderClass;
}
//region block: exports
export {
  ClientPluginBuilder as ClientPluginBuilder3nx9qxmpfnzts,
};
//endregion

//# sourceMappingURL=ClientPluginBuilder.mjs.map
