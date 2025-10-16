import { AtomicInt39yq0tdckiqjq as AtomicInt } from '../internal/Atomic.nonJvm.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  mergeRecords2ot9201d6imux as mergeRecords,
  StateObjectnwltjs7h42fu as StateObject,
} from './Snapshot.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_snapshots_StateObjectImpl$stable;
var StateObjectImplClass;
function StateObjectImpl() {
  if (StateObjectImplClass === VOID) {
    class $ {
      constructor() {
        this.r71_1 = new (AtomicInt())(0);
      }
      s71(reader) {
        do {
          var old = _ReaderKind___init__impl__jqeebu(this.r71_1.r29());
          // Inline function 'androidx.compose.runtime.snapshots.ReaderKind.isReadIn' call
          var this_0 = old;
          if (!((_ReaderKind___get_mask__impl__gmhzqb(this_0) & _ReaderKind___get_mask__impl__gmhzqb(reader)) === 0))
            return Unit_instance;
          // Inline function 'androidx.compose.runtime.snapshots.ReaderKind.withReadIn' call
          var this_1 = old;
          var new_0 = _ReaderKind___init__impl__jqeebu(_ReaderKind___get_mask__impl__gmhzqb(this_1) | _ReaderKind___get_mask__impl__gmhzqb(reader));
        }
         while (!this.r71_1.m6j(_ReaderKind___get_mask__impl__gmhzqb(old), _ReaderKind___get_mask__impl__gmhzqb(new_0)));
      }
      w75(reader) {
        // Inline function 'androidx.compose.runtime.snapshots.ReaderKind.isReadIn' call
        var this_0 = _ReaderKind___init__impl__jqeebu(this.r71_1.r29());
        return !((_ReaderKind___get_mask__impl__gmhzqb(this_0) & _ReaderKind___get_mask__impl__gmhzqb(reader)) === 0);
      }
    }
    protoOf($).g7e = mergeRecords;
    initMetadataForClass($, 'StateObjectImpl', VOID, VOID, [StateObject()]);
    StateObjectImplClass = $;
  }
  return StateObjectImplClass;
}
function _ReaderKind___init__impl__jqeebu(mask) {
  mask = mask === VOID ? 0 : mask;
  return mask;
}
function _ReaderKind___get_mask__impl__gmhzqb($this) {
  return $this;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
//region block: init
androidx_compose_runtime_snapshots_StateObjectImpl$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  StateObjectImpl as StateObjectImpl1jbeaieic2495,
  _ReaderKind___init__impl__jqeebu as _ReaderKind___init__impl__jqeebu9e0wxuddg190,
  Companion_instance as Companion_instance2a0dm8fzn59gf,
};
//endregion

//# sourceMappingURL=StateObjectImpl.mjs.map
