import { enumEntries20mr21zbe3az4 as enumEntries } from '../../../../../kotlin-kotlin-stdlib/kotlin/enums/EnumEntries.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var LogLevel_TRACE_instance;
var LogLevel_DEBUG_instance;
var LogLevel_INFO_instance;
var LogLevel_WARN_instance;
var LogLevel_ERROR_instance;
var LogLevel_NONE_instance;
function values() {
  return [LogLevel_TRACE_getInstance(), LogLevel_DEBUG_getInstance(), LogLevel_INFO_getInstance(), LogLevel_WARN_getInstance(), LogLevel_ERROR_getInstance(), LogLevel_NONE_getInstance()];
}
function get_entries() {
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var LogLevel_entriesInitialized;
function LogLevel_initEntries() {
  if (LogLevel_entriesInitialized)
    return Unit_instance;
  LogLevel_entriesInitialized = true;
  LogLevel_TRACE_instance = new (LogLevel())('TRACE', 0);
  LogLevel_DEBUG_instance = new (LogLevel())('DEBUG', 1);
  LogLevel_INFO_instance = new (LogLevel())('INFO', 2);
  LogLevel_WARN_instance = new (LogLevel())('WARN', 3);
  LogLevel_ERROR_instance = new (LogLevel())('ERROR', 4);
  LogLevel_NONE_instance = new (LogLevel())('NONE', 5);
}
var $ENTRIES;
var LogLevelClass;
function LogLevel() {
  if (LogLevelClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'LogLevel');
    LogLevelClass = $;
  }
  return LogLevelClass;
}
function get_isTraceEnabled(_this__u8e3s4) {
  return _this__u8e3s4.r3n().a4(LogLevel_TRACE_getInstance()) <= 0;
}
function LogLevel_TRACE_getInstance() {
  LogLevel_initEntries();
  return LogLevel_TRACE_instance;
}
function LogLevel_DEBUG_getInstance() {
  LogLevel_initEntries();
  return LogLevel_DEBUG_instance;
}
function LogLevel_INFO_getInstance() {
  LogLevel_initEntries();
  return LogLevel_INFO_instance;
}
function LogLevel_WARN_getInstance() {
  LogLevel_initEntries();
  return LogLevel_WARN_instance;
}
function LogLevel_ERROR_getInstance() {
  LogLevel_initEntries();
  return LogLevel_ERROR_instance;
}
function LogLevel_NONE_getInstance() {
  LogLevel_initEntries();
  return LogLevel_NONE_instance;
}
//region block: exports
export {
  LogLevel_DEBUG_getInstance as LogLevel_DEBUG_getInstance3ffzvcje6l6kj,
  LogLevel_INFO_getInstance as LogLevel_INFO_getInstance3hkfl5alteyab,
  LogLevel_TRACE_getInstance as LogLevel_TRACE_getInstanceoetpm2i6d0wa,
  LogLevel_WARN_getInstance as LogLevel_WARN_getInstance2n4u8k0gol84p,
  get_entries as get_entries3rhsgvbgx7tis,
  get_isTraceEnabled as get_isTraceEnabled82xibuu04nxp,
};
//endregion

//# sourceMappingURL=LoggerJs.mjs.map
