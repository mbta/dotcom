import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { Number22v9c06q24q04 as Number_0 } from './Number.mjs';
import {
  compare1p22psg95pnkt as compare,
  add1ag9d5rduoe1p as add,
  subtract2dwiyiwdklkak as subtract,
  multiplyu2p6213vusl9 as multiply,
  divide1smpc6oipvf34 as divide,
  modulo2uruyme9p46vz as modulo,
  shiftLeft2en3n538ytvkw as shiftLeft,
  shiftRight2c43jpuf4lxhd as shiftRight,
  shiftRightUnsigned347w2v3p2g4jw as shiftRightUnsigned,
  toNumberdwsnlqisayrj as toNumber,
  toStringImpl1saq6ihtubqhu as toStringImpl,
  equalsLong4ruvw2jsxykg as equalsLong,
  hashCode5nymb6xpcxx4 as hashCode,
} from './longJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
import { LongRange138sb2ngfio7d as LongRange } from './ranges/PrimitiveRanges.mjs';
import {
  toByte4i43936u611k as toByte,
  toShort36kaw0zjdq3ex as toShort,
} from './js/numberConversion.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from './Comparable.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.b4_1 = new (Long())(0, -2147483648);
        this.c4_1 = new (Long())(-1, 2147483647);
        this.d4_1 = 8;
        this.e4_1 = 64;
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
var LongClass;
function Long() {
  if (LongClass === VOID) {
    class $ extends Number_0() {
      constructor(low, high) {
        Companion_getInstance();
        super();
        this.b2_1 = low;
        this.c2_1 = high;
      }
      d2(other) {
        return compare(this, other);
      }
      d(other) {
        return this.d2(other instanceof Long() ? other : THROW_CCE());
      }
      f4(other) {
        return add(this, other);
      }
      g4(other) {
        return subtract(this, other);
      }
      h4(other) {
        return multiply(this, other);
      }
      i4(other) {
        return divide(this, other);
      }
      j4(other) {
        return modulo(this, other);
      }
      k4() {
        return this.f4(new (Long())(1, 0));
      }
      l4() {
        return this.g4(new (Long())(1, 0));
      }
      m4() {
        return this.n4().f4(new (Long())(1, 0));
      }
      o4(other) {
        return new (LongRange())(this, other);
      }
      p4(bitCount) {
        return shiftLeft(this, bitCount);
      }
      q4(bitCount) {
        return shiftRight(this, bitCount);
      }
      r4(bitCount) {
        return shiftRightUnsigned(this, bitCount);
      }
      s4(other) {
        return new (Long())(this.b2_1 & other.b2_1, this.c2_1 & other.c2_1);
      }
      t4(other) {
        return new (Long())(this.b2_1 | other.b2_1, this.c2_1 | other.c2_1);
      }
      u4(other) {
        return new (Long())(this.b2_1 ^ other.b2_1, this.c2_1 ^ other.c2_1);
      }
      n4() {
        return new (Long())(~this.b2_1, ~this.c2_1);
      }
      v4() {
        return toByte(this.b2_1);
      }
      w4() {
        return toShort(this.b2_1);
      }
      f2() {
        return this.b2_1;
      }
      x4() {
        return this;
      }
      y4() {
        return toNumber(this);
      }
      toString() {
        return toStringImpl(this, 10);
      }
      equals(other) {
        var tmp;
        if (other instanceof Long()) {
          tmp = equalsLong(this, other);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this);
      }
      valueOf() {
        return this.y4();
      }
    }
    initMetadataForClass($, 'Long', VOID, VOID, [Number_0(), Comparable()]);
    LongClass = $;
  }
  return LongClass;
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance3gn12jgnf4xoo,
  Long as Long2qws0ah9gnpki,
};
//endregion

//# sourceMappingURL=Primitives.mjs.map
