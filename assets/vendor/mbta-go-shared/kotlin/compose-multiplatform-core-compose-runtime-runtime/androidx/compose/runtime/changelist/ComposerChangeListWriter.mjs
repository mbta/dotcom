import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { composeImmediateRuntimeError2yqil22w149j8 as composeImmediateRuntimeError } from '../Composer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Stack__toArray_impl_ox34cp4znfmp3wqvqc as Stack__toArray_impl_ox34cp,
  Stack__clear_impl_qoqv3c3cn6dpu82q3we as Stack__clear_impl_qoqv3c,
  Stack__isNotEmpty_impl_ua6a9t1w5hrxzfremjh as Stack__isNotEmpty_impl_ua6a9t,
  IntStacky2p17u2t76no as IntStack,
  _Stack___init__impl__tvpfn52esscbfgakobd as _Stack___init__impl__tvpfn5,
  Stack__pop_impl_8s4za433gnfbabhg48d as Stack__pop_impl_8s4za4,
  Stack__push_impl_s8r9054cycd2baz6fd as Stack__push_impl_s8r905,
} from '../Stack.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_changelist_ComposerChangeListWriter$stable;
function _get_reader__fd8dw8($this) {
  return $this.z6m_1.n6l_1;
}
function pushApplierOperationPreamble($this) {
  pushPendingUpsAndDowns($this);
}
function pushSlotEditingOperationPreamble($this) {
  realizeOperationLocation$default($this);
  $this.t6v();
}
function pushSlotTableOperationPreamble($this, useParentSlot) {
  realizeOperationLocation($this, useParentSlot);
}
function pushSlotTableOperationPreamble$default($this, useParentSlot, $super) {
  useParentSlot = useParentSlot === VOID ? false : useParentSlot;
  return pushSlotTableOperationPreamble($this, useParentSlot);
}
function ensureRootStarted($this) {
  if (!$this.b6n_1 && $this.d6n_1) {
    pushSlotTableOperationPreamble$default($this);
    $this.a6n_1.h7f();
    $this.b6n_1 = true;
  }
}
function ensureGroupStarted($this, anchor) {
  pushSlotTableOperationPreamble$default($this);
  $this.a6n_1.i7f(anchor);
  $this.b6n_1 = true;
}
function realizeOperationLocation($this, forParent) {
  var location = forParent ? _get_reader__fd8dw8($this).v6n_1 : _get_reader__fd8dw8($this).t6n_1;
  var distance = location - $this.e6n_1 | 0;
  // Inline function 'androidx.compose.runtime.runtimeCheck' call
  if (!(distance >= 0)) {
    var tmp$ret$0 = 'Tried to seek backward';
    composeImmediateRuntimeError(tmp$ret$0);
  }
  if (distance > 0) {
    $this.a6n_1.s7f(distance);
    $this.e6n_1 = location;
  }
}
function realizeOperationLocation$default($this, forParent, $super) {
  forParent = forParent === VOID ? false : forParent;
  return realizeOperationLocation($this, forParent);
}
function realizeNodeMovementOperations($this) {
  if ($this.k6n_1 > 0) {
    if ($this.h6n_1 >= 0) {
      realizeRemoveNode($this, $this.h6n_1, $this.k6n_1);
      $this.h6n_1 = -1;
    } else {
      realizeMoveNode($this, $this.j6n_1, $this.i6n_1, $this.k6n_1);
      $this.i6n_1 = -1;
      $this.j6n_1 = -1;
    }
    $this.k6n_1 = 0;
  }
}
function realizeRemoveNode($this, removeFrom, moveCount) {
  pushApplierOperationPreamble($this);
  $this.a6n_1.q7f(removeFrom, moveCount);
}
function realizeMoveNode($this, to, from, count) {
  pushApplierOperationPreamble($this);
  $this.a6n_1.r7f(to, from, count);
}
function pushPendingUpsAndDowns($this) {
  if ($this.f6n_1 > 0) {
    $this.a6n_1.t7f($this.f6n_1);
    $this.f6n_1 = 0;
  }
  if (Stack__isNotEmpty_impl_ua6a9t($this.g6n_1)) {
    $this.a6n_1.u7f(Stack__toArray_impl_ox34cp($this.g6n_1));
    Stack__clear_impl_qoqv3c($this.g6n_1);
  }
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        this.b7g_1 = -2;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var ComposerChangeListWriterClass;
function ComposerChangeListWriter() {
  if (ComposerChangeListWriterClass === VOID) {
    class $ {
      constructor(composer, changeList) {
        this.z6m_1 = composer;
        this.a6n_1 = changeList;
        this.b6n_1 = false;
        this.c6n_1 = new (IntStack())();
        this.d6n_1 = true;
        this.e6n_1 = 0;
        this.f6n_1 = 0;
        this.g6n_1 = _Stack___init__impl__tvpfn5();
        this.h6n_1 = -1;
        this.i6n_1 = -1;
        this.j6n_1 = -1;
        this.k6n_1 = 0;
      }
      x6q(location) {
        this.e6n_1 = this.e6n_1 + (location - _get_reader__fd8dw8(this).t6n_1 | 0) | 0;
      }
      f6t(location) {
        this.e6n_1 = location;
      }
      t6v() {
        if (_get_reader__fd8dw8(this).c1() > 0) {
          var reader = _get_reader__fd8dw8(this);
          var location = reader.v6n_1;
          if (!(this.c6n_1.g7a(-2) === location)) {
            ensureRootStarted(this);
            if (location > 0) {
              var anchor = reader.j6p(location);
              this.c6n_1.r6m(location);
              ensureGroupStarted(this, anchor);
            }
          }
        }
      }
      x6w() {
        return (_get_reader__fd8dw8(this).v6n_1 - this.e6n_1 | 0) < 0;
      }
      a6x(value) {
        this.a6n_1.r7e(value);
      }
      k6x(scope) {
        this.a6n_1.u7e(scope);
      }
      k6s(scope) {
        this.a6n_1.v7e(scope);
      }
      r6x(scope) {
        this.a6n_1.w7e(scope);
      }
      v6w(value, groupSlotIndex) {
        pushSlotTableOperationPreamble(this, true);
        this.a6n_1.x7e(value, groupSlotIndex);
      }
      w6w(value, anchor, groupSlotIndex) {
        this.a6n_1.b7f(value, anchor, groupSlotIndex);
      }
      t6w(anchor, value) {
        this.a6n_1.c7f(anchor, value);
      }
      l6r(count) {
        if (count > 0) {
          pushSlotEditingOperationPreamble(this);
          this.a6n_1.d7f(count);
        }
      }
      q6s() {
        this.a6n_1.e7f();
      }
      t6p(data) {
        pushSlotTableOperationPreamble$default(this);
        this.a6n_1.g7f(data);
      }
      l6n() {
        if (this.b6n_1) {
          pushSlotTableOperationPreamble$default(this);
          pushSlotTableOperationPreamble$default(this);
          this.a6n_1.j7f();
          this.b6n_1 = false;
        }
      }
      o6r() {
        var location = _get_reader__fd8dw8(this).v6n_1;
        var currentStartedGroup = this.c6n_1.g7a(-1);
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(currentStartedGroup <= location)) {
          var tmp$ret$0 = 'Missed recording an endGroup';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        if (this.c6n_1.g7a(-1) === location) {
          pushSlotTableOperationPreamble$default(this);
          this.c6n_1.b6o();
          this.a6n_1.j7f();
        }
      }
      h6t() {
        this.a6n_1.k7f();
      }
      a6u() {
        pushSlotEditingOperationPreamble(this);
        this.a6n_1.l7f();
        this.e6n_1 = this.e6n_1 + _get_reader__fd8dw8(this).z7a() | 0;
      }
      z6t(anchor, from) {
        pushPendingUpsAndDowns(this);
        pushSlotEditingOperationPreamble(this);
        realizeNodeMovementOperations(this);
        this.a6n_1.m7f(anchor, from);
      }
      y6t(anchor, from, fixups) {
        pushPendingUpsAndDowns(this);
        pushSlotEditingOperationPreamble(this);
        realizeNodeMovementOperations(this);
        this.a6n_1.n7f(anchor, from, fixups);
      }
      z6q(offset) {
        pushSlotEditingOperationPreamble(this);
        this.a6n_1.o7f(offset);
      }
      q6x(action, composition) {
        this.a6n_1.p7f(action, composition);
      }
      c6r(nodeIndex, count) {
        if (count > 0) {
          // Inline function 'androidx.compose.runtime.runtimeCheck' call
          if (!(nodeIndex >= 0)) {
            var tmp$ret$0 = 'Invalid remove index ' + nodeIndex;
            composeImmediateRuntimeError(tmp$ret$0);
          }
          if (this.h6n_1 === nodeIndex) {
            this.k6n_1 = this.k6n_1 + count | 0;
          } else {
            realizeNodeMovementOperations(this);
            this.h6n_1 = nodeIndex;
            this.k6n_1 = count;
          }
        }
      }
      g6r(from, to, count) {
        if (count > 0) {
          if (this.k6n_1 > 0 && this.i6n_1 === (from - this.k6n_1 | 0) && this.j6n_1 === (to - this.k6n_1 | 0)) {
            this.k6n_1 = this.k6n_1 + count | 0;
          } else {
            realizeNodeMovementOperations(this);
            this.i6n_1 = from;
            this.j6n_1 = to;
            this.k6n_1 = count;
          }
        }
      }
      b6v() {
        pushPendingUpsAndDowns(this);
        if (this.b6n_1) {
          this.h6t();
          this.l6n();
        }
      }
      i6r() {
        realizeNodeMovementOperations(this);
      }
      v6v(nodeIndex, group) {
        this.i6r();
        pushPendingUpsAndDowns(this);
        var nodeCount = _get_reader__fd8dw8(this).z6r(group) ? 1 : _get_reader__fd8dw8(this).a6s(group);
        if (nodeCount > 0) {
          this.c6r(nodeIndex, nodeCount);
        }
      }
      n6r() {
        realizeNodeMovementOperations(this);
        if (Stack__isNotEmpty_impl_ua6a9t(this.g6n_1)) {
          Stack__pop_impl_8s4za4(this.g6n_1);
        } else {
          this.f6n_1 = this.f6n_1 + 1 | 0;
        }
      }
      c6s(node) {
        realizeNodeMovementOperations(this);
        Stack__push_impl_s8r905(this.g6n_1, node);
      }
      a6t(effectiveNodeIndexOut, anchor) {
        pushPendingUpsAndDowns(this);
        this.a6n_1.v7f(effectiveNodeIndexOut, anchor);
      }
      d6t(nodes, effectiveNodeIndex) {
        this.a6n_1.w7f(nodes, effectiveNodeIndex);
      }
      e6t(resolvedState, parentContext, from, to) {
        this.a6n_1.x7f(resolvedState, parentContext, from, to);
      }
      u6v(composition, parentContext, reference) {
        this.a6n_1.y7f(composition, parentContext, reference);
      }
      i6t() {
        this.a6n_1.z7f();
        this.e6n_1 = 0;
      }
      g6t(other, effectiveNodeIndex) {
        this.a6n_1.a7g(other, effectiveNodeIndex);
      }
      d6v() {
        pushPendingUpsAndDowns(this);
        // Inline function 'androidx.compose.runtime.IntStack.isEmpty' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.c6n_1.q6m_1 === 0)) {
          var tmp$ret$1 = 'Missed recording an endGroup()';
          composeImmediateRuntimeError(tmp$ret$1);
        }
      }
      e6v() {
        this.b6n_1 = false;
        this.c6n_1.p3();
        this.e6n_1 = 0;
      }
    }
    initMetadataForClass($, 'ComposerChangeListWriter');
    ComposerChangeListWriterClass = $;
  }
  return ComposerChangeListWriterClass;
}
//region block: init
androidx_compose_runtime_changelist_ComposerChangeListWriter$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  ComposerChangeListWriter as ComposerChangeListWriter33gmpzpjcs67s,
};
//endregion

//# sourceMappingURL=ComposerChangeListWriter.mjs.map
