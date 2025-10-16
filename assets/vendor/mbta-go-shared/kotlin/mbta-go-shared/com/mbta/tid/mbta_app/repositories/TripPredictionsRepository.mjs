import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { println2shhhgwwt4c61 as println } from '../../../../../../kotlin-kotlin-stdlib/kotlin/io/console.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Companion_instance2nbnuxuna5lj0 as Companion_instance } from '../phoenix/PredictionsForStopsChannel.mjs';
import {
  Errorw1uxmtp4dqlz as Error_0,
  Ok3b20rn08cfbo3 as Ok,
} from '../model/response/ApiResult.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
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
var com_mbta_tid_mbta_app_repositories_TripPredictionsRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockTripPredictionsRepository$stable;
var ITripPredictionsRepositoryClass;
function ITripPredictionsRepository() {
  if (ITripPredictionsRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ITripPredictionsRepository');
    ITripPredictionsRepositoryClass = $;
  }
  return ITripPredictionsRepositoryClass;
}
function handleNewDataMessage($this, message, onReceive) {
  var rawPayload = message.a9t();
  if (!(rawPayload == null)) {
    var tmp;
    try {
      tmp = Companion_instance.q9s(rawPayload);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof IllegalArgumentException()) {
        var e = $p;
        onReceive(new (Error_0())(VOID, 'channel failed to parse'));
        return Unit_instance;
      } else {
        throw $p;
      }
    }
    var newPredictions = tmp;
    println('Received ' + newPredictions.r9b_1.c1() + ' predictions');
    $this.ta3_1 = Companion_getInstance().j8o();
    onReceive(new (Ok())(newPredictions));
  } else {
    println('No jsonPayload found for message ' + toString(message.b9t()));
  }
}
function TripPredictionsRepository$connect$lambda(this$0, $onReceive) {
  return function (message) {
    handleNewDataMessage(this$0, message, $onReceive);
    return Unit_instance;
  };
}
function TripPredictionsRepository$connect$lambda_0($onReceive) {
  return function (it) {
    $onReceive(new (Error_0())(VOID, 'channel failure'));
    return Unit_instance;
  };
}
function TripPredictionsRepository$connect$lambda_1(message) {
  println('leaving channel ' + message.p3l());
  return Unit_instance;
}
function TripPredictionsRepository$connect$lambda_2(this$0, $onReceive) {
  return function (message) {
    println('joined channel ' + message.p3l());
    handleNewDataMessage(this$0, message, $onReceive);
    return Unit_instance;
  };
}
function TripPredictionsRepository$connect$lambda_3($onReceive) {
  return function (it) {
    $onReceive(new (Error_0())(VOID, 'channel received error'));
    return Unit_instance;
  };
}
function TripPredictionsRepository$connect$lambda_4($onReceive) {
  return function (it) {
    $onReceive(new (Error_0())(VOID, 'channel timed out'));
    return Unit_instance;
  };
}
var TripPredictionsRepositoryClass;
function TripPredictionsRepository() {
  if (TripPredictionsRepositoryClass === VOID) {
    class $ {
      constructor(socket) {
        this.ra3_1 = socket;
        this.sa3_1 = null;
        this.ta3_1 = null;
      }
      t9y() {
        return this.ta3_1;
      }
      u9y(predictionCount) {
        var tmp;
        var tmp_0 = Companion_getInstance().j8o();
        var tmp0_elvis_lhs = this.ta3_1;
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
      qa3(tripId, onReceive) {
        this.z9s();
        this.sa3_1 = this.ra3_1.m9s('predictions:trip:' + tripId, emptyMap());
        var tmp0_safe_receiver = this.sa3_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          var tmp = Companion_instance.s9s_1;
          tmp0_safe_receiver.e9t(tmp, TripPredictionsRepository$connect$lambda(this, onReceive));
        }
        var tmp1_safe_receiver = this.sa3_1;
        if (tmp1_safe_receiver == null)
          null;
        else {
          tmp1_safe_receiver.f9t(TripPredictionsRepository$connect$lambda_0(onReceive));
        }
        var tmp2_safe_receiver = this.sa3_1;
        if (tmp2_safe_receiver == null)
          null;
        else {
          tmp2_safe_receiver.g9t(TripPredictionsRepository$connect$lambda_1);
        }
        var tmp3_safe_receiver = this.sa3_1;
        var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.h9t();
        if (tmp4_safe_receiver == null)
          null;
        else {
          var tmp_0 = TripPredictionsRepository$connect$lambda_2(this, onReceive);
          var tmp_1 = TripPredictionsRepository$connect$lambda_3(onReceive);
          receiveAll(tmp4_safe_receiver, tmp_0, tmp_1, TripPredictionsRepository$connect$lambda_4(onReceive));
        }
      }
      z9s() {
        var tmp0_safe_receiver = this.sa3_1;
        if (tmp0_safe_receiver == null)
          null;
        else
          tmp0_safe_receiver.i9t();
        this.sa3_1 = null;
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'TripPredictionsRepository', VOID, VOID, [ITripPredictionsRepository(), KoinComponent()]);
    TripPredictionsRepositoryClass = $;
  }
  return TripPredictionsRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_TripPredictionsRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockTripPredictionsRepository$stable = 8;
//endregion
//region block: exports
export {
  ITripPredictionsRepository as ITripPredictionsRepository2u5evlejn4wwm,
  TripPredictionsRepository as TripPredictionsRepository3zbisg8rlevb,
};
//endregion

//# sourceMappingURL=TripPredictionsRepository.mjs.map
