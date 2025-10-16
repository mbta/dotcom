import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { fireAndForget1uv0d2zhlhrab as fireAndForget } from './ByteWriteChannelOperations.mjs';
import {
  initMetadataForFunctionReferencen3g5fpj34t8u as initMetadataForFunctionReference,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { rethrowCloseCauseIfNeeded2q8fs9csuucwc as rethrowCloseCauseIfNeeded } from './ByteReadChannelOperations.mjs';
import { ByteChannel3cxdguezl3lu7 as ByteChannel } from './ByteChannel.mjs';
import { get_size2imoy2jq11jxl as get_size } from './core/BytePacketBuilder.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function flushIfNeeded(_this__u8e3s4, $completion) {
  var tmp = new ($flushIfNeededCOROUTINE$())(_this__u8e3s4, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function close(_this__u8e3s4) {
  fireAndForget(ByteWriteChannel$flushAndClose$ref_0(_this__u8e3s4));
}
var ByteWriteChannel$flushAndClose$refClass;
function ByteWriteChannel$flushAndClose$ref() {
  if (ByteWriteChannel$flushAndClose$refClass === VOID) {
    class $ {
      constructor(p0) {
        this.m3d_1 = p0;
      }
      n3d($completion) {
        return this.m3d_1.f36($completion);
      }
      sf($completion) {
        return this.n3d($completion);
      }
    }
    initMetadataForFunctionReference($, VOID, VOID, [0]);
    ByteWriteChannel$flushAndClose$refClass = $;
  }
  return ByteWriteChannel$flushAndClose$refClass;
}
function ByteWriteChannel$flushAndClose$ref_0(p0) {
  var i = new (ByteWriteChannel$flushAndClose$ref())(p0);
  var l = function ($completion) {
    return i.n3d($completion);
  };
  l.callableName = 'flushAndClose';
  l.$arity = 0;
  return l;
}
var $flushIfNeededCOROUTINE$Class;
function $flushIfNeededCOROUTINE$() {
  if ($flushIfNeededCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.l3d_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                rethrowCloseCauseIfNeeded(this.l3d_1);
                var tmp_0;
                var tmp_1 = this.l3d_1;
                var tmp0_safe_receiver = tmp_1 instanceof ByteChannel() ? tmp_1 : null;
                if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.k33_1) === true) {
                  tmp_0 = true;
                } else {
                  tmp_0 = get_size(this.l3d_1.y35()) >= 1048576;
                }

                if (tmp_0) {
                  this.fd_1 = 1;
                  suspendResult = this.l3d_1.u35(this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 1:
                this.fd_1 = 2;
                continue $sm;
              case 2:
                return Unit_instance;
              case 3:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 3) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $flushIfNeededCOROUTINE$Class = $;
  }
  return $flushIfNeededCOROUTINE$Class;
}
//region block: exports
export {
  flushIfNeeded as flushIfNeeded2ae8rmpc1excy,
  close as closeqm43o3junf8o,
};
//endregion

//# sourceMappingURL=ByteWriteChannel.mjs.map
