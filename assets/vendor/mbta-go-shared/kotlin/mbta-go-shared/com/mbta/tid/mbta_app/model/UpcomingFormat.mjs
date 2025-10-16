import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Collection1k04j3hzsbod0 as Collection } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_UpcomingFormat_NoTripsFormat_NoSchedulesToday$stable;
var com_mbta_tid_mbta_app_model_UpcomingFormat_NoTripsFormat_ServiceEndedToday$stable;
var com_mbta_tid_mbta_app_model_UpcomingFormat_NoTripsFormat_PredictionsUnavailable$stable;
var com_mbta_tid_mbta_app_model_UpcomingFormat_NoTripsFormat$stable;
var com_mbta_tid_mbta_app_model_UpcomingFormat_SecondaryAlert$stable;
var com_mbta_tid_mbta_app_model_UpcomingFormat_Loading$stable;
var com_mbta_tid_mbta_app_model_UpcomingFormat_Some_FormattedTrip$stable;
var com_mbta_tid_mbta_app_model_UpcomingFormat_Some$stable;
var com_mbta_tid_mbta_app_model_UpcomingFormat_NoTrips$stable;
var com_mbta_tid_mbta_app_model_UpcomingFormat_Disruption$stable;
var com_mbta_tid_mbta_app_model_UpcomingFormat$stable;
var NoSchedulesTodayClass;
function NoSchedulesToday() {
  if (NoSchedulesTodayClass === VOID) {
    class $ extends NoTripsFormat() {
      constructor() {
        NoSchedulesToday_instance = null;
        super();
        NoSchedulesToday_instance = this;
      }
      toString() {
        return 'NoSchedulesToday';
      }
      hashCode() {
        return -316304358;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof NoSchedulesToday()))
          return false;
        other instanceof NoSchedulesToday() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'NoSchedulesToday');
    NoSchedulesTodayClass = $;
  }
  return NoSchedulesTodayClass;
}
var NoSchedulesToday_instance;
function NoSchedulesToday_getInstance() {
  if (NoSchedulesToday_instance === VOID)
    new (NoSchedulesToday())();
  return NoSchedulesToday_instance;
}
var ServiceEndedTodayClass;
function ServiceEndedToday() {
  if (ServiceEndedTodayClass === VOID) {
    class $ extends NoTripsFormat() {
      constructor() {
        ServiceEndedToday_instance = null;
        super();
        ServiceEndedToday_instance = this;
      }
      toString() {
        return 'ServiceEndedToday';
      }
      hashCode() {
        return -1135004760;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ServiceEndedToday()))
          return false;
        other instanceof ServiceEndedToday() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'ServiceEndedToday');
    ServiceEndedTodayClass = $;
  }
  return ServiceEndedTodayClass;
}
var ServiceEndedToday_instance;
function ServiceEndedToday_getInstance() {
  if (ServiceEndedToday_instance === VOID)
    new (ServiceEndedToday())();
  return ServiceEndedToday_instance;
}
var PredictionsUnavailableClass;
function PredictionsUnavailable() {
  if (PredictionsUnavailableClass === VOID) {
    class $ extends NoTripsFormat() {
      constructor() {
        PredictionsUnavailable_instance = null;
        super();
        PredictionsUnavailable_instance = this;
      }
      toString() {
        return 'PredictionsUnavailable';
      }
      hashCode() {
        return -1137741568;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof PredictionsUnavailable()))
          return false;
        other instanceof PredictionsUnavailable() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'PredictionsUnavailable');
    PredictionsUnavailableClass = $;
  }
  return PredictionsUnavailableClass;
}
var PredictionsUnavailable_instance;
function PredictionsUnavailable_getInstance() {
  if (PredictionsUnavailable_instance === VOID)
    new (PredictionsUnavailable())();
  return PredictionsUnavailable_instance;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      x97(upcomingTrips, hasSchedulesToday, now) {
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.any' call
          var tmp;
          if (isInterface(upcomingTrips, Collection())) {
            tmp = upcomingTrips.h1();
          } else {
            tmp = false;
          }
          if (tmp) {
            tmp$ret$0 = false;
            break $l$block_0;
          }
          var _iterator__ex2g4s = upcomingTrips.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (!(element.b8u_1 == null) && element.b8u_1.q8y(now) > 0 && !element.t21()) {
              tmp$ret$0 = true;
              break $l$block_0;
            }
          }
          tmp$ret$0 = false;
        }
        var hasUpcomingTrips = tmp$ret$0;
        return !hasSchedulesToday ? NoSchedulesToday_getInstance() : hasUpcomingTrips ? PredictionsUnavailable_getInstance() : ServiceEndedToday_getInstance();
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
var FormattedTripClass;
function FormattedTrip() {
  if (FormattedTripClass === VOID) {
    class $ {
      static d9m(trip, routeType, format) {
        var $this = createThis(this);
        $this.n92_1 = trip;
        $this.o92_1 = routeType;
        $this.p92_1 = format;
        return $this;
      }
      static e9m(trip, routeType, now, context) {
        return this.d9m(trip, routeType, trip.f9m(now, routeType, context));
      }
      toString() {
        return toString(this.p92_1);
      }
      hashCode() {
        var result = this.n92_1.hashCode();
        result = imul(result, 31) + this.o92_1.hashCode() | 0;
        result = imul(result, 31) + hashCode(this.p92_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof FormattedTrip()))
          return false;
        var tmp0_other_with_cast = other instanceof FormattedTrip() ? other : THROW_CCE();
        if (!this.n92_1.equals(tmp0_other_with_cast.n92_1))
          return false;
        if (!this.o92_1.equals(tmp0_other_with_cast.o92_1))
          return false;
        if (!equals(this.p92_1, tmp0_other_with_cast.p92_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'FormattedTrip');
    FormattedTripClass = $;
  }
  return FormattedTripClass;
}
function iconName($this, alertState, mapStopRoute) {
  var tmp;
  if (mapStopRoute == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = 'large-' + mapStopRoute.w3_1.toLowerCase();
  }
  var tmp1_elvis_lhs = tmp;
  var tmp_0 = tmp1_elvis_lhs == null ? 'borderless' : tmp1_elvis_lhs;
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  return 'alert-' + tmp_0 + '-' + alertState.w3_1.toLowerCase();
}
var NoTripsFormatClass;
function NoTripsFormat() {
  if (NoTripsFormatClass === VOID) {
    class $ {}
    initMetadataForClass($, 'NoTripsFormat');
    NoTripsFormatClass = $;
  }
  return NoTripsFormatClass;
}
var SecondaryAlertClass;
function SecondaryAlert() {
  if (SecondaryAlertClass === VOID) {
    class $ {
      static g9m(iconName) {
        var $this = createThis(this);
        $this.d9b_1 = iconName;
        return $this;
      }
      static e9b(alertState, mapStopRoute) {
        return this.g9m(iconName(Companion_instance_0, alertState, mapStopRoute));
      }
      toString() {
        return 'SecondaryAlert(iconName=' + this.d9b_1 + ')';
      }
      hashCode() {
        return getStringHashCode(this.d9b_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof SecondaryAlert()))
          return false;
        var tmp0_other_with_cast = other instanceof SecondaryAlert() ? other : THROW_CCE();
        if (!(this.d9b_1 === tmp0_other_with_cast.d9b_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'SecondaryAlert');
    SecondaryAlertClass = $;
  }
  return SecondaryAlertClass;
}
var LoadingClass;
function Loading() {
  if (LoadingClass === VOID) {
    class $ extends UpcomingFormat() {
      static i9m() {
        Loading_instance = null;
        var $this = this.j9m();
        Loading_instance = $this;
        $this.h9m_1 = null;
        return $this;
      }
      toString() {
        return 'Loading';
      }
      hashCode() {
        return 2077552434;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Loading()))
          return false;
        other instanceof Loading() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Loading');
    LoadingClass = $;
  }
  return LoadingClass;
}
var Loading_instance;
function Loading_getInstance() {
  if (Loading_instance === VOID)
    Loading().i9m();
  return Loading_instance;
}
var SomeClass;
function Some() {
  if (SomeClass === VOID) {
    class $ extends UpcomingFormat() {
      static b98(trips, secondaryAlert) {
        var $this = this.j9m();
        $this.k92_1 = trips;
        $this.l92_1 = secondaryAlert;
        return $this;
      }
      static m92(trip, secondaryAlert) {
        return this.b98(listOf(trip), secondaryAlert);
      }
      toString() {
        return 'Some(trips=' + toString(this.k92_1) + ', secondaryAlert=' + toString_0(this.l92_1) + ')';
      }
      hashCode() {
        var result = hashCode(this.k92_1);
        result = imul(result, 31) + (this.l92_1 == null ? 0 : this.l92_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Some()))
          return false;
        var tmp0_other_with_cast = other instanceof Some() ? other : THROW_CCE();
        if (!equals(this.k92_1, tmp0_other_with_cast.k92_1))
          return false;
        if (!equals(this.l92_1, tmp0_other_with_cast.l92_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Some');
    SomeClass = $;
  }
  return SomeClass;
}
var NoTripsClass;
function NoTrips() {
  if (NoTripsClass === VOID) {
    class $ extends UpcomingFormat() {
      static a98(noTripsFormat, secondaryAlert) {
        secondaryAlert = secondaryAlert === VOID ? null : secondaryAlert;
        var $this = this.j9m();
        $this.y97_1 = noTripsFormat;
        $this.z97_1 = secondaryAlert;
        return $this;
      }
      toString() {
        return 'NoTrips(noTripsFormat=' + toString(this.y97_1) + ', secondaryAlert=' + toString_0(this.z97_1) + ')';
      }
      hashCode() {
        var result = hashCode(this.y97_1);
        result = imul(result, 31) + (this.z97_1 == null ? 0 : this.z97_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof NoTrips()))
          return false;
        var tmp0_other_with_cast = other instanceof NoTrips() ? other : THROW_CCE();
        if (!equals(this.y97_1, tmp0_other_with_cast.y97_1))
          return false;
        if (!equals(this.z97_1, tmp0_other_with_cast.z97_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'NoTrips');
    NoTripsClass = $;
  }
  return NoTripsClass;
}
var DisruptionClass;
function Disruption() {
  if (DisruptionClass === VOID) {
    class $ extends UpcomingFormat() {
      static k9m(alert, iconName) {
        var $this = this.j9m();
        $this.t97_1 = alert;
        $this.u97_1 = iconName;
        $this.v97_1 = null;
        return $this;
      }
      static w97(alert, mapStopRoute) {
        return this.k9m(alert, iconName(Companion_instance_0, alert.i8z_1, mapStopRoute));
      }
      toString() {
        return 'Disruption(alert=' + this.t97_1.toString() + ', iconName=' + this.u97_1 + ')';
      }
      hashCode() {
        var result = this.t97_1.hashCode();
        result = imul(result, 31) + getStringHashCode(this.u97_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Disruption()))
          return false;
        var tmp0_other_with_cast = other instanceof Disruption() ? other : THROW_CCE();
        if (!this.t97_1.equals(tmp0_other_with_cast.t97_1))
          return false;
        if (!(this.u97_1 === tmp0_other_with_cast.u97_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Disruption');
    DisruptionClass = $;
  }
  return DisruptionClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  return Companion_instance_0;
}
var UpcomingFormatClass;
function UpcomingFormat() {
  if (UpcomingFormatClass === VOID) {
    class $ {
      static j9m() {
        return createThis(this);
      }
    }
    initMetadataForClass($, 'UpcomingFormat');
    UpcomingFormatClass = $;
  }
  return UpcomingFormatClass;
}
//region block: init
com_mbta_tid_mbta_app_model_UpcomingFormat_NoTripsFormat_NoSchedulesToday$stable = 0;
com_mbta_tid_mbta_app_model_UpcomingFormat_NoTripsFormat_ServiceEndedToday$stable = 0;
com_mbta_tid_mbta_app_model_UpcomingFormat_NoTripsFormat_PredictionsUnavailable$stable = 0;
com_mbta_tid_mbta_app_model_UpcomingFormat_NoTripsFormat$stable = 0;
com_mbta_tid_mbta_app_model_UpcomingFormat_SecondaryAlert$stable = 0;
com_mbta_tid_mbta_app_model_UpcomingFormat_Loading$stable = 0;
com_mbta_tid_mbta_app_model_UpcomingFormat_Some_FormattedTrip$stable = 8;
com_mbta_tid_mbta_app_model_UpcomingFormat_Some$stable = 8;
com_mbta_tid_mbta_app_model_UpcomingFormat_NoTrips$stable = 0;
com_mbta_tid_mbta_app_model_UpcomingFormat_Disruption$stable = 8;
com_mbta_tid_mbta_app_model_UpcomingFormat$stable = 0;
Companion_instance = new (Companion())();
Companion_instance_0 = new (Companion_0())();
//endregion
//region block: exports
export {
  Disruption as Disruption3h4mahuvj55iw,
  NoTrips as NoTrips29kau07klwuoz,
  SecondaryAlert as SecondaryAlert1frcy9kcqjdqc,
  FormattedTrip as FormattedTrip3c5m45gvmcph2,
  Some as Some1vxe3j1x21foa,
  Loading_getInstance as Loading_getInstanceu70orl848nij,
  Companion_instance as Companion_instanceldwplc0fr9g7,
  PredictionsUnavailable_getInstance as PredictionsUnavailable_getInstance37y3wnzovglyc,
};
//endregion

//# sourceMappingURL=UpcomingFormat.mjs.map
