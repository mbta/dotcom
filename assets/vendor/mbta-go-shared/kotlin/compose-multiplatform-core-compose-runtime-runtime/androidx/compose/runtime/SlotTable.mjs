import {
  composeImmediateRuntimeError2yqil22w149j8 as composeImmediateRuntimeError,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  composeRuntimeErrorzyuropknqb0d as composeRuntimeError,
} from './Composer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  ConcurrentModificationException3974vl9oonkcj as ConcurrentModificationException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  anyToString3ho3k49fc56mj as anyToString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  throwIllegalArgumentExceptionb4z7xzu5xnb8 as throwIllegalArgumentException,
  throwIllegalStateExceptionhmvlq2knnz6m as throwIllegalStateException,
} from './Preconditions.mjs';
import { MutableIntObjectMap226x6lnccc731 as MutableIntObjectMap } from '../../../../androidx-collection-collection/androidx/collection/IntObjectMap.mjs';
import { HashMap1a0ld5kgwhmhv as HashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/HashMap.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { fill3hcjvebk42tyx as fill } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { countOneBitstd673pwfna0t as countOneBits } from '../../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
import { IntStacky2p17u2t76no as IntStack } from './Stack.mjs';
import { MutableObjectList370jqbf1tk821 as MutableObjectList } from '../../../../androidx-collection-collection/androidx/collection/ObjectList.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import { MutableIntSet2xxoin46kauql as MutableIntSet } from '../../../../androidx-collection-collection/androidx/collection/IntSet.mjs';
import { MutableIntList1ufb3m5010ppd as MutableIntList } from '../../../../androidx-collection-collection/androidx/collection/IntList.mjs';
import { longArray288a0fctlmjmj as longArray } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var EmptyLongArray;
var androidx_compose_runtime_SlotTable$stable;
var androidx_compose_runtime_Anchor$stable;
var androidx_compose_runtime_GroupSourceInformation$stable;
var androidx_compose_runtime_SlotReader$stable;
var androidx_compose_runtime_KeyInfo$stable;
var androidx_compose_runtime_SlotWriter$stable;
var androidx_compose_runtime_BitVector$stable;
function tryAnchor($this, index) {
  // Inline function 'androidx.compose.runtime.runtimeCheck' call
  if (!!$this.h6m_1) {
    var tmp$ret$0 = 'use active SlotWriter to crate an anchor for location instead';
    composeImmediateRuntimeError(tmp$ret$0);
  }
  return (0 <= index ? index < $this.c6m_1 : false) ? find($this.j6m_1, index, $this.c6m_1) : null;
}
var SlotTableClass;
function SlotTable() {
  if (SlotTableClass === VOID) {
    class $ {
      constructor() {
        this.b6m_1 = new Int32Array(0);
        this.c6m_1 = 0;
        var tmp = this;
        var tmp_0 = 0;
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp_1 = Array(0);
        while (tmp_0 < 0) {
          tmp_1[tmp_0] = null;
          tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.d6m_1 = tmp_1;
        this.e6m_1 = 0;
        this.f6m_1 = 0;
        var tmp_2 = this;
        // Inline function 'androidx.compose.runtime.platform.makeSynchronizedObject' call
        tmp_2.g6m_1 = null == null ? new Object() : null;
        this.h6m_1 = false;
        this.i6m_1 = 0;
        var tmp_3 = this;
        // Inline function 'kotlin.collections.arrayListOf' call
        tmp_3.j6m_1 = ArrayList().g1();
        this.k6m_1 = null;
        this.l6m_1 = null;
      }
      a3m() {
        return this.c6m_1 === 0;
      }
      m6m() {
        if (this.h6m_1) {
          // Inline function 'kotlin.error' call
          var message = 'Cannot read while a writer is pending';
          throw IllegalStateException().o5(toString(message));
        }
        this.f6m_1 = this.f6m_1 + 1 | 0;
        return new (SlotReader())(this);
      }
      n6p() {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!!this.h6m_1) {
          var tmp$ret$0 = 'Cannot start a writer when another writer is pending';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.f6m_1 <= 0)) {
          var tmp$ret$2 = 'Cannot start a writer when a reader is pending';
          composeImmediateRuntimeError(tmp$ret$2);
        }
        this.h6m_1 = true;
        this.i6m_1 = this.i6m_1 + 1 | 0;
        return new (SlotWriter())(this);
      }
      j6p(index) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!!this.h6m_1) {
          var tmp$ret$0 = 'use active SlotWriter to create an anchor location instead';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        // Inline function 'androidx.compose.runtime.requirePrecondition' call
        if (!(0 <= index ? index < this.c6m_1 : false)) {
          var tmp$ret$2 = 'Parameter index is out of range';
          throwIllegalArgumentException(tmp$ret$2);
        }
        var tmp0 = this.j6m_1;
        // Inline function 'androidx.compose.runtime.getOrAdd' call
        var effectiveSize = this.c6m_1;
        var location = search(tmp0, index, effectiveSize);
        var tmp;
        if (location < 0) {
          var anchor = new (Anchor())(index);
          tmp0.r3(-(location + 1 | 0) | 0, anchor);
          tmp = anchor;
        } else {
          tmp = tmp0.e1(location);
        }
        return tmp;
      }
      z6s(anchor) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!!this.h6m_1) {
          var tmp$ret$0 = 'Use active SlotWriter to determine anchor location instead';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        // Inline function 'androidx.compose.runtime.requirePrecondition' call
        if (!anchor.s6y()) {
          var tmp$ret$2 = 'Anchor refers to a group that was removed';
          throwIllegalArgumentException(tmp$ret$2);
        }
        return anchor.d6x_1;
      }
      w6y(anchor) {
        var tmp;
        if (anchor.s6y()) {
          // Inline function 'kotlin.let' call
          var it = search(this.j6m_1, anchor.d6x_1, this.c6m_1);
          tmp = (it >= 0 && equals(this.j6m_1.e1(it), anchor));
        } else {
          tmp = false;
        }
        return tmp;
      }
      y70(groupIndex, anchor) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!!this.h6m_1) {
          var tmp$ret$0 = 'Writer is active';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(0 <= groupIndex ? groupIndex < this.c6m_1 : false)) {
          var tmp$ret$2 = 'Invalid group index';
          composeImmediateRuntimeError(tmp$ret$2);
        }
        var tmp;
        if (this.w6y(anchor)) {
          var containsUpper = groupIndex + groupSize(this.b6m_1, groupIndex) | 0;
          var containsArg = anchor.d6x_1;
          tmp = groupIndex <= containsArg ? containsArg < containsUpper : false;
        } else {
          tmp = false;
        }
        return tmp;
      }
      h79(reader, sourceInformationMap) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(reader.m6n_1 === this && this.f6m_1 > 0)) {
          var tmp$ret$0 = 'Unexpected reader close()';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        this.f6m_1 = this.f6m_1 - 1 | 0;
        if (!(sourceInformationMap == null)) {
          // Inline function 'androidx.compose.runtime.platform.synchronized' call
          this.g6m_1;
          var thisMap = this.k6m_1;
          if (!(thisMap == null)) {
            thisMap.v3(sourceInformationMap);
          } else {
            this.k6m_1 = sourceInformationMap;
          }
        }
      }
      i79(writer, groups, groupsSize, slots, slotsSize, anchors, sourceInformationMap, calledByMap) {
        // Inline function 'androidx.compose.runtime.requirePrecondition' call
        if (!(writer.e6o_1 === this && this.h6m_1)) {
          var tmp$ret$0 = 'Unexpected writer close()';
          throwIllegalArgumentException(tmp$ret$0);
        }
        this.h6m_1 = false;
        this.j79(groups, groupsSize, slots, slotsSize, anchors, sourceInformationMap, calledByMap);
      }
      j79(groups, groupsSize, slots, slotsSize, anchors, sourceInformationMap, calledByMap) {
        this.b6m_1 = groups;
        this.c6m_1 = groupsSize;
        this.d6m_1 = slots;
        this.e6m_1 = slotsSize;
        this.j6m_1 = anchors;
        this.k6m_1 = sourceInformationMap;
        this.l6m_1 = calledByMap;
      }
      c6v() {
        var tmp;
        if (this.c6m_1 > 0) {
          // Inline function 'androidx.compose.runtime.containsMark' call
          tmp = !((this.b6m_1[imul(0, 5) + 1 | 0] & 67108864) === 0);
        } else {
          tmp = false;
        }
        return tmp;
      }
      k79(group) {
        var tmp0_safe_receiver = this.k6m_1;
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          var tmp0_safe_receiver_0 = tryAnchor(this, group);
          var tmp_0;
          if (tmp0_safe_receiver_0 == null) {
            tmp_0 = null;
          } else {
            // Inline function 'kotlin.let' call
            tmp_0 = tmp0_safe_receiver.j3(tmp0_safe_receiver_0);
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      q6p() {
        this.l6m_1 = new (MutableIntObjectMap())();
      }
      p6p() {
        this.k6m_1 = HashMap().a9();
      }
      j74(group, slotIndex) {
        var start = slotAnchor(this.b6m_1, group);
        var tmp;
        if ((group + 1 | 0) < this.c6m_1) {
          var tmp0 = this.b6m_1;
          // Inline function 'androidx.compose.runtime.dataAnchor' call
          var address = group + 1 | 0;
          tmp = tmp0[imul(address, 5) + 4 | 0];
        } else {
          tmp = this.d6m_1.length;
        }
        var end = tmp;
        var len = end - start | 0;
        var tmp_0;
        if (0 <= slotIndex ? slotIndex < len : false) {
          return this.d6m_1[start + slotIndex | 0];
        } else {
          tmp_0 = Companion_getInstance().x6p_1;
        }
        return tmp_0;
      }
      x() {
        return new (GroupIterator())(this, 0, this.c6m_1);
      }
    }
    initMetadataForClass($, 'SlotTable', SlotTable);
    SlotTableClass = $;
  }
  return SlotTableClass;
}
function moveGroup($this, fromWriter, fromIndex, toWriter, updateFromCursor, updateToCursor, removeSourceGroup) {
  var groupsToMove = fromWriter.e6r(fromIndex);
  var sourceGroupsEnd = fromIndex + groupsToMove | 0;
  var sourceSlotsStart = dataIndex(fromWriter, fromIndex);
  var sourceSlotsEnd = dataIndex(fromWriter, sourceGroupsEnd);
  var slotsToMove = sourceSlotsEnd - sourceSlotsStart | 0;
  var hasMarks = containsAnyGroupMarks(fromWriter, fromIndex);
  insertGroups(toWriter, groupsToMove);
  insertSlots(toWriter, slotsToMove, toWriter.x6o_1);
  if (fromWriter.k6o_1 < sourceGroupsEnd) {
    moveGroupGapTo(fromWriter, sourceGroupsEnd);
  }
  if (fromWriter.o6o_1 < sourceSlotsEnd) {
    moveSlotGapTo(fromWriter, sourceSlotsEnd, sourceGroupsEnd);
  }
  var groups = toWriter.f6o_1;
  var currentGroup = toWriter.x6o_1;
  var tmp0 = fromWriter.f6o_1;
  var tmp4 = imul(currentGroup, 5);
  var tmp6 = imul(fromIndex, 5);
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = imul(sourceGroupsEnd, 5);
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp, groups, tmp4, tmp6, endIndex);
  var slots = toWriter.g6o_1;
  var currentSlot = toWriter.m6o_1;
  // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
  // Inline function 'kotlin.collections.copyInto' call
  var this_0 = fromWriter.g6o_1;
  arrayCopy(this_0, slots, currentSlot, sourceSlotsStart, sourceSlotsEnd);
  var parent = toWriter.z6o_1;
  // Inline function 'androidx.compose.runtime.updateParentAnchor' call
  groups[imul(currentGroup, 5) + 2 | 0] = parent;
  var parentDelta = currentGroup - fromIndex | 0;
  var moveEnd = currentGroup + groupsToMove | 0;
  // Inline function 'kotlin.with' call
  var dataIndexDelta = currentSlot - dataIndex_0(toWriter, groups, currentGroup) | 0;
  var slotsGapOwner = toWriter.q6o_1;
  var slotsGapLen = toWriter.p6o_1;
  var slotsCapacity = slots.length;
  var inductionVariable = currentGroup;
  if (inductionVariable < moveEnd)
    do {
      var groupAddress = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!(groupAddress === currentGroup)) {
        // Inline function 'androidx.compose.runtime.parentAnchor' call
        var previousParent = groups[imul(groupAddress, 5) + 2 | 0];
        // Inline function 'androidx.compose.runtime.updateParentAnchor' call
        var value = previousParent + parentDelta | 0;
        groups[imul(groupAddress, 5) + 2 | 0] = value;
      }
      // Inline function 'kotlin.with' call
      var newDataIndex = dataIndex_0(toWriter, groups, groupAddress) + dataIndexDelta | 0;
      // Inline function 'kotlin.with' call
      var newDataAnchor = dataIndexToDataAnchor(toWriter, newDataIndex, slotsGapOwner < groupAddress ? 0 : toWriter.o6o_1, slotsGapLen, slotsCapacity);
      // Inline function 'androidx.compose.runtime.updateDataAnchor' call
      groups[imul(groupAddress, 5) + 4 | 0] = newDataAnchor;
      if (groupAddress === slotsGapOwner) {
        slotsGapOwner = slotsGapOwner + 1 | 0;
      }
    }
     while (inductionVariable < moveEnd);
  toWriter.q6o_1 = slotsGapOwner;
  var startAnchors = locationOf(fromWriter.h6o_1, fromIndex, fromWriter.l79());
  var endAnchors = locationOf(fromWriter.h6o_1, sourceGroupsEnd, fromWriter.l79());
  var tmp_0;
  if (startAnchors < endAnchors) {
    var sourceAnchors = fromWriter.h6o_1;
    var anchors = ArrayList().w(endAnchors - startAnchors | 0);
    var anchorDelta = currentGroup - fromIndex | 0;
    var inductionVariable_0 = startAnchors;
    if (inductionVariable_0 < endAnchors)
      do {
        var anchorIndex = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var sourceAnchor = sourceAnchors.e1(anchorIndex);
        sourceAnchor.d6x_1 = sourceAnchor.d6x_1 + anchorDelta | 0;
        anchors.i(sourceAnchor);
      }
       while (inductionVariable_0 < endAnchors);
    var insertLocation = locationOf(toWriter.h6o_1, toWriter.x6o_1, toWriter.l79());
    toWriter.h6o_1.n3(insertLocation, anchors);
    sourceAnchors.g3(startAnchors, endAnchors).p3();
    tmp_0 = anchors;
  } else {
    tmp_0 = emptyList();
  }
  var anchors_0 = tmp_0;
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!anchors_0.h1()) {
    var sourceSourceInformationMap = fromWriter.i6o_1;
    var destinationSourceInformation = toWriter.i6o_1;
    if (!(sourceSourceInformationMap == null) && !(destinationSourceInformation == null)) {
      // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
      var inductionVariable_1 = 0;
      var last = anchors_0.c1() - 1 | 0;
      if (inductionVariable_1 <= last)
        do {
          var index = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          var item = anchors_0.e1(index);
          var information = sourceSourceInformationMap.j3(item);
          if (!(information == null)) {
            sourceSourceInformationMap.u3(item);
            // Inline function 'kotlin.collections.set' call
            destinationSourceInformation.t3(item, information);
          }
        }
         while (inductionVariable_1 <= last);
    }
  }
  var toWriterParent = toWriter.z6o_1;
  var tmp0_safe_receiver = sourceInformationOf(toWriter, parent);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    var predecessor = -1;
    var child = toWriterParent + 1 | 0;
    var endGroup = toWriter.x6o_1;
    while (child < endGroup) {
      predecessor = child;
      child = child + groupSize(toWriter.f6o_1, child) | 0;
    }
    tmp0_safe_receiver.s79(toWriter, predecessor, endGroup);
  }
  var parentGroup = fromWriter.i6p(fromIndex);
  var tmp_1;
  if (!removeSourceGroup) {
    tmp_1 = false;
  } else if (updateFromCursor) {
    var needsStartGroups = parentGroup >= 0;
    if (needsStartGroups) {
      fromWriter.v6p();
      fromWriter.x6y(parentGroup - fromWriter.x6o_1 | 0);
      fromWriter.v6p();
    }
    fromWriter.x6y(fromIndex - fromWriter.x6o_1 | 0);
    var anchorsRemoved = fromWriter.u6y();
    if (needsStartGroups) {
      fromWriter.o6p();
      fromWriter.s6r();
      fromWriter.o6p();
      fromWriter.s6r();
    }
    tmp_1 = anchorsRemoved;
  } else {
    var anchorsRemoved_0 = removeGroups(fromWriter, fromIndex, groupsToMove);
    removeSlots(fromWriter, sourceSlotsStart, slotsToMove, fromIndex - 1 | 0);
    tmp_1 = anchorsRemoved_0;
  }
  var anchorsRemoved_1 = tmp_1;
  // Inline function 'androidx.compose.runtime.runtimeCheck' call
  if (!!anchorsRemoved_1) {
    var tmp$ret$23 = 'Unexpectedly removed anchors';
    composeImmediateRuntimeError(tmp$ret$23);
  }
  var tmp_2 = toWriter;
  var tmp_3 = toWriter.s6o_1;
  var tmp_4;
  // Inline function 'androidx.compose.runtime.isNode' call
  if (!((groups[imul(currentGroup, 5) + 1 | 0] & 1073741824) === 0)) {
    tmp_4 = 1;
  } else {
    // Inline function 'androidx.compose.runtime.nodeCount' call
    tmp_4 = groups[imul(currentGroup, 5) + 1 | 0] & 67108863;
  }
  tmp_2.s6o_1 = tmp_3 + tmp_4 | 0;
  if (updateToCursor) {
    toWriter.x6o_1 = currentGroup + groupsToMove | 0;
    toWriter.m6o_1 = currentSlot + slotsToMove | 0;
  }
  if (hasMarks) {
    updateContainsMark(toWriter, parent);
  }
  return anchors_0;
}
function moveGroup$default($this, fromWriter, fromIndex, toWriter, updateFromCursor, updateToCursor, removeSourceGroup, $super) {
  removeSourceGroup = removeSourceGroup === VOID ? true : removeSourceGroup;
  return moveGroup($this, fromWriter, fromIndex, toWriter, updateFromCursor, updateToCursor, removeSourceGroup);
}
function rawUpdate($this, value) {
  var result = $this.t79();
  $this.u79(value);
  return result;
}
function groupSourceInformationFor($this, parent, sourceInformation) {
  var tmp0_safe_receiver = $this.i6o_1;
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.collections.getOrPut' call
    var key = $this.j6p(parent);
    var value = tmp0_safe_receiver.j3(key);
    var tmp_0;
    if (value == null) {
      var result = new (GroupSourceInformation())(0, sourceInformation, 0);
      if (sourceInformation == null) {
        var child = parent + 1 | 0;
        var end = $this.x6o_1;
        while (child < end) {
          result.v79($this, child);
          child = child + groupSize($this.f6o_1, child) | 0;
        }
      }
      var answer = result;
      tmp0_safe_receiver.t3(key, answer);
      tmp_0 = answer;
    } else {
      tmp_0 = value;
    }
    tmp = tmp_0;
  }
  return tmp;
}
function _get_currentGroupSlotIndex__p1glxf($this) {
  var tmp = $this.m6o_1 - $this.w79($this.z6o_1) | 0;
  var tmp0_safe_receiver = $this.w6o_1;
  var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.e1($this.z6o_1);
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.c1();
  return tmp + (tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs) | 0;
}
function startGroup($this, key, objectKey, isNode, aux) {
  var previousParent = $this.z6o_1;
  var inserting = $this.r6o_1 > 0;
  $this.v6o_1.r6m($this.s6o_1);
  var tmp = $this;
  var tmp_0;
  if (inserting) {
    var current = $this.x6o_1;
    var newCurrentSlot = dataIndex_0($this, $this.f6o_1, groupIndexToAddress($this, current));
    insertGroups($this, 1);
    $this.m6o_1 = newCurrentSlot;
    $this.n6o_1 = newCurrentSlot;
    var currentAddress = groupIndexToAddress($this, current);
    var hasObjectKey = !(objectKey === Companion_getInstance().x6p_1);
    var hasAux = !isNode && !(aux === Companion_getInstance().x6p_1);
    var tmp0_gapLen = $this.p6o_1;
    var tmp1_gapStart = $this.o6o_1;
    var tmp2_capacity = $this.g6o_1.length;
    // Inline function 'kotlin.let' call
    var anchor = dataIndexToDataAnchor($this, newCurrentSlot, tmp1_gapStart, tmp0_gapLen, tmp2_capacity);
    var tmp_1;
    if (anchor >= 0 && $this.q6o_1 < current) {
      var slotsSize = $this.g6o_1.length - $this.p6o_1 | 0;
      tmp_1 = -((slotsSize - anchor | 0) + 1 | 0) | 0;
    } else {
      tmp_1 = anchor;
    }
    var dataAnchor = tmp_1;
    initGroup($this.f6o_1, currentAddress, key, isNode, hasObjectKey, hasAux, $this.z6o_1, dataAnchor);
    var dataSlotsNeeded = ((isNode ? 1 : 0) + (hasObjectKey ? 1 : 0) | 0) + (hasAux ? 1 : 0) | 0;
    if (dataSlotsNeeded > 0) {
      insertSlots($this, dataSlotsNeeded, current);
      var slots = $this.g6o_1;
      var currentSlot = $this.m6o_1;
      if (isNode) {
        var _unary__edvuaz = currentSlot;
        currentSlot = _unary__edvuaz + 1 | 0;
        slots[_unary__edvuaz] = aux;
      }
      if (hasObjectKey) {
        var _unary__edvuaz_0 = currentSlot;
        currentSlot = _unary__edvuaz_0 + 1 | 0;
        slots[_unary__edvuaz_0] = objectKey;
      }
      if (hasAux) {
        var _unary__edvuaz_1 = currentSlot;
        currentSlot = _unary__edvuaz_1 + 1 | 0;
        slots[_unary__edvuaz_1] = aux;
      }
      $this.m6o_1 = currentSlot;
    }
    $this.s6o_1 = 0;
    var newCurrent = current + 1 | 0;
    $this.z6o_1 = current;
    $this.x6o_1 = newCurrent;
    if (previousParent >= 0) {
      var tmp3_safe_receiver = sourceInformationOf($this, previousParent);
      if (tmp3_safe_receiver == null)
        null;
      else {
        tmp3_safe_receiver.v79($this, current);
      }
    }
    tmp_0 = newCurrent;
  } else {
    $this.t6o_1.r6m(previousParent);
    saveCurrentGroupEnd($this);
    var currentGroup = $this.x6o_1;
    var currentGroupAddress = groupIndexToAddress($this, currentGroup);
    if (!equals(aux, Companion_getInstance().x6p_1)) {
      if (isNode) {
        $this.y79(aux);
      } else {
        $this.x79(aux);
      }
    }
    $this.m6o_1 = slotIndex($this, $this.f6o_1, currentGroupAddress);
    $this.n6o_1 = dataIndex_0($this, $this.f6o_1, groupIndexToAddress($this, $this.x6o_1 + 1 | 0));
    var tmp_2 = $this;
    // Inline function 'androidx.compose.runtime.nodeCount' call
    tmp_2.s6o_1 = $this.f6o_1[imul(currentGroupAddress, 5) + 1 | 0] & 67108863;
    $this.z6o_1 = currentGroup;
    $this.x6o_1 = currentGroup + 1 | 0;
    tmp_0 = currentGroup + groupSize($this.f6o_1, currentGroupAddress) | 0;
  }
  tmp.y6o_1 = tmp_0;
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
function Companion_getInstance_0() {
  return Companion_instance;
}
function containsGroupMark($this, group) {
  var tmp;
  if (group >= 0) {
    var tmp0 = $this.f6o_1;
    // Inline function 'androidx.compose.runtime.containsMark' call
    var address = groupIndexToAddress($this, group);
    tmp = !((tmp0[imul(address, 5) + 1 | 0] & 67108864) === 0);
  } else {
    tmp = false;
  }
  return tmp;
}
function containsAnyGroupMarks($this, group) {
  var tmp;
  if (group >= 0) {
    var tmp0 = $this.f6o_1;
    // Inline function 'androidx.compose.runtime.containsAnyMark' call
    var address = groupIndexToAddress($this, group);
    tmp = !((tmp0[imul(address, 5) + 1 | 0] & 201326592) === 0);
  } else {
    tmp = false;
  }
  return tmp;
}
function recalculateMarks($this) {
  var tmp0_safe_receiver = $this.b6p_1;
  var tmp = tmp0_safe_receiver;
  if ((tmp == null ? null : new (PrioritySet())(tmp)) == null)
    null;
  else {
    var tmp_0 = tmp0_safe_receiver;
    // Inline function 'kotlin.let' call
    var set = (tmp_0 == null ? null : new (PrioritySet())(tmp_0)).z79_1;
    while (PrioritySet__isNotEmpty_impl_q82m5n(set)) {
      updateContainsMarkNow($this, PrioritySet__takeMax_impl_e5irrm(set), set);
    }
  }
}
function updateContainsMark($this, group) {
  if (group >= 0) {
    var tmp0_elvis_lhs = $this.b6p_1;
    var tmp;
    var tmp_0 = tmp0_elvis_lhs;
    if ((tmp_0 == null ? null : new (PrioritySet())(tmp_0)) == null) {
      // Inline function 'kotlin.also' call
      var this_0 = new (PrioritySet())(_PrioritySet___init__impl__yrk5ut());
      $this.b6p_1 = this_0.z79_1;
      tmp = this_0.z79_1;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    PrioritySet__add_impl_enzb2u(tmp, group);
  }
}
function updateContainsMarkNow($this, group, set) {
  var groupAddress = groupIndexToAddress($this, group);
  var containsAnyMarks = childContainsAnyMarks($this, group);
  // Inline function 'androidx.compose.runtime.containsMark' call
  var markChanges = !(!(($this.f6o_1[imul(groupAddress, 5) + 1 | 0] & 67108864) === 0) === containsAnyMarks);
  if (markChanges) {
    updateContainsMark_0($this.f6o_1, groupAddress, containsAnyMarks);
    var parent = $this.i6p(group);
    if (parent >= 0) {
      PrioritySet__add_impl_enzb2u(set, parent);
    }
  }
}
function childContainsAnyMarks($this, group) {
  var child = group + 1 | 0;
  var end = group + $this.e6r(group) | 0;
  while (child < end) {
    var tmp0 = $this.f6o_1;
    // Inline function 'androidx.compose.runtime.containsAnyMark' call
    var address = groupIndexToAddress($this, child);
    if (!((tmp0[imul(address, 5) + 1 | 0] & 201326592) === 0))
      return true;
    child = child + $this.e6r(child) | 0;
  }
  return false;
}
function saveCurrentGroupEnd($this) {
  $this.u6o_1.r6m((_get_capacity__a9k9f3($this) - $this.l6o_1 | 0) - $this.y6o_1 | 0);
}
function restoreCurrentGroupEnd($this) {
  var newGroupEnd = (_get_capacity__a9k9f3($this) - $this.l6o_1 | 0) - $this.u6o_1.b6o() | 0;
  $this.y6o_1 = newGroupEnd;
  return newGroupEnd;
}
function fixParentAnchorsFor($this, parent, endGroup, firstChild) {
  var parentAnchor = parentIndexToAnchor($this, parent, $this.k6o_1);
  var child = firstChild;
  while (child < endGroup) {
    var tmp0 = $this.f6o_1;
    // Inline function 'androidx.compose.runtime.updateParentAnchor' call
    var address = groupIndexToAddress($this, child);
    tmp0[imul(address, 5) + 2 | 0] = parentAnchor;
    var childEnd = child + groupSize($this.f6o_1, groupIndexToAddress($this, child)) | 0;
    fixParentAnchorsFor($this, child, childEnd, child + 1 | 0);
    child = childEnd;
  }
}
function moveGroupGapTo($this, index) {
  var gapLen = $this.l6o_1;
  var gapStart = $this.k6o_1;
  if (!(gapStart === index)) {
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!$this.h6o_1.h1()) {
      updateAnchors($this, gapStart, index);
    }
    if (gapLen > 0) {
      var groups = $this.f6o_1;
      var groupPhysicalAddress = imul(index, 5);
      var groupPhysicalGapLen = imul(gapLen, 5);
      var groupPhysicalGapStart = imul(gapStart, 5);
      if (index < gapStart) {
        // Inline function 'kotlin.collections.copyInto' call
        var destinationOffset = groupPhysicalAddress + groupPhysicalGapLen | 0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp = groups;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        arrayCopy(tmp, groups, destinationOffset, groupPhysicalAddress, groupPhysicalGapStart);
      } else {
        var tmp6 = groupPhysicalGapStart + groupPhysicalGapLen | 0;
        // Inline function 'kotlin.collections.copyInto' call
        var endIndex = groupPhysicalAddress + groupPhysicalGapLen | 0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp_0 = groups;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        arrayCopy(tmp_0, groups, groupPhysicalGapStart, tmp6, endIndex);
      }
    }
    var groupAddress = index < gapStart ? index + gapLen | 0 : gapStart;
    var capacity = _get_capacity__a9k9f3($this);
    // Inline function 'androidx.compose.runtime.runtimeCheck' call
    // Inline function 'androidx.compose.runtime.runtimeCheck' call
    if (!(groupAddress < capacity)) {
      var tmp$ret$11 = 'Check failed';
      composeImmediateRuntimeError(tmp$ret$11);
    }
    while (groupAddress < capacity) {
      var tmp0 = $this.f6o_1;
      // Inline function 'androidx.compose.runtime.parentAnchor' call
      var address = groupAddress;
      var oldAnchor = tmp0[imul(address, 5) + 2 | 0];
      var oldIndex = parentAnchorToIndex($this, oldAnchor);
      var newAnchor = parentIndexToAnchor($this, oldIndex, index);
      if (!(newAnchor === oldAnchor)) {
        var tmp0_0 = $this.f6o_1;
        // Inline function 'androidx.compose.runtime.updateParentAnchor' call
        var address_0 = groupAddress;
        tmp0_0[imul(address_0, 5) + 2 | 0] = newAnchor;
      }
      groupAddress = groupAddress + 1 | 0;
      if (groupAddress === index)
        groupAddress = groupAddress + gapLen | 0;
    }
  }
  $this.k6o_1 = index;
}
function moveSlotGapTo($this, index, group) {
  var gapLen = $this.p6o_1;
  var gapStart = $this.o6o_1;
  var slotsGapOwner = $this.q6o_1;
  if (!(gapStart === index)) {
    var slots = $this.g6o_1;
    if (index < gapStart) {
      // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
      // Inline function 'kotlin.collections.copyInto' call
      var destinationOffset = index + gapLen | 0;
      arrayCopy(slots, slots, destinationOffset, index, gapStart);
    } else {
      var tmp6 = gapStart + gapLen | 0;
      // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = index + gapLen | 0;
      arrayCopy(slots, slots, gapStart, tmp6, endIndex);
    }
  }
  var tmp0 = group + 1 | 0;
  // Inline function 'kotlin.math.min' call
  var b = $this.l79();
  var newSlotsGapOwner = Math.min(tmp0, b);
  if (!(slotsGapOwner === newSlotsGapOwner)) {
    var slotsSize = $this.g6o_1.length - gapLen | 0;
    if (newSlotsGapOwner < slotsGapOwner) {
      var updateAddress = groupIndexToAddress($this, newSlotsGapOwner);
      var stopUpdateAddress = groupIndexToAddress($this, slotsGapOwner);
      var groupGapStart = $this.k6o_1;
      while (updateAddress < stopUpdateAddress) {
        var tmp0_0 = $this.f6o_1;
        // Inline function 'androidx.compose.runtime.dataAnchor' call
        var address = updateAddress;
        var anchor = tmp0_0[imul(address, 5) + 4 | 0];
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(anchor >= 0)) {
          var tmp$ret$6 = 'Unexpected anchor value, expected a positive anchor';
          composeImmediateRuntimeError(tmp$ret$6);
        }
        var tmp0_1 = $this.f6o_1;
        var tmp2 = updateAddress;
        // Inline function 'androidx.compose.runtime.updateDataAnchor' call
        var anchor_0 = -((slotsSize - anchor | 0) + 1 | 0) | 0;
        tmp0_1[imul(tmp2, 5) + 4 | 0] = anchor_0;
        updateAddress = updateAddress + 1 | 0;
        if (updateAddress === groupGapStart)
          updateAddress = updateAddress + $this.l6o_1 | 0;
      }
    } else {
      var updateAddress_0 = groupIndexToAddress($this, slotsGapOwner);
      var stopUpdateAddress_0 = groupIndexToAddress($this, newSlotsGapOwner);
      while (updateAddress_0 < stopUpdateAddress_0) {
        var tmp0_2 = $this.f6o_1;
        // Inline function 'androidx.compose.runtime.dataAnchor' call
        var address_0 = updateAddress_0;
        var anchor_1 = tmp0_2[imul(address_0, 5) + 4 | 0];
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(anchor_1 < 0)) {
          var tmp$ret$10 = 'Unexpected anchor value, expected a negative anchor';
          composeImmediateRuntimeError(tmp$ret$10);
        }
        var tmp0_3 = $this.f6o_1;
        var tmp2_0 = updateAddress_0;
        // Inline function 'androidx.compose.runtime.updateDataAnchor' call
        var anchor_2 = (slotsSize + anchor_1 | 0) + 1 | 0;
        tmp0_3[imul(tmp2_0, 5) + 4 | 0] = anchor_2;
        updateAddress_0 = updateAddress_0 + 1 | 0;
        if (updateAddress_0 === $this.k6o_1)
          updateAddress_0 = updateAddress_0 + $this.l6o_1 | 0;
      }
    }
    $this.q6o_1 = newSlotsGapOwner;
  }
  $this.o6o_1 = index;
}
function clearSlotGap($this) {
  var slotsGapStart = $this.o6o_1;
  var slotsGapEnd = slotsGapStart + $this.p6o_1 | 0;
  fill($this.g6o_1, null, slotsGapStart, slotsGapEnd);
}
function insertGroups($this, size) {
  if (size > 0) {
    var currentGroup = $this.x6o_1;
    moveGroupGapTo($this, currentGroup);
    var gapStart = $this.k6o_1;
    var gapLen = $this.l6o_1;
    var oldCapacity = $this.f6o_1.length / 5 | 0;
    var oldSize = oldCapacity - gapLen | 0;
    if (gapLen < size) {
      var groups = $this.f6o_1;
      var tmp0 = imul(oldCapacity, 2);
      // Inline function 'kotlin.math.max' call
      var b = oldSize + size | 0;
      // Inline function 'kotlin.math.max' call
      var a = Math.max(tmp0, b);
      var newCapacity = Math.max(a, 32);
      var newGroups = new Int32Array(imul(newCapacity, 5));
      var newGapLen = newCapacity - oldSize | 0;
      var oldGapEndAddress = gapStart + gapLen | 0;
      var newGapEndAddress = gapStart + newGapLen | 0;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = imul(gapStart, 5);
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = groups;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp, newGroups, 0, 0, endIndex);
      var tmp4 = imul(newGapEndAddress, 5);
      var tmp6 = imul(oldGapEndAddress, 5);
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex_0 = imul(oldCapacity, 5);
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp_0 = groups;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp_0, newGroups, tmp4, tmp6, endIndex_0);
      $this.f6o_1 = newGroups;
      gapLen = newGapLen;
    }
    var currentEnd = $this.y6o_1;
    if (currentEnd >= gapStart)
      $this.y6o_1 = currentEnd + size | 0;
    $this.k6o_1 = gapStart + size | 0;
    $this.l6o_1 = gapLen - size | 0;
    var index = oldSize > 0 ? dataIndex($this, currentGroup + size | 0) : 0;
    var anchor = dataIndexToDataAnchor($this, index, $this.q6o_1 < gapStart ? 0 : $this.o6o_1, $this.p6o_1, $this.g6o_1.length);
    var inductionVariable = gapStart;
    var last = gapStart + size | 0;
    if (inductionVariable < last)
      do {
        var groupAddress = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.compose.runtime.updateDataAnchor' call
        $this.f6o_1[imul(groupAddress, 5) + 4 | 0] = anchor;
      }
       while (inductionVariable < last);
    var slotsGapOwner = $this.q6o_1;
    if (slotsGapOwner >= gapStart) {
      $this.q6o_1 = slotsGapOwner + size | 0;
    }
  }
}
function insertSlots($this, size, group) {
  if (size > 0) {
    moveSlotGapTo($this, $this.m6o_1, group);
    var gapStart = $this.o6o_1;
    var gapLen = $this.p6o_1;
    if (gapLen < size) {
      var slots = $this.g6o_1;
      var oldCapacity = slots.length;
      var oldSize = oldCapacity - gapLen | 0;
      var tmp0 = imul(oldCapacity, 2);
      // Inline function 'kotlin.math.max' call
      var b = oldSize + size | 0;
      // Inline function 'kotlin.math.max' call
      var a = Math.max(tmp0, b);
      var newCapacity = Math.max(a, 32);
      var tmp = 0;
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_0 = Array(newCapacity);
      while (tmp < newCapacity) {
        tmp_0[tmp] = null;
        tmp = tmp + 1 | 0;
      }
      var newData = tmp_0;
      var newGapLen = newCapacity - oldSize | 0;
      var oldGapEndAddress = gapStart + gapLen | 0;
      var newGapEndAddress = gapStart + newGapLen | 0;
      // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
      // Inline function 'kotlin.collections.copyInto' call
      arrayCopy(slots, newData, 0, 0, gapStart);
      // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
      // Inline function 'kotlin.collections.copyInto' call
      arrayCopy(slots, newData, newGapEndAddress, oldGapEndAddress, oldCapacity);
      $this.g6o_1 = newData;
      gapLen = newGapLen;
    }
    var currentDataEnd = $this.n6o_1;
    if (currentDataEnd >= gapStart)
      $this.n6o_1 = currentDataEnd + size | 0;
    $this.o6o_1 = gapStart + size | 0;
    $this.p6o_1 = gapLen - size | 0;
  }
}
function removeGroups($this, start, len) {
  var tmp;
  if (len > 0) {
    var anchorsRemoved = false;
    var anchors = $this.h6o_1;
    moveGroupGapTo($this, start);
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!anchors.h1()) {
      anchorsRemoved = removeAnchors($this, start, len, $this.i6o_1);
    }
    $this.k6o_1 = start;
    var previousGapLen = $this.l6o_1;
    var newGapLen = previousGapLen + len | 0;
    $this.l6o_1 = newGapLen;
    var slotsGapOwner = $this.q6o_1;
    if (slotsGapOwner > start) {
      var tmp_0 = $this;
      // Inline function 'kotlin.math.max' call
      var b = slotsGapOwner - len | 0;
      tmp_0.q6o_1 = Math.max(start, b);
    }
    if ($this.y6o_1 >= $this.k6o_1)
      $this.y6o_1 = $this.y6o_1 - len | 0;
    var parent = $this.z6o_1;
    if (containsGroupMark($this, parent)) {
      updateContainsMark($this, parent);
    }
    tmp = anchorsRemoved;
  } else {
    tmp = false;
  }
  return tmp;
}
function sourceInformationOf($this, group) {
  var tmp0_safe_receiver = $this.i6o_1;
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    var tmp0_safe_receiver_0 = $this.a7a(group);
    var tmp_0;
    if (tmp0_safe_receiver_0 == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_0 = tmp0_safe_receiver.j3(tmp0_safe_receiver_0);
    }
    tmp = tmp_0;
  }
  return tmp;
}
function removeSlots($this, start, len, group) {
  if (len > 0) {
    var gapLen = $this.p6o_1;
    var removeEnd = start + len | 0;
    moveSlotGapTo($this, removeEnd, group);
    $this.o6o_1 = start;
    $this.p6o_1 = gapLen + len | 0;
    fill($this.g6o_1, null, start, start + len | 0);
    var currentDataEnd = $this.n6o_1;
    if (currentDataEnd >= start)
      $this.n6o_1 = currentDataEnd - len | 0;
  }
}
function updateNodeOfGroup($this, index, value) {
  var address = groupIndexToAddress($this, index);
  var tmp;
  if (address < $this.f6o_1.length) {
    // Inline function 'androidx.compose.runtime.isNode' call
    tmp = !(($this.f6o_1[imul(address, 5) + 1 | 0] & 1073741824) === 0);
  } else {
    tmp = false;
  }
  // Inline function 'androidx.compose.runtime.runtimeCheck' call
  if (!tmp) {
    var tmp$ret$1 = 'Updating the node of a group at ' + index + ' that was not created with as a node group';
    composeImmediateRuntimeError(tmp$ret$1);
  }
  $this.g6o_1[dataIndexToDataAddress($this, nodeIndex($this, $this.f6o_1, address))] = value;
}
function updateAnchors($this, previousGapStart, newGapStart) {
  var gapLen = $this.l6o_1;
  var size = _get_capacity__a9k9f3($this) - gapLen | 0;
  if (previousGapStart < newGapStart) {
    var index = locationOf($this.h6o_1, previousGapStart, size);
    $l$loop_0: while (index < $this.h6o_1.c1()) {
      var anchor = $this.h6o_1.e1(index);
      var location = anchor.d6x_1;
      if (location < 0) {
        var newLocation = size + location | 0;
        if (newLocation < newGapStart) {
          anchor.d6x_1 = size + location | 0;
          index = index + 1 | 0;
        } else
          break $l$loop_0;
      } else
        break $l$loop_0;
    }
  } else {
    var index_0 = locationOf($this.h6o_1, newGapStart, size);
    $l$loop_1: while (index_0 < $this.h6o_1.c1()) {
      var anchor_0 = $this.h6o_1.e1(index_0);
      var location_0 = anchor_0.d6x_1;
      if (location_0 >= 0) {
        anchor_0.d6x_1 = -(size - location_0 | 0) | 0;
        index_0 = index_0 + 1 | 0;
      } else
        break $l$loop_1;
    }
  }
}
function removeAnchors($this, gapStart, size, sourceInformationMap) {
  var gapLen = $this.l6o_1;
  var removeEnd = gapStart + size | 0;
  var groupsSize = _get_capacity__a9k9f3($this) - gapLen | 0;
  // Inline function 'kotlin.let' call
  var it = locationOf($this.h6o_1, gapStart + size | 0, groupsSize);
  var index = it >= $this.h6o_1.c1() ? it - 1 | 0 : it;
  var removeAnchorEnd = 0;
  var removeAnchorStart = index + 1 | 0;
  $l$loop: while (index >= 0) {
    var anchor = $this.h6o_1.e1(index);
    var location = $this.z6s(anchor);
    if (location >= gapStart) {
      if (location < removeEnd) {
        anchor.d6x_1 = -2147483648;
        if (sourceInformationMap == null)
          null;
        else
          sourceInformationMap.u3(anchor);
        removeAnchorStart = index;
        if (removeAnchorEnd === 0)
          removeAnchorEnd = index + 1 | 0;
      }
      index = index - 1 | 0;
    } else
      break $l$loop;
  }
  // Inline function 'kotlin.also' call
  var this_0 = removeAnchorStart < removeAnchorEnd;
  if (this_0) {
    $this.h6o_1.g3(removeAnchorStart, removeAnchorEnd).p3();
  }
  return this_0;
}
function moveAnchors($this, originalLocation, newLocation, size) {
  var end = originalLocation + size | 0;
  var groupsSize = $this.l79();
  var index = locationOf($this.h6o_1, originalLocation, groupsSize);
  // Inline function 'kotlin.collections.mutableListOf' call
  var removedAnchors = ArrayList().g1();
  if (index >= 0) {
    $l$loop: while (index < $this.h6o_1.c1()) {
      var anchor = $this.h6o_1.e1(index);
      var location = $this.z6s(anchor);
      if (location >= originalLocation && location < end) {
        removedAnchors.i(anchor);
        $this.h6o_1.s3(index);
      } else
        break $l$loop;
    }
  }
  var moveDelta = newLocation - originalLocation | 0;
  // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
  var inductionVariable = 0;
  var last = removedAnchors.c1() - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index_0 = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var item = removedAnchors.e1(index_0);
      var anchorIndex = $this.z6s(item);
      var newAnchorIndex = anchorIndex + moveDelta | 0;
      if (newAnchorIndex >= $this.k6o_1) {
        item.d6x_1 = -(groupsSize - newAnchorIndex | 0) | 0;
      } else {
        item.d6x_1 = newAnchorIndex;
      }
      var insertIndex = locationOf($this.h6o_1, newAnchorIndex, groupsSize);
      $this.h6o_1.r3(insertIndex, item);
    }
     while (inductionVariable <= last);
}
function _get_capacity__a9k9f3($this) {
  return $this.f6o_1.length / 5 | 0;
}
function groupIndexToAddress($this, index) {
  return index + imul($this.l6o_1, index < $this.k6o_1 ? 0 : 1) | 0;
}
function dataIndexToDataAddress($this, dataIndex) {
  return dataIndex + imul($this.p6o_1, dataIndex < $this.o6o_1 ? 0 : 1) | 0;
}
function parent($this, _this__u8e3s4, index) {
  // Inline function 'androidx.compose.runtime.parentAnchor' call
  var address = groupIndexToAddress($this, index);
  var tmp$ret$0 = _this__u8e3s4[imul(address, 5) + 2 | 0];
  return parentAnchorToIndex($this, tmp$ret$0);
}
function dataIndex($this, index) {
  return dataIndex_0($this, $this.f6o_1, groupIndexToAddress($this, index));
}
function dataIndex_0($this, _this__u8e3s4, address) {
  var tmp;
  if (address >= _get_capacity__a9k9f3($this)) {
    tmp = $this.g6o_1.length - $this.p6o_1 | 0;
  } else {
    // Inline function 'androidx.compose.runtime.dataAnchor' call
    var tmp$ret$0 = _this__u8e3s4[imul(address, 5) + 4 | 0];
    tmp = dataAnchorToDataIndex($this, tmp$ret$0, $this.p6o_1, $this.g6o_1.length);
  }
  return tmp;
}
function slotIndex($this, _this__u8e3s4, address) {
  return address >= _get_capacity__a9k9f3($this) ? $this.g6o_1.length - $this.p6o_1 | 0 : dataAnchorToDataIndex($this, slotAnchor(_this__u8e3s4, address), $this.p6o_1, $this.g6o_1.length);
}
function updateDataIndex($this, _this__u8e3s4, address, dataIndex) {
  // Inline function 'androidx.compose.runtime.updateDataAnchor' call
  var anchor = dataIndexToDataAnchor($this, dataIndex, $this.o6o_1, $this.p6o_1, $this.g6o_1.length);
  _this__u8e3s4[imul(address, 5) + 4 | 0] = anchor;
}
function nodeIndex($this, _this__u8e3s4, address) {
  return dataIndex_0($this, _this__u8e3s4, address);
}
function auxIndex($this, _this__u8e3s4, address) {
  var tmp = dataIndex_0($this, _this__u8e3s4, address);
  // Inline function 'androidx.compose.runtime.groupInfo' call
  // Inline function 'androidx.compose.runtime.countOneBits' call
  var value = _this__u8e3s4[imul(address, 5) + 1 | 0] >> 29;
  return tmp + countOneBits(value) | 0;
}
function dataIndexToDataAnchor($this, index, gapStart, gapLen, capacity) {
  return index > gapStart ? -(((capacity - gapLen | 0) - index | 0) + 1 | 0) | 0 : index;
}
function dataAnchorToDataIndex($this, anchor, gapLen, capacity) {
  return anchor < 0 ? ((capacity - gapLen | 0) + anchor | 0) + 1 | 0 : anchor;
}
function parentIndexToAnchor($this, index, gapStart) {
  return index < gapStart ? index : -(($this.l79() - index | 0) - -2 | 0) | 0;
}
function parentAnchorToIndex($this, index) {
  return index > -2 ? index : ($this.l79() + index | 0) - -2 | 0;
}
function access$_get_groups__7d4n3r($this) {
  return $this.f6o_1;
}
function access$_get_slots__7x4q9w($this) {
  return $this.g6o_1;
}
function access$groupIndexToAddress($this, index) {
  return groupIndexToAddress($this, index);
}
function access$dataIndexToDataAddress($this, dataIndex) {
  return dataIndexToDataAddress($this, dataIndex);
}
function access$dataIndex($this, $receiver, address) {
  return dataIndex_0($this, $receiver, address);
}
var SlotWriterClass;
function SlotWriter() {
  if (SlotWriterClass === VOID) {
    class $ {
      constructor(table) {
        this.e6o_1 = table;
        this.f6o_1 = this.e6o_1.b6m_1;
        this.g6o_1 = this.e6o_1.d6m_1;
        this.h6o_1 = this.e6o_1.j6m_1;
        this.i6o_1 = this.e6o_1.k6m_1;
        this.j6o_1 = this.e6o_1.l6m_1;
        this.k6o_1 = this.e6o_1.c6m_1;
        this.l6o_1 = (this.f6o_1.length / 5 | 0) - this.e6o_1.c6m_1 | 0;
        this.m6o_1 = 0;
        this.n6o_1 = 0;
        this.o6o_1 = this.e6o_1.e6m_1;
        this.p6o_1 = this.g6o_1.length - this.e6o_1.e6m_1 | 0;
        this.q6o_1 = this.e6o_1.c6m_1;
        this.r6o_1 = 0;
        this.s6o_1 = 0;
        this.t6o_1 = new (IntStack())();
        this.u6o_1 = new (IntStack())();
        this.v6o_1 = new (IntStack())();
        this.w6o_1 = null;
        this.x6o_1 = 0;
        this.y6o_1 = this.e6o_1.c6m_1;
        this.z6o_1 = -1;
        this.a6p_1 = false;
        this.b6p_1 = null;
      }
      m6r() {
        return this.x6o_1 === this.y6o_1;
      }
      p6y() {
        return this.g6o_1.length - this.p6o_1 | 0;
      }
      f6x() {
        var tmp;
        if (this.x6o_1 < this.y6o_1) {
          var tmp0 = this.f6o_1;
          // Inline function 'androidx.compose.runtime.isNode' call
          var address = groupIndexToAddress(this, this.x6o_1);
          tmp = !((tmp0[imul(address, 5) + 1 | 0] & 1073741824) === 0);
        } else {
          tmp = false;
        }
        return tmp;
      }
      b6z() {
        return !(this.i6o_1 == null);
      }
      c6z() {
        return !(this.j6o_1 == null);
      }
      z6r(index) {
        var tmp0 = this.f6o_1;
        // Inline function 'androidx.compose.runtime.isNode' call
        var address = groupIndexToAddress(this, index);
        return !((tmp0[imul(address, 5) + 1 | 0] & 1073741824) === 0);
      }
      a6s(index) {
        var tmp0 = this.f6o_1;
        // Inline function 'androidx.compose.runtime.nodeCount' call
        var address = groupIndexToAddress(this, index);
        return tmp0[imul(address, 5) + 1 | 0] & 67108863;
      }
      l6p(index) {
        var tmp0 = this.f6o_1;
        // Inline function 'androidx.compose.runtime.key' call
        var address = groupIndexToAddress(this, index);
        return tmp0[imul(address, 5)];
      }
      m6p(index) {
        var address = groupIndexToAddress(this, index);
        var tmp;
        // Inline function 'androidx.compose.runtime.hasObjectKey' call
        if (!((this.f6o_1[imul(address, 5) + 1 | 0] & 536870912) === 0)) {
          tmp = this.g6o_1[objectKeyIndex(this.f6o_1, address)];
        } else {
          tmp = null;
        }
        return tmp;
      }
      e6r(index) {
        return groupSize(this.f6o_1, groupIndexToAddress(this, index));
      }
      k6p(index) {
        var address = groupIndexToAddress(this, index);
        var tmp;
        // Inline function 'androidx.compose.runtime.hasAux' call
        if (!((this.f6o_1[imul(address, 5) + 1 | 0] & 268435456) === 0)) {
          tmp = this.g6o_1[auxIndex(this, this.f6o_1, address)];
        } else {
          tmp = Companion_getInstance().x6p_1;
        }
        return tmp;
      }
      b7a(index) {
        return index > this.z6o_1 && index < this.y6o_1 || (this.z6o_1 === 0 && index === 0);
      }
      c7a(index) {
        return this.d7a(index, this.x6o_1);
      }
      d7a(index, group) {
        var tmp;
        if (group === this.z6o_1) {
          tmp = this.y6o_1;
        } else if (group > this.t6o_1.g7a(0)) {
          tmp = group + this.e6r(group) | 0;
        } else {
          var openIndex = this.t6o_1.e7a(group);
          tmp = openIndex < 0 ? group + this.e6r(group) | 0 : (_get_capacity__a9k9f3(this) - this.l6o_1 | 0) - this.u6o_1.f7a(openIndex) | 0;
        }
        var end = tmp;
        return index > group && index < end;
      }
      x6t(index) {
        var address = groupIndexToAddress(this, index);
        var tmp;
        // Inline function 'androidx.compose.runtime.isNode' call
        if (!((this.f6o_1[imul(address, 5) + 1 | 0] & 1073741824) === 0)) {
          tmp = this.g6o_1[dataIndexToDataAddress(this, nodeIndex(this, this.f6o_1, address))];
        } else {
          tmp = null;
        }
        return tmp;
      }
      i6p(index) {
        return parent(this, this.f6o_1, index);
      }
      s6p(normalClose) {
        this.a6p_1 = true;
        var tmp;
        if (normalClose) {
          // Inline function 'androidx.compose.runtime.IntStack.isEmpty' call
          tmp = this.t6o_1.q6m_1 === 0;
        } else {
          tmp = false;
        }
        if (tmp) {
          moveGroupGapTo(this, this.l79());
          moveSlotGapTo(this, this.g6o_1.length - this.p6o_1 | 0, this.k6o_1);
          clearSlotGap(this);
          recalculateMarks(this);
        }
        this.e6o_1.i79(this, this.f6o_1, this.k6o_1, this.g6o_1, this.o6o_1, this.h6o_1, this.i6o_1, this.j6o_1);
      }
      h7a() {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.r6o_1 === 0)) {
          var tmp$ret$0 = 'Cannot reset when inserting';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        recalculateMarks(this);
        this.x6o_1 = 0;
        this.y6o_1 = _get_capacity__a9k9f3(this) - this.l6o_1 | 0;
        this.m6o_1 = 0;
        this.n6o_1 = 0;
        this.s6o_1 = 0;
      }
      y6w(value) {
        if (this.r6o_1 > 0 && !(this.m6o_1 === this.o6o_1)) {
          var tmp0_elvis_lhs = this.w6o_1;
          // Inline function 'kotlin.also' call
          var this_0 = tmp0_elvis_lhs == null ? new (MutableIntObjectMap())() : tmp0_elvis_lhs;
          this.w6o_1 = this_0;
          // Inline function 'androidx.collection.MutableIntObjectMap.getOrPut' call
          var key = this.z6o_1;
          var tmp0_elvis_lhs_0 = this_0.e1(key);
          var tmp;
          if (tmp0_elvis_lhs_0 == null) {
            // Inline function 'kotlin.also' call
            var this_1 = new (MutableObjectList())();
            this_0.p6c(key, this_1);
            tmp = this_1;
          } else {
            tmp = tmp0_elvis_lhs_0;
          }
          var deferred = tmp;
          deferred.i(value);
          return Companion_getInstance().x6p_1;
        }
        return rawUpdate(this, value);
      }
      i7a(anchor, value) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.r6o_1 === 0)) {
          var tmp$ret$0 = 'Can only append a slot if not current inserting';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        var previousCurrentSlot = this.m6o_1;
        var previousCurrentSlotEnd = this.n6o_1;
        var anchorIndex = this.z6s(anchor);
        var slotIndex = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, anchorIndex + 1 | 0));
        this.m6o_1 = slotIndex;
        this.n6o_1 = slotIndex;
        insertSlots(this, 1, anchorIndex);
        if (previousCurrentSlot >= slotIndex) {
          previousCurrentSlot = previousCurrentSlot + 1 | 0;
          previousCurrentSlotEnd = previousCurrentSlotEnd + 1 | 0;
        }
        this.g6o_1[slotIndex] = value;
        this.m6o_1 = previousCurrentSlot;
        this.n6o_1 = previousCurrentSlotEnd;
      }
      j7a(count) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(count > 0)) {
          var tmp$ret$0 = 'Check failed';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        var parent = this.z6o_1;
        var groupSlotStart = slotIndex(this, this.f6o_1, groupIndexToAddress(this, parent));
        var groupSlotEnd = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, parent + 1 | 0));
        var removeStart = groupSlotEnd - count | 0;
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(removeStart >= groupSlotStart)) {
          var tmp$ret$3 = 'Check failed';
          composeImmediateRuntimeError(tmp$ret$3);
        }
        removeSlots(this, removeStart, count, parent);
        var currentSlot = this.m6o_1;
        if (currentSlot >= groupSlotStart) {
          this.m6o_1 = currentSlot - count | 0;
        }
      }
      x79(value) {
        var address = groupIndexToAddress(this, this.x6o_1);
        // Inline function 'androidx.compose.runtime.hasAux' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!!((this.f6o_1[imul(address, 5) + 1 | 0] & 268435456) === 0)) {
          var tmp$ret$1 = 'Updating the data of a group that was not created with a data slot';
          composeImmediateRuntimeError(tmp$ret$1);
        }
        this.g6o_1[dataIndexToDataAddress(this, auxIndex(this, this.f6o_1, address))] = value;
      }
      x6x(sourceInformation) {
        if (this.r6o_1 > 0) {
          groupSourceInformationFor(this, this.z6o_1, sourceInformation);
        }
      }
      z6x(key, value) {
        if (this.r6o_1 > 0) {
          var tmp0_safe_receiver = this.j6o_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            add_0(tmp0_safe_receiver, key, this.l6p(this.z6o_1));
          }
          var tmp1_safe_receiver = groupSourceInformationFor(this, this.z6o_1, null);
          if (tmp1_safe_receiver == null)
            null;
          else {
            tmp1_safe_receiver.k7a(key, value, _get_currentGroupSlotIndex__p1glxf(this));
          }
        }
      }
      b6y() {
        if (this.r6o_1 > 0) {
          var tmp0_safe_receiver = groupSourceInformationFor(this, this.z6o_1, null);
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.l7a(_get_currentGroupSlotIndex__p1glxf(this));
          }
        }
      }
      y79(value) {
        return updateNodeOfGroup(this, this.x6o_1, value);
      }
      u79(value) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.m6o_1 <= this.n6o_1)) {
          var tmp$ret$0 = 'Writing to an invalid slot';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        this.g6o_1[dataIndexToDataAddress(this, this.m6o_1 - 1 | 0)] = value;
      }
      m7a(group, index) {
        var address = groupIndexToAddress(this, group);
        var slotsStart = slotIndex(this, this.f6o_1, address);
        var slotsEnd = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, group + 1 | 0));
        var slotsIndex = slotsStart + index | 0;
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(slotsIndex >= slotsStart && slotsIndex < slotsEnd)) {
          var tmp$ret$0 = 'Write to an invalid slot index ' + index + ' for group ' + group;
          composeImmediateRuntimeError(tmp$ret$0);
        }
        return slotsIndex;
      }
      n7a(group, index, value) {
        var slotsIndex = this.m7a(group, index);
        var slotAddress = dataIndexToDataAddress(this, slotsIndex);
        var result = this.g6o_1[slotAddress];
        this.g6o_1[slotAddress] = value;
        return result;
      }
      t79() {
        if (this.r6o_1 > 0) {
          insertSlots(this, 1, this.z6o_1);
        }
        var tmp = this.g6o_1;
        var _unary__edvuaz = this.m6o_1;
        this.m6o_1 = _unary__edvuaz + 1 | 0;
        return tmp[dataIndexToDataAddress(this, _unary__edvuaz)];
      }
      h74(anchor, index) {
        return this.o7a(this.z6s(anchor), index);
      }
      o7a(groupIndex, index) {
        var address = groupIndexToAddress(this, groupIndex);
        var slotsStart = slotIndex(this, this.f6o_1, address);
        var slotsEnd = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, groupIndex + 1 | 0));
        var slotsIndex = slotsStart + index | 0;
        if (!(slotsStart <= slotsIndex ? slotsIndex < slotsEnd : false)) {
          return Companion_getInstance().x6p_1;
        }
        var slotAddress = dataIndexToDataAddress(this, slotsIndex);
        return this.g6o_1[slotAddress];
      }
      w79(groupIndex) {
        return slotIndex(this, this.f6o_1, groupIndexToAddress(this, groupIndex));
      }
      p7a(groupIndex) {
        return dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, groupIndex + 1 | 0));
      }
      r6y(groupIndex) {
        return dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, groupIndex + this.e6r(groupIndex) | 0));
      }
      x6y(amount) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(amount >= 0)) {
          var tmp$ret$0 = 'Cannot seek backwards';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        // Inline function 'androidx.compose.runtime.checkPrecondition' call
        if (!(this.r6o_1 <= 0)) {
          var tmp$ret$2 = 'Cannot call seek() while inserting';
          throwIllegalStateException(tmp$ret$2);
        }
        if (amount === 0)
          return Unit_instance;
        var index = this.x6o_1 + amount | 0;
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(index >= this.z6o_1 && index <= this.y6o_1)) {
          var tmp$ret$4 = 'Cannot seek outside the current group (' + this.z6o_1 + '-' + this.y6o_1 + ')';
          composeImmediateRuntimeError(tmp$ret$4);
        }
        this.x6o_1 = index;
        var newSlot = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, index));
        this.m6o_1 = newSlot;
        this.n6o_1 = newSlot;
      }
      o6p() {
        var newGroup = this.y6o_1;
        this.x6o_1 = newGroup;
        this.m6o_1 = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, newGroup));
      }
      o6q() {
        var _unary__edvuaz = this.r6o_1;
        this.r6o_1 = _unary__edvuaz + 1 | 0;
        if (_unary__edvuaz === 0) {
          saveCurrentGroupEnd(this);
        }
      }
      t6r() {
        // Inline function 'androidx.compose.runtime.checkPrecondition' call
        if (!(this.r6o_1 > 0)) {
          var tmp$ret$0 = 'Unbalanced begin/end insert';
          throwIllegalStateException(tmp$ret$0);
        }
        this.r6o_1 = this.r6o_1 - 1 | 0;
        if (this.r6o_1 === 0) {
          // Inline function 'androidx.compose.runtime.IntStack.size' call
          var tmp = this.v6o_1.q6m_1;
          // Inline function 'androidx.compose.runtime.IntStack.size' call
          // Inline function 'androidx.compose.runtime.runtimeCheck' call
          if (!(tmp === this.t6o_1.q6m_1)) {
            var tmp$ret$4 = 'startGroup/endGroup mismatch while inserting';
            composeImmediateRuntimeError(tmp$ret$4);
          }
          restoreCurrentGroupEnd(this);
        }
      }
      v6p() {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.r6o_1 === 0)) {
          var tmp$ret$0 = 'Key must be supplied when inserting';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        startGroup(this, 0, Companion_getInstance().x6p_1, false, Companion_getInstance().x6p_1);
      }
      z6p(key, dataKey) {
        return startGroup(this, key, dataKey, false, Companion_getInstance().x6p_1);
      }
      b6q(key, objectKey) {
        return startGroup(this, key, objectKey, true, Companion_getInstance().x6p_1);
      }
      a6q(key, objectKey, aux) {
        return startGroup(this, key, objectKey, false, aux);
      }
      s6r() {
        var inserting = this.r6o_1 > 0;
        var currentGroup = this.x6o_1;
        var currentGroupEnd = this.y6o_1;
        var groupIndex = this.z6o_1;
        var groupAddress = groupIndexToAddress(this, groupIndex);
        var newNodes = this.s6o_1;
        var newGroupSize = currentGroup - groupIndex | 0;
        // Inline function 'androidx.compose.runtime.isNode' call
        var isNode = !((this.f6o_1[imul(groupAddress, 5) + 1 | 0] & 1073741824) === 0);
        if (inserting) {
          var deferredSlotWrites = this.w6o_1;
          var tmp1_safe_receiver = deferredSlotWrites == null ? null : deferredSlotWrites.e1(groupIndex);
          if (tmp1_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            // Inline function 'androidx.collection.ObjectList.forEach' call
            // Inline function 'kotlin.contracts.contract' call
            var content = tmp1_safe_receiver.q6d_1;
            var inductionVariable = 0;
            var last = tmp1_safe_receiver.r6d_1;
            if (inductionVariable < last)
              do {
                var i = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var tmp = content[i];
                var value = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                rawUpdate(this, value);
              }
               while (inductionVariable < last);
            deferredSlotWrites.q6c(groupIndex);
          }
          updateGroupSize(this.f6o_1, groupAddress, newGroupSize);
          updateNodeCount(this.f6o_1, groupAddress, newNodes);
          this.s6o_1 = this.v6o_1.b6o() + (isNode ? 1 : newNodes) | 0;
          this.z6o_1 = parent(this, this.f6o_1, groupIndex);
          var nextAddress = this.z6o_1 < 0 ? this.l79() : groupIndexToAddress(this, this.z6o_1 + 1 | 0);
          var newCurrentSlot = nextAddress < 0 ? 0 : dataIndex_0(this, this.f6o_1, nextAddress);
          this.m6o_1 = newCurrentSlot;
          this.n6o_1 = newCurrentSlot;
        } else {
          // Inline function 'androidx.compose.runtime.runtimeCheck' call
          if (!(currentGroup === currentGroupEnd)) {
            var tmp$ret$6 = 'Expected to be at the end of a group';
            composeImmediateRuntimeError(tmp$ret$6);
          }
          var oldGroupSize = groupSize(this.f6o_1, groupAddress);
          // Inline function 'androidx.compose.runtime.nodeCount' call
          var oldNodes = this.f6o_1[imul(groupAddress, 5) + 1 | 0] & 67108863;
          updateGroupSize(this.f6o_1, groupAddress, newGroupSize);
          updateNodeCount(this.f6o_1, groupAddress, newNodes);
          var newParent = this.t6o_1.b6o();
          restoreCurrentGroupEnd(this);
          this.z6o_1 = newParent;
          var groupParent = parent(this, this.f6o_1, groupIndex);
          this.s6o_1 = this.v6o_1.b6o();
          if (groupParent === newParent) {
            this.s6o_1 = this.s6o_1 + (isNode ? 0 : newNodes - oldNodes | 0) | 0;
          } else {
            var groupSizeDelta = newGroupSize - oldGroupSize | 0;
            var nodesDelta = isNode ? 0 : newNodes - oldNodes | 0;
            if (!(groupSizeDelta === 0) || !(nodesDelta === 0)) {
              var current = groupParent;
              while (!(current === 0) && !(current === newParent) && (!(nodesDelta === 0) || !(groupSizeDelta === 0))) {
                var currentAddress = groupIndexToAddress(this, current);
                if (!(groupSizeDelta === 0)) {
                  var newSize = groupSize(this.f6o_1, currentAddress) + groupSizeDelta | 0;
                  updateGroupSize(this.f6o_1, currentAddress, newSize);
                }
                if (!(nodesDelta === 0)) {
                  var tmp_0 = this.f6o_1;
                  // Inline function 'androidx.compose.runtime.nodeCount' call
                  var tmp$ret$9 = this.f6o_1[imul(currentAddress, 5) + 1 | 0] & 67108863;
                  updateNodeCount(tmp_0, currentAddress, tmp$ret$9 + nodesDelta | 0);
                }
                // Inline function 'androidx.compose.runtime.isNode' call
                if (!((this.f6o_1[imul(currentAddress, 5) + 1 | 0] & 1073741824) === 0))
                  nodesDelta = 0;
                current = parent(this, this.f6o_1, current);
              }
            }
            this.s6o_1 = this.s6o_1 + nodesDelta | 0;
          }
        }
        return newNodes;
      }
      q7a(index) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.r6o_1 <= 0)) {
          var tmp$ret$0 = 'Cannot call ensureStarted() while inserting';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        var parent = this.z6o_1;
        if (!(parent === index)) {
          // Inline function 'androidx.compose.runtime.runtimeCheck' call
          if (!(index >= parent && index < this.y6o_1)) {
            var tmp$ret$2 = 'Started group at ' + index + ' must be a subgroup of the group at ' + parent;
            composeImmediateRuntimeError(tmp$ret$2);
          }
          var oldCurrent = this.x6o_1;
          var oldCurrentSlot = this.m6o_1;
          var oldCurrentSlotEnd = this.n6o_1;
          this.x6o_1 = index;
          this.v6p();
          this.x6o_1 = oldCurrent;
          this.m6o_1 = oldCurrentSlot;
          this.n6o_1 = oldCurrentSlotEnd;
        }
      }
      r7a(anchor) {
        return this.q7a(anchor.s7a(this));
      }
      f6p() {
        var groupAddress = groupIndexToAddress(this, this.x6o_1);
        var newGroup = this.x6o_1 + groupSize(this.f6o_1, groupAddress) | 0;
        this.x6o_1 = newGroup;
        this.m6o_1 = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, newGroup));
        var tmp;
        // Inline function 'androidx.compose.runtime.isNode' call
        if (!((this.f6o_1[imul(groupAddress, 5) + 1 | 0] & 1073741824) === 0)) {
          tmp = 1;
        } else {
          // Inline function 'androidx.compose.runtime.nodeCount' call
          tmp = this.f6o_1[imul(groupAddress, 5) + 1 | 0] & 67108863;
        }
        return tmp;
      }
      u6y() {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.r6o_1 === 0)) {
          var tmp$ret$0 = 'Cannot remove group while inserting';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        var oldGroup = this.x6o_1;
        var oldSlot = this.m6o_1;
        var dataStart = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, oldGroup));
        var count = this.f6p();
        var tmp0_safe_receiver = sourceInformationOf(this, this.z6o_1);
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          var tmp0_safe_receiver_0 = this.a7a(oldGroup);
          var tmp;
          if (tmp0_safe_receiver_0 == null) {
            tmp = null;
          } else {
            // Inline function 'kotlin.let' call
            tmp = tmp0_safe_receiver.t7a(tmp0_safe_receiver_0);
          }
        }
        var tmp1_safe_receiver = this.b6p_1;
        var tmp_0 = tmp1_safe_receiver;
        if ((tmp_0 == null ? null : new (PrioritySet())(tmp_0)) == null)
          null;
        else {
          var tmp_1 = tmp1_safe_receiver;
          // Inline function 'kotlin.let' call
          var it = (tmp_1 == null ? null : new (PrioritySet())(tmp_1)).z79_1;
          while (PrioritySet__isNotEmpty_impl_q82m5n(it) && PrioritySet__peek_impl_la0uk4(it) >= oldGroup) {
            PrioritySet__takeMax_impl_e5irrm(it);
          }
        }
        var anchorsRemoved = removeGroups(this, oldGroup, this.x6o_1 - oldGroup | 0);
        removeSlots(this, dataStart, this.m6o_1 - dataStart | 0, oldGroup - 1 | 0);
        this.x6o_1 = oldGroup;
        this.m6o_1 = oldSlot;
        this.s6o_1 = this.s6o_1 - count | 0;
        return anchorsRemoved;
      }
      u7a(offset) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.r6o_1 === 0)) {
          var tmp$ret$0 = 'Cannot move a group while inserting';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(offset >= 0)) {
          var tmp$ret$2 = 'Parameter offset is out of bounds';
          composeImmediateRuntimeError(tmp$ret$2);
        }
        if (offset === 0)
          return Unit_instance;
        var current = this.x6o_1;
        var parent = this.z6o_1;
        var parentEnd = this.y6o_1;
        var count = offset;
        var groupToMove = current;
        while (count > 0) {
          groupToMove = groupToMove + groupSize(this.f6o_1, groupIndexToAddress(this, groupToMove)) | 0;
          // Inline function 'androidx.compose.runtime.runtimeCheck' call
          if (!(groupToMove <= parentEnd)) {
            var tmp$ret$4 = 'Parameter offset is out of bounds';
            composeImmediateRuntimeError(tmp$ret$4);
          }
          count = count - 1 | 0;
        }
        var moveLen = groupSize(this.f6o_1, groupIndexToAddress(this, groupToMove));
        var destinationSlot = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, this.x6o_1));
        var dataStart = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, groupToMove));
        var dataEnd = dataIndex_0(this, this.f6o_1, groupIndexToAddress(this, groupToMove + moveLen | 0));
        var moveDataLen = dataEnd - dataStart | 0;
        // Inline function 'kotlin.math.max' call
        var a = this.x6o_1 - 1 | 0;
        var tmp$ret$6 = Math.max(a, 0);
        insertSlots(this, moveDataLen, tmp$ret$6);
        insertGroups(this, moveLen);
        var groups = this.f6o_1;
        var moveLocationAddress = groupIndexToAddress(this, groupToMove + moveLen | 0);
        var moveLocationOffset = imul(moveLocationAddress, 5);
        var currentAddress = groupIndexToAddress(this, current);
        var tmp4 = imul(currentAddress, 5);
        // Inline function 'kotlin.collections.copyInto' call
        var endIndex = moveLocationOffset + imul(moveLen, 5) | 0;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp = groups;
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        arrayCopy(tmp, groups, tmp4, moveLocationOffset, endIndex);
        if (moveDataLen > 0) {
          var slots = this.g6o_1;
          var tmp6 = dataIndexToDataAddress(this, dataStart + moveDataLen | 0);
          // Inline function 'androidx.compose.runtime.collection.fastCopyInto' call
          // Inline function 'kotlin.collections.copyInto' call
          var endIndex_0 = dataIndexToDataAddress(this, dataEnd + moveDataLen | 0);
          arrayCopy(slots, slots, destinationSlot, tmp6, endIndex_0);
        }
        var dataMoveDistance = (dataStart + moveDataLen | 0) - destinationSlot | 0;
        var slotsGapStart = this.o6o_1;
        var slotsGapLen = this.p6o_1;
        var slotsCapacity = this.g6o_1.length;
        var slotsGapOwner = this.q6o_1;
        var inductionVariable = current;
        var last = current + moveLen | 0;
        if (inductionVariable < last)
          do {
            var group = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var groupAddress = groupIndexToAddress(this, group);
            var oldIndex = dataIndex_0(this, groups, groupAddress);
            var newIndex = oldIndex - dataMoveDistance | 0;
            var newAnchor = dataIndexToDataAnchor(this, newIndex, slotsGapOwner < groupAddress ? 0 : slotsGapStart, slotsGapLen, slotsCapacity);
            updateDataIndex(this, groups, groupAddress, newAnchor);
          }
           while (inductionVariable < last);
        moveAnchors(this, groupToMove + moveLen | 0, current, moveLen);
        var anchorsRemoved = removeGroups(this, groupToMove + moveLen | 0, moveLen);
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!!anchorsRemoved) {
          var tmp$ret$14 = 'Unexpectedly removed anchors';
          composeImmediateRuntimeError(tmp$ret$14);
        }
        fixParentAnchorsFor(this, parent, this.y6o_1, current);
        if (moveDataLen > 0) {
          removeSlots(this, dataStart + moveDataLen | 0, moveDataLen, (groupToMove + moveLen | 0) - 1 | 0);
        }
      }
      d6z(anchor, offset, writer) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(writer.r6o_1 > 0)) {
          var tmp$ret$0 = 'Check failed';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.r6o_1 === 0)) {
          var tmp$ret$3 = 'Check failed';
          composeImmediateRuntimeError(tmp$ret$3);
        }
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!anchor.s6y()) {
          var tmp$ret$6 = 'Check failed';
          composeImmediateRuntimeError(tmp$ret$6);
        }
        var location = this.z6s(anchor) + offset | 0;
        var currentGroup = this.x6o_1;
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(currentGroup <= location ? location < this.y6o_1 : false)) {
          var tmp$ret$9 = 'Check failed';
          composeImmediateRuntimeError(tmp$ret$9);
        }
        var parent = this.i6p(location);
        var size = this.e6r(location);
        var nodes = this.z6r(location) ? 1 : this.a6s(location);
        var result = moveGroup$default(Companion_instance, this, location, writer, false, false);
        updateContainsMark(this, parent);
        var current = parent;
        var updatingNodes = nodes > 0;
        while (current >= currentGroup) {
          var currentAddress = groupIndexToAddress(this, current);
          updateGroupSize(this.f6o_1, currentAddress, groupSize(this.f6o_1, currentAddress) - size | 0);
          if (updatingNodes) {
            // Inline function 'androidx.compose.runtime.isNode' call
            if (!((this.f6o_1[imul(currentAddress, 5) + 1 | 0] & 1073741824) === 0))
              updatingNodes = false;
            else {
              var tmp = this.f6o_1;
              // Inline function 'androidx.compose.runtime.nodeCount' call
              var tmp$ret$13 = this.f6o_1[imul(currentAddress, 5) + 1 | 0] & 67108863;
              updateNodeCount(tmp, currentAddress, tmp$ret$13 - nodes | 0);
            }
          }
          current = this.i6p(current);
        }
        if (updatingNodes) {
          // Inline function 'androidx.compose.runtime.runtimeCheck' call
          // Inline function 'androidx.compose.runtime.runtimeCheck' call
          if (!(this.s6o_1 >= nodes)) {
            var tmp$ret$14 = 'Check failed';
            composeImmediateRuntimeError(tmp$ret$14);
          }
          this.s6o_1 = this.s6o_1 - nodes | 0;
        }
        return result;
      }
      v7a(table, index, removeSourceGroup) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.r6o_1 > 0)) {
          var tmp$ret$0 = 'Check failed';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        if (index === 0 && this.x6o_1 === 0 && this.e6o_1.c6m_1 === 0 && groupSize(table.b6m_1, index) === table.c6m_1) {
          var myGroups = this.f6o_1;
          var mySlots = this.g6o_1;
          var myAnchors = this.h6o_1;
          var mySourceInformation = this.i6o_1;
          var myCallInformation = this.j6o_1;
          var groups = table.b6m_1;
          var groupsSize = table.c6m_1;
          var slots = table.d6m_1;
          var slotsSize = table.e6m_1;
          var sourceInformation = table.k6m_1;
          var callInformation = table.l6m_1;
          this.f6o_1 = groups;
          this.g6o_1 = slots;
          this.h6o_1 = table.j6m_1;
          this.k6o_1 = groupsSize;
          this.l6o_1 = (groups.length / 5 | 0) - groupsSize | 0;
          this.o6o_1 = slotsSize;
          this.p6o_1 = slots.length - slotsSize | 0;
          this.q6o_1 = groupsSize;
          this.i6o_1 = sourceInformation;
          this.j6o_1 = callInformation;
          table.j79(myGroups, 0, mySlots, 0, myAnchors, mySourceInformation, myCallInformation);
          return this.h6o_1;
        }
        // Inline function 'androidx.compose.runtime.SlotTable.write' call
        // Inline function 'kotlin.let' call
        var writer = table.n6p();
        var normalClose = false;
        var tmp;
        try {
          // Inline function 'kotlin.also' call
          var this_0 = moveGroup(Companion_instance, writer, index, this, true, true, removeSourceGroup);
          normalClose = true;
          tmp = this_0;
        }finally {
          writer.s6p(normalClose);
        }
        return tmp;
      }
      w7a(offset, table, index) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.r6o_1 <= 0 && this.e6r(this.x6o_1 + offset | 0) === 1)) {
          var tmp$ret$0 = 'Check failed';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        var previousCurrentGroup = this.x6o_1;
        var previousCurrentSlot = this.m6o_1;
        var previousCurrentSlotEnd = this.n6o_1;
        this.x6y(offset);
        this.v6p();
        this.o6q();
        // Inline function 'androidx.compose.runtime.SlotTable.write' call
        // Inline function 'kotlin.let' call
        var writer = table.n6p();
        var normalClose = false;
        var tmp;
        try {
          // Inline function 'kotlin.also' call
          var this_0 = moveGroup$default(Companion_instance, writer, index, this, false, true);
          normalClose = true;
          tmp = this_0;
        }finally {
          writer.s6p(normalClose);
        }
        var anchors = tmp;
        this.t6r();
        this.s6r();
        this.x6o_1 = previousCurrentGroup;
        this.m6o_1 = previousCurrentSlot;
        this.n6o_1 = previousCurrentSlotEnd;
        return anchors;
      }
      j6p(index) {
        var tmp0 = this.h6o_1;
        // Inline function 'androidx.compose.runtime.getOrAdd' call
        var effectiveSize = this.l79();
        var location = search(tmp0, index, effectiveSize);
        var tmp;
        if (location < 0) {
          var anchor = new (Anchor())(index <= this.k6o_1 ? index : -(this.l79() - index | 0) | 0);
          tmp0.r3(-(location + 1 | 0) | 0, anchor);
          tmp = anchor;
        } else {
          tmp = tmp0.e1(location);
        }
        return tmp;
      }
      x7a(group) {
        var groupAddress = groupIndexToAddress(this, group);
        // Inline function 'androidx.compose.runtime.hasMark' call
        if (!!((this.f6o_1[imul(groupAddress, 5) + 1 | 0] & 134217728) === 0)) {
          updateMark(this.f6o_1, groupAddress, true);
          // Inline function 'androidx.compose.runtime.containsMark' call
          if (!!((this.f6o_1[imul(groupAddress, 5) + 1 | 0] & 67108864) === 0)) {
            updateContainsMark(this, this.i6p(group));
          }
        }
      }
      n6s(group, $super) {
        group = group === VOID ? this.z6o_1 : group;
        var tmp;
        if ($super === VOID) {
          this.x7a(group);
          tmp = Unit_instance;
        } else {
          tmp = $super.x7a.call(this, group);
        }
        return tmp;
      }
      z6s(anchor) {
        // Inline function 'kotlin.let' call
        var it = anchor.d6x_1;
        return it < 0 ? this.l79() + it | 0 : it;
      }
      toString() {
        return 'SlotWriter(current = ' + this.x6o_1 + ' end=' + this.y6o_1 + ' size = ' + this.l79() + ' ' + ('gap=' + this.k6o_1 + '-' + (this.k6o_1 + this.l6o_1 | 0) + ')');
      }
      a7a(group) {
        return (0 <= group ? group < this.l79() : false) ? find(this.h6o_1, group, this.l79()) : null;
      }
      l79() {
        return _get_capacity__a9k9f3(this) - this.l6o_1 | 0;
      }
    }
    initMetadataForClass($, 'SlotWriter');
    SlotWriterClass = $;
  }
  return SlotWriterClass;
}
var AnchorClass;
function Anchor() {
  if (AnchorClass === VOID) {
    class $ {
      constructor(loc) {
        this.d6x_1 = loc;
      }
      s6y() {
        return !(this.d6x_1 === -2147483648);
      }
      e6x(slots) {
        return slots.z6s(this);
      }
      s7a(writer) {
        return writer.z6s(this);
      }
      toString() {
        return anyToString(this) + '{ location = ' + this.d6x_1 + ' }';
      }
    }
    initMetadataForClass($, 'Anchor');
    AnchorClass = $;
  }
  return AnchorClass;
}
function openInformation($this) {
  var tmp0_safe_receiver = $this.p79_1;
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.runtime.fastLastOrNull' call
      var index = tmp0_safe_receiver.c1() - 1 | 0;
      while (index >= 0) {
        var value = tmp0_safe_receiver.e1(index);
        var tmp_0;
        if (value instanceof GroupSourceInformation()) {
          tmp_0 = !value.q79_1;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$1 = value;
          break $l$block;
        }
        index = index - 1 | 0;
      }
      tmp$ret$1 = null;
    }
    tmp = tmp$ret$1;
  }
  var tmp_1 = tmp;
  var tmp1_safe_receiver = tmp_1 instanceof GroupSourceInformation() ? tmp_1 : null;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : openInformation(tmp1_safe_receiver);
  return tmp2_elvis_lhs == null ? $this : tmp2_elvis_lhs;
}
function add($this, group) {
  var tmp0_elvis_lhs = $this.p79_1;
  var groups = tmp0_elvis_lhs == null ? ArrayList().g1() : tmp0_elvis_lhs;
  $this.p79_1 = groups;
  groups.i(group);
}
function hasAnchor($this, anchor) {
  var tmp0_safe_receiver = $this.p79_1;
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.runtime.snapshots.fastAny' call
      // Inline function 'androidx.compose.runtime.snapshots.fastForEach' call
      var inductionVariable = 0;
      var last = tmp0_safe_receiver.c1() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = tmp0_safe_receiver.e1(index);
          var tmp_0;
          if (equals(item, anchor)) {
            tmp_0 = true;
          } else {
            var tmp_1;
            if (item instanceof GroupSourceInformation()) {
              tmp_1 = hasAnchor(item, anchor);
            } else {
              tmp_1 = false;
            }
            tmp_0 = tmp_1;
          }
          if (tmp_0) {
            tmp$ret$1 = true;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = false;
    }
    tmp = tmp$ret$1;
  }
  return tmp === true;
}
var GroupSourceInformationClass;
function GroupSourceInformation() {
  if (GroupSourceInformationClass === VOID) {
    class $ {
      constructor(key, sourceInformation, dataStartOffset) {
        this.m79_1 = key;
        this.n79_1 = sourceInformation;
        this.o79_1 = dataStartOffset;
        this.p79_1 = null;
        this.q79_1 = false;
        this.r79_1 = 0;
      }
      k7a(key, sourceInformation, dataOffset) {
        add(openInformation(this), new (GroupSourceInformation())(key, sourceInformation, dataOffset));
      }
      l7a(dataOffset) {
        openInformation(this).g2a(dataOffset);
      }
      v79(writer, group) {
        add(openInformation(this), writer.j6p(group));
      }
      y7a(table, group) {
        add(openInformation(this), table.j6p(group));
      }
      s79(writer, predecessor, group) {
        var tmp0_elvis_lhs = this.p79_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = ArrayList().g1();
          this.p79_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var groups = tmp;
        var tmp_0;
        if (predecessor >= 0) {
          var anchor = writer.a7a(predecessor);
          var tmp_1;
          if (!(anchor == null)) {
            var tmp$ret$3;
            $l$block: {
              // Inline function 'androidx.compose.runtime.fastIndexOf' call
              var index = 0;
              var size = groups.c1();
              while (index < size) {
                var value = groups.e1(index);
                var tmp_2;
                if (equals(value, anchor)) {
                  tmp_2 = true;
                } else {
                  var tmp_3;
                  if (value instanceof GroupSourceInformation()) {
                    tmp_3 = hasAnchor(value, anchor);
                  } else {
                    tmp_3 = false;
                  }
                  tmp_2 = tmp_3;
                }
                if (tmp_2) {
                  tmp$ret$3 = index;
                  break $l$block;
                }
                index = index + 1 | 0;
              }
              tmp$ret$3 = -1;
            }
            tmp_1 = tmp$ret$3;
          } else {
            tmp_1 = 0;
          }
          tmp_0 = tmp_1;
        } else {
          tmp_0 = 0;
        }
        var index_0 = tmp_0;
        groups.r3(index_0, writer.j6p(group));
      }
      g2a(dataOffset) {
        this.q79_1 = true;
        this.r79_1 = dataOffset;
      }
      t7a(anchor) {
        var groups = this.p79_1;
        if (!(groups == null)) {
          var index = groups.c1() - 1 | 0;
          while (index >= 0) {
            var item = groups.e1(index);
            if (item instanceof Anchor()) {
              if (equals(item, anchor)) {
                groups.s3(index);
              }
            } else {
              if (item instanceof GroupSourceInformation())
                if (!item.t7a(anchor)) {
                  groups.s3(index);
                }
            }
            index = index - 1 | 0;
          }
          if (groups.h1()) {
            this.p79_1 = null;
            return false;
          }
          return true;
        }
        return true;
      }
    }
    initMetadataForClass($, 'GroupSourceInformation');
    GroupSourceInformationClass = $;
  }
  return GroupSourceInformationClass;
}
function node($this, _this__u8e3s4, index) {
  var tmp;
  // Inline function 'androidx.compose.runtime.isNode' call
  if (!((_this__u8e3s4[imul(index, 5) + 1 | 0] & 1073741824) === 0)) {
    // Inline function 'androidx.compose.runtime.nodeIndex' call
    var tmp$ret$1 = _this__u8e3s4[imul(index, 5) + 4 | 0];
    tmp = $this.p6n_1[tmp$ret$1];
  } else {
    tmp = Companion_getInstance().x6p_1;
  }
  return tmp;
}
function aux($this, _this__u8e3s4, index) {
  var tmp;
  // Inline function 'androidx.compose.runtime.hasAux' call
  if (!((_this__u8e3s4[imul(index, 5) + 1 | 0] & 268435456) === 0)) {
    tmp = $this.p6n_1[auxIndex_0(_this__u8e3s4, index)];
  } else {
    tmp = Companion_getInstance().x6p_1;
  }
  return tmp;
}
function objectKey($this, _this__u8e3s4, index) {
  var tmp;
  // Inline function 'androidx.compose.runtime.hasObjectKey' call
  if (!((_this__u8e3s4[imul(index, 5) + 1 | 0] & 536870912) === 0)) {
    tmp = $this.p6n_1[objectKeyIndex(_this__u8e3s4, index)];
  } else {
    tmp = null;
  }
  return tmp;
}
var SlotReaderClass;
function SlotReader() {
  if (SlotReaderClass === VOID) {
    class $ {
      constructor(table) {
        this.m6n_1 = table;
        this.n6n_1 = this.m6n_1.b6m_1;
        this.o6n_1 = this.m6n_1.c6m_1;
        this.p6n_1 = this.m6n_1.d6m_1;
        this.q6n_1 = this.m6n_1.e6m_1;
        this.r6n_1 = null;
        this.s6n_1 = false;
        this.t6n_1 = 0;
        this.u6n_1 = this.o6n_1;
        this.v6n_1 = -1;
        this.w6n_1 = new (IntStack())();
        this.x6n_1 = 0;
        this.y6n_1 = 0;
        this.z6n_1 = 0;
        this.a6o_1 = false;
      }
      c1() {
        return this.o6n_1;
      }
      i6p(index) {
        // Inline function 'androidx.compose.runtime.parentAnchor' call
        return this.n6n_1[imul(index, 5) + 2 | 0];
      }
      f6x() {
        var tmp0 = this.n6n_1;
        // Inline function 'androidx.compose.runtime.isNode' call
        var address = this.t6n_1;
        return !((tmp0[imul(address, 5) + 1 | 0] & 1073741824) === 0);
      }
      z6r(index) {
        // Inline function 'androidx.compose.runtime.isNode' call
        return !((this.n6n_1[imul(index, 5) + 1 | 0] & 1073741824) === 0);
      }
      a6s(index) {
        // Inline function 'androidx.compose.runtime.nodeCount' call
        return this.n6n_1[imul(index, 5) + 1 | 0] & 67108863;
      }
      x6t(index) {
        var tmp;
        // Inline function 'androidx.compose.runtime.isNode' call
        if (!((this.n6n_1[imul(index, 5) + 1 | 0] & 1073741824) === 0)) {
          tmp = node(this, this.n6n_1, index);
        } else {
          tmp = null;
        }
        return tmp;
      }
      m6r() {
        return this.u6r() || this.t6n_1 === this.u6n_1;
      }
      u6r() {
        return this.x6n_1 > 0;
      }
      z7a() {
        return groupSize(this.n6n_1, this.t6n_1);
      }
      e6r(index) {
        return groupSize(this.n6n_1, index);
      }
      j6r() {
        return this.u6n_1;
      }
      k6q() {
        var tmp;
        if (this.t6n_1 < this.u6n_1) {
          var tmp0 = this.n6n_1;
          // Inline function 'androidx.compose.runtime.key' call
          var address = this.t6n_1;
          tmp = tmp0[imul(address, 5)];
        } else {
          tmp = 0;
        }
        return tmp;
      }
      l6p(index) {
        // Inline function 'androidx.compose.runtime.key' call
        return this.n6n_1[imul(index, 5)];
      }
      u6w() {
        return this.y6n_1 - slotAnchor(this.n6n_1, this.v6n_1) | 0;
      }
      b6s(index) {
        // Inline function 'androidx.compose.runtime.hasObjectKey' call
        return !((this.n6n_1[imul(index, 5) + 1 | 0] & 536870912) === 0);
      }
      e6w() {
        var tmp;
        if (this.t6n_1 < this.u6n_1) {
          var tmp0 = this.n6n_1;
          // Inline function 'androidx.compose.runtime.hasObjectKey' call
          var address = this.t6n_1;
          tmp = !((tmp0[imul(address, 5) + 1 | 0] & 536870912) === 0);
        } else {
          tmp = false;
        }
        return tmp;
      }
      m6q() {
        return this.t6n_1 < this.u6n_1 ? objectKey(this, this.n6n_1, this.t6n_1) : null;
      }
      m6p(index) {
        return objectKey(this, this.n6n_1, index);
      }
      u6p() {
        return this.t6n_1 < this.u6n_1 ? aux(this, this.n6n_1, this.t6n_1) : 0;
      }
      k6p(index) {
        return aux(this, this.n6n_1, index);
      }
      h6v(index) {
        // Inline function 'androidx.compose.runtime.hasMark' call
        return !((this.n6n_1[imul(index, 5) + 1 | 0] & 134217728) === 0);
      }
      g6v(index) {
        // Inline function 'androidx.compose.runtime.containsMark' call
        return !((this.n6n_1[imul(index, 5) + 1 | 0] & 67108864) === 0);
      }
      d6s() {
        var tmp;
        if (this.v6n_1 >= 0) {
          var tmp0 = this.n6n_1;
          // Inline function 'androidx.compose.runtime.nodeCount' call
          var address = this.v6n_1;
          tmp = tmp0[imul(address, 5) + 1 | 0] & 67108863;
        } else {
          tmp = 0;
        }
        return tmp;
      }
      k6r() {
        return this.z6n_1 - this.y6n_1 | 0;
      }
      f6v(group, index) {
        var start = slotAnchor(this.n6n_1, group);
        var next = group + 1 | 0;
        var tmp;
        if (next < this.o6n_1) {
          // Inline function 'androidx.compose.runtime.dataAnchor' call
          tmp = this.n6n_1[imul(next, 5) + 4 | 0];
        } else {
          tmp = this.q6n_1;
        }
        var end = tmp;
        var address = start + index | 0;
        return address < end ? this.p6n_1[address] : Companion_getInstance().x6p_1;
      }
      z() {
        if (this.x6n_1 > 0 || this.y6n_1 >= this.z6n_1) {
          this.a6o_1 = false;
          return Companion_getInstance().x6p_1;
        }
        this.a6o_1 = true;
        var _unary__edvuaz = this.y6n_1;
        this.y6n_1 = _unary__edvuaz + 1 | 0;
        return this.p6n_1[_unary__edvuaz];
      }
      y6p() {
        this.x6n_1 = this.x6n_1 + 1 | 0;
      }
      r6r() {
        // Inline function 'androidx.compose.runtime.requirePrecondition' call
        if (!(this.x6n_1 > 0)) {
          var tmp$ret$0 = 'Unbalanced begin/end empty';
          throwIllegalArgumentException(tmp$ret$0);
        }
        this.x6n_1 = this.x6n_1 - 1 | 0;
      }
      v6() {
        this.s6n_1 = true;
        this.m6n_1.h79(this, this.r6n_1);
      }
      v6p() {
        if (this.x6n_1 <= 0) {
          var parent = this.v6n_1;
          var currentGroup = this.t6n_1;
          // Inline function 'androidx.compose.runtime.parentAnchor' call
          // Inline function 'androidx.compose.runtime.requirePrecondition' call
          if (!(this.n6n_1[imul(currentGroup, 5) + 2 | 0] === parent)) {
            var tmp$ret$1 = 'Invalid slot table detected';
            throwIllegalArgumentException(tmp$ret$1);
          }
          var tmp0_safe_receiver = this.r6n_1;
          var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j3(this.j6p(parent));
          if (tmp1_safe_receiver == null)
            null;
          else {
            tmp1_safe_receiver.y7a(this.m6n_1, currentGroup);
          }
          var currentSlotStack = this.w6n_1;
          var currentSlot = this.y6n_1;
          var currentEndSlot = this.z6n_1;
          if (currentSlot === 0 && currentEndSlot === 0) {
            currentSlotStack.r6m(-1);
          } else {
            currentSlotStack.r6m(currentSlot);
          }
          this.v6n_1 = currentGroup;
          this.u6n_1 = currentGroup + groupSize(this.n6n_1, currentGroup) | 0;
          this.t6n_1 = currentGroup + 1 | 0;
          this.y6n_1 = slotAnchor(this.n6n_1, currentGroup);
          var tmp = this;
          var tmp_0;
          if (currentGroup >= (this.o6n_1 - 1 | 0)) {
            tmp_0 = this.q6n_1;
          } else {
            var tmp0 = this.n6n_1;
            // Inline function 'androidx.compose.runtime.dataAnchor' call
            var address = currentGroup + 1 | 0;
            tmp_0 = tmp0[imul(address, 5) + 4 | 0];
          }
          tmp.z6n_1 = tmp_0;
        }
      }
      w6p() {
        if (this.x6n_1 <= 0) {
          var tmp0 = this.n6n_1;
          // Inline function 'androidx.compose.runtime.isNode' call
          var address = this.t6n_1;
          // Inline function 'androidx.compose.runtime.requirePrecondition' call
          if (!!((tmp0[imul(address, 5) + 1 | 0] & 1073741824) === 0)) {
            var tmp$ret$1 = 'Expected a node group';
            throwIllegalArgumentException(tmp$ret$1);
          }
          this.v6p();
        }
      }
      f6p() {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.x6n_1 === 0)) {
          var tmp$ret$0 = 'Cannot skip while in an empty region';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        var tmp;
        var tmp0 = this.n6n_1;
        // Inline function 'androidx.compose.runtime.isNode' call
        var address = this.t6n_1;
        if (!((tmp0[imul(address, 5) + 1 | 0] & 1073741824) === 0)) {
          tmp = 1;
        } else {
          var tmp0_0 = this.n6n_1;
          // Inline function 'androidx.compose.runtime.nodeCount' call
          var address_0 = this.t6n_1;
          tmp = tmp0_0[imul(address_0, 5) + 1 | 0] & 67108863;
        }
        var count = tmp;
        this.t6n_1 = this.t6n_1 + groupSize(this.n6n_1, this.t6n_1) | 0;
        return count;
      }
      o6p() {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.x6n_1 === 0)) {
          var tmp$ret$0 = 'Cannot skip the enclosing group while in an empty region';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        this.t6n_1 = this.u6n_1;
        this.y6n_1 = 0;
        this.z6n_1 = 0;
      }
      y6q(index) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(this.x6n_1 === 0)) {
          var tmp$ret$0 = 'Cannot reposition while in an empty region';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        this.t6n_1 = index;
        var tmp;
        if (index < this.o6n_1) {
          // Inline function 'androidx.compose.runtime.parentAnchor' call
          tmp = this.n6n_1[imul(index, 5) + 2 | 0];
        } else {
          tmp = -1;
        }
        var parent = tmp;
        this.v6n_1 = parent;
        if (parent < 0)
          this.u6n_1 = this.o6n_1;
        else
          this.u6n_1 = parent + groupSize(this.n6n_1, parent) | 0;
        this.y6n_1 = 0;
        this.z6n_1 = 0;
      }
      y6r(index) {
        var newCurrentEnd = index + groupSize(this.n6n_1, index) | 0;
        var current = this.t6n_1;
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!(current >= index && current <= newCurrentEnd)) {
          var tmp$ret$0 = 'Index ' + index + ' is not a parent of ' + current;
          composeImmediateRuntimeError(tmp$ret$0);
        }
        this.v6n_1 = index;
        this.u6n_1 = newCurrentEnd;
        this.y6n_1 = 0;
        this.z6n_1 = 0;
      }
      p6r() {
        if (this.x6n_1 === 0) {
          // Inline function 'androidx.compose.runtime.runtimeCheck' call
          if (!(this.t6n_1 === this.u6n_1)) {
            var tmp$ret$0 = 'endGroup() not called at the end of a group';
            composeImmediateRuntimeError(tmp$ret$0);
          }
          var tmp0 = this.n6n_1;
          // Inline function 'androidx.compose.runtime.parentAnchor' call
          var address = this.v6n_1;
          var parent = tmp0[imul(address, 5) + 2 | 0];
          this.v6n_1 = parent;
          this.u6n_1 = parent < 0 ? this.o6n_1 : parent + groupSize(this.n6n_1, parent) | 0;
          var currentSlotStack = this.w6n_1;
          var newCurrentSlot = currentSlotStack.b6o();
          if (newCurrentSlot < 0) {
            this.y6n_1 = 0;
            this.z6n_1 = 0;
          } else {
            this.y6n_1 = newCurrentSlot;
            var tmp = this;
            var tmp_0;
            if (parent >= (this.o6n_1 - 1 | 0)) {
              tmp_0 = this.q6n_1;
            } else {
              var tmp0_0 = this.n6n_1;
              // Inline function 'androidx.compose.runtime.dataAnchor' call
              var address_0 = parent + 1 | 0;
              tmp_0 = tmp0_0[imul(address_0, 5) + 4 | 0];
            }
            tmp.z6n_1 = tmp_0;
          }
        }
      }
      l6q() {
        // Inline function 'kotlin.collections.mutableListOf' call
        var result = ArrayList().g1();
        if (this.x6n_1 > 0)
          return result;
        var index = 0;
        var childIndex = this.t6n_1;
        while (childIndex < this.u6n_1) {
          var tmp0 = this.n6n_1;
          // Inline function 'androidx.compose.runtime.key' call
          var address = childIndex;
          var tmp = tmp0[imul(address, 5)];
          var tmp_0 = objectKey(this, this.n6n_1, childIndex);
          var tmp_1 = childIndex;
          var tmp_2;
          var tmp0_0 = this.n6n_1;
          // Inline function 'androidx.compose.runtime.isNode' call
          var address_0 = childIndex;
          if (!((tmp0_0[imul(address_0, 5) + 1 | 0] & 1073741824) === 0)) {
            tmp_2 = 1;
          } else {
            var tmp0_1 = this.n6n_1;
            // Inline function 'androidx.compose.runtime.nodeCount' call
            var address_1 = childIndex;
            tmp_2 = tmp0_1[imul(address_1, 5) + 1 | 0] & 67108863;
          }
          var tmp_3 = tmp_2;
          var _unary__edvuaz = index;
          index = _unary__edvuaz + 1 | 0;
          result.i(new (KeyInfo())(tmp, tmp_0, tmp_1, tmp_3, _unary__edvuaz));
          childIndex = childIndex + groupSize(this.n6n_1, childIndex) | 0;
        }
        return result;
      }
      toString() {
        return 'SlotReader(current=' + this.t6n_1 + ', key=' + this.k6q() + ', parent=' + this.v6n_1 + ', end=' + this.u6n_1 + ')';
      }
      j6p(index) {
        var tmp0 = this.m6n_1.j6m_1;
        // Inline function 'androidx.compose.runtime.getOrAdd' call
        var effectiveSize = this.o6n_1;
        var location = search(tmp0, index, effectiveSize);
        var tmp;
        if (location < 0) {
          var anchor = new (Anchor())(index);
          tmp0.r3(-(location + 1 | 0) | 0, anchor);
          tmp = anchor;
        } else {
          tmp = tmp0.e1(location);
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'SlotReader');
    SlotReaderClass = $;
  }
  return SlotReaderClass;
}
function find(_this__u8e3s4, index, effectiveSize) {
  _init_properties_SlotTable_kt__9b2e7y();
  var location = search(_this__u8e3s4, index, effectiveSize);
  return location >= 0 ? _this__u8e3s4.e1(location) : null;
}
function search(_this__u8e3s4, location, effectiveSize) {
  _init_properties_SlotTable_kt__9b2e7y();
  var low = 0;
  var high = _this__u8e3s4.c1() - 1 | 0;
  while (low <= high) {
    var mid = (low + high | 0) >>> 1 | 0;
    // Inline function 'kotlin.let' call
    var it = _this__u8e3s4.e1(mid).d6x_1;
    var midVal = it < 0 ? effectiveSize + it | 0 : it;
    var cmp = compareTo(midVal, location);
    if (cmp < 0)
      low = mid + 1 | 0;
    else if (cmp > 0)
      high = mid - 1 | 0;
    else
      return mid;
  }
  return -(low + 1 | 0) | 0;
}
function groupSize(_this__u8e3s4, address) {
  _init_properties_SlotTable_kt__9b2e7y();
  return _this__u8e3s4[imul(address, 5) + 3 | 0];
}
function slotAnchor(_this__u8e3s4, address) {
  _init_properties_SlotTable_kt__9b2e7y();
  // Inline function 'kotlin.let' call
  var slot = imul(address, 5);
  var tmp = _this__u8e3s4[slot + 4 | 0];
  // Inline function 'androidx.compose.runtime.countOneBits' call
  var value = _this__u8e3s4[slot + 1 | 0] >> 28;
  return tmp + countOneBits(value) | 0;
}
function objectKeyIndex(_this__u8e3s4, address) {
  _init_properties_SlotTable_kt__9b2e7y();
  // Inline function 'kotlin.let' call
  var slot = imul(address, 5);
  var tmp = _this__u8e3s4[slot + 4 | 0];
  // Inline function 'androidx.compose.runtime.countOneBits' call
  var value = _this__u8e3s4[slot + 1 | 0] >> 30;
  return tmp + countOneBits(value) | 0;
}
function auxIndex_0(_this__u8e3s4, address) {
  _init_properties_SlotTable_kt__9b2e7y();
  // Inline function 'kotlin.let' call
  var slot = imul(address, 5);
  var tmp;
  if (slot >= _this__u8e3s4.length) {
    tmp = _this__u8e3s4.length;
  } else {
    var tmp_0 = _this__u8e3s4[slot + 4 | 0];
    // Inline function 'androidx.compose.runtime.countOneBits' call
    var value = _this__u8e3s4[slot + 1 | 0] >> 29;
    tmp = tmp_0 + countOneBits(value) | 0;
  }
  return tmp;
}
function validateRead($this) {
  if (!($this.a7b_1.i6m_1 === $this.d7b_1)) {
    throwConcurrentModificationException();
  }
}
var GroupIteratorClass;
function GroupIterator() {
  if (GroupIteratorClass === VOID) {
    class $ {
      constructor(table, start, end) {
        this.a7b_1 = table;
        this.b7b_1 = end;
        this.c7b_1 = start;
        this.d7b_1 = this.a7b_1.i6m_1;
        if (this.a7b_1.h6m_1) {
          throwConcurrentModificationException();
        }
      }
      y() {
        return this.c7b_1 < this.b7b_1;
      }
      z() {
        validateRead(this);
        var group = this.c7b_1;
        this.c7b_1 = this.c7b_1 + groupSize(this.a7b_1.b6m_1, group) | 0;
        return new (SlotTableGroup())(this.a7b_1, group, this.d7b_1);
      }
    }
    initMetadataForClass($, 'GroupIterator');
    GroupIteratorClass = $;
  }
  return GroupIteratorClass;
}
function validateRead_0($this) {
  if (!($this.e7b_1.i6m_1 === $this.g7b_1)) {
    throwConcurrentModificationException();
  }
}
var SlotTableGroupClass;
function SlotTableGroup() {
  if (SlotTableGroupClass === VOID) {
    class $ {
      constructor(table, group, version) {
        version = version === VOID ? table.i6m_1 : version;
        this.e7b_1 = table;
        this.f7b_1 = group;
        this.g7b_1 = version;
      }
      x() {
        validateRead_0(this);
        var tmp0_safe_receiver = this.e7b_1.k79(this.f7b_1);
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = new (SourceInformationGroupIterator())(this.e7b_1, this.f7b_1, tmp0_safe_receiver, new (AnchoredGroupPath())(this.f7b_1));
        }
        var tmp1_elvis_lhs = tmp;
        return tmp1_elvis_lhs == null ? new (GroupIterator())(this.e7b_1, this.f7b_1 + 1 | 0, this.f7b_1 + groupSize(this.e7b_1.b6m_1, this.f7b_1) | 0) : tmp1_elvis_lhs;
      }
    }
    initMetadataForClass($, 'SlotTableGroup');
    SlotTableGroupClass = $;
  }
  return SlotTableGroupClass;
}
function add_0(_this__u8e3s4, key, value) {
  _init_properties_SlotTable_kt__9b2e7y();
  var tmp0_elvis_lhs = _this__u8e3s4.e1(key);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.also' call
    var this_0 = new (MutableIntSet())();
    _this__u8e3s4.p6c(key, this_0);
    tmp = this_0;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  tmp.c6c(value);
}
function initGroup(_this__u8e3s4, address, key, isNode, hasDataKey, hasData, parentAnchor, dataAnchor) {
  _init_properties_SlotTable_kt__9b2e7y();
  var arrayIndex = imul(address, 5);
  _this__u8e3s4[arrayIndex + 0 | 0] = key;
  var tmp = arrayIndex + 1 | 0;
  // Inline function 'androidx.compose.runtime.toBit' call
  var tmp_0 = (isNode ? 1 : 0) << 30;
  // Inline function 'androidx.compose.runtime.toBit' call
  var tmp_1 = tmp_0 | (hasDataKey ? 1 : 0) << 29;
  // Inline function 'androidx.compose.runtime.toBit' call
  _this__u8e3s4[tmp] = tmp_1 | (hasData ? 1 : 0) << 28;
  _this__u8e3s4[arrayIndex + 2 | 0] = parentAnchor;
  _this__u8e3s4[arrayIndex + 3 | 0] = 0;
  _this__u8e3s4[arrayIndex + 4 | 0] = dataAnchor;
}
function updateGroupSize(_this__u8e3s4, address, value) {
  _init_properties_SlotTable_kt__9b2e7y();
  // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
  // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
  var value_0 = value >= 0;
  if (false && !value_0) {
    var tmp$ret$0 = 'Check failed';
    composeImmediateRuntimeError(tmp$ret$0);
  }
  _this__u8e3s4[imul(address, 5) + 3 | 0] = value;
}
function updateNodeCount(_this__u8e3s4, address, value) {
  _init_properties_SlotTable_kt__9b2e7y();
  // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
  // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
  var value_0 = value >= 0 && value < 67108863;
  if (false && !value_0) {
    var tmp$ret$0 = 'Check failed';
    composeImmediateRuntimeError(tmp$ret$0);
  }
  _this__u8e3s4[imul(address, 5) + 1 | 0] = _this__u8e3s4[imul(address, 5) + 1 | 0] & -67108864 | value;
}
function _PrioritySet___init__impl__yrk5ut(list) {
  var tmp;
  if (list === VOID) {
    // Inline function 'androidx.collection.mutableIntListOf' call
    tmp = new (MutableIntList())();
  } else {
    tmp = list;
  }
  list = tmp;
  return list;
}
function _get_list__d9tsa5($this) {
  return $this;
}
function PrioritySet__add_impl_enzb2u($this, value) {
  var tmp;
  // Inline function 'androidx.collection.IntList.isNotEmpty' call
  if (!(_get_list__d9tsa5($this).w6b_1 === 0)) {
    var tmp_0;
    if (_get_list__d9tsa5($this).e1(0) === value) {
      tmp_0 = true;
    } else {
      var tmp_1 = _get_list__d9tsa5($this);
      // Inline function 'androidx.collection.IntList.size' call
      var tmp$ret$1 = _get_list__d9tsa5($this).w6b_1;
      tmp_0 = tmp_1.e1(tmp$ret$1 - 1 | 0) === value;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  if (tmp)
    return Unit_instance;
  // Inline function 'androidx.collection.IntList.size' call
  var index = _get_list__d9tsa5($this).w6b_1;
  _get_list__d9tsa5($this).c6c(value);
  $l$loop: while (index > 0) {
    var parent = ((index + 1 | 0) >>> 1 | 0) - 1 | 0;
    var parentValue = _get_list__d9tsa5($this).e1(parent);
    if (value > parentValue) {
      _get_list__d9tsa5($this).d6c(index, parentValue);
    } else
      break $l$loop;
    index = parent;
  }
  _get_list__d9tsa5($this).d6c(index, value);
}
function PrioritySet__isNotEmpty_impl_q82m5n($this) {
  // Inline function 'androidx.collection.IntList.isNotEmpty' call
  return !(_get_list__d9tsa5($this).w6b_1 === 0);
}
function PrioritySet__peek_impl_la0uk4($this) {
  return _get_list__d9tsa5($this).x6b();
}
function PrioritySet__takeMax_impl_e5irrm($this) {
  // Inline function 'androidx.collection.IntList.size' call
  // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
  var value = _get_list__d9tsa5($this).w6b_1 > 0;
  if (false && !value) {
    var tmp$ret$1 = 'Set is empty';
    composeImmediateRuntimeError(tmp$ret$1);
  }
  var value_0 = _get_list__d9tsa5($this).e1(0);
  $l$loop: while (true) {
    var tmp;
    // Inline function 'androidx.collection.IntList.isNotEmpty' call
    if (!(_get_list__d9tsa5($this).w6b_1 === 0)) {
      tmp = _get_list__d9tsa5($this).e1(0) === value_0;
    } else {
      tmp = false;
    }
    if (!tmp) {
      break $l$loop;
    }
    _get_list__d9tsa5($this).d6c(0, _get_list__d9tsa5($this).y6b());
    var tmp_0 = _get_list__d9tsa5($this);
    // Inline function 'androidx.collection.IntList.size' call
    var tmp$ret$4 = _get_list__d9tsa5($this).w6b_1;
    tmp_0.s3(tmp$ret$4 - 1 | 0);
    var index = 0;
    // Inline function 'androidx.collection.IntList.size' call
    var size = _get_list__d9tsa5($this).w6b_1;
    // Inline function 'androidx.collection.IntList.size' call
    var max = _get_list__d9tsa5($this).w6b_1 >>> 1 | 0;
    $l$loop_2: while (index < max) {
      var indexValue = _get_list__d9tsa5($this).e1(index);
      var left = imul(index + 1 | 0, 2) - 1 | 0;
      var leftValue = _get_list__d9tsa5($this).e1(left);
      var right = imul(index + 1 | 0, 2);
      if (right < size) {
        var rightValue = _get_list__d9tsa5($this).e1(right);
        if (rightValue > leftValue) {
          if (rightValue > indexValue) {
            _get_list__d9tsa5($this).d6c(index, rightValue);
            _get_list__d9tsa5($this).d6c(right, indexValue);
            index = right;
            continue $l$loop_2;
          } else
            break $l$loop_2;
        }
      }
      if (leftValue > indexValue) {
        _get_list__d9tsa5($this).d6c(index, leftValue);
        _get_list__d9tsa5($this).d6c(left, indexValue);
        index = left;
      } else
        break $l$loop_2;
    }
  }
  return value_0;
}
function PrioritySet__toString_impl_tq1jgd($this) {
  return 'PrioritySet(list=' + $this.toString() + ')';
}
function PrioritySet__hashCode_impl_jjwlpw($this) {
  return $this.hashCode();
}
function PrioritySet__equals_impl_fc3ryo($this, other) {
  if (!(other instanceof PrioritySet()))
    return false;
  var tmp0_other_with_cast = other instanceof PrioritySet() ? other.z79_1 : THROW_CCE();
  if (!$this.equals(tmp0_other_with_cast))
    return false;
  return true;
}
var PrioritySetClass;
function PrioritySet() {
  if (PrioritySetClass === VOID) {
    class $ {
      constructor(list) {
        this.z79_1 = list;
      }
      toString() {
        return PrioritySet__toString_impl_tq1jgd(this.z79_1);
      }
      hashCode() {
        return PrioritySet__hashCode_impl_jjwlpw(this.z79_1);
      }
      equals(other) {
        return PrioritySet__equals_impl_fc3ryo(this.z79_1, other);
      }
    }
    initMetadataForClass($, 'PrioritySet');
    PrioritySetClass = $;
  }
  return PrioritySetClass;
}
function locationOf(_this__u8e3s4, index, effectiveSize) {
  _init_properties_SlotTable_kt__9b2e7y();
  // Inline function 'kotlin.let' call
  var it = search(_this__u8e3s4, index, effectiveSize);
  return it >= 0 ? it : -(it + 1 | 0) | 0;
}
function updateMark(_this__u8e3s4, address, value) {
  _init_properties_SlotTable_kt__9b2e7y();
  var arrayIndex = imul(address, 5) + 1 | 0;
  var element = _this__u8e3s4[arrayIndex];
  var tmp = element & -134217729;
  // Inline function 'androidx.compose.runtime.toBit' call
  _this__u8e3s4[arrayIndex] = tmp | (value ? 1 : 0) << 27;
}
function updateContainsMark_0(_this__u8e3s4, address, value) {
  _init_properties_SlotTable_kt__9b2e7y();
  var arrayIndex = imul(address, 5) + 1 | 0;
  var element = _this__u8e3s4[arrayIndex];
  var tmp = element & -67108865;
  // Inline function 'androidx.compose.runtime.toBit' call
  _this__u8e3s4[arrayIndex] = tmp | (value ? 1 : 0) << 26;
}
var KeyInfoClass;
function KeyInfo() {
  if (KeyInfoClass === VOID) {
    class $ {
      constructor(key, objectKey, location, nodes, index) {
        this.p6q_1 = key;
        this.q6q_1 = objectKey;
        this.r6q_1 = location;
        this.s6q_1 = nodes;
        this.t6q_1 = index;
      }
    }
    initMetadataForClass($, 'KeyInfo');
    KeyInfoClass = $;
  }
  return KeyInfoClass;
}
function throwConcurrentModificationException() {
  _init_properties_SlotTable_kt__9b2e7y();
  throw ConcurrentModificationException().rb();
}
var SourceInformationGroupIteratorClass;
function SourceInformationGroupIterator() {
  if (SourceInformationGroupIteratorClass === VOID) {
    class $ {
      constructor(table, parent, group, path) {
        this.h7b_1 = table;
        this.i7b_1 = parent;
        this.j7b_1 = group;
        this.k7b_1 = path;
        this.l7b_1 = this.h7b_1.i6m_1;
        this.m7b_1 = 0;
      }
      y() {
        var tmp0_safe_receiver = this.j7b_1.p79_1;
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = this.m7b_1 < tmp0_safe_receiver.c1();
        }
        var tmp1_elvis_lhs = tmp;
        return tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
      }
      z() {
        var tmp0_safe_receiver = this.j7b_1.p79_1;
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          var _unary__edvuaz = this.m7b_1;
          this.m7b_1 = _unary__edvuaz + 1 | 0;
          tmp = tmp0_safe_receiver.e1(_unary__edvuaz);
        }
        var group = tmp;
        var tmp_0;
        if (group instanceof Anchor()) {
          tmp_0 = new (SlotTableGroup())(this.h7b_1, group.d6x_1, this.l7b_1);
        } else {
          if (group instanceof GroupSourceInformation()) {
            tmp_0 = new (SourceInformationSlotTableGroup())(this.h7b_1, this.i7b_1, group, new (RelativeGroupPath())(this.k7b_1, this.m7b_1 - 1 | 0));
          } else {
            composeRuntimeError('Unexpected group information structure');
          }
        }
        return tmp_0;
      }
    }
    initMetadataForClass($, 'SourceInformationGroupIterator');
    SourceInformationGroupIteratorClass = $;
  }
  return SourceInformationGroupIteratorClass;
}
var AnchoredGroupPathClass;
function AnchoredGroupPath() {
  if (AnchoredGroupPathClass === VOID) {
    class $ extends SourceInformationGroupPath() {
      constructor(group) {
        super();
        this.n7b_1 = group;
      }
    }
    initMetadataForClass($, 'AnchoredGroupPath');
    AnchoredGroupPathClass = $;
  }
  return AnchoredGroupPathClass;
}
var SourceInformationGroupPathClass;
function SourceInformationGroupPath() {
  if (SourceInformationGroupPathClass === VOID) {
    class $ {}
    initMetadataForClass($, 'SourceInformationGroupPath');
    SourceInformationGroupPathClass = $;
  }
  return SourceInformationGroupPathClass;
}
var SourceInformationSlotTableGroupClass;
function SourceInformationSlotTableGroup() {
  if (SourceInformationSlotTableGroupClass === VOID) {
    class $ {
      constructor(table, parent, sourceInformation, identityPath) {
        this.o7b_1 = table;
        this.p7b_1 = parent;
        this.q7b_1 = sourceInformation;
        this.r7b_1 = identityPath;
        this.s7b_1 = this.q7b_1.m79_1;
        this.t7b_1 = this;
      }
      x() {
        return new (SourceInformationGroupIterator())(this.o7b_1, this.p7b_1, this.q7b_1, this.r7b_1);
      }
    }
    initMetadataForClass($, 'SourceInformationSlotTableGroup');
    SourceInformationSlotTableGroupClass = $;
  }
  return SourceInformationSlotTableGroupClass;
}
var RelativeGroupPathClass;
function RelativeGroupPath() {
  if (RelativeGroupPathClass === VOID) {
    class $ extends SourceInformationGroupPath() {
      constructor(parent, index) {
        super();
        this.u7b_1 = parent;
        this.v7b_1 = index;
      }
    }
    initMetadataForClass($, 'RelativeGroupPath');
    RelativeGroupPathClass = $;
  }
  return RelativeGroupPathClass;
}
var properties_initialized_SlotTable_kt_ohxdls;
function _init_properties_SlotTable_kt__9b2e7y() {
  if (!properties_initialized_SlotTable_kt_ohxdls) {
    properties_initialized_SlotTable_kt_ohxdls = true;
    EmptyLongArray = longArray(0);
    androidx_compose_runtime_SlotTable$stable = 8;
    androidx_compose_runtime_Anchor$stable = 8;
    androidx_compose_runtime_GroupSourceInformation$stable = 8;
    androidx_compose_runtime_SlotReader$stable = 8;
    androidx_compose_runtime_KeyInfo$stable = 8;
    androidx_compose_runtime_SlotWriter$stable = 8;
    androidx_compose_runtime_BitVector$stable = 8;
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  KeyInfo as KeyInfo1sjyiqix42mzk,
  SlotTable as SlotTable22ouf15arae6t,
  access$dataIndexToDataAddress as access$dataIndexToDataAddress15xkqvecujrho,
  access$dataIndex as access$dataIndex10t1uyhtsflmv,
  access$groupIndexToAddress as access$groupIndexToAddress2hk3jxef5y37j,
  access$_get_groups__7d4n3r as access$_get_groups__7d4n3r3l38bg2kzbe2y,
  access$_get_slots__7x4q9w as access$_get_slots__7x4q9w3qy38elwcr3sh,
};
//endregion

//# sourceMappingURL=SlotTable.mjs.map
