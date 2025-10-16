import { PipelinePhase2q3d54imxjlma as PipelinePhase } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelinePhase.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Pipeline2vw6c5wpzxajt as Pipeline } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/Pipeline.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var PhasesClass;
function Phases() {
  if (PhasesClass === VOID) {
    class $ {
      constructor() {
        Phases_instance = this;
        this.c4z_1 = new (PipelinePhase())('Before');
        this.d4z_1 = new (PipelinePhase())('State');
        this.e4z_1 = new (PipelinePhase())('Transform');
        this.f4z_1 = new (PipelinePhase())('Render');
        this.g4z_1 = new (PipelinePhase())('Send');
      }
    }
    initMetadataForObject($, 'Phases');
    PhasesClass = $;
  }
  return PhasesClass;
}
var Phases_instance;
function Phases_getInstance() {
  if (Phases_instance === VOID)
    new (Phases())();
  return Phases_instance;
}
var HttpRequestPipelineClass;
function HttpRequestPipeline() {
  if (HttpRequestPipelineClass === VOID) {
    class $ extends Pipeline() {
      constructor(developmentMode) {
        Phases_getInstance();
        developmentMode = developmentMode === VOID ? true : developmentMode;
        super([Phases_getInstance().c4z_1, Phases_getInstance().d4z_1, Phases_getInstance().e4z_1, Phases_getInstance().f4z_1, Phases_getInstance().g4z_1]);
        this.v5p_1 = developmentMode;
      }
      m3m() {
        return this.v5p_1;
      }
    }
    initMetadataForClass($, 'HttpRequestPipeline', HttpRequestPipeline, VOID, VOID, [2]);
    HttpRequestPipelineClass = $;
  }
  return HttpRequestPipelineClass;
}
var PhasesClass_0;
function Phases_0() {
  if (PhasesClass_0 === VOID) {
    class $ {
      constructor() {
        Phases_instance_0 = this;
        this.p4q_1 = new (PipelinePhase())('Before');
        this.q4q_1 = new (PipelinePhase())('State');
        this.r4q_1 = new (PipelinePhase())('Monitoring');
        this.s4q_1 = new (PipelinePhase())('Engine');
        this.t4q_1 = new (PipelinePhase())('Receive');
      }
    }
    initMetadataForObject($, 'Phases');
    PhasesClass_0 = $;
  }
  return PhasesClass_0;
}
var Phases_instance_0;
function Phases_getInstance_0() {
  if (Phases_instance_0 === VOID)
    new (Phases_0())();
  return Phases_instance_0;
}
var HttpSendPipelineClass;
function HttpSendPipeline() {
  if (HttpSendPipelineClass === VOID) {
    class $ extends Pipeline() {
      constructor(developmentMode) {
        Phases_getInstance_0();
        developmentMode = developmentMode === VOID ? true : developmentMode;
        super([Phases_getInstance_0().p4q_1, Phases_getInstance_0().q4q_1, Phases_getInstance_0().r4q_1, Phases_getInstance_0().s4q_1, Phases_getInstance_0().t4q_1]);
        this.d5q_1 = developmentMode;
      }
      m3m() {
        return this.d5q_1;
      }
    }
    initMetadataForClass($, 'HttpSendPipeline', HttpSendPipeline, VOID, VOID, [2]);
    HttpSendPipelineClass = $;
  }
  return HttpSendPipelineClass;
}
//region block: exports
export {
  Phases_getInstance as Phases_getInstance3gwf7ca9zp4r6,
  Phases_getInstance_0 as Phases_getInstance18vqybk3y2ism,
  HttpRequestPipeline as HttpRequestPipeline1v7xct5dgezuy,
  HttpSendPipeline as HttpSendPipeline3tm1hram7cjxt,
};
//endregion

//# sourceMappingURL=HttpRequestPipeline.mjs.map
