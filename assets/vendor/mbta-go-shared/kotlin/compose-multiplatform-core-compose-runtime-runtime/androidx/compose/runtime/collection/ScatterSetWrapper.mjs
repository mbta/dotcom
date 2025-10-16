import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  SequenceScope1coiso86pqzq2 as SequenceScope,
  iterator3f5i676wpaa3g as iterator,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/sequences/SequenceBuilder.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/rangeTo.mjs';
import { until1jbpn0z3f8lbg as until } from '../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  Collection1k04j3hzsbod0 as Collection,
  KtSetjrjc7fhfd6b9 as KtSet,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_collection_ScatterSetWrapper$stable;
function wrapIntoSet(_this__u8e3s4) {
  return new (ScatterSetWrapper())(_this__u8e3s4);
}
var ScatterSetWrapper$iterator$slambdaClass;
function ScatterSetWrapper$iterator$slambda() {
  if (ScatterSetWrapper$iterator$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.i7j_1 = this$0;
        super(resultContinuation, $box);
      }
      d7k($this$iterator, $completion) {
        var tmp = this.e7k($this$iterator, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.d7k(p1 instanceof SequenceScope() ? p1 : THROW_CCE(), $completion);
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
                tmp_0.k7j_1 = this.i7j_1.w6z_1;
                this.l7j_1 = this.k7j_1;
                this.m7j_1 = this.l7j_1.j6f_1;
                var tmp_1 = this;
                tmp_1.n7j_1 = this.l7j_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.p7j_1 = this.n7j_1;
                this.q7j_1 = this.p7j_1.i6f_1;
                this.r7j_1 = this.q7j_1.length - 2 | 0;
                this.s7j_1 = numberRangeToNumber(0, this.r7j_1).x();
                this.fd_1 = 2;
                continue $sm;
              case 2:
                if (!this.s7j_1.y()) {
                  this.fd_1 = 9;
                  continue $sm;
                }

                this.t7j_1 = this.s7j_1.z();
                this.u7j_1 = this.q7j_1[this.t7j_1];
                var this_0 = this.u7j_1;
                if (!this_0.s4(this_0.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
                  this.v7j_1 = 8 - (~(this.t7j_1 - this.r7j_1 | 0) >>> 31 | 0) | 0;
                  this.w7j_1 = until(0, this.v7j_1).x();
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  this.fd_1 = 8;
                  continue $sm;
                }

              case 3:
                if (!this.w7j_1.y()) {
                  this.fd_1 = 6;
                  continue $sm;
                }

                this.x7j_1 = this.w7j_1.z();
                if (this.u7j_1.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                  this.y7j_1 = (this.t7j_1 << 3) + this.x7j_1 | 0;
                  var tmp_2 = this;
                  tmp_2.z7j_1 = this.y7j_1;
                  this.a7k_1 = this.z7j_1;
                  var tmp_3 = this;
                  var tmp_4 = this.m7j_1[this.a7k_1];
                  tmp_3.b7k_1 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
                  this.c7k_1 = this.b7k_1;
                  this.fd_1 = 4;
                  suspendResult = this.j7j_1.so(this.c7k_1, this);
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
                this.u7j_1 = this.u7j_1.q4(8);
                this.fd_1 = 3;
                continue $sm;
              case 6:
                if (!(this.v7j_1 === 8)) {
                  this.o7j_1 = Unit_instance;
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
                this.o7j_1 = Unit_instance;
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
      e7k($this$iterator, completion) {
        var i = new (ScatterSetWrapper$iterator$slambda())(this.i7j_1, completion);
        i.j7j_1 = $this$iterator;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    ScatterSetWrapper$iterator$slambdaClass = $;
  }
  return ScatterSetWrapper$iterator$slambdaClass;
}
function ScatterSetWrapper$iterator$slambda_0(this$0, resultContinuation) {
  var i = new (ScatterSetWrapper$iterator$slambda())(this$0, resultContinuation);
  var l = function ($this$iterator, $completion) {
    return i.d7k($this$iterator, $completion);
  };
  l.$arity = 1;
  return l;
}
var ScatterSetWrapperClass;
function ScatterSetWrapper() {
  if (ScatterSetWrapperClass === VOID) {
    class $ {
      constructor(set) {
        this.w6z_1 = set;
      }
      c1() {
        return this.w6z_1.c1();
      }
      h1() {
        return this.w6z_1.h1();
      }
      x() {
        return iterator(ScatterSetWrapper$iterator$slambda_0(this, null));
      }
      ao(elements) {
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.all' call
          var tmp;
          if (isInterface(elements, Collection())) {
            tmp = elements.h1();
          } else {
            tmp = false;
          }
          if (tmp) {
            tmp$ret$0 = true;
            break $l$block_0;
          }
          var _iterator__ex2g4s = elements.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (!this.w6z_1.j1(element)) {
              tmp$ret$0 = false;
              break $l$block_0;
            }
          }
          tmp$ret$0 = true;
        }
        return tmp$ret$0;
      }
      d3(elements) {
        return this.ao(elements);
      }
      zn(element) {
        return this.w6z_1.j1(element);
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.zn((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
    }
    initMetadataForClass($, 'ScatterSetWrapper', VOID, VOID, [KtSet()]);
    ScatterSetWrapperClass = $;
  }
  return ScatterSetWrapperClass;
}
//region block: init
androidx_compose_runtime_collection_ScatterSetWrapper$stable = 8;
//endregion
//region block: exports
export {
  ScatterSetWrapper as ScatterSetWrapper25xivzdih3nzf,
  wrapIntoSet as wrapIntoSet1nai7omhmas38,
};
//endregion

//# sourceMappingURL=ScatterSetWrapper.mjs.map
