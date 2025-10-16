import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { AbstractList3ck35puwbp1e9 as AbstractList } from './AbstractList.mjs';
import { IndexOutOfBoundsException1qfr429iumro0 as IndexOutOfBoundsException } from '../exceptions.mjs';
import { get_lastIndex1yw0x4k50k51w as get_lastIndex } from './CollectionsKt.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../js/rangeTo.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function asReversed(_this__u8e3s4) {
  return ReversedListReadOnly().po(_this__u8e3s4);
}
var ReversedListReadOnly$listIterator$1Class;
function ReversedListReadOnly$listIterator$1() {
  if (ReversedListReadOnly$listIterator$1Class === VOID) {
    class $ {
      constructor(this$0, $index) {
        this.ro_1 = this$0;
        this.qo_1 = this$0.oo_1.k1(reversePositionIndex(this$0, $index));
      }
      y() {
        return this.qo_1.j7();
      }
      j7() {
        return this.qo_1.y();
      }
      z() {
        return this.qo_1.l7();
      }
      k7() {
        return reverseIteratorIndex(this.ro_1, this.qo_1.m7());
      }
      l7() {
        return this.qo_1.z();
      }
      m7() {
        return reverseIteratorIndex(this.ro_1, this.qo_1.k7());
      }
    }
    initMetadataForClass($);
    ReversedListReadOnly$listIterator$1Class = $;
  }
  return ReversedListReadOnly$listIterator$1Class;
}
var ReversedListReadOnlyClass;
function ReversedListReadOnly() {
  if (ReversedListReadOnlyClass === VOID) {
    class $ extends AbstractList() {
      static po(delegate) {
        var $this = this.qm();
        $this.oo_1 = delegate;
        return $this;
      }
      c1() {
        return this.oo_1.c1();
      }
      e1(index) {
        return this.oo_1.e1(reverseElementIndex(this, index));
      }
      x() {
        return this.k1(0);
      }
      f3() {
        return this.k1(0);
      }
      k1(index) {
        return new (ReversedListReadOnly$listIterator$1())(this, index);
      }
    }
    initMetadataForClass($, 'ReversedListReadOnly');
    ReversedListReadOnlyClass = $;
  }
  return ReversedListReadOnlyClass;
}
function reverseElementIndex(_this__u8e3s4, index) {
  var tmp;
  if (0 <= index ? index <= get_lastIndex(_this__u8e3s4) : false) {
    tmp = get_lastIndex(_this__u8e3s4) - index | 0;
  } else {
    throw IndexOutOfBoundsException().jg('Element index ' + index + ' must be in range [' + numberRangeToNumber(0, get_lastIndex(_this__u8e3s4)).toString() + '].');
  }
  return tmp;
}
function reversePositionIndex(_this__u8e3s4, index) {
  var tmp;
  if (0 <= index ? index <= _this__u8e3s4.c1() : false) {
    tmp = _this__u8e3s4.c1() - index | 0;
  } else {
    throw IndexOutOfBoundsException().jg('Position index ' + index + ' must be in range [' + numberRangeToNumber(0, _this__u8e3s4.c1()).toString() + '].');
  }
  return tmp;
}
function reverseIteratorIndex(_this__u8e3s4, index) {
  return get_lastIndex(_this__u8e3s4) - index | 0;
}
//region block: exports
export {
  asReversed as asReversed308kw52j6ls1u,
};
//endregion

//# sourceMappingURL=ReversedViews.mjs.map
