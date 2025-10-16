import {
  Companion_getInstance15ooyu5z3ey0u as Companion_getInstance,
  TrieNode2935198uo2ywg as TrieNode,
} from '../external/kotlinx/collections/immutable/implementations/immutableMap/TrieNode.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PersistentHashMap21o3jb62mzevd as PersistentHashMap } from '../external/kotlinx/collections/immutable/implementations/immutableMap/PersistentHashMap.mjs';
import { PersistentCompositionLocalMap2iv80bl6i9tec as PersistentCompositionLocalMap } from '../CompositionLocalMap.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_internal_PersistentCompositionLocalHashMap_Builder$stable;
var androidx_compose_runtime_internal_PersistentCompositionLocalHashMap$stable;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = Companion_getInstance().k7k_1;
        tmp.f7n_1 = PersistentCompositionLocalHashMap().k7n(tmp_0 instanceof TrieNode() ? tmp_0 : THROW_CCE(), 0);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var PersistentCompositionLocalHashMapClass;
function PersistentCompositionLocalHashMap() {
  if (PersistentCompositionLocalHashMapClass === VOID) {
    class $ extends PersistentHashMap() {
      static k7n(node, size) {
        Companion_getInstance_0();
        return this.p7k(node, size);
      }
      t1() {
        return super.t1();
      }
    }
    initMetadataForClass($, 'PersistentCompositionLocalHashMap', VOID, VOID, [PersistentHashMap(), PersistentCompositionLocalMap()]);
    PersistentCompositionLocalHashMapClass = $;
  }
  return PersistentCompositionLocalHashMapClass;
}
function persistentCompositionLocalHashMapOf() {
  return Companion_getInstance_0().f7n_1;
}
//region block: init
androidx_compose_runtime_internal_PersistentCompositionLocalHashMap_Builder$stable = 8;
androidx_compose_runtime_internal_PersistentCompositionLocalHashMap$stable = 8;
//endregion
//region block: exports
export {
  persistentCompositionLocalHashMapOf as persistentCompositionLocalHashMapOf2v0f9z4o5wos6,
};
//endregion

//# sourceMappingURL=PersistentCompositionLocalMap.mjs.map
