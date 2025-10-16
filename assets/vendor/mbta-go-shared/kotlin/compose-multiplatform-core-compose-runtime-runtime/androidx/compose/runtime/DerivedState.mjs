import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { MutableVectorwjrdge2qewgb as MutableVector } from './collection/MutableVector.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { SnapshotThreadLocalkbblyii811mp as SnapshotThreadLocal } from './internal/SnapshotThreadLocal.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var calculationBlockNestedLevel;
function get_derivedStateObservers() {
  _init_properties_DerivedState_kt__eqt0x8();
  return derivedStateObservers;
}
var derivedStateObservers;
var androidx_compose_runtime_DerivedSnapshotState_ResultRecord$stable;
var DerivedStateClass;
function DerivedState() {
  if (DerivedStateClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'DerivedState');
    DerivedStateClass = $;
  }
  return DerivedStateClass;
}
function derivedStateObservers_0() {
  _init_properties_DerivedState_kt__eqt0x8();
  var tmp0_elvis_lhs = get_derivedStateObservers().r29();
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'androidx.compose.runtime.collection.MutableVector' call
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp$ret$0 = Array(0);
    // Inline function 'kotlin.also' call
    var this_0 = new (MutableVector())(tmp$ret$0, 0);
    get_derivedStateObservers().u72(this_0);
    tmp = this_0;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
var properties_initialized_DerivedState_kt_scch8q;
function _init_properties_DerivedState_kt__eqt0x8() {
  if (!properties_initialized_DerivedState_kt_scch8q) {
    properties_initialized_DerivedState_kt_scch8q = true;
    calculationBlockNestedLevel = new (SnapshotThreadLocal())();
    derivedStateObservers = new (SnapshotThreadLocal())();
    androidx_compose_runtime_DerivedSnapshotState_ResultRecord$stable = 8;
  }
}
//region block: exports
export {
  DerivedState as DerivedState19xobrhn2i2k3,
  derivedStateObservers_0 as derivedStateObservers223dv4ey67df,
};
//endregion

//# sourceMappingURL=DerivedState.mjs.map
