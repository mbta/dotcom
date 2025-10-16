import { SynchronizedObject32xqzf15iiskd as SynchronizedObject } from '../../internal/Synchronized.mjs';
import { copyOf2ng0t8oizk6it as copyOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_EMPTY_RESUMES() {
  _init_properties_AbstractSharedFlow_kt__h2xygb();
  return EMPTY_RESUMES;
}
var EMPTY_RESUMES;
var AbstractSharedFlowClass;
function AbstractSharedFlow() {
  if (AbstractSharedFlowClass === VOID) {
    class $ extends SynchronizedObject() {
      constructor() {
        super();
        this.o2o_1 = null;
        this.p2o_1 = 0;
        this.q2o_1 = 0;
        this.r2o_1 = null;
      }
      n2p() {
        var subscriptionCount;
        // Inline function 'kotlinx.coroutines.internal.synchronized' call
        // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
        var curSlots = this.o2o_1;
        var tmp;
        if (curSlots == null) {
          // Inline function 'kotlin.also' call
          var this_0 = this.x2p(2);
          this.o2o_1 = this_0;
          tmp = this_0;
        } else {
          var tmp_0;
          if (this.p2o_1 >= curSlots.length) {
            // Inline function 'kotlin.also' call
            var this_1 = copyOf(curSlots, imul(2, curSlots.length));
            this.o2o_1 = this_1;
            tmp_0 = this_1;
          } else {
            tmp_0 = curSlots;
          }
          tmp = tmp_0;
        }
        var slots = tmp;
        var index = this.q2o_1;
        var slot;
        $l$loop: while (true) {
          var tmp0_elvis_lhs = slots[index];
          var tmp_1;
          if (tmp0_elvis_lhs == null) {
            // Inline function 'kotlin.also' call
            var this_2 = this.w2p();
            slots[index] = this_2;
            tmp_1 = this_2;
          } else {
            tmp_1 = tmp0_elvis_lhs;
          }
          slot = tmp_1;
          index = index + 1 | 0;
          if (index >= slots.length)
            index = 0;
          if ((slot instanceof AbstractSharedFlowSlot() ? slot : THROW_CCE()).z2p(this))
            break $l$loop;
        }
        this.q2o_1 = index;
        this.p2o_1 = this.p2o_1 + 1 | 0;
        subscriptionCount = this.r2o_1;
        var slot_0 = slot;
        if (subscriptionCount == null)
          null;
        else
          subscriptionCount.u2r(1);
        return slot_0;
      }
      r2p(slot) {
        var subscriptionCount;
        // Inline function 'kotlinx.coroutines.internal.synchronized' call
        // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
        this.p2o_1 = this.p2o_1 - 1 | 0;
        subscriptionCount = this.r2o_1;
        if (this.p2o_1 === 0)
          this.q2o_1 = 0;
        var resumes = (slot instanceof AbstractSharedFlowSlot() ? slot : THROW_CCE()).b2q(this);
        var inductionVariable = 0;
        var last = resumes.length;
        while (inductionVariable < last) {
          var cont = resumes[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          if (cont == null)
            null;
          else {
            // Inline function 'kotlin.coroutines.resume' call
            // Inline function 'kotlin.Companion.success' call
            var tmp$ret$3 = _Result___init__impl__xyqfz8(Unit_instance);
            cont.qd(tmp$ret$3);
          }
        }
        if (subscriptionCount == null)
          null;
        else
          subscriptionCount.u2r(-1);
      }
    }
    initMetadataForClass($, 'AbstractSharedFlow');
    AbstractSharedFlowClass = $;
  }
  return AbstractSharedFlowClass;
}
var AbstractSharedFlowSlotClass;
function AbstractSharedFlowSlot() {
  if (AbstractSharedFlowSlotClass === VOID) {
    class $ {}
    initMetadataForClass($, 'AbstractSharedFlowSlot');
    AbstractSharedFlowSlotClass = $;
  }
  return AbstractSharedFlowSlotClass;
}
var properties_initialized_AbstractSharedFlow_kt_2mpafr;
function _init_properties_AbstractSharedFlow_kt__h2xygb() {
  if (!properties_initialized_AbstractSharedFlow_kt_2mpafr) {
    properties_initialized_AbstractSharedFlow_kt_2mpafr = true;
    // Inline function 'kotlin.arrayOfNulls' call
    EMPTY_RESUMES = Array(0);
  }
}
//region block: exports
export {
  AbstractSharedFlowSlot as AbstractSharedFlowSlot2hcw2f06t03o0,
  AbstractSharedFlow as AbstractSharedFlow1jjql04jld86z,
  get_EMPTY_RESUMES as get_EMPTY_RESUMES1se3895plb5u1,
};
//endregion

//# sourceMappingURL=AbstractSharedFlow.mjs.map
