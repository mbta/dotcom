import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { buildHeaders3beu05fiq9iq2 as buildHeaders } from '../utils/headers.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  get6d5x931vk0s as get,
  fold36i9psb7d5v48 as fold,
  minusKeyyqanvso9aovh as minusKey,
  plusolev77jfy5r9 as plus,
  Element2gr7ezmxqaln7 as Element,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContext.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { PlatformUtils_getInstance350nj2wi6ds9r as PlatformUtils_getInstance } from '../../../../../ktor-ktor-utils/io/ktor/util/PlatformUtils.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_KTOR_DEFAULT_USER_AGENT() {
  _init_properties_Utils_kt__jo07cx();
  return KTOR_DEFAULT_USER_AGENT;
}
var KTOR_DEFAULT_USER_AGENT;
function get_DATE_HEADERS() {
  _init_properties_Utils_kt__jo07cx();
  return DATE_HEADERS;
}
var DATE_HEADERS;
function callContext($completion) {
  // Inline function 'kotlin.js.getCoroutineContext' call
  var tmp$ret$0 = $completion.ld();
  return ensureNotNull(tmp$ret$0.sd(Companion_instance)).n4y_1;
}
function mergeHeaders(requestHeaders, content, block) {
  _init_properties_Utils_kt__jo07cx();
  var tmp = buildHeaders(mergeHeaders$lambda(requestHeaders, content));
  tmp.b3j(mergeHeaders$lambda_0(block));
  var missingAgent = requestHeaders.lk(HttpHeaders_getInstance().q3t_1) == null && content.l3v().lk(HttpHeaders_getInstance().q3t_1) == null;
  if (missingAgent && needUserAgent()) {
    block(HttpHeaders_getInstance().q3t_1, get_KTOR_DEFAULT_USER_AGENT());
  }
  var tmp0_safe_receiver = content.d41();
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.toString();
  var tmp2_elvis_lhs = tmp1_elvis_lhs == null ? content.l3v().lk(HttpHeaders_getInstance().k3r_1) : tmp1_elvis_lhs;
  var type = tmp2_elvis_lhs == null ? requestHeaders.lk(HttpHeaders_getInstance().k3r_1) : tmp2_elvis_lhs;
  var tmp3_safe_receiver = content.e41();
  var tmp4_elvis_lhs = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.toString();
  var tmp5_elvis_lhs = tmp4_elvis_lhs == null ? content.l3v().lk(HttpHeaders_getInstance().h3r_1) : tmp4_elvis_lhs;
  var length = tmp5_elvis_lhs == null ? requestHeaders.lk(HttpHeaders_getInstance().h3r_1) : tmp5_elvis_lhs;
  if (type == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    block(HttpHeaders_getInstance().k3r_1, type);
  }
  if (length == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    block(HttpHeaders_getInstance().h3r_1, length);
  }
}
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
function Companion_getInstance() {
  return Companion_instance;
}
var KtorCallContextElementClass;
function KtorCallContextElement() {
  if (KtorCallContextElementClass === VOID) {
    class $ {
      constructor(callContext) {
        this.n4y_1 = callContext;
      }
      u1() {
        return Companion_instance;
      }
    }
    protoOf($).sd = get;
    protoOf($).hr = fold;
    protoOf($).gr = minusKey;
    protoOf($).ir = plus;
    initMetadataForClass($, 'KtorCallContextElement', VOID, VOID, [Element()]);
    KtorCallContextElementClass = $;
  }
  return KtorCallContextElementClass;
}
function needUserAgent() {
  _init_properties_Utils_kt__jo07cx();
  return !PlatformUtils_getInstance().p3i_1;
}
function mergeHeaders$lambda($requestHeaders, $content) {
  return function ($this$buildHeaders) {
    $this$buildHeaders.k3j($requestHeaders);
    $this$buildHeaders.k3j($content.l3v());
    return Unit_instance;
  };
}
function mergeHeaders$lambda_0($block) {
  return function (key, values) {
    var tmp;
    if (HttpHeaders_getInstance().h3r_1 === key) {
      return Unit_instance;
    }
    var tmp_0;
    if (HttpHeaders_getInstance().k3r_1 === key) {
      return Unit_instance;
    }
    var tmp_1;
    if (get_DATE_HEADERS().j1(key)) {
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s = values.x();
      while (_iterator__ex2g4s.y()) {
        var element = _iterator__ex2g4s.z();
        $block(key, element);
      }
      tmp_1 = Unit_instance;
    } else {
      var separator = HttpHeaders_getInstance().l3r_1 === key ? '; ' : ',';
      tmp_1 = $block(key, joinToString(values, separator));
    }
    return Unit_instance;
  };
}
var properties_initialized_Utils_kt_xvi83j;
function _init_properties_Utils_kt__jo07cx() {
  if (!properties_initialized_Utils_kt_xvi83j) {
    properties_initialized_Utils_kt_xvi83j = true;
    KTOR_DEFAULT_USER_AGENT = 'ktor-client';
    DATE_HEADERS = setOf([HttpHeaders_getInstance().n3r_1, HttpHeaders_getInstance().t3r_1, HttpHeaders_getInstance().f3s_1, HttpHeaders_getInstance().a3s_1, HttpHeaders_getInstance().e3s_1]);
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  callContext as callContext1odsh8w96ni1o,
  KtorCallContextElement as KtorCallContextElementudwxlrp3zgdl,
  mergeHeaders as mergeHeadersub4y73mj759y,
};
//endregion

//# sourceMappingURL=Utils.mjs.map
