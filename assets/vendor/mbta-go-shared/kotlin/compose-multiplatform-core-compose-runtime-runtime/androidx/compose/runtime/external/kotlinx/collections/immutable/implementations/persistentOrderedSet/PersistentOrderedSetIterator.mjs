import {
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  ConcurrentModificationException3974vl9oonkcj as ConcurrentModificationException,
} from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_persistentOrderedSet_PersistentOrderedSetIterator$stable;
function checkHasNext($this) {
  if (!$this.y())
    throw NoSuchElementException().m1();
}
var PersistentOrderedSetIteratorClass;
function PersistentOrderedSetIterator() {
  if (PersistentOrderedSetIteratorClass === VOID) {
    class $ {
      constructor(nextElement, map) {
        this.x7m_1 = nextElement;
        this.y7m_1 = map;
        this.z7m_1 = 0;
      }
      y() {
        return this.z7m_1 < this.y7m_1.c1();
      }
      z() {
        checkHasNext(this);
        var tmp = this.x7m_1;
        var result = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
        this.z7m_1 = this.z7m_1 + 1 | 0;
        var tmp_0 = this;
        // Inline function 'kotlin.collections.getOrElse' call
        var tmp0_elvis_lhs = this.y7m_1.j3(result);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          throw ConcurrentModificationException().bb('Hash code of an element (' + toString(result) + ') has changed after it was added to the persistent set.');
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        tmp_0.x7m_1 = tmp_1.p7m_1;
        return result;
      }
    }
    initMetadataForClass($, 'PersistentOrderedSetIterator');
    PersistentOrderedSetIteratorClass = $;
  }
  return PersistentOrderedSetIteratorClass;
}
//region block: init
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_persistentOrderedSet_PersistentOrderedSetIterator$stable = 8;
//endregion
//region block: exports
export {
  PersistentOrderedSetIterator as PersistentOrderedSetIteratorllb9vo6n5kht,
};
//endregion

//# sourceMappingURL=PersistentOrderedSetIterator.mjs.map
