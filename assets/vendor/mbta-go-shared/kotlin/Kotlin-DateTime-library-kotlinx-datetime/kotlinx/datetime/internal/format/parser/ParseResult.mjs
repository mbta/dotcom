import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ParseErrorClass;
function ParseError() {
  if (ParseErrorClass === VOID) {
    class $ {
      constructor(position, message) {
        this.l8e_1 = position;
        this.m8e_1 = message;
      }
    }
    initMetadataForClass($, 'ParseError');
    ParseErrorClass = $;
  }
  return ParseErrorClass;
}
function _ParseResult___init__impl__gvz3cn(value) {
  return value;
}
function _ParseResult___get_value__impl__86mnxf($this) {
  return $this;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      n8e(indexOfNextUnparsed) {
        return _ParseResult___init__impl__gvz3cn(indexOfNextUnparsed);
      }
      o8e(position, message) {
        return _ParseResult___init__impl__gvz3cn(new (ParseError())(position, message));
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
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  _ParseResult___get_value__impl__86mnxf as _ParseResult___get_value__impl__86mnxf37bv6rxl6i4e,
  Companion_instance as Companion_instance1vkshgwp6j1o1,
  ParseError as ParseError1ji8h7fh6q5w9,
};
//endregion

//# sourceMappingURL=ParseResult.mjs.map
