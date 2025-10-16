import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_network_MockPhoenixSocket$stable;
var com_mbta_tid_mbta_app_network_MockPhoenixChannel$stable;
var com_mbta_tid_mbta_app_network_MockPush$stable;
var PhoenixPushStatus_Ok_instance;
var PhoenixPushStatus_Error_instance;
var PhoenixPushStatus_Timeout_instance;
var PhoenixPushStatus_entriesInitialized;
function PhoenixPushStatus_initEntries() {
  if (PhoenixPushStatus_entriesInitialized)
    return Unit_instance;
  PhoenixPushStatus_entriesInitialized = true;
  PhoenixPushStatus_Ok_instance = new (PhoenixPushStatus())('Ok', 0, 'ok');
  PhoenixPushStatus_Error_instance = new (PhoenixPushStatus())('Error', 1, 'error');
  PhoenixPushStatus_Timeout_instance = new (PhoenixPushStatus())('Timeout', 2, 'timeout');
}
var PhoenixPushStatusClass;
function PhoenixPushStatus() {
  if (PhoenixPushStatusClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, value) {
        super(name, ordinal);
        this.k9s_1 = value;
      }
    }
    initMetadataForClass($, 'PhoenixPushStatus');
    PhoenixPushStatusClass = $;
  }
  return PhoenixPushStatusClass;
}
function receiveAll(_this__u8e3s4, onOk, onError, onTimeout) {
  return _this__u8e3s4.l9s(PhoenixPushStatus_Ok_getInstance(), onOk).l9s(PhoenixPushStatus_Error_getInstance(), onError).l9s(PhoenixPushStatus_Timeout_getInstance(), onTimeout);
}
var PhoenixSocketClass;
function PhoenixSocket() {
  if (PhoenixSocketClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'PhoenixSocket');
    PhoenixSocketClass = $;
  }
  return PhoenixSocketClass;
}
function PhoenixPushStatus_Ok_getInstance() {
  PhoenixPushStatus_initEntries();
  return PhoenixPushStatus_Ok_instance;
}
function PhoenixPushStatus_Error_getInstance() {
  PhoenixPushStatus_initEntries();
  return PhoenixPushStatus_Error_instance;
}
function PhoenixPushStatus_Timeout_getInstance() {
  PhoenixPushStatus_initEntries();
  return PhoenixPushStatus_Timeout_instance;
}
//region block: init
com_mbta_tid_mbta_app_network_MockPhoenixSocket$stable = 0;
com_mbta_tid_mbta_app_network_MockPhoenixChannel$stable = 0;
com_mbta_tid_mbta_app_network_MockPush$stable = 0;
//endregion
//region block: exports
export {
  PhoenixSocket as PhoenixSocket13et8h4925i39,
  receiveAll as receiveAll1yj6eun054tse,
};
//endregion

//# sourceMappingURL=MobilePhoenixInterfaces.mjs.map
