import { get_EmptyIntArray32jbyjriwi88s as get_EmptyIntArray } from './IntSet.mjs';
import {
  throwNoSuchElementException3dew1tww4kkg9 as throwNoSuchElementException,
  throwIndexOutOfBoundsException3sa4zyplrkgji as throwIndexOutOfBoundsException,
} from './internal/RuntimeHelpers.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { until1jbpn0z3f8lbg as until } from '../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { copyOf3rutauicler23 as copyOf } from '../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var IntListClass;
function IntList() {
  if (IntListClass === VOID) {
    class $ {
      constructor(initialCapacity) {
        var tmp = this;
        var tmp_0;
        if (initialCapacity === 0) {
          tmp_0 = get_EmptyIntArray();
        } else {
          tmp_0 = new Int32Array(initialCapacity);
        }
        tmp.v6b_1 = tmp_0;
        this.w6b_1 = 0;
      }
      x6b() {
        // Inline function 'androidx.collection.IntList.isEmpty' call
        if (this.w6b_1 === 0) {
          throwNoSuchElementException('IntList is empty.');
        }
        return this.v6b_1[0];
      }
      e1(index) {
        if (!(0 <= index ? index < this.w6b_1 : false)) {
          throwIndexOutOfBoundsException('Index must be between 0 and size');
        }
        return this.v6b_1[index];
      }
      y6b() {
        // Inline function 'androidx.collection.IntList.isEmpty' call
        if (this.w6b_1 === 0) {
          throwNoSuchElementException('IntList is empty.');
        }
        var tmp = this.v6b_1;
        // Inline function 'androidx.collection.IntList.lastIndex' call
        return tmp[this.w6b_1 - 1 | 0];
      }
      y6a(separator, prefix, postfix, limit, truncated) {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        $l$block: {
          this_0.v(prefix);
          // Inline function 'androidx.collection.IntList.forEachIndexed' call
          // Inline function 'kotlin.contracts.contract' call
          var content = this.v6b_1;
          var inductionVariable = 0;
          var last = this.w6b_1;
          if (inductionVariable < last)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var element = content[i];
              if (i === limit) {
                this_0.v(truncated);
                break $l$block;
              }
              if (!(i === 0)) {
                this_0.v(separator);
              }
              this_0.ej(element);
            }
             while (inductionVariable < last);
          this_0.v(postfix);
        }
        return this_0.toString();
      }
      z6b(separator, prefix, postfix, limit, truncated, $super) {
        separator = separator === VOID ? ', ' : separator;
        prefix = prefix === VOID ? '' : prefix;
        postfix = postfix === VOID ? '' : postfix;
        limit = limit === VOID ? -1 : limit;
        truncated = truncated === VOID ? '...' : truncated;
        return $super === VOID ? this.y6a(separator, prefix, postfix, limit, truncated) : $super.y6a.call(this, separator, prefix, postfix, limit, truncated);
      }
      hashCode() {
        var hashCode = 0;
        // Inline function 'androidx.collection.IntList.forEach' call
        // Inline function 'kotlin.contracts.contract' call
        var content = this.v6b_1;
        var inductionVariable = 0;
        var last = this.w6b_1;
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var element = content[i];
            hashCode = hashCode + imul(31, element) | 0;
          }
           while (inductionVariable < last);
        return hashCode;
      }
      equals(other) {
        var tmp;
        if (!(other instanceof IntList())) {
          tmp = true;
        } else {
          tmp = !(other.w6b_1 === this.w6b_1);
        }
        if (tmp) {
          return false;
        }
        var content = this.v6b_1;
        var otherContent = other.v6b_1;
        // Inline function 'androidx.collection.IntList.indices' call
        var progression = until(0, this.w6b_1);
        var inductionVariable = progression.x1_1;
        var last = progression.y1_1;
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (!(content[i] === otherContent[i])) {
              return false;
            }
          }
           while (!(i === last));
        return true;
      }
      toString() {
        return this.z6b(VOID, '[', ']');
      }
    }
    initMetadataForClass($, 'IntList');
    IntListClass = $;
  }
  return IntListClass;
}
var MutableIntListClass;
function MutableIntList() {
  if (MutableIntListClass === VOID) {
    class $ extends IntList() {
      constructor(initialCapacity) {
        initialCapacity = initialCapacity === VOID ? 16 : initialCapacity;
        super(initialCapacity);
      }
      c6c(element) {
        this.r8(this.w6b_1 + 1 | 0);
        this.v6b_1[this.w6b_1] = element;
        this.w6b_1 = this.w6b_1 + 1 | 0;
        return true;
      }
      r8(capacity) {
        var oldContent = this.v6b_1;
        if (oldContent.length < capacity) {
          // Inline function 'kotlin.comparisons.maxOf' call
          var b = imul(oldContent.length, 3) / 2 | 0;
          var newSize = Math.max(capacity, b);
          this.v6b_1 = copyOf(oldContent, newSize);
        }
      }
      s3(index) {
        if (!(0 <= index ? index < this.w6b_1 : false)) {
          throwIndexOutOfBoundsException('Index must be between 0 and size');
        }
        var content = this.v6b_1;
        var item = content[index];
        // Inline function 'androidx.collection.IntList.lastIndex' call
        if (!(index === (this.w6b_1 - 1 | 0))) {
          var tmp6 = index + 1 | 0;
          // Inline function 'kotlin.collections.copyInto' call
          var endIndex = this.w6b_1;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp = content;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          arrayCopy(tmp, content, index, tmp6, endIndex);
        }
        this.w6b_1 = this.w6b_1 - 1 | 0;
        return item;
      }
      d6c(index, element) {
        if (!(0 <= index ? index < this.w6b_1 : false)) {
          throwIndexOutOfBoundsException('Index must be between 0 and size');
        }
        var content = this.v6b_1;
        var old = content[index];
        content[index] = element;
        return old;
      }
    }
    initMetadataForClass($, 'MutableIntList', MutableIntList);
    MutableIntListClass = $;
  }
  return MutableIntListClass;
}
//region block: exports
export {
  MutableIntList as MutableIntList1ufb3m5010ppd,
};
//endregion

//# sourceMappingURL=IntList.mjs.map
