import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  setPropertiesToThrowableInstance1w2jjvl9y77yc as setPropertiesToThrowableInstance,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var PipelinePhaseClass;
function PipelinePhase() {
  if (PipelinePhaseClass === VOID) {
    class $ {
      constructor(name) {
        this.e3m_1 = name;
      }
      toString() {
        return "Phase('" + this.e3m_1 + "')";
      }
    }
    initMetadataForClass($, 'PipelinePhase');
    PipelinePhaseClass = $;
  }
  return PipelinePhaseClass;
}
var InvalidPhaseExceptionClass;
function InvalidPhaseException() {
  if (InvalidPhaseExceptionClass === VOID) {
    class $ extends Error {
      constructor(message) {
        super(message);
        setPropertiesToThrowableInstance(this, message);
        captureStack(this, this.u3m_1);
      }
    }
    initMetadataForClass($, 'InvalidPhaseException');
    InvalidPhaseExceptionClass = $;
  }
  return InvalidPhaseExceptionClass;
}
//region block: exports
export {
  InvalidPhaseException as InvalidPhaseExceptionxbo9a9gosqf3,
  PipelinePhase as PipelinePhase2q3d54imxjlma,
};
//endregion

//# sourceMappingURL=PipelinePhase.mjs.map
