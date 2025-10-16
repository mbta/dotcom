import { EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { SnapshotNotifier_WhileActive_getInstance3vrrpxxps06ka as SnapshotNotifier_WhileActive_getInstance } from './SnapshotNotifier.mjs';
import {
  Unit_instance1fbcbse1fwigr as Unit_instance,
  Unitkvevlwgzwiuc as Unit,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { GatedFrameClockitlbjxiuqx0l as GatedFrameClock } from './GatedFrameClock.mjs';
import { Recomposerz8i9k4kgomr5 as Recomposer } from '../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Recomposer.mjs';
import { Composition3i4qzif9cz3j9 as Composition } from '../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composition.mjs';
import { CoroutineStart_UNDISPATCHED_getInstance1s89xhsoy2cne as CoroutineStart_UNDISPATCHED_getInstance } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineStart.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { Companion_instancenjq7hgnlnxbm as Companion_instance } from '../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/snapshots/Snapshot.mjs';
import { composableLambdaInstance3tvqar9a11755 as composableLambdaInstance } from '../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/internal/ComposableLambda.mjs';
import { AbstractApplier6w52ib7nbxo1 as AbstractApplier } from '../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Applier.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { MutableStateFlow34bfoyvwu8czu as MutableStateFlow } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/StateFlow.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function launchMolecule(_this__u8e3s4, mode, context, snapshotNotifier, body) {
  context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
  var tmp;
  if (snapshotNotifier === VOID) {
    // Inline function 'app.cash.molecule.defaultSnapshotNotifier' call
    tmp = SnapshotNotifier_WhileActive_getInstance();
  } else {
    tmp = snapshotNotifier;
  }
  snapshotNotifier = tmp;
  var flow = {_v: null};
  launchMolecule_0(_this__u8e3s4, mode, launchMolecule$lambda(flow), context, snapshotNotifier, body);
  return ensureNotNull(flow._v);
}
function launchMolecule_0(_this__u8e3s4, mode, emitter, context, snapshotNotifier, body) {
  context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
  var tmp;
  if (snapshotNotifier === VOID) {
    // Inline function 'app.cash.molecule.defaultSnapshotNotifier' call
    tmp = SnapshotNotifier_WhileActive_getInstance();
  } else {
    tmp = snapshotNotifier;
  }
  snapshotNotifier = tmp;
  var tmp_0;
  switch (mode.x3_1) {
    case 0:
      tmp_0 = EmptyCoroutineContext_getInstance();
      break;
    case 1:
      tmp_0 = new (GatedFrameClock())(_this__u8e3s4, context);
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  var clockContext = tmp_0;
  var finalContext = _this__u8e3s4.w20().ir(context).ir(clockContext);
  var recomposer = new (Recomposer())(finalContext);
  var composition = Composition(UnitApplier_getInstance(), recomposer);
  var snapshotHandle = {_v: null};
  var tmp_1 = CoroutineStart_UNDISPATCHED_getInstance();
  launch(_this__u8e3s4, finalContext, tmp_1, launchMolecule$slambda_0(recomposer, composition, snapshotHandle, null));
  switch (snapshotNotifier.x3_1) {
    case 0:
      break;
    case 1:
      var applyScheduled = {_v: false};
      var tmp_2 = Companion_instance;
      snapshotHandle._v = tmp_2.v7n(launchMolecule$lambda_0(applyScheduled, _this__u8e3s4, finalContext));
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  composition.h71(ComposableLambda$invoke$ref(composableLambdaInstance(-17548624, true, launchMolecule$lambda_1(emitter, body))));
}
var UnitApplierClass;
function UnitApplier() {
  if (UnitApplierClass === VOID) {
    class $ extends AbstractApplier() {
      constructor() {
        UnitApplier_instance = null;
        super(Unit_instance);
        UnitApplier_instance = this;
      }
      b7t(index, instance) {
      }
      n6i(index, instance) {
        return this.b7t(index, instance instanceof Unit() ? instance : THROW_CCE());
      }
      c7t(index, instance) {
      }
      m6i(index, instance) {
        return this.c7t(index, instance instanceof Unit() ? instance : THROW_CCE());
      }
      p6i(from, to, count) {
      }
      o6i(index, count) {
      }
      z6i() {
      }
    }
    initMetadataForObject($, 'UnitApplier');
    UnitApplierClass = $;
  }
  return UnitApplierClass;
}
var UnitApplier_instance;
function UnitApplier_getInstance() {
  if (UnitApplier_instance === VOID)
    new (UnitApplier())();
  return UnitApplier_instance;
}
function launchMolecule$lambda($flow) {
  return function (value) {
    var outputFlow = $flow._v;
    var tmp;
    if (!(outputFlow == null)) {
      outputFlow.b2r(value);
      tmp = Unit_instance;
    } else {
      $flow._v = MutableStateFlow(value);
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
var launchMolecule$slambdaClass;
function launchMolecule$slambda() {
  if (launchMolecule$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($recomposer, $composition, $snapshotHandle, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.l7t_1 = $recomposer;
        $box.m7t_1 = $composition;
        $box.n7t_1 = $snapshotHandle;
        super(resultContinuation, $box);
      }
      x3e($this$launch, $completion) {
        var tmp = this.y3e($this$launch, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 5;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 4;
                this.fd_1 = 2;
                suspendResult = this.l7t_1.g79(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.p7t_1 = suspendResult;
                this.gd_1 = 5;
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.gd_1 = 5;
                this.m7t_1.z24();
                var tmp0_safe_receiver = this.n7t_1._v;
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  tmp0_safe_receiver.z24();
                }

                return Unit_instance;
              case 4:
                this.gd_1 = 5;
                var t = this.id_1;
                this.m7t_1.z24();
                var tmp0_safe_receiver_0 = this.n7t_1._v;
                if (tmp0_safe_receiver_0 == null)
                  null;
                else {
                  tmp0_safe_receiver_0.z24();
                }

                throw t;
              case 5:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 5) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      y3e($this$launch, completion) {
        var i = new (launchMolecule$slambda())(this.l7t_1, this.m7t_1, this.n7t_1, completion);
        i.o7t_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    launchMolecule$slambdaClass = $;
  }
  return launchMolecule$slambdaClass;
}
function launchMolecule$slambda_0($recomposer, $composition, $snapshotHandle, resultContinuation) {
  var i = new (launchMolecule$slambda())($recomposer, $composition, $snapshotHandle, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var launchMolecule$lambda$slambdaClass;
function launchMolecule$lambda$slambda() {
  if (launchMolecule$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($applyScheduled, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.y7t_1 = $applyScheduled;
        super(resultContinuation, $box);
      }
      x3e($this$launch, $completion) {
        var tmp = this.y3e($this$launch, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              this.y7t_1._v = false;
              Companion_instance.t75();
              return Unit_instance;
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      y3e($this$launch, completion) {
        var i = new (launchMolecule$lambda$slambda())(this.y7t_1, completion);
        i.z7t_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    launchMolecule$lambda$slambdaClass = $;
  }
  return launchMolecule$lambda$slambdaClass;
}
function launchMolecule$lambda$slambda_0($applyScheduled, resultContinuation) {
  var i = new (launchMolecule$lambda$slambda())($applyScheduled, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
function launchMolecule$lambda_0($applyScheduled, $this_launchMolecule, $finalContext) {
  return function (it) {
    var tmp;
    if (!$applyScheduled._v) {
      $applyScheduled._v = true;
      launch($this_launchMolecule, $finalContext, VOID, launchMolecule$lambda$slambda_0($applyScheduled, null));
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
function ComposableLambda$invoke$ref(p0) {
  return function (_this__u8e3s4, p0_0) {
    return p0.x6v(_this__u8e3s4, p0_0);
  };
}
function launchMolecule$lambda_1($emitter, $body) {
  return function ($composer, $changed) {
    var $composer_0 = $composer;
    var tmp;
    if (!(($changed & 3) === 2) || !$composer_0.z6v()) {
      if (isTraceInProgress()) {
        traceEventStart(-17548624, $changed, -1, 'app.cash.molecule.launchMolecule.<anonymous> (molecule.kt:259)');
      }
      $emitter($body($composer_0, 0));
      var tmp_0;
      if (isTraceInProgress()) {
        traceEventEnd();
        tmp_0 = Unit_instance;
      }
      tmp = tmp_0;
    } else {
      $composer_0.o6p();
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
//region block: exports
export {
  launchMolecule as launchMolecule1z0g03wollr13,
};
//endregion

//# sourceMappingURL=molecule.mjs.map
