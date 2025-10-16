import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import {
  getProgressionLastElement2w30kdy2w5nkt as getProgressionLastElement,
  getProgressionLastElement4s9ggap3esy2 as getProgressionLastElement_0,
} from '../internal/progressionUtil.mjs';
import {
  IntProgressionIterator2ovd1ctrmu51n as IntProgressionIterator,
  LongProgressionIterator2e3slqmdh4zt7 as LongProgressionIterator,
  CharProgressionIterator34nq4ujuknl08 as CharProgressionIterator,
} from './ProgressionIterators.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import {
  numberToLong1a4cndvg6c52s as numberToLong,
  numberToChar93r9buh19yek as numberToChar,
} from '../js/numberConversion.mjs';
import {
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
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
      a2(rangeStart, rangeEnd, step) {
        return new (IntProgression())(rangeStart, rangeEnd, step);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var IntProgressionClass;
function IntProgression() {
  if (IntProgressionClass === VOID) {
    class $ {
      constructor(start, endInclusive, step) {
        if (step === 0)
          throw IllegalArgumentException().q('Step must be non-zero.');
        if (step === -2147483648)
          throw IllegalArgumentException().q('Step must be greater than Int.MIN_VALUE to avoid overflow on negation.');
        this.x1_1 = start;
        this.y1_1 = getProgressionLastElement(start, endInclusive, step);
        this.z1_1 = step;
      }
      x() {
        return new (IntProgressionIterator())(this.x1_1, this.y1_1, this.z1_1);
      }
      h1() {
        return this.z1_1 > 0 ? this.x1_1 > this.y1_1 : this.x1_1 < this.y1_1;
      }
      equals(other) {
        var tmp;
        if (other instanceof IntProgression()) {
          tmp = this.h1() && other.h1() || (this.x1_1 === other.x1_1 && this.y1_1 === other.y1_1 && this.z1_1 === other.z1_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.h1() ? -1 : imul(31, imul(31, this.x1_1) + this.y1_1 | 0) + this.z1_1 | 0;
      }
      toString() {
        return this.z1_1 > 0 ? '' + this.x1_1 + '..' + this.y1_1 + ' step ' + this.z1_1 : '' + this.x1_1 + ' downTo ' + this.y1_1 + ' step ' + (-this.z1_1 | 0);
      }
    }
    initMetadataForClass($, 'IntProgression');
    IntProgressionClass = $;
  }
  return IntProgressionClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  return Companion_instance_0;
}
var LongProgressionClass;
function LongProgression() {
  if (LongProgressionClass === VOID) {
    class $ {
      constructor(start, endInclusive, step) {
        if (step.equals(new (Long())(0, 0)))
          throw IllegalArgumentException().q('Step must be non-zero.');
        if (step.equals(new (Long())(0, -2147483648)))
          throw IllegalArgumentException().q('Step must be greater than Long.MIN_VALUE to avoid overflow on negation.');
        this.ms_1 = start;
        this.ns_1 = getProgressionLastElement_0(start, endInclusive, step);
        this.os_1 = step;
      }
      x() {
        return new (LongProgressionIterator())(this.ms_1, this.ns_1, this.os_1);
      }
      h1() {
        return this.os_1.d2(new (Long())(0, 0)) > 0 ? this.ms_1.d2(this.ns_1) > 0 : this.ms_1.d2(this.ns_1) < 0;
      }
      equals(other) {
        var tmp;
        if (other instanceof LongProgression()) {
          tmp = this.h1() && other.h1() || (this.ms_1.equals(other.ms_1) && this.ns_1.equals(other.ns_1) && this.os_1.equals(other.os_1));
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.h1() ? -1 : numberToLong(31).h4(numberToLong(31).h4(this.ms_1.u4(this.ms_1.r4(32))).f4(this.ns_1.u4(this.ns_1.r4(32)))).f4(this.os_1.u4(this.os_1.r4(32))).f2();
      }
      toString() {
        return this.os_1.d2(new (Long())(0, 0)) > 0 ? this.ms_1.toString() + '..' + this.ns_1.toString() + ' step ' + this.os_1.toString() : this.ms_1.toString() + ' downTo ' + this.ns_1.toString() + ' step ' + this.os_1.m4().toString();
      }
    }
    initMetadataForClass($, 'LongProgression');
    LongProgressionClass = $;
  }
  return LongProgressionClass;
}
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  return Companion_instance_1;
}
var CharProgressionClass;
function CharProgression() {
  if (CharProgressionClass === VOID) {
    class $ {
      constructor(start, endInclusive, step) {
        if (step === 0)
          throw IllegalArgumentException().q('Step must be non-zero.');
        if (step === -2147483648)
          throw IllegalArgumentException().q('Step must be greater than Int.MIN_VALUE to avoid overflow on negation.');
        this.vs_1 = start;
        var tmp = this;
        // Inline function 'kotlin.code' call
        var tmp_0 = Char__toInt_impl_vasixd(start);
        // Inline function 'kotlin.code' call
        var tmp$ret$1 = Char__toInt_impl_vasixd(endInclusive);
        tmp.ws_1 = numberToChar(getProgressionLastElement(tmp_0, tmp$ret$1, step));
        this.xs_1 = step;
      }
      x() {
        return new (CharProgressionIterator())(this.vs_1, this.ws_1, this.xs_1);
      }
      h1() {
        return this.xs_1 > 0 ? Char__compareTo_impl_ypi4mb(this.vs_1, this.ws_1) > 0 : Char__compareTo_impl_ypi4mb(this.vs_1, this.ws_1) < 0;
      }
      equals(other) {
        var tmp;
        if (other instanceof CharProgression()) {
          tmp = this.h1() && other.h1() || (this.vs_1 === other.vs_1 && this.ws_1 === other.ws_1 && this.xs_1 === other.xs_1);
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
          var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
          tmp = imul(31, tmp_0 + tmp$ret$1 | 0) + this.xs_1 | 0;
        }
        return tmp;
      }
      toString() {
        return this.xs_1 > 0 ? toString(this.vs_1) + '..' + toString(this.ws_1) + ' step ' + this.xs_1 : toString(this.vs_1) + ' downTo ' + toString(this.ws_1) + ' step ' + (-this.xs_1 | 0);
      }
    }
    initMetadataForClass($, 'CharProgression');
    CharProgressionClass = $;
  }
  return CharProgressionClass;
}
//region block: init
Companion_instance = new (Companion())();
Companion_instance_0 = new (Companion_0())();
Companion_instance_1 = new (Companion_1())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instance2r6wsk1n1bbyk,
  CharProgression as CharProgression45cqq4g7w3uj,
  IntProgression as IntProgressionfaq59u1bhfih,
  LongProgression as LongProgression4dpjnpwadpbx,
};
//endregion

//# sourceMappingURL=Progressions.mjs.map
