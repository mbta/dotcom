import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { AbstractMutableSetthfi6jds1k2h as AbstractMutableSet } from './AbstractMutableSet.mjs';
import { UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException } from '../exceptions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { AbstractMutableCollections0bg6c40ztuj as AbstractMutableCollection } from './AbstractMutableCollectionJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var HashMapKeysDefault$iterator$1Class;
function HashMapKeysDefault$iterator$1() {
  if (HashMapKeysDefault$iterator$1Class === VOID) {
    class $ {
      constructor($entryIterator) {
        this.qa_1 = $entryIterator;
      }
      y() {
        return this.qa_1.y();
      }
      z() {
        return this.qa_1.z().u1();
      }
      z6() {
        return this.qa_1.z6();
      }
    }
    initMetadataForClass($);
    HashMapKeysDefault$iterator$1Class = $;
  }
  return HashMapKeysDefault$iterator$1Class;
}
var HashMapKeysDefaultClass;
function HashMapKeysDefault() {
  if (HashMapKeysDefaultClass === VOID) {
    class $ extends AbstractMutableSet() {
      static h8(backingMap) {
        var $this = this.m8();
        $this.g8_1 = backingMap;
        return $this;
      }
      ra(element) {
        throw UnsupportedOperationException().f6('Add is not supported on keys');
      }
      i(element) {
        return this.ra((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      p3() {
        return this.g8_1.p3();
      }
      r9(element) {
        return this.g8_1.h3(element);
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.r9((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      x() {
        var entryIterator = this.g8_1.t1().x();
        return new (HashMapKeysDefault$iterator$1())(entryIterator);
      }
      u3(element) {
        this.y6();
        if (this.g8_1.h3(element)) {
          this.g8_1.u3(element);
          return true;
        }
        return false;
      }
      m3(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.u3((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      c1() {
        return this.g8_1.c1();
      }
      y6() {
        return this.g8_1.y6();
      }
    }
    initMetadataForClass($, 'HashMapKeysDefault');
    HashMapKeysDefaultClass = $;
  }
  return HashMapKeysDefaultClass;
}
var HashMapValuesDefault$iterator$1Class;
function HashMapValuesDefault$iterator$1() {
  if (HashMapValuesDefault$iterator$1Class === VOID) {
    class $ {
      constructor($entryIterator) {
        this.sa_1 = $entryIterator;
      }
      y() {
        return this.sa_1.y();
      }
      z() {
        return this.sa_1.z().v1();
      }
      z6() {
        return this.sa_1.z6();
      }
    }
    initMetadataForClass($);
    HashMapValuesDefault$iterator$1Class = $;
  }
  return HashMapValuesDefault$iterator$1Class;
}
var HashMapValuesDefaultClass;
function HashMapValuesDefault() {
  if (HashMapValuesDefaultClass === VOID) {
    class $ extends AbstractMutableCollection() {
      static k8(backingMap) {
        var $this = this.w6();
        $this.j8_1 = backingMap;
        return $this;
      }
      ca(element) {
        throw UnsupportedOperationException().f6('Add is not supported on values');
      }
      i(element) {
        return this.ca((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      p3() {
        return this.j8_1.p3();
      }
      ba(element) {
        return this.j8_1.i3(element);
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.ba((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      x() {
        var entryIterator = this.j8_1.t1().x();
        return new (HashMapValuesDefault$iterator$1())(entryIterator);
      }
      c1() {
        return this.j8_1.c1();
      }
      y6() {
        return this.j8_1.y6();
      }
    }
    initMetadataForClass($, 'HashMapValuesDefault');
    HashMapValuesDefaultClass = $;
  }
  return HashMapValuesDefaultClass;
}
//region block: exports
export {
  HashMapKeysDefault as HashMapKeysDefaultd8xopyn6vbgh,
  HashMapValuesDefault as HashMapValuesDefault3j1xghpfb6bpq,
};
//endregion

//# sourceMappingURL=HashMapEntryDefault.mjs.map
