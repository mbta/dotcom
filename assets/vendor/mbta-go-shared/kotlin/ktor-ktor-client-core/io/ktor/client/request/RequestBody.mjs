import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_BodyTypeAttributeKey() {
  _init_properties_RequestBody_kt__bo3lwf();
  return BodyTypeAttributeKey;
}
var BodyTypeAttributeKey;
var properties_initialized_RequestBody_kt_agyv1b;
function _init_properties_RequestBody_kt__bo3lwf() {
  if (!properties_initialized_RequestBody_kt_agyv1b) {
    properties_initialized_RequestBody_kt_agyv1b = true;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'BodyTypeAttributeKey';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp = getKClass(TypeInfo());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_0;
    try {
      tmp_0 = createKType(getKClass(TypeInfo()), arrayOf([]), false);
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
    BodyTypeAttributeKey = new (AttributeKey())(name, tmp$ret$1);
  }
}
//region block: exports
export {
  get_BodyTypeAttributeKey as get_BodyTypeAttributeKey1jqpsdtzeru4e,
};
//endregion

//# sourceMappingURL=RequestBody.mjs.map
