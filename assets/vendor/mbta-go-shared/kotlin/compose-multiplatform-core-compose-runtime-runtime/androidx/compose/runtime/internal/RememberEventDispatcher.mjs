import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  isArray1hxjqtqy632bc as isArray,
  isInterface3d6p8outrmvmk as isInterface,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { MutableIntList1ufb3m5010ppd as MutableIntList } from '../../../../../androidx-collection-collection/androidx/collection/IntList.mjs';
import { mutableListOf6oorvk2mtdmp as mutableListOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { MutableVectorwjrdge2qewgb as MutableVector } from '../collection/MutableVector.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { mutableScatterSetOfp6qdzgccnsa0 as mutableScatterSetOf } from '../../../../../androidx-collection-collection/androidx/collection/ScatterSet.mjs';
import { mutableScatterMapOf3abcfp1zp1j0e as mutableScatterMapOf } from '../../../../../androidx-collection-collection/androidx/collection/ScatterMap.mjs';
import { RememberObserverHolder2jg8joqsn8vk0 as RememberObserverHolder } from '../Composer.mjs';
import {
  _Stack___init__impl__tvpfn52esscbfgakobd as _Stack___init__impl__tvpfn5,
  Stackqxok12iizaod as Stack,
  Stack__push_impl_s8r9054cycd2baz6fd as Stack__push_impl_s8r905,
  Stack__pop_impl_8s4za433gnfbabhg48d as Stack__pop_impl_8s4za4,
} from '../Stack.mjs';
import { Trace_instance1paw3yb7kkwy0 as Trace_instance } from './Trace.nonAndroid.mjs';
import { ComposeNodeLifecycleCallback18r088ge3pgm2 as ComposeNodeLifecycleCallback } from '../ComposeNodeLifecycleCallback.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { RememberObserver1inqpwyx2vbkc as RememberObserver } from '../RememberObserver.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_internal_PausedCompositionRemembers$stable;
var androidx_compose_runtime_internal_RememberEventDispatcher$stable;
function dispatchRememberList($this, list) {
  // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
  var i = 0;
  var tmp = list.s6t_1;
  var content = isArray(tmp) ? tmp : THROW_CCE();
  var size = list.u6t_1;
  while (i < size) {
    var wrapped = content[i].o6w_1;
    $this.j70_1.m3(wrapped);
    wrapped.x72();
    i = i + 1 | 0;
  }
}
function recordLeaving($this, instance, endRelativeOrder, priority, endRelativeAfter) {
  processPendingLeaving($this, endRelativeOrder);
  if (0 <= endRelativeAfter ? endRelativeAfter < endRelativeOrder : false) {
    $this.q70_1.i(instance);
    $this.r70_1.c6c(priority);
    $this.s70_1.c6c(endRelativeAfter);
  } else {
    $this.m70_1.c6e(instance);
  }
}
function processPendingLeaving($this, endRelativeOrder) {
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!$this.q70_1.h1()) {
    var index = 0;
    var toAdd = null;
    var toAddAfter = null;
    var toAddPriority = null;
    $l$loop: while (true) {
      var tmp = index;
      // Inline function 'androidx.collection.IntList.size' call
      if (!(tmp < $this.s70_1.w6b_1)) {
        break $l$loop;
      }
      if (endRelativeOrder <= $this.s70_1.e1(index)) {
        var instance = $this.q70_1.s3(index);
        var endRelativeAfter = $this.s70_1.s3(index);
        var priority = $this.r70_1.s3(index);
        if (toAdd == null) {
          toAdd = mutableListOf([instance]);
          // Inline function 'kotlin.also' call
          var this_0 = new (MutableIntList())();
          this_0.c6c(endRelativeAfter);
          toAddAfter = this_0;
          // Inline function 'kotlin.also' call
          var this_1 = new (MutableIntList())();
          this_1.c6c(priority);
          toAddPriority = this_1;
        } else {
          if (!(toAddPriority instanceof MutableIntList()))
            THROW_CCE();
          if (!(toAddAfter instanceof MutableIntList()))
            THROW_CCE();
          toAdd.i(instance);
          toAddAfter.c6c(endRelativeAfter);
          toAddPriority.c6c(priority);
        }
      } else {
        index = index + 1 | 0;
      }
    }
    if (!(toAdd == null)) {
      if (!(toAddPriority instanceof MutableIntList()))
        THROW_CCE();
      if (!(toAddAfter instanceof MutableIntList()))
        THROW_CCE();
      var inductionVariable = 0;
      var last = toAdd.c1() - 1 | 0;
      if (inductionVariable < last)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var inductionVariable_0 = i + 1 | 0;
          var last_0 = toAdd.c1();
          if (inductionVariable_0 < last_0)
            do {
              var j = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var iAfter = toAddAfter.e1(i);
              var jAfter = toAddAfter.e1(j);
              if (iAfter < jAfter || (jAfter === iAfter && toAddPriority.e1(i) < toAddPriority.e1(j))) {
                swap(toAdd, i, j);
                swap_0(toAddPriority, i, j);
                swap_0(toAddAfter, i, j);
              }
            }
             while (inductionVariable_0 < last_0);
        }
         while (inductionVariable < last);
      var tmp0 = $this.m70_1;
      // Inline function 'androidx.compose.runtime.collection.MutableVector.addAll' call
      var elements = toAdd;
      tmp0.z7i(tmp0.u6t_1, elements);
    }
  }
}
var RememberEventDispatcherClass;
function RememberEventDispatcher() {
  if (RememberEventDispatcherClass === VOID) {
    class $ {
      constructor(abandoning) {
        this.j70_1 = abandoning;
        var tmp = this;
        // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
        // Inline function 'androidx.compose.runtime.collection.MutableVector' call
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp$ret$0 = Array(16);
        tmp.k70_1 = new (MutableVector())(tmp$ret$0, 0);
        this.l70_1 = this.k70_1;
        var tmp_0 = this;
        // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
        // Inline function 'androidx.compose.runtime.collection.MutableVector' call
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp$ret$3 = Array(16);
        tmp_0.m70_1 = new (MutableVector())(tmp$ret$3, 0);
        var tmp_1 = this;
        // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
        // Inline function 'androidx.compose.runtime.collection.MutableVector' call
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp$ret$6 = Array(16);
        tmp_1.n70_1 = new (MutableVector())(tmp$ret$6, 0);
        this.o70_1 = null;
        this.p70_1 = null;
        var tmp_2 = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp_2.q70_1 = ArrayList().g1();
        this.r70_1 = new (MutableIntList())();
        this.s70_1 = new (MutableIntList())();
        this.t70_1 = null;
      }
      q7g(instance) {
        this.l70_1.c6e(instance);
      }
      t6y(instance, endRelativeOrder, priority, endRelativeAfter) {
        recordLeaving(this, instance, endRelativeOrder, priority, endRelativeAfter);
      }
      q6y(instance, endRelativeOrder, priority, endRelativeAfter) {
        var tmp0_elvis_lhs = this.o70_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = mutableScatterSetOf();
          this.o70_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var releasing = tmp;
        releasing.t6f(instance);
        recordLeaving(this, instance, endRelativeOrder, priority, endRelativeAfter);
      }
      k6x(scope) {
        var pausedPlaceholder = new (PausedCompositionRemembers())(this.j70_1);
        var tmp0_elvis_lhs = this.p70_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = mutableScatterMapOf();
          this.p70_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp.g6f(scope, pausedPlaceholder);
        this.l70_1.c6e(new (RememberObserverHolder())(pausedPlaceholder, null));
      }
      k6s(scope) {
        var tmp0_safe_receiver = this.p70_1;
        var placeholder = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j3(scope);
        if (!(placeholder == null)) {
          var tmp1_elvis_lhs = this.t70_1;
          var tmp;
          var tmp_0 = tmp1_elvis_lhs;
          if ((tmp_0 == null ? null : new (Stack())(tmp_0)) == null) {
            // Inline function 'kotlin.also' call
            var this_0 = new (Stack())(_Stack___init__impl__tvpfn5());
            this.t70_1 = this_0.c6x_1;
            tmp = this_0.c6x_1;
          } else {
            tmp = tmp1_elvis_lhs;
          }
          Stack__push_impl_s8r905(tmp, this.l70_1);
          this.l70_1 = placeholder.m7n_1;
        }
      }
      r6x(scope) {
        var pausedPlaceholders = this.p70_1;
        if (!(pausedPlaceholders == null)) {
          var placeholder = pausedPlaceholders.j3(scope);
          if (!(placeholder == null)) {
            var tmp0_safe_receiver = this.t70_1;
            var tmp;
            var tmp_0 = tmp0_safe_receiver;
            if ((tmp_0 == null ? null : new (Stack())(tmp_0)) == null) {
              tmp = null;
            } else {
              tmp = Stack__pop_impl_8s4za4(tmp0_safe_receiver);
            }
            var tmp1_safe_receiver = tmp;
            if (tmp1_safe_receiver == null)
              null;
            else {
              // Inline function 'kotlin.let' call
              this.l70_1 = tmp1_safe_receiver;
            }
            pausedPlaceholders.u3(scope);
          }
        }
      }
      u70() {
        processPendingLeaving(this, -2147483648);
        // Inline function 'androidx.compose.runtime.collection.MutableVector.isNotEmpty' call
        if (!(this.m70_1.u6t_1 === 0)) {
          var tmp0 = 'Compose:onForgotten';
          $l$block: {
            // Inline function 'androidx.compose.runtime.internal.trace' call
            var token = Trace_instance.l6t(tmp0);
            try {
              var releasing = this.o70_1;
              var inductionVariable = this.m70_1.u6t_1 - 1 | 0;
              if (0 <= inductionVariable)
                do {
                  var i = inductionVariable;
                  inductionVariable = inductionVariable + -1 | 0;
                  // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
                  var tmp = this.m70_1.s6t_1[i];
                  var instance = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  if (instance instanceof RememberObserverHolder()) {
                    var wrapped = instance.o6w_1;
                    this.j70_1.m3(wrapped);
                    wrapped.y72();
                  }
                  if (isInterface(instance, ComposeNodeLifecycleCallback())) {
                    if (!(releasing == null) && releasing.j1(instance)) {
                      instance.r6j();
                    } else {
                      instance.q6j();
                    }
                  }
                }
                 while (0 <= inductionVariable);
              break $l$block;
            }finally {
              Trace_instance.w6t(token);
            }
          }
        }
        // Inline function 'androidx.compose.runtime.collection.MutableVector.isNotEmpty' call
        if (!(this.k70_1.u6t_1 === 0)) {
          var tmp0_0 = 'Compose:onRemembered';
          $l$block_0: {
            // Inline function 'androidx.compose.runtime.internal.trace' call
            var token_0 = Trace_instance.l6t(tmp0_0);
            try {
              dispatchRememberList(this, this.k70_1);
              break $l$block_0;
            }finally {
              Trace_instance.w6t(token_0);
            }
          }
        }
      }
      v70() {
        // Inline function 'androidx.compose.runtime.collection.MutableVector.isNotEmpty' call
        if (!(this.n70_1.u6t_1 === 0)) {
          var tmp0 = 'Compose:sideeffects';
          $l$block: {
            // Inline function 'androidx.compose.runtime.internal.trace' call
            var token = Trace_instance.l6t(tmp0);
            try {
              // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
              var this_0 = this.n70_1;
              var i = 0;
              var tmp = this_0.s6t_1;
              var content = isArray(tmp) ? tmp : THROW_CCE();
              var size = this_0.u6t_1;
              while (i < size) {
                content[i]();
                i = i + 1 | 0;
              }
              this.n70_1.p3();
              break $l$block;
            }finally {
              Trace_instance.w6t(token);
            }
          }
        }
      }
      w70() {
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!this.j70_1.h1()) {
          var tmp0 = 'Compose:abandons';
          $l$block: {
            // Inline function 'androidx.compose.runtime.internal.trace' call
            var token = Trace_instance.l6t(tmp0);
            try {
              var iterator = this.j70_1.x();
              while (iterator.y()) {
                var instance = iterator.z();
                iterator.z6();
                instance.z72();
              }
              break $l$block;
            }finally {
              Trace_instance.w6t(token);
            }
          }
        }
      }
    }
    initMetadataForClass($, 'RememberEventDispatcher');
    RememberEventDispatcherClass = $;
  }
  return RememberEventDispatcherClass;
}
var PausedCompositionRemembersClass;
function PausedCompositionRemembers() {
  if (PausedCompositionRemembersClass === VOID) {
    class $ {
      constructor(abandoning) {
        this.l7n_1 = abandoning;
        var tmp = this;
        // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
        // Inline function 'androidx.compose.runtime.collection.MutableVector' call
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp$ret$0 = Array(16);
        tmp.m7n_1 = new (MutableVector())(tmp$ret$0, 0);
      }
      x72() {
        // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
        var this_0 = this.m7n_1;
        var i = 0;
        var tmp = this_0.s6t_1;
        var content = isArray(tmp) ? tmp : THROW_CCE();
        var size = this_0.u6t_1;
        while (i < size) {
          var wrapped = content[i].o6w_1;
          this.l7n_1.m3(wrapped);
          wrapped.x72();
          i = i + 1 | 0;
        }
      }
      y72() {
      }
      z72() {
      }
    }
    initMetadataForClass($, 'PausedCompositionRemembers', VOID, VOID, [RememberObserver()]);
    PausedCompositionRemembersClass = $;
  }
  return PausedCompositionRemembersClass;
}
function swap(_this__u8e3s4, a, b) {
  var item = _this__u8e3s4.e1(a);
  _this__u8e3s4.q3(a, _this__u8e3s4.e1(b));
  _this__u8e3s4.q3(b, item);
}
function swap_0(_this__u8e3s4, a, b) {
  var item = _this__u8e3s4.e1(a);
  _this__u8e3s4.d6c(a, _this__u8e3s4.e1(b));
  _this__u8e3s4.d6c(b, item);
}
//region block: init
androidx_compose_runtime_internal_PausedCompositionRemembers$stable = 8;
androidx_compose_runtime_internal_RememberEventDispatcher$stable = 8;
//endregion
//region block: exports
export {
  RememberEventDispatcher as RememberEventDispatcher1j7ollu0ljepm,
};
//endregion

//# sourceMappingURL=RememberEventDispatcher.mjs.map
