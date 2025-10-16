import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import {
  KtMap140uvy3s5zad8 as KtMap,
  KtList3hktaavzmj137 as KtList,
  Collection1k04j3hzsbod0 as Collection,
} from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from './LinkedHashMap.mjs';
import {
  mapCapacity1h45rc3eh9p2l as mapCapacity,
  mapOf2zpbbmyqk8xpf as mapOf,
} from './collectionJs.mjs';
import { getOrImplicitDefault24g3b5txuslgw as getOrImplicitDefault } from './MapWithDefault.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import { EmptySet_getInstance2jxplpyvszw8r as EmptySet_getInstance } from './Sets.mjs';
import { EmptyList_getInstance2itxsgbwg3ef6 as EmptyList_getInstance } from './CollectionsKt.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { HashMap1a0ld5kgwhmhv as HashMap } from './HashMap.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function emptyMap() {
  var tmp = EmptyMap_getInstance();
  return isInterface(tmp, KtMap()) ? tmp : THROW_CCE();
}
function mapOf_0(pairs) {
  return pairs.length > 0 ? toMap_0(pairs, LinkedHashMap().tc(mapCapacity(pairs.length))) : emptyMap();
}
function getValue(_this__u8e3s4, key) {
  return getOrImplicitDefault(_this__u8e3s4, key);
}
function toMap(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection())) {
    var tmp;
    switch (_this__u8e3s4.c1()) {
      case 0:
        tmp = emptyMap();
        break;
      case 1:
        var tmp_0;
        if (isInterface(_this__u8e3s4, KtList())) {
          tmp_0 = _this__u8e3s4.e1(0);
        } else {
          tmp_0 = _this__u8e3s4.x().z();
        }

        tmp = mapOf(tmp_0);
        break;
      default:
        tmp = toMap_1(_this__u8e3s4, LinkedHashMap().tc(mapCapacity(_this__u8e3s4.c1())));
        break;
    }
    return tmp;
  }
  return optimizeReadOnlyMap(toMap_1(_this__u8e3s4, LinkedHashMap().sc()));
}
function plus(_this__u8e3s4, map) {
  // Inline function 'kotlin.apply' call
  var this_0 = LinkedHashMap().uc(_this__u8e3s4);
  this_0.v3(map);
  return this_0;
}
function mutableMapOf(pairs) {
  // Inline function 'kotlin.apply' call
  var this_0 = LinkedHashMap().tc(mapCapacity(pairs.length));
  putAll(this_0, pairs);
  return this_0;
}
function plus_0(_this__u8e3s4, pair) {
  var tmp;
  if (_this__u8e3s4.h1()) {
    tmp = mapOf(pair);
  } else {
    // Inline function 'kotlin.apply' call
    var this_0 = LinkedHashMap().uc(_this__u8e3s4);
    this_0.t3(pair.ah_1, pair.bh_1);
    tmp = this_0;
  }
  return tmp;
}
var EmptyMapClass;
function EmptyMap() {
  if (EmptyMapClass === VOID) {
    class $ {
      constructor() {
        EmptyMap_instance = this;
        this.ho_1 = new (Long())(-888910638, 1920087921);
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, KtMap()) : false) {
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
        return '{}';
      }
      c1() {
        return 0;
      }
      h1() {
        return true;
      }
      io(key) {
        return false;
      }
      h3(key) {
        if (!(key == null ? true : !(key == null)))
          return false;
        return this.io((key == null ? true : !(key == null)) ? key : THROW_CCE());
      }
      jo(key) {
        return null;
      }
      j3(key) {
        if (!(key == null ? true : !(key == null)))
          return null;
        return this.jo((key == null ? true : !(key == null)) ? key : THROW_CCE());
      }
      t1() {
        return EmptySet_getInstance();
      }
      k3() {
        return EmptySet_getInstance();
      }
      l3() {
        return EmptyList_getInstance();
      }
    }
    initMetadataForObject($, 'EmptyMap', VOID, VOID, [KtMap()]);
    EmptyMapClass = $;
  }
  return EmptyMapClass;
}
var EmptyMap_instance;
function EmptyMap_getInstance() {
  if (EmptyMap_instance === VOID)
    new (EmptyMap())();
  return EmptyMap_instance;
}
function toMap_0(_this__u8e3s4, destination) {
  // Inline function 'kotlin.apply' call
  putAll(destination, _this__u8e3s4);
  return destination;
}
function toMap_1(_this__u8e3s4, destination) {
  // Inline function 'kotlin.apply' call
  putAll_0(destination, _this__u8e3s4);
  return destination;
}
function optimizeReadOnlyMap(_this__u8e3s4) {
  var tmp;
  switch (_this__u8e3s4.c1()) {
    case 0:
      tmp = emptyMap();
      break;
    case 1:
      // Inline function 'kotlin.collections.toSingletonMapOrSelf' call

      tmp = _this__u8e3s4;
      break;
    default:
      tmp = _this__u8e3s4;
      break;
  }
  return tmp;
}
function putAll(_this__u8e3s4, pairs) {
  var inductionVariable = 0;
  var last = pairs.length;
  while (inductionVariable < last) {
    var _destruct__k2r9zo = pairs[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var key = _destruct__k2r9zo.ch();
    var value = _destruct__k2r9zo.dh();
    _this__u8e3s4.t3(key, value);
  }
}
function putAll_0(_this__u8e3s4, pairs) {
  var _iterator__ex2g4s = pairs.x();
  while (_iterator__ex2g4s.y()) {
    var _destruct__k2r9zo = _iterator__ex2g4s.z();
    var key = _destruct__k2r9zo.ch();
    var value = _destruct__k2r9zo.dh();
    _this__u8e3s4.t3(key, value);
  }
}
function hashMapOf(pairs) {
  // Inline function 'kotlin.apply' call
  var this_0 = HashMap().o9(mapCapacity(pairs.length));
  putAll(this_0, pairs);
  return this_0;
}
//region block: exports
export {
  emptyMap as emptyMapr06gerzljqtm,
  getValue as getValue48kllevslyh6,
  hashMapOf as hashMapOf2phwdlwszpif7,
  mapOf_0 as mapOf1xd03cq9cnmy8,
  mutableMapOf as mutableMapOfk2y3zt1azl40,
  plus as plus2m1vv33moko5t,
  plus_0 as plus2lr02ok6jhhxu,
  toMap as toMap1vec9topfei08,
};
//endregion

//# sourceMappingURL=Maps.mjs.map
