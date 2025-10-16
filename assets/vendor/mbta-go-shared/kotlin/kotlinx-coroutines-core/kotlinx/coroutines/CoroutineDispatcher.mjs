import {
  AbstractCoroutineContextKey9xr9r6wlj5bm as AbstractCoroutineContextKey,
  AbstractCoroutineContextElement2rpehg0hv5szw as AbstractCoroutineContextElement,
} from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import {
  Key_instance17k9ki7fvysxq as Key_instance,
  getxe4seun860fg as get,
  minusKey2uxs00uz5ceqp as minusKey,
  ContinuationInterceptor2624y0vaqwxwf as ContinuationInterceptor,
} from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/ContinuationInterceptor.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { DispatchedContinuation8kf77e5g2ha2 as DispatchedContinuation } from './internal/DispatchedContinuation.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  get_classSimpleName2jgk6lzg9ft1 as get_classSimpleName,
  get_hexAddress1mxa7txdmiojm as get_hexAddress,
} from './Debug.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function CoroutineDispatcher$Key$_init_$lambda_akl8b5(it) {
  return it instanceof CoroutineDispatcher() ? it : null;
}
var KeyClass;
function Key() {
  if (KeyClass === VOID) {
    class $ extends AbstractCoroutineContextKey() {
      constructor() {
        Key_instance_0 = null;
        var tmp = Key_instance;
        super(tmp, CoroutineDispatcher$Key$_init_$lambda_akl8b5);
        Key_instance_0 = this;
      }
    }
    initMetadataForObject($, 'Key');
    KeyClass = $;
  }
  return KeyClass;
}
var Key_instance_0;
function Key_getInstance() {
  if (Key_instance_0 === VOID)
    new (Key())();
  return Key_instance_0;
}
var CoroutineDispatcherClass;
function CoroutineDispatcher() {
  if (CoroutineDispatcherClass === VOID) {
    class $ extends AbstractCoroutineContextElement() {
      constructor() {
        Key_getInstance();
        super(Key_instance);
      }
      l28(context) {
        return true;
      }
      td(continuation) {
        return new (DispatchedContinuation())(this, continuation);
      }
      ud(continuation) {
        var dispatched = continuation instanceof DispatchedContinuation() ? continuation : THROW_CCE();
        dispatched.n28();
      }
      toString() {
        return get_classSimpleName(this) + '@' + get_hexAddress(this);
      }
    }
    protoOf($).sd = get;
    protoOf($).gr = minusKey;
    initMetadataForClass($, 'CoroutineDispatcher', VOID, VOID, [AbstractCoroutineContextElement(), ContinuationInterceptor()]);
    CoroutineDispatcherClass = $;
  }
  return CoroutineDispatcherClass;
}
//region block: exports
export {
  CoroutineDispatcher as CoroutineDispatcherizb7p9bijexj,
};
//endregion

//# sourceMappingURL=CoroutineDispatcher.mjs.map
