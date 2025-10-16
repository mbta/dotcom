import {
  Collection1k04j3hzsbod0 as Collection,
  Entry2xmjmyutzoq3p as Entry,
} from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function containsAllEntries(m) {
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.all' call
    var tmp;
    if (isInterface(m, Collection())) {
      tmp = m.h1();
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$0 = true;
      break $l$block_0;
    }
    var _iterator__ex2g4s = m.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var entry = element;
      var tmp_0;
      if (!(entry == null) ? isInterface(entry, Entry()) : false) {
        tmp_0 = this.lc(entry);
      } else {
        tmp_0 = false;
      }
      if (!tmp_0) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
}
var InternalMapClass;
function InternalMap() {
  if (InternalMapClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'InternalMap');
    InternalMapClass = $;
  }
  return InternalMapClass;
}
//region block: exports
export {
  containsAllEntries as containsAllEntries1q58uduc9e3y6,
  InternalMap as InternalMap26d9hvxb47nvz,
};
//endregion

//# sourceMappingURL=InternalMap.mjs.map
