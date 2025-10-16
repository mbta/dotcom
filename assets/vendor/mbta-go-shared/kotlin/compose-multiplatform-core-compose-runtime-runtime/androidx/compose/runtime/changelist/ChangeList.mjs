import {
  OperationsDebugStringFormattableqicuv1q9gtoc as OperationsDebugStringFormattable,
  Operations2xdufa66ptvyu as Operations,
  _WriteScope___init__impl__4xwato3s9ys6hy2bi2t as _WriteScope___init__impl__4xwato,
  WriteScope__setObject_impl_rr41y93oe51qh85jjpf as WriteScope__setObject_impl_rr41y9,
  access$_get_stack__7szo531fdoxvn75wfm0 as access$_get_stack__7szo53,
  access$_get_pushedIntMask__wrtr8x2m8stwwd19q3c as access$_get_pushedIntMask__wrtr8x,
  _WriteScope___get_operation__impl__krvgwa3di2vupzclgqt as _WriteScope___get_operation__impl__krvgwa,
  access$_set_pushedIntMask__hk28qlz2aymbr5zehr as access$_set_pushedIntMask__hk28ql,
  WriteScope__setObjects_impl_utvr6i2eilw8dxshv6g as WriteScope__setObjects_impl_utvr6i,
  WriteScope__setObjects_impl_utvr6i2kf45xe955ql9 as WriteScope__setObjects_impl_utvr6i_0,
  WriteScope__setObjects_impl_utvr6i2b5o9u98l9nnw as WriteScope__setObjects_impl_utvr6i_1,
} from './Operations.mjs';
import {
  Remember_getInstance1ej0eidin8pt3 as Remember_getInstance,
  _ObjectParameter___init__impl__iyg1ip30kg7ewch5fu5 as _ObjectParameter___init__impl__iyg1ip,
  RememberPausingScope_getInstance1vyfd9wjhj8y3 as RememberPausingScope_getInstance,
  StartResumingScope_getInstance11yxs0wgvlho8 as StartResumingScope_getInstance,
  EndResumingScope_getInstance3njxf8klao6ja as EndResumingScope_getInstance,
  UpdateValue_getInstance2sl1my6qhllqu as UpdateValue_getInstance,
  UpdateAnchoredValue_getInstance295xbkaqac4in as UpdateAnchoredValue_getInstance,
  AppendValue_getInstance12h1b8axomyji as AppendValue_getInstance,
  TrimParentValues_getInstanceq92kovxz2da6 as TrimParentValues_getInstance,
  ResetSlots_getInstance1rxs84vztxdba as ResetSlots_getInstance,
  UpdateAuxData_getInstancer38ewqlvz26b as UpdateAuxData_getInstance,
  EnsureRootGroupStarted_getInstance1k0gu7xm5aa70 as EnsureRootGroupStarted_getInstance,
  EnsureGroupStarted_getInstance1q7squw3sxbcs as EnsureGroupStarted_getInstance,
  EndCurrentGroup_getInstanceho7akk2cfm5g as EndCurrentGroup_getInstance,
  SkipToEndOfCurrentGroup_getInstance5npsg6nl2jar as SkipToEndOfCurrentGroup_getInstance,
  RemoveCurrentGroup_getInstance3rczia54mmi25 as RemoveCurrentGroup_getInstance,
  InsertSlots_getInstance3l63bj7ms1um9 as InsertSlots_getInstance,
  InsertSlotsWithFixups_getInstance34a6rh6yvr8yl as InsertSlotsWithFixups_getInstance,
  MoveCurrentGroup_getInstancea4uocq2u4rjg as MoveCurrentGroup_getInstance,
  EndCompositionScope_getInstancejq6c644693ow as EndCompositionScope_getInstance,
  RemoveNode_getInstanceufbw3pg898f3 as RemoveNode_getInstance,
  MoveNode_getInstance3e29wzw6kai6r as MoveNode_getInstance,
  AdvanceSlotsBy_getInstance2xtnusw47iqzk as AdvanceSlotsBy_getInstance,
  Ups_getInstanceb3yatpfpvojo as Ups_getInstance,
  Downs_getInstance13z9hr3bjbk90 as Downs_getInstance,
  DetermineMovableContentNodeIndex_getInstance9opzjz4ux8fa as DetermineMovableContentNodeIndex_getInstance,
  CopyNodesToNewAnchorLocation_getInstance3lyobkt0vbh4q as CopyNodesToNewAnchorLocation_getInstance,
  CopySlotTableToAnchorLocation_getInstance3i6mlzv6lpqdh as CopySlotTableToAnchorLocation_getInstance,
  ReleaseMovableGroupAtCurrent_getInstance1173qjmwxmrnm as ReleaseMovableGroupAtCurrent_getInstance,
  EndMovableContentPlacement_getInstancegolg20cppoi3 as EndMovableContentPlacement_getInstance,
  ApplyChangeList_getInstance1l1y4ifcksncl as ApplyChangeList_getInstance,
} from './Operation.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { composeImmediateRuntimeError2yqil22w149j8 as composeImmediateRuntimeError } from '../Composer.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_changelist_ChangeList$stable;
var ChangeListClass;
function ChangeList() {
  if (ChangeListClass === VOID) {
    class $ extends OperationsDebugStringFormattable() {
      constructor() {
        super();
        this.m6w_1 = new (Operations())();
      }
      h1() {
        return this.m6w_1.h1();
      }
      u6d() {
        return this.m6w_1.u6d();
      }
      p3() {
        this.m6w_1.p3();
      }
      i70(applier, slots, rememberManager) {
        return this.m6w_1.q7e(applier, slots, rememberManager);
      }
      r7e(value) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = Remember_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.Remember.Value' call
        Remember_getInstance();
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        WriteScope__setObject_impl_rr41y9($this$push, tmp$ret$0, value);
        tmp0.t7e(operation);
      }
      u7e(scope) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = RememberPausingScope_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.RememberPausingScope.Scope' call
        RememberPausingScope_getInstance();
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        WriteScope__setObject_impl_rr41y9($this$push, tmp$ret$0, scope);
        tmp0.t7e(operation);
      }
      v7e(scope) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = StartResumingScope_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.StartResumingScope.Scope' call
        StartResumingScope_getInstance();
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        WriteScope__setObject_impl_rr41y9($this$push, tmp$ret$0, scope);
        tmp0.t7e(operation);
      }
      w7e(scope) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = EndResumingScope_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.EndResumingScope.Scope' call
        EndResumingScope_getInstance();
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        WriteScope__setObject_impl_rr41y9($this$push, tmp$ret$0, scope);
        tmp0.t7e(operation);
      }
      x7e(value, groupSlotIndex) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = UpdateValue_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.UpdateValue.Value' call
        UpdateValue_getInstance();
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        WriteScope__setObject_impl_rr41y9($this$push, tmp$ret$0, value);
        // Inline function 'androidx.compose.runtime.changelist.UpdateValue.GroupSlotIndex' call
        UpdateValue_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.WriteScope.setInt' call
        // Inline function 'kotlin.with' call
        var $this$with = access$_get_stack__7szo53($this$push);
        if (false) {
          var mask = 1 << 0;
          // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
          var value_0 = (access$_get_pushedIntMask__wrtr8x($this$with) & mask) === 0;
          if (false && !value_0) {
            var tmp$ret$2 = 'Already pushed argument ' + _WriteScope___get_operation__impl__krvgwa($this$push).a7f(0);
            composeImmediateRuntimeError(tmp$ret$2);
          }
          access$_set_pushedIntMask__hk28ql($this$with, access$_get_pushedIntMask__wrtr8x($this$with) | mask);
        }
        var tmp = $this$with.k7e_1;
        var tmp_0 = $this$with.l7e_1;
        tmp[(tmp_0 - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].y7e_1 | 0) + 0 | 0] = groupSlotIndex;
        tmp0.t7e(operation);
      }
      b7f(value, anchor, groupSlotIndex) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = UpdateAnchoredValue_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.UpdateAnchoredValue.Value' call
        UpdateAnchoredValue_getInstance();
        var tmp = _ObjectParameter___init__impl__iyg1ip(0);
        // Inline function 'androidx.compose.runtime.changelist.UpdateAnchoredValue.Anchor' call
        UpdateAnchoredValue_getInstance();
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
        WriteScope__setObjects_impl_utvr6i($this$push, tmp, value, tmp$ret$1, anchor);
        // Inline function 'androidx.compose.runtime.changelist.UpdateAnchoredValue.GroupSlotIndex' call
        UpdateAnchoredValue_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.WriteScope.setInt' call
        // Inline function 'kotlin.with' call
        var $this$with = access$_get_stack__7szo53($this$push);
        if (false) {
          var mask = 1 << 0;
          // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
          var value_0 = (access$_get_pushedIntMask__wrtr8x($this$with) & mask) === 0;
          if (false && !value_0) {
            var tmp$ret$3 = 'Already pushed argument ' + _WriteScope___get_operation__impl__krvgwa($this$push).a7f(0);
            composeImmediateRuntimeError(tmp$ret$3);
          }
          access$_set_pushedIntMask__hk28ql($this$with, access$_get_pushedIntMask__wrtr8x($this$with) | mask);
        }
        var tmp_0 = $this$with.k7e_1;
        var tmp_1 = $this$with.l7e_1;
        tmp_0[(tmp_1 - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].y7e_1 | 0) + 0 | 0] = groupSlotIndex;
        tmp0.t7e(operation);
      }
      c7f(anchor, value) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = AppendValue_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.AppendValue.Anchor' call
        AppendValue_getInstance();
        var tmp = _ObjectParameter___init__impl__iyg1ip(0);
        // Inline function 'androidx.compose.runtime.changelist.AppendValue.Value' call
        AppendValue_getInstance();
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
        WriteScope__setObjects_impl_utvr6i($this$push, tmp, anchor, tmp$ret$1, value);
        tmp0.t7e(operation);
      }
      d7f(count) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = TrimParentValues_getInstance();
        tmp0.s7e(operation);
        var tmp0_0 = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.TrimParentValues.Count' call
        TrimParentValues_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.WriteScope.setInt' call
        // Inline function 'kotlin.with' call
        var $this$with = access$_get_stack__7szo53(tmp0_0);
        if (false) {
          var mask = 1 << 0;
          // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
          var value = (access$_get_pushedIntMask__wrtr8x($this$with) & mask) === 0;
          if (false && !value) {
            var tmp$ret$1 = 'Already pushed argument ' + _WriteScope___get_operation__impl__krvgwa(tmp0_0).a7f(0);
            composeImmediateRuntimeError(tmp$ret$1);
          }
          access$_set_pushedIntMask__hk28ql($this$with, access$_get_pushedIntMask__wrtr8x($this$with) | mask);
        }
        var tmp = $this$with.k7e_1;
        var tmp_0 = $this$with.l7e_1;
        tmp[(tmp_0 - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].y7e_1 | 0) + 0 | 0] = count;
        tmp0.t7e(operation);
      }
      e7f() {
        this.m6w_1.f7f(ResetSlots_getInstance());
      }
      g7f(data) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = UpdateAuxData_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.UpdateAuxData.Data' call
        UpdateAuxData_getInstance();
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        WriteScope__setObject_impl_rr41y9($this$push, tmp$ret$0, data);
        tmp0.t7e(operation);
      }
      h7f() {
        this.m6w_1.f7f(EnsureRootGroupStarted_getInstance());
      }
      i7f(anchor) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = EnsureGroupStarted_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.EnsureGroupStarted.Anchor' call
        EnsureGroupStarted_getInstance();
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        WriteScope__setObject_impl_rr41y9($this$push, tmp$ret$0, anchor);
        tmp0.t7e(operation);
      }
      j7f() {
        this.m6w_1.f7f(EndCurrentGroup_getInstance());
      }
      k7f() {
        this.m6w_1.f7f(SkipToEndOfCurrentGroup_getInstance());
      }
      l7f() {
        this.m6w_1.f7f(RemoveCurrentGroup_getInstance());
      }
      m7f(anchor, from) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = InsertSlots_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.InsertSlots.Anchor' call
        InsertSlots_getInstance();
        var tmp = _ObjectParameter___init__impl__iyg1ip(0);
        // Inline function 'androidx.compose.runtime.changelist.InsertSlots.FromSlotTable' call
        InsertSlots_getInstance();
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
        WriteScope__setObjects_impl_utvr6i($this$push, tmp, anchor, tmp$ret$1, from);
        tmp0.t7e(operation);
      }
      n7f(anchor, from, fixups) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = InsertSlotsWithFixups_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.InsertSlotsWithFixups.Anchor' call
        InsertSlotsWithFixups_getInstance();
        var tmp = _ObjectParameter___init__impl__iyg1ip(0);
        // Inline function 'androidx.compose.runtime.changelist.InsertSlotsWithFixups.FromSlotTable' call
        InsertSlotsWithFixups_getInstance();
        var tmp_0 = _ObjectParameter___init__impl__iyg1ip(1);
        // Inline function 'androidx.compose.runtime.changelist.InsertSlotsWithFixups.Fixups' call
        InsertSlotsWithFixups_getInstance();
        var tmp$ret$2 = _ObjectParameter___init__impl__iyg1ip(2);
        WriteScope__setObjects_impl_utvr6i_0($this$push, tmp, anchor, tmp_0, from, tmp$ret$2, fixups);
        tmp0.t7e(operation);
      }
      o7f(offset) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = MoveCurrentGroup_getInstance();
        tmp0.s7e(operation);
        var tmp0_0 = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.MoveCurrentGroup.Offset' call
        MoveCurrentGroup_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.WriteScope.setInt' call
        // Inline function 'kotlin.with' call
        var $this$with = access$_get_stack__7szo53(tmp0_0);
        if (false) {
          var mask = 1 << 0;
          // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
          var value = (access$_get_pushedIntMask__wrtr8x($this$with) & mask) === 0;
          if (false && !value) {
            var tmp$ret$1 = 'Already pushed argument ' + _WriteScope___get_operation__impl__krvgwa(tmp0_0).a7f(0);
            composeImmediateRuntimeError(tmp$ret$1);
          }
          access$_set_pushedIntMask__hk28ql($this$with, access$_get_pushedIntMask__wrtr8x($this$with) | mask);
        }
        var tmp = $this$with.k7e_1;
        var tmp_0 = $this$with.l7e_1;
        tmp[(tmp_0 - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].y7e_1 | 0) + 0 | 0] = offset;
        tmp0.t7e(operation);
      }
      p7f(action, composition) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = EndCompositionScope_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.EndCompositionScope.Action' call
        EndCompositionScope_getInstance();
        var tmp = _ObjectParameter___init__impl__iyg1ip(0);
        // Inline function 'androidx.compose.runtime.changelist.EndCompositionScope.Composition' call
        EndCompositionScope_getInstance();
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
        WriteScope__setObjects_impl_utvr6i($this$push, tmp, action, tmp$ret$1, composition);
        tmp0.t7e(operation);
      }
      q7f(removeFrom, moveCount) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = RemoveNode_getInstance();
        tmp0.s7e(operation);
        var tmp0_0 = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.RemoveNode.RemoveIndex' call
        RemoveNode_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.RemoveNode.Count' call
        RemoveNode_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.WriteScope.setInts' call
        // Inline function 'kotlin.with' call
        var $this$with = access$_get_stack__7szo53(tmp0_0);
        if (false) {
          var mask = 1 << 0 | 1 << 1;
          // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
          var value = (access$_get_pushedIntMask__wrtr8x($this$with) & mask) === 0;
          if (false && !value) {
            var tmp$ret$2 = 'Already pushed argument(s) ' + _WriteScope___get_operation__impl__krvgwa(tmp0_0).a7f(0) + (', ' + _WriteScope___get_operation__impl__krvgwa(tmp0_0).a7f(1));
            composeImmediateRuntimeError(tmp$ret$2);
          }
          access$_set_pushedIntMask__hk28ql($this$with, access$_get_pushedIntMask__wrtr8x($this$with) | mask);
        }
        var tmp = $this$with.l7e_1;
        var base = tmp - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].y7e_1 | 0;
        var intArgs = $this$with.k7e_1;
        intArgs[base + 0 | 0] = removeFrom;
        intArgs[base + 1 | 0] = moveCount;
        tmp0.t7e(operation);
      }
      r7f(to, from, count) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = MoveNode_getInstance();
        tmp0.s7e(operation);
        var tmp0_0 = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.MoveNode.To' call
        MoveNode_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.MoveNode.From' call
        MoveNode_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.MoveNode.Count' call
        MoveNode_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.WriteScope.setInts' call
        // Inline function 'kotlin.with' call
        var $this$with = access$_get_stack__7szo53(tmp0_0);
        if (false) {
          var mask = 1 << 1 | 1 << 0 | 1 << 2;
          // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
          var value = (access$_get_pushedIntMask__wrtr8x($this$with) & mask) === 0;
          if (false && !value) {
            var tmp$ret$3 = 'Already pushed argument(s) ' + _WriteScope___get_operation__impl__krvgwa(tmp0_0).a7f(1) + (', ' + _WriteScope___get_operation__impl__krvgwa(tmp0_0).a7f(0)) + (', ' + _WriteScope___get_operation__impl__krvgwa(tmp0_0).a7f(2));
            composeImmediateRuntimeError(tmp$ret$3);
          }
          access$_set_pushedIntMask__hk28ql($this$with, access$_get_pushedIntMask__wrtr8x($this$with) | mask);
        }
        var tmp = $this$with.l7e_1;
        var base = tmp - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].y7e_1 | 0;
        var intArgs = $this$with.k7e_1;
        intArgs[base + 1 | 0] = to;
        intArgs[base + 0 | 0] = from;
        intArgs[base + 2 | 0] = count;
        tmp0.t7e(operation);
      }
      s7f(distance) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = AdvanceSlotsBy_getInstance();
        tmp0.s7e(operation);
        var tmp0_0 = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.AdvanceSlotsBy.Distance' call
        AdvanceSlotsBy_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.WriteScope.setInt' call
        // Inline function 'kotlin.with' call
        var $this$with = access$_get_stack__7szo53(tmp0_0);
        if (false) {
          var mask = 1 << 0;
          // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
          var value = (access$_get_pushedIntMask__wrtr8x($this$with) & mask) === 0;
          if (false && !value) {
            var tmp$ret$1 = 'Already pushed argument ' + _WriteScope___get_operation__impl__krvgwa(tmp0_0).a7f(0);
            composeImmediateRuntimeError(tmp$ret$1);
          }
          access$_set_pushedIntMask__hk28ql($this$with, access$_get_pushedIntMask__wrtr8x($this$with) | mask);
        }
        var tmp = $this$with.k7e_1;
        var tmp_0 = $this$with.l7e_1;
        tmp[(tmp_0 - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].y7e_1 | 0) + 0 | 0] = distance;
        tmp0.t7e(operation);
      }
      t7f(count) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = Ups_getInstance();
        tmp0.s7e(operation);
        var tmp0_0 = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.Ups.Count' call
        Ups_getInstance();
        // Inline function 'androidx.compose.runtime.changelist.WriteScope.setInt' call
        // Inline function 'kotlin.with' call
        var $this$with = access$_get_stack__7szo53(tmp0_0);
        if (false) {
          var mask = 1 << 0;
          // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
          var value = (access$_get_pushedIntMask__wrtr8x($this$with) & mask) === 0;
          if (false && !value) {
            var tmp$ret$1 = 'Already pushed argument ' + _WriteScope___get_operation__impl__krvgwa(tmp0_0).a7f(0);
            composeImmediateRuntimeError(tmp$ret$1);
          }
          access$_set_pushedIntMask__hk28ql($this$with, access$_get_pushedIntMask__wrtr8x($this$with) | mask);
        }
        var tmp = $this$with.k7e_1;
        var tmp_0 = $this$with.l7e_1;
        tmp[(tmp_0 - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].y7e_1 | 0) + 0 | 0] = count;
        tmp0.t7e(operation);
      }
      u7f(nodes) {
        // Inline function 'kotlin.collections.isNotEmpty' call
        // Inline function 'kotlin.collections.isEmpty' call
        if (!(nodes.length === 0)) {
          var tmp0 = this.m6w_1;
          // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
          var operation = Downs_getInstance();
          tmp0.s7e(operation);
          var $this$push = _WriteScope___init__impl__4xwato(tmp0);
          // Inline function 'androidx.compose.runtime.changelist.Downs.Nodes' call
          Downs_getInstance();
          var tmp$ret$2 = _ObjectParameter___init__impl__iyg1ip(0);
          WriteScope__setObject_impl_rr41y9($this$push, tmp$ret$2, nodes);
          tmp0.t7e(operation);
        }
      }
      v7f(effectiveNodeIndexOut, anchor) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = DetermineMovableContentNodeIndex_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.DetermineMovableContentNodeIndex.EffectiveNodeIndexOut' call
        DetermineMovableContentNodeIndex_getInstance();
        var tmp = _ObjectParameter___init__impl__iyg1ip(0);
        // Inline function 'androidx.compose.runtime.changelist.DetermineMovableContentNodeIndex.Anchor' call
        DetermineMovableContentNodeIndex_getInstance();
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
        WriteScope__setObjects_impl_utvr6i($this$push, tmp, effectiveNodeIndexOut, tmp$ret$1, anchor);
        tmp0.t7e(operation);
      }
      w7f(nodes, effectiveNodeIndex) {
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!nodes.h1()) {
          var tmp0 = this.m6w_1;
          // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
          var operation = CopyNodesToNewAnchorLocation_getInstance();
          tmp0.s7e(operation);
          var $this$push = _WriteScope___init__impl__4xwato(tmp0);
          // Inline function 'androidx.compose.runtime.changelist.CopyNodesToNewAnchorLocation.Nodes' call
          CopyNodesToNewAnchorLocation_getInstance();
          var tmp = _ObjectParameter___init__impl__iyg1ip(1);
          // Inline function 'androidx.compose.runtime.changelist.CopyNodesToNewAnchorLocation.EffectiveNodeIndex' call
          CopyNodesToNewAnchorLocation_getInstance();
          var tmp$ret$2 = _ObjectParameter___init__impl__iyg1ip(0);
          WriteScope__setObjects_impl_utvr6i($this$push, tmp, nodes, tmp$ret$2, effectiveNodeIndex);
          tmp0.t7e(operation);
        }
      }
      x7f(resolvedState, parentContext, from, to) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = CopySlotTableToAnchorLocation_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.ResolvedState' call
        CopySlotTableToAnchorLocation_getInstance();
        var tmp = _ObjectParameter___init__impl__iyg1ip(0);
        // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.ParentCompositionContext' call
        CopySlotTableToAnchorLocation_getInstance();
        var tmp_0 = _ObjectParameter___init__impl__iyg1ip(1);
        // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.To' call
        CopySlotTableToAnchorLocation_getInstance();
        var tmp_1 = _ObjectParameter___init__impl__iyg1ip(3);
        // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.From' call
        CopySlotTableToAnchorLocation_getInstance();
        var tmp$ret$3 = _ObjectParameter___init__impl__iyg1ip(2);
        WriteScope__setObjects_impl_utvr6i_1($this$push, tmp, resolvedState, tmp_0, parentContext, tmp_1, to, tmp$ret$3, from);
        tmp0.t7e(operation);
      }
      y7f(composition, parentContext, reference) {
        var tmp0 = this.m6w_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
        var operation = ReleaseMovableGroupAtCurrent_getInstance();
        tmp0.s7e(operation);
        var $this$push = _WriteScope___init__impl__4xwato(tmp0);
        // Inline function 'androidx.compose.runtime.changelist.ReleaseMovableGroupAtCurrent.Composition' call
        ReleaseMovableGroupAtCurrent_getInstance();
        var tmp = _ObjectParameter___init__impl__iyg1ip(0);
        // Inline function 'androidx.compose.runtime.changelist.ReleaseMovableGroupAtCurrent.ParentCompositionContext' call
        ReleaseMovableGroupAtCurrent_getInstance();
        var tmp_0 = _ObjectParameter___init__impl__iyg1ip(1);
        // Inline function 'androidx.compose.runtime.changelist.ReleaseMovableGroupAtCurrent.Reference' call
        ReleaseMovableGroupAtCurrent_getInstance();
        var tmp$ret$2 = _ObjectParameter___init__impl__iyg1ip(2);
        WriteScope__setObjects_impl_utvr6i_0($this$push, tmp, composition, tmp_0, parentContext, tmp$ret$2, reference);
        tmp0.t7e(operation);
      }
      z7f() {
        this.m6w_1.f7f(EndMovableContentPlacement_getInstance());
      }
      a7g(changeList, effectiveNodeIndex) {
        if (changeList.u6d()) {
          var tmp0 = this.m6w_1;
          // Inline function 'androidx.compose.runtime.changelist.Operations.push' call
          var operation = ApplyChangeList_getInstance();
          tmp0.s7e(operation);
          var $this$push = _WriteScope___init__impl__4xwato(tmp0);
          // Inline function 'androidx.compose.runtime.changelist.ApplyChangeList.Changes' call
          ApplyChangeList_getInstance();
          var tmp = _ObjectParameter___init__impl__iyg1ip(0);
          // Inline function 'androidx.compose.runtime.changelist.ApplyChangeList.EffectiveNodeIndex' call
          ApplyChangeList_getInstance();
          var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
          WriteScope__setObjects_impl_utvr6i($this$push, tmp, changeList, tmp$ret$1, effectiveNodeIndex);
          tmp0.t7e(operation);
        }
      }
    }
    initMetadataForClass($, 'ChangeList', ChangeList);
    ChangeListClass = $;
  }
  return ChangeListClass;
}
//region block: init
androidx_compose_runtime_changelist_ChangeList$stable = 8;
//endregion
//region block: exports
export {
  ChangeList as ChangeList1sysvm9xsleqf,
};
//endregion

//# sourceMappingURL=ChangeList.mjs.map
