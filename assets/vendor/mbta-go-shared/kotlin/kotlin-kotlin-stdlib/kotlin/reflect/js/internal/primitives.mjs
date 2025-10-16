import {
  isNumberiramasdbon0i as isNumber,
  isArray1hxjqtqy632bc as isArray,
  isBooleanArray35llghle4c6w1 as isBooleanArray,
  isCharArray21auq5hbrg68m as isCharArray,
  isByteArray4nnzfn1x4o3w as isByteArray,
  isShortArraywz30zxwtqi8h as isShortArray,
  isIntArrayeijsubfngq38 as isIntArray,
  isLongArray2fdt3z7yu3ef as isLongArray,
  isFloatArrayjjscnqphw92j as isFloatArray,
  isDoubleArray1wyh4nyf7pjxn as isDoubleArray,
} from '../../../js/typeCheckUtils.mjs';
import {
  PrimitiveKClassImpl1fv46nzfav2pd as PrimitiveKClassImpl,
  NothingKClassImpl_getInstance1v9lrhbzi4zr5 as NothingKClassImpl_getInstance,
} from './KClassImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../Unit.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_functionClasses() {
  _init_properties_primitives_kt__3fums4();
  return functionClasses;
}
var functionClasses;
function PrimitiveClasses$anyClass$lambda(it) {
  return !(it == null);
}
function PrimitiveClasses$numberClass$lambda(it) {
  return isNumber(it);
}
function PrimitiveClasses$booleanClass$lambda(it) {
  return !(it == null) ? typeof it === 'boolean' : false;
}
function PrimitiveClasses$byteClass$lambda(it) {
  return !(it == null) ? typeof it === 'number' : false;
}
function PrimitiveClasses$shortClass$lambda(it) {
  return !(it == null) ? typeof it === 'number' : false;
}
function PrimitiveClasses$intClass$lambda(it) {
  return !(it == null) ? typeof it === 'number' : false;
}
function PrimitiveClasses$floatClass$lambda(it) {
  return !(it == null) ? typeof it === 'number' : false;
}
function PrimitiveClasses$doubleClass$lambda(it) {
  return !(it == null) ? typeof it === 'number' : false;
}
function PrimitiveClasses$arrayClass$lambda(it) {
  return !(it == null) ? isArray(it) : false;
}
function PrimitiveClasses$stringClass$lambda(it) {
  return !(it == null) ? typeof it === 'string' : false;
}
function PrimitiveClasses$throwableClass$lambda(it) {
  return it instanceof Error;
}
function PrimitiveClasses$booleanArrayClass$lambda(it) {
  return !(it == null) ? isBooleanArray(it) : false;
}
function PrimitiveClasses$charArrayClass$lambda(it) {
  return !(it == null) ? isCharArray(it) : false;
}
function PrimitiveClasses$byteArrayClass$lambda(it) {
  return !(it == null) ? isByteArray(it) : false;
}
function PrimitiveClasses$shortArrayClass$lambda(it) {
  return !(it == null) ? isShortArray(it) : false;
}
function PrimitiveClasses$intArrayClass$lambda(it) {
  return !(it == null) ? isIntArray(it) : false;
}
function PrimitiveClasses$longArrayClass$lambda(it) {
  return !(it == null) ? isLongArray(it) : false;
}
function PrimitiveClasses$floatArrayClass$lambda(it) {
  return !(it == null) ? isFloatArray(it) : false;
}
function PrimitiveClasses$doubleArrayClass$lambda(it) {
  return !(it == null) ? isDoubleArray(it) : false;
}
function PrimitiveClasses$functionClass$lambda($arity) {
  return function (it) {
    var tmp;
    if (typeof it === 'function') {
      // Inline function 'kotlin.js.asDynamic' call
      tmp = it.length === $arity;
    } else {
      tmp = false;
    }
    return tmp;
  };
}
var PrimitiveClassesClass;
function PrimitiveClasses() {
  if (PrimitiveClassesClass === VOID) {
    class $ {
      constructor() {
        PrimitiveClasses_instance = this;
        var tmp = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_0 = Object;
        tmp.anyClass = new (PrimitiveKClassImpl())(tmp_0, 'Any', PrimitiveClasses$anyClass$lambda);
        var tmp_1 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_2 = Number;
        tmp_1.numberClass = new (PrimitiveKClassImpl())(tmp_2, 'Number', PrimitiveClasses$numberClass$lambda);
        this.nothingClass = NothingKClassImpl_getInstance();
        var tmp_3 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_4 = Boolean;
        tmp_3.booleanClass = new (PrimitiveKClassImpl())(tmp_4, 'Boolean', PrimitiveClasses$booleanClass$lambda);
        var tmp_5 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_6 = Number;
        tmp_5.byteClass = new (PrimitiveKClassImpl())(tmp_6, 'Byte', PrimitiveClasses$byteClass$lambda);
        var tmp_7 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_8 = Number;
        tmp_7.shortClass = new (PrimitiveKClassImpl())(tmp_8, 'Short', PrimitiveClasses$shortClass$lambda);
        var tmp_9 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_10 = Number;
        tmp_9.intClass = new (PrimitiveKClassImpl())(tmp_10, 'Int', PrimitiveClasses$intClass$lambda);
        var tmp_11 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_12 = Number;
        tmp_11.floatClass = new (PrimitiveKClassImpl())(tmp_12, 'Float', PrimitiveClasses$floatClass$lambda);
        var tmp_13 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_14 = Number;
        tmp_13.doubleClass = new (PrimitiveKClassImpl())(tmp_14, 'Double', PrimitiveClasses$doubleClass$lambda);
        var tmp_15 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_16 = Array;
        tmp_15.arrayClass = new (PrimitiveKClassImpl())(tmp_16, 'Array', PrimitiveClasses$arrayClass$lambda);
        var tmp_17 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_18 = String;
        tmp_17.stringClass = new (PrimitiveKClassImpl())(tmp_18, 'String', PrimitiveClasses$stringClass$lambda);
        var tmp_19 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_20 = Error;
        tmp_19.throwableClass = new (PrimitiveKClassImpl())(tmp_20, 'Throwable', PrimitiveClasses$throwableClass$lambda);
        var tmp_21 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_22 = Array;
        tmp_21.booleanArrayClass = new (PrimitiveKClassImpl())(tmp_22, 'BooleanArray', PrimitiveClasses$booleanArrayClass$lambda);
        var tmp_23 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_24 = Uint16Array;
        tmp_23.charArrayClass = new (PrimitiveKClassImpl())(tmp_24, 'CharArray', PrimitiveClasses$charArrayClass$lambda);
        var tmp_25 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_26 = Int8Array;
        tmp_25.byteArrayClass = new (PrimitiveKClassImpl())(tmp_26, 'ByteArray', PrimitiveClasses$byteArrayClass$lambda);
        var tmp_27 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_28 = Int16Array;
        tmp_27.shortArrayClass = new (PrimitiveKClassImpl())(tmp_28, 'ShortArray', PrimitiveClasses$shortArrayClass$lambda);
        var tmp_29 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_30 = Int32Array;
        tmp_29.intArrayClass = new (PrimitiveKClassImpl())(tmp_30, 'IntArray', PrimitiveClasses$intArrayClass$lambda);
        var tmp_31 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_32 = Array;
        tmp_31.longArrayClass = new (PrimitiveKClassImpl())(tmp_32, 'LongArray', PrimitiveClasses$longArrayClass$lambda);
        var tmp_33 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_34 = Float32Array;
        tmp_33.floatArrayClass = new (PrimitiveKClassImpl())(tmp_34, 'FloatArray', PrimitiveClasses$floatArrayClass$lambda);
        var tmp_35 = this;
        // Inline function 'kotlin.js.unsafeCast' call
        var tmp_36 = Float64Array;
        tmp_35.doubleArrayClass = new (PrimitiveKClassImpl())(tmp_36, 'DoubleArray', PrimitiveClasses$doubleArrayClass$lambda);
      }
      ci() {
        return this.anyClass;
      }
      di() {
        return this.numberClass;
      }
      ei() {
        return this.nothingClass;
      }
      fi() {
        return this.booleanClass;
      }
      gi() {
        return this.byteClass;
      }
      hi() {
        return this.shortClass;
      }
      ii() {
        return this.intClass;
      }
      ji() {
        return this.floatClass;
      }
      ki() {
        return this.doubleClass;
      }
      li() {
        return this.arrayClass;
      }
      mi() {
        return this.stringClass;
      }
      ni() {
        return this.throwableClass;
      }
      oi() {
        return this.booleanArrayClass;
      }
      pi() {
        return this.charArrayClass;
      }
      qi() {
        return this.byteArrayClass;
      }
      ri() {
        return this.shortArrayClass;
      }
      si() {
        return this.intArrayClass;
      }
      ti() {
        return this.longArrayClass;
      }
      ui() {
        return this.floatArrayClass;
      }
      vi() {
        return this.doubleArrayClass;
      }
      functionClass(arity) {
        var tmp0_elvis_lhs = get_functionClasses()[arity];
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.run' call
          // Inline function 'kotlin.js.unsafeCast' call
          var tmp_0 = Function;
          var tmp_1 = 'Function' + arity;
          var result = new (PrimitiveKClassImpl())(tmp_0, tmp_1, PrimitiveClasses$functionClass$lambda(arity));
          // Inline function 'kotlin.js.asDynamic' call
          get_functionClasses()[arity] = result;
          tmp = result;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
    }
    initMetadataForObject($, 'PrimitiveClasses');
    PrimitiveClassesClass = $;
  }
  return PrimitiveClassesClass;
}
var PrimitiveClasses_instance;
function PrimitiveClasses_getInstance() {
  if (PrimitiveClasses_instance === VOID)
    new (PrimitiveClasses())();
  return PrimitiveClasses_instance;
}
var properties_initialized_primitives_kt_jle18u;
function _init_properties_primitives_kt__3fums4() {
  if (!properties_initialized_primitives_kt_jle18u) {
    properties_initialized_primitives_kt_jle18u = true;
    // Inline function 'kotlin.arrayOfNulls' call
    functionClasses = Array(0);
  }
}
//region block: exports
export {
  PrimitiveClasses_getInstance as PrimitiveClasses_getInstance2v63zn04dtq03,
};
//endregion

//# sourceMappingURL=primitives.mjs.map
