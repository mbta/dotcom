import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Companion_getInstance1p3cpld7r1jz3 as Companion_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpMethod.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { KtMutableList1beimitadwkna as KtMutableList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  createKType1lgox3mzhchp5 as createKType,
  createInvariantKTypeProjection3sfd0u0y62ozd as createInvariantKTypeProjection,
} from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_DecompressionListAttribute() {
  _init_properties_HeadersUtils_kt__fb6dxx();
  return DecompressionListAttribute;
}
var DecompressionListAttribute;
function dropCompressionHeaders(_this__u8e3s4, method, attributes, alwaysRemove) {
  alwaysRemove = alwaysRemove === VOID ? false : alwaysRemove;
  _init_properties_HeadersUtils_kt__fb6dxx();
  if (method.equals(Companion_getInstance().r3v_1) || method.equals(Companion_getInstance().s3v_1))
    return Unit_instance;
  var header = _this__u8e3s4.lk(HttpHeaders_getInstance().f3r_1);
  if (header == null) {
    if (!alwaysRemove)
      return Unit_instance;
  } else {
    var tmp = get_DecompressionListAttribute();
    attributes.k3h(tmp, dropCompressionHeaders$lambda).i(header);
  }
  _this__u8e3s4.m3j(HttpHeaders_getInstance().f3r_1);
  _this__u8e3s4.m3j(HttpHeaders_getInstance().h3r_1);
}
function dropCompressionHeaders$lambda() {
  _init_properties_HeadersUtils_kt__fb6dxx();
  // Inline function 'kotlin.collections.mutableListOf' call
  return ArrayList().g1();
}
var properties_initialized_HeadersUtils_kt_8c3zal;
function _init_properties_HeadersUtils_kt__fb6dxx() {
  if (!properties_initialized_HeadersUtils_kt_8c3zal) {
    properties_initialized_HeadersUtils_kt_8c3zal = true;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'DecompressionListAttribute';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp = getKClass(KtMutableList());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_0;
    try {
      tmp_0 = createKType(getKClass(KtMutableList()), arrayOf([createInvariantKTypeProjection(createKType(PrimitiveClasses_getInstance().mi(), arrayOf([]), false))]), false);
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
    DecompressionListAttribute = new (AttributeKey())(name, tmp$ret$1);
  }
}
//region block: exports
export {
  dropCompressionHeaders as dropCompressionHeaders12falb2m2fkr1,
};
//endregion

//# sourceMappingURL=HeadersUtils.mjs.map
