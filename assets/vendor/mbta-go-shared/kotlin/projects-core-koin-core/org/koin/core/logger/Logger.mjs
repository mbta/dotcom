import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var LoggerClass;
function Logger() {
  if (LoggerClass === VOID) {
    class $ {
      constructor(level) {
        level = level === VOID ? Level_INFO_getInstance() : level;
        this.i7v_1 = level;
      }
      j7v(msg) {
        this.g7y(Level_DEBUG_getInstance(), msg);
      }
      s3n(msg) {
        this.g7y(Level_WARNING_getInstance(), msg);
      }
      p7x(msg) {
        this.g7y(Level_ERROR_getInstance(), msg);
      }
      g7y(lvl, msg) {
        // Inline function 'org.koin.core.logger.Logger.isAt' call
        if (this.i7v_1.a4(lvl) <= 0) {
          this.q7v(lvl, msg);
        }
      }
    }
    initMetadataForClass($, 'Logger');
    LoggerClass = $;
  }
  return LoggerClass;
}
var Level_DEBUG_instance;
var Level_INFO_instance;
var Level_WARNING_instance;
var Level_ERROR_instance;
var Level_NONE_instance;
var Level_entriesInitialized;
function Level_initEntries() {
  if (Level_entriesInitialized)
    return Unit_instance;
  Level_entriesInitialized = true;
  Level_DEBUG_instance = new (Level())('DEBUG', 0);
  Level_INFO_instance = new (Level())('INFO', 1);
  Level_WARNING_instance = new (Level())('WARNING', 2);
  Level_ERROR_instance = new (Level())('ERROR', 3);
  Level_NONE_instance = new (Level())('NONE', 4);
}
var LevelClass;
function Level() {
  if (LevelClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Level');
    LevelClass = $;
  }
  return LevelClass;
}
function Level_DEBUG_getInstance() {
  Level_initEntries();
  return Level_DEBUG_instance;
}
function Level_INFO_getInstance() {
  Level_initEntries();
  return Level_INFO_instance;
}
function Level_WARNING_getInstance() {
  Level_initEntries();
  return Level_WARNING_instance;
}
function Level_ERROR_getInstance() {
  Level_initEntries();
  return Level_ERROR_instance;
}
function Level_NONE_getInstance() {
  Level_initEntries();
  return Level_NONE_instance;
}
//region block: exports
export {
  Level_DEBUG_getInstance as Level_DEBUG_getInstance1r0p8wfisoptk,
  Level_INFO_getInstance as Level_INFO_getInstance37dpjl8gm1fk4,
  Level_NONE_getInstance as Level_NONE_getInstance38y99qbmrsqoo,
  Logger as Logger1eor7oe4ryao4,
};
//endregion

//# sourceMappingURL=Logger.mjs.map
