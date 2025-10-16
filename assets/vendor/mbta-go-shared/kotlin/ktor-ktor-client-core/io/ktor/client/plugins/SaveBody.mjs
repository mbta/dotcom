import { KProperty02ce7r476m8633 as KProperty0 } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { KtorSimpleLogger1xdphsp5l4e48 as KtorSimpleLogger } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/KtorSimpleLoggerJs.mjs';
import { Phases_getInstance2gb8yk5kt1qdy as Phases_getInstance } from '../statement/HttpResponsePipeline.mjs';
import {
  Unit_instance1fbcbse1fwigr as Unit_instance,
  Unitkvevlwgzwiuc as Unit,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { PipelineContext34fsb0mycu471 as PipelineContext } from '../../../../../ktor-ktor-utils/io/ktor/util/pipeline/PipelineContext.mjs';
import { HttpResponse1532ob1hsse1y as HttpResponse } from '../statement/HttpResponse.mjs';
import { get_isTraceEnabled82xibuu04nxp as get_isTraceEnabled } from '../../../../../ktor-ktor-utils/io/ktor/util/logging/LoggerJs.mjs';
import { save1zsice73vjdpw as save } from '../call/SavedCall.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
  Result__exceptionOrNull_impl_p6xea9ty3elzpd9eo3 as Result__exceptionOrNull_impl_p6xea9,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { canceldn4b3cdqcfny as cancel } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannel.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  createClientPlugin16sdkdabbewya as createClientPlugin,
  createClientPluginjwpvufjows5r as createClientPlugin_0,
} from './api/CreatePluginUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_SKIP_SAVE_BODY() {
  _init_properties_SaveBody_kt__lbc3fj();
  return SKIP_SAVE_BODY;
}
var SKIP_SAVE_BODY;
function get_RESPONSE_BODY_SAVED() {
  _init_properties_SaveBody_kt__lbc3fj();
  return RESPONSE_BODY_SAVED;
}
var RESPONSE_BODY_SAVED;
function get_LOGGER() {
  _init_properties_SaveBody_kt__lbc3fj();
  var tmp0 = LOGGER$delegate;
  var tmp = KProperty0();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('LOGGER', 0, tmp, _get_LOGGER_$ref_77hhxy(), null);
  return tmp0.v1();
}
var LOGGER$delegate;
function get_SaveBody() {
  _init_properties_SaveBody_kt__lbc3fj();
  return SaveBody;
}
var SaveBody;
var SaveBodyPlugin;
function get_isSaved(_this__u8e3s4) {
  _init_properties_SaveBody_kt__lbc3fj();
  return _this__u8e3s4.d4s().x4r().h3h(get_RESPONSE_BODY_SAVED());
}
var SaveBodyPluginConfigClass;
function SaveBodyPluginConfig() {
  if (SaveBodyPluginConfigClass === VOID) {
    class $ {
      constructor() {
        this.d5j_1 = false;
      }
    }
    initMetadataForClass($, 'SaveBodyPluginConfig', SaveBodyPluginConfig);
    SaveBodyPluginConfigClass = $;
  }
  return SaveBodyPluginConfigClass;
}
function LOGGER$delegate$lambda() {
  _init_properties_SaveBody_kt__lbc3fj();
  return KtorSimpleLogger('io.ktor.client.plugins.SaveBody');
}
function _get_LOGGER_$ref_77hhxy() {
  return function () {
    return get_LOGGER();
  };
}
function SaveBody$lambda($this$createClientPlugin) {
  _init_properties_SaveBody_kt__lbc3fj();
  var tmp = Phases_getInstance().x4z_1;
  $this$createClientPlugin.b50_1.i4o_1.s3m(tmp, SaveBody$lambda$slambda_0(null));
  return Unit_instance;
}
var SaveBody$lambda$slambdaClass;
function SaveBody$lambda$slambda() {
  if (SaveBody$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      u4z($this$intercept, response, $completion) {
        var tmp = this.v4z($this$intercept, response, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = p1 instanceof PipelineContext() ? p1 : THROW_CCE();
        return this.u4z(tmp, p2 instanceof HttpResponse() ? p2 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 6;
                this.o5j_1 = this.n5j_1.d4s();
                this.p5j_1 = this.o5j_1.x4r();
                if (this.p5j_1.h3h(get_SKIP_SAVE_BODY())) {
                  var this_0 = get_LOGGER();
                  if (get_isTraceEnabled(this_0)) {
                    this_0.u3n('Skipping body saving for ' + this.o5j_1.w4r().f4s().toString());
                  }
                  return Unit_instance;
                }

                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 5;
                var this_1 = get_LOGGER();
                if (get_isTraceEnabled(this_1)) {
                  this_1.u3n('Saving body for ' + this.o5j_1.w4r().f4s().toString());
                }

                this.fd_1 = 2;
                suspendResult = save(this.o5j_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.r5j_1 = suspendResult;
                this.q5j_1 = this.r5j_1.g4p();
                this.gd_1 = 6;
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.s5j_1 = this.q5j_1;
                this.gd_1 = 6;
                this.m5j_1;
                var tmp_0;
                try {
                  cancel(this.n5j_1.l4s());
                  tmp_0 = _Result___init__impl__xyqfz8(Unit_instance);
                } catch ($p) {
                  var tmp_1;
                  if ($p instanceof Error) {
                    var e = $p;
                    tmp_1 = _Result___init__impl__xyqfz8(createFailure(e));
                  } else {
                    throw $p;
                  }
                  tmp_0 = tmp_1;
                }

                var this_2 = tmp_0;
                var tmp0_safe_receiver = Result__exceptionOrNull_impl_p6xea9(this_2);
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  get_LOGGER().t3n('Failed to cancel response body', tmp0_safe_receiver);
                }

                this.t5j_1 = this.s5j_1;
                this.p5j_1.i3h(get_RESPONSE_BODY_SAVED(), Unit_instance);
                this.fd_1 = 4;
                suspendResult = this.m5j_1.q3l(this.t5j_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 4:
                return Unit_instance;
              case 5:
                this.gd_1 = 6;
                var t = this.id_1;
                this.m5j_1;
                var tmp_2;
                try {
                  cancel(this.n5j_1.l4s());
                  tmp_2 = _Result___init__impl__xyqfz8(Unit_instance);
                } catch ($p) {
                  var tmp_3;
                  if ($p instanceof Error) {
                    var e_0 = $p;
                    tmp_3 = _Result___init__impl__xyqfz8(createFailure(e_0));
                  } else {
                    throw $p;
                  }
                  tmp_2 = tmp_3;
                }

                var this_3 = tmp_2;
                var tmp0_safe_receiver_0 = Result__exceptionOrNull_impl_p6xea9(this_3);
                if (tmp0_safe_receiver_0 == null)
                  null;
                else {
                  get_LOGGER().t3n('Failed to cancel response body', tmp0_safe_receiver_0);
                }

                throw t;
              case 6:
                throw this.id_1;
            }
          } catch ($p) {
            var e_1 = $p;
            if (this.gd_1 === 6) {
              throw e_1;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_1;
            }
          }
         while (true);
      }
      v4z($this$intercept, response, completion) {
        var i = new (SaveBody$lambda$slambda())(completion);
        i.m5j_1 = $this$intercept;
        i.n5j_1 = response;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    SaveBody$lambda$slambdaClass = $;
  }
  return SaveBody$lambda$slambdaClass;
}
function SaveBody$lambda$slambda_0(resultContinuation) {
  var i = new (SaveBody$lambda$slambda())(resultContinuation);
  var l = function ($this$intercept, response, $completion) {
    return i.u4z($this$intercept, response, $completion);
  };
  l.$arity = 2;
  return l;
}
function SaveBodyPluginConfig$_init_$ref_lwjaof() {
  var l = function () {
    return new (SaveBodyPluginConfig())();
  };
  l.callableName = '<init>';
  return l;
}
function SaveBodyPlugin$lambda($this$createClientPlugin) {
  _init_properties_SaveBody_kt__lbc3fj();
  if ($this$createClientPlugin.c50_1.d5j_1) {
    get_LOGGER().s3n('It is no longer possible to disable body saving for all requests. Use client.prepareRequest(...).execute { ... } syntax to prevent saving the body in memory.\n\nThis API is deprecated and will be removed in Ktor 4.0.0\nIf you were relying on this functionality, share your use case by commenting on this issue: https://youtrack.jetbrains.com/issue/KTOR-8367/');
  } else {
    get_LOGGER().s3n('The SaveBodyPlugin plugin is deprecated and can be safely removed. Request bodies are now saved in memory by default for all non-streaming responses.');
  }
  return Unit_instance;
}
var properties_initialized_SaveBody_kt_hzvee7;
function _init_properties_SaveBody_kt__lbc3fj() {
  if (!properties_initialized_SaveBody_kt_hzvee7) {
    properties_initialized_SaveBody_kt_hzvee7 = true;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'SkipSaveBody';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp = getKClass(Unit());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_0;
    try {
      tmp_0 = createKType(getKClass(Unit()), arrayOf([]), false);
    } catch ($p) {
      var tmp_1;
      if ($p instanceof Error) {
        var _unused_var__etf5q3 = $p;
        tmp_1 = null;
      } else {
        throw $p;
      }
      tmp_0 = tmp_1;
    }
    var tmp$ret$0 = tmp_0;
    var tmp$ret$1 = new (TypeInfo())(tmp, tmp$ret$0);
    SKIP_SAVE_BODY = new (AttributeKey())(name, tmp$ret$1);
    // Inline function 'io.ktor.util.AttributeKey' call
    var name_0 = 'ResponseBodySaved';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp_2 = getKClass(Unit());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_3;
    try {
      tmp_3 = createKType(getKClass(Unit()), arrayOf([]), false);
    } catch ($p) {
      var tmp_4;
      if ($p instanceof Error) {
        var _unused_var__etf5q3_0 = $p;
        tmp_4 = null;
      } else {
        throw $p;
      }
      tmp_3 = tmp_4;
    }
    var tmp$ret$0_0 = tmp_3;
    var tmp$ret$1_0 = new (TypeInfo())(tmp_2, tmp$ret$0_0);
    RESPONSE_BODY_SAVED = new (AttributeKey())(name_0, tmp$ret$1_0);
    LOGGER$delegate = lazy(LOGGER$delegate$lambda);
    SaveBody = createClientPlugin('SaveBody', SaveBody$lambda);
    var tmp_5 = SaveBodyPluginConfig$_init_$ref_lwjaof();
    SaveBodyPlugin = createClientPlugin_0('DoubleReceivePlugin', tmp_5, SaveBodyPlugin$lambda);
  }
}
//region block: exports
export {
  get_SaveBody as get_SaveBody3aignvhtsnvcr,
  get_isSaved as get_isSaved1yor47kvbhumv,
};
//endregion

//# sourceMappingURL=SaveBody.mjs.map
