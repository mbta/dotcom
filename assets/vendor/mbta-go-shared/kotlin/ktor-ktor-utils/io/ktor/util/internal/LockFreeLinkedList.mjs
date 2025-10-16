import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CONDITION_FALSE;
var ALREADY_REMOVED;
var LIST_EMPTY;
var REMOVE_PREPARED;
var NO_DECISION;
var SymbolClass;
function Symbol() {
  if (SymbolClass === VOID) {
    class $ {
      constructor(symbol) {
        this.s3k_1 = symbol;
      }
      toString() {
        return this.s3k_1;
      }
    }
    initMetadataForClass($, 'Symbol');
    SymbolClass = $;
  }
  return SymbolClass;
}
var LockFreeLinkedListNodeClass;
function LockFreeLinkedListNode() {
  if (LockFreeLinkedListNodeClass === VOID) {
    class $ {
      j2g() {
        // Inline function 'kotlinx.atomicfu.loop' call
        var this_0 = this.t3k_1;
        while (true) {
          var next = this_0.kotlinx$atomicfu$value;
          if (!(next instanceof OpDescriptor()))
            return next;
          next.u3k(this);
        }
      }
      v3k() {
        return unwrap(this.j2g());
      }
    }
    initMetadataForClass($, 'LockFreeLinkedListNode');
    LockFreeLinkedListNodeClass = $;
  }
  return LockFreeLinkedListNodeClass;
}
var RemovedClass;
function Removed() {
  if (RemovedClass === VOID) {
    class $ {}
    initMetadataForClass($, 'Removed');
    RemovedClass = $;
  }
  return RemovedClass;
}
var OpDescriptorClass;
function OpDescriptor() {
  if (OpDescriptorClass === VOID) {
    class $ {}
    initMetadataForClass($, 'OpDescriptor');
    OpDescriptorClass = $;
  }
  return OpDescriptorClass;
}
function unwrap(_this__u8e3s4) {
  _init_properties_LockFreeLinkedList_kt__wekxce();
  var tmp0_safe_receiver = _this__u8e3s4 instanceof Removed() ? _this__u8e3s4 : null;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.w3k_1;
  var tmp;
  if (tmp1_elvis_lhs == null) {
    tmp = _this__u8e3s4 instanceof LockFreeLinkedListNode() ? _this__u8e3s4 : THROW_CCE();
  } else {
    tmp = tmp1_elvis_lhs;
  }
  return tmp;
}
var properties_initialized_LockFreeLinkedList_kt_lnmdgw;
function _init_properties_LockFreeLinkedList_kt__wekxce() {
  if (!properties_initialized_LockFreeLinkedList_kt_lnmdgw) {
    properties_initialized_LockFreeLinkedList_kt_lnmdgw = true;
    CONDITION_FALSE = new (Symbol())('CONDITION_FALSE');
    ALREADY_REMOVED = new (Symbol())('ALREADY_REMOVED');
    LIST_EMPTY = new (Symbol())('LIST_EMPTY');
    REMOVE_PREPARED = new (Symbol())('REMOVE_PREPARED');
    NO_DECISION = new (Symbol())('NO_DECISION');
  }
}
//region block: exports
export {
  LockFreeLinkedListNode as LockFreeLinkedListNode1f5fxflchw0ko,
};
//endregion

//# sourceMappingURL=LockFreeLinkedList.mjs.map
