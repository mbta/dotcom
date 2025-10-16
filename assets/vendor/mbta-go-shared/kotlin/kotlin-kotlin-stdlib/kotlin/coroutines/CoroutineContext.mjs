import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { equals2au1ep9vhcato as equals } from '../js/coreRuntime.mjs';
import {
  EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance,
  CombinedContext278s863svhq02 as CombinedContext,
} from './CoroutineContextImpl.mjs';
import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { Key_instance17k9ki7fvysxq as Key_instance } from './ContinuationInterceptor.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get(key) {
  var tmp;
  if (equals(this.u1(), key)) {
    tmp = isInterface(this, Element()) ? this : THROW_CCE();
  } else {
    tmp = null;
  }
  return tmp;
}
function fold(initial, operation) {
  return operation(initial, this);
}
function minusKey(key) {
  return equals(this.u1(), key) ? EmptyCoroutineContext_getInstance() : this;
}
var ElementClass;
function Element() {
  if (ElementClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Element', VOID, VOID, [CoroutineContext()]);
    ElementClass = $;
  }
  return ElementClass;
}
function CoroutineContext$plus$lambda(acc, element) {
  var removed = acc.gr(element.u1());
  var tmp;
  if (removed === EmptyCoroutineContext_getInstance()) {
    tmp = element;
  } else {
    var interceptor = removed.sd(Key_instance);
    var tmp_0;
    if (interceptor == null) {
      tmp_0 = new (CombinedContext())(removed, element);
    } else {
      var left = removed.gr(Key_instance);
      tmp_0 = left === EmptyCoroutineContext_getInstance() ? new (CombinedContext())(element, interceptor) : new (CombinedContext())(new (CombinedContext())(left, element), interceptor);
    }
    tmp = tmp_0;
  }
  return tmp;
}
function plus(context) {
  var tmp;
  if (context === EmptyCoroutineContext_getInstance()) {
    tmp = this;
  } else {
    tmp = context.hr(this, CoroutineContext$plus$lambda);
  }
  return tmp;
}
var CoroutineContextClass;
function CoroutineContext() {
  if (CoroutineContextClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'CoroutineContext');
    CoroutineContextClass = $;
  }
  return CoroutineContextClass;
}
//region block: exports
export {
  fold as fold36i9psb7d5v48,
  get as get6d5x931vk0s,
  minusKey as minusKeyyqanvso9aovh,
  Element as Element2gr7ezmxqaln7,
  plus as plusolev77jfy5r9,
  CoroutineContext as CoroutineContext3n9ge8bnnq7z2,
};
//endregion

//# sourceMappingURL=CoroutineContext.mjs.map
