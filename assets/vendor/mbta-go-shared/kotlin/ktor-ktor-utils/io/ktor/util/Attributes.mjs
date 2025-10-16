import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from './reflect/Type.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { isBlank1dvkhjjvox3p0 as isBlank } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var AttributeKeyClass;
function AttributeKey() {
  if (AttributeKeyClass === VOID) {
    class $ {
      constructor(name, type) {
        var tmp;
        if (type === VOID) {
          // Inline function 'io.ktor.util.reflect.typeInfo' call
          var tmp_0 = PrimitiveClasses_getInstance().ci();
          // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
          var tmp_1;
          try {
            tmp_1 = createKType(PrimitiveClasses_getInstance().ci(), arrayOf([]), false);
          } catch ($p) {
            var tmp_2;
            if ($p instanceof Error) {
              var _unused_var__etf5q3 = $p;
              tmp_2 = null;
            } else {
              throw $p;
            }
            tmp_1 = tmp_2;
          }
          var tmp$ret$0 = tmp_1;
          tmp = new (TypeInfo())(tmp_0, tmp$ret$0);
        } else {
          tmp = type;
        }
        type = tmp;
        this.d3h_1 = name;
        this.e3h_1 = type;
        // Inline function 'kotlin.text.isNotBlank' call
        var this_0 = this.d3h_1;
        // Inline function 'kotlin.require' call
        if (!!isBlank(this_0)) {
          var message = "Name can't be blank";
          throw IllegalArgumentException().q(toString(message));
        }
      }
      toString() {
        return 'AttributeKey: ' + this.d3h_1;
      }
      hashCode() {
        var result = getStringHashCode(this.d3h_1);
        result = imul(result, 31) + this.e3h_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof AttributeKey()))
          return false;
        var tmp0_other_with_cast = other instanceof AttributeKey() ? other : THROW_CCE();
        if (!(this.d3h_1 === tmp0_other_with_cast.d3h_1))
          return false;
        if (!this.e3h_1.equals(tmp0_other_with_cast.e3h_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'AttributeKey');
    AttributeKeyClass = $;
  }
  return AttributeKeyClass;
}
function get(key) {
  var tmp0_elvis_lhs = this.g3h(key);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw IllegalStateException().o5('No instance for key ' + key.toString());
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
var AttributesClass;
function Attributes() {
  if (AttributesClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Attributes');
    AttributesClass = $;
  }
  return AttributesClass;
}
function putAll(_this__u8e3s4, other) {
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = other.l3h().x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    _this__u8e3s4.i3h(element instanceof AttributeKey() ? element : THROW_CCE(), other.f3h(element));
  }
}
//region block: exports
export {
  AttributeKey as AttributeKey3aq8ytwgx54f7,
  get as get1sxyiyz2qwf4j,
  Attributes as Attributes2dg90yv0ot9wx,
  putAll as putAll10o0q8e6mgnzr,
};
//endregion

//# sourceMappingURL=Attributes.mjs.map
