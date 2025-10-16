import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { TimeMarkSerializer_instance20nbxy674b7dj as TimeMarkSerializer_instance } from './TimeMarkSerializer.mjs';
import {
  ValueTimeMark3e7hmed1q029a as ValueTimeMark,
  ValueTimeMark__toString_impl_ow3ax61i24rbzgoxmoi as ValueTimeMark__toString_impl_ow3ax6,
  ValueTimeMark__hashCode_impl_oduu931xt570oez5llr as ValueTimeMark__hashCode_impl_oduu93,
  ValueTimeMark__elapsedNow_impl_eonqvs1dlqois04h852 as ValueTimeMark__elapsedNow_impl_eonqvs,
  Monotonic_instance6v32gqtywf7e as Monotonic_instance,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/TimeSource.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
  SerializerFactory1qv9hivitncuv as SerializerFactory,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import {
  toString30pk9tzaqopn as toString_0,
  arrayOf1akklvh2at202 as arrayOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { get_json30ncetgsyi7ak as get_json } from '../Json.mjs';
import { Duration__compareTo_impl_pchp0f3d3hhywzdbk51 as Duration__compareTo_impl_pchp0f } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { serializer1i4e9ym37oxmo as serializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/Serializers.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  Exceptiondt2hlxn7j7vw as Exception,
  RuntimeException1r3t0zl97011n as RuntimeException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { println2shhhgwwt4c61 as println } from '../../../../../../kotlin-kotlin-stdlib/kotlin/io/console.mjs';
import { FileSystem23s9wmosmz1qj as FileSystem } from '../fs/FileSystem.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import { SystemPaths2f59gersnjq9q as SystemPaths } from '../utils/SystemPaths.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { bodyAsText1is16t8kuttw9 as bodyAsText } from '../../../../../../ktor-ktor-client-core/io/ktor/client/statement/HttpResponse.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { etag8et71yhy18a4 as etag } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpMessageProperties.mjs';
import {
  Ok3b20rn08cfbo3 as Ok,
  Errorw1uxmtp4dqlz as Error_0,
} from '../model/response/ApiResult.mjs';
import { Companion_getInstanceud97dyzf471m as Companion_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpStatusCode.mjs';
import { MutableStateFlow34bfoyvwu8czu as MutableStateFlow } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/StateFlow.mjs';
import { asStateFlow34rribx643ke5 as asStateFlow } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/Share.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { Mutex16li1l0asjv17 as Mutex } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/sync/Mutex.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_cache_ResponseMetadata_$serializer$stable;
var com_mbta_tid_mbta_app_cache_ResponseMetadata$stable;
var com_mbta_tid_mbta_app_cache_Response_$serializer$stable;
var com_mbta_tid_mbta_app_cache_Response$stable;
var com_mbta_tid_mbta_app_cache_ResponseCache$stable;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  return Companion_instance;
}
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.cache.ResponseMetadata', this, 3);
        tmp0_serialDesc.p1b('etag', false);
        tmp0_serialDesc.p1b('fetchTime', false);
        tmp0_serialDesc.p1b('invalidationKey', true);
        this.o8j_1 = tmp0_serialDesc;
      }
      p8j(encoder, value) {
        var tmp0_desc = this.o8j_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.p15(tmp0_desc, 0, StringSerializer_getInstance(), value.q8j_1);
        tmp1_output.n15(tmp0_desc, 1, TimeMarkSerializer_instance, new (ValueTimeMark())(value.r8j_1));
        if (tmp1_output.t15(tmp0_desc, 2) ? true : !(value.s8j_1 == null)) {
          tmp1_output.p15(tmp0_desc, 2, StringSerializer_getInstance(), value.s8j_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.p8j(encoder, value instanceof ResponseMetadata() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.o8j_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_input = decoder.v13(tmp0_desc);
        if (tmp7_input.l14()) {
          tmp4_local0 = tmp7_input.j14(tmp0_desc, 0, StringSerializer_getInstance(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          var tmp = TimeMarkSerializer_instance;
          var tmp_0 = tmp5_local1;
          var tmp_1 = tmp7_input.h14(tmp0_desc, 1, tmp, tmp_0 == null ? null : new (ValueTimeMark())(tmp_0));
          tmp5_local1 = tmp_1 == null ? null : tmp_1.bm_1;
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp7_input.j14(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp7_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp7_input.j14(tmp0_desc, 0, StringSerializer_getInstance(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                var tmp_2 = TimeMarkSerializer_instance;
                var tmp_3 = tmp5_local1;
                var tmp_4 = tmp7_input.h14(tmp0_desc, 1, tmp_2, tmp_3 == null ? null : new (ValueTimeMark())(tmp_3));
                tmp5_local1 = tmp_4 == null ? null : tmp_4.bm_1;
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp7_input.j14(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp7_input.w13(tmp0_desc);
        return ResponseMetadata().t8j(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
      }
      fz() {
        return this.o8j_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [get_nullable(StringSerializer_getInstance()), TimeMarkSerializer_instance, get_nullable(StringSerializer_getInstance())];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var ResponseMetadataClass;
function ResponseMetadata() {
  if (ResponseMetadataClass === VOID) {
    class $ {
      constructor(etag, fetchTime, invalidationKey) {
        invalidationKey = invalidationKey === VOID ? null : invalidationKey;
        this.q8j_1 = etag;
        this.r8j_1 = fetchTime;
        this.s8j_1 = invalidationKey;
      }
      toString() {
        return 'ResponseMetadata(etag=' + this.q8j_1 + ', fetchTime=' + ValueTimeMark__toString_impl_ow3ax6(this.r8j_1) + ', invalidationKey=' + this.s8j_1 + ')';
      }
      hashCode() {
        var result = this.q8j_1 == null ? 0 : getStringHashCode(this.q8j_1);
        result = imul(result, 31) + ValueTimeMark__hashCode_impl_oduu93(this.r8j_1) | 0;
        result = imul(result, 31) + (this.s8j_1 == null ? 0 : getStringHashCode(this.s8j_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ResponseMetadata()))
          return false;
        var tmp0_other_with_cast = other instanceof ResponseMetadata() ? other : THROW_CCE();
        if (!(this.q8j_1 == tmp0_other_with_cast.q8j_1))
          return false;
        if (!equals(this.r8j_1, tmp0_other_with_cast.r8j_1))
          return false;
        if (!(this.s8j_1 == tmp0_other_with_cast.s8j_1))
          return false;
        return true;
      }
      static t8j(seen0, etag, fetchTime, invalidationKey, serializationConstructorMarker) {
        if (!(3 === (3 & seen0))) {
          throwMissingFieldException(seen0, 3, $serializer_getInstance().o8j_1);
        }
        var $this = createThis(this);
        $this.q8j_1 = etag;
        $this.r8j_1 = fetchTime;
        if (0 === (seen0 & 4))
          $this.s8j_1 = null;
        else
          $this.s8j_1 = invalidationKey;
        return $this;
      }
    }
    initMetadataForClass($, 'ResponseMetadata', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    ResponseMetadataClass = $;
  }
  return ResponseMetadataClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.cache.Response', null, 2);
        tmp0_serialDesc.p1b('metadata', false);
        tmp0_serialDesc.p1b('body', false);
        this.u8j_1 = tmp0_serialDesc;
      }
      v8j(typeSerial0) {
        return $serializer_0().y8j(typeSerial0);
      }
      t1c(typeParamsSerializers) {
        return this.v8j(typeParamsSerializers[0]);
      }
    }
    initMetadataForCompanion($, VOID, [SerializerFactory()]);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_1() {
  if (Companion_instance_0 === VOID)
    new (Companion_0())();
  return Companion_instance_0;
}
var $serializerClass_0;
function $serializer_0() {
  if ($serializerClass_0 === VOID) {
    class $ {
      static z8j() {
        var $this = createThis(this);
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.cache.Response', $this, 2);
        tmp0_serialDesc.p1b('metadata', false);
        tmp0_serialDesc.p1b('body', false);
        $this.w8j_1 = tmp0_serialDesc;
        return $this;
      }
      a8k(encoder, value) {
        var tmp0_desc = this.w8j_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.n15(tmp0_desc, 0, $serializer_getInstance(), value.b8k_1);
        tmp1_output.n15(tmp0_desc, 1, this.x8j_1, value.c8k_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.a8k(encoder, value instanceof Response() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.w8j_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        if (tmp6_input.l14()) {
          tmp4_local0 = tmp6_input.h14(tmp0_desc, 0, $serializer_getInstance(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp6_input.h14(tmp0_desc, 1, this.x8j_1, tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp6_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp6_input.h14(tmp0_desc, 0, $serializer_getInstance(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp6_input.h14(tmp0_desc, 1, this.x8j_1, tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp6_input.w13(tmp0_desc);
        return Response().d8k(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.w8j_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [$serializer_getInstance(), this.x8j_1];
      }
      g1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [this.x8j_1];
      }
      static y8j(typeSerial0) {
        var $this = this.z8j();
        $this.x8j_1 = typeSerial0;
        return $this;
      }
    }
    initMetadataForClass($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_0 = $;
  }
  return $serializerClass_0;
}
var ResponseClass;
function Response() {
  if (ResponseClass === VOID) {
    class $ {
      constructor(metadata, body) {
        Companion_getInstance_1();
        this.b8k_1 = metadata;
        this.c8k_1 = body;
      }
      toString() {
        return 'Response(metadata=' + this.b8k_1.toString() + ', body=' + toString_0(this.c8k_1) + ')';
      }
      hashCode() {
        var result = this.b8k_1.hashCode();
        result = imul(result, 31) + (this.c8k_1 == null ? 0 : hashCode(this.c8k_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Response()))
          return false;
        var tmp0_other_with_cast = other instanceof Response() ? other : THROW_CCE();
        if (!this.b8k_1.equals(tmp0_other_with_cast.b8k_1))
          return false;
        if (!equals(this.c8k_1, tmp0_other_with_cast.c8k_1))
          return false;
        return true;
      }
      static d8k(seen0, metadata, body, serializationConstructorMarker) {
        Companion_getInstance_1();
        if (!(3 === (3 & seen0))) {
          throwMissingFieldException(seen0, 3, Companion_getInstance_1().u8j_1);
        }
        var $this = createThis(this);
        $this.b8k_1 = metadata;
        $this.c8k_1 = body;
        return $this;
      }
    }
    initMetadataForClass($, 'Response', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_1});
    ResponseClass = $;
  }
  return ResponseClass;
}
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {
      constructor() {
        this.e8k_1 = 'responseCache';
      }
    }
    initMetadataForCompanion($);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_2() {
  return Companion_instance_1;
}
function _get_fileSystem__siywv4($this) {
  var tmp0 = $this.m8k_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('fileSystem', 1, tmp, ResponseCache$_get_fileSystem_$ref_mlizoy(), null);
  return tmp0.v1();
}
function _get_systemPaths__e9p1ma($this) {
  var tmp0 = $this.n8k_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('systemPaths', 1, tmp, ResponseCache$_get_systemPaths_$ref_ohq99e(), null);
  return tmp0.v1();
}
function _get_cacheDirectory__i34528($this) {
  return _get_systemPaths__e9p1ma($this).p8k().r8k('responseCache');
}
function _get_cacheFilePath__b94zzm($this) {
  return _get_cacheDirectory__i34528($this).r8k($this.f8k_1 + '.json');
}
function _get_cacheMetadataFilePath__9oacv5($this) {
  return _get_cacheDirectory__i34528($this).r8k($this.f8k_1 + '-meta.json');
}
function decodeString($this, body) {
  return get_json().o10($this.h8k_1, body);
}
function getPossiblyStaleData($this) {
  var tmp0_elvis_lhs = $this.j8k_1;
  return tmp0_elvis_lhs == null ? readData($this) : tmp0_elvis_lhs;
}
function getData($this) {
  var data = getPossiblyStaleData($this);
  if (!(data == null)) {
    $this.k8k_1.b2r(data.c8k_1);
  }
  var tmp;
  if (!(data == null) && Duration__compareTo_impl_pchp0f(ValueTimeMark__elapsedNow_impl_eonqvs(data.b8k_1.r8j_1), $this.g8k_1) < 0) {
    tmp = data;
  } else {
    tmp = null;
  }
  return tmp;
}
function putData($this, response, $completion) {
  var tmp = new ($putDataCOROUTINE$())($this, response, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function readData($this) {
  try {
    var tmp0 = get_json();
    // Inline function 'kotlinx.serialization.json.Json.decodeFromString' call
    var string = _get_fileSystem__siywv4($this).c8l(_get_cacheMetadataFilePath__9oacv5($this));
    // Inline function 'kotlinx.serialization.serializer' call
    var this_0 = tmp0.k14();
    // Inline function 'kotlinx.serialization.internal.cast' call
    var this_1 = serializer(this_0, createKType(getKClass(ResponseMetadata()), arrayOf([]), false));
    var tmp$ret$1 = isInterface(this_1, KSerializer()) ? this_1 : THROW_CCE();
    var diskMetadata = tmp0.o10(tmp$ret$1, string);
    if (!(diskMetadata.s8j_1 == $this.i8k_1)) {
      return null;
    }
    var diskData = decodeString($this, _get_fileSystem__siywv4($this).c8l(_get_cacheFilePath__b94zzm($this)));
    $this.j8k_1 = new (Response())(diskMetadata, diskData);
    return $this.j8k_1;
  } catch ($p) {
    if ($p instanceof Exception()) {
      var error = $p;
      return null;
    } else {
      throw $p;
    }
  }
}
function writeData($this, metadata, responseBody) {
  try {
    _get_fileSystem__siywv4($this).d8l(ensureNotNull(_get_cacheFilePath__b94zzm($this).q21()));
    _get_fileSystem__siywv4($this).e8l(_get_cacheFilePath__b94zzm($this), responseBody);
    writeMetadata($this, metadata);
  } catch ($p) {
    if ($p instanceof Exception()) {
      var error = $p;
      println("Writing to '" + toString(_get_cacheFilePath__b94zzm($this)) + "' failed. " + error.toString());
    } else {
      throw $p;
    }
  }
}
function writeMetadata($this, metadata) {
  try {
    var tmp = _get_fileSystem__siywv4($this);
    var tmp_0 = _get_cacheMetadataFilePath__9oacv5($this);
    // Inline function 'kotlinx.serialization.json.Json.encodeToString' call
    var this_0 = get_json();
    // Inline function 'kotlinx.serialization.serializer' call
    var this_1 = this_0.k14();
    // Inline function 'kotlinx.serialization.internal.cast' call
    var this_2 = serializer(this_1, createKType(getKClass(ResponseMetadata()), arrayOf([]), false));
    var tmp$ret$1 = isInterface(this_2, KSerializer()) ? this_2 : THROW_CCE();
    var tmp$ret$2 = this_0.n10(tmp$ret$1, metadata);
    tmp.e8l(tmp_0, tmp$ret$2);
  } catch ($p) {
    if ($p instanceof Exception()) {
      var error = $p;
      println("Writing to '" + toString(_get_cacheMetadataFilePath__9oacv5($this)) + "' failed. " + error.toString());
    } else {
      throw $p;
    }
  }
}
function ResponseCache$fileSystem$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(FileSystem()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(FileSystem()), tmp2, parameters);
    }
    return tmp;
  };
}
function ResponseCache$_get_fileSystem_$ref_mlizoy() {
  return function (p0) {
    return _get_fileSystem__siywv4(p0);
  };
}
function ResponseCache$systemPaths$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(SystemPaths()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(SystemPaths()), tmp2, parameters);
    }
    return tmp;
  };
}
function ResponseCache$_get_systemPaths_$ref_ohq99e() {
  return function (p0) {
    return _get_systemPaths__e9p1ma(p0);
  };
}
var $putDataCOROUTINE$Class;
function $putDataCOROUTINE$() {
  if ($putDataCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, response, resultContinuation) {
        super(resultContinuation);
        this.a8l_1 = _this__u8e3s4;
        this.b8l_1 = response;
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
                suspendResult = bodyAsText(this.b8l_1, VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var responseBody = suspendResult;
                var nextData = new (Response())(new (ResponseMetadata())(etag(this.b8l_1), Monotonic_instance.ql(), this.a8l_1.i8k_1), decodeString(this.a8l_1, responseBody));
                this.a8l_1.j8k_1 = nextData;
                this.a8l_1.k8k_1.b2r(nextData.c8k_1);
                writeData(this.a8l_1, nextData.b8k_1, responseBody);
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
    $putDataCOROUTINE$Class = $;
  }
  return $putDataCOROUTINE$Class;
}
var $getOrFetchCOROUTINE$Class;
function $getOrFetchCOROUTINE$() {
  if ($getOrFetchCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, fetch, resultContinuation) {
        super(resultContinuation);
        this.n8l_1 = _this__u8e3s4;
        this.o8l_1 = fetch;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 14;
                var tmp_0 = this;
                tmp_0.p8l_1 = this.n8l_1.o8k_1;
                this.q8l_1 = this.p8l_1;
                var tmp_1 = this;
                tmp_1.r8l_1 = null;
                this.fd_1 = 1;
                suspendResult = this.q8l_1.n2w(this.r8l_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.s8l_1 = Unit_instance;
                this.fd_1 = 2;
                continue $sm;
              case 2:
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.gd_1 = 13;
                this.u8l_1 = getData(this.n8l_1);
                if (!(this.u8l_1 == null)) {
                  this.t8l_1 = new (Ok())(this.u8l_1.c8k_1);
                  this.gd_1 = 14;
                  this.fd_1 = 11;
                  continue $sm;
                } else {
                  this.fd_1 = 4;
                  continue $sm;
                }

              case 4:
                this.gd_1 = 10;
                this.fd_1 = 5;
                var tmp0_safe_receiver = this.n8l_1.j8k_1;
                var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.b8k_1;
                suspendResult = this.o8l_1(tmp1_safe_receiver == null ? null : tmp1_safe_receiver.q8j_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                this.v8l_1 = suspendResult;
                this.w8l_1 = this.v8l_1.m4s();
                if (this.w8l_1.equals(Companion_getInstance().s3w_1)) {
                  this.y8l_1 = this.n8l_1.j8k_1;
                  if (this.y8l_1 == null) {
                    this.t8l_1 = new (Error_0())(VOID, 'Failed to update cached data');
                    this.gd_1 = 14;
                    this.fd_1 = 11;
                    var tmp_2 = this;
                    continue $sm;
                  } else {
                    this.z8l_1 = this.y8l_1;
                    this.fd_1 = 8;
                    continue $sm;
                  }
                } else {
                  if (this.w8l_1.equals(Companion_getInstance().g3w_1)) {
                    this.fd_1 = 7;
                    suspendResult = putData(this.n8l_1, this.v8l_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    this.a8m_1 = this.v8l_1.m4s().g3y_1;
                    this.fd_1 = 6;
                    suspendResult = bodyAsText(this.v8l_1, VOID, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  }
                }

              case 6:
                var ARGUMENT = suspendResult;
                this.x8l_1 = new (Error_0())(this.a8m_1, ARGUMENT);
                this.fd_1 = 9;
                continue $sm;
              case 7:
                var tmp_3 = this;
                var tmp4_safe_receiver = getData(this.n8l_1);
                var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.c8k_1;
                var tmp_4;
                if (tmp5_elvis_lhs == null) {
                  throw RuntimeException().fb('Failed to set cached data');
                } else {
                  tmp_4 = tmp5_elvis_lhs;
                }

                tmp_3.x8l_1 = new (Ok())(tmp_4);
                this.fd_1 = 9;
                continue $sm;
              case 8:
                var data = this.z8l_1;
                data.b8k_1.r8j_1 = Monotonic_instance.ql();
                writeMetadata(this.n8l_1, data.b8k_1);
                this.x8l_1 = new (Ok())(data.c8k_1);
                this.fd_1 = 9;
                continue $sm;
              case 9:
                this.t8l_1 = this.x8l_1;
                this.gd_1 = 14;
                this.fd_1 = 11;
                continue $sm;
              case 10:
                this.gd_1 = 13;
                var tmp_5 = this.id_1;
                if (tmp_5 instanceof Exception()) {
                  var ex = this.id_1;
                  var tmp_6 = this;
                  var tmp6_elvis_lhs = ex.message;
                  tmp_6.t8l_1 = new (Error_0())(VOID, tmp6_elvis_lhs == null ? ex.toString() : tmp6_elvis_lhs);
                  this.gd_1 = 14;
                  this.fd_1 = 11;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 11:
                var tmp_7 = this.t8l_1;
                this.gd_1 = 14;
                this.q8l_1.z2v(this.r8l_1);
                var tmp_8 = this;
                return tmp_7;
              case 12:
                this.s8l_1;
                this.gd_1 = 14;
                this.q8l_1.z2v(this.r8l_1);
                return Unit_instance;
              case 13:
                this.gd_1 = 14;
                var t = this.id_1;
                this.q8l_1.z2v(this.r8l_1);
                throw t;
              case 14:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 14) {
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
    $getOrFetchCOROUTINE$Class = $;
  }
  return $getOrFetchCOROUTINE$Class;
}
var ResponseCacheClass;
function ResponseCache() {
  if (ResponseCacheClass === VOID) {
    class $ {
      constructor(cacheKey, maxAge, serializer, invalidationKey) {
        invalidationKey = invalidationKey === VOID ? null : invalidationKey;
        this.f8k_1 = cacheKey;
        this.g8k_1 = maxAge;
        this.h8k_1 = serializer;
        this.i8k_1 = invalidationKey;
        this.j8k_1 = null;
        this.k8k_1 = MutableStateFlow(null);
        this.l8k_1 = asStateFlow(this.k8k_1);
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.m8k_1 = lazy(mode, ResponseCache$fileSystem$delegate$lambda(this, null, null));
        var tmp_0 = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode_0 = KoinPlatformTools_instance.s7z();
        tmp_0.n8k_1 = lazy(mode_0, ResponseCache$systemPaths$delegate$lambda(this, null, null));
        this.o8k_1 = Mutex();
      }
      b8m(fetch, $completion) {
        var tmp = new ($getOrFetchCOROUTINE$())(this, fetch, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'ResponseCache', VOID, VOID, [KoinComponent()], [1]);
    ResponseCacheClass = $;
  }
  return ResponseCacheClass;
}
//region block: init
com_mbta_tid_mbta_app_cache_ResponseMetadata_$serializer$stable = 8;
com_mbta_tid_mbta_app_cache_ResponseMetadata$stable = 8;
com_mbta_tid_mbta_app_cache_Response_$serializer$stable = 8;
com_mbta_tid_mbta_app_cache_Response$stable = 8;
com_mbta_tid_mbta_app_cache_ResponseCache$stable = 8;
Companion_instance = new (Companion())();
Companion_instance_1 = new (Companion_1())();
//endregion
//region block: exports
export {
  ResponseCache as ResponseCachedykj577k9npz,
  Companion_instance_1 as Companion_instance10rwew4rqemia,
};
//endregion

//# sourceMappingURL=ResponseCache.mjs.map
