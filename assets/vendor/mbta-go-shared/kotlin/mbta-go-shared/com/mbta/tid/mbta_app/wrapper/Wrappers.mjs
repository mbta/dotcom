import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  Directionsyoq7z5l537b as Direction,
  Tile1sffnmo21394z as Tile,
  Disruption13ux7gmmhvml7 as Disruption,
  TimeWithStatus1yjc17mfhj3n5 as TimeWithStatus,
  TimeWithSchedulecblumiuqhptg as TimeWithSchedule,
  Time10f0zcwpc74pu as Time,
  Skipped349eppuwd4p4n as Skipped,
  ScheduleTimeWithStatuszhmqhvhtdmgx as ScheduleTimeWithStatus,
  ScheduleTime38emxy67vjh1t as ScheduleTime,
  ScheduleMinutes3oac8n737v1vt as ScheduleMinutes,
  Overridden3dw3atsfj3kr3 as Overridden,
  Now_getInstance1avntqbru28yq as Now_getInstance,
  Minutes3awcowdeoings as Minutes,
  Hidden_getInstance34quzuevslmc9 as Hidden_getInstance,
  Cancelledo58bzwa54zjy as Cancelled,
  Boarding_getInstance1ij4hawy4usjb as Boarding_getInstance,
  Arriving_getInstance3qcahvcq9u930 as Arriving_getInstance,
  Approaching_getInstance3s632ak0z8nc6 as Approaching_getInstance,
  Status_IncomingAt_getInstance3kpa6ifcdlm9b as Status_IncomingAt_getInstance,
  Status_StoppedAt_getInstance1e70agc6xx6me as Status_StoppedAt_getInstance,
  Status_InTransitTo_getInstance222f6mt9aj8eh as Status_InTransitTo_getInstance,
  Vehiclei4d6c3hoqt9h as Vehicle,
  StopList2j2ujchkczfup as StopList,
  Entry109191p8c7ye7 as Entry,
} from './State.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { singleOrNullrknfaxokm1sl as singleOrNull } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  Some1vxe3j1x21foa as Some,
  NoTrips29kau07klwuoz as NoTrips,
  Loading_getInstanceu70orl848nij as Loading_getInstance,
  Disruption3h4mahuvj55iw as Disruption_0,
} from '../model/UpcomingFormat.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  TimeWithStatus1771brvrgnyah as TimeWithStatus_0,
  TimeWithSchedule1j3fi44oxlev9 as TimeWithSchedule_0,
  Time15nvomludg10 as Time_0,
  Skippedszanll7bzihn as Skipped_0,
  ScheduleTimeWithStatusRow34zg4mxlvmiy1 as ScheduleTimeWithStatusRow,
  ScheduleTimeWithStatusColumno059jhsz0v8w as ScheduleTimeWithStatusColumn,
  ScheduleTime3aijuiff19ws6 as ScheduleTime_0,
  ScheduleMinutes3id9itxod5ru4 as ScheduleMinutes_0,
  Overridden1g36yzko6ydin as Overridden_0,
  Now_getInstance33nqngby26t0r as Now_getInstance_0,
  Minutesvakgtrplae6d as Minutes_0,
  Hidden_getInstance3tuwjkl7eelw5 as Hidden_getInstance_0,
  Cancelled1yuon9u5xt80n as Cancelled_0,
  Boarding_getInstance1skrw37i837ga as Boarding_getInstance_0,
  Arriving_getInstance21h7sat1qm6zc as Arriving_getInstance_0,
  Approaching_getInstance2euup71dl9peq as Approaching_getInstance_0,
} from '../model/TripInstantDisplay.mjs';
import { toJSDate3pwyd8wp5i7ap as toJSDate } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/InstantConversions.mjs';
import {
  State21zwpn71lnuf as State,
  Segment231eglc9oj4ao as Segment,
  Stop3qdt9axzvcxlh as Stop,
  TwistedConnection35un2g87jjmx3 as TwistedConnection,
  StickConnection14xlkg7l6dpnm as StickConnection,
  Lane_Left_getInstance276z4y9t4qeau as Lane_Left_getInstance,
  Lane_Center_getInstance1ywcxy36tih3d as Lane_Center_getInstance,
  Lane_Right_getInstanceumpk1ek4bwa4 as Lane_Right_getInstance,
} from './RouteDetails.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function wrapped(_this__u8e3s4) {
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(_this__u8e3s4, 10));
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = new (Direction())(item.t90_1, item.u90_1, item.v90_1);
    destination.i(tmp$ret$0);
  }
  return destination;
}
function wrapped_0(_this__u8e3s4) {
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(_this__u8e3s4, 10));
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = new (Tile())(item.o9q_1, item.n9q_1.v8t_1.o8t_1, item.l9q_1, wrapped_1(item.m9q_1));
    destination.i(tmp$ret$0);
  }
  return destination;
}
function wrapped_1(_this__u8e3s4) {
  var tmp;
  if (_this__u8e3s4 instanceof Disruption_0()) {
    tmp = new (Disruption())(_this__u8e3s4.t97_1.a8z_1.w3_1);
  } else {
    if (equals(_this__u8e3s4, Loading_getInstance())) {
      tmp = null;
    } else {
      if (_this__u8e3s4 instanceof NoTrips()) {
        tmp = null;
      } else {
        if (_this__u8e3s4 instanceof Some()) {
          var tmp1_safe_receiver = singleOrNull(_this__u8e3s4.k92_1);
          var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.p92_1;
          tmp = tmp2_safe_receiver == null ? null : wrapped_2(tmp2_safe_receiver);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
  }
  return tmp;
}
function wrapped_2(_this__u8e3s4) {
  var tmp;
  if (equals(_this__u8e3s4, Approaching_getInstance_0())) {
    tmp = Approaching_getInstance();
  } else {
    if (equals(_this__u8e3s4, Arriving_getInstance_0())) {
      tmp = Arriving_getInstance();
    } else {
      if (equals(_this__u8e3s4, Boarding_getInstance_0())) {
        tmp = Boarding_getInstance();
      } else {
        if (_this__u8e3s4 instanceof Cancelled_0()) {
          tmp = new (Cancelled())(wrapped_3(_this__u8e3s4.z9l_1));
        } else {
          if (equals(_this__u8e3s4, Hidden_getInstance_0())) {
            tmp = Hidden_getInstance();
          } else {
            if (_this__u8e3s4 instanceof Minutes_0()) {
              tmp = new (Minutes())(_this__u8e3s4.p9l_1);
            } else {
              if (equals(_this__u8e3s4, Now_getInstance_0())) {
                tmp = Now_getInstance();
              } else {
                if (_this__u8e3s4 instanceof Overridden_0()) {
                  tmp = new (Overridden())(_this__u8e3s4.g9l_1);
                } else {
                  if (_this__u8e3s4 instanceof ScheduleMinutes_0()) {
                    tmp = new (ScheduleMinutes())(_this__u8e3s4.x9l_1);
                  } else {
                    if (_this__u8e3s4 instanceof ScheduleTime_0()) {
                      tmp = new (ScheduleTime())(wrapped_3(_this__u8e3s4.q9l_1));
                    } else {
                      if (_this__u8e3s4 instanceof ScheduleTimeWithStatusColumn()) {
                        tmp = new (ScheduleTimeWithStatus())(wrapped_3(_this__u8e3s4.s9l_1), _this__u8e3s4.t9l_1);
                      } else {
                        if (_this__u8e3s4 instanceof ScheduleTimeWithStatusRow()) {
                          tmp = new (ScheduleTimeWithStatus())(wrapped_3(_this__u8e3s4.v9l_1), _this__u8e3s4.w9l_1);
                        } else {
                          if (_this__u8e3s4 instanceof Skipped_0()) {
                            var tmp1_safe_receiver = _this__u8e3s4.y9l_1;
                            tmp = new (Skipped())(tmp1_safe_receiver == null ? null : wrapped_3(tmp1_safe_receiver));
                          } else {
                            if (_this__u8e3s4 instanceof Time_0()) {
                              tmp = new (Time())(wrapped_3(_this__u8e3s4.h9l_1));
                            } else {
                              if (_this__u8e3s4 instanceof TimeWithSchedule_0()) {
                                tmp = new (TimeWithSchedule())(wrapped_3(_this__u8e3s4.m9l_1), wrapped_3(_this__u8e3s4.n9l_1));
                              } else {
                                if (_this__u8e3s4 instanceof TimeWithStatus_0()) {
                                  tmp = new (TimeWithStatus())(wrapped_3(_this__u8e3s4.j9l_1), _this__u8e3s4.k9l_1);
                                } else {
                                  noWhenBranchMatchedException();
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return tmp;
}
function wrapped_3(_this__u8e3s4) {
  return toJSDate(_this__u8e3s4.bad());
}
function wrapped_4(_this__u8e3s4, global) {
  var tmp1_safe_receiver = global == null ? null : global.a9b(_this__u8e3s4.s9h_1);
  var tmp = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.y8q_1;
  var tmp_0;
  switch (_this__u8e3s4.l9h_1.x3_1) {
    case 0:
      tmp_0 = Status_IncomingAt_getInstance();
      break;
    case 1:
      tmp_0 = Status_StoppedAt_getInstance();
      break;
    case 2:
      tmp_0 = Status_InTransitTo_getInstance();
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return new (Vehicle())(_this__u8e3s4.s9h_1, tmp, tmp_0);
}
function wrapped_5(_this__u8e3s4, trip, now, route) {
  var tmp0_safe_receiver = _this__u8e3s4.v9k_1;
  var tmp = tmp0_safe_receiver == null ? null : wrapped_6(tmp0_safe_receiver, trip, now, route);
  var tmp1_safe_receiver = _this__u8e3s4.w9k_1;
  var tmp_0;
  if (tmp1_safe_receiver == null) {
    tmp_0 = null;
  } else {
    // Inline function 'kotlin.collections.mapNotNull' call
    // Inline function 'kotlin.collections.mapNotNullTo' call
    var destination = ArrayList().g1();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = tmp1_safe_receiver.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      var tmp0_safe_receiver_0 = wrapped_6(element, trip, now, route);
      if (tmp0_safe_receiver_0 == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        destination.i(tmp0_safe_receiver_0);
      }
    }
    tmp_0 = destination;
  }
  var tmp_1 = tmp_0;
  var tmp2_safe_receiver = _this__u8e3s4.x9k_1;
  var tmp_2 = tmp2_safe_receiver == null ? null : wrapped_6(tmp2_safe_receiver, trip, now, route);
  // Inline function 'kotlin.collections.mapNotNull' call
  var tmp0 = _this__u8e3s4.y9k_1;
  // Inline function 'kotlin.collections.mapNotNullTo' call
  var destination_0 = ArrayList().g1();
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_0 = tmp0.x();
  while (_iterator__ex2g4s_0.y()) {
    var element_0 = _iterator__ex2g4s_0.z();
    var tmp0_safe_receiver_1 = wrapped_6(element_0, trip, now, route);
    if (tmp0_safe_receiver_1 == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      destination_0.i(tmp0_safe_receiver_1);
    }
  }
  return new (StopList())(tmp, tmp_1, tmp_2, destination_0);
}
function wrapped_6(_this__u8e3s4, trip, now, route) {
  var tmp0_safe_receiver = _this__u8e3s4.m9k_1;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.g95_1;
  var tmp;
  if (tmp1_elvis_lhs == null) {
    var tmp2_safe_receiver = _this__u8e3s4.l9k_1;
    tmp = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.b9f_1;
  } else {
    tmp = tmp1_elvis_lhs;
  }
  var tmp3_elvis_lhs = tmp;
  var tmp_0 = tmp3_elvis_lhs == null ? _this__u8e3s4.i9k_1.v8q_1 + '-' + _this__u8e3s4.j9k_1 : tmp3_elvis_lhs;
  var tmp4_safe_receiver = _this__u8e3s4.t9k(trip, now, route);
  return new (Entry())(tmp_0, _this__u8e3s4.i9k_1.v8q_1, _this__u8e3s4.i9k_1.y8q_1, tmp4_safe_receiver == null ? null : wrapped_1(tmp4_safe_receiver));
}
function wrapped_7(_this__u8e3s4, route) {
  var tmp1_elvis_lhs = route == null ? null : route.q8r_1;
  var tmp = tmp1_elvis_lhs == null ? 'ba75c7' : tmp1_elvis_lhs;
  // Inline function 'kotlin.collections.map' call
  var this_0 = _this__u8e3s4.g9d_1;
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = wrapped_8(item);
    destination.i(tmp$ret$0);
  }
  return new (State())(tmp, destination);
}
function wrapped_8(_this__u8e3s4) {
  // Inline function 'kotlin.collections.map' call
  var this_0 = _this__u8e3s4.v9c_1;
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = wrapped_9(item);
    destination.i(tmp$ret$0);
  }
  var tmp = destination;
  var tmp_0;
  if (!_this__u8e3s4.w9c_1) {
    var tmp0_safe_receiver = _this__u8e3s4.y9c();
    var tmp_1;
    if (tmp0_safe_receiver == null) {
      tmp_1 = null;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList().w(collectionSizeOrDefault(tmp0_safe_receiver, 10));
      var _iterator__ex2g4s_0 = tmp0_safe_receiver.x();
      while (_iterator__ex2g4s_0.y()) {
        var item_0 = _iterator__ex2g4s_0.z();
        var tmp$ret$3 = wrapped_10(item_0);
        destination_0.i(tmp$ret$3);
      }
      tmp_1 = destination_0;
    }
    tmp_0 = tmp_1;
  } else {
    tmp_0 = null;
  }
  return new (Segment())(tmp, _this__u8e3s4.w9c_1, tmp_0);
}
function wrapped_9(_this__u8e3s4) {
  var tmp = wrapped_12(_this__u8e3s4.a9d_1);
  // Inline function 'kotlin.collections.map' call
  var this_0 = _this__u8e3s4.b9d_1;
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = wrapped_11(item);
    destination.i(tmp$ret$0);
  }
  return new (Stop())(_this__u8e3s4.z9c_1.y8q_1, tmp, destination);
}
function wrapped_10(_this__u8e3s4) {
  return new (TwistedConnection())(wrapped_11(_this__u8e3s4.ah_1), _this__u8e3s4.bh_1);
}
function wrapped_11(_this__u8e3s4) {
  return new (StickConnection())(_this__u8e3s4);
}
function wrapped_12(_this__u8e3s4) {
  var tmp;
  switch (_this__u8e3s4.x3_1) {
    case 0:
      tmp = Lane_Left_getInstance();
      break;
    case 1:
      tmp = Lane_Center_getInstance();
      break;
    case 2:
      tmp = Lane_Right_getInstance();
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
}
//region block: exports
export {
  wrapped_4 as wrapped1aa3vwsfply2p,
  wrapped as wrappedj7jodd2wuuw7,
  wrapped_7 as wrapped3nzz3ihzawmvu,
  wrapped_5 as wrapped2cei7yt5utnlq,
  wrapped_0 as wrapped3if6kf98agss2,
};
//endregion

//# sourceMappingURL=Wrappers.mjs.map
