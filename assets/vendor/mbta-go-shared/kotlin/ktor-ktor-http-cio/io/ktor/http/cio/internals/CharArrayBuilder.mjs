import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  IndexOutOfBoundsException1qfr429iumro0 as IndexOutOfBoundsException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { isCharSequence1ju9jr1w86plq as isCharSequence } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { CharSequence1ceii1xorfwh7 as CharSequence } from '../../../../../../kotlin-kotlin-stdlib/kotlin/CharSequence.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { get_CharArrayPool2nrc6vmvck4s9 as get_CharArrayPool } from './CharArrayPool.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function getImpl($this, index) {
  return bufferForIndex($this, index)[index % ensureNotNull($this.d44_1).length | 0];
}
function copy($this, startIndex, endIndex) {
  if (startIndex === endIndex)
    return '';
  var builder = StringBuilder().kc(endIndex - startIndex | 0);
  var buffer;
  var base = startIndex - (startIndex % 2048 | 0) | 0;
  while (base < endIndex) {
    buffer = bufferForIndex($this, base);
    // Inline function 'kotlin.comparisons.maxOf' call
    var b = startIndex - base | 0;
    var innerStartIndex = Math.max(0, b);
    // Inline function 'kotlin.comparisons.minOf' call
    var a = endIndex - base | 0;
    var innerEndIndex = Math.min(a, 2048);
    var inductionVariable = innerStartIndex;
    if (inductionVariable < innerEndIndex)
      do {
        var innerIndex = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        builder.ic(buffer[innerIndex]);
      }
       while (inductionVariable < innerEndIndex);
    base = base + 2048 | 0;
  }
  return builder;
}
var SubSequenceImplClass;
function SubSequenceImpl() {
  if (SubSequenceImplClass === VOID) {
    class $ {
      constructor($outer, start, end) {
        this.h49_1 = $outer;
        this.e49_1 = start;
        this.f49_1 = end;
        this.g49_1 = null;
      }
      a() {
        return this.f49_1 - this.e49_1 | 0;
      }
      b(index) {
        var withOffset = index + this.e49_1 | 0;
        // Inline function 'kotlin.require' call
        if (!(index >= 0)) {
          var message = 'index is negative: ' + index;
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(withOffset < this.f49_1)) {
          var message_0 = 'index (' + index + ') should be less than length (' + this.a() + ')';
          throw IllegalArgumentException().q(toString(message_0));
        }
        return getImpl(this.h49_1, withOffset);
      }
      c(startIndex, endIndex) {
        // Inline function 'kotlin.require' call
        if (!(startIndex >= 0)) {
          var message = 'start is negative: ' + startIndex;
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(startIndex <= endIndex)) {
          var message_0 = 'start (' + startIndex + ') should be less or equal to end (' + endIndex + ')';
          throw IllegalArgumentException().q(toString(message_0));
        }
        // Inline function 'kotlin.require' call
        if (!(endIndex <= (this.f49_1 - this.e49_1 | 0))) {
          var message_1 = 'end should be less than length (' + this.a() + ')';
          throw IllegalArgumentException().q(toString(message_1));
        }
        if (startIndex === endIndex)
          return '';
        return new (SubSequenceImpl())(this.h49_1, this.e49_1 + startIndex | 0, this.e49_1 + endIndex | 0);
      }
      toString() {
        var tmp0_elvis_lhs = this.g49_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = toString(copy(this.h49_1, this.e49_1, this.f49_1));
          this.g49_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
      equals(other) {
        if (!(!(other == null) ? isCharSequence(other) : false))
          return false;
        if (!(charSequenceLength(other) === this.a()))
          return false;
        return rangeEqualsImpl(this.h49_1, this.e49_1, other, 0, this.a());
      }
      hashCode() {
        var tmp0_safe_receiver = this.g49_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
        return tmp1_elvis_lhs == null ? hashCodeImpl(this.h49_1, this.e49_1, this.f49_1) : tmp1_elvis_lhs;
      }
    }
    initMetadataForClass($, 'SubSequenceImpl', VOID, VOID, [CharSequence()]);
    SubSequenceImplClass = $;
  }
  return SubSequenceImplClass;
}
function bufferForIndex($this, index) {
  var list = $this.c44_1;
  if (list == null) {
    if (index >= 2048) {
      throwSingleBuffer($this, index);
    }
    var tmp0_elvis_lhs = $this.d44_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSingleBuffer($this, index);
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  return list.e1(index / ensureNotNull($this.d44_1).length | 0);
}
function throwSingleBuffer($this, index) {
  if ($this.f44_1)
    throw IllegalStateException().o5('Buffer is already released');
  throw IndexOutOfBoundsException().jg('' + index + ' is not in range [0; ' + currentPosition($this) + ')');
}
function nonFullBuffer($this) {
  return $this.g44_1 === 0 ? appendNewArray($this) : ensureNotNull($this.d44_1);
}
function appendNewArray($this) {
  var newBuffer = $this.b44_1.p3g();
  var existing = $this.d44_1;
  $this.d44_1 = newBuffer;
  $this.g44_1 = newBuffer.length;
  $this.f44_1 = false;
  if (!(existing == null)) {
    var tmp0_elvis_lhs = $this.c44_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = ArrayList().g1();
      $this.c44_1 = this_0;
      this_0.i(existing);
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var list = tmp;
    list.i(newBuffer);
  }
  return newBuffer;
}
function rangeEqualsImpl($this, start, other, otherStart, length) {
  var inductionVariable = 0;
  if (inductionVariable < length)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!(getImpl($this, start + i | 0) === charSequenceGet(other, otherStart + i | 0)))
        return false;
    }
     while (inductionVariable < length);
  return true;
}
function hashCodeImpl($this, start, end) {
  var hc = 0;
  var inductionVariable = start;
  if (inductionVariable < end)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var tmp = imul(31, hc);
      // Inline function 'kotlin.code' call
      var this_0 = getImpl($this, i);
      hc = tmp + Char__toInt_impl_vasixd(this_0) | 0;
    }
     while (inductionVariable < end);
  return hc;
}
function currentPosition($this) {
  return ensureNotNull($this.d44_1).length - $this.g44_1 | 0;
}
var CharArrayBuilderClass;
function CharArrayBuilder() {
  if (CharArrayBuilderClass === VOID) {
    class $ {
      constructor(pool) {
        pool = pool === VOID ? get_CharArrayPool() : pool;
        this.b44_1 = pool;
        this.c44_1 = null;
        this.d44_1 = null;
        this.e44_1 = null;
        this.f44_1 = false;
        this.g44_1 = 0;
        this.h44_1 = 0;
      }
      a() {
        return this.h44_1;
      }
      b(index) {
        // Inline function 'kotlin.require' call
        if (!(index >= 0)) {
          var message = 'index is negative: ' + index;
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(index < this.h44_1)) {
          var message_0 = 'index ' + index + ' is not in range [0, ' + this.h44_1 + ')';
          throw IllegalArgumentException().q(toString(message_0));
        }
        return getImpl(this, index);
      }
      c(startIndex, endIndex) {
        // Inline function 'kotlin.require' call
        if (!(startIndex <= endIndex)) {
          var message = 'startIndex (' + startIndex + ') should be less or equal to endIndex (' + endIndex + ')';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(startIndex >= 0)) {
          var message_0 = 'startIndex is negative: ' + startIndex;
          throw IllegalArgumentException().q(toString(message_0));
        }
        // Inline function 'kotlin.require' call
        if (!(endIndex <= this.h44_1)) {
          var message_1 = 'endIndex (' + endIndex + ') is greater than length (' + this.h44_1 + ')';
          throw IllegalArgumentException().q(toString(message_1));
        }
        return new (SubSequenceImpl())(this, startIndex, endIndex);
      }
      toString() {
        var tmp0_elvis_lhs = this.e44_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = toString(copy(this, 0, this.h44_1));
          this.e44_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
      equals(other) {
        if (!(!(other == null) ? isCharSequence(other) : false))
          return false;
        if (!(this.h44_1 === charSequenceLength(other)))
          return false;
        return rangeEqualsImpl(this, 0, other, 0, this.h44_1);
      }
      hashCode() {
        var tmp0_safe_receiver = this.e44_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
        return tmp1_elvis_lhs == null ? hashCodeImpl(this, 0, this.h44_1) : tmp1_elvis_lhs;
      }
      ic(value) {
        nonFullBuffer(this)[ensureNotNull(this.d44_1).length - this.g44_1 | 0] = value;
        this.e44_1 = null;
        this.g44_1 = this.g44_1 - 1 | 0;
        this.h44_1 = this.h44_1 + 1 | 0;
        return this;
      }
      bj(value, startIndex, endIndex) {
        if (value == null)
          return this;
        var current = startIndex;
        while (current < endIndex) {
          var buffer = nonFullBuffer(this);
          var offset = buffer.length - this.g44_1 | 0;
          var tmp0 = endIndex - current | 0;
          // Inline function 'kotlin.math.min' call
          var b = this.g44_1;
          var bytesToCopy = Math.min(tmp0, b);
          var inductionVariable = 0;
          if (inductionVariable < bytesToCopy)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              buffer[offset + i | 0] = charSequenceGet(value, current + i | 0);
            }
             while (inductionVariable < bytesToCopy);
          current = current + bytesToCopy | 0;
          this.g44_1 = this.g44_1 - bytesToCopy | 0;
        }
        this.e44_1 = null;
        this.h44_1 = this.h44_1 + (endIndex - startIndex | 0) | 0;
        return this;
      }
      v(value) {
        if (value == null)
          return this;
        return this.bj(value, 0, charSequenceLength(value));
      }
      i1l() {
        var list = this.c44_1;
        if (!(list == null)) {
          this.d44_1 = null;
          var inductionVariable = 0;
          var last = list.c1();
          if (inductionVariable < last)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              this.b44_1.q3g(list.e1(i));
            }
             while (inductionVariable < last);
        } else {
          var tmp0_safe_receiver = this.d44_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            this.b44_1.q3g(tmp0_safe_receiver);
          }
          this.d44_1 = null;
        }
        this.f44_1 = true;
        this.c44_1 = null;
        this.e44_1 = null;
        this.h44_1 = 0;
        this.g44_1 = 0;
      }
    }
    initMetadataForClass($, 'CharArrayBuilder', CharArrayBuilder, VOID, [CharSequence()]);
    CharArrayBuilderClass = $;
  }
  return CharArrayBuilderClass;
}
//region block: exports
export {
  CharArrayBuilder as CharArrayBuilder1n2d9vhxvtt4u,
};
//endregion

//# sourceMappingURL=CharArrayBuilder.mjs.map
