import { toString30pk9tzaqopn as toString } from '../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  get_EmptyGroup3quv3ubythwh0 as get_EmptyGroup,
  normalizeCapacity3ebzihg7o4adm as normalizeCapacity,
  loadedCapacity2ixp8rhrflbpr as loadedCapacity,
  unloadedCapacity3djxu9qdm2sj6 as unloadedCapacity,
  nextCapacity2etcq869vd6gg as nextCapacity,
} from './ScatterMap.mjs';
import { get_EMPTY_OBJECTS34620f3lgzyq as get_EMPTY_OBJECTS } from './internal/ContainerHelpers.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { countTrailingZeroBits1k55x07cygoff as countTrailingZeroBits } from '../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { longArray288a0fctlmjmj as longArray } from '../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import {
  fillzcylmep0vxyi as fill,
  fill3hcjvebk42tyx as fill_0,
} from '../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { throwIllegalArgumentExceptiondtiudu44q2g3 as throwIllegalArgumentException } from './internal/RuntimeHelpers.mjs';
import { contains2gm06f5aa19ov as contains } from '../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  _ULong___init__impl__c78o9k1p6qzv0dh0bvg as _ULong___init__impl__c78o9k,
  _ULong___get_data__impl__fggpzb2qlkrfp9zs48z as _ULong___get_data__impl__fggpzb,
} from '../../../kotlin-kotlin-stdlib/kotlin/ULong.mjs';
import { ulongCompare29yg6v52hxi4l as ulongCompare } from '../../../kotlin-kotlin-stdlib/kotlin/UnsignedJs.mjs';
import { get_lastIndex1y2f6o9u8hnf7 as get_lastIndex } from '../../../kotlin-kotlin-stdlib/kotlin/collections/_Arrays.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  SequenceScope1coiso86pqzq2 as SequenceScope,
  iterator3f5i676wpaa3g as iterator,
} from '../../../kotlin-kotlin-stdlib/kotlin/sequences/SequenceBuilder.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../../../kotlin-kotlin-stdlib/kotlin/js/rangeTo.mjs';
import { until1jbpn0z3f8lbg as until } from '../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  KtSetjrjc7fhfd6b9 as KtSet,
  KtMutableSetwuwn7k5m570a as KtMutableSet,
} from '../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var EmptyScatterSet;
function ScatterSet$toString$lambda(this$0) {
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
var ScatterSetClass;
function ScatterSet() {
  if (ScatterSetClass === VOID) {
    class $ {
      constructor() {
        this.i6f_1 = get_EmptyGroup();
        this.j6f_1 = get_EMPTY_OBJECTS();
        this.k6f_1 = 0;
        this.l6f_1 = 0;
      }
      p6b() {
        return this.k6f_1;
      }
      c1() {
        return this.l6f_1;
      }
      h1() {
        return this.l6f_1 === 0;
      }
      u6d() {
        return !(this.l6f_1 === 0);
      }
      j1(element) {
        var tmp$ret$10;
        $l$block: {
          // Inline function 'androidx.collection.ScatterSet.findElementIndex' call
          // Inline function 'androidx.collection.hash' call
          // Inline function 'kotlin.hashCode' call
          var tmp1_elvis_lhs = element == null ? null : hashCode(element);
          var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
          var hash = imul(tmp$ret$0, -862048943);
          var hash_0 = hash ^ hash << 16;
          // Inline function 'androidx.collection.h2' call
          var hash2 = hash_0 & 127;
          var probeMask = this.k6f_1;
          // Inline function 'androidx.collection.h1' call
          var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
          var probeIndex = 0;
          $l$loop_0: while (true) {
            var tmp0 = this.i6f_1;
            // Inline function 'androidx.collection.group' call
            var offset = probeOffset;
            var i = offset >> 3;
            var b = (offset & 7) << 3;
            var g = tmp0[i].r4(b).t4(tmp0[i + 1 | 0].p4(64 - b | 0).s4(toLong(b).m4().q4(63)));
            // Inline function 'androidx.collection.match' call
            // Inline function 'kotlin.Long.times' call
            var tmp$ret$5 = (new (Long())(16843009, 16843009)).h4(toLong(hash2));
            var x = g.u4(tmp$ret$5);
            var m = x.g4(new (Long())(16843009, 16843009)).s4(x.n4()).s4(new (Long())(-2139062144, -2139062144));
            $l$loop: while (true) {
              // Inline function 'androidx.collection.hasNext' call
              if (!!m.equals(new (Long())(0, 0))) {
                break $l$loop;
              }
              var tmp = probeOffset;
              // Inline function 'androidx.collection.get' call
              // Inline function 'androidx.collection.lowestBitSet' call
              var this_0 = m;
              var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
              if (equals(this.j6f_1[index], element)) {
                tmp$ret$10 = index;
                break $l$block;
              }
              // Inline function 'androidx.collection.next' call
              var this_1 = m;
              m = this_1.s4(this_1.g4(new (Long())(1, 0)));
            }
            // Inline function 'androidx.collection.maskEmpty' call
            if (!g.s4(g.n4().p4(6)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(0, 0))) {
              break $l$loop_0;
            }
            probeIndex = probeIndex + 8 | 0;
            probeOffset = (probeOffset + probeIndex | 0) & probeMask;
          }
          tmp$ret$10 = -1;
        }
        return tmp$ret$10 >= 0;
      }
      v6d(separator, prefix, postfix, limit, truncated, transform) {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        $l$block: {
          this_0.v(prefix);
          var index = 0;
          // Inline function 'androidx.collection.ScatterSet.forEach' call
          // Inline function 'kotlin.contracts.contract' call
          var elements = this.j6f_1;
          $l$block_0: {
            // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
            // Inline function 'kotlin.contracts.contract' call
            var m = this.i6f_1;
            var lastIndex = m.length - 2 | 0;
            var inductionVariable = 0;
            if (inductionVariable <= lastIndex)
              do {
                var i = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var slot = m[i];
                // Inline function 'androidx.collection.maskEmptyOrDeleted' call
                var this_1 = slot;
                if (!this_1.s4(this_1.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                  var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                  var inductionVariable_0 = 0;
                  if (inductionVariable_0 < bitCount)
                    do {
                      var j = inductionVariable_0;
                      inductionVariable_0 = inductionVariable_0 + 1 | 0;
                      // Inline function 'androidx.collection.isFull' call
                      if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                        var index_0 = (i << 3) + j | 0;
                        var tmp = elements[index_0];
                        var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                        if (index === limit) {
                          this_0.v(truncated);
                          break $l$block;
                        }
                        if (!(index === 0)) {
                          this_0.v(separator);
                        }
                        if (transform == null) {
                          this_0.gc(element);
                        } else {
                          this_0.v(transform(element));
                        }
                        index = index + 1 | 0;
                      }
                      slot = slot.q4(8);
                    }
                     while (inductionVariable_0 < bitCount);
                  if (!(bitCount === 8)) {
                    break $l$block_0;
                  }
                }
              }
               while (!(i === lastIndex));
          }
          this_0.v(postfix);
        }
        return this_0.toString();
      }
      m6f(separator, prefix, postfix, limit, truncated, transform, $super) {
        separator = separator === VOID ? ', ' : separator;
        prefix = prefix === VOID ? '' : prefix;
        postfix = postfix === VOID ? '' : postfix;
        limit = limit === VOID ? -1 : limit;
        truncated = truncated === VOID ? '...' : truncated;
        transform = transform === VOID ? null : transform;
        return $super === VOID ? this.v6d(separator, prefix, postfix, limit, truncated, transform) : $super.v6d.call(this, separator, prefix, postfix, limit, truncated, transform);
      }
      hashCode() {
        var hash = this.k6f_1;
        hash = imul(31, hash) + this.l6f_1 | 0;
        // Inline function 'androidx.collection.ScatterSet.forEach' call
        // Inline function 'kotlin.contracts.contract' call
        var elements = this.j6f_1;
        $l$block: {
          // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
          // Inline function 'kotlin.contracts.contract' call
          var m = this.i6f_1;
          var lastIndex = m.length - 2 | 0;
          var inductionVariable = 0;
          if (inductionVariable <= lastIndex)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var slot = m[i];
              // Inline function 'androidx.collection.maskEmptyOrDeleted' call
              var this_0 = slot;
              if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                var inductionVariable_0 = 0;
                if (inductionVariable_0 < bitCount)
                  do {
                    var j = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    // Inline function 'androidx.collection.isFull' call
                    if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                      var index = (i << 3) + j | 0;
                      var tmp = elements[index];
                      var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                      if (!equals(element, this)) {
                        var tmp_0 = hash;
                        // Inline function 'kotlin.hashCode' call
                        var tmp1_elvis_lhs = element == null ? null : hashCode(element);
                        hash = tmp_0 + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
                      }
                    }
                    slot = slot.q4(8);
                  }
                   while (inductionVariable_0 < bitCount);
                if (!(bitCount === 8)) {
                  break $l$block;
                }
              }
            }
             while (!(i === lastIndex));
        }
        return hash;
      }
      equals(other) {
        if (other === this) {
          return true;
        }
        if (!(other instanceof ScatterSet())) {
          return false;
        }
        if (!(other.c1() === this.c1())) {
          return false;
        }
        var o = other instanceof ScatterSet() ? other : THROW_CCE();
        // Inline function 'androidx.collection.ScatterSet.forEach' call
        // Inline function 'kotlin.contracts.contract' call
        var elements = this.j6f_1;
        $l$block: {
          // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
          // Inline function 'kotlin.contracts.contract' call
          var m = this.i6f_1;
          var lastIndex = m.length - 2 | 0;
          var inductionVariable = 0;
          if (inductionVariable <= lastIndex)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var slot = m[i];
              // Inline function 'androidx.collection.maskEmptyOrDeleted' call
              var this_0 = slot;
              if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                var inductionVariable_0 = 0;
                if (inductionVariable_0 < bitCount)
                  do {
                    var j = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    // Inline function 'androidx.collection.isFull' call
                    if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                      var index = (i << 3) + j | 0;
                      var tmp = elements[index];
                      var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                      if (!o.j1(element)) {
                        return false;
                      }
                    }
                    slot = slot.q4(8);
                  }
                   while (inductionVariable_0 < bitCount);
                if (!(bitCount === 8)) {
                  break $l$block;
                }
              }
            }
             while (!(i === lastIndex));
        }
        return true;
      }
      toString() {
        return this.m6f(VOID, '[', ']', VOID, VOID, ScatterSet$toString$lambda(this));
      }
      n6f() {
        return new (SetWrapper())(this);
      }
    }
    initMetadataForClass($, 'ScatterSet');
    ScatterSetClass = $;
  }
  return ScatterSetClass;
}
function initializeStorage($this, initialCapacity) {
  var tmp;
  if (initialCapacity > 0) {
    // Inline function 'kotlin.comparisons.maxOf' call
    var b = normalizeCapacity(initialCapacity);
    tmp = Math.max(7, b);
  } else {
    tmp = 0;
  }
  var newCapacity = tmp;
  $this.k6f_1 = newCapacity;
  initializeMetadata($this, newCapacity);
  var tmp_0 = $this;
  var tmp_1;
  if (newCapacity === 0) {
    tmp_1 = get_EMPTY_OBJECTS();
  } else {
    // Inline function 'kotlin.arrayOfNulls' call
    tmp_1 = Array(newCapacity);
  }
  tmp_0.j6f_1 = tmp_1;
}
function initializeMetadata($this, capacity) {
  var tmp = $this;
  var tmp_0;
  if (capacity === 0) {
    tmp_0 = get_EmptyGroup();
  } else {
    var size = ((((capacity + 1 | 0) + 7 | 0) + 7 | 0) & -8) >> 3;
    // Inline function 'kotlin.apply' call
    var this_0 = longArray(size);
    fill(this_0, new (Long())(-2139062144, -2139062144));
    tmp_0 = this_0;
  }
  tmp.i6f_1 = tmp_0;
  var tmp0 = $this.i6f_1;
  // Inline function 'androidx.collection.writeRawMetadata' call
  var value = new (Long())(255, 0);
  var i = capacity >> 3;
  var b = (capacity & 7) << 3;
  tmp0[i] = tmp0[i].s4((new (Long())(255, 0)).p4(b).n4()).t4(value.p4(b));
  initializeGrowth($this);
}
function initializeGrowth($this) {
  $this.s6f_1 = loadedCapacity($this.p6b()) - $this.l6f_1 | 0;
}
function findAbsoluteInsertIndex($this, element) {
  // Inline function 'androidx.collection.hash' call
  // Inline function 'kotlin.hashCode' call
  var tmp1_elvis_lhs = element == null ? null : hashCode(element);
  var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  var hash = imul(tmp$ret$0, -862048943);
  var hash_0 = hash ^ hash << 16;
  // Inline function 'androidx.collection.h1' call
  var hash1 = hash_0 >>> 7 | 0;
  // Inline function 'androidx.collection.h2' call
  var hash2 = hash_0 & 127;
  var probeMask = $this.k6f_1;
  var probeOffset = hash1 & probeMask;
  var probeIndex = 0;
  $l$loop_0: while (true) {
    var tmp0 = $this.i6f_1;
    // Inline function 'androidx.collection.group' call
    var offset = probeOffset;
    var i = offset >> 3;
    var b = (offset & 7) << 3;
    var g = tmp0[i].r4(b).t4(tmp0[i + 1 | 0].p4(64 - b | 0).s4(toLong(b).m4().q4(63)));
    // Inline function 'androidx.collection.match' call
    // Inline function 'kotlin.Long.times' call
    var tmp$ret$5 = (new (Long())(16843009, 16843009)).h4(toLong(hash2));
    var x = g.u4(tmp$ret$5);
    var m = x.g4(new (Long())(16843009, 16843009)).s4(x.n4()).s4(new (Long())(-2139062144, -2139062144));
    $l$loop: while (true) {
      // Inline function 'androidx.collection.hasNext' call
      if (!!m.equals(new (Long())(0, 0))) {
        break $l$loop;
      }
      var tmp = probeOffset;
      // Inline function 'androidx.collection.get' call
      // Inline function 'androidx.collection.lowestBitSet' call
      var this_0 = m;
      var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
      if (equals($this.j6f_1[index], element)) {
        return index;
      }
      // Inline function 'androidx.collection.next' call
      var this_1 = m;
      m = this_1.s4(this_1.g4(new (Long())(1, 0)));
    }
    // Inline function 'androidx.collection.maskEmpty' call
    if (!g.s4(g.n4().p4(6)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(0, 0))) {
      break $l$loop_0;
    }
    probeIndex = probeIndex + 8 | 0;
    probeOffset = (probeOffset + probeIndex | 0) & probeMask;
  }
  var index_0 = findFirstAvailableSlot($this, hash1);
  var tmp_0;
  if ($this.s6f_1 === 0) {
    // Inline function 'androidx.collection.isDeleted' call
    // Inline function 'androidx.collection.readRawMetadata' call
    var offset_0 = index_0;
    tmp_0 = !$this.i6f_1[offset_0 >> 3].q4((offset_0 & 7) << 3).s4(new (Long())(255, 0)).equals(new (Long())(254, 0));
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    $this.q6b();
    index_0 = findFirstAvailableSlot($this, hash1);
  }
  $this.l6f_1 = $this.l6f_1 + 1 | 0;
  var tmp_1 = $this;
  var tmp_2 = $this.s6f_1;
  var tmp_3;
  // Inline function 'androidx.collection.isEmpty' call
  // Inline function 'androidx.collection.readRawMetadata' call
  var offset_1 = index_0;
  if ($this.i6f_1[offset_1 >> 3].q4((offset_1 & 7) << 3).s4(new (Long())(255, 0)).equals(new (Long())(128, 0))) {
    tmp_3 = 1;
  } else {
    tmp_3 = 0;
  }
  tmp_1.s6f_1 = tmp_2 - tmp_3 | 0;
  var tmp0_0 = $this.i6f_1;
  var tmp2 = $this.k6f_1;
  var tmp4 = index_0;
  // Inline function 'androidx.collection.writeMetadata' call
  // Inline function 'androidx.collection.writeRawMetadata' call
  var value = toLong(hash2);
  var i_0 = tmp4 >> 3;
  var b_0 = (tmp4 & 7) << 3;
  tmp0_0[i_0] = tmp0_0[i_0].s4((new (Long())(255, 0)).p4(b_0).n4()).t4(value.p4(b_0));
  var cloneIndex = ((tmp4 - 7 | 0) & tmp2) + (7 & tmp2) | 0;
  tmp0_0[cloneIndex >> 3] = tmp0_0[tmp4 >> 3];
  return index_0;
}
function findFirstAvailableSlot($this, hash1) {
  var probeMask = $this.k6f_1;
  var probeOffset = hash1 & probeMask;
  var probeIndex = 0;
  while (true) {
    var tmp0 = $this.i6f_1;
    // Inline function 'androidx.collection.group' call
    var offset = probeOffset;
    var i = offset >> 3;
    var b = (offset & 7) << 3;
    var g = tmp0[i].r4(b).t4(tmp0[i + 1 | 0].p4(64 - b | 0).s4(toLong(b).m4().q4(63)));
    // Inline function 'androidx.collection.maskEmptyOrDeleted' call
    var m = g.s4(g.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144));
    if (!m.equals(new (Long())(0, 0))) {
      var tmp = probeOffset;
      // Inline function 'androidx.collection.lowestBitSet' call
      return (tmp + (countTrailingZeroBits(m) >> 3) | 0) & probeMask;
    }
    probeIndex = probeIndex + 8 | 0;
    probeOffset = (probeOffset + probeIndex | 0) & probeMask;
  }
}
var MutableScatterSetClass;
function MutableScatterSet() {
  if (MutableScatterSetClass === VOID) {
    class $ extends ScatterSet() {
      constructor(initialCapacity) {
        initialCapacity = initialCapacity === VOID ? 6 : initialCapacity;
        super();
        this.s6f_1 = 0;
        // Inline function 'androidx.collection.internal.requirePrecondition' call
        // Inline function 'kotlin.contracts.contract' call
        if (!(initialCapacity >= 0)) {
          var tmp$ret$1 = 'Capacity must be a positive value.';
          throwIllegalArgumentException(tmp$ret$1);
        }
        initializeStorage(this, unloadedCapacity(initialCapacity));
      }
      i(element) {
        var oldSize = this.c1();
        var index = findAbsoluteInsertIndex(this, element);
        this.j6f_1[index] = element;
        return !(this.c1() === oldSize);
      }
      t6f(element) {
        var index = findAbsoluteInsertIndex(this, element);
        this.j6f_1[index] = element;
      }
      j6e(elements) {
        var oldSize = this.c1();
        this.t6e(elements);
        return !(oldSize === this.c1());
      }
      u6f(elements) {
        var oldSize = this.c1();
        this.v6f(elements);
        return !(oldSize === this.c1());
      }
      t6e(elements) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          this.t6f(element);
        }
      }
      v6f(elements) {
        // Inline function 'androidx.collection.ScatterSet.forEach' call
        // Inline function 'kotlin.contracts.contract' call
        var elements_0 = elements.j6f_1;
        $l$block: {
          // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
          // Inline function 'kotlin.contracts.contract' call
          var m = elements.i6f_1;
          var lastIndex = m.length - 2 | 0;
          var inductionVariable = 0;
          if (inductionVariable <= lastIndex)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var slot = m[i];
              // Inline function 'androidx.collection.maskEmptyOrDeleted' call
              var this_0 = slot;
              if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                var inductionVariable_0 = 0;
                if (inductionVariable_0 < bitCount)
                  do {
                    var j = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    // Inline function 'androidx.collection.isFull' call
                    if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                      var index = (i << 3) + j | 0;
                      var tmp = elements_0[index];
                      var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                      this.t6f(element);
                    }
                    slot = slot.q4(8);
                  }
                   while (inductionVariable_0 < bitCount);
                if (!(bitCount === 8)) {
                  break $l$block;
                }
              }
            }
             while (!(i === lastIndex));
        }
      }
      m3(element) {
        var tmp$ret$10;
        $l$block: {
          // Inline function 'androidx.collection.ScatterSet.findElementIndex' call
          // Inline function 'androidx.collection.hash' call
          // Inline function 'kotlin.hashCode' call
          var tmp1_elvis_lhs = element == null ? null : hashCode(element);
          var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
          var hash = imul(tmp$ret$0, -862048943);
          var hash_0 = hash ^ hash << 16;
          // Inline function 'androidx.collection.h2' call
          var hash2 = hash_0 & 127;
          var probeMask = this.k6f_1;
          // Inline function 'androidx.collection.h1' call
          var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
          var probeIndex = 0;
          $l$loop_0: while (true) {
            var tmp0 = this.i6f_1;
            // Inline function 'androidx.collection.group' call
            var offset = probeOffset;
            var i = offset >> 3;
            var b = (offset & 7) << 3;
            var g = tmp0[i].r4(b).t4(tmp0[i + 1 | 0].p4(64 - b | 0).s4(toLong(b).m4().q4(63)));
            // Inline function 'androidx.collection.match' call
            // Inline function 'kotlin.Long.times' call
            var tmp$ret$5 = (new (Long())(16843009, 16843009)).h4(toLong(hash2));
            var x = g.u4(tmp$ret$5);
            var m = x.g4(new (Long())(16843009, 16843009)).s4(x.n4()).s4(new (Long())(-2139062144, -2139062144));
            $l$loop: while (true) {
              // Inline function 'androidx.collection.hasNext' call
              if (!!m.equals(new (Long())(0, 0))) {
                break $l$loop;
              }
              var tmp = probeOffset;
              // Inline function 'androidx.collection.get' call
              // Inline function 'androidx.collection.lowestBitSet' call
              var this_0 = m;
              var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
              if (equals(this.j6f_1[index], element)) {
                tmp$ret$10 = index;
                break $l$block;
              }
              // Inline function 'androidx.collection.next' call
              var this_1 = m;
              m = this_1.s4(this_1.g4(new (Long())(1, 0)));
            }
            // Inline function 'androidx.collection.maskEmpty' call
            if (!g.s4(g.n4().p4(6)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(0, 0))) {
              break $l$loop_0;
            }
            probeIndex = probeIndex + 8 | 0;
            probeOffset = (probeOffset + probeIndex | 0) & probeMask;
          }
          tmp$ret$10 = -1;
        }
        var index_0 = tmp$ret$10;
        var exists = index_0 >= 0;
        if (exists) {
          this.w6f(index_0);
        }
        return exists;
      }
      o3(elements) {
        var internalElements = this.j6f_1;
        var startSize = this.l6f_1;
        $l$block: {
          // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
          // Inline function 'kotlin.contracts.contract' call
          var m = this.i6f_1;
          var lastIndex = m.length - 2 | 0;
          var inductionVariable = 0;
          if (inductionVariable <= lastIndex)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var slot = m[i];
              // Inline function 'androidx.collection.maskEmptyOrDeleted' call
              var this_0 = slot;
              if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
                var inductionVariable_0 = 0;
                if (inductionVariable_0 < bitCount)
                  do {
                    var j = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    // Inline function 'androidx.collection.isFull' call
                    if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                      var index = (i << 3) + j | 0;
                      if (!contains(elements, internalElements[index])) {
                        this.w6f(index);
                      }
                    }
                    slot = slot.q4(8);
                  }
                   while (inductionVariable_0 < bitCount);
                if (!(bitCount === 8)) {
                  break $l$block;
                }
              }
            }
             while (!(i === lastIndex));
        }
        return !(startSize === this.l6f_1);
      }
      w6f(index) {
        this.l6f_1 = this.l6f_1 - 1 | 0;
        var tmp0 = this.i6f_1;
        var tmp2 = this.k6f_1;
        // Inline function 'androidx.collection.writeMetadata' call
        // Inline function 'androidx.collection.writeRawMetadata' call
        var value = new (Long())(254, 0);
        var i = index >> 3;
        var b = (index & 7) << 3;
        tmp0[i] = tmp0[i].s4((new (Long())(255, 0)).p4(b).n4()).t4(value.p4(b));
        var cloneIndex = ((index - 7 | 0) & tmp2) + (7 & tmp2) | 0;
        tmp0[cloneIndex >> 3] = tmp0[index >> 3];
        this.j6f_1[index] = null;
      }
      p3() {
        this.l6f_1 = 0;
        if (!(this.i6f_1 === get_EmptyGroup())) {
          fill(this.i6f_1, new (Long())(-2139062144, -2139062144));
          var tmp0 = this.i6f_1;
          var tmp2 = this.k6f_1;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var value = new (Long())(255, 0);
          var i = tmp2 >> 3;
          var b = (tmp2 & 7) << 3;
          tmp0[i] = tmp0[i].s4((new (Long())(255, 0)).p4(b).n4()).t4(value.p4(b));
        }
        fill_0(this.j6f_1, null, 0, this.k6f_1);
        initializeGrowth(this);
      }
      q6b() {
        var tmp;
        if (this.k6f_1 > 8) {
          // Inline function 'kotlin.toULong' call
          var this_0 = this.l6f_1;
          var tmp0 = _ULong___init__impl__c78o9k(toLong(this_0));
          // Inline function 'kotlin.ULong.times' call
          var other = _ULong___init__impl__c78o9k(new (Long())(32, 0));
          var tmp0_0 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(tmp0).h4(_ULong___get_data__impl__fggpzb(other)));
          // Inline function 'kotlin.toULong' call
          var this_1 = this.k6f_1;
          var tmp0_1 = _ULong___init__impl__c78o9k(toLong(this_1));
          // Inline function 'kotlin.ULong.times' call
          var other_0 = _ULong___init__impl__c78o9k(new (Long())(25, 0));
          // Inline function 'kotlin.ULong.compareTo' call
          var other_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(tmp0_1).h4(_ULong___get_data__impl__fggpzb(other_0)));
          tmp = ulongCompare(_ULong___get_data__impl__fggpzb(tmp0_0), _ULong___get_data__impl__fggpzb(other_1)) <= 0;
        } else {
          tmp = false;
        }
        if (tmp) {
          this.s6b();
        } else {
          this.r6b(nextCapacity(this.k6f_1));
        }
      }
      s6b() {
        var metadata = this.i6f_1;
        var capacity = this.k6f_1;
        var elements = this.j6f_1;
        // Inline function 'androidx.collection.convertMetadataForCleanup' call
        var end = (capacity + 7 | 0) >> 3;
        var inductionVariable = 0;
        if (inductionVariable < end)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var maskedGroup = metadata[i].s4(new (Long())(-2139062144, -2139062144));
            metadata[i] = maskedGroup.n4().f4(maskedGroup.r4(7)).s4(new (Long())(-16843010, -16843010));
          }
           while (inductionVariable < end);
        var lastIndex = get_lastIndex(metadata);
        metadata[lastIndex - 1 | 0] = (new (Long())(0, -16777216)).t4(metadata[lastIndex - 1 | 0].s4(new (Long())(-1, 16777215)));
        metadata[lastIndex] = metadata[0];
        var index = 0;
        $l$loop_1: while (!(index === capacity)) {
          // Inline function 'androidx.collection.readRawMetadata' call
          var offset = index;
          var m = metadata[offset >> 3].q4((offset & 7) << 3).s4(new (Long())(255, 0));
          if (m.equals(new (Long())(128, 0))) {
            index = index + 1 | 0;
            continue $l$loop_1;
          }
          if (!m.equals(new (Long())(254, 0))) {
            index = index + 1 | 0;
            continue $l$loop_1;
          }
          // Inline function 'androidx.collection.hash' call
          // Inline function 'kotlin.hashCode' call
          var tmp0_safe_receiver = elements[index];
          var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
          var tmp$ret$2 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
          var hash = imul(tmp$ret$2, -862048943);
          var hash_0 = hash ^ hash << 16;
          // Inline function 'androidx.collection.h1' call
          var hash1 = hash_0 >>> 7 | 0;
          var targetIndex = findFirstAvailableSlot(this, hash1);
          var probeOffset = hash1 & capacity;
          var newProbeIndex = ((targetIndex - probeOffset | 0) & capacity) / 8 | 0;
          var oldProbeIndex = ((index - probeOffset | 0) & capacity) / 8 | 0;
          if (newProbeIndex === oldProbeIndex) {
            // Inline function 'androidx.collection.h2' call
            var hash2 = hash_0 & 127;
            var tmp2 = index;
            // Inline function 'androidx.collection.writeRawMetadata' call
            var value = toLong(hash2);
            var i_0 = tmp2 >> 3;
            var b = (tmp2 & 7) << 3;
            metadata[i_0] = metadata[i_0].s4((new (Long())(255, 0)).p4(b).n4()).t4(value.p4(b));
            metadata[get_lastIndex(metadata)] = (new (Long())(0, -2147483648)).t4(metadata[0].s4(new (Long())(-1, 16777215)));
            index = index + 1 | 0;
            continue $l$loop_1;
          }
          // Inline function 'androidx.collection.readRawMetadata' call
          m = metadata[targetIndex >> 3].q4((targetIndex & 7) << 3).s4(new (Long())(255, 0));
          if (m.equals(new (Long())(128, 0))) {
            // Inline function 'androidx.collection.h2' call
            var hash2_0 = hash_0 & 127;
            // Inline function 'androidx.collection.writeRawMetadata' call
            var value_0 = toLong(hash2_0);
            var i_1 = targetIndex >> 3;
            var b_0 = (targetIndex & 7) << 3;
            metadata[i_1] = metadata[i_1].s4((new (Long())(255, 0)).p4(b_0).n4()).t4(value_0.p4(b_0));
            var tmp2_0 = index;
            // Inline function 'androidx.collection.writeRawMetadata' call
            var value_1 = new (Long())(128, 0);
            var i_2 = tmp2_0 >> 3;
            var b_1 = (tmp2_0 & 7) << 3;
            metadata[i_2] = metadata[i_2].s4((new (Long())(255, 0)).p4(b_1).n4()).t4(value_1.p4(b_1));
            elements[targetIndex] = elements[index];
            elements[index] = null;
          } else {
            // Inline function 'androidx.collection.h2' call
            var hash2_1 = hash_0 & 127;
            // Inline function 'androidx.collection.writeRawMetadata' call
            var value_2 = toLong(hash2_1);
            var i_3 = targetIndex >> 3;
            var b_2 = (targetIndex & 7) << 3;
            metadata[i_3] = metadata[i_3].s4((new (Long())(255, 0)).p4(b_2).n4()).t4(value_2.p4(b_2));
            var oldElement = elements[targetIndex];
            elements[targetIndex] = elements[index];
            elements[index] = oldElement;
            index = index - 1 | 0;
          }
          metadata[get_lastIndex(metadata)] = (new (Long())(0, -2147483648)).t4(metadata[0].s4(new (Long())(-1, 16777215)));
          index = index + 1 | 0;
        }
        initializeGrowth(this);
      }
      r6b(newCapacity) {
        var previousMetadata = this.i6f_1;
        var previousElements = this.j6f_1;
        var previousCapacity = this.k6f_1;
        initializeStorage(this, newCapacity);
        var newMetadata = this.i6f_1;
        var newElements = this.j6f_1;
        var capacity = this.k6f_1;
        var inductionVariable = 0;
        if (inductionVariable < previousCapacity)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            // Inline function 'androidx.collection.isFull' call
            // Inline function 'androidx.collection.readRawMetadata' call
            if (previousMetadata[i >> 3].q4((i & 7) << 3).s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
              var previousElement = previousElements[i];
              // Inline function 'androidx.collection.hash' call
              // Inline function 'kotlin.hashCode' call
              var tmp1_elvis_lhs = previousElement == null ? null : hashCode(previousElement);
              var tmp$ret$2 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
              var hash = imul(tmp$ret$2, -862048943);
              var hash_0 = hash ^ hash << 16;
              // Inline function 'androidx.collection.h1' call
              var tmp$ret$4 = hash_0 >>> 7 | 0;
              var index = findFirstAvailableSlot(this, tmp$ret$4);
              // Inline function 'androidx.collection.h2' call
              var tmp$ret$5 = hash_0 & 127;
              // Inline function 'androidx.collection.writeMetadata' call
              // Inline function 'androidx.collection.writeRawMetadata' call
              var value = toLong(tmp$ret$5);
              var i_0 = index >> 3;
              var b = (index & 7) << 3;
              newMetadata[i_0] = newMetadata[i_0].s4((new (Long())(255, 0)).p4(b).n4()).t4(value.p4(b));
              var cloneIndex = ((index - 7 | 0) & capacity) + (7 & capacity) | 0;
              newMetadata[cloneIndex >> 3] = newMetadata[index >> 3];
              newElements[index] = previousElement;
            }
          }
           while (inductionVariable < previousCapacity);
      }
      x6f() {
        return new (MutableSetWrapper())(this);
      }
    }
    initMetadataForClass($, 'MutableScatterSet', MutableScatterSet);
    MutableScatterSetClass = $;
  }
  return MutableScatterSetClass;
}
var SetWrapper$iterator$slambdaClass;
function SetWrapper$iterator$slambda() {
  if (SetWrapper$iterator$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.g6g_1 = this$0;
        super(resultContinuation, $box);
      }
      b6h($this$iterator, $completion) {
        var tmp = this.c6h($this$iterator, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.b6h(p1 instanceof SequenceScope() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 11;
                var tmp_0 = this;
                tmp_0.i6g_1 = this.g6g_1.d6h_1;
                this.j6g_1 = this.i6g_1;
                this.k6g_1 = this.j6g_1.j6f_1;
                var tmp_1 = this;
                tmp_1.l6g_1 = this.j6g_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.n6g_1 = this.l6g_1;
                this.o6g_1 = this.n6g_1.i6f_1;
                this.p6g_1 = this.o6g_1.length - 2 | 0;
                this.q6g_1 = numberRangeToNumber(0, this.p6g_1).x();
                this.fd_1 = 2;
                continue $sm;
              case 2:
                if (!this.q6g_1.y()) {
                  this.fd_1 = 9;
                  continue $sm;
                }

                this.r6g_1 = this.q6g_1.z();
                this.s6g_1 = this.o6g_1[this.r6g_1];
                var this_0 = this.s6g_1;
                if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                  this.t6g_1 = 8 - (~(this.r6g_1 - this.p6g_1 | 0) >>> 31 | 0) | 0;
                  this.u6g_1 = until(0, this.t6g_1).x();
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  this.fd_1 = 8;
                  continue $sm;
                }

              case 3:
                if (!this.u6g_1.y()) {
                  this.fd_1 = 6;
                  continue $sm;
                }

                this.v6g_1 = this.u6g_1.z();
                if (this.s6g_1.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                  this.w6g_1 = (this.r6g_1 << 3) + this.v6g_1 | 0;
                  var tmp_2 = this;
                  tmp_2.x6g_1 = this.w6g_1;
                  this.y6g_1 = this.x6g_1;
                  var tmp_3 = this;
                  var tmp_4 = this.k6g_1[this.y6g_1];
                  tmp_3.z6g_1 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
                  this.a6h_1 = this.z6g_1;
                  this.fd_1 = 4;
                  suspendResult = this.h6g_1.so(this.a6h_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 5;
                  continue $sm;
                }

              case 4:
                this.fd_1 = 5;
                continue $sm;
              case 5:
                this.s6g_1 = this.s6g_1.q4(8);
                this.fd_1 = 3;
                continue $sm;
              case 6:
                if (!(this.t6g_1 === 8)) {
                  this.m6g_1 = Unit_instance;
                  this.fd_1 = 10;
                  continue $sm;
                } else {
                  this.fd_1 = 7;
                  continue $sm;
                }

              case 7:
                this.fd_1 = 8;
                continue $sm;
              case 8:
                this.fd_1 = 2;
                continue $sm;
              case 9:
                this.m6g_1 = Unit_instance;
                if (false) {
                  this.fd_1 = 1;
                  continue $sm;
                }

                this.fd_1 = 10;
                continue $sm;
              case 10:
                return Unit_instance;
              case 11:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 11) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      c6h($this$iterator, completion) {
        var i = new (SetWrapper$iterator$slambda())(this.g6g_1, completion);
        i.h6g_1 = $this$iterator;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    SetWrapper$iterator$slambdaClass = $;
  }
  return SetWrapper$iterator$slambdaClass;
}
function SetWrapper$iterator$slambda_0(this$0, resultContinuation) {
  var i = new (SetWrapper$iterator$slambda())(this$0, resultContinuation);
  var l = function ($this$iterator, $completion) {
    return i.b6h($this$iterator, $completion);
  };
  l.$arity = 1;
  return l;
}
var SetWrapperClass;
function SetWrapper() {
  if (SetWrapperClass === VOID) {
    class $ {
      constructor(parent) {
        this.d6h_1 = parent;
      }
      c1() {
        return this.d6h_1.l6f_1;
      }
      d3(elements) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          if (!this.d6h_1.j1(element)) {
            return false;
          }
        }
        return true;
      }
      j1(element) {
        return this.d6h_1.j1(element);
      }
      h1() {
        return this.d6h_1.h1();
      }
      x() {
        return iterator(SetWrapper$iterator$slambda_0(this, null));
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof SetWrapper()))
          THROW_CCE();
        return this.d6h_1.equals(other.d6h_1);
      }
      hashCode() {
        return this.d6h_1.hashCode();
      }
      toString() {
        return this.d6h_1.toString();
      }
    }
    initMetadataForClass($, 'SetWrapper', VOID, VOID, [KtSet()]);
    SetWrapperClass = $;
  }
  return SetWrapperClass;
}
var MutableSetWrapper$iterator$o$iterator$slambdaClass;
function MutableSetWrapper$iterator$o$iterator$slambda() {
  if (MutableSetWrapper$iterator$o$iterator$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, this$1, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.m6h_1 = this$0;
        $box.n6h_1 = this$1;
        super(resultContinuation, $box);
      }
      b6h($this$iterator, $completion) {
        var tmp = this.c6h($this$iterator, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.b6h(p1 instanceof SequenceScope() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 11;
                var tmp_0 = this;
                tmp_0.p6h_1 = this.m6h_1.e6i_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.r6h_1 = this.p6h_1;
                this.s6h_1 = this.r6h_1.i6f_1;
                this.t6h_1 = this.s6h_1.length - 2 | 0;
                this.u6h_1 = numberRangeToNumber(0, this.t6h_1).x();
                this.fd_1 = 2;
                continue $sm;
              case 2:
                if (!this.u6h_1.y()) {
                  this.fd_1 = 9;
                  continue $sm;
                }

                this.v6h_1 = this.u6h_1.z();
                this.w6h_1 = this.s6h_1[this.v6h_1];
                var this_0 = this.w6h_1;
                if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                  this.x6h_1 = 8 - (~(this.v6h_1 - this.t6h_1 | 0) >>> 31 | 0) | 0;
                  this.y6h_1 = until(0, this.x6h_1).x();
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  this.fd_1 = 8;
                  continue $sm;
                }

              case 3:
                if (!this.y6h_1.y()) {
                  this.fd_1 = 6;
                  continue $sm;
                }

                this.z6h_1 = this.y6h_1.z();
                if (this.w6h_1.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                  this.a6i_1 = (this.v6h_1 << 3) + this.z6h_1 | 0;
                  var tmp_1 = this;
                  tmp_1.b6i_1 = this.a6i_1;
                  this.c6i_1 = this.b6i_1;
                  this.n6h_1.f6i_1 = this.c6i_1;
                  this.fd_1 = 4;
                  var tmp_2 = this.m6h_1.e6i_1.j6f_1[this.c6i_1];
                  suspendResult = this.o6h_1.so((tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE(), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 5;
                  continue $sm;
                }

              case 4:
                this.fd_1 = 5;
                continue $sm;
              case 5:
                this.w6h_1 = this.w6h_1.q4(8);
                this.fd_1 = 3;
                continue $sm;
              case 6:
                if (!(this.x6h_1 === 8)) {
                  this.q6h_1 = Unit_instance;
                  this.fd_1 = 10;
                  continue $sm;
                } else {
                  this.fd_1 = 7;
                  continue $sm;
                }

              case 7:
                this.fd_1 = 8;
                continue $sm;
              case 8:
                this.fd_1 = 2;
                continue $sm;
              case 9:
                this.q6h_1 = Unit_instance;
                if (false) {
                  this.fd_1 = 1;
                  continue $sm;
                }

                this.fd_1 = 10;
                continue $sm;
              case 10:
                return Unit_instance;
              case 11:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 11) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      c6h($this$iterator, completion) {
        var i = new (MutableSetWrapper$iterator$o$iterator$slambda())(this.m6h_1, this.n6h_1, completion);
        i.o6h_1 = $this$iterator;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    MutableSetWrapper$iterator$o$iterator$slambdaClass = $;
  }
  return MutableSetWrapper$iterator$o$iterator$slambdaClass;
}
function MutableSetWrapper$iterator$o$iterator$slambda_0(this$0, this$1, resultContinuation) {
  var i = new (MutableSetWrapper$iterator$o$iterator$slambda())(this$0, this$1, resultContinuation);
  var l = function ($this$iterator, $completion) {
    return i.b6h($this$iterator, $completion);
  };
  l.$arity = 1;
  return l;
}
var MutableSetWrapper$iterator$1Class;
function MutableSetWrapper$iterator$1() {
  if (MutableSetWrapper$iterator$1Class === VOID) {
    class $ {
      constructor(this$0) {
        this.h6i_1 = this$0;
        this.f6i_1 = -1;
        var tmp = this;
        tmp.g6i_1 = iterator(MutableSetWrapper$iterator$o$iterator$slambda_0(this$0, this, null));
      }
      y() {
        return this.g6i_1.y();
      }
      z() {
        return this.g6i_1.z();
      }
      z6() {
        if (!(this.f6i_1 === -1)) {
          this.h6i_1.e6i_1.w6f(this.f6i_1);
          this.f6i_1 = -1;
        }
      }
    }
    initMetadataForClass($);
    MutableSetWrapper$iterator$1Class = $;
  }
  return MutableSetWrapper$iterator$1Class;
}
var MutableSetWrapperClass;
function MutableSetWrapper() {
  if (MutableSetWrapperClass === VOID) {
    class $ extends SetWrapper() {
      constructor(parent) {
        super(parent);
        this.e6i_1 = parent;
      }
      i(element) {
        return this.e6i_1.i(element);
      }
      d1(elements) {
        return this.e6i_1.j6e(elements);
      }
      p3() {
        this.e6i_1.p3();
      }
      x() {
        return new (MutableSetWrapper$iterator$1())(this);
      }
      m3(element) {
        return this.e6i_1.m3(element);
      }
      o3(elements) {
        return this.e6i_1.o3(elements);
      }
    }
    initMetadataForClass($, 'MutableSetWrapper', VOID, VOID, [SetWrapper(), KtMutableSet()]);
    MutableSetWrapperClass = $;
  }
  return MutableSetWrapperClass;
}
function mutableScatterSetOf() {
  _init_properties_ScatterSet_kt__vy48mc();
  return new (MutableScatterSet())();
}
function mutableScatterSetOf_0(element1, element2) {
  _init_properties_ScatterSet_kt__vy48mc();
  // Inline function 'kotlin.apply' call
  var this_0 = new (MutableScatterSet())(2);
  this_0.t6f(element1);
  this_0.t6f(element2);
  return this_0;
}
var properties_initialized_ScatterSet_kt_dmj456;
function _init_properties_ScatterSet_kt__vy48mc() {
  if (!properties_initialized_ScatterSet_kt_dmj456) {
    properties_initialized_ScatterSet_kt_dmj456 = true;
    EmptyScatterSet = new (MutableScatterSet())(0);
  }
}
//region block: exports
export {
  MutableScatterSet as MutableScatterSetcffu86129j6b,
  ScatterSet as ScatterSet2hbfochhupan9,
  mutableScatterSetOf_0 as mutableScatterSetOf69e8opkemqij,
  mutableScatterSetOf as mutableScatterSetOfp6qdzgccnsa0,
};
//endregion

//# sourceMappingURL=ScatterSet.mjs.map
