import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import {
  CoroutineContext3n9ge8bnnq7z2 as CoroutineContext,
  Element2gr7ezmxqaln7 as Element,
  plusolev77jfy5r9 as plus,
  get6d5x931vk0s as get,
  fold36i9psb7d5v48 as fold,
  minusKeyyqanvso9aovh as minusKey,
} from './CoroutineContext.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  protoOf180f3jzyo7rfj as protoOf,
} from '../js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../js/charSequenceJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var EmptyCoroutineContextClass;
function EmptyCoroutineContext() {
  if (EmptyCoroutineContextClass === VOID) {
    class $ {
      constructor() {
        EmptyCoroutineContext_instance = this;
        this.jr_1 = new (Long())(0, 0);
      }
      sd(key) {
        return null;
      }
      hr(initial, operation) {
        return initial;
      }
      ir(context) {
        return context;
      }
      gr(key) {
        return this;
      }
      hashCode() {
        return 0;
      }
      toString() {
        return 'EmptyCoroutineContext';
      }
    }
    initMetadataForObject($, 'EmptyCoroutineContext', VOID, VOID, [CoroutineContext()]);
    EmptyCoroutineContextClass = $;
  }
  return EmptyCoroutineContextClass;
}
var EmptyCoroutineContext_instance;
function EmptyCoroutineContext_getInstance() {
  if (EmptyCoroutineContext_instance === VOID)
    new (EmptyCoroutineContext())();
  return EmptyCoroutineContext_instance;
}
function size($this) {
  var cur = $this;
  var size = 2;
  while (true) {
    var tmp = cur.kr_1;
    var tmp0_elvis_lhs = tmp instanceof CombinedContext() ? tmp : null;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return size;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    cur = tmp_0;
    size = size + 1 | 0;
  }
}
function contains($this, element) {
  return equals($this.sd(element.u1()), element);
}
function containsAll($this, context) {
  var cur = context;
  while (true) {
    if (!contains($this, cur.lr_1))
      return false;
    var next = cur.kr_1;
    if (next instanceof CombinedContext()) {
      cur = next;
    } else {
      return contains($this, isInterface(next, Element()) ? next : THROW_CCE());
    }
  }
}
function CombinedContext$toString$lambda(acc, element) {
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(acc) === 0) {
    tmp = toString(element);
  } else {
    tmp = acc + ', ' + toString(element);
  }
  return tmp;
}
var CombinedContextClass;
function CombinedContext() {
  if (CombinedContextClass === VOID) {
    class $ {
      constructor(left, element) {
        this.kr_1 = left;
        this.lr_1 = element;
      }
      sd(key) {
        var cur = this;
        while (true) {
          var tmp0_safe_receiver = cur.lr_1.sd(key);
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            return tmp0_safe_receiver;
          }
          var next = cur.kr_1;
          if (next instanceof CombinedContext()) {
            cur = next;
          } else {
            return next.sd(key);
          }
        }
      }
      hr(initial, operation) {
        return operation(this.kr_1.hr(initial, operation), this.lr_1);
      }
      gr(key) {
        if (this.lr_1.sd(key) == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          return this.kr_1;
        }
        var newLeft = this.kr_1.gr(key);
        return newLeft === this.kr_1 ? this : newLeft === EmptyCoroutineContext_getInstance() ? this.lr_1 : new (CombinedContext())(newLeft, this.lr_1);
      }
      equals(other) {
        var tmp;
        if (this === other) {
          tmp = true;
        } else {
          var tmp_0;
          var tmp_1;
          if (other instanceof CombinedContext()) {
            tmp_1 = size(other) === size(this);
          } else {
            tmp_1 = false;
          }
          if (tmp_1) {
            tmp_0 = containsAll(other, this);
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.kr_1) + hashCode(this.lr_1) | 0;
      }
      toString() {
        return '[' + this.hr('', CombinedContext$toString$lambda) + ']';
      }
    }
    protoOf($).ir = plus;
    initMetadataForClass($, 'CombinedContext', VOID, VOID, [CoroutineContext()]);
    CombinedContextClass = $;
  }
  return CombinedContextClass;
}
var AbstractCoroutineContextKeyClass;
function AbstractCoroutineContextKey() {
  if (AbstractCoroutineContextKeyClass === VOID) {
    class $ {
      constructor(baseKey, safeCast) {
        this.cr_1 = safeCast;
        var tmp = this;
        var tmp_0;
        if (baseKey instanceof AbstractCoroutineContextKey()) {
          tmp_0 = baseKey.dr_1;
        } else {
          tmp_0 = baseKey;
        }
        tmp.dr_1 = tmp_0;
      }
      er(element) {
        return this.cr_1(element);
      }
      fr(key) {
        return key === this || this.dr_1 === key;
      }
    }
    initMetadataForClass($, 'AbstractCoroutineContextKey');
    AbstractCoroutineContextKeyClass = $;
  }
  return AbstractCoroutineContextKeyClass;
}
var AbstractCoroutineContextElementClass;
function AbstractCoroutineContextElement() {
  if (AbstractCoroutineContextElementClass === VOID) {
    class $ {
      constructor(key) {
        this.mr_1 = key;
      }
      u1() {
        return this.mr_1;
      }
    }
    protoOf($).sd = get;
    protoOf($).hr = fold;
    protoOf($).gr = minusKey;
    protoOf($).ir = plus;
    initMetadataForClass($, 'AbstractCoroutineContextElement', VOID, VOID, [Element()]);
    AbstractCoroutineContextElementClass = $;
  }
  return AbstractCoroutineContextElementClass;
}
//region block: exports
export {
  EmptyCoroutineContext_getInstance as EmptyCoroutineContext_getInstance31fow51ayy30t,
  AbstractCoroutineContextElement as AbstractCoroutineContextElement2rpehg0hv5szw,
  AbstractCoroutineContextKey as AbstractCoroutineContextKey9xr9r6wlj5bm,
  CombinedContext as CombinedContext278s863svhq02,
};
//endregion

//# sourceMappingURL=CoroutineContextImpl.mjs.map
