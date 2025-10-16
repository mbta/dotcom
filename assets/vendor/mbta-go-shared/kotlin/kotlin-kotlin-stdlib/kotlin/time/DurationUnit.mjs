import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import {
  toString3o7ifthqydp6e as toString,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
} from '../Char.mjs';
import {
  DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance,
  DurationUnit_MINUTES_getInstancejlptjvjgjkm8 as DurationUnit_MINUTES_getInstance,
  DurationUnit_HOURS_getInstancebu9fos347hpz as DurationUnit_HOURS_getInstance,
  DurationUnit_DAYS_getInstance3abv9r3rbwkq3 as DurationUnit_DAYS_getInstance,
  DurationUnit_NANOSECONDS_getInstancexzp0zqz7eqak as DurationUnit_NANOSECONDS_getInstance,
  DurationUnit_MICROSECONDS_getInstance2dy62s6vvg5md as DurationUnit_MICROSECONDS_getInstance,
  DurationUnit_MILLISECONDS_getInstance15owevua4zjxe as DurationUnit_MILLISECONDS_getInstance,
} from './DurationUnitJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function durationUnitByIsoChar(isoChar, isTimeComponent) {
  var tmp;
  if (!isTimeComponent) {
    var tmp_0;
    if (isoChar === _Char___init__impl__6a9atx(68)) {
      tmp_0 = DurationUnit_DAYS_getInstance();
    } else {
      throw IllegalArgumentException().q('Invalid or unsupported duration ISO non-time unit: ' + toString(isoChar));
    }
    tmp = tmp_0;
  } else {
    var tmp_1;
    if (isoChar === _Char___init__impl__6a9atx(72)) {
      tmp_1 = DurationUnit_HOURS_getInstance();
    } else if (isoChar === _Char___init__impl__6a9atx(77)) {
      tmp_1 = DurationUnit_MINUTES_getInstance();
    } else if (isoChar === _Char___init__impl__6a9atx(83)) {
      tmp_1 = DurationUnit_SECONDS_getInstance();
    } else {
      throw IllegalArgumentException().q('Invalid duration ISO time unit: ' + toString(isoChar));
    }
    tmp = tmp_1;
  }
  return tmp;
}
function durationUnitByShortName(shortName) {
  var tmp;
  switch (shortName) {
    case 'ns':
      tmp = DurationUnit_NANOSECONDS_getInstance();
      break;
    case 'us':
      tmp = DurationUnit_MICROSECONDS_getInstance();
      break;
    case 'ms':
      tmp = DurationUnit_MILLISECONDS_getInstance();
      break;
    case 's':
      tmp = DurationUnit_SECONDS_getInstance();
      break;
    case 'm':
      tmp = DurationUnit_MINUTES_getInstance();
      break;
    case 'h':
      tmp = DurationUnit_HOURS_getInstance();
      break;
    case 'd':
      tmp = DurationUnit_DAYS_getInstance();
      break;
    default:
      throw IllegalArgumentException().q('Unknown duration unit short name: ' + shortName);
  }
  return tmp;
}
//region block: exports
export {
  durationUnitByIsoChar as durationUnitByIsoChar3j6su2a5lms6u,
  durationUnitByShortName as durationUnitByShortNameca994ehgzbk,
};
//endregion

//# sourceMappingURL=DurationUnit.mjs.map
