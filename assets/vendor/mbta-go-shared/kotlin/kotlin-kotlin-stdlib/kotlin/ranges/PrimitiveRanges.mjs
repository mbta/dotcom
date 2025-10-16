import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  IntProgressionfaq59u1bhfih as IntProgression,
  LongProgression4dpjnpwadpbx as LongProgression,
  CharProgression45cqq4g7w3uj as CharProgression,
} from './Progressions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { ClosedRangehokgr73im9z3 as ClosedRange } from './Range.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import { numberToLong1a4cndvg6c52s as numberToLong } from '../js/numberConversion.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char19o2r8palgjof as Char,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  toString3o7ifthqydp6e as toString,
} from '../Char.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.w1_1 = new (IntRange())(1, 0);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var IntRangeClass;
function IntRange() {
  if (IntRangeClass === VOID) {
    class $ extends IntProgression() {
      constructor(start, endInclusive) {
        Companion_getInstance();
        super(start, endInclusive, 1);
      }
      hk() {
        return this.x1_1;
      }
      ik() {
        return this.y1_1;
      }
      hs(value) {
        return this.x1_1 <= value && value <= this.y1_1;
      }
      e2(value) {
        return this.hs(typeof value === 'number' ? value : THROW_CCE());
      }
      h1() {
        return this.x1_1 > this.y1_1;
      }
      equals(other) {
        var tmp;
        if (other instanceof IntRange()) {
          tmp = this.h1() && other.h1() || (this.x1_1 === other.x1_1 && this.y1_1 === other.y1_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.h1() ? -1 : imul(31, this.x1_1) + this.y1_1 | 0;
      }
      toString() {
        return '' + this.x1_1 + '..' + this.y1_1;
      }
    }
    initMetadataForClass($, 'IntRange', VOID, VOID, [IntProgression(), ClosedRange()]);
    IntRangeClass = $;
  }
  return IntRangeClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        this.is_1 = new (LongRange())(new (Long())(1, 0), new (Long())(0, 0));
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 === VOID)
    new (Companion_0())();
  return Companion_instance_0;
}
var LongRangeClass;
function LongRange() {
  if (LongRangeClass === VOID) {
    class $ extends LongProgression() {
      constructor(start, endInclusive) {
        Companion_getInstance_0();
        super(start, endInclusive, new (Long())(1, 0));
      }
      hk() {
        return this.ms_1;
      }
      ik() {
        return this.ns_1;
      }
      ps(value) {
        return this.ms_1.d2(value) <= 0 && value.d2(this.ns_1) <= 0;
      }
      e2(value) {
        return this.ps(value instanceof Long() ? value : THROW_CCE());
      }
      h1() {
        return this.ms_1.d2(this.ns_1) > 0;
      }
      equals(other) {
        var tmp;
        if (other instanceof LongRange()) {
          tmp = this.h1() && other.h1() || (this.ms_1.equals(other.ms_1) && this.ns_1.equals(other.ns_1));
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.h1() ? -1 : numberToLong(31).h4(this.ms_1.u4(this.ms_1.r4(32))).f4(this.ns_1.u4(this.ns_1.r4(32))).f2();
      }
      toString() {
        return this.ms_1.toString() + '..' + this.ns_1.toString();
      }
    }
    initMetadataForClass($, 'LongRange', VOID, VOID, [LongProgression(), ClosedRange()]);
    LongRangeClass = $;
  }
  return LongRangeClass;
}
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {
      constructor() {
        Companion_instance_1 = this;
        this.qs_1 = new (CharRange())(_Char___init__impl__6a9atx(1), _Char___init__impl__6a9atx(0));
      }
    }
    initMetadataForCompanion($);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  if (Companion_instance_1 === VOID)
    new (Companion_1())();
  return Companion_instance_1;
}
var CharRangeClass;
function CharRange() {
  if (CharRangeClass === VOID) {
    class $ extends CharProgression() {
      constructor(start, endInclusive) {
        Companion_getInstance_1();
        super(start, endInclusive, 1);
      }
      us() {
        return this.vs_1;
      }
      hk() {
        return new (Char())(this.us());
      }
      ys() {
        return this.ws_1;
      }
      ik() {
        return new (Char())(this.ys());
      }
      zs(value) {
        return Char__compareTo_impl_ypi4mb(this.vs_1, value) <= 0 && Char__compareTo_impl_ypi4mb(value, this.ws_1) <= 0;
      }
      e2(value) {
        return this.zs(value instanceof Char() ? value.r2_1 : THROW_CCE());
      }
      h1() {
        return Char__compareTo_impl_ypi4mb(this.vs_1, this.ws_1) > 0;
      }
      equals(other) {
        var tmp;
        if (other instanceof CharRange()) {
          tmp = this.h1() && other.h1() || (this.vs_1 === other.vs_1 && this.ws_1 === other.ws_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        var tmp;
        if (this.h1()) {
          tmp = -1;
        } else {
          // Inline function 'kotlin.code' call
          var this_0 = this.vs_1;
          var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
          var tmp_0 = imul(31, tmp$ret$0);
          // Inline function 'kotlin.code' call
          var this_1 = this.ws_1;
          tmp = tmp_0 + Char__toInt_impl_vasixd(this_1) | 0;
        }
        return tmp;
      }
      toString() {
        return toString(this.vs_1) + '..' + toString(this.ws_1);
      }
    }
    initMetadataForClass($, 'CharRange', VOID, VOID, [CharProgression(), ClosedRange()]);
    CharRangeClass = $;
  }
  return CharRangeClass;
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance1a3oieudzv4l4,
  CharRange as CharRange1dt3801jgpja5,
  IntRange as IntRange1cx8zvxgibbj2,
  LongRange as LongRange138sb2ngfio7d,
};
//endregion

//# sourceMappingURL=PrimitiveRanges.mjs.map
