import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { copyOf2ng0t8oizk6it as copyOf } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  until1jbpn0z3f8lbg as until,
  step18s9qzr5xwxat as step,
} from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { countOneBitstd673pwfna0t as countOneBits } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNode_ModificationResult$stable;
var androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNode$stable;
var ModificationResultClass;
function ModificationResult() {
  if (ModificationResultClass === VOID) {
    class $ {
      constructor(node, sizeDelta) {
        this.c7l_1 = node;
        this.d7l_1 = sizeDelta;
      }
    }
    initMetadataForClass($, 'ModificationResult');
    ModificationResultClass = $;
  }
  return ModificationResultClass;
}
function asInsertResult($this) {
  return new (ModificationResult())($this, 1);
}
function asUpdateResult($this) {
  return new (ModificationResult())($this, 0);
}
function hasNodeAt($this, positionMask) {
  return !(($this.w7k_1 & positionMask) === 0);
}
function keyAtIndex($this, keyIndex) {
  var tmp = $this.y7k_1[keyIndex];
  return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
}
function valueAtKeyIndex($this, keyIndex) {
  var tmp = $this.y7k_1[keyIndex + 1 | 0];
  return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
}
function insertEntryAt($this, positionMask, key, value) {
  var keyIndex = $this.e7m(positionMask);
  var newBuffer = insertEntryAtIndex($this.y7k_1, keyIndex, key, value);
  return TrieNode().f7m($this.v7k_1 | positionMask, $this.w7k_1, newBuffer);
}
function updateValueAtIndex($this, keyIndex, value) {
  // Inline function 'kotlin.collections.copyOf' call
  // Inline function 'kotlin.js.asDynamic' call
  var newBuffer = $this.y7k_1.slice();
  newBuffer[keyIndex + 1 | 0] = value;
  return TrieNode().f7m($this.v7k_1, $this.w7k_1, newBuffer);
}
function updateNodeAtIndex($this, nodeIndex, positionMask, newNode) {
  var newNodeBuffer = newNode.y7k_1;
  if (newNodeBuffer.length === 2 && newNode.w7k_1 === 0) {
    if ($this.y7k_1.length === 1) {
      newNode.v7k_1 = $this.w7k_1;
      return newNode;
    }
    var keyIndex = $this.e7m(positionMask);
    var newBuffer = replaceNodeWithEntry($this.y7k_1, nodeIndex, keyIndex, newNodeBuffer[0], newNodeBuffer[1]);
    return TrieNode().f7m($this.v7k_1 ^ positionMask, $this.w7k_1 ^ positionMask, newBuffer);
  }
  var newBuffer_0 = copyOf($this.y7k_1, $this.y7k_1.length);
  newBuffer_0[nodeIndex] = newNode;
  return TrieNode().f7m($this.v7k_1, $this.w7k_1, newBuffer_0);
}
function removeNodeAtIndex($this, nodeIndex, positionMask) {
  if ($this.y7k_1.length === 1)
    return null;
  var newBuffer = removeNodeAtIndex_0($this.y7k_1, nodeIndex);
  return TrieNode().f7m($this.v7k_1, $this.w7k_1 ^ positionMask, newBuffer);
}
function bufferMoveEntryToNode($this, keyIndex, positionMask, newKeyHash, newKey, newValue, shift, owner) {
  var storedKey = keyAtIndex($this, keyIndex);
  // Inline function 'kotlin.hashCode' call
  var tmp1_elvis_lhs = storedKey == null ? null : hashCode(storedKey);
  var storedKeyHash = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  var storedValue = valueAtKeyIndex($this, keyIndex);
  var newNode = makeNode($this, storedKeyHash, storedKey, storedValue, newKeyHash, newKey, newValue, shift + 5 | 0, owner);
  var nodeIndex = $this.g7m(positionMask) + 1 | 0;
  return replaceEntryWithNode($this.y7k_1, keyIndex, nodeIndex, newNode);
}
function moveEntryToNode($this, keyIndex, positionMask, newKeyHash, newKey, newValue, shift) {
  var newBuffer = bufferMoveEntryToNode($this, keyIndex, positionMask, newKeyHash, newKey, newValue, shift, null);
  return TrieNode().f7m($this.v7k_1 ^ positionMask, $this.w7k_1 | positionMask, newBuffer);
}
function makeNode($this, keyHash1, key1, value1, keyHash2, key2, value2, shift, owner) {
  if (shift > 30) {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$2 = [key1, value1, key2, value2];
    return TrieNode().h7m(0, 0, tmp$ret$2, owner);
  }
  var setBit1 = indexSegment(keyHash1, shift);
  var setBit2 = indexSegment(keyHash2, shift);
  if (!(setBit1 === setBit2)) {
    var tmp;
    if (setBit1 < setBit2) {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = [key1, value1, key2, value2];
    } else {
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = [key2, value2, key1, value1];
    }
    var nodeBuffer = tmp;
    return TrieNode().h7m(1 << setBit1 | 1 << setBit2, 0, nodeBuffer, owner);
  }
  var node = makeNode($this, keyHash1, key1, value1, keyHash2, key2, value2, shift + 5 | 0, owner);
  var tmp_0 = 1 << setBit1;
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$11 = [node];
  return TrieNode().h7m(0, tmp_0, tmp$ret$11, owner);
}
function removeEntryAtIndex($this, keyIndex, positionMask) {
  if ($this.y7k_1.length === 2)
    return null;
  var newBuffer = removeEntryAtIndex_0($this.y7k_1, keyIndex);
  return TrieNode().f7m($this.v7k_1 ^ positionMask, $this.w7k_1, newBuffer);
}
function collisionRemoveEntryAtIndex($this, i) {
  if ($this.y7k_1.length === 2)
    return null;
  var newBuffer = removeEntryAtIndex_0($this.y7k_1, i);
  return TrieNode().f7m(0, 0, newBuffer);
}
function collisionContainsKey($this, key) {
  var progression = step(until(0, $this.y7k_1.length), 2);
  var inductionVariable = progression.x1_1;
  var last = progression.y1_1;
  var step_0 = progression.z1_1;
  if (step_0 > 0 && inductionVariable <= last || (step_0 < 0 && last <= inductionVariable))
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + step_0 | 0;
      if (equals(key, $this.y7k_1[i]))
        return true;
    }
     while (!(i === last));
  return false;
}
function collisionGet($this, key) {
  var progression = step(until(0, $this.y7k_1.length), 2);
  var inductionVariable = progression.x1_1;
  var last = progression.y1_1;
  var step_0 = progression.z1_1;
  if (step_0 > 0 && inductionVariable <= last || (step_0 < 0 && last <= inductionVariable))
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + step_0 | 0;
      if (equals(key, keyAtIndex($this, i))) {
        return valueAtKeyIndex($this, i);
      }
    }
     while (!(i === last));
  return null;
}
function collisionPut($this, key, value) {
  var progression = step(until(0, $this.y7k_1.length), 2);
  var inductionVariable = progression.x1_1;
  var last = progression.y1_1;
  var step_0 = progression.z1_1;
  if (step_0 > 0 && inductionVariable <= last || (step_0 < 0 && last <= inductionVariable))
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + step_0 | 0;
      if (equals(key, keyAtIndex($this, i))) {
        if (value === valueAtKeyIndex($this, i)) {
          return null;
        }
        // Inline function 'kotlin.collections.copyOf' call
        // Inline function 'kotlin.js.asDynamic' call
        var newBuffer = $this.y7k_1.slice();
        newBuffer[i + 1 | 0] = value;
        return asUpdateResult(TrieNode().f7m(0, 0, newBuffer));
      }
    }
     while (!(i === last));
  var newBuffer_0 = insertEntryAtIndex($this.y7k_1, 0, key, value);
  return asInsertResult(TrieNode().f7m(0, 0, newBuffer_0));
}
function collisionRemove($this, key) {
  var progression = step(until(0, $this.y7k_1.length), 2);
  var inductionVariable = progression.x1_1;
  var last = progression.y1_1;
  var step_0 = progression.z1_1;
  if (step_0 > 0 && inductionVariable <= last || (step_0 < 0 && last <= inductionVariable))
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + step_0 | 0;
      if (equals(key, keyAtIndex($this, i))) {
        return collisionRemoveEntryAtIndex($this, i);
      }
    }
     while (!(i === last));
  return $this;
}
function replaceNode($this, targetNode, newNode, nodeIndex, positionMask) {
  return newNode == null ? removeNodeAtIndex($this, nodeIndex, positionMask) : !(targetNode === newNode) ? updateNodeAtIndex($this, nodeIndex, positionMask, newNode) : $this;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        // Inline function 'kotlin.emptyArray' call
        var tmp$ret$0 = [];
        tmp.k7k_1 = TrieNode().f7m(0, 0, tmp$ret$0);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var TrieNodeClass;
function TrieNode() {
  if (TrieNodeClass === VOID) {
    class $ {
      static h7m(dataMap, nodeMap, buffer, ownedBy) {
        Companion_getInstance();
        var $this = createThis(this);
        $this.v7k_1 = dataMap;
        $this.w7k_1 = nodeMap;
        $this.x7k_1 = ownedBy;
        $this.y7k_1 = buffer;
        return $this;
      }
      static f7m(dataMap, nodeMap, buffer) {
        Companion_getInstance();
        return this.h7m(dataMap, nodeMap, buffer, null);
      }
      n7l() {
        return countOneBits(this.v7k_1);
      }
      i7m(positionMask) {
        return !((this.v7k_1 & positionMask) === 0);
      }
      e7m(positionMask) {
        return imul(2, countOneBits(this.v7k_1 & (positionMask - 1 | 0)));
      }
      g7m(positionMask) {
        return (this.y7k_1.length - 1 | 0) - countOneBits(this.w7k_1 & (positionMask - 1 | 0)) | 0;
      }
      j7m(nodeIndex) {
        var tmp = this.y7k_1[nodeIndex];
        return tmp instanceof TrieNode() ? tmp : THROW_CCE();
      }
      z7k(keyHash, key, shift) {
        var keyPositionMask = 1 << indexSegment(keyHash, shift);
        if (this.i7m(keyPositionMask)) {
          return equals(key, keyAtIndex(this, this.e7m(keyPositionMask)));
        }
        if (hasNodeAt(this, keyPositionMask)) {
          var targetNode = this.j7m(this.g7m(keyPositionMask));
          if (shift === 30) {
            return collisionContainsKey(targetNode, key);
          }
          return targetNode.z7k(keyHash, key, shift + 5 | 0);
        }
        return false;
      }
      a7l(keyHash, key, shift) {
        var keyPositionMask = 1 << indexSegment(keyHash, shift);
        if (this.i7m(keyPositionMask)) {
          var keyIndex = this.e7m(keyPositionMask);
          if (equals(key, keyAtIndex(this, keyIndex))) {
            return valueAtKeyIndex(this, keyIndex);
          }
          return null;
        }
        if (hasNodeAt(this, keyPositionMask)) {
          var targetNode = this.j7m(this.g7m(keyPositionMask));
          if (shift === 30) {
            return collisionGet(targetNode, key);
          }
          return targetNode.a7l(keyHash, key, shift + 5 | 0);
        }
        return null;
      }
      b7l(keyHash, key, value, shift) {
        var keyPositionMask = 1 << indexSegment(keyHash, shift);
        if (this.i7m(keyPositionMask)) {
          var keyIndex = this.e7m(keyPositionMask);
          if (equals(key, keyAtIndex(this, keyIndex))) {
            if (valueAtKeyIndex(this, keyIndex) === value)
              return null;
            return asUpdateResult(updateValueAtIndex(this, keyIndex, value));
          }
          return asInsertResult(moveEntryToNode(this, keyIndex, keyPositionMask, keyHash, key, value, shift));
        }
        if (hasNodeAt(this, keyPositionMask)) {
          var nodeIndex = this.g7m(keyPositionMask);
          var targetNode = this.j7m(nodeIndex);
          var tmp;
          if (shift === 30) {
            var tmp0_elvis_lhs = collisionPut(targetNode, key, value);
            var tmp_0;
            if (tmp0_elvis_lhs == null) {
              return null;
            } else {
              tmp_0 = tmp0_elvis_lhs;
            }
            tmp = tmp_0;
          } else {
            var tmp1_elvis_lhs = targetNode.b7l(keyHash, key, value, shift + 5 | 0);
            var tmp_1;
            if (tmp1_elvis_lhs == null) {
              return null;
            } else {
              tmp_1 = tmp1_elvis_lhs;
            }
            tmp = tmp_1;
          }
          var putResult = tmp;
          // Inline function 'androidx.compose.runtime.external.kotlinx.collections.immutable.implementations.immutableMap.ModificationResult.replaceNode' call
          // Inline function 'kotlin.apply' call
          var tmp_2 = putResult;
          var node = putResult.c7l_1;
          tmp_2.c7l_1 = updateNodeAtIndex(this, nodeIndex, keyPositionMask, node);
          return putResult;
        }
        return asInsertResult(insertEntryAt(this, keyPositionMask, key, value));
      }
      e7l(keyHash, key, shift) {
        var keyPositionMask = 1 << indexSegment(keyHash, shift);
        if (this.i7m(keyPositionMask)) {
          var keyIndex = this.e7m(keyPositionMask);
          if (equals(key, keyAtIndex(this, keyIndex))) {
            return removeEntryAtIndex(this, keyIndex, keyPositionMask);
          }
          return this;
        }
        if (hasNodeAt(this, keyPositionMask)) {
          var nodeIndex = this.g7m(keyPositionMask);
          var targetNode = this.j7m(nodeIndex);
          var tmp;
          if (shift === 30) {
            tmp = collisionRemove(targetNode, key);
          } else {
            tmp = targetNode.e7l(keyHash, key, shift + 5 | 0);
          }
          var newNode = tmp;
          return replaceNode(this, targetNode, newNode, nodeIndex, keyPositionMask);
        }
        return this;
      }
    }
    initMetadataForClass($, 'TrieNode');
    TrieNodeClass = $;
  }
  return TrieNodeClass;
}
function insertEntryAtIndex(_this__u8e3s4, keyIndex, key, value) {
  // Inline function 'kotlin.arrayOfNulls' call
  var size = _this__u8e3s4.length + 2 | 0;
  var newBuffer = Array(size);
  // Inline function 'kotlin.collections.copyInto' call
  arrayCopy(_this__u8e3s4, newBuffer, 0, 0, keyIndex);
  var tmp4 = keyIndex + 2 | 0;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = _this__u8e3s4.length;
  arrayCopy(_this__u8e3s4, newBuffer, tmp4, keyIndex, endIndex);
  newBuffer[keyIndex] = key;
  newBuffer[keyIndex + 1 | 0] = value;
  return newBuffer;
}
function replaceNodeWithEntry(_this__u8e3s4, nodeIndex, keyIndex, key, value) {
  var newBuffer = copyOf(_this__u8e3s4, _this__u8e3s4.length + 1 | 0);
  var tmp4 = nodeIndex + 2 | 0;
  var tmp6 = nodeIndex + 1 | 0;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = _this__u8e3s4.length;
  arrayCopy(newBuffer, newBuffer, tmp4, tmp6, endIndex);
  // Inline function 'kotlin.collections.copyInto' call
  var destinationOffset = keyIndex + 2 | 0;
  arrayCopy(newBuffer, newBuffer, destinationOffset, keyIndex, nodeIndex);
  newBuffer[keyIndex] = key;
  newBuffer[keyIndex + 1 | 0] = value;
  return newBuffer;
}
function removeNodeAtIndex_0(_this__u8e3s4, nodeIndex) {
  // Inline function 'kotlin.arrayOfNulls' call
  var size = _this__u8e3s4.length - 1 | 0;
  var newBuffer = Array(size);
  // Inline function 'kotlin.collections.copyInto' call
  arrayCopy(_this__u8e3s4, newBuffer, 0, 0, nodeIndex);
  var tmp6 = nodeIndex + 1 | 0;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = _this__u8e3s4.length;
  arrayCopy(_this__u8e3s4, newBuffer, nodeIndex, tmp6, endIndex);
  return newBuffer;
}
function replaceEntryWithNode(_this__u8e3s4, keyIndex, nodeIndex, newNode) {
  var newNodeIndex = nodeIndex - 2 | 0;
  // Inline function 'kotlin.arrayOfNulls' call
  var size = (_this__u8e3s4.length - 2 | 0) + 1 | 0;
  var newBuffer = Array(size);
  // Inline function 'kotlin.collections.copyInto' call
  arrayCopy(_this__u8e3s4, newBuffer, 0, 0, keyIndex);
  // Inline function 'kotlin.collections.copyInto' call
  var startIndex = keyIndex + 2 | 0;
  arrayCopy(_this__u8e3s4, newBuffer, keyIndex, startIndex, nodeIndex);
  newBuffer[newNodeIndex] = newNode;
  var tmp4 = newNodeIndex + 1 | 0;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = _this__u8e3s4.length;
  arrayCopy(_this__u8e3s4, newBuffer, tmp4, nodeIndex, endIndex);
  return newBuffer;
}
function indexSegment(index, shift) {
  return index >> shift & 31;
}
function removeEntryAtIndex_0(_this__u8e3s4, keyIndex) {
  // Inline function 'kotlin.arrayOfNulls' call
  var size = _this__u8e3s4.length - 2 | 0;
  var newBuffer = Array(size);
  // Inline function 'kotlin.collections.copyInto' call
  arrayCopy(_this__u8e3s4, newBuffer, 0, 0, keyIndex);
  var tmp6 = keyIndex + 2 | 0;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = _this__u8e3s4.length;
  arrayCopy(_this__u8e3s4, newBuffer, keyIndex, tmp6, endIndex);
  return newBuffer;
}
//region block: init
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNode_ModificationResult$stable = 8;
androidx_compose_runtime_external_kotlinx_collections_immutable_implementations_immutableMap_TrieNode$stable = 8;
//endregion
//region block: exports
export {
  TrieNode as TrieNode2935198uo2ywg,
  Companion_getInstance as Companion_getInstance15ooyu5z3ey0u,
};
//endregion

//# sourceMappingURL=TrieNode.mjs.map
