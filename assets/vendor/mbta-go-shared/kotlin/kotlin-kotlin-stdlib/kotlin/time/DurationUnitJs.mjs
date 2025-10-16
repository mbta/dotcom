import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../js/compareTo.mjs';
import { numberToLong1a4cndvg6c52s as numberToLong } from '../js/numberConversion.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DurationUnit_NANOSECONDS_instance;
var DurationUnit_MICROSECONDS_instance;
var DurationUnit_MILLISECONDS_instance;
var DurationUnit_SECONDS_instance;
var DurationUnit_MINUTES_instance;
var DurationUnit_HOURS_instance;
var DurationUnit_DAYS_instance;
var DurationUnit_entriesInitialized;
function DurationUnit_initEntries() {
  if (DurationUnit_entriesInitialized)
    return Unit_instance;
  DurationUnit_entriesInitialized = true;
  DurationUnit_NANOSECONDS_instance = new (DurationUnit())('NANOSECONDS', 0, 1.0);
  DurationUnit_MICROSECONDS_instance = new (DurationUnit())('MICROSECONDS', 1, 1000.0);
  DurationUnit_MILLISECONDS_instance = new (DurationUnit())('MILLISECONDS', 2, 1000000.0);
  DurationUnit_SECONDS_instance = new (DurationUnit())('SECONDS', 3, 1.0E9);
  DurationUnit_MINUTES_instance = new (DurationUnit())('MINUTES', 4, 6.0E10);
  DurationUnit_HOURS_instance = new (DurationUnit())('HOURS', 5, 3.6E12);
  DurationUnit_DAYS_instance = new (DurationUnit())('DAYS', 6, 8.64E13);
}
var DurationUnitClass;
function DurationUnit() {
  if (DurationUnitClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, scale) {
        super(name, ordinal);
        this.il_1 = scale;
      }
    }
    initMetadataForClass($, 'DurationUnit');
    DurationUnitClass = $;
  }
  return DurationUnitClass;
}
function convertDurationUnit(value, sourceUnit, targetUnit) {
  var sourceCompareTarget = compareTo(sourceUnit.il_1, targetUnit.il_1);
  return sourceCompareTarget > 0 ? value * (sourceUnit.il_1 / targetUnit.il_1) : sourceCompareTarget < 0 ? value / (targetUnit.il_1 / sourceUnit.il_1) : value;
}
function convertDurationUnit_0(value, sourceUnit, targetUnit) {
  var sourceCompareTarget = compareTo(sourceUnit.il_1, targetUnit.il_1);
  var tmp;
  if (sourceCompareTarget > 0) {
    var scale = numberToLong(sourceUnit.il_1 / targetUnit.il_1);
    var result = value.h4(scale);
    tmp = result.i4(scale).equals(value) ? result : value.d2(new (Long())(0, 0)) > 0 ? new (Long())(-1, 2147483647) : new (Long())(0, -2147483648);
  } else if (sourceCompareTarget < 0) {
    tmp = value.i4(numberToLong(targetUnit.il_1 / sourceUnit.il_1));
  } else {
    tmp = value;
  }
  return tmp;
}
function convertDurationUnitOverflow(value, sourceUnit, targetUnit) {
  var sourceCompareTarget = compareTo(sourceUnit.il_1, targetUnit.il_1);
  return sourceCompareTarget > 0 ? value.h4(numberToLong(sourceUnit.il_1 / targetUnit.il_1)) : sourceCompareTarget < 0 ? value.i4(numberToLong(targetUnit.il_1 / sourceUnit.il_1)) : value;
}
function DurationUnit_NANOSECONDS_getInstance() {
  DurationUnit_initEntries();
  return DurationUnit_NANOSECONDS_instance;
}
function DurationUnit_MICROSECONDS_getInstance() {
  DurationUnit_initEntries();
  return DurationUnit_MICROSECONDS_instance;
}
function DurationUnit_MILLISECONDS_getInstance() {
  DurationUnit_initEntries();
  return DurationUnit_MILLISECONDS_instance;
}
function DurationUnit_SECONDS_getInstance() {
  DurationUnit_initEntries();
  return DurationUnit_SECONDS_instance;
}
function DurationUnit_MINUTES_getInstance() {
  DurationUnit_initEntries();
  return DurationUnit_MINUTES_instance;
}
function DurationUnit_HOURS_getInstance() {
  DurationUnit_initEntries();
  return DurationUnit_HOURS_instance;
}
function DurationUnit_DAYS_getInstance() {
  DurationUnit_initEntries();
  return DurationUnit_DAYS_instance;
}
//region block: exports
export {
  DurationUnit_DAYS_getInstance as DurationUnit_DAYS_getInstance3abv9r3rbwkq3,
  DurationUnit_HOURS_getInstance as DurationUnit_HOURS_getInstancebu9fos347hpz,
  DurationUnit_MICROSECONDS_getInstance as DurationUnit_MICROSECONDS_getInstance2dy62s6vvg5md,
  DurationUnit_MILLISECONDS_getInstance as DurationUnit_MILLISECONDS_getInstance15owevua4zjxe,
  DurationUnit_MINUTES_getInstance as DurationUnit_MINUTES_getInstancejlptjvjgjkm8,
  DurationUnit_NANOSECONDS_getInstance as DurationUnit_NANOSECONDS_getInstancexzp0zqz7eqak,
  DurationUnit_SECONDS_getInstance as DurationUnit_SECONDS_getInstance3jias9ne5z4er,
  convertDurationUnitOverflow as convertDurationUnitOverflow13zjt78f02ii6,
  convertDurationUnit_0 as convertDurationUnit1gi5cqpfj6qf3,
  convertDurationUnit as convertDurationUnit2jq3wf7d49p64,
};
//endregion

//# sourceMappingURL=DurationUnitJs.mjs.map
