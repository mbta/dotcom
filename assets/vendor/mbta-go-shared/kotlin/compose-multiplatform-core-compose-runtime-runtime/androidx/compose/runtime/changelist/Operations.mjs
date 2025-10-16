import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  _ObjectParameter___get_offset__impl__x7fx931oh47mk5l5u56 as _ObjectParameter___get_offset__impl__x7fx93,
  _ObjectParameter___init__impl__iyg1ip30kg7ewch5fu5 as _ObjectParameter___init__impl__iyg1ip,
} from './Operation.mjs';
import { composeImmediateRuntimeError2yqil22w149j8 as composeImmediateRuntimeError } from '../Composer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  coerceAtMost322komnqp70ag as coerceAtMost,
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { isArray1hxjqtqy632bc as isArray } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { fill3hcjvebk42tyx as fill } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { throwIllegalArgumentExceptionb4z7xzu5xnb8 as throwIllegalArgumentException } from '../Preconditions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_changelist_Operations$stable;
var androidx_compose_runtime_changelist_OperationsDebugStringFormattable$stable;
var OperationsDebugStringFormattableClass;
function OperationsDebugStringFormattable() {
  if (OperationsDebugStringFormattableClass === VOID) {
    class $ {}
    initMetadataForClass($, 'OperationsDebugStringFormattable');
    OperationsDebugStringFormattableClass = $;
  }
  return OperationsDebugStringFormattableClass;
}
function _WriteScope___init__impl__4xwato(stack) {
  return stack;
}
function _get_stack__b8zp2v($this) {
  return $this;
}
function _WriteScope___get_operation__impl__krvgwa($this) {
  // Inline function 'androidx.compose.runtime.changelist.Operations.peekOperation' call
  var this_0 = _get_stack__b8zp2v($this);
  return this_0.i7e_1[this_0.j7e_1 - 1 | 0];
}
function WriteScope__setObject_impl_rr41y9($this, parameter, value) {
  // Inline function 'kotlin.with' call
  var $this$with = _get_stack__b8zp2v($this);
  if (false) {
    var mask = 1 << _ObjectParameter___get_offset__impl__x7fx93(parameter);
    // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
    var value_0 = ($this$with.p7e_1 & mask) === 0;
    if (false && !value_0) {
      var tmp$ret$0 = 'Already pushed argument ' + _WriteScope___get_operation__impl__krvgwa($this).i7g(parameter);
      composeImmediateRuntimeError(tmp$ret$0);
    }
    $this$with.p7e_1 = $this$with.p7e_1 | mask;
  }
  var tmp = $this$with.m7e_1;
  // Inline function 'androidx.compose.runtime.changelist.Operations.topObjectIndexOf' call
  var tmp_0 = $this$with.n7e_1;
  // Inline function 'androidx.compose.runtime.changelist.Operations.peekOperation' call
  tmp[(tmp_0 - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].z7e_1 | 0) + _ObjectParameter___get_offset__impl__x7fx93(parameter) | 0] = value;
  return Unit_instance;
}
function WriteScope__setObjects_impl_utvr6i($this, parameter1, value1, parameter2, value2) {
  // Inline function 'kotlin.with' call
  var $this$with = _get_stack__b8zp2v($this);
  if (false) {
    var mask = 1 << _ObjectParameter___get_offset__impl__x7fx93(parameter1) | 1 << _ObjectParameter___get_offset__impl__x7fx93(parameter2);
    // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
    var value = ($this$with.o7e_1 & mask) === 0;
    if (false && !value) {
      var tmp$ret$0 = 'Already pushed argument(s) ' + _WriteScope___get_operation__impl__krvgwa($this).i7g(parameter1) + (', ' + _WriteScope___get_operation__impl__krvgwa($this).i7g(parameter2));
      composeImmediateRuntimeError(tmp$ret$0);
    }
    $this$with.o7e_1 = $this$with.o7e_1 | mask;
  }
  var tmp = $this$with.n7e_1;
  // Inline function 'androidx.compose.runtime.changelist.Operations.peekOperation' call
  var base = tmp - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].z7e_1 | 0;
  var objectArgs = $this$with.m7e_1;
  objectArgs[base + _ObjectParameter___get_offset__impl__x7fx93(parameter1) | 0] = value1;
  objectArgs[base + _ObjectParameter___get_offset__impl__x7fx93(parameter2) | 0] = value2;
  return Unit_instance;
}
function WriteScope__setObjects_impl_utvr6i_0($this, parameter1, value1, parameter2, value2, parameter3, value3) {
  // Inline function 'kotlin.with' call
  var $this$with = _get_stack__b8zp2v($this);
  if (false) {
    var mask = 1 << _ObjectParameter___get_offset__impl__x7fx93(parameter1) | 1 << _ObjectParameter___get_offset__impl__x7fx93(parameter2) | 1 << _ObjectParameter___get_offset__impl__x7fx93(parameter3);
    // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
    var value = ($this$with.o7e_1 & mask) === 0;
    if (false && !value) {
      var tmp$ret$0 = 'Already pushed argument(s) ' + _WriteScope___get_operation__impl__krvgwa($this).i7g(parameter1) + (', ' + _WriteScope___get_operation__impl__krvgwa($this).i7g(parameter2)) + (', ' + _WriteScope___get_operation__impl__krvgwa($this).i7g(parameter3));
      composeImmediateRuntimeError(tmp$ret$0);
    }
    $this$with.o7e_1 = $this$with.o7e_1 | mask;
  }
  var tmp = $this$with.n7e_1;
  // Inline function 'androidx.compose.runtime.changelist.Operations.peekOperation' call
  var base = tmp - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].z7e_1 | 0;
  var objectArgs = $this$with.m7e_1;
  objectArgs[base + _ObjectParameter___get_offset__impl__x7fx93(parameter1) | 0] = value1;
  objectArgs[base + _ObjectParameter___get_offset__impl__x7fx93(parameter2) | 0] = value2;
  objectArgs[base + _ObjectParameter___get_offset__impl__x7fx93(parameter3) | 0] = value3;
  return Unit_instance;
}
function WriteScope__setObjects_impl_utvr6i_1($this, parameter1, value1, parameter2, value2, parameter3, value3, parameter4, value4) {
  // Inline function 'kotlin.with' call
  var $this$with = _get_stack__b8zp2v($this);
  if (false) {
    var mask = 1 << _ObjectParameter___get_offset__impl__x7fx93(parameter1) | 1 << _ObjectParameter___get_offset__impl__x7fx93(parameter2) | 1 << _ObjectParameter___get_offset__impl__x7fx93(parameter3) | 1 << _ObjectParameter___get_offset__impl__x7fx93(parameter4);
    // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
    var value = ($this$with.o7e_1 & mask) === 0;
    if (false && !value) {
      var tmp$ret$0 = 'Already pushed argument(s) ' + _WriteScope___get_operation__impl__krvgwa($this).i7g(parameter1) + (', ' + _WriteScope___get_operation__impl__krvgwa($this).i7g(parameter2)) + (', ' + _WriteScope___get_operation__impl__krvgwa($this).i7g(parameter3)) + (', ' + _WriteScope___get_operation__impl__krvgwa($this).i7g(parameter4));
      composeImmediateRuntimeError(tmp$ret$0);
    }
    $this$with.o7e_1 = $this$with.o7e_1 | mask;
  }
  var tmp = $this$with.n7e_1;
  // Inline function 'androidx.compose.runtime.changelist.Operations.peekOperation' call
  var base = tmp - $this$with.i7e_1[$this$with.j7e_1 - 1 | 0].z7e_1 | 0;
  var objectArgs = $this$with.m7e_1;
  objectArgs[base + _ObjectParameter___get_offset__impl__x7fx93(parameter1) | 0] = value1;
  objectArgs[base + _ObjectParameter___get_offset__impl__x7fx93(parameter2) | 0] = value2;
  objectArgs[base + _ObjectParameter___get_offset__impl__x7fx93(parameter3) | 0] = value3;
  objectArgs[base + _ObjectParameter___get_offset__impl__x7fx93(parameter4) | 0] = value4;
  return Unit_instance;
}
function access$_get_stack__7szo53($this) {
  return _get_stack__b8zp2v($this);
}
function determineNewSize($this, currentSize, requiredSize) {
  var resizeAmount = coerceAtMost(currentSize, 1024);
  return coerceAtLeast(currentSize + resizeAmount | 0, requiredSize);
}
function resizeOpCodes($this) {
  var resizeAmount = coerceAtMost($this.j7e_1, 1024);
  // Inline function 'kotlin.arrayOfNulls' call
  var size = $this.j7e_1 + resizeAmount | 0;
  var tmp = Array(size);
  var newOpCodes = isArray(tmp) ? tmp : THROW_CCE();
  var tmp_0 = $this;
  var tmp0 = $this.i7e_1;
  // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = $this.j7e_1;
  arrayCopy(tmp0, newOpCodes, 0, 0, endIndex);
  tmp_0.i7e_1 = newOpCodes;
}
function resizeIntArgs($this, currentSize, requiredSize) {
  var newIntArgs = new Int32Array(determineNewSize($this, currentSize, requiredSize));
  // Inline function 'kotlin.collections.copyInto' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp = $this.k7e_1;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp, newIntArgs, 0, 0, currentSize);
  $this.k7e_1 = newIntArgs;
}
function resizeObjectArgs($this, currentSize, requiredSize) {
  // Inline function 'kotlin.arrayOfNulls' call
  var size = determineNewSize($this, currentSize, requiredSize);
  var newObjectArgs = Array(size);
  // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
  // Inline function 'kotlin.collections.copyInto' call
  var this_0 = $this.m7e_1;
  arrayCopy(this_0, newObjectArgs, 0, 0, currentSize);
  $this.m7e_1 = newObjectArgs;
}
function exceptionMessageForOperationPushNoScope($this, operation) {
  return 'Cannot push ' + operation.toString() + ' without arguments because it expects ' + ('' + operation.y7e_1 + ' ints and ' + operation.z7e_1 + ' objects.');
}
function exceptionMessageForOperationPushWithScope($this, operation) {
  var missingIntCount = 0;
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  // Inline function 'kotlin.repeat' call
  var times = operation.y7e_1;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if ((1 << index & $this.o7e_1) === 0) {
        if (missingIntCount > 0) {
          this_0.hc(', ');
        }
        this_0.hc(operation.a7f(index));
        missingIntCount = missingIntCount + 1 | 0;
      }
    }
     while (inductionVariable < times);
  var missingInts = this_0.toString();
  var missingObjectCount = 0;
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_1 = StringBuilder().f();
  // Inline function 'kotlin.repeat' call
  var times_0 = operation.z7e_1;
  var inductionVariable_0 = 0;
  if (inductionVariable_0 < times_0)
    do {
      var index_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      if ((1 << index_0 & $this.p7e_1) === 0) {
        if (missingIntCount > 0) {
          this_1.hc(', ');
        }
        this_1.hc(operation.i7g(_ObjectParameter___init__impl__iyg1ip(index_0)));
        missingObjectCount = missingObjectCount + 1 | 0;
      }
    }
     while (inductionVariable_0 < times_0);
  var missingObjects = this_1.toString();
  return 'Error while pushing ' + operation.toString() + '. Not all arguments were provided. ' + ('Missing ' + missingIntCount + ' int arguments (' + missingInts + ') ') + ('and ' + missingObjectCount + ' object arguments (' + missingObjects + ').');
}
var OpIteratorClass;
function OpIterator() {
  if (OpIteratorClass === VOID) {
    class $ {
      constructor($outer) {
        this.v7i_1 = $outer;
        this.s7i_1 = 0;
        this.t7i_1 = 0;
        this.u7i_1 = 0;
      }
      z() {
        if (this.s7i_1 >= this.v7i_1.j7e_1)
          return false;
        var op = this.w7i();
        this.t7i_1 = this.t7i_1 + op.y7e_1 | 0;
        this.u7i_1 = this.u7i_1 + op.z7e_1 | 0;
        this.s7i_1 = this.s7i_1 + 1 | 0;
        return this.s7i_1 < this.v7i_1.j7e_1;
      }
      w7i() {
        return this.v7i_1.i7e_1[this.s7i_1];
      }
      h7g(parameter) {
        return this.v7i_1.k7e_1[this.t7i_1 + parameter | 0];
      }
      l7g(parameter) {
        var tmp = this.v7i_1.m7e_1[this.u7i_1 + _ObjectParameter___get_offset__impl__x7fx93(parameter) | 0];
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
    }
    initMetadataForClass($, 'OpIterator');
    OpIteratorClass = $;
  }
  return OpIteratorClass;
}
function access$_get_pushedIntMask__wrtr8x($this) {
  return $this.o7e_1;
}
function access$_set_pushedIntMask__hk28ql($this, _set____db54di) {
  $this.o7e_1 = _set____db54di;
  return Unit_instance;
}
var OperationsClass;
function Operations() {
  if (OperationsClass === VOID) {
    class $ extends OperationsDebugStringFormattable() {
      constructor() {
        super();
        var tmp = this;
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp_0 = Array(16);
        tmp.i7e_1 = isArray(tmp_0) ? tmp_0 : THROW_CCE();
        this.j7e_1 = 0;
        this.k7e_1 = new Int32Array(16);
        this.l7e_1 = 0;
        var tmp_1 = this;
        // Inline function 'kotlin.arrayOfNulls' call
        tmp_1.m7e_1 = Array(16);
        this.n7e_1 = 0;
        this.o7e_1 = 0;
        this.p7e_1 = 0;
      }
      c1() {
        return this.j7e_1;
      }
      h1() {
        return this.c1() === 0;
      }
      u6d() {
        return !(this.c1() === 0);
      }
      p3() {
        this.j7e_1 = 0;
        this.l7e_1 = 0;
        fill(this.m7e_1, null, 0, this.n7e_1);
        this.n7e_1 = 0;
      }
      s7e(operation) {
        if (false) {
          this.o7e_1 = 0;
          this.p7e_1 = 0;
        }
        if (this.j7e_1 === this.i7e_1.length) {
          resizeOpCodes(this);
        }
        // Inline function 'androidx.compose.runtime.changelist.Operations.ensureIntArgsSizeAtLeast' call
        var requiredSize = this.l7e_1 + operation.y7e_1 | 0;
        var currentSize = this.k7e_1.length;
        if (requiredSize > currentSize) {
          resizeIntArgs(this, currentSize, requiredSize);
        }
        // Inline function 'androidx.compose.runtime.changelist.Operations.ensureObjectArgsSizeAtLeast' call
        var requiredSize_0 = this.n7e_1 + operation.z7e_1 | 0;
        var currentSize_0 = this.m7e_1.length;
        if (requiredSize_0 > currentSize_0) {
          resizeObjectArgs(this, currentSize_0, requiredSize_0);
        }
        var tmp = this.i7e_1;
        var _unary__edvuaz = this.j7e_1;
        this.j7e_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = operation;
        this.l7e_1 = this.l7e_1 + operation.y7e_1 | 0;
        this.n7e_1 = this.n7e_1 + operation.z7e_1 | 0;
      }
      f7f(operation) {
        if (false) {
          // Inline function 'androidx.compose.runtime.requirePrecondition' call
          if (!((operation.y7e_1 & operation.z7e_1) === 0)) {
            var tmp$ret$0 = exceptionMessageForOperationPushNoScope(this, operation);
            throwIllegalArgumentException(tmp$ret$0);
          }
        }
        this.s7e(operation);
      }
      t7e(operation) {
        var tmp;
        var tmp_0 = this.o7e_1;
        // Inline function 'androidx.compose.runtime.changelist.Operations.createExpectedArgMask' call
        var paramCount = operation.y7e_1;
        if (tmp_0 === ((paramCount === 0 ? 0 : -1) >>> (32 - paramCount | 0) | 0)) {
          var tmp_1 = this.p7e_1;
          // Inline function 'androidx.compose.runtime.changelist.Operations.createExpectedArgMask' call
          var paramCount_0 = operation.z7e_1;
          tmp = tmp_1 === ((paramCount_0 === 0 ? 0 : -1) >>> (32 - paramCount_0 | 0) | 0);
        } else {
          tmp = false;
        }
        // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
        var value = tmp;
        if (false && !value) {
          var tmp$ret$2 = exceptionMessageForOperationPushWithScope(this, operation);
          composeImmediateRuntimeError(tmp$ret$2);
        }
      }
      d7g(other) {
        var opCodes = this.i7e_1;
        this.j7e_1 = this.j7e_1 - 1 | 0;
        var op = opCodes[this.j7e_1];
        (isArray(opCodes) ? opCodes : THROW_CCE())[this.j7e_1] = null;
        other.s7e(op);
        var tmp0 = this.m7e_1;
        var tmp2 = other.m7e_1;
        var tmp4 = other.n7e_1 - op.z7e_1 | 0;
        var tmp6 = this.n7e_1 - op.z7e_1 | 0;
        // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
        // Inline function 'kotlin.collections.copyInto' call
        var endIndex = this.n7e_1;
        arrayCopy(tmp0, tmp2, tmp4, tmp6, endIndex);
        fill(this.m7e_1, null, this.n7e_1 - op.z7e_1 | 0, this.n7e_1);
        var tmp0_0 = this.k7e_1;
        var tmp2_0 = other.k7e_1;
        var tmp4_0 = other.l7e_1 - op.y7e_1 | 0;
        var tmp6_0 = this.l7e_1 - op.y7e_1 | 0;
        // Inline function 'kotlin.collections.copyInto' call
        var endIndex_0 = this.l7e_1;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp = tmp0_0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        arrayCopy(tmp, tmp2_0, tmp4_0, tmp6_0, endIndex_0);
        this.n7e_1 = this.n7e_1 - op.z7e_1 | 0;
        this.l7e_1 = this.l7e_1 - op.y7e_1 | 0;
      }
      q7e(applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.changelist.Operations.drain' call
        // Inline function 'androidx.compose.runtime.changelist.Operations.forEach' call
        if (this.u6d()) {
          var iterator = new (OpIterator())(this);
          do {
            // Inline function 'kotlin.with' call
            iterator.w7i().g7g(iterator, applier, slots, rememberManager);
          }
           while (iterator.z());
        }
        this.p3();
      }
      toString() {
        return super.toString();
      }
    }
    initMetadataForClass($, 'Operations', Operations);
    OperationsClass = $;
  }
  return OperationsClass;
}
//region block: init
androidx_compose_runtime_changelist_Operations$stable = 8;
androidx_compose_runtime_changelist_OperationsDebugStringFormattable$stable = 0;
//endregion
//region block: exports
export {
  OperationsDebugStringFormattable as OperationsDebugStringFormattableqicuv1q9gtoc,
  Operations as Operations2xdufa66ptvyu,
  access$_get_stack__7szo53 as access$_get_stack__7szo531fdoxvn75wfm0,
  access$_get_pushedIntMask__wrtr8x as access$_get_pushedIntMask__wrtr8x2m8stwwd19q3c,
  access$_set_pushedIntMask__hk28ql as access$_set_pushedIntMask__hk28qlz2aymbr5zehr,
  _WriteScope___init__impl__4xwato as _WriteScope___init__impl__4xwato3s9ys6hy2bi2t,
  _WriteScope___get_operation__impl__krvgwa as _WriteScope___get_operation__impl__krvgwa3di2vupzclgqt,
  WriteScope__setObjects_impl_utvr6i_1 as WriteScope__setObjects_impl_utvr6i2b5o9u98l9nnw,
  WriteScope__setObjects_impl_utvr6i as WriteScope__setObjects_impl_utvr6i2eilw8dxshv6g,
  WriteScope__setObjects_impl_utvr6i_0 as WriteScope__setObjects_impl_utvr6i2kf45xe955ql9,
  WriteScope__setObject_impl_rr41y9 as WriteScope__setObject_impl_rr41y93oe51qh85jjpf,
};
//endregion

//# sourceMappingURL=Operations.mjs.map
