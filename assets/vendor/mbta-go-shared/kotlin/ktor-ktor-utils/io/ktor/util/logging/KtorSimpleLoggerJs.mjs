import { PlatformUtils_getInstance350nj2wi6ds9r as PlatformUtils_getInstance } from '../PlatformUtils.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
  _Result___get_value__impl__bjfvqg2ei4op8d4d2m as _Result___get_value__impl__bjfvqg,
  _Result___get_isFailure__impl__jpirivrr0d11rbi6gb as _Result___get_isFailure__impl__jpiriv,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  get_entries3rhsgvbgx7tis as get_entries,
  LogLevel_INFO_getInstance3hkfl5alteyab as LogLevel_INFO_getInstance,
  LogLevel_TRACE_getInstanceoetpm2i6d0wa as LogLevel_TRACE_getInstance,
  LogLevel_WARN_getInstance2n4u8k0gol84p as LogLevel_WARN_getInstance,
  LogLevel_DEBUG_getInstance3ffzvcje6l6kj as LogLevel_DEBUG_getInstance,
} from './LoggerJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function KtorSimpleLogger(name) {
  return new (KtorSimpleLogger$1())();
}
function getKtorLogLevel() {
  return process ? process.env.KTOR_LOG_LEVEL : null;
}
var KtorSimpleLogger$1Class;
function KtorSimpleLogger$1() {
  if (KtorSimpleLogger$1Class === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        var tmp_0;
        switch (PlatformUtils_getInstance().q3i_1 || PlatformUtils_getInstance().p3i_1) {
          case true:
            // Inline function 'kotlin.runCatching' call

            var tmp_1;
            try {
              // Inline function 'kotlin.Companion.success' call
              var value = getKtorLogLevel();
              tmp_1 = _Result___init__impl__xyqfz8(value);
            } catch ($p) {
              var tmp_2;
              if ($p instanceof Error) {
                var e = $p;
                // Inline function 'kotlin.Companion.failure' call
                tmp_2 = _Result___init__impl__xyqfz8(createFailure(e));
              } else {
                throw $p;
              }
              tmp_1 = tmp_2;
            }

            // Inline function 'kotlin.Result.getOrNull' call

            var this_0 = tmp_1;
            var tmp_3;
            if (_Result___get_isFailure__impl__jpiriv(this_0)) {
              tmp_3 = null;
            } else {
              var tmp_4 = _Result___get_value__impl__bjfvqg(this_0);
              tmp_3 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
            }

            var tmp1_safe_receiver = tmp_3;
            var tmp_5;
            if (tmp1_safe_receiver == null) {
              tmp_5 = null;
            } else {
              // Inline function 'kotlin.let' call
              var tmp0 = get_entries();
              var tmp$ret$6;
              $l$block: {
                // Inline function 'kotlin.collections.firstOrNull' call
                var _iterator__ex2g4s = tmp0.x();
                while (_iterator__ex2g4s.y()) {
                  var element = _iterator__ex2g4s.z();
                  if (element.w3_1 === tmp1_safe_receiver) {
                    tmp$ret$6 = element;
                    break $l$block;
                  }
                }
                tmp$ret$6 = null;
              }
              tmp_5 = tmp$ret$6;
            }

            var tmp2_elvis_lhs = tmp_5;
            tmp_0 = tmp2_elvis_lhs == null ? LogLevel_INFO_getInstance() : tmp2_elvis_lhs;
            break;
          case false:
            tmp_0 = LogLevel_TRACE_getInstance();
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        tmp.q3n_1 = tmp_0;
      }
      r3n() {
        return this.q3n_1;
      }
      s3n(message) {
        if (this.q3n_1.a4(LogLevel_WARN_getInstance()) > 0)
          return Unit_instance;
        console.warn(message);
      }
      t3n(message, cause) {
        if (this.q3n_1.a4(LogLevel_DEBUG_getInstance()) > 0)
          return Unit_instance;
        console.debug('DEBUG: ' + message + ', cause: ' + cause.toString());
      }
      u3n(message) {
        if (this.q3n_1.a4(LogLevel_TRACE_getInstance()) > 0)
          return Unit_instance;
        console.debug('TRACE: ' + message);
      }
    }
    initMetadataForClass($);
    KtorSimpleLogger$1Class = $;
  }
  return KtorSimpleLogger$1Class;
}
//region block: exports
export {
  KtorSimpleLogger as KtorSimpleLogger1xdphsp5l4e48,
};
//endregion

//# sourceMappingURL=KtorSimpleLoggerJs.mjs.map
