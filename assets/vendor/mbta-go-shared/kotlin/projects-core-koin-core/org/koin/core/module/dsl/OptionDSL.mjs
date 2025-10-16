import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { SingleInstanceFactoryp594z6t2b69a as SingleInstanceFactory } from '../../instance/SingleInstanceFactory.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function onOptions(_this__u8e3s4, options) {
  options = options === VOID ? null : options;
  if (!(options == null)) {
    // Inline function 'org.koin.core.module.dsl.withOptions' call
    var def = _this__u8e3s4.k7w_1.e7x_1;
    var primary = def.a7w_1;
    // Inline function 'kotlin.also' call
    options(def);
    if (!equals(def.a7w_1, primary)) {
      _this__u8e3s4.j7w_1.o7y(_this__u8e3s4.k7w_1);
    }
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!def.d7w_1.h1()) {
      _this__u8e3s4.j7w_1.q7y(_this__u8e3s4.k7w_1);
    }
    var tmp;
    if (def.f7w_1) {
      var tmp_0 = _this__u8e3s4.k7w_1;
      tmp = tmp_0 instanceof SingleInstanceFactory();
    } else {
      tmp = false;
    }
    if (tmp) {
      _this__u8e3s4.j7w_1.r7y(_this__u8e3s4.k7w_1);
    }
  }
  return _this__u8e3s4;
}
//region block: exports
export {
  onOptions as onOptionsoxrnzuikoevt,
};
//endregion

//# sourceMappingURL=OptionDSL.mjs.map
