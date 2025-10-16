import { listOf1jh22dvmctj1r as listOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toLowerCasePreservingASCIIRulesa2d90zyoc6kw as toLowerCasePreservingASCIIRules } from '../../../../ktor-ktor-utils/io/ktor/util/Text.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { isLowerCase2jodys5jo7d58 as isLowerCase } from '../../../../ktor-ktor-utils/io/ktor/util/Charset.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.w3z_1 = new (URLProtocol())('http', 80);
        this.x3z_1 = new (URLProtocol())('https', 443);
        this.y3z_1 = new (URLProtocol())('ws', 80);
        this.z3z_1 = new (URLProtocol())('wss', 443);
        this.a40_1 = new (URLProtocol())('socks', 1080);
        var tmp = this;
        // Inline function 'kotlin.collections.associateBy' call
        var this_0 = listOf([this.w3z_1, this.x3z_1, this.y3z_1, this.z3z_1, this.a40_1]);
        var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
        // Inline function 'kotlin.collections.associateByTo' call
        var destination = LinkedHashMap().tc(capacity);
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp$ret$0 = element.w3y_1;
          destination.t3(tmp$ret$0, element);
        }
        tmp.b40_1 = destination;
      }
      o40(name) {
        // Inline function 'kotlin.let' call
        var it = toLowerCasePreservingASCIIRules(name);
        var tmp0_elvis_lhs = Companion_getInstance().b40_1.j3(it);
        return tmp0_elvis_lhs == null ? new (URLProtocol())(it, 0) : tmp0_elvis_lhs;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var URLProtocolClass;
function URLProtocol() {
  if (URLProtocolClass === VOID) {
    class $ {
      constructor(name, defaultPort) {
        Companion_getInstance();
        this.w3y_1 = name;
        this.x3y_1 = defaultPort;
        var tmp0 = this.w3y_1;
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.text.all' call
          var inductionVariable = 0;
          while (inductionVariable < charSequenceLength(tmp0)) {
            var element = charSequenceGet(tmp0, inductionVariable);
            inductionVariable = inductionVariable + 1 | 0;
            if (!isLowerCase(element)) {
              tmp$ret$1 = false;
              break $l$block;
            }
          }
          tmp$ret$1 = true;
        }
        // Inline function 'kotlin.require' call
        if (!tmp$ret$1) {
          var message = 'All characters should be lower case';
          throw IllegalArgumentException().q(toString(message));
        }
      }
      toString() {
        return 'URLProtocol(name=' + this.w3y_1 + ', defaultPort=' + this.x3y_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.w3y_1);
        result = imul(result, 31) + this.x3y_1 | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof URLProtocol()))
          return false;
        var tmp0_other_with_cast = other instanceof URLProtocol() ? other : THROW_CCE();
        if (!(this.w3y_1 === tmp0_other_with_cast.w3y_1))
          return false;
        if (!(this.x3y_1 === tmp0_other_with_cast.x3y_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'URLProtocol');
    URLProtocolClass = $;
  }
  return URLProtocolClass;
}
function isSecure(_this__u8e3s4) {
  return _this__u8e3s4.w3y_1 === 'https' || _this__u8e3s4.w3y_1 === 'wss';
}
function isWebsocket(_this__u8e3s4) {
  return _this__u8e3s4.w3y_1 === 'ws' || _this__u8e3s4.w3y_1 === 'wss';
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance2bb7s4bbcv546,
  isSecure as isSecurex1qiiavqi0xu,
  isWebsocket as isWebsocket1w1xog9vfgwm1,
};
//endregion

//# sourceMappingURL=URLProtocol.mjs.map
