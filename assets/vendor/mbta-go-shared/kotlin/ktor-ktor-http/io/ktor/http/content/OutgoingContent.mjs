import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { boxApply1qmzdb3dh90hg as boxApply } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Companion_getInstance2krh5pmq7pw0k as Companion_getInstance } from '../Headers.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var NoContentClass;
function NoContent() {
  if (NoContentClass === VOID) {
    class $ extends OutgoingContent() {}
    initMetadataForClass($, 'NoContent');
    NoContentClass = $;
  }
  return NoContentClass;
}
var ReadChannelContentClass;
function ReadChannelContent() {
  if (ReadChannelContentClass === VOID) {
    class $ extends OutgoingContent() {}
    initMetadataForClass($, 'ReadChannelContent');
    ReadChannelContentClass = $;
  }
  return ReadChannelContentClass;
}
var WriteChannelContentClass;
function WriteChannelContent() {
  if (WriteChannelContentClass === VOID) {
    class $ extends OutgoingContent() {}
    initMetadataForClass($, 'WriteChannelContent', VOID, VOID, VOID, [1]);
    WriteChannelContentClass = $;
  }
  return WriteChannelContentClass;
}
var ByteArrayContentClass;
function ByteArrayContent() {
  if (ByteArrayContentClass === VOID) {
    class $ extends OutgoingContent() {}
    initMetadataForClass($, 'ByteArrayContent');
    ByteArrayContentClass = $;
  }
  return ByteArrayContentClass;
}
var ProtocolUpgradeClass;
function ProtocolUpgrade() {
  if (ProtocolUpgradeClass === VOID) {
    class $ extends OutgoingContent() {}
    initMetadataForClass($, 'ProtocolUpgrade', VOID, VOID, VOID, [4]);
    ProtocolUpgradeClass = $;
  }
  return ProtocolUpgradeClass;
}
var ContentWrapperClass;
function ContentWrapper() {
  if (ContentWrapperClass === VOID) {
    class $ extends OutgoingContent() {
      j41() {
        return this.i41_1;
      }
    }
    initMetadataForClass($, 'ContentWrapper');
    ContentWrapperClass = $;
  }
  return ContentWrapperClass;
}
var OutgoingContentClass;
function OutgoingContent() {
  if (OutgoingContentClass === VOID) {
    class $ {
      constructor($box) {
        boxApply(this, $box);
        this.g41_1 = null;
      }
      d41() {
        return null;
      }
      e41() {
        return null;
      }
      l3v() {
        return Companion_getInstance().o3q_1;
      }
    }
    initMetadataForClass($, 'OutgoingContent');
    OutgoingContentClass = $;
  }
  return OutgoingContentClass;
}
var NullBodyClass;
function NullBody() {
  if (NullBodyClass === VOID) {
    class $ {}
    initMetadataForObject($, 'NullBody');
    NullBodyClass = $;
  }
  return NullBodyClass;
}
var NullBody_instance;
function NullBody_getInstance() {
  return NullBody_instance;
}
function isEmpty(_this__u8e3s4) {
  var tmp;
  if (_this__u8e3s4 instanceof NoContent()) {
    tmp = true;
  } else {
    if (_this__u8e3s4 instanceof ContentWrapper()) {
      tmp = isEmpty(_this__u8e3s4.j41());
    } else {
      tmp = false;
    }
  }
  return tmp;
}
//region block: init
NullBody_instance = new (NullBody())();
//endregion
//region block: exports
export {
  NullBody_instance as NullBody_instance2i6w0hfghwfg0,
  NullBody as NullBody1903zz7riiwr0,
  ByteArrayContent as ByteArrayContent2n0wb43y6ugs1,
  ContentWrapper as ContentWrapper3n9gdymgnbto9,
  NoContent as NoContent1bdx48poqrifq,
  ProtocolUpgrade as ProtocolUpgradexnnpt2xliy8g,
  ReadChannelContent as ReadChannelContentz1amb4hnpqp4,
  WriteChannelContent as WriteChannelContent1d7f40hsfcaxg,
  OutgoingContent as OutgoingContent3t2ohmyam9o76,
  isEmpty as isEmpty1yq29t926r0va,
};
//endregion

//# sourceMappingURL=OutgoingContent.mjs.map
