import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  Errorw1uxmtp4dqlz as Error_0,
  Ok3b20rn08cfbo3 as Ok,
} from '../../model/response/ApiResult.mjs';
import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { println2shhhgwwt4c61 as println } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/io/console.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function fetchApi(errorBannerRepo, errorKey, getData, onSuccess, onRefreshAfterError, $completion) {
  var tmp;
  if (onSuccess === VOID) {
    tmp = fetchApi$slambda_0(null);
  } else {
    tmp = onSuccess;
  }
  onSuccess = tmp;
  var tmp_0 = new ($fetchApiCOROUTINE$())(errorBannerRepo, errorKey, getData, onSuccess, onRefreshAfterError, $completion);
  tmp_0.hd_1 = Unit_instance;
  tmp_0.id_1 = null;
  return tmp_0.nd();
}
var fetchApi$slambdaClass;
function fetchApi$slambda() {
  if (fetchApi$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      abe(it, $completion) {
        var tmp = this.bbe(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.abe(!(p1 == null) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
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
      bbe(it, completion) {
        var i = new (fetchApi$slambda())(completion);
        i.zbd_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    fetchApi$slambdaClass = $;
  }
  return fetchApi$slambdaClass;
}
function fetchApi$slambda_0(resultContinuation) {
  var i = new (fetchApi$slambda())(resultContinuation);
  var l = function (it, $completion) {
    return i.abe(it, $completion);
  };
  l.$arity = 1;
  return l;
}
var $fetchApiCOROUTINE$Class;
function $fetchApiCOROUTINE$() {
  if ($fetchApiCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(errorBannerRepo, errorKey, getData, onSuccess, onRefreshAfterError, resultContinuation) {
        super(resultContinuation);
        this.ibd_1 = errorBannerRepo;
        this.jbd_1 = errorKey;
        this.kbd_1 = getData;
        this.lbd_1 = onSuccess;
        this.mbd_1 = onRefreshAfterError;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 5;
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = this.kbd_1(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.nbd_1 = suspendResult;
                this.gd_1 = 5;
                this.fd_1 = 3;
                continue $sm;
              case 2:
                this.gd_1 = 5;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Exception()) {
                  this.obd_1 = this.id_1;
                  var tmp_1 = this;
                  var tmp0_elvis_lhs = this.obd_1.message;
                  tmp_1.nbd_1 = new (Error_0())(null, tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs);
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 3:
                this.gd_1 = 5;
                this.pbd_1 = this.nbd_1;
                this.qbd_1 = this.pbd_1;
                var tmp_2 = this.qbd_1;
                if (tmp_2 instanceof Error_0()) {
                  println('fetchApi error: API request ' + this.jbd_1 + ' failed: ' + this.pbd_1.toString());
                  this.ibd_1.u9t(this.jbd_1, this.pbd_1.toString(), this.mbd_1);
                  this.fd_1 = 6;
                  continue $sm;
                } else {
                  var tmp_3 = this.qbd_1;
                  if (tmp_3 instanceof Ok()) {
                    this.ibd_1.v9t(this.jbd_1);
                    this.fd_1 = 4;
                    suspendResult = this.lbd_1(this.pbd_1.f9n_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    noWhenBranchMatchedException();
                  }
                }

                break;
              case 4:
                this.fd_1 = 6;
                continue $sm;
              case 5:
                throw this.id_1;
              case 6:
                return Unit_instance;
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
    }
    initMetadataForCoroutine($);
    $fetchApiCOROUTINE$Class = $;
  }
  return $fetchApiCOROUTINE$Class;
}
//region block: exports
export {
  fetchApi as fetchApiwttxxko4paj1,
};
//endregion

//# sourceMappingURL=fetchApi.mjs.map
