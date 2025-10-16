import { systemClockNowmqi0s7hoicxq as systemClockNow } from './InstantJs.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var SystemClass;
function System() {
  if (SystemClass === VOID) {
    class $ {
      fv() {
        return systemClockNow();
      }
    }
    initMetadataForObject($, 'System', VOID, VOID, [Clock()]);
    SystemClass = $;
  }
  return SystemClass;
}
var System_instance;
function System_getInstance() {
  return System_instance;
}
var ClockClass;
function Clock() {
  if (ClockClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Clock');
    ClockClass = $;
  }
  return ClockClass;
}
//region block: init
System_instance = new (System())();
//endregion
//region block: exports
export {
  System_instance as System_instance15pw2079e4stg,
  Clock as Clock2yl0fnip31kbe,
};
//endregion

//# sourceMappingURL=Clock.mjs.map
