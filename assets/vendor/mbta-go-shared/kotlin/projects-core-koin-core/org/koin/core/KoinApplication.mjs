import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Koin3uwug7yrv0nqu as Koin } from './Koin.mjs';
import { Level_INFO_getInstance37dpjl8gm1fk4 as Level_INFO_getInstance } from './logger/Logger.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Monotonic_instance6v32gqtywf7e as Monotonic_instance,
  ValueTimeMark__elapsedNow_impl_eonqvs1dlqois04h852 as ValueTimeMark__elapsedNow_impl_eonqvs,
} from '../../../../kotlin-kotlin-stdlib/kotlin/time/TimeSource.mjs';
import { get_inMs1dfov9ilo7khc as get_inMs } from './time/DurationExt.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function loadModules($this, modules) {
  $this.l7v_1.w7u(modules, $this.m7v_1, false);
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      n7v() {
        var app = new (KoinApplication())();
        return app;
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
var KoinApplicationClass;
function KoinApplication() {
  if (KoinApplicationClass === VOID) {
    class $ {
      constructor() {
        this.l7v_1 = new (Koin())();
        this.m7v_1 = true;
      }
      o7v(modules) {
        var tmp0 = this.l7v_1.p7u_1;
        // Inline function 'org.koin.core.logger.Logger.isAt' call
        var lvl = Level_INFO_getInstance();
        if (tmp0.i7v_1.a4(lvl) <= 0) {
          // Inline function 'kotlin.time.measureTime' call
          // Inline function 'kotlin.time.measureTime' call
          var mark = Monotonic_instance.ql();
          loadModules(this, modules);
          var duration = ValueTimeMark__elapsedNow_impl_eonqvs(mark);
          var count = this.l7v_1.s7u_1.p7v();
          this.l7v_1.p7u_1.q7v(Level_INFO_getInstance(), 'Started ' + count + ' definitions in ' + get_inMs(duration) + ' ms');
        } else {
          loadModules(this, modules);
        }
        return this;
      }
    }
    initMetadataForClass($, 'KoinApplication');
    KoinApplicationClass = $;
  }
  return KoinApplicationClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instance3q2yw1wtvwi75,
};
//endregion

//# sourceMappingURL=KoinApplication.mjs.map
