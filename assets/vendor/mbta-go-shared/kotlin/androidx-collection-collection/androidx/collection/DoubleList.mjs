import { get_EmptyDoubleArray2p9fmdqk6soi3 as get_EmptyDoubleArray } from './DoubleSet.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getNumberHashCode2l4nbdcihl25f as getNumberHashCode } from '../../../kotlin-kotlin-stdlib/kotlin/js/bitUtils.mjs';
import { until1jbpn0z3f8lbg as until } from '../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { throwIndexOutOfBoundsException3sa4zyplrkgji as throwIndexOutOfBoundsException } from './internal/RuntimeHelpers.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { copyOfgossjg6lh6js as copyOf } from '../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var DoubleListClass;
function DoubleList() {
  if (DoubleListClass === VOID) {
    class $ {
      constructor(initialCapacity) {
        var tmp = this;
        var tmp_0;
        if (initialCapacity === 0) {
          tmp_0 = get_EmptyDoubleArray();
        } else {
          tmp_0 = new Float64Array(initialCapacity);
        }
        tmp.w6a_1 = tmp_0;
        this.x6a_1 = 0;
      }
      y6a(separator, prefix, postfix, limit, truncated) {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        $l$block: {
          this_0.v(prefix);
          // Inline function 'androidx.collection.DoubleList.forEachIndexed' call
          // Inline function 'kotlin.contracts.contract' call
          var content = this.w6a_1;
          var inductionVariable = 0;
          var last = this.x6a_1;
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
              this_0.hj(element);
            }
             while (inductionVariable < last);
          this_0.v(postfix);
        }
        return this_0.toString();
      }
      z6a(separator, prefix, postfix, limit, truncated, $super) {
        separator = separator === VOID ? ', ' : separator;
        prefix = prefix === VOID ? '' : prefix;
        postfix = postfix === VOID ? '' : postfix;
        limit = limit === VOID ? -1 : limit;
        truncated = truncated === VOID ? '...' : truncated;
        return $super === VOID ? this.y6a(separator, prefix, postfix, limit, truncated) : $super.y6a.call(this, separator, prefix, postfix, limit, truncated);
      }
      hashCode() {
        var hashCode = 0;
        // Inline function 'androidx.collection.DoubleList.forEach' call
        // Inline function 'kotlin.contracts.contract' call
        var content = this.w6a_1;
        var inductionVariable = 0;
        var last = this.x6a_1;
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var element = content[i];
            hashCode = hashCode + imul(31, getNumberHashCode(element)) | 0;
          }
           while (inductionVariable < last);
        return hashCode;
      }
      equals(other) {
        var tmp;
        if (!(other instanceof DoubleList())) {
          tmp = true;
        } else {
          tmp = !(other.x6a_1 === this.x6a_1);
        }
        if (tmp) {
          return false;
        }
        var content = this.w6a_1;
        var otherContent = other.w6a_1;
        // Inline function 'androidx.collection.DoubleList.indices' call
        var progression = until(0, this.x6a_1);
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
        return this.z6a(VOID, '[', ']');
      }
    }
    initMetadataForClass($, 'DoubleList');
    DoubleListClass = $;
  }
  return DoubleListClass;
}
var MutableDoubleListClass;
function MutableDoubleList() {
  if (MutableDoubleListClass === VOID) {
    class $ extends DoubleList() {
      constructor(initialCapacity) {
        initialCapacity = initialCapacity === VOID ? 16 : initialCapacity;
        super(initialCapacity);
      }
      c6b(element) {
        this.r8(this.x6a_1 + 1 | 0);
        this.w6a_1[this.x6a_1] = element;
        this.x6a_1 = this.x6a_1 + 1 | 0;
        return true;
      }
      d6b(index, elements) {
        if (!(0 <= index ? index <= this.x6a_1 : false)) {
          throwIndexOutOfBoundsException('');
        }
        // Inline function 'kotlin.collections.isEmpty' call
        if (elements.length === 0)
          return false;
        this.r8(this.x6a_1 + elements.length | 0);
        var content = this.w6a_1;
        if (!(index === this.x6a_1)) {
          var tmp4 = index + elements.length | 0;
          // Inline function 'kotlin.collections.copyInto' call
          var endIndex = this.x6a_1;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp = content;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          arrayCopy(tmp, content, tmp4, index, endIndex);
        }
        // Inline function 'kotlin.collections.copyInto' call
        var endIndex_0 = elements.length;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp_0 = elements;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        arrayCopy(tmp_0, content, index, 0, endIndex_0);
        this.x6a_1 = this.x6a_1 + elements.length | 0;
        return true;
      }
      r8(capacity) {
        var oldContent = this.w6a_1;
        if (oldContent.length < capacity) {
          // Inline function 'kotlin.comparisons.maxOf' call
          var b = imul(oldContent.length, 3) / 2 | 0;
          var newSize = Math.max(capacity, b);
          this.w6a_1 = copyOf(oldContent, newSize);
        }
      }
    }
    initMetadataForClass($, 'MutableDoubleList', MutableDoubleList);
    MutableDoubleListClass = $;
  }
  return MutableDoubleListClass;
}
//region block: exports
export {
  MutableDoubleList as MutableDoubleList17zp36gc5asqr,
};
//endregion

//# sourceMappingURL=DoubleList.mjs.map
