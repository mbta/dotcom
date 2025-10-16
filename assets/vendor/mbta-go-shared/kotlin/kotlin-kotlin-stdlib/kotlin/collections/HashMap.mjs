import { AbstractMutableMapyktux9ubhc1g as AbstractMutableMap } from './AbstractMutableMap.mjs';
import { InternalHashMapmpvpylj0ut6l as InternalHashMap } from './InternalHashMap.mjs';
import {
  HashMapKeys28ggmxpft3hz9 as HashMapKeys,
  HashMapValues3umcxpfyfunqf as HashMapValues,
  HashMapEntrySet29p2ksc4wcy5i as HashMapEntrySet,
} from './HashMapEntry.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { KtMutableMap1kqeifoi36kpz as KtMutableMap } from './Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function init_kotlin_collections_HashMap(_this__u8e3s4) {
  _this__u8e3s4.y8_1 = null;
}
var HashMapClass;
function HashMap() {
  if (HashMapClass === VOID) {
    class $ extends AbstractMutableMap() {
      static z8(internalMap) {
        var $this = this.b8();
        init_kotlin_collections_HashMap($this);
        $this.x8_1 = internalMap;
        return $this;
      }
      static a9() {
        return this.z8(InternalHashMap().l9());
      }
      static m9(initialCapacity, loadFactor) {
        return this.z8(InternalHashMap().n9(initialCapacity, loadFactor));
      }
      static o9(initialCapacity) {
        return this.m9(initialCapacity, 1.0);
      }
      static p9(original) {
        return this.z8(InternalHashMap().q9(original));
      }
      p3() {
        this.x8_1.p3();
      }
      h3(key) {
        return this.x8_1.r9(key);
      }
      i3(value) {
        return this.x8_1.i3(value);
      }
      f8() {
        return HashMapKeys().t9(this.x8_1);
      }
      i8() {
        return HashMapValues().v9(this.x8_1);
      }
      t1() {
        var tmp0_elvis_lhs = this.y8_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = HashMapEntrySet().x9(this.x8_1);
          this.y8_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
      j3(key) {
        return this.x8_1.j3(key);
      }
      t3(key, value) {
        return this.x8_1.t3(key, value);
      }
      u3(key) {
        return this.x8_1.u3(key);
      }
      c1() {
        return this.x8_1.c1();
      }
      v3(from) {
        return this.x8_1.v3(from);
      }
    }
    initMetadataForClass($, 'HashMap', $.a9, VOID, [AbstractMutableMap(), KtMutableMap()]);
    HashMapClass = $;
  }
  return HashMapClass;
}
//region block: exports
export {
  HashMap as HashMap1a0ld5kgwhmhv,
};
//endregion

//# sourceMappingURL=HashMap.mjs.map
