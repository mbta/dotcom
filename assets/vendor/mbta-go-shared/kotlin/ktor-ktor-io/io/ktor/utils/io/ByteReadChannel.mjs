import { Buffergs925ekssbch as Buffer } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IOException1wyutdmfe71nu as IOException } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/-PlatformJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ByteReadChannel$Companion$Empty$1Class;
function ByteReadChannel$Companion$Empty$1() {
  if (ByteReadChannel$Companion$Empty$1Class === VOID) {
    class $ {
      constructor() {
        this.a38_1 = null;
        this.b38_1 = new (Buffer())();
      }
      a36() {
        return this.a38_1;
      }
      c36() {
        return true;
      }
      v35() {
        return this.b38_1;
      }
      d36(min, $completion) {
        return false;
      }
      g36(cause) {
      }
    }
    protoOf($).e36 = awaitContent$default;
    initMetadataForClass($, VOID, VOID, VOID, [ByteReadChannel()], [1]);
    ByteReadChannel$Companion$Empty$1Class = $;
  }
  return ByteReadChannel$Companion$Empty$1Class;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        tmp.c38_1 = new (ByteReadChannel$Companion$Empty$1())();
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function awaitContent$default(min, $completion, $super) {
  min = min === VOID ? 1 : min;
  return $super === VOID ? this.d36(min, $completion) : $super.d36.call(this, min, $completion);
}
var ByteReadChannelClass;
function ByteReadChannel() {
  if (ByteReadChannelClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ByteReadChannel', VOID, VOID, VOID, [1]);
    ByteReadChannelClass = $;
  }
  return ByteReadChannelClass;
}
function cancel(_this__u8e3s4) {
  _this__u8e3s4.g36(IOException().v32('Channel was cancelled'));
}
//region block: exports
export {
  awaitContent$default as awaitContent$default62rpipafmnr4,
  Companion_getInstance as Companion_getInstance2ai11rhpust2a,
  ByteReadChannel as ByteReadChannel2wzou76jce72d,
  cancel as canceldn4b3cdqcfny,
};
//endregion

//# sourceMappingURL=ByteReadChannel.mjs.map
