import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
  CoroutineScopelux7s7zphw7e as CoroutineScope_0,
} from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Companion_getInstance2mow8xipgd4ir as Companion_getInstance } from './EasternTimeInstant.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  numberToLong1a4cndvg6c52s as numberToLong,
  toLongw1zpgk99d84b as toLong,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { delayolwo40i9ucjz as delay } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Delay.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { MutableSharedFlow3g4w4npzofx4w as MutableSharedFlow } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/SharedFlow.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Dispatchers.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import {
  Duration5ynfiptaqcrg as Duration,
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance_0,
  toDuration7gy6v749ektt as toDuration,
  _Duration___get_inWholeSeconds__impl__hpy7b32fu0rnoit26fw as _Duration___get_inWholeSeconds__impl__hpy7b3,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import {
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance_1,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import { currentKoinScope1ww4lpd83xrhn as currentKoinScope } from '../../../../../../projects-compose-koin-compose/org/koin/compose/KoinApplication.mjs';
import { Clock2yl0fnip31kbe as Clock } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Clock.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { collectAsState2sgm3emhm5kcs as collectAsState } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotFlow.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_utils_ClockTickHandler$stable;
var ClockTickHandler$Companion$getClockFlow$slambdaClass;
function ClockTickHandler$Companion$getClockFlow$slambda() {
  if (ClockTickHandler$Companion$getClockFlow$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($clock, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.pad_1 = $clock;
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
                this.gd_1 = 4;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!true) {
                  this.fd_1 = 5;
                  continue $sm;
                }

                this.rad_1 = Companion_getInstance().zac(this.pad_1);
                this.fd_1 = 2;
                suspendResult = Companion_getInstance_2().tad_1.z2n(this.rad_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                var tmp_0 = this;
                var this_0 = this.rad_1.ll();
                tmp_0.sad_1 = numberToLong(1000).g4(this_0.j4(toLong(1000)));
                this.fd_1 = 3;
                suspendResult = delay(this.sad_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 3:
                this.fd_1 = 1;
                continue $sm;
              case 4:
                throw this.id_1;
              case 5:
                return Unit_instance;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 4) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      y3e($this$launch, completion) {
        var i = new (ClockTickHandler$Companion$getClockFlow$slambda())(this.pad_1, completion);
        i.qad_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    ClockTickHandler$Companion$getClockFlow$slambdaClass = $;
  }
  return ClockTickHandler$Companion$getClockFlow$slambdaClass;
}
function ClockTickHandler$Companion$getClockFlow$slambda_0($clock, resultContinuation) {
  var i = new (ClockTickHandler$Companion$getClockFlow$slambda())($clock, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.tad_1 = MutableSharedFlow(0);
        this.uad_1 = null;
      }
      vad(clock) {
        if (this.uad_1 == null) {
          var tmp = this;
          var tmp_0 = CoroutineScope_0(Dispatchers_getInstance().u28_1);
          tmp.uad_1 = launch(tmp_0, VOID, VOID, ClockTickHandler$Companion$getClockFlow$slambda_0(clock, null));
        }
        return this.tad_1;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_2() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function timer(updateInterval, clock, $composer, $changed, $default) {
  var updateInterval_0 = {_v: new (Duration())(updateInterval)};
  var clock_0 = clock;
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -1306299144, 'C(timer)P(1:kotlin.time.Duration)44@1506L12,46@1571L144,51@1737L55:Timer.kt#sg20bf');
  if (!(($default & 1) === 0)) {
    // Inline function 'kotlin.time.Companion.seconds' call
    Companion_getInstance_0();
    var tmp$ret$0 = toDuration(5, DurationUnit_SECONDS_getInstance());
    updateInterval_0._v = new (Duration())(tmp$ret$0);
  }
  if (!(($default & 2) === 0)) {
    // Inline function 'org.koin.compose.koinInject' call
    var qualifier = null;
    var scope = null;
    var $composer_1 = $composer_0;
    $composer_1.d6w(-1168520582);
    if (!((3 & 1) === 0))
      qualifier = null;
    if (!((3 & 2) === 0))
      scope = currentKoinScope($composer_1, 0);
    $composer_1.d6w(-1633490746);
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!($composer_1.s6m(qualifier) | $composer_1.s6m(scope));
    // Inline function 'kotlin.let' call
    var it = $composer_1.g6y();
    var tmp;
    if (invalid || it === Companion_getInstance_1().x6p_1) {
      var value = scope.o7z(getKClass(Clock()), qualifier);
      $composer_1.h6y(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.f6w();
    $composer_1.f6w();
    clock_0 = tmp1_group;
  }
  if (isTraceInProgress()) {
    traceEventStart(-1306299144, $changed, -1, 'com.mbta.tid.mbta_app.utils.timer (Timer.kt:45)');
  }
  sourceInformationMarkerStart($composer_0, -1223021752, 'CC(remember):Timer.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_0 = $composer_0.g6y();
  var tmp_1;
  if (false || it_0 === Companion_getInstance_1().x6p_1) {
    // Inline function 'kotlinx.coroutines.flow.filter' call
    // Inline function 'kotlinx.coroutines.flow.unsafeTransform' call
    var this_0 = Companion_getInstance_2().vad(clock_0);
    // Inline function 'kotlinx.coroutines.flow.internal.unsafeFlow' call
    var value_0 = new (timer$$inlined$cache$1())(this_0, updateInterval_0);
    $composer_0.h6y(value_0);
    tmp_1 = value_0;
  } else {
    tmp_1 = it_0;
  }
  var tmp_2 = tmp_1;
  var tmp1_group_0 = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var timerFlow = tmp1_group_0;
  var tmp_3 = Companion_getInstance().zac(clock_0);
  var tmp0 = collectAsState(timerFlow, tmp_3, null, $composer_0, 0, 2);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp0;
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.wad_1 = function_0;
      }
      z2n(value, $completion) {
        return this.wad_1(value, $completion);
      }
      z4() {
        return this.wad_1;
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
var timer$o$collect$slambdaClass;
function timer$o$collect$slambda() {
  if (timer$o$collect$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($$this$unsafeFlow, $updateInterval, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.fae_1 = $$this$unsafeFlow;
        $box.gae_1 = $updateInterval;
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
                this.gd_1 = 5;
                var tmp_0 = this;
                tmp_0.iae_1 = this.fae_1;
                var tmp_1 = this;
                tmp_1.jae_1 = this.hae_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.lae_1 = this.iae_1;
                this.mae_1 = this.jae_1;
                if (this.mae_1.cad(_Duration___get_inWholeSeconds__impl__hpy7b3(this.gae_1._v.xl_1))) {
                  this.fd_1 = 3;
                  suspendResult = this.lae_1.z2n(this.mae_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 2:
                this.kae_1 = Unit_instance;
                if (false) {
                  this.fd_1 = 1;
                  continue $sm;
                }

                this.fd_1 = 4;
                continue $sm;
              case 3:
                this.kae_1 = suspendResult;
                this.fd_1 = 4;
                continue $sm;
              case 4:
                return Unit_instance;
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
      s4m(value, completion) {
        var i = new (timer$o$collect$slambda())(this.fae_1, this.gae_1, completion);
        i.hae_1 = value;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    timer$o$collect$slambdaClass = $;
  }
  return timer$o$collect$slambdaClass;
}
function timer$o$collect$slambda_0($$this$unsafeFlow, $updateInterval, resultContinuation) {
  var i = new (timer$o$collect$slambda())($$this$unsafeFlow, $updateInterval, resultContinuation);
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
        this.vae_1 = _this__u8e3s4;
        this.wae_1 = collector;
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
                tmp_0.xae_1 = this.wae_1;
                this.yae_1 = this.xae_1;
                this.fd_1 = 1;
                var tmp_1 = timer$o$collect$slambda_0(this.yae_1, this.vae_1.aaf_1, null);
                suspendResult = this.vae_1.zae_1.b2o(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_1), this);
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
var timer$$inlined$cache$1Class;
function timer$$inlined$cache$1() {
  if (timer$$inlined$cache$1Class === VOID) {
    class $ {
      constructor($this, $updateInterval) {
        this.zae_1 = $this;
        this.aaf_1 = $updateInterval;
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
    timer$$inlined$cache$1Class = $;
  }
  return timer$$inlined$cache$1Class;
}
//region block: init
com_mbta_tid_mbta_app_utils_ClockTickHandler$stable = 0;
//endregion
//region block: exports
export {
  timer as timer1vca8rhu6yjny,
};
//endregion

//# sourceMappingURL=Timer.mjs.map
