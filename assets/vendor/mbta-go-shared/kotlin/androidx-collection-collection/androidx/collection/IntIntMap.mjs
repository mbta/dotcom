import {
  normalizeCapacity3ebzihg7o4adm as normalizeCapacity,
  get_EmptyGroup3quv3ubythwh0 as get_EmptyGroup,
  loadedCapacity2ixp8rhrflbpr as loadedCapacity,
  unloadedCapacity3djxu9qdm2sj6 as unloadedCapacity,
  nextCapacity2etcq869vd6gg as nextCapacity,
} from './ScatterMap.mjs';
import { longArray288a0fctlmjmj as longArray } from '../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { fillzcylmep0vxyi as fill } from '../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { countTrailingZeroBits1k55x07cygoff as countTrailingZeroBits } from '../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  throwIllegalArgumentExceptiondtiudu44q2g3 as throwIllegalArgumentException,
  throwNoSuchElementException3dew1tww4kkg9 as throwNoSuchElementException,
} from './internal/RuntimeHelpers.mjs';
import {
  _ULong___init__impl__c78o9k1p6qzv0dh0bvg as _ULong___init__impl__c78o9k,
  _ULong___get_data__impl__fggpzb2qlkrfp9zs48z as _ULong___get_data__impl__fggpzb,
} from '../../../kotlin-kotlin-stdlib/kotlin/ULong.mjs';
import { ulongCompare29yg6v52hxi4l as ulongCompare } from '../../../kotlin-kotlin-stdlib/kotlin/UnsignedJs.mjs';
import { get_lastIndex1y2f6o9u8hnf7 as get_lastIndex } from '../../../kotlin-kotlin-stdlib/kotlin/collections/_Arrays.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { get_EmptyIntArray32jbyjriwi88s as get_EmptyIntArray } from './IntSet.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
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
  $this.h6b_1 = newCapacity;
  initializeMetadata($this, newCapacity);
  $this.f6b_1 = new Int32Array(newCapacity);
  $this.g6b_1 = new Int32Array(newCapacity);
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
  tmp.e6b_1 = tmp_0;
  var tmp0 = $this.e6b_1;
  // Inline function 'androidx.collection.writeRawMetadata' call
  var value = new (Long())(255, 0);
  var i = capacity >> 3;
  var b = (capacity & 7) << 3;
  tmp0[i] = tmp0[i].s4((new (Long())(255, 0)).p4(b).n4()).t4(value.p4(b));
  initializeGrowth($this);
}
function initializeGrowth($this) {
  $this.o6b_1 = loadedCapacity($this.p6b()) - $this.i6b_1 | 0;
}
function findInsertIndex($this, key) {
  // Inline function 'androidx.collection.hash' call
  var hash = imul(key, -862048943);
  var hash_0 = hash ^ hash << 16;
  // Inline function 'androidx.collection.h1' call
  var hash1 = hash_0 >>> 7 | 0;
  // Inline function 'androidx.collection.h2' call
  var hash2 = hash_0 & 127;
  var probeMask = $this.h6b_1;
  var probeOffset = hash1 & probeMask;
  var probeIndex = 0;
  $l$loop_0: while (true) {
    var tmp0 = $this.e6b_1;
    // Inline function 'androidx.collection.group' call
    var offset = probeOffset;
    var i = offset >> 3;
    var b = (offset & 7) << 3;
    var g = tmp0[i].r4(b).t4(tmp0[i + 1 | 0].p4(64 - b | 0).s4(toLong(b).m4().q4(63)));
    // Inline function 'androidx.collection.match' call
    // Inline function 'kotlin.Long.times' call
    var tmp$ret$4 = (new (Long())(16843009, 16843009)).h4(toLong(hash2));
    var x = g.u4(tmp$ret$4);
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
      if ($this.f6b_1[index] === key) {
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
  if ($this.o6b_1 === 0) {
    // Inline function 'androidx.collection.isDeleted' call
    // Inline function 'androidx.collection.readRawMetadata' call
    var offset_0 = index_0;
    tmp_0 = !$this.e6b_1[offset_0 >> 3].q4((offset_0 & 7) << 3).s4(new (Long())(255, 0)).equals(new (Long())(254, 0));
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    $this.q6b();
    index_0 = findFirstAvailableSlot($this, hash1);
  }
  $this.i6b_1 = $this.i6b_1 + 1 | 0;
  var tmp_1 = $this;
  var tmp_2 = $this.o6b_1;
  var tmp_3;
  // Inline function 'androidx.collection.isEmpty' call
  // Inline function 'androidx.collection.readRawMetadata' call
  var offset_1 = index_0;
  if ($this.e6b_1[offset_1 >> 3].q4((offset_1 & 7) << 3).s4(new (Long())(255, 0)).equals(new (Long())(128, 0))) {
    tmp_3 = 1;
  } else {
    tmp_3 = 0;
  }
  tmp_1.o6b_1 = tmp_2 - tmp_3 | 0;
  var tmp0_0 = $this.e6b_1;
  var tmp2 = $this.h6b_1;
  var tmp4 = index_0;
  // Inline function 'androidx.collection.writeMetadata' call
  // Inline function 'androidx.collection.writeRawMetadata' call
  var value = toLong(hash2);
  var i_0 = tmp4 >> 3;
  var b_0 = (tmp4 & 7) << 3;
  tmp0_0[i_0] = tmp0_0[i_0].s4((new (Long())(255, 0)).p4(b_0).n4()).t4(value.p4(b_0));
  var cloneIndex = ((tmp4 - 7 | 0) & tmp2) + (7 & tmp2) | 0;
  tmp0_0[cloneIndex >> 3] = tmp0_0[tmp4 >> 3];
  return ~index_0;
}
function findFirstAvailableSlot($this, hash1) {
  var probeMask = $this.h6b_1;
  var probeOffset = hash1 & probeMask;
  var probeIndex = 0;
  while (true) {
    var tmp0 = $this.e6b_1;
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
var MutableIntIntMapClass;
function MutableIntIntMap() {
  if (MutableIntIntMapClass === VOID) {
    class $ extends IntIntMap() {
      constructor(initialCapacity) {
        initialCapacity = initialCapacity === VOID ? 6 : initialCapacity;
        super();
        this.o6b_1 = 0;
        // Inline function 'androidx.collection.internal.requirePrecondition' call
        // Inline function 'kotlin.contracts.contract' call
        if (!(initialCapacity >= 0)) {
          var tmp$ret$1 = 'Capacity must be a positive value.';
          throwIllegalArgumentException(tmp$ret$1);
        }
        initializeStorage(this, unloadedCapacity(initialCapacity));
      }
      s43(key, value) {
        var index = findInsertIndex(this, key);
        if (index < 0)
          index = ~index;
        this.f6b_1[index] = key;
        this.g6b_1[index] = value;
      }
      q6b() {
        var tmp;
        if (this.h6b_1 > 8) {
          // Inline function 'kotlin.toULong' call
          var this_0 = this.i6b_1;
          var tmp0 = _ULong___init__impl__c78o9k(toLong(this_0));
          // Inline function 'kotlin.ULong.times' call
          var other = _ULong___init__impl__c78o9k(new (Long())(32, 0));
          var tmp0_0 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(tmp0).h4(_ULong___get_data__impl__fggpzb(other)));
          // Inline function 'kotlin.toULong' call
          var this_1 = this.h6b_1;
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
          this.r6b(nextCapacity(this.h6b_1));
        }
      }
      s6b() {
        var metadata = this.e6b_1;
        var capacity = this.h6b_1;
        var keys = this.f6b_1;
        var values = this.g6b_1;
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
          var k = keys[index];
          var hash = imul(k, -862048943);
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
            keys[targetIndex] = keys[index];
            keys[index] = 0;
            values[targetIndex] = values[index];
            values[index] = 0;
          } else {
            // Inline function 'androidx.collection.h2' call
            var hash2_1 = hash_0 & 127;
            // Inline function 'androidx.collection.writeRawMetadata' call
            var value_2 = toLong(hash2_1);
            var i_3 = targetIndex >> 3;
            var b_2 = (targetIndex & 7) << 3;
            metadata[i_3] = metadata[i_3].s4((new (Long())(255, 0)).p4(b_2).n4()).t4(value_2.p4(b_2));
            var oldKey = keys[targetIndex];
            keys[targetIndex] = keys[index];
            keys[index] = oldKey;
            var oldValue = values[targetIndex];
            values[targetIndex] = values[index];
            values[index] = oldValue;
            index = index - 1 | 0;
          }
          metadata[get_lastIndex(metadata)] = (new (Long())(0, -2147483648)).t4(metadata[0].s4(new (Long())(-1, 16777215)));
          index = index + 1 | 0;
        }
        initializeGrowth(this);
      }
      r6b(newCapacity) {
        var previousMetadata = this.e6b_1;
        var previousKeys = this.f6b_1;
        var previousValues = this.g6b_1;
        var previousCapacity = this.h6b_1;
        initializeStorage(this, newCapacity);
        var newMetadata = this.e6b_1;
        var newKeys = this.f6b_1;
        var newValues = this.g6b_1;
        var capacity = this.h6b_1;
        var inductionVariable = 0;
        if (inductionVariable < previousCapacity)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            // Inline function 'androidx.collection.isFull' call
            // Inline function 'androidx.collection.readRawMetadata' call
            if (previousMetadata[i >> 3].q4((i & 7) << 3).s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
              var previousKey = previousKeys[i];
              // Inline function 'androidx.collection.hash' call
              var hash = imul(previousKey, -862048943);
              var hash_0 = hash ^ hash << 16;
              // Inline function 'androidx.collection.h1' call
              var tmp$ret$3 = hash_0 >>> 7 | 0;
              var index = findFirstAvailableSlot(this, tmp$ret$3);
              // Inline function 'androidx.collection.h2' call
              var tmp$ret$4 = hash_0 & 127;
              // Inline function 'androidx.collection.writeMetadata' call
              // Inline function 'androidx.collection.writeRawMetadata' call
              var value = toLong(tmp$ret$4);
              var i_0 = index >> 3;
              var b = (index & 7) << 3;
              newMetadata[i_0] = newMetadata[i_0].s4((new (Long())(255, 0)).p4(b).n4()).t4(value.p4(b));
              var cloneIndex = ((index - 7 | 0) & capacity) + (7 & capacity) | 0;
              newMetadata[cloneIndex >> 3] = newMetadata[index >> 3];
              newKeys[index] = previousKey;
              newValues[index] = previousValues[i];
            }
          }
           while (inductionVariable < previousCapacity);
      }
    }
    initMetadataForClass($, 'MutableIntIntMap', MutableIntIntMap);
    MutableIntIntMapClass = $;
  }
  return MutableIntIntMapClass;
}
var IntIntMapClass;
function IntIntMap() {
  if (IntIntMapClass === VOID) {
    class $ {
      constructor() {
        this.e6b_1 = get_EmptyGroup();
        this.f6b_1 = get_EmptyIntArray();
        this.g6b_1 = get_EmptyIntArray();
        this.h6b_1 = 0;
        this.i6b_1 = 0;
      }
      p6b() {
        return this.h6b_1;
      }
      c1() {
        return this.i6b_1;
      }
      h1() {
        return this.i6b_1 === 0;
      }
      e1(key) {
        var index = this.u6b(key);
        if (index < 0) {
          throwNoSuchElementException('Cannot find value for key ' + key);
        }
        return this.g6b_1[index];
      }
      t6b(key) {
        return this.u6b(key) >= 0;
      }
      hashCode() {
        var hash = 0;
        // Inline function 'androidx.collection.IntIntMap.forEach' call
        var k = this.f6b_1;
        var v = this.g6b_1;
        $l$block: {
          // Inline function 'androidx.collection.IntIntMap.forEachIndexed' call
          var m = this.e6b_1;
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
                      hash = hash + (k[index] ^ v[index]) | 0;
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
        if (!(other instanceof IntIntMap())) {
          return false;
        }
        if (!(other.c1() === this.c1())) {
          return false;
        }
        // Inline function 'androidx.collection.IntIntMap.forEach' call
        var k = this.f6b_1;
        var v = this.g6b_1;
        $l$block: {
          // Inline function 'androidx.collection.IntIntMap.forEachIndexed' call
          var m = this.e6b_1;
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
                      var tmp0 = k[index];
                      var value = v[index];
                      var index_0 = other.u6b(tmp0);
                      if (index_0 < 0 || !(value === other.g6b_1[index_0])) {
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
        if (this.h1()) {
          return '{}';
        }
        var s = StringBuilder().f().ic(_Char___init__impl__6a9atx(123));
        var i = 0;
        // Inline function 'androidx.collection.IntIntMap.forEach' call
        var k = this.f6b_1;
        var v = this.g6b_1;
        $l$block: {
          // Inline function 'androidx.collection.IntIntMap.forEachIndexed' call
          var m = this.e6b_1;
          var lastIndex = m.length - 2 | 0;
          var inductionVariable = 0;
          if (inductionVariable <= lastIndex)
            do {
              var i_0 = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var slot = m[i_0];
              // Inline function 'androidx.collection.maskEmptyOrDeleted' call
              var this_0 = slot;
              if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                var bitCount = 8 - (~(i_0 - lastIndex | 0) >>> 31 | 0) | 0;
                var inductionVariable_0 = 0;
                if (inductionVariable_0 < bitCount)
                  do {
                    var j = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    // Inline function 'androidx.collection.isFull' call
                    if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                      var index = (i_0 << 3) + j | 0;
                      var tmp0 = k[index];
                      var value = v[index];
                      s.ej(tmp0);
                      s.hc('=');
                      s.ej(value);
                      i = i + 1 | 0;
                      if (i < this.i6b_1) {
                        s.ic(_Char___init__impl__6a9atx(44)).ic(_Char___init__impl__6a9atx(32));
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
             while (!(i_0 === lastIndex));
        }
        return s.ic(_Char___init__impl__6a9atx(125)).toString();
      }
      u6b(key) {
        // Inline function 'androidx.collection.hash' call
        var hash = imul(key, -862048943);
        var hash_0 = hash ^ hash << 16;
        // Inline function 'androidx.collection.h2' call
        var hash2 = hash_0 & 127;
        var probeMask = this.h6b_1;
        // Inline function 'androidx.collection.h1' call
        var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
        var probeIndex = 0;
        $l$loop_0: while (true) {
          var tmp0 = this.e6b_1;
          // Inline function 'androidx.collection.group' call
          var offset = probeOffset;
          var i = offset >> 3;
          var b = (offset & 7) << 3;
          var g = tmp0[i].r4(b).t4(tmp0[i + 1 | 0].p4(64 - b | 0).s4(toLong(b).m4().q4(63)));
          // Inline function 'androidx.collection.match' call
          // Inline function 'kotlin.Long.times' call
          var tmp$ret$4 = (new (Long())(16843009, 16843009)).h4(toLong(hash2));
          var x = g.u4(tmp$ret$4);
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
            if (this.f6b_1[index] === key) {
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
        return -1;
      }
    }
    initMetadataForClass($, 'IntIntMap');
    IntIntMapClass = $;
  }
  return IntIntMapClass;
}
//region block: exports
export {
  MutableIntIntMap as MutableIntIntMapelz2z51q90lw,
};
//endregion

//# sourceMappingURL=IntIntMap.mjs.map
