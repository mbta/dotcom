import { PipelinePhase2q3d54imxjlma as PipelinePhase } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelinePhase.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Pipeline2vw6c5wpzxajt as Pipeline } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/Pipeline.mjs';
import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var PhasesClass;
function Phases() {
  if (PhasesClass === VOID) {
    class $ {
      constructor() {
        Phases_instance = this;
        this.x4z_1 = new (PipelinePhase())('Before');
        this.y4z_1 = new (PipelinePhase())('State');
        this.z4z_1 = new (PipelinePhase())('After');
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
var HttpReceivePipelineClass;
function HttpReceivePipeline() {
  if (HttpReceivePipelineClass === VOID) {
    class $ extends Pipeline() {
      constructor(developmentMode) {
        Phases_getInstance();
        developmentMode = developmentMode === VOID ? true : developmentMode;
        super([Phases_getInstance().x4z_1, Phases_getInstance().y4z_1, Phases_getInstance().z4z_1]);
        this.h5r_1 = developmentMode;
      }
      m3m() {
        return this.h5r_1;
      }
    }
    initMetadataForClass($, 'HttpReceivePipeline', HttpReceivePipeline, VOID, VOID, [2]);
    HttpReceivePipelineClass = $;
  }
  return HttpReceivePipelineClass;
}
var PhasesClass_0;
function Phases_0() {
  if (PhasesClass_0 === VOID) {
    class $ {
      constructor() {
        Phases_instance_0 = this;
        this.f4r_1 = new (PipelinePhase())('Receive');
        this.g4r_1 = new (PipelinePhase())('Parse');
        this.h4r_1 = new (PipelinePhase())('Transform');
        this.i4r_1 = new (PipelinePhase())('State');
        this.j4r_1 = new (PipelinePhase())('After');
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
var HttpResponsePipelineClass;
function HttpResponsePipeline() {
  if (HttpResponsePipelineClass === VOID) {
    class $ extends Pipeline() {
      constructor(developmentMode) {
        Phases_getInstance_0();
        developmentMode = developmentMode === VOID ? true : developmentMode;
        super([Phases_getInstance_0().f4r_1, Phases_getInstance_0().g4r_1, Phases_getInstance_0().h4r_1, Phases_getInstance_0().i4r_1, Phases_getInstance_0().j4r_1]);
        this.p5r_1 = developmentMode;
      }
      m3m() {
        return this.p5r_1;
      }
    }
    initMetadataForClass($, 'HttpResponsePipeline', HttpResponsePipeline, VOID, VOID, [2]);
    HttpResponsePipelineClass = $;
  }
  return HttpResponsePipelineClass;
}
var HttpResponseContainerClass;
function HttpResponseContainer() {
  if (HttpResponseContainerClass === VOID) {
    class $ {
      constructor(expectedType, response) {
        this.l4t_1 = expectedType;
        this.m4t_1 = response;
      }
      ch() {
        return this.l4t_1;
      }
      dh() {
        return this.m4t_1;
      }
      toString() {
        return 'HttpResponseContainer(expectedType=' + this.l4t_1.toString() + ', response=' + toString(this.m4t_1) + ')';
      }
      hashCode() {
        var result = this.l4t_1.hashCode();
        result = imul(result, 31) + hashCode(this.m4t_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof HttpResponseContainer()))
          return false;
        var tmp0_other_with_cast = other instanceof HttpResponseContainer() ? other : THROW_CCE();
        if (!this.l4t_1.equals(tmp0_other_with_cast.l4t_1))
          return false;
        if (!equals(this.m4t_1, tmp0_other_with_cast.m4t_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'HttpResponseContainer');
    HttpResponseContainerClass = $;
  }
  return HttpResponseContainerClass;
}
//region block: exports
export {
  Phases_getInstance as Phases_getInstance2gb8yk5kt1qdy,
  Phases_getInstance_0 as Phases_getInstance3cv4l5wlctlnh,
  HttpReceivePipeline as HttpReceivePipeline1ousblrss634z,
  HttpResponseContainer as HttpResponseContainer3r9yzy4mwwvc9,
  HttpResponsePipeline as HttpResponsePipeline14ucx7kbf4hm2,
};
//endregion

//# sourceMappingURL=HttpResponsePipeline.mjs.map
