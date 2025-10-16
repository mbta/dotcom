import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
import {
  DataStore1uvzeoqavnttw as DataStore,
  edit1exdrg3szbt8n as edit,
} from '../datastore/DataStore.js.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import { MutablePreferences2tul9gagkqjrf as MutablePreferences } from '../datastore/Preferences.js.mjs';
import { get_json30ncetgsyi7ak as get_json } from '../Json.mjs';
import { Favorites2lbq3pa2e14l4 as Favorites } from '../model/Favorite.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { serializer1i4e9ym37oxmo as serializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/Serializers.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { firstvh3bah3c9r20 as first } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/Reduce.mjs';
import { isBlank1dvkhjjvox3p0 as isBlank } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { stringPreferencesKey27jkgr6k1ibb6 as stringPreferencesKey } from '../datastore/PreferencesKey.js.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_FavoritesRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockFavoritesRepository$stable;
var IFavoritesRepositoryClass;
function IFavoritesRepository() {
  if (IFavoritesRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IFavoritesRepository', VOID, VOID, VOID, [0, 1]);
    IFavoritesRepositoryClass = $;
  }
  return IFavoritesRepositoryClass;
}
var FavoritesRepository$getFavorites$o$collect$slambdaClass;
function FavoritesRepository$getFavorites$o$collect$slambda() {
  if (FavoritesRepository$getFavorites$o$collect$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($$this$unsafeFlow, this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.h9u_1 = $$this$unsafeFlow;
        $box.i9u_1 = this$0;
        super(resultContinuation, $box);
      }
      r4m(value, $completion) {
        var tmp = this.s4m(value, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.r4m((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                var tmp_0 = this;
                tmp_0.k9u_1 = this.h9u_1;
                var tmp_1 = this;
                tmp_1.l9u_1 = this.j9u_1;
                this.m9u_1 = this.k9u_1;
                this.n9u_1 = this.l9u_1;
                this.fd_1 = 1;
                var it = this.n9u_1;
                suspendResult = this.m9u_1.z2n(it.q9u(this.i9u_1.p9u_1), this);
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
      s4m(value, completion) {
        var i = new (FavoritesRepository$getFavorites$o$collect$slambda())(this.h9u_1, this.i9u_1, completion);
        i.j9u_1 = value;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    FavoritesRepository$getFavorites$o$collect$slambdaClass = $;
  }
  return FavoritesRepository$getFavorites$o$collect$slambdaClass;
}
function FavoritesRepository$getFavorites$o$collect$slambda_0($$this$unsafeFlow, this$0, resultContinuation) {
  var i = new (FavoritesRepository$getFavorites$o$collect$slambda())($$this$unsafeFlow, this$0, resultContinuation);
  var l = function (value, $completion) {
    return i.r4m(value, $completion);
  };
  l.$arity = 1;
  return l;
}
var $collectCOROUTINE$Class;
function $collectCOROUTINE$() {
  if ($collectCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, collector, resultContinuation) {
        super(resultContinuation);
        this.z9u_1 = _this__u8e3s4;
        this.a9v_1 = collector;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                var tmp_0 = this;
                tmp_0.b9v_1 = this.a9v_1;
                this.c9v_1 = this.b9v_1;
                this.fd_1 = 1;
                var tmp_1 = FavoritesRepository$getFavorites$o$collect$slambda_0(this.c9v_1, this.z9u_1.e9v_1, null);
                suspendResult = this.z9u_1.d9v_1.b2o(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_1), this);
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
    $collectCOROUTINE$Class = $;
  }
  return $collectCOROUTINE$Class;
}
function _get_dataStore__idjja($this) {
  var tmp0 = $this.o9u_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('dataStore', 1, tmp, FavoritesRepository$_get_dataStore_$ref_cwci2u(), null);
  return tmp0.v1();
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.f9v_1 = function_0;
      }
      z2n(value, $completion) {
        return this.f9v_1(value, $completion);
      }
      z4() {
        return this.f9v_1;
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, FlowCollector()) : false) {
          var tmp_0;
          if (!(other == null) ? isInterface(other, FunctionAdapter()) : false) {
            tmp_0 = equals(this.z4(), other.z4());
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.z4());
      }
    }
    initMetadataForClass($, 'sam$kotlinx_coroutines_flow_FlowCollector$0', VOID, VOID, [FlowCollector(), FunctionAdapter()], [1]);
    sam$kotlinx_coroutines_flow_FlowCollector$0Class = $;
  }
  return sam$kotlinx_coroutines_flow_FlowCollector$0Class;
}
function FavoritesRepository$dataStore$delegate$lambda($this, $qualifier, $parameters) {
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
function FavoritesRepository$_get_dataStore_$ref_cwci2u() {
  return function (p0) {
    return _get_dataStore__idjja(p0);
  };
}
var FavoritesRepository$getFavorites$$inlined$map$1Class;
function FavoritesRepository$getFavorites$$inlined$map$1() {
  if (FavoritesRepository$getFavorites$$inlined$map$1Class === VOID) {
    class $ {
      constructor($this, this$0) {
        this.d9v_1 = $this;
        this.e9v_1 = this$0;
      }
      a2o(collector, $completion) {
        var tmp = new ($collectCOROUTINE$())(this, collector, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      b2o(collector, $completion) {
        return this.a2o(collector, $completion);
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, VOID, [1]);
    FavoritesRepository$getFavorites$$inlined$map$1Class = $;
  }
  return FavoritesRepository$getFavorites$$inlined$map$1Class;
}
var FavoritesRepository$setFavorites$slambdaClass;
function FavoritesRepository$setFavorites$slambda() {
  if (FavoritesRepository$setFavorites$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $favorites, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.o9v_1 = this$0;
        $box.p9v_1 = $favorites;
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
              var tmp0 = get_json();
              var value = this.p9v_1;
              var this_0 = tmp0.k14();
              var this_1 = serializer(this_0, createKType(getKClass(Favorites()), arrayOf([]), false));
              this.q9v_1.u9v(this.o9v_1.p9u_1, tmp0.n10(isInterface(this_1, KSerializer()) ? this_1 : THROW_CCE(), value));
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
        var i = new (FavoritesRepository$setFavorites$slambda())(this.o9v_1, this.p9v_1, completion);
        i.q9v_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    FavoritesRepository$setFavorites$slambdaClass = $;
  }
  return FavoritesRepository$setFavorites$slambdaClass;
}
function FavoritesRepository$setFavorites$slambda_0(this$0, $favorites, resultContinuation) {
  var i = new (FavoritesRepository$setFavorites$slambda())(this$0, $favorites, resultContinuation);
  var l = function (it, $completion) {
    return i.r9v(it, $completion);
  };
  l.$arity = 1;
  return l;
}
var $getFavoritesCOROUTINE$Class;
function $getFavoritesCOROUTINE$() {
  if ($getFavoritesCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.d9w_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                this.fd_1 = 1;
                var this_0 = _get_dataStore__idjja(this.d9w_1).e9w();
                suspendResult = first(new (FavoritesRepository$getFavorites$$inlined$map$1())(this_0, this.d9w_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var encoded = suspendResult;
                if (encoded == null || isBlank(encoded)) {
                  return new (Favorites())();
                }

                var TRY_RESULT;
                this.gd_1 = 2;
                var this_1 = get_json();
                var this_2 = this_1.k14();
                var this_3 = serializer(this_2, createKType(getKClass(Favorites()), arrayOf([]), false));
                TRY_RESULT = this_1.o10(isInterface(this_3, KSerializer()) ? this_3 : THROW_CCE(), encoded);
                this.gd_1 = 4;
                this.fd_1 = 3;
                continue $sm;
              case 2:
                this.gd_1 = 4;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Exception()) {
                  var e = this.id_1;
                  TRY_RESULT = new (Favorites())();
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 3:
                this.gd_1 = 4;
                return TRY_RESULT;
              case 4:
                throw this.id_1;
            }
          } catch ($p) {
            var e_0 = $p;
            if (this.gd_1 === 4) {
              throw e_0;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_0;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $getFavoritesCOROUTINE$Class = $;
  }
  return $getFavoritesCOROUTINE$Class;
}
var $setFavoritesCOROUTINE$Class;
function $setFavoritesCOROUTINE$() {
  if ($setFavoritesCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, favorites, resultContinuation) {
        super(resultContinuation);
        this.n9w_1 = _this__u8e3s4;
        this.o9w_1 = favorites;
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
                var tmp_0 = _get_dataStore__idjja(this.n9w_1);
                suspendResult = edit(tmp_0, FavoritesRepository$setFavorites$slambda_0(this.n9w_1, this.o9w_1, null), this);
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
    $setFavoritesCOROUTINE$Class = $;
  }
  return $setFavoritesCOROUTINE$Class;
}
var FavoritesRepositoryClass;
function FavoritesRepository() {
  if (FavoritesRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.o9u_1 = lazy(mode, FavoritesRepository$dataStore$delegate$lambda(this, null, null));
        this.p9u_1 = stringPreferencesKey('favorites');
      }
      x9t($completion) {
        var tmp = new ($getFavoritesCOROUTINE$())(this, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      y9t(favorites, $completion) {
        var tmp = new ($setFavoritesCOROUTINE$())(this, favorites, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'FavoritesRepository', FavoritesRepository, VOID, [IFavoritesRepository(), KoinComponent()], [0, 1]);
    FavoritesRepositoryClass = $;
  }
  return FavoritesRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_FavoritesRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockFavoritesRepository$stable = 8;
//endregion
//region block: exports
export {
  FavoritesRepository as FavoritesRepository2lg24e6btu7pl,
  IFavoritesRepository as IFavoritesRepository1ho9a62ku2ni8,
};
//endregion

//# sourceMappingURL=FavoritesRepository.mjs.map
