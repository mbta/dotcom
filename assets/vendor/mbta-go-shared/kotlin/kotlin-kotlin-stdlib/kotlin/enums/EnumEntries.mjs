import {
  AbstractList3ck35puwbp1e9 as AbstractList,
  Companion_instanceovl8he3jiijf as Companion_instance,
} from '../collections/AbstractList.mjs';
import { getOrNull1d60i0672n7ns as getOrNull } from '../collections/_Arrays.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../Enum.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { KtList3hktaavzmj137 as KtList } from '../collections/Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function enumEntries(entries) {
  return EnumEntriesList().or(entries);
}
var EnumEntriesListClass;
function EnumEntriesList() {
  if (EnumEntriesListClass === VOID) {
    class $ extends AbstractList() {
      static or(entries) {
        var $this = this.qm();
        $this.nr_1 = entries;
        return $this;
      }
      c1() {
        return this.nr_1.length;
      }
      e1(index) {
        Companion_instance.t7(index, this.nr_1.length);
        return this.nr_1[index];
      }
      pr(element) {
        if (element === null)
          return false;
        var target = getOrNull(this.nr_1, element.x3_1);
        return target === element;
      }
      j1(element) {
        if (!(element instanceof Enum()))
          return false;
        return this.pr(element instanceof Enum() ? element : THROW_CCE());
      }
      qr(element) {
        if (element === null)
          return -1;
        var ordinal = element.x3_1;
        var target = getOrNull(this.nr_1, ordinal);
        return target === element ? ordinal : -1;
      }
      l1(element) {
        if (!(element instanceof Enum()))
          return -1;
        return this.qr(element instanceof Enum() ? element : THROW_CCE());
      }
      rr(element) {
        return this.qr(element);
      }
      e3(element) {
        if (!(element instanceof Enum()))
          return -1;
        return this.rr(element instanceof Enum() ? element : THROW_CCE());
      }
    }
    initMetadataForClass($, 'EnumEntriesList', VOID, VOID, [KtList(), AbstractList()]);
    EnumEntriesListClass = $;
  }
  return EnumEntriesListClass;
}
//region block: exports
export {
  enumEntries as enumEntries20mr21zbe3az4,
};
//endregion

//# sourceMappingURL=EnumEntries.mjs.map
