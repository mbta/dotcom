import { AbstractMutableSetthfi6jds1k2h as AbstractMutableSet } from './AbstractMutableSet.mjs';
import { UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException } from '../exceptions.mjs';
import {
  KtMutableSetwuwn7k5m570a as KtMutableSet,
  Collection1k04j3hzsbod0 as Collection,
  MutableIterablez3x4ksk1fmrm as MutableIterable,
  Entry2xmjmyutzoq3p as Entry,
} from './Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { AbstractMutableCollections0bg6c40ztuj as AbstractMutableCollection } from './AbstractMutableCollectionJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var HashMapKeysClass;
function HashMapKeys() {
  if (HashMapKeysClass === VOID) {
    class $ extends AbstractMutableSet() {
      static t9(backing) {
        var $this = this.m8();
        $this.s9_1 = backing;
        return $this;
      }
      c1() {
        return this.s9_1.c1();
      }
      h1() {
        return this.s9_1.c1() === 0;
      }
      j1(element) {
        return this.s9_1.r9(element);
      }
      p3() {
        return this.s9_1.p3();
      }
      i(element) {
        throw UnsupportedOperationException().i5();
      }
      d1(elements) {
        throw UnsupportedOperationException().i5();
      }
      m3(element) {
        return this.s9_1.y9(element);
      }
      x() {
        return this.s9_1.z9();
      }
      y6() {
        return this.s9_1.aa();
      }
    }
    initMetadataForClass($, 'HashMapKeys', VOID, VOID, [KtMutableSet(), AbstractMutableSet()]);
    HashMapKeysClass = $;
  }
  return HashMapKeysClass;
}
var HashMapValuesClass;
function HashMapValues() {
  if (HashMapValuesClass === VOID) {
    class $ extends AbstractMutableCollection() {
      static v9(backing) {
        var $this = this.w6();
        $this.u9_1 = backing;
        return $this;
      }
      c1() {
        return this.u9_1.c1();
      }
      h1() {
        return this.u9_1.c1() === 0;
      }
      ba(element) {
        return this.u9_1.i3(element);
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.ba((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      ca(element) {
        throw UnsupportedOperationException().i5();
      }
      i(element) {
        return this.ca((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      da(elements) {
        throw UnsupportedOperationException().i5();
      }
      d1(elements) {
        return this.da(elements);
      }
      p3() {
        return this.u9_1.p3();
      }
      x() {
        return this.u9_1.ea();
      }
      fa(element) {
        return this.u9_1.ga(element);
      }
      m3(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.fa((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      y6() {
        return this.u9_1.aa();
      }
    }
    initMetadataForClass($, 'HashMapValues', VOID, VOID, [Collection(), MutableIterable(), AbstractMutableCollection()]);
    HashMapValuesClass = $;
  }
  return HashMapValuesClass;
}
var HashMapEntrySetClass;
function HashMapEntrySet() {
  if (HashMapEntrySetClass === VOID) {
    class $ extends HashMapEntrySetBase() {
      static x9(backing) {
        return this.ia(backing);
      }
      x() {
        return this.ha_1.ja();
      }
    }
    initMetadataForClass($, 'HashMapEntrySet');
    HashMapEntrySetClass = $;
  }
  return HashMapEntrySetClass;
}
var HashMapEntrySetBaseClass;
function HashMapEntrySetBase() {
  if (HashMapEntrySetBaseClass === VOID) {
    class $ extends AbstractMutableSet() {
      static ia(backing) {
        var $this = this.m8();
        $this.ha_1 = backing;
        return $this;
      }
      c1() {
        return this.ha_1.c1();
      }
      h1() {
        return this.ha_1.c1() === 0;
      }
      ka(element) {
        return this.ha_1.na(element);
      }
      j1(element) {
        if (!(!(element == null) ? isInterface(element, Entry()) : false))
          return false;
        return this.ka((!(element == null) ? isInterface(element, Entry()) : false) ? element : THROW_CCE());
      }
      p3() {
        return this.ha_1.p3();
      }
      la(element) {
        throw UnsupportedOperationException().i5();
      }
      i(element) {
        return this.la((!(element == null) ? isInterface(element, Entry()) : false) ? element : THROW_CCE());
      }
      d1(elements) {
        throw UnsupportedOperationException().i5();
      }
      ma(element) {
        return this.ha_1.oa(element);
      }
      m3(element) {
        if (!(!(element == null) ? isInterface(element, Entry()) : false))
          return false;
        return this.ma((!(element == null) ? isInterface(element, Entry()) : false) ? element : THROW_CCE());
      }
      d3(elements) {
        return this.ha_1.pa(elements);
      }
      y6() {
        return this.ha_1.aa();
      }
    }
    initMetadataForClass($, 'HashMapEntrySetBase', VOID, VOID, [KtMutableSet(), AbstractMutableSet()]);
    HashMapEntrySetBaseClass = $;
  }
  return HashMapEntrySetBaseClass;
}
//region block: exports
export {
  HashMapEntrySet as HashMapEntrySet29p2ksc4wcy5i,
  HashMapKeys as HashMapKeys28ggmxpft3hz9,
  HashMapValues as HashMapValues3umcxpfyfunqf,
};
//endregion

//# sourceMappingURL=HashMapEntry.mjs.map
