import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toMutableSetjdpdbr9jsqq8 as toMutableSet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_usecases_FavoritesUsecases$stable;
var $getRouteStopDirectionFavoritesCOROUTINE$Class;
function $getRouteStopDirectionFavoritesCOROUTINE$() {
  if ($getRouteStopDirectionFavoritesCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.hab_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = this.hab_1.iab_1.x9t(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var storedFavorites = suspendResult;
                var tmp0_elvis_lhs = storedFavorites.r91_1;
                return tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
              case 2:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 2) {
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
    $getRouteStopDirectionFavoritesCOROUTINE$Class = $;
  }
  return $getRouteStopDirectionFavoritesCOROUTINE$Class;
}
var $updateRouteStopDirectionsCOROUTINE$Class;
function $updateRouteStopDirectionsCOROUTINE$() {
  if ($updateRouteStopDirectionsCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, newValues, context, defaultDirection, resultContinuation) {
        super(resultContinuation);
        this.sab_1 = _this__u8e3s4;
        this.tab_1 = newValues;
        this.uab_1 = context;
        this.vab_1 = defaultDirection;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                this.fd_1 = 1;
                suspendResult = this.sab_1.iab_1.x9t(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.wab_1 = suspendResult;
                var tmp_0 = this;
                var tmp0_elvis_lhs = this.wab_1.r91_1;
                tmp_0.xab_1 = toMutableSet(tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs);
                var tmp_1 = this;
                var tmp0 = this.tab_1;
                var destination = LinkedHashMap().sc();
                var _iterator__ex2g4s = tmp0.t1().x();
                while (_iterator__ex2g4s.y()) {
                  var element = _iterator__ex2g4s.z();
                  if (!element.v1() && this.xab_1.j1(element.u1()) || (element.v1() && !this.xab_1.j1(element.u1()))) {
                    destination.t3(element.u1(), element.v1());
                  }
                }

                tmp_1.yab_1 = destination;
                this.sab_1.jab_1.e8j(this.yab_1, this.uab_1, this.vab_1);
                var _iterator__ex2g4s_0 = this.tab_1.t1().x();
                while (_iterator__ex2g4s_0.y()) {
                  var element_0 = _iterator__ex2g4s_0.z();
                  var routeStopDirection = element_0.u1();
                  var isFavorite = element_0.v1();
                  if (isFavorite) {
                    this.xab_1.i(routeStopDirection);
                  } else {
                    this.xab_1.m3(routeStopDirection);
                  }
                }

                this.fd_1 = 2;
                suspendResult = this.sab_1.iab_1.y9t(this.wab_1.t91(this.xab_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                return Unit_instance;
              case 3:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 3) {
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
    $updateRouteStopDirectionsCOROUTINE$Class = $;
  }
  return $updateRouteStopDirectionsCOROUTINE$Class;
}
var FavoritesUsecasesClass;
function FavoritesUsecases() {
  if (FavoritesUsecasesClass === VOID) {
    class $ {
      constructor(repository, analytics) {
        this.iab_1 = repository;
        this.jab_1 = analytics;
      }
      zab($completion) {
        var tmp = new ($getRouteStopDirectionFavoritesCOROUTINE$())(this, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      aac(newValues, context, defaultDirection, $completion) {
        var tmp = new ($updateRouteStopDirectionsCOROUTINE$())(this, newValues, context, defaultDirection, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'FavoritesUsecases', VOID, VOID, [KoinComponent()], [0, 3]);
    FavoritesUsecasesClass = $;
  }
  return FavoritesUsecasesClass;
}
//region block: init
com_mbta_tid_mbta_app_usecases_FavoritesUsecases$stable = 8;
//endregion
//region block: exports
export {
  FavoritesUsecases as FavoritesUsecases3umt3qcf03962,
};
//endregion

//# sourceMappingURL=FavoritesUsecases.mjs.map
