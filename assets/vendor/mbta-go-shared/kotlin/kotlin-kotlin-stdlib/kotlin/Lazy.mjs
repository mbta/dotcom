import { Unit_instance1fbcbse1fwigr as Unit_instance } from './Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from './Enum.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import {
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from './hacks.mjs';
import { toString30pk9tzaqopn as toString } from './Library.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var LazyThreadSafetyMode_SYNCHRONIZED_instance;
var LazyThreadSafetyMode_PUBLICATION_instance;
var LazyThreadSafetyMode_NONE_instance;
var LazyThreadSafetyMode_entriesInitialized;
function LazyThreadSafetyMode_initEntries() {
  if (LazyThreadSafetyMode_entriesInitialized)
    return Unit_instance;
  LazyThreadSafetyMode_entriesInitialized = true;
  LazyThreadSafetyMode_SYNCHRONIZED_instance = new (LazyThreadSafetyMode())('SYNCHRONIZED', 0);
  LazyThreadSafetyMode_PUBLICATION_instance = new (LazyThreadSafetyMode())('PUBLICATION', 1);
  LazyThreadSafetyMode_NONE_instance = new (LazyThreadSafetyMode())('NONE', 2);
}
var LazyThreadSafetyModeClass;
function LazyThreadSafetyMode() {
  if (LazyThreadSafetyModeClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'LazyThreadSafetyMode');
    LazyThreadSafetyModeClass = $;
  }
  return LazyThreadSafetyModeClass;
}
var UnsafeLazyImplClass;
function UnsafeLazyImpl() {
  if (UnsafeLazyImplClass === VOID) {
    class $ {
      constructor(initializer) {
        this.vw_1 = initializer;
        this.ww_1 = UNINITIALIZED_VALUE_instance;
      }
      v1() {
        if (this.ww_1 === UNINITIALIZED_VALUE_instance) {
          this.ww_1 = ensureNotNull(this.vw_1)();
          this.vw_1 = null;
        }
        var tmp = this.ww_1;
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
      xw() {
        return !(this.ww_1 === UNINITIALIZED_VALUE_instance);
      }
      toString() {
        return this.xw() ? toString(this.v1()) : 'Lazy value not initialized yet.';
      }
    }
    initMetadataForClass($, 'UnsafeLazyImpl');
    UnsafeLazyImplClass = $;
  }
  return UnsafeLazyImplClass;
}
var UNINITIALIZED_VALUEClass;
function UNINITIALIZED_VALUE() {
  if (UNINITIALIZED_VALUEClass === VOID) {
    class $ {}
    initMetadataForObject($, 'UNINITIALIZED_VALUE');
    UNINITIALIZED_VALUEClass = $;
  }
  return UNINITIALIZED_VALUEClass;
}
var UNINITIALIZED_VALUE_instance;
function UNINITIALIZED_VALUE_getInstance() {
  return UNINITIALIZED_VALUE_instance;
}
function LazyThreadSafetyMode_PUBLICATION_getInstance() {
  LazyThreadSafetyMode_initEntries();
  return LazyThreadSafetyMode_PUBLICATION_instance;
}
function LazyThreadSafetyMode_NONE_getInstance() {
  LazyThreadSafetyMode_initEntries();
  return LazyThreadSafetyMode_NONE_instance;
}
//region block: init
UNINITIALIZED_VALUE_instance = new (UNINITIALIZED_VALUE())();
//endregion
//region block: exports
export {
  LazyThreadSafetyMode_NONE_getInstance as LazyThreadSafetyMode_NONE_getInstance2ezxh11hvaa3w,
  LazyThreadSafetyMode_PUBLICATION_getInstance as LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0,
  UnsafeLazyImpl as UnsafeLazyImplgpp92xc41v15,
};
//endregion

//# sourceMappingURL=Lazy.mjs.map
