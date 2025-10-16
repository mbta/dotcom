import { longArray288a0fctlmjmj as longArray } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { get_lastIndex1y2f6o9u8hnf7 as get_lastIndex } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Arrays.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { countTrailingZeroBits1k55x07cygoff as countTrailingZeroBits } from '../../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.z19_1 = longArray(0);
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
function prepareHighMarksArray($this, elementsCount) {
  var slotsCount = (elementsCount - 1 | 0) >>> 6 | 0;
  var elementsInLastSlot = elementsCount & 63;
  var highMarks = longArray(slotsCount);
  if (!(elementsInLastSlot === 0)) {
    highMarks[get_lastIndex(highMarks)] = (new (Long())(-1, -1)).p4(elementsCount);
  }
  return highMarks;
}
function markHigh($this, index) {
  var slot = (index >>> 6 | 0) - 1 | 0;
  var offsetInSlot = index & 63;
  $this.d1a_1[slot] = $this.d1a_1[slot].t4((new (Long())(1, 0)).p4(offsetInSlot));
}
function nextUnmarkedHighIndex($this) {
  var inductionVariable = 0;
  var last = $this.d1a_1.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var slot = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var slotOffset = imul(slot + 1 | 0, 64);
      var slotMarks = $this.d1a_1[slot];
      while (!slotMarks.equals(new (Long())(-1, -1))) {
        var indexInSlot = countTrailingZeroBits(slotMarks.n4());
        slotMarks = slotMarks.t4((new (Long())(1, 0)).p4(indexInSlot));
        var index = slotOffset + indexInSlot | 0;
        if ($this.b1a_1($this.a1a_1, index)) {
          $this.d1a_1[slot] = slotMarks;
          return index;
        }
      }
      $this.d1a_1[slot] = slotMarks;
    }
     while (inductionVariable <= last);
  return -1;
}
var ElementMarkerClass;
function ElementMarker() {
  if (ElementMarkerClass === VOID) {
    class $ {
      constructor(descriptor, readIfAbsent) {
        Companion_getInstance();
        this.a1a_1 = descriptor;
        this.b1a_1 = readIfAbsent;
        var elementsCount = this.a1a_1.z11();
        if (elementsCount <= 64) {
          var tmp = this;
          var tmp_0;
          if (elementsCount === 64) {
            tmp_0 = new (Long())(0, 0);
          } else {
            tmp_0 = (new (Long())(-1, -1)).p4(elementsCount);
          }
          tmp.c1a_1 = tmp_0;
          this.d1a_1 = Companion_getInstance().z19_1;
        } else {
          this.c1a_1 = new (Long())(0, 0);
          this.d1a_1 = prepareHighMarksArray(this, elementsCount);
        }
      }
      e1a(index) {
        if (index < 64) {
          this.c1a_1 = this.c1a_1.t4((new (Long())(1, 0)).p4(index));
        } else {
          markHigh(this, index);
        }
      }
      f1a() {
        var elementsCount = this.a1a_1.z11();
        while (!this.c1a_1.equals(new (Long())(-1, -1))) {
          var index = countTrailingZeroBits(this.c1a_1.n4());
          this.c1a_1 = this.c1a_1.t4((new (Long())(1, 0)).p4(index));
          if (this.b1a_1(this.a1a_1, index)) {
            return index;
          }
        }
        if (elementsCount > 64) {
          return nextUnmarkedHighIndex(this);
        }
        return -1;
      }
    }
    initMetadataForClass($, 'ElementMarker');
    ElementMarkerClass = $;
  }
  return ElementMarkerClass;
}
//region block: exports
export {
  ElementMarker as ElementMarker33ojvsajwmzts,
};
//endregion

//# sourceMappingURL=ElementMarker.mjs.map
