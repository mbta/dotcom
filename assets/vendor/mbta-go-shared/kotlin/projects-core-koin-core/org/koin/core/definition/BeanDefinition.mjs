import { getFullName1t9gk3djdkvl5 as getFullName } from '../../ext/KClassExt.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { Callbacks228mhkft6bagp as Callbacks } from './Callbacks.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Companion_getInstance13ladrowvkk2x as Companion_getInstance } from '../registry/ScopeRegistry.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { joinTo3lkanfaxbzac2 as joinTo } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function BeanDefinition$toString$lambda(it) {
  return getFullName(it);
}
var BeanDefinitionClass;
function BeanDefinition() {
  if (BeanDefinitionClass === VOID) {
    class $ {
      constructor(scopeQualifier, primaryType, qualifier, definition, kind, secondaryTypes) {
        qualifier = qualifier === VOID ? null : qualifier;
        secondaryTypes = secondaryTypes === VOID ? emptyList() : secondaryTypes;
        this.y7v_1 = scopeQualifier;
        this.z7v_1 = primaryType;
        this.a7w_1 = qualifier;
        this.b7w_1 = definition;
        this.c7w_1 = kind;
        this.d7w_1 = secondaryTypes;
        this.e7w_1 = new (Callbacks())();
        this.f7w_1 = false;
      }
      toString() {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        this_0.ic(_Char___init__impl__6a9atx(91));
        this_0.gc(this.c7w_1);
        this_0.hc(": '");
        this_0.hc(getFullName(this.z7v_1));
        this_0.ic(_Char___init__impl__6a9atx(39));
        if (!(this.a7w_1 == null)) {
          this_0.hc(',qualifier:');
          this_0.gc(this.a7w_1);
        }
        if (!equals(this.y7v_1, Companion_getInstance().h7w_1)) {
          this_0.hc(',scope:');
          this_0.gc(this.y7v_1);
        }
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!this.d7w_1.h1()) {
          this_0.hc(',binds:');
          var tmp = this.d7w_1;
          joinTo(tmp, this_0, ',', VOID, VOID, VOID, VOID, BeanDefinition$toString$lambda);
        }
        this_0.ic(_Char___init__impl__6a9atx(93));
        return this_0.toString();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof BeanDefinition()))
          THROW_CCE();
        if (!this.z7v_1.equals(other.z7v_1))
          return false;
        if (!equals(this.a7w_1, other.a7w_1))
          return false;
        if (!equals(this.y7v_1, other.y7v_1))
          return false;
        return true;
      }
      hashCode() {
        var tmp0_safe_receiver = this.a7w_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
        var result = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        result = imul(31, result) + this.z7v_1.hashCode() | 0;
        result = imul(31, result) + hashCode(this.y7v_1) | 0;
        return result;
      }
    }
    initMetadataForClass($, 'BeanDefinition');
    BeanDefinitionClass = $;
  }
  return BeanDefinitionClass;
}
var Kind_Singleton_instance;
var Kind_Factory_instance;
var Kind_Scoped_instance;
var Kind_entriesInitialized;
function Kind_initEntries() {
  if (Kind_entriesInitialized)
    return Unit_instance;
  Kind_entriesInitialized = true;
  Kind_Singleton_instance = new (Kind())('Singleton', 0);
  Kind_Factory_instance = new (Kind())('Factory', 1);
  Kind_Scoped_instance = new (Kind())('Scoped', 2);
}
var KindClass;
function Kind() {
  if (KindClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Kind');
    KindClass = $;
  }
  return KindClass;
}
function Kind_Singleton_getInstance() {
  Kind_initEntries();
  return Kind_Singleton_instance;
}
function Kind_Factory_getInstance() {
  Kind_initEntries();
  return Kind_Factory_instance;
}
//region block: exports
export {
  Kind_Factory_getInstance as Kind_Factory_getInstancen5wx4z4o0a4j,
  Kind_Singleton_getInstance as Kind_Singleton_getInstancexsk8x1eh18jm,
  BeanDefinition as BeanDefinitionhif1nxb54kgk,
};
//endregion

//# sourceMappingURL=BeanDefinition.mjs.map
