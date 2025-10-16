import { plus20p0vtfmu0596 as plus } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { getFullName1t9gk3djdkvl5 as getFullName } from '../ext/KClassExt.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function bind(_this__u8e3s4, clazz) {
  _this__u8e3s4.k7w_1.e7x_1.d7w_1 = plus(_this__u8e3s4.k7w_1.e7x_1.d7w_1, clazz);
  var tmp2 = _this__u8e3s4.k7w_1.e7x_1.a7w_1;
  // Inline function 'org.koin.core.definition.indexKey' call
  var scopeQualifier = _this__u8e3s4.k7w_1.e7x_1.y7v_1;
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  this_0.hc(getFullName(clazz));
  this_0.ic(_Char___init__impl__6a9atx(58));
  var tmp1_elvis_lhs = tmp2 == null ? null : tmp2.v1();
  this_0.hc(tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs);
  this_0.ic(_Char___init__impl__6a9atx(58));
  this_0.gc(scopeQualifier);
  var mapping = this_0.toString();
  _this__u8e3s4.j7w_1.p7y(mapping, _this__u8e3s4.k7w_1);
  return _this__u8e3s4;
}
//region block: exports
export {
  bind as bind1gj9wgzuy31pq,
};
//endregion

//# sourceMappingURL=DefinitionBinding.mjs.map
