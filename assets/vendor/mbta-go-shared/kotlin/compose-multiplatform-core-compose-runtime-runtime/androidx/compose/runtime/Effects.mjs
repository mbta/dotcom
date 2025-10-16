import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from './Composer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { RememberObserver1inqpwyx2vbkc as RememberObserver } from './RememberObserver.mjs';
import { CoroutineScopelux7s7zphw7e as CoroutineScope } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { cancel1xim2hrvjmwpn as cancel } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { PlatformOptimizedCancellationException2pl94xdzfhvls as PlatformOptimizedCancellationException } from './internal/Utils.nonJvm.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_InternalDisposableEffectScope() {
  _init_properties_Effects_kt__be5lps();
  return InternalDisposableEffectScope;
}
var InternalDisposableEffectScope;
var androidx_compose_runtime_DisposableEffectScope$stable;
var androidx_compose_runtime_LaunchedEffectImpl$stable;
var androidx_compose_runtime_CompositionScopedCoroutineScopeCanceller$stable;
var androidx_compose_runtime_RememberedCoroutineScope$stable;
var DisposableEffectScopeClass;
function DisposableEffectScope() {
  if (DisposableEffectScopeClass === VOID) {
    class $ {}
    initMetadataForClass($, 'DisposableEffectScope', DisposableEffectScope);
    DisposableEffectScopeClass = $;
  }
  return DisposableEffectScopeClass;
}
function DisposableEffect(key1, key2, effect, $composer, $changed) {
  _init_properties_Effects_kt__be5lps();
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, 1429097729, 'C(DisposableEffect)P(1,2)186@8313L53:Effects.kt#9igjgp');
  if (isTraceInProgress()) {
    traceEventStart(1429097729, $changed, -1, 'androidx.compose.runtime.DisposableEffect (Effects.kt:185)');
  }
  sourceInformationMarkerStart($composer_0, -1026611882, 'CC(remember):Effects.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid = !!($composer_0.s6m(key1) | $composer_0.s6m(key2));
  // Inline function 'kotlin.let' call
  var it = $composer_0.g6y();
  var tmp;
  if (invalid || it === Companion_getInstance().x6p_1) {
    var value = new (DisposableEffectImpl())(effect);
    $composer_0.h6y(value);
    tmp = value;
  } else {
    tmp = it;
  }
  var tmp_0 = tmp;
  (tmp_0 == null ? true : !(tmp_0 == null)) || THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
}
function DisposableEffect_0(key1, effect, $composer, $changed) {
  _init_properties_Effects_kt__be5lps();
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -1371986847, 'C(DisposableEffect)P(1)149@6436L47:Effects.kt#9igjgp');
  if (isTraceInProgress()) {
    traceEventStart(-1371986847, $changed, -1, 'androidx.compose.runtime.DisposableEffect (Effects.kt:148)');
  }
  sourceInformationMarkerStart($composer_0, 75604336, 'CC(remember):Effects.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid = $composer_0.s6m(key1);
  // Inline function 'kotlin.let' call
  var it = $composer_0.g6y();
  var tmp;
  if (invalid || it === Companion_getInstance().x6p_1) {
    var value = new (DisposableEffectImpl())(effect);
    $composer_0.h6y(value);
    tmp = value;
  } else {
    tmp = it;
  }
  var tmp_0 = tmp;
  (tmp_0 == null ? true : !(tmp_0 == null)) || THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
}
function LaunchedEffect(key1, block, $composer, $changed) {
  _init_properties_Effects_kt__be5lps();
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, 1179185413, 'C(LaunchedEffect)P(1)318@14464L58:Effects.kt#9igjgp');
  if (isTraceInProgress()) {
    traceEventStart(1179185413, $changed, -1, 'androidx.compose.runtime.LaunchedEffect (Effects.kt:316)');
  }
  var applyContext = $composer_0.b6w();
  sourceInformationMarkerStart($composer_0, -674177409, 'CC(remember):Effects.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid = $composer_0.s6m(key1);
  // Inline function 'kotlin.let' call
  var it = $composer_0.g6y();
  var tmp;
  if (invalid || it === Companion_getInstance().x6p_1) {
    var value = new (LaunchedEffectImpl())(applyContext, block);
    $composer_0.h6y(value);
    tmp = value;
  } else {
    tmp = it;
  }
  var tmp_0 = tmp;
  (tmp_0 == null ? true : !(tmp_0 == null)) || THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
}
function LaunchedEffect_0(keys, block, $composer, $changed) {
  _init_properties_Effects_kt__be5lps();
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -139560008, 'C(LaunchedEffect)P(1)379@17637L59:Effects.kt#9igjgp');
  if (isTraceInProgress()) {
    traceEventStart(-139560008, $changed, -1, 'androidx.compose.runtime.LaunchedEffect (Effects.kt:377)');
  }
  var applyContext = $composer_0.b6w();
  // Inline function 'androidx.compose.runtime.remember' call
  var keys_0 = keys.slice();
  var $composer_1 = $composer_0;
  sourceInformationMarkerStart($composer_1, -568225417, 'CC(remember)P(1):Composables.kt#9igjgp');
  var invalid = false;
  var inductionVariable = 0;
  var last = keys_0.length;
  while (inductionVariable < last) {
    var key = keys_0[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    invalid = !!(invalid | $composer_1.s6m(key));
  }
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_0 = invalid;
  // Inline function 'kotlin.let' call
  var it = $composer_1.g6y();
  var tmp;
  if (invalid_0 || it === Companion_getInstance().x6p_1) {
    var value = new (LaunchedEffectImpl())(applyContext, block);
    $composer_1.h6y(value);
    tmp = value;
  } else {
    tmp = it;
  }
  var tmp_0 = tmp;
  (tmp_0 == null ? true : !(tmp_0 == null)) || THROW_CCE();
  sourceInformationMarkerEnd($composer_1);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
}
function LaunchedEffect_1(key1, key2, block, $composer, $changed) {
  _init_properties_Effects_kt__be5lps();
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, 590241125, 'C(LaunchedEffect)P(1,2)337@15458L64:Effects.kt#9igjgp');
  if (isTraceInProgress()) {
    traceEventStart(590241125, $changed, -1, 'androidx.compose.runtime.LaunchedEffect (Effects.kt:335)');
  }
  var applyContext = $composer_0.b6w();
  sourceInformationMarkerStart($composer_0, 286045285, 'CC(remember):Effects.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid = !!($composer_0.s6m(key1) | $composer_0.s6m(key2));
  // Inline function 'kotlin.let' call
  var it = $composer_0.g6y();
  var tmp;
  if (invalid || it === Companion_getInstance().x6p_1) {
    var value = new (LaunchedEffectImpl())(applyContext, block);
    $composer_0.h6y(value);
    tmp = value;
  } else {
    tmp = it;
  }
  var tmp_0 = tmp;
  (tmp_0 == null ? true : !(tmp_0 == null)) || THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
}
function LaunchedEffect_2(key1, key2, key3, block, $composer, $changed) {
  _init_properties_Effects_kt__be5lps();
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -54093371, 'C(LaunchedEffect)P(1,2,3)356@16478L70:Effects.kt#9igjgp');
  if (isTraceInProgress()) {
    traceEventStart(-54093371, $changed, -1, 'androidx.compose.runtime.LaunchedEffect (Effects.kt:354)');
  }
  var applyContext = $composer_0.b6w();
  sourceInformationMarkerStart($composer_0, -444114357, 'CC(remember):Effects.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid = !!(!!($composer_0.s6m(key1) | $composer_0.s6m(key2)) | $composer_0.s6m(key3));
  // Inline function 'kotlin.let' call
  var it = $composer_0.g6y();
  var tmp;
  if (invalid || it === Companion_getInstance().x6p_1) {
    var value = new (LaunchedEffectImpl())(applyContext, block);
    $composer_0.h6y(value);
    tmp = value;
  } else {
    tmp = it;
  }
  var tmp_0 = tmp;
  (tmp_0 == null ? true : !(tmp_0 == null)) || THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
}
var DisposableEffectImplClass;
function DisposableEffectImpl() {
  if (DisposableEffectImplClass === VOID) {
    class $ {
      constructor(effect) {
        this.v72_1 = effect;
        this.w72_1 = null;
      }
      x72() {
        this.w72_1 = this.v72_1(get_InternalDisposableEffectScope());
      }
      y72() {
        var tmp0_safe_receiver = this.w72_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.z24();
        }
        this.w72_1 = null;
      }
      z72() {
      }
    }
    initMetadataForClass($, 'DisposableEffectImpl', VOID, VOID, [RememberObserver()]);
    DisposableEffectImplClass = $;
  }
  return DisposableEffectImplClass;
}
var LaunchedEffectImplClass;
function LaunchedEffectImpl() {
  if (LaunchedEffectImplClass === VOID) {
    class $ {
      constructor(parentCoroutineContext, task) {
        this.a73_1 = task;
        this.b73_1 = CoroutineScope(parentCoroutineContext);
        this.c73_1 = null;
      }
      x72() {
        var tmp0_safe_receiver = this.c73_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          cancel(tmp0_safe_receiver, 'Old job was still running!');
        }
        this.c73_1 = launch(this.b73_1, VOID, VOID, this.a73_1);
      }
      y72() {
        var tmp0_safe_receiver = this.c73_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.g22(LeftCompositionCancellationException().j73());
        }
        this.c73_1 = null;
      }
      z72() {
        var tmp0_safe_receiver = this.c73_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.g22(LeftCompositionCancellationException().j73());
        }
        this.c73_1 = null;
      }
    }
    initMetadataForClass($, 'LaunchedEffectImpl', VOID, VOID, [RememberObserver()]);
    LaunchedEffectImplClass = $;
  }
  return LaunchedEffectImplClass;
}
var LeftCompositionCancellationExceptionClass;
function LeftCompositionCancellationException() {
  if (LeftCompositionCancellationExceptionClass === VOID) {
    class $ extends PlatformOptimizedCancellationException() {
      static j73() {
        var $this = this.p73('The coroutine scope left the composition');
        captureStack($this, $this.i73_1);
        return $this;
      }
    }
    initMetadataForClass($, 'LeftCompositionCancellationException', $.j73);
    LeftCompositionCancellationExceptionClass = $;
  }
  return LeftCompositionCancellationExceptionClass;
}
var properties_initialized_Effects_kt_cj8kem;
function _init_properties_Effects_kt__be5lps() {
  if (!properties_initialized_Effects_kt_cj8kem) {
    properties_initialized_Effects_kt_cj8kem = true;
    InternalDisposableEffectScope = new (DisposableEffectScope())();
    androidx_compose_runtime_DisposableEffectScope$stable = 0;
    androidx_compose_runtime_LaunchedEffectImpl$stable = 8;
    androidx_compose_runtime_CompositionScopedCoroutineScopeCanceller$stable = 8;
    androidx_compose_runtime_RememberedCoroutineScope$stable = 8;
  }
}
//region block: exports
export {
  DisposableEffect as DisposableEffect1u8qk60b90gi3,
  DisposableEffect_0 as DisposableEffect23vkjo4ftehz4,
  LaunchedEffect as LaunchedEffect1xc4bdzax6uqz,
  LaunchedEffect_1 as LaunchedEffect3knc11esygzlw,
  LaunchedEffect_2 as LaunchedEffect3nylcp830dck0,
  LaunchedEffect_0 as LaunchedEffect1pydbte2iu76e,
};
//endregion

//# sourceMappingURL=Effects.mjs.map
