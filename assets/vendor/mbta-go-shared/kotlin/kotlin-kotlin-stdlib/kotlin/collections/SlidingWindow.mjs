import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  AbstractList3ck35puwbp1e9 as AbstractList,
  Companion_instanceovl8he3jiijf as Companion_instance,
} from './AbstractList.mjs';
import { RandomAccess1jbw8sdogqb8x as RandomAccess } from './RandomAccess.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { EmptyIterator_instance23xvvm1c2fncv as EmptyIterator_instance } from './CollectionsKt.mjs';
import {
  iterator3f5i676wpaa3g as iterator,
  SequenceScope1coiso86pqzq2 as SequenceScope,
} from '../sequences/SequenceBuilder.mjs';
import { AbstractIterator1svf7vpi1lw8y as AbstractIterator } from './AbstractIterator.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { isArray1hxjqtqy632bc as isArray } from '../js/typeCheckUtils.mjs';
import {
  copyOf2ng0t8oizk6it as copyOf,
  fill3hcjvebk42tyx as fill,
} from './_ArraysJs.mjs';
import { terminateCollectionToArray12671uhv05xea as terminateCollectionToArray } from './collectionJs.mjs';
import { coerceAtMost322komnqp70ag as coerceAtMost } from '../ranges/_Ranges.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../coroutines/CoroutineImpl.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from './ArrayListJs.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../coroutines/intrinsics/Intrinsics.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function checkWindowSizeStep(size, step) {
  // Inline function 'kotlin.require' call
  if (!(size > 0 && step > 0)) {
    var message = !(size === step) ? 'Both size ' + size + ' and step ' + step + ' must be greater than zero.' : 'size ' + size + ' must be greater than zero.';
    throw IllegalArgumentException().q(toString(message));
  }
}
var MovingSubListClass;
function MovingSubList() {
  if (MovingSubListClass === VOID) {
    class $ extends AbstractList() {
      static q1(list) {
        var $this = this.qm();
        $this.n1_1 = list;
        $this.o1_1 = 0;
        $this.p1_1 = 0;
        return $this;
      }
      r1(fromIndex, toIndex) {
        Companion_instance.q6(fromIndex, toIndex, this.n1_1.c1());
        this.o1_1 = fromIndex;
        this.p1_1 = toIndex - fromIndex | 0;
      }
      e1(index) {
        Companion_instance.t7(index, this.p1_1);
        return this.n1_1.e1(this.o1_1 + index | 0);
      }
      c1() {
        return this.p1_1;
      }
    }
    initMetadataForClass($, 'MovingSubList', VOID, VOID, [AbstractList(), RandomAccess()]);
    MovingSubListClass = $;
  }
  return MovingSubListClass;
}
function windowedIterator(iterator_0, size, step, partialWindows, reuseBuffer) {
  if (!iterator_0.y())
    return EmptyIterator_instance;
  return iterator(windowedIterator$slambda_0(size, step, iterator_0, reuseBuffer, partialWindows, null));
}
var RingBuffer$iterator$1Class;
function RingBuffer$iterator$1() {
  if (RingBuffer$iterator$1Class === VOID) {
    class $ extends AbstractIterator() {
      constructor(this$0, $box) {
        if ($box === VOID)
          $box = {};
        $box.pp_1 = this$0;
        super($box);
        this.np_1 = this$0.tp_1;
        this.op_1 = this$0.sp_1;
      }
      jm() {
        if (this.np_1 === 0) {
          this.lm();
        } else {
          var tmp = this.pp_1.qp_1[this.op_1];
          this.km((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE());
          var tmp_0 = this;
          var tmp0 = this.pp_1;
          // Inline function 'kotlin.collections.RingBuffer.forward' call
          tmp_0.op_1 = (this.op_1 + 1 | 0) % tmp0.rp_1 | 0;
          this.np_1 = this.np_1 - 1 | 0;
        }
      }
    }
    initMetadataForClass($);
    RingBuffer$iterator$1Class = $;
  }
  return RingBuffer$iterator$1Class;
}
var RingBufferClass;
function RingBuffer() {
  if (RingBufferClass === VOID) {
    class $ extends AbstractList() {
      static up(buffer, filledSize) {
        var $this = this.qm();
        $this.qp_1 = buffer;
        // Inline function 'kotlin.require' call
        if (!(filledSize >= 0)) {
          var message = 'ring buffer filled size should not be negative but it is ' + filledSize;
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(filledSize <= $this.qp_1.length)) {
          var message_0 = 'ring buffer filled size: ' + filledSize + ' cannot be larger than the buffer size: ' + $this.qp_1.length;
          throw IllegalArgumentException().q(toString(message_0));
        }
        $this.rp_1 = $this.qp_1.length;
        $this.sp_1 = 0;
        $this.tp_1 = filledSize;
        return $this;
      }
      static vp(capacity) {
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp$ret$0 = Array(capacity);
        return this.up(tmp$ret$0, 0);
      }
      c1() {
        return this.tp_1;
      }
      e1(index) {
        Companion_instance.t7(index, this.tp_1);
        // Inline function 'kotlin.collections.RingBuffer.forward' call
        var tmp$ret$0 = (this.sp_1 + index | 0) % this.rp_1 | 0;
        var tmp = this.qp_1[tmp$ret$0];
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
      wp() {
        return this.tp_1 === this.rp_1;
      }
      x() {
        return new (RingBuffer$iterator$1())(this);
      }
      rn(array) {
        var tmp;
        if (array.length < this.tp_1) {
          // Inline function 'kotlin.collections.copyOf' call
          var newSize = this.tp_1;
          tmp = copyOf(array, newSize);
        } else {
          tmp = isArray(array) ? array : THROW_CCE();
        }
        var result = tmp;
        var size = this.tp_1;
        var widx = 0;
        var idx = this.sp_1;
        while (widx < size && idx < this.rp_1) {
          var tmp_0 = widx;
          var tmp_1 = this.qp_1[idx];
          result[tmp_0] = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
          widx = widx + 1 | 0;
          idx = idx + 1 | 0;
        }
        idx = 0;
        while (widx < size) {
          var tmp_2 = widx;
          var tmp_3 = this.qp_1[idx];
          result[tmp_2] = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
          widx = widx + 1 | 0;
          idx = idx + 1 | 0;
        }
        var tmp_4 = terminateCollectionToArray(size, result);
        return isArray(tmp_4) ? tmp_4 : THROW_CCE();
      }
      s8() {
        // Inline function 'kotlin.arrayOfNulls' call
        var size = this.tp_1;
        var tmp$ret$0 = Array(size);
        return this.rn(tmp$ret$0);
      }
      toArray() {
        return this.s8();
      }
      xp(maxCapacity) {
        var newCapacity = coerceAtMost((this.rp_1 + (this.rp_1 >> 1) | 0) + 1 | 0, maxCapacity);
        var tmp;
        if (this.sp_1 === 0) {
          // Inline function 'kotlin.collections.copyOf' call
          var this_0 = this.qp_1;
          tmp = copyOf(this_0, newCapacity);
        } else {
          // Inline function 'kotlin.arrayOfNulls' call
          var tmp$ret$1 = Array(newCapacity);
          tmp = this.rn(tmp$ret$1);
        }
        var newBuffer = tmp;
        return RingBuffer().up(newBuffer, this.tp_1);
      }
      yp(element) {
        if (this.wp()) {
          throw IllegalStateException().o5('ring buffer is full');
        }
        // Inline function 'kotlin.collections.RingBuffer.forward' call
        var tmp$ret$0 = (this.sp_1 + this.tp_1 | 0) % this.rp_1 | 0;
        this.qp_1[tmp$ret$0] = element;
        this.tp_1 = this.tp_1 + 1 | 0;
      }
      zp(n) {
        // Inline function 'kotlin.require' call
        if (!(n >= 0)) {
          var message = "n shouldn't be negative but it is " + n;
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(n <= this.tp_1)) {
          var message_0 = "n shouldn't be greater than the buffer size: n = " + n + ', size = ' + this.tp_1;
          throw IllegalArgumentException().q(toString(message_0));
        }
        if (n > 0) {
          var start = this.sp_1;
          // Inline function 'kotlin.collections.RingBuffer.forward' call
          var end = (start + n | 0) % this.rp_1 | 0;
          if (start > end) {
            fill(this.qp_1, null, start, this.rp_1);
            fill(this.qp_1, null, 0, end);
          } else {
            fill(this.qp_1, null, start, end);
          }
          this.sp_1 = end;
          this.tp_1 = this.tp_1 - n | 0;
        }
      }
    }
    initMetadataForClass($, 'RingBuffer', VOID, VOID, [AbstractList(), RandomAccess()]);
    RingBufferClass = $;
  }
  return RingBufferClass;
}
var windowedIterator$slambdaClass;
function windowedIterator$slambda() {
  if (windowedIterator$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.iq_1 = $size;
        $box.jq_1 = $step;
        $box.kq_1 = $iterator;
        $box.lq_1 = $reuseBuffer;
        $box.mq_1 = $partialWindows;
        super(resultContinuation, $box);
      }
      xq($this$iterator, $completion) {
        var tmp = this.yq($this$iterator, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.xq(p1 instanceof SequenceScope() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 21;
                this.oq_1 = coerceAtMost(this.iq_1, 1024);
                this.pq_1 = this.jq_1 - this.iq_1 | 0;
                if (this.pq_1 >= 0) {
                  this.qq_1 = ArrayList().w(this.oq_1);
                  this.rq_1 = 0;
                  var tmp_0 = this;
                  tmp_0.sq_1 = this.kq_1;
                  this.fd_1 = 12;
                  continue $sm;
                } else {
                  this.tq_1 = RingBuffer().vp(this.oq_1);
                  var tmp_1 = this;
                  tmp_1.uq_1 = this.kq_1;
                  this.fd_1 = 1;
                  continue $sm;
                }

              case 1:
                if (!this.uq_1.y()) {
                  this.fd_1 = 5;
                  continue $sm;
                }

                this.vq_1 = this.uq_1.z();
                this.tq_1.yp(this.vq_1);
                if (this.tq_1.wp()) {
                  if (this.tq_1.tp_1 < this.iq_1) {
                    this.tq_1 = this.tq_1.xp(this.iq_1);
                    this.fd_1 = 1;
                    continue $sm;
                  } else {
                    this.fd_1 = 2;
                    continue $sm;
                  }
                } else {
                  this.fd_1 = 4;
                  continue $sm;
                }

              case 2:
                this.fd_1 = 3;
                suspendResult = this.nq_1.so(this.lq_1 ? this.tq_1 : ArrayList().u(this.tq_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 3:
                this.tq_1.zp(this.jq_1);
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.fd_1 = 1;
                continue $sm;
              case 5:
                if (this.mq_1) {
                  this.fd_1 = 6;
                  continue $sm;
                } else {
                  this.fd_1 = 11;
                  continue $sm;
                }

              case 6:
                if (!(this.tq_1.tp_1 > this.jq_1)) {
                  this.fd_1 = 8;
                  continue $sm;
                }

                this.fd_1 = 7;
                suspendResult = this.nq_1.so(this.lq_1 ? this.tq_1 : ArrayList().u(this.tq_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 7:
                this.tq_1.zp(this.jq_1);
                this.fd_1 = 6;
                continue $sm;
              case 8:
                if (!this.tq_1.h1()) {
                  this.fd_1 = 9;
                  suspendResult = this.nq_1.so(this.tq_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 10;
                  continue $sm;
                }

              case 9:
                this.fd_1 = 10;
                continue $sm;
              case 10:
                this.fd_1 = 11;
                continue $sm;
              case 11:
                this.fd_1 = 20;
                continue $sm;
              case 12:
                if (!this.sq_1.y()) {
                  this.fd_1 = 16;
                  continue $sm;
                }

                this.wq_1 = this.sq_1.z();
                if (this.rq_1 > 0) {
                  this.rq_1 = this.rq_1 - 1 | 0;
                  this.fd_1 = 12;
                  continue $sm;
                } else {
                  this.fd_1 = 13;
                  continue $sm;
                }

              case 13:
                this.qq_1.i(this.wq_1);
                if (this.qq_1.c1() === this.iq_1) {
                  this.fd_1 = 14;
                  suspendResult = this.nq_1.so(this.qq_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 15;
                  continue $sm;
                }

              case 14:
                if (this.lq_1) {
                  this.qq_1.p3();
                } else
                  this.qq_1 = ArrayList().w(this.iq_1);
                this.rq_1 = this.pq_1;
                this.fd_1 = 15;
                continue $sm;
              case 15:
                this.fd_1 = 12;
                continue $sm;
              case 16:
                if (!this.qq_1.h1()) {
                  if (this.mq_1 || this.qq_1.c1() === this.iq_1) {
                    this.fd_1 = 17;
                    suspendResult = this.nq_1.so(this.qq_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    this.fd_1 = 18;
                    continue $sm;
                  }
                } else {
                  this.fd_1 = 19;
                  continue $sm;
                }

              case 17:
                this.fd_1 = 18;
                continue $sm;
              case 18:
                this.fd_1 = 19;
                continue $sm;
              case 19:
                this.fd_1 = 20;
                continue $sm;
              case 20:
                return Unit_instance;
              case 21:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 21) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      yq($this$iterator, completion) {
        var i = new (windowedIterator$slambda())(this.iq_1, this.jq_1, this.kq_1, this.lq_1, this.mq_1, completion);
        i.nq_1 = $this$iterator;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    windowedIterator$slambdaClass = $;
  }
  return windowedIterator$slambdaClass;
}
function windowedIterator$slambda_0($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation) {
  var i = new (windowedIterator$slambda())($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation);
  var l = function ($this$iterator, $completion) {
    return i.xq($this$iterator, $completion);
  };
  l.$arity = 1;
  return l;
}
//region block: exports
export {
  MovingSubList as MovingSubList31cw34af0kxls,
  checkWindowSizeStep as checkWindowSizeStepcg5bise2nnst,
  windowedIterator as windowedIterator1l52d653czu3r,
};
//endregion

//# sourceMappingURL=SlidingWindow.mjs.map
