import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  println2shhhgwwt4c61 as println,
  print1e1dy5saxeokj as print,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/io/console.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Companion_instance2nbnuxuna5lj0 as Companion_instance } from '../phoenix/PredictionsForStopsChannel.mjs';
import {
  Errorw1uxmtp4dqlz as Error_0,
  Ok3b20rn08cfbo3 as Ok,
} from '../model/response/ApiResult.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import {
  Companion_getInstance2mow8xipgd4ir as Companion_getInstance,
  EasternTimeInstant2gkkx101nv2no as EasternTimeInstant,
} from '../utils/EasternTimeInstant.mjs';
import { Companion_getInstance1jfygh5e58evr as Companion_getInstance_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Instant.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance_1,
  toDuration7gy6v749ektt as toDuration,
  Duration__compareTo_impl_pchp0f3d3hhywzdbk51 as Duration__compareTo_impl_pchp0f,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_MINUTES_getInstancejlptjvjgjkm8 as DurationUnit_MINUTES_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import { emptyMapr06gerzljqtm as emptyMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { receiveAll1yj6eun054tse as receiveAll } from '../network/MobilePhoenixInterfaces.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_PredictionsRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockPredictionsRepository$stable;
var IPredictionsRepositoryClass;
function IPredictionsRepository() {
  if (IPredictionsRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IPredictionsRepository');
    IPredictionsRepositoryClass = $;
  }
  return IPredictionsRepositoryClass;
}
function handleV2JoinMessage($this, message, onJoin) {
  var rawPayload = message.a9t();
  if (!(rawPayload == null)) {
    var tmp;
    try {
      tmp = Companion_instance.u9s(rawPayload);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof IllegalArgumentException()) {
        var e = $p;
        print('ERROR ' + e.toString());
        onJoin(new (Error_0())(VOID, 'channel failed to parse'));
        return Unit_instance;
      } else {
        throw $p;
      }
    }
    var newPredictionsByStop = tmp;
    // Inline function 'kotlin.collections.flatMap' call
    var tmp0 = newPredictionsByStop.d9o_1.l3();
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination = ArrayList().g1();
    var _iterator__ex2g4s = tmp0.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      var list = element.l3();
      addAll(destination, list);
    }
    println('Received ' + destination.c1() + ' predictions on join');
    $this.x9y_1 = Companion_getInstance().j8o();
    onJoin(new (Ok())(newPredictionsByStop));
  } else {
    println('No jsonPayload found for message ' + toString(message.b9t()));
  }
}
function PredictionsRepository$connectV2$lambda(this$0, $onMessage) {
  return function (message) {
    this$0.y9y(message, $onMessage);
    return Unit_instance;
  };
}
function PredictionsRepository$connectV2$lambda_0($onMessage) {
  return function (it) {
    $onMessage(new (Error_0())(VOID, 'channel failure'));
    return Unit_instance;
  };
}
function PredictionsRepository$connectV2$lambda_1(message) {
  println('leaving channel ' + message.p3l());
  return Unit_instance;
}
function PredictionsRepository$connectV2$lambda_2(this$0, $onJoin) {
  return function (message) {
    println('joined channel ' + message.p3l());
    handleV2JoinMessage(this$0, message, $onJoin);
    return Unit_instance;
  };
}
function PredictionsRepository$connectV2$lambda_3($onJoin) {
  return function (it) {
    $onJoin(new (Error_0())(VOID, 'channel received error'));
    return Unit_instance;
  };
}
function PredictionsRepository$connectV2$lambda_4($onJoin) {
  return function (it) {
    $onJoin(new (Error_0())(VOID, 'channel timed out'));
    return Unit_instance;
  };
}
var PredictionsRepositoryClass;
function PredictionsRepository() {
  if (PredictionsRepositoryClass === VOID) {
    class $ {
      constructor(socket) {
        this.v9y_1 = socket;
        this.w9y_1 = null;
        this.x9y_1 = null;
      }
      t9y() {
        return this.x9y_1;
      }
      u9y(predictionCount) {
        var tmp;
        var tmp_0 = Companion_getInstance().j8o();
        var tmp0_elvis_lhs = this.x9y_1;
        var tmp_1 = tmp_0.c9m(tmp0_elvis_lhs == null ? EasternTimeInstant().z9y(Companion_getInstance_0().nv()) : tmp0_elvis_lhs);
        // Inline function 'kotlin.time.Companion.minutes' call
        Companion_getInstance_1();
        var tmp$ret$0 = toDuration(10, DurationUnit_MINUTES_getInstance());
        if (Duration__compareTo_impl_pchp0f(tmp_1, tmp$ret$0) > 0) {
          tmp = predictionCount > 0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      s9y(stopIds, onJoin, onMessage) {
        this.z9s();
        var tmp = this;
        var tmp_0 = Companion_instance.t9s(stopIds);
        // Inline function 'kotlin.collections.mapOf' call
        var tmp$ret$0 = emptyMap();
        tmp.w9y_1 = this.v9y_1.m9s(tmp_0, tmp$ret$0);
        var tmp0_safe_receiver = this.w9y_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          var tmp_1 = Companion_instance.s9s_1;
          tmp0_safe_receiver.e9t(tmp_1, PredictionsRepository$connectV2$lambda(this, onMessage));
        }
        var tmp1_safe_receiver = this.w9y_1;
        if (tmp1_safe_receiver == null)
          null;
        else {
          tmp1_safe_receiver.f9t(PredictionsRepository$connectV2$lambda_0(onMessage));
        }
        var tmp2_safe_receiver = this.w9y_1;
        if (tmp2_safe_receiver == null)
          null;
        else {
          tmp2_safe_receiver.g9t(PredictionsRepository$connectV2$lambda_1);
        }
        var tmp3_safe_receiver = this.w9y_1;
        var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.h9t();
        if (tmp4_safe_receiver == null)
          null;
        else {
          var tmp_2 = PredictionsRepository$connectV2$lambda_2(this, onJoin);
          var tmp_3 = PredictionsRepository$connectV2$lambda_3(onJoin);
          receiveAll(tmp4_safe_receiver, tmp_2, tmp_3, PredictionsRepository$connectV2$lambda_4(onJoin));
        }
      }
      z9s() {
        var tmp0_safe_receiver = this.w9y_1;
        if (tmp0_safe_receiver == null)
          null;
        else
          tmp0_safe_receiver.i9t();
        this.w9y_1 = null;
      }
      y9y(message, onMessage) {
        var rawPayload = message.a9t();
        if (!(rawPayload == null)) {
          var tmp;
          try {
            tmp = Companion_instance.v9s(rawPayload);
          } catch ($p) {
            var tmp_0;
            if ($p instanceof IllegalArgumentException()) {
              var e = $p;
              onMessage(new (Error_0())(VOID, 'channel failed to parse'));
              return Unit_instance;
            } else {
              throw $p;
            }
          }
          var newPredictionsForStop = tmp;
          this.x9y_1 = Companion_getInstance().j8o();
          onMessage(new (Ok())(newPredictionsForStop));
        } else {
          println('No jsonPayload found for message ' + toString(message.b9t()));
        }
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'PredictionsRepository', VOID, VOID, [IPredictionsRepository(), KoinComponent()]);
    PredictionsRepositoryClass = $;
  }
  return PredictionsRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_PredictionsRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockPredictionsRepository$stable = 8;
//endregion
//region block: exports
export {
  IPredictionsRepository as IPredictionsRepository2ydt6pa8vjrl3,
  PredictionsRepository as PredictionsRepository3jvy3y42296te,
};
//endregion

//# sourceMappingURL=PredictionsRepository.mjs.map
