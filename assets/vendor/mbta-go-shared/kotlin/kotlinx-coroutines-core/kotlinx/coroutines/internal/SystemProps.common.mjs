import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { systemProp1h8dzpvpx9055 as systemProp } from './SystemProps.mjs';
import { toLongOrNullutqivezb0wx1 as toLongOrNull } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringNumberConversions.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function systemProp_0(propertyName, defaultValue, minValue, maxValue) {
  minValue = minValue === VOID ? 1 : minValue;
  maxValue = maxValue === VOID ? 2147483647 : maxValue;
  return systemProp_1(propertyName, toLong(defaultValue), toLong(minValue), toLong(maxValue)).f2();
}
function systemProp_1(propertyName, defaultValue, minValue, maxValue) {
  minValue = minValue === VOID ? new (Long())(1, 0) : minValue;
  maxValue = maxValue === VOID ? new (Long())(-1, 2147483647) : maxValue;
  var tmp0_elvis_lhs = systemProp(propertyName);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return defaultValue;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var value = tmp;
  var tmp1_elvis_lhs = toLongOrNull(value);
  var tmp_0;
  if (tmp1_elvis_lhs == null) {
    var message = "System property '" + propertyName + "' has unrecognized value '" + value + "'";
    throw IllegalStateException().o5(toString(message));
  } else {
    tmp_0 = tmp1_elvis_lhs;
  }
  var parsed = tmp_0;
  if (!(minValue.d2(parsed) <= 0 ? parsed.d2(maxValue) <= 0 : false)) {
    // Inline function 'kotlin.error' call
    var message_0 = "System property '" + propertyName + "' should be in range " + minValue.toString() + '..' + maxValue.toString() + ", but is '" + parsed.toString() + "'";
    throw IllegalStateException().o5(toString(message_0));
  }
  return parsed;
}
//region block: exports
export {
  systemProp_0 as systemProp2qpti4y1f5b4b,
};
//endregion

//# sourceMappingURL=SystemProps.common.mjs.map
