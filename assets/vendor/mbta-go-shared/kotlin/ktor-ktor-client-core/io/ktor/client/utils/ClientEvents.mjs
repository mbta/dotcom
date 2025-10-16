import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { EventDefinition1fymk8xrdelhn as EventDefinition } from '../../../../../ktor-ktor-events/io/ktor/events/Events.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_HttpRequestCreated() {
  _init_properties_ClientEvents_kt__xuvbz8();
  return HttpRequestCreated;
}
var HttpRequestCreated;
function get_HttpRequestIsReadyForSending() {
  _init_properties_ClientEvents_kt__xuvbz8();
  return HttpRequestIsReadyForSending;
}
var HttpRequestIsReadyForSending;
function get_HttpResponseReceived() {
  _init_properties_ClientEvents_kt__xuvbz8();
  return HttpResponseReceived;
}
var HttpResponseReceived;
function get_HttpResponseReceiveFailed() {
  _init_properties_ClientEvents_kt__xuvbz8();
  return HttpResponseReceiveFailed;
}
var HttpResponseReceiveFailed;
function get_HttpResponseCancelled() {
  _init_properties_ClientEvents_kt__xuvbz8();
  return HttpResponseCancelled;
}
var HttpResponseCancelled;
var HttpResponseReceiveFailClass;
function HttpResponseReceiveFail() {
  if (HttpResponseReceiveFailClass === VOID) {
    class $ {
      constructor(response, cause) {
        this.v5t_1 = response;
        this.w5t_1 = cause;
      }
    }
    initMetadataForClass($, 'HttpResponseReceiveFail');
    HttpResponseReceiveFailClass = $;
  }
  return HttpResponseReceiveFailClass;
}
var properties_initialized_ClientEvents_kt_rdee4m;
function _init_properties_ClientEvents_kt__xuvbz8() {
  if (!properties_initialized_ClientEvents_kt_rdee4m) {
    properties_initialized_ClientEvents_kt_rdee4m = true;
    HttpRequestCreated = new (EventDefinition())();
    HttpRequestIsReadyForSending = new (EventDefinition())();
    HttpResponseReceived = new (EventDefinition())();
    HttpResponseReceiveFailed = new (EventDefinition())();
    HttpResponseCancelled = new (EventDefinition())();
  }
}
//region block: exports
export {
  get_HttpRequestCreated as get_HttpRequestCreated2xa7wfn254wyu,
  get_HttpRequestIsReadyForSending as get_HttpRequestIsReadyForSending2qftypei374ml,
  get_HttpResponseCancelled as get_HttpResponseCancelled3685lnxbzknld,
  get_HttpResponseReceiveFailed as get_HttpResponseReceiveFailed2q0s5em07bm9j,
  HttpResponseReceiveFail as HttpResponseReceiveFailk4vfmxmwithf,
  get_HttpResponseReceived as get_HttpResponseReceived23ai4hzotyx3a,
};
//endregion

//# sourceMappingURL=ClientEvents.mjs.map
