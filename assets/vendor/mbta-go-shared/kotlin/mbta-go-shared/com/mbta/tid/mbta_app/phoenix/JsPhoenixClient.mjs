import { Socket as Socket } from 'phoenix';
import { json3n35pf5np6si4 as json } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/json.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { PhoenixSocket13et8h4925i39 as PhoenixSocket } from '../network/MobilePhoenixInterfaces.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { emptyMapr06gerzljqtm as emptyMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Paire9pteg33gng7 as Pair } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_phoenix_JsPhoenixSocket$stable;
var com_mbta_tid_mbta_app_phoenix_JsPhoenixChannel$stable;
var com_mbta_tid_mbta_app_phoenix_JsPhoenixPush$stable;
var com_mbta_tid_mbta_app_phoenix_JsPhoenixMessage$stable;
var JsPhoenixSocketClass;
function JsPhoenixSocket() {
  if (JsPhoenixSocketClass === VOID) {
    class $ {
      constructor(socketUrl) {
        this.qbt_1 = new Socket(socketUrl);
      }
      rbt() {
        this.qbt_1.connect();
      }
      m9s(topic, params) {
        var resultParams = json([]);
        // Inline function 'kotlin.collections.forEach' call
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = params.t1().x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          // Inline function 'kotlin.collections.component1' call
          var k = element.u1();
          // Inline function 'kotlin.collections.component2' call
          var v = element.v1();
          resultParams[k] = v;
        }
        return new (JsPhoenixChannel())(this.qbt_1.channel(topic, resultParams));
      }
    }
    initMetadataForClass($, 'JsPhoenixSocket', VOID, VOID, [PhoenixSocket()]);
    JsPhoenixSocketClass = $;
  }
  return JsPhoenixSocketClass;
}
function JsPhoenixChannel$onEvent$lambda($callback, this$0) {
  return function (it) {
    $callback(Companion_instance.tbt(it, this$0.sbt_1.topic));
    return Unit_instance;
  };
}
function JsPhoenixChannel$onFailure$lambda($callback, this$0) {
  return function (it) {
    $callback(Companion_instance.tbt(it, this$0.sbt_1.topic));
    return Unit_instance;
  };
}
function JsPhoenixChannel$onDetach$lambda($callback, this$0) {
  return function (it) {
    $callback(Companion_instance.tbt(it, this$0.sbt_1.topic));
    return Unit_instance;
  };
}
var JsPhoenixChannelClass;
function JsPhoenixChannel() {
  if (JsPhoenixChannelClass === VOID) {
    class $ {
      constructor(inner) {
        this.sbt_1 = inner;
      }
      e9t(event, callback) {
        return this.sbt_1.on(event, JsPhoenixChannel$onEvent$lambda(callback, this));
      }
      f9t(callback) {
        this.sbt_1.onError(JsPhoenixChannel$onFailure$lambda(callback, this));
      }
      g9t(callback) {
        this.sbt_1.onClose(JsPhoenixChannel$onDetach$lambda(callback, this));
      }
      h9t() {
        return new (JsPhoenixPush())(this.sbt_1.join());
      }
      i9t() {
        return new (JsPhoenixPush())(this.sbt_1.leave());
      }
    }
    initMetadataForClass($, 'JsPhoenixChannel');
    JsPhoenixChannelClass = $;
  }
  return JsPhoenixChannelClass;
}
function JsPhoenixPush$receive$lambda($callback, this$0) {
  return function (it) {
    $callback(Companion_instance.tbt(it, this$0.ubt_1.channel.topic));
    return Unit_instance;
  };
}
var JsPhoenixPushClass;
function JsPhoenixPush() {
  if (JsPhoenixPushClass === VOID) {
    class $ {
      constructor(inner) {
        this.ubt_1 = inner;
      }
      l9s(status, callback) {
        var tmp = this.ubt_1;
        tmp.receive(status.w3_1, JsPhoenixPush$receive$lambda(callback, this));
        return this;
      }
    }
    initMetadataForClass($, 'JsPhoenixPush');
    JsPhoenixPushClass = $;
  }
  return JsPhoenixPushClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      tbt(data, channelTopic) {
        if (typeof data === 'object') {
          var data_0 = data;
          var tmp = data_0['topic'];
          var tmp0_elvis_lhs = (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : null;
          var subject = tmp0_elvis_lhs == null ? channelTopic : tmp0_elvis_lhs;
          var bodyEntries = Object.entries(data_0);
          // Inline function 'kotlin.collections.associate' call
          var capacity = coerceAtLeast(mapCapacity(bodyEntries.length), 16);
          // Inline function 'kotlin.collections.associateTo' call
          var destination = LinkedHashMap().tc(capacity);
          var inductionVariable = 0;
          var last = bodyEntries.length;
          while (inductionVariable < last) {
            var element = bodyEntries[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            // Inline function 'kotlin.collections.component1' call
            var key = element[0];
            // Inline function 'kotlin.collections.component2' call
            var value = element[1];
            // Inline function 'kotlin.collections.plusAssign' call
            var pair = new (Pair())((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE(), value);
            destination.t3(pair.ah_1, pair.bh_1);
          }
          var body = destination;
          var jsonBody = JSON.stringify(data_0);
          return new (JsPhoenixMessage())(subject, body, jsonBody);
        } else {
          return new (JsPhoenixMessage())(channelTopic, emptyMap(), null);
        }
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var JsPhoenixMessageClass;
function JsPhoenixMessage() {
  if (JsPhoenixMessageClass === VOID) {
    class $ {
      constructor(subject, body, jsonBody) {
        this.vbt_1 = subject;
        this.wbt_1 = body;
        this.xbt_1 = jsonBody;
      }
      p3l() {
        return this.vbt_1;
      }
      b9t() {
        return this.wbt_1;
      }
      a9t() {
        return this.xbt_1;
      }
    }
    initMetadataForClass($, 'JsPhoenixMessage');
    JsPhoenixMessageClass = $;
  }
  return JsPhoenixMessageClass;
}
//region block: init
com_mbta_tid_mbta_app_phoenix_JsPhoenixSocket$stable = 0;
com_mbta_tid_mbta_app_phoenix_JsPhoenixChannel$stable = 0;
com_mbta_tid_mbta_app_phoenix_JsPhoenixPush$stable = 8;
com_mbta_tid_mbta_app_phoenix_JsPhoenixMessage$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  JsPhoenixSocket as JsPhoenixSocket1kp5kerls8o1s,
};
//endregion

//# sourceMappingURL=JsPhoenixClient.mjs.map
