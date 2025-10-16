import {
  caseInsensitive293j1l8ok4b2v as caseInsensitive,
  CaseInsensitiveStringghw1fh6uf9mm as CaseInsensitiveString,
} from './Text.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { DelegatingMutableSet198sgh8jelkh1 as DelegatingMutableSet } from './DelegatingMutableSet.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  KtMutableMap1kqeifoi36kpz as KtMutableMap,
  Entry2xmjmyutzoq3p as Entry,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function CaseInsensitiveMap$_get_keys_$lambda_ptzlqj($this$DelegatingMutableSet) {
  return $this$DelegatingMutableSet.m3h_1;
}
function CaseInsensitiveMap$_get_keys_$lambda_ptzlqj_0($this$DelegatingMutableSet) {
  return caseInsensitive($this$DelegatingMutableSet);
}
function CaseInsensitiveMap$_get_entries_$lambda_r32w19($this$DelegatingMutableSet) {
  return new (Entry_0())($this$DelegatingMutableSet.u1().m3h_1, $this$DelegatingMutableSet.v1());
}
function CaseInsensitiveMap$_get_entries_$lambda_r32w19_0($this$DelegatingMutableSet) {
  return new (Entry_0())(caseInsensitive($this$DelegatingMutableSet.u1()), $this$DelegatingMutableSet.v1());
}
var CaseInsensitiveMapClass;
function CaseInsensitiveMap() {
  if (CaseInsensitiveMapClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.mutableMapOf' call
        tmp.o3h_1 = LinkedHashMap().sc();
      }
      c1() {
        return this.o3h_1.c1();
      }
      p1n(key) {
        return this.o3h_1.h3(new (CaseInsensitiveString())(key));
      }
      h3(key) {
        if (!(!(key == null) ? typeof key === 'string' : false))
          return false;
        return this.p1n((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
      }
      lk(key) {
        return this.o3h_1.j3(caseInsensitive(key));
      }
      j3(key) {
        if (!(!(key == null) ? typeof key === 'string' : false))
          return null;
        return this.lk((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
      }
      h1() {
        return this.o3h_1.h1();
      }
      p3() {
        this.o3h_1.p3();
      }
      p3h(key, value) {
        return this.o3h_1.t3(caseInsensitive(key), value);
      }
      t3(key, value) {
        var tmp = (!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE();
        return this.p3h(tmp, !(value == null) ? value : THROW_CCE());
      }
      q3h(from) {
        // Inline function 'kotlin.collections.forEach' call
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = from.t1().x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          // Inline function 'kotlin.collections.component1' call
          var key = element.u1();
          // Inline function 'kotlin.collections.component2' call
          var value = element.v1();
          this.p3h(key, value);
        }
      }
      v3(from) {
        return this.q3h(from);
      }
      r3h(key) {
        return this.o3h_1.u3(caseInsensitive(key));
      }
      u3(key) {
        if (!(!(key == null) ? typeof key === 'string' : false))
          return null;
        return this.r3h((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
      }
      k3() {
        var tmp = this.o3h_1.k3();
        var tmp_0 = CaseInsensitiveMap$_get_keys_$lambda_ptzlqj;
        return new (DelegatingMutableSet())(tmp, tmp_0, CaseInsensitiveMap$_get_keys_$lambda_ptzlqj_0);
      }
      t1() {
        var tmp = this.o3h_1.t1();
        var tmp_0 = CaseInsensitiveMap$_get_entries_$lambda_r32w19;
        return new (DelegatingMutableSet())(tmp, tmp_0, CaseInsensitiveMap$_get_entries_$lambda_r32w19_0);
      }
      l3() {
        return this.o3h_1.l3();
      }
      equals(other) {
        var tmp;
        if (other == null) {
          tmp = true;
        } else {
          tmp = !(other instanceof CaseInsensitiveMap());
        }
        if (tmp)
          return false;
        return equals(other.o3h_1, this.o3h_1);
      }
      hashCode() {
        return hashCode(this.o3h_1);
      }
    }
    initMetadataForClass($, 'CaseInsensitiveMap', CaseInsensitiveMap, VOID, [KtMutableMap()]);
    CaseInsensitiveMapClass = $;
  }
  return CaseInsensitiveMapClass;
}
var EntryClass;
function Entry_0() {
  if (EntryClass === VOID) {
    class $ {
      constructor(key, value) {
        this.s3h_1 = key;
        this.t3h_1 = value;
      }
      u1() {
        return this.s3h_1;
      }
      v1() {
        return this.t3h_1;
      }
      hashCode() {
        return (527 + hashCode(ensureNotNull(this.s3h_1)) | 0) + hashCode(ensureNotNull(this.t3h_1)) | 0;
      }
      equals(other) {
        var tmp;
        if (other == null) {
          tmp = true;
        } else {
          tmp = !(!(other == null) ? isInterface(other, Entry()) : false);
        }
        if (tmp)
          return false;
        return equals(other.u1(), this.s3h_1) && equals(other.v1(), this.t3h_1);
      }
      toString() {
        return toString(this.s3h_1) + '=' + toString(this.t3h_1);
      }
    }
    initMetadataForClass($, 'Entry', VOID, VOID, [Entry()]);
    EntryClass = $;
  }
  return EntryClass;
}
//region block: exports
export {
  CaseInsensitiveMap as CaseInsensitiveMap3bv985x2xrppt,
};
//endregion

//# sourceMappingURL=CaseInsensitiveMap.mjs.map
