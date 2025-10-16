import { enumEntries20mr21zbe3az4 as enumEntries } from '../../../../../kotlin-kotlin-stdlib/kotlin/enums/EnumEntries.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  ENUM_getInstance22lfbrqor0c0a as ENUM_getInstance,
  PrimitiveKindndgbuh6is7ze as PrimitiveKind,
  MAP_getInstance3s1t6byguxmp9 as MAP_getInstance,
  LIST_getInstancey7k5h8d5cvxt as LIST_getInstance,
  PolymorphicKindla9gurooefwb as PolymorphicKind,
  CONTEXTUAL_getInstance1845118lbzky0 as CONTEXTUAL_getInstance,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { InvalidKeyKindException3b5w96w0jjxof as InvalidKeyKindException } from './JsonExceptions.mjs';
import { getContextualDescriptor2n1gf3b895yb8 as getContextualDescriptor } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/ContextAware.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var WriteMode_OBJ_instance;
var WriteMode_LIST_instance;
var WriteMode_MAP_instance;
var WriteMode_POLY_OBJ_instance;
function values() {
  return [WriteMode_OBJ_getInstance(), WriteMode_LIST_getInstance(), WriteMode_MAP_getInstance(), WriteMode_POLY_OBJ_getInstance()];
}
function get_entries() {
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var WriteMode_entriesInitialized;
function WriteMode_initEntries() {
  if (WriteMode_entriesInitialized)
    return Unit_instance;
  WriteMode_entriesInitialized = true;
  WriteMode_OBJ_instance = new (WriteMode())('OBJ', 0, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
  WriteMode_LIST_instance = new (WriteMode())('LIST', 1, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
  WriteMode_MAP_instance = new (WriteMode())('MAP', 2, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
  WriteMode_POLY_OBJ_instance = new (WriteMode())('POLY_OBJ', 3, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
}
var $ENTRIES;
var WriteModeClass;
function WriteMode() {
  if (WriteModeClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, begin, end) {
        super(name, ordinal);
        this.b1u_1 = begin;
        this.c1u_1 = end;
      }
    }
    initMetadataForClass($, 'WriteMode');
    WriteModeClass = $;
  }
  return WriteModeClass;
}
function switchMode(_this__u8e3s4, desc) {
  var tmp0_subject = desc.x11();
  var tmp;
  if (tmp0_subject instanceof PolymorphicKind()) {
    tmp = WriteMode_POLY_OBJ_getInstance();
  } else {
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp = WriteMode_LIST_getInstance();
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var keyDescriptor = carrierDescriptor(desc.e12(0), _this__u8e3s4.k14());
        var keyKind = keyDescriptor.x11();
        var tmp_0;
        var tmp_1;
        if (keyKind instanceof PrimitiveKind()) {
          tmp_1 = true;
        } else {
          tmp_1 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_1) {
          tmp_0 = WriteMode_MAP_getInstance();
        } else {
          if (_this__u8e3s4.e1l_1.s1m_1) {
            tmp_0 = WriteMode_LIST_getInstance();
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_0;
      } else {
        tmp = WriteMode_OBJ_getInstance();
      }
    }
  }
  return tmp;
}
function carrierDescriptor(_this__u8e3s4, module_0) {
  var tmp;
  if (equals(_this__u8e3s4.x11(), CONTEXTUAL_getInstance())) {
    var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
    tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
  } else if (_this__u8e3s4.y11()) {
    tmp = carrierDescriptor(_this__u8e3s4.e12(0), module_0);
  } else {
    tmp = _this__u8e3s4;
  }
  return tmp;
}
function WriteMode_OBJ_getInstance() {
  WriteMode_initEntries();
  return WriteMode_OBJ_instance;
}
function WriteMode_LIST_getInstance() {
  WriteMode_initEntries();
  return WriteMode_LIST_instance;
}
function WriteMode_MAP_getInstance() {
  WriteMode_initEntries();
  return WriteMode_MAP_instance;
}
function WriteMode_POLY_OBJ_getInstance() {
  WriteMode_initEntries();
  return WriteMode_POLY_OBJ_instance;
}
//region block: exports
export {
  WriteMode_MAP_getInstance as WriteMode_MAP_getInstance1kyp6ms3wufvk,
  WriteMode_OBJ_getInstance as WriteMode_OBJ_getInstance1vxozndswhwrl,
  get_entries as get_entries1lqoril5i9fco,
  carrierDescriptor as carrierDescriptor9eih94weel9f,
  switchMode as switchMode35g725ikhjpwv,
};
//endregion

//# sourceMappingURL=WriteMode.mjs.map
