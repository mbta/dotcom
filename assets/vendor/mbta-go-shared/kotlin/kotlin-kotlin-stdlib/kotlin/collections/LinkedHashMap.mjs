import { HashMap1a0ld5kgwhmhv as HashMap } from './HashMap.mjs';
import { KtMutableMap1kqeifoi36kpz as KtMutableMap } from './Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function init_kotlin_collections_LinkedHashMap(_this__u8e3s4) {
}
var LinkedHashMapClass;
function LinkedHashMap() {
  if (LinkedHashMapClass === VOID) {
    class $ extends HashMap() {
      static sc() {
        var $this = this.a9();
        init_kotlin_collections_LinkedHashMap($this);
        return $this;
      }
      static tc(initialCapacity) {
        var $this = this.o9(initialCapacity);
        init_kotlin_collections_LinkedHashMap($this);
        return $this;
      }
      static uc(original) {
        var $this = this.p9(original);
        init_kotlin_collections_LinkedHashMap($this);
        return $this;
      }
      y6() {
        return this.x8_1.aa();
      }
    }
    initMetadataForClass($, 'LinkedHashMap', $.sc, VOID, [HashMap(), KtMutableMap()]);
    LinkedHashMapClass = $;
  }
  return LinkedHashMapClass;
}
//region block: exports
export {
  LinkedHashMap as LinkedHashMap1zhqxkxv3xnkl,
};
//endregion

//# sourceMappingURL=LinkedHashMap.mjs.map
