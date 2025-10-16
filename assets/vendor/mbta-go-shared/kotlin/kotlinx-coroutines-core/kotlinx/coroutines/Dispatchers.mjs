import { createDefaultDispatcher34z5li45gie67 as createDefaultDispatcher } from './CoroutineContext.mjs';
import { Unconfined_getInstance6pooz906dfij as Unconfined_getInstance } from './Unconfined.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { MainCoroutineDispatcher158x49bd8e9gp as MainCoroutineDispatcher } from './MainCoroutineDispatcher.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DispatchersClass;
function Dispatchers() {
  if (DispatchersClass === VOID) {
    class $ {
      constructor() {
        Dispatchers_instance = this;
        this.u28_1 = createDefaultDispatcher();
        this.v28_1 = Unconfined_getInstance();
        this.w28_1 = new (JsMainDispatcher())(this.u28_1, false);
        this.x28_1 = null;
      }
      y28() {
        var tmp0_elvis_lhs = this.x28_1;
        return tmp0_elvis_lhs == null ? this.w28_1 : tmp0_elvis_lhs;
      }
    }
    initMetadataForObject($, 'Dispatchers');
    DispatchersClass = $;
  }
  return DispatchersClass;
}
var Dispatchers_instance;
function Dispatchers_getInstance() {
  if (Dispatchers_instance === VOID)
    new (Dispatchers())();
  return Dispatchers_instance;
}
var JsMainDispatcherClass;
function JsMainDispatcher() {
  if (JsMainDispatcherClass === VOID) {
    class $ extends MainCoroutineDispatcher() {
      constructor(delegate, invokeImmediately) {
        super();
        this.t2y_1 = delegate;
        this.u2y_1 = invokeImmediately;
        this.v2y_1 = this.u2y_1 ? this : new (JsMainDispatcher())(this.t2y_1, true);
      }
      t2d() {
        return this.v2y_1;
      }
      l28(context) {
        return !this.u2y_1;
      }
      m28(context, block) {
        return this.t2y_1.m28(context, block);
      }
      toString() {
        var tmp0_elvis_lhs = this.u2d();
        return tmp0_elvis_lhs == null ? this.t2y_1.toString() : tmp0_elvis_lhs;
      }
    }
    initMetadataForClass($, 'JsMainDispatcher');
    JsMainDispatcherClass = $;
  }
  return JsMainDispatcherClass;
}
//region block: exports
export {
  Dispatchers_getInstance as Dispatchers_getInstanceitgtkvqfcnx3,
};
//endregion

//# sourceMappingURL=Dispatchers.mjs.map
