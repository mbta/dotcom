import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { isArray1hxjqtqy632bc as isArray } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { RandomAccess1jbw8sdogqb8x as RandomAccess } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/RandomAccess.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_collection_MutableVector$stable;
var MutableVectorClass;
function MutableVector() {
  if (MutableVectorClass === VOID) {
    class $ {
      constructor(content, size) {
        this.s6t_1 = content;
        this.t6t_1 = null;
        this.u6t_1 = size;
      }
      c6e(element) {
        // Inline function 'androidx.compose.runtime.collection.MutableVector.ensureCapacity' call
        var capacity = this.u6t_1 + 1 | 0;
        if (this.s6t_1.length < capacity) {
          this.y7i(capacity);
        }
        this.s6t_1[this.u6t_1] = element;
        this.u6t_1 = this.u6t_1 + 1 | 0;
        return true;
      }
      z7i(index, elements) {
        if (elements.h1())
          return false;
        var elementsSize = elements.c1();
        // Inline function 'androidx.compose.runtime.collection.MutableVector.ensureCapacity' call
        var capacity = this.u6t_1 + elementsSize | 0;
        if (this.s6t_1.length < capacity) {
          this.y7i(capacity);
        }
        var content = this.s6t_1;
        if (!(index === this.u6t_1)) {
          var tmp4 = index + elementsSize | 0;
          // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
          // Inline function 'kotlin.collections.copyInto' call
          var endIndex = this.u6t_1;
          arrayCopy(content, content, tmp4, index, endIndex);
        }
        var inductionVariable = 0;
        var last = elements.c1() - 1 | 0;
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            content[index + i | 0] = elements.e1(i);
          }
           while (inductionVariable <= last);
        this.u6t_1 = this.u6t_1 + elementsSize | 0;
        return true;
      }
      p3() {
        var content = this.s6t_1;
        var inductionVariable = 0;
        var last = this.u6t_1;
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            content[i] = null;
          }
           while (inductionVariable < last);
        this.u6t_1 = 0;
      }
      zn(element) {
        var inductionVariable = 0;
        // Inline function 'androidx.compose.runtime.collection.MutableVector.lastIndex' call
        var last = this.u6t_1 - 1 | 0;
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
            var index = i;
            var tmp = this.s6t_1[index];
            var tmp$ret$1 = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
            if (equals(tmp$ret$1, element))
              return true;
          }
           while (!(i === last));
        return false;
      }
      y7i(capacity) {
        var oldContent = this.s6t_1;
        var oldSize = oldContent.length;
        // Inline function 'kotlin.math.max' call
        var b = imul(oldSize, 2);
        var newSize = Math.max(capacity, b);
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp = Array(newSize);
        var newContent = isArray(tmp) ? tmp : THROW_CCE();
        // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
        // Inline function 'kotlin.collections.copyInto' call
        arrayCopy(oldContent, newContent, 0, 0, oldSize);
        this.s6t_1 = newContent;
      }
      a6e(element) {
        var tmp = this.s6t_1;
        var content = isArray(tmp) ? tmp : THROW_CCE();
        var size = this.u6t_1;
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (equals(element, content[i]))
              return i;
          }
           while (inductionVariable < size);
        return -1;
      }
      k6e(element) {
        var index = this.a6e(element);
        if (index >= 0) {
          this.s3(index);
          return true;
        }
        return false;
      }
      s3(index) {
        var content = this.s6t_1;
        var tmp = content[index];
        var item = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
        // Inline function 'androidx.compose.runtime.collection.MutableVector.lastIndex' call
        if (!(index === (this.u6t_1 - 1 | 0))) {
          var tmp6 = index + 1 | 0;
          // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
          // Inline function 'kotlin.collections.copyInto' call
          var endIndex = this.u6t_1;
          arrayCopy(content, content, index, tmp6, endIndex);
        }
        this.u6t_1 = this.u6t_1 - 1 | 0;
        content[this.u6t_1] = null;
        return item;
      }
      u75(newSize) {
        this.u6t_1 = newSize;
      }
    }
    initMetadataForClass($, 'MutableVector', VOID, VOID, [RandomAccess()]);
    MutableVectorClass = $;
  }
  return MutableVectorClass;
}
//region block: init
androidx_compose_runtime_collection_MutableVector$stable = 8;
//endregion
//region block: exports
export {
  MutableVector as MutableVectorwjrdge2qewgb,
};
//endregion

//# sourceMappingURL=MutableVector.mjs.map
