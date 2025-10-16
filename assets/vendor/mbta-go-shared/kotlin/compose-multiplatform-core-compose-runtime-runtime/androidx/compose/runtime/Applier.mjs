import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { composeImmediateRuntimeError2yqil22w149j8 as composeImmediateRuntimeError } from './Composer.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  _Stack___init__impl__tvpfn52esscbfgakobd as _Stack___init__impl__tvpfn5,
  Stack__push_impl_s8r9054cycd2baz6fd as Stack__push_impl_s8r905,
  Stack__pop_impl_8s4za433gnfbabhg48d as Stack__pop_impl_8s4za4,
  Stack__clear_impl_qoqv3c3cn6dpu82q3we as Stack__clear_impl_qoqv3c,
} from './Stack.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_AbstractApplier$stable;
var androidx_compose_runtime_OffsetApplier$stable;
function onBeginChanges() {
}
function onEndChanges() {
}
var ApplierClass;
function Applier() {
  if (ApplierClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Applier');
    ApplierClass = $;
  }
  return ApplierClass;
}
var OffsetApplierClass;
function OffsetApplier() {
  if (OffsetApplierClass === VOID) {
    class $ {
      constructor(applier, offset) {
        this.q6i_1 = applier;
        this.r6i_1 = offset;
        this.s6i_1 = 0;
      }
      k6i(node) {
        this.s6i_1 = this.s6i_1 + 1 | 0;
        this.q6i_1.k6i(node);
      }
      l6i() {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.s6i_1 > 0)) {
          var tmp$ret$0 = 'OffsetApplier up called with no corresponding down';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        this.s6i_1 = this.s6i_1 - 1 | 0;
        this.q6i_1.l6i();
      }
      m6i(index, instance) {
        this.q6i_1.m6i(index + (this.s6i_1 === 0 ? this.r6i_1 : 0) | 0, instance);
      }
      n6i(index, instance) {
        this.q6i_1.n6i(index + (this.s6i_1 === 0 ? this.r6i_1 : 0) | 0, instance);
      }
      o6i(index, count) {
        this.q6i_1.o6i(index + (this.s6i_1 === 0 ? this.r6i_1 : 0) | 0, count);
      }
      p6i(from, to, count) {
        var effectiveOffset = this.s6i_1 === 0 ? this.r6i_1 : 0;
        this.q6i_1.p6i(from + effectiveOffset | 0, to + effectiveOffset | 0, count);
      }
      p3() {
        composeImmediateRuntimeError('Clear is not valid on OffsetApplier');
      }
    }
    protoOf($).i6i = onBeginChanges;
    protoOf($).j6i = onEndChanges;
    initMetadataForClass($, 'OffsetApplier', VOID, VOID, [Applier()]);
    OffsetApplierClass = $;
  }
  return OffsetApplierClass;
}
var AbstractApplierClass;
function AbstractApplier() {
  if (AbstractApplierClass === VOID) {
    class $ {
      constructor(root) {
        this.t6i_1 = root;
        this.u6i_1 = _Stack___init__impl__tvpfn5();
        this.v6i_1 = this.t6i_1;
      }
      w6i(_set____db54di) {
        this.v6i_1 = _set____db54di;
      }
      x6i() {
        return this.v6i_1;
      }
      y6i(node) {
        Stack__push_impl_s8r905(this.u6i_1, this.x6i());
        this.w6i(node);
      }
      k6i(node) {
        return this.y6i((node == null ? true : !(node == null)) ? node : THROW_CCE());
      }
      l6i() {
        this.w6i(Stack__pop_impl_8s4za4(this.u6i_1));
      }
      p3() {
        Stack__clear_impl_qoqv3c(this.u6i_1);
        this.w6i(this.t6i_1);
        this.z6i();
      }
    }
    protoOf($).i6i = onBeginChanges;
    protoOf($).j6i = onEndChanges;
    initMetadataForClass($, 'AbstractApplier', VOID, VOID, [Applier()]);
    AbstractApplierClass = $;
  }
  return AbstractApplierClass;
}
//region block: init
androidx_compose_runtime_AbstractApplier$stable = 8;
androidx_compose_runtime_OffsetApplier$stable = 8;
//endregion
//region block: exports
export {
  AbstractApplier as AbstractApplier6w52ib7nbxo1,
  Applier as Applierx5za2jtogbgc,
  OffsetApplier as OffsetApplier2oaojuw9mrqj0,
};
//endregion

//# sourceMappingURL=Applier.mjs.map
