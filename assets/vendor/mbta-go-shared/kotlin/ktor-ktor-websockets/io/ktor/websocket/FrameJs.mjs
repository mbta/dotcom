import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  FrameType_BINARY_getInstance21mui57dvsupv as FrameType_BINARY_getInstance,
  FrameType_TEXT_getInstancer2p77eshsb06 as FrameType_TEXT_getInstance,
  FrameType_CLOSE_getInstance15jbt5jmmf9fy as FrameType_CLOSE_getInstance,
  FrameType_PING_getInstance28g5j7lcyx6ys as FrameType_PING_getInstance,
  FrameType_PONG_getInstance3inzufk15ho3a as FrameType_PONG_getInstance,
} from './FrameType.mjs';
import { NonDisposableHandle_instancebt9v9qa8gc6h as NonDisposableHandle_instance } from './FrameCommon.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  toByteArray1i3ns5jnoqlv6 as toByteArray,
  writeText19qfzm98fbm4l as writeText,
} from '../../../../ktor-ktor-io/io/ktor/utils/io/core/Strings.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { readByteArray1ri21h2rciakw as readByteArray } from '../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Sources.mjs';
import { noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var BinaryClass;
function Binary() {
  if (BinaryClass === VOID) {
    class $ extends Frame() {
      static l4k(fin, data, rsv1, rsv2, rsv3) {
        rsv1 = rsv1 === VOID ? false : rsv1;
        rsv2 = rsv2 === VOID ? false : rsv2;
        rsv3 = rsv3 === VOID ? false : rsv3;
        return this.m4k(fin, FrameType_BINARY_getInstance(), data, NonDisposableHandle_instance, rsv1, rsv2, rsv3);
      }
      static n4k(fin, data) {
        return this.l4k(fin, data, false, false, false);
      }
    }
    initMetadataForClass($, 'Binary');
    BinaryClass = $;
  }
  return BinaryClass;
}
var TextClass;
function Text() {
  if (TextClass === VOID) {
    class $ extends Frame() {
      static v4k(fin, data, rsv1, rsv2, rsv3) {
        rsv1 = rsv1 === VOID ? false : rsv1;
        rsv2 = rsv2 === VOID ? false : rsv2;
        rsv3 = rsv3 === VOID ? false : rsv3;
        return this.m4k(fin, FrameType_TEXT_getInstance(), data, NonDisposableHandle_instance, rsv1, rsv2, rsv3);
      }
      static w4k(fin, data) {
        return this.v4k(fin, data, false, false, false);
      }
      static x4k(text) {
        return this.w4k(true, toByteArray(text));
      }
    }
    initMetadataForClass($, 'Text');
    TextClass = $;
  }
  return TextClass;
}
var CloseClass;
function Close() {
  if (CloseClass === VOID) {
    class $ extends Frame() {
      static y4k(data) {
        return this.m4k(true, FrameType_CLOSE_getInstance(), data, NonDisposableHandle_instance, false, false, false);
      }
      static x4e(reason) {
        // Inline function 'io.ktor.utils.io.core.buildPacket' call
        var builder = new (Buffer())();
        builder.n31(reason.r49_1);
        writeText(builder, reason.s49_1);
        return this.z4k(builder);
      }
      static z4k(packet) {
        return this.y4k(readByteArray(packet));
      }
      static a4l() {
        return this.y4k(Companion_getInstance().f4f_1);
      }
    }
    initMetadataForClass($, 'Close', $.a4l);
    CloseClass = $;
  }
  return CloseClass;
}
var PingClass;
function Ping() {
  if (PingClass === VOID) {
    class $ extends Frame() {
      static v4i(data) {
        return this.m4k(true, FrameType_PING_getInstance(), data, NonDisposableHandle_instance, false, false, false);
      }
    }
    initMetadataForClass($, 'Ping');
    PingClass = $;
  }
  return PingClass;
}
var PongClass;
function Pong() {
  if (PongClass === VOID) {
    class $ extends Frame() {
      static n4c(data, disposableHandle) {
        disposableHandle = disposableHandle === VOID ? NonDisposableHandle_instance : disposableHandle;
        return this.m4k(true, FrameType_PONG_getInstance(), data, disposableHandle, false, false, false);
      }
    }
    initMetadataForClass($, 'Pong');
    PongClass = $;
  }
  return PongClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.f4f_1 = new Int8Array(0);
      }
      g4f(fin, frameType, data, rsv1, rsv2, rsv3) {
        var tmp;
        switch (frameType.x3_1) {
          case 1:
            tmp = Binary().l4k(fin, data, rsv1, rsv2, rsv3);
            break;
          case 0:
            tmp = Text().v4k(fin, data, rsv1, rsv2, rsv3);
            break;
          case 2:
            tmp = Close().y4k(data);
            break;
          case 3:
            tmp = Ping().v4i(data);
            break;
          case 4:
            tmp = Pong().n4c(data, NonDisposableHandle_instance);
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        return tmp;
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
var FrameClass;
function Frame() {
  if (FrameClass === VOID) {
    class $ {
      static m4k(fin, frameType, data, disposableHandle, rsv1, rsv2, rsv3) {
        Companion_getInstance();
        disposableHandle = disposableHandle === VOID ? NonDisposableHandle_instance : disposableHandle;
        rsv1 = rsv1 === VOID ? false : rsv1;
        rsv2 = rsv2 === VOID ? false : rsv2;
        rsv3 = rsv3 === VOID ? false : rsv3;
        var $this = createThis(this);
        $this.y4e_1 = fin;
        $this.z4e_1 = frameType;
        $this.a4f_1 = data;
        $this.b4f_1 = disposableHandle;
        $this.c4f_1 = rsv1;
        $this.d4f_1 = rsv2;
        $this.e4f_1 = rsv3;
        return $this;
      }
      toString() {
        return 'Frame ' + this.z4e_1.toString() + ' (fin=' + this.y4e_1 + ', buffer len = ' + this.a4f_1.length + ')';
      }
    }
    initMetadataForClass($, 'Frame');
    FrameClass = $;
  }
  return FrameClass;
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance1mgzkubcxut8z,
  Binary as Binary3tlzyfojm51s4,
  Close as Close3tx65evcwi73t,
  Ping as Ping3nta6l7sdq1r9,
  Pong as Pong3m3cas9hmc9ec,
  Text as Text3e6ukp9joohql,
};
//endregion

//# sourceMappingURL=FrameJs.mjs.map
