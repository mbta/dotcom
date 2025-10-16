import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  _Parser___init__impl__gdyfby1vnq12cpoy9z1 as _Parser___init__impl__gdyfby,
  Parser__match$default_impl_x2xltijmohcu4bbet7 as Parser__match$default_impl_x2xlti,
  ParseException603g9fc07eag as ParseException,
} from '../internal/format/parser/Parser.mjs';
import { DateTimeFormatException2onfeknbywaob as DateTimeFormatException } from '../Exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AbstractDateTimeFormatClass;
function AbstractDateTimeFormat() {
  if (AbstractDateTimeFormatClass === VOID) {
    class $ {
      f82(value) {
        // Inline function 'kotlin.also' call
        var this_0 = StringBuilder().f();
        this.l82().s82().t82(this.m82(value), this_0);
        return this_0.toString();
      }
      lv(input) {
        var tmp;
        try {
          tmp = Parser__match$default_impl_x2xlti(_Parser___init__impl__gdyfby(this.l82().u82()), input, this.o82());
        } catch ($p) {
          var tmp_0;
          if ($p instanceof ParseException()) {
            var e = $p;
            throw DateTimeFormatException().p81("Failed to parse value from '" + toString(input) + "'", e);
          } else {
            throw $p;
          }
        }
        var matched = tmp;
        try {
          return this.n82(matched);
        } catch ($p) {
          if ($p instanceof IllegalArgumentException()) {
            var e_0 = $p;
            var message = e_0.message;
            throw DateTimeFormatException().p81(message == null ? "The value parsed from '" + toString(input) + "' is invalid" : '' + message + " (when parsing '" + toString(input) + "')", e_0);
          } else {
            throw $p;
          }
        }
      }
    }
    initMetadataForClass($, 'AbstractDateTimeFormat');
    AbstractDateTimeFormatClass = $;
  }
  return AbstractDateTimeFormatClass;
}
var Padding_NONE_instance;
var Padding_ZERO_instance;
var Padding_SPACE_instance;
var Padding_entriesInitialized;
function Padding_initEntries() {
  if (Padding_entriesInitialized)
    return Unit_instance;
  Padding_entriesInitialized = true;
  Padding_NONE_instance = new (Padding())('NONE', 0);
  Padding_ZERO_instance = new (Padding())('ZERO', 1);
  Padding_SPACE_instance = new (Padding())('SPACE', 2);
}
var PaddingClass;
function Padding() {
  if (PaddingClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Padding');
    PaddingClass = $;
  }
  return PaddingClass;
}
function Padding_NONE_getInstance() {
  Padding_initEntries();
  return Padding_NONE_instance;
}
function Padding_ZERO_getInstance() {
  Padding_initEntries();
  return Padding_ZERO_instance;
}
function Padding_SPACE_getInstance() {
  Padding_initEntries();
  return Padding_SPACE_instance;
}
//region block: exports
export {
  Padding_NONE_getInstance as Padding_NONE_getInstance3nt67hl4ceygz,
  Padding_SPACE_getInstance as Padding_SPACE_getInstance7fwkzb4da6c,
  Padding_ZERO_getInstance as Padding_ZERO_getInstance2hdjif6phlc74,
  AbstractDateTimeFormat as AbstractDateTimeFormat1er9ki1vjeb1b,
};
//endregion

//# sourceMappingURL=DateTimeFormat.mjs.map
