import {
  toCharArray32huqyw9tt7kx as toCharArray,
  decodeToString1x4faah2liw2p as decodeToString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  copyOfRange3alro60z4hhf8 as copyOfRange,
  contentEquals1cdp6c846cfdi as contentEquals,
  contentHashCode25jw6rgkgywwr as contentHashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { IndexOutOfBoundsException1qfr429iumro0 as IndexOutOfBoundsException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  _UByte___init__impl__g9hnc43ude1dscg1q30 as _UByte___init__impl__g9hnc4,
  _UByte___get_data__impl__jof9qr2p2xx2i2jvnz8 as _UByte___get_data__impl__jof9qr,
} from '../../../../kotlin-kotlin-stdlib/kotlin/UByte.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
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
        this.a2z_1 = ByteString().e2z(new Int8Array(0), null);
        this.b2z_1 = toCharArray('0123456789abcdef');
      }
      f2z(byteArray) {
        return ByteString().e2z(byteArray, null);
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
var ByteStringClass;
function ByteString() {
  if (ByteStringClass === VOID) {
    class $ {
      static e2z(data, dummy) {
        Companion_getInstance();
        var $this = createThis(this);
        $this.c2z_1 = data;
        $this.d2z_1 = 0;
        return $this;
      }
      static g2z(data, startIndex, endIndex) {
        Companion_getInstance();
        startIndex = startIndex === VOID ? 0 : startIndex;
        endIndex = endIndex === VOID ? data.length : endIndex;
        return this.e2z(copyOfRange(data, startIndex, endIndex), null);
      }
      c1() {
        return this.c2z_1.length;
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof ByteString()))
          THROW_CCE();
        if (!(other.c2z_1.length === this.c2z_1.length))
          return false;
        if (!(other.d2z_1 === 0) && !(this.d2z_1 === 0) && !(other.d2z_1 === this.d2z_1))
          return false;
        return contentEquals(this.c2z_1, other.c2z_1);
      }
      hashCode() {
        var hc = this.d2z_1;
        if (hc === 0) {
          hc = contentHashCode(this.c2z_1);
          this.d2z_1 = hc;
        }
        return hc;
      }
      e1(index) {
        if (index < 0 || index >= this.c1())
          throw IndexOutOfBoundsException().jg('index (' + index + ') is out of byte string bounds: [0..' + this.c1() + ')');
        return this.c2z_1[index];
      }
      b1x(startIndex, endIndex) {
        var tmp;
        if (startIndex === endIndex) {
          tmp = Companion_getInstance().a2z_1;
        } else {
          tmp = ByteString().g2z(this.c2z_1, startIndex, endIndex);
        }
        return tmp;
      }
      h2z(startIndex, endIndex, $super) {
        endIndex = endIndex === VOID ? this.c1() : endIndex;
        return $super === VOID ? this.b1x(startIndex, endIndex) : $super.b1x.call(this, startIndex, endIndex);
      }
      i2z(other) {
        if (other === this)
          return 0;
        var localData = this.c2z_1;
        var otherData = other.c2z_1;
        var inductionVariable = 0;
        var tmp0 = this.c1();
        // Inline function 'kotlin.math.min' call
        var b = other.c1();
        var last = Math.min(tmp0, b);
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            // Inline function 'kotlin.toUByte' call
            var this_0 = localData[i];
            var tmp0_0 = _UByte___init__impl__g9hnc4(this_0);
            // Inline function 'kotlin.toUByte' call
            var this_1 = otherData[i];
            // Inline function 'kotlin.UByte.compareTo' call
            var other_0 = _UByte___init__impl__g9hnc4(this_1);
            // Inline function 'kotlin.UByte.toInt' call
            var tmp = _UByte___get_data__impl__jof9qr(tmp0_0) & 255;
            // Inline function 'kotlin.UByte.toInt' call
            var tmp$ret$4 = _UByte___get_data__impl__jof9qr(other_0) & 255;
            var cmp = compareTo(tmp, tmp$ret$4);
            if (!(cmp === 0))
              return cmp;
          }
           while (inductionVariable < last);
        return compareTo(this.c1(), other.c1());
      }
      d(other) {
        return this.i2z(other instanceof ByteString() ? other : THROW_CCE());
      }
      toString() {
        if (isEmpty(this)) {
          return 'ByteString(size=0)';
        }
        var sizeStr = this.c1().toString();
        var len = (22 + sizeStr.length | 0) + imul(this.c1(), 2) | 0;
        // Inline function 'kotlin.with' call
        var $this$with = StringBuilder().kc(len);
        $this$with.hc('ByteString(size=');
        $this$with.hc(sizeStr);
        $this$with.hc(' hex=');
        var localData = this.c2z_1;
        var inductionVariable = 0;
        var last = this.c1();
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var b = localData[i];
            $this$with.ic(Companion_getInstance().b2z_1[(b >>> 4 | 0) & 15]);
            $this$with.ic(Companion_getInstance().b2z_1[b & 15]);
          }
           while (inductionVariable < last);
        return $this$with.ic(_Char___init__impl__6a9atx(41)).toString();
      }
      j2z() {
        return this.c2z_1;
      }
    }
    initMetadataForClass($, 'ByteString', VOID, VOID, [Comparable()]);
    ByteStringClass = $;
  }
  return ByteStringClass;
}
function ByteString_0(bytes) {
  var tmp;
  // Inline function 'kotlin.collections.isEmpty' call
  if (bytes.length === 0) {
    tmp = Companion_getInstance().a2z_1;
  } else {
    tmp = Companion_getInstance().f2z(bytes);
  }
  return tmp;
}
function isEmpty(_this__u8e3s4) {
  return _this__u8e3s4.c1() === 0;
}
function decodeToString_0(_this__u8e3s4) {
  return decodeToString(_this__u8e3s4.j2z());
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance3rtk7ceinoalp,
  ByteString_0 as ByteString3c9fk8lsh3lvs,
  ByteString as ByteString10sanmoo66key,
  decodeToString_0 as decodeToString2ede220pr5xir,
};
//endregion

//# sourceMappingURL=ByteString.mjs.map
