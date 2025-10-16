import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { _q3qthx4hmumoj2 as _q } from '../qualifier/Qualifier.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../mp/PlatformTools.mjs';
import { Scopeynrggfq4oqa6 as Scope } from '../scope/Scope.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function loadModule($this, module_0) {
  $this.c7v_1.d1(module_0.l7y_1);
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.g7w_1 = '_root_';
        this.h7w_1 = _q('_root_');
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var ScopeRegistryClass;
function ScopeRegistry() {
  if (ScopeRegistryClass === VOID) {
    class $ {
      constructor(_koin) {
        Companion_getInstance();
        this.b7v_1 = _koin;
        this.c7v_1 = KoinPlatformTools_instance.h7z();
        this.d7v_1 = KoinPlatformTools_instance.z7y();
        this.e7v_1 = new (Scope())(Companion_getInstance().h7w_1, '_root_', true, VOID, this.b7v_1);
        this.c7v_1.i(this.e7v_1.r7x_1);
        var tmp0 = this.d7v_1;
        var tmp2 = this.e7v_1.s7x_1;
        // Inline function 'kotlin.collections.set' call
        var value = this.e7v_1;
        tmp0.t3(tmp2, value);
      }
      f7v(modules) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = modules.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          loadModule(this, element);
        }
      }
    }
    initMetadataForClass($, 'ScopeRegistry');
    ScopeRegistryClass = $;
  }
  return ScopeRegistryClass;
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance13ladrowvkk2x,
  ScopeRegistry as ScopeRegistrynj5m5vnc5gt,
};
//endregion

//# sourceMappingURL=ScopeRegistry.mjs.map
