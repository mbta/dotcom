import { FixedOffsetTimeZone3oldrgkltiv4z as FixedOffsetTimeZone } from './TimeZone.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { abs1kdzbjes1idip as abs } from '../../../kotlin-kotlin-stdlib/kotlin/math/math.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { get_ISO_OFFSET1wt81dckmqhlf as get_ISO_OFFSET } from './format/UtcOffsetFormat.mjs';
import { UtcOffsetSerializer_getInstancehfvjgq5w8o12 as UtcOffsetSerializer_getInstance } from './serializers/TimeZoneSerializers.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function format(_this__u8e3s4, format) {
  return format.f82(_this__u8e3s4);
}
function getIsoUtcOffsetFormat() {
  return Formats_instance.e82();
}
function asTimeZone(_this__u8e3s4) {
  return FixedOffsetTimeZone().k82(_this__u8e3s4);
}
function get_utcOffsetCache() {
  _init_properties_UtcOffset_kt__93zod7();
  return utcOffsetCache;
}
var utcOffsetCache;
function validateTotal($this, totalSeconds) {
  if (!(-64800 <= totalSeconds ? totalSeconds <= 64800 : false)) {
    throw IllegalArgumentException().q('Total seconds value is out of range: ' + totalSeconds);
  }
}
function validate($this, hours, minutes, seconds) {
  if (hours < -18 || hours > 18) {
    throw IllegalArgumentException().q('Zone offset hours not in valid range: value ' + hours + ' is not in the range -18 to 18');
  }
  if (hours > 0) {
    if (minutes < 0 || seconds < 0) {
      throw IllegalArgumentException().q('Zone offset minutes and seconds must be positive because hours is positive');
    }
  } else if (hours < 0) {
    if (minutes > 0 || seconds > 0) {
      throw IllegalArgumentException().q('Zone offset minutes and seconds must be negative because hours is negative');
    }
  } else if (minutes > 0 && seconds < 0 || (minutes < 0 && seconds > 0)) {
    throw IllegalArgumentException().q('Zone offset minutes and seconds must have the same sign');
  }
  if (abs(minutes) > 59) {
    throw IllegalArgumentException().q('Zone offset minutes not in valid range: abs(value) ' + abs(minutes) + ' is not in the range 0 to 59');
  }
  if (abs(seconds) > 59) {
    throw IllegalArgumentException().q('Zone offset seconds not in valid range: abs(value) ' + abs(seconds) + ' is not in the range 0 to 59');
  }
  if (abs(hours) === 18 && (abs(minutes) > 0 || abs(seconds) > 0)) {
    throw IllegalArgumentException().q('Utc offset not in valid range: -18:00 to +18:00');
  }
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.w8g_1 = new (UtcOffset())(0);
      }
      j8i(input, format) {
        return format.lv(input);
      }
      x8g(input, format, $super) {
        format = format === VOID ? getIsoUtcOffsetFormat() : format;
        return $super === VOID ? this.j8i(input, format) : $super.j8i.call(this, input, format);
      }
      k8i(hours, minutes, seconds) {
        validate(this, hours, minutes, seconds);
        return hours === 0 && minutes === 0 && seconds === 0 ? this.w8g_1 : this.l8i((imul(hours, 3600) + imul(minutes, 60) | 0) + seconds | 0);
      }
      l8i(seconds) {
        validateTotal(this, seconds);
        var tmp;
        if ((seconds % 900 | 0) === 0) {
          var tmp0_elvis_lhs = get_utcOffsetCache().j3(seconds);
          var tmp_0;
          if (tmp0_elvis_lhs == null) {
            // Inline function 'kotlin.also' call
            var this_0 = new (UtcOffset())(seconds);
            // Inline function 'kotlin.collections.set' call
            get_utcOffsetCache().t3(seconds, this_0);
            tmp_0 = this_0;
          } else {
            tmp_0 = tmp0_elvis_lhs;
          }
          tmp = tmp_0;
        } else {
          tmp = new (UtcOffset())(seconds);
        }
        return tmp;
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
var FormatsClass;
function Formats() {
  if (FormatsClass === VOID) {
    class $ {
      e82() {
        return get_ISO_OFFSET();
      }
    }
    initMetadataForObject($, 'Formats');
    FormatsClass = $;
  }
  return FormatsClass;
}
var Formats_instance;
function Formats_getInstance() {
  return Formats_instance;
}
var UtcOffsetClass;
function UtcOffset() {
  if (UtcOffsetClass === VOID) {
    class $ {
      constructor(totalSeconds) {
        Companion_getInstance();
        this.f89_1 = totalSeconds;
      }
      hashCode() {
        return this.f89_1;
      }
      equals(other) {
        var tmp;
        if (other instanceof UtcOffset()) {
          tmp = this.f89_1 === other.f89_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      toString() {
        return format(this, Formats_instance.e82());
      }
    }
    initMetadataForClass($, 'UtcOffset', VOID, VOID, VOID, VOID, VOID, {0: UtcOffsetSerializer_getInstance});
    UtcOffsetClass = $;
  }
  return UtcOffsetClass;
}
function UtcOffset_0(hours, minutes, seconds) {
  hours = hours === VOID ? null : hours;
  minutes = minutes === VOID ? null : minutes;
  seconds = seconds === VOID ? null : seconds;
  _init_properties_UtcOffset_kt__93zod7();
  var tmp;
  if (!(hours == null)) {
    var tmp_0 = Companion_getInstance();
    var tmp_1 = minutes == null ? 0 : minutes;
    tmp = tmp_0.k8i(hours, tmp_1, seconds == null ? 0 : seconds);
  } else if (!(minutes == null)) {
    var tmp_2 = Companion_getInstance();
    var tmp_3 = minutes / 60 | 0;
    var tmp_4 = minutes % 60 | 0;
    tmp = tmp_2.k8i(tmp_3, tmp_4, seconds == null ? 0 : seconds);
  } else {
    var tmp_5 = Companion_getInstance();
    tmp = tmp_5.l8i(seconds == null ? 0 : seconds);
  }
  return tmp;
}
var properties_initialized_UtcOffset_kt_4gxffr;
function _init_properties_UtcOffset_kt__93zod7() {
  if (!properties_initialized_UtcOffset_kt_4gxffr) {
    properties_initialized_UtcOffset_kt_4gxffr = true;
    // Inline function 'kotlin.collections.mutableMapOf' call
    utcOffsetCache = LinkedHashMap().sc();
  }
}
//region block: init
Formats_instance = new (Formats())();
//endregion
//region block: exports
export {
  Companion_getInstance as Companion_getInstance3p275ab8rhrps,
  UtcOffset_0 as UtcOffset2q1jzx5thduw7,
  UtcOffset as UtcOffset17lxgyhnn4rny,
  asTimeZone as asTimeZone3kdzfpoilmjbj,
};
//endregion

//# sourceMappingURL=UtcOffset.mjs.map
