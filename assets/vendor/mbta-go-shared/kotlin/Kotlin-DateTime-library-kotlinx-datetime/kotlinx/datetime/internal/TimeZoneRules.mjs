import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Companion_getInstance1jfygh5e58evr as Companion_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/time/Instant.mjs';
import { toLocalDateTime1cof646mhw5l9 as toLocalDateTime } from '../TimeZone.mjs';
import {
  lastOrNull1aq5oz189qoe1 as lastOrNull,
  last1vo29oleiqj36 as last,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { binarySearch1nmlzx9onl5pm as binarySearch } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { abs1kdzbjes1idip as abs } from '../../../../kotlin-kotlin-stdlib/kotlin/math/math.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Comparator2b3maoeh98xtg as Comparator } from '../../../../kotlin-kotlin-stdlib/kotlin/ComparatorJs.mjs';
import { compareValues1n2ayl87ihzfk as compareValues } from '../../../../kotlin-kotlin-stdlib/kotlin/comparisons/Comparisons.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var TimeZoneRulesCommonClass;
function TimeZoneRulesCommon() {
  if (TimeZoneRulesCommonClass === VOID) {
    class $ {
      constructor(transitionEpochSeconds, offsets, recurringZoneRules) {
        this.p8i_1 = transitionEpochSeconds;
        this.q8i_1 = offsets;
        this.r8i_1 = recurringZoneRules;
        // Inline function 'kotlin.require' call
        if (!(this.q8i_1.c1() === (this.p8i_1.c1() + 1 | 0))) {
          var message = 'offsets.size must be one more than transitionEpochSeconds.size';
          throw IllegalArgumentException().q(toString(message));
        }
        var tmp = this;
        // Inline function 'kotlin.collections.buildList' call
        // Inline function 'kotlin.collections.buildListInternal' call
        // Inline function 'kotlin.apply' call
        var this_0 = ArrayList().g1();
        var inductionVariable = 0;
        var last = this.p8i_1.c1() - 1 | 0;
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var instant = Companion_getInstance().kv(this.p8i_1.e1(i));
            var ldtBefore = toLocalDateTime(instant, this.q8i_1.e1(i));
            var ldtAfter = toLocalDateTime(instant, this.q8i_1.e1(i + 1 | 0));
            if (ldtBefore.z8h(ldtAfter) < 0) {
              this_0.i(ldtBefore);
              this_0.i(ldtAfter);
            } else {
              this_0.i(ldtAfter);
              this_0.i(ldtBefore);
            }
          }
           while (inductionVariable <= last);
        tmp.s8i_1 = this_0.k5();
      }
      o8i(instant) {
        var epochSeconds = instant.jl_1;
        var tmp;
        if (!(this.r8i_1 == null)) {
          var tmp0_safe_receiver = lastOrNull(this.p8i_1);
          var tmp_0;
          if (tmp0_safe_receiver == null) {
            tmp_0 = null;
          } else {
            // Inline function 'kotlin.let' call
            tmp_0 = epochSeconds.d2(tmp0_safe_receiver) >= 0;
          }
          tmp = !(tmp_0 === false);
        } else {
          tmp = false;
        }
        if (tmp) {
          return this.r8i_1.u8i(instant, last(this.q8i_1));
        }
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.math.absoluteValue' call
        var this_0 = binarySearch(this.p8i_1, epochSeconds) + 1 | 0;
        var index = abs(this_0);
        return this.q8i_1.e1(index);
      }
      toString() {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        var inductionVariable = 0;
        var last_0 = this.p8i_1.c1() - 1 | 0;
        if (inductionVariable <= last_0)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            this_0.gc(this.q8i_1.e1(i));
            this_0.hc(' until ');
            this_0.gc(Companion_getInstance().kv(this.p8i_1.e1(i)));
            this_0.hc(', ');
          }
           while (inductionVariable <= last_0);
        this_0.hc('then ');
        this_0.gc(last(this.q8i_1));
        if (!(this.r8i_1 == null)) {
          this_0.hc(', after that ');
          this_0.gc(this.r8i_1);
        }
        return this_0.toString();
      }
    }
    initMetadataForClass($, 'TimeZoneRulesCommon');
    TimeZoneRulesCommonClass = $;
  }
  return TimeZoneRulesCommonClass;
}
var RuleClass;
function Rule() {
  if (RuleClass === VOID) {
    class $ {
      constructor(transitionDateTime, offsetBefore, offsetAfter) {
        this.v8i_1 = transitionDateTime;
        this.w8i_1 = offsetBefore;
        this.x8i_1 = offsetAfter;
      }
      toString() {
        return 'transitioning from ' + this.w8i_1.toString() + ' to ' + this.x8i_1.toString() + ' on ' + toString_0(this.v8i_1);
      }
    }
    initMetadataForClass($, 'Rule');
    RuleClass = $;
  }
  return RuleClass;
}
var sam$kotlin_Comparator$0Class;
function sam$kotlin_Comparator$0() {
  if (sam$kotlin_Comparator$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.y8i_1 = function_0;
      }
      al(a, b) {
        return this.y8i_1(a, b);
      }
      compare(a, b) {
        return this.al(a, b);
      }
      z4() {
        return this.y8i_1;
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, Comparator()) : false) {
          var tmp_0;
          if (!(other == null) ? isInterface(other, FunctionAdapter()) : false) {
            tmp_0 = equals(this.z4(), other.z4());
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.z4());
      }
    }
    initMetadataForClass($, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator(), FunctionAdapter()]);
    sam$kotlin_Comparator$0Class = $;
  }
  return sam$kotlin_Comparator$0Class;
}
function RecurringZoneRules$rulesForYear$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = a.v8i_1;
  var tmp$ret$1 = b.v8i_1;
  return compareValues(tmp, tmp$ret$1);
}
//region block: exports
export {
  TimeZoneRulesCommon as TimeZoneRulesCommon3vpcb22l6ddoq,
};
//endregion

//# sourceMappingURL=TimeZoneRules.mjs.map
