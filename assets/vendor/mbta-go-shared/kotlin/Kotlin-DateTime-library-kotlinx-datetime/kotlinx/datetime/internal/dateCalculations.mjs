import { toLongw1zpgk99d84b as toLong } from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function monthLength(_this__u8e3s4, isLeapYear) {
  switch (_this__u8e3s4) {
    case 2:
      return isLeapYear ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}
function isLeapYear(year) {
  var prolepticYear = toLong(year);
  var tmp;
  if (prolepticYear.s4(new (Long())(3, 0)).equals(new (Long())(0, 0))) {
    var tmp_0;
    // Inline function 'kotlin.Long.rem' call
    if (!prolepticYear.j4(toLong(100)).equals(new (Long())(0, 0))) {
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.Long.rem' call
      tmp_0 = prolepticYear.j4(toLong(400)).equals(new (Long())(0, 0));
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
}
//region block: exports
export {
  isLeapYear as isLeapYear2i238jn7muq0f,
  monthLength as monthLength2df23yfyn71oo,
};
//endregion

//# sourceMappingURL=dateCalculations.mjs.map
