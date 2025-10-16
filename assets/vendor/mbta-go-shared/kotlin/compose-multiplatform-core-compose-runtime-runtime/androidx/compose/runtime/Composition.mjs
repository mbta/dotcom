import { throwIllegalStateExceptionhmvlq2knnz6m as throwIllegalStateException } from './Preconditions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  composeRuntimeErrorzyuropknqb0d as composeRuntimeError,
  InvalidationResult_IGNORED_getInstancenn8i7vc4cu7y as InvalidationResult_IGNORED_getInstance,
  InvalidationResult_IMMINENT_getInstance13vobxvjoirx7 as InvalidationResult_IMMINENT_getInstance,
  InvalidationResult_SCHEDULED_getInstance1v8qvftrd5o46 as InvalidationResult_SCHEDULED_getInstance,
  InvalidationResult_DEFERRED_getInstance1lo8x9hr2j15s as InvalidationResult_DEFERRED_getInstance,
  ComposerImplmwsshr0p4ekr as ComposerImpl,
  removeCurrentGroup386jym91uivhi as removeCurrentGroup,
  composeImmediateRuntimeError2yqil22w149j8 as composeImmediateRuntimeError,
  sourceInformation1t72i3r4izs0r as sourceInformation,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from './Composer.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  isArray1hxjqtqy632bc as isArray,
  isInterface3d6p8outrmvmk as isInterface,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  KtSetjrjc7fhfd6b9 as KtSet,
  KtMap140uvy3s5zad8 as KtMap,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import {
  _ScopeMap___get_map__impl__vxhazm3lygd1zl1a7kq as _ScopeMap___get_map__impl__vxhazm,
  ScopeMap__remove_impl_ocu4rj38uhxetbr89wj as ScopeMap__remove_impl_ocu4rj,
  ScopeMap__contains_impl_6qp7s63dwsaeljcgfnm as ScopeMap__contains_impl_6qp7s6,
  ScopeMap__add_impl_n8b3uc2lh1eqciwsu5 as ScopeMap__add_impl_n8b3uc,
  ScopeMap__set_impl_3y8kbx2fkzbmv6z0tu3 as ScopeMap__set_impl_3y8kbx,
  _ScopeMap___init__impl__52wntz3n1c1nixrzfck as _ScopeMap___init__impl__52wntz,
  ScopeMap__asMap_impl_uiab3f17doju2bqqcei as ScopeMap__asMap_impl_uiab3f,
  ScopeMap__removeScope_impl_8k6ux12uysecl8ndrrn as ScopeMap__removeScope_impl_8k6ux1,
} from './collection/ScopeMap.mjs';
import { MutableScatterSetcffu86129j6b as MutableScatterSet } from '../../../../androidx-collection-collection/androidx/collection/ScatterSet.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  RecomposeScopeImpl15912wzsvt7nn as RecomposeScopeImpl,
  RecomposeScopeOwner128iyp4kpa98t as RecomposeScopeOwner,
} from './RecomposeScopeImpl.mjs';
import { ScatterSetWrapper25xivzdih3nzf as ScatterSetWrapper } from './collection/ScatterSetWrapper.mjs';
import { RememberEventDispatcher1j7ollu0ljepm as RememberEventDispatcher } from './internal/RememberEventDispatcher.mjs';
import { Trace_instance1paw3yb7kkwy0 as Trace_instance } from './internal/Trace.nonAndroid.mjs';
import { DerivedState19xobrhn2i2k3 as DerivedState } from './DerivedState.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { AtomicReference2swys664hkpdq as AtomicReference } from './internal/Atomic.nonJvm.mjs';
import { SlotTable22ouf15arae6t as SlotTable } from './SlotTable.mjs';
import { ChangeList1sysvm9xsleqf as ChangeList } from './changelist/ChangeList.mjs';
import { Recomposerz8i9k4kgomr5 as Recomposer } from './Recomposer.mjs';
import {
  Exceptiondt2hlxn7j7vw as Exception,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { plus27p1csfyhycs6 as plus } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import {
  Companion_instance2a0dm8fzn59gf as Companion_instance,
  _ReaderKind___init__impl__jqeebu9e0wxuddg190 as _ReaderKind___init__impl__jqeebu,
  StateObjectImpl1jbeaieic2495 as StateObjectImpl,
} from './snapshots/StateObjectImpl.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { composableLambdaInstance3tvqar9a11755 as composableLambdaInstance } from './internal/ComposableLambda.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_PendingApplyNoModifications() {
  _init_properties_Composition_kt__t5pjw8();
  return PendingApplyNoModifications;
}
var PendingApplyNoModifications;
var CompositionImplServiceKey;
var androidx_compose_runtime_CompositionImpl$stable;
var androidx_compose_runtime_ScopeInvalidated$stable;
var androidx_compose_runtime_CompositionObserverHolder$stable;
function _get_areChildrenComposing__c1uwup($this) {
  return $this.v6u_1.a6w();
}
function composeInitial($this, content) {
  // Inline function 'androidx.compose.runtime.checkPrecondition' call
  if (!!$this.y6u_1) {
    var tmp$ret$0 = 'The composition is disposed';
    throwIllegalStateException(tmp$ret$0);
  }
  $this.z6u_1 = content;
  $this.b6u_1.s6z($this, $this.z6u_1);
}
function drainPendingModificationsForCompositionLocked($this) {
  var toRecord = $this.d6u_1.h2r(get_PendingApplyNoModifications());
  if (toRecord != null) {
    if (equals(toRecord, get_PendingApplyNoModifications())) {
      composeRuntimeError('pending composition has not been applied');
    } else {
      if (!(toRecord == null) ? isInterface(toRecord, KtSet()) : false) {
        addPendingInvalidationsLocked_0($this, isInterface(toRecord, KtSet()) ? toRecord : THROW_CCE(), true);
      } else {
        if (!(toRecord == null) ? isArray(toRecord) : false) {
          var indexedObject = isArray(toRecord) ? toRecord : THROW_CCE();
          var inductionVariable = 0;
          var last = indexedObject.length;
          while (inductionVariable < last) {
            var changed = indexedObject[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            addPendingInvalidationsLocked_0($this, changed, true);
          }
        } else {
          composeRuntimeError('corrupt pendingModifications drain: ' + toString($this.d6u_1));
        }
      }
    }
  }
}
function drainPendingModificationsLocked($this) {
  var toRecord = $this.d6u_1.h2r(null);
  if (!equals(toRecord, get_PendingApplyNoModifications())) {
    if (!(toRecord == null) ? isInterface(toRecord, KtSet()) : false) {
      addPendingInvalidationsLocked_0($this, isInterface(toRecord, KtSet()) ? toRecord : THROW_CCE(), false);
    } else {
      if (!(toRecord == null) ? isArray(toRecord) : false) {
        var indexedObject = isArray(toRecord) ? toRecord : THROW_CCE();
        var inductionVariable = 0;
        var last = indexedObject.length;
        while (inductionVariable < last) {
          var changed = indexedObject[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          addPendingInvalidationsLocked_0($this, changed, false);
        }
      } else {
        if (toRecord == null) {
          composeRuntimeError('calling recordModificationsOf and applyChanges concurrently is not supported');
        } else {
          composeRuntimeError('corrupt pendingModifications drain: ' + toString($this.d6u_1));
        }
      }
    }
  }
}
function drainPendingModificationsOutOfBandLocked($this) {
  var toRecord = $this.d6u_1.h2r(emptySet());
  if (!equals(toRecord, get_PendingApplyNoModifications()) && toRecord != null) {
    if (!(toRecord == null) ? isInterface(toRecord, KtSet()) : false) {
      addPendingInvalidationsLocked_0($this, isInterface(toRecord, KtSet()) ? toRecord : THROW_CCE(), false);
    } else {
      if (!(toRecord == null) ? isArray(toRecord) : false) {
        var indexedObject = isArray(toRecord) ? toRecord : THROW_CCE();
        var inductionVariable = 0;
        var last = indexedObject.length;
        while (inductionVariable < last) {
          var changed = indexedObject[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          addPendingInvalidationsLocked_0($this, changed, false);
        }
      } else {
        composeRuntimeError('corrupt pendingModifications drain: ' + toString($this.d6u_1));
      }
    }
  }
}
function addPendingInvalidationsLocked($this, value, forgetConditionalScopes) {
  // Inline function 'androidx.compose.runtime.collection.ScopeMap.forEachScopeOf' call
  var this_0 = $this.h6u_1;
  var value_0 = _ScopeMap___get_map__impl__vxhazm(this_0).j3(value);
  if (value_0 != null) {
    if (value_0 instanceof MutableScatterSet()) {
      // Inline function 'androidx.collection.ScatterSet.forEach' call
      var this_1 = value_0 instanceof MutableScatterSet() ? value_0 : THROW_CCE();
      // Inline function 'kotlin.contracts.contract' call
      var elements = this_1.j6f_1;
      $l$block: {
        // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
        // Inline function 'kotlin.contracts.contract' call
        var m = this_1.i6f_1;
        var lastIndex = m.length - 2 | 0;
        var inductionVariable = 0;
        if (inductionVariable <= lastIndex)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var slot = m[i];
            // Inline function 'androidx.collection.maskEmptyOrDeleted' call
            var this_2 = slot;
            if (!this_2.s4(this_2.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
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
                    var scope = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                    if (!ScopeMap__remove_impl_ocu4rj($this.n6u_1, value, scope) && !scope.v6z(value).equals(InvalidationResult_IGNORED_getInstance())) {
                      if (scope.u6z() && !forgetConditionalScopes) {
                        $this.j6u_1.i(scope);
                      } else {
                        $this.i6u_1.i(scope);
                      }
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
    } else {
      var scope_0 = !(value_0 == null) ? value_0 : THROW_CCE();
      if (!ScopeMap__remove_impl_ocu4rj($this.n6u_1, value, scope_0) && !scope_0.v6z(value).equals(InvalidationResult_IGNORED_getInstance())) {
        if (scope_0.u6z() && !forgetConditionalScopes) {
          $this.j6u_1.i(scope_0);
        } else {
          $this.i6u_1.i(scope_0);
        }
      }
    }
  }
}
function addPendingInvalidationsLocked_0($this, values, forgetConditionalScopes) {
  // Inline function 'androidx.compose.runtime.collection.fastForEach' call
  var tmp;
  if (values instanceof ScatterSetWrapper()) {
    // Inline function 'androidx.collection.ScatterSet.forEach' call
    var this_0 = values.w6z_1;
    // Inline function 'kotlin.contracts.contract' call
    var elements = this_0.j6f_1;
    $l$block_0: {
      // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m = this_0.i6f_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_1 = slot;
          if (!this_1.s4(this_1.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  var tmp_0 = elements[index];
                  var value = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                  if (value instanceof RecomposeScopeImpl()) {
                    value.v6z(null);
                  } else {
                    addPendingInvalidationsLocked($this, value, forgetConditionalScopes);
                    // Inline function 'androidx.compose.runtime.collection.ScopeMap.forEachScopeOf' call
                    var this_2 = $this.k6u_1;
                    var value_0 = _ScopeMap___get_map__impl__vxhazm(this_2).j3(value);
                    if (value_0 != null) {
                      if (value_0 instanceof MutableScatterSet()) {
                        // Inline function 'androidx.collection.ScatterSet.forEach' call
                        var this_3 = value_0 instanceof MutableScatterSet() ? value_0 : THROW_CCE();
                        // Inline function 'kotlin.contracts.contract' call
                        var elements_0 = this_3.j6f_1;
                        $l$block: {
                          // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
                          // Inline function 'kotlin.contracts.contract' call
                          var m_0 = this_3.i6f_1;
                          var lastIndex_0 = m_0.length - 2 | 0;
                          var inductionVariable_1 = 0;
                          if (inductionVariable_1 <= lastIndex_0)
                            do {
                              var i_0 = inductionVariable_1;
                              inductionVariable_1 = inductionVariable_1 + 1 | 0;
                              var slot_0 = m_0[i_0];
                              // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                              var this_4 = slot_0;
                              if (!this_4.s4(this_4.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                                var bitCount_0 = 8 - (~(i_0 - lastIndex_0 | 0) >>> 31 | 0) | 0;
                                var inductionVariable_2 = 0;
                                if (inductionVariable_2 < bitCount_0)
                                  do {
                                    var j_0 = inductionVariable_2;
                                    inductionVariable_2 = inductionVariable_2 + 1 | 0;
                                    // Inline function 'androidx.collection.isFull' call
                                    if (slot_0.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                                      var index_0 = (i_0 << 3) + j_0 | 0;
                                      var tmp_1 = elements_0[index_0];
                                      var it = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
                                      addPendingInvalidationsLocked($this, it, forgetConditionalScopes);
                                    }
                                    slot_0 = slot_0.q4(8);
                                  }
                                   while (inductionVariable_2 < bitCount_0);
                                if (!(bitCount_0 === 8)) {
                                  break $l$block;
                                }
                              }
                            }
                             while (!(i_0 === lastIndex_0));
                        }
                      } else {
                        var it_0 = !(value_0 == null) ? value_0 : THROW_CCE();
                        addPendingInvalidationsLocked($this, it_0, forgetConditionalScopes);
                      }
                    }
                  }
                }
                slot = slot.q4(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block_0;
            }
          }
        }
         while (!(i === lastIndex));
    }
    tmp = Unit_instance;
  } else {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = values.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      if (element instanceof RecomposeScopeImpl()) {
        element.v6z(null);
      } else {
        addPendingInvalidationsLocked($this, element, forgetConditionalScopes);
        // Inline function 'androidx.compose.runtime.collection.ScopeMap.forEachScopeOf' call
        var this_5 = $this.k6u_1;
        var value_1 = _ScopeMap___get_map__impl__vxhazm(this_5).j3(element);
        if (value_1 != null) {
          if (value_1 instanceof MutableScatterSet()) {
            // Inline function 'androidx.collection.ScatterSet.forEach' call
            var this_6 = value_1 instanceof MutableScatterSet() ? value_1 : THROW_CCE();
            // Inline function 'kotlin.contracts.contract' call
            var elements_1 = this_6.j6f_1;
            $l$block_1: {
              // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
              // Inline function 'kotlin.contracts.contract' call
              var m_1 = this_6.i6f_1;
              var lastIndex_1 = m_1.length - 2 | 0;
              var inductionVariable_3 = 0;
              if (inductionVariable_3 <= lastIndex_1)
                do {
                  var i_1 = inductionVariable_3;
                  inductionVariable_3 = inductionVariable_3 + 1 | 0;
                  var slot_1 = m_1[i_1];
                  // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                  var this_7 = slot_1;
                  if (!this_7.s4(this_7.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                    var bitCount_1 = 8 - (~(i_1 - lastIndex_1 | 0) >>> 31 | 0) | 0;
                    var inductionVariable_4 = 0;
                    if (inductionVariable_4 < bitCount_1)
                      do {
                        var j_1 = inductionVariable_4;
                        inductionVariable_4 = inductionVariable_4 + 1 | 0;
                        // Inline function 'androidx.collection.isFull' call
                        if (slot_1.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                          var index_1 = (i_1 << 3) + j_1 | 0;
                          var tmp_2 = elements_1[index_1];
                          var it_1 = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
                          addPendingInvalidationsLocked($this, it_1, forgetConditionalScopes);
                        }
                        slot_1 = slot_1.q4(8);
                      }
                       while (inductionVariable_4 < bitCount_1);
                    if (!(bitCount_1 === 8)) {
                      break $l$block_1;
                    }
                  }
                }
                 while (!(i_1 === lastIndex_1));
            }
          } else {
            var it_2 = !(value_1 == null) ? value_1 : THROW_CCE();
            addPendingInvalidationsLocked($this, it_2, forgetConditionalScopes);
          }
        }
      }
    }
    tmp = Unit_instance;
  }
  var conditionallyInvalidatedScopes = $this.j6u_1;
  var invalidatedScopes = $this.i6u_1;
  if (forgetConditionalScopes && conditionallyInvalidatedScopes.u6d()) {
    // Inline function 'androidx.compose.runtime.collection.ScopeMap.removeScopeIf' call
    var this_8 = $this.h6u_1;
    // Inline function 'androidx.collection.MutableScatterMap.removeIf' call
    var this_9 = _ScopeMap___get_map__impl__vxhazm(this_8);
    $l$block_3: {
      // Inline function 'androidx.collection.ScatterMap.forEachIndexed' call
      var m_2 = this_9.v6e_1;
      var lastIndex_2 = m_2.length - 2 | 0;
      var inductionVariable_5 = 0;
      if (inductionVariable_5 <= lastIndex_2)
        do {
          var i_2 = inductionVariable_5;
          inductionVariable_5 = inductionVariable_5 + 1 | 0;
          var slot_2 = m_2[i_2];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_10 = slot_2;
          if (!this_10.s4(this_10.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
            var bitCount_2 = 8 - (~(i_2 - lastIndex_2 | 0) >>> 31 | 0) | 0;
            var inductionVariable_6 = 0;
            if (inductionVariable_6 < bitCount_2)
              do {
                var j_2 = inductionVariable_6;
                inductionVariable_6 = inductionVariable_6 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot_2.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                  var index_2 = (i_2 << 3) + j_2 | 0;
                  var tmp_3 = this_9.w6e_1[index_2];
                  (tmp_3 == null ? true : !(tmp_3 == null)) || THROW_CCE();
                  var tmp_4 = this_9.x6e_1[index_2];
                  var value_2 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
                  var tmp_5;
                  if (value_2 instanceof MutableScatterSet()) {
                    var set = value_2 instanceof MutableScatterSet() ? value_2 : THROW_CCE();
                    // Inline function 'androidx.collection.MutableScatterSet.removeIf' call
                    var elements_2 = set.j6f_1;
                    $l$block_2: {
                      // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
                      // Inline function 'kotlin.contracts.contract' call
                      var m_3 = set.i6f_1;
                      var lastIndex_3 = m_3.length - 2 | 0;
                      var inductionVariable_7 = 0;
                      if (inductionVariable_7 <= lastIndex_3)
                        do {
                          var i_3 = inductionVariable_7;
                          inductionVariable_7 = inductionVariable_7 + 1 | 0;
                          var slot_3 = m_3[i_3];
                          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                          var this_11 = slot_3;
                          if (!this_11.s4(this_11.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                            var bitCount_3 = 8 - (~(i_3 - lastIndex_3 | 0) >>> 31 | 0) | 0;
                            var inductionVariable_8 = 0;
                            if (inductionVariable_8 < bitCount_3)
                              do {
                                var j_3 = inductionVariable_8;
                                inductionVariable_8 = inductionVariable_8 + 1 | 0;
                                // Inline function 'androidx.collection.isFull' call
                                if (slot_3.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                                  var index_3 = (i_3 << 3) + j_3 | 0;
                                  var tmp_6 = elements_2[index_3];
                                  var scope = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
                                  if (conditionallyInvalidatedScopes.j1(scope) || invalidatedScopes.j1(scope)) {
                                    set.w6f(index_3);
                                  }
                                }
                                slot_3 = slot_3.q4(8);
                              }
                               while (inductionVariable_8 < bitCount_3);
                            if (!(bitCount_3 === 8)) {
                              break $l$block_2;
                            }
                          }
                        }
                         while (!(i_3 === lastIndex_3));
                    }
                    tmp_5 = set.h1();
                  } else {
                    var scope_0 = !(value_2 == null) ? value_2 : THROW_CCE();
                    tmp_5 = conditionallyInvalidatedScopes.j1(scope_0) || invalidatedScopes.j1(scope_0);
                  }
                  if (tmp_5) {
                    this_9.r6c(index_2);
                  }
                }
                slot_2 = slot_2.q4(8);
              }
               while (inductionVariable_6 < bitCount_2);
            if (!(bitCount_2 === 8)) {
              break $l$block_3;
            }
          }
        }
         while (!(i_2 === lastIndex_2));
    }
    conditionallyInvalidatedScopes.p3();
    cleanUpDerivedStateObservations($this);
  } else if (invalidatedScopes.u6d()) {
    // Inline function 'androidx.compose.runtime.collection.ScopeMap.removeScopeIf' call
    var this_12 = $this.h6u_1;
    // Inline function 'androidx.collection.MutableScatterMap.removeIf' call
    var this_13 = _ScopeMap___get_map__impl__vxhazm(this_12);
    $l$block_5: {
      // Inline function 'androidx.collection.ScatterMap.forEachIndexed' call
      var m_4 = this_13.v6e_1;
      var lastIndex_4 = m_4.length - 2 | 0;
      var inductionVariable_9 = 0;
      if (inductionVariable_9 <= lastIndex_4)
        do {
          var i_4 = inductionVariable_9;
          inductionVariable_9 = inductionVariable_9 + 1 | 0;
          var slot_4 = m_4[i_4];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_14 = slot_4;
          if (!this_14.s4(this_14.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
            var bitCount_4 = 8 - (~(i_4 - lastIndex_4 | 0) >>> 31 | 0) | 0;
            var inductionVariable_10 = 0;
            if (inductionVariable_10 < bitCount_4)
              do {
                var j_4 = inductionVariable_10;
                inductionVariable_10 = inductionVariable_10 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot_4.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                  var index_4 = (i_4 << 3) + j_4 | 0;
                  var tmp_7 = this_13.w6e_1[index_4];
                  (tmp_7 == null ? true : !(tmp_7 == null)) || THROW_CCE();
                  var tmp_8 = this_13.x6e_1[index_4];
                  var value_3 = (tmp_8 == null ? true : !(tmp_8 == null)) ? tmp_8 : THROW_CCE();
                  var tmp_9;
                  if (value_3 instanceof MutableScatterSet()) {
                    var set_0 = value_3 instanceof MutableScatterSet() ? value_3 : THROW_CCE();
                    // Inline function 'androidx.collection.MutableScatterSet.removeIf' call
                    var elements_3 = set_0.j6f_1;
                    $l$block_4: {
                      // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
                      // Inline function 'kotlin.contracts.contract' call
                      var m_5 = set_0.i6f_1;
                      var lastIndex_5 = m_5.length - 2 | 0;
                      var inductionVariable_11 = 0;
                      if (inductionVariable_11 <= lastIndex_5)
                        do {
                          var i_5 = inductionVariable_11;
                          inductionVariable_11 = inductionVariable_11 + 1 | 0;
                          var slot_5 = m_5[i_5];
                          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                          var this_15 = slot_5;
                          if (!this_15.s4(this_15.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                            var bitCount_5 = 8 - (~(i_5 - lastIndex_5 | 0) >>> 31 | 0) | 0;
                            var inductionVariable_12 = 0;
                            if (inductionVariable_12 < bitCount_5)
                              do {
                                var j_5 = inductionVariable_12;
                                inductionVariable_12 = inductionVariable_12 + 1 | 0;
                                // Inline function 'androidx.collection.isFull' call
                                if (slot_5.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                                  var index_5 = (i_5 << 3) + j_5 | 0;
                                  var tmp_10 = elements_3[index_5];
                                  var scope_1 = (tmp_10 == null ? true : !(tmp_10 == null)) ? tmp_10 : THROW_CCE();
                                  if (invalidatedScopes.j1(scope_1)) {
                                    set_0.w6f(index_5);
                                  }
                                }
                                slot_5 = slot_5.q4(8);
                              }
                               while (inductionVariable_12 < bitCount_5);
                            if (!(bitCount_5 === 8)) {
                              break $l$block_4;
                            }
                          }
                        }
                         while (!(i_5 === lastIndex_5));
                    }
                    tmp_9 = set_0.h1();
                  } else {
                    var scope_2 = !(value_3 == null) ? value_3 : THROW_CCE();
                    tmp_9 = invalidatedScopes.j1(scope_2);
                  }
                  if (tmp_9) {
                    this_13.r6c(index_4);
                  }
                }
                slot_4 = slot_4.q4(8);
              }
               while (inductionVariable_10 < bitCount_4);
            if (!(bitCount_4 === 8)) {
              break $l$block_5;
            }
          }
        }
         while (!(i_4 === lastIndex_4));
    }
    cleanUpDerivedStateObservations($this);
    invalidatedScopes.p3();
  }
}
function cleanUpDerivedStateObservations($this) {
  // Inline function 'androidx.compose.runtime.collection.ScopeMap.removeScopeIf' call
  var this_0 = $this.k6u_1;
  // Inline function 'androidx.collection.MutableScatterMap.removeIf' call
  var this_1 = _ScopeMap___get_map__impl__vxhazm(this_0);
  $l$block_0: {
    // Inline function 'androidx.collection.ScatterMap.forEachIndexed' call
    var m = this_1.v6e_1;
    var lastIndex = m.length - 2 | 0;
    var inductionVariable = 0;
    if (inductionVariable <= lastIndex)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slot = m[i];
        // Inline function 'androidx.collection.maskEmptyOrDeleted' call
        var this_2 = slot;
        if (!this_2.s4(this_2.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
          var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
          var inductionVariable_0 = 0;
          if (inductionVariable_0 < bitCount)
            do {
              var j = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              // Inline function 'androidx.collection.isFull' call
              if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                var index = (i << 3) + j | 0;
                var tmp = this_1.w6e_1[index];
                (tmp == null ? true : !(tmp == null)) || THROW_CCE();
                var tmp_0 = this_1.x6e_1[index];
                var value = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                var tmp_1;
                if (value instanceof MutableScatterSet()) {
                  var set = value instanceof MutableScatterSet() ? value : THROW_CCE();
                  // Inline function 'androidx.collection.MutableScatterSet.removeIf' call
                  var elements = set.j6f_1;
                  $l$block: {
                    // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
                    // Inline function 'kotlin.contracts.contract' call
                    var m_0 = set.i6f_1;
                    var lastIndex_0 = m_0.length - 2 | 0;
                    var inductionVariable_1 = 0;
                    if (inductionVariable_1 <= lastIndex_0)
                      do {
                        var i_0 = inductionVariable_1;
                        inductionVariable_1 = inductionVariable_1 + 1 | 0;
                        var slot_0 = m_0[i_0];
                        // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                        var this_3 = slot_0;
                        if (!this_3.s4(this_3.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                          var bitCount_0 = 8 - (~(i_0 - lastIndex_0 | 0) >>> 31 | 0) | 0;
                          var inductionVariable_2 = 0;
                          if (inductionVariable_2 < bitCount_0)
                            do {
                              var j_0 = inductionVariable_2;
                              inductionVariable_2 = inductionVariable_2 + 1 | 0;
                              // Inline function 'androidx.collection.isFull' call
                              if (slot_0.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                                var index_0 = (i_0 << 3) + j_0 | 0;
                                var tmp_2 = elements[index_0];
                                var derivedState = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
                                if (!ScopeMap__contains_impl_6qp7s6($this.h6u_1, derivedState)) {
                                  set.w6f(index_0);
                                }
                              }
                              slot_0 = slot_0.q4(8);
                            }
                             while (inductionVariable_2 < bitCount_0);
                          if (!(bitCount_0 === 8)) {
                            break $l$block;
                          }
                        }
                      }
                       while (!(i_0 === lastIndex_0));
                  }
                  tmp_1 = set.h1();
                } else {
                  var derivedState_0 = !(value == null) ? value : THROW_CCE();
                  tmp_1 = !ScopeMap__contains_impl_6qp7s6($this.h6u_1, derivedState_0);
                }
                if (tmp_1) {
                  this_1.r6c(index);
                }
              }
              slot = slot.q4(8);
            }
             while (inductionVariable_0 < bitCount);
          if (!(bitCount === 8)) {
            break $l$block_0;
          }
        }
      }
       while (!(i === lastIndex));
  }
  if ($this.j6u_1.u6d()) {
    // Inline function 'androidx.collection.MutableScatterSet.removeIf' call
    var this_4 = $this.j6u_1;
    var elements_0 = this_4.j6f_1;
    $l$block_1: {
      // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m_1 = this_4.i6f_1;
      var lastIndex_1 = m_1.length - 2 | 0;
      var inductionVariable_3 = 0;
      if (inductionVariable_3 <= lastIndex_1)
        do {
          var i_1 = inductionVariable_3;
          inductionVariable_3 = inductionVariable_3 + 1 | 0;
          var slot_1 = m_1[i_1];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_5 = slot_1;
          if (!this_5.s4(this_5.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
            var bitCount_1 = 8 - (~(i_1 - lastIndex_1 | 0) >>> 31 | 0) | 0;
            var inductionVariable_4 = 0;
            if (inductionVariable_4 < bitCount_1)
              do {
                var j_1 = inductionVariable_4;
                inductionVariable_4 = inductionVariable_4 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot_1.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                  var index_1 = (i_1 << 3) + j_1 | 0;
                  var tmp_3 = elements_0[index_1];
                  if (!((tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE()).u6z()) {
                    this_4.w6f(index_1);
                  }
                }
                slot_1 = slot_1.q4(8);
              }
               while (inductionVariable_4 < bitCount_1);
            if (!(bitCount_1 === 8)) {
              break $l$block_1;
            }
          }
        }
         while (!(i_1 === lastIndex_1));
    }
  }
}
function invalidateScopeOfLocked($this, value) {
  // Inline function 'androidx.compose.runtime.collection.ScopeMap.forEachScopeOf' call
  var this_0 = $this.h6u_1;
  var value_0 = _ScopeMap___get_map__impl__vxhazm(this_0).j3(value);
  if (value_0 != null) {
    if (value_0 instanceof MutableScatterSet()) {
      // Inline function 'androidx.collection.ScatterSet.forEach' call
      var this_1 = value_0 instanceof MutableScatterSet() ? value_0 : THROW_CCE();
      // Inline function 'kotlin.contracts.contract' call
      var elements = this_1.j6f_1;
      $l$block: {
        // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
        // Inline function 'kotlin.contracts.contract' call
        var m = this_1.i6f_1;
        var lastIndex = m.length - 2 | 0;
        var inductionVariable = 0;
        if (inductionVariable <= lastIndex)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var slot = m[i];
            // Inline function 'androidx.collection.maskEmptyOrDeleted' call
            var this_2 = slot;
            if (!this_2.s4(this_2.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
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
                    var scope = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                    if (scope.v6z(value).equals(InvalidationResult_IMMINENT_getInstance())) {
                      ScopeMap__add_impl_n8b3uc($this.n6u_1, value, scope);
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
    } else {
      var scope_0 = !(value_0 == null) ? value_0 : THROW_CCE();
      if (scope_0.v6z(value).equals(InvalidationResult_IMMINENT_getInstance())) {
        ScopeMap__add_impl_n8b3uc($this.n6u_1, value, scope_0);
      }
    }
  }
}
function applyChangesInLocked($this, changes) {
  var manager = new (RememberEventDispatcher())($this.f6u_1);
  try {
    if (changes.h1())
      return Unit_instance;
    var tmp0 = 'Compose:applyChanges';
    $l$block: {
      // Inline function 'androidx.compose.runtime.internal.trace' call
      var token = Trace_instance.l6t(tmp0);
      try {
        var tmp0_safe_receiver = $this.r6u_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.h70_1;
        var applier = tmp1_elvis_lhs == null ? $this.c6u_1 : tmp1_elvis_lhs;
        var tmp2_safe_receiver = $this.r6u_1;
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.g70_1;
        var rememberManager = tmp3_elvis_lhs == null ? manager : tmp3_elvis_lhs;
        applier.i6i();
        // Inline function 'androidx.compose.runtime.SlotTable.write' call
        // Inline function 'kotlin.let' call
        var writer = $this.g6u_1.n6p();
        var normalClose = false;
        var tmp;
        try {
          changes.i70(applier, writer, rememberManager);
          // Inline function 'kotlin.also' call
          normalClose = true;
          tmp = Unit_instance;
        }finally {
          writer.s6p(normalClose);
        }
        applier.j6i();
        break $l$block;
      }finally {
        Trace_instance.w6t(token);
      }
    }
    manager.u70();
    manager.v70();
    if ($this.p6u_1) {
      var tmp0_0 = 'Compose:unobserve';
      $l$block_2: {
        // Inline function 'androidx.compose.runtime.internal.trace' call
        var token_0 = Trace_instance.l6t(tmp0_0);
        try {
          $this.p6u_1 = false;
          // Inline function 'androidx.compose.runtime.collection.ScopeMap.removeScopeIf' call
          var this_0 = $this.h6u_1;
          // Inline function 'androidx.collection.MutableScatterMap.removeIf' call
          var this_1 = _ScopeMap___get_map__impl__vxhazm(this_0);
          $l$block_1: {
            // Inline function 'androidx.collection.ScatterMap.forEachIndexed' call
            var m = this_1.v6e_1;
            var lastIndex = m.length - 2 | 0;
            var inductionVariable = 0;
            if (inductionVariable <= lastIndex)
              do {
                var i = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var slot = m[i];
                // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                var this_2 = slot;
                if (!this_2.s4(this_2.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                  var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                  var inductionVariable_0 = 0;
                  if (inductionVariable_0 < bitCount)
                    do {
                      var j = inductionVariable_0;
                      inductionVariable_0 = inductionVariable_0 + 1 | 0;
                      // Inline function 'androidx.collection.isFull' call
                      if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                        var index = (i << 3) + j | 0;
                        var tmp_0 = this_1.w6e_1[index];
                        (tmp_0 == null ? true : !(tmp_0 == null)) || THROW_CCE();
                        var tmp_1 = this_1.x6e_1[index];
                        var value = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
                        var tmp_2;
                        if (value instanceof MutableScatterSet()) {
                          var set = value instanceof MutableScatterSet() ? value : THROW_CCE();
                          // Inline function 'androidx.collection.MutableScatterSet.removeIf' call
                          var elements = set.j6f_1;
                          $l$block_0: {
                            // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
                            // Inline function 'kotlin.contracts.contract' call
                            var m_0 = set.i6f_1;
                            var lastIndex_0 = m_0.length - 2 | 0;
                            var inductionVariable_1 = 0;
                            if (inductionVariable_1 <= lastIndex_0)
                              do {
                                var i_0 = inductionVariable_1;
                                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                                var slot_0 = m_0[i_0];
                                // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                                var this_3 = slot_0;
                                if (!this_3.s4(this_3.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                                  var bitCount_0 = 8 - (~(i_0 - lastIndex_0 | 0) >>> 31 | 0) | 0;
                                  var inductionVariable_2 = 0;
                                  if (inductionVariable_2 < bitCount_0)
                                    do {
                                      var j_0 = inductionVariable_2;
                                      inductionVariable_2 = inductionVariable_2 + 1 | 0;
                                      // Inline function 'androidx.collection.isFull' call
                                      if (slot_0.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                                        var index_0 = (i_0 << 3) + j_0 | 0;
                                        var tmp_3 = elements[index_0];
                                        if (!((tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE()).s6y()) {
                                          set.w6f(index_0);
                                        }
                                      }
                                      slot_0 = slot_0.q4(8);
                                    }
                                     while (inductionVariable_2 < bitCount_0);
                                  if (!(bitCount_0 === 8)) {
                                    break $l$block_0;
                                  }
                                }
                              }
                               while (!(i_0 === lastIndex_0));
                          }
                          tmp_2 = set.h1();
                        } else {
                          tmp_2 = !(!(value == null) ? value : THROW_CCE()).s6y();
                        }
                        if (tmp_2) {
                          this_1.r6c(index);
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
          cleanUpDerivedStateObservations($this);
          break $l$block_2;
        }finally {
          Trace_instance.w6t(token_0);
        }
      }
    }
  }finally {
    if ($this.m6u_1.h1() && $this.r6u_1 == null) {
      manager.w70();
    }
  }
}
function tryImminentInvalidation($this, scope, instance) {
  return $this.x70() && $this.v6u_1.j6t(scope, instance);
}
function invalidateChecked($this, scope, anchor, instance) {
  // Inline function 'androidx.compose.runtime.platform.synchronized' call
  $this.e6u_1;
  var tmp0_safe_receiver = $this.s6u_1;
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    var tmp_0;
    if ($this.g6u_1.y70($this.t6u_1, anchor)) {
      tmp_0 = tmp0_safe_receiver;
    } else {
      tmp_0 = null;
    }
    tmp = tmp_0;
  }
  var delegate = tmp;
  if (delegate == null) {
    if (tryImminentInvalidation($this, scope, instance)) {
      return InvalidationResult_IMMINENT_getInstance();
    }
    var observer_0 = observer($this);
    if (instance == null) {
      ScopeMap__set_impl_3y8kbx($this.o6u_1, scope, ScopeInvalidated_instance);
    } else {
      var tmp_1;
      if (observer_0 == null) {
        tmp_1 = !(!(instance == null) ? isInterface(instance, DerivedState()) : false);
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        ScopeMap__set_impl_3y8kbx($this.o6u_1, scope, ScopeInvalidated_instance);
      } else {
        var tmp0 = $this.o6u_1;
        var tmp$ret$7;
        $l$block_1: {
          // Inline function 'androidx.compose.runtime.collection.ScopeMap.anyScopeOf' call
          // Inline function 'androidx.compose.runtime.collection.ScopeMap.forEachScopeOf' call
          var value = _ScopeMap___get_map__impl__vxhazm(tmp0).j3(scope);
          if (value != null) {
            if (value instanceof MutableScatterSet()) {
              // Inline function 'androidx.collection.ScatterSet.forEach' call
              var this_0 = value instanceof MutableScatterSet() ? value : THROW_CCE();
              // Inline function 'kotlin.contracts.contract' call
              var elements = this_0.j6f_1;
              $l$block_0: {
                // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
                // Inline function 'kotlin.contracts.contract' call
                var m = this_0.i6f_1;
                var lastIndex = m.length - 2 | 0;
                var inductionVariable = 0;
                if (inductionVariable <= lastIndex)
                  do {
                    var i = inductionVariable;
                    inductionVariable = inductionVariable + 1 | 0;
                    var slot = m[i];
                    // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                    var this_1 = slot;
                    if (!this_1.s4(this_1.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                      var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                      var inductionVariable_0 = 0;
                      if (inductionVariable_0 < bitCount)
                        do {
                          var j = inductionVariable_0;
                          inductionVariable_0 = inductionVariable_0 + 1 | 0;
                          // Inline function 'androidx.collection.isFull' call
                          if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                            var index = (i << 3) + j | 0;
                            var tmp_2 = elements[index];
                            if (((tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE()) === ScopeInvalidated_instance) {
                              tmp$ret$7 = true;
                              break $l$block_1;
                            }
                          }
                          slot = slot.q4(8);
                        }
                         while (inductionVariable_0 < bitCount);
                      if (!(bitCount === 8)) {
                        break $l$block_0;
                      }
                    }
                  }
                   while (!(i === lastIndex));
              }
            } else {
              if ((!(value == null) ? value : THROW_CCE()) === ScopeInvalidated_instance) {
                tmp$ret$7 = true;
                break $l$block_1;
              }
            }
          }
          tmp$ret$7 = false;
        }
        if (!tmp$ret$7) {
          ScopeMap__add_impl_n8b3uc($this.o6u_1, scope, instance);
        }
      }
    }
  }
  var delegate_0 = delegate;
  if (!(delegate_0 == null)) {
    return invalidateChecked(delegate_0, scope, anchor, instance);
  }
  $this.b6u_1.z70($this);
  return $this.x70() ? InvalidationResult_DEFERRED_getInstance() : InvalidationResult_SCHEDULED_getInstance();
}
function takeInvalidations($this) {
  var invalidations = $this.o6u_1;
  $this.o6u_1 = _ScopeMap___init__impl__52wntz();
  return invalidations;
}
function observer($this) {
  var holder = $this.u6u_1;
  var tmp;
  if (holder.c71_1) {
    tmp = holder.b71_1;
  } else {
    var parentHolder = $this.b6u_1.a71();
    var parentObserver = parentHolder == null ? null : parentHolder.b71_1;
    if (!equals(parentObserver, holder.b71_1)) {
      holder.b71_1 = parentObserver;
    }
    tmp = parentObserver;
  }
  return tmp;
}
var CompositionImplClass;
function CompositionImpl() {
  if (CompositionImplClass === VOID) {
    class $ {
      constructor(parent, applier, recomposeContext) {
        recomposeContext = recomposeContext === VOID ? null : recomposeContext;
        this.b6u_1 = parent;
        this.c6u_1 = applier;
        this.d6u_1 = new (AtomicReference())(null);
        var tmp = this;
        // Inline function 'androidx.compose.runtime.platform.makeSynchronizedObject' call
        tmp.e6u_1 = null == null ? new Object() : null;
        this.f6u_1 = (new (MutableScatterSet())()).x6f();
        var tmp_0 = this;
        // Inline function 'kotlin.also' call
        var this_0 = new (SlotTable())();
        if (this.b6u_1.r6p()) {
          this_0.q6p();
        }
        if (this.b6u_1.u6m()) {
          this_0.p6p();
        }
        tmp_0.g6u_1 = this_0;
        this.h6u_1 = _ScopeMap___init__impl__52wntz();
        this.i6u_1 = new (MutableScatterSet())();
        this.j6u_1 = new (MutableScatterSet())();
        this.k6u_1 = _ScopeMap___init__impl__52wntz();
        this.l6u_1 = new (ChangeList())();
        this.m6u_1 = new (ChangeList())();
        this.n6u_1 = _ScopeMap___init__impl__52wntz();
        this.o6u_1 = _ScopeMap___init__impl__52wntz();
        this.p6u_1 = false;
        this.q6u_1 = null;
        this.r6u_1 = null;
        this.s6u_1 = null;
        this.t6u_1 = 0;
        this.u6u_1 = new (CompositionObserverHolder())();
        var tmp_1 = this;
        // Inline function 'kotlin.also' call
        var this_1 = new (ComposerImpl())(this.c6u_1, this.b6u_1, this.g6u_1, this.f6u_1, this.l6u_1, this.m6u_1, this);
        this.b6u_1.d71(this_1);
        tmp_1.v6u_1 = this_1;
        this.w6u_1 = recomposeContext;
        var tmp_2 = this;
        var tmp_3 = this.b6u_1;
        tmp_2.x6u_1 = tmp_3 instanceof Recomposer();
        this.y6u_1 = false;
        this.z6u_1 = ComposableSingletons$CompositionKt_getInstance().e71_1;
      }
      x70() {
        return this.v6u_1.l6l_1;
      }
      g71() {
        return this.y6u_1;
      }
      h71(content) {
        // Inline function 'androidx.compose.runtime.checkPrecondition' call
        if (!(this.r6u_1 == null)) {
          var tmp$ret$0 = 'A pausable composition is in progress';
          throwIllegalStateException(tmp$ret$0);
        }
        composeInitial(this, content);
      }
      i71(content) {
        // Inline function 'androidx.compose.runtime.CompositionImpl.guardChanges' call
        var tmp;
        try {
          // Inline function 'androidx.compose.runtime.CompositionImpl.trackAbandonedValues' call
          var success = false;
          var tmp_0;
          try {
            // Inline function 'androidx.compose.runtime.platform.synchronized' call
            this.e6u_1;
            drainPendingModificationsForCompositionLocked(this);
            // Inline function 'androidx.compose.runtime.CompositionImpl.guardInvalidationsLocked' call
            var invalidations = takeInvalidations(this);
            var tmp_1;
            try {
              var observer_0 = observer(this);
              if (!(observer_0 == null)) {
                var tmp_2 = ScopeMap__asMap_impl_uiab3f(invalidations);
                observer_0.j71(this, isInterface(tmp_2, KtMap()) ? tmp_2 : THROW_CCE());
              }
              this.v6u_1.c6y(invalidations, content, this.q6u_1);
              var tmp_3;
              if (observer_0 == null) {
                tmp_3 = null;
              } else {
                observer_0.k71(this);
                tmp_3 = Unit_instance;
              }
              tmp_1 = tmp_3;
            } catch ($p) {
              var tmp_4;
              if ($p instanceof Exception()) {
                var e = $p;
                this.o6u_1 = invalidations;
                throw e;
              } else {
                throw $p;
              }
            }
            // Inline function 'kotlin.also' call
            success = true;
            tmp_0 = tmp_1;
          }finally {
            var tmp_5;
            if (!success) {
              // Inline function 'kotlin.collections.isNotEmpty' call
              tmp_5 = !this.f6u_1.h1();
            } else {
              tmp_5 = false;
            }
            if (tmp_5) {
              (new (RememberEventDispatcher())(this.f6u_1)).w70();
            }
          }
          tmp = tmp_0;
        } catch ($p) {
          var tmp_6;
          if ($p instanceof Exception()) {
            var e_0 = $p;
            this.l71();
            throw e_0;
          } else {
            throw $p;
          }
        }
      }
      a6v() {
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        this.e6u_1;
        drainPendingModificationsOutOfBandLocked(this);
        // Inline function 'androidx.compose.runtime.CompositionImpl.guardInvalidationsLocked' call
        var invalidations = takeInvalidations(this);
        try {
          this.v6u_1.r6t(invalidations);
        } catch ($p) {
          if ($p instanceof Exception()) {
            var e = $p;
            this.o6u_1 = invalidations;
            throw e;
          } else {
            throw $p;
          }
        }
      }
      z24() {
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        this.e6u_1;
        // Inline function 'androidx.compose.runtime.checkPrecondition' call
        if (!!this.v6u_1.l6l_1) {
          var tmp$ret$0 = 'Composition is disposed while composing. If dispose is triggered by a call in @Composable function, consider wrapping it with SideEffect block.';
          throwIllegalStateException(tmp$ret$0);
        }
        if (!this.y6u_1) {
          this.y6u_1 = true;
          this.z6u_1 = ComposableSingletons$CompositionKt_getInstance().f71_1;
          var deferredChanges = this.v6u_1.s6l_1;
          if (!(deferredChanges == null)) {
            applyChangesInLocked(this, deferredChanges);
          }
          var nonEmptySlotTable = this.g6u_1.c6m_1 > 0;
          var tmp;
          if (nonEmptySlotTable) {
            tmp = true;
          } else {
            // Inline function 'kotlin.collections.isNotEmpty' call
            tmp = !this.f6u_1.h1();
          }
          if (tmp) {
            var manager = new (RememberEventDispatcher())(this.f6u_1);
            if (nonEmptySlotTable) {
              this.c6u_1.i6i();
              // Inline function 'androidx.compose.runtime.SlotTable.write' call
              // Inline function 'kotlin.let' call
              var writer = this.g6u_1.n6p();
              var normalClose = false;
              var tmp_0;
              try {
                removeCurrentGroup(writer, manager);
                // Inline function 'kotlin.also' call
                normalClose = true;
                tmp_0 = Unit_instance;
              }finally {
                writer.s6p(normalClose);
              }
              this.c6u_1.p3();
              this.c6u_1.j6i();
              manager.u70();
            }
            manager.w70();
          }
          this.v6u_1.j6w();
        }
        this.b6u_1.m71(this);
      }
      n71(values) {
        $l$loop: while (true) {
          var old = this.d6u_1.r29();
          var tmp;
          if (old == null || equals(old, get_PendingApplyNoModifications())) {
            tmp = values;
          } else {
            if (!(old == null) ? isInterface(old, KtSet()) : false) {
              // Inline function 'kotlin.arrayOf' call
              // Inline function 'kotlin.js.unsafeCast' call
              // Inline function 'kotlin.js.asDynamic' call
              tmp = [old, values];
            } else {
              if (!(old == null) ? isArray(old) : false) {
                tmp = plus(isArray(old) ? old : THROW_CCE(), values);
              } else {
                var message = 'corrupt pendingModifications: ' + toString(this.d6u_1);
                throw IllegalStateException().o5(toString(message));
              }
            }
          }
          var new_0 = tmp;
          if (this.d6u_1.g2r(old, new_0)) {
            if (old == null) {
              // Inline function 'androidx.compose.runtime.platform.synchronized' call
              this.e6u_1;
              drainPendingModificationsLocked(this);
            }
            break $l$loop;
          }
        }
      }
      o71(values) {
        // Inline function 'androidx.compose.runtime.collection.fastForEach' call
        var tmp;
        if (values instanceof ScatterSetWrapper()) {
          // Inline function 'androidx.collection.ScatterSet.forEach' call
          var this_0 = values.w6z_1;
          // Inline function 'kotlin.contracts.contract' call
          var elements = this_0.j6f_1;
          $l$block: {
            // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
            // Inline function 'kotlin.contracts.contract' call
            var m = this_0.i6f_1;
            var lastIndex = m.length - 2 | 0;
            var inductionVariable = 0;
            if (inductionVariable <= lastIndex)
              do {
                var i = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var slot = m[i];
                // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                var this_1 = slot;
                if (!this_1.s4(this_1.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                  var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                  var inductionVariable_0 = 0;
                  if (inductionVariable_0 < bitCount)
                    do {
                      var j = inductionVariable_0;
                      inductionVariable_0 = inductionVariable_0 + 1 | 0;
                      // Inline function 'androidx.collection.isFull' call
                      if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                        var index = (i << 3) + j | 0;
                        var tmp_0 = elements[index];
                        var value = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                        if (ScopeMap__contains_impl_6qp7s6(this.h6u_1, value) || ScopeMap__contains_impl_6qp7s6(this.k6u_1, value))
                          return true;
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
          tmp = Unit_instance;
        } else {
          // Inline function 'kotlin.collections.forEach' call
          var _iterator__ex2g4s = values.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (ScopeMap__contains_impl_6qp7s6(this.h6u_1, element) || ScopeMap__contains_impl_6qp7s6(this.k6u_1, element))
              return true;
          }
          tmp = Unit_instance;
        }
        return false;
      }
      p71(block) {
        return this.v6u_1.d6y(block);
      }
      r6z(value) {
        if (!_get_areChildrenComposing__c1uwup(this)) {
          var tmp0_safe_receiver = this.v6u_1.h6w();
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            tmp0_safe_receiver.i6x(true);
            var alreadyRead = tmp0_safe_receiver.q71(value);
            if (!alreadyRead) {
              if (value instanceof StateObjectImpl()) {
                // Inline function 'androidx.compose.runtime.snapshots.Companion.Composition' call
                var tmp$ret$0 = _ReaderKind___init__impl__jqeebu(1);
                value.s71(tmp$ret$0);
              }
              ScopeMap__add_impl_n8b3uc(this.h6u_1, value, tmp0_safe_receiver);
              if (isInterface(value, DerivedState())) {
                var record = value.t71();
                ScopeMap__removeScope_impl_8k6ux1(this.k6u_1, value);
                // Inline function 'androidx.collection.ObjectIntMap.forEachKey' call
                var this_0 = record.u71();
                var k = this_0.d6d_1;
                $l$block: {
                  // Inline function 'androidx.collection.ObjectIntMap.forEachIndexed' call
                  var m = this_0.c6d_1;
                  var lastIndex = m.length - 2 | 0;
                  var inductionVariable = 0;
                  if (inductionVariable <= lastIndex)
                    do {
                      var i = inductionVariable;
                      inductionVariable = inductionVariable + 1 | 0;
                      var slot = m[i];
                      // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                      var this_1 = slot;
                      if (!this_1.s4(this_1.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                        var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                        var inductionVariable_0 = 0;
                        if (inductionVariable_0 < bitCount)
                          do {
                            var j = inductionVariable_0;
                            inductionVariable_0 = inductionVariable_0 + 1 | 0;
                            // Inline function 'androidx.collection.isFull' call
                            if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                              var index = (i << 3) + j | 0;
                              var tmp = k[index];
                              var dependency = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                              if (dependency instanceof StateObjectImpl()) {
                                // Inline function 'androidx.compose.runtime.snapshots.Companion.Composition' call
                                var tmp$ret$3 = _ReaderKind___init__impl__jqeebu(1);
                                dependency.s71(tmp$ret$3);
                              }
                              ScopeMap__add_impl_n8b3uc(this.k6u_1, dependency, value);
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
                tmp0_safe_receiver.w71(value, record.v71());
              }
            }
          }
        }
      }
      x71(value) {
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        this.e6u_1;
        invalidateScopeOfLocked(this, value);
        // Inline function 'androidx.compose.runtime.collection.ScopeMap.forEachScopeOf' call
        var this_0 = this.k6u_1;
        var value_0 = _ScopeMap___get_map__impl__vxhazm(this_0).j3(value);
        if (value_0 != null) {
          if (value_0 instanceof MutableScatterSet()) {
            // Inline function 'androidx.collection.ScatterSet.forEach' call
            var this_1 = value_0 instanceof MutableScatterSet() ? value_0 : THROW_CCE();
            // Inline function 'kotlin.contracts.contract' call
            var elements = this_1.j6f_1;
            $l$block: {
              // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
              // Inline function 'kotlin.contracts.contract' call
              var m = this_1.i6f_1;
              var lastIndex = m.length - 2 | 0;
              var inductionVariable = 0;
              if (inductionVariable <= lastIndex)
                do {
                  var i = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var slot = m[i];
                  // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                  var this_2 = slot;
                  if (!this_2.s4(this_2.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
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
                          var it = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                          invalidateScopeOfLocked(this, it);
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
          } else {
            var it_0 = !(value_0 == null) ? value_0 : THROW_CCE();
            invalidateScopeOfLocked(this, it_0);
          }
        }
        return Unit_instance;
      }
      y71() {
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        this.e6u_1;
        drainPendingModificationsForCompositionLocked(this);
        // Inline function 'androidx.compose.runtime.CompositionImpl.guardChanges' call
        var tmp;
        try {
          // Inline function 'androidx.compose.runtime.CompositionImpl.trackAbandonedValues' call
          var success = false;
          var tmp_0;
          try {
            // Inline function 'androidx.compose.runtime.CompositionImpl.guardInvalidationsLocked' call
            var invalidations = takeInvalidations(this);
            var tmp_1;
            try {
              var observer_0 = observer(this);
              if (observer_0 == null)
                null;
              else {
                var tmp_2 = ScopeMap__asMap_impl_uiab3f(invalidations);
                observer_0.j71(this, isInterface(tmp_2, KtMap()) ? tmp_2 : THROW_CCE());
              }
              // Inline function 'kotlin.also' call
              var this_0 = this.v6u_1.e6y(invalidations, this.q6u_1);
              if (!this_0) {
                drainPendingModificationsLocked(this);
              }
              if (observer_0 == null)
                null;
              else {
                observer_0.k71(this);
              }
              tmp_1 = this_0;
            } catch ($p) {
              var tmp_3;
              if ($p instanceof Exception()) {
                var e = $p;
                this.o6u_1 = invalidations;
                throw e;
              } else {
                throw $p;
              }
            }
            // Inline function 'kotlin.also' call
            success = true;
            tmp_0 = tmp_1;
          }finally {
            var tmp_4;
            if (!success) {
              // Inline function 'kotlin.collections.isNotEmpty' call
              tmp_4 = !this.f6u_1.h1();
            } else {
              tmp_4 = false;
            }
            if (tmp_4) {
              (new (RememberEventDispatcher())(this.f6u_1)).w70();
            }
          }
          tmp = tmp_0;
        } catch ($p) {
          var tmp_5;
          if ($p instanceof Exception()) {
            var e_0 = $p;
            this.l71();
            throw e_0;
          } else {
            throw $p;
          }
        }
        return tmp;
      }
      z71(references) {
        var tmp$ret$1;
        $l$block: {
          // Inline function 'androidx.compose.runtime.snapshots.fastAll' call
          // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
          var inductionVariable = 0;
          var last = references.c1() - 1 | 0;
          if (inductionVariable <= last)
            do {
              var index = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var item = references.e1(index);
              if (!equals(item.ah_1.t6s_1, this)) {
                tmp$ret$1 = false;
                break $l$block;
              }
            }
             while (inductionVariable <= last);
          tmp$ret$1 = true;
        }
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!tmp$ret$1) {
          var tmp$ret$4 = 'Check failed';
          composeImmediateRuntimeError(tmp$ret$4);
        }
        // Inline function 'androidx.compose.runtime.CompositionImpl.guardChanges' call
        try {
          // Inline function 'androidx.compose.runtime.CompositionImpl.trackAbandonedValues' call
          var success = false;
          var tmp;
          try {
            this.v6u_1.v6x(references);
            // Inline function 'kotlin.also' call
            success = true;
            tmp = Unit_instance;
          }finally {
            var tmp_0;
            if (!success) {
              // Inline function 'kotlin.collections.isNotEmpty' call
              tmp_0 = !this.f6u_1.h1();
            } else {
              tmp_0 = false;
            }
            if (tmp_0) {
              (new (RememberEventDispatcher())(this.f6u_1)).w70();
            }
          }
        } catch ($p) {
          if ($p instanceof Exception()) {
            var e = $p;
            this.l71();
            throw e;
          } else {
            throw $p;
          }
        }
      }
      a72(state) {
        var manager = new (RememberEventDispatcher())(this.f6u_1);
        var slotTable = state.c6t_1;
        // Inline function 'androidx.compose.runtime.SlotTable.write' call
        // Inline function 'kotlin.let' call
        var writer = slotTable.n6p();
        var normalClose = false;
        var tmp;
        try {
          removeCurrentGroup(writer, manager);
          // Inline function 'kotlin.also' call
          normalClose = true;
          tmp = Unit_instance;
        }finally {
          writer.s6p(normalClose);
        }
        manager.u70();
      }
      b72() {
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        this.e6u_1;
        // Inline function 'androidx.compose.runtime.CompositionImpl.guardChanges' call
        try {
          // Inline function 'androidx.compose.runtime.CompositionImpl.trackAbandonedValues' call
          var success = false;
          var tmp;
          try {
            applyChangesInLocked(this, this.l6u_1);
            drainPendingModificationsLocked(this);
            // Inline function 'kotlin.also' call
            success = true;
            tmp = Unit_instance;
          }finally {
            var tmp_0;
            if (!success) {
              // Inline function 'kotlin.collections.isNotEmpty' call
              tmp_0 = !this.f6u_1.h1();
            } else {
              tmp_0 = false;
            }
            if (tmp_0) {
              (new (RememberEventDispatcher())(this.f6u_1)).w70();
            }
          }
        } catch ($p) {
          if ($p instanceof Exception()) {
            var e = $p;
            this.l71();
            throw e;
          } else {
            throw $p;
          }
        }
      }
      c72() {
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        this.e6u_1;
        // Inline function 'androidx.compose.runtime.CompositionImpl.guardChanges' call
        try {
          // Inline function 'androidx.compose.runtime.CompositionImpl.trackAbandonedValues' call
          var success = false;
          var tmp;
          try {
            if (this.m6u_1.u6d()) {
              applyChangesInLocked(this, this.m6u_1);
            }
            // Inline function 'kotlin.also' call
            success = true;
            tmp = Unit_instance;
          }finally {
            var tmp_0;
            if (!success) {
              // Inline function 'kotlin.collections.isNotEmpty' call
              tmp_0 = !this.f6u_1.h1();
            } else {
              tmp_0 = false;
            }
            if (tmp_0) {
              (new (RememberEventDispatcher())(this.f6u_1)).w70();
            }
          }
        } catch ($p) {
          if ($p instanceof Exception()) {
            var e = $p;
            this.l71();
            throw e;
          } else {
            throw $p;
          }
        }
      }
      d72() {
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        this.e6u_1;
        // Inline function 'androidx.compose.runtime.CompositionImpl.guardChanges' call
        try {
          // Inline function 'androidx.compose.runtime.CompositionImpl.trackAbandonedValues' call
          var success = false;
          var tmp;
          try {
            this.v6u_1.g6w();
            // Inline function 'kotlin.collections.isNotEmpty' call
            if (!this.f6u_1.h1()) {
              (new (RememberEventDispatcher())(this.f6u_1)).w70();
            }
            // Inline function 'kotlin.also' call
            success = true;
            tmp = Unit_instance;
          }finally {
            var tmp_0;
            if (!success) {
              // Inline function 'kotlin.collections.isNotEmpty' call
              tmp_0 = !this.f6u_1.h1();
            } else {
              tmp_0 = false;
            }
            if (tmp_0) {
              (new (RememberEventDispatcher())(this.f6u_1)).w70();
            }
          }
        } catch ($p) {
          if ($p instanceof Exception()) {
            var e = $p;
            this.l71();
            throw e;
          } else {
            throw $p;
          }
        }
      }
      l71() {
        this.d6u_1.v2u(null);
        this.l6u_1.p3();
        this.m6u_1.p3();
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!this.f6u_1.h1()) {
          (new (RememberEventDispatcher())(this.f6u_1)).w70();
        }
      }
      e72() {
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        this.e6u_1;
        // Inline function 'kotlin.collections.forEach' call
        var indexedObject = this.g6u_1.d6m_1;
        var inductionVariable = 0;
        var last = indexedObject.length;
        while (inductionVariable < last) {
          var element = indexedObject[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          var tmp0_safe_receiver = element instanceof RecomposeScopeImpl() ? element : null;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.f72();
          }
        }
      }
      k6t(to, groupIndex, block) {
        var tmp;
        if (!(to == null) && !equals(to, this) && groupIndex >= 0) {
          var tmp_0 = this;
          tmp_0.s6u_1 = to instanceof CompositionImpl() ? to : THROW_CCE();
          this.t6u_1 = groupIndex;
          var tmp_1;
          try {
            tmp_1 = block();
          }finally {
            this.s6u_1 = null;
            this.t6u_1 = 0;
          }
          tmp = tmp_1;
        } else {
          tmp = block();
        }
        return tmp;
      }
      p6z(scope, instance) {
        if (scope.g72()) {
          scope.t6x(true);
        }
        var anchor = scope.z6j_1;
        if (anchor == null || !anchor.s6y())
          return InvalidationResult_IGNORED_getInstance();
        if (!this.g6u_1.w6y(anchor)) {
          // Inline function 'androidx.compose.runtime.platform.synchronized' call
          this.e6u_1;
          var delegate = this.s6u_1;
          if ((delegate == null ? null : tryImminentInvalidation(delegate, scope, instance)) === true)
            return InvalidationResult_IMMINENT_getInstance();
          return InvalidationResult_IGNORED_getInstance();
        }
        if (!scope.h72())
          return InvalidationResult_IGNORED_getInstance();
        return invalidateChecked(this, scope, anchor, instance);
      }
      q6z(scope) {
        this.p6u_1 = true;
      }
      i72(instance, scope) {
        ScopeMap__remove_impl_ocu4rj(this.h6u_1, instance, scope);
      }
      j72(state) {
        if (!ScopeMap__contains_impl_6qp7s6(this.h6u_1, state)) {
          ScopeMap__removeScope_impl_8k6ux1(this.k6u_1, state);
        }
      }
    }
    initMetadataForClass($, 'CompositionImpl', VOID, VOID, [RecomposeScopeOwner()]);
    CompositionImplClass = $;
  }
  return CompositionImplClass;
}
var CompositionObserverHolderClass;
function CompositionObserverHolder() {
  if (CompositionObserverHolderClass === VOID) {
    class $ {
      constructor(observer, root) {
        observer = observer === VOID ? null : observer;
        root = root === VOID ? false : root;
        this.b71_1 = observer;
        this.c71_1 = root;
      }
    }
    initMetadataForClass($, 'CompositionObserverHolder', CompositionObserverHolder);
    CompositionObserverHolderClass = $;
  }
  return CompositionObserverHolderClass;
}
function ComposableLambda$invoke$ref(p0) {
  return function (_this__u8e3s4, p0_0) {
    return p0.x6v(_this__u8e3s4, p0_0);
  };
}
function ComposableSingletons$CompositionKt$lambda$954879418$lambda($composer, $changed) {
  var $composer_0 = $composer;
  sourceInformation($composer_0, 'C:Composition.kt#9igjgp');
  if (!(($changed & 3) === 2) || !$composer_0.z6v()) {
    if (isTraceInProgress()) {
      traceEventStart(954879418, $changed, -1, 'androidx.compose.runtime.ComposableSingletons$CompositionKt.lambda$954879418.<anonymous> (Composition.kt:600)');
    }
    if (isTraceInProgress()) {
      traceEventEnd();
    }
  } else {
    $composer_0.o6p();
  }
  return Unit_instance;
}
function ComposableLambda$invoke$ref_0(p0) {
  return function (_this__u8e3s4, p0_0) {
    return p0.x6v(_this__u8e3s4, p0_0);
  };
}
function ComposableSingletons$CompositionKt$lambda$1918065384$lambda($composer, $changed) {
  var $composer_0 = $composer;
  sourceInformation($composer_0, 'C:Composition.kt#9igjgp');
  if (!(($changed & 3) === 2) || !$composer_0.z6v()) {
    if (isTraceInProgress()) {
      traceEventStart(1918065384, $changed, -1, 'androidx.compose.runtime.ComposableSingletons$CompositionKt.lambda$1918065384.<anonymous> (Composition.kt:815)');
    }
    if (isTraceInProgress()) {
      traceEventEnd();
    }
  } else {
    $composer_0.o6p();
  }
  return Unit_instance;
}
var ComposableSingletons$CompositionKtClass;
function ComposableSingletons$CompositionKt() {
  if (ComposableSingletons$CompositionKtClass === VOID) {
    class $ {
      constructor() {
        ComposableSingletons$CompositionKt_instance = this;
        var tmp = this;
        tmp.e71_1 = ComposableLambda$invoke$ref(composableLambdaInstance(954879418, false, ComposableSingletons$CompositionKt$lambda$954879418$lambda));
        var tmp_0 = this;
        tmp_0.f71_1 = ComposableLambda$invoke$ref_0(composableLambdaInstance(1918065384, false, ComposableSingletons$CompositionKt$lambda$1918065384$lambda));
      }
    }
    initMetadataForObject($, 'ComposableSingletons$CompositionKt');
    ComposableSingletons$CompositionKtClass = $;
  }
  return ComposableSingletons$CompositionKtClass;
}
var ComposableSingletons$CompositionKt_instance;
function ComposableSingletons$CompositionKt_getInstance() {
  if (ComposableSingletons$CompositionKt_instance === VOID)
    new (ComposableSingletons$CompositionKt())();
  return ComposableSingletons$CompositionKt_instance;
}
var ScopeInvalidatedClass;
function ScopeInvalidated() {
  if (ScopeInvalidatedClass === VOID) {
    class $ {}
    initMetadataForObject($, 'ScopeInvalidated');
    ScopeInvalidatedClass = $;
  }
  return ScopeInvalidatedClass;
}
var ScopeInvalidated_instance;
function ScopeInvalidated_getInstance() {
  return ScopeInvalidated_instance;
}
function Composition(applier, parent) {
  _init_properties_Composition_kt__t5pjw8();
  return new (CompositionImpl())(parent, applier);
}
var CompositionImplServiceKey$1Class;
function CompositionImplServiceKey$1() {
  if (CompositionImplServiceKey$1Class === VOID) {
    class $ {}
    initMetadataForClass($);
    CompositionImplServiceKey$1Class = $;
  }
  return CompositionImplServiceKey$1Class;
}
var properties_initialized_Composition_kt_u7hvq2;
function _init_properties_Composition_kt__t5pjw8() {
  if (!properties_initialized_Composition_kt_u7hvq2) {
    properties_initialized_Composition_kt_u7hvq2 = true;
    PendingApplyNoModifications = new Object();
    CompositionImplServiceKey = new (CompositionImplServiceKey$1())();
    androidx_compose_runtime_CompositionImpl$stable = 8;
    androidx_compose_runtime_ScopeInvalidated$stable = 0;
    androidx_compose_runtime_CompositionObserverHolder$stable = 8;
  }
}
//region block: init
ScopeInvalidated_instance = new (ScopeInvalidated())();
//endregion
//region block: exports
export {
  CompositionImpl as CompositionImpl1tgpd173nj9j9,
  Composition as Composition3i4qzif9cz3j9,
  ScopeInvalidated_instance as ScopeInvalidated_instance3kp6dmm0bc452,
};
//endregion

//# sourceMappingURL=Composition.mjs.map
