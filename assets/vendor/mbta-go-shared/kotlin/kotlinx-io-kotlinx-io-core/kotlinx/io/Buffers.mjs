import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { checkBoundsw7d8y6z7j2xc as checkBounds } from './-Util.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { indexOf1i2yqitz2lwb6 as indexOf } from './Segment.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function indexOf_0(_this__u8e3s4, byte, startIndex, endIndex) {
  startIndex = startIndex === VOID ? new (Long())(0, 0) : startIndex;
  endIndex = endIndex === VOID ? _this__u8e3s4.c1() : endIndex;
  // Inline function 'kotlin.comparisons.minOf' call
  var b = _this__u8e3s4.c1();
  var endOffset = endIndex.d2(b) <= 0 ? endIndex : b;
  checkBounds(_this__u8e3s4.c1(), startIndex, endOffset);
  if (startIndex.equals(endOffset))
    return new (Long())(-1, -1);
  // Inline function 'kotlinx.io.seek' call
  if (_this__u8e3s4.l2z_1 == null) {
    var o = new (Long())(-1, -1);
    if (o.equals(new (Long())(-1, -1))) {
      return new (Long())(-1, -1);
    }
    var segment = null;
    var offset = o;
    do {
      // Inline function 'kotlin.check' call
      if (!(endOffset.d2(offset) > 0)) {
        throw IllegalStateException().o5('Check failed.');
      }
      ensureNotNull(segment);
      var tmp = segment;
      // Inline function 'kotlin.comparisons.maxOf' call
      var a = startIndex.g4(offset).f2();
      var tmp_0 = Math.max(a, 0);
      var tmp0 = segment.c1();
      // Inline function 'kotlin.comparisons.minOf' call
      var b_0 = endOffset.g4(offset).f2();
      var tmp$ret$3 = Math.min(tmp0, b_0);
      var idx = indexOf(tmp, byte, tmp_0, tmp$ret$3);
      if (!(idx === -1)) {
        return offset.f4(toLong(idx));
      }
      var tmp0_0 = offset;
      // Inline function 'kotlin.Long.plus' call
      var other = segment.c1();
      offset = tmp0_0.f4(toLong(other));
      segment = segment.c30_1;
    }
     while (!(segment == null) && offset.d2(endOffset) < 0);
    return new (Long())(-1, -1);
  }
  if (_this__u8e3s4.c1().g4(startIndex).d2(startIndex) < 0) {
    var s = _this__u8e3s4.m2z_1;
    var offset_0 = _this__u8e3s4.c1();
    $l$loop: while (!(s == null) && offset_0.d2(startIndex) > 0) {
      offset_0 = offset_0.g4(toLong(s.z2z_1 - s.y2z_1 | 0));
      if (offset_0.d2(startIndex) <= 0)
        break $l$loop;
      s = s.d30_1;
    }
    var tmp0_1 = s;
    var o_0 = offset_0;
    if (o_0.equals(new (Long())(-1, -1))) {
      return new (Long())(-1, -1);
    }
    var segment_0 = tmp0_1;
    var offset_1 = o_0;
    do {
      // Inline function 'kotlin.check' call
      if (!(endOffset.d2(offset_1) > 0)) {
        throw IllegalStateException().o5('Check failed.');
      }
      ensureNotNull(segment_0);
      var tmp_1 = segment_0;
      // Inline function 'kotlin.comparisons.maxOf' call
      var a_0 = startIndex.g4(offset_1).f2();
      var tmp_2 = Math.max(a_0, 0);
      var tmp0_2 = segment_0.c1();
      // Inline function 'kotlin.comparisons.minOf' call
      var b_1 = endOffset.g4(offset_1).f2();
      var tmp$ret$8 = Math.min(tmp0_2, b_1);
      var idx_0 = indexOf(tmp_1, byte, tmp_2, tmp$ret$8);
      if (!(idx_0 === -1)) {
        return offset_1.f4(toLong(idx_0));
      }
      var tmp0_3 = offset_1;
      // Inline function 'kotlin.Long.plus' call
      var other_0 = segment_0.c1();
      offset_1 = tmp0_3.f4(toLong(other_0));
      segment_0 = segment_0.c30_1;
    }
     while (!(segment_0 == null) && offset_1.d2(endOffset) < 0);
    return new (Long())(-1, -1);
  } else {
    var s_0 = _this__u8e3s4.l2z_1;
    var offset_2 = new (Long())(0, 0);
    $l$loop_0: while (!(s_0 == null)) {
      var tmp0_4 = offset_2;
      // Inline function 'kotlin.Long.plus' call
      var other_1 = s_0.z2z_1 - s_0.y2z_1 | 0;
      var nextOffset = tmp0_4.f4(toLong(other_1));
      if (nextOffset.d2(startIndex) > 0)
        break $l$loop_0;
      s_0 = s_0.c30_1;
      offset_2 = nextOffset;
    }
    var tmp0_5 = s_0;
    var o_1 = offset_2;
    if (o_1.equals(new (Long())(-1, -1))) {
      return new (Long())(-1, -1);
    }
    var segment_1 = tmp0_5;
    var offset_3 = o_1;
    do {
      // Inline function 'kotlin.check' call
      if (!(endOffset.d2(offset_3) > 0)) {
        throw IllegalStateException().o5('Check failed.');
      }
      ensureNotNull(segment_1);
      var tmp_3 = segment_1;
      // Inline function 'kotlin.comparisons.maxOf' call
      var a_1 = startIndex.g4(offset_3).f2();
      var tmp_4 = Math.max(a_1, 0);
      var tmp0_6 = segment_1.c1();
      // Inline function 'kotlin.comparisons.minOf' call
      var b_2 = endOffset.g4(offset_3).f2();
      var tmp$ret$13 = Math.min(tmp0_6, b_2);
      var idx_1 = indexOf(tmp_3, byte, tmp_4, tmp$ret$13);
      if (!(idx_1 === -1)) {
        return offset_3.f4(toLong(idx_1));
      }
      var tmp0_7 = offset_3;
      // Inline function 'kotlin.Long.plus' call
      var other_2 = segment_1.c1();
      offset_3 = tmp0_7.f4(toLong(other_2));
      segment_1 = segment_1.c30_1;
    }
     while (!(segment_1 == null) && offset_3.d2(endOffset) < 0);
    return new (Long())(-1, -1);
  }
}
//region block: exports
export {
  indexOf_0 as indexOfnhqfh629ytad,
};
//endregion

//# sourceMappingURL=Buffers.mjs.map
