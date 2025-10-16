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
import { Companion_instance1g2da6xvgv6cx as Companion_instance } from '../phoenix/AlertsChannel.mjs';
import {
  Errorw1uxmtp4dqlz as Error_0,
  Ok3b20rn08cfbo3 as Ok,
} from '../model/response/ApiResult.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
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
var com_mbta_tid_mbta_app_repositories_AlertsRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockAlertsRepository$stable;
var IAlertsRepositoryClass;
function IAlertsRepository() {
  if (IAlertsRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IAlertsRepository');
    IAlertsRepositoryClass = $;
  }
  return IAlertsRepositoryClass;
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
        println('' + e.message);
        return Unit_instance;
      } else {
        throw $p;
      }
    }
    var newAlerts = tmp;
    println('Received ' + newAlerts.y91_1.c1() + ' alerts');
    onReceive(new (Ok())(newAlerts));
  } else {
    println('No jsonPayload found for message ' + toString(message.b9t()));
  }
}
function AlertsRepository$connect$lambda(this$0, $onReceive) {
  return function (message) {
    handleNewDataMessage(this$0, message, $onReceive);
    return Unit_instance;
  };
}
function AlertsRepository$connect$lambda_0($onReceive) {
  return function (it) {
    $onReceive(new (Error_0())(VOID, 'channel failure'));
    return Unit_instance;
  };
}
function AlertsRepository$connect$lambda_1(message) {
  println('leaving channel ' + message.p3l());
  return Unit_instance;
}
function AlertsRepository$connect$lambda_2(this$0, $onReceive) {
  return function (message) {
    println('joined channel ' + message.p3l());
    handleNewDataMessage(this$0, message, $onReceive);
    return Unit_instance;
  };
}
function AlertsRepository$connect$lambda_3($onReceive) {
  return function (it) {
    $onReceive(new (Error_0())(VOID, 'channel received error'));
    return Unit_instance;
  };
}
function AlertsRepository$connect$lambda_4($onReceive) {
  return function (it) {
    $onReceive(new (Error_0())(VOID, 'channel timed out'));
    return Unit_instance;
  };
}
var AlertsRepositoryClass;
function AlertsRepository() {
  if (AlertsRepositoryClass === VOID) {
    class $ {
      constructor(socket) {
        this.c9t_1 = socket;
        this.d9t_1 = null;
      }
      y9s(onReceive) {
        this.z9s();
        this.d9t_1 = this.c9t_1.m9s(Companion_instance.o9s_1, emptyMap());
        var tmp0_safe_receiver = this.d9t_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          var tmp = Companion_instance.p9s_1;
          tmp0_safe_receiver.e9t(tmp, AlertsRepository$connect$lambda(this, onReceive));
        }
        var tmp1_safe_receiver = this.d9t_1;
        if (tmp1_safe_receiver == null)
          null;
        else {
          tmp1_safe_receiver.f9t(AlertsRepository$connect$lambda_0(onReceive));
        }
        var tmp2_safe_receiver = this.d9t_1;
        if (tmp2_safe_receiver == null)
          null;
        else {
          tmp2_safe_receiver.g9t(AlertsRepository$connect$lambda_1);
        }
        var tmp3_safe_receiver = this.d9t_1;
        var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.h9t();
        if (tmp4_safe_receiver == null)
          null;
        else {
          var tmp_0 = AlertsRepository$connect$lambda_2(this, onReceive);
          var tmp_1 = AlertsRepository$connect$lambda_3(onReceive);
          receiveAll(tmp4_safe_receiver, tmp_0, tmp_1, AlertsRepository$connect$lambda_4(onReceive));
        }
      }
      z9s() {
        var tmp0_safe_receiver = this.d9t_1;
        if (tmp0_safe_receiver == null)
          null;
        else
          tmp0_safe_receiver.i9t();
        this.d9t_1 = null;
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'AlertsRepository', VOID, VOID, [IAlertsRepository(), KoinComponent()]);
    AlertsRepositoryClass = $;
  }
  return AlertsRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_AlertsRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockAlertsRepository$stable = 8;
//endregion
//region block: exports
export {
  AlertsRepository as AlertsRepository30jdqpokdyh3y,
  IAlertsRepository as IAlertsRepository2nltalishntbu,
};
//endregion

//# sourceMappingURL=AlertsRepository.mjs.map
