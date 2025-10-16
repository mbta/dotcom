import { KoinPlatform_instance1hins6zdjrg2h as KoinPlatform_instance } from '../../../../projects-core-koin-core/org/koin/mp/KoinPlatform.mjs';
import {
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  Exceptiondt2hlxn7j7vw as Exception,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { ComposeContextWrapperu7w32q6dcnyi as ComposeContextWrapper } from './ComposeContextWrapper.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { compositionLocalOf2vv0ziv1snr2w as compositionLocalOf } from '../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/CompositionLocal.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var LocalKoinApplication;
function get_LocalKoinScope() {
  _init_properties_KoinApplication_kt__lzwtrf();
  return LocalKoinScope;
}
var LocalKoinScope;
function getDefaultKoinContext() {
  _init_properties_KoinApplication_kt__lzwtrf();
  return KoinPlatform_instance.r7v();
}
function getDefaultRootScope() {
  _init_properties_KoinApplication_kt__lzwtrf();
  return KoinPlatform_instance.r7v().r7u_1.e7v_1;
}
function currentKoinScope($composer, $changed) {
  _init_properties_KoinApplication_kt__lzwtrf();
  var $composer_0 = $composer;
  $composer_0.d6w(1668867238);
  if (isTraceInProgress()) {
    traceEventStart(1668867238, $changed, -1, 'org.koin.compose.currentKoinScope (KoinApplication.kt:81)');
  }
  // Inline function 'kotlin.run' call
  var tmp;
  try {
    var currentScope = $composer_0.b6x(get_LocalKoinScope()).w7z();
    var tmp_0;
    if (currentScope.m7z()) {
      var tmp0_elvis_lhs = $composer_0.b6x(get_LocalKoinScope()).v7z();
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        var message = "Can't get Koin scope. Scope '" + currentScope.toString() + "' is closed";
        throw IllegalStateException().o5(toString(message));
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      tmp_0 = tmp_1;
    } else {
      tmp_0 = currentScope;
    }
    tmp = tmp_0;
  } catch ($p) {
    var tmp_2;
    if ($p instanceof Exception()) {
      var e = $p;
      var tmp1_elvis_lhs = $composer_0.b6x(get_LocalKoinScope()).v7z();
      var tmp_3;
      if (tmp1_elvis_lhs == null) {
        var message_0 = "Can't get Koin scope due to error: " + e.toString();
        throw IllegalStateException().o5(toString(message_0));
      } else {
        tmp_3 = tmp1_elvis_lhs;
      }
      tmp_2 = tmp_3;
    } else {
      throw $p;
    }
    tmp = tmp_2;
  }
  var tmp0 = tmp;
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  $composer_0.f6w();
  return tmp0;
}
function LocalKoinApplication$lambda() {
  _init_properties_KoinApplication_kt__lzwtrf();
  var tmp = getDefaultKoinContext();
  return new (ComposeContextWrapper())(tmp, LocalKoinApplication$lambda$lambda);
}
function LocalKoinApplication$lambda$lambda() {
  _init_properties_KoinApplication_kt__lzwtrf();
  return getDefaultKoinContext();
}
function LocalKoinScope$lambda() {
  _init_properties_KoinApplication_kt__lzwtrf();
  var tmp = getDefaultRootScope();
  return new (ComposeContextWrapper())(tmp, LocalKoinScope$lambda$lambda);
}
function LocalKoinScope$lambda$lambda() {
  _init_properties_KoinApplication_kt__lzwtrf();
  return getDefaultRootScope();
}
var properties_initialized_KoinApplication_kt_xwamuh;
function _init_properties_KoinApplication_kt__lzwtrf() {
  if (!properties_initialized_KoinApplication_kt_xwamuh) {
    properties_initialized_KoinApplication_kt_xwamuh = true;
    LocalKoinApplication = compositionLocalOf(VOID, LocalKoinApplication$lambda);
    LocalKoinScope = compositionLocalOf(VOID, LocalKoinScope$lambda);
  }
}
//region block: exports
export {
  currentKoinScope as currentKoinScope1ww4lpd83xrhn,
};
//endregion

//# sourceMappingURL=KoinApplication.mjs.map
