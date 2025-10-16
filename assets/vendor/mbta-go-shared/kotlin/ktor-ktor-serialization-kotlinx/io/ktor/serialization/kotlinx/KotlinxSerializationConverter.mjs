import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { ByteArrayContent9zol65b22hp0 as ByteArrayContent } from '../../../../../ktor-ktor-http/io/ktor/http/content/ByteArrayContent.mjs';
import {
  BinaryFormat3f3aelhmz0ro1 as BinaryFormat,
  StringFormat2r2ka8mzcb3mi as StringFormat,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerialFormat.mjs';
import { withCharsetIfNeeded3sz33ys0x9vfx as withCharsetIfNeeded } from '../../../../../ktor-ktor-http/io/ktor/http/ContentTypes.mjs';
import { TextContent1rb6ftlpvl1d2 as TextContent } from '../../../../../ktor-ktor-http/io/ktor/http/content/TextContent.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
import { OutgoingContent3t2ohmyam9o76 as OutgoingContent } from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { asFlow3ngsnn5xpz8pw as asFlow } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/Builders.mjs';
import { firstOrNull3jjcu7fygcopr as firstOrNull } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/Reduce.mjs';
import {
  serializerForTypeInfofg753n9o7cfi as serializerForTypeInfo,
  guessSerializerlivkaydavxr9 as guessSerializer,
} from './SerializerLookup.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { readRemaining1x8kk1vq7p6gm as readRemaining } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannelOperations.mjs';
import { discard3ugntd47xyll6 as discard } from '../../../../../ktor-ktor-io/io/ktor/utils/io/core/ByteReadPacket.mjs';
import { readByteArray1ri21h2rciakw as readByteArray } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Sources.mjs';
import { readText27783kyxjxi1g as readText } from '../../../../../ktor-ktor-io/io/ktor/utils/io/core/Strings.mjs';
import { JsonConvertExceptiongnc5x6xwaf77 as JsonConvertException } from '../../../../../ktor-ktor-serialization/io/ktor/serialization/ContentConvertException.mjs';
import { extensionsocv2ha4uem50 as extensions } from './Extensions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function serialization(_this__u8e3s4, contentType, format) {
  _this__u8e3s4.v4l(contentType, new (KotlinxSerializationConverter())(format));
}
var KotlinxSerializationConverter$serialize$o$collect$slambdaClass;
function KotlinxSerializationConverter$serialize$o$collect$slambda() {
  if (KotlinxSerializationConverter$serialize$o$collect$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($$this$unsafeFlow, $contentType, $charset, $typeInfo, $value, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.g66_1 = $$this$unsafeFlow;
        $box.h66_1 = $contentType;
        $box.i66_1 = $charset;
        $box.j66_1 = $typeInfo;
        $box.k66_1 = $value;
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
                this.gd_1 = 3;
                var tmp_0 = this;
                tmp_0.m66_1 = this.g66_1;
                var tmp_1 = this;
                tmp_1.n66_1 = this.l66_1;
                this.o66_1 = this.m66_1;
                this.p66_1 = this.n66_1;
                var tmp_2 = this;
                tmp_2.q66_1 = this.p66_1;
                this.r66_1 = this.q66_1;
                this.fd_1 = 1;
                suspendResult = this.r66_1.v62(this.h66_1, this.i66_1, this.j66_1, this.k66_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.s66_1 = suspendResult;
                this.fd_1 = 2;
                suspendResult = this.o66_1.z2n(this.s66_1, this);
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
      s4m(value, completion) {
        var i = new (KotlinxSerializationConverter$serialize$o$collect$slambda())(this.g66_1, this.h66_1, this.i66_1, this.j66_1, this.k66_1, completion);
        i.l66_1 = value;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    KotlinxSerializationConverter$serialize$o$collect$slambdaClass = $;
  }
  return KotlinxSerializationConverter$serialize$o$collect$slambdaClass;
}
function KotlinxSerializationConverter$serialize$o$collect$slambda_0($$this$unsafeFlow, $contentType, $charset, $typeInfo, $value, resultContinuation) {
  var i = new (KotlinxSerializationConverter$serialize$o$collect$slambda())($$this$unsafeFlow, $contentType, $charset, $typeInfo, $value, resultContinuation);
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
        this.b67_1 = _this__u8e3s4;
        this.c67_1 = collector;
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
                tmp_0.d67_1 = this.c67_1;
                this.e67_1 = this.d67_1;
                this.fd_1 = 1;
                var tmp_1 = KotlinxSerializationConverter$serialize$o$collect$slambda_0(this.e67_1, this.b67_1.g67_1, this.b67_1.h67_1, this.b67_1.i67_1, this.b67_1.j67_1, null);
                suspendResult = this.b67_1.f67_1.b2o(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_1), this);
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
var KotlinxSerializationConverter$deserialize$o$collect$slambdaClass;
function KotlinxSerializationConverter$deserialize$o$collect$slambda() {
  if (KotlinxSerializationConverter$deserialize$o$collect$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($$this$unsafeFlow, $charset, $typeInfo, $content, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.s67_1 = $$this$unsafeFlow;
        $box.t67_1 = $charset;
        $box.u67_1 = $typeInfo;
        $box.v67_1 = $content;
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
                this.gd_1 = 3;
                var tmp_0 = this;
                tmp_0.x67_1 = this.s67_1;
                var tmp_1 = this;
                tmp_1.y67_1 = this.w67_1;
                this.z67_1 = this.x67_1;
                this.a68_1 = this.y67_1;
                var tmp_2 = this;
                tmp_2.b68_1 = this.a68_1;
                this.c68_1 = this.b68_1;
                this.fd_1 = 1;
                suspendResult = this.c68_1.t4m(this.t67_1, this.u67_1, this.v67_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.d68_1 = suspendResult;
                this.fd_1 = 2;
                suspendResult = this.z67_1.z2n(this.d68_1, this);
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
      s4m(value, completion) {
        var i = new (KotlinxSerializationConverter$deserialize$o$collect$slambda())(this.s67_1, this.t67_1, this.u67_1, this.v67_1, completion);
        i.w67_1 = value;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    KotlinxSerializationConverter$deserialize$o$collect$slambdaClass = $;
  }
  return KotlinxSerializationConverter$deserialize$o$collect$slambdaClass;
}
function KotlinxSerializationConverter$deserialize$o$collect$slambda_0($$this$unsafeFlow, $charset, $typeInfo, $content, resultContinuation) {
  var i = new (KotlinxSerializationConverter$deserialize$o$collect$slambda())($$this$unsafeFlow, $charset, $typeInfo, $content, resultContinuation);
  var l = function (value, $completion) {
    return i.r4m(value, $completion);
  };
  l.$arity = 1;
  return l;
}
var $collectCOROUTINE$Class_0;
function $collectCOROUTINE$_0() {
  if ($collectCOROUTINE$Class_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, collector, resultContinuation) {
        super(resultContinuation);
        this.m68_1 = _this__u8e3s4;
        this.n68_1 = collector;
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
                tmp_0.o68_1 = this.n68_1;
                this.p68_1 = this.o68_1;
                this.fd_1 = 1;
                var tmp_1 = KotlinxSerializationConverter$deserialize$o$collect$slambda_0(this.p68_1, this.m68_1.r68_1, this.m68_1.s68_1, this.m68_1.t68_1, null);
                suspendResult = this.m68_1.q68_1.b2o(new (sam$kotlinx_coroutines_flow_FlowCollector$0_0())(tmp_1), this);
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
    $collectCOROUTINE$Class_0 = $;
  }
  return $collectCOROUTINE$Class_0;
}
function serializeContent($this, serializer, format, value, contentType, charset) {
  var tmp;
  if (isInterface(format, StringFormat())) {
    var content = format.n10(isInterface(serializer, KSerializer()) ? serializer : THROW_CCE(), value);
    tmp = new (TextContent())(content, withCharsetIfNeeded(contentType, charset));
  } else {
    if (isInterface(format, BinaryFormat())) {
      var content_0 = format.p10(isInterface(serializer, KSerializer()) ? serializer : THROW_CCE(), value);
      tmp = new (ByteArrayContent())(content_0, contentType);
    } else {
      var message = 'Unsupported format ' + toString(format);
      throw IllegalStateException().o5(toString(message));
    }
  }
  return tmp;
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.u68_1 = function_0;
      }
      z2n(value, $completion) {
        return this.u68_1(value, $completion);
      }
      z4() {
        return this.u68_1;
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
var sam$kotlinx_coroutines_flow_FlowCollector$0Class_0;
function sam$kotlinx_coroutines_flow_FlowCollector$0_0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class_0 === VOID) {
    class $ {
      constructor(function_0) {
        this.v68_1 = function_0;
      }
      z2n(value, $completion) {
        return this.v68_1(value, $completion);
      }
      z4() {
        return this.v68_1;
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
    sam$kotlinx_coroutines_flow_FlowCollector$0Class_0 = $;
  }
  return sam$kotlinx_coroutines_flow_FlowCollector$0Class_0;
}
var KotlinxSerializationConverter$serialize$$inlined$map$1Class;
function KotlinxSerializationConverter$serialize$$inlined$map$1() {
  if (KotlinxSerializationConverter$serialize$$inlined$map$1Class === VOID) {
    class $ {
      constructor($this, $contentType, $charset, $typeInfo, $value) {
        this.f67_1 = $this;
        this.g67_1 = $contentType;
        this.h67_1 = $charset;
        this.i67_1 = $typeInfo;
        this.j67_1 = $value;
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
    KotlinxSerializationConverter$serialize$$inlined$map$1Class = $;
  }
  return KotlinxSerializationConverter$serialize$$inlined$map$1Class;
}
var KotlinxSerializationConverter$serialize$slambdaClass;
function KotlinxSerializationConverter$serialize$slambda() {
  if (KotlinxSerializationConverter$serialize$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      f69(it, $completion) {
        var tmp = this.g69(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.f69((p1 == null ? true : p1 instanceof OutgoingContent()) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              return !(this.e69_1 == null);
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      g69(it, completion) {
        var i = new (KotlinxSerializationConverter$serialize$slambda())(completion);
        i.e69_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    KotlinxSerializationConverter$serialize$slambdaClass = $;
  }
  return KotlinxSerializationConverter$serialize$slambdaClass;
}
function KotlinxSerializationConverter$serialize$slambda_0(resultContinuation) {
  var i = new (KotlinxSerializationConverter$serialize$slambda())(resultContinuation);
  var l = function (it, $completion) {
    return i.f69(it, $completion);
  };
  l.$arity = 1;
  return l;
}
var KotlinxSerializationConverter$deserialize$$inlined$map$1Class;
function KotlinxSerializationConverter$deserialize$$inlined$map$1() {
  if (KotlinxSerializationConverter$deserialize$$inlined$map$1Class === VOID) {
    class $ {
      constructor($this, $charset, $typeInfo, $content) {
        this.q68_1 = $this;
        this.r68_1 = $charset;
        this.s68_1 = $typeInfo;
        this.t68_1 = $content;
      }
      a2o(collector, $completion) {
        var tmp = new ($collectCOROUTINE$_0())(this, collector, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      b2o(collector, $completion) {
        return this.a2o(collector, $completion);
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, VOID, [1]);
    KotlinxSerializationConverter$deserialize$$inlined$map$1Class = $;
  }
  return KotlinxSerializationConverter$deserialize$$inlined$map$1Class;
}
var KotlinxSerializationConverter$deserialize$slambdaClass;
function KotlinxSerializationConverter$deserialize$slambda() {
  if (KotlinxSerializationConverter$deserialize$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($content, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.p69_1 = $content;
        super(resultContinuation, $box);
      }
      u4n(it, $completion) {
        var tmp = this.s4m(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.u4n((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              return !(this.q69_1 == null) || this.p69_1.c36();
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      s4m(it, completion) {
        var i = new (KotlinxSerializationConverter$deserialize$slambda())(this.p69_1, completion);
        i.q69_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    KotlinxSerializationConverter$deserialize$slambdaClass = $;
  }
  return KotlinxSerializationConverter$deserialize$slambdaClass;
}
function KotlinxSerializationConverter$deserialize$slambda_0($content, resultContinuation) {
  var i = new (KotlinxSerializationConverter$deserialize$slambda())($content, resultContinuation);
  var l = function (it, $completion) {
    return i.u4n(it, $completion);
  };
  l.$arity = 1;
  return l;
}
var $serializeCOROUTINE$Class;
function $serializeCOROUTINE$() {
  if ($serializeCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, contentType, charset, typeInfo, value, resultContinuation) {
        super(resultContinuation);
        this.z69_1 = _this__u8e3s4;
        this.a6a_1 = contentType;
        this.b6a_1 = charset;
        this.c6a_1 = typeInfo;
        this.d6a_1 = value;
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
                var this_0 = asFlow(this.z69_1.f6a_1);
                var tmp_0 = new (KotlinxSerializationConverter$serialize$$inlined$map$1())(this_0, this.a6a_1, this.b6a_1, this.c6a_1, this.d6a_1);
                suspendResult = firstOrNull(tmp_0, KotlinxSerializationConverter$serialize$slambda_0(null), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var fromExtension = suspendResult;
                if (!(fromExtension == null))
                  return fromExtension;
                var tmp_1;
                try {
                  tmp_1 = serializerForTypeInfo(this.z69_1.e6a_1.k14(), this.c6a_1);
                } catch ($p) {
                  var tmp_2;
                  if ($p instanceof SerializationException()) {
                    var cause = $p;
                    tmp_2 = guessSerializer(this.d6a_1, this.z69_1.e6a_1.k14());
                  } else {
                    throw $p;
                  }
                  tmp_1 = tmp_2;
                }

                var serializer = tmp_1;
                return serializeContent(this.z69_1, serializer, this.z69_1.e6a_1, this.d6a_1, this.a6a_1, this.b6a_1);
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
    $serializeCOROUTINE$Class = $;
  }
  return $serializeCOROUTINE$Class;
}
var $deserializeCOROUTINE$Class;
function $deserializeCOROUTINE$() {
  if ($deserializeCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, charset, typeInfo, content, resultContinuation) {
        super(resultContinuation);
        this.o6a_1 = _this__u8e3s4;
        this.p6a_1 = charset;
        this.q6a_1 = typeInfo;
        this.r6a_1 = content;
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
                var this_0 = asFlow(this.o6a_1.f6a_1);
                var tmp_0 = new (KotlinxSerializationConverter$deserialize$$inlined$map$1())(this_0, this.p6a_1, this.q6a_1, this.r6a_1);
                suspendResult = firstOrNull(tmp_0, KotlinxSerializationConverter$deserialize$slambda_0(this.r6a_1, null), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.s6a_1 = suspendResult;
                var tmp_1;
                if (!this.o6a_1.f6a_1.h1()) {
                  tmp_1 = !(this.s6a_1 == null) || this.r6a_1.c36();
                } else {
                  tmp_1 = false;
                }

                if (tmp_1)
                  return this.s6a_1;
                this.t6a_1 = serializerForTypeInfo(this.o6a_1.e6a_1.k14(), this.q6a_1);
                this.fd_1 = 2;
                suspendResult = readRemaining(this.r6a_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                var contentPacket = suspendResult;
                this.gd_1 = 3;
                var tmp0_subject = this.o6a_1.e6a_1;
                var tmp_2;
                if (isInterface(tmp0_subject, StringFormat())) {
                  tmp_2 = this.o6a_1.e6a_1.o10(this.t6a_1, readText(contentPacket, this.p6a_1));
                } else {
                  if (isInterface(tmp0_subject, BinaryFormat())) {
                    tmp_2 = this.o6a_1.e6a_1.q10(this.t6a_1, readByteArray(contentPacket));
                  } else {
                    discard(contentPacket);
                    var message = 'Unsupported format ' + toString(this.o6a_1.e6a_1);
                    throw IllegalStateException().o5(toString(message));
                  }
                }

                return tmp_2;
              case 3:
                this.gd_1 = 4;
                var tmp_3 = this.id_1;
                if (tmp_3 instanceof Error) {
                  var cause = this.id_1;
                  throw JsonConvertException().h4l('Illegal input: ' + cause.message, cause);
                } else {
                  throw this.id_1;
                }

              case 4:
                throw this.id_1;
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
    }
    initMetadataForCoroutine($);
    $deserializeCOROUTINE$Class = $;
  }
  return $deserializeCOROUTINE$Class;
}
var KotlinxSerializationConverterClass;
function KotlinxSerializationConverter() {
  if (KotlinxSerializationConverterClass === VOID) {
    class $ {
      constructor(format) {
        this.e6a_1 = format;
        this.f6a_1 = extensions(this.e6a_1);
        var tmp;
        var tmp_0 = this.e6a_1;
        if (isInterface(tmp_0, BinaryFormat())) {
          tmp = true;
        } else {
          var tmp_1 = this.e6a_1;
          tmp = isInterface(tmp_1, StringFormat());
        }
        // Inline function 'kotlin.require' call
        if (!tmp) {
          var message = 'Only binary and string formats are supported, ' + toString(this.e6a_1) + ' is not supported.';
          throw IllegalArgumentException().q(toString(message));
        }
      }
      u6a(contentType, charset, typeInfo, value, $completion) {
        var tmp = new ($serializeCOROUTINE$())(this, contentType, charset, typeInfo, value, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      v62(contentType, charset, typeInfo, value, $completion) {
        return this.u6a(contentType, charset, typeInfo, value, $completion);
      }
      t4m(charset, typeInfo, content, $completion) {
        var tmp = new ($deserializeCOROUTINE$())(this, charset, typeInfo, content, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    initMetadataForClass($, 'KotlinxSerializationConverter', VOID, VOID, VOID, [4, 3]);
    KotlinxSerializationConverterClass = $;
  }
  return KotlinxSerializationConverterClass;
}
//region block: exports
export {
  serialization as serialization1fpeds7cruos4,
};
//endregion

//# sourceMappingURL=KotlinxSerializationConverter.mjs.map
