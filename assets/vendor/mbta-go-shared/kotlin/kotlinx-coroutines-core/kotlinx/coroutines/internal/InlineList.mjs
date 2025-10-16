import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _InlineList___init__impl__z8n56(holder) {
  holder = holder === VOID ? null : holder;
  return holder;
}
function _get_holder__f6h5pd($this) {
  return $this;
}
function InlineList__plus_impl_nuetvo($this, element) {
  // Inline function 'kotlinx.coroutines.assert' call
  var tmp0_subject = _get_holder__f6h5pd($this);
  var tmp;
  if (tmp0_subject == null) {
    tmp = _InlineList___init__impl__z8n56(element);
  } else {
    if (tmp0_subject instanceof ArrayList()) {
      var tmp_0 = _get_holder__f6h5pd($this);
      (tmp_0 instanceof ArrayList() ? tmp_0 : THROW_CCE()).i(element);
      tmp = _InlineList___init__impl__z8n56(_get_holder__f6h5pd($this));
    } else {
      var list = ArrayList().w(4);
      var tmp_1 = _get_holder__f6h5pd($this);
      list.i((tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE());
      list.i(element);
      tmp = _InlineList___init__impl__z8n56(list);
    }
  }
  return tmp;
}
function access$_get_holder__kkflen($this) {
  return _get_holder__f6h5pd($this);
}
//region block: exports
export {
  access$_get_holder__kkflen as access$_get_holder__kkflen2dpfhuyt7ng33,
  _InlineList___init__impl__z8n56 as _InlineList___init__impl__z8n562662s9jzwcbcg,
  InlineList__plus_impl_nuetvo as InlineList__plus_impl_nuetvo2kefjf4xs4r0z,
};
//endregion

//# sourceMappingURL=InlineList.mjs.map
