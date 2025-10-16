import { EmptyLogger2zykw532lsczr as EmptyLogger } from './logger/EmptyLogger.mjs';
import { CoreResolverepto9asrhi36 as CoreResolver } from './resolution/CoreResolver.mjs';
import { ScopeRegistrynj5m5vnc5gt as ScopeRegistry } from './registry/ScopeRegistry.mjs';
import { InstanceRegistry22hdy97x3c031 as InstanceRegistry } from './registry/InstanceRegistry.mjs';
import { PropertyRegistry3b958u9t8hoi7 as PropertyRegistry } from './registry/PropertyRegistry.mjs';
import { ExtensionManager3i0s0o6y2opyp as ExtensionManager } from './extension/ExtensionManager.mjs';
import { OptionRegistry2chmyrthzh7kv as OptionRegistry } from './registry/OptionRegistry.mjs';
import { flatten1lreua3rlf560 as flatten } from './module/Module.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  Monotonic_instance6v32gqtywf7e as Monotonic_instance,
  ValueTimeMark__elapsedNow_impl_eonqvs1dlqois04h852 as ValueTimeMark__elapsedNow_impl_eonqvs,
} from '../../../../kotlin-kotlin-stdlib/kotlin/time/TimeSource.mjs';
import { get_inMs1dfov9ilo7khc as get_inMs } from './time/DurationExt.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var KoinClass;
function Koin() {
  if (KoinClass === VOID) {
    class $ {
      constructor() {
        this.p7u_1 = new (EmptyLogger())();
        this.q7u_1 = new (CoreResolver())(this);
        this.r7u_1 = new (ScopeRegistry())(this);
        this.s7u_1 = new (InstanceRegistry())(this);
        this.t7u_1 = new (PropertyRegistry())(this);
        this.u7u_1 = new (ExtensionManager())(this);
        this.v7u_1 = new (OptionRegistry())();
      }
      w7u(modules, allowOverride, createEagerInstances) {
        var flattedModules = flatten(modules);
        this.s7u_1.a7v(flattedModules, allowOverride);
        this.r7u_1.f7v(flattedModules);
        if (createEagerInstances) {
          this.g7v();
        }
      }
      h7v(modules, allowOverride, createEagerInstances, $super) {
        allowOverride = allowOverride === VOID ? true : allowOverride;
        createEagerInstances = createEagerInstances === VOID ? false : createEagerInstances;
        var tmp;
        if ($super === VOID) {
          this.w7u(modules, allowOverride, createEagerInstances);
          tmp = Unit_instance;
        } else {
          tmp = $super.w7u.call(this, modules, allowOverride, createEagerInstances);
        }
        return tmp;
      }
      g7v() {
        this.p7u_1.j7v('Create eager instances ...');
        // Inline function 'kotlin.time.measureTime' call
        // Inline function 'kotlin.time.measureTime' call
        var mark = Monotonic_instance.ql();
        this.s7u_1.k7v();
        var duration = ValueTimeMark__elapsedNow_impl_eonqvs(mark);
        this.p7u_1.j7v('Created eager instances in ' + get_inMs(duration) + ' ms');
      }
    }
    initMetadataForClass($, 'Koin', Koin);
    KoinClass = $;
  }
  return KoinClass;
}
//region block: exports
export {
  Koin as Koin3uwug7yrv0nqu,
};
//endregion

//# sourceMappingURL=Koin.mjs.map
