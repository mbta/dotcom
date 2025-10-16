import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
import { Char19o2r8palgjof as Char } from '../Char.mjs';
import { isCharSequence1ju9jr1w86plq as isCharSequence } from '../js/typeCheckUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function appendElement(_this__u8e3s4, element, transform) {
  if (!(transform == null))
    _this__u8e3s4.v(transform(element));
  else {
    if (element == null ? true : isCharSequence(element))
      _this__u8e3s4.v(element);
    else {
      if (element instanceof Char())
        _this__u8e3s4.ic(element.r2_1);
      else {
        _this__u8e3s4.v(toString(element));
      }
    }
  }
}
//region block: exports
export {
  appendElement as appendElement7nmjunfw9r4,
};
//endregion

//# sourceMappingURL=Appendable.mjs.map
