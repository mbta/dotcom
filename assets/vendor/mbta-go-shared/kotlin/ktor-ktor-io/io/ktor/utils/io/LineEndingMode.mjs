import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { listOf1jh22dvmctj1r as listOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _LineEndingMode___init__impl__jo5bul(mode) {
  return mode;
}
function _get_mode__dah3bc($this) {
  return $this;
}
function LineEndingMode__contains_impl_q5pr68($this, other) {
  return (_get_mode__dah3bc($this) | _get_mode__dah3bc(other)) === _get_mode__dah3bc($this);
}
function LineEndingMode__plus_impl_ttpz2j($this, other) {
  return _LineEndingMode___init__impl__jo5bul(_get_mode__dah3bc($this) | _get_mode__dah3bc(other));
}
function LineEndingMode__toString_impl_j4h76r($this) {
  var tmp;
  if ($this === Companion_getInstance().t3a_1) {
    tmp = 'CR';
  } else if ($this === Companion_getInstance().u3a_1) {
    tmp = 'LF';
  } else if ($this === Companion_getInstance().v3a_1) {
    tmp = 'CRLF';
  } else {
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = Companion_getInstance().x3a_1;
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList().g1();
    var _iterator__ex2g4s = tmp0.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      var it = element.t3f_1;
      if (LineEndingMode__contains_impl_q5pr68($this, it)) {
        destination.i(element);
      }
    }
    tmp = toString(destination);
  }
  return tmp;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.t3a_1 = _LineEndingMode___init__impl__jo5bul(1);
        this.u3a_1 = _LineEndingMode___init__impl__jo5bul(2);
        this.v3a_1 = _LineEndingMode___init__impl__jo5bul(4);
        this.w3a_1 = _LineEndingMode___init__impl__jo5bul(7);
        this.x3a_1 = listOf([new (LineEndingMode())(this.t3a_1), new (LineEndingMode())(this.u3a_1), new (LineEndingMode())(this.v3a_1)]);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function LineEndingMode__hashCode_impl_2mopm4($this) {
  return $this;
}
function LineEndingMode__equals_impl_qyr4nk($this, other) {
  if (!(other instanceof LineEndingMode()))
    return false;
  if (!($this === (other instanceof LineEndingMode() ? other.t3f_1 : THROW_CCE())))
    return false;
  return true;
}
var LineEndingModeClass;
function LineEndingMode() {
  if (LineEndingModeClass === VOID) {
    class $ {
      constructor(mode) {
        Companion_getInstance();
        this.t3f_1 = mode;
      }
      toString() {
        return LineEndingMode__toString_impl_j4h76r(this.t3f_1);
      }
      hashCode() {
        return LineEndingMode__hashCode_impl_2mopm4(this.t3f_1);
      }
      equals(other) {
        return LineEndingMode__equals_impl_qyr4nk(this.t3f_1, other);
      }
    }
    initMetadataForClass($, 'LineEndingMode');
    LineEndingModeClass = $;
  }
  return LineEndingModeClass;
}
//region block: exports
export {
  LineEndingMode__contains_impl_q5pr68 as LineEndingMode__contains_impl_q5pr682au50lo4lfj91,
  LineEndingMode__plus_impl_ttpz2j as LineEndingMode__plus_impl_ttpz2j1vdcj3ndf6qez,
  LineEndingMode__toString_impl_j4h76r as LineEndingMode__toString_impl_j4h76r32i8wewde0kag,
  Companion_getInstance as Companion_getInstance2zbi981hww1p4,
};
//endregion

//# sourceMappingURL=LineEndingMode.mjs.map
