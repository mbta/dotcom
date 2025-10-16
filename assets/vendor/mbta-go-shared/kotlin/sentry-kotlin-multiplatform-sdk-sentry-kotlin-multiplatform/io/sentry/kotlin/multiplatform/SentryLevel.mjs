import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var SentryLevel_DEBUG_instance;
var SentryLevel_INFO_instance;
var SentryLevel_WARNING_instance;
var SentryLevel_ERROR_instance;
var SentryLevel_FATAL_instance;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var SentryLevel_entriesInitialized;
function SentryLevel_initEntries() {
  if (SentryLevel_entriesInitialized)
    return Unit_instance;
  SentryLevel_entriesInitialized = true;
  SentryLevel_DEBUG_instance = new (SentryLevel())('DEBUG', 0, 1);
  SentryLevel_INFO_instance = new (SentryLevel())('INFO', 1, 2);
  SentryLevel_WARNING_instance = new (SentryLevel())('WARNING', 2, 3);
  SentryLevel_ERROR_instance = new (SentryLevel())('ERROR', 3, 4);
  SentryLevel_FATAL_instance = new (SentryLevel())('FATAL', 4, 5);
}
var SentryLevelClass;
function SentryLevel() {
  if (SentryLevelClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, value) {
        super(name, ordinal);
        this.b20_1 = value;
      }
    }
    initMetadataForClass($, 'SentryLevel');
    SentryLevelClass = $;
  }
  return SentryLevelClass;
}
function SentryLevel_ERROR_getInstance() {
  SentryLevel_initEntries();
  return SentryLevel_ERROR_instance;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  SentryLevel_ERROR_getInstance as SentryLevel_ERROR_getInstance2s9xyvvgzd46v,
};
//endregion

//# sourceMappingURL=SentryLevel.mjs.map
