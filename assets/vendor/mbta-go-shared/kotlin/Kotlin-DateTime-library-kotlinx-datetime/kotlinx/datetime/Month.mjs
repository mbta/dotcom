import { enumEntries20mr21zbe3az4 as enumEntries } from '../../../kotlin-kotlin-stdlib/kotlin/enums/EnumEntries.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_number(_this__u8e3s4) {
  return _this__u8e3s4.x3_1 + 1 | 0;
}
var Month_JANUARY_instance;
var Month_FEBRUARY_instance;
var Month_MARCH_instance;
var Month_APRIL_instance;
var Month_MAY_instance;
var Month_JUNE_instance;
var Month_JULY_instance;
var Month_AUGUST_instance;
var Month_SEPTEMBER_instance;
var Month_OCTOBER_instance;
var Month_NOVEMBER_instance;
var Month_DECEMBER_instance;
function values() {
  return [Month_JANUARY_getInstance(), Month_FEBRUARY_getInstance(), Month_MARCH_getInstance(), Month_APRIL_getInstance(), Month_MAY_getInstance(), Month_JUNE_getInstance(), Month_JULY_getInstance(), Month_AUGUST_getInstance(), Month_SEPTEMBER_getInstance(), Month_OCTOBER_getInstance(), Month_NOVEMBER_getInstance(), Month_DECEMBER_getInstance()];
}
function get_entries() {
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var Month_entriesInitialized;
function Month_initEntries() {
  if (Month_entriesInitialized)
    return Unit_instance;
  Month_entriesInitialized = true;
  Month_JANUARY_instance = new (Month())('JANUARY', 0);
  Month_FEBRUARY_instance = new (Month())('FEBRUARY', 1);
  Month_MARCH_instance = new (Month())('MARCH', 2);
  Month_APRIL_instance = new (Month())('APRIL', 3);
  Month_MAY_instance = new (Month())('MAY', 4);
  Month_JUNE_instance = new (Month())('JUNE', 5);
  Month_JULY_instance = new (Month())('JULY', 6);
  Month_AUGUST_instance = new (Month())('AUGUST', 7);
  Month_SEPTEMBER_instance = new (Month())('SEPTEMBER', 8);
  Month_OCTOBER_instance = new (Month())('OCTOBER', 9);
  Month_NOVEMBER_instance = new (Month())('NOVEMBER', 10);
  Month_DECEMBER_instance = new (Month())('DECEMBER', 11);
}
var $ENTRIES;
var MonthClass;
function Month() {
  if (MonthClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Month');
    MonthClass = $;
  }
  return MonthClass;
}
function Month_0(number) {
  // Inline function 'kotlin.require' call
  // Inline function 'kotlin.require' call
  if (!(1 <= number ? number <= 12 : false)) {
    var message = 'Failed requirement.';
    throw IllegalArgumentException().q(toString(message));
  }
  return get_entries().e1(number - 1 | 0);
}
function Month_JANUARY_getInstance() {
  Month_initEntries();
  return Month_JANUARY_instance;
}
function Month_FEBRUARY_getInstance() {
  Month_initEntries();
  return Month_FEBRUARY_instance;
}
function Month_MARCH_getInstance() {
  Month_initEntries();
  return Month_MARCH_instance;
}
function Month_APRIL_getInstance() {
  Month_initEntries();
  return Month_APRIL_instance;
}
function Month_MAY_getInstance() {
  Month_initEntries();
  return Month_MAY_instance;
}
function Month_JUNE_getInstance() {
  Month_initEntries();
  return Month_JUNE_instance;
}
function Month_JULY_getInstance() {
  Month_initEntries();
  return Month_JULY_instance;
}
function Month_AUGUST_getInstance() {
  Month_initEntries();
  return Month_AUGUST_instance;
}
function Month_SEPTEMBER_getInstance() {
  Month_initEntries();
  return Month_SEPTEMBER_instance;
}
function Month_OCTOBER_getInstance() {
  Month_initEntries();
  return Month_OCTOBER_instance;
}
function Month_NOVEMBER_getInstance() {
  Month_initEntries();
  return Month_NOVEMBER_instance;
}
function Month_DECEMBER_getInstance() {
  Month_initEntries();
  return Month_DECEMBER_instance;
}
function firstDayOfYear(_this__u8e3s4, leapYear) {
  var leap = leapYear ? 1 : 0;
  var tmp;
  switch (_this__u8e3s4.x3_1) {
    case 0:
      tmp = 1;
      break;
    case 1:
      tmp = 32;
      break;
    case 2:
      tmp = 60 + leap | 0;
      break;
    case 3:
      tmp = 91 + leap | 0;
      break;
    case 4:
      tmp = 121 + leap | 0;
      break;
    case 5:
      tmp = 152 + leap | 0;
      break;
    case 6:
      tmp = 182 + leap | 0;
      break;
    case 7:
      tmp = 213 + leap | 0;
      break;
    case 8:
      tmp = 244 + leap | 0;
      break;
    case 9:
      tmp = 274 + leap | 0;
      break;
    case 10:
      tmp = 305 + leap | 0;
      break;
    case 11:
      tmp = 335 + leap | 0;
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
}
//region block: exports
export {
  Month_0 as Monthisypd6pyawk7,
  firstDayOfYear as firstDayOfYear4msjvujw2l9c,
  get_number as get_number11nqnpf0wxtuc,
};
//endregion

//# sourceMappingURL=Month.mjs.map
