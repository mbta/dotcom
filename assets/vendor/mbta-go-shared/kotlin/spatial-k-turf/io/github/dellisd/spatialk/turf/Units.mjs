import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { DoubleCompanionObject_instance3q51gr7gsd0au as DoubleCompanionObject_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/internal/primitiveCompanionObjects.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var Units_Meters_instance;
var Units_Millimeters_instance;
var Units_Centimeters_instance;
var Units_Kilometers_instance;
var Units_Acres_instance;
var Units_Miles_instance;
var Units_NauticalMiles_instance;
var Units_Inches_instance;
var Units_Yards_instance;
var Units_Feet_instance;
var Units_Radians_instance;
var Units_Degrees_instance;
var Units_entriesInitialized;
function Units_initEntries() {
  if (Units_entriesInitialized)
    return Unit_instance;
  Units_entriesInitialized = true;
  Units_Meters_instance = new (Units())('Meters', 0, 1.0, 6371008.8, 1.0);
  Units_Millimeters_instance = new (Units())('Millimeters', 1, 1000.0, 6371008.8 * 1000, 1000000.0);
  Units_Centimeters_instance = new (Units())('Centimeters', 2, 100.0, 6371008.8 * 100, 10000.0);
  Units_Kilometers_instance = new (Units())('Kilometers', 3, 1 / 1000.0, 6371008.8 / 1000, 1.0E-6);
  Units_Acres_instance = new (Units())('Acres', 4, NaN, NaN, 2.47105E-4);
  Units_Miles_instance = new (Units())('Miles', 5, 1 / 1609.344, 6371008.8 / 1609.344, 3.86E-7);
  var tmp = 1 / 1852.0;
  var tmp_0 = 6371008.8 / 1852.0;
  Units_NauticalMiles_instance = new (Units())('NauticalMiles', 6, tmp, tmp_0, NaN);
  Units_Inches_instance = new (Units())('Inches', 7, 39.37, 6371008.8 * 39.37, 1550.003100006);
  Units_Yards_instance = new (Units())('Yards', 8, 1 / 1.0936, 6371008.8 / 1.0936, 1.195990046);
  Units_Feet_instance = new (Units())('Feet', 9, 3.28084, 6371008.8 * 3.28084, 10.763910417);
  var tmp_1 = 1 / 6371008.8;
  Units_Radians_instance = new (Units())('Radians', 10, tmp_1, 1.0, NaN);
  var tmp_2 = 1 / 111325.0;
  var tmp_3 = 6371008.8 / 111325;
  Units_Degrees_instance = new (Units())('Degrees', 11, tmp_2, tmp_3, NaN);
}
var UnitsClass;
function Units() {
  if (UnitsClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, unitFactor, factor, areaFactor) {
        super(name, ordinal);
        this.s1z_1 = unitFactor;
        this.t1z_1 = factor;
        this.u1z_1 = areaFactor;
      }
    }
    initMetadataForClass($, 'Units');
    UnitsClass = $;
  }
  return UnitsClass;
}
function Units_Kilometers_getInstance() {
  Units_initEntries();
  return Units_Kilometers_instance;
}
//region block: exports
export {
  Units_Kilometers_getInstance as Units_Kilometers_getInstanceopimp13n1mfv,
};
//endregion

//# sourceMappingURL=Units.mjs.map
