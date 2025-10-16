import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { AbortFlowException2zdgh4w7z3hep as AbortFlowException } from './internal/FlowExceptions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from './FlowCollector.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { get_NULL2w9d0rq01h4d4 as get_NULL } from './internal/NullSurrogate.mjs';
import { checkOwnershipoyid8o0pxxr7 as checkOwnership } from './internal/FlowExceptions.common.mjs';
import { ensureActive2yo7199srjlgl as ensureActive } from '../Job.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function first(_this__u8e3s4, $completion) {
  var tmp = new ($firstCOROUTINE$())(_this__u8e3s4, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function firstOrNull(_this__u8e3s4, predicate, $completion) {
  var tmp = new ($firstOrNullCOROUTINE$())(_this__u8e3s4, predicate, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
var first$$inlined$collectWhile$2Class;
function first$$inlined$collectWhile$2() {
  if (first$$inlined$collectWhile$2Class === VOID) {
    class $ {
      constructor($result) {
        this.d2u_1 = $result;
      }
      e2u(value, $completion) {
        this.d2u_1._v = value;
        if (!false) {
          throw AbortFlowException().f2u(this);
        }
        return Unit_instance;
      }
      z2n(value, $completion) {
        return this.e2u((value == null ? true : !(value == null)) ? value : THROW_CCE(), $completion);
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, [FlowCollector()], [1]);
    first$$inlined$collectWhile$2Class = $;
  }
  return first$$inlined$collectWhile$2Class;
}
var $emitCOROUTINE$Class;
function $emitCOROUTINE$() {
  if ($emitCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, value, resultContinuation) {
        super(resultContinuation);
        this.o2u_1 = _this__u8e3s4;
        this.p2u_1 = value;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                var tmp_0 = this;
                tmp_0.q2u_1 = this.p2u_1;
                this.r2u_1 = this.q2u_1;
                this.fd_1 = 1;
                suspendResult = this.o2u_1.t2u_1(this.r2u_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                if (suspendResult) {
                  var tmp_1 = this;
                  this.o2u_1.u2u_1._v = this.r2u_1;
                  tmp_1.s2u_1 = false;
                  this.fd_1 = 2;
                  continue $sm;
                } else {
                  var tmp_2 = this;
                  tmp_2.s2u_1 = true;
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 2:
                var ARGUMENT = this.s2u_1;
                if (!ARGUMENT) {
                  throw AbortFlowException().f2u(this.o2u_1);
                } else {
                  this.fd_1 = 3;
                  continue $sm;
                }

              case 3:
                return Unit_instance;
              case 4:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 4) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $emitCOROUTINE$Class = $;
  }
  return $emitCOROUTINE$Class;
}
var firstOrNull$$inlined$collectWhile$1Class;
function firstOrNull$$inlined$collectWhile$1() {
  if (firstOrNull$$inlined$collectWhile$1Class === VOID) {
    class $ {
      constructor($predicate, $result) {
        this.t2u_1 = $predicate;
        this.u2u_1 = $result;
      }
      e2u(value, $completion) {
        var tmp = new ($emitCOROUTINE$())(this, value, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      z2n(value, $completion) {
        return this.e2u((value == null ? true : !(value == null)) ? value : THROW_CCE(), $completion);
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, [FlowCollector()], [1]);
    firstOrNull$$inlined$collectWhile$1Class = $;
  }
  return firstOrNull$$inlined$collectWhile$1Class;
}
var $firstCOROUTINE$Class;
function $firstCOROUTINE$() {
  if ($firstCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.k2t_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                this.l2t_1 = {_v: get_NULL()};
                var tmp_0 = this;
                tmp_0.m2t_1 = this.k2t_1;
                this.n2t_1 = this.m2t_1;
                var tmp_1 = this;
                tmp_1.o2t_1 = new (first$$inlined$collectWhile$2())(this.l2t_1);
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = this.n2t_1.b2o(this.o2t_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.gd_1 = 3;
                this.fd_1 = 4;
                continue $sm;
              case 2:
                this.gd_1 = 3;
                var tmp_2 = this.id_1;
                if (tmp_2 instanceof AbortFlowException()) {
                  var e = this.id_1;
                  checkOwnership(e, this.o2t_1);
                  ensureActive(this.ld());
                  this.fd_1 = 4;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 3:
                throw this.id_1;
              case 4:
                this.gd_1 = 3;
                if (this.l2t_1._v === get_NULL())
                  throw NoSuchElementException().m('Expected at least one element');
                var tmp_3 = this.l2t_1._v;
                return (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
            }
          } catch ($p) {
            var e_0 = $p;
            if (this.gd_1 === 3) {
              throw e_0;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_0;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $firstCOROUTINE$Class = $;
  }
  return $firstCOROUTINE$Class;
}
var $firstOrNullCOROUTINE$Class;
function $firstOrNullCOROUTINE$() {
  if ($firstOrNullCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, predicate, resultContinuation) {
        super(resultContinuation);
        this.x2t_1 = _this__u8e3s4;
        this.y2t_1 = predicate;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                this.z2t_1 = {_v: null};
                var tmp_0 = this;
                tmp_0.a2u_1 = this.x2t_1;
                this.b2u_1 = this.a2u_1;
                var tmp_1 = this;
                tmp_1.c2u_1 = new (firstOrNull$$inlined$collectWhile$1())(this.y2t_1, this.z2t_1);
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = this.b2u_1.b2o(this.c2u_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.gd_1 = 4;
                this.fd_1 = 3;
                continue $sm;
              case 2:
                this.gd_1 = 4;
                var tmp_2 = this.id_1;
                if (tmp_2 instanceof AbortFlowException()) {
                  var e = this.id_1;
                  checkOwnership(e, this.c2u_1);
                  ensureActive(this.ld());
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 3:
                this.gd_1 = 4;
                return this.z2t_1._v;
              case 4:
                throw this.id_1;
            }
          } catch ($p) {
            var e_0 = $p;
            if (this.gd_1 === 4) {
              throw e_0;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_0;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $firstOrNullCOROUTINE$Class = $;
  }
  return $firstOrNullCOROUTINE$Class;
}
//region block: exports
export {
  firstOrNull as firstOrNull3jjcu7fygcopr,
  first as firstvh3bah3c9r20,
};
//endregion

//# sourceMappingURL=Reduce.mjs.map
