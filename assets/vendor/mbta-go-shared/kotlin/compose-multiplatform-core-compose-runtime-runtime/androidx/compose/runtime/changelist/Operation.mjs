import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  Applierx5za2jtogbgc as Applier,
  OffsetApplier2oaojuw9mrqj0 as OffsetApplier,
} from '../Applier.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  RememberObserverHolder2jg8joqsn8vk0 as RememberObserverHolder,
  removeCurrentGroup386jym91uivhi as removeCurrentGroup,
  composeRuntimeErrorzyuropknqb0d as composeRuntimeError,
  extractMovableContentAtCurrentwkopqs6uzk4e as extractMovableContentAtCurrent,
  composeImmediateRuntimeError2yqil22w149j8 as composeImmediateRuntimeError,
} from '../Composer.mjs';
import {
  access$_get_slots__7x4q9w3qy38elwcr3sh as access$_get_slots__7x4q9w,
  access$dataIndexToDataAddress15xkqvecujrho as access$dataIndexToDataAddress,
} from '../SlotTable.mjs';
import {
  RecomposeScopeImpl15912wzsvt7nn as RecomposeScopeImpl,
  Companion_instance1wfemb066pnm2 as Companion_instance,
  RecomposeScopeOwner128iyp4kpa98t as RecomposeScopeOwner,
} from '../RecomposeScopeImpl.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_changelist_Operation_Ups$stable;
var androidx_compose_runtime_changelist_Operation_Downs$stable;
var androidx_compose_runtime_changelist_Operation_AdvanceSlotsBy$stable;
var androidx_compose_runtime_changelist_Operation_SideEffect$stable;
var androidx_compose_runtime_changelist_Operation_Remember$stable;
var androidx_compose_runtime_changelist_Operation_RememberPausingScope$stable;
var androidx_compose_runtime_changelist_Operation_StartResumingScope$stable;
var androidx_compose_runtime_changelist_Operation_EndResumingScope$stable;
var androidx_compose_runtime_changelist_Operation_AppendValue$stable;
var androidx_compose_runtime_changelist_Operation_TrimParentValues$stable;
var androidx_compose_runtime_changelist_Operation_UpdateValue$stable;
var androidx_compose_runtime_changelist_Operation_UpdateAnchoredValue$stable;
var androidx_compose_runtime_changelist_Operation_UpdateAuxData$stable;
var androidx_compose_runtime_changelist_Operation_EnsureRootGroupStarted$stable;
var androidx_compose_runtime_changelist_Operation_EnsureGroupStarted$stable;
var androidx_compose_runtime_changelist_Operation_RemoveCurrentGroup$stable;
var androidx_compose_runtime_changelist_Operation_MoveCurrentGroup$stable;
var androidx_compose_runtime_changelist_Operation_EndCurrentGroup$stable;
var androidx_compose_runtime_changelist_Operation_SkipToEndOfCurrentGroup$stable;
var androidx_compose_runtime_changelist_Operation_EndCompositionScope$stable;
var androidx_compose_runtime_changelist_Operation_UseCurrentNode$stable;
var androidx_compose_runtime_changelist_Operation_UpdateNode$stable;
var androidx_compose_runtime_changelist_Operation_RemoveNode$stable;
var androidx_compose_runtime_changelist_Operation_MoveNode$stable;
var androidx_compose_runtime_changelist_Operation_InsertSlots$stable;
var androidx_compose_runtime_changelist_Operation_InsertSlotsWithFixups$stable;
var androidx_compose_runtime_changelist_Operation_InsertNodeFixup$stable;
var androidx_compose_runtime_changelist_Operation_PostInsertNodeFixup$stable;
var androidx_compose_runtime_changelist_Operation_DeactivateCurrentGroup$stable;
var androidx_compose_runtime_changelist_Operation_ResetSlots$stable;
var androidx_compose_runtime_changelist_Operation_DetermineMovableContentNodeIndex$stable;
var androidx_compose_runtime_changelist_Operation_CopyNodesToNewAnchorLocation$stable;
var androidx_compose_runtime_changelist_Operation_CopySlotTableToAnchorLocation$stable;
var androidx_compose_runtime_changelist_Operation_EndMovableContentPlacement$stable;
var androidx_compose_runtime_changelist_Operation_ReleaseMovableGroupAtCurrent$stable;
var androidx_compose_runtime_changelist_Operation_ApplyChangeList$stable;
var androidx_compose_runtime_changelist_Operation_TestOperation$stable;
var androidx_compose_runtime_changelist_Operation$stable;
function _ObjectParameter___init__impl__iyg1ip(offset) {
  return offset;
}
function _ObjectParameter___get_offset__impl__x7fx93($this) {
  return $this;
}
var UpsClass;
function Ups() {
  if (UpsClass === VOID) {
    class $ extends Operation() {
      constructor() {
        Ups_instance = null;
        super(1);
        Ups_instance = this;
      }
      a7f(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.Ups.Count' call
        if (parameter === 0) {
          tmp = 'count';
        } else {
          tmp = super.a7f(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.Ups.Count' call
        // Inline function 'kotlin.repeat' call
        var times = _this__u8e3s4.h7g(0);
        var inductionVariable = 0;
        if (inductionVariable < times)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            applier.l6i();
          }
           while (inductionVariable < times);
      }
    }
    initMetadataForObject($, 'Ups');
    UpsClass = $;
  }
  return UpsClass;
}
var Ups_instance;
function Ups_getInstance() {
  if (Ups_instance === VOID)
    new (Ups())();
  return Ups_instance;
}
var DownsClass;
function Downs() {
  if (DownsClass === VOID) {
    class $ extends Operation() {
      constructor() {
        Downs_instance = null;
        super(VOID, 1);
        Downs_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.Downs.Nodes' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'nodes';
        } else {
          tmp = super.i7g(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        var nodeApplier = isInterface(applier, Applier()) ? applier : THROW_CCE();
        // Inline function 'androidx.compose.runtime.changelist.Downs.Nodes' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var nodes = _this__u8e3s4.l7g(tmp$ret$0);
        var inductionVariable = 0;
        var last = nodes.length - 1 | 0;
        if (inductionVariable <= last)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            nodeApplier.k6i(nodes[index]);
          }
           while (inductionVariable <= last);
      }
    }
    initMetadataForObject($, 'Downs');
    DownsClass = $;
  }
  return DownsClass;
}
var Downs_instance;
function Downs_getInstance() {
  if (Downs_instance === VOID)
    new (Downs())();
  return Downs_instance;
}
var AdvanceSlotsByClass;
function AdvanceSlotsBy() {
  if (AdvanceSlotsByClass === VOID) {
    class $ extends Operation() {
      constructor() {
        AdvanceSlotsBy_instance = null;
        super(1);
        AdvanceSlotsBy_instance = this;
      }
      a7f(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.AdvanceSlotsBy.Distance' call
        if (parameter === 0) {
          tmp = 'distance';
        } else {
          tmp = super.a7f(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.AdvanceSlotsBy.Distance' call
        slots.x6y(_this__u8e3s4.h7g(0));
      }
    }
    initMetadataForObject($, 'AdvanceSlotsBy');
    AdvanceSlotsByClass = $;
  }
  return AdvanceSlotsByClass;
}
var AdvanceSlotsBy_instance;
function AdvanceSlotsBy_getInstance() {
  if (AdvanceSlotsBy_instance === VOID)
    new (AdvanceSlotsBy())();
  return AdvanceSlotsBy_instance;
}
var RememberClass;
function Remember() {
  if (RememberClass === VOID) {
    class $ extends Operation() {
      constructor() {
        Remember_instance = null;
        super(VOID, 1);
        Remember_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.Remember.Value' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'value';
        } else {
          tmp = super.i7g(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.Remember.Value' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        rememberManager.q7g(_this__u8e3s4.l7g(tmp$ret$0));
      }
    }
    initMetadataForObject($, 'Remember');
    RememberClass = $;
  }
  return RememberClass;
}
var Remember_instance;
function Remember_getInstance() {
  if (Remember_instance === VOID)
    new (Remember())();
  return Remember_instance;
}
var RememberPausingScopeClass;
function RememberPausingScope() {
  if (RememberPausingScopeClass === VOID) {
    class $ extends Operation() {
      constructor() {
        RememberPausingScope_instance = null;
        super(VOID, 1);
        RememberPausingScope_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.RememberPausingScope.Scope' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'scope';
        } else {
          tmp = super.i7g(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.RememberPausingScope.Scope' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var scope = _this__u8e3s4.l7g(tmp$ret$0);
        rememberManager.k6x(scope);
      }
    }
    initMetadataForObject($, 'RememberPausingScope');
    RememberPausingScopeClass = $;
  }
  return RememberPausingScopeClass;
}
var RememberPausingScope_instance;
function RememberPausingScope_getInstance() {
  if (RememberPausingScope_instance === VOID)
    new (RememberPausingScope())();
  return RememberPausingScope_instance;
}
var StartResumingScopeClass;
function StartResumingScope() {
  if (StartResumingScopeClass === VOID) {
    class $ extends Operation() {
      constructor() {
        StartResumingScope_instance = null;
        super(VOID, 1);
        StartResumingScope_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.StartResumingScope.Scope' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'scope';
        } else {
          tmp = super.i7g(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.StartResumingScope.Scope' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var scope = _this__u8e3s4.l7g(tmp$ret$0);
        rememberManager.k6s(scope);
      }
    }
    initMetadataForObject($, 'StartResumingScope');
    StartResumingScopeClass = $;
  }
  return StartResumingScopeClass;
}
var StartResumingScope_instance;
function StartResumingScope_getInstance() {
  if (StartResumingScope_instance === VOID)
    new (StartResumingScope())();
  return StartResumingScope_instance;
}
var EndResumingScopeClass;
function EndResumingScope() {
  if (EndResumingScopeClass === VOID) {
    class $ extends Operation() {
      constructor() {
        EndResumingScope_instance = null;
        super(VOID, 1);
        EndResumingScope_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.EndResumingScope.Scope' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'scope';
        } else {
          tmp = super.i7g(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.EndResumingScope.Scope' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var scope = _this__u8e3s4.l7g(tmp$ret$0);
        rememberManager.r6x(scope);
      }
    }
    initMetadataForObject($, 'EndResumingScope');
    EndResumingScopeClass = $;
  }
  return EndResumingScopeClass;
}
var EndResumingScope_instance;
function EndResumingScope_getInstance() {
  if (EndResumingScope_instance === VOID)
    new (EndResumingScope())();
  return EndResumingScope_instance;
}
var AppendValueClass;
function AppendValue() {
  if (AppendValueClass === VOID) {
    class $ extends Operation() {
      constructor() {
        AppendValue_instance = null;
        super(VOID, 2);
        AppendValue_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.AppendValue.Anchor' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'anchor';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.AppendValue.Value' call
          if (parameter === _ObjectParameter___init__impl__iyg1ip(1)) {
            tmp = 'value';
          } else {
            tmp = super.i7g(parameter);
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.AppendValue.Anchor' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var anchor = _this__u8e3s4.l7g(tmp$ret$0);
        // Inline function 'androidx.compose.runtime.changelist.AppendValue.Value' call
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
        var value = _this__u8e3s4.l7g(tmp$ret$1);
        if (value instanceof RememberObserverHolder()) {
          rememberManager.q7g(value);
        }
        slots.i7a(anchor, value);
      }
    }
    initMetadataForObject($, 'AppendValue');
    AppendValueClass = $;
  }
  return AppendValueClass;
}
var AppendValue_instance;
function AppendValue_getInstance() {
  if (AppendValue_instance === VOID)
    new (AppendValue())();
  return AppendValue_instance;
}
var TrimParentValuesClass;
function TrimParentValues() {
  if (TrimParentValuesClass === VOID) {
    class $ extends Operation() {
      constructor() {
        TrimParentValues_instance = null;
        super(1);
        TrimParentValues_instance = this;
      }
      a7f(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.TrimParentValues.Count' call
        if (parameter === 0) {
          tmp = 'count';
        } else {
          tmp = super.a7f(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.TrimParentValues.Count' call
        var count = _this__u8e3s4.h7g(0);
        var slotsSize = slots.p6y();
        // Inline function 'androidx.compose.runtime.SlotWriter.forEachTailSlot' call
        var groupIndex = slots.z6o_1;
        var slotsStart = slots.w79(groupIndex);
        var slotsEnd = slots.p7a(groupIndex);
        // Inline function 'kotlin.math.max' call
        var b = slotsEnd - count | 0;
        var inductionVariable = Math.max(slotsStart, b);
        if (inductionVariable < slotsEnd)
          do {
            var slotIndex = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var value = access$_get_slots__7x4q9w(slots)[access$dataIndexToDataAddress(slots, slotIndex)];
            if (value instanceof RememberObserverHolder()) {
              var endRelativeOrder = slotsSize - slotIndex | 0;
              // Inline function 'androidx.compose.runtime.withAfterAnchorInfo' call
              var anchor = value.p6w_1;
              var priority = -1;
              var endRelativeAfter = -1;
              if (!(anchor == null) && anchor.s6y()) {
                priority = slots.z6s(anchor);
                endRelativeAfter = slots.p6y() - slots.r6y(priority) | 0;
              }
              var tmp0 = priority;
              var endRelativeAfter_0 = endRelativeAfter;
              rememberManager.t6y(value, endRelativeOrder, tmp0, endRelativeAfter_0);
            } else {
              if (value instanceof RecomposeScopeImpl()) {
                value.i1l();
              }
            }
          }
           while (inductionVariable < slotsEnd);
        slots.j7a(count);
      }
    }
    initMetadataForObject($, 'TrimParentValues');
    TrimParentValuesClass = $;
  }
  return TrimParentValuesClass;
}
var TrimParentValues_instance;
function TrimParentValues_getInstance() {
  if (TrimParentValues_instance === VOID)
    new (TrimParentValues())();
  return TrimParentValues_instance;
}
var UpdateValueClass;
function UpdateValue() {
  if (UpdateValueClass === VOID) {
    class $ extends Operation() {
      constructor() {
        UpdateValue_instance = null;
        super(1, 1);
        UpdateValue_instance = this;
      }
      a7f(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.UpdateValue.GroupSlotIndex' call
        if (parameter === 0) {
          tmp = 'groupSlotIndex';
        } else {
          tmp = super.a7f(parameter);
        }
        return tmp;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.UpdateValue.Value' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'value';
        } else {
          tmp = super.i7g(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.UpdateValue.Value' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var value = _this__u8e3s4.l7g(tmp$ret$0);
        // Inline function 'androidx.compose.runtime.changelist.UpdateValue.GroupSlotIndex' call
        var groupSlotIndex = _this__u8e3s4.h7g(0);
        if (value instanceof RememberObserverHolder()) {
          rememberManager.q7g(value);
        }
        // Inline function 'androidx.compose.runtime.SlotWriter.set' call
        var previous = slots.n7a(slots.x6o_1, groupSlotIndex, value);
        if (previous instanceof RememberObserverHolder()) {
          var endRelativeOrder = slots.p6y() - slots.m7a(slots.x6o_1, groupSlotIndex) | 0;
          rememberManager.t6y(previous, endRelativeOrder, -1, -1);
        } else {
          if (previous instanceof RecomposeScopeImpl()) {
            previous.i1l();
          }
        }
      }
    }
    initMetadataForObject($, 'UpdateValue');
    UpdateValueClass = $;
  }
  return UpdateValueClass;
}
var UpdateValue_instance;
function UpdateValue_getInstance() {
  if (UpdateValue_instance === VOID)
    new (UpdateValue())();
  return UpdateValue_instance;
}
var UpdateAnchoredValueClass;
function UpdateAnchoredValue() {
  if (UpdateAnchoredValueClass === VOID) {
    class $ extends Operation() {
      constructor() {
        UpdateAnchoredValue_instance = null;
        super(1, 2);
        UpdateAnchoredValue_instance = this;
      }
      a7f(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.UpdateAnchoredValue.GroupSlotIndex' call
        if (parameter === 0) {
          tmp = 'groupSlotIndex';
        } else {
          tmp = super.a7f(parameter);
        }
        return tmp;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.UpdateAnchoredValue.Value' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'value';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.UpdateAnchoredValue.Anchor' call
          if (parameter === _ObjectParameter___init__impl__iyg1ip(1)) {
            tmp = 'anchor';
          } else {
            tmp = super.i7g(parameter);
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.UpdateAnchoredValue.Value' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var value = _this__u8e3s4.l7g(tmp$ret$0);
        // Inline function 'androidx.compose.runtime.changelist.UpdateAnchoredValue.Anchor' call
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
        var anchor = _this__u8e3s4.l7g(tmp$ret$1);
        // Inline function 'androidx.compose.runtime.changelist.UpdateAnchoredValue.GroupSlotIndex' call
        var groupSlotIndex = _this__u8e3s4.h7g(0);
        if (value instanceof RememberObserverHolder()) {
          rememberManager.q7g(value);
        }
        var groupIndex = slots.z6s(anchor);
        var previous = slots.n7a(groupIndex, groupSlotIndex, value);
        if (previous instanceof RememberObserverHolder()) {
          var endRelativeSlotOrder = slots.p6y() - slots.m7a(groupIndex, groupSlotIndex) | 0;
          // Inline function 'androidx.compose.runtime.withAfterAnchorInfo' call
          var anchor_0 = previous.p6w_1;
          var priority = -1;
          var endRelativeAfter = -1;
          if (!(anchor_0 == null) && anchor_0.s6y()) {
            priority = slots.z6s(anchor_0);
            endRelativeAfter = slots.p6y() - slots.r6y(priority) | 0;
          }
          var tmp0 = priority;
          var endRelativeAfter_0 = endRelativeAfter;
          rememberManager.t6y(previous, endRelativeSlotOrder, tmp0, endRelativeAfter_0);
        } else {
          if (previous instanceof RecomposeScopeImpl()) {
            previous.i1l();
          }
        }
      }
    }
    initMetadataForObject($, 'UpdateAnchoredValue');
    UpdateAnchoredValueClass = $;
  }
  return UpdateAnchoredValueClass;
}
var UpdateAnchoredValue_instance;
function UpdateAnchoredValue_getInstance() {
  if (UpdateAnchoredValue_instance === VOID)
    new (UpdateAnchoredValue())();
  return UpdateAnchoredValue_instance;
}
var UpdateAuxDataClass;
function UpdateAuxData() {
  if (UpdateAuxDataClass === VOID) {
    class $ extends Operation() {
      constructor() {
        UpdateAuxData_instance = null;
        super(VOID, 1);
        UpdateAuxData_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.UpdateAuxData.Data' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'data';
        } else {
          tmp = super.i7g(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.UpdateAuxData.Data' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        slots.x79(_this__u8e3s4.l7g(tmp$ret$0));
      }
    }
    initMetadataForObject($, 'UpdateAuxData');
    UpdateAuxDataClass = $;
  }
  return UpdateAuxDataClass;
}
var UpdateAuxData_instance;
function UpdateAuxData_getInstance() {
  if (UpdateAuxData_instance === VOID)
    new (UpdateAuxData())();
  return UpdateAuxData_instance;
}
var EnsureRootGroupStartedClass;
function EnsureRootGroupStarted() {
  if (EnsureRootGroupStartedClass === VOID) {
    class $ extends Operation() {
      constructor() {
        EnsureRootGroupStarted_instance = null;
        super();
        EnsureRootGroupStarted_instance = this;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        slots.q7a(0);
      }
    }
    initMetadataForObject($, 'EnsureRootGroupStarted');
    EnsureRootGroupStartedClass = $;
  }
  return EnsureRootGroupStartedClass;
}
var EnsureRootGroupStarted_instance;
function EnsureRootGroupStarted_getInstance() {
  if (EnsureRootGroupStarted_instance === VOID)
    new (EnsureRootGroupStarted())();
  return EnsureRootGroupStarted_instance;
}
var EnsureGroupStartedClass;
function EnsureGroupStarted() {
  if (EnsureGroupStartedClass === VOID) {
    class $ extends Operation() {
      constructor() {
        EnsureGroupStarted_instance = null;
        super(VOID, 1);
        EnsureGroupStarted_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.EnsureGroupStarted.Anchor' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'anchor';
        } else {
          tmp = super.i7g(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.EnsureGroupStarted.Anchor' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        slots.r7a(_this__u8e3s4.l7g(tmp$ret$0));
      }
    }
    initMetadataForObject($, 'EnsureGroupStarted');
    EnsureGroupStartedClass = $;
  }
  return EnsureGroupStartedClass;
}
var EnsureGroupStarted_instance;
function EnsureGroupStarted_getInstance() {
  if (EnsureGroupStarted_instance === VOID)
    new (EnsureGroupStarted())();
  return EnsureGroupStarted_instance;
}
var RemoveCurrentGroupClass;
function RemoveCurrentGroup() {
  if (RemoveCurrentGroupClass === VOID) {
    class $ extends Operation() {
      constructor() {
        RemoveCurrentGroup_instance = null;
        super();
        RemoveCurrentGroup_instance = this;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        removeCurrentGroup(slots, rememberManager);
      }
    }
    initMetadataForObject($, 'RemoveCurrentGroup');
    RemoveCurrentGroupClass = $;
  }
  return RemoveCurrentGroupClass;
}
var RemoveCurrentGroup_instance;
function RemoveCurrentGroup_getInstance() {
  if (RemoveCurrentGroup_instance === VOID)
    new (RemoveCurrentGroup())();
  return RemoveCurrentGroup_instance;
}
var MoveCurrentGroupClass;
function MoveCurrentGroup() {
  if (MoveCurrentGroupClass === VOID) {
    class $ extends Operation() {
      constructor() {
        MoveCurrentGroup_instance = null;
        super(1);
        MoveCurrentGroup_instance = this;
      }
      a7f(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.MoveCurrentGroup.Offset' call
        if (parameter === 0) {
          tmp = 'offset';
        } else {
          tmp = super.a7f(parameter);
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.MoveCurrentGroup.Offset' call
        slots.u7a(_this__u8e3s4.h7g(0));
      }
    }
    initMetadataForObject($, 'MoveCurrentGroup');
    MoveCurrentGroupClass = $;
  }
  return MoveCurrentGroupClass;
}
var MoveCurrentGroup_instance;
function MoveCurrentGroup_getInstance() {
  if (MoveCurrentGroup_instance === VOID)
    new (MoveCurrentGroup())();
  return MoveCurrentGroup_instance;
}
var EndCurrentGroupClass;
function EndCurrentGroup() {
  if (EndCurrentGroupClass === VOID) {
    class $ extends Operation() {
      constructor() {
        EndCurrentGroup_instance = null;
        super();
        EndCurrentGroup_instance = this;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        slots.s6r();
      }
    }
    initMetadataForObject($, 'EndCurrentGroup');
    EndCurrentGroupClass = $;
  }
  return EndCurrentGroupClass;
}
var EndCurrentGroup_instance;
function EndCurrentGroup_getInstance() {
  if (EndCurrentGroup_instance === VOID)
    new (EndCurrentGroup())();
  return EndCurrentGroup_instance;
}
var SkipToEndOfCurrentGroupClass;
function SkipToEndOfCurrentGroup() {
  if (SkipToEndOfCurrentGroupClass === VOID) {
    class $ extends Operation() {
      constructor() {
        SkipToEndOfCurrentGroup_instance = null;
        super();
        SkipToEndOfCurrentGroup_instance = this;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        slots.o6p();
      }
    }
    initMetadataForObject($, 'SkipToEndOfCurrentGroup');
    SkipToEndOfCurrentGroupClass = $;
  }
  return SkipToEndOfCurrentGroupClass;
}
var SkipToEndOfCurrentGroup_instance;
function SkipToEndOfCurrentGroup_getInstance() {
  if (SkipToEndOfCurrentGroup_instance === VOID)
    new (SkipToEndOfCurrentGroup())();
  return SkipToEndOfCurrentGroup_instance;
}
var EndCompositionScopeClass;
function EndCompositionScope() {
  if (EndCompositionScopeClass === VOID) {
    class $ extends Operation() {
      constructor() {
        EndCompositionScope_instance = null;
        super(VOID, 2);
        EndCompositionScope_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.EndCompositionScope.Action' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'anchor';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.EndCompositionScope.Composition' call
          if (parameter === _ObjectParameter___init__impl__iyg1ip(1)) {
            tmp = 'composition';
          } else {
            tmp = super.i7g(parameter);
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.EndCompositionScope.Action' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var action = _this__u8e3s4.l7g(tmp$ret$0);
        // Inline function 'androidx.compose.runtime.changelist.EndCompositionScope.Composition' call
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
        var composition = _this__u8e3s4.l7g(tmp$ret$1);
        action(composition);
      }
    }
    initMetadataForObject($, 'EndCompositionScope');
    EndCompositionScopeClass = $;
  }
  return EndCompositionScopeClass;
}
var EndCompositionScope_instance;
function EndCompositionScope_getInstance() {
  if (EndCompositionScope_instance === VOID)
    new (EndCompositionScope())();
  return EndCompositionScope_instance;
}
var RemoveNodeClass;
function RemoveNode() {
  if (RemoveNodeClass === VOID) {
    class $ extends Operation() {
      constructor() {
        RemoveNode_instance = null;
        super(2);
        RemoveNode_instance = this;
      }
      a7f(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.RemoveNode.RemoveIndex' call
        if (parameter === 0) {
          tmp = 'removeIndex';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.RemoveNode.Count' call
          if (parameter === 1) {
            tmp = 'count';
          } else {
            tmp = super.a7f(parameter);
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.RemoveNode.RemoveIndex' call
        var tmp = _this__u8e3s4.h7g(0);
        // Inline function 'androidx.compose.runtime.changelist.RemoveNode.Count' call
        applier.o6i(tmp, _this__u8e3s4.h7g(1));
      }
    }
    initMetadataForObject($, 'RemoveNode');
    RemoveNodeClass = $;
  }
  return RemoveNodeClass;
}
var RemoveNode_instance;
function RemoveNode_getInstance() {
  if (RemoveNode_instance === VOID)
    new (RemoveNode())();
  return RemoveNode_instance;
}
var MoveNodeClass;
function MoveNode() {
  if (MoveNodeClass === VOID) {
    class $ extends Operation() {
      constructor() {
        MoveNode_instance = null;
        super(3);
        MoveNode_instance = this;
      }
      a7f(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.MoveNode.From' call
        if (parameter === 0) {
          tmp = 'from';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.MoveNode.To' call
          if (parameter === 1) {
            tmp = 'to';
          } else {
            // Inline function 'androidx.compose.runtime.changelist.MoveNode.Count' call
            if (parameter === 2) {
              tmp = 'count';
            } else {
              tmp = super.a7f(parameter);
            }
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.MoveNode.From' call
        var tmp = _this__u8e3s4.h7g(0);
        // Inline function 'androidx.compose.runtime.changelist.MoveNode.To' call
        var tmp_0 = _this__u8e3s4.h7g(1);
        // Inline function 'androidx.compose.runtime.changelist.MoveNode.Count' call
        applier.p6i(tmp, tmp_0, _this__u8e3s4.h7g(2));
      }
    }
    initMetadataForObject($, 'MoveNode');
    MoveNodeClass = $;
  }
  return MoveNodeClass;
}
var MoveNode_instance;
function MoveNode_getInstance() {
  if (MoveNode_instance === VOID)
    new (MoveNode())();
  return MoveNode_instance;
}
var InsertSlotsClass;
function InsertSlots() {
  if (InsertSlotsClass === VOID) {
    class $ extends Operation() {
      constructor() {
        InsertSlots_instance = null;
        super(VOID, 2);
        InsertSlots_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.InsertSlots.Anchor' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'anchor';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.InsertSlots.FromSlotTable' call
          if (parameter === _ObjectParameter___init__impl__iyg1ip(1)) {
            tmp = 'from';
          } else {
            tmp = super.i7g(parameter);
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.InsertSlots.FromSlotTable' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(1);
        var insertTable = _this__u8e3s4.l7g(tmp$ret$0);
        // Inline function 'androidx.compose.runtime.changelist.InsertSlots.Anchor' call
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(0);
        var anchor = _this__u8e3s4.l7g(tmp$ret$1);
        slots.o6q();
        slots.v7a(insertTable, anchor.e6x(insertTable), false);
        slots.t6r();
      }
    }
    initMetadataForObject($, 'InsertSlots');
    InsertSlotsClass = $;
  }
  return InsertSlotsClass;
}
var InsertSlots_instance;
function InsertSlots_getInstance() {
  if (InsertSlots_instance === VOID)
    new (InsertSlots())();
  return InsertSlots_instance;
}
var InsertSlotsWithFixupsClass;
function InsertSlotsWithFixups() {
  if (InsertSlotsWithFixupsClass === VOID) {
    class $ extends Operation() {
      constructor() {
        InsertSlotsWithFixups_instance = null;
        super(VOID, 3);
        InsertSlotsWithFixups_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.InsertSlotsWithFixups.Anchor' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'anchor';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.InsertSlotsWithFixups.FromSlotTable' call
          if (parameter === _ObjectParameter___init__impl__iyg1ip(1)) {
            tmp = 'from';
          } else {
            // Inline function 'androidx.compose.runtime.changelist.InsertSlotsWithFixups.Fixups' call
            if (parameter === _ObjectParameter___init__impl__iyg1ip(2)) {
              tmp = 'fixups';
            } else {
              tmp = super.i7g(parameter);
            }
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.InsertSlotsWithFixups.FromSlotTable' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(1);
        var insertTable = _this__u8e3s4.l7g(tmp$ret$0);
        // Inline function 'androidx.compose.runtime.changelist.InsertSlotsWithFixups.Anchor' call
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(0);
        var anchor = _this__u8e3s4.l7g(tmp$ret$1);
        // Inline function 'androidx.compose.runtime.changelist.InsertSlotsWithFixups.Fixups' call
        var tmp$ret$2 = _ObjectParameter___init__impl__iyg1ip(2);
        var fixups = _this__u8e3s4.l7g(tmp$ret$2);
        // Inline function 'androidx.compose.runtime.SlotTable.write' call
        // Inline function 'kotlin.let' call
        var writer = insertTable.n6p();
        var normalClose = false;
        var tmp;
        try {
          fixups.c7g(applier, writer, rememberManager);
          // Inline function 'kotlin.also' call
          normalClose = true;
          tmp = Unit_instance;
        }finally {
          writer.s6p(normalClose);
        }
        slots.o6q();
        slots.v7a(insertTable, anchor.e6x(insertTable), false);
        slots.t6r();
      }
    }
    initMetadataForObject($, 'InsertSlotsWithFixups');
    InsertSlotsWithFixupsClass = $;
  }
  return InsertSlotsWithFixupsClass;
}
var InsertSlotsWithFixups_instance;
function InsertSlotsWithFixups_getInstance() {
  if (InsertSlotsWithFixups_instance === VOID)
    new (InsertSlotsWithFixups())();
  return InsertSlotsWithFixups_instance;
}
var ResetSlotsClass;
function ResetSlots() {
  if (ResetSlotsClass === VOID) {
    class $ extends Operation() {
      constructor() {
        ResetSlots_instance = null;
        super();
        ResetSlots_instance = this;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        slots.h7a();
      }
    }
    initMetadataForObject($, 'ResetSlots');
    ResetSlotsClass = $;
  }
  return ResetSlotsClass;
}
var ResetSlots_instance;
function ResetSlots_getInstance() {
  if (ResetSlots_instance === VOID)
    new (ResetSlots())();
  return ResetSlots_instance;
}
var DetermineMovableContentNodeIndexClass;
function DetermineMovableContentNodeIndex() {
  if (DetermineMovableContentNodeIndexClass === VOID) {
    class $ extends Operation() {
      constructor() {
        DetermineMovableContentNodeIndex_instance = null;
        super(VOID, 2);
        DetermineMovableContentNodeIndex_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.DetermineMovableContentNodeIndex.EffectiveNodeIndexOut' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'effectiveNodeIndexOut';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.DetermineMovableContentNodeIndex.Anchor' call
          if (parameter === _ObjectParameter___init__impl__iyg1ip(1)) {
            tmp = 'anchor';
          } else {
            tmp = super.i7g(parameter);
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.DetermineMovableContentNodeIndex.EffectiveNodeIndexOut' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var effectiveNodeIndexOut = _this__u8e3s4.l7g(tmp$ret$0);
        var tmp = effectiveNodeIndexOut;
        // Inline function 'androidx.compose.runtime.changelist.DetermineMovableContentNodeIndex.Anchor' call
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
        var tmp_0 = _this__u8e3s4.l7g(tmp$ret$1);
        tmp.h7i_1 = positionToInsert(slots, tmp_0, isInterface(applier, Applier()) ? applier : THROW_CCE());
      }
    }
    initMetadataForObject($, 'DetermineMovableContentNodeIndex');
    DetermineMovableContentNodeIndexClass = $;
  }
  return DetermineMovableContentNodeIndexClass;
}
var DetermineMovableContentNodeIndex_instance;
function DetermineMovableContentNodeIndex_getInstance() {
  if (DetermineMovableContentNodeIndex_instance === VOID)
    new (DetermineMovableContentNodeIndex())();
  return DetermineMovableContentNodeIndex_instance;
}
var CopyNodesToNewAnchorLocationClass;
function CopyNodesToNewAnchorLocation() {
  if (CopyNodesToNewAnchorLocationClass === VOID) {
    class $ extends Operation() {
      constructor() {
        CopyNodesToNewAnchorLocation_instance = null;
        super(VOID, 2);
        CopyNodesToNewAnchorLocation_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.CopyNodesToNewAnchorLocation.EffectiveNodeIndex' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'effectiveNodeIndex';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.CopyNodesToNewAnchorLocation.Nodes' call
          if (parameter === _ObjectParameter___init__impl__iyg1ip(1)) {
            tmp = 'nodes';
          } else {
            tmp = super.i7g(parameter);
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.CopyNodesToNewAnchorLocation.EffectiveNodeIndex' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var effectiveNodeIndex = _this__u8e3s4.l7g(tmp$ret$0).h7i_1;
        // Inline function 'androidx.compose.runtime.changelist.CopyNodesToNewAnchorLocation.Nodes' call
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(1);
        var nodesToInsert = _this__u8e3s4.l7g(tmp$ret$1);
        // Inline function 'androidx.compose.runtime.snapshots.fastForEachIndexed' call
        var inductionVariable = 0;
        var last = nodesToInsert.c1() - 1 | 0;
        if (inductionVariable <= last)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var item = nodesToInsert.e1(index);
            if (!isInterface(applier, Applier()))
              THROW_CCE();
            applier.n6i(effectiveNodeIndex + index | 0, item);
            applier.m6i(effectiveNodeIndex + index | 0, item);
          }
           while (inductionVariable <= last);
      }
    }
    initMetadataForObject($, 'CopyNodesToNewAnchorLocation');
    CopyNodesToNewAnchorLocationClass = $;
  }
  return CopyNodesToNewAnchorLocationClass;
}
var CopyNodesToNewAnchorLocation_instance;
function CopyNodesToNewAnchorLocation_getInstance() {
  if (CopyNodesToNewAnchorLocation_instance === VOID)
    new (CopyNodesToNewAnchorLocation())();
  return CopyNodesToNewAnchorLocation_instance;
}
var CopySlotTableToAnchorLocationClass;
function CopySlotTableToAnchorLocation() {
  if (CopySlotTableToAnchorLocationClass === VOID) {
    class $ extends Operation() {
      constructor() {
        CopySlotTableToAnchorLocation_instance = null;
        super(VOID, 4);
        CopySlotTableToAnchorLocation_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.ResolvedState' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'resolvedState';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.ParentCompositionContext' call
          if (parameter === _ObjectParameter___init__impl__iyg1ip(1)) {
            tmp = 'resolvedCompositionContext';
          } else {
            // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.From' call
            if (parameter === _ObjectParameter___init__impl__iyg1ip(2)) {
              tmp = 'from';
            } else {
              // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.To' call
              if (parameter === _ObjectParameter___init__impl__iyg1ip(3)) {
                tmp = 'to';
              } else {
                tmp = super.i7g(parameter);
              }
            }
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.From' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(2);
        var from = _this__u8e3s4.l7g(tmp$ret$0);
        // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.To' call
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(3);
        var to = _this__u8e3s4.l7g(tmp$ret$1);
        // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.ParentCompositionContext' call
        var tmp$ret$2 = _ObjectParameter___init__impl__iyg1ip(1);
        var parentCompositionContext = _this__u8e3s4.l7g(tmp$ret$2);
        // Inline function 'androidx.compose.runtime.changelist.CopySlotTableToAnchorLocation.ResolvedState' call
        var tmp$ret$3 = _ObjectParameter___init__impl__iyg1ip(0);
        var tmp0_elvis_lhs = _this__u8e3s4.l7g(tmp$ret$3);
        var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? parentCompositionContext.b6t(from) : tmp0_elvis_lhs;
        var tmp;
        if (tmp1_elvis_lhs == null) {
          composeRuntimeError('Could not resolve state for movable content');
        } else {
          tmp = tmp1_elvis_lhs;
        }
        var resolvedState = tmp;
        var anchors = slots.w7a(1, resolvedState.c6t_1, 2);
        var tmp_0 = Companion_instance;
        var tmp_1 = to.t6s_1;
        tmp_0.e6z(slots, anchors, isInterface(tmp_1, RecomposeScopeOwner()) ? tmp_1 : THROW_CCE());
      }
    }
    initMetadataForObject($, 'CopySlotTableToAnchorLocation');
    CopySlotTableToAnchorLocationClass = $;
  }
  return CopySlotTableToAnchorLocationClass;
}
var CopySlotTableToAnchorLocation_instance;
function CopySlotTableToAnchorLocation_getInstance() {
  if (CopySlotTableToAnchorLocation_instance === VOID)
    new (CopySlotTableToAnchorLocation())();
  return CopySlotTableToAnchorLocation_instance;
}
var EndMovableContentPlacementClass;
function EndMovableContentPlacement() {
  if (EndMovableContentPlacementClass === VOID) {
    class $ extends Operation() {
      constructor() {
        EndMovableContentPlacement_instance = null;
        super();
        EndMovableContentPlacement_instance = this;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        positionToParentOf(slots, isInterface(applier, Applier()) ? applier : THROW_CCE(), 0);
        slots.s6r();
      }
    }
    initMetadataForObject($, 'EndMovableContentPlacement');
    EndMovableContentPlacementClass = $;
  }
  return EndMovableContentPlacementClass;
}
var EndMovableContentPlacement_instance;
function EndMovableContentPlacement_getInstance() {
  if (EndMovableContentPlacement_instance === VOID)
    new (EndMovableContentPlacement())();
  return EndMovableContentPlacement_instance;
}
var ReleaseMovableGroupAtCurrentClass;
function ReleaseMovableGroupAtCurrent() {
  if (ReleaseMovableGroupAtCurrentClass === VOID) {
    class $ extends Operation() {
      constructor() {
        ReleaseMovableGroupAtCurrent_instance = null;
        super(VOID, 3);
        ReleaseMovableGroupAtCurrent_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.ReleaseMovableGroupAtCurrent.Composition' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'composition';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.ReleaseMovableGroupAtCurrent.ParentCompositionContext' call
          if (parameter === _ObjectParameter___init__impl__iyg1ip(1)) {
            tmp = 'parentCompositionContext';
          } else {
            // Inline function 'androidx.compose.runtime.changelist.ReleaseMovableGroupAtCurrent.Reference' call
            if (parameter === _ObjectParameter___init__impl__iyg1ip(2)) {
              tmp = 'reference';
            } else {
              tmp = super.i7g(parameter);
            }
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.ReleaseMovableGroupAtCurrent.Composition' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(0);
        var composition = _this__u8e3s4.l7g(tmp$ret$0);
        // Inline function 'androidx.compose.runtime.changelist.ReleaseMovableGroupAtCurrent.Reference' call
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(2);
        var reference = _this__u8e3s4.l7g(tmp$ret$1);
        // Inline function 'androidx.compose.runtime.changelist.ReleaseMovableGroupAtCurrent.ParentCompositionContext' call
        var tmp$ret$2 = _ObjectParameter___init__impl__iyg1ip(1);
        var parentContext = _this__u8e3s4.l7g(tmp$ret$2);
        var state = extractMovableContentAtCurrent(composition, reference, slots, null);
        parentContext.k72(reference, state, applier);
      }
    }
    initMetadataForObject($, 'ReleaseMovableGroupAtCurrent');
    ReleaseMovableGroupAtCurrentClass = $;
  }
  return ReleaseMovableGroupAtCurrentClass;
}
var ReleaseMovableGroupAtCurrent_instance;
function ReleaseMovableGroupAtCurrent_getInstance() {
  if (ReleaseMovableGroupAtCurrent_instance === VOID)
    new (ReleaseMovableGroupAtCurrent())();
  return ReleaseMovableGroupAtCurrent_instance;
}
var ApplyChangeListClass;
function ApplyChangeList() {
  if (ApplyChangeListClass === VOID) {
    class $ extends Operation() {
      constructor() {
        ApplyChangeList_instance = null;
        super(VOID, 2);
        ApplyChangeList_instance = this;
      }
      i7g(parameter) {
        var tmp;
        // Inline function 'androidx.compose.runtime.changelist.ApplyChangeList.Changes' call
        if (parameter === _ObjectParameter___init__impl__iyg1ip(0)) {
          tmp = 'changes';
        } else {
          // Inline function 'androidx.compose.runtime.changelist.ApplyChangeList.EffectiveNodeIndex' call
          if (parameter === _ObjectParameter___init__impl__iyg1ip(1)) {
            tmp = 'effectiveNodeIndex';
          } else {
            tmp = super.i7g(parameter);
          }
        }
        return tmp;
      }
      g7g(_this__u8e3s4, applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.ApplyChangeList.EffectiveNodeIndex' call
        var tmp$ret$0 = _ObjectParameter___init__impl__iyg1ip(1);
        var tmp0_safe_receiver = _this__u8e3s4.l7g(tmp$ret$0);
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.h7i_1;
        var effectiveNodeIndex = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        // Inline function 'androidx.compose.runtime.changelist.ApplyChangeList.Changes' call
        var tmp$ret$1 = _ObjectParameter___init__impl__iyg1ip(0);
        var tmp = _this__u8e3s4.l7g(tmp$ret$1);
        var tmp_0;
        if (effectiveNodeIndex > 0) {
          tmp_0 = new (OffsetApplier())(applier, effectiveNodeIndex);
        } else {
          tmp_0 = applier;
        }
        tmp.i70(tmp_0, slots, rememberManager);
      }
    }
    initMetadataForObject($, 'ApplyChangeList');
    ApplyChangeListClass = $;
  }
  return ApplyChangeListClass;
}
var ApplyChangeList_instance;
function ApplyChangeList_getInstance() {
  if (ApplyChangeList_instance === VOID)
    new (ApplyChangeList())();
  return ApplyChangeList_instance;
}
var OperationClass;
function Operation() {
  if (OperationClass === VOID) {
    class $ {
      constructor(ints, objects) {
        ints = ints === VOID ? 0 : ints;
        objects = objects === VOID ? 0 : objects;
        this.y7e_1 = ints;
        this.z7e_1 = objects;
      }
      y3() {
        // Inline function 'kotlin.text.orEmpty' call
        var tmp0_elvis_lhs = getKClassFromExpression(this).gh();
        return tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs;
      }
      a7f(parameter) {
        return 'IntParameter(' + parameter + ')';
      }
      i7g(parameter) {
        return 'ObjectParameter(' + _ObjectParameter___get_offset__impl__x7fx93(parameter) + ')';
      }
      toString() {
        return this.y3();
      }
    }
    initMetadataForClass($, 'Operation');
    OperationClass = $;
  }
  return OperationClass;
}
function positionToInsert(slots, anchor, applier) {
  var destination = slots.z6s(anchor);
  // Inline function 'androidx.compose.runtime.runtimeCheck' call
  // Inline function 'androidx.compose.runtime.runtimeCheck' call
  if (!(slots.x6o_1 < destination)) {
    var tmp$ret$0 = 'Check failed';
    composeImmediateRuntimeError(tmp$ret$0);
  }
  positionToParentOf(slots, applier, destination);
  var nodeIndex = currentNodeIndex(slots);
  while (slots.x6o_1 < destination) {
    if (slots.c7a(destination)) {
      if (slots.f6x()) {
        applier.k6i(slots.x6t(slots.x6o_1));
        nodeIndex = 0;
      }
      slots.v6p();
    } else
      nodeIndex = nodeIndex + slots.f6p() | 0;
  }
  // Inline function 'androidx.compose.runtime.runtimeCheck' call
  // Inline function 'androidx.compose.runtime.runtimeCheck' call
  if (!(slots.x6o_1 === destination)) {
    var tmp$ret$3 = 'Check failed';
    composeImmediateRuntimeError(tmp$ret$3);
  }
  return nodeIndex;
}
function positionToParentOf(slots, applier, index) {
  while (!slots.b7a(index)) {
    slots.o6p();
    if (slots.z6r(slots.z6o_1)) {
      applier.l6i();
    }
    slots.s6r();
  }
}
function currentNodeIndex(slots) {
  var original = slots.x6o_1;
  var current = slots.z6o_1;
  while (current >= 0 && !slots.z6r(current)) {
    current = slots.i6p(current);
  }
  var index = 0;
  current = current + 1 | 0;
  while (current < original) {
    if (slots.d7a(original, current)) {
      if (slots.z6r(current))
        index = 0;
      current = current + 1 | 0;
    } else {
      index = index + (slots.z6r(current) ? 1 : slots.a6s(current)) | 0;
      current = current + slots.e6r(current) | 0;
    }
  }
  return index;
}
//region block: init
androidx_compose_runtime_changelist_Operation_Ups$stable = 0;
androidx_compose_runtime_changelist_Operation_Downs$stable = 0;
androidx_compose_runtime_changelist_Operation_AdvanceSlotsBy$stable = 0;
androidx_compose_runtime_changelist_Operation_SideEffect$stable = 0;
androidx_compose_runtime_changelist_Operation_Remember$stable = 0;
androidx_compose_runtime_changelist_Operation_RememberPausingScope$stable = 0;
androidx_compose_runtime_changelist_Operation_StartResumingScope$stable = 0;
androidx_compose_runtime_changelist_Operation_EndResumingScope$stable = 0;
androidx_compose_runtime_changelist_Operation_AppendValue$stable = 0;
androidx_compose_runtime_changelist_Operation_TrimParentValues$stable = 0;
androidx_compose_runtime_changelist_Operation_UpdateValue$stable = 0;
androidx_compose_runtime_changelist_Operation_UpdateAnchoredValue$stable = 0;
androidx_compose_runtime_changelist_Operation_UpdateAuxData$stable = 0;
androidx_compose_runtime_changelist_Operation_EnsureRootGroupStarted$stable = 0;
androidx_compose_runtime_changelist_Operation_EnsureGroupStarted$stable = 0;
androidx_compose_runtime_changelist_Operation_RemoveCurrentGroup$stable = 0;
androidx_compose_runtime_changelist_Operation_MoveCurrentGroup$stable = 0;
androidx_compose_runtime_changelist_Operation_EndCurrentGroup$stable = 0;
androidx_compose_runtime_changelist_Operation_SkipToEndOfCurrentGroup$stable = 0;
androidx_compose_runtime_changelist_Operation_EndCompositionScope$stable = 0;
androidx_compose_runtime_changelist_Operation_UseCurrentNode$stable = 0;
androidx_compose_runtime_changelist_Operation_UpdateNode$stable = 0;
androidx_compose_runtime_changelist_Operation_RemoveNode$stable = 0;
androidx_compose_runtime_changelist_Operation_MoveNode$stable = 0;
androidx_compose_runtime_changelist_Operation_InsertSlots$stable = 0;
androidx_compose_runtime_changelist_Operation_InsertSlotsWithFixups$stable = 0;
androidx_compose_runtime_changelist_Operation_InsertNodeFixup$stable = 0;
androidx_compose_runtime_changelist_Operation_PostInsertNodeFixup$stable = 0;
androidx_compose_runtime_changelist_Operation_DeactivateCurrentGroup$stable = 0;
androidx_compose_runtime_changelist_Operation_ResetSlots$stable = 0;
androidx_compose_runtime_changelist_Operation_DetermineMovableContentNodeIndex$stable = 0;
androidx_compose_runtime_changelist_Operation_CopyNodesToNewAnchorLocation$stable = 0;
androidx_compose_runtime_changelist_Operation_CopySlotTableToAnchorLocation$stable = 0;
androidx_compose_runtime_changelist_Operation_EndMovableContentPlacement$stable = 0;
androidx_compose_runtime_changelist_Operation_ReleaseMovableGroupAtCurrent$stable = 0;
androidx_compose_runtime_changelist_Operation_ApplyChangeList$stable = 0;
androidx_compose_runtime_changelist_Operation_TestOperation$stable = 8;
androidx_compose_runtime_changelist_Operation$stable = 0;
//endregion
//region block: exports
export {
  _ObjectParameter___init__impl__iyg1ip as _ObjectParameter___init__impl__iyg1ip30kg7ewch5fu5,
  _ObjectParameter___get_offset__impl__x7fx93 as _ObjectParameter___get_offset__impl__x7fx931oh47mk5l5u56,
  AdvanceSlotsBy_getInstance as AdvanceSlotsBy_getInstance2xtnusw47iqzk,
  AppendValue_getInstance as AppendValue_getInstance12h1b8axomyji,
  ApplyChangeList_getInstance as ApplyChangeList_getInstance1l1y4ifcksncl,
  CopyNodesToNewAnchorLocation_getInstance as CopyNodesToNewAnchorLocation_getInstance3lyobkt0vbh4q,
  CopySlotTableToAnchorLocation_getInstance as CopySlotTableToAnchorLocation_getInstance3i6mlzv6lpqdh,
  DetermineMovableContentNodeIndex_getInstance as DetermineMovableContentNodeIndex_getInstance9opzjz4ux8fa,
  Downs_getInstance as Downs_getInstance13z9hr3bjbk90,
  EndCompositionScope_getInstance as EndCompositionScope_getInstancejq6c644693ow,
  EndCurrentGroup_getInstance as EndCurrentGroup_getInstanceho7akk2cfm5g,
  EndMovableContentPlacement_getInstance as EndMovableContentPlacement_getInstancegolg20cppoi3,
  EndResumingScope_getInstance as EndResumingScope_getInstance3njxf8klao6ja,
  EnsureGroupStarted_getInstance as EnsureGroupStarted_getInstance1q7squw3sxbcs,
  EnsureRootGroupStarted_getInstance as EnsureRootGroupStarted_getInstance1k0gu7xm5aa70,
  InsertSlotsWithFixups_getInstance as InsertSlotsWithFixups_getInstance34a6rh6yvr8yl,
  InsertSlots_getInstance as InsertSlots_getInstance3l63bj7ms1um9,
  MoveCurrentGroup_getInstance as MoveCurrentGroup_getInstancea4uocq2u4rjg,
  MoveNode_getInstance as MoveNode_getInstance3e29wzw6kai6r,
  ReleaseMovableGroupAtCurrent_getInstance as ReleaseMovableGroupAtCurrent_getInstance1173qjmwxmrnm,
  RememberPausingScope_getInstance as RememberPausingScope_getInstance1vyfd9wjhj8y3,
  Remember_getInstance as Remember_getInstance1ej0eidin8pt3,
  RemoveCurrentGroup_getInstance as RemoveCurrentGroup_getInstance3rczia54mmi25,
  RemoveNode_getInstance as RemoveNode_getInstanceufbw3pg898f3,
  ResetSlots_getInstance as ResetSlots_getInstance1rxs84vztxdba,
  SkipToEndOfCurrentGroup_getInstance as SkipToEndOfCurrentGroup_getInstance5npsg6nl2jar,
  StartResumingScope_getInstance as StartResumingScope_getInstance11yxs0wgvlho8,
  TrimParentValues_getInstance as TrimParentValues_getInstanceq92kovxz2da6,
  UpdateAnchoredValue_getInstance as UpdateAnchoredValue_getInstance295xbkaqac4in,
  UpdateAuxData_getInstance as UpdateAuxData_getInstancer38ewqlvz26b,
  UpdateValue_getInstance as UpdateValue_getInstance2sl1my6qhllqu,
  Ups_getInstance as Ups_getInstanceb3yatpfpvojo,
};
//endregion

//# sourceMappingURL=Operation.mjs.map
