import { ZoneRulesProvider as ZoneRulesProvider } from '@js-joda/core';
import { toList383f556t1dixk as toList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Arrays.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function readTzdb() {
  var tmp;
  try {
    // Inline function 'kotlin.js.asDynamic' call
    var tzdbData = ZoneRulesProvider.getTzdbData();
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp$ret$1 = tzdbData.zones;
    var tmp_0 = toList(tmp$ret$1);
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp$ret$2 = tzdbData.links;
    tmp = to(tmp_0, toList(tmp$ret$2));
  } catch ($p) {
    var tmp_1;
    if ($p instanceof Error) {
      var _unused_var__etf5q3 = $p;
      tmp_1 = null;
    } else {
      throw $p;
    }
    tmp = tmp_1;
  }
  return tmp;
}
//region block: exports
export {
  readTzdb as readTzdb1lgmqixljcgmm,
};
//endregion

//# sourceMappingURL=PlatformSpecifics.mjs.map
