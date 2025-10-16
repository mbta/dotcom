import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../mp/PlatformTools.mjs';
import { generateId2uxfk2np7e8kx as generateId } from '../../mp/KoinPlatformTools.js.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { addAll21mdhg523wnoa as addAll } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { getFullName1t9gk3djdkvl5 as getFullName } from '../../ext/KClassExt.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { ArrayDeque2dzc9uld4xi7n as ArrayDeque } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayDeque.mjs';
import { asReversed308kw52j6ls1u as asReversed } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ReversedViews.mjs';
import { DefinitionOverrideException2zs8z58wr2ebj as DefinitionOverrideException } from '../error/DefinitionOverrideException.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ModuleClass;
function Module() {
  if (ModuleClass === VOID) {
    class $ {
      constructor(_createdAtStart) {
        _createdAtStart = _createdAtStart === VOID ? false : _createdAtStart;
        this.h7y_1 = _createdAtStart;
        this.i7y_1 = generateId(KoinPlatformTools_instance);
        this.j7y_1 = LinkedHashSet().f1();
        this.k7y_1 = LinkedHashMap().sc();
        this.l7y_1 = LinkedHashSet().f1();
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.m7y_1 = ArrayList().g1();
      }
      n7y(module_0) {
        addAll(this.m7y_1, module_0);
      }
      o7y(instanceFactory) {
        var def = instanceFactory.e7x_1;
        var tmp0 = def.z7v_1;
        var tmp2 = def.a7w_1;
        // Inline function 'org.koin.core.definition.indexKey' call
        var scopeQualifier = def.y7v_1;
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        this_0.hc(getFullName(tmp0));
        this_0.ic(_Char___init__impl__6a9atx(58));
        var tmp1_elvis_lhs = tmp2 == null ? null : tmp2.v1();
        this_0.hc(tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs);
        this_0.ic(_Char___init__impl__6a9atx(58));
        this_0.gc(scopeQualifier);
        var mapping = this_0.toString();
        this.p7y(mapping, instanceFactory);
      }
      q7y(instanceFactory) {
        var def = instanceFactory.e7x_1;
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = def.d7w_1.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp2 = def.a7w_1;
          // Inline function 'org.koin.core.definition.indexKey' call
          var scopeQualifier = def.y7v_1;
          // Inline function 'kotlin.text.buildString' call
          // Inline function 'kotlin.apply' call
          var this_0 = StringBuilder().f();
          this_0.hc(getFullName(element));
          this_0.ic(_Char___init__impl__6a9atx(58));
          var tmp1_elvis_lhs = tmp2 == null ? null : tmp2.v1();
          this_0.hc(tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs);
          this_0.ic(_Char___init__impl__6a9atx(58));
          this_0.gc(scopeQualifier);
          var mapping = this_0.toString();
          this.p7y(mapping, instanceFactory);
        }
      }
      r7y(instanceFactory) {
        this.j7y_1.i(instanceFactory);
      }
      p7y(mapping, factory) {
        // Inline function 'kotlin.collections.set' call
        this.k7y_1.t3(mapping, factory);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Module()))
          return false;
        return this.i7y_1 === other.i7y_1;
      }
      hashCode() {
        return getStringHashCode(this.i7y_1);
      }
    }
    initMetadataForClass($, 'Module', Module);
    ModuleClass = $;
  }
  return ModuleClass;
}
function flatten(modules) {
  // Inline function 'kotlin.collections.linkedSetOf' call
  var flatten = LinkedHashSet().f1();
  var stack = ArrayDeque().kn(asReversed(modules));
  $l$loop_0: while (true) {
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!!stack.h1()) {
      break $l$loop_0;
    }
    var current = stack.qn();
    if (!flatten.i(current)) {
      continue $l$loop_0;
    }
    var _iterator__ex2g4s = current.m7y_1.x();
    while (_iterator__ex2g4s.y()) {
      var module_0 = _iterator__ex2g4s.z();
      if (!flatten.j1(module_0)) {
        // Inline function 'kotlin.collections.plusAssign' call
        stack.i(module_0);
      }
    }
  }
  return flatten;
}
function overrideError(factory, mapping) {
  throw DefinitionOverrideException().q7w('Already existing definition for ' + factory.e7x_1.toString() + ' at ' + mapping);
}
//region block: exports
export {
  Module as Moduletfs907sc80na,
  flatten as flatten1lreua3rlf560,
  overrideError as overrideError2nbqcqz3ohj49,
};
//endregion

//# sourceMappingURL=Module.mjs.map
