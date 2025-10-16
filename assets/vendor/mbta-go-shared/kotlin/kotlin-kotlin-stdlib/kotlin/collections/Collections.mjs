import {
  createListFrom4gbto0e646ia as createListFrom,
  createJsReadonlyArrayViewFrom3cs26f7gr195f as createJsReadonlyArrayViewFrom,
} from './collectionsInterop.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      fromJsArray(array) {
        return createListFrom(array);
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
function asJsReadonlyArrayView() {
  return createJsReadonlyArrayViewFrom(this);
}
var KtListClass;
function KtList() {
  if (KtListClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'List', VOID, VOID, [Collection()]);
    KtListClass = $;
  }
  return KtListClass;
}
var CollectionClass;
function Collection() {
  if (CollectionClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Collection');
    CollectionClass = $;
  }
  return CollectionClass;
}
var KtSetClass;
function KtSet() {
  if (KtSetClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Set', VOID, VOID, [Collection()]);
    KtSetClass = $;
  }
  return KtSetClass;
}
var EntryClass;
function Entry() {
  if (EntryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Entry');
    EntryClass = $;
  }
  return EntryClass;
}
var KtMapClass;
function KtMap() {
  if (KtMapClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Map');
    KtMapClass = $;
  }
  return KtMapClass;
}
var KtMutableListClass;
function KtMutableList() {
  if (KtMutableListClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'MutableList', VOID, VOID, [KtList(), Collection(), MutableIterable()]);
    KtMutableListClass = $;
  }
  return KtMutableListClass;
}
var KtMutableSetClass;
function KtMutableSet() {
  if (KtMutableSetClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'MutableSet', VOID, VOID, [KtSet(), Collection(), MutableIterable()]);
    KtMutableSetClass = $;
  }
  return KtMutableSetClass;
}
var KtMutableMapClass;
function KtMutableMap() {
  if (KtMutableMapClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'MutableMap', VOID, VOID, [KtMap()]);
    KtMutableMapClass = $;
  }
  return KtMutableMapClass;
}
var MutableIterableClass;
function MutableIterable() {
  if (MutableIterableClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'MutableIterable');
    MutableIterableClass = $;
  }
  return MutableIterableClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion as Companion130bhty3s8zhd,
  Companion_getInstance as Companion_getInstancerdhsn3eqo64l,
  Collection as Collection1k04j3hzsbod0,
  asJsReadonlyArrayView as asJsReadonlyArrayView237cu3jwn119s,
  KtList as KtList3hktaavzmj137,
  Entry as Entry2xmjmyutzoq3p,
  KtMap as KtMap140uvy3s5zad8,
  MutableIterable as MutableIterablez3x4ksk1fmrm,
  KtMutableList as KtMutableList1beimitadwkna,
  KtMutableMap as KtMutableMap1kqeifoi36kpz,
  KtMutableSet as KtMutableSetwuwn7k5m570a,
  KtSet as KtSetjrjc7fhfd6b9,
};
//endregion

//# sourceMappingURL=Collections.mjs.map
