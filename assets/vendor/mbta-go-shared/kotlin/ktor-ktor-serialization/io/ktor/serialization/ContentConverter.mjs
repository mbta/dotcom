import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Charsets_getInstanceqs70pvl4noow as Charsets_getInstance,
  forName2faodmskqnoz5 as forName,
  isSupported2nf870ypy50et as isSupported,
} from '../../../../ktor-ktor-io/io/ktor/utils/io/charsets/Charset.js.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { parseAndSortHeader33xgq5fx7y6j1 as parseAndSortHeader } from '../../../../ktor-ktor-http/io/ktor/http/HttpHeaderValueParser.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { asFlow3ngsnn5xpz8pw as asFlow } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/Builders.mjs';
import { firstOrNull3jjcu7fygcopr as firstOrNull } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/Reduce.mjs';
import { ContentConvertExceptione8d7sn5vn4zf as ContentConvertException } from './ContentConvertException.mjs';
import { NullBody_instance2i6w0hfghwfg0 as NullBody_instance } from '../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function deserialize(_this__u8e3s4, body, typeInfo, charset, $completion) {
  var tmp = new ($deserializeCOROUTINE$())(_this__u8e3s4, body, typeInfo, charset, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function suitableCharset(_this__u8e3s4, defaultCharset) {
  defaultCharset = defaultCharset === VOID ? Charsets_getInstance().a3g_1 : defaultCharset;
  var tmp0_elvis_lhs = suitableCharsetOrNull(_this__u8e3s4, defaultCharset);
  return tmp0_elvis_lhs == null ? defaultCharset : tmp0_elvis_lhs;
}
function Configuration$register$lambda(_this__u8e3s4) {
  return Unit_instance;
}
function register$default(contentType, converter, configuration, $super) {
  var tmp;
  if (configuration === VOID) {
    tmp = Configuration$register$lambda;
  } else {
    tmp = configuration;
  }
  configuration = tmp;
  var tmp_0;
  if ($super === VOID) {
    this.u4l(contentType, converter, configuration);
    tmp_0 = Unit_instance;
  } else {
    tmp_0 = $super.u4l.call(this, contentType, converter, configuration);
  }
  return tmp_0;
}
var ConfigurationClass;
function Configuration() {
  if (ConfigurationClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Configuration');
    ConfigurationClass = $;
  }
  return ConfigurationClass;
}
function suitableCharsetOrNull(_this__u8e3s4, defaultCharset) {
  defaultCharset = defaultCharset === VOID ? Charsets_getInstance().a3g_1 : defaultCharset;
  var _iterator__ex2g4s = parseAndSortHeader(_this__u8e3s4.lk(HttpHeaders_getInstance().t3q_1)).x();
  while (_iterator__ex2g4s.y()) {
    var charset = _iterator__ex2g4s.z().ch();
    if (charset === '*')
      return defaultCharset;
    else if (isSupported(Charsets_getInstance(), charset))
      return forName(Charsets_getInstance(), charset);
  }
  return null;
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.w4l_1 = function_0;
      }
      z2n(value, $completion) {
        return this.w4l_1(value, $completion);
      }
      z4() {
        return this.w4l_1;
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
var deserialize$o$collect$slambdaClass;
function deserialize$o$collect$slambda() {
  if (deserialize$o$collect$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($$this$unsafeFlow, $charset, $typeInfo, $body, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.f4m_1 = $$this$unsafeFlow;
        $box.g4m_1 = $charset;
        $box.h4m_1 = $typeInfo;
        $box.i4m_1 = $body;
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
                tmp_0.k4m_1 = this.f4m_1;
                var tmp_1 = this;
                tmp_1.l4m_1 = this.j4m_1;
                this.m4m_1 = this.k4m_1;
                this.n4m_1 = this.l4m_1;
                var tmp_2 = this;
                tmp_2.o4m_1 = this.n4m_1;
                this.p4m_1 = this.o4m_1;
                this.fd_1 = 1;
                suspendResult = this.p4m_1.t4m(this.g4m_1, this.h4m_1, this.i4m_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.q4m_1 = suspendResult;
                this.fd_1 = 2;
                suspendResult = this.m4m_1.z2n(this.q4m_1, this);
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
        var i = new (deserialize$o$collect$slambda())(this.f4m_1, this.g4m_1, this.h4m_1, this.i4m_1, completion);
        i.j4m_1 = value;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    deserialize$o$collect$slambdaClass = $;
  }
  return deserialize$o$collect$slambdaClass;
}
function deserialize$o$collect$slambda_0($$this$unsafeFlow, $charset, $typeInfo, $body, resultContinuation) {
  var i = new (deserialize$o$collect$slambda())($$this$unsafeFlow, $charset, $typeInfo, $body, resultContinuation);
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
        this.c4n_1 = _this__u8e3s4;
        this.d4n_1 = collector;
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
                tmp_0.e4n_1 = this.d4n_1;
                this.f4n_1 = this.e4n_1;
                this.fd_1 = 1;
                var tmp_1 = deserialize$o$collect$slambda_0(this.f4n_1, this.c4n_1.h4n_1, this.c4n_1.i4n_1, this.c4n_1.j4n_1, null);
                suspendResult = this.c4n_1.g4n_1.b2o(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_1), this);
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
var deserialize$$inlined$map$1Class;
function deserialize$$inlined$map$1() {
  if (deserialize$$inlined$map$1Class === VOID) {
    class $ {
      constructor($this, $charset, $typeInfo, $body) {
        this.g4n_1 = $this;
        this.h4n_1 = $charset;
        this.i4n_1 = $typeInfo;
        this.j4n_1 = $body;
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
    deserialize$$inlined$map$1Class = $;
  }
  return deserialize$$inlined$map$1Class;
}
var deserialize$slambdaClass;
function deserialize$slambda() {
  if (deserialize$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($body, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.s4n_1 = $body;
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
              return !(this.t4n_1 == null) || this.s4n_1.c36();
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
        var i = new (deserialize$slambda())(this.s4n_1, completion);
        i.t4n_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    deserialize$slambdaClass = $;
  }
  return deserialize$slambdaClass;
}
function deserialize$slambda_0($body, resultContinuation) {
  var i = new (deserialize$slambda())($body, resultContinuation);
  var l = function (it, $completion) {
    return i.u4n(it, $completion);
  };
  l.$arity = 1;
  return l;
}
var $deserializeCOROUTINE$Class;
function $deserializeCOROUTINE$() {
  if ($deserializeCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, body, typeInfo, charset, resultContinuation) {
        super(resultContinuation);
        this.q4l_1 = _this__u8e3s4;
        this.r4l_1 = body;
        this.s4l_1 = typeInfo;
        this.t4l_1 = charset;
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
                var this_0 = asFlow(this.q4l_1);
                var tmp_0 = new (deserialize$$inlined$map$1())(this_0, this.t4l_1, this.s4l_1, this.r4l_1);
                suspendResult = firstOrNull(tmp_0, deserialize$slambda_0(this.r4l_1, null), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var result = suspendResult;
                var tmp_1;
                if (!(result == null)) {
                  tmp_1 = result;
                } else {
                  if (!this.r4l_1.c36()) {
                    tmp_1 = this.r4l_1;
                  } else {
                    var tmp0_safe_receiver = this.s4l_1.h3n_1;
                    if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.xh()) === true) {
                      tmp_1 = NullBody_instance;
                    } else {
                      throw ContentConvertException().d4l('No suitable converter found for ' + this.s4l_1.toString());
                    }
                  }
                }

                return tmp_1;
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
    $deserializeCOROUTINE$Class = $;
  }
  return $deserializeCOROUTINE$Class;
}
//region block: exports
export {
  deserialize as deserialize3kqe4vxpbxz1,
  register$default as register$default3vdkjcc7m2cj0,
  Configuration as Configuration20xgygxdzhlk5,
  suitableCharset as suitableCharset1jgdcpdzbzgzn,
};
//endregion

//# sourceMappingURL=ContentConverter.mjs.map
