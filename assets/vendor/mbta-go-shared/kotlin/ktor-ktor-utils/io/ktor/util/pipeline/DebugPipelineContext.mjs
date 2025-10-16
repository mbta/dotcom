import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from './PipelineContext.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function proceedLoop($this, $completion) {
  var tmp = new ($proceedLoopCOROUTINE$())($this, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
var $proceedLoopCOROUTINE$Class;
function $proceedLoopCOROUTINE$() {
  if ($proceedLoopCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.f3l_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 6;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.g3l_1 = this.f3l_1.n3l_1;
                if (this.g3l_1 === -1) {
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 2:
                this.h3l_1 = this.f3l_1.k3l_1;
                if (this.g3l_1 >= this.h3l_1.c1()) {
                  this.f3l_1.o3l();
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  this.fd_1 = 3;
                  continue $sm;
                }

              case 3:
                this.i3l_1 = this.h3l_1.e1(this.g3l_1);
                this.f3l_1.n3l_1 = this.g3l_1 + 1 | 0;
                this.fd_1 = 4;
                suspendResult = this.i3l_1(this.f3l_1, this.f3l_1.m3l_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 4:
                this.fd_1 = 1;
                continue $sm;
              case 5:
                return this.f3l_1.m3l_1;
              case 6:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 6) {
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
    $proceedLoopCOROUTINE$Class = $;
  }
  return $proceedLoopCOROUTINE$Class;
}
var DebugPipelineContextClass;
function DebugPipelineContext() {
  if (DebugPipelineContextClass === VOID) {
    class $ extends PipelineContext() {
      constructor(context, interceptors, subject, coroutineContext) {
        super(context);
        this.k3l_1 = interceptors;
        this.l3l_1 = coroutineContext;
        this.m3l_1 = subject;
        this.n3l_1 = 0;
      }
      w20() {
        return this.l3l_1;
      }
      p3l() {
        return this.m3l_1;
      }
      o3l() {
        this.n3l_1 = -1;
      }
      q3l(subject, $completion) {
        this.m3l_1 = subject;
        return this.r3l($completion);
      }
      r3l($completion) {
        var index = this.n3l_1;
        if (index < 0)
          return this.m3l_1;
        if (index >= this.k3l_1.c1()) {
          this.o3l();
          return this.m3l_1;
        }
        return proceedLoop(this, $completion);
      }
      s3l(initial, $completion) {
        this.n3l_1 = 0;
        this.m3l_1 = initial;
        return this.r3l($completion);
      }
    }
    initMetadataForClass($, 'DebugPipelineContext', VOID, VOID, VOID, [1, 0]);
    DebugPipelineContextClass = $;
  }
  return DebugPipelineContextClass;
}
//region block: exports
export {
  DebugPipelineContext as DebugPipelineContext2zfnr2i0vcihk,
};
//endregion

//# sourceMappingURL=DebugPipelineContext.mjs.map
