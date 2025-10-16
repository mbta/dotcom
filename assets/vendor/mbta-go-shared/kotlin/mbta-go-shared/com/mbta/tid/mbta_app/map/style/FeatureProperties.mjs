import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getNumberHashCode2l4nbdcihl25f as getNumberHashCode } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/bitUtils.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_map_style_JSONValue_Array$stable;
var com_mbta_tid_mbta_app_map_style_JSONValue_Boolean$stable;
var com_mbta_tid_mbta_app_map_style_JSONValue_Number$stable;
var com_mbta_tid_mbta_app_map_style_JSONValue_Object$stable;
var com_mbta_tid_mbta_app_map_style_JSONValue_String$stable;
var com_mbta_tid_mbta_app_map_style_FeatureProperties$stable;
var com_mbta_tid_mbta_app_map_style_FeaturePropertiesBuilder$stable;
var ArrayClass;
function Array_0() {
  if (ArrayClass === VOID) {
    class $ {
      constructor(data) {
        this.r8w_1 = data;
      }
      toString() {
        return 'Array(data=' + toString(this.r8w_1) + ')';
      }
      hashCode() {
        return hashCode(this.r8w_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Array_0()))
          return false;
        var tmp0_other_with_cast = other instanceof Array_0() ? other : THROW_CCE();
        if (!equals(this.r8w_1, tmp0_other_with_cast.r8w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Array');
    ArrayClass = $;
  }
  return ArrayClass;
}
var BooleanClass;
function Boolean_0() {
  if (BooleanClass === VOID) {
    class $ {
      constructor(data) {
        this.s8w_1 = data;
      }
      toString() {
        return 'Boolean(data=' + this.s8w_1 + ')';
      }
      hashCode() {
        return getBooleanHashCode(this.s8w_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Boolean_0()))
          return false;
        var tmp0_other_with_cast = other instanceof Boolean_0() ? other : THROW_CCE();
        if (!(this.s8w_1 === tmp0_other_with_cast.s8w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Boolean');
    BooleanClass = $;
  }
  return BooleanClass;
}
var NumberClass;
function Number_0() {
  if (NumberClass === VOID) {
    class $ {
      constructor(data) {
        this.t8w_1 = data;
      }
      toString() {
        return 'Number(data=' + this.t8w_1 + ')';
      }
      hashCode() {
        return getNumberHashCode(this.t8w_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Number_0()))
          return false;
        var tmp0_other_with_cast = other instanceof Number_0() ? other : THROW_CCE();
        if (!equals(this.t8w_1, tmp0_other_with_cast.t8w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Number');
    NumberClass = $;
  }
  return NumberClass;
}
var ObjectClass;
function Object_0() {
  if (ObjectClass === VOID) {
    class $ {
      constructor(data) {
        this.u8w_1 = data;
      }
      toString() {
        return 'Object(data=' + toString(this.u8w_1) + ')';
      }
      hashCode() {
        return hashCode(this.u8w_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Object_0()))
          return false;
        var tmp0_other_with_cast = other instanceof Object_0() ? other : THROW_CCE();
        if (!equals(this.u8w_1, tmp0_other_with_cast.u8w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Object');
    ObjectClass = $;
  }
  return ObjectClass;
}
var StringClass;
function String_0() {
  if (StringClass === VOID) {
    class $ {
      constructor(data) {
        this.v8w_1 = data;
      }
      toString() {
        return 'String(data=' + this.v8w_1 + ')';
      }
      hashCode() {
        return getStringHashCode(this.v8w_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof String_0()))
          return false;
        var tmp0_other_with_cast = other instanceof String_0() ? other : THROW_CCE();
        if (!(this.v8w_1 === tmp0_other_with_cast.v8w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'String');
    StringClass = $;
  }
  return StringClass;
}
var FeaturePropertiesClass;
function FeatureProperties() {
  if (FeaturePropertiesClass === VOID) {
    class $ {
      constructor(data) {
        this.w8w_1 = data;
      }
      toString() {
        return 'FeatureProperties(data=' + toString(this.w8w_1) + ')';
      }
      hashCode() {
        return hashCode(this.w8w_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof FeatureProperties()))
          return false;
        var tmp0_other_with_cast = other instanceof FeatureProperties() ? other : THROW_CCE();
        if (!equals(this.w8w_1, tmp0_other_with_cast.w8w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'FeatureProperties');
    FeaturePropertiesClass = $;
  }
  return FeaturePropertiesClass;
}
var FeaturePropertiesBuilderClass;
function FeaturePropertiesBuilder() {
  if (FeaturePropertiesBuilderClass === VOID) {
    class $ {
      constructor(data) {
        var tmp;
        if (data === VOID) {
          // Inline function 'kotlin.collections.mutableMapOf' call
          tmp = LinkedHashMap().sc();
        } else {
          tmp = data;
        }
        data = tmp;
        this.z8p_1 = data;
      }
      r8v(property, value) {
        var tmp0 = this.z8p_1;
        var tmp2 = property.x8w_1;
        // Inline function 'kotlin.collections.set' call
        var value_0 = new (Boolean_0())(value);
        tmp0.t3(tmp2, value_0);
      }
      v8v(property, value) {
        var tmp0 = this.z8p_1;
        var tmp2 = property.x8w_1;
        // Inline function 'kotlin.collections.set' call
        var value_0 = new (Number_0())(value);
        tmp0.t3(tmp2, value_0);
      }
      a8q(property, value) {
        var tmp0 = this.z8p_1;
        var tmp2 = property.x8w_1;
        // Inline function 'kotlin.collections.set' call
        var value_0 = new (String_0())(value);
        tmp0.t3(tmp2, value_0);
      }
      s8v(property, value) {
        var tmp0 = this.z8p_1;
        var tmp2 = property.x8w_1;
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(value, 10));
        var _iterator__ex2g4s = value.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = new (String_0())(item);
          destination.i(tmp$ret$0);
        }
        // Inline function 'kotlin.collections.set' call
        var value_0 = new (Array_0())(destination);
        tmp0.t3(tmp2, value_0);
      }
      u8v(property, value) {
        var tmp0 = this.z8p_1;
        var tmp2 = property.x8w_1;
        // Inline function 'kotlin.collections.mapValues' call
        // Inline function 'kotlin.collections.mapValuesTo' call
        var destination = LinkedHashMap().tc(mapCapacity(value.c1()));
        // Inline function 'kotlin.collections.associateByTo' call
        var _iterator__ex2g4s = value.t1().x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp = element.u1();
          var tmp$ret$1 = new (String_0())(element.v1());
          destination.t3(tmp, tmp$ret$1);
        }
        // Inline function 'kotlin.collections.set' call
        var value_0 = new (Object_0())(destination);
        tmp0.t3(tmp2, value_0);
      }
      t8v(property, value) {
        var tmp0 = this.z8p_1;
        var tmp2 = property.x8w_1;
        // Inline function 'kotlin.collections.mapValues' call
        // Inline function 'kotlin.collections.mapValuesTo' call
        var destination = LinkedHashMap().tc(mapCapacity(value.c1()));
        // Inline function 'kotlin.collections.associateByTo' call
        var _iterator__ex2g4s = value.t1().x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp = element.u1();
          // Inline function 'kotlin.collections.map' call
          var this_0 = element.v1();
          // Inline function 'kotlin.collections.mapTo' call
          var destination_0 = ArrayList().w(collectionSizeOrDefault(this_0, 10));
          var _iterator__ex2g4s_0 = this_0.x();
          while (_iterator__ex2g4s_0.y()) {
            var item = _iterator__ex2g4s_0.z();
            var tmp$ret$1 = new (String_0())(item);
            destination_0.i(tmp$ret$1);
          }
          var tmp$ret$4 = new (Array_0())(destination_0);
          destination.t3(tmp, tmp$ret$4);
        }
        // Inline function 'kotlin.collections.set' call
        var value_0 = new (Object_0())(destination);
        tmp0.t3(tmp2, value_0);
      }
      b8q() {
        return new (FeatureProperties())(this.z8p_1);
      }
    }
    initMetadataForClass($, 'FeaturePropertiesBuilder', FeaturePropertiesBuilder);
    FeaturePropertiesBuilderClass = $;
  }
  return FeaturePropertiesBuilderClass;
}
//region block: init
com_mbta_tid_mbta_app_map_style_JSONValue_Array$stable = 8;
com_mbta_tid_mbta_app_map_style_JSONValue_Boolean$stable = 0;
com_mbta_tid_mbta_app_map_style_JSONValue_Number$stable = 0;
com_mbta_tid_mbta_app_map_style_JSONValue_Object$stable = 8;
com_mbta_tid_mbta_app_map_style_JSONValue_String$stable = 0;
com_mbta_tid_mbta_app_map_style_FeatureProperties$stable = 8;
com_mbta_tid_mbta_app_map_style_FeaturePropertiesBuilder$stable = 8;
//endregion
//region block: exports
export {
  FeaturePropertiesBuilder as FeaturePropertiesBuildersu8whofa628t,
};
//endregion

//# sourceMappingURL=FeatureProperties.mjs.map
