import { Companion_getInstance1cdckxf15vkye as Companion_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/uuid/Uuid.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  toString1pkumu07cwy4m as toString_0,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { Some1vxe3j1x21foa as Some } from './UpcomingFormat.mjs';
import { TileData39ttynq0l9fw1 as TileData } from './stopDetailsPage/TileData.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { singleOrNullrknfaxokm1sl as singleOrNull } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_LeafFormat_Single$stable;
var com_mbta_tid_mbta_app_model_LeafFormat_Branched_BranchRow$stable;
var com_mbta_tid_mbta_app_model_LeafFormat_Branched$stable;
var com_mbta_tid_mbta_app_model_LeafFormat_BranchedBuilder$stable;
var com_mbta_tid_mbta_app_model_LeafFormat$stable;
function LeafFormat$Branched$BranchRow$id$delegate$lambda(this$0) {
  return function () {
    return this$0.d92_1 + '-' + Companion_getInstance().ex().toString();
  };
}
var BranchRowClass;
function BranchRow() {
  if (BranchRowClass === VOID) {
    class $ {
      constructor(route, headsign, format) {
        this.c92_1 = route;
        this.d92_1 = headsign;
        this.e92_1 = format;
        var tmp = this;
        tmp.f92_1 = lazy(LeafFormat$Branched$BranchRow$id$delegate$lambda(this));
      }
      toString() {
        return 'BranchRow(route=' + toString(this.c92_1) + ', headsign=' + this.d92_1 + ', format=' + toString_0(this.e92_1) + ')';
      }
      hashCode() {
        var result = this.c92_1 == null ? 0 : this.c92_1.hashCode();
        result = imul(result, 31) + getStringHashCode(this.d92_1) | 0;
        result = imul(result, 31) + hashCode(this.e92_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof BranchRow()))
          return false;
        var tmp0_other_with_cast = other instanceof BranchRow() ? other : THROW_CCE();
        if (!equals(this.c92_1, tmp0_other_with_cast.c92_1))
          return false;
        if (!(this.d92_1 === tmp0_other_with_cast.d92_1))
          return false;
        if (!equals(this.e92_1, tmp0_other_with_cast.e92_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'BranchRow');
    BranchRowClass = $;
  }
  return BranchRowClass;
}
var SingleClass;
function Single() {
  if (SingleClass === VOID) {
    class $ extends LeafFormat() {
      constructor(route, headsign, format) {
        super();
        this.g92_1 = route;
        this.h92_1 = headsign;
        this.i92_1 = format;
      }
      j92(directionDestination) {
        var tmp;
        var tmp_0 = this.i92_1;
        if (tmp_0 instanceof Some()) {
          // Inline function 'kotlin.collections.map' call
          var this_0 = this.i92_1.k92_1;
          // Inline function 'kotlin.collections.mapTo' call
          var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
          var _iterator__ex2g4s = this_0.x();
          while (_iterator__ex2g4s.y()) {
            var item = _iterator__ex2g4s.z();
            // Inline function 'kotlin.takeUnless' call
            var this_1 = this.h92_1;
            var tmp_1;
            if (!(this_1 == directionDestination)) {
              tmp_1 = this_1;
            } else {
              tmp_1 = null;
            }
            var tmp$ret$1 = tmp_1;
            var tmp$ret$2 = new (TileData())(this.g92_1, tmp$ret$1, Some().m92(item, this.i92_1.l92_1), item.n92_1);
            destination.i(tmp$ret$2);
          }
          tmp = destination;
        } else {
          tmp = emptyList();
        }
        return tmp;
      }
      toString() {
        return 'Single(route=' + toString(this.g92_1) + ', headsign=' + this.h92_1 + ', format=' + toString_0(this.i92_1) + ')';
      }
      hashCode() {
        var result = this.g92_1 == null ? 0 : this.g92_1.hashCode();
        result = imul(result, 31) + (this.h92_1 == null ? 0 : getStringHashCode(this.h92_1)) | 0;
        result = imul(result, 31) + hashCode(this.i92_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Single()))
          return false;
        var tmp0_other_with_cast = other instanceof Single() ? other : THROW_CCE();
        if (!equals(this.g92_1, tmp0_other_with_cast.g92_1))
          return false;
        if (!(this.h92_1 == tmp0_other_with_cast.h92_1))
          return false;
        if (!equals(this.i92_1, tmp0_other_with_cast.i92_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Single');
    SingleClass = $;
  }
  return SingleClass;
}
var BranchedClass;
function Branched() {
  if (BranchedClass === VOID) {
    class $ extends LeafFormat() {
      constructor(branchRows, secondaryAlert) {
        secondaryAlert = secondaryAlert === VOID ? null : secondaryAlert;
        super();
        this.q92_1 = branchRows;
        this.r92_1 = secondaryAlert;
      }
      j92(directionDestination) {
        // Inline function 'kotlin.collections.mapNotNull' call
        var tmp0 = this.q92_1;
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp$ret$0;
          $l$block: {
            var tmp;
            var tmp_0 = element.e92_1;
            if (tmp_0 instanceof Some()) {
              var tmp0_elvis_lhs = singleOrNull(element.e92_1.k92_1);
              var tmp_1;
              if (tmp0_elvis_lhs == null) {
                tmp$ret$0 = null;
                break $l$block;
              } else {
                tmp_1 = tmp0_elvis_lhs;
              }
              var trip = tmp_1;
              tmp = new (TileData())(element.c92_1, element.d92_1, Some().m92(trip, element.e92_1.l92_1), trip.n92_1);
            } else {
              tmp = null;
            }
            tmp$ret$0 = tmp;
          }
          var tmp0_safe_receiver = tmp$ret$0;
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination.i(tmp0_safe_receiver);
          }
        }
        return destination;
      }
      toString() {
        return 'Branched(branchRows=' + toString_0(this.q92_1) + ', secondaryAlert=' + toString(this.r92_1) + ')';
      }
      hashCode() {
        var result = hashCode(this.q92_1);
        result = imul(result, 31) + (this.r92_1 == null ? 0 : this.r92_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Branched()))
          return false;
        var tmp0_other_with_cast = other instanceof Branched() ? other : THROW_CCE();
        if (!equals(this.q92_1, tmp0_other_with_cast.q92_1))
          return false;
        if (!equals(this.r92_1, tmp0_other_with_cast.r92_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Branched');
    BranchedClass = $;
  }
  return BranchedClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  return Companion_instance;
}
var LeafFormatClass;
function LeafFormat() {
  if (LeafFormatClass === VOID) {
    class $ {}
    initMetadataForClass($, 'LeafFormat');
    LeafFormatClass = $;
  }
  return LeafFormatClass;
}
//region block: init
com_mbta_tid_mbta_app_model_LeafFormat_Single$stable = 8;
com_mbta_tid_mbta_app_model_LeafFormat_Branched_BranchRow$stable = 8;
com_mbta_tid_mbta_app_model_LeafFormat_Branched$stable = 8;
com_mbta_tid_mbta_app_model_LeafFormat_BranchedBuilder$stable = 8;
com_mbta_tid_mbta_app_model_LeafFormat$stable = 0;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  BranchRow as BranchRow1mm74bvnxbsaf,
  Branched as Branched1ipw2yg7vafq5,
  Single as Singleb6svork69pg4,
};
//endregion

//# sourceMappingURL=LeafFormat.mjs.map
