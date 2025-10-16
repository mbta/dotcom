import {
  TransformingSequence3gzv034v2j93f as TransformingSequence,
  FlatteningSequence1gb46kmahgjp0 as FlatteningSequence,
} from './Sequences.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../collections/Sets.mjs';
import {
  setOf1u3mizs95ngxo as setOf,
  listOfvhqybd2zx248 as listOf,
} from '../collections/collectionJs.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../collections/LinkedHashSet.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../collections/CollectionsKt.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../collections/ArrayListJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function map(_this__u8e3s4, transform) {
  return new (TransformingSequence())(_this__u8e3s4, transform);
}
function toSet(_this__u8e3s4) {
  var it = _this__u8e3s4.x();
  if (!it.y())
    return emptySet();
  var element = it.z();
  if (!it.y())
    return setOf(element);
  var dst = LinkedHashSet().f1();
  dst.i(element);
  while (it.y()) {
    dst.i(it.z());
  }
  return dst;
}
function flatMap(_this__u8e3s4, transform) {
  return new (FlatteningSequence())(_this__u8e3s4, transform, Iterable$iterator$ref());
}
function toList(_this__u8e3s4) {
  var it = _this__u8e3s4.x();
  if (!it.y())
    return emptyList();
  var element = it.z();
  if (!it.y())
    return listOf(element);
  var dst = ArrayList().g1();
  dst.i(element);
  while (it.y()) {
    dst.i(it.z());
  }
  return dst;
}
function asIterable(_this__u8e3s4) {
  // Inline function 'kotlin.collections.Iterable' call
  return new (asIterable$$inlined$Iterable$1())(_this__u8e3s4);
}
function Iterable$iterator$ref() {
  var l = function (p0) {
    return p0.x();
  };
  l.callableName = 'iterator';
  return l;
}
var asIterable$$inlined$Iterable$1Class;
function asIterable$$inlined$Iterable$1() {
  if (asIterable$$inlined$Iterable$1Class === VOID) {
    class $ {
      constructor($this_asIterable) {
        this.g2_1 = $this_asIterable;
      }
      x() {
        return this.g2_1.x();
      }
    }
    initMetadataForClass($);
    asIterable$$inlined$Iterable$1Class = $;
  }
  return asIterable$$inlined$Iterable$1Class;
}
//region block: exports
export {
  asIterable as asIterable1fxmj7vyh9cyo,
  flatMap as flatMap1gb3cjy1dqv3d,
  map as mapsbvh18eqox7a,
  toList as toListx6x8nvfmvvht,
  toSet as toSet2morh2kqexfa2,
};
//endregion

//# sourceMappingURL=_Sequences.mjs.map
