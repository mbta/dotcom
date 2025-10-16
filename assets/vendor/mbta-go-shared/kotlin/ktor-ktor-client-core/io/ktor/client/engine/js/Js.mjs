import { JsClientEngine2d6599fsx5fyf as JsClientEngine } from './JsClientEngine.mjs';
import {
  create$default2uiid8g0xhy6b as create$default,
  HttpClientEngineFactory2vnv2k1m8qdoq as HttpClientEngineFactory,
} from '../HttpClientEngineFactory.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { HttpClientEngineConfig53hvl3zmhf7d as HttpClientEngineConfig } from '../HttpClientEngineConfig.mjs';
import { engines_getInstance22b5c23elux9m as engines_getInstance } from '../Loader.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_initHook() {
  return initHook;
}
var initHook;
var JsClass;
function Js() {
  if (JsClass === VOID) {
    class $ {
      a5u(block) {
        // Inline function 'kotlin.apply' call
        var this_0 = new (JsClientEngineConfig())();
        block(this_0);
        return new (JsClientEngine())(this_0);
      }
      l4y(block) {
        return this.a5u(block);
      }
      toString() {
        return 'Js';
      }
      hashCode() {
        return -527824213;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Js()))
          return false;
        other instanceof Js() || THROW_CCE();
        return true;
      }
    }
    protoOf($).m4y = create$default;
    initMetadataForObject($, 'Js', VOID, VOID, [HttpClientEngineFactory()]);
    JsClass = $;
  }
  return JsClass;
}
var Js_instance;
function Js_getInstance() {
  return Js_instance;
}
function JsClientEngineConfig$requestInit$lambda(_this__u8e3s4) {
  return Unit_instance;
}
var JsClientEngineConfigClass;
function JsClientEngineConfig() {
  if (JsClientEngineConfigClass === VOID) {
    class $ extends HttpClientEngineConfig() {
      constructor() {
        super();
        var tmp = this;
        tmp.f5u_1 = JsClientEngineConfig$requestInit$lambda;
        this.g5u_1 = Object.create(null);
      }
    }
    initMetadataForClass($, 'JsClientEngineConfig', JsClientEngineConfig);
    JsClientEngineConfigClass = $;
  }
  return JsClientEngineConfigClass;
}
function initHook$init$() {
  engines_getInstance().i5u(Js_instance);
  return Unit_instance;
}
//region block: init
Js_instance = new (Js())();
//endregion
//region block: eager init
initHook = initHook$init$();
//endregion
//region block: exports
export {
  Js_instance as Js_instance1k6sy4isx8lk,
  get_initHook as get_initHook9u2azug2lqjy,
};
//endregion

//# sourceMappingURL=Js.mjs.map
