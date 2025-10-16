import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
} from '../js/coreRuntime.mjs';
import {
  IndexOutOfBoundsException1qfr429iumro0 as IndexOutOfBoundsException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../exceptions.mjs';
import {
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charSequenceLength3278n89t01tmv as charSequenceLength,
} from '../js/charSequenceJs.mjs';
import {
  substringiqarkczpya5m as substring,
  substring3saq8ornu0luv as substring_0,
} from './stringJs.mjs';
import {
  toString3o7ifthqydp6e as toString_0,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
} from '../Char.mjs';
import { toString30pk9tzaqopn as toString_1 } from '../Library.mjs';
import { Companion_instanceovl8he3jiijf as Companion_instance } from '../collections/AbstractList.mjs';
import { CharSequence1ceii1xorfwh7 as CharSequence } from '../CharSequence.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var StringBuilderClass;
function StringBuilder() {
  if (StringBuilderClass === VOID) {
    class $ {
      static aj(content) {
        var $this = createThis(this);
        $this.e_1 = content;
        return $this;
      }
      static kc(capacity) {
        return this.f();
      }
      static f() {
        return this.aj('');
      }
      a() {
        // Inline function 'kotlin.js.asDynamic' call
        return this.e_1.length;
      }
      b(index) {
        // Inline function 'kotlin.text.getOrElse' call
        var this_0 = this.e_1;
        var tmp;
        if (0 <= index ? index <= (charSequenceLength(this_0) - 1 | 0) : false) {
          tmp = charSequenceGet(this_0, index);
        } else {
          throw IndexOutOfBoundsException().jg('index: ' + index + ', length: ' + this.a() + '}');
        }
        return tmp;
      }
      c(startIndex, endIndex) {
        return substring(this.e_1, startIndex, endIndex);
      }
      ic(value) {
        this.e_1 = this.e_1 + toString_0(value);
        return this;
      }
      v(value) {
        this.e_1 = this.e_1 + toString_1(value);
        return this;
      }
      bj(value, startIndex, endIndex) {
        return this.cj(value == null ? 'null' : value, startIndex, endIndex);
      }
      gc(value) {
        this.e_1 = this.e_1 + toString_1(value);
        return this;
      }
      dj(value) {
        this.e_1 = this.e_1 + value;
        return this;
      }
      ej(value) {
        return this.hc(value.toString());
      }
      fj(value) {
        return this.hc(value.toString());
      }
      gj(value) {
        return this.hc(value.toString());
      }
      hj(value) {
        return this.hc(value.toString());
      }
      hc(value) {
        var tmp = this;
        var tmp_0 = this.e_1;
        tmp.e_1 = tmp_0 + (value == null ? 'null' : value);
        return this;
      }
      ij(index, value) {
        Companion_instance.i7(index, this.a());
        this.e_1 = substring(this.e_1, 0, index) + toString_0(value) + substring_0(this.e_1, index);
        return this;
      }
      jj(newLength) {
        if (newLength < 0) {
          throw IllegalArgumentException().q('Negative new length: ' + newLength + '.');
        }
        if (newLength <= this.a()) {
          this.e_1 = substring(this.e_1, 0, newLength);
        } else {
          var inductionVariable = this.a();
          if (inductionVariable < newLength)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              this.e_1 = this.e_1 + toString_0(_Char___init__impl__6a9atx(0));
            }
             while (inductionVariable < newLength);
        }
      }
      toString() {
        return this.e_1;
      }
      kj() {
        this.e_1 = '';
        return this;
      }
      lj(index) {
        Companion_instance.t7(index, this.a());
        this.e_1 = substring(this.e_1, 0, index) + substring_0(this.e_1, index + 1 | 0);
        return this;
      }
      cj(value, startIndex, endIndex) {
        var stringCsq = toString(value);
        Companion_instance.mj(startIndex, endIndex, stringCsq.length);
        this.e_1 = this.e_1 + substring(stringCsq, startIndex, endIndex);
        return this;
      }
    }
    initMetadataForClass($, 'StringBuilder', $.f, VOID, [CharSequence()]);
    StringBuilderClass = $;
  }
  return StringBuilderClass;
}
//region block: exports
export {
  StringBuilder as StringBuildermazzzhj6kkai,
};
//endregion

//# sourceMappingURL=StringBuilderJs.mjs.map
