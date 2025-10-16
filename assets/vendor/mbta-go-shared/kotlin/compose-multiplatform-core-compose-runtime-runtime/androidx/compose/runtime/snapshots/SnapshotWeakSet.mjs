import { identityHashCodew0qom0tyh9de as identityHashCode } from '../internal/Utils.js.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { WeakReference1lmh9mmtvir1k as WeakReference } from '../internal/WeakReference.web.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_snapshots_SnapshotWeakSet$stable;
function find($this, value, hash) {
  var low = 0;
  var high = $this.x7q_1 - 1 | 0;
  while (low <= high) {
    var mid = (low + high | 0) >>> 1 | 0;
    var midHash = $this.y7q_1[mid];
    if (midHash < hash)
      low = mid + 1 | 0;
    else if (midHash > hash)
      high = mid - 1 | 0;
    else {
      var tmp0_safe_receiver = $this.z7q_1[mid];
      var midVal = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.r29();
      if (value === midVal)
        return mid;
      return findExactIndex($this, mid, value, hash);
    }
  }
  return -(low + 1 | 0) | 0;
}
function findExactIndex($this, midIndex, value, valueHash) {
  var inductionVariable = midIndex - 1 | 0;
  if (0 <= inductionVariable)
    $l$loop: do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + -1 | 0;
      if (!($this.y7q_1[i] === valueHash)) {
        break $l$loop;
      }
      var tmp0_safe_receiver = $this.z7q_1[i];
      var v = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.r29();
      if (v === value) {
        return i;
      }
    }
     while (0 <= inductionVariable);
  var inductionVariable_0 = midIndex + 1 | 0;
  var last = $this.x7q_1;
  if (inductionVariable_0 < last)
    do {
      var i_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      if (!($this.y7q_1[i_0] === valueHash)) {
        return -(i_0 + 1 | 0) | 0;
      }
      var tmp1_safe_receiver = $this.z7q_1[i_0];
      var v_0 = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.r29();
      if (v_0 === value) {
        return i_0;
      }
    }
     while (inductionVariable_0 < last);
  return -($this.x7q_1 + 1 | 0) | 0;
}
var SnapshotWeakSetClass;
function SnapshotWeakSet() {
  if (SnapshotWeakSetClass === VOID) {
    class $ {
      constructor() {
        this.x7q_1 = 0;
        this.y7q_1 = new Int32Array(16);
        var tmp = this;
        // Inline function 'kotlin.arrayOfNulls' call
        tmp.z7q_1 = Array(16);
      }
      b7r(value) {
        var index;
        var size = this.x7q_1;
        var hash = identityHashCode(value);
        if (size > 0) {
          index = find(this, value, hash);
          if (index >= 0) {
            return false;
          }
        } else {
          index = -1;
        }
        var insertIndex = -(index + 1 | 0) | 0;
        var capacity = this.z7q_1.length;
        if (size === capacity) {
          var newCapacity = imul(capacity, 2);
          // Inline function 'kotlin.arrayOfNulls' call
          var newValues = Array(newCapacity);
          var newHashes = new Int32Array(newCapacity);
          var tmp0 = this.z7q_1;
          // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
          // Inline function 'kotlin.collections.copyInto' call
          var destinationOffset = insertIndex + 1 | 0;
          arrayCopy(tmp0, newValues, destinationOffset, insertIndex, size);
          // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
          // Inline function 'kotlin.collections.copyInto' call
          var this_0 = this.z7q_1;
          arrayCopy(this_0, newValues, 0, 0, insertIndex);
          var tmp0_0 = this.y7q_1;
          // Inline function 'kotlin.collections.copyInto' call
          var destinationOffset_0 = insertIndex + 1 | 0;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp = tmp0_0;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          arrayCopy(tmp, newHashes, destinationOffset_0, insertIndex, size);
          // Inline function 'kotlin.collections.copyInto' call
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp_0 = this.y7q_1;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          arrayCopy(tmp_0, newHashes, 0, 0, insertIndex);
          this.z7q_1 = newValues;
          this.y7q_1 = newHashes;
        } else {
          var tmp0_1 = this.z7q_1;
          var tmp2 = this.z7q_1;
          // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
          // Inline function 'kotlin.collections.copyInto' call
          var destinationOffset_1 = insertIndex + 1 | 0;
          arrayCopy(tmp0_1, tmp2, destinationOffset_1, insertIndex, size);
          var tmp0_2 = this.y7q_1;
          var tmp2_0 = this.y7q_1;
          // Inline function 'kotlin.collections.copyInto' call
          var destinationOffset_2 = insertIndex + 1 | 0;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp_1 = tmp0_2;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          arrayCopy(tmp_1, tmp2_0, destinationOffset_2, insertIndex, size);
        }
        this.z7q_1[insertIndex] = new (WeakReference())(value);
        this.y7q_1[insertIndex] = hash;
        this.x7q_1 = this.x7q_1 + 1 | 0;
        return true;
      }
    }
    initMetadataForClass($, 'SnapshotWeakSet', SnapshotWeakSet);
    SnapshotWeakSetClass = $;
  }
  return SnapshotWeakSetClass;
}
//region block: init
androidx_compose_runtime_snapshots_SnapshotWeakSet$stable = 8;
//endregion
//region block: exports
export {
  SnapshotWeakSet as SnapshotWeakSet2le0657uu8slf,
};
//endregion

//# sourceMappingURL=SnapshotWeakSet.mjs.map
