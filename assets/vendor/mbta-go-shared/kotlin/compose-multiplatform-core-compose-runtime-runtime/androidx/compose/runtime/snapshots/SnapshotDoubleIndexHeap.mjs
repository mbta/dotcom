import { compareTo3ankvs086tmwq as compareTo } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { snapshotIdArrayWithCapacity3phw9pf7ojot7 as snapshotIdArrayWithCapacity } from './SnapshotId.js.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_snapshots_SnapshotDoubleIndexHeap$stable;
function shiftUp($this, index) {
  var values = $this.b7q_1;
  // Inline function 'androidx.compose.runtime.snapshots.get' call
  var value = values[index];
  var current = index;
  $l$loop: while (current > 0) {
    var parent = ((current + 1 | 0) >> 1) - 1 | 0;
    // Inline function 'androidx.compose.runtime.snapshots.get' call
    // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
    var this_0 = values[parent];
    if (compareTo(this_0, value) > 0) {
      swap($this, parent, current);
      current = parent;
      continue $l$loop;
    }
    break $l$loop;
  }
}
function shiftDown($this, index) {
  var values = $this.b7q_1;
  var half = $this.a7q_1 >> 1;
  var current = index;
  while (current < half) {
    var right = (current + 1 | 0) << 1;
    var left = right - 1 | 0;
    var tmp;
    if (right < $this.a7q_1) {
      // Inline function 'androidx.compose.runtime.snapshots.get' call
      var tmp0 = values[right];
      // Inline function 'androidx.compose.runtime.snapshots.get' call
      // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
      var other = values[left];
      tmp = compareTo(tmp0, other) < 0;
    } else {
      tmp = false;
    }
    if (tmp) {
      // Inline function 'androidx.compose.runtime.snapshots.get' call
      var tmp0_0 = values[right];
      // Inline function 'androidx.compose.runtime.snapshots.get' call
      // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
      var other_0 = values[current];
      if (compareTo(tmp0_0, other_0) < 0) {
        swap($this, right, current);
        current = right;
      } else {
        return Unit_instance;
      }
    } else {
      // Inline function 'androidx.compose.runtime.snapshots.get' call
      var tmp0_1 = values[left];
      // Inline function 'androidx.compose.runtime.snapshots.get' call
      // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
      var other_1 = values[current];
      if (compareTo(tmp0_1, other_1) < 0) {
        swap($this, left, current);
        current = left;
      } else {
        return Unit_instance;
      }
    }
  }
}
function swap($this, a, b) {
  var values = $this.b7q_1;
  var index = $this.c7q_1;
  var handles = $this.d7q_1;
  // Inline function 'androidx.compose.runtime.snapshots.get' call
  var t = values[a];
  // Inline function 'androidx.compose.runtime.snapshots.get' call
  // Inline function 'androidx.compose.runtime.snapshots.set' call
  values[a] = values[b];
  // Inline function 'androidx.compose.runtime.snapshots.set' call
  values[b] = t;
  var ia = index[a];
  var ib = index[b];
  index[a] = ib;
  index[b] = ia;
  handles[ib] = a;
  handles[ia] = b;
}
function ensure($this, atLeast) {
  // Inline function 'androidx.compose.runtime.snapshots.size' call
  var capacity = $this.b7q_1.length;
  if (atLeast <= capacity)
    return Unit_instance;
  var newCapacity = imul(capacity, 2);
  var newValues = snapshotIdArrayWithCapacity(newCapacity);
  var newIndex = new Int32Array(newCapacity);
  // Inline function 'androidx.compose.runtime.snapshots.copyInto' call
  // Inline function 'kotlin.collections.copyInto' call
  var this_0 = $this.b7q_1;
  var endIndex = this_0.length;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp = this_0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp, newValues, 0, 0, endIndex);
  // Inline function 'kotlin.collections.copyInto' call
  var this_1 = $this.c7q_1;
  var endIndex_0 = this_1.length;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = this_1;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_0, newIndex, 0, 0, endIndex_0);
  $this.b7q_1 = newValues;
  $this.c7q_1 = newIndex;
}
function allocateHandle($this) {
  var capacity = $this.d7q_1.length;
  if ($this.e7q_1 >= capacity) {
    var tmp = 0;
    var tmp_0 = imul(capacity, 2);
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = tmp_2 + 1 | 0;
      tmp = tmp + 1 | 0;
    }
    var newHandles = tmp_1;
    // Inline function 'kotlin.collections.copyInto' call
    var this_0 = $this.d7q_1;
    var endIndex = this_0.length;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_3 = this_0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp_3, newHandles, 0, 0, endIndex);
    $this.d7q_1 = newHandles;
  }
  var handle = $this.e7q_1;
  $this.e7q_1 = $this.d7q_1[$this.e7q_1];
  return handle;
}
function freeHandle($this, handle) {
  $this.d7q_1[handle] = $this.e7q_1;
  $this.e7q_1 = handle;
}
var SnapshotDoubleIndexHeapClass;
function SnapshotDoubleIndexHeap() {
  if (SnapshotDoubleIndexHeapClass === VOID) {
    class $ {
      constructor() {
        this.a7q_1 = 0;
        this.b7q_1 = snapshotIdArrayWithCapacity(16);
        this.c7q_1 = new Int32Array(16);
        var tmp = this;
        var tmp_0 = 0;
        var tmp_1 = new Int32Array(16);
        while (tmp_0 < 16) {
          var tmp_2 = tmp_0;
          tmp_1[tmp_2] = tmp_2 + 1 | 0;
          tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.d7q_1 = tmp_1;
        this.e7q_1 = 0;
      }
      v7q(default_0) {
        var tmp;
        if (this.a7q_1 > 0) {
          // Inline function 'androidx.compose.runtime.snapshots.get' call
          tmp = this.b7q_1[0];
        } else {
          tmp = default_0;
        }
        return tmp;
      }
      c6b(value) {
        ensure(this, this.a7q_1 + 1 | 0);
        var _unary__edvuaz = this.a7q_1;
        this.a7q_1 = _unary__edvuaz + 1 | 0;
        var i = _unary__edvuaz;
        var handle = allocateHandle(this);
        // Inline function 'androidx.compose.runtime.snapshots.set' call
        this.b7q_1[i] = value;
        this.c7q_1[i] = handle;
        this.d7q_1[handle] = i;
        shiftUp(this, i);
        return handle;
      }
      f7q(handle) {
        var i = this.d7q_1[handle];
        swap(this, i, this.a7q_1 - 1 | 0);
        this.a7q_1 = this.a7q_1 - 1 | 0;
        shiftUp(this, i);
        shiftDown(this, i);
        freeHandle(this, handle);
      }
    }
    initMetadataForClass($, 'SnapshotDoubleIndexHeap', SnapshotDoubleIndexHeap);
    SnapshotDoubleIndexHeapClass = $;
  }
  return SnapshotDoubleIndexHeapClass;
}
//region block: init
androidx_compose_runtime_snapshots_SnapshotDoubleIndexHeap$stable = 8;
//endregion
//region block: exports
export {
  SnapshotDoubleIndexHeap as SnapshotDoubleIndexHeap368mtdgevk4e,
};
//endregion

//# sourceMappingURL=SnapshotDoubleIndexHeap.mjs.map
