import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  Char19o2r8palgjof as Char,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import {
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Collection1k04j3hzsbod0 as Collection } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function build($this, resultList, from, maxLength, idx, length, charAt) {
  // Inline function 'kotlin.collections.groupBy' call
  // Inline function 'kotlin.collections.groupByTo' call
  var destination = LinkedHashMap().sc();
  var _iterator__ex2g4s = from.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var key = charAt(element, idx);
    // Inline function 'kotlin.collections.getOrPut' call
    var value = destination.j3(key);
    var tmp;
    if (value == null) {
      var answer = ArrayList().g1();
      destination.t3(key, answer);
      tmp = answer;
    } else {
      tmp = value;
    }
    var list = tmp;
    list.i(element);
  }
  // Inline function 'kotlin.collections.forEach' call
  // Inline function 'kotlin.collections.iterator' call
  var _iterator__ex2g4s_0 = destination.t1().x();
  while (_iterator__ex2g4s_0.y()) {
    var element_0 = _iterator__ex2g4s_0.z();
    // Inline function 'kotlin.collections.component1' call
    var ch = element_0.u1().r2_1;
    // Inline function 'kotlin.collections.component2' call
    var list_0 = element_0.v1();
    var nextIdx = idx + 1 | 0;
    var children = ArrayList().g1();
    var tmp_0 = Companion_instance;
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_0 = ArrayList().g1();
    var _iterator__ex2g4s_1 = list_0.x();
    while (_iterator__ex2g4s_1.y()) {
      var element_1 = _iterator__ex2g4s_1.z();
      if (length(element_1) > nextIdx) {
        destination_0.i(element_1);
      }
    }
    build(tmp_0, children, destination_0, maxLength, nextIdx, length, charAt);
    children.q8();
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_1 = ArrayList().g1();
    var _iterator__ex2g4s_2 = list_0.x();
    while (_iterator__ex2g4s_2.y()) {
      var element_2 = _iterator__ex2g4s_2.z();
      if (length(element_2) === nextIdx) {
        destination_1.i(element_2);
      }
    }
    resultList.i(new (Node())(ch, destination_1, children));
  }
}
function AsciiCharTree$Companion$build$lambda(it) {
  return charSequenceLength(it);
}
function AsciiCharTree$Companion$build$lambda_0(s, idx) {
  return new (Char())(charSequenceGet(s, idx));
}
var NodeClass;
function Node() {
  if (NodeClass === VOID) {
    class $ {
      constructor(ch, exact, children) {
        this.y48_1 = ch;
        this.z48_1 = exact;
        this.a49_1 = children;
        var tmp = this;
        var tmp_0 = 0;
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp_1 = Array(256);
        while (tmp_0 < 256) {
          var tmp_2 = tmp_0;
          var tmp0 = this.a49_1;
          var tmp$ret$3;
          $l$block_0: {
            // Inline function 'kotlin.collections.singleOrNull' call
            var single = null;
            var found = false;
            var _iterator__ex2g4s = tmp0.x();
            while (_iterator__ex2g4s.y()) {
              var element = _iterator__ex2g4s.z();
              // Inline function 'kotlin.code' call
              var this_0 = element.y48_1;
              if (Char__toInt_impl_vasixd(this_0) === tmp_2) {
                if (found) {
                  tmp$ret$3 = null;
                  break $l$block_0;
                }
                single = element;
                found = true;
              }
            }
            if (!found) {
              tmp$ret$3 = null;
              break $l$block_0;
            }
            tmp$ret$3 = single;
          }
          tmp_1[tmp_2] = tmp$ret$3;
          tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.b49_1 = tmp_1;
      }
    }
    initMetadataForClass($, 'Node');
    NodeClass = $;
  }
  return NodeClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      k45(from) {
        var tmp = AsciiCharTree$Companion$build$lambda;
        return this.c49(from, tmp, AsciiCharTree$Companion$build$lambda_0);
      }
      c49(from, length, charAt) {
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.maxByOrNull' call
          var iterator = from.x();
          if (!iterator.y()) {
            tmp$ret$0 = null;
            break $l$block_0;
          }
          var maxElem = iterator.z();
          if (!iterator.y()) {
            tmp$ret$0 = maxElem;
            break $l$block_0;
          }
          var maxValue = length(maxElem);
          do {
            var e = iterator.z();
            var v = length(e);
            if (compareTo(maxValue, v) < 0) {
              maxElem = e;
              maxValue = v;
            }
          }
           while (iterator.y());
          tmp$ret$0 = maxElem;
        }
        var tmp0_safe_receiver = tmp$ret$0;
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = length(tmp0_safe_receiver);
        }
        var tmp1_elvis_lhs = tmp;
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          throw NoSuchElementException().m('Unable to build char tree from an empty list');
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        var maxLen = tmp_0;
        var tmp$ret$2;
        $l$block_2: {
          // Inline function 'kotlin.collections.any' call
          var tmp_1;
          if (isInterface(from, Collection())) {
            tmp_1 = from.h1();
          } else {
            tmp_1 = false;
          }
          if (tmp_1) {
            tmp$ret$2 = false;
            break $l$block_2;
          }
          var _iterator__ex2g4s = from.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (length(element) === 0) {
              tmp$ret$2 = true;
              break $l$block_2;
            }
          }
          tmp$ret$2 = false;
        }
        if (tmp$ret$2)
          throw IllegalArgumentException().q('There should be no empty entries');
        var root = ArrayList().g1();
        build(this, root, from, maxLen, 0, length, charAt);
        root.q8();
        return new (AsciiCharTree())(new (Node())(_Char___init__impl__6a9atx(0), emptyList(), root));
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var AsciiCharTreeClass;
function AsciiCharTree() {
  if (AsciiCharTreeClass === VOID) {
    class $ {
      constructor(root) {
        this.d49_1 = root;
      }
    }
    initMetadataForClass($, 'AsciiCharTree');
    AsciiCharTreeClass = $;
  }
  return AsciiCharTreeClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instance221g6q0tngtzz,
};
//endregion

//# sourceMappingURL=AsciiCharTree.mjs.map
