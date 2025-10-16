import { compareTo3ankvs086tmwq as compareTo } from '../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { enumEntries20mr21zbe3az4 as enumEntries } from '../../../../kotlin-kotlin-stdlib/kotlin/enums/EnumEntries.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var FrameType_TEXT_instance;
var FrameType_BINARY_instance;
var FrameType_CLOSE_instance;
var FrameType_PING_instance;
var FrameType_PONG_instance;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp0 = get_entries();
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.maxByOrNull' call
          var iterator = tmp0.x();
          if (!iterator.y()) {
            tmp$ret$0 = null;
            break $l$block_0;
          }
          var maxElem = iterator.z();
          if (!iterator.y()) {
            tmp$ret$0 = maxElem;
            break $l$block_0;
          }
          var maxValue = maxElem.r4g_1;
          do {
            var e = iterator.z();
            var v = e.r4g_1;
            if (compareTo(maxValue, v) < 0) {
              maxElem = e;
              maxValue = v;
            }
          }
           while (iterator.y());
          tmp$ret$0 = maxElem;
        }
        tmp.s4g_1 = ensureNotNull(tmp$ret$0).r4g_1;
        var tmp_0 = this;
        var tmp_1 = 0;
        var tmp_2 = this.s4g_1 + 1 | 0;
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp_3 = Array(tmp_2);
        while (tmp_1 < tmp_2) {
          var tmp_4 = tmp_1;
          var tmp0_0 = get_entries();
          var tmp$ret$5;
          $l$block_2: {
            // Inline function 'kotlin.collections.singleOrNull' call
            var single = null;
            var found = false;
            var _iterator__ex2g4s = tmp0_0.x();
            while (_iterator__ex2g4s.y()) {
              var element = _iterator__ex2g4s.z();
              if (element.r4g_1 === tmp_4) {
                if (found) {
                  tmp$ret$5 = null;
                  break $l$block_2;
                }
                single = element;
                found = true;
              }
            }
            if (!found) {
              tmp$ret$5 = null;
              break $l$block_2;
            }
            tmp$ret$5 = single;
          }
          tmp_3[tmp_4] = tmp$ret$5;
          tmp_1 = tmp_1 + 1 | 0;
        }
        tmp_0.t4g_1 = tmp_3;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  FrameType_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function values() {
  return [FrameType_TEXT_getInstance(), FrameType_BINARY_getInstance(), FrameType_CLOSE_getInstance(), FrameType_PING_getInstance(), FrameType_PONG_getInstance()];
}
function get_entries() {
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var FrameType_entriesInitialized;
function FrameType_initEntries() {
  if (FrameType_entriesInitialized)
    return Unit_instance;
  FrameType_entriesInitialized = true;
  FrameType_TEXT_instance = new (FrameType())('TEXT', 0, false, 1);
  FrameType_BINARY_instance = new (FrameType())('BINARY', 1, false, 2);
  FrameType_CLOSE_instance = new (FrameType())('CLOSE', 2, true, 8);
  FrameType_PING_instance = new (FrameType())('PING', 3, true, 9);
  FrameType_PONG_instance = new (FrameType())('PONG', 4, true, 10);
  Companion_getInstance();
}
var $ENTRIES;
var FrameTypeClass;
function FrameType() {
  if (FrameTypeClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, controlFrame, opcode) {
        super(name, ordinal);
        this.q4g_1 = controlFrame;
        this.r4g_1 = opcode;
      }
    }
    initMetadataForClass($, 'FrameType');
    FrameTypeClass = $;
  }
  return FrameTypeClass;
}
function FrameType_TEXT_getInstance() {
  FrameType_initEntries();
  return FrameType_TEXT_instance;
}
function FrameType_BINARY_getInstance() {
  FrameType_initEntries();
  return FrameType_BINARY_instance;
}
function FrameType_CLOSE_getInstance() {
  FrameType_initEntries();
  return FrameType_CLOSE_instance;
}
function FrameType_PING_getInstance() {
  FrameType_initEntries();
  return FrameType_PING_instance;
}
function FrameType_PONG_getInstance() {
  FrameType_initEntries();
  return FrameType_PONG_instance;
}
//region block: exports
export {
  FrameType_BINARY_getInstance as FrameType_BINARY_getInstance21mui57dvsupv,
  FrameType_CLOSE_getInstance as FrameType_CLOSE_getInstance15jbt5jmmf9fy,
  FrameType_PING_getInstance as FrameType_PING_getInstance28g5j7lcyx6ys,
  FrameType_PONG_getInstance as FrameType_PONG_getInstance3inzufk15ho3a,
  FrameType_TEXT_getInstance as FrameType_TEXT_getInstancer2p77eshsb06,
};
//endregion

//# sourceMappingURL=FrameType.mjs.map
