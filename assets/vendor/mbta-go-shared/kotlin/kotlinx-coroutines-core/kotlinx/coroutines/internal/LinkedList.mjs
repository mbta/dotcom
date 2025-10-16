import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var LockFreeLinkedListHeadClass;
function LockFreeLinkedListHead() {
  if (LockFreeLinkedListHeadClass === VOID) {
    class $ extends LockFreeLinkedListNode() {}
    initMetadataForClass($, 'LockFreeLinkedListHead', LockFreeLinkedListHead);
    LockFreeLinkedListHeadClass = $;
  }
  return LockFreeLinkedListHeadClass;
}
var LockFreeLinkedListNodeClass;
function LockFreeLinkedListNode() {
  if (LockFreeLinkedListNodeClass === VOID) {
    class $ {
      constructor() {
        this.p27_1 = this;
        this.q27_1 = this;
        this.r27_1 = false;
      }
      s27(node, permissionsBitmask) {
        var prev = this.q27_1;
        var tmp;
        if (prev instanceof ListClosed()) {
          tmp = ((prev.z2y_1 & permissionsBitmask) === 0 && prev.s27(node, permissionsBitmask));
        } else {
          node.p27_1 = this;
          node.q27_1 = prev;
          prev.p27_1 = node;
          this.q27_1 = node;
          tmp = true;
        }
        return tmp;
      }
      g2a(forbiddenElementsBit) {
        this.s27(new (ListClosed())(forbiddenElementsBit), forbiddenElementsBit);
      }
      t27() {
        if (this.r27_1)
          return false;
        var prev = this.q27_1;
        var next = this.p27_1;
        prev.p27_1 = next;
        next.q27_1 = prev;
        this.r27_1 = true;
        return true;
      }
      u27(node) {
        if (!(this.p27_1 === this))
          return false;
        this.s27(node, -2147483648);
        return true;
      }
    }
    initMetadataForClass($, 'LockFreeLinkedListNode', LockFreeLinkedListNode);
    LockFreeLinkedListNodeClass = $;
  }
  return LockFreeLinkedListNodeClass;
}
var ListClosedClass;
function ListClosed() {
  if (ListClosedClass === VOID) {
    class $ extends LockFreeLinkedListNode() {
      constructor(forbiddenElementsBitmask) {
        super();
        this.z2y_1 = forbiddenElementsBitmask;
      }
    }
    initMetadataForClass($, 'ListClosed');
    ListClosedClass = $;
  }
  return ListClosedClass;
}
//region block: exports
export {
  LockFreeLinkedListHead as LockFreeLinkedListHeaduwhs9comnpmn,
  LockFreeLinkedListNode as LockFreeLinkedListNode18403qmazubk5,
};
//endregion

//# sourceMappingURL=LinkedList.mjs.map
