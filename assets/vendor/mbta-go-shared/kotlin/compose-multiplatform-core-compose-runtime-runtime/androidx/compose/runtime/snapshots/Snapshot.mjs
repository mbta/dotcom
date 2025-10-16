import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  minus1djrl64vbav3y as minus,
  plus20p0vtfmu0596 as plus,
  contains2gm06f5aa19ov as contains,
  plus310ted5e4i90h as plus_0,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  throwIllegalArgumentExceptionb4z7xzu5xnb8 as throwIllegalArgumentException,
  throwIllegalStateExceptionhmvlq2knnz6m as throwIllegalStateException,
} from '../Preconditions.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Companion_getInstancej1xnadroft92 as Companion_getInstance } from './SnapshotIdSet.mjs';
import {
  access$_get_observers_$tSnapshotObserverKt_23v7jt2d88pzj4h6br3 as access$_get_observers_$tSnapshotObserverKt_23v7jt,
  mergeObservers3tqxjadsqmpn1 as mergeObservers,
  dispatchCreatedObserversne5vqtoruyew as dispatchCreatedObservers,
  dispatchObserverOnApplied2exvlic53j2po as dispatchObserverOnApplied,
  dispatchObserverOnPreDisposefk43lrubibji as dispatchObserverOnPreDispose,
} from './tooling/SnapshotObserver.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { wrapIntoSet1nai7omhmas38 as wrapIntoSet } from '../collection/ScatterSetWrapper.mjs';
import { toSnapshotId1z37g88mjtrgx as toSnapshotId } from './SnapshotId.js.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { primitiveArrayConcatwxgknw08pmlb as primitiveArrayConcat } from '../../../../../kotlin-kotlin-stdlib/noPackageHacks.mjs';
import { mutableScatterSetOfp6qdzgccnsa0 as mutableScatterSetOf } from '../../../../../androidx-collection-collection/androidx/collection/ScatterSet.mjs';
import { unsupported1o3ckaxe4gt0j as unsupported } from './SnapshotStateMap.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import { HashMap1a0ld5kgwhmhv as HashMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/HashMap.mjs';
import { SnapshotThreadLocalkbblyii811mp as SnapshotThreadLocal } from '../internal/SnapshotThreadLocal.mjs';
import { SnapshotDoubleIndexHeap368mtdgevk4e as SnapshotDoubleIndexHeap } from './SnapshotDoubleIndexHeap.mjs';
import { SnapshotWeakSet2le0657uu8slf as SnapshotWeakSet } from './SnapshotWeakSet.mjs';
import { AtomicInt39yq0tdckiqjq as AtomicInt } from '../internal/Atomic.nonJvm.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_emptyLambda() {
  _init_properties_Snapshot_kt__l6n1ng();
  return emptyLambda;
}
var emptyLambda;
function get_INVALID_SNAPSHOT() {
  _init_properties_Snapshot_kt__l6n1ng();
  return INVALID_SNAPSHOT;
}
var INVALID_SNAPSHOT;
function get_threadSnapshot() {
  _init_properties_Snapshot_kt__l6n1ng();
  return threadSnapshot;
}
var threadSnapshot;
function get_lock() {
  _init_properties_Snapshot_kt__l6n1ng();
  return lock;
}
var lock;
function set_openSnapshots(_set____db54di) {
  _init_properties_Snapshot_kt__l6n1ng();
  openSnapshots = _set____db54di;
}
function get_openSnapshots() {
  _init_properties_Snapshot_kt__l6n1ng();
  return openSnapshots;
}
var openSnapshots;
function set_nextSnapshotId(_set____db54di) {
  _init_properties_Snapshot_kt__l6n1ng();
  nextSnapshotId = _set____db54di;
}
function get_nextSnapshotId() {
  _init_properties_Snapshot_kt__l6n1ng();
  return nextSnapshotId;
}
var nextSnapshotId;
function get_pinningTable() {
  _init_properties_Snapshot_kt__l6n1ng();
  return pinningTable;
}
var pinningTable;
function get_extraStateObjects() {
  _init_properties_Snapshot_kt__l6n1ng();
  return extraStateObjects;
}
var extraStateObjects;
function set_applyObservers(_set____db54di) {
  _init_properties_Snapshot_kt__l6n1ng();
  applyObservers = _set____db54di;
}
function get_applyObservers() {
  _init_properties_Snapshot_kt__l6n1ng();
  return applyObservers;
}
var applyObservers;
function set_globalWriteObservers(_set____db54di) {
  _init_properties_Snapshot_kt__l6n1ng();
  globalWriteObservers = _set____db54di;
}
function get_globalWriteObservers() {
  _init_properties_Snapshot_kt__l6n1ng();
  return globalWriteObservers;
}
var globalWriteObservers;
function get_globalSnapshot() {
  _init_properties_Snapshot_kt__l6n1ng();
  return globalSnapshot;
}
var globalSnapshot;
var snapshotInitializer;
function get_pendingApplyObserverCount() {
  _init_properties_Snapshot_kt__l6n1ng();
  return pendingApplyObserverCount;
}
var pendingApplyObserverCount;
var androidx_compose_runtime_snapshots_Snapshot$stable;
var androidx_compose_runtime_snapshots_MutableSnapshot$stable;
var androidx_compose_runtime_snapshots_SnapshotApplyResult_Success$stable;
var androidx_compose_runtime_snapshots_SnapshotApplyResult_Failure$stable;
var androidx_compose_runtime_snapshots_SnapshotApplyResult$stable;
var androidx_compose_runtime_snapshots_SnapshotApplyConflictException$stable;
var androidx_compose_runtime_snapshots_StateRecord$stable;
var androidx_compose_runtime_snapshots_ReadonlySnapshot$stable;
var androidx_compose_runtime_snapshots_NestedReadonlySnapshot$stable;
var androidx_compose_runtime_snapshots_GlobalSnapshot$stable;
var androidx_compose_runtime_snapshots_NestedMutableSnapshot$stable;
var androidx_compose_runtime_snapshots_TransparentObserverMutableSnapshot$stable;
var androidx_compose_runtime_snapshots_TransparentObserverSnapshot$stable;
function mergeRecords(previous, current, applied) {
  return null;
}
var StateObjectClass;
function StateObject() {
  if (StateObjectClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'StateObject');
    StateObjectClass = $;
  }
  return StateObjectClass;
}
var sam$androidx_compose_runtime_snapshots_ObserverHandle$0Class;
function sam$androidx_compose_runtime_snapshots_ObserverHandle$0() {
  if (sam$androidx_compose_runtime_snapshots_ObserverHandle$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.s7n_1 = function_0;
      }
      z24() {
        return this.s7n_1();
      }
      z4() {
        return this.s7n_1;
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, ObserverHandle()) : false) {
          var tmp_0;
          if (!(other == null) ? isInterface(other, FunctionAdapter()) : false) {
            tmp_0 = equals(this.z4(), other.z4());
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.z4());
      }
    }
    initMetadataForClass($, 'sam$androidx_compose_runtime_snapshots_ObserverHandle$0', VOID, VOID, [ObserverHandle(), FunctionAdapter()]);
    sam$androidx_compose_runtime_snapshots_ObserverHandle$0Class = $;
  }
  return sam$androidx_compose_runtime_snapshots_ObserverHandle$0Class;
}
var sam$androidx_compose_runtime_snapshots_ObserverHandle$0Class_0;
function sam$androidx_compose_runtime_snapshots_ObserverHandle$0_0() {
  if (sam$androidx_compose_runtime_snapshots_ObserverHandle$0Class_0 === VOID) {
    class $ {
      constructor(function_0) {
        this.t7n_1 = function_0;
      }
      z24() {
        return this.t7n_1();
      }
      z4() {
        return this.t7n_1;
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, ObserverHandle()) : false) {
          var tmp_0;
          if (!(other == null) ? isInterface(other, FunctionAdapter()) : false) {
            tmp_0 = equals(this.z4(), other.z4());
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.z4());
      }
    }
    initMetadataForClass($, 'sam$androidx_compose_runtime_snapshots_ObserverHandle$0', VOID, VOID, [ObserverHandle(), FunctionAdapter()]);
    sam$androidx_compose_runtime_snapshots_ObserverHandle$0Class_0 = $;
  }
  return sam$androidx_compose_runtime_snapshots_ObserverHandle$0Class_0;
}
function Snapshot$Companion$registerApplyObserver$lambda($observer) {
  return function () {
    // Inline function 'androidx.compose.runtime.snapshots.sync' call
    // Inline function 'androidx.compose.runtime.platform.synchronized' call
    get_lock();
    set_applyObservers(minus(get_applyObservers(), $observer));
    return Unit_instance;
  };
}
function Snapshot$Companion$registerGlobalWriteObserver$lambda($observer) {
  return function () {
    // Inline function 'androidx.compose.runtime.snapshots.sync' call
    // Inline function 'androidx.compose.runtime.platform.synchronized' call
    get_lock();
    set_globalWriteObservers(minus(get_globalWriteObservers(), $observer));
    advanceGlobalSnapshot_0();
    return Unit_instance;
  };
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        this.s75_1 = 1;
      }
      x6i() {
        return currentSnapshot();
      }
      w76(readObserver, writeObserver) {
        var tmp = currentSnapshot();
        var tmp0_safe_receiver = tmp instanceof MutableSnapshot() ? tmp : null;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.u7n(readObserver, writeObserver);
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          var message = 'Cannot create a mutable snapshot of an read-only snapshot';
          throw IllegalStateException().o5(toString(message));
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        return tmp_0;
      }
      f79(observer) {
        advanceGlobalSnapshot(get_emptyLambda());
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        set_applyObservers(plus(get_applyObservers(), observer));
        var tmp = Snapshot$Companion$registerApplyObserver$lambda(observer);
        return new (sam$androidx_compose_runtime_snapshots_ObserverHandle$0())(tmp);
      }
      v7n(observer) {
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        set_globalWriteObservers(plus(get_globalWriteObservers(), observer));
        advanceGlobalSnapshot_0();
        var tmp = Snapshot$Companion$registerGlobalWriteObserver$lambda(observer);
        return new (sam$androidx_compose_runtime_snapshots_ObserverHandle$0_0())(tmp);
      }
      v75() {
        return currentSnapshot().w7n();
      }
      t75() {
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        var changes = get_globalSnapshot().x7n();
        if (changes) {
          advanceGlobalSnapshot_0();
        }
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  return Companion_instance;
}
function access$_get_pinningTrackingHandle__7vwthz($this) {
  return $this.p6t_1;
}
var SnapshotClass;
function Snapshot() {
  if (SnapshotClass === VOID) {
    class $ {
      constructor(snapshotId, invalid) {
        this.m6t_1 = invalid;
        this.n6t_1 = snapshotId;
        this.o6t_1 = false;
        this.p6t_1 = !equals(snapshotId, get_INVALID_SNAPSHOT()) ? trackPinning(snapshotId, this.y7n()) : -1;
      }
      z7n(_set____db54di) {
        this.m6t_1 = _set____db54di;
      }
      y7n() {
        return this.m6t_1;
      }
      a7o(_set____db54di) {
        this.n6t_1 = _set____db54di;
      }
      q6t() {
        return this.n6t_1;
      }
      b7o(value) {
        // Inline function 'kotlin.error' call
        var message = 'Updating write count is not supported for this snapshot';
        throw IllegalStateException().o5(toString(message));
      }
      c7o() {
        return 0;
      }
      z24() {
        this.o6t_1 = true;
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        this.e7o();
      }
      x76() {
        var previous = get_threadSnapshot().r29();
        get_threadSnapshot().u72(this);
        return previous;
      }
      y76(snapshot) {
        get_threadSnapshot().u72(snapshot);
      }
      i7o() {
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        this.j7o();
        this.k7o();
      }
      j7o() {
        set_openSnapshots(get_openSnapshots().p7o(this.q6t()));
      }
      k7o() {
        this.e7o();
      }
      q7o() {
        // Inline function 'androidx.compose.runtime.requirePrecondition' call
        if (!!this.o6t_1) {
          var tmp$ret$0 = 'Cannot use a disposed snapshot';
          throwIllegalArgumentException(tmp$ret$0);
        }
      }
      e7o() {
        if (this.p6t_1 >= 0) {
          releasePinningLocked(this.p6t_1);
          this.p6t_1 = -1;
        }
      }
      r7o() {
        // Inline function 'kotlin.also' call
        var this_0 = this.p6t_1;
        this.p6t_1 = -1;
        return this_0;
      }
    }
    initMetadataForClass($, 'Snapshot');
    SnapshotClass = $;
  }
  return SnapshotClass;
}
var ObserverHandleClass;
function ObserverHandle() {
  if (ObserverHandleClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ObserverHandle');
    ObserverHandleClass = $;
  }
  return ObserverHandleClass;
}
function validateNotApplied($this) {
  // Inline function 'androidx.compose.runtime.checkPrecondition' call
  if (!!$this.s77_1) {
    var tmp$ret$0 = 'Unsupported operation on a snapshot that has been applied';
    throwIllegalStateException(tmp$ret$0);
  }
}
function validateNotAppliedOrPinned($this) {
  var tmp;
  if (!$this.s77_1) {
    tmp = true;
  } else {
    // Inline function 'androidx.compose.runtime.snapshots.Snapshot.isPinned' call
    tmp = access$_get_pinningTrackingHandle__7vwthz($this) >= 0;
  }
  // Inline function 'androidx.compose.runtime.checkPrecondition' call
  if (!tmp) {
    var tmp$ret$1 = 'Unsupported operation on a disposed or applied snapshot';
    throwIllegalStateException(tmp$ret$1);
  }
}
function abandon($this) {
  var modified = $this.s7o();
  if (!(modified == null)) {
    validateNotApplied($this);
    $this.t7o(null);
    var id = $this.q6t();
    // Inline function 'androidx.collection.ScatterSet.forEach' call
    // Inline function 'kotlin.contracts.contract' call
    var elements = modified.j6f_1;
    $l$block: {
      // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m = modified.i6f_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  var tmp = elements[index];
                  var current = ((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE()).e7e();
                  while (!(current == null)) {
                    if (equals(current.c7e_1, id) || contains($this.p77_1, current.c7e_1)) {
                      current.c7e_1 = get_INVALID_SNAPSHOT();
                    }
                    current = current.d7e_1;
                  }
                }
                slot = slot.q4(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
  }
  $this.i7o();
}
function releasePreviouslyPinnedSnapshotsLocked($this) {
  var inductionVariable = 0;
  var last = $this.q77_1.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      releasePinningLocked($this.q77_1[index]);
    }
     while (inductionVariable <= last);
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        this.u7o_1 = new Int32Array(0);
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_1() {
  if (Companion_instance_0 === VOID)
    new (Companion_0())();
  return Companion_instance_0;
}
var MutableSnapshotClass;
function MutableSnapshot() {
  if (MutableSnapshotClass === VOID) {
    class $ extends Snapshot() {
      constructor(snapshotId, invalid, readObserver, writeObserver) {
        Companion_getInstance_1();
        super(snapshotId, invalid);
        this.k77_1 = readObserver;
        this.l77_1 = writeObserver;
        this.m77_1 = 0;
        this.n77_1 = null;
        this.o77_1 = null;
        this.p77_1 = Companion_getInstance().v7o_1;
        this.q77_1 = Companion_getInstance_1().u7o_1;
        this.r77_1 = 1;
        this.s77_1 = false;
      }
      f7o() {
        return this.k77_1;
      }
      g7o() {
        return this.l77_1;
      }
      x7n() {
        var tmp0_safe_receiver = this.s7o();
        return (tmp0_safe_receiver == null ? null : tmp0_safe_receiver.u6d()) === true;
      }
      u7n(readObserver, writeObserver) {
        this.q7o();
        validateNotAppliedOrPinned(this);
        // Inline function 'androidx.compose.runtime.snapshots.tooling.creatingSnapshot' call
        var observerMap = null;
        var observers = access$_get_observers_$tSnapshotObserverKt_23v7jt();
        var actualReadObserver = readObserver;
        var actualWriteObserver = writeObserver;
        if (!(observers == null)) {
          var result = mergeObservers(observers, this, false, readObserver, writeObserver);
          var mappedObservers = result.ah_1;
          actualReadObserver = mappedObservers.w7o_1;
          actualWriteObserver = mappedObservers.x7o_1;
          observerMap = result.bh_1;
        }
        var tmp0 = actualReadObserver;
        var actualWriteObserver_0 = actualWriteObserver;
        // Inline function 'androidx.compose.runtime.snapshots.MutableSnapshot.advance' call
        this.y7o(this.q6t());
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        var newId = get_nextSnapshotId();
        // Inline function 'androidx.compose.runtime.snapshots.plus' call
        var tmp$ret$0 = get_nextSnapshotId() + toLong(1).y4();
        set_nextSnapshotId(tmp$ret$0);
        set_openSnapshots(get_openSnapshots().z7o(newId));
        var currentInvalid = this.y7n();
        this.z7n(currentInvalid.z7o(newId));
        // Inline function 'androidx.compose.runtime.snapshots.plus' call
        var tmp$ret$1 = this.q6t() + toLong(1).y4();
        // Inline function 'kotlin.also' call
        var this_0 = new (NestedMutableSnapshot())(newId, addRange(currentInvalid, tmp$ret$1, newId), mergedReadObserver(tmp0, this.f7o()), mergedWriteObserver(actualWriteObserver_0, this.g7o()), this);
        if (!this.s77_1 && !this.o6t_1) {
          var previousId = this.q6t();
          // Inline function 'androidx.compose.runtime.snapshots.sync' call
          // Inline function 'androidx.compose.runtime.platform.synchronized' call
          get_lock();
          // Inline function 'kotlin.also' call
          var this_1 = access$_get_nextSnapshotId_$tSnapshotKt_vxgvey();
          // Inline function 'androidx.compose.runtime.snapshots.plus' call
          var tmp$ret$6 = access$_get_nextSnapshotId_$tSnapshotKt_vxgvey() + toLong(1).y4();
          access$_set_nextSnapshotId_$tSnapshotKt_xcaltq(tmp$ret$6);
          this.a7o(this_1);
          access$_set_openSnapshots_$tSnapshotKt_9lk9nh(access$_get_openSnapshots_$tSnapshotKt_7cpqp5().z7o(this.q6t()));
          var tmp = this.y7n();
          // Inline function 'androidx.compose.runtime.snapshots.plus' call
          var tmp$ret$12 = previousId + toLong(1).y4();
          this.z7n(addRange(tmp, tmp$ret$12, this.q6t()));
        }
        var result_0 = this_0;
        if (observers == null)
          null;
        else {
          dispatchCreatedObservers(observers, this, result_0, observerMap);
        }
        return result_0;
      }
      t77() {
        var modified = this.s7o();
        var tmp;
        if (!(modified == null)) {
          var globalSnapshot = get_globalSnapshot();
          tmp = optimisticMerges(globalSnapshot.q6t(), this, get_openSnapshots().p7o(globalSnapshot.q6t()));
        } else {
          tmp = null;
        }
        var optimisticMerges_0 = tmp;
        var observers = emptyList();
        var globalModified = null;
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        validateOpen(this);
        if (modified == null || modified.c1() === 0) {
          this.j7o();
          var globalSnapshot_0 = get_globalSnapshot();
          var previousModified = globalSnapshot_0.s7o();
          resetGlobalSnapshotLocked(globalSnapshot_0, get_emptyLambda());
          if (!(previousModified == null) && previousModified.u6d()) {
            observers = get_applyObservers();
            globalModified = previousModified;
          }
        } else {
          var globalSnapshot_1 = get_globalSnapshot();
          var result = this.a7p(get_nextSnapshotId(), modified, optimisticMerges_0, get_openSnapshots().p7o(globalSnapshot_1.q6t()));
          if (!equals(result, Success_getInstance()))
            return result;
          this.j7o();
          var previousModified_0 = globalSnapshot_1.s7o();
          resetGlobalSnapshotLocked(globalSnapshot_1, get_emptyLambda());
          this.t7o(null);
          globalSnapshot_1.t7o(null);
          observers = get_applyObservers();
          globalModified = previousModified_0;
        }
        this.s77_1 = true;
        if (!(globalModified == null)) {
          var nonNullGlobalModified = wrapIntoSet(ensureNotNull(globalModified));
          // Inline function 'kotlin.collections.isNotEmpty' call
          if (!nonNullGlobalModified.h1()) {
            // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
            var this_0 = observers;
            var inductionVariable = 0;
            var last = this_0.c1() - 1 | 0;
            if (inductionVariable <= last)
              do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var item = this_0.e1(index);
                item(nonNullGlobalModified, this);
              }
               while (inductionVariable <= last);
          }
        }
        if (!(modified == null) && modified.u6d()) {
          var modifiedSet = wrapIntoSet(modified);
          // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
          var this_1 = observers;
          var inductionVariable_0 = 0;
          var last_0 = this_1.c1() - 1 | 0;
          if (inductionVariable_0 <= last_0)
            do {
              var index_0 = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var item_0 = this_1.e1(index_0);
              item_0(modifiedSet, this);
            }
             while (inductionVariable_0 <= last_0);
        }
        dispatchObserverOnApplied(this, modified);
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        this.k7o();
        checkAndOverwriteUnusedRecordsLocked();
        var tmp0_safe_receiver = globalModified;
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'androidx.collection.ScatterSet.forEach' call
          // Inline function 'kotlin.contracts.contract' call
          var elements = tmp0_safe_receiver.j6f_1;
          $l$block: {
            // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
            // Inline function 'kotlin.contracts.contract' call
            var m = tmp0_safe_receiver.i6f_1;
            var lastIndex = m.length - 2 | 0;
            var inductionVariable_1 = 0;
            if (inductionVariable_1 <= lastIndex)
              do {
                var i = inductionVariable_1;
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                var slot = m[i];
                // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                var this_2 = slot;
                if (!this_2.s4(this_2.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                  var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                  var inductionVariable_2 = 0;
                  if (inductionVariable_2 < bitCount)
                    do {
                      var j = inductionVariable_2;
                      inductionVariable_2 = inductionVariable_2 + 1 | 0;
                      // Inline function 'androidx.collection.isFull' call
                      if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                        var index_1 = (i << 3) + j | 0;
                        var tmp_0 = elements[index_1];
                        var it = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                        processForUnusedRecordsLocked(it);
                      }
                      slot = slot.q4(8);
                    }
                     while (inductionVariable_2 < bitCount);
                  if (!(bitCount === 8)) {
                    break $l$block;
                  }
                }
              }
               while (!(i === lastIndex));
          }
        }
        if (modified == null)
          null;
        else {
          // Inline function 'androidx.collection.ScatterSet.forEach' call
          // Inline function 'kotlin.contracts.contract' call
          var elements_0 = modified.j6f_1;
          $l$block_0: {
            // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
            // Inline function 'kotlin.contracts.contract' call
            var m_0 = modified.i6f_1;
            var lastIndex_0 = m_0.length - 2 | 0;
            var inductionVariable_3 = 0;
            if (inductionVariable_3 <= lastIndex_0)
              do {
                var i_0 = inductionVariable_3;
                inductionVariable_3 = inductionVariable_3 + 1 | 0;
                var slot_0 = m_0[i_0];
                // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                var this_3 = slot_0;
                if (!this_3.s4(this_3.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                  var bitCount_0 = 8 - (~(i_0 - lastIndex_0 | 0) >>> 31 | 0) | 0;
                  var inductionVariable_4 = 0;
                  if (inductionVariable_4 < bitCount_0)
                    do {
                      var j_0 = inductionVariable_4;
                      inductionVariable_4 = inductionVariable_4 + 1 | 0;
                      // Inline function 'androidx.collection.isFull' call
                      if (slot_0.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                        var index_2 = (i_0 << 3) + j_0 | 0;
                        var tmp_1 = elements_0[index_2];
                        var it_0 = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
                        processForUnusedRecordsLocked(it_0);
                      }
                      slot_0 = slot_0.q4(8);
                    }
                     while (inductionVariable_4 < bitCount_0);
                  if (!(bitCount_0 === 8)) {
                    break $l$block_0;
                  }
                }
              }
               while (!(i_0 === lastIndex_0));
          }
        }
        var tmp2_safe_receiver = this.o77_1;
        if (tmp2_safe_receiver == null)
          null;
        else {
          // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
          var inductionVariable_5 = 0;
          var last_1 = tmp2_safe_receiver.c1() - 1 | 0;
          if (inductionVariable_5 <= last_1)
            do {
              var index_3 = inductionVariable_5;
              inductionVariable_5 = inductionVariable_5 + 1 | 0;
              var item_1 = tmp2_safe_receiver.e1(index_3);
              processForUnusedRecordsLocked(item_1);
            }
             while (inductionVariable_5 <= last_1);
        }
        this.o77_1 = null;
        return Success_getInstance();
      }
      d7o() {
        return false;
      }
      z24() {
        if (!this.o6t_1) {
          super.z24();
          this.b7p(this);
          dispatchObserverOnPreDispose(this);
        }
      }
      c7p(snapshot) {
        this.r77_1 = this.r77_1 + 1 | 0;
      }
      b7p(snapshot) {
        // Inline function 'androidx.compose.runtime.requirePrecondition' call
        if (!(this.r77_1 > 0)) {
          var tmp$ret$0 = 'no pending nested snapshots';
          throwIllegalArgumentException(tmp$ret$0);
        }
        this.r77_1 = this.r77_1 - 1 | 0;
        if (this.r77_1 === 0) {
          if (!this.s77_1) {
            abandon(this);
          }
        }
      }
      w7n() {
        if (this.s77_1 || this.o6t_1)
          return Unit_instance;
        this.d7p();
      }
      j7o() {
        set_openSnapshots(get_openSnapshots().p7o(this.q6t()).e7p(this.p77_1));
      }
      k7o() {
        releasePreviouslyPinnedSnapshotsLocked(this);
        super.k7o();
      }
      a7p(nextId, modified, optimisticMerges, invalidSnapshots) {
        var mergedRecords = null;
        var start = this.y7n().z7o(this.q6t()).f7p(this.p77_1);
        var statesToRemove = null;
        // Inline function 'androidx.collection.ScatterSet.forEach' call
        // Inline function 'kotlin.contracts.contract' call
        var elements = modified.j6f_1;
        $l$block_2: {
          // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
          // Inline function 'kotlin.contracts.contract' call
          var m = modified.i6f_1;
          var lastIndex = m.length - 2 | 0;
          var inductionVariable = 0;
          if (inductionVariable <= lastIndex)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var slot = m[i];
              // Inline function 'androidx.collection.maskEmptyOrDeleted' call
              var this_0 = slot;
              if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                var inductionVariable_0 = 0;
                if (inductionVariable_0 < bitCount)
                  do {
                    var j = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    // Inline function 'androidx.collection.isFull' call
                    if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                      var index = (i << 3) + j | 0;
                      var tmp = elements[index];
                      var tmp0 = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                      $l$block_1: {
                        var first = tmp0.e7e();
                        var tmp0_elvis_lhs = readable(first, nextId, invalidSnapshots);
                        var tmp_0;
                        if (tmp0_elvis_lhs == null) {
                          break $l$block_1;
                        } else {
                          tmp_0 = tmp0_elvis_lhs;
                        }
                        var current = tmp_0;
                        var tmp1_elvis_lhs = readable(first, this.q6t(), start);
                        var tmp_1;
                        if (tmp1_elvis_lhs == null) {
                          break $l$block_1;
                        } else {
                          tmp_1 = tmp1_elvis_lhs;
                        }
                        var previous = tmp_1;
                        if (equals(previous.c7e_1, toSnapshotId(1))) {
                          break $l$block_1;
                        }
                        if (!equals(current, previous)) {
                          var tmp2_elvis_lhs = readable(first, this.q6t(), this.y7n());
                          var tmp_2;
                          if (tmp2_elvis_lhs == null) {
                            readError();
                          } else {
                            tmp_2 = tmp2_elvis_lhs;
                          }
                          var applied = tmp_2;
                          var tmp4_elvis_lhs = optimisticMerges == null ? null : optimisticMerges.j3(current);
                          var tmp_3;
                          if (tmp4_elvis_lhs == null) {
                            // Inline function 'kotlin.run' call
                            tmp_3 = tmp0.g7e(previous, current, applied);
                          } else {
                            tmp_3 = tmp4_elvis_lhs;
                          }
                          var merged = tmp_3;
                          if (merged == null)
                            return new (Failure())(this);
                          else if (!equals(merged, applied))
                            if (equals(merged, current)) {
                              var tmp6_elvis_lhs = mergedRecords;
                              var tmp_4;
                              if (tmp6_elvis_lhs == null) {
                                // Inline function 'kotlin.collections.mutableListOf' call
                                // Inline function 'kotlin.also' call
                                var this_1 = ArrayList().g1();
                                mergedRecords = this_1;
                                tmp_4 = this_1;
                              } else {
                                tmp_4 = tmp6_elvis_lhs;
                              }
                              tmp_4.i(to(tmp0, current.y7d(this.q6t())));
                              var tmp7_elvis_lhs = statesToRemove;
                              var tmp_5;
                              if (tmp7_elvis_lhs == null) {
                                // Inline function 'kotlin.collections.mutableListOf' call
                                // Inline function 'kotlin.also' call
                                var this_2 = ArrayList().g1();
                                statesToRemove = this_2;
                                tmp_5 = this_2;
                              } else {
                                tmp_5 = tmp7_elvis_lhs;
                              }
                              tmp_5.i(tmp0);
                            } else {
                              var tmp8_elvis_lhs = mergedRecords;
                              var tmp_6;
                              if (tmp8_elvis_lhs == null) {
                                // Inline function 'kotlin.collections.mutableListOf' call
                                // Inline function 'kotlin.also' call
                                var this_3 = ArrayList().g1();
                                mergedRecords = this_3;
                                tmp_6 = this_3;
                              } else {
                                tmp_6 = tmp8_elvis_lhs;
                              }
                              tmp_6.i(!equals(merged, previous) ? to(tmp0, merged) : to(tmp0, previous.y7d(this.q6t())));
                            }
                        }
                      }
                    }
                    slot = slot.q4(8);
                  }
                   while (inductionVariable_0 < bitCount);
                if (!(bitCount === 8)) {
                  break $l$block_2;
                }
              }
            }
             while (!(i === lastIndex));
        }
        var tmp0_safe_receiver = mergedRecords;
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          this.d7p();
          // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
          var inductionVariable_1 = 0;
          var last = tmp0_safe_receiver.c1() - 1 | 0;
          if (inductionVariable_1 <= last)
            do {
              var index_0 = inductionVariable_1;
              inductionVariable_1 = inductionVariable_1 + 1 | 0;
              var item = tmp0_safe_receiver.e1(index_0);
              var state = item.ch();
              var stateRecord = item.dh();
              stateRecord.c7e_1 = nextId;
              // Inline function 'androidx.compose.runtime.snapshots.sync' call
              // Inline function 'androidx.compose.runtime.platform.synchronized' call
              get_lock();
              stateRecord.d7e_1 = state.e7e();
              state.f7e(stateRecord);
            }
             while (inductionVariable_1 <= last);
        }
        var tmp1_safe_receiver = statesToRemove;
        if (tmp1_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
          var inductionVariable_2 = 0;
          var last_0 = tmp1_safe_receiver.c1() - 1 | 0;
          if (inductionVariable_2 <= last_0)
            do {
              var index_1 = inductionVariable_2;
              inductionVariable_2 = inductionVariable_2 + 1 | 0;
              var item_0 = tmp1_safe_receiver.e1(index_1);
              modified.m3(item_0);
            }
             while (inductionVariable_2 <= last_0);
          var mergedList = this.o77_1;
          this.o77_1 = mergedList == null ? tmp1_safe_receiver : plus_0(mergedList, tmp1_safe_receiver);
        }
        return Success_getInstance();
      }
      d7p() {
        // Inline function 'androidx.compose.runtime.snapshots.MutableSnapshot.advance' call
        this.y7o(this.q6t());
        // Inline function 'kotlin.also' call
        if (!this.s77_1 && !this.o6t_1) {
          var previousId = this.q6t();
          // Inline function 'androidx.compose.runtime.snapshots.sync' call
          // Inline function 'androidx.compose.runtime.platform.synchronized' call
          get_lock();
          // Inline function 'kotlin.also' call
          var this_0 = access$_get_nextSnapshotId_$tSnapshotKt_vxgvey();
          // Inline function 'androidx.compose.runtime.snapshots.plus' call
          var tmp$ret$1 = access$_get_nextSnapshotId_$tSnapshotKt_vxgvey() + toLong(1).y4();
          access$_set_nextSnapshotId_$tSnapshotKt_xcaltq(tmp$ret$1);
          this.a7o(this_0);
          access$_set_openSnapshots_$tSnapshotKt_9lk9nh(access$_get_openSnapshots_$tSnapshotKt_7cpqp5().z7o(this.q6t()));
          var tmp = this.y7n();
          // Inline function 'androidx.compose.runtime.snapshots.plus' call
          var tmp$ret$7 = previousId + toLong(1).y4();
          this.z7n(addRange(tmp, tmp$ret$7, this.q6t()));
        }
        return Unit_instance;
      }
      y7o(id) {
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        this.p77_1 = this.p77_1.z7o(id);
      }
      g7p(id) {
        if (id >= 0) {
          var tmp = this;
          // Inline function 'kotlin.collections.plus' call
          var tmp0 = this.q77_1;
          // Inline function 'kotlin.intArrayOf' call
          // Inline function 'kotlin.collections.plus' call
          var elements = new Int32Array([id]);
          tmp.q77_1 = primitiveArrayConcat([tmp0, elements]);
        }
      }
      h7p(handles) {
        // Inline function 'kotlin.collections.isEmpty' call
        if (handles.length === 0)
          return Unit_instance;
        var pinned = this.q77_1;
        var tmp = this;
        var tmp_0;
        // Inline function 'kotlin.collections.isEmpty' call
        if (pinned.length === 0) {
          tmp_0 = handles;
        } else {
          // Inline function 'kotlin.collections.plus' call
          tmp_0 = primitiveArrayConcat([pinned, handles]);
        }
        tmp.q77_1 = tmp_0;
      }
      i7p(snapshots) {
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        this.p77_1 = this.p77_1.f7p(snapshots);
      }
      h7o(state) {
        var tmp0_elvis_lhs = this.s7o();
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = mutableScatterSetOf();
          this.t7o(this_0);
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp.i(state);
      }
      b7o(_set____db54di) {
        this.m77_1 = _set____db54di;
      }
      c7o() {
        return this.m77_1;
      }
      t7o(_set____db54di) {
        this.n77_1 = _set____db54di;
      }
      s7o() {
        return this.n77_1;
      }
    }
    initMetadataForClass($, 'MutableSnapshot');
    MutableSnapshotClass = $;
  }
  return MutableSnapshotClass;
}
var SuccessClass;
function Success() {
  if (SuccessClass === VOID) {
    class $ extends SnapshotApplyResult() {
      constructor() {
        Success_instance = null;
        super();
        Success_instance = this;
      }
    }
    initMetadataForObject($, 'Success');
    SuccessClass = $;
  }
  return SuccessClass;
}
var Success_instance;
function Success_getInstance() {
  if (Success_instance === VOID)
    new (Success())();
  return Success_instance;
}
var FailureClass;
function Failure() {
  if (FailureClass === VOID) {
    class $ extends SnapshotApplyResult() {
      constructor(snapshot) {
        super();
        this.j7p_1 = snapshot;
      }
    }
    initMetadataForClass($, 'Failure');
    FailureClass = $;
  }
  return FailureClass;
}
var SnapshotApplyResultClass;
function SnapshotApplyResult() {
  if (SnapshotApplyResultClass === VOID) {
    class $ {}
    initMetadataForClass($, 'SnapshotApplyResult');
    SnapshotApplyResultClass = $;
  }
  return SnapshotApplyResultClass;
}
function GlobalSnapshot$_init_$lambda_36kgl8(state) {
  // Inline function 'androidx.compose.runtime.snapshots.sync' call
  // Inline function 'androidx.compose.runtime.platform.synchronized' call
  get_lock();
  // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
  var this_0 = get_globalWriteObservers();
  var inductionVariable = 0;
  var last = this_0.c1() - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var item = this_0.e1(index);
      item(state);
    }
     while (inductionVariable <= last);
  return Unit_instance;
}
function GlobalSnapshot$takeNestedMutableSnapshot$lambda($actualReadObserver, $actualWriteObserver) {
  return function (invalid) {
    // Inline function 'androidx.compose.runtime.snapshots.sync' call
    // Inline function 'androidx.compose.runtime.platform.synchronized' call
    get_lock();
    // Inline function 'kotlin.also' call
    var this_0 = get_nextSnapshotId();
    // Inline function 'androidx.compose.runtime.snapshots.plus' call
    var tmp$ret$0 = get_nextSnapshotId() + toLong(1).y4();
    set_nextSnapshotId(tmp$ret$0);
    return new (MutableSnapshot())(this_0, invalid, $actualReadObserver, $actualWriteObserver);
  };
}
var GlobalSnapshotClass;
function GlobalSnapshot() {
  if (GlobalSnapshotClass === VOID) {
    class $ extends MutableSnapshot() {
      constructor(snapshotId, invalid) {
        super(snapshotId, invalid, null, GlobalSnapshot$_init_$lambda_36kgl8);
      }
      u7n(readObserver, writeObserver) {
        // Inline function 'androidx.compose.runtime.snapshots.tooling.creatingSnapshot' call
        var observerMap = null;
        var observers = access$_get_observers_$tSnapshotObserverKt_23v7jt();
        var actualReadObserver = readObserver;
        var actualWriteObserver = writeObserver;
        if (!(observers == null)) {
          var result = mergeObservers(observers, null, false, readObserver, writeObserver);
          var mappedObservers = result.ah_1;
          actualReadObserver = mappedObservers.w7o_1;
          actualWriteObserver = mappedObservers.x7o_1;
          observerMap = result.bh_1;
        }
        var tmp0 = actualReadObserver;
        var actualWriteObserver_0 = actualWriteObserver;
        var result_0 = takeNewSnapshot(GlobalSnapshot$takeNestedMutableSnapshot$lambda(tmp0, actualWriteObserver_0));
        if (observers == null)
          null;
        else {
          dispatchCreatedObservers(observers, null, result_0, observerMap);
        }
        return result_0;
      }
      w7n() {
        advanceGlobalSnapshot_0();
      }
      x7p(snapshot) {
        unsupported();
      }
      b7p(snapshot) {
        return this.x7p(snapshot);
      }
      y7p(snapshot) {
        unsupported();
      }
      c7p(snapshot) {
        return this.y7p(snapshot);
      }
      t77() {
        var message = 'Cannot apply the global snapshot directly. Call Snapshot.advanceGlobalSnapshot';
        throw IllegalStateException().o5(toString(message));
      }
      z24() {
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        this.e7o();
      }
    }
    initMetadataForClass($, 'GlobalSnapshot');
    GlobalSnapshotClass = $;
  }
  return GlobalSnapshotClass;
}
var StateRecordClass;
function StateRecord() {
  if (StateRecordClass === VOID) {
    class $ {
      constructor(snapshotId) {
        this.c7e_1 = snapshotId;
        this.d7e_1 = null;
      }
      y7d(snapshotId) {
        // Inline function 'kotlin.also' call
        var this_0 = this.x7d();
        this_0.c7e_1 = snapshotId;
        return this_0;
      }
    }
    initMetadataForClass($, 'StateRecord');
    StateRecordClass = $;
  }
  return StateRecordClass;
}
function trackPinning(snapshotId, invalid) {
  _init_properties_Snapshot_kt__l6n1ng();
  var pinned = invalid.z7p(snapshotId);
  // Inline function 'androidx.compose.runtime.snapshots.sync' call
  // Inline function 'androidx.compose.runtime.platform.synchronized' call
  get_lock();
  return get_pinningTable().c6b(pinned);
}
function releasePinningLocked(handle) {
  _init_properties_Snapshot_kt__l6n1ng();
  get_pinningTable().f7q(handle);
}
function currentSnapshot() {
  _init_properties_Snapshot_kt__l6n1ng();
  var tmp0_elvis_lhs = get_threadSnapshot().r29();
  return tmp0_elvis_lhs == null ? get_globalSnapshot() : tmp0_elvis_lhs;
}
function mergedReadObserver(readObserver, parentObserver, mergeReadObserver) {
  mergeReadObserver = mergeReadObserver === VOID ? true : mergeReadObserver;
  _init_properties_Snapshot_kt__l6n1ng();
  var parentObserver_0 = mergeReadObserver ? parentObserver : null;
  var tmp;
  if (!(readObserver == null) && !(parentObserver_0 == null) && !(readObserver === parentObserver_0)) {
    tmp = mergedReadObserver$lambda(readObserver, parentObserver_0);
  } else {
    tmp = readObserver == null ? parentObserver_0 : readObserver;
  }
  return tmp;
}
function mergedWriteObserver(writeObserver, parentObserver) {
  _init_properties_Snapshot_kt__l6n1ng();
  var tmp;
  if (!(writeObserver == null) && !(parentObserver == null) && !(writeObserver === parentObserver)) {
    tmp = mergedWriteObserver$lambda(writeObserver, parentObserver);
  } else {
    tmp = writeObserver == null ? parentObserver : writeObserver;
  }
  return tmp;
}
function advanceGlobalSnapshot(block) {
  _init_properties_Snapshot_kt__l6n1ng();
  var globalSnapshot = get_globalSnapshot();
  var modified;
  // Inline function 'androidx.compose.runtime.snapshots.sync' call
  // Inline function 'androidx.compose.runtime.platform.synchronized' call
  get_lock();
  modified = globalSnapshot.s7o();
  if (!(modified == null)) {
    get_pendingApplyObserverCount().c6c(1);
  }
  var result = resetGlobalSnapshotLocked(globalSnapshot, block);
  if (modified == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    try {
      var observers = get_applyObservers();
      // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
      var inductionVariable = 0;
      var last = observers.c1() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = observers.e1(index);
          item(wrapIntoSet(modified), globalSnapshot);
        }
         while (inductionVariable <= last);
    }finally {
      get_pendingApplyObserverCount().c6c(-1);
    }
  }
  // Inline function 'androidx.compose.runtime.snapshots.sync' call
  // Inline function 'androidx.compose.runtime.platform.synchronized' call
  get_lock();
  checkAndOverwriteUnusedRecordsLocked();
  var tmp;
  if (modified == null) {
    tmp = null;
  } else {
    // Inline function 'androidx.collection.ScatterSet.forEach' call
    // Inline function 'kotlin.contracts.contract' call
    var elements = modified.j6f_1;
    $l$block: {
      // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m = modified.i6f_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable_0 = 0;
      if (inductionVariable_0 <= lastIndex)
        do {
          var i = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_1 = 0;
            if (inductionVariable_1 < bitCount)
              do {
                var j = inductionVariable_1;
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                  var index_0 = (i << 3) + j | 0;
                  var tmp_0 = elements[index_0];
                  var it = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                  processForUnusedRecordsLocked(it);
                }
                slot = slot.q4(8);
              }
               while (inductionVariable_1 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    tmp = Unit_instance;
  }
  return result;
}
function advanceGlobalSnapshot_0() {
  _init_properties_Snapshot_kt__l6n1ng();
  return advanceGlobalSnapshot(get_emptyLambda());
}
function deactivate($this) {
  if (!$this.u7q_1) {
    $this.u7q_1 = true;
    $this.t7q_1.b7p($this);
  }
}
var NestedMutableSnapshotClass;
function NestedMutableSnapshot() {
  if (NestedMutableSnapshotClass === VOID) {
    class $ extends MutableSnapshot() {
      constructor(snapshotId, invalid, readObserver, writeObserver, parent) {
        super(snapshotId, invalid, readObserver, writeObserver);
        this.t7q_1 = parent;
        this.u7q_1 = false;
        this.t7q_1.c7p(this);
      }
      z24() {
        if (!this.o6t_1) {
          super.z24();
          deactivate(this);
        }
      }
      t77() {
        if (this.t7q_1.s77_1 || this.t7q_1.o6t_1)
          return new (Failure())(this);
        var modified = this.s7o();
        var id = this.q6t();
        var optimisticMerges_0 = !(modified == null) ? optimisticMerges(this.t7q_1.q6t(), this, this.t7q_1.y7n()) : null;
        // Inline function 'androidx.compose.runtime.snapshots.sync' call
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        get_lock();
        validateOpen(this);
        if (modified == null || modified.c1() === 0) {
          this.i7o();
        } else {
          var result = this.a7p(this.t7q_1.q6t(), modified, optimisticMerges_0, this.t7q_1.y7n());
          if (!equals(result, Success_getInstance()))
            return result;
          var tmp0_safe_receiver = this.t7q_1.s7o();
          var tmp;
          if (tmp0_safe_receiver == null) {
            tmp = null;
          } else {
            // Inline function 'kotlin.apply' call
            tmp0_safe_receiver.u6f(modified);
            tmp = tmp0_safe_receiver;
          }
          if (tmp == null) {
            // Inline function 'kotlin.also' call
            this.t7q_1.t7o(modified);
            this.t7o(null);
          }
        }
        // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
        var this_0 = this.t7q_1.q6t();
        if (compareTo(this_0, id) < 0) {
          this.t7q_1.d7p();
        }
        this.t7q_1.z7n(this.t7q_1.y7n().p7o(id).e7p(this.p77_1));
        this.t7q_1.y7o(id);
        this.t7q_1.g7p(this.r7o());
        this.t7q_1.i7p(this.p77_1);
        this.t7q_1.h7p(this.q77_1);
        this.s77_1 = true;
        deactivate(this);
        dispatchObserverOnApplied(this, modified);
        return Success_getInstance();
      }
    }
    initMetadataForClass($, 'NestedMutableSnapshot');
    NestedMutableSnapshotClass = $;
  }
  return NestedMutableSnapshotClass;
}
function addRange(_this__u8e3s4, from, until) {
  _init_properties_Snapshot_kt__l6n1ng();
  var result = _this__u8e3s4;
  var invalidId = from;
  $l$loop: while (true) {
    // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
    var this_0 = invalidId;
    if (!(compareTo(this_0, until) < 0)) {
      break $l$loop;
    }
    result = result.z7o(invalidId);
    // Inline function 'androidx.compose.runtime.snapshots.plus' call
    invalidId = invalidId + toLong(1).y4();
  }
  return result;
}
function optimisticMerges(currentSnapshotId, applyingSnapshot, invalidSnapshots) {
  _init_properties_Snapshot_kt__l6n1ng();
  var modified = applyingSnapshot.s7o();
  if (modified == null)
    return null;
  var start = applyingSnapshot.y7n().z7o(applyingSnapshot.q6t()).f7p(applyingSnapshot.p77_1);
  var result = null;
  // Inline function 'androidx.collection.ScatterSet.forEach' call
  // Inline function 'kotlin.contracts.contract' call
  var elements = modified.j6f_1;
  $l$block_1: {
    // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
    // Inline function 'kotlin.contracts.contract' call
    var m = modified.i6f_1;
    var lastIndex = m.length - 2 | 0;
    var inductionVariable = 0;
    if (inductionVariable <= lastIndex)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slot = m[i];
        // Inline function 'androidx.collection.maskEmptyOrDeleted' call
        var this_0 = slot;
        if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
          var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
          var inductionVariable_0 = 0;
          if (inductionVariable_0 < bitCount)
            do {
              var j = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              // Inline function 'androidx.collection.isFull' call
              if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                var index = (i << 3) + j | 0;
                var tmp = elements[index];
                var tmp0 = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                $l$block_0: {
                  var first = tmp0.e7e();
                  var tmp0_elvis_lhs = readable(first, currentSnapshotId, invalidSnapshots);
                  var tmp_0;
                  if (tmp0_elvis_lhs == null) {
                    break $l$block_0;
                  } else {
                    tmp_0 = tmp0_elvis_lhs;
                  }
                  var current = tmp_0;
                  var tmp1_elvis_lhs = readable(first, currentSnapshotId, start);
                  var tmp_1;
                  if (tmp1_elvis_lhs == null) {
                    break $l$block_0;
                  } else {
                    tmp_1 = tmp1_elvis_lhs;
                  }
                  var previous = tmp_1;
                  if (!equals(current, previous)) {
                    var tmp2_elvis_lhs = readable(first, applyingSnapshot.q6t(), applyingSnapshot.y7n());
                    var tmp_2;
                    if (tmp2_elvis_lhs == null) {
                      readError();
                    } else {
                      tmp_2 = tmp2_elvis_lhs;
                    }
                    var applied = tmp_2;
                    var merged = tmp0.g7e(previous, current, applied);
                    if (!(merged == null)) {
                      var tmp3_elvis_lhs = result;
                      var tmp_3;
                      if (tmp3_elvis_lhs == null) {
                        // Inline function 'kotlin.collections.hashMapOf' call
                        // Inline function 'kotlin.also' call
                        var this_1 = HashMap().a9();
                        result = this_1;
                        tmp_3 = this_1;
                      } else {
                        tmp_3 = tmp3_elvis_lhs;
                      }
                      // Inline function 'kotlin.collections.set' call
                      tmp_3.t3(current, merged);
                    } else {
                      return null;
                    }
                  }
                }
              }
              slot = slot.q4(8);
            }
             while (inductionVariable_0 < bitCount);
          if (!(bitCount === 8)) {
            break $l$block_1;
          }
        }
      }
       while (!(i === lastIndex));
  }
  return result;
}
function validateOpen(snapshot) {
  _init_properties_Snapshot_kt__l6n1ng();
  var openSnapshots = get_openSnapshots();
  if (!openSnapshots.w7q(snapshot.q6t())) {
    var tmp = snapshot.q6t();
    var tmp_0 = snapshot.o6t_1;
    var tmp0_safe_receiver = snapshot instanceof MutableSnapshot() ? snapshot : null;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.s77_1;
    var tmp_1 = toString(tmp1_elvis_lhs == null ? 'read-only' : tmp1_elvis_lhs);
    // Inline function 'androidx.compose.runtime.snapshots.sync' call
    // Inline function 'androidx.compose.runtime.platform.synchronized' call
    get_lock();
    // Inline function 'kotlin.error' call
    var message = 'Snapshot is not open: snapshotId=' + tmp + ', disposed=' + tmp_0 + ', applied=' + tmp_1 + ', lowestPin=' + get_pinningTable().v7q(-1.0);
    throw IllegalStateException().o5(toString(message));
  }
}
function resetGlobalSnapshotLocked(globalSnapshot, block) {
  _init_properties_Snapshot_kt__l6n1ng();
  var snapshotId = globalSnapshot.q6t();
  var result = block(get_openSnapshots().p7o(snapshotId));
  var nextGlobalSnapshotId = get_nextSnapshotId();
  // Inline function 'androidx.compose.runtime.snapshots.plus' call
  var tmp$ret$0 = get_nextSnapshotId() + toLong(1).y4();
  set_nextSnapshotId(tmp$ret$0);
  set_openSnapshots(get_openSnapshots().p7o(snapshotId));
  globalSnapshot.a7o(nextGlobalSnapshotId);
  globalSnapshot.z7n(get_openSnapshots());
  globalSnapshot.b7o(0);
  globalSnapshot.t7o(null);
  globalSnapshot.e7o();
  set_openSnapshots(get_openSnapshots().z7o(nextGlobalSnapshotId));
  return result;
}
function checkAndOverwriteUnusedRecordsLocked() {
  _init_properties_Snapshot_kt__l6n1ng();
  // Inline function 'androidx.compose.runtime.snapshots.SnapshotWeakSet.removeIf' call
  var this_0 = get_extraStateObjects();
  var size = this_0.x7q_1;
  var currentUsed = 0;
  var inductionVariable = 0;
  if (inductionVariable < size)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var entry = this_0.z7q_1[i];
      var value = entry == null ? null : entry.r29();
      var tmp;
      if (!(value == null)) {
        tmp = !!overwriteUnusedRecordsLocked(value);
      } else {
        tmp = false;
      }
      if (tmp) {
        if (!(currentUsed === i)) {
          this_0.z7q_1[currentUsed] = entry;
          this_0.y7q_1[currentUsed] = this_0.y7q_1[i];
        }
        currentUsed = currentUsed + 1 | 0;
      }
    }
     while (inductionVariable < size);
  var inductionVariable_0 = currentUsed;
  if (inductionVariable_0 < size)
    do {
      var i_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      this_0.z7q_1[i_0] = null;
      this_0.y7q_1[i_0] = 0;
    }
     while (inductionVariable_0 < size);
  if (!(currentUsed === size)) {
    this_0.x7q_1 = currentUsed;
  }
}
function processForUnusedRecordsLocked(state) {
  _init_properties_Snapshot_kt__l6n1ng();
  if (overwriteUnusedRecordsLocked(state)) {
    get_extraStateObjects().b7r(state);
  }
}
function readable(r, id, invalid) {
  _init_properties_Snapshot_kt__l6n1ng();
  var current = r;
  var candidate = null;
  while (!(current == null)) {
    if (valid(current, id, invalid)) {
      var tmp;
      if (candidate == null) {
        tmp = current;
      } else {
        var tmp0 = candidate.c7e_1;
        // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
        var other = current.c7e_1;
        if (compareTo(tmp0, other) < 0) {
          tmp = current;
        } else {
          tmp = candidate;
        }
      }
      candidate = tmp;
    }
    current = current.d7e_1;
  }
  if (!(candidate == null)) {
    return candidate instanceof StateRecord() ? candidate : THROW_CCE();
  }
  return null;
}
function readError() {
  _init_properties_Snapshot_kt__l6n1ng();
  // Inline function 'kotlin.error' call
  var message = 'Reading a state that was created after the snapshot was taken or in a snapshot that has not yet been applied';
  throw IllegalStateException().o5(toString(message));
}
function takeNewSnapshot(block) {
  _init_properties_Snapshot_kt__l6n1ng();
  return advanceGlobalSnapshot(takeNewSnapshot$lambda(block));
}
function overwriteUnusedRecordsLocked(state) {
  _init_properties_Snapshot_kt__l6n1ng();
  var current = state.e7e();
  var overwriteRecord = null;
  var validRecord = null;
  var reuseLimit = get_pinningTable().v7q(get_nextSnapshotId());
  var retainedRecords = 0;
  while (!(current == null)) {
    var currentId = current.c7e_1;
    if (!equals(currentId, get_INVALID_SNAPSHOT())) {
      // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
      if (compareTo(currentId, reuseLimit) < 0) {
        if (validRecord == null) {
          validRecord = current;
          retainedRecords = retainedRecords + 1 | 0;
        } else {
          var tmp;
          var tmp0 = current.c7e_1;
          // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
          var other = validRecord.c7e_1;
          if (compareTo(tmp0, other) < 0) {
            tmp = current;
          } else {
            var result = validRecord;
            validRecord = current;
            tmp = result;
          }
          var recordToOverwrite = tmp;
          if (overwriteRecord == null) {
            var tmp0_0 = state.e7e();
            var tmp$ret$4;
            $l$block: {
              // Inline function 'androidx.compose.runtime.snapshots.findYoungestOr' call
              var current_0 = tmp0_0;
              var youngest = tmp0_0;
              while (!(current_0 == null)) {
                // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
                var this_0 = current_0.c7e_1;
                if (compareTo(this_0, reuseLimit) >= 0) {
                  tmp$ret$4 = current_0;
                  break $l$block;
                }
                var tmp0_1 = youngest.c7e_1;
                // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
                var other_0 = current_0.c7e_1;
                if (compareTo(tmp0_1, other_0) < 0)
                  youngest = current_0;
                current_0 = current_0.d7e_1;
              }
              tmp$ret$4 = youngest;
            }
            overwriteRecord = tmp$ret$4;
          }
          recordToOverwrite.c7e_1 = get_INVALID_SNAPSHOT();
          recordToOverwrite.w7d(overwriteRecord);
        }
      } else {
        retainedRecords = retainedRecords + 1 | 0;
      }
    }
    current = current.d7e_1;
  }
  return retainedRecords > 1;
}
function valid(data, snapshot, invalid) {
  _init_properties_Snapshot_kt__l6n1ng();
  return valid_0(snapshot, data.c7e_1, invalid);
}
function valid_0(currentSnapshot, candidateSnapshot, invalid) {
  _init_properties_Snapshot_kt__l6n1ng();
  var tmp;
  var tmp_0;
  if (!equals(candidateSnapshot, get_INVALID_SNAPSHOT())) {
    // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
    tmp_0 = compareTo(candidateSnapshot, currentSnapshot) <= 0;
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = !invalid.w7q(candidateSnapshot);
  } else {
    tmp = false;
  }
  return tmp;
}
function readable_0(_this__u8e3s4, state) {
  _init_properties_Snapshot_kt__l6n1ng();
  var snapshot = Companion_instance.x6i();
  var tmp0_safe_receiver = snapshot.f7o();
  if (tmp0_safe_receiver == null)
    null;
  else
    tmp0_safe_receiver(state);
  var tmp1_elvis_lhs = readable(_this__u8e3s4, snapshot.q6t(), snapshot.y7n());
  var tmp;
  if (tmp1_elvis_lhs == null) {
    // Inline function 'androidx.compose.runtime.snapshots.sync' call
    // Inline function 'androidx.compose.runtime.platform.synchronized' call
    get_lock();
    var syncSnapshot = Companion_instance.x6i();
    var tmp_0 = state.e7e();
    var tmp0_elvis_lhs = readable(tmp_0 instanceof StateRecord() ? tmp_0 : THROW_CCE(), syncSnapshot.q6t(), syncSnapshot.y7n());
    var tmp_1;
    if (tmp0_elvis_lhs == null) {
      readError();
    } else {
      tmp_1 = tmp0_elvis_lhs;
    }
    tmp = tmp_1;
  } else {
    tmp = tmp1_elvis_lhs;
  }
  return tmp;
}
function current(r) {
  _init_properties_Snapshot_kt__l6n1ng();
  // Inline function 'kotlin.let' call
  var snapshot = Companion_instance.x6i();
  var tmp0_elvis_lhs = readable(r, snapshot.q6t(), snapshot.y7n());
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'androidx.compose.runtime.snapshots.sync' call
    // Inline function 'androidx.compose.runtime.platform.synchronized' call
    get_lock();
    // Inline function 'kotlin.let' call
    var syncSnapshot = Companion_instance.x6i();
    tmp = readable(r, syncSnapshot.q6t(), syncSnapshot.y7n());
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var tmp1_elvis_lhs = tmp;
  var tmp_0;
  if (tmp1_elvis_lhs == null) {
    readError();
  } else {
    tmp_0 = tmp1_elvis_lhs;
  }
  return tmp_0;
}
function overwritableRecord(_this__u8e3s4, state, snapshot, candidate) {
  _init_properties_Snapshot_kt__l6n1ng();
  if (snapshot.d7o()) {
    snapshot.h7o(state);
  }
  var id = snapshot.q6t();
  if (equals(candidate.c7e_1, id))
    return candidate;
  // Inline function 'androidx.compose.runtime.snapshots.sync' call
  // Inline function 'androidx.compose.runtime.platform.synchronized' call
  get_lock();
  var newData = newOverwritableRecordLocked(_this__u8e3s4, state);
  newData.c7e_1 = id;
  if (!equals(candidate.c7e_1, toSnapshotId(1))) {
    snapshot.h7o(state);
  }
  return newData;
}
function notifyWrite(snapshot, state) {
  _init_properties_Snapshot_kt__l6n1ng();
  snapshot.b7o(snapshot.c7o() + 1 | 0);
  var tmp0_safe_receiver = snapshot.g7o();
  if (tmp0_safe_receiver == null)
    null;
  else
    tmp0_safe_receiver(state);
}
function newOverwritableRecordLocked(_this__u8e3s4, state) {
  _init_properties_Snapshot_kt__l6n1ng();
  var tmp = usedLocked(state);
  var tmp0_safe_receiver = (tmp == null ? true : tmp instanceof StateRecord()) ? tmp : THROW_CCE();
  var tmp_0;
  if (tmp0_safe_receiver == null) {
    tmp_0 = null;
  } else {
    // Inline function 'kotlin.apply' call
    tmp0_safe_receiver.c7e_1 = 1.7976931348623157E308;
    tmp_0 = tmp0_safe_receiver;
  }
  var tmp1_elvis_lhs = tmp_0;
  var tmp_1;
  if (tmp1_elvis_lhs == null) {
    // Inline function 'kotlin.apply' call
    var this_0 = _this__u8e3s4.y7d(1.7976931348623157E308);
    this_0.d7e_1 = state.e7e();
    state.f7e(this_0 instanceof StateRecord() ? this_0 : THROW_CCE());
    var tmp_2 = this_0;
    tmp_1 = tmp_2 instanceof StateRecord() ? tmp_2 : THROW_CCE();
  } else {
    tmp_1 = tmp1_elvis_lhs;
  }
  return tmp_1;
}
function usedLocked(state) {
  _init_properties_Snapshot_kt__l6n1ng();
  var current = state.e7e();
  var validRecord = null;
  // Inline function 'androidx.compose.runtime.snapshots.minus' call
  var reuseLimit = get_pinningTable().v7q(get_nextSnapshotId()) - toLong(1).y4();
  var invalid = Companion_getInstance().v7o_1;
  while (!(current == null)) {
    var currentId = current.c7e_1;
    if (equals(currentId, get_INVALID_SNAPSHOT())) {
      return current;
    }
    if (valid(current, reuseLimit, invalid)) {
      if (validRecord == null) {
        validRecord = current;
      } else {
        var tmp;
        var tmp0 = current.c7e_1;
        // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
        var other = validRecord.c7e_1;
        if (compareTo(tmp0, other) < 0) {
          tmp = current;
        } else {
          tmp = validRecord;
        }
        return tmp;
      }
    }
    current = current.d7e_1;
  }
  return null;
}
function access$_get_openSnapshots_$tSnapshotKt_7cpqp5() {
  return get_openSnapshots();
}
function access$_set_openSnapshots_$tSnapshotKt_9lk9nh(_set____db54di) {
  return set_openSnapshots(_set____db54di);
}
function access$_get_nextSnapshotId_$tSnapshotKt_vxgvey() {
  return get_nextSnapshotId();
}
function access$_set_nextSnapshotId_$tSnapshotKt_xcaltq(_set____db54di) {
  return set_nextSnapshotId(_set____db54di);
}
function emptyLambda$lambda(it) {
  _init_properties_Snapshot_kt__l6n1ng();
  return Unit_instance;
}
function mergedReadObserver$lambda($readObserver, $parentObserver) {
  return function (state) {
    $readObserver(state);
    $parentObserver(state);
    return Unit_instance;
  };
}
function mergedWriteObserver$lambda($writeObserver, $parentObserver) {
  return function (state) {
    $writeObserver(state);
    $parentObserver(state);
    return Unit_instance;
  };
}
function takeNewSnapshot$lambda($block) {
  return function (invalid) {
    var result = $block(invalid);
    // Inline function 'androidx.compose.runtime.snapshots.sync' call
    // Inline function 'androidx.compose.runtime.platform.synchronized' call
    get_lock();
    set_openSnapshots(get_openSnapshots().z7o(result.q6t()));
    return result;
  };
}
var properties_initialized_Snapshot_kt_2vlcoq;
function _init_properties_Snapshot_kt__l6n1ng() {
  if (!properties_initialized_Snapshot_kt_2vlcoq) {
    properties_initialized_Snapshot_kt_2vlcoq = true;
    emptyLambda = emptyLambda$lambda;
    INVALID_SNAPSHOT = 0.0;
    threadSnapshot = new (SnapshotThreadLocal())();
    // Inline function 'androidx.compose.runtime.platform.makeSynchronizedObject' call
    lock = null == null ? new Object() : null;
    openSnapshots = Companion_getInstance().v7o_1;
    // Inline function 'androidx.compose.runtime.snapshots.plus' call
    nextSnapshotId = toSnapshotId(1) + toLong(1).y4();
    pinningTable = new (SnapshotDoubleIndexHeap())();
    extraStateObjects = new (SnapshotWeakSet())();
    applyObservers = emptyList();
    globalWriteObservers = emptyList();
    // Inline function 'kotlin.also' call
    var this_0 = get_nextSnapshotId();
    // Inline function 'androidx.compose.runtime.snapshots.plus' call
    var tmp$ret$0 = get_nextSnapshotId() + toLong(1).y4();
    set_nextSnapshotId(tmp$ret$0);
    // Inline function 'kotlin.also' call
    var this_1 = new (GlobalSnapshot())(this_0, Companion_getInstance().v7o_1);
    set_openSnapshots(get_openSnapshots().z7o(this_1.q6t()));
    globalSnapshot = this_1;
    snapshotInitializer = get_globalSnapshot();
    pendingApplyObserverCount = new (AtomicInt())(0);
    androidx_compose_runtime_snapshots_Snapshot$stable = 8;
    androidx_compose_runtime_snapshots_MutableSnapshot$stable = 8;
    androidx_compose_runtime_snapshots_SnapshotApplyResult_Success$stable = 0;
    androidx_compose_runtime_snapshots_SnapshotApplyResult_Failure$stable = 8;
    androidx_compose_runtime_snapshots_SnapshotApplyResult$stable = 0;
    androidx_compose_runtime_snapshots_SnapshotApplyConflictException$stable = 8;
    androidx_compose_runtime_snapshots_StateRecord$stable = 8;
    androidx_compose_runtime_snapshots_ReadonlySnapshot$stable = 8;
    androidx_compose_runtime_snapshots_NestedReadonlySnapshot$stable = 8;
    androidx_compose_runtime_snapshots_GlobalSnapshot$stable = 8;
    androidx_compose_runtime_snapshots_NestedMutableSnapshot$stable = 8;
    androidx_compose_runtime_snapshots_TransparentObserverMutableSnapshot$stable = 8;
    androidx_compose_runtime_snapshots_TransparentObserverSnapshot$stable = 8;
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  GlobalSnapshot as GlobalSnapshot17w3tfetenr16,
  Failure as Failure29anwwqojapw7,
  mergeRecords as mergeRecords2ot9201d6imux,
  StateObject as StateObjectnwltjs7h42fu,
  StateRecord as StateRecord87l0x5hbo5vm,
  currentSnapshot as currentSnapshot1fdan7dtzycfn,
  current as current2r1i358w6f09t,
  get_lock as get_lock3ldzal6fnq2lr,
  notifyWrite as notifyWrite2ydfikssqjwax,
  overwritableRecord as overwritableRecord3h9fqjrvqco0k,
  readable_0 as readable2stwtntxmci6s,
  Companion_instance as Companion_instancenjq7hgnlnxbm,
};
//endregion

//# sourceMappingURL=Snapshot.mjs.map
