import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { enumEntries20mr21zbe3az4 as enumEntries } from '../../../../kotlin-kotlin-stdlib/kotlin/enums/EnumEntries.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var Codes_NORMAL_instance;
var Codes_GOING_AWAY_instance;
var Codes_PROTOCOL_ERROR_instance;
var Codes_CANNOT_ACCEPT_instance;
var Codes_CLOSED_ABNORMALLY_instance;
var Codes_NOT_CONSISTENT_instance;
var Codes_VIOLATED_POLICY_instance;
var Codes_TOO_BIG_instance;
var Codes_NO_EXTENSION_instance;
var Codes_INTERNAL_ERROR_instance;
var Codes_SERVICE_RESTART_instance;
var Codes_TRY_AGAIN_LATER_instance;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        // Inline function 'kotlin.collections.associateBy' call
        var this_0 = get_entries();
        var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
        // Inline function 'kotlin.collections.associateByTo' call
        var destination = LinkedHashMap().tc(capacity);
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp$ret$0 = element.n49_1;
          destination.t3(tmp$ret$0, element);
        }
        tmp.o49_1 = destination;
        this.p49_1 = Codes_INTERNAL_ERROR_getInstance();
      }
      q49(code) {
        return this.o49_1.j3(code);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  Codes_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function values() {
  return [Codes_NORMAL_getInstance(), Codes_GOING_AWAY_getInstance(), Codes_PROTOCOL_ERROR_getInstance(), Codes_CANNOT_ACCEPT_getInstance(), Codes_CLOSED_ABNORMALLY_getInstance(), Codes_NOT_CONSISTENT_getInstance(), Codes_VIOLATED_POLICY_getInstance(), Codes_TOO_BIG_getInstance(), Codes_NO_EXTENSION_getInstance(), Codes_INTERNAL_ERROR_getInstance(), Codes_SERVICE_RESTART_getInstance(), Codes_TRY_AGAIN_LATER_getInstance()];
}
function get_entries() {
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var Codes_entriesInitialized;
function Codes_initEntries() {
  if (Codes_entriesInitialized)
    return Unit_instance;
  Codes_entriesInitialized = true;
  Codes_NORMAL_instance = new (Codes())('NORMAL', 0, 1000);
  Codes_GOING_AWAY_instance = new (Codes())('GOING_AWAY', 1, 1001);
  Codes_PROTOCOL_ERROR_instance = new (Codes())('PROTOCOL_ERROR', 2, 1002);
  Codes_CANNOT_ACCEPT_instance = new (Codes())('CANNOT_ACCEPT', 3, 1003);
  Codes_CLOSED_ABNORMALLY_instance = new (Codes())('CLOSED_ABNORMALLY', 4, 1006);
  Codes_NOT_CONSISTENT_instance = new (Codes())('NOT_CONSISTENT', 5, 1007);
  Codes_VIOLATED_POLICY_instance = new (Codes())('VIOLATED_POLICY', 6, 1008);
  Codes_TOO_BIG_instance = new (Codes())('TOO_BIG', 7, 1009);
  Codes_NO_EXTENSION_instance = new (Codes())('NO_EXTENSION', 8, 1010);
  Codes_INTERNAL_ERROR_instance = new (Codes())('INTERNAL_ERROR', 9, 1011);
  Codes_SERVICE_RESTART_instance = new (Codes())('SERVICE_RESTART', 10, 1012);
  Codes_TRY_AGAIN_LATER_instance = new (Codes())('TRY_AGAIN_LATER', 11, 1013);
  Companion_getInstance();
}
var $ENTRIES;
var CodesClass;
function Codes() {
  if (CodesClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, code) {
        super(name, ordinal);
        this.n49_1 = code;
      }
    }
    initMetadataForClass($, 'Codes');
    CodesClass = $;
  }
  return CodesClass;
}
function Codes_NORMAL_getInstance() {
  Codes_initEntries();
  return Codes_NORMAL_instance;
}
function Codes_GOING_AWAY_getInstance() {
  Codes_initEntries();
  return Codes_GOING_AWAY_instance;
}
function Codes_PROTOCOL_ERROR_getInstance() {
  Codes_initEntries();
  return Codes_PROTOCOL_ERROR_instance;
}
function Codes_CANNOT_ACCEPT_getInstance() {
  Codes_initEntries();
  return Codes_CANNOT_ACCEPT_instance;
}
function Codes_CLOSED_ABNORMALLY_getInstance() {
  Codes_initEntries();
  return Codes_CLOSED_ABNORMALLY_instance;
}
function Codes_NOT_CONSISTENT_getInstance() {
  Codes_initEntries();
  return Codes_NOT_CONSISTENT_instance;
}
function Codes_VIOLATED_POLICY_getInstance() {
  Codes_initEntries();
  return Codes_VIOLATED_POLICY_instance;
}
function Codes_TOO_BIG_getInstance() {
  Codes_initEntries();
  return Codes_TOO_BIG_instance;
}
function Codes_NO_EXTENSION_getInstance() {
  Codes_initEntries();
  return Codes_NO_EXTENSION_instance;
}
function Codes_INTERNAL_ERROR_getInstance() {
  Codes_initEntries();
  return Codes_INTERNAL_ERROR_instance;
}
function Codes_SERVICE_RESTART_getInstance() {
  Codes_initEntries();
  return Codes_SERVICE_RESTART_instance;
}
function Codes_TRY_AGAIN_LATER_getInstance() {
  Codes_initEntries();
  return Codes_TRY_AGAIN_LATER_instance;
}
var CloseReasonClass;
function CloseReason() {
  if (CloseReasonClass === VOID) {
    class $ {
      static t49(code, message) {
        var $this = createThis(this);
        $this.r49_1 = code;
        $this.s49_1 = message;
        return $this;
      }
      static u49(code, message) {
        return this.t49(code.n49_1, message);
      }
      v49() {
        return Companion_getInstance().q49(this.r49_1);
      }
      toString() {
        var tmp0_elvis_lhs = this.v49();
        return 'CloseReason(reason=' + toString(tmp0_elvis_lhs == null ? this.r49_1 : tmp0_elvis_lhs) + ', message=' + this.s49_1 + ')';
      }
      hashCode() {
        var result = this.r49_1;
        result = imul(result, 31) + getStringHashCode(this.s49_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof CloseReason()))
          return false;
        var tmp0_other_with_cast = other instanceof CloseReason() ? other : THROW_CCE();
        if (!(this.r49_1 === tmp0_other_with_cast.r49_1))
          return false;
        if (!(this.s49_1 === tmp0_other_with_cast.s49_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'CloseReason');
    CloseReasonClass = $;
  }
  return CloseReasonClass;
}
//region block: exports
export {
  Codes_CLOSED_ABNORMALLY_getInstance as Codes_CLOSED_ABNORMALLY_getInstance36fk4x8bui0mi,
  Codes_INTERNAL_ERROR_getInstance as Codes_INTERNAL_ERROR_getInstance3iys9whrnik2e,
  Codes_NORMAL_getInstance as Codes_NORMAL_getInstance2p2d63s1iongn,
  Codes_TOO_BIG_getInstance as Codes_TOO_BIG_getInstance13r0uoqvuqq4y,
  Companion_getInstance as Companion_getInstance3hj6iykoiauw8,
  CloseReason as CloseReason10cphaqpp3ct7,
};
//endregion

//# sourceMappingURL=CloseReason.mjs.map
