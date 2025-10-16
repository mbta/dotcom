import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Favorites_getInstance3togomol211bi as Favorites_getInstance,
  NearbyTransit_getInstancejl45kk1axml2 as NearbyTransit_getInstance,
} from '../routes/SheetRoutes.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  DataStore1uvzeoqavnttw as DataStore,
  edit1exdrg3szbt8n as edit,
} from '../datastore/DataStore.js.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { MutablePreferences2tul9gagkqjrf as MutablePreferences } from '../datastore/Preferences.js.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { stringPreferencesKey27jkgr6k1ibb6 as stringPreferencesKey } from '../datastore/PreferencesKey.js.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_TabPreferencesRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockTabPreferencesRepository$stable;
var DefaultTab_Favorites_instance;
var DefaultTab_Nearby_instance;
var DefaultTab_entriesInitialized;
function DefaultTab_initEntries() {
  if (DefaultTab_entriesInitialized)
    return Unit_instance;
  DefaultTab_entriesInitialized = true;
  DefaultTab_Favorites_instance = new (DefaultTab())('Favorites', 0, Favorites_getInstance());
  DefaultTab_Nearby_instance = new (DefaultTab())('Nearby', 1, NearbyTransit_getInstance());
}
var DefaultTabClass;
function DefaultTab() {
  if (DefaultTabClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, entrypoint) {
        super(name, ordinal);
        this.ra2_1 = entrypoint;
      }
    }
    initMetadataForClass($, 'DefaultTab');
    DefaultTabClass = $;
  }
  return DefaultTabClass;
}
var ITabPreferencesRepositoryClass;
function ITabPreferencesRepository() {
  if (ITabPreferencesRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ITabPreferencesRepository', VOID, VOID, VOID, [0, 1]);
    ITabPreferencesRepositoryClass = $;
  }
  return ITabPreferencesRepositoryClass;
}
function _get_dataStore__idjja($this) {
  var tmp0 = $this.ta2_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('dataStore', 1, tmp, TabPreferencesRepository$_get_dataStore_$ref_yujh5e(), null);
  return tmp0.v1();
}
function TabPreferencesRepository$dataStore$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(DataStore()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(DataStore()), tmp2, parameters);
    }
    return tmp;
  };
}
function TabPreferencesRepository$_get_dataStore_$ref_yujh5e() {
  return function (p0) {
    return _get_dataStore__idjja(p0);
  };
}
var TabPreferencesRepository$setDefaultTab$slambdaClass;
function TabPreferencesRepository$setDefaultTab$slambda() {
  if (TabPreferencesRepository$setDefaultTab$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $defaultTab, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.da3_1 = this$0;
        $box.ea3_1 = $defaultTab;
        super(resultContinuation, $box);
      }
      r9v(it, $completion) {
        var tmp = this.s9v(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.r9v(p1 instanceof MutablePreferences() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              this.fa3_1.u9v(this.da3_1.ua2_1, this.ea3_1.w3_1);
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
      s9v(it, completion) {
        var i = new (TabPreferencesRepository$setDefaultTab$slambda())(this.da3_1, this.ea3_1, completion);
        i.fa3_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    TabPreferencesRepository$setDefaultTab$slambdaClass = $;
  }
  return TabPreferencesRepository$setDefaultTab$slambdaClass;
}
function TabPreferencesRepository$setDefaultTab$slambda_0(this$0, $defaultTab, resultContinuation) {
  var i = new (TabPreferencesRepository$setDefaultTab$slambda())(this$0, $defaultTab, resultContinuation);
  var l = function (it, $completion) {
    return i.r9v(it, $completion);
  };
  l.$arity = 1;
  return l;
}
var $setDefaultTabCOROUTINE$Class;
function $setDefaultTabCOROUTINE$() {
  if ($setDefaultTabCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, defaultTab, resultContinuation) {
        super(resultContinuation);
        this.oa3_1 = _this__u8e3s4;
        this.pa3_1 = defaultTab;
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
                var tmp_0 = _get_dataStore__idjja(this.oa3_1);
                suspendResult = edit(tmp_0, TabPreferencesRepository$setDefaultTab$slambda_0(this.oa3_1, this.pa3_1, null), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return Unit_instance;
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
    $setDefaultTabCOROUTINE$Class = $;
  }
  return $setDefaultTabCOROUTINE$Class;
}
var TabPreferencesRepositoryClass;
function TabPreferencesRepository() {
  if (TabPreferencesRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.ta2_1 = lazy(mode, TabPreferencesRepository$dataStore$delegate$lambda(this, null, null));
        this.ua2_1 = stringPreferencesKey('default_tab');
      }
      sa2(defaultTab, $completion) {
        var tmp = new ($setDefaultTabCOROUTINE$())(this, defaultTab, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'TabPreferencesRepository', TabPreferencesRepository, VOID, [ITabPreferencesRepository(), KoinComponent()], [0, 1]);
    TabPreferencesRepositoryClass = $;
  }
  return TabPreferencesRepositoryClass;
}
function DefaultTab_Nearby_getInstance() {
  DefaultTab_initEntries();
  return DefaultTab_Nearby_instance;
}
//region block: init
com_mbta_tid_mbta_app_repositories_TabPreferencesRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockTabPreferencesRepository$stable = 0;
//endregion
//region block: exports
export {
  ITabPreferencesRepository as ITabPreferencesRepositorysbncwx25ulu9,
  TabPreferencesRepository as TabPreferencesRepository23zq7s4pvu92l,
  DefaultTab_Nearby_getInstance as DefaultTab_Nearby_getInstancehvzzty04tlvq,
};
//endregion

//# sourceMappingURL=TabPreferencesRepository.mjs.map
