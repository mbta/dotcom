import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Companion_getInstance15ooyu5z3ey0u as Companion_getInstance,
  TrieNode2935198uo2ywg as TrieNode,
} from './TrieNode.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { assert2tmfsppckbc0c as assert } from '../../internal/commonFunctions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Entry2xmjmyutzoq3p as Entry } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNodeBaseIterator$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNodeKeysIterator$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNodeValuesIterator$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNodeEntriesIterator$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_MapEntry$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapBaseIterator$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapEntriesIterator$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapKeysIterator$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapValuesIterator$stable;
var PersistentHashMapKeysIteratorClass;
function PersistentHashMapKeysIterator() {
  if (PersistentHashMapKeysIteratorClass === VOID) {
    class $ extends PersistentHashMapBaseIterator() {
      constructor(node) {
        var tmp = 0;
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp_0 = Array(8);
        while (tmp < 8) {
          tmp_0[tmp] = new (TrieNodeKeysIterator())();
          tmp = tmp + 1 | 0;
        }
        super(node, tmp_0);
      }
    }
    initMetadataForClass($, 'PersistentHashMapKeysIterator');
    PersistentHashMapKeysIteratorClass = $;
  }
  return PersistentHashMapKeysIteratorClass;
}
var PersistentHashMapValuesIteratorClass;
function PersistentHashMapValuesIterator() {
  if (PersistentHashMapValuesIteratorClass === VOID) {
    class $ extends PersistentHashMapBaseIterator() {
      constructor(node) {
        var tmp = 0;
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp_0 = Array(8);
        while (tmp < 8) {
          tmp_0[tmp] = new (TrieNodeValuesIterator())();
          tmp = tmp + 1 | 0;
        }
        super(node, tmp_0);
      }
    }
    initMetadataForClass($, 'PersistentHashMapValuesIterator');
    PersistentHashMapValuesIteratorClass = $;
  }
  return PersistentHashMapValuesIteratorClass;
}
var PersistentHashMapEntriesIteratorClass;
function PersistentHashMapEntriesIterator() {
  if (PersistentHashMapEntriesIteratorClass === VOID) {
    class $ extends PersistentHashMapBaseIterator() {
      constructor(node) {
        var tmp = 0;
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp_0 = Array(8);
        while (tmp < 8) {
          tmp_0[tmp] = new (TrieNodeEntriesIterator())();
          tmp = tmp + 1 | 0;
        }
        super(node, tmp_0);
      }
    }
    initMetadataForClass($, 'PersistentHashMapEntriesIterator');
    PersistentHashMapEntriesIteratorClass = $;
  }
  return PersistentHashMapEntriesIteratorClass;
}
function moveToNextNodeWithData($this, pathIndex) {
  if ($this.f7l_1[pathIndex].l7l()) {
    return pathIndex;
  }
  if ($this.f7l_1[pathIndex].p7l()) {
    var node = $this.f7l_1[pathIndex].m7l();
    if (pathIndex === 6) {
      $this.f7l_1[pathIndex + 1 | 0].o7l(node.y7k_1, node.y7k_1.length);
    } else {
      $this.f7l_1[pathIndex + 1 | 0].o7l(node.y7k_1, imul(2, node.n7l()));
    }
    return moveToNextNodeWithData($this, pathIndex + 1 | 0);
  }
  return -1;
}
function ensureNextEntryIsReady($this) {
  if ($this.f7l_1[$this.g7l_1].l7l()) {
    return Unit_instance;
  }
  var inductionVariable = $this.g7l_1;
  if (0 <= inductionVariable)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + -1 | 0;
      var result = moveToNextNodeWithData($this, i);
      if (result === -1 && $this.f7l_1[i].p7l()) {
        $this.f7l_1[i].q7l();
        result = moveToNextNodeWithData($this, i);
      }
      if (!(result === -1)) {
        $this.g7l_1 = result;
        return Unit_instance;
      }
      if (i > 0) {
        $this.f7l_1[i - 1 | 0].q7l();
      }
      $this.f7l_1[i].o7l(Companion_getInstance().k7k_1.y7k_1, 0);
    }
     while (0 <= inductionVariable);
  $this.h7l_1 = false;
}
function checkHasNext($this) {
  if (!$this.y())
    throw NoSuchElementException().m1();
}
var PersistentHashMapBaseIteratorClass;
function PersistentHashMapBaseIterator() {
  if (PersistentHashMapBaseIteratorClass === VOID) {
    class $ {
      constructor(node, path) {
        this.f7l_1 = path;
        this.g7l_1 = 0;
        this.h7l_1 = true;
        this.f7l_1[0].o7l(node.y7k_1, imul(2, node.n7l()));
        this.g7l_1 = 0;
        ensureNextEntryIsReady(this);
      }
      y() {
        return this.h7l_1;
      }
      z() {
        checkHasNext(this);
        var result = this.f7l_1[this.g7l_1].z();
        ensureNextEntryIsReady(this);
        return result;
      }
    }
    initMetadataForClass($, 'PersistentHashMapBaseIterator');
    PersistentHashMapBaseIteratorClass = $;
  }
  return PersistentHashMapBaseIteratorClass;
}
var TrieNodeBaseIteratorClass;
function TrieNodeBaseIterator() {
  if (TrieNodeBaseIteratorClass === VOID) {
    class $ {
      constructor() {
        this.i7l_1 = Companion_getInstance().k7k_1.y7k_1;
        this.j7l_1 = 0;
        this.k7l_1 = 0;
      }
      r7l(buffer, dataSize, index) {
        this.i7l_1 = buffer;
        this.j7l_1 = dataSize;
        this.k7l_1 = index;
      }
      o7l(buffer, dataSize) {
        this.r7l(buffer, dataSize, 0);
      }
      l7l() {
        return this.k7l_1 < this.j7l_1;
      }
      p7l() {
        assert(this.k7l_1 >= this.j7l_1);
        return this.k7l_1 < this.i7l_1.length;
      }
      m7l() {
        assert(this.p7l());
        var tmp = this.i7l_1[this.k7l_1];
        return tmp instanceof TrieNode() ? tmp : THROW_CCE();
      }
      q7l() {
        assert(this.p7l());
        this.k7l_1 = this.k7l_1 + 1 | 0;
      }
      y() {
        return this.l7l();
      }
    }
    initMetadataForClass($, 'TrieNodeBaseIterator');
    TrieNodeBaseIteratorClass = $;
  }
  return TrieNodeBaseIteratorClass;
}
var TrieNodeKeysIteratorClass;
function TrieNodeKeysIterator() {
  if (TrieNodeKeysIteratorClass === VOID) {
    class $ extends TrieNodeBaseIterator() {
      z() {
        assert(this.l7l());
        this.k7l_1 = this.k7l_1 + 2 | 0;
        var tmp = this.i7l_1[this.k7l_1 - 2 | 0];
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
    }
    initMetadataForClass($, 'TrieNodeKeysIterator', TrieNodeKeysIterator);
    TrieNodeKeysIteratorClass = $;
  }
  return TrieNodeKeysIteratorClass;
}
var TrieNodeValuesIteratorClass;
function TrieNodeValuesIterator() {
  if (TrieNodeValuesIteratorClass === VOID) {
    class $ extends TrieNodeBaseIterator() {
      z() {
        assert(this.l7l());
        this.k7l_1 = this.k7l_1 + 2 | 0;
        var tmp = this.i7l_1[this.k7l_1 - 1 | 0];
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
    }
    initMetadataForClass($, 'TrieNodeValuesIterator', TrieNodeValuesIterator);
    TrieNodeValuesIteratorClass = $;
  }
  return TrieNodeValuesIteratorClass;
}
var TrieNodeEntriesIteratorClass;
function TrieNodeEntriesIterator() {
  if (TrieNodeEntriesIteratorClass === VOID) {
    class $ extends TrieNodeBaseIterator() {
      z() {
        assert(this.l7l());
        this.k7l_1 = this.k7l_1 + 2 | 0;
        var tmp = this.i7l_1[this.k7l_1 - 2 | 0];
        var tmp_0 = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
        var tmp_1 = this.i7l_1[this.k7l_1 - 1 | 0];
        return new (MapEntry())(tmp_0, (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE());
      }
    }
    initMetadataForClass($, 'TrieNodeEntriesIterator', TrieNodeEntriesIterator);
    TrieNodeEntriesIteratorClass = $;
  }
  return TrieNodeEntriesIteratorClass;
}
var MapEntryClass;
function MapEntry() {
  if (MapEntryClass === VOID) {
    class $ {
      constructor(key, value) {
        this.b7m_1 = key;
        this.c7m_1 = value;
      }
      u1() {
        return this.b7m_1;
      }
      v1() {
        return this.c7m_1;
      }
      hashCode() {
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver = this.u1();
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
        var tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver_0 = this.v1();
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
        return tmp ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
      }
      equals(other) {
        var tmp0_safe_receiver = (!(other == null) ? isInterface(other, Entry()) : false) ? other : null;
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = (equals(tmp0_safe_receiver.u1(), this.u1()) && equals(tmp0_safe_receiver.v1(), this.v1()));
        }
        var tmp1_elvis_lhs = tmp;
        return tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
      }
      toString() {
        return toString(this.u1()) + '=' + toString(this.v1());
      }
    }
    initMetadataForClass($, 'MapEntry', VOID, VOID, [Entry()]);
    MapEntryClass = $;
  }
  return MapEntryClass;
}
//region block: init
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNodeBaseIterator$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNodeKeysIterator$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNodeValuesIterator$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNodeEntriesIterator$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_MapEntry$stable = 0;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapBaseIterator$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapEntriesIterator$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapKeysIterator$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_PersistentHashMapValuesIterator$stable = 8;
//endregion
//region block: exports
export {
  PersistentHashMapEntriesIterator as PersistentHashMapEntriesIterator2zny6kabm4cgp,
  PersistentHashMapKeysIterator as PersistentHashMapKeysIterator3vuxm5ll9impc,
  PersistentHashMapValuesIterator as PersistentHashMapValuesIteratorhc0ml03yn4pa,
};
//endregion

//# sourceMappingURL=PersistentHashMapContentIterators.mjs.map
