import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AfterClass;
function After() {
  if (AfterClass === VOID) {
    class $ extends PipelinePhaseRelation() {
      constructor(relativeTo) {
        super();
        this.q3m_1 = relativeTo;
      }
    }
    initMetadataForClass($, 'After');
    AfterClass = $;
  }
  return AfterClass;
}
var BeforeClass;
function Before() {
  if (BeforeClass === VOID) {
    class $ extends PipelinePhaseRelation() {
      constructor(relativeTo) {
        super();
        this.v3m_1 = relativeTo;
      }
    }
    initMetadataForClass($, 'Before');
    BeforeClass = $;
  }
  return BeforeClass;
}
var LastClass;
function Last() {
  if (LastClass === VOID) {
    class $ extends PipelinePhaseRelation() {
      constructor() {
        Last_instance = null;
        super();
        Last_instance = this;
      }
      toString() {
        return 'Last';
      }
      hashCode() {
        return 967869129;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Last()))
          return false;
        other instanceof Last() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Last');
    LastClass = $;
  }
  return LastClass;
}
var Last_instance;
function Last_getInstance() {
  if (Last_instance === VOID)
    new (Last())();
  return Last_instance;
}
var PipelinePhaseRelationClass;
function PipelinePhaseRelation() {
  if (PipelinePhaseRelationClass === VOID) {
    class $ {}
    initMetadataForClass($, 'PipelinePhaseRelation');
    PipelinePhaseRelationClass = $;
  }
  return PipelinePhaseRelationClass;
}
//region block: exports
export {
  Last_getInstance as Last_getInstance1ndvgpf0ogell,
  After as After9djz11pmyzvq,
  Before as Beforeyqm571m7tesc,
};
//endregion

//# sourceMappingURL=PipelinePhaseRelation.mjs.map
