import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { SegmentPool_instance2tnq68w4zk3rz as SegmentPool_instance } from './SegmentPool.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import {
  toByte4i43936u611k as toByte,
  toShort36kaw0zjdq3ex as toShort,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        this.b32_1 = 8192;
        this.c32_1 = 1024;
      }
      d32() {
        return Segment().e32();
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
function init_kotlinx_io_Segment(_this__u8e3s4) {
  _this__u8e3s4.y2z_1 = 0;
  _this__u8e3s4.z2z_1 = 0;
  _this__u8e3s4.a30_1 = null;
  _this__u8e3s4.b30_1 = false;
  _this__u8e3s4.c30_1 = null;
  _this__u8e3s4.d30_1 = null;
}
var SegmentClass;
function Segment() {
  if (SegmentClass === VOID) {
    class $ {
      g31() {
        var tmp0_safe_receiver = this.a30_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f32();
        return tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
      }
      static e32() {
        var $this = createThis(this);
        init_kotlinx_io_Segment($this);
        $this.x2z_1 = new Int8Array(8192);
        $this.b30_1 = true;
        $this.a30_1 = null;
        return $this;
      }
      static g32(data, pos, limit, shareToken, owner) {
        var $this = createThis(this);
        init_kotlinx_io_Segment($this);
        $this.x2z_1 = data;
        $this.y2z_1 = pos;
        $this.z2z_1 = limit;
        $this.a30_1 = shareToken;
        $this.b30_1 = owner;
        return $this;
      }
      k30() {
        var tmp0_elvis_lhs = this.a30_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = SegmentPool_instance.h32();
          this.a30_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var t = tmp;
        var tmp_0 = this.y2z_1;
        var tmp_1 = this.z2z_1;
        // Inline function 'kotlin.also' call
        t.i32();
        return Segment().g32(this.x2z_1, tmp_0, tmp_1, t, false);
      }
      j31() {
        var result = this.c30_1;
        if (!(this.d30_1 == null)) {
          ensureNotNull(this.d30_1).c30_1 = this.c30_1;
        }
        if (!(this.c30_1 == null)) {
          ensureNotNull(this.c30_1).d30_1 = this.d30_1;
        }
        this.c30_1 = null;
        this.d30_1 = null;
        return result;
      }
      l30(segment) {
        segment.d30_1 = this;
        segment.c30_1 = this.c30_1;
        if (!(this.c30_1 == null)) {
          ensureNotNull(this.c30_1).d30_1 = segment;
        }
        this.c30_1 = segment;
        return segment;
      }
      h31(byteCount) {
        // Inline function 'kotlin.require' call
        if (!(byteCount > 0 && byteCount <= (this.z2z_1 - this.y2z_1 | 0))) {
          var message = 'byteCount out of range';
          throw IllegalArgumentException().q(toString(message));
        }
        var prefix;
        if (byteCount >= 1024) {
          prefix = this.k30();
        } else {
          prefix = SegmentPool_instance.b31();
          var tmp0 = this.x2z_1;
          var tmp2 = prefix.x2z_1;
          var tmp4 = this.y2z_1;
          // Inline function 'kotlin.collections.copyInto' call
          var endIndex = this.y2z_1 + byteCount | 0;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp = tmp0;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          arrayCopy(tmp, tmp2, 0, tmp4, endIndex);
        }
        prefix.z2z_1 = prefix.y2z_1 + byteCount | 0;
        this.y2z_1 = this.y2z_1 + byteCount | 0;
        if (!(this.d30_1 == null)) {
          ensureNotNull(this.d30_1).l30(prefix);
        } else {
          prefix.c30_1 = this;
          this.d30_1 = prefix;
        }
        return prefix;
      }
      m30() {
        // Inline function 'kotlin.check' call
        if (!!(this.d30_1 == null)) {
          var message = 'cannot compact';
          throw IllegalStateException().o5(toString(message));
        }
        if (!ensureNotNull(this.d30_1).b30_1)
          return this;
        var byteCount = this.z2z_1 - this.y2z_1 | 0;
        var availableByteCount = (8192 - ensureNotNull(this.d30_1).z2z_1 | 0) + (ensureNotNull(this.d30_1).g31() ? 0 : ensureNotNull(this.d30_1).y2z_1) | 0;
        if (byteCount > availableByteCount)
          return this;
        var predecessor = this.d30_1;
        this.i31(ensureNotNull(predecessor), byteCount);
        var successor = this.j31();
        // Inline function 'kotlin.check' call
        if (!(successor == null)) {
          throw IllegalStateException().o5('Check failed.');
        }
        SegmentPool_instance.q31(this);
        return predecessor;
      }
      m31(byte) {
        var _unary__edvuaz = this.z2z_1;
        this.z2z_1 = _unary__edvuaz + 1 | 0;
        this.x2z_1[_unary__edvuaz] = byte;
      }
      o31(short) {
        var data = this.x2z_1;
        var limit = this.z2z_1;
        var _unary__edvuaz = limit;
        limit = _unary__edvuaz + 1 | 0;
        data[_unary__edvuaz] = toByte((short >>> 8 | 0) & 255);
        var _unary__edvuaz_0 = limit;
        limit = _unary__edvuaz_0 + 1 | 0;
        data[_unary__edvuaz_0] = toByte(short & 255);
        this.z2z_1 = limit;
      }
      f30() {
        var _unary__edvuaz = this.y2z_1;
        this.y2z_1 = _unary__edvuaz + 1 | 0;
        return this.x2z_1[_unary__edvuaz];
      }
      h30() {
        var data = this.x2z_1;
        var pos = this.y2z_1;
        var _unary__edvuaz = pos;
        pos = _unary__edvuaz + 1 | 0;
        // Inline function 'kotlinx.io.and' call
        var tmp = (data[_unary__edvuaz] & 255) << 8;
        var _unary__edvuaz_0 = pos;
        pos = _unary__edvuaz_0 + 1 | 0;
        // Inline function 'kotlinx.io.and' call
        var tmp$ret$1 = data[_unary__edvuaz_0] & 255;
        var s = toShort(tmp | tmp$ret$1);
        this.y2z_1 = pos;
        return s;
      }
      i31(sink, byteCount) {
        // Inline function 'kotlin.check' call
        if (!sink.b30_1) {
          var message = 'only owner can write';
          throw IllegalStateException().o5(toString(message));
        }
        if ((sink.z2z_1 + byteCount | 0) > 8192) {
          if (sink.g31())
            throw IllegalArgumentException().wf();
          if (((sink.z2z_1 + byteCount | 0) - sink.y2z_1 | 0) > 8192)
            throw IllegalArgumentException().wf();
          var tmp0 = sink.x2z_1;
          var tmp2 = sink.x2z_1;
          var tmp4 = sink.y2z_1;
          // Inline function 'kotlin.collections.copyInto' call
          var endIndex = sink.z2z_1;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp = tmp0;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          arrayCopy(tmp, tmp2, 0, tmp4, endIndex);
          sink.z2z_1 = sink.z2z_1 - sink.y2z_1 | 0;
          sink.y2z_1 = 0;
        }
        var tmp0_0 = this.x2z_1;
        var tmp2_0 = sink.x2z_1;
        var tmp4_0 = sink.z2z_1;
        var tmp6 = this.y2z_1;
        // Inline function 'kotlin.collections.copyInto' call
        var endIndex_0 = this.y2z_1 + byteCount | 0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp_0 = tmp0_0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        arrayCopy(tmp_0, tmp2_0, tmp4_0, tmp6, endIndex_0);
        sink.z2z_1 = sink.z2z_1 + byteCount | 0;
        this.y2z_1 = this.y2z_1 + byteCount | 0;
      }
      s30(dst, dstStartOffset, dstEndOffset) {
        var len = dstEndOffset - dstStartOffset | 0;
        var tmp0 = this.x2z_1;
        var tmp6 = this.y2z_1;
        // Inline function 'kotlin.collections.copyInto' call
        var endIndex = this.y2z_1 + len | 0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp = tmp0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        arrayCopy(tmp, dst, dstStartOffset, tmp6, endIndex);
        this.y2z_1 = this.y2z_1 + len | 0;
      }
      e31(src, srcStartOffset, srcEndOffset) {
        var tmp2 = this.x2z_1;
        // Inline function 'kotlin.collections.copyInto' call
        var destinationOffset = this.z2z_1;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp = src;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        arrayCopy(tmp, tmp2, destinationOffset, srcStartOffset, srcEndOffset);
        this.z2z_1 = this.z2z_1 + (srcEndOffset - srcStartOffset | 0) | 0;
      }
      c1() {
        return this.z2z_1 - this.y2z_1 | 0;
      }
      d31() {
        return this.x2z_1.length - this.z2z_1 | 0;
      }
      j32(readOnly) {
        return this.x2z_1;
      }
      p30(index) {
        return this.x2z_1[this.y2z_1 + index | 0];
      }
      k32(index, value) {
        this.x2z_1[this.z2z_1 + index | 0] = value;
      }
      l32(index, b0, b1) {
        var d = this.x2z_1;
        var l = this.z2z_1;
        d[l + index | 0] = b0;
        d[(l + index | 0) + 1 | 0] = b1;
      }
      m32(index, b0, b1, b2) {
        var d = this.x2z_1;
        var l = this.z2z_1;
        d[l + index | 0] = b0;
        d[(l + index | 0) + 1 | 0] = b1;
        d[(l + index | 0) + 2 | 0] = b2;
      }
      n32(index, b0, b1, b2, b3) {
        var d = this.x2z_1;
        var l = this.z2z_1;
        d[l + index | 0] = b0;
        d[(l + index | 0) + 1 | 0] = b1;
        d[(l + index | 0) + 2 | 0] = b2;
        d[(l + index | 0) + 3 | 0] = b3;
      }
    }
    initMetadataForClass($, 'Segment');
    SegmentClass = $;
  }
  return SegmentClass;
}
var SegmentCopyTrackerClass;
function SegmentCopyTracker() {
  if (SegmentCopyTrackerClass === VOID) {
    class $ {}
    initMetadataForClass($, 'SegmentCopyTracker');
    SegmentCopyTrackerClass = $;
  }
  return SegmentCopyTrackerClass;
}
function isEmpty(_this__u8e3s4) {
  return _this__u8e3s4.c1() === 0;
}
var AlwaysSharedCopyTrackerClass;
function AlwaysSharedCopyTracker() {
  if (AlwaysSharedCopyTrackerClass === VOID) {
    class $ extends SegmentCopyTracker() {
      constructor() {
        AlwaysSharedCopyTracker_instance = null;
        super();
        AlwaysSharedCopyTracker_instance = this;
      }
      f32() {
        return true;
      }
      i32() {
        return Unit_instance;
      }
    }
    initMetadataForObject($, 'AlwaysSharedCopyTracker');
    AlwaysSharedCopyTrackerClass = $;
  }
  return AlwaysSharedCopyTrackerClass;
}
var AlwaysSharedCopyTracker_instance;
function AlwaysSharedCopyTracker_getInstance() {
  if (AlwaysSharedCopyTracker_instance === VOID)
    new (AlwaysSharedCopyTracker())();
  return AlwaysSharedCopyTracker_instance;
}
function indexOf(_this__u8e3s4, byte, startOffset, endOffset) {
  // Inline function 'kotlin.require' call
  if (!(0 <= startOffset ? startOffset < _this__u8e3s4.c1() : false)) {
    var message = '' + startOffset;
    throw IllegalArgumentException().q(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!(startOffset <= endOffset ? endOffset <= _this__u8e3s4.c1() : false)) {
    var message_0 = '' + endOffset;
    throw IllegalArgumentException().q(toString(message_0));
  }
  var p = _this__u8e3s4.y2z_1;
  var data = _this__u8e3s4.j32(true);
  var inductionVariable = startOffset;
  if (inductionVariable < endOffset)
    do {
      var idx = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (data[p + idx | 0] === byte) {
        return idx;
      }
    }
     while (inductionVariable < endOffset);
  return -1;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  AlwaysSharedCopyTracker_getInstance as AlwaysSharedCopyTracker_getInstance2jydy734jdx86,
  Companion_instance as Companion_instance29y027cxvr5b5,
  indexOf as indexOf1i2yqitz2lwb6,
  isEmpty as isEmpty39cntv762vey6,
};
//endregion

//# sourceMappingURL=Segment.mjs.map
