import { AbstractSet2mw1ev10zm1bz as AbstractSet } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/AbstractSet.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  PersistentHashMapKeysIterator3vuxm5ll9impc as PersistentHashMapKeysIterator,
  PersistentHashMapValuesIteratorhc0ml03yn4pa as PersistentHashMapValuesIterator,
  PersistentHashMapEntriesIterator2zny6kabm4cgp as PersistentHashMapEntriesIterator,
} from './PersistentHashMapContentIterators.mjs';
import {
  Collection1k04j3hzsbod0 as Collection,
  KtSetjrjc7fhfd6b9 as KtSet,
  Entry2xmjmyutzoq3p as Entry,
} from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { AbstractCollection1g9uvtcheckwb as AbstractCollection } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/AbstractCollection.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapEntries$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapKeys$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapValues$stable;
var PersistentHashMapKeysClass;
function PersistentHashMapKeys() {
  if (PersistentHashMapKeysClass === VOID) {
    class $ extends AbstractSet() {
      static s7k(map) {
        var $this = this.an();
        $this.r7k_1 = map;
        return $this;
      }
      c1() {
        return this.r7k_1.c1();
      }
      r9(element) {
        return this.r7k_1.h3(element);
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.r9((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      x() {
        return new (PersistentHashMapKeysIterator())(this.r7k_1.n7k_1);
      }
    }
    initMetadataForClass($, 'PersistentHashMapKeys', VOID, VOID, [Collection(), KtSet(), AbstractSet()]);
    PersistentHashMapKeysClass = $;
  }
  return PersistentHashMapKeysClass;
}
var PersistentHashMapValuesClass;
function PersistentHashMapValues() {
  if (PersistentHashMapValuesClass === VOID) {
    class $ extends AbstractCollection() {
      static u7k(map) {
        var $this = this.x6();
        $this.t7k_1 = map;
        return $this;
      }
      c1() {
        return this.t7k_1.c1();
      }
      ba(element) {
        return this.t7k_1.i3(element);
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.ba((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      x() {
        return new (PersistentHashMapValuesIterator())(this.t7k_1.n7k_1);
      }
    }
    initMetadataForClass($, 'PersistentHashMapValues', VOID, VOID, [Collection(), AbstractCollection()]);
    PersistentHashMapValuesClass = $;
  }
  return PersistentHashMapValuesClass;
}
var PersistentHashMapEntriesClass;
function PersistentHashMapEntries() {
  if (PersistentHashMapEntriesClass === VOID) {
    class $ extends AbstractSet() {
      static i7k(map) {
        var $this = this.an();
        $this.h7k_1 = map;
        return $this;
      }
      c1() {
        return this.h7k_1.c1();
      }
      d7m(element) {
        var tmp = !(element == null) ? element : THROW_CCE();
        if (!(!(tmp == null) ? isInterface(tmp, Entry()) : false))
          return false;
        var tmp0_safe_receiver = this.h7k_1.j3(element.u1());
        var tmp_0;
        if (tmp0_safe_receiver == null) {
          tmp_0 = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp_0 = equals(tmp0_safe_receiver, element.v1());
        }
        var tmp1_elvis_lhs = tmp_0;
        return tmp1_elvis_lhs == null ? element.v1() == null && this.h7k_1.h3(element.u1()) : tmp1_elvis_lhs;
      }
      j1(element) {
        if (!(!(element == null) ? isInterface(element, Entry()) : false))
          return false;
        return this.d7m((!(element == null) ? isInterface(element, Entry()) : false) ? element : THROW_CCE());
      }
      x() {
        return new (PersistentHashMapEntriesIterator())(this.h7k_1.n7k_1);
      }
    }
    initMetadataForClass($, 'PersistentHashMapEntries', VOID, VOID, [Collection(), KtSet(), AbstractSet()]);
    PersistentHashMapEntriesClass = $;
  }
  return PersistentHashMapEntriesClass;
}
//region block: init
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapEntries$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapKeys$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapValues$stable = 8;
//endregion
//region block: exports
export {
  PersistentHashMapEntries as PersistentHashMapEntrieslu9r3at3q58,
  PersistentHashMapKeys as PersistentHashMapKeys6rusv642t3t0,
  PersistentHashMapValues as PersistentHashMapValuesrvi4lojyr94e,
};
//endregion

//# sourceMappingURL=PersistentHashMapContentViews.mjs.map
