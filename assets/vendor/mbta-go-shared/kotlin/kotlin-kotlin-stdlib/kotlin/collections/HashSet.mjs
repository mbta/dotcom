import { AbstractMutableSetthfi6jds1k2h as AbstractMutableSet } from './AbstractMutableSet.mjs';
import { InternalHashMapmpvpylj0ut6l as InternalHashMap } from './InternalHashMap.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { KtMutableSetwuwn7k5m570a as KtMutableSet } from './Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function init_kotlin_collections_HashSet(_this__u8e3s4) {
}
var HashSetClass;
function HashSet() {
  if (HashSetClass === VOID) {
    class $ extends AbstractMutableSet() {
      static ta(map) {
        var $this = this.m8();
        init_kotlin_collections_HashSet($this);
        $this.a1_1 = map;
        return $this;
      }
      static ua() {
        return this.ta(InternalHashMap().l9());
      }
      static va(elements) {
        var $this = this.ta(InternalHashMap().wa(elements.c1()));
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          $this.a1_1.t3(element, true);
        }
        return $this;
      }
      static xa(initialCapacity, loadFactor) {
        return this.ta(InternalHashMap().n9(initialCapacity, loadFactor));
      }
      static b1(initialCapacity) {
        return this.xa(initialCapacity, 1.0);
      }
      i(element) {
        return this.a1_1.t3(element, true) == null;
      }
      p3() {
        this.a1_1.p3();
      }
      j1(element) {
        return this.a1_1.r9(element);
      }
      h1() {
        return this.a1_1.c1() === 0;
      }
      x() {
        return this.a1_1.z9();
      }
      m3(element) {
        return !(this.a1_1.u3(element) == null);
      }
      c1() {
        return this.a1_1.c1();
      }
    }
    initMetadataForClass($, 'HashSet', $.ua, VOID, [AbstractMutableSet(), KtMutableSet()]);
    HashSetClass = $;
  }
  return HashSetClass;
}
//region block: exports
export {
  HashSet as HashSet2dzve9y63nf0v,
};
//endregion

//# sourceMappingURL=HashSet.mjs.map
