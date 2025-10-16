import {
  equals2au1ep9vhcato as equals,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  toString1pkumu07cwy4m as toString,
} from '../../../js/coreRuntime.mjs';
import { KClass1cc9rfeybg8hs as KClass } from '../../KClassJs.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../js/void.mjs';
import {
  UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../exceptions.mjs';
import { jsIsType3jt51kzl8sm7y as jsIsType } from '../../../js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var KClassImplClass;
function KClassImpl() {
  if (KClassImplClass === VOID) {
    class $ {
      constructor(jClass) {
        this.eh_1 = jClass;
      }
      fh() {
        return this.eh_1;
      }
      equals(other) {
        var tmp;
        if (other instanceof NothingKClassImpl()) {
          tmp = false;
        } else {
          if (other instanceof ErrorKClass()) {
            tmp = false;
          } else {
            if (other instanceof KClassImpl()) {
              tmp = equals(this.fh(), other.fh());
            } else {
              tmp = false;
            }
          }
        }
        return tmp;
      }
      hashCode() {
        var tmp0_safe_receiver = this.gh();
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
        return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
      }
      toString() {
        return 'class ' + this.gh();
      }
    }
    initMetadataForClass($, 'KClassImpl', VOID, VOID, [KClass()]);
    KClassImplClass = $;
  }
  return KClassImplClass;
}
var NothingKClassImplClass;
function NothingKClassImpl() {
  if (NothingKClassImplClass === VOID) {
    class $ extends KClassImpl() {
      constructor() {
        NothingKClassImpl_instance = null;
        super(Object);
        NothingKClassImpl_instance = this;
        this.jh_1 = 'Nothing';
      }
      gh() {
        return this.jh_1;
      }
      hh(value) {
        return false;
      }
      fh() {
        throw UnsupportedOperationException().f6("There's no native JS class for Nothing type");
      }
      equals(other) {
        return other === this;
      }
      hashCode() {
        return 0;
      }
    }
    initMetadataForObject($, 'NothingKClassImpl');
    NothingKClassImplClass = $;
  }
  return NothingKClassImplClass;
}
var NothingKClassImpl_instance;
function NothingKClassImpl_getInstance() {
  if (NothingKClassImpl_instance === VOID)
    new (NothingKClassImpl())();
  return NothingKClassImpl_instance;
}
var ErrorKClassClass;
function ErrorKClass() {
  if (ErrorKClassClass === VOID) {
    class $ {
      gh() {
        var message = 'Unknown simpleName for ErrorKClass';
        throw IllegalStateException().o5(toString(message));
      }
      hh(value) {
        var message = "Can's check isInstance on ErrorKClass";
        throw IllegalStateException().o5(toString(message));
      }
      equals(other) {
        return other === this;
      }
      hashCode() {
        return 0;
      }
    }
    initMetadataForClass($, 'ErrorKClass', ErrorKClass, VOID, [KClass()]);
    ErrorKClassClass = $;
  }
  return ErrorKClassClass;
}
var PrimitiveKClassImplClass;
function PrimitiveKClassImpl() {
  if (PrimitiveKClassImplClass === VOID) {
    class $ extends KClassImpl() {
      constructor(jClass, givenSimpleName, isInstanceFunction) {
        super(jClass);
        this.lh_1 = givenSimpleName;
        this.mh_1 = isInstanceFunction;
      }
      equals(other) {
        if (!(other instanceof PrimitiveKClassImpl()))
          return false;
        return super.equals(other) && this.lh_1 === other.lh_1;
      }
      gh() {
        return this.lh_1;
      }
      hh(value) {
        return this.mh_1(value);
      }
    }
    initMetadataForClass($, 'PrimitiveKClassImpl');
    PrimitiveKClassImplClass = $;
  }
  return PrimitiveKClassImplClass;
}
var SimpleKClassImplClass;
function SimpleKClassImpl() {
  if (SimpleKClassImplClass === VOID) {
    class $ extends KClassImpl() {
      constructor(jClass) {
        super(jClass);
        var tmp = this;
        // Inline function 'kotlin.js.asDynamic' call
        var tmp0_safe_receiver = jClass.$metadata$;
        // Inline function 'kotlin.js.unsafeCast' call
        tmp.oh_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.simpleName;
      }
      gh() {
        return this.oh_1;
      }
      hh(value) {
        return jsIsType(value, this.fh());
      }
    }
    initMetadataForClass($, 'SimpleKClassImpl');
    SimpleKClassImplClass = $;
  }
  return SimpleKClassImplClass;
}
//region block: exports
export {
  NothingKClassImpl_getInstance as NothingKClassImpl_getInstance1v9lrhbzi4zr5,
  ErrorKClass as ErrorKClass1nb38m008xhla,
  KClassImpl as KClassImpl3o7kfo8v13fhm,
  PrimitiveKClassImpl as PrimitiveKClassImpl1fv46nzfav2pd,
  SimpleKClassImpl as SimpleKClassImpl1arbnmvef0y44,
};
//endregion

//# sourceMappingURL=KClassImpl.mjs.map
