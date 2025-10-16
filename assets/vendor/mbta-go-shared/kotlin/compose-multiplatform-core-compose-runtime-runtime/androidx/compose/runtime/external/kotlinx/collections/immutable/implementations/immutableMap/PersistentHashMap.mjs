import {
  PersistentHashMapEntrieslu9r3at3q58 as PersistentHashMapEntries,
  PersistentHashMapKeys6rusv642t3t0 as PersistentHashMapKeys,
  PersistentHashMapValuesrvi4lojyr94e as PersistentHashMapValues,
} from './PersistentHashMapContentViews.mjs';
import { Companion_getInstance15ooyu5z3ey0u as Companion_getInstance } from './TrieNode.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { AbstractMap3sqd8xvg0030s as AbstractMap } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/AbstractMap.mjs';
import { hashCodeq5arwsb9dgti as hashCode } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { KtMap140uvy3s5zad8 as KtMap } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMap$stable;
function createEntries($this) {
  return PersistentHashMapEntries().i7k($this);
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.j7k_1 = PersistentHashMap().p7k(Companion_getInstance().k7k_1, 0);
      }
      q7k() {
        var tmp = this.j7k_1;
        return tmp instanceof PersistentHashMap() ? tmp : THROW_CCE();
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
var PersistentHashMapClass;
function PersistentHashMap() {
  if (PersistentHashMapClass === VOID) {
    class $ extends AbstractMap() {
      static p7k(node, size) {
        Companion_getInstance_0();
        var $this = this.e8();
        $this.n7k_1 = node;
        $this.o7k_1 = size;
        return $this;
      }
      c1() {
        return this.o7k_1;
      }
      k3() {
        return PersistentHashMapKeys().s7k(this);
      }
      l3() {
        return PersistentHashMapValues().u7k(this);
      }
      t1() {
        return createEntries(this);
      }
      h3(key) {
        // Inline function 'kotlin.hashCode' call
        var tmp1_elvis_lhs = key == null ? null : hashCode(key);
        var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        return this.n7k_1.z7k(tmp$ret$0, key, 0);
      }
      j3(key) {
        // Inline function 'kotlin.hashCode' call
        var tmp1_elvis_lhs = key == null ? null : hashCode(key);
        var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        return this.n7k_1.a7l(tmp$ret$0, key, 0);
      }
      t3(key, value) {
        // Inline function 'kotlin.hashCode' call
        var tmp1_elvis_lhs = key == null ? null : hashCode(key);
        var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        var tmp0_elvis_lhs = this.n7k_1.b7l(tmp$ret$0, key, value, 0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return this;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var newNodeResult = tmp;
        return PersistentHashMap().p7k(newNodeResult.c7l_1, this.c1() + newNodeResult.d7l_1 | 0);
      }
      u3(key) {
        // Inline function 'kotlin.hashCode' call
        var tmp1_elvis_lhs = key == null ? null : hashCode(key);
        var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        var newNode = this.n7k_1.e7l(tmp$ret$0, key, 0);
        if (this.n7k_1 === newNode) {
          return this;
        }
        if (newNode == null) {
          return Companion_getInstance_0().q7k();
        }
        return PersistentHashMap().p7k(newNode, this.c1() - 1 | 0);
      }
    }
    initMetadataForClass($, 'PersistentHashMap', VOID, VOID, [AbstractMap(), KtMap()]);
    PersistentHashMapClass = $;
  }
  return PersistentHashMapClass;
}
//region block: init
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMap$stable = 8;
//endregion
//region block: exports
export {
  PersistentHashMap as PersistentHashMap21o3jb62mzevd,
  Companion_getInstance_0 as Companion_getInstance15q58cwjyfxlt,
};
//endregion

//# sourceMappingURL=PersistentHashMap.mjs.map
