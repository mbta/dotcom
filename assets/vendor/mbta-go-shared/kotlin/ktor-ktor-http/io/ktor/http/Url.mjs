import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  emptyList1g2z5xcrvp2zy as emptyList,
  get_lastIndex1yw0x4k50k51w as get_lastIndex,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  first58ocm7j58k3q as first,
  last1vo29oleiqj36 as last,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  indexOf1xbs558u7wr52 as indexOf,
  indexOfAny2ijjuuzpljsyd as indexOfAny,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { charArrayOf27f4r3dozbrk1 as charArrayOf } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import {
  substring3saq8ornu0luv as substring,
  substringiqarkczpya5m as substring_0,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { Companion_getInstance2bb7s4bbcv546 as Companion_getInstance } from './URLProtocol.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import {
  get_hostWithPortIfSpecified1w0e2oq2yfcan as get_hostWithPortIfSpecified,
  Urlowwyg1lanrqp as Url,
  appendUserAndPassword2m6va0hoftk5 as appendUserAndPassword,
} from './URLUtils.mjs';
import { STRING_getInstance2ou4lro9xn2qn as STRING_getInstance } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { PrimitiveSerialDescriptor3egfp53lutxj2 as PrimitiveSerialDescriptor } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
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
function Url$segments$delegate$lambda($pathSegments) {
  return function () {
    var tmp;
    if ($pathSegments.h1()) {
      return emptyList();
    }
    var tmp_0;
    var tmp_1;
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = first($pathSegments);
    if (charSequenceLength(this_0) === 0) {
      tmp_1 = $pathSegments.c1() > 1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = 1;
    } else {
      tmp_0 = 0;
    }
    var start = tmp_0;
    var tmp_2;
    // Inline function 'kotlin.text.isEmpty' call
    var this_1 = last($pathSegments);
    if (charSequenceLength(this_1) === 0) {
      tmp_2 = get_lastIndex($pathSegments);
    } else {
      tmp_2 = get_lastIndex($pathSegments) + 1 | 0;
    }
    var end = tmp_2;
    return $pathSegments.g3(start, end);
  };
}
function Url$encodedPath$delegate$lambda($pathSegments, this$0) {
  return function () {
    var tmp;
    if ($pathSegments.h1()) {
      return '';
    }
    var pathStartIndex = indexOf(this$0.g3z_1, _Char___init__impl__6a9atx(47), this$0.l3z_1.w3y_1.length + 3 | 0);
    var tmp_0;
    if (pathStartIndex === -1) {
      return '';
    }
    // Inline function 'kotlin.charArrayOf' call
    var tmp$ret$0 = charArrayOf([_Char___init__impl__6a9atx(63), _Char___init__impl__6a9atx(35)]);
    var pathEndIndex = indexOfAny(this$0.g3z_1, tmp$ret$0, pathStartIndex);
    var tmp_1;
    if (pathEndIndex === -1) {
      return substring(this$0.g3z_1, pathStartIndex);
    }
    return substring_0(this$0.g3z_1, pathStartIndex, pathEndIndex);
  };
}
function Url$_get_encodedPath_$ref_fg9j48() {
  return function (p0) {
    return p0.q40();
  };
}
function Url$encodedQuery$delegate$lambda(this$0) {
  return function () {
    var queryStart = indexOf(this$0.g3z_1, _Char___init__impl__6a9atx(63)) + 1 | 0;
    var tmp;
    if (queryStart === 0) {
      return '';
    }
    var queryEnd = indexOf(this$0.g3z_1, _Char___init__impl__6a9atx(35), queryStart);
    var tmp_0;
    if (queryEnd === -1) {
      return substring(this$0.g3z_1, queryStart);
    }
    return substring_0(this$0.g3z_1, queryStart, queryEnd);
  };
}
function Url$_get_encodedQuery_$ref_c7vq1h() {
  return function (p0) {
    return p0.t40();
  };
}
function Url$encodedPathAndQuery$delegate$lambda(this$0) {
  return function () {
    var pathStart = indexOf(this$0.g3z_1, _Char___init__impl__6a9atx(47), this$0.l3z_1.w3y_1.length + 3 | 0);
    var tmp;
    if (pathStart === -1) {
      return '';
    }
    var queryEnd = indexOf(this$0.g3z_1, _Char___init__impl__6a9atx(35), pathStart);
    var tmp_0;
    if (queryEnd === -1) {
      return substring(this$0.g3z_1, pathStart);
    }
    return substring_0(this$0.g3z_1, pathStart, queryEnd);
  };
}
function Url$encodedUser$delegate$lambda(this$0) {
  return function () {
    var tmp;
    if (this$0.d3z_1 == null) {
      return null;
    }
    var tmp_0;
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = this$0.d3z_1;
    if (charSequenceLength(this_0) === 0) {
      return '';
    }
    var usernameStart = this$0.l3z_1.w3y_1.length + 3 | 0;
    // Inline function 'kotlin.charArrayOf' call
    var tmp$ret$1 = charArrayOf([_Char___init__impl__6a9atx(58), _Char___init__impl__6a9atx(64)]);
    var usernameEnd = indexOfAny(this$0.g3z_1, tmp$ret$1, usernameStart);
    return substring_0(this$0.g3z_1, usernameStart, usernameEnd);
  };
}
function Url$_get_encodedUser_$ref_3lb9bi() {
  return function (p0) {
    return p0.r40();
  };
}
function Url$encodedPassword$delegate$lambda(this$0) {
  return function () {
    var tmp;
    if (this$0.e3z_1 == null) {
      return null;
    }
    var tmp_0;
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = this$0.e3z_1;
    if (charSequenceLength(this_0) === 0) {
      return '';
    }
    var passwordStart = indexOf(this$0.g3z_1, _Char___init__impl__6a9atx(58), this$0.l3z_1.w3y_1.length + 3 | 0) + 1 | 0;
    var passwordEnd = indexOf(this$0.g3z_1, _Char___init__impl__6a9atx(64));
    return substring_0(this$0.g3z_1, passwordStart, passwordEnd);
  };
}
function Url$_get_encodedPassword_$ref_25ixc2() {
  return function (p0) {
    return p0.s40();
  };
}
function Url$encodedFragment$delegate$lambda(this$0) {
  return function () {
    var fragmentStart = indexOf(this$0.g3z_1, _Char___init__impl__6a9atx(35)) + 1 | 0;
    var tmp;
    if (fragmentStart === 0) {
      return '';
    }
    return substring(this$0.g3z_1, fragmentStart);
  };
}
function Url$_get_encodedFragment_$ref_itp7pv() {
  return function (p0) {
    return p0.u40();
  };
}
var UrlClass;
function Url_0() {
  if (UrlClass === VOID) {
    class $ {
      constructor(protocol, host, specifiedPort, pathSegments, parameters, fragment, user, password, trailingQuery, urlString) {
        this.z3y_1 = host;
        this.a3z_1 = specifiedPort;
        this.b3z_1 = parameters;
        this.c3z_1 = fragment;
        this.d3z_1 = user;
        this.e3z_1 = password;
        this.f3z_1 = trailingQuery;
        this.g3z_1 = urlString;
        var containsArg = this.a3z_1;
        // Inline function 'kotlin.require' call
        if (!(0 <= containsArg ? containsArg <= 65535 : false)) {
          var message = 'Port must be between 0 and 65535, or 0 if not set. Provided: ' + this.a3z_1;
          throw IllegalArgumentException().q(toString(message));
        }
        this.h3z_1 = pathSegments;
        this.i3z_1 = pathSegments;
        var tmp = this;
        tmp.j3z_1 = lazy(Url$segments$delegate$lambda(pathSegments));
        this.k3z_1 = protocol;
        var tmp_0 = this;
        var tmp0_elvis_lhs = this.k3z_1;
        tmp_0.l3z_1 = tmp0_elvis_lhs == null ? Companion_getInstance().w3z_1 : tmp0_elvis_lhs;
        var tmp_1 = this;
        tmp_1.m3z_1 = lazy(Url$encodedPath$delegate$lambda(pathSegments, this));
        var tmp_2 = this;
        tmp_2.n3z_1 = lazy(Url$encodedQuery$delegate$lambda(this));
        var tmp_3 = this;
        tmp_3.o3z_1 = lazy(Url$encodedPathAndQuery$delegate$lambda(this));
        var tmp_4 = this;
        tmp_4.p3z_1 = lazy(Url$encodedUser$delegate$lambda(this));
        var tmp_5 = this;
        tmp_5.q3z_1 = lazy(Url$encodedPassword$delegate$lambda(this));
        var tmp_6 = this;
        tmp_6.r3z_1 = lazy(Url$encodedFragment$delegate$lambda(this));
      }
      p40() {
        // Inline function 'kotlin.takeUnless' call
        var this_0 = this.a3z_1;
        var tmp;
        if (!(this_0 === 0)) {
          tmp = this_0;
        } else {
          tmp = null;
        }
        var tmp0_elvis_lhs = tmp;
        return tmp0_elvis_lhs == null ? this.l3z_1.x3y_1 : tmp0_elvis_lhs;
      }
      q40() {
        var tmp0 = this.m3z_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('encodedPath', 1, tmp, Url$_get_encodedPath_$ref_fg9j48(), null);
        return tmp0.v1();
      }
      t40() {
        var tmp0 = this.n3z_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('encodedQuery', 1, tmp, Url$_get_encodedQuery_$ref_c7vq1h(), null);
        return tmp0.v1();
      }
      r40() {
        var tmp0 = this.p3z_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('encodedUser', 1, tmp, Url$_get_encodedUser_$ref_3lb9bi(), null);
        return tmp0.v1();
      }
      s40() {
        var tmp0 = this.q3z_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('encodedPassword', 1, tmp, Url$_get_encodedPassword_$ref_25ixc2(), null);
        return tmp0.v1();
      }
      u40() {
        var tmp0 = this.r3z_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('encodedFragment', 1, tmp, Url$_get_encodedFragment_$ref_itp7pv(), null);
        return tmp0.v1();
      }
      toString() {
        return this.g3z_1;
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof Url_0()))
          THROW_CCE();
        return this.g3z_1 === other.g3z_1;
      }
      hashCode() {
        return getStringHashCode(this.g3z_1);
      }
    }
    initMetadataForClass($, 'Url', VOID, VOID, VOID, VOID, VOID, {0: UrlSerializer_getInstance});
    UrlClass = $;
  }
  return UrlClass;
}
function get_authority(_this__u8e3s4) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  this_0.hc(get_encodedUserAndPassword(_this__u8e3s4));
  this_0.hc(get_hostWithPortIfSpecified(_this__u8e3s4));
  return this_0.toString();
}
var UrlSerializerClass;
function UrlSerializer() {
  if (UrlSerializerClass === VOID) {
    class $ {
      constructor() {
        UrlSerializer_instance = this;
        this.v40_1 = PrimitiveSerialDescriptor('io.ktor.http.Url', STRING_getInstance());
      }
      fz() {
        return this.v40_1;
      }
      hz(decoder) {
        return Url(decoder.q13());
      }
      w40(encoder, value) {
        encoder.a15(value.toString());
      }
      gz(encoder, value) {
        return this.w40(encoder, value instanceof Url_0() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'UrlSerializer', VOID, VOID, [KSerializer()]);
    UrlSerializerClass = $;
  }
  return UrlSerializerClass;
}
var UrlSerializer_instance;
function UrlSerializer_getInstance() {
  if (UrlSerializer_instance === VOID)
    new (UrlSerializer())();
  return UrlSerializer_instance;
}
function get_encodedUserAndPassword(_this__u8e3s4) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  appendUserAndPassword(this_0, _this__u8e3s4.r40(), _this__u8e3s4.s40());
  return this_0.toString();
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Url_0 as Url1652zsz51o0h6,
  get_authority as get_authority2s3hk87lssumy,
};
//endregion

//# sourceMappingURL=Url.mjs.map
