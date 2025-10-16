import { copyOf3rutauicler23 as copyOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { isArray1hxjqtqy632bc as isArray } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_IntStack$stable;
function resize($this) {
  var copy = copyOf($this.p6m_1, imul($this.p6m_1.length, 2));
  $this.p6m_1 = copy;
  return copy;
}
var IntStackClass;
function IntStack() {
  if (IntStackClass === VOID) {
    class $ {
      constructor() {
        this.p6m_1 = new Int32Array(10);
        this.q6m_1 = 0;
      }
      r6m(value) {
        var slots = this.p6m_1;
        if (this.q6m_1 >= slots.length) {
          slots = resize(this);
        }
        var tmp = slots;
        var _unary__edvuaz = this.q6m_1;
        this.q6m_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = value;
      }
      b6o() {
        var tmp = this.p6m_1;
        this.q6m_1 = this.q6m_1 - 1 | 0;
        return tmp[this.q6m_1];
      }
      g7a(default_0) {
        var index = this.q6m_1 - 1 | 0;
        return index >= 0 ? this.p6m_1[index] : default_0;
      }
      a6r() {
        return this.p6m_1[this.q6m_1 - 2 | 0];
      }
      f7a(index) {
        return this.p6m_1[index];
      }
      p3() {
        this.q6m_1 = 0;
      }
      e7a(value) {
        var slots = this.p6m_1;
        var tmp0 = slots.length;
        // Inline function 'kotlin.math.min' call
        var b = this.q6m_1;
        var end = Math.min(tmp0, b);
        var inductionVariable = 0;
        if (inductionVariable < end)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (slots[i] === value)
              return i;
          }
           while (inductionVariable < end);
        return -1;
      }
    }
    initMetadataForClass($, 'IntStack', IntStack);
    IntStackClass = $;
  }
  return IntStackClass;
}
function _Stack___init__impl__tvpfn5(backing) {
  backing = backing === VOID ? ArrayList().g1() : backing;
  return backing;
}
function _get_backing__s7m0a($this) {
  return $this;
}
function _Stack___get_size__impl__mdb81l($this) {
  return _get_backing__s7m0a($this).c1();
}
function Stack__push_impl_s8r905($this, value) {
  return _get_backing__s7m0a($this).i(value);
}
function Stack__pop_impl_8s4za4($this) {
  return _get_backing__s7m0a($this).s3(_Stack___get_size__impl__mdb81l($this) - 1 | 0);
}
function Stack__peek_impl_gtylu2($this) {
  return _get_backing__s7m0a($this).e1(_Stack___get_size__impl__mdb81l($this) - 1 | 0);
}
function Stack__peek_impl_gtylu2_0($this, index) {
  return _get_backing__s7m0a($this).e1(index);
}
function Stack__isEmpty_impl_modt1q($this) {
  return _get_backing__s7m0a($this).h1();
}
function Stack__isNotEmpty_impl_ua6a9t($this) {
  return !Stack__isEmpty_impl_modt1q($this);
}
function Stack__clear_impl_qoqv3c($this) {
  return _get_backing__s7m0a($this).p3();
}
function Stack__toArray_impl_ox34cp($this) {
  var tmp = 0;
  var tmp_0 = _get_backing__s7m0a($this).c1();
  // Inline function 'kotlin.arrayOfNulls' call
  var tmp_1 = Array(tmp_0);
  while (tmp < tmp_0) {
    var tmp_2 = tmp;
    tmp_1[tmp_2] = _get_backing__s7m0a($this).e1(tmp_2);
    tmp = tmp + 1 | 0;
  }
  var tmp_3 = tmp_1;
  return isArray(tmp_3) ? tmp_3 : THROW_CCE();
}
function Stack__toString_impl_aq1jdz($this) {
  return 'Stack(backing=' + $this.toString() + ')';
}
function Stack__hashCode_impl_wh7g6u($this) {
  return $this.hashCode();
}
function Stack__equals_impl_4f06xy($this, other) {
  if (!(other instanceof Stack()))
    return false;
  var tmp0_other_with_cast = other instanceof Stack() ? other.c6x_1 : THROW_CCE();
  if (!$this.equals(tmp0_other_with_cast))
    return false;
  return true;
}
var StackClass;
function Stack() {
  if (StackClass === VOID) {
    class $ {
      constructor(backing) {
        this.c6x_1 = backing;
      }
      toString() {
        return Stack__toString_impl_aq1jdz(this.c6x_1);
      }
      hashCode() {
        return Stack__hashCode_impl_wh7g6u(this.c6x_1);
      }
      equals(other) {
        return Stack__equals_impl_4f06xy(this.c6x_1, other);
      }
    }
    initMetadataForClass($, 'Stack');
    StackClass = $;
  }
  return StackClass;
}
//region block: init
androidx_compose_runtime_IntStack$stable = 8;
//endregion
//region block: exports
export {
  IntStack as IntStacky2p17u2t76no,
  Stack as Stackqxok12iizaod,
  _Stack___init__impl__tvpfn5 as _Stack___init__impl__tvpfn52esscbfgakobd,
  Stack__clear_impl_qoqv3c as Stack__clear_impl_qoqv3c3cn6dpu82q3we,
  Stack__isEmpty_impl_modt1q as Stack__isEmpty_impl_modt1q2xr4omv8kw5p1,
  Stack__isNotEmpty_impl_ua6a9t as Stack__isNotEmpty_impl_ua6a9t1w5hrxzfremjh,
  Stack__peek_impl_gtylu2 as Stack__peek_impl_gtylu2fapqog5v7kft,
  Stack__peek_impl_gtylu2_0 as Stack__peek_impl_gtylu23ky4wp8zzg4eh,
  Stack__pop_impl_8s4za4 as Stack__pop_impl_8s4za433gnfbabhg48d,
  Stack__push_impl_s8r905 as Stack__push_impl_s8r9054cycd2baz6fd,
  _Stack___get_size__impl__mdb81l as _Stack___get_size__impl__mdb81l1sn8x2tnt723o,
  Stack__toArray_impl_ox34cp as Stack__toArray_impl_ox34cp4znfmp3wqvqc,
};
//endregion

//# sourceMappingURL=Stack.mjs.map
