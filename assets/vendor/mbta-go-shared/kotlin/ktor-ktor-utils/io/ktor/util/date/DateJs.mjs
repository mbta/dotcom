import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { isNaNymqb93xtq8w8 as isNaN_0 } from '../../../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
import {
  Companion_instance1w106xnn8n2n as Companion_instance,
  Companion_instance3tpkpcdhaapy6 as Companion_instance_0,
  GMTDate2jy5n6whlljcu as GMTDate,
} from './Date.mjs';
import { numberToLong1a4cndvg6c52s as numberToLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function GMTDate_0(timestamp) {
  timestamp = timestamp === VOID ? null : timestamp;
  var tmp1_safe_receiver = timestamp == null ? null : timestamp.y4();
  var tmp;
  if (tmp1_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = new Date(tmp1_safe_receiver);
  }
  var tmp2_elvis_lhs = tmp;
  var date = tmp2_elvis_lhs == null ? new Date() : tmp2_elvis_lhs;
  if (isNaN_0(date.getTime()))
    throw InvalidTimestampException().m3n(ensureNotNull(timestamp));
  // Inline function 'kotlin.with' call
  var dayOfWeek = Companion_instance.l3k((date.getUTCDay() + 6 | 0) % 7 | 0);
  var month = Companion_instance_0.l3k(date.getUTCMonth());
  return new (GMTDate())(date.getUTCSeconds(), date.getUTCMinutes(), date.getUTCHours(), dayOfWeek, date.getUTCDate(), date.getUTCFullYear(), month, date.getUTCFullYear(), numberToLong(date.getTime()));
}
var InvalidTimestampExceptionClass;
function InvalidTimestampException() {
  if (InvalidTimestampExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static m3n(timestamp) {
        var $this = this.o5('Invalid date timestamp exception: ' + timestamp.toString());
        captureStack($this, $this.l3n_1);
        return $this;
      }
    }
    initMetadataForClass($, 'InvalidTimestampException');
    InvalidTimestampExceptionClass = $;
  }
  return InvalidTimestampExceptionClass;
}
function getTimeMillis() {
  return numberToLong((new Date()).getTime());
}
//region block: exports
export {
  GMTDate_0 as GMTDate36bhedawynxlf,
  getTimeMillis as getTimeMillis12o7k17x9fmwi,
};
//endregion

//# sourceMappingURL=DateJs.mjs.map
