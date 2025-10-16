import { enumEntries20mr21zbe3az4 as enumEntries } from '../../../kotlin-kotlin-stdlib/kotlin/enums/EnumEntries.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_isoDayNumber(_this__u8e3s4) {
  return _this__u8e3s4.x3_1 + 1 | 0;
}
var DayOfWeek_MONDAY_instance;
var DayOfWeek_TUESDAY_instance;
var DayOfWeek_WEDNESDAY_instance;
var DayOfWeek_THURSDAY_instance;
var DayOfWeek_FRIDAY_instance;
var DayOfWeek_SATURDAY_instance;
var DayOfWeek_SUNDAY_instance;
function values() {
  return [DayOfWeek_MONDAY_getInstance(), DayOfWeek_TUESDAY_getInstance(), DayOfWeek_WEDNESDAY_getInstance(), DayOfWeek_THURSDAY_getInstance(), DayOfWeek_FRIDAY_getInstance(), DayOfWeek_SATURDAY_getInstance(), DayOfWeek_SUNDAY_getInstance()];
}
function get_entries() {
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var DayOfWeek_entriesInitialized;
function DayOfWeek_initEntries() {
  if (DayOfWeek_entriesInitialized)
    return Unit_instance;
  DayOfWeek_entriesInitialized = true;
  DayOfWeek_MONDAY_instance = new (DayOfWeek())('MONDAY', 0);
  DayOfWeek_TUESDAY_instance = new (DayOfWeek())('TUESDAY', 1);
  DayOfWeek_WEDNESDAY_instance = new (DayOfWeek())('WEDNESDAY', 2);
  DayOfWeek_THURSDAY_instance = new (DayOfWeek())('THURSDAY', 3);
  DayOfWeek_FRIDAY_instance = new (DayOfWeek())('FRIDAY', 4);
  DayOfWeek_SATURDAY_instance = new (DayOfWeek())('SATURDAY', 5);
  DayOfWeek_SUNDAY_instance = new (DayOfWeek())('SUNDAY', 6);
}
var $ENTRIES;
var DayOfWeekClass;
function DayOfWeek() {
  if (DayOfWeekClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'DayOfWeek');
    DayOfWeekClass = $;
  }
  return DayOfWeekClass;
}
function DayOfWeek_0(isoDayNumber) {
  // Inline function 'kotlin.require' call
  if (!(1 <= isoDayNumber ? isoDayNumber <= 7 : false)) {
    var message = 'Expected ISO day-of-week number in 1..7, got ' + isoDayNumber;
    throw IllegalArgumentException().q(toString(message));
  }
  return get_entries().e1(isoDayNumber - 1 | 0);
}
function DayOfWeek_MONDAY_getInstance() {
  DayOfWeek_initEntries();
  return DayOfWeek_MONDAY_instance;
}
function DayOfWeek_TUESDAY_getInstance() {
  DayOfWeek_initEntries();
  return DayOfWeek_TUESDAY_instance;
}
function DayOfWeek_WEDNESDAY_getInstance() {
  DayOfWeek_initEntries();
  return DayOfWeek_WEDNESDAY_instance;
}
function DayOfWeek_THURSDAY_getInstance() {
  DayOfWeek_initEntries();
  return DayOfWeek_THURSDAY_instance;
}
function DayOfWeek_FRIDAY_getInstance() {
  DayOfWeek_initEntries();
  return DayOfWeek_FRIDAY_instance;
}
function DayOfWeek_SATURDAY_getInstance() {
  DayOfWeek_initEntries();
  return DayOfWeek_SATURDAY_instance;
}
function DayOfWeek_SUNDAY_getInstance() {
  DayOfWeek_initEntries();
  return DayOfWeek_SUNDAY_instance;
}
//region block: exports
export {
  DayOfWeek_0 as DayOfWeek2xlo40o03f5e,
  get_isoDayNumber as get_isoDayNumberrycq4er3aoh9,
};
//endregion

//# sourceMappingURL=DayOfWeek.mjs.map
