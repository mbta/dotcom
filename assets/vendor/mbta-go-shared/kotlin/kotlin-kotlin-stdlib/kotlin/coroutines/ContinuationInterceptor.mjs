import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { Element2gr7ezmxqaln7 as Element } from './CoroutineContext.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import {
  AbstractCoroutineContextKey9xr9r6wlj5bm as AbstractCoroutineContextKey,
  EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance,
} from './CoroutineContextImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var KeyClass;
function Key() {
  if (KeyClass === VOID) {
    class $ {}
    initMetadataForObject($, 'Key');
    KeyClass = $;
  }
  return KeyClass;
}
var Key_instance;
function Key_getInstance() {
  return Key_instance;
}
function releaseInterceptedContinuation(continuation) {
}
function get(key) {
  if (key instanceof AbstractCoroutineContextKey()) {
    var tmp;
    if (key.fr(this.u1())) {
      var tmp_0 = key.er(this);
      tmp = (!(tmp_0 == null) ? isInterface(tmp_0, Element()) : false) ? tmp_0 : null;
    } else {
      tmp = null;
    }
    return tmp;
  }
  var tmp_1;
  if (Key_instance === key) {
    tmp_1 = isInterface(this, Element()) ? this : THROW_CCE();
  } else {
    tmp_1 = null;
  }
  return tmp_1;
}
function minusKey(key) {
  if (key instanceof AbstractCoroutineContextKey()) {
    return key.fr(this.u1()) && !(key.er(this) == null) ? EmptyCoroutineContext_getInstance() : this;
  }
  return Key_instance === key ? EmptyCoroutineContext_getInstance() : this;
}
var ContinuationInterceptorClass;
function ContinuationInterceptor() {
  if (ContinuationInterceptorClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ContinuationInterceptor', VOID, VOID, [Element()]);
    ContinuationInterceptorClass = $;
  }
  return ContinuationInterceptorClass;
}
//region block: init
Key_instance = new (Key())();
//endregion
//region block: exports
export {
  Key_instance as Key_instance17k9ki7fvysxq,
  get as getxe4seun860fg,
  minusKey as minusKey2uxs00uz5ceqp,
  ContinuationInterceptor as ContinuationInterceptor2624y0vaqwxwf,
};
//endregion

//# sourceMappingURL=ContinuationInterceptor.mjs.map
