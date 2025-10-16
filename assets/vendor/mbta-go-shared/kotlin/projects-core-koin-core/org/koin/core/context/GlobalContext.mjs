import { KoinApplicationAlreadyStartedExceptionetw68vfoztgk as KoinApplicationAlreadyStartedException } from '../error/KoinApplicationAlreadyStartedException.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Companion_instance3q2yw1wtvwi75 as Companion_instance } from '../KoinApplication.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  loadKoinModules$default2smh6iwqchb2f as loadKoinModules$default,
  KoinContextwmbx1izeuzb6 as KoinContext,
} from './KoinContext.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function register($this, koinApplication) {
  if (!($this.r7z_1 == null)) {
    throw KoinApplicationAlreadyStartedException().w7w('A Koin Application has already been started');
  }
  $this.r7z_1 = koinApplication.l7v_1;
}
var GlobalContextClass;
function GlobalContext() {
  if (GlobalContextClass === VOID) {
    class $ {
      constructor() {
        this.r7z_1 = null;
      }
      r29() {
        var tmp0_elvis_lhs = this.r7z_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          var message = 'KoinApplication has not been started';
          throw IllegalStateException().o5(toString(message));
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
      w7v() {
        return this.r7z_1;
      }
      u7v(appDeclaration) {
        var koinApplication = Companion_instance.n7v();
        register(this, koinApplication);
        appDeclaration(koinApplication);
        return koinApplication;
      }
      x7v(modules, createEagerInstances) {
        this.r29().h7v(modules, VOID, createEagerInstances);
      }
    }
    protoOf($).v7v = loadKoinModules$default;
    initMetadataForObject($, 'GlobalContext', VOID, VOID, [KoinContext()]);
    GlobalContextClass = $;
  }
  return GlobalContextClass;
}
var GlobalContext_instance;
function GlobalContext_getInstance() {
  return GlobalContext_instance;
}
//region block: init
GlobalContext_instance = new (GlobalContext())();
//endregion
//region block: exports
export {
  GlobalContext_instance as GlobalContext_instance2tuwjv46mw3fi,
};
//endregion

//# sourceMappingURL=GlobalContext.mjs.map
