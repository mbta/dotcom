import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { createMapForCache33nwboubq6azo as createMapForCache } from './createMapForCache.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var KeyClass;
function Key() {
  if (KeyClass === VOID) {
    class $ {}
    initMetadataForClass($, 'Key', Key);
    KeyClass = $;
  }
  return KeyClass;
}
var DescriptorSchemaCacheClass;
function DescriptorSchemaCache() {
  if (DescriptorSchemaCacheClass === VOID) {
    class $ {
      constructor() {
        this.x1q_1 = createMapForCache(16);
      }
      n1t(descriptor, key, value) {
        // Inline function 'kotlin.collections.getOrPut' call
        var this_0 = this.x1q_1;
        var value_0 = this_0.j3(descriptor);
        var tmp;
        if (value_0 == null) {
          var answer = createMapForCache(2);
          this_0.t3(descriptor, answer);
          tmp = answer;
        } else {
          tmp = value_0;
        }
        var tmp0 = tmp;
        var tmp2 = key instanceof Key() ? key : THROW_CCE();
        // Inline function 'kotlin.collections.set' call
        var value_1 = !(value == null) ? value : THROW_CCE();
        tmp0.t3(tmp2, value_1);
      }
      y1q(descriptor, key, defaultValue) {
        var tmp0_safe_receiver = this.o1t(descriptor, key);
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          return tmp0_safe_receiver;
        }
        var value = defaultValue();
        this.n1t(descriptor, key, value);
        return value;
      }
      o1t(descriptor, key) {
        var tmp0_safe_receiver = this.x1q_1.j3(descriptor);
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          tmp = tmp0_safe_receiver.j3(key instanceof Key() ? key : THROW_CCE());
        }
        var tmp_0 = tmp;
        return !(tmp_0 == null) ? tmp_0 : null;
      }
    }
    initMetadataForClass($, 'DescriptorSchemaCache', DescriptorSchemaCache);
    DescriptorSchemaCacheClass = $;
  }
  return DescriptorSchemaCacheClass;
}
//region block: exports
export {
  Key as Key2w5p0aa9mfn6d,
  DescriptorSchemaCache as DescriptorSchemaCache22yqwocbp420v,
};
//endregion

//# sourceMappingURL=SchemaCache.mjs.map
