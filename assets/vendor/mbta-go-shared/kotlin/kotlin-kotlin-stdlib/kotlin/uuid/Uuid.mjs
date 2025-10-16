import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  getLongAt2xo9o2feqbs0 as getLongAt,
  uuidParseHexDash18eiuoxladbda as uuidParseHexDash,
  uuidParseHex3eqot5o6m8iet as uuidParseHex,
  secureRandomUuid33vm90zpurzrd as secureRandomUuid,
  formatBytesInto37zm00l0btni2 as formatBytesInto,
} from './UuidJs.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  toString3o7ifthqydp6e as toString_0,
} from '../Char.mjs';
import { toByte4i43936u611k as toByte } from '../js/numberConversion.mjs';
import {
  decodeToString1x4faah2liw2p as decodeToString,
  substringiqarkczpya5m as substring,
} from '../text/stringJs.mjs';
import {
  _ULong___init__impl__c78o9k1p6qzv0dh0bvg as _ULong___init__impl__c78o9k,
  _ULong___get_data__impl__fggpzb2qlkrfp9zs48z as _ULong___get_data__impl__fggpzb,
} from '../ULong.mjs';
import { ulongCompare29yg6v52hxi4l as ulongCompare } from '../UnsignedJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../Comparable.mjs';
import { joinToString26w4x2pxjux6a as joinToString } from '../collections/_Arrays.mjs';
import { charCodeAt1yspne1d8erbm as charCodeAt } from '../js/charSequenceJs.mjs';
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
        this.dm_1 = new (Uuid())(new (Long())(0, 0), new (Long())(0, 0));
        this.em_1 = 16;
        this.fm_1 = 128;
      }
      gm(mostSignificantBits, leastSignificantBits) {
        var tmp;
        if (mostSignificantBits.equals(new (Long())(0, 0)) && leastSignificantBits.equals(new (Long())(0, 0))) {
          tmp = this.dm_1;
        } else {
          tmp = new (Uuid())(mostSignificantBits, leastSignificantBits);
        }
        return tmp;
      }
      cx(byteArray) {
        // Inline function 'kotlin.require' call
        if (!(byteArray.length === 16)) {
          var message = 'Expected exactly 16 bytes, but was ' + truncateForErrorMessage(byteArray, 32) + ' of size ' + byteArray.length;
          throw IllegalArgumentException().q(toString(message));
        }
        return this.gm(getLongAt(byteArray, 0), getLongAt(byteArray, 8));
      }
      dx(uuidString) {
        var tmp;
        switch (uuidString.length) {
          case 36:
            tmp = uuidParseHexDash(uuidString);
            break;
          case 32:
            tmp = uuidParseHex(uuidString);
            break;
          default:
            throw IllegalArgumentException().q('Expected either a 36-char string in the standard hex-and-dash UUID format or a 32-char hexadecimal string, ' + ('but was "' + truncateForErrorMessage_0(uuidString, 64) + '" of length ' + uuidString.length));
        }
        return tmp;
      }
      ex() {
        return secureRandomUuid();
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
var UuidClass;
function Uuid() {
  if (UuidClass === VOID) {
    class $ {
      constructor(mostSignificantBits, leastSignificantBits) {
        Companion_getInstance();
        this.fx_1 = mostSignificantBits;
        this.gx_1 = leastSignificantBits;
      }
      toString() {
        return this.hx();
      }
      hx() {
        var bytes = new Int8Array(36);
        formatBytesInto(this.fx_1, bytes, 0, 0, 4);
        // Inline function 'kotlin.code' call
        var this_0 = _Char___init__impl__6a9atx(45);
        var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
        bytes[8] = toByte(tmp$ret$0);
        formatBytesInto(this.fx_1, bytes, 9, 4, 6);
        // Inline function 'kotlin.code' call
        var this_1 = _Char___init__impl__6a9atx(45);
        var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
        bytes[13] = toByte(tmp$ret$1);
        formatBytesInto(this.fx_1, bytes, 14, 6, 8);
        // Inline function 'kotlin.code' call
        var this_2 = _Char___init__impl__6a9atx(45);
        var tmp$ret$2 = Char__toInt_impl_vasixd(this_2);
        bytes[18] = toByte(tmp$ret$2);
        formatBytesInto(this.gx_1, bytes, 19, 0, 2);
        // Inline function 'kotlin.code' call
        var this_3 = _Char___init__impl__6a9atx(45);
        var tmp$ret$3 = Char__toInt_impl_vasixd(this_3);
        bytes[23] = toByte(tmp$ret$3);
        formatBytesInto(this.gx_1, bytes, 24, 2, 8);
        return decodeToString(bytes);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Uuid()))
          return false;
        return this.fx_1.equals(other.fx_1) && this.gx_1.equals(other.gx_1);
      }
      ix(other) {
        var tmp;
        if (!this.fx_1.equals(other.fx_1)) {
          // Inline function 'kotlin.toULong' call
          var this_0 = this.fx_1;
          var tmp0 = _ULong___init__impl__c78o9k(this_0);
          // Inline function 'kotlin.toULong' call
          var this_1 = other.fx_1;
          // Inline function 'kotlin.ULong.compareTo' call
          var other_0 = _ULong___init__impl__c78o9k(this_1);
          tmp = ulongCompare(_ULong___get_data__impl__fggpzb(tmp0), _ULong___get_data__impl__fggpzb(other_0));
        } else {
          // Inline function 'kotlin.toULong' call
          var this_2 = this.gx_1;
          var tmp0_0 = _ULong___init__impl__c78o9k(this_2);
          // Inline function 'kotlin.toULong' call
          var this_3 = other.gx_1;
          // Inline function 'kotlin.ULong.compareTo' call
          var other_1 = _ULong___init__impl__c78o9k(this_3);
          tmp = ulongCompare(_ULong___get_data__impl__fggpzb(tmp0_0), _ULong___get_data__impl__fggpzb(other_1));
        }
        return tmp;
      }
      d(other) {
        return this.ix(other instanceof Uuid() ? other : THROW_CCE());
      }
      hashCode() {
        return this.fx_1.u4(this.gx_1).hashCode();
      }
    }
    initMetadataForClass($, 'Uuid', VOID, VOID, [Comparable()]);
    UuidClass = $;
  }
  return UuidClass;
}
function truncateForErrorMessage(_this__u8e3s4, maxSize) {
  return joinToString(_this__u8e3s4, VOID, '[', ']', maxSize);
}
function truncateForErrorMessage_0(_this__u8e3s4, maxLength) {
  return _this__u8e3s4.length <= maxLength ? _this__u8e3s4 : substring(_this__u8e3s4, 0, maxLength) + '...';
}
function checkHyphenAt(_this__u8e3s4, index) {
  // Inline function 'kotlin.require' call
  if (!(charCodeAt(_this__u8e3s4, index) === _Char___init__impl__6a9atx(45))) {
    var message = "Expected '-' (hyphen) at index " + index + ", but was '" + toString_0(charCodeAt(_this__u8e3s4, index)) + "'";
    throw IllegalArgumentException().q(toString(message));
  }
}
function uuidFromRandomBytes(randomBytes) {
  randomBytes[6] = toByte(randomBytes[6] & 15);
  randomBytes[6] = toByte(randomBytes[6] | 64);
  randomBytes[8] = toByte(randomBytes[8] & 63);
  randomBytes[8] = toByte(randomBytes[8] | 128);
  return Companion_getInstance().cx(randomBytes);
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance1cdckxf15vkye,
  Uuid as Uuid1zxgztb7abqxx,
  checkHyphenAt as checkHyphenAt7pl6v3cdv93i,
  uuidFromRandomBytes as uuidFromRandomBytes2q8crvps0uzc,
};
//endregion

//# sourceMappingURL=Uuid.mjs.map
