import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Mutex16li1l0asjv17 as Mutex } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/sync/Mutex.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_usecases_VisitHistoryUsecase$stable;
var $getLatestVisitsCOROUTINE$Class;
function $getLatestVisitsCOROUTINE$() {
  if ($getLatestVisitsCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.mac_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 8;
                var tmp_0 = this;
                tmp_0.nac_1 = this.mac_1.tac_1;
                this.oac_1 = this.nac_1;
                var tmp_1 = this;
                tmp_1.pac_1 = null;
                this.fd_1 = 1;
                suspendResult = this.oac_1.n2w(this.pac_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.qac_1 = Unit_instance;
                this.fd_1 = 2;
                continue $sm;
              case 2:
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.gd_1 = 7;
                this.fd_1 = 4;
                suspendResult = this.mac_1.sac_1.ia5(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 4:
                var ARGUMENT = suspendResult;
                this.rac_1 = ARGUMENT.x8o();
                this.gd_1 = 8;
                this.fd_1 = 5;
                var tmp_2 = this;
                continue $sm;
              case 5:
                var tmp_3 = this.rac_1;
                this.gd_1 = 8;
                this.oac_1.z2v(this.pac_1);
                var tmp_4 = this;
                return tmp_3;
              case 6:
                this.qac_1;
                this.gd_1 = 8;
                this.oac_1.z2v(this.pac_1);
                return Unit_instance;
              case 7:
                this.gd_1 = 8;
                var t = this.id_1;
                this.oac_1.z2v(this.pac_1);
                throw t;
              case 8:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 8) {
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
    $getLatestVisitsCOROUTINE$Class = $;
  }
  return $getLatestVisitsCOROUTINE$Class;
}
var VisitHistoryUsecaseClass;
function VisitHistoryUsecase() {
  if (VisitHistoryUsecaseClass === VOID) {
    class $ {
      constructor(repository) {
        this.sac_1 = repository;
        this.tac_1 = Mutex();
      }
      uac($completion) {
        var tmp = new ($getLatestVisitsCOROUTINE$())(this, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'VisitHistoryUsecase', VOID, VOID, [KoinComponent()], [1, 0]);
    VisitHistoryUsecaseClass = $;
  }
  return VisitHistoryUsecaseClass;
}
//region block: init
com_mbta_tid_mbta_app_usecases_VisitHistoryUsecase$stable = 8;
//endregion
//region block: exports
export {
  VisitHistoryUsecase as VisitHistoryUsecase3a9kuglea7v5h,
};
//endregion

//# sourceMappingURL=VisitHistoryUsecase.mjs.map
