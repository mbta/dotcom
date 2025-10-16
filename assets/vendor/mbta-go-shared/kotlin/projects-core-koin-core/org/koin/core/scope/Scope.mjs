import { Level_DEBUG_getInstance1r0p8wfisoptk as Level_DEBUG_getInstance } from '../logger/Logger.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { getFullName1t9gk3djdkvl5 as getFullName } from '../../ext/KClassExt.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Monotonic_instance6v32gqtywf7e as Monotonic_instance,
  ValueTimeMark__elapsedNow_impl_eonqvs1dlqois04h852 as ValueTimeMark__elapsedNow_impl_eonqvs,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/time/TimeSource.mjs';
import { TimedValuew9j01dao9jci as TimedValue } from '../../../../../kotlin-kotlin-stdlib/kotlin/time/measureTime.mjs';
import { get_inMs1dfov9ilo7khc as get_inMs } from '../time/DurationExt.mjs';
import { ClosedScopeException25w17ajhv402a as ClosedScopeException } from '../error/ClosedScopeException.mjs';
import { ResolutionContext15weqg15y4x30 as ResolutionContext } from '../instance/ResolutionContext.mjs';
import { ArrayDeque2dzc9uld4xi7n as ArrayDeque } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayDeque.mjs';
import { ThreadLocalRef2gwn4e0n07y5w as ThreadLocalRef } from '../../../../../Stately-stately-concurrency/co/touchlab/stately/concurrency/ThreadLocal.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function resolve($this, clazz, qualifier, parameters) {
  var tmp0 = $this.v7x_1.p7u_1;
  // Inline function 'org.koin.core.logger.Logger.isAt' call
  var lvl = Level_DEBUG_getInstance();
  if (!(tmp0.i7v_1.a4(lvl) <= 0)) {
    return resolveInstance($this, qualifier, clazz, parameters);
  }
  // Inline function 'org.koin.core.scope.Scope.logInstanceRequest' call
  var tmp;
  if (qualifier == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = " with qualifier '" + toString(qualifier) + "'";
  }
  var tmp1_elvis_lhs = tmp;
  var qualifierString = tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs;
  var scopeId = $this.t7x_1 ? '' : " - scope:'" + $this.s7x_1 + "'";
  $this.v7x_1.p7u_1.q7v(Level_DEBUG_getInstance(), "|- '" + getFullName(clazz) + "'" + qualifierString + scopeId + '...');
  // Inline function 'kotlin.time.measureTimedValue' call
  // Inline function 'kotlin.time.measureTimedValue' call
  var mark = Monotonic_instance.ql();
  var result = resolveInstance($this, qualifier, clazz, parameters);
  var result_0 = new (TimedValue())(result, ValueTimeMark__elapsedNow_impl_eonqvs(mark));
  // Inline function 'org.koin.core.scope.Scope.logInstanceDuration' call
  var duration = result_0.mw_1;
  $this.v7x_1.p7u_1.q7v(Level_DEBUG_getInstance(), "|- '" + getFullName(clazz) + "' in " + get_inMs(duration) + ' ms');
  return result_0.lw_1;
}
function resolveInstance($this, qualifier, clazz, parameters) {
  // Inline function 'org.koin.core.scope.Scope.checkScopeIsOpen' call
  if ($this.a7y_1) {
    throw ClosedScopeException().n7w("Scope '" + $this.s7x_1 + "' is closed");
  }
  var instanceContext = new (ResolutionContext())($this.v7x_1.p7u_1, $this, clazz, qualifier, parameters);
  return stackParametersCall($this, parameters, instanceContext);
}
function stackParametersCall($this, parameters, instanceContext) {
  if (parameters == null) {
    return resolveFromContext($this, instanceContext);
  }
  var tmp0 = $this.v7x_1.p7u_1;
  // Inline function 'org.koin.core.logger.Logger.log' call
  var lvl = Level_DEBUG_getInstance();
  // Inline function 'org.koin.core.logger.Logger.isAt' call
  if (tmp0.i7v_1.a4(lvl) <= 0) {
    var tmp$ret$1 = '| >> parameters ' + toString(parameters);
    tmp0.q7v(lvl, tmp$ret$1);
  }
  var stack = onParameterOnStack($this, parameters);
  try {
    return resolveFromContext($this, instanceContext);
  }finally {
    $this.v7x_1.p7u_1.j7v('| << parameters');
    clearParameterStack($this, stack);
  }
}
function onParameterOnStack($this, parameters) {
  var stack = getOrCreateParameterStack($this);
  stack.mn(parameters);
  return stack;
}
function clearParameterStack($this, stack) {
  stack.pn();
  if (stack.h1()) {
    var tmp0_safe_receiver = $this.z7x_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.z6();
    }
    $this.z7x_1 = null;
  }
}
function getOrCreateParameterStack($this) {
  var tmp0_safe_receiver = $this.z7x_1;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.r29();
  var tmp;
  if (tmp1_elvis_lhs == null) {
    // Inline function 'kotlin.let' call
    var it = ArrayDeque().jn();
    $this.z7x_1 = new (ThreadLocalRef())();
    var tmp0_safe_receiver_0 = $this.z7x_1;
    if (tmp0_safe_receiver_0 == null)
      null;
    else {
      tmp0_safe_receiver_0.u72(it);
    }
    tmp = it;
  } else {
    tmp = tmp1_elvis_lhs;
  }
  return tmp;
}
function resolveFromContext($this, instanceContext) {
  return $this.v7x_1.q7u_1.l7z($this, instanceContext);
}
var ScopeClass;
function Scope() {
  if (ScopeClass === VOID) {
    class $ {
      constructor(scopeQualifier, id, isRoot, scopeArchetype, _koin) {
        isRoot = isRoot === VOID ? false : isRoot;
        scopeArchetype = scopeArchetype === VOID ? null : scopeArchetype;
        this.r7x_1 = scopeQualifier;
        this.s7x_1 = id;
        this.t7x_1 = isRoot;
        this.u7x_1 = scopeArchetype;
        this.v7x_1 = _koin;
        this.w7x_1 = ArrayList().g1();
        this.x7x_1 = null;
        this.y7x_1 = LinkedHashSet().f1();
        this.z7x_1 = null;
        this.a7y_1 = false;
      }
      m7z() {
        return this.a7y_1;
      }
      n7z(clazz, qualifier, parameters) {
        return resolve(this, clazz, qualifier, parameters == null ? null : parameters());
      }
      o7z(clazz, qualifier, parameters, $super) {
        qualifier = qualifier === VOID ? null : qualifier;
        parameters = parameters === VOID ? null : parameters;
        return $super === VOID ? this.n7z(clazz, qualifier, parameters) : $super.n7z.call(this, clazz, qualifier, parameters);
      }
      toString() {
        return "['" + this.s7x_1 + "']";
      }
    }
    initMetadataForClass($, 'Scope');
    ScopeClass = $;
  }
  return ScopeClass;
}
//region block: exports
export {
  Scope as Scopeynrggfq4oqa6,
};
//endregion

//# sourceMappingURL=Scope.mjs.map
