import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  SequenceScope1coiso86pqzq2 as SequenceScope,
  sequence2vgswtrxvqoa7 as sequence,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/sequences/SequenceBuilder.mjs';
import { doubleArrayIterator3t8gohbqilipn as doubleArrayIterator } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { until1jbpn0z3f8lbg as until } from '../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import {
  toLongw1zpgk99d84b as toLong,
  numberToInt1ygmcfwhs2fkq as numberToInt,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import {
  binarySearch1e9v9nze0vgzk as binarySearch,
  withIdInsertedAtf1wjktllyjru as withIdInsertedAt,
  SnapshotIdArrayBuildermmqxydyw4hvj as SnapshotIdArrayBuilder,
  withIdRemovedAt1thnsbu30tlmc as withIdRemovedAt,
} from './SnapshotId.js.mjs';
import {
  equals2au1ep9vhcato as equals,
  anyToString3ho3k49fc56mj as anyToString,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { countTrailingZeroBits1k55x07cygoff as countTrailingZeroBits } from '../../../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { fastJoinToString3fmn550rqarje as fastJoinToString } from './ListUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_snapshots_SnapshotIdSet$stable;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.v7o_1 = new (SnapshotIdSet())(new (Long())(0, 0), new (Long())(0, 0), 0.0, null);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function access$_get_upperSet__2kurhn($this) {
  return $this.l7o_1;
}
function access$_get_lowerSet__9mjss6($this) {
  return $this.m7o_1;
}
function access$_get_lowerBound__ou44uq($this) {
  return $this.n7o_1;
}
function access$_get_belowBound__uc78e($this) {
  return $this.o7o_1;
}
var SnapshotIdSet$iterator$slambdaClass;
function SnapshotIdSet$iterator$slambda() {
  if (SnapshotIdSet$iterator$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.k7r_1 = this$0;
        super(resultContinuation, $box);
      }
      y7r($this$sequence, $completion) {
        var tmp = this.z7r($this$sequence, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.y7r(p1 instanceof SequenceScope() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 15;
                this.m7r_1 = this.k7r_1.o7o_1;
                if (this.m7r_1 == null) {
                  this.n7r_1 = null;
                  this.fd_1 = 4;
                  continue $sm;
                } else {
                  var tmp_0 = this;
                  tmp_0.o7r_1 = this.m7r_1;
                  this.p7r_1 = this.o7r_1;
                  this.q7r_1 = doubleArrayIterator(this.p7r_1);
                  this.fd_1 = 1;
                  continue $sm;
                }

              case 1:
                if (!this.q7r_1.y()) {
                  this.fd_1 = 3;
                  continue $sm;
                }

                this.r7r_1 = this.q7r_1.z();
                var tmp_1 = this;
                tmp_1.s7r_1 = this.r7r_1;
                this.t7r_1 = this.s7r_1;
                this.fd_1 = 2;
                suspendResult = this.l7r_1.so(this.t7r_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.fd_1 = 1;
                continue $sm;
              case 3:
                this.n7r_1 = Unit_instance;
                this.fd_1 = 4;
                continue $sm;
              case 4:
                if (!this.k7r_1.m7o_1.equals(new (Long())(0, 0))) {
                  this.u7r_1 = until(0, 64).x();
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  this.fd_1 = 9;
                  continue $sm;
                }

              case 5:
                if (!this.u7r_1.y()) {
                  this.fd_1 = 8;
                  continue $sm;
                }

                this.v7r_1 = this.u7r_1.z();
                if (!this.k7r_1.m7o_1.s4((new (Long())(1, 0)).p4(this.v7r_1)).equals(new (Long())(0, 0))) {
                  this.fd_1 = 6;
                  var tmp0 = this.k7r_1.n7o_1;
                  var other = this.v7r_1;
                  suspendResult = this.l7r_1.so(tmp0 + toLong(other).y4(), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 7;
                  continue $sm;
                }

              case 6:
                this.fd_1 = 7;
                continue $sm;
              case 7:
                this.fd_1 = 5;
                continue $sm;
              case 8:
                this.fd_1 = 9;
                continue $sm;
              case 9:
                if (!this.k7r_1.l7o_1.equals(new (Long())(0, 0))) {
                  this.w7r_1 = until(0, 64).x();
                  this.fd_1 = 10;
                  continue $sm;
                } else {
                  this.fd_1 = 14;
                  continue $sm;
                }

              case 10:
                if (!this.w7r_1.y()) {
                  this.fd_1 = 13;
                  continue $sm;
                }

                this.x7r_1 = this.w7r_1.z();
                if (!this.k7r_1.l7o_1.s4((new (Long())(1, 0)).p4(this.x7r_1)).equals(new (Long())(0, 0))) {
                  this.fd_1 = 11;
                  var tmp0_0 = this.k7r_1.n7o_1;
                  var other_0 = this.x7r_1;
                  var this_0 = tmp0_0 + toLong(other_0).y4();
                  suspendResult = this.l7r_1.so(this_0 + toLong(64).y4(), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 12;
                  continue $sm;
                }

              case 11:
                this.fd_1 = 12;
                continue $sm;
              case 12:
                this.fd_1 = 10;
                continue $sm;
              case 13:
                this.fd_1 = 14;
                continue $sm;
              case 14:
                return Unit_instance;
              case 15:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 15) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      z7r($this$sequence, completion) {
        var i = new (SnapshotIdSet$iterator$slambda())(this.k7r_1, completion);
        i.l7r_1 = $this$sequence;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    SnapshotIdSet$iterator$slambdaClass = $;
  }
  return SnapshotIdSet$iterator$slambdaClass;
}
function SnapshotIdSet$iterator$slambda_0(this$0, resultContinuation) {
  var i = new (SnapshotIdSet$iterator$slambda())(this$0, resultContinuation);
  var l = function ($this$sequence, $completion) {
    return i.y7r($this$sequence, $completion);
  };
  l.$arity = 1;
  return l;
}
var SnapshotIdSetClass;
function SnapshotIdSet() {
  if (SnapshotIdSetClass === VOID) {
    class $ {
      constructor(upperSet, lowerSet, lowerBound, belowBound) {
        Companion_getInstance();
        this.l7o_1 = upperSet;
        this.m7o_1 = lowerSet;
        this.n7o_1 = lowerBound;
        this.o7o_1 = belowBound;
      }
      w7q(id) {
        // Inline function 'androidx.compose.runtime.snapshots.minus' call
        var offset = id - this.n7o_1;
        var tmp;
        var tmp_0;
        // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
        if (compareTo(offset, toLong(0)) >= 0) {
          // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
          tmp_0 = compareTo(offset, toLong(64)) < 0;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          var tmp_1 = new (Long())(1, 0);
          // Inline function 'androidx.compose.runtime.snapshots.toInt' call
          var tmp$ret$3 = numberToInt(offset);
          tmp = !tmp_1.p4(tmp$ret$3).s4(this.m7o_1).equals(new (Long())(0, 0));
        } else {
          var tmp_2;
          // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
          if (compareTo(offset, toLong(64)) >= 0) {
            // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
            tmp_2 = compareTo(offset, toLong(128)) < 0;
          } else {
            tmp_2 = false;
          }
          if (tmp_2) {
            var tmp_3 = new (Long())(1, 0);
            // Inline function 'androidx.compose.runtime.snapshots.toInt' call
            var tmp$ret$6 = numberToInt(offset);
            tmp = !tmp_3.p4(tmp$ret$6 - 64 | 0).s4(this.l7o_1).equals(new (Long())(0, 0));
          } else {
            // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
            if (compareTo(offset, toLong(0)) > 0) {
              tmp = false;
            } else {
              var tmp0_safe_receiver = this.o7o_1;
              var tmp_4;
              if (tmp0_safe_receiver == null) {
                tmp_4 = null;
              } else {
                // Inline function 'kotlin.let' call
                tmp_4 = binarySearch(tmp0_safe_receiver, id) >= 0;
              }
              var tmp1_elvis_lhs = tmp_4;
              tmp = tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
            }
          }
        }
        return tmp;
      }
      z7o(id) {
        // Inline function 'androidx.compose.runtime.snapshots.minus' call
        var offset = id - this.n7o_1;
        var tmp;
        // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
        if (compareTo(offset, toLong(0)) >= 0) {
          // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
          tmp = compareTo(offset, toLong(64)) < 0;
        } else {
          tmp = false;
        }
        if (tmp) {
          var tmp_0 = new (Long())(1, 0);
          // Inline function 'androidx.compose.runtime.snapshots.toInt' call
          var tmp$ret$3 = numberToInt(offset);
          var mask = tmp_0.p4(tmp$ret$3);
          if (this.m7o_1.s4(mask).equals(new (Long())(0, 0))) {
            return new (SnapshotIdSet())(this.l7o_1, this.m7o_1.t4(mask), this.n7o_1, this.o7o_1);
          }
        } else {
          var tmp_1;
          // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
          if (compareTo(offset, toLong(64)) >= 0) {
            // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
            tmp_1 = compareTo(offset, toLong(128)) < 0;
          } else {
            tmp_1 = false;
          }
          if (tmp_1) {
            var tmp_2 = new (Long())(1, 0);
            // Inline function 'androidx.compose.runtime.snapshots.toInt' call
            var tmp$ret$6 = numberToInt(offset);
            var mask_0 = tmp_2.p4(tmp$ret$6 - 64 | 0);
            if (this.l7o_1.s4(mask_0).equals(new (Long())(0, 0))) {
              return new (SnapshotIdSet())(this.l7o_1.t4(mask_0), this.m7o_1, this.n7o_1, this.o7o_1);
            }
          } else {
            // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
            if (compareTo(offset, toLong(128)) >= 0) {
              if (!this.w7q(id)) {
                var newUpperSet = this.l7o_1;
                var newLowerSet = this.m7o_1;
                var newLowerBound = this.n7o_1;
                var newBelowBound = null;
                // Inline function 'androidx.compose.runtime.snapshots.plus' call
                // Inline function 'androidx.compose.runtime.snapshots.div' call
                // Inline function 'androidx.compose.runtime.snapshots.times' call
                // Inline function 'kotlin.let' call
                var it = (id + toLong(1).y4()) / toLong(64).y4() * toLong(64).y4();
                var tmp_3;
                // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
                if (compareTo(it, toLong(0)) < 0) {
                  // Inline function 'androidx.compose.runtime.snapshots.minus' call
                  // Inline function 'androidx.compose.runtime.snapshots.plus' call
                  tmp_3 = 1.7976931348623157E308 - toLong(128).y4() + toLong(1).y4();
                } else {
                  tmp_3 = it;
                }
                var targetLowerBound = tmp_3;
                $l$loop_0: while (true) {
                  // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
                  var this_0 = newLowerBound;
                  if (!(compareTo(this_0, targetLowerBound) < 0)) {
                    break $l$loop_0;
                  }
                  if (!newLowerSet.equals(new (Long())(0, 0))) {
                    if (newBelowBound == null)
                      newBelowBound = new (SnapshotIdArrayBuilder())(this.o7o_1);
                    // Inline function 'kotlin.repeat' call
                    var inductionVariable = 0;
                    if (inductionVariable < 64)
                      do {
                        var index = inductionVariable;
                        inductionVariable = inductionVariable + 1 | 0;
                        if (!newLowerSet.s4((new (Long())(1, 0)).p4(index)).equals(new (Long())(0, 0))) {
                          var tmp_4 = newBelowBound;
                          // Inline function 'androidx.compose.runtime.snapshots.plus' call
                          var tmp$ret$17 = newLowerBound + toLong(index).y4();
                          tmp_4.b7s(tmp$ret$17);
                        }
                      }
                       while (inductionVariable < 64);
                  }
                  if (newUpperSet.equals(new (Long())(0, 0))) {
                    newLowerBound = targetLowerBound;
                    newLowerSet = new (Long())(0, 0);
                    break $l$loop_0;
                  }
                  newLowerSet = newUpperSet;
                  newUpperSet = new (Long())(0, 0);
                  // Inline function 'androidx.compose.runtime.snapshots.plus' call
                  newLowerBound = newLowerBound + toLong(64).y4();
                }
                var tmp_5 = newUpperSet;
                var tmp_6 = newLowerSet;
                var tmp_7 = newLowerBound;
                var tmp0_safe_receiver = newBelowBound;
                var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.s8();
                return (new (SnapshotIdSet())(tmp_5, tmp_6, tmp_7, tmp1_elvis_lhs == null ? this.o7o_1 : tmp1_elvis_lhs)).z7o(id);
              }
            } else {
              var tmp2_elvis_lhs = this.o7o_1;
              var tmp_8;
              if (tmp2_elvis_lhs == null) {
                // Inline function 'androidx.compose.runtime.snapshots.snapshotIdArrayOf' call
                // Inline function 'kotlin.doubleArrayOf' call
                var tmp$ret$22 = new Float64Array([id]);
                return new (SnapshotIdSet())(this.l7o_1, this.m7o_1, this.n7o_1, tmp$ret$22);
              } else {
                tmp_8 = tmp2_elvis_lhs;
              }
              var array = tmp_8;
              var location = binarySearch(array, id);
              if (location < 0) {
                var insertLocation = -(location + 1 | 0) | 0;
                var newBelowBound_0 = withIdInsertedAt(array, insertLocation, id);
                return new (SnapshotIdSet())(this.l7o_1, this.m7o_1, this.n7o_1, newBelowBound_0);
              }
            }
          }
        }
        return this;
      }
      p7o(id) {
        // Inline function 'androidx.compose.runtime.snapshots.minus' call
        var offset = id - this.n7o_1;
        var tmp;
        // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
        if (compareTo(offset, toLong(0)) >= 0) {
          // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
          tmp = compareTo(offset, toLong(64)) < 0;
        } else {
          tmp = false;
        }
        if (tmp) {
          var tmp_0 = new (Long())(1, 0);
          // Inline function 'androidx.compose.runtime.snapshots.toInt' call
          var tmp$ret$3 = numberToInt(offset);
          var mask = tmp_0.p4(tmp$ret$3);
          if (!this.m7o_1.s4(mask).equals(new (Long())(0, 0))) {
            return new (SnapshotIdSet())(this.l7o_1, this.m7o_1.s4(mask.n4()), this.n7o_1, this.o7o_1);
          }
        } else {
          var tmp_1;
          // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
          if (compareTo(offset, toLong(64)) >= 0) {
            // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
            tmp_1 = compareTo(offset, toLong(128)) < 0;
          } else {
            tmp_1 = false;
          }
          if (tmp_1) {
            var tmp_2 = new (Long())(1, 0);
            // Inline function 'androidx.compose.runtime.snapshots.toInt' call
            var tmp$ret$6 = numberToInt(offset);
            var mask_0 = tmp_2.p4(tmp$ret$6 - 64 | 0);
            if (!this.l7o_1.s4(mask_0).equals(new (Long())(0, 0))) {
              return new (SnapshotIdSet())(this.l7o_1.s4(mask_0.n4()), this.m7o_1, this.n7o_1, this.o7o_1);
            }
          } else {
            // Inline function 'androidx.compose.runtime.snapshots.compareTo' call
            if (compareTo(offset, toLong(0)) < 0) {
              var array = this.o7o_1;
              if (!(array == null)) {
                var location = binarySearch(array, id);
                if (location >= 0) {
                  return new (SnapshotIdSet())(this.l7o_1, this.m7o_1, this.n7o_1, withIdRemovedAt(array, location));
                }
              }
            }
          }
        }
        return this;
      }
      e7p(ids) {
        if (ids === Companion_getInstance().v7o_1)
          return this;
        if (this === Companion_getInstance().v7o_1)
          return Companion_getInstance().v7o_1;
        var tmp;
        if (equals(ids.n7o_1, this.n7o_1) && ids.o7o_1 === this.o7o_1) {
          tmp = new (SnapshotIdSet())(this.l7o_1.s4(ids.l7o_1.n4()), this.m7o_1.s4(ids.m7o_1.n4()), this.n7o_1, this.o7o_1);
        } else {
          // Inline function 'androidx.compose.runtime.snapshots.SnapshotIdSet.fastFold' call
          var accumulator = this;
          // Inline function 'androidx.compose.runtime.snapshots.SnapshotIdSet.fastForEach' call
          var tmp0_safe_receiver = access$_get_belowBound__uc78e(ids);
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'androidx.compose.runtime.snapshots.forEach' call
            var inductionVariable = 0;
            var last = tmp0_safe_receiver.length;
            while (inductionVariable < last) {
              var value = tmp0_safe_receiver[inductionVariable];
              inductionVariable = inductionVariable + 1 | 0;
              accumulator = accumulator.p7o(value);
            }
          }
          if (!access$_get_lowerSet__9mjss6(ids).equals(new (Long())(0, 0))) {
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < 64)
              do {
                var index = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                if (!access$_get_lowerSet__9mjss6(ids).s4((new (Long())(1, 0)).p4(index)).equals(new (Long())(0, 0))) {
                  // Inline function 'androidx.compose.runtime.snapshots.plus' call
                  var element = access$_get_lowerBound__ou44uq(ids) + toLong(index).y4();
                  accumulator = accumulator.p7o(element);
                }
              }
               while (inductionVariable_0 < 64);
          }
          if (!access$_get_upperSet__2kurhn(ids).equals(new (Long())(0, 0))) {
            var inductionVariable_1 = 0;
            if (inductionVariable_1 < 64)
              do {
                var index_0 = inductionVariable_1;
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                if (!access$_get_upperSet__2kurhn(ids).s4((new (Long())(1, 0)).p4(index_0)).equals(new (Long())(0, 0))) {
                  // Inline function 'androidx.compose.runtime.snapshots.plus' call
                  // Inline function 'androidx.compose.runtime.snapshots.plus' call
                  var element_0 = access$_get_lowerBound__ou44uq(ids) + toLong(index_0).y4() + toLong(64).y4();
                  accumulator = accumulator.p7o(element_0);
                }
              }
               while (inductionVariable_1 < 64);
          }
          tmp = accumulator;
        }
        return tmp;
      }
      f7p(bits) {
        if (bits === Companion_getInstance().v7o_1)
          return this;
        if (this === Companion_getInstance().v7o_1)
          return bits;
        var tmp;
        if (equals(bits.n7o_1, this.n7o_1) && bits.o7o_1 === this.o7o_1) {
          tmp = new (SnapshotIdSet())(this.l7o_1.t4(bits.l7o_1), this.m7o_1.t4(bits.m7o_1), this.n7o_1, this.o7o_1);
        } else {
          var tmp_0;
          if (this.o7o_1 == null) {
            // Inline function 'androidx.compose.runtime.snapshots.SnapshotIdSet.fastFold' call
            var accumulator = bits;
            // Inline function 'androidx.compose.runtime.snapshots.SnapshotIdSet.fastForEach' call
            var tmp0_safe_receiver = access$_get_belowBound__uc78e(this);
            if (tmp0_safe_receiver == null)
              null;
            else {
              // Inline function 'androidx.compose.runtime.snapshots.forEach' call
              var inductionVariable = 0;
              var last = tmp0_safe_receiver.length;
              while (inductionVariable < last) {
                var value = tmp0_safe_receiver[inductionVariable];
                inductionVariable = inductionVariable + 1 | 0;
                accumulator = accumulator.z7o(value);
              }
            }
            if (!access$_get_lowerSet__9mjss6(this).equals(new (Long())(0, 0))) {
              var inductionVariable_0 = 0;
              if (inductionVariable_0 < 64)
                do {
                  var index = inductionVariable_0;
                  inductionVariable_0 = inductionVariable_0 + 1 | 0;
                  if (!access$_get_lowerSet__9mjss6(this).s4((new (Long())(1, 0)).p4(index)).equals(new (Long())(0, 0))) {
                    // Inline function 'androidx.compose.runtime.snapshots.plus' call
                    var element = access$_get_lowerBound__ou44uq(this) + toLong(index).y4();
                    accumulator = accumulator.z7o(element);
                  }
                }
                 while (inductionVariable_0 < 64);
            }
            if (!access$_get_upperSet__2kurhn(this).equals(new (Long())(0, 0))) {
              var inductionVariable_1 = 0;
              if (inductionVariable_1 < 64)
                do {
                  var index_0 = inductionVariable_1;
                  inductionVariable_1 = inductionVariable_1 + 1 | 0;
                  if (!access$_get_upperSet__2kurhn(this).s4((new (Long())(1, 0)).p4(index_0)).equals(new (Long())(0, 0))) {
                    // Inline function 'androidx.compose.runtime.snapshots.plus' call
                    // Inline function 'androidx.compose.runtime.snapshots.plus' call
                    var element_0 = access$_get_lowerBound__ou44uq(this) + toLong(index_0).y4() + toLong(64).y4();
                    accumulator = accumulator.z7o(element_0);
                  }
                }
                 while (inductionVariable_1 < 64);
            }
            tmp_0 = accumulator;
          } else {
            // Inline function 'androidx.compose.runtime.snapshots.SnapshotIdSet.fastFold' call
            var accumulator_0 = this;
            // Inline function 'androidx.compose.runtime.snapshots.SnapshotIdSet.fastForEach' call
            var tmp0_safe_receiver_0 = access$_get_belowBound__uc78e(bits);
            if (tmp0_safe_receiver_0 == null)
              null;
            else {
              // Inline function 'androidx.compose.runtime.snapshots.forEach' call
              var inductionVariable_2 = 0;
              var last_0 = tmp0_safe_receiver_0.length;
              while (inductionVariable_2 < last_0) {
                var value_0 = tmp0_safe_receiver_0[inductionVariable_2];
                inductionVariable_2 = inductionVariable_2 + 1 | 0;
                accumulator_0 = accumulator_0.z7o(value_0);
              }
            }
            if (!access$_get_lowerSet__9mjss6(bits).equals(new (Long())(0, 0))) {
              var inductionVariable_3 = 0;
              if (inductionVariable_3 < 64)
                do {
                  var index_1 = inductionVariable_3;
                  inductionVariable_3 = inductionVariable_3 + 1 | 0;
                  if (!access$_get_lowerSet__9mjss6(bits).s4((new (Long())(1, 0)).p4(index_1)).equals(new (Long())(0, 0))) {
                    // Inline function 'androidx.compose.runtime.snapshots.plus' call
                    var element_1 = access$_get_lowerBound__ou44uq(bits) + toLong(index_1).y4();
                    accumulator_0 = accumulator_0.z7o(element_1);
                  }
                }
                 while (inductionVariable_3 < 64);
            }
            if (!access$_get_upperSet__2kurhn(bits).equals(new (Long())(0, 0))) {
              var inductionVariable_4 = 0;
              if (inductionVariable_4 < 64)
                do {
                  var index_2 = inductionVariable_4;
                  inductionVariable_4 = inductionVariable_4 + 1 | 0;
                  if (!access$_get_upperSet__2kurhn(bits).s4((new (Long())(1, 0)).p4(index_2)).equals(new (Long())(0, 0))) {
                    // Inline function 'androidx.compose.runtime.snapshots.plus' call
                    // Inline function 'androidx.compose.runtime.snapshots.plus' call
                    var element_2 = access$_get_lowerBound__ou44uq(bits) + toLong(index_2).y4() + toLong(64).y4();
                    accumulator_0 = accumulator_0.z7o(element_2);
                  }
                }
                 while (inductionVariable_4 < 64);
            }
            tmp_0 = accumulator_0;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      x() {
        return sequence(SnapshotIdSet$iterator$slambda_0(this, null)).x();
      }
      z7p(default_0) {
        var belowBound = this.o7o_1;
        if (!(belowBound == null)) {
          // Inline function 'androidx.compose.runtime.snapshots.first' call
          return belowBound[0];
        }
        if (!this.m7o_1.equals(new (Long())(0, 0))) {
          var tmp0 = this.n7o_1;
          // Inline function 'androidx.compose.runtime.snapshots.plus' call
          var other = countTrailingZeroBits(this.m7o_1);
          return tmp0 + toLong(other).y4();
        }
        if (!this.l7o_1.equals(new (Long())(0, 0))) {
          // Inline function 'androidx.compose.runtime.snapshots.plus' call
          var tmp0_0 = this.n7o_1 + toLong(64).y4();
          // Inline function 'androidx.compose.runtime.snapshots.plus' call
          var other_0 = countTrailingZeroBits(this.l7o_1);
          return tmp0_0 + toLong(other_0).y4();
        }
        return default_0;
      }
      toString() {
        var tmp = anyToString(this);
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this, 10));
        var _iterator__ex2g4s = this.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = item.toString();
          destination.i(tmp$ret$0);
        }
        return tmp + ' [' + fastJoinToString(destination) + ']';
      }
    }
    initMetadataForClass($, 'SnapshotIdSet');
    SnapshotIdSetClass = $;
  }
  return SnapshotIdSetClass;
}
//region block: init
androidx_compose_runtime_snapshots_SnapshotIdSet$stable = 0;
//endregion
//region block: exports
export {
  Companion_getInstance as Companion_getInstancej1xnadroft92,
};
//endregion

//# sourceMappingURL=SnapshotIdSet.mjs.map
