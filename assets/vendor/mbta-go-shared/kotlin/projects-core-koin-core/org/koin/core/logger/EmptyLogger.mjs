import {
  Logger1eor7oe4ryao4 as Logger,
  Level_NONE_getInstance38y99qbmrsqoo as Level_NONE_getInstance,
} from './Logger.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var EmptyLoggerClass;
function EmptyLogger() {
  if (EmptyLoggerClass === VOID) {
    class $ extends Logger() {
      constructor() {
        super(Level_NONE_getInstance());
      }
      q7v(level, msg) {
      }
    }
    initMetadataForClass($, 'EmptyLogger', EmptyLogger);
    EmptyLoggerClass = $;
  }
  return EmptyLoggerClass;
}
//region block: exports
export {
  EmptyLogger as EmptyLogger2zykw532lsczr,
};
//endregion

//# sourceMappingURL=EmptyLogger.mjs.map
