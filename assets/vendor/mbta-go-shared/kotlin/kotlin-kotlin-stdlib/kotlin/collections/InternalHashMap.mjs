import {
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
  coerceAtMost322komnqp70ag as coerceAtMost,
} from '../ranges/_Ranges.mjs';
import { takeHighestOneBit9p7rdtda63bc as takeHighestOneBit } from '../NumbersJs.mjs';
import {
  ConcurrentModificationException3974vl9oonkcj as ConcurrentModificationException,
  RuntimeException1r3t0zl97011n as RuntimeException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException,
} from '../exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { Companion_instanceovl8he3jiijf as Companion_instance } from './AbstractList.mjs';
import {
  copyOfUninitializedElements3uqjltwtgc0ej as copyOfUninitializedElements,
  arrayOfUninitializedElementsg6b068zrcm8j as arrayOfUninitializedElements,
  resetRangeiqi6axdujnmn as resetRange,
  resetAt1d0jjdeh7nn7m as resetAt,
} from './ArrayFunctions.mjs';
import { copyOf3rutauicler23 as copyOf } from './_ArraysJs.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
  createThis2j2avj17cvnv2 as createThis,
  protoOf180f3jzyo7rfj as protoOf,
} from '../js/coreRuntime.mjs';
import {
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../hacks.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../Char.mjs';
import {
  Entry2xmjmyutzoq3p as Entry,
  KtMap140uvy3s5zad8 as KtMap,
} from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../Library.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../text/StringBuilderJs.mjs';
import {
  containsAllEntries1q58uduc9e3y6 as containsAllEntries,
  InternalMap26d9hvxb47nvz as InternalMap,
} from './InternalMap.mjs';
//region block: imports
var imul = Math.imul;
var clz32 = Math.clz32;
//endregion
//region block: pre-declaration
//endregion
function computeHashSize($this, capacity) {
  return takeHighestOneBit(imul(coerceAtLeast(capacity, 1), 3));
}
function computeShift($this, hashSize) {
  // Inline function 'kotlin.countLeadingZeroBits' call
  return clz32(hashSize) + 1 | 0;
}
function checkForComodification($this) {
  if (!($this.cb_1.i9_1 === $this.eb_1))
    throw ConcurrentModificationException().bb('The backing map has been modified after this entry was obtained.');
}
function _get_capacity__a9k9f3($this) {
  return $this.b9_1.length;
}
function _get_hashSize__tftcho($this) {
  return $this.e9_1.length;
}
function registerModification($this) {
  $this.i9_1 = $this.i9_1 + 1 | 0;
}
function ensureExtraCapacity($this, n) {
  if (shouldCompact($this, n)) {
    compact($this, true);
  } else {
    ensureCapacity($this, $this.g9_1 + n | 0);
  }
}
function shouldCompact($this, extraCapacity) {
  var spareCapacity = _get_capacity__a9k9f3($this) - $this.g9_1 | 0;
  var gaps = $this.g9_1 - $this.c1() | 0;
  return spareCapacity < extraCapacity && (gaps + spareCapacity | 0) >= extraCapacity && gaps >= (_get_capacity__a9k9f3($this) / 4 | 0);
}
function ensureCapacity($this, minCapacity) {
  if (minCapacity < 0)
    throw RuntimeException().fb('too many elements');
  if (minCapacity > _get_capacity__a9k9f3($this)) {
    var newSize = Companion_instance.gb(_get_capacity__a9k9f3($this), minCapacity);
    $this.b9_1 = copyOfUninitializedElements($this.b9_1, newSize);
    var tmp = $this;
    var tmp0_safe_receiver = $this.c9_1;
    tmp.c9_1 = tmp0_safe_receiver == null ? null : copyOfUninitializedElements(tmp0_safe_receiver, newSize);
    $this.d9_1 = copyOf($this.d9_1, newSize);
    var newHashSize = computeHashSize(Companion_instance_0, newSize);
    if (newHashSize > _get_hashSize__tftcho($this)) {
      rehash($this, newHashSize);
    }
  }
}
function allocateValuesArray($this) {
  var curValuesArray = $this.c9_1;
  if (!(curValuesArray == null))
    return curValuesArray;
  var newValuesArray = arrayOfUninitializedElements(_get_capacity__a9k9f3($this));
  $this.c9_1 = newValuesArray;
  return newValuesArray;
}
function hash($this, key) {
  return key == null ? 0 : imul(hashCode(key), -1640531527) >>> $this.h9_1 | 0;
}
function compact($this, updateHashArray) {
  var i = 0;
  var j = 0;
  var valuesArray = $this.c9_1;
  while (i < $this.g9_1) {
    var hash = $this.d9_1[i];
    if (hash >= 0) {
      $this.b9_1[j] = $this.b9_1[i];
      if (!(valuesArray == null)) {
        valuesArray[j] = valuesArray[i];
      }
      if (updateHashArray) {
        $this.d9_1[j] = hash;
        $this.e9_1[hash] = j + 1 | 0;
      }
      j = j + 1 | 0;
    }
    i = i + 1 | 0;
  }
  resetRange($this.b9_1, j, $this.g9_1);
  if (valuesArray == null)
    null;
  else {
    resetRange(valuesArray, j, $this.g9_1);
  }
  $this.g9_1 = j;
}
function rehash($this, newHashSize) {
  registerModification($this);
  if ($this.g9_1 > $this.j9_1) {
    compact($this, false);
  }
  $this.e9_1 = new Int32Array(newHashSize);
  $this.h9_1 = computeShift(Companion_instance_0, newHashSize);
  var i = 0;
  while (i < $this.g9_1) {
    var _unary__edvuaz = i;
    i = _unary__edvuaz + 1 | 0;
    if (!putRehash($this, _unary__edvuaz)) {
      throw IllegalStateException().o5('This cannot happen with fixed magic multiplier and grow-only hash array. Have object hashCodes changed?');
    }
  }
}
function putRehash($this, i) {
  var hash_0 = hash($this, $this.b9_1[i]);
  var probesLeft = $this.f9_1;
  while (true) {
    var index = $this.e9_1[hash_0];
    if (index === 0) {
      $this.e9_1[hash_0] = i + 1 | 0;
      $this.d9_1[i] = hash_0;
      return true;
    }
    probesLeft = probesLeft - 1 | 0;
    if (probesLeft < 0)
      return false;
    var _unary__edvuaz = hash_0;
    hash_0 = _unary__edvuaz - 1 | 0;
    if (_unary__edvuaz === 0)
      hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
  }
}
function findKey($this, key) {
  var hash_0 = hash($this, key);
  var probesLeft = $this.f9_1;
  while (true) {
    var index = $this.e9_1[hash_0];
    if (index === 0)
      return -1;
    if (index > 0 && equals($this.b9_1[index - 1 | 0], key))
      return index - 1 | 0;
    probesLeft = probesLeft - 1 | 0;
    if (probesLeft < 0)
      return -1;
    var _unary__edvuaz = hash_0;
    hash_0 = _unary__edvuaz - 1 | 0;
    if (_unary__edvuaz === 0)
      hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
  }
}
function findValue($this, value) {
  var i = $this.g9_1;
  $l$loop: while (true) {
    i = i - 1 | 0;
    if (!(i >= 0)) {
      break $l$loop;
    }
    if ($this.d9_1[i] >= 0 && equals(ensureNotNull($this.c9_1)[i], value))
      return i;
  }
  return -1;
}
function addKey($this, key) {
  $this.aa();
  retry: while (true) {
    var hash_0 = hash($this, key);
    var tentativeMaxProbeDistance = coerceAtMost(imul($this.f9_1, 2), _get_hashSize__tftcho($this) / 2 | 0);
    var probeDistance = 0;
    while (true) {
      var index = $this.e9_1[hash_0];
      if (index <= 0) {
        if ($this.g9_1 >= _get_capacity__a9k9f3($this)) {
          ensureExtraCapacity($this, 1);
          continue retry;
        }
        var _unary__edvuaz = $this.g9_1;
        $this.g9_1 = _unary__edvuaz + 1 | 0;
        var putIndex = _unary__edvuaz;
        $this.b9_1[putIndex] = key;
        $this.d9_1[putIndex] = hash_0;
        $this.e9_1[hash_0] = putIndex + 1 | 0;
        $this.j9_1 = $this.j9_1 + 1 | 0;
        registerModification($this);
        if (probeDistance > $this.f9_1)
          $this.f9_1 = probeDistance;
        return putIndex;
      }
      if (equals($this.b9_1[index - 1 | 0], key)) {
        return -index | 0;
      }
      probeDistance = probeDistance + 1 | 0;
      if (probeDistance > tentativeMaxProbeDistance) {
        rehash($this, imul(_get_hashSize__tftcho($this), 2));
        continue retry;
      }
      var _unary__edvuaz_0 = hash_0;
      hash_0 = _unary__edvuaz_0 - 1 | 0;
      if (_unary__edvuaz_0 === 0)
        hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
    }
  }
}
function removeEntryAt($this, index) {
  resetAt($this.b9_1, index);
  var tmp0_safe_receiver = $this.c9_1;
  if (tmp0_safe_receiver == null)
    null;
  else {
    resetAt(tmp0_safe_receiver, index);
  }
  removeHashAt($this, $this.d9_1[index]);
  $this.d9_1[index] = -1;
  $this.j9_1 = $this.j9_1 - 1 | 0;
  registerModification($this);
}
function removeHashAt($this, removedHash) {
  var hash_0 = removedHash;
  var hole = removedHash;
  var probeDistance = 0;
  var patchAttemptsLeft = coerceAtMost(imul($this.f9_1, 2), _get_hashSize__tftcho($this) / 2 | 0);
  while (true) {
    var _unary__edvuaz = hash_0;
    hash_0 = _unary__edvuaz - 1 | 0;
    if (_unary__edvuaz === 0)
      hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
    probeDistance = probeDistance + 1 | 0;
    if (probeDistance > $this.f9_1) {
      $this.e9_1[hole] = 0;
      return Unit_instance;
    }
    var index = $this.e9_1[hash_0];
    if (index === 0) {
      $this.e9_1[hole] = 0;
      return Unit_instance;
    }
    if (index < 0) {
      $this.e9_1[hole] = -1;
      hole = hash_0;
      probeDistance = 0;
    } else {
      var otherHash = hash($this, $this.b9_1[index - 1 | 0]);
      if (((otherHash - hash_0 | 0) & (_get_hashSize__tftcho($this) - 1 | 0)) >= probeDistance) {
        $this.e9_1[hole] = index;
        $this.d9_1[index - 1 | 0] = hole;
        hole = hash_0;
        probeDistance = 0;
      }
    }
    patchAttemptsLeft = patchAttemptsLeft - 1 | 0;
    if (patchAttemptsLeft < 0) {
      $this.e9_1[hole] = -1;
      return Unit_instance;
    }
  }
}
function contentEquals($this, other) {
  return $this.j9_1 === other.c1() && $this.pa(other.t1());
}
function putEntry($this, entry) {
  var index = addKey($this, entry.u1());
  var valuesArray = allocateValuesArray($this);
  if (index >= 0) {
    valuesArray[index] = entry.v1();
    return true;
  }
  var oldValue = valuesArray[(-index | 0) - 1 | 0];
  if (!equals(entry.v1(), oldValue)) {
    valuesArray[(-index | 0) - 1 | 0] = entry.v1();
    return true;
  }
  return false;
}
function putAllEntries($this, from) {
  if (from.h1())
    return false;
  ensureExtraCapacity($this, from.c1());
  var it = from.x();
  var updated = false;
  while (it.y()) {
    if (putEntry($this, it.z()))
      updated = true;
  }
  return updated;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        this.hb_1 = -1640531527;
        this.ib_1 = 8;
        this.jb_1 = 2;
        this.kb_1 = -1;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance_0;
function Companion_getInstance() {
  return Companion_instance_0;
}
var ItrClass;
function Itr() {
  if (ItrClass === VOID) {
    class $ {
      constructor(map) {
        this.lb_1 = map;
        this.mb_1 = 0;
        this.nb_1 = -1;
        this.ob_1 = this.lb_1.i9_1;
        this.pb();
      }
      pb() {
        while (this.mb_1 < this.lb_1.g9_1 && this.lb_1.d9_1[this.mb_1] < 0) {
          this.mb_1 = this.mb_1 + 1 | 0;
        }
      }
      y() {
        return this.mb_1 < this.lb_1.g9_1;
      }
      z6() {
        this.qb();
        // Inline function 'kotlin.check' call
        if (!!(this.nb_1 === -1)) {
          var message = 'Call next() before removing element from the iterator.';
          throw IllegalStateException().o5(toString(message));
        }
        this.lb_1.aa();
        removeEntryAt(this.lb_1, this.nb_1);
        this.nb_1 = -1;
        this.ob_1 = this.lb_1.i9_1;
      }
      qb() {
        if (!(this.lb_1.i9_1 === this.ob_1))
          throw ConcurrentModificationException().rb();
      }
    }
    initMetadataForClass($, 'Itr');
    ItrClass = $;
  }
  return ItrClass;
}
var KeysItrClass;
function KeysItr() {
  if (KeysItrClass === VOID) {
    class $ extends Itr() {
      z() {
        this.qb();
        if (this.mb_1 >= this.lb_1.g9_1)
          throw NoSuchElementException().m1();
        var tmp = this;
        var _unary__edvuaz = this.mb_1;
        this.mb_1 = _unary__edvuaz + 1 | 0;
        tmp.nb_1 = _unary__edvuaz;
        var result = this.lb_1.b9_1[this.nb_1];
        this.pb();
        return result;
      }
    }
    initMetadataForClass($, 'KeysItr');
    KeysItrClass = $;
  }
  return KeysItrClass;
}
var ValuesItrClass;
function ValuesItr() {
  if (ValuesItrClass === VOID) {
    class $ extends Itr() {
      z() {
        this.qb();
        if (this.mb_1 >= this.lb_1.g9_1)
          throw NoSuchElementException().m1();
        var tmp = this;
        var _unary__edvuaz = this.mb_1;
        this.mb_1 = _unary__edvuaz + 1 | 0;
        tmp.nb_1 = _unary__edvuaz;
        var result = ensureNotNull(this.lb_1.c9_1)[this.nb_1];
        this.pb();
        return result;
      }
    }
    initMetadataForClass($, 'ValuesItr');
    ValuesItrClass = $;
  }
  return ValuesItrClass;
}
var EntriesItrClass;
function EntriesItr() {
  if (EntriesItrClass === VOID) {
    class $ extends Itr() {
      z() {
        this.qb();
        if (this.mb_1 >= this.lb_1.g9_1)
          throw NoSuchElementException().m1();
        var tmp = this;
        var _unary__edvuaz = this.mb_1;
        this.mb_1 = _unary__edvuaz + 1 | 0;
        tmp.nb_1 = _unary__edvuaz;
        var result = new (EntryRef())(this.lb_1, this.nb_1);
        this.pb();
        return result;
      }
      ec() {
        if (this.mb_1 >= this.lb_1.g9_1)
          throw NoSuchElementException().m1();
        var tmp = this;
        var _unary__edvuaz = this.mb_1;
        this.mb_1 = _unary__edvuaz + 1 | 0;
        tmp.nb_1 = _unary__edvuaz;
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver = this.lb_1.b9_1[this.nb_1];
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
        var tmp_0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver_0 = ensureNotNull(this.lb_1.c9_1)[this.nb_1];
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
        var result = tmp_0 ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
        this.pb();
        return result;
      }
      fc(sb) {
        if (this.mb_1 >= this.lb_1.g9_1)
          throw NoSuchElementException().m1();
        var tmp = this;
        var _unary__edvuaz = this.mb_1;
        this.mb_1 = _unary__edvuaz + 1 | 0;
        tmp.nb_1 = _unary__edvuaz;
        var key = this.lb_1.b9_1[this.nb_1];
        if (equals(key, this.lb_1))
          sb.hc('(this Map)');
        else
          sb.gc(key);
        sb.ic(_Char___init__impl__6a9atx(61));
        var value = ensureNotNull(this.lb_1.c9_1)[this.nb_1];
        if (equals(value, this.lb_1))
          sb.hc('(this Map)');
        else
          sb.gc(value);
        this.pb();
      }
    }
    initMetadataForClass($, 'EntriesItr');
    EntriesItrClass = $;
  }
  return EntriesItrClass;
}
var EntryRefClass;
function EntryRef() {
  if (EntryRefClass === VOID) {
    class $ {
      constructor(map, index) {
        this.cb_1 = map;
        this.db_1 = index;
        this.eb_1 = this.cb_1.i9_1;
      }
      u1() {
        checkForComodification(this);
        return this.cb_1.b9_1[this.db_1];
      }
      v1() {
        checkForComodification(this);
        return ensureNotNull(this.cb_1.c9_1)[this.db_1];
      }
      equals(other) {
        var tmp;
        var tmp_0;
        if (!(other == null) ? isInterface(other, Entry()) : false) {
          tmp_0 = equals(other.u1(), this.u1());
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = equals(other.v1(), this.v1());
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver = this.u1();
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
        var tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver_0 = this.v1();
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
        return tmp ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
      }
      toString() {
        return toString_0(this.u1()) + '=' + toString_0(this.v1());
      }
    }
    initMetadataForClass($, 'EntryRef', VOID, VOID, [Entry()]);
    EntryRefClass = $;
  }
  return EntryRefClass;
}
var InternalHashMapClass;
function InternalHashMap() {
  if (InternalHashMapClass === VOID) {
    class $ {
      static jc(keysArray, valuesArray, presenceArray, hashArray, maxProbeDistance, length) {
        var $this = createThis(this);
        $this.b9_1 = keysArray;
        $this.c9_1 = valuesArray;
        $this.d9_1 = presenceArray;
        $this.e9_1 = hashArray;
        $this.f9_1 = maxProbeDistance;
        $this.g9_1 = length;
        $this.h9_1 = computeShift(Companion_instance_0, _get_hashSize__tftcho($this));
        $this.i9_1 = 0;
        $this.j9_1 = 0;
        $this.k9_1 = false;
        return $this;
      }
      c1() {
        return this.j9_1;
      }
      static l9() {
        return this.wa(8);
      }
      static wa(initialCapacity) {
        return this.jc(arrayOfUninitializedElements(initialCapacity), null, new Int32Array(initialCapacity), new Int32Array(computeHashSize(Companion_instance_0, initialCapacity)), 2, 0);
      }
      static q9(original) {
        var $this = this.wa(original.c1());
        $this.v3(original);
        return $this;
      }
      static n9(initialCapacity, loadFactor) {
        var $this = this.wa(initialCapacity);
        // Inline function 'kotlin.require' call
        if (!(loadFactor > 0)) {
          var message = 'Non-positive load factor: ' + loadFactor;
          throw IllegalArgumentException().q(toString(message));
        }
        return $this;
      }
      i3(value) {
        return findValue(this, value) >= 0;
      }
      j3(key) {
        var index = findKey(this, key);
        if (index < 0)
          return null;
        return ensureNotNull(this.c9_1)[index];
      }
      r9(key) {
        return findKey(this, key) >= 0;
      }
      t3(key, value) {
        var index = addKey(this, key);
        var valuesArray = allocateValuesArray(this);
        if (index < 0) {
          var oldValue = valuesArray[(-index | 0) - 1 | 0];
          valuesArray[(-index | 0) - 1 | 0] = value;
          return oldValue;
        } else {
          valuesArray[index] = value;
          return null;
        }
      }
      v3(from) {
        this.aa();
        putAllEntries(this, from.t1());
      }
      u3(key) {
        this.aa();
        var index = findKey(this, key);
        if (index < 0)
          return null;
        var oldValue = ensureNotNull(this.c9_1)[index];
        removeEntryAt(this, index);
        return oldValue;
      }
      p3() {
        this.aa();
        var inductionVariable = 0;
        var last = this.g9_1 - 1 | 0;
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var hash = this.d9_1[i];
            if (hash >= 0) {
              this.e9_1[hash] = 0;
              this.d9_1[i] = -1;
            }
          }
           while (!(i === last));
        resetRange(this.b9_1, 0, this.g9_1);
        var tmp0_safe_receiver = this.c9_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          resetRange(tmp0_safe_receiver, 0, this.g9_1);
        }
        this.j9_1 = 0;
        this.g9_1 = 0;
        registerModification(this);
      }
      equals(other) {
        var tmp;
        if (other === this) {
          tmp = true;
        } else {
          var tmp_0;
          if (!(other == null) ? isInterface(other, KtMap()) : false) {
            tmp_0 = contentEquals(this, other);
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      hashCode() {
        var result = 0;
        var it = this.ja();
        while (it.y()) {
          result = result + it.ec() | 0;
        }
        return result;
      }
      toString() {
        var sb = StringBuilder().kc(2 + imul(this.j9_1, 3) | 0);
        sb.hc('{');
        var i = 0;
        var it = this.ja();
        while (it.y()) {
          if (i > 0) {
            sb.hc(', ');
          }
          it.fc(sb);
          i = i + 1 | 0;
        }
        sb.hc('}');
        return sb.toString();
      }
      aa() {
        if (this.k9_1)
          throw UnsupportedOperationException().i5();
      }
      y9(key) {
        this.aa();
        var index = findKey(this, key);
        if (index < 0)
          return false;
        removeEntryAt(this, index);
        return true;
      }
      na(entry) {
        var index = findKey(this, entry.u1());
        if (index < 0)
          return false;
        return equals(ensureNotNull(this.c9_1)[index], entry.v1());
      }
      lc(entry) {
        return this.na(isInterface(entry, Entry()) ? entry : THROW_CCE());
      }
      oa(entry) {
        this.aa();
        var index = findKey(this, entry.u1());
        if (index < 0)
          return false;
        if (!equals(ensureNotNull(this.c9_1)[index], entry.v1()))
          return false;
        removeEntryAt(this, index);
        return true;
      }
      ga(value) {
        this.aa();
        var index = findValue(this, value);
        if (index < 0)
          return false;
        removeEntryAt(this, index);
        return true;
      }
      z9() {
        return new (KeysItr())(this);
      }
      ea() {
        return new (ValuesItr())(this);
      }
      ja() {
        return new (EntriesItr())(this);
      }
    }
    protoOf($).pa = containsAllEntries;
    initMetadataForClass($, 'InternalHashMap', $.l9, VOID, [InternalMap()]);
    InternalHashMapClass = $;
  }
  return InternalHashMapClass;
}
//region block: init
Companion_instance_0 = new (Companion())();
//endregion
//region block: exports
export {
  InternalHashMap as InternalHashMapmpvpylj0ut6l,
};
//endregion

//# sourceMappingURL=InternalHashMap.mjs.map
