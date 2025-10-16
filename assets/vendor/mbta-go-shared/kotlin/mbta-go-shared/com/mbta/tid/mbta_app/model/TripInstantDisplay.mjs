import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import {
  RouteType_COMMUTER_RAIL_getInstancerf8k2n6webhv as RouteType_COMMUTER_RAIL_getInstance,
  RouteType_FERRY_getInstance2ap57x114albq as RouteType_FERRY_getInstance,
  RouteType_BUS_getInstance1q03qahihhdox as RouteType_BUS_getInstance,
} from './RouteType.mjs';
import {
  ScheduleRelationship_Skipped_getInstanceiclzjn4iwm8y as ScheduleRelationship_Skipped_getInstance,
  ScheduleRelationship_Cancelled_getInstance3gcqjojivixxs as ScheduleRelationship_Cancelled_getInstance,
  get_SCHEDULE_CLOCK_CUTOFF20l46eoxwx97l as get_SCHEDULE_CLOCK_CUTOFF,
  get_ARRIVAL_CUTOFF1p3vhejkg7kx2 as get_ARRIVAL_CUTOFF,
  get_BOARDING_CUTOFFjt2hwbdoze6x as get_BOARDING_CUTOFF,
  get_APPROACH_CUTOFF2jusrpzx3r4vs as get_APPROACH_CUTOFF,
} from './Prediction.mjs';
import { DurationUnit_MINUTES_getInstancejlptjvjgjkm8 as DurationUnit_MINUTES_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import {
  Duration__toDouble_impl_a56y2bbonx5x15fky2 as Duration__toDouble_impl_a56y2b,
  Duration__isNegative_impl_pbysfa3pj1ldkh46xsj as Duration__isNegative_impl_pbysfa,
  Duration__compareTo_impl_pchp0f3d3hhywzdbk51 as Duration__compareTo_impl_pchp0f,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { roundToInt1ue8x8yshtznx as roundToInt } from '../../../../../../kotlin-kotlin-stdlib/kotlin/math/math.mjs';
import { CurrentStatus_StoppedAt_getInstanceyckhkey9js9v as CurrentStatus_StoppedAt_getInstance } from './Vehicle.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_TripInstantDisplay_Overridden$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_Hidden$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_Boarding$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_Arriving$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_Approaching$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_Now$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_Time$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_TimeWithStatus$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_TimeWithSchedule$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_Minutes$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_ScheduleTime$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_ScheduleTimeWithStatusColumn$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_ScheduleTimeWithStatusRow$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_ScheduleMinutes$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_Skipped$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay_Cancelled$stable;
var com_mbta_tid_mbta_app_model_TripInstantDisplay$stable;
var Context_NearbyTransit_instance;
var Context_StopDetailsUnfiltered_instance;
var Context_StopDetailsFiltered_instance;
var Context_TripDetails_instance;
var Context_entriesInitialized;
function Context_initEntries() {
  if (Context_entriesInitialized)
    return Unit_instance;
  Context_entriesInitialized = true;
  Context_NearbyTransit_instance = new (Context())('NearbyTransit', 0);
  Context_StopDetailsUnfiltered_instance = new (Context())('StopDetailsUnfiltered', 1);
  Context_StopDetailsFiltered_instance = new (Context())('StopDetailsFiltered', 2);
  Context_TripDetails_instance = new (Context())('TripDetails', 3);
}
var OverriddenClass;
function Overridden() {
  if (OverriddenClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(text) {
        super();
        this.g9l_1 = text;
      }
      toString() {
        return 'Overridden(text=' + this.g9l_1 + ')';
      }
      hashCode() {
        return getStringHashCode(this.g9l_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Overridden()))
          return false;
        var tmp0_other_with_cast = other instanceof Overridden() ? other : THROW_CCE();
        if (!(this.g9l_1 === tmp0_other_with_cast.g9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Overridden');
    OverriddenClass = $;
  }
  return OverriddenClass;
}
var HiddenClass;
function Hidden() {
  if (HiddenClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor() {
        Hidden_instance = null;
        super();
        Hidden_instance = this;
      }
      toString() {
        return 'Hidden';
      }
      hashCode() {
        return -1466375391;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Hidden()))
          return false;
        other instanceof Hidden() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Hidden');
    HiddenClass = $;
  }
  return HiddenClass;
}
var Hidden_instance;
function Hidden_getInstance() {
  if (Hidden_instance === VOID)
    new (Hidden())();
  return Hidden_instance;
}
var BoardingClass;
function Boarding() {
  if (BoardingClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor() {
        Boarding_instance = null;
        super();
        Boarding_instance = this;
      }
      toString() {
        return 'Boarding';
      }
      hashCode() {
        return -1347339533;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Boarding()))
          return false;
        other instanceof Boarding() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Boarding');
    BoardingClass = $;
  }
  return BoardingClass;
}
var Boarding_instance;
function Boarding_getInstance() {
  if (Boarding_instance === VOID)
    new (Boarding())();
  return Boarding_instance;
}
var ArrivingClass;
function Arriving() {
  if (ArrivingClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor() {
        Arriving_instance = null;
        super();
        Arriving_instance = this;
      }
      toString() {
        return 'Arriving';
      }
      hashCode() {
        return 51281291;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Arriving()))
          return false;
        other instanceof Arriving() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Arriving');
    ArrivingClass = $;
  }
  return ArrivingClass;
}
var Arriving_instance;
function Arriving_getInstance() {
  if (Arriving_instance === VOID)
    new (Arriving())();
  return Arriving_instance;
}
var ApproachingClass;
function Approaching() {
  if (ApproachingClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor() {
        Approaching_instance = null;
        super();
        Approaching_instance = this;
      }
      toString() {
        return 'Approaching';
      }
      hashCode() {
        return -930673629;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Approaching()))
          return false;
        other instanceof Approaching() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Approaching');
    ApproachingClass = $;
  }
  return ApproachingClass;
}
var Approaching_instance;
function Approaching_getInstance() {
  if (Approaching_instance === VOID)
    new (Approaching())();
  return Approaching_instance;
}
var NowClass;
function Now() {
  if (NowClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor() {
        Now_instance = null;
        super();
        Now_instance = this;
      }
      toString() {
        return 'Now';
      }
      hashCode() {
        return -1483263809;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Now()))
          return false;
        other instanceof Now() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Now');
    NowClass = $;
  }
  return NowClass;
}
var Now_instance;
function Now_getInstance() {
  if (Now_instance === VOID)
    new (Now())();
  return Now_instance;
}
var TimeClass;
function Time() {
  if (TimeClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(predictionTime, headline) {
        headline = headline === VOID ? false : headline;
        super();
        this.h9l_1 = predictionTime;
        this.i9l_1 = headline;
      }
      toString() {
        return 'Time(predictionTime=' + this.h9l_1.toString() + ', headline=' + this.i9l_1 + ')';
      }
      hashCode() {
        var result = this.h9l_1.hashCode();
        result = imul(result, 31) + getBooleanHashCode(this.i9l_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Time()))
          return false;
        var tmp0_other_with_cast = other instanceof Time() ? other : THROW_CCE();
        if (!this.h9l_1.equals(tmp0_other_with_cast.h9l_1))
          return false;
        if (!(this.i9l_1 === tmp0_other_with_cast.i9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Time');
    TimeClass = $;
  }
  return TimeClass;
}
var TimeWithStatusClass;
function TimeWithStatus() {
  if (TimeWithStatusClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(predictionTime, status, headline) {
        headline = headline === VOID ? false : headline;
        super();
        this.j9l_1 = predictionTime;
        this.k9l_1 = status;
        this.l9l_1 = headline;
      }
      toString() {
        return 'TimeWithStatus(predictionTime=' + this.j9l_1.toString() + ', status=' + this.k9l_1 + ', headline=' + this.l9l_1 + ')';
      }
      hashCode() {
        var result = this.j9l_1.hashCode();
        result = imul(result, 31) + getStringHashCode(this.k9l_1) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.l9l_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TimeWithStatus()))
          return false;
        var tmp0_other_with_cast = other instanceof TimeWithStatus() ? other : THROW_CCE();
        if (!this.j9l_1.equals(tmp0_other_with_cast.j9l_1))
          return false;
        if (!(this.k9l_1 === tmp0_other_with_cast.k9l_1))
          return false;
        if (!(this.l9l_1 === tmp0_other_with_cast.l9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'TimeWithStatus');
    TimeWithStatusClass = $;
  }
  return TimeWithStatusClass;
}
var TimeWithScheduleClass;
function TimeWithSchedule() {
  if (TimeWithScheduleClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(predictionTime, scheduledTime, headline) {
        headline = headline === VOID ? false : headline;
        super();
        this.m9l_1 = predictionTime;
        this.n9l_1 = scheduledTime;
        this.o9l_1 = headline;
      }
      toString() {
        return 'TimeWithSchedule(predictionTime=' + this.m9l_1.toString() + ', scheduledTime=' + this.n9l_1.toString() + ', headline=' + this.o9l_1 + ')';
      }
      hashCode() {
        var result = this.m9l_1.hashCode();
        result = imul(result, 31) + this.n9l_1.hashCode() | 0;
        result = imul(result, 31) + getBooleanHashCode(this.o9l_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TimeWithSchedule()))
          return false;
        var tmp0_other_with_cast = other instanceof TimeWithSchedule() ? other : THROW_CCE();
        if (!this.m9l_1.equals(tmp0_other_with_cast.m9l_1))
          return false;
        if (!this.n9l_1.equals(tmp0_other_with_cast.n9l_1))
          return false;
        if (!(this.o9l_1 === tmp0_other_with_cast.o9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'TimeWithSchedule');
    TimeWithScheduleClass = $;
  }
  return TimeWithScheduleClass;
}
var MinutesClass;
function Minutes() {
  if (MinutesClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(minutes) {
        super();
        this.p9l_1 = minutes;
      }
      toString() {
        return 'Minutes(minutes=' + this.p9l_1 + ')';
      }
      hashCode() {
        return this.p9l_1;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Minutes()))
          return false;
        var tmp0_other_with_cast = other instanceof Minutes() ? other : THROW_CCE();
        if (!(this.p9l_1 === tmp0_other_with_cast.p9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Minutes');
    MinutesClass = $;
  }
  return MinutesClass;
}
var ScheduleTimeClass;
function ScheduleTime() {
  if (ScheduleTimeClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(scheduledTime, headline) {
        headline = headline === VOID ? false : headline;
        super();
        this.q9l_1 = scheduledTime;
        this.r9l_1 = headline;
      }
      toString() {
        return 'ScheduleTime(scheduledTime=' + this.q9l_1.toString() + ', headline=' + this.r9l_1 + ')';
      }
      hashCode() {
        var result = this.q9l_1.hashCode();
        result = imul(result, 31) + getBooleanHashCode(this.r9l_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ScheduleTime()))
          return false;
        var tmp0_other_with_cast = other instanceof ScheduleTime() ? other : THROW_CCE();
        if (!this.q9l_1.equals(tmp0_other_with_cast.q9l_1))
          return false;
        if (!(this.r9l_1 === tmp0_other_with_cast.r9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'ScheduleTime');
    ScheduleTimeClass = $;
  }
  return ScheduleTimeClass;
}
var ScheduleTimeWithStatusColumnClass;
function ScheduleTimeWithStatusColumn() {
  if (ScheduleTimeWithStatusColumnClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(scheduledTime, status, headline) {
        headline = headline === VOID ? false : headline;
        super();
        this.s9l_1 = scheduledTime;
        this.t9l_1 = status;
        this.u9l_1 = headline;
      }
      toString() {
        return 'ScheduleTimeWithStatusColumn(scheduledTime=' + this.s9l_1.toString() + ', status=' + this.t9l_1 + ', headline=' + this.u9l_1 + ')';
      }
      hashCode() {
        var result = this.s9l_1.hashCode();
        result = imul(result, 31) + getStringHashCode(this.t9l_1) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.u9l_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ScheduleTimeWithStatusColumn()))
          return false;
        var tmp0_other_with_cast = other instanceof ScheduleTimeWithStatusColumn() ? other : THROW_CCE();
        if (!this.s9l_1.equals(tmp0_other_with_cast.s9l_1))
          return false;
        if (!(this.t9l_1 === tmp0_other_with_cast.t9l_1))
          return false;
        if (!(this.u9l_1 === tmp0_other_with_cast.u9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'ScheduleTimeWithStatusColumn');
    ScheduleTimeWithStatusColumnClass = $;
  }
  return ScheduleTimeWithStatusColumnClass;
}
var ScheduleTimeWithStatusRowClass;
function ScheduleTimeWithStatusRow() {
  if (ScheduleTimeWithStatusRowClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(scheduledTime, status) {
        super();
        this.v9l_1 = scheduledTime;
        this.w9l_1 = status;
      }
      toString() {
        return 'ScheduleTimeWithStatusRow(scheduledTime=' + this.v9l_1.toString() + ', status=' + this.w9l_1 + ')';
      }
      hashCode() {
        var result = this.v9l_1.hashCode();
        result = imul(result, 31) + getStringHashCode(this.w9l_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ScheduleTimeWithStatusRow()))
          return false;
        var tmp0_other_with_cast = other instanceof ScheduleTimeWithStatusRow() ? other : THROW_CCE();
        if (!this.v9l_1.equals(tmp0_other_with_cast.v9l_1))
          return false;
        if (!(this.w9l_1 === tmp0_other_with_cast.w9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'ScheduleTimeWithStatusRow');
    ScheduleTimeWithStatusRowClass = $;
  }
  return ScheduleTimeWithStatusRowClass;
}
var ScheduleMinutesClass;
function ScheduleMinutes() {
  if (ScheduleMinutesClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(minutes) {
        super();
        this.x9l_1 = minutes;
      }
      toString() {
        return 'ScheduleMinutes(minutes=' + this.x9l_1 + ')';
      }
      hashCode() {
        return this.x9l_1;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ScheduleMinutes()))
          return false;
        var tmp0_other_with_cast = other instanceof ScheduleMinutes() ? other : THROW_CCE();
        if (!(this.x9l_1 === tmp0_other_with_cast.x9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'ScheduleMinutes');
    ScheduleMinutesClass = $;
  }
  return ScheduleMinutesClass;
}
var SkippedClass;
function Skipped() {
  if (SkippedClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(scheduledTime) {
        super();
        this.y9l_1 = scheduledTime;
      }
      toString() {
        return 'Skipped(scheduledTime=' + toString(this.y9l_1) + ')';
      }
      hashCode() {
        return this.y9l_1 == null ? 0 : this.y9l_1.hashCode();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Skipped()))
          return false;
        var tmp0_other_with_cast = other instanceof Skipped() ? other : THROW_CCE();
        if (!equals(this.y9l_1, tmp0_other_with_cast.y9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Skipped');
    SkippedClass = $;
  }
  return SkippedClass;
}
var CancelledClass;
function Cancelled() {
  if (CancelledClass === VOID) {
    class $ extends TripInstantDisplay() {
      constructor(scheduledTime) {
        super();
        this.z9l_1 = scheduledTime;
      }
      toString() {
        return 'Cancelled(scheduledTime=' + this.z9l_1.toString() + ')';
      }
      hashCode() {
        return this.z9l_1.hashCode();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Cancelled()))
          return false;
        var tmp0_other_with_cast = other instanceof Cancelled() ? other : THROW_CCE();
        if (!this.z9l_1.equals(tmp0_other_with_cast.z9l_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Cancelled');
    CancelledClass = $;
  }
  return CancelledClass;
}
var ContextClass;
function Context() {
  if (ContextClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Context');
    ContextClass = $;
  }
  return ContextClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.a9m_1 = setOf(['Delay', 'Delayed', 'Late']);
      }
      b9m(prediction, schedule, vehicle, routeType, now, context) {
        var allowArrivalOnly = context.equals(Context_TripDetails_getInstance());
        var scheduleBasedRouteType = equals(routeType, RouteType_COMMUTER_RAIL_getInstance()) || equals(routeType, RouteType_FERRY_getInstance());
        var forceAsTime = context.equals(Context_TripDetails_getInstance()) || scheduleBasedRouteType;
        var showTimeAsHeadline = scheduleBasedRouteType && !context.equals(Context_TripDetails_getInstance());
        var predictionTime = prediction == null ? null : prediction.w95(now);
        var scheduleTime = schedule == null ? null : schedule.w95(now);
        if (!((prediction == null ? null : prediction.m95_1) == null)) {
          if (equals(routeType, RouteType_COMMUTER_RAIL_getInstance())) {
            if (!(predictionTime == null) && context.equals(Context_StopDetailsFiltered_getInstance()))
              return new (TimeWithStatus())(predictionTime, prediction.m95_1, showTimeAsHeadline);
            else if (!(predictionTime == null))
              return new (Time())(predictionTime, showTimeAsHeadline);
            else if (!(scheduleTime == null) && context.equals(Context_StopDetailsFiltered_getInstance()))
              return new (ScheduleTimeWithStatusColumn())(scheduleTime, prediction.m95_1, showTimeAsHeadline);
            else if (!(scheduleTime == null) && scheduleTime.q8y(now) < 0)
              return new (ScheduleTimeWithStatusRow())(scheduleTime, prediction.m95_1);
            else if (!(scheduleTime == null))
              return new (ScheduleTime())(scheduleTime, showTimeAsHeadline);
          }
          return new (Overridden())(prediction.m95_1);
        }
        if (equals(prediction == null ? null : prediction.l95_1, ScheduleRelationship_Skipped_getInstance())) {
          var tmp4_safe_receiver = schedule == null ? null : schedule.v95();
          if (tmp4_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            return new (Skipped())(tmp4_safe_receiver);
          }
          return Hidden_getInstance();
        }
        var tmp;
        if (scheduleTime == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = scheduleTime.q8y(now) >= 0;
        }
        var tmp7_elvis_lhs = tmp;
        var isScheduleUpcoming = tmp7_elvis_lhs == null ? false : tmp7_elvis_lhs;
        var tmp_0;
        var tmp_1;
        var tmp_2;
        var tmp_3;
        if (equals(prediction == null ? null : prediction.l95_1, ScheduleRelationship_Cancelled_getInstance())) {
          tmp_3 = !(scheduleTime == null);
        } else {
          tmp_3 = false;
        }
        if (tmp_3) {
          tmp_2 = isScheduleUpcoming;
        } else {
          tmp_2 = false;
        }
        if (tmp_2) {
          tmp_1 = (routeType == null ? null : routeType.w94()) === false;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp_0 = context.equals(Context_StopDetailsFiltered_getInstance());
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          return new (Cancelled())(scheduleTime);
        }
        if (prediction == null) {
          var scheduleTime_0 = schedule == null ? null : schedule.w95(now);
          var tmp_4;
          if (scheduleTime_0 == null || (schedule.d9f_1 == null && !allowArrivalOnly)) {
            tmp_4 = Hidden_getInstance();
          } else {
            var scheduleMinutesRemaining = roundToInt(Duration__toDouble_impl_a56y2b(scheduleTime_0.c9m(now), DurationUnit_MINUTES_getInstance()));
            var tmp_5;
            if (scheduleMinutesRemaining >= Duration__toDouble_impl_a56y2b(get_SCHEDULE_CLOCK_CUTOFF(), DurationUnit_MINUTES_getInstance()) || forceAsTime) {
              tmp_5 = new (ScheduleTime())(scheduleTime_0, showTimeAsHeadline);
            } else {
              tmp_5 = new (ScheduleMinutes())(scheduleMinutesRemaining);
            }
            tmp_4 = tmp_5;
          }
          return tmp_4;
        }
        if (predictionTime == null || (prediction.i95_1 == null && !allowArrivalOnly)) {
          return Hidden_getInstance();
        }
        var timeRemaining = predictionTime.c9m(now);
        var minutes = roundToInt(Duration__toDouble_impl_a56y2b(timeRemaining, DurationUnit_MINUTES_getInstance()));
        if (forceAsTime) {
          var scheduleTime_1 = schedule == null ? null : schedule.w95(now);
          var tmp_6;
          if (context.equals(Context_StopDetailsFiltered_getInstance())) {
            var tmp_7;
            if (scheduleTime_1 == null) {
              tmp_7 = null;
            } else {
              // Inline function 'kotlin.let' call
              tmp_7 = !(scheduleTime_1.i8x_1.l86() === predictionTime.i8x_1.l86()) || !(scheduleTime_1.i8x_1.r86() === predictionTime.i8x_1.r86());
            }
            tmp_6 = tmp_7 === true;
          } else {
            tmp_6 = false;
          }
          var showDelayedSchedule = tmp_6;
          var tmp_8;
          if (Duration__isNegative_impl_pbysfa(timeRemaining)) {
            tmp_8 = Hidden_getInstance();
          } else if (showDelayedSchedule) {
            tmp_8 = new (TimeWithSchedule())(predictionTime, scheduleTime_1, showTimeAsHeadline);
          } else {
            tmp_8 = new (Time())(predictionTime, showTimeAsHeadline);
          }
          return tmp_8;
        }
        if (equals(routeType, RouteType_BUS_getInstance())) {
          var tmp_9;
          if (Duration__isNegative_impl_pbysfa(timeRemaining)) {
            tmp_9 = Hidden_getInstance();
          } else if (Duration__compareTo_impl_pchp0f(timeRemaining, get_ARRIVAL_CUTOFF()) <= 0) {
            tmp_9 = Now_getInstance();
          } else {
            tmp_9 = new (Minutes())(minutes);
          }
          return tmp_9;
        }
        var tmp_10;
        var tmp_11;
        var tmp_12;
        if (equals(vehicle == null ? null : vehicle.l9h_1, CurrentStatus_StoppedAt_getInstance())) {
          tmp_12 = vehicle.s9h_1 === prediction.p95_1;
        } else {
          tmp_12 = false;
        }
        if (tmp_12) {
          tmp_11 = vehicle.t9h_1 === prediction.q95_1;
        } else {
          tmp_11 = false;
        }
        if (tmp_11) {
          tmp_10 = Duration__compareTo_impl_pchp0f(timeRemaining, get_BOARDING_CUTOFF()) <= 0 || prediction.x95(now);
        } else {
          tmp_10 = false;
        }
        if (tmp_10) {
          return Boarding_getInstance();
        }
        if (Duration__isNegative_impl_pbysfa(timeRemaining)) {
          return Hidden_getInstance();
        }
        if (Duration__compareTo_impl_pchp0f(timeRemaining, get_ARRIVAL_CUTOFF()) <= 0 || prediction.x95(now)) {
          return Arriving_getInstance();
        }
        if (Duration__compareTo_impl_pchp0f(timeRemaining, get_APPROACH_CUTOFF()) <= 0) {
          return Approaching_getInstance();
        }
        return new (Minutes())(minutes);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function Context_NearbyTransit_getInstance() {
  Context_initEntries();
  return Context_NearbyTransit_instance;
}
function Context_StopDetailsUnfiltered_getInstance() {
  Context_initEntries();
  return Context_StopDetailsUnfiltered_instance;
}
function Context_StopDetailsFiltered_getInstance() {
  Context_initEntries();
  return Context_StopDetailsFiltered_instance;
}
function Context_TripDetails_getInstance() {
  Context_initEntries();
  return Context_TripDetails_instance;
}
var TripInstantDisplayClass;
function TripInstantDisplay() {
  if (TripInstantDisplayClass === VOID) {
    class $ {
      constructor() {
        Companion_getInstance();
      }
    }
    initMetadataForClass($, 'TripInstantDisplay');
    TripInstantDisplayClass = $;
  }
  return TripInstantDisplayClass;
}
//region block: init
com_mbta_tid_mbta_app_model_TripInstantDisplay_Overridden$stable = 0;
com_mbta_tid_mbta_app_model_TripInstantDisplay_Hidden$stable = 0;
com_mbta_tid_mbta_app_model_TripInstantDisplay_Boarding$stable = 0;
com_mbta_tid_mbta_app_model_TripInstantDisplay_Arriving$stable = 0;
com_mbta_tid_mbta_app_model_TripInstantDisplay_Approaching$stable = 0;
com_mbta_tid_mbta_app_model_TripInstantDisplay_Now$stable = 0;
com_mbta_tid_mbta_app_model_TripInstantDisplay_Time$stable = 8;
com_mbta_tid_mbta_app_model_TripInstantDisplay_TimeWithStatus$stable = 8;
com_mbta_tid_mbta_app_model_TripInstantDisplay_TimeWithSchedule$stable = 8;
com_mbta_tid_mbta_app_model_TripInstantDisplay_Minutes$stable = 0;
com_mbta_tid_mbta_app_model_TripInstantDisplay_ScheduleTime$stable = 8;
com_mbta_tid_mbta_app_model_TripInstantDisplay_ScheduleTimeWithStatusColumn$stable = 8;
com_mbta_tid_mbta_app_model_TripInstantDisplay_ScheduleTimeWithStatusRow$stable = 8;
com_mbta_tid_mbta_app_model_TripInstantDisplay_ScheduleMinutes$stable = 0;
com_mbta_tid_mbta_app_model_TripInstantDisplay_Skipped$stable = 8;
com_mbta_tid_mbta_app_model_TripInstantDisplay_Cancelled$stable = 8;
com_mbta_tid_mbta_app_model_TripInstantDisplay$stable = 0;
//endregion
//region block: exports
export {
  Cancelled as Cancelled1yuon9u5xt80n,
  Hidden as Hidden1xjtkgly930t3,
  Minutes as Minutesvakgtrplae6d,
  Overridden as Overridden1g36yzko6ydin,
  ScheduleMinutes as ScheduleMinutes3id9itxod5ru4,
  ScheduleTimeWithStatusColumn as ScheduleTimeWithStatusColumno059jhsz0v8w,
  ScheduleTimeWithStatusRow as ScheduleTimeWithStatusRow34zg4mxlvmiy1,
  ScheduleTime as ScheduleTime3aijuiff19ws6,
  Skipped as Skippedszanll7bzihn,
  TimeWithSchedule as TimeWithSchedule1j3fi44oxlev9,
  TimeWithStatus as TimeWithStatus1771brvrgnyah,
  Time as Time15nvomludg10,
  Context_NearbyTransit_getInstance as Context_NearbyTransit_getInstancec1vh1rynbge6,
  Context_StopDetailsFiltered_getInstance as Context_StopDetailsFiltered_getInstance25czqftqg9euj,
  Context_StopDetailsUnfiltered_getInstance as Context_StopDetailsUnfiltered_getInstancecjvly3zms9ub,
  Context_TripDetails_getInstance as Context_TripDetails_getInstance3hzyput33qet6,
  Approaching_getInstance as Approaching_getInstance2euup71dl9peq,
  Arriving_getInstance as Arriving_getInstance21h7sat1qm6zc,
  Boarding_getInstance as Boarding_getInstance1skrw37i837ga,
  Companion_getInstance as Companion_getInstancedmznu1ehz4t5,
  Hidden_getInstance as Hidden_getInstance3tuwjkl7eelw5,
  Now_getInstance as Now_getInstance33nqngby26t0r,
};
//endregion

//# sourceMappingURL=TripInstantDisplay.mjs.map
