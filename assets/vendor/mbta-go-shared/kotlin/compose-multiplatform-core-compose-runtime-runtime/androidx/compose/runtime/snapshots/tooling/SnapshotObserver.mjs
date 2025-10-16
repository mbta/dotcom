import { wrapIntoSet1nai7omhmas38 as wrapIntoSet } from '../../collection/ScatterSetWrapper.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var observers;
var androidx_compose_runtime_snapshots_tooling_SnapshotInstanceObservers$stable;
function dispatchObserverOnApplied(snapshot, changes) {
  var observers_0 = observers;
  // Inline function 'kotlin.collections.isNullOrEmpty' call
  if (!(observers_0 == null || observers_0.h1())) {
    var tmp1_elvis_lhs = changes == null ? null : wrapIntoSet(changes);
    var wrappedChanges = tmp1_elvis_lhs == null ? emptySet() : tmp1_elvis_lhs;
    // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
    var inductionVariable = 0;
    var last = observers_0.c1() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = observers_0.e1(index);
        item.c7s(snapshot, wrappedChanges);
      }
       while (inductionVariable <= last);
  }
}
function dispatchObserverOnPreDispose(snapshot) {
  var tmp0_safe_receiver = observers;
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
    var inductionVariable = 0;
    var last = tmp0_safe_receiver.c1() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = tmp0_safe_receiver.e1(index);
        item.d7s(snapshot);
      }
       while (inductionVariable <= last);
  }
}
function onCreating(parent, readonly) {
  return null;
}
function onPreCreate(parent, readonly) {
  return this.e7s(parent, readonly);
}
function onCreated(snapshot, parent, observers) {
}
function onDisposing(snapshot) {
}
function onPreDispose(snapshot) {
  return this.h7s(snapshot);
}
function onApplied(snapshot, changed) {
}
var SnapshotObserverClass;
function SnapshotObserver() {
  if (SnapshotObserverClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'SnapshotObserver');
    SnapshotObserverClass = $;
  }
  return SnapshotObserverClass;
}
var SnapshotInstanceObserversClass;
function SnapshotInstanceObservers() {
  if (SnapshotInstanceObserversClass === VOID) {
    class $ {
      constructor(readObserver, writeObserver) {
        readObserver = readObserver === VOID ? null : readObserver;
        writeObserver = writeObserver === VOID ? null : writeObserver;
        this.w7o_1 = readObserver;
        this.x7o_1 = writeObserver;
      }
    }
    initMetadataForClass($, 'SnapshotInstanceObservers', SnapshotInstanceObservers);
    SnapshotInstanceObserversClass = $;
  }
  return SnapshotInstanceObserversClass;
}
function mergeObservers(_this__u8e3s4, parent, readonly, readObserver, writeObserver) {
  var currentReadObserver = readObserver;
  var currentWriteObserver = writeObserver;
  var observerMap = null;
  // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
  var inductionVariable = 0;
  var last = _this__u8e3s4.c1() - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var item = _this__u8e3s4.e1(index);
      var instance = item.f7s(parent, readonly);
      if (!(instance == null)) {
        currentReadObserver = mergeObservers_0(instance.w7o_1, currentReadObserver);
        currentWriteObserver = mergeObservers_0(instance.x7o_1, currentWriteObserver);
        var tmp0_elvis_lhs = observerMap;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.collections.mutableMapOf' call
          var newMap = LinkedHashMap().sc();
          observerMap = newMap;
          tmp = newMap;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        // Inline function 'kotlin.collections.set' call
        tmp.t3(item, instance);
      }
    }
     while (inductionVariable <= last);
  return to(new (SnapshotInstanceObservers())(currentReadObserver, currentWriteObserver), observerMap);
}
function dispatchCreatedObservers(_this__u8e3s4, parent, result, observerMap) {
  // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
  var inductionVariable = 0;
  var last = _this__u8e3s4.c1() - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var item = _this__u8e3s4.e1(index);
      var instance = observerMap == null ? null : observerMap.j3(item);
      item.g7s(result, parent, instance);
    }
     while (inductionVariable <= last);
}
function mergeObservers_0(a, b) {
  var tmp;
  if (!(a == null) && !(b == null)) {
    tmp = mergeObservers$lambda(a, b);
  } else {
    tmp = a == null ? b : a;
  }
  return tmp;
}
function access$_get_observers_$tSnapshotObserverKt_23v7jt() {
  return observers;
}
function mergeObservers$lambda($a, $b) {
  return function (it) {
    $a(it);
    $b(it);
    return Unit_instance;
  };
}
//region block: init
observers = null;
androidx_compose_runtime_snapshots_tooling_SnapshotInstanceObservers$stable = 0;
//endregion
//region block: exports
export {
  dispatchCreatedObservers as dispatchCreatedObserversne5vqtoruyew,
  dispatchObserverOnApplied as dispatchObserverOnApplied2exvlic53j2po,
  dispatchObserverOnPreDispose as dispatchObserverOnPreDisposefk43lrubibji,
  mergeObservers as mergeObservers3tqxjadsqmpn1,
  access$_get_observers_$tSnapshotObserverKt_23v7jt as access$_get_observers_$tSnapshotObserverKt_23v7jt2d88pzj4h6br3,
};
//endregion

//# sourceMappingURL=SnapshotObserver.mjs.map
