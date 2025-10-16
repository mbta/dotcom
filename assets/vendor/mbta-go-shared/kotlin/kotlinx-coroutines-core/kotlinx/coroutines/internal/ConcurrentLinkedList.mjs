import {
  atomic$int$11d5swdyn6j0pu as atomic$int$1,
  atomic$ref$130aurmcwdfdf1 as atomic$ref$1,
} from '../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { NotCompleted1jonr7fgu2l3n as NotCompleted } from '../CancellableContinuationImpl.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Symbol17xuwzgi5g8ve as Symbol } from './Symbol.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_CLOSED() {
  _init_properties_ConcurrentLinkedList_kt__5gcgzy();
  return CLOSED;
}
var CLOSED;
var SegmentClass;
function Segment() {
  if (SegmentClass === VOID) {
    class $ extends ConcurrentLinkedListNode() {
      constructor(id, prev, pointers) {
        super(prev);
        this.n25_1 = id;
        this.o25_1 = atomic$int$1(pointers << 16);
      }
      e2g() {
        return this.o25_1.kotlinx$atomicfu$value === this.g2f() && !this.l2g();
      }
      f2g() {
        var tmp0 = this.o25_1;
        var tmp$ret$1;
        $l$block_0: {
          // Inline function 'kotlinx.coroutines.internal.addConditionally' call
          while (true) {
            var cur = tmp0.kotlinx$atomicfu$value;
            if (!(!(cur === this.g2f()) || this.l2g())) {
              tmp$ret$1 = false;
              break $l$block_0;
            }
            if (tmp0.atomicfu$compareAndSet(cur, cur + 65536 | 0)) {
              tmp$ret$1 = true;
              break $l$block_0;
            }
          }
        }
        return tmp$ret$1;
      }
      g2g() {
        return this.o25_1.atomicfu$addAndGet(-65536) === this.g2f() && !this.l2g();
      }
      d2g() {
        if (this.o25_1.atomicfu$incrementAndGet() === this.g2f()) {
          this.z6();
        }
      }
    }
    initMetadataForClass($, 'Segment', VOID, VOID, [ConcurrentLinkedListNode(), NotCompleted()]);
    SegmentClass = $;
  }
  return SegmentClass;
}
function close(_this__u8e3s4) {
  _init_properties_ConcurrentLinkedList_kt__5gcgzy();
  var cur = _this__u8e3s4;
  while (true) {
    // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed' call
    var this_0 = cur;
    // Inline function 'kotlin.let' call
    var it = access$_get_nextOrClosed__ywzond(this_0);
    var tmp;
    if (it === access$_get_CLOSED_$tConcurrentLinkedListKt_wmtpdy()) {
      return cur;
    } else {
      tmp = (it == null ? true : it instanceof ConcurrentLinkedListNode()) ? it : THROW_CCE();
    }
    var next = tmp;
    if (next === null) {
      if (cur.o2g())
        return cur;
    } else {
      cur = next;
    }
  }
}
function _SegmentOrClosed___init__impl__jnexvb(value) {
  return value;
}
function _get_value__a43j40($this) {
  return $this;
}
function _SegmentOrClosed___get_isClosed__impl__qmxmlo($this) {
  return _get_value__a43j40($this) === get_CLOSED();
}
function _SegmentOrClosed___get_segment__impl__jvcr9l($this) {
  var tmp;
  if (_get_value__a43j40($this) === get_CLOSED()) {
    var message = 'Does not contain segment';
    throw IllegalStateException().o5(toString(message));
  } else {
    var tmp_0 = _get_value__a43j40($this);
    tmp = tmp_0 instanceof Segment() ? tmp_0 : THROW_CCE();
  }
  return tmp;
}
function SegmentOrClosed__toString_impl_pzb2an($this) {
  return 'SegmentOrClosed(value=' + toString_0($this) + ')';
}
function SegmentOrClosed__hashCode_impl_4855hs($this) {
  return $this == null ? 0 : hashCode($this);
}
function SegmentOrClosed__equals_impl_6erq1g($this, other) {
  if (!(other instanceof SegmentOrClosed()))
    return false;
  var tmp0_other_with_cast = other instanceof SegmentOrClosed() ? other.z2i_1 : THROW_CCE();
  if (!equals($this, tmp0_other_with_cast))
    return false;
  return true;
}
var SegmentOrClosedClass;
function SegmentOrClosed() {
  if (SegmentOrClosedClass === VOID) {
    class $ {
      constructor(value) {
        this.z2i_1 = value;
      }
      toString() {
        return SegmentOrClosed__toString_impl_pzb2an(this.z2i_1);
      }
      hashCode() {
        return SegmentOrClosed__hashCode_impl_4855hs(this.z2i_1);
      }
      equals(other) {
        return SegmentOrClosed__equals_impl_6erq1g(this.z2i_1, other);
      }
    }
    initMetadataForClass($, 'SegmentOrClosed');
    SegmentOrClosedClass = $;
  }
  return SegmentOrClosedClass;
}
function _get_nextOrClosed__w0gmuv($this) {
  return $this.h2g_1.kotlinx$atomicfu$value;
}
function _get_aliveSegmentLeft__mr4ndu($this) {
  var cur = $this.m2g();
  while (!(cur === null) && cur.e2g())
    cur = cur.i2g_1.kotlinx$atomicfu$value;
  return cur;
}
function _get_aliveSegmentRight__7ulr0b($this) {
  // Inline function 'kotlinx.coroutines.assert' call
  var cur = ensureNotNull($this.j2g());
  while (cur.e2g()) {
    var tmp0_elvis_lhs = cur.j2g();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return cur;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    cur = tmp;
  }
  return cur;
}
function access$_get_nextOrClosed__ywzond($this) {
  return _get_nextOrClosed__w0gmuv($this);
}
var ConcurrentLinkedListNodeClass;
function ConcurrentLinkedListNode() {
  if (ConcurrentLinkedListNodeClass === VOID) {
    class $ {
      constructor(prev) {
        this.h2g_1 = atomic$ref$1(null);
        this.i2g_1 = atomic$ref$1(prev);
      }
      j2g() {
        // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed' call
        // Inline function 'kotlin.let' call
        var it = access$_get_nextOrClosed__ywzond(this);
        var tmp;
        if (it === access$_get_CLOSED_$tConcurrentLinkedListKt_wmtpdy()) {
          return null;
        } else {
          tmp = (it == null ? true : it instanceof ConcurrentLinkedListNode()) ? it : THROW_CCE();
        }
        return tmp;
      }
      k2g(value) {
        return this.h2g_1.atomicfu$compareAndSet(null, value);
      }
      l2g() {
        return this.j2g() == null;
      }
      m2g() {
        return this.i2g_1.kotlinx$atomicfu$value;
      }
      n2g() {
        // Inline function 'kotlinx.atomicfu.AtomicRef.lazySet' call
        this.i2g_1.kotlinx$atomicfu$value = null;
      }
      o2g() {
        return this.h2g_1.atomicfu$compareAndSet(null, get_CLOSED());
      }
      z6() {
        // Inline function 'kotlinx.coroutines.assert' call
        if (this.l2g())
          return Unit_instance;
        $l$loop_0: while (true) {
          var prev = _get_aliveSegmentLeft__mr4ndu(this);
          var next = _get_aliveSegmentRight__7ulr0b(this);
          var tmp0 = next.i2g_1;
          $l$block: {
            // Inline function 'kotlinx.atomicfu.update' call
            while (true) {
              var cur = tmp0.kotlinx$atomicfu$value;
              var upd = cur === null ? null : prev;
              if (tmp0.atomicfu$compareAndSet(cur, upd)) {
                break $l$block;
              }
            }
          }
          if (!(prev === null))
            prev.h2g_1.kotlinx$atomicfu$value = next;
          if (next.e2g() && !next.l2g())
            continue $l$loop_0;
          if (!(prev === null) && prev.e2g())
            continue $l$loop_0;
          return Unit_instance;
        }
      }
    }
    initMetadataForClass($, 'ConcurrentLinkedListNode');
    ConcurrentLinkedListNodeClass = $;
  }
  return ConcurrentLinkedListNodeClass;
}
function findSegmentInternal(_this__u8e3s4, id, createNewSegment) {
  _init_properties_ConcurrentLinkedList_kt__5gcgzy();
  var cur = _this__u8e3s4;
  $l$loop: while (cur.n25_1.d2(id) < 0 || cur.e2g()) {
    // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed' call
    var this_0 = cur;
    // Inline function 'kotlin.let' call
    var it = access$_get_nextOrClosed__ywzond(this_0);
    var tmp;
    if (it === access$_get_CLOSED_$tConcurrentLinkedListKt_wmtpdy()) {
      return _SegmentOrClosed___init__impl__jnexvb(get_CLOSED());
    } else {
      tmp = (it == null ? true : it instanceof ConcurrentLinkedListNode()) ? it : THROW_CCE();
    }
    var next = tmp;
    if (!(next == null)) {
      cur = next;
      continue $l$loop;
    }
    // Inline function 'kotlin.Long.plus' call
    var newTail = createNewSegment(cur.n25_1.f4(toLong(1)), cur);
    if (cur.k2g(newTail)) {
      if (cur.e2g()) {
        cur.z6();
      }
      cur = newTail;
    }
  }
  return _SegmentOrClosed___init__impl__jnexvb(cur);
}
function access$_get_CLOSED_$tConcurrentLinkedListKt_wmtpdy() {
  return get_CLOSED();
}
var properties_initialized_ConcurrentLinkedList_kt_kwt434;
function _init_properties_ConcurrentLinkedList_kt__5gcgzy() {
  if (!properties_initialized_ConcurrentLinkedList_kt_kwt434) {
    properties_initialized_ConcurrentLinkedList_kt_kwt434 = true;
    CLOSED = new (Symbol())('CLOSED');
  }
}
//region block: exports
export {
  _SegmentOrClosed___get_isClosed__impl__qmxmlo as _SegmentOrClosed___get_isClosed__impl__qmxmlo3e3mrt157zasn,
  _SegmentOrClosed___get_segment__impl__jvcr9l as _SegmentOrClosed___get_segment__impl__jvcr9l1chmpjvbuseuk,
  SegmentOrClosed as SegmentOrCloseds3xpxfs4wrg9,
  Segment as Segmentqmq1glevgieu,
  close as closefimrnzr4lu35,
  findSegmentInternal as findSegmentInternal35lxp6iondi3q,
};
//endregion

//# sourceMappingURL=ConcurrentLinkedList.mjs.map
