import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { SupervisorJobythnfxkr3jxc as SupervisorJob } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Supervisor.mjs';
import { AbstractCoroutineContextElement2rpehg0hv5szw as AbstractCoroutineContextElement } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import { Key_instance2ye2t23iqghop as Key_instance } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineExceptionHandler.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Element2gr7ezmxqaln7 as Element } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContext.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function SilentSupervisor(parent) {
  parent = parent === VOID ? null : parent;
  var tmp = SupervisorJob(parent);
  // Inline function 'kotlinx.coroutines.CoroutineExceptionHandler' call
  var tmp$ret$0 = new (SilentSupervisor$$inlined$CoroutineExceptionHandler$1())();
  return tmp.ir(tmp$ret$0);
}
var SilentSupervisor$$inlined$CoroutineExceptionHandler$1Class;
function SilentSupervisor$$inlined$CoroutineExceptionHandler$1() {
  if (SilentSupervisor$$inlined$CoroutineExceptionHandler$1Class === VOID) {
    class $ extends AbstractCoroutineContextElement() {
      constructor() {
        super(Key_instance);
      }
      r28(context, exception) {
        return Unit_instance;
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, [AbstractCoroutineContextElement(), Element()]);
    SilentSupervisor$$inlined$CoroutineExceptionHandler$1Class = $;
  }
  return SilentSupervisor$$inlined$CoroutineExceptionHandler$1Class;
}
//region block: exports
export {
  SilentSupervisor as SilentSupervisorlzoikirj0zeo,
};
//endregion

//# sourceMappingURL=CoroutinesUtils.mjs.map
