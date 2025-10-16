import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_StaticValueHolder$stable;
var androidx_compose_runtime_LazyValueHolder$stable;
var androidx_compose_runtime_ComputedValueHolder$stable;
var androidx_compose_runtime_DynamicValueHolder$stable;
function _get_current__qcrdxk($this) {
  var tmp0 = $this.h7e_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('current', 1, tmp, LazyValueHolder$_get_current_$ref_sagj5g(), null);
  return tmp0.v1();
}
function LazyValueHolder$_get_current_$ref_sagj5g() {
  return function (p0) {
    return _get_current__qcrdxk(p0);
  };
}
var LazyValueHolderClass;
function LazyValueHolder() {
  if (LazyValueHolderClass === VOID) {
    class $ {
      constructor(valueProducer) {
        this.h7e_1 = lazy(valueProducer);
      }
      p72(map) {
        return _get_current__qcrdxk(this);
      }
    }
    initMetadataForClass($, 'LazyValueHolder');
    LazyValueHolderClass = $;
  }
  return LazyValueHolderClass;
}
//region block: init
androidx_compose_runtime_StaticValueHolder$stable = 0;
androidx_compose_runtime_LazyValueHolder$stable = 8;
androidx_compose_runtime_ComputedValueHolder$stable = 0;
androidx_compose_runtime_DynamicValueHolder$stable = 0;
//endregion
//region block: exports
export {
  LazyValueHolder as LazyValueHolderooy66hzc1nzs,
};
//endregion

//# sourceMappingURL=ValueHolders.mjs.map
