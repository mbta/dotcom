import { EventLoopljivmgnf56lj as EventLoop } from './EventLoop.common.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function createEventLoop() {
  return new (UnconfinedEventLoop())();
}
var UnconfinedEventLoopClass;
function UnconfinedEventLoop() {
  if (UnconfinedEventLoopClass === VOID) {
    class $ extends EventLoop() {
      m28(context, block) {
        unsupported();
      }
    }
    initMetadataForClass($, 'UnconfinedEventLoop', UnconfinedEventLoop);
    UnconfinedEventLoopClass = $;
  }
  return UnconfinedEventLoopClass;
}
function unsupported() {
  throw UnsupportedOperationException().f6('runBlocking event loop is not supported');
}
//region block: exports
export {
  createEventLoop as createEventLoop3pvigh4qbw0m0,
};
//endregion

//# sourceMappingURL=EventLoop.mjs.map
