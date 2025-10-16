import {
  IntIteratordtlvcwxsuu5a as IntIterator,
  LongIterator6nf6jdg4ti4 as LongIterator,
  CharIterator2h6gbyxoj1es2 as CharIterator,
} from '../collections/PrimitiveIterators.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from '../exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import {
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
} from '../Char.mjs';
import { numberToChar93r9buh19yek as numberToChar } from '../js/numberConversion.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var IntProgressionIteratorClass;
function IntProgressionIterator() {
  if (IntProgressionIteratorClass === VOID) {
    class $ extends IntIterator() {
      constructor(first, last, step) {
        super();
        this.at_1 = step;
        this.bt_1 = last;
        this.ct_1 = this.at_1 > 0 ? first <= last : first >= last;
        this.dt_1 = this.ct_1 ? first : this.bt_1;
      }
      y() {
        return this.ct_1;
      }
      ko() {
        var value = this.dt_1;
        if (value === this.bt_1) {
          if (!this.ct_1)
            throw NoSuchElementException().m1();
          this.ct_1 = false;
        } else {
          this.dt_1 = this.dt_1 + this.at_1 | 0;
        }
        return value;
      }
    }
    initMetadataForClass($, 'IntProgressionIterator');
    IntProgressionIteratorClass = $;
  }
  return IntProgressionIteratorClass;
}
var LongProgressionIteratorClass;
function LongProgressionIterator() {
  if (LongProgressionIteratorClass === VOID) {
    class $ extends LongIterator() {
      constructor(first, last, step) {
        super();
        this.et_1 = step;
        this.ft_1 = last;
        this.gt_1 = this.et_1.d2(new (Long())(0, 0)) > 0 ? first.d2(last) <= 0 : first.d2(last) >= 0;
        this.ht_1 = this.gt_1 ? first : this.ft_1;
      }
      y() {
        return this.gt_1;
      }
      lo() {
        var value = this.ht_1;
        if (value.equals(this.ft_1)) {
          if (!this.gt_1)
            throw NoSuchElementException().m1();
          this.gt_1 = false;
        } else {
          this.ht_1 = this.ht_1.f4(this.et_1);
        }
        return value;
      }
    }
    initMetadataForClass($, 'LongProgressionIterator');
    LongProgressionIteratorClass = $;
  }
  return LongProgressionIteratorClass;
}
var CharProgressionIteratorClass;
function CharProgressionIterator() {
  if (CharProgressionIteratorClass === VOID) {
    class $ extends CharIterator() {
      constructor(first, last, step) {
        super();
        this.it_1 = step;
        var tmp = this;
        // Inline function 'kotlin.code' call
        tmp.jt_1 = Char__toInt_impl_vasixd(last);
        this.kt_1 = this.it_1 > 0 ? Char__compareTo_impl_ypi4mb(first, last) <= 0 : Char__compareTo_impl_ypi4mb(first, last) >= 0;
        var tmp_0 = this;
        var tmp_1;
        if (this.kt_1) {
          // Inline function 'kotlin.code' call
          tmp_1 = Char__toInt_impl_vasixd(first);
        } else {
          tmp_1 = this.jt_1;
        }
        tmp_0.lt_1 = tmp_1;
      }
      y() {
        return this.kt_1;
      }
      no() {
        var value = this.lt_1;
        if (value === this.jt_1) {
          if (!this.kt_1)
            throw NoSuchElementException().m1();
          this.kt_1 = false;
        } else {
          this.lt_1 = this.lt_1 + this.it_1 | 0;
        }
        return numberToChar(value);
      }
    }
    initMetadataForClass($, 'CharProgressionIterator');
    CharProgressionIteratorClass = $;
  }
  return CharProgressionIteratorClass;
}
//region block: exports
export {
  CharProgressionIterator as CharProgressionIterator34nq4ujuknl08,
  IntProgressionIterator as IntProgressionIterator2ovd1ctrmu51n,
  LongProgressionIterator as LongProgressionIterator2e3slqmdh4zt7,
};
//endregion

//# sourceMappingURL=ProgressionIterators.mjs.map
