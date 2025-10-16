import { toString30pk9tzaqopn as toString } from '../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  throwNoSuchElementException3dew1tww4kkg9 as throwNoSuchElementException,
  throwIndexOutOfBoundsException3sa4zyplrkgji as throwIndexOutOfBoundsException,
  throwIllegalArgumentExceptiondtiudu44q2g3 as throwIllegalArgumentException,
} from './internal/RuntimeHelpers.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { until1jbpn0z3f8lbg as until } from '../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  asJsReadonlyArrayView237cu3jwn119s as asJsReadonlyArrayView,
  KtMutableList1beimitadwkna as KtMutableList,
} from '../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import {
  arrayCopytctsywo3h7gj as arrayCopy,
  checkIndexOverflow3frtmheghr0th as checkIndexOverflow,
} from '../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { fill3hcjvebk42tyx as fill } from '../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_EmptyArray() {
  _init_properties_ObjectList_kt__fnapct();
  return EmptyArray;
}
var EmptyArray;
function get_EmptyObjectList() {
  _init_properties_ObjectList_kt__fnapct();
  return EmptyObjectList;
}
var EmptyObjectList;
function ObjectList$toString$lambda(this$0) {
  return function (element) {
    var tmp;
    if (element === this$0) {
      tmp = '(this)';
    } else {
      tmp = toString(element);
    }
    return tmp;
  };
}
var ObjectListClass;
function ObjectList() {
  if (ObjectListClass === VOID) {
    class $ {
      constructor(initialCapacity) {
        var tmp = this;
        var tmp_0;
        if (initialCapacity === 0) {
          tmp_0 = get_EmptyArray();
        } else {
          // Inline function 'kotlin.arrayOfNulls' call
          tmp_0 = Array(initialCapacity);
        }
        tmp.q6d_1 = tmp_0;
        this.r6d_1 = 0;
      }
      c1() {
        return this.r6d_1;
      }
      j1(element) {
        return this.l1(element) >= 0;
      }
      s6d(elements) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          if (!this.j1(element))
            return false;
        }
        return true;
      }
      x6b() {
        if (this.h1()) {
          throwNoSuchElementException('ObjectList is empty.');
        }
        var tmp = this.q6d_1[0];
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
      e1(index) {
        if (!(0 <= index ? index < this.r6d_1 : false)) {
          this.t6d(index);
        }
        var tmp = this.q6d_1[index];
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
      t6d(index) {
        // Inline function 'androidx.collection.ObjectList.lastIndex' call
        var tmp$ret$0 = this.r6d_1 - 1 | 0;
        throwIndexOutOfBoundsException('Index ' + index + ' must be in 0..' + tmp$ret$0);
      }
      l1(element) {
        if (element == null) {
          // Inline function 'androidx.collection.ObjectList.forEachIndexed' call
          // Inline function 'kotlin.contracts.contract' call
          var content = this.q6d_1;
          var inductionVariable = 0;
          var last = this.r6d_1;
          if (inductionVariable < last)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var tmp = content[i];
              if (((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE()) == null) {
                return i;
              }
            }
             while (inductionVariable < last);
        } else {
          // Inline function 'androidx.collection.ObjectList.forEachIndexed' call
          // Inline function 'kotlin.contracts.contract' call
          var content_0 = this.q6d_1;
          var inductionVariable_0 = 0;
          var last_0 = this.r6d_1;
          if (inductionVariable_0 < last_0)
            do {
              var i_0 = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var tmp_0 = content_0[i_0];
              var item = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
              if (equals(element, item)) {
                return i_0;
              }
            }
             while (inductionVariable_0 < last_0);
        }
        return -1;
      }
      h1() {
        return this.r6d_1 === 0;
      }
      u6d() {
        return !(this.r6d_1 === 0);
      }
      e3(element) {
        if (element == null) {
          // Inline function 'androidx.collection.ObjectList.forEachReversedIndexed' call
          // Inline function 'kotlin.contracts.contract' call
          var content = this.q6d_1;
          var inductionVariable = this.r6d_1 - 1 | 0;
          if (0 <= inductionVariable)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + -1 | 0;
              var tmp = content[i];
              if (((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE()) == null) {
                return i;
              }
            }
             while (0 <= inductionVariable);
        } else {
          // Inline function 'androidx.collection.ObjectList.forEachReversedIndexed' call
          // Inline function 'kotlin.contracts.contract' call
          var content_0 = this.q6d_1;
          var inductionVariable_0 = this.r6d_1 - 1 | 0;
          if (0 <= inductionVariable_0)
            do {
              var i_0 = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + -1 | 0;
              var tmp_0 = content_0[i_0];
              var item = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
              if (equals(element, item)) {
                return i_0;
              }
            }
             while (0 <= inductionVariable_0);
        }
        return -1;
      }
      v6d(separator, prefix, postfix, limit, truncated, transform) {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        $l$block: {
          this_0.v(prefix);
          // Inline function 'androidx.collection.ObjectList.forEachIndexed' call
          // Inline function 'kotlin.contracts.contract' call
          var content = this.q6d_1;
          var inductionVariable = 0;
          var last = this.r6d_1;
          if (inductionVariable < last)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var tmp = content[i];
              var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
              if (i === limit) {
                this_0.v(truncated);
                break $l$block;
              }
              if (!(i === 0)) {
                this_0.v(separator);
              }
              if (transform == null) {
                this_0.gc(element);
              } else {
                this_0.v(transform(element));
              }
            }
             while (inductionVariable < last);
          this_0.v(postfix);
        }
        return this_0.toString();
      }
      w6d(separator, prefix, postfix, limit, truncated, transform, $super) {
        separator = separator === VOID ? ', ' : separator;
        prefix = prefix === VOID ? '' : prefix;
        postfix = postfix === VOID ? '' : postfix;
        limit = limit === VOID ? -1 : limit;
        truncated = truncated === VOID ? '...' : truncated;
        transform = transform === VOID ? null : transform;
        return $super === VOID ? this.v6d(separator, prefix, postfix, limit, truncated, transform) : $super.v6d.call(this, separator, prefix, postfix, limit, truncated, transform);
      }
      hashCode() {
        var hashCode_0 = 0;
        // Inline function 'androidx.collection.ObjectList.forEach' call
        // Inline function 'kotlin.contracts.contract' call
        var content = this.q6d_1;
        var inductionVariable = 0;
        var last = this.r6d_1;
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp = content[i];
            var tmp_0 = hashCode_0;
            // Inline function 'kotlin.hashCode' call
            var tmp0_safe_receiver = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
            var tmp$ret$1 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
            hashCode_0 = tmp_0 + imul(31, tmp$ret$1) | 0;
          }
           while (inductionVariable < last);
        return hashCode_0;
      }
      equals(other) {
        var tmp;
        if (!(other instanceof ObjectList())) {
          tmp = true;
        } else {
          tmp = !(other.r6d_1 === this.r6d_1);
        }
        if (tmp) {
          return false;
        }
        var content = this.q6d_1;
        var otherContent = other.q6d_1;
        // Inline function 'androidx.collection.ObjectList.indices' call
        var progression = until(0, this.r6d_1);
        var inductionVariable = progression.x1_1;
        var last = progression.y1_1;
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (!equals(content[i], otherContent[i])) {
              return false;
            }
          }
           while (!(i === last));
        return true;
      }
      toString() {
        return this.w6d(VOID, '[', ']', VOID, VOID, ObjectList$toString$lambda(this));
      }
    }
    initMetadataForClass($, 'ObjectList');
    ObjectListClass = $;
  }
  return ObjectListClass;
}
function throwIndexOutOfBoundsInclusiveException($this, index) {
  throwIndexOutOfBoundsException('Index ' + index + ' must be in 0..' + $this.r6d_1);
}
var MutableObjectListIteratorClass;
function MutableObjectListIterator() {
  if (MutableObjectListIteratorClass === VOID) {
    class $ {
      constructor(list, index) {
        this.x6d_1 = list;
        this.y6d_1 = index - 1 | 0;
      }
      y() {
        return this.y6d_1 < (this.x6d_1.c1() - 1 | 0);
      }
      z() {
        this.y6d_1 = this.y6d_1 + 1 | 0;
        return this.x6d_1.e1(this.y6d_1);
      }
      z6() {
        this.x6d_1.s3(this.y6d_1);
        this.y6d_1 = this.y6d_1 - 1 | 0;
      }
      j7() {
        return this.y6d_1 >= 0;
      }
      k7() {
        return this.y6d_1 + 1 | 0;
      }
      l7() {
        var tmp1 = this.y6d_1;
        this.y6d_1 = tmp1 - 1 | 0;
        return this.x6d_1.e1(tmp1);
      }
      m7() {
        return this.y6d_1;
      }
    }
    initMetadataForClass($, 'MutableObjectListIterator');
    MutableObjectListIteratorClass = $;
  }
  return MutableObjectListIteratorClass;
}
var ObjectListMutableListClass;
function ObjectListMutableList() {
  if (ObjectListMutableListClass === VOID) {
    class $ {
      constructor(objectList) {
        this.z6d_1 = objectList;
      }
      c1() {
        return this.z6d_1.c1();
      }
      zn(element) {
        return this.z6d_1.j1(element);
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.zn((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      ao(elements) {
        return this.z6d_1.s6d(elements);
      }
      d3(elements) {
        return this.ao(elements);
      }
      e1(index) {
        checkIndex(this, index);
        return this.z6d_1.e1(index);
      }
      a6e(element) {
        return this.z6d_1.l1(element);
      }
      l1(element) {
        if (!(element == null ? true : !(element == null)))
          return -1;
        return this.a6e((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      h1() {
        return this.z6d_1.h1();
      }
      x() {
        return new (MutableObjectListIterator())(this, 0);
      }
      b6e(element) {
        return this.z6d_1.e3(element);
      }
      e3(element) {
        if (!(element == null ? true : !(element == null)))
          return -1;
        return this.b6e((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      c6e(element) {
        return this.z6d_1.i(element);
      }
      i(element) {
        return this.c6e((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      g6e(index, element) {
        return this.z6d_1.r3(index, element);
      }
      r3(index, element) {
        return this.g6e(index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      h6e(index, elements) {
        return this.z6d_1.n3(index, elements);
      }
      n3(index, elements) {
        return this.h6e(index, elements);
      }
      i6e(elements) {
        return this.z6d_1.j6e(elements);
      }
      d1(elements) {
        return this.i6e(elements);
      }
      p3() {
        return this.z6d_1.p3();
      }
      f3() {
        return new (MutableObjectListIterator())(this, 0);
      }
      k1(index) {
        return new (MutableObjectListIterator())(this, index);
      }
      k6e(element) {
        return this.z6d_1.m3(element);
      }
      m3(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.k6e((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      s3(index) {
        checkIndex(this, index);
        return this.z6d_1.s3(index);
      }
      l6e(elements) {
        return this.z6d_1.o3(elements);
      }
      o3(elements) {
        return this.l6e(elements);
      }
      m6e(index, element) {
        checkIndex(this, index);
        return this.z6d_1.q3(index, element);
      }
      q3(index, element) {
        return this.m6e(index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      g3(fromIndex, toIndex) {
        checkSubIndex(this, fromIndex, toIndex);
        return new (SubList())(this, fromIndex, toIndex);
      }
    }
    protoOf($).asJsReadonlyArrayView = asJsReadonlyArrayView;
    initMetadataForClass($, 'ObjectListMutableList', VOID, VOID, [KtMutableList()]);
    ObjectListMutableListClass = $;
  }
  return ObjectListMutableListClass;
}
var SubListClass;
function SubList() {
  if (SubListClass === VOID) {
    class $ {
      constructor(list, start, end) {
        this.n6e_1 = list;
        this.o6e_1 = start;
        this.p6e_1 = end;
      }
      c1() {
        return this.p6e_1 - this.o6e_1 | 0;
      }
      zn(element) {
        var inductionVariable = this.o6e_1;
        var last = this.p6e_1;
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (equals(this.n6e_1.e1(i), element)) {
              return true;
            }
          }
           while (inductionVariable < last);
        return false;
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.zn((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      ao(elements) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          if (!this.zn(element)) {
            return false;
          }
        }
        return true;
      }
      d3(elements) {
        return this.ao(elements);
      }
      e1(index) {
        checkIndex(this, index);
        return this.n6e_1.e1(index + this.o6e_1 | 0);
      }
      a6e(element) {
        var inductionVariable = this.o6e_1;
        var last = this.p6e_1;
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (equals(this.n6e_1.e1(i), element)) {
              return i - this.o6e_1 | 0;
            }
          }
           while (inductionVariable < last);
        return -1;
      }
      l1(element) {
        if (!(element == null ? true : !(element == null)))
          return -1;
        return this.a6e((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      h1() {
        return this.p6e_1 === this.o6e_1;
      }
      x() {
        return new (MutableObjectListIterator())(this, 0);
      }
      b6e(element) {
        var inductionVariable = this.p6e_1 - 1 | 0;
        var last = this.o6e_1;
        if (last <= inductionVariable)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + -1 | 0;
            if (equals(this.n6e_1.e1(i), element)) {
              return i - this.o6e_1 | 0;
            }
          }
           while (!(i === last));
        return -1;
      }
      e3(element) {
        if (!(element == null ? true : !(element == null)))
          return -1;
        return this.b6e((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      c6e(element) {
        var tmp1 = this.p6e_1;
        this.p6e_1 = tmp1 + 1 | 0;
        this.n6e_1.r3(tmp1, element);
        return true;
      }
      i(element) {
        return this.c6e((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      g6e(index, element) {
        this.n6e_1.r3(index + this.o6e_1 | 0, element);
        this.p6e_1 = this.p6e_1 + 1 | 0;
      }
      r3(index, element) {
        return this.g6e(index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      h6e(index, elements) {
        this.n6e_1.n3(index + this.o6e_1 | 0, elements);
        this.p6e_1 = this.p6e_1 + elements.c1() | 0;
        return elements.c1() > 0;
      }
      n3(index, elements) {
        return this.h6e(index, elements);
      }
      i6e(elements) {
        this.n6e_1.n3(this.p6e_1, elements);
        this.p6e_1 = this.p6e_1 + elements.c1() | 0;
        return elements.c1() > 0;
      }
      d1(elements) {
        return this.i6e(elements);
      }
      p3() {
        var inductionVariable = this.p6e_1 - 1 | 0;
        var last = this.o6e_1;
        if (last <= inductionVariable)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + -1 | 0;
            this.n6e_1.s3(i);
          }
           while (!(i === last));
        this.p6e_1 = this.o6e_1;
      }
      f3() {
        return new (MutableObjectListIterator())(this, 0);
      }
      k1(index) {
        return new (MutableObjectListIterator())(this, index);
      }
      k6e(element) {
        var inductionVariable = this.o6e_1;
        var last = this.p6e_1;
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (equals(this.n6e_1.e1(i), element)) {
              this.n6e_1.s3(i);
              this.p6e_1 = this.p6e_1 - 1 | 0;
              return true;
            }
          }
           while (inductionVariable < last);
        return false;
      }
      m3(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.k6e((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      s3(index) {
        checkIndex(this, index);
        var element = this.n6e_1.s3(index + this.o6e_1 | 0);
        this.p6e_1 = this.p6e_1 - 1 | 0;
        return element;
      }
      l6e(elements) {
        var originalEnd = this.p6e_1;
        var inductionVariable = this.p6e_1 - 1 | 0;
        var last = this.o6e_1;
        if (last <= inductionVariable)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + -1 | 0;
            var element = this.n6e_1.e1(i);
            if (!elements.j1(element)) {
              this.n6e_1.s3(i);
              this.p6e_1 = this.p6e_1 - 1 | 0;
            }
          }
           while (!(i === last));
        return !(originalEnd === this.p6e_1);
      }
      o3(elements) {
        return this.l6e(elements);
      }
      m6e(index, element) {
        checkIndex(this, index);
        return this.n6e_1.q3(index + this.o6e_1 | 0, element);
      }
      q3(index, element) {
        return this.m6e(index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      g3(fromIndex, toIndex) {
        checkSubIndex(this, fromIndex, toIndex);
        return new (SubList())(this, fromIndex, toIndex);
      }
    }
    protoOf($).asJsReadonlyArrayView = asJsReadonlyArrayView;
    initMetadataForClass($, 'SubList', VOID, VOID, [KtMutableList()]);
    SubListClass = $;
  }
  return SubListClass;
}
var MutableObjectListClass;
function MutableObjectList() {
  if (MutableObjectListClass === VOID) {
    class $ extends ObjectList() {
      constructor(initialCapacity) {
        initialCapacity = initialCapacity === VOID ? 16 : initialCapacity;
        super(initialCapacity);
        this.f6e_1 = null;
      }
      i(element) {
        // Inline function 'androidx.collection.MutableObjectList.ensureCapacity' call
        var capacity = this.r6d_1 + 1 | 0;
        var oldContent = this.q6d_1;
        if (oldContent.length < capacity) {
          this.q6e(capacity, oldContent);
        }
        this.q6d_1[this.r6d_1] = element;
        this.r6d_1 = this.r6d_1 + 1 | 0;
        return true;
      }
      r3(index, element) {
        if (!(0 <= index ? index <= this.r6d_1 : false)) {
          throwIndexOutOfBoundsInclusiveException(this, index);
        }
        // Inline function 'androidx.collection.MutableObjectList.ensureCapacity' call
        var capacity = this.r6d_1 + 1 | 0;
        var oldContent = this.q6d_1;
        if (oldContent.length < capacity) {
          this.q6e(capacity, oldContent);
        }
        var content = this.q6d_1;
        if (!(index === this.r6d_1)) {
          var tmp4 = index + 1 | 0;
          // Inline function 'kotlin.collections.copyInto' call
          var endIndex = this.r6d_1;
          arrayCopy(content, content, tmp4, index, endIndex);
        }
        content[index] = element;
        this.r6d_1 = this.r6d_1 + 1 | 0;
      }
      n3(index, elements) {
        if (!(0 <= index ? index <= this.r6d_1 : false)) {
          throwIndexOutOfBoundsInclusiveException(this, index);
        }
        if (elements.h1())
          return false;
        // Inline function 'androidx.collection.MutableObjectList.ensureCapacity' call
        var capacity = this.r6d_1 + elements.c1() | 0;
        var oldContent = this.q6d_1;
        if (oldContent.length < capacity) {
          this.q6e(capacity, oldContent);
        }
        var content = this.q6d_1;
        if (!(index === this.r6d_1)) {
          var tmp4 = index + elements.c1() | 0;
          // Inline function 'kotlin.collections.copyInto' call
          var endIndex = this.r6d_1;
          arrayCopy(content, content, tmp4, index, endIndex);
        }
        // Inline function 'kotlin.collections.forEachIndexed' call
        var index_0 = 0;
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var _unary__edvuaz = index_0;
          index_0 = _unary__edvuaz + 1 | 0;
          content[index + checkIndexOverflow(_unary__edvuaz) | 0] = item;
        }
        this.r6d_1 = this.r6d_1 + elements.c1() | 0;
        return true;
      }
      r6e(elements) {
        var oldSize = this.r6d_1;
        this.s6e(elements);
        return !(oldSize === this.r6d_1);
      }
      j6e(elements) {
        var oldSize = this.r6d_1;
        this.t6e(elements);
        return !(oldSize === this.r6d_1);
      }
      s6e(elements) {
        if (elements.h1())
          return Unit_instance;
        // Inline function 'androidx.collection.MutableObjectList.ensureCapacity' call
        var capacity = this.r6d_1 + elements.r6d_1 | 0;
        var oldContent = this.q6d_1;
        if (oldContent.length < capacity) {
          this.q6e(capacity, oldContent);
        }
        var content = this.q6d_1;
        var tmp0 = elements.q6d_1;
        var tmp4 = this.r6d_1;
        // Inline function 'kotlin.collections.copyInto' call
        var endIndex = elements.r6d_1;
        arrayCopy(tmp0, content, tmp4, 0, endIndex);
        this.r6d_1 = this.r6d_1 + elements.r6d_1 | 0;
      }
      t6e(elements) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          // Inline function 'androidx.collection.MutableObjectList.plusAssign' call
          this.i(element);
        }
      }
      p3() {
        fill(this.q6d_1, null, 0, this.r6d_1);
        this.r6d_1 = 0;
      }
      q6e(capacity, oldContent) {
        var oldSize = oldContent.length;
        // Inline function 'kotlin.math.max' call
        var b = imul(oldSize, 3) / 2 | 0;
        var newSize = Math.max(capacity, b);
        // Inline function 'kotlin.arrayOfNulls' call
        var newContent = Array(newSize);
        var tmp = this;
        // Inline function 'kotlin.collections.copyInto' call
        arrayCopy(oldContent, newContent, 0, 0, oldSize);
        tmp.q6d_1 = newContent;
      }
      m3(element) {
        var index = this.l1(element);
        if (index >= 0) {
          this.s3(index);
          return true;
        }
        return false;
      }
      s3(index) {
        if (!(0 <= index ? index < this.r6d_1 : false)) {
          this.t6d(index);
        }
        var content = this.q6d_1;
        var element = content[index];
        // Inline function 'androidx.collection.ObjectList.lastIndex' call
        if (!(index === (this.r6d_1 - 1 | 0))) {
          var tmp6 = index + 1 | 0;
          // Inline function 'kotlin.collections.copyInto' call
          var endIndex = this.r6d_1;
          arrayCopy(content, content, index, tmp6, endIndex);
        }
        this.r6d_1 = this.r6d_1 - 1 | 0;
        content[this.r6d_1] = null;
        return (element == null ? true : !(element == null)) ? element : THROW_CCE();
      }
      o3(elements) {
        var initialSize = this.r6d_1;
        var content = this.q6d_1;
        // Inline function 'androidx.collection.ObjectList.lastIndex' call
        var inductionVariable = this.r6d_1 - 1 | 0;
        if (0 <= inductionVariable)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + -1 | 0;
            var tmp = content[i];
            var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
            if (!elements.j1(element)) {
              this.s3(i);
            }
          }
           while (0 <= inductionVariable);
        return !(initialSize === this.r6d_1);
      }
      q3(index, element) {
        if (!(0 <= index ? index < this.r6d_1 : false)) {
          this.t6d(index);
        }
        var content = this.q6d_1;
        var old = content[index];
        content[index] = element;
        return (old == null ? true : !(old == null)) ? old : THROW_CCE();
      }
      u6e() {
        var tmp0_elvis_lhs = this.f6e_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = new (ObjectListMutableList())(this);
          this.f6e_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'MutableObjectList', MutableObjectList);
    MutableObjectListClass = $;
  }
  return MutableObjectListClass;
}
function checkIndex(_this__u8e3s4, index) {
  _init_properties_ObjectList_kt__fnapct();
  var size = _this__u8e3s4.c1();
  if (index < 0 || index >= size) {
    throwIndexOutOfBoundsException('Index ' + index + ' is out of bounds. The list has ' + size + ' elements.');
  }
}
function checkSubIndex(_this__u8e3s4, fromIndex, toIndex) {
  _init_properties_ObjectList_kt__fnapct();
  var size = _this__u8e3s4.c1();
  if (fromIndex > toIndex) {
    throwIllegalArgumentException('Indices are out of order. fromIndex (' + fromIndex + ') is greater than toIndex (' + toIndex + ').');
  }
  if (fromIndex < 0) {
    throwIndexOutOfBoundsException('fromIndex (' + fromIndex + ') is less than 0.');
  }
  if (toIndex > size) {
    throwIndexOutOfBoundsException('toIndex (' + toIndex + ') is more than than the list size (' + size + ')');
  }
}
function emptyObjectList() {
  _init_properties_ObjectList_kt__fnapct();
  var tmp = get_EmptyObjectList();
  return tmp instanceof ObjectList() ? tmp : THROW_CCE();
}
function mutableObjectListOf(element1, element2) {
  _init_properties_ObjectList_kt__fnapct();
  var list = new (MutableObjectList())(2);
  // Inline function 'androidx.collection.MutableObjectList.plusAssign' call
  list.i(element1);
  // Inline function 'androidx.collection.MutableObjectList.plusAssign' call
  list.i(element2);
  return list;
}
function objectListOf(element1) {
  _init_properties_ObjectList_kt__fnapct();
  return mutableObjectListOf_0(element1);
}
function mutableObjectListOf_0(element1) {
  _init_properties_ObjectList_kt__fnapct();
  var list = new (MutableObjectList())(1);
  // Inline function 'androidx.collection.MutableObjectList.plusAssign' call
  list.i(element1);
  return list;
}
var properties_initialized_ObjectList_kt_7isazj;
function _init_properties_ObjectList_kt__fnapct() {
  if (!properties_initialized_ObjectList_kt_7isazj) {
    properties_initialized_ObjectList_kt_7isazj = true;
    // Inline function 'kotlin.arrayOfNulls' call
    EmptyArray = Array(0);
    EmptyObjectList = new (MutableObjectList())(0);
  }
}
//region block: exports
export {
  MutableObjectList as MutableObjectList370jqbf1tk821,
  ObjectList as ObjectListm9esooo6mbz2,
  emptyObjectList as emptyObjectList10ti35z25kmbc,
  mutableObjectListOf as mutableObjectListOf14bpfh2zala4f,
  objectListOf as objectListOf1tay3ze9p1jo2,
};
//endregion

//# sourceMappingURL=ObjectList.mjs.map
