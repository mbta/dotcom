import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { DerivedState19xobrhn2i2k3 as DerivedState } from './DerivedState.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { structuralEqualityPolicy37napyzbio62n as structuralEqualityPolicy } from './SnapshotMutationPolicy.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CompositionImpl1tgpd173nj9j9 as CompositionImpl } from './Composition.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { InvalidationResult_IGNORED_getInstancenn8i7vc4cu7y as InvalidationResult_IGNORED_getInstance } from './Composer.mjs';
import { MutableObjectIntMap1ffl70mv56rjv as MutableObjectIntMap } from '../../../../androidx-collection-collection/androidx/collection/ObjectIntMap.mjs';
import { MutableScatterMap1d9bz6zagr1rv as MutableScatterMap } from '../../../../androidx-collection-collection/androidx/collection/ScatterMap.mjs';
import { ScatterSet2hbfochhupan9 as ScatterSet } from '../../../../androidx-collection-collection/androidx/collection/ScatterSet.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var callbackLock;
var androidx_compose_runtime_RecomposeScopeImpl$stable;
function _set_rereading__pnqtpo($this, value) {
  if (value) {
    $this.x6j_1 = $this.x6j_1 | 32;
  } else {
    $this.x6j_1 = $this.x6j_1 & -33;
  }
}
function _get_rereading__g2iruw($this) {
  return !(($this.x6j_1 & 32) === 0);
}
function _set_skipped__p8q2c5($this, value) {
  if (value) {
    $this.x6j_1 = $this.x6j_1 | 16;
  } else {
    $this.x6j_1 = $this.x6j_1 & -17;
  }
}
function checkDerivedStateChanged($this, _this__u8e3s4, dependencies) {
  if (!isInterface(_this__u8e3s4, DerivedState()))
    THROW_CCE();
  var tmp0_elvis_lhs = _this__u8e3s4.q72();
  var policy = tmp0_elvis_lhs == null ? structuralEqualityPolicy() : tmp0_elvis_lhs;
  return !policy.g74(_this__u8e3s4.t71().v71(), dependencies.j3(_this__u8e3s4));
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      e6z(slots, anchors, newOwner) {
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!anchors.h1()) {
          // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
          var inductionVariable = 0;
          var last = anchors.c1() - 1 | 0;
          if (inductionVariable <= last)
            do {
              var index = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var item = anchors.e1(index);
              var tmp = slots.h74(item, 0);
              var recomposeScope = tmp instanceof RecomposeScopeImpl() ? tmp : null;
              if (recomposeScope == null)
                null;
              else {
                recomposeScope.i74(newOwner);
              }
            }
             while (inductionVariable <= last);
        }
      }
      f6z(slots, anchors) {
        var tmp;
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!anchors.h1()) {
          var tmp$ret$2;
          $l$block: {
            // Inline function 'androidx.compose.runtime.snapshots.fastAny' call
            // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
            var inductionVariable = 0;
            var last = anchors.c1() - 1 | 0;
            if (inductionVariable <= last)
              do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var item = anchors.e1(index);
                var tmp_0;
                if (slots.w6y(item)) {
                  var tmp_1 = slots.j74(slots.z6s(item), 0);
                  tmp_0 = tmp_1 instanceof RecomposeScopeImpl();
                } else {
                  tmp_0 = false;
                }
                if (tmp_0) {
                  tmp$ret$2 = true;
                  break $l$block;
                }
              }
               while (inductionVariable <= last);
            tmp$ret$2 = false;
          }
          tmp = tmp$ret$2;
        } else {
          tmp = false;
        }
        return tmp;
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
function RecomposeScopeImpl$end$lambda(this$0, $token, $instances) {
  return function (composition) {
    var tmp;
    var tmp_0;
    if (this$0.c6k_1 === $token && $instances.equals(this$0.d6k_1)) {
      tmp_0 = composition instanceof CompositionImpl();
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      // Inline function 'androidx.collection.MutableObjectIntMap.removeIf' call
      var this_0 = $instances;
      $l$block: {
        // Inline function 'androidx.collection.ObjectIntMap.forEachIndexed' call
        var m = this_0.c6d_1;
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
                    var index = (i << 3) + j | 0;
                    var tmp_1 = this_0.d6d_1[index];
                    var tmp0 = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
                    var shouldRemove = !(this_0.e6d_1[index] === $token);
                    if (shouldRemove) {
                      composition.i72(tmp0, this$0);
                      if (isInterface(tmp0, DerivedState())) {
                        composition.j72(tmp0);
                        var tmp0_safe_receiver = this$0.e6k_1;
                        if (tmp0_safe_receiver == null)
                          null;
                        else
                          tmp0_safe_receiver.u3(tmp0);
                      }
                    }
                    if (shouldRemove) {
                      this_0.o6d(index);
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
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
var RecomposeScopeImplClass;
function RecomposeScopeImpl() {
  if (RecomposeScopeImplClass === VOID) {
    class $ {
      constructor(owner) {
        this.x6j_1 = 0;
        this.y6j_1 = owner;
        this.z6j_1 = null;
        this.a6k_1 = null;
        this.b6k_1 = null;
        this.c6k_1 = 0;
        this.d6k_1 = null;
        this.e6k_1 = null;
      }
      s6y() {
        var tmp;
        if (!(this.y6j_1 == null)) {
          var tmp0_safe_receiver = this.z6j_1;
          var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.s6y();
          tmp = tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
        } else {
          tmp = false;
        }
        return tmp;
      }
      h72() {
        return !(this.a6k_1 == null);
      }
      i6x(value) {
        var tmp = this;
        var tmp_0;
        if (value) {
          tmp_0 = this.x6j_1 | 1;
        } else {
          tmp_0 = this.x6j_1 & -2;
        }
        tmp.x6j_1 = tmp_0;
      }
      b6r() {
        return !((this.x6j_1 & 1) === 0);
      }
      j6x(value) {
        var tmp = this;
        var tmp_0;
        if (value) {
          tmp_0 = this.x6j_1 | 128;
        } else {
          tmp_0 = this.x6j_1 & -129;
        }
        tmp.x6j_1 = tmp_0;
      }
      w6r() {
        return !((this.x6j_1 & 128) === 0);
      }
      i6s(value) {
        var tmp = this;
        var tmp_0;
        if (value) {
          tmp_0 = this.x6j_1 | 256;
        } else {
          tmp_0 = this.x6j_1 & -257;
        }
        tmp.x6j_1 = tmp_0;
      }
      l6s() {
        return !((this.x6j_1 & 256) === 0);
      }
      j6s(value) {
        var tmp = this;
        var tmp_0;
        if (value) {
          tmp_0 = this.x6j_1 | 512;
        } else {
          tmp_0 = this.x6j_1 & -513;
        }
        tmp.x6j_1 = tmp_0;
      }
      s6x() {
        return !((this.x6j_1 & 512) === 0);
      }
      g72() {
        return !((this.x6j_1 & 2) === 0);
      }
      t6x(value) {
        if (value) {
          this.x6j_1 = this.x6j_1 | 4;
        } else {
          this.x6j_1 = this.x6j_1 & -5;
        }
      }
      g6s(value) {
        if (value) {
          this.x6j_1 = this.x6j_1 | 8;
        } else {
          this.x6j_1 = this.x6j_1 & -9;
        }
      }
      i6w() {
        return !((this.x6j_1 & 8) === 0);
      }
      x6r(composer) {
        var block = this.a6k_1;
        var observer = this.b6k_1;
        if (!(observer == null) && !(block == null)) {
          observer.k74(this);
          try {
            block(composer, 1);
          }finally {
            observer.l74(this);
          }
          return Unit_instance;
        }
        if ((block == null ? null : block(composer, 1)) == null) {
          // Inline function 'kotlin.error' call
          var message = 'Invalid restart scope';
          throw IllegalStateException().o5(toString(message));
        }
      }
      v6z(value) {
        var tmp0_safe_receiver = this.y6j_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.p6z(this, value);
        return tmp1_elvis_lhs == null ? InvalidationResult_IGNORED_getInstance() : tmp1_elvis_lhs;
      }
      i1l() {
        var tmp0_safe_receiver = this.y6j_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.q6z(this);
        }
        this.y6j_1 = null;
        this.d6k_1 = null;
        this.e6k_1 = null;
        var tmp1_safe_receiver = this.b6k_1;
        if (tmp1_safe_receiver == null)
          null;
        else {
          tmp1_safe_receiver.m74(this);
        }
      }
      i74(owner) {
        this.y6j_1 = owner;
      }
      f72() {
        var tmp0_safe_receiver = this.y6j_1;
        if (tmp0_safe_receiver == null)
          null;
        else
          tmp0_safe_receiver.p6z(this, null);
      }
      n74(block) {
        this.a6k_1 = block;
      }
      f6s(value) {
        if (value) {
          this.x6j_1 = this.x6j_1 | 64;
        } else {
          this.x6j_1 = this.x6j_1 & -65;
        }
      }
      e6s() {
        return !((this.x6j_1 & 64) === 0);
      }
      u6x() {
        return !((this.x6j_1 & 16) === 0);
      }
      h6s(token) {
        this.c6k_1 = token;
        _set_skipped__p8q2c5(this, false);
      }
      m6x() {
        if (!this.w6r()) {
          _set_skipped__p8q2c5(this, true);
        }
      }
      q71(instance) {
        if (_get_rereading__g2iruw(this))
          return false;
        var tmp0_elvis_lhs = this.d6k_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = new (MutableObjectIntMap())();
          this.d6k_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var trackedInstances = tmp;
        var token = trackedInstances.n6d(instance, this.c6k_1, -1);
        if (token === this.c6k_1) {
          return true;
        }
        return false;
      }
      w71(instance, value) {
        var tmp0_elvis_lhs = this.e6k_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = new (MutableScatterMap())();
          this.e6k_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var trackedDependencies = tmp;
        trackedDependencies.g6f(instance, value);
      }
      u6z() {
        return !(this.e6k_1 == null);
      }
      f6k(instances) {
        if (instances == null)
          return true;
        var tmp0_elvis_lhs = this.e6k_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return true;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var trackedDependencies = tmp;
        var tmp_0;
        if (!(instances == null) ? isInterface(instances, DerivedState()) : false) {
          tmp_0 = checkDerivedStateChanged(this, instances, trackedDependencies);
        } else {
          if (instances instanceof ScatterSet()) {
            var tmp_1;
            if (instances.u6d()) {
              var tmp$ret$6;
              $l$block: {
                // Inline function 'androidx.collection.ScatterSet.any' call
                // Inline function 'kotlin.contracts.contract' call
                // Inline function 'androidx.collection.ScatterSet.forEach' call
                // Inline function 'kotlin.contracts.contract' call
                var elements = instances.j6f_1;
                $l$block_0: {
                  // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
                  // Inline function 'kotlin.contracts.contract' call
                  var m = instances.i6f_1;
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
                              var tmp_2 = elements[index];
                              var it = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
                              var tmp_3;
                              if (!(!(it == null) ? isInterface(it, DerivedState()) : false)) {
                                tmp_3 = true;
                              } else {
                                tmp_3 = checkDerivedStateChanged(this, it, trackedDependencies);
                              }
                              if (tmp_3) {
                                tmp$ret$6 = true;
                                break $l$block;
                              }
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
                tmp$ret$6 = false;
              }
              tmp_1 = tmp$ret$6;
            } else {
              tmp_1 = false;
            }
            tmp_0 = tmp_1;
          } else {
            tmp_0 = true;
          }
        }
        return tmp_0;
      }
      v6r() {
        var tmp0_safe_receiver = this.y6j_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          var tmp0_safe_receiver_0 = this.d6k_1;
          var tmp;
          if (tmp0_safe_receiver_0 == null) {
            tmp = null;
          } else {
            // Inline function 'kotlin.let' call
            _set_rereading__pnqtpo(this, true);
            try {
              // Inline function 'androidx.collection.ObjectIntMap.forEach' call
              var k = tmp0_safe_receiver_0.d6d_1;
              var v = tmp0_safe_receiver_0.e6d_1;
              $l$block: {
                // Inline function 'androidx.collection.ObjectIntMap.forEachIndexed' call
                var m = tmp0_safe_receiver_0.c6d_1;
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
                            var tmp_0 = k[index];
                            var tmp0 = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                            v[index];
                            tmp0_safe_receiver.r6z(tmp0);
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
            }finally {
              _set_rereading__pnqtpo(this, false);
            }
            tmp = Unit_instance;
          }
        }
      }
      p6x(token) {
        var tmp0_safe_receiver = this.d6k_1;
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          var tmp_0;
          var tmp_1;
          if (!this.u6x()) {
            var tmp$ret$3;
            $l$block: {
              // Inline function 'androidx.collection.ObjectIntMap.any' call
              // Inline function 'androidx.collection.ObjectIntMap.forEach' call
              var k = tmp0_safe_receiver.d6d_1;
              var v = tmp0_safe_receiver.e6d_1;
              $l$block_0: {
                // Inline function 'androidx.collection.ObjectIntMap.forEachIndexed' call
                var m = tmp0_safe_receiver.c6d_1;
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
                            var tmp_2 = k[index];
                            (tmp_2 == null ? true : !(tmp_2 == null)) || THROW_CCE();
                            if (!(v[index] === token)) {
                              tmp$ret$3 = true;
                              break $l$block;
                            }
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
              tmp$ret$3 = false;
            }
            tmp_1 = tmp$ret$3;
          } else {
            tmp_1 = false;
          }
          if (tmp_1) {
            tmp_0 = RecomposeScopeImpl$end$lambda(this, token, tmp0_safe_receiver);
          } else {
            tmp_0 = null;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'RecomposeScopeImpl');
    RecomposeScopeImplClass = $;
  }
  return RecomposeScopeImplClass;
}
var RecomposeScopeOwnerClass;
function RecomposeScopeOwner() {
  if (RecomposeScopeOwnerClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'RecomposeScopeOwner');
    RecomposeScopeOwnerClass = $;
  }
  return RecomposeScopeOwnerClass;
}
function updateChangedFlags(flags) {
  _init_properties_RecomposeScopeImpl_kt__t15emj();
  var lowBits = flags & 306783378;
  var highBits = flags & 613566756;
  return flags & -920350135 | (lowBits | highBits >> 1) | lowBits << 1 & highBits;
}
var properties_initialized_RecomposeScopeImpl_kt_pxgdx3;
function _init_properties_RecomposeScopeImpl_kt__t15emj() {
  if (!properties_initialized_RecomposeScopeImpl_kt_pxgdx3) {
    properties_initialized_RecomposeScopeImpl_kt_pxgdx3 = true;
    // Inline function 'androidx.compose.runtime.platform.makeSynchronizedObject' call
    callbackLock = null == null ? new Object() : null;
    androidx_compose_runtime_RecomposeScopeImpl$stable = 8;
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  RecomposeScopeImpl as RecomposeScopeImpl15912wzsvt7nn,
  RecomposeScopeOwner as RecomposeScopeOwner128iyp4kpa98t,
  updateChangedFlags as updateChangedFlags1i0wwq2uua6rt,
  Companion_instance as Companion_instance1wfemb066pnm2,
};
//endregion

//# sourceMappingURL=RecomposeScopeImpl.mjs.map
