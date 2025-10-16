import {
  toSet1glep2u1u9tcb as toSet,
  toCollection105f1cp28k3eu as toCollection,
} from './_Arrays.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from './LinkedHashSet.mjs';
import {
  mapCapacity1h45rc3eh9p2l as mapCapacity,
  setOf1u3mizs95ngxo as setOf,
} from './collectionJs.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import { KtSetjrjc7fhfd6b9 as KtSet } from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { EmptyIterator_instance23xvvm1c2fncv as EmptyIterator_instance } from './CollectionsKt.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { HashSet2dzve9y63nf0v as HashSet } from './HashSet.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function setOf_0(elements) {
  return toSet(elements);
}
function emptySet() {
  return EmptySet_getInstance();
}
function mutableSetOf(elements) {
  return toCollection(elements, LinkedHashSet().h(mapCapacity(elements.length)));
}
var EmptySetClass;
function EmptySet() {
  if (EmptySetClass === VOID) {
    class $ {
      constructor() {
        EmptySet_instance = this;
        this.kp_1 = new (Long())(1993859828, 793161749);
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, KtSet()) : false) {
          tmp = other.h1();
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return 0;
      }
      toString() {
        return '[]';
      }
      c1() {
        return 0;
      }
      h1() {
        return true;
      }
      tn(element) {
        return false;
      }
      j1(element) {
        if (!false)
          return false;
        var tmp;
        if (false) {
          tmp = element;
        } else {
          tmp = THROW_CCE();
        }
        return this.tn(tmp);
      }
      un(elements) {
        return elements.h1();
      }
      d3(elements) {
        return this.un(elements);
      }
      x() {
        return EmptyIterator_instance;
      }
    }
    initMetadataForObject($, 'EmptySet', VOID, VOID, [KtSet()]);
    EmptySetClass = $;
  }
  return EmptySetClass;
}
var EmptySet_instance;
function EmptySet_getInstance() {
  if (EmptySet_instance === VOID)
    new (EmptySet())();
  return EmptySet_instance;
}
function optimizeReadOnlySet(_this__u8e3s4) {
  switch (_this__u8e3s4.c1()) {
    case 0:
      return emptySet();
    case 1:
      return setOf(_this__u8e3s4.x().z());
    default:
      return _this__u8e3s4;
  }
}
function hashSetOf(elements) {
  return toCollection(elements, HashSet().b1(mapCapacity(elements.length)));
}
//region block: exports
export {
  EmptySet_getInstance as EmptySet_getInstance2jxplpyvszw8r,
  emptySet as emptySetcxexqki71qfa,
  hashSetOf as hashSetOf1p9d9akkobppk,
  mutableSetOf as mutableSetOf3lxrr4fe5z3v8,
  optimizeReadOnlySet as optimizeReadOnlySetbkgqv9johc5,
  setOf_0 as setOf45ia9pnfhe90,
};
//endregion

//# sourceMappingURL=Sets.mjs.map
