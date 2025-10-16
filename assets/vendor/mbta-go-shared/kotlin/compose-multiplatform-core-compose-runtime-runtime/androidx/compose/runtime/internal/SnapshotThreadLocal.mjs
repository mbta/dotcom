import { AtomicReference2swys664hkpdq as AtomicReference } from './Atomic.nonJvm.mjs';
import { currentThreadIdqb8esmf9h4fr as currentThreadId } from './Thread.web.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { get_MainThreadId3fmd6hh9p7jl8 as get_MainThreadId } from './Thread.nonAndroid.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { longArray288a0fctlmjmj as longArray } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_emptyThreadMap() {
  _init_properties_SnapshotThreadLocal_kt__57olpn();
  return emptyThreadMap;
}
var emptyThreadMap;
var androidx_compose_runtime_internal_SnapshotThreadLocal$stable;
var androidx_compose_runtime_internal_ThreadMap$stable;
var SnapshotThreadLocalClass;
function SnapshotThreadLocal() {
  if (SnapshotThreadLocalClass === VOID) {
    class $ {
      constructor() {
        this.r72_1 = new (AtomicReference())(get_emptyThreadMap());
        var tmp = this;
        // Inline function 'androidx.compose.runtime.platform.makeSynchronizedObject' call
        tmp.s72_1 = null == null ? new Object() : null;
        this.t72_1 = null;
      }
      r29() {
        var threadId = currentThreadId();
        var tmp;
        if (threadId.equals(get_MainThreadId())) {
          tmp = this.t72_1;
        } else {
          var tmp_0 = this.r72_1.r29().o30(threadId);
          tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
        }
        return tmp;
      }
      u72(value) {
        var key = currentThreadId();
        if (key.equals(get_MainThreadId())) {
          this.t72_1 = value;
        } else {
          // Inline function 'androidx.compose.runtime.platform.synchronized' call
          this.s72_1;
          var current = this.r72_1.r29();
          if (current.q7n(key, value))
            return Unit_instance;
          this.r72_1.v2u(current.r7n(key, value));
        }
      }
    }
    initMetadataForClass($, 'SnapshotThreadLocal', SnapshotThreadLocal);
    SnapshotThreadLocalClass = $;
  }
  return SnapshotThreadLocalClass;
}
function find($this, key) {
  var high = $this.n7n_1 - 1 | 0;
  var tmp0_subject = high;
  if (tmp0_subject === -1)
    return -1;
  else if (tmp0_subject === 0)
    return $this.o7n_1[0].equals(key) ? 0 : $this.o7n_1[0].d2(key) > 0 ? -2 : -1;
  var low = 0;
  while (low <= high) {
    var mid = (low + high | 0) >>> 1 | 0;
    var midVal = $this.o7n_1[mid];
    var comparison = midVal.g4(key);
    if (comparison.d2(new (Long())(0, 0)) < 0)
      low = mid + 1 | 0;
    else if (comparison.d2(new (Long())(0, 0)) > 0)
      high = mid - 1 | 0;
    else
      return mid;
  }
  return -(low + 1 | 0) | 0;
}
var ThreadMapClass;
function ThreadMap() {
  if (ThreadMapClass === VOID) {
    class $ {
      constructor(size, keys, values) {
        this.n7n_1 = size;
        this.o7n_1 = keys;
        this.p7n_1 = values;
      }
      o30(key) {
        var index = find(this, key);
        return index >= 0 ? this.p7n_1[index] : null;
      }
      q7n(key, value) {
        var index = find(this, key);
        if (index < 0)
          return false;
        this.p7n_1[index] = value;
        return true;
      }
      r7n(key, value) {
        var size = this.n7n_1;
        // Inline function 'kotlin.collections.count' call
        var count = 0;
        var indexedObject = this.p7n_1;
        var inductionVariable = 0;
        var last = indexedObject.length;
        while (inductionVariable < last) {
          var element = indexedObject[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          if (!(element == null)) {
            count = count + 1 | 0;
          }
        }
        var newSize = count + 1 | 0;
        var newKeys = longArray(newSize);
        // Inline function 'kotlin.arrayOfNulls' call
        var newValues = Array(newSize);
        if (newSize > 1) {
          var dest = 0;
          var source = 0;
          $l$loop: while (dest < newSize && source < size) {
            var oldKey = this.o7n_1[source];
            var oldValue = this.p7n_1[source];
            if (oldKey.d2(key) > 0) {
              newKeys[dest] = key;
              newValues[dest] = value;
              dest = dest + 1 | 0;
              break $l$loop;
            }
            if (!(oldValue == null)) {
              newKeys[dest] = oldKey;
              newValues[dest] = oldValue;
              dest = dest + 1 | 0;
            }
            source = source + 1 | 0;
          }
          if (source === size) {
            newKeys[newSize - 1 | 0] = key;
            newValues[newSize - 1 | 0] = value;
          } else {
            while (dest < newSize) {
              var oldKey_0 = this.o7n_1[source];
              var oldValue_0 = this.p7n_1[source];
              if (!(oldValue_0 == null)) {
                newKeys[dest] = oldKey_0;
                newValues[dest] = oldValue_0;
                dest = dest + 1 | 0;
              }
              source = source + 1 | 0;
            }
          }
        } else {
          newKeys[0] = key;
          newValues[0] = value;
        }
        return new (ThreadMap())(newSize, newKeys, newValues);
      }
    }
    initMetadataForClass($, 'ThreadMap');
    ThreadMapClass = $;
  }
  return ThreadMapClass;
}
var properties_initialized_SnapshotThreadLocal_kt_4q3rql;
function _init_properties_SnapshotThreadLocal_kt__57olpn() {
  if (!properties_initialized_SnapshotThreadLocal_kt_4q3rql) {
    properties_initialized_SnapshotThreadLocal_kt_4q3rql = true;
    var tmp = longArray(0);
    // Inline function 'kotlin.emptyArray' call
    var tmp$ret$0 = [];
    emptyThreadMap = new (ThreadMap())(0, tmp, tmp$ret$0);
    androidx_compose_runtime_internal_SnapshotThreadLocal$stable = 8;
    androidx_compose_runtime_internal_ThreadMap$stable = 8;
  }
}
//region block: exports
export {
  SnapshotThreadLocal as SnapshotThreadLocalkbblyii811mp,
};
//endregion

//# sourceMappingURL=SnapshotThreadLocal.mjs.map
