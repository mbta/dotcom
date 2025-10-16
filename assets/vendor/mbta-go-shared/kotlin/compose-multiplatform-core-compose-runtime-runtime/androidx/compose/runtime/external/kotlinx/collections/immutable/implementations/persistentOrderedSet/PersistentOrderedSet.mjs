import { EndOfChain_instance1nv7iknd2mu8d as EndOfChain_instance } from '../../internal/EndOfChain.mjs';
import { Companion_getInstance15q58cwjyfxlt as Companion_getInstance } from '../immutableMap/PersistentHashMap.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { AbstractSet2mw1ev10zm1bz as AbstractSet } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/AbstractSet.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  KtMap140uvy3s5zad8 as KtMap,
  Collection1k04j3hzsbod0 as Collection,
  KtSetjrjc7fhfd6b9 as KtSet,
} from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { PersistentOrderedSetIteratorllb9vo6n5kht as PersistentOrderedSetIterator } from './PersistentOrderedSetIterator.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_persistentOrderedSet_Links$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_persistentOrderedSet_PersistentOrderedSet$stable;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.f7k_1 = PersistentOrderedSet().n7m(EndOfChain_instance, EndOfChain_instance, Companion_getInstance().q7k());
      }
      g7k() {
        return this.f7k_1;
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
var PersistentOrderedSetClass;
function PersistentOrderedSet() {
  if (PersistentOrderedSetClass === VOID) {
    class $ extends AbstractSet() {
      static n7m(firstElement, lastElement, hashMap) {
        Companion_getInstance_0();
        var $this = this.an();
        $this.k7m_1 = firstElement;
        $this.l7m_1 = lastElement;
        $this.m7m_1 = hashMap;
        return $this;
      }
      c1() {
        return this.m7m_1.c1();
      }
      j1(element) {
        return this.m7m_1.h3(element);
      }
      i(element) {
        if (this.m7m_1.h3(element)) {
          return this;
        }
        if (this.h1()) {
          var newMap = this.m7m_1.t3(element, Links().q7m());
          return PersistentOrderedSet().n7m(element, element, newMap);
        }
        var tmp = this.l7m_1;
        var lastElement = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
        var lastLinks = ensureNotNull(this.m7m_1.j3(lastElement));
        var newMap_0 = this.m7m_1.t3(lastElement, lastLinks.r7m(element)).t3(element, Links().s7m(lastElement));
        return PersistentOrderedSet().n7m(this.k7m_1, element, newMap_0);
      }
      m3(element) {
        var tmp0_elvis_lhs = this.m7m_1.j3(element);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return this;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var links = tmp;
        var newMap = this.m7m_1.u3(element);
        if (links.t7m()) {
          var tmp0 = newMap;
          // Inline function 'kotlin.collections.get' call
          var key = links.o7m_1;
          var tmp$ret$0 = (isInterface(tmp0, KtMap()) ? tmp0 : THROW_CCE()).j3(key);
          var previousLinks = ensureNotNull(tmp$ret$0);
          var tmp_0 = newMap;
          var tmp_1 = links.o7m_1;
          newMap = tmp_0.t3((tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE(), previousLinks.r7m(links.p7m_1));
        }
        if (links.v7m()) {
          var tmp0_0 = newMap;
          // Inline function 'kotlin.collections.get' call
          var key_0 = links.p7m_1;
          var tmp$ret$1 = (isInterface(tmp0_0, KtMap()) ? tmp0_0 : THROW_CCE()).j3(key_0);
          var nextLinks = ensureNotNull(tmp$ret$1);
          var tmp_2 = newMap;
          var tmp_3 = links.p7m_1;
          newMap = tmp_2.t3((tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE(), nextLinks.u7m(links.o7m_1));
        }
        var newFirstElement = !links.t7m() ? links.p7m_1 : this.k7m_1;
        var newLastElement = !links.v7m() ? links.o7m_1 : this.l7m_1;
        return PersistentOrderedSet().n7m(newFirstElement, newLastElement, newMap);
      }
      x() {
        return new (PersistentOrderedSetIterator())(this.k7m_1, this.m7m_1);
      }
    }
    initMetadataForClass($, 'PersistentOrderedSet', VOID, VOID, [AbstractSet(), Collection(), KtSet()]);
    PersistentOrderedSetClass = $;
  }
  return PersistentOrderedSetClass;
}
var LinksClass;
function Links() {
  if (LinksClass === VOID) {
    class $ {
      static w7m(previous, next) {
        var $this = createThis(this);
        $this.o7m_1 = previous;
        $this.p7m_1 = next;
        return $this;
      }
      static q7m() {
        return this.w7m(EndOfChain_instance, EndOfChain_instance);
      }
      static s7m(previous) {
        return this.w7m(previous, EndOfChain_instance);
      }
      r7m(newNext) {
        return Links().w7m(this.o7m_1, newNext);
      }
      u7m(newPrevious) {
        return Links().w7m(newPrevious, this.p7m_1);
      }
      v7m() {
        return !(this.p7m_1 === EndOfChain_instance);
      }
      t7m() {
        return !(this.o7m_1 === EndOfChain_instance);
      }
    }
    initMetadataForClass($, 'Links', $.q7m);
    LinksClass = $;
  }
  return LinksClass;
}
//region block: init
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_persistentOrderedSet_Links$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_persistentOrderedSet_PersistentOrderedSet$stable = 8;
//endregion
//region block: exports
export {
  Companion_getInstance_0 as Companion_getInstance3lxlshzag5wkc,
};
//endregion

//# sourceMappingURL=PersistentOrderedSet.mjs.map
