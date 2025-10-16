import { Units_Kilometers_getInstanceopimp13n1mfv as Units_Kilometers_getInstance } from './Units.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { isNaNymqb93xtq8w8 as isNaN_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function radiansToLength(radians, units) {
  units = units === VOID ? Units_Kilometers_getInstance() : units;
  // Inline function 'kotlin.require' call
  if (!!isNaN_0(units.t1z_1)) {
    var message = units.w3_1 + ' units is invalid';
    throw IllegalArgumentException().q(toString(message));
  }
  return radians * units.t1z_1;
}
function lengthToRadians(distance, units) {
  units = units === VOID ? Units_Kilometers_getInstance() : units;
  // Inline function 'kotlin.require' call
  if (!!isNaN_0(units.t1z_1)) {
    var message = units.w3_1 + ' units is invalid';
    throw IllegalArgumentException().q(toString(message));
  }
  return distance / units.t1z_1;
}
//region block: exports
export {
  lengthToRadians as lengthToRadians1gaf3mu0h4dis,
  radiansToLength as radiansToLength3t1sw7ankofds,
};
//endregion

//# sourceMappingURL=Utils.mjs.map
