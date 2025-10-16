import { MutableDoubleList17zp36gc5asqr as MutableDoubleList } from '../../../../../androidx-collection-collection/androidx/collection/DoubleList.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_snapshots_SnapshotIdArrayBuilder$stable;
function toSnapshotId(_this__u8e3s4) {
  return _this__u8e3s4;
}
function snapshotIdArrayWithCapacity(capacity) {
  return new Float64Array(capacity);
}
function binarySearch(_this__u8e3s4, id) {
  var low = 0;
  var high = _this__u8e3s4.length - 1 | 0;
  while (low <= high) {
    var mid = (low + high | 0) >>> 1 | 0;
    var midVal = _this__u8e3s4[mid];
    if (id > midVal)
      low = mid + 1 | 0;
    else if (id < midVal)
      high = mid - 1 | 0;
    else
      return mid;
  }
  return -(low + 1 | 0) | 0;
}
var SnapshotIdArrayBuilderClass;
function SnapshotIdArrayBuilder() {
  if (SnapshotIdArrayBuilderClass === VOID) {
    class $ {
      constructor(array) {
        var tmp = this;
        var tmp_0;
        if (array == null) {
          tmp_0 = null;
        } else {
          // Inline function 'kotlin.let' call
          // Inline function 'androidx.collection.mutableDoubleListOf' call
          var elements = array.slice();
          // Inline function 'kotlin.apply' call
          var this_0 = new (MutableDoubleList())(elements.length);
          // Inline function 'androidx.collection.MutableDoubleList.plusAssign' call
          this_0.d6b(this_0.x6a_1, elements);
          tmp_0 = this_0;
        }
        var tmp1_elvis_lhs = tmp_0;
        var tmp_1;
        if (tmp1_elvis_lhs == null) {
          // Inline function 'androidx.collection.mutableDoubleListOf' call
          tmp_1 = new (MutableDoubleList())();
        } else {
          tmp_1 = tmp1_elvis_lhs;
        }
        tmp.a7s_1 = tmp_1;
      }
      b7s(id) {
        this.a7s_1.c6b(id);
      }
      s8() {
        // Inline function 'androidx.collection.DoubleList.size' call
        var size = this.a7s_1.x6a_1;
        if (size === 0)
          return null;
        var result = new Float64Array(size);
        // Inline function 'androidx.collection.DoubleList.forEachIndexed' call
        var this_0 = this.a7s_1;
        // Inline function 'kotlin.contracts.contract' call
        var content = this_0.w6a_1;
        var inductionVariable = 0;
        var last = this_0.x6a_1;
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            result[i] = content[i];
          }
           while (inductionVariable < last);
        return result;
      }
    }
    initMetadataForClass($, 'SnapshotIdArrayBuilder');
    SnapshotIdArrayBuilderClass = $;
  }
  return SnapshotIdArrayBuilderClass;
}
function withIdInsertedAt(_this__u8e3s4, index, id) {
  var newSize = _this__u8e3s4.length + 1 | 0;
  var newArray = new Float64Array(newSize);
  // Inline function 'kotlin.collections.copyInto' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp = _this__u8e3s4;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp, newArray, 0, 0, index);
  var tmp4 = index + 1 | 0;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = newSize - 1 | 0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = _this__u8e3s4;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_0, newArray, tmp4, index, endIndex);
  newArray[index] = id;
  return newArray;
}
function withIdRemovedAt(_this__u8e3s4, index) {
  var newSize = _this__u8e3s4.length - 1 | 0;
  if (newSize === 0) {
    return null;
  }
  var newArray = new Float64Array(newSize);
  if (index > 0) {
    // Inline function 'kotlin.collections.copyInto' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = _this__u8e3s4;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, newArray, 0, 0, index);
  }
  if (index < newSize) {
    var tmp6 = index + 1 | 0;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = newSize + 1 | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = _this__u8e3s4;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp_0, newArray, index, tmp6, endIndex);
  }
  return newArray;
}
//region block: init
androidx_compose_runtime_snapshots_SnapshotIdArrayBuilder$stable = 8;
//endregion
//region block: exports
export {
  SnapshotIdArrayBuilder as SnapshotIdArrayBuildermmqxydyw4hvj,
  binarySearch as binarySearch1e9v9nze0vgzk,
  snapshotIdArrayWithCapacity as snapshotIdArrayWithCapacity3phw9pf7ojot7,
  toSnapshotId as toSnapshotId1z37g88mjtrgx,
  withIdInsertedAt as withIdInsertedAtf1wjktllyjru,
  withIdRemovedAt as withIdRemovedAt1thnsbu30tlmc,
};
//endregion

//# sourceMappingURL=SnapshotId.js.mjs.map
