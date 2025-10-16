import { Js_instance1k6sy4isx8lk as Js_instance } from '../../../../../ktor-ktor-client-core/io/ktor/client/engine/js/Js.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_JsPlatform$stable;
var JsPlatformClass;
function JsPlatform() {
  if (JsPlatformClass === VOID) {
    class $ {
      constructor() {
        this.bbt_1 = 'JS';
      }
      g9s() {
        return Js_instance.m4y();
      }
    }
    initMetadataForObject($, 'JsPlatform');
    JsPlatformClass = $;
  }
  return JsPlatformClass;
}
var JsPlatform_instance;
function JsPlatform_getInstance() {
  return JsPlatform_instance;
}
function getPlatform() {
  return JsPlatform_instance;
}
//region block: init
com_mbta_tid_mbta_app_JsPlatform$stable = 0;
JsPlatform_instance = new (JsPlatform())();
//endregion
//region block: exports
export {
  getPlatform as getPlatform1wwkyh4cue7su,
};
//endregion

//# sourceMappingURL=Platform.js.mjs.map
