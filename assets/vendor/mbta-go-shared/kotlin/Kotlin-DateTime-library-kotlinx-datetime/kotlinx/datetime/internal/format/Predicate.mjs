import { singleo93pzdgfc557 as single } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Collection1k04j3hzsbod0 as Collection } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function conjunctionPredicate(predicates) {
  return predicates.h1() ? Truth_instance : predicates.c1() === 1 ? single(predicates) : new (ConjunctionPredicate())(predicates);
}
var ComparisonPredicateClass;
function ComparisonPredicate() {
  if (ComparisonPredicateClass === VOID) {
    class $ {
      constructor(expectedValue, getter) {
        this.u8c_1 = expectedValue;
        this.v8c_1 = getter;
      }
      q8c(value) {
        return equals(this.v8c_1(value), this.u8c_1);
      }
    }
    initMetadataForClass($, 'ComparisonPredicate');
    ComparisonPredicateClass = $;
  }
  return ComparisonPredicateClass;
}
var TruthClass;
function Truth() {
  if (TruthClass === VOID) {
    class $ {
      r8c(value) {
        return true;
      }
      q8c(value) {
        return this.r8c((value == null ? true : !(value == null)) ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'Truth');
    TruthClass = $;
  }
  return TruthClass;
}
var Truth_instance;
function Truth_getInstance() {
  return Truth_instance;
}
var ConjunctionPredicateClass;
function ConjunctionPredicate() {
  if (ConjunctionPredicateClass === VOID) {
    class $ {
      constructor(predicates) {
        this.w8c_1 = predicates;
      }
      q8c(value) {
        var tmp0 = this.w8c_1;
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.all' call
          var tmp;
          if (isInterface(tmp0, Collection())) {
            tmp = tmp0.h1();
          } else {
            tmp = false;
          }
          if (tmp) {
            tmp$ret$0 = true;
            break $l$block_0;
          }
          var _iterator__ex2g4s = tmp0.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (!element.q8c(value)) {
              tmp$ret$0 = false;
              break $l$block_0;
            }
          }
          tmp$ret$0 = true;
        }
        return tmp$ret$0;
      }
    }
    initMetadataForClass($, 'ConjunctionPredicate');
    ConjunctionPredicateClass = $;
  }
  return ConjunctionPredicateClass;
}
//region block: init
Truth_instance = new (Truth())();
//endregion
//region block: exports
export {
  Truth_instance as Truth_instanceh2d1wku1pkam,
  ComparisonPredicate as ComparisonPredicate21wq2zjdls3fu,
  Truth as Truth1p2zb9jq6ku60,
  conjunctionPredicate as conjunctionPredicate3qd2h4fxtw47e,
};
//endregion

//# sourceMappingURL=Predicate.mjs.map
