import { HashSet2dzve9y63nf0v as HashSet } from './HashSet.mjs';
import { KtMutableSetwuwn7k5m570a as KtMutableSet } from './Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function init_kotlin_collections_LinkedHashSet(_this__u8e3s4) {
}
var LinkedHashSetClass;
function LinkedHashSet() {
  if (LinkedHashSetClass === VOID) {
    class $ extends HashSet() {
      static f1() {
        var $this = this.ua();
        init_kotlin_collections_LinkedHashSet($this);
        return $this;
      }
      static i1(elements) {
        var $this = this.va(elements);
        init_kotlin_collections_LinkedHashSet($this);
        return $this;
      }
      static vc(initialCapacity, loadFactor) {
        var $this = this.xa(initialCapacity, loadFactor);
        init_kotlin_collections_LinkedHashSet($this);
        return $this;
      }
      static h(initialCapacity) {
        return this.vc(initialCapacity, 1.0);
      }
      y6() {
        return this.a1_1.aa();
      }
    }
    initMetadataForClass($, 'LinkedHashSet', $.f1, VOID, [HashSet(), KtMutableSet()]);
    LinkedHashSetClass = $;
  }
  return LinkedHashSetClass;
}
//region block: exports
export {
  LinkedHashSet as LinkedHashSet2tkztfx86kyx2,
};
//endregion

//# sourceMappingURL=LinkedHashSet.mjs.map
