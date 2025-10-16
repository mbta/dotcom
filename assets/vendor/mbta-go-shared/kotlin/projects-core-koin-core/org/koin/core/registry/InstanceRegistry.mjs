import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  NoClass2rdwoioezieyw as NoClass,
  ResolutionContext15weqg15y4x30 as ResolutionContext,
} from '../instance/ResolutionContext.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../mp/PlatformTools.mjs';
import { copyToArray2j022khrow2yi as copyToArray } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { arrayListOf1fz8nib0ncbow as arrayListOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { overrideError2nbqcqz3ohj49 as overrideError } from '../module/Module.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { getFullName1t9gk3djdkvl5 as getFullName } from '../../ext/KClassExt.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function addAllEagerInstances($this, module_0) {
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = module_0.j7y_1.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var tmp0 = $this.z7u_1;
    // Inline function 'kotlin.collections.set' call
    var key = element.e7x_1.hashCode();
    tmp0.t3(key, element);
  }
}
function loadModule($this, module_0, allowOverride) {
  // Inline function 'kotlin.collections.forEach' call
  // Inline function 'kotlin.collections.iterator' call
  var _iterator__ex2g4s = module_0.k7y_1.t1().x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    // Inline function 'kotlin.collections.component1' call
    var mapping = element.u1();
    // Inline function 'kotlin.collections.component2' call
    var factory = element.v1();
    $this.y7y(allowOverride, mapping, factory);
  }
}
function createEagerInstances($this, instances) {
  var defaultContext = new (ResolutionContext())($this.x7u_1.p7u_1, $this.x7u_1.r7u_1.e7v_1, getKClass(NoClass()));
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = instances.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    element.d7x(defaultContext);
  }
}
var InstanceRegistryClass;
function InstanceRegistry() {
  if (InstanceRegistryClass === VOID) {
    class $ {
      constructor(_koin) {
        this.x7u_1 = _koin;
        this.y7u_1 = KoinPlatformTools_instance.z7y();
        this.z7u_1 = KoinPlatformTools_instance.z7y();
      }
      a7v(modules, allowOverride) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = modules.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          loadModule(this, element, allowOverride);
          addAllEagerInstances(this, element);
        }
      }
      k7v() {
        // Inline function 'kotlin.collections.toTypedArray' call
        var this_0 = this.z7u_1.l3();
        var tmp$ret$0 = copyToArray(this_0);
        var instances = arrayListOf(tmp$ret$0.slice());
        this.z7u_1.p3();
        createEagerInstances(this, instances);
      }
      a7z(allowOverride, mapping, factory, logWarning) {
        if (this.y7u_1.j3(mapping) == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          if (!allowOverride) {
            overrideError(factory, mapping);
          } else if (logWarning) {
            this.x7u_1.p7u_1.s3n("(+) override index '" + mapping + "' -> '" + factory.e7x_1.toString() + "'");
            var tmp0 = this.z7u_1.l3();
            var tmp$ret$1;
            $l$block: {
              // Inline function 'kotlin.collections.firstOrNull' call
              var _iterator__ex2g4s = tmp0.x();
              while (_iterator__ex2g4s.y()) {
                var element = _iterator__ex2g4s.z();
                if (element.e7x_1.equals(factory.e7x_1)) {
                  tmp$ret$1 = element;
                  break $l$block;
                }
              }
              tmp$ret$1 = null;
            }
            var existingFactory = tmp$ret$1;
            if (!(existingFactory == null)) {
              this.z7u_1.u3(factory.e7x_1.hashCode());
            }
          }
        }
        this.x7u_1.p7u_1.j7v("(+) index '" + mapping + "' -> '" + factory.e7x_1.toString() + "'");
        // Inline function 'kotlin.collections.set' call
        this.y7u_1.t3(mapping, factory);
      }
      y7y(allowOverride, mapping, factory, logWarning, $super) {
        logWarning = logWarning === VOID ? true : logWarning;
        var tmp;
        if ($super === VOID) {
          this.a7z(allowOverride, mapping, factory, logWarning);
          tmp = Unit_instance;
        } else {
          tmp = $super.a7z.call(this, allowOverride, mapping, factory, logWarning);
        }
        return tmp;
      }
      b7z(clazz, qualifier, scopeQualifier) {
        // Inline function 'org.koin.core.definition.indexKey' call
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        this_0.hc(getFullName(clazz));
        this_0.ic(_Char___init__impl__6a9atx(58));
        var tmp1_elvis_lhs = qualifier == null ? null : qualifier.v1();
        this_0.hc(tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs);
        this_0.ic(_Char___init__impl__6a9atx(58));
        this_0.gc(scopeQualifier);
        var indexKey = this_0.toString();
        return this.y7u_1.j3(indexKey);
      }
      c7z(qualifier, klass, context) {
        var tmp0_safe_receiver = context.i7x_1.u7x_1;
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          context.n7x_1 = tmp0_safe_receiver;
          tmp = this.d7z(qualifier, klass, tmp0_safe_receiver, context);
        }
        return tmp;
      }
      d7z(qualifier, clazz, scopeQualifier, instanceContext) {
        var tmp0_safe_receiver = this.b7z(clazz, qualifier, scopeQualifier);
        var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.d7x(instanceContext);
        return (tmp == null ? true : !(tmp == null)) ? tmp : null;
      }
      p7v() {
        return this.y7u_1.c1();
      }
    }
    initMetadataForClass($, 'InstanceRegistry');
    InstanceRegistryClass = $;
  }
  return InstanceRegistryClass;
}
//region block: exports
export {
  InstanceRegistry as InstanceRegistry22hdy97x3c031,
};
//endregion

//# sourceMappingURL=InstanceRegistry.mjs.map
