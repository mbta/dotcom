import { toString30pk9tzaqopn as toString } from './Library.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from './js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _Result___init__impl__xyqfz8(value) {
  return value;
}
function _Result___get_value__impl__bjfvqg($this) {
  return $this;
}
function _Result___get_isFailure__impl__jpiriv($this) {
  var tmp = _Result___get_value__impl__bjfvqg($this);
  return tmp instanceof Failure();
}
function Result__exceptionOrNull_impl_p6xea9($this) {
  var tmp;
  if (_Result___get_value__impl__bjfvqg($this) instanceof Failure()) {
    tmp = _Result___get_value__impl__bjfvqg($this).ae_1;
  } else {
    tmp = null;
  }
  return tmp;
}
function Result__toString_impl_yu5r8k($this) {
  var tmp;
  if (_Result___get_value__impl__bjfvqg($this) instanceof Failure()) {
    tmp = _Result___get_value__impl__bjfvqg($this).toString();
  } else {
    tmp = 'Success(' + toString(_Result___get_value__impl__bjfvqg($this)) + ')';
  }
  return tmp;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var FailureClass;
function Failure() {
  if (FailureClass === VOID) {
    class $ {
      constructor(exception) {
        this.ae_1 = exception;
      }
      equals(other) {
        var tmp;
        if (other instanceof Failure()) {
          tmp = equals(this.ae_1, other.ae_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.ae_1);
      }
      toString() {
        return 'Failure(' + this.ae_1.toString() + ')';
      }
    }
    initMetadataForClass($, 'Failure');
    FailureClass = $;
  }
  return FailureClass;
}
function Result__hashCode_impl_d2zufp($this) {
  return $this == null ? 0 : hashCode($this);
}
function Result__equals_impl_bxgmep($this, other) {
  if (!(other instanceof Result()))
    return false;
  var tmp0_other_with_cast = other instanceof Result() ? other.yw_1 : THROW_CCE();
  if (!equals($this, tmp0_other_with_cast))
    return false;
  return true;
}
var ResultClass;
function Result() {
  if (ResultClass === VOID) {
    class $ {
      constructor(value) {
        this.yw_1 = value;
      }
      toString() {
        return Result__toString_impl_yu5r8k(this.yw_1);
      }
      hashCode() {
        return Result__hashCode_impl_d2zufp(this.yw_1);
      }
      equals(other) {
        return Result__equals_impl_bxgmep(this.yw_1, other);
      }
    }
    initMetadataForClass($, 'Result');
    ResultClass = $;
  }
  return ResultClass;
}
function createFailure(exception) {
  return new (Failure())(exception);
}
function throwOnFailure(_this__u8e3s4) {
  var tmp = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
  if (tmp instanceof Failure())
    throw _Result___get_value__impl__bjfvqg(_this__u8e3s4).ae_1;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  _Result___init__impl__xyqfz8 as _Result___init__impl__xyqfz83hut4nr3dfvi3,
  Result__exceptionOrNull_impl_p6xea9 as Result__exceptionOrNull_impl_p6xea9ty3elzpd9eo3,
  _Result___get_isFailure__impl__jpiriv as _Result___get_isFailure__impl__jpirivrr0d11rbi6gb,
  _Result___get_value__impl__bjfvqg as _Result___get_value__impl__bjfvqg2ei4op8d4d2m,
  Companion_instance as Companion_instance2oawqq9qiaris,
  Failure as Failure21qmuqji4xbjp,
  Result as Result3t1vadv16kmzk,
  createFailure as createFailure8paxfkfa5dc7,
  throwOnFailure as throwOnFailure24snjmtlqgzo8,
};
//endregion

//# sourceMappingURL=Result.mjs.map
