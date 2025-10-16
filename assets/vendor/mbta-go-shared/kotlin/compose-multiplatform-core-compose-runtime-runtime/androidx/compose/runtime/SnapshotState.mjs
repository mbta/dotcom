import { structuralEqualityPolicy37napyzbio62n as structuralEqualityPolicy } from './SnapshotMutationPolicy.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { createSnapshotMutableState2r1qjsry93r7s as createSnapshotMutableState } from './SnapshotState.nonAndroid.mjs';
import {
  StateRecord87l0x5hbo5vm as StateRecord,
  currentSnapshot1fdan7dtzycfn as currentSnapshot,
  GlobalSnapshot17w3tfetenr16 as GlobalSnapshot,
  current2r1i358w6f09t as current,
  get_lock3ldzal6fnq2lr as get_lock,
  Companion_instancenjq7hgnlnxbm as Companion_instance,
  overwritableRecord3h9fqjrvqco0k as overwritableRecord,
  notifyWrite2ydfikssqjwax as notifyWrite,
  readable2stwtntxmci6s as readable,
} from './snapshots/Snapshot.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { StateObjectImpl1jbeaieic2495 as StateObjectImpl } from './snapshots/StateObjectImpl.mjs';
import { toSnapshotId1z37g88mjtrgx as toSnapshotId } from './snapshots/SnapshotId.js.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { hashCodeq5arwsb9dgti as hashCode } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_SnapshotMutableStateImpl$stable;
function mutableStateOf(value, policy) {
  policy = policy === VOID ? structuralEqualityPolicy() : policy;
  return createSnapshotMutableState(value, policy);
}
var StateStateRecordClass;
function StateStateRecord() {
  if (StateStateRecordClass === VOID) {
    class $ extends StateRecord() {
      constructor(snapshotId, myValue) {
        super(snapshotId);
        this.v7d_1 = myValue;
      }
      w7d(value) {
        var tmp = this;
        tmp.v7d_1 = (value instanceof StateStateRecord() ? value : THROW_CCE()).v7d_1;
      }
      x7d() {
        return new (StateStateRecord())(currentSnapshot().q6t(), this.v7d_1);
      }
      y7d(snapshotId) {
        return new (StateStateRecord())(currentSnapshot().q6t(), this.v7d_1);
      }
    }
    initMetadataForClass($, 'StateStateRecord');
    StateStateRecordClass = $;
  }
  return StateStateRecordClass;
}
var SnapshotMutableStateImplClass;
function SnapshotMutableStateImpl() {
  if (SnapshotMutableStateImplClass === VOID) {
    class $ extends StateObjectImpl() {
      constructor(value, policy) {
        super();
        this.a7e_1 = policy;
        var tmp = this;
        // Inline function 'kotlin.let' call
        var snapshot = currentSnapshot();
        // Inline function 'kotlin.also' call
        var this_0 = new (StateStateRecord())(snapshot.q6t(), value);
        if (!(snapshot instanceof GlobalSnapshot())) {
          this_0.d7e_1 = new (StateStateRecord())(toSnapshotId(1), value);
        }
        tmp.b7e_1 = this_0;
      }
      q72() {
        return this.a7e_1;
      }
      b2r(value) {
        // Inline function 'androidx.compose.runtime.snapshots.withCurrent' call
        var this_0 = this.b7e_1;
        var it = current(this_0);
        if (!this.q72().g74(it.v7d_1, value)) {
          // Inline function 'androidx.compose.runtime.snapshots.overwritable' call
          var this_1 = this.b7e_1;
          var snapshot;
          // Inline function 'androidx.compose.runtime.snapshots.sync' call
          // Inline function 'androidx.compose.runtime.platform.synchronized' call
          get_lock();
          snapshot = Companion_instance.x6i();
          overwritableRecord(this_1, this, snapshot, it).v7d_1 = value;
          // Inline function 'kotlin.also' call
          notifyWrite(snapshot, this);
        }
        return Unit_instance;
      }
      v1() {
        return readable(this.b7e_1, this).v7d_1;
      }
      e7e() {
        return this.b7e_1;
      }
      f7e(value) {
        var tmp = this;
        tmp.b7e_1 = value instanceof StateStateRecord() ? value : THROW_CCE();
      }
      g7e(previous, current, applied) {
        var previousRecord = previous instanceof StateStateRecord() ? previous : THROW_CCE();
        var currentRecord = current instanceof StateStateRecord() ? current : THROW_CCE();
        var appliedRecord = applied instanceof StateStateRecord() ? applied : THROW_CCE();
        var tmp;
        if (this.q72().g74(currentRecord.v7d_1, appliedRecord.v7d_1)) {
          tmp = current;
        } else {
          var merged = this.q72().r7d(previousRecord.v7d_1, currentRecord.v7d_1, appliedRecord.v7d_1);
          var tmp_0;
          if (!(merged == null)) {
            // Inline function 'kotlin.also' call
            var this_0 = appliedRecord.y7d(appliedRecord.c7e_1);
            this_0.v7d_1 = merged;
            tmp_0 = this_0;
          } else {
            tmp_0 = null;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      toString() {
        // Inline function 'androidx.compose.runtime.snapshots.withCurrent' call
        var this_0 = this.b7e_1;
        var it = current(this_0);
        return 'MutableState(value=' + toString(it.v7d_1) + ')@' + hashCode(this);
      }
    }
    initMetadataForClass($, 'SnapshotMutableStateImpl');
    SnapshotMutableStateImplClass = $;
  }
  return SnapshotMutableStateImplClass;
}
//region block: init
androidx_compose_runtime_SnapshotMutableStateImpl$stable = 0;
//endregion
//region block: exports
export {
  SnapshotMutableStateImpl as SnapshotMutableStateImpl2kpcjonnsiofr,
  mutableStateOf as mutableStateOf2iogqreal45x5,
};
//endregion

//# sourceMappingURL=SnapshotState.mjs.map
