import { TypeQualifier1esmq2h0dalsb as TypeQualifier } from '../qualifier/TypeQualifier.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { NoDefinitionFoundExceptionu1zdq6ntzs3k as NoDefinitionFoundException } from '../error/NoDefinitionFoundException.mjs';
import { getFullName1t9gk3djdkvl5 as getFullName } from '../../ext/KClassExt.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { ArrayDeque2dzc9uld4xi7n as ArrayDeque } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayDeque.mjs';
import { asReversed308kw52j6ls1u as asReversed } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ReversedViews.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function resolveFromContextOrNull($this, scope, instanceContext, lookupParent) {
  // Inline function 'org.koin.core.resolution.CoreResolver.resolveFromInjectedParameters' call
  var tmp;
  if (instanceContext.l7x_1 == null || instanceContext.l7x_1.h1()) {
    tmp = null;
  } else {
    instanceContext.h7x_1.j7v('|- ? ' + instanceContext.m7x_1 + ' look in injected parameters');
    tmp = instanceContext.l7x_1.w7y(instanceContext.j7x_1);
  }
  var tmp0_elvis_lhs = tmp;
  var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? resolveFromRegistry($this, scope, instanceContext) : tmp0_elvis_lhs;
  var tmp_0;
  if (tmp1_elvis_lhs == null) {
    // Inline function 'org.koin.core.resolution.CoreResolver.resolveFromStackedParameters' call
    var tmp0_safe_receiver = scope.z7x_1;
    var current = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.r29();
    var tmp_1;
    // Inline function 'kotlin.collections.isNullOrEmpty' call
    if (current == null || current.h1()) {
      tmp_1 = null;
    } else {
      instanceContext.h7x_1.j7v('|- ? ' + instanceContext.m7x_1 + ' look in stack parameters');
      var parameters = current.ln();
      tmp_1 = parameters == null ? null : parameters.w7y(instanceContext.j7x_1);
    }
    tmp_0 = tmp_1;
  } else {
    tmp_0 = tmp1_elvis_lhs;
  }
  var tmp2_elvis_lhs = tmp_0;
  var tmp_2;
  if (tmp2_elvis_lhs == null) {
    var tmp$ret$3;
    $l$block: {
      // Inline function 'org.koin.core.resolution.CoreResolver.resolveFromScopeSource' call
      if (scope.t7x_1 || scope.x7x_1 == null || !(instanceContext.j7x_1.hh(scope.x7x_1) && instanceContext.k7x_1 == null)) {
        tmp$ret$3 = null;
        break $l$block;
      }
      instanceContext.h7x_1.j7v('|- ? ' + instanceContext.m7x_1 + ' look at scope source');
      var tmp_3;
      if (instanceContext.j7x_1.hh(scope.x7x_1)) {
        var tmp_4 = scope.x7x_1;
        tmp_3 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : null;
      } else {
        tmp_3 = null;
      }
      tmp$ret$3 = tmp_3;
    }
    tmp_2 = tmp$ret$3;
  } else {
    tmp_2 = tmp2_elvis_lhs;
  }
  var tmp3_elvis_lhs = tmp_2;
  var tmp_5;
  if (tmp3_elvis_lhs == null) {
    var tmp$ret$4;
    $l$block_0: {
      // Inline function 'org.koin.core.resolution.CoreResolver.resolveFromScopeArchetype' call
      var tmp_6;
      if (scope.t7x_1) {
        tmp_6 = true;
      } else {
        var tmp_7 = scope.r7x_1;
        tmp_6 = !(tmp_7 instanceof TypeQualifier());
      }
      if (tmp_6) {
        tmp$ret$4 = null;
        break $l$block_0;
      }
      instanceContext.h7x_1.j7v('|- ? ' + instanceContext.m7x_1 + ' look at scope archetype');
      tmp$ret$4 = $this.i7z_1.s7u_1.c7z(instanceContext.k7x_1, instanceContext.j7x_1, instanceContext);
    }
    tmp_5 = tmp$ret$4;
  } else {
    tmp_5 = tmp3_elvis_lhs;
  }
  var tmp4_elvis_lhs = tmp_5;
  var tmp_8;
  if (tmp4_elvis_lhs == null) {
    var tmp_9;
    if (lookupParent) {
      tmp_9 = resolveFromParentScopes($this, scope, instanceContext);
    } else {
      tmp_9 = null == null ? resolveInExtensions($this, scope, instanceContext) : null;
    }
    tmp_8 = tmp_9;
  } else {
    tmp_8 = tmp4_elvis_lhs;
  }
  return tmp_8;
}
function resolveFromContextOrNull$default($this, scope, instanceContext, lookupParent, $super) {
  lookupParent = lookupParent === VOID ? true : lookupParent;
  return resolveFromContextOrNull($this, scope, instanceContext, lookupParent);
}
function resolveFromRegistry($this, scope, ctx) {
  return $this.i7z_1.s7u_1.d7z(ctx.k7x_1, ctx.j7x_1, scope.r7x_1, ctx);
}
function resolveFromParentScopes($this, scope, ctx) {
  if (scope.t7x_1)
    return null;
  ctx.h7x_1.j7v('|- ? ' + ctx.m7x_1 + ' look in other scopes');
  return findInOtherScope($this, scope, ctx);
}
function findInOtherScope($this, scope, ctx) {
  var parentScopes = scope.w7x_1.c1() > 1 ? flatten(scope.w7x_1) : scope.w7x_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstNotNullOfOrNull' call
    var _iterator__ex2g4s = parentScopes.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      ctx.h7x_1.j7v('|- ? ' + ctx.m7x_1 + " look in scope '" + element.s7x_1 + "'");
      var instanceContext = !element.t7x_1 ? ctx.q7x(element) : ctx;
      var result = resolveFromContextOrNull($this, element, instanceContext, false);
      if (!(result == null)) {
        tmp$ret$1 = result;
        break $l$block;
      }
    }
    tmp$ret$1 = null;
  }
  return tmp$ret$1;
}
function resolveInExtensions($this, scope, ctx) {
  var tmp0 = $this.j7z_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstNotNullOfOrNull' call
    var _iterator__ex2g4s = tmp0.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      ctx.h7x_1.j7v("|- ['" + element.y3() + "'] ?");
      var tmp = element.k7z(scope, ctx);
      var result = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      if (!(result == null)) {
        tmp$ret$1 = result;
        break $l$block;
      }
    }
    tmp$ret$1 = null;
  }
  return tmp$ret$1;
}
var CoreResolverClass;
function CoreResolver() {
  if (CoreResolverClass === VOID) {
    class $ {
      constructor(_koin) {
        this.i7z_1 = _koin;
        var tmp = this;
        // Inline function 'kotlin.collections.arrayListOf' call
        tmp.j7z_1 = ArrayList().g1();
      }
      l7z(scope, instanceContext) {
        var tmp0_elvis_lhs = resolveFromContextOrNull$default(this, scope, instanceContext);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          var tmp0_safe_receiver = instanceContext.k7x_1;
          var tmp_0;
          if (tmp0_safe_receiver == null) {
            tmp_0 = null;
          } else {
            // Inline function 'kotlin.let' call
            tmp_0 = " and qualifier '" + toString(tmp0_safe_receiver) + "'";
          }
          var tmp1_elvis_lhs = tmp_0;
          var qualifierString = tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs;
          throw NoDefinitionFoundException().z7w("No definition found for type '" + getFullName(instanceContext.j7x_1) + "'" + qualifierString + '. Check your Modules configuration and add missing type and/or qualifier!');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'CoreResolver');
    CoreResolverClass = $;
  }
  return CoreResolverClass;
}
function flatten(scopes) {
  // Inline function 'kotlin.collections.linkedSetOf' call
  var flatten = LinkedHashSet().f1();
  var stack = ArrayDeque().kn(asReversed(scopes));
  $l$loop_0: while (true) {
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!!stack.h1()) {
      break $l$loop_0;
    }
    var current = stack.qn();
    if (!flatten.i(current)) {
      continue $l$loop_0;
    }
    var _iterator__ex2g4s = current.w7x_1.x();
    while (_iterator__ex2g4s.y()) {
      var scope = _iterator__ex2g4s.z();
      if (!flatten.j1(scope)) {
        // Inline function 'kotlin.collections.plusAssign' call
        stack.i(scope);
      }
    }
  }
  return flatten;
}
//region block: exports
export {
  CoreResolver as CoreResolverepto9asrhi36,
};
//endregion

//# sourceMappingURL=CoreResolver.mjs.map
