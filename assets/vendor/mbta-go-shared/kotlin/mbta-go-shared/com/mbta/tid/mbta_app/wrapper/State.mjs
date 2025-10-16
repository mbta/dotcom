import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  THROW_IAE23kobfj9wdoxr as THROW_IAE,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_wrapper_State_Direction$stable;
var com_mbta_tid_mbta_app_wrapper_State_Tile$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Disruption$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Overridden$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Hidden$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Boarding$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Arriving$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Approaching$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Now$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Time$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithStatus$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithSchedule$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Minutes$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTime$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTimeWithStatus$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleMinutes$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Skipped$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Cancelled$stable;
var com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat$stable;
var com_mbta_tid_mbta_app_wrapper_State_Vehicle$stable;
var com_mbta_tid_mbta_app_wrapper_State_StopList_Entry$stable;
var com_mbta_tid_mbta_app_wrapper_State_StopList$stable;
var com_mbta_tid_mbta_app_wrapper_State$stable;
var DisruptionClass;
function Disruption() {
  if (DisruptionClass === VOID) {
    class $ extends UpcomingFormat() {
      constructor(effect) {
        super();
        this.effect = effect;
      }
      gc0() {
        return this.effect;
      }
      ch() {
        return this.effect;
      }
      hc0(effect) {
        return new (Disruption())(effect);
      }
      copy(effect, $super) {
        effect = effect === VOID ? this.effect : effect;
        return $super === VOID ? this.hc0(effect) : $super.hc0.call(this, effect);
      }
      toString() {
        return 'Disruption(effect=' + this.effect + ')';
      }
      hashCode() {
        return getStringHashCode(this.effect);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Disruption()))
          return false;
        var tmp0_other_with_cast = other instanceof Disruption() ? other : THROW_CCE();
        if (!(this.effect === tmp0_other_with_cast.effect))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Disruption');
    DisruptionClass = $;
  }
  return DisruptionClass;
}
var OverriddenClass;
function Overridden() {
  if (OverriddenClass === VOID) {
    class $ extends UpcomingFormat() {
      constructor(text) {
        super();
        this.text = text;
      }
      ic0() {
        return this.text;
      }
      ch() {
        return this.text;
      }
      hc0(text) {
        return new (Overridden())(text);
      }
      copy(text, $super) {
        text = text === VOID ? this.text : text;
        return $super === VOID ? this.hc0(text) : $super.hc0.call(this, text);
      }
      toString() {
        return 'Overridden(text=' + this.text + ')';
      }
      hashCode() {
        return getStringHashCode(this.text);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Overridden()))
          return false;
        var tmp0_other_with_cast = other instanceof Overridden() ? other : THROW_CCE();
        if (!(this.text === tmp0_other_with_cast.text))
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
    class $ extends UpcomingFormat() {
      constructor() {
        Hidden_instance = null;
        super();
        Hidden_instance = this;
      }
      toString() {
        return 'Hidden';
      }
      hashCode() {
        return -192690847;
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
    class $ extends UpcomingFormat() {
      constructor() {
        Boarding_instance = null;
        super();
        Boarding_instance = this;
      }
      toString() {
        return 'Boarding';
      }
      hashCode() {
        return -1402172109;
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
    class $ extends UpcomingFormat() {
      constructor() {
        Arriving_instance = null;
        super();
        Arriving_instance = this;
      }
      toString() {
        return 'Arriving';
      }
      hashCode() {
        return -3551285;
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
    class $ extends UpcomingFormat() {
      constructor() {
        Approaching_instance = null;
        super();
        Approaching_instance = this;
      }
      toString() {
        return 'Approaching';
      }
      hashCode() {
        return 1934594531;
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
    class $ extends UpcomingFormat() {
      constructor() {
        Now_instance = null;
        super();
        Now_instance = this;
      }
      toString() {
        return 'Now';
      }
      hashCode() {
        return -685672833;
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
    class $ extends UpcomingFormat() {
      constructor(predictionTime) {
        super();
        this.predictionTime = predictionTime;
      }
      jc0() {
        return this.predictionTime;
      }
      ch() {
        return this.predictionTime;
      }
      kc0(predictionTime) {
        return new (Time())(predictionTime);
      }
      copy(predictionTime, $super) {
        predictionTime = predictionTime === VOID ? this.predictionTime : predictionTime;
        return $super === VOID ? this.kc0(predictionTime) : $super.kc0.call(this, predictionTime);
      }
      toString() {
        return 'Time(predictionTime=' + toString(this.predictionTime) + ')';
      }
      hashCode() {
        return hashCode(this.predictionTime);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Time()))
          return false;
        var tmp0_other_with_cast = other instanceof Time() ? other : THROW_CCE();
        if (!equals(this.predictionTime, tmp0_other_with_cast.predictionTime))
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
    class $ extends UpcomingFormat() {
      constructor(predictionTime, status) {
        super();
        this.predictionTime = predictionTime;
        this.status = status;
      }
      jc0() {
        return this.predictionTime;
      }
      m4s() {
        return this.status;
      }
      ch() {
        return this.predictionTime;
      }
      dh() {
        return this.status;
      }
      lc0(predictionTime, status) {
        return new (TimeWithStatus())(predictionTime, status);
      }
      copy(predictionTime, status, $super) {
        predictionTime = predictionTime === VOID ? this.predictionTime : predictionTime;
        status = status === VOID ? this.status : status;
        return $super === VOID ? this.lc0(predictionTime, status) : $super.lc0.call(this, predictionTime, status);
      }
      toString() {
        return 'TimeWithStatus(predictionTime=' + toString(this.predictionTime) + ', status=' + this.status + ')';
      }
      hashCode() {
        var result = hashCode(this.predictionTime);
        result = imul(result, 31) + getStringHashCode(this.status) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TimeWithStatus()))
          return false;
        var tmp0_other_with_cast = other instanceof TimeWithStatus() ? other : THROW_CCE();
        if (!equals(this.predictionTime, tmp0_other_with_cast.predictionTime))
          return false;
        if (!(this.status === tmp0_other_with_cast.status))
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
    class $ extends UpcomingFormat() {
      constructor(predictionTime, scheduledTime) {
        super();
        this.predictionTime = predictionTime;
        this.scheduledTime = scheduledTime;
      }
      jc0() {
        return this.predictionTime;
      }
      mc0() {
        return this.scheduledTime;
      }
      ch() {
        return this.predictionTime;
      }
      dh() {
        return this.scheduledTime;
      }
      nc0(predictionTime, scheduledTime) {
        return new (TimeWithSchedule())(predictionTime, scheduledTime);
      }
      copy(predictionTime, scheduledTime, $super) {
        predictionTime = predictionTime === VOID ? this.predictionTime : predictionTime;
        scheduledTime = scheduledTime === VOID ? this.scheduledTime : scheduledTime;
        return $super === VOID ? this.nc0(predictionTime, scheduledTime) : $super.nc0.call(this, predictionTime, scheduledTime);
      }
      toString() {
        return 'TimeWithSchedule(predictionTime=' + toString(this.predictionTime) + ', scheduledTime=' + toString(this.scheduledTime) + ')';
      }
      hashCode() {
        var result = hashCode(this.predictionTime);
        result = imul(result, 31) + hashCode(this.scheduledTime) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TimeWithSchedule()))
          return false;
        var tmp0_other_with_cast = other instanceof TimeWithSchedule() ? other : THROW_CCE();
        if (!equals(this.predictionTime, tmp0_other_with_cast.predictionTime))
          return false;
        if (!equals(this.scheduledTime, tmp0_other_with_cast.scheduledTime))
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
    class $ extends UpcomingFormat() {
      constructor(minutes) {
        super();
        this.minutes = minutes;
      }
      f80() {
        return this.minutes;
      }
      ch() {
        return this.minutes;
      }
      oc0(minutes) {
        return new (Minutes())(minutes);
      }
      copy(minutes, $super) {
        minutes = minutes === VOID ? this.minutes : minutes;
        return $super === VOID ? this.oc0(minutes) : $super.oc0.call(this, minutes);
      }
      toString() {
        return 'Minutes(minutes=' + this.minutes + ')';
      }
      hashCode() {
        return this.minutes;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Minutes()))
          return false;
        var tmp0_other_with_cast = other instanceof Minutes() ? other : THROW_CCE();
        if (!(this.minutes === tmp0_other_with_cast.minutes))
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
    class $ extends UpcomingFormat() {
      constructor(scheduledTime) {
        super();
        this.scheduledTime = scheduledTime;
      }
      mc0() {
        return this.scheduledTime;
      }
      ch() {
        return this.scheduledTime;
      }
      kc0(scheduledTime) {
        return new (ScheduleTime())(scheduledTime);
      }
      copy(scheduledTime, $super) {
        scheduledTime = scheduledTime === VOID ? this.scheduledTime : scheduledTime;
        return $super === VOID ? this.kc0(scheduledTime) : $super.kc0.call(this, scheduledTime);
      }
      toString() {
        return 'ScheduleTime(scheduledTime=' + toString(this.scheduledTime) + ')';
      }
      hashCode() {
        return hashCode(this.scheduledTime);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ScheduleTime()))
          return false;
        var tmp0_other_with_cast = other instanceof ScheduleTime() ? other : THROW_CCE();
        if (!equals(this.scheduledTime, tmp0_other_with_cast.scheduledTime))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'ScheduleTime');
    ScheduleTimeClass = $;
  }
  return ScheduleTimeClass;
}
var ScheduleTimeWithStatusClass;
function ScheduleTimeWithStatus() {
  if (ScheduleTimeWithStatusClass === VOID) {
    class $ extends UpcomingFormat() {
      constructor(scheduledTime, status) {
        super();
        this.scheduledTime = scheduledTime;
        this.status = status;
      }
      mc0() {
        return this.scheduledTime;
      }
      m4s() {
        return this.status;
      }
      ch() {
        return this.scheduledTime;
      }
      dh() {
        return this.status;
      }
      lc0(scheduledTime, status) {
        return new (ScheduleTimeWithStatus())(scheduledTime, status);
      }
      copy(scheduledTime, status, $super) {
        scheduledTime = scheduledTime === VOID ? this.scheduledTime : scheduledTime;
        status = status === VOID ? this.status : status;
        return $super === VOID ? this.lc0(scheduledTime, status) : $super.lc0.call(this, scheduledTime, status);
      }
      toString() {
        return 'ScheduleTimeWithStatus(scheduledTime=' + toString(this.scheduledTime) + ', status=' + this.status + ')';
      }
      hashCode() {
        var result = hashCode(this.scheduledTime);
        result = imul(result, 31) + getStringHashCode(this.status) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ScheduleTimeWithStatus()))
          return false;
        var tmp0_other_with_cast = other instanceof ScheduleTimeWithStatus() ? other : THROW_CCE();
        if (!equals(this.scheduledTime, tmp0_other_with_cast.scheduledTime))
          return false;
        if (!(this.status === tmp0_other_with_cast.status))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'ScheduleTimeWithStatus');
    ScheduleTimeWithStatusClass = $;
  }
  return ScheduleTimeWithStatusClass;
}
var ScheduleMinutesClass;
function ScheduleMinutes() {
  if (ScheduleMinutesClass === VOID) {
    class $ extends UpcomingFormat() {
      constructor(minutes) {
        super();
        this.minutes = minutes;
      }
      f80() {
        return this.minutes;
      }
      ch() {
        return this.minutes;
      }
      oc0(minutes) {
        return new (ScheduleMinutes())(minutes);
      }
      copy(minutes, $super) {
        minutes = minutes === VOID ? this.minutes : minutes;
        return $super === VOID ? this.oc0(minutes) : $super.oc0.call(this, minutes);
      }
      toString() {
        return 'ScheduleMinutes(minutes=' + this.minutes + ')';
      }
      hashCode() {
        return this.minutes;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ScheduleMinutes()))
          return false;
        var tmp0_other_with_cast = other instanceof ScheduleMinutes() ? other : THROW_CCE();
        if (!(this.minutes === tmp0_other_with_cast.minutes))
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
    class $ extends UpcomingFormat() {
      constructor(scheduledTime) {
        super();
        this.scheduledTime = scheduledTime;
      }
      mc0() {
        return this.scheduledTime;
      }
      ch() {
        return this.scheduledTime;
      }
      pc0(scheduledTime) {
        return new (Skipped())(scheduledTime);
      }
      copy(scheduledTime, $super) {
        scheduledTime = scheduledTime === VOID ? this.scheduledTime : scheduledTime;
        return $super === VOID ? this.pc0(scheduledTime) : $super.pc0.call(this, scheduledTime);
      }
      toString() {
        return 'Skipped(scheduledTime=' + toString_0(this.scheduledTime) + ')';
      }
      hashCode() {
        return this.scheduledTime == null ? 0 : hashCode(this.scheduledTime);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Skipped()))
          return false;
        var tmp0_other_with_cast = other instanceof Skipped() ? other : THROW_CCE();
        if (!equals(this.scheduledTime, tmp0_other_with_cast.scheduledTime))
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
    class $ extends UpcomingFormat() {
      constructor(scheduledTime) {
        super();
        this.scheduledTime = scheduledTime;
      }
      mc0() {
        return this.scheduledTime;
      }
      ch() {
        return this.scheduledTime;
      }
      kc0(scheduledTime) {
        return new (Cancelled())(scheduledTime);
      }
      copy(scheduledTime, $super) {
        scheduledTime = scheduledTime === VOID ? this.scheduledTime : scheduledTime;
        return $super === VOID ? this.kc0(scheduledTime) : $super.kc0.call(this, scheduledTime);
      }
      toString() {
        return 'Cancelled(scheduledTime=' + toString(this.scheduledTime) + ')';
      }
      hashCode() {
        return hashCode(this.scheduledTime);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Cancelled()))
          return false;
        var tmp0_other_with_cast = other instanceof Cancelled() ? other : THROW_CCE();
        if (!equals(this.scheduledTime, tmp0_other_with_cast.scheduledTime))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Cancelled');
    CancelledClass = $;
  }
  return CancelledClass;
}
var Status_IncomingAt_instance;
var Status_StoppedAt_instance;
var Status_InTransitTo_instance;
function values() {
  return [Status_IncomingAt_getInstance(), Status_StoppedAt_getInstance(), Status_InTransitTo_getInstance()];
}
function valueOf(value) {
  switch (value) {
    case 'IncomingAt':
      return Status_IncomingAt_getInstance();
    case 'StoppedAt':
      return Status_StoppedAt_getInstance();
    case 'InTransitTo':
      return Status_InTransitTo_getInstance();
    default:
      Status_initEntries();
      THROW_IAE('No enum constant value.');
      break;
  }
}
var Status_entriesInitialized;
function Status_initEntries() {
  if (Status_entriesInitialized)
    return Unit_instance;
  Status_entriesInitialized = true;
  Status_IncomingAt_instance = new (Status())('IncomingAt', 0);
  Status_StoppedAt_instance = new (Status())('StoppedAt', 1);
  Status_InTransitTo_instance = new (Status())('InTransitTo', 2);
}
var StatusClass;
function Status() {
  if (StatusClass === VOID) {
    class $ extends Enum() {
      get name() {
        return this.y3();
      }
      get ordinal() {
        return this.z3();
      }
    }
    initMetadataForClass($, 'Status');
    StatusClass = $;
  }
  return StatusClass;
}
function Status_IncomingAt_getInstance() {
  Status_initEntries();
  return Status_IncomingAt_instance;
}
function Status_StoppedAt_getInstance() {
  Status_initEntries();
  return Status_StoppedAt_instance;
}
function Status_InTransitTo_getInstance() {
  Status_initEntries();
  return Status_InTransitTo_instance;
}
var EntryClass;
function Entry() {
  if (EntryClass === VOID) {
    class $ {
      constructor(entryId, stopId, stopName, format) {
        this.entryId = entryId;
        this.stopId = stopId;
        this.stopName = stopName;
        this.format = format;
      }
      sc0() {
        return this.entryId;
      }
      tc0() {
        return this.stopId;
      }
      uc0() {
        return this.stopName;
      }
      vc0() {
        return this.format;
      }
      ch() {
        return this.entryId;
      }
      dh() {
        return this.stopId;
      }
      g97() {
        return this.stopName;
      }
      abz() {
        return this.format;
      }
      wc0(entryId, stopId, stopName, format) {
        return new (Entry())(entryId, stopId, stopName, format);
      }
      copy(entryId, stopId, stopName, format, $super) {
        entryId = entryId === VOID ? this.entryId : entryId;
        stopId = stopId === VOID ? this.stopId : stopId;
        stopName = stopName === VOID ? this.stopName : stopName;
        format = format === VOID ? this.format : format;
        return $super === VOID ? this.wc0(entryId, stopId, stopName, format) : $super.wc0.call(this, entryId, stopId, stopName, format);
      }
      toString() {
        return 'Entry(entryId=' + this.entryId + ', stopId=' + this.stopId + ', stopName=' + this.stopName + ', format=' + toString_0(this.format) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.entryId);
        result = imul(result, 31) + getStringHashCode(this.stopId) | 0;
        result = imul(result, 31) + getStringHashCode(this.stopName) | 0;
        result = imul(result, 31) + (this.format == null ? 0 : hashCode(this.format)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Entry()))
          return false;
        var tmp0_other_with_cast = other instanceof Entry() ? other : THROW_CCE();
        if (!(this.entryId === tmp0_other_with_cast.entryId))
          return false;
        if (!(this.stopId === tmp0_other_with_cast.stopId))
          return false;
        if (!(this.stopName === tmp0_other_with_cast.stopName))
          return false;
        if (!equals(this.format, tmp0_other_with_cast.format))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Entry');
    EntryClass = $;
  }
  return EntryClass;
}
var DirectionClass;
function Direction() {
  if (DirectionClass === VOID) {
    class $ {
      constructor(name, destination, id) {
        this.name = name;
        this.destination = destination;
        this.id = id;
      }
      y3() {
        return this.name;
      }
      xc0() {
        return this.destination;
      }
      d8h() {
        return this.id;
      }
      ch() {
        return this.name;
      }
      dh() {
        return this.destination;
      }
      g97() {
        return this.id;
      }
      yc0(name, destination, id) {
        return new (Direction())(name, destination, id);
      }
      copy(name, destination, id, $super) {
        name = name === VOID ? this.name : name;
        destination = destination === VOID ? this.destination : destination;
        id = id === VOID ? this.id : id;
        return $super === VOID ? this.yc0(name, destination, id) : $super.yc0.call(this, name, destination, id);
      }
      toString() {
        return 'Direction(name=' + this.name + ', destination=' + this.destination + ', id=' + this.id + ')';
      }
      hashCode() {
        var result = this.name == null ? 0 : getStringHashCode(this.name);
        result = imul(result, 31) + (this.destination == null ? 0 : getStringHashCode(this.destination)) | 0;
        result = imul(result, 31) + this.id | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Direction()))
          return false;
        var tmp0_other_with_cast = other instanceof Direction() ? other : THROW_CCE();
        if (!(this.name == tmp0_other_with_cast.name))
          return false;
        if (!(this.destination == tmp0_other_with_cast.destination))
          return false;
        if (!(this.id === tmp0_other_with_cast.id))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Direction');
    DirectionClass = $;
  }
  return DirectionClass;
}
var TileClass;
function Tile() {
  if (TileClass === VOID) {
    class $ {
      constructor(tileId, tripId, headsign, format) {
        this.tileId = tileId;
        this.tripId = tripId;
        this.headsign = headsign;
        this.format = format;
      }
      zc0() {
        return this.tileId;
      }
      ac1() {
        return this.tripId;
      }
      i97() {
        return this.headsign;
      }
      vc0() {
        return this.format;
      }
      ch() {
        return this.tileId;
      }
      dh() {
        return this.tripId;
      }
      g97() {
        return this.headsign;
      }
      abz() {
        return this.format;
      }
      bc1(tileId, tripId, headsign, format) {
        return new (Tile())(tileId, tripId, headsign, format);
      }
      copy(tileId, tripId, headsign, format, $super) {
        tileId = tileId === VOID ? this.tileId : tileId;
        tripId = tripId === VOID ? this.tripId : tripId;
        headsign = headsign === VOID ? this.headsign : headsign;
        format = format === VOID ? this.format : format;
        return $super === VOID ? this.bc1(tileId, tripId, headsign, format) : $super.bc1.call(this, tileId, tripId, headsign, format);
      }
      toString() {
        return 'Tile(tileId=' + this.tileId + ', tripId=' + this.tripId + ', headsign=' + this.headsign + ', format=' + toString_0(this.format) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.tileId);
        result = imul(result, 31) + getStringHashCode(this.tripId) | 0;
        result = imul(result, 31) + (this.headsign == null ? 0 : getStringHashCode(this.headsign)) | 0;
        result = imul(result, 31) + (this.format == null ? 0 : hashCode(this.format)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Tile()))
          return false;
        var tmp0_other_with_cast = other instanceof Tile() ? other : THROW_CCE();
        if (!(this.tileId === tmp0_other_with_cast.tileId))
          return false;
        if (!(this.tripId === tmp0_other_with_cast.tripId))
          return false;
        if (!(this.headsign == tmp0_other_with_cast.headsign))
          return false;
        if (!equals(this.format, tmp0_other_with_cast.format))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Tile');
    TileClass = $;
  }
  return TileClass;
}
var UpcomingFormatClass;
function UpcomingFormat() {
  if (UpcomingFormatClass === VOID) {
    class $ {}
    initMetadataForClass($, 'UpcomingFormat');
    UpcomingFormatClass = $;
  }
  return UpcomingFormatClass;
}
var VehicleClass;
function Vehicle() {
  if (VehicleClass === VOID) {
    class $ {
      constructor(stopId, stopName, currentStatus) {
        this.stopId = stopId;
        this.stopName = stopName;
        this.currentStatus = currentStatus;
      }
      tc0() {
        return this.stopId;
      }
      uc0() {
        return this.stopName;
      }
      cc1() {
        return this.currentStatus;
      }
      ch() {
        return this.stopId;
      }
      dh() {
        return this.stopName;
      }
      g97() {
        return this.currentStatus;
      }
      dc1(stopId, stopName, currentStatus) {
        return new (Vehicle())(stopId, stopName, currentStatus);
      }
      copy(stopId, stopName, currentStatus, $super) {
        stopId = stopId === VOID ? this.stopId : stopId;
        stopName = stopName === VOID ? this.stopName : stopName;
        currentStatus = currentStatus === VOID ? this.currentStatus : currentStatus;
        return $super === VOID ? this.dc1(stopId, stopName, currentStatus) : $super.dc1.call(this, stopId, stopName, currentStatus);
      }
      toString() {
        return 'Vehicle(stopId=' + this.stopId + ', stopName=' + this.stopName + ', currentStatus=' + this.currentStatus.toString() + ')';
      }
      hashCode() {
        var result = this.stopId == null ? 0 : getStringHashCode(this.stopId);
        result = imul(result, 31) + (this.stopName == null ? 0 : getStringHashCode(this.stopName)) | 0;
        result = imul(result, 31) + this.currentStatus.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Vehicle()))
          return false;
        var tmp0_other_with_cast = other instanceof Vehicle() ? other : THROW_CCE();
        if (!(this.stopId == tmp0_other_with_cast.stopId))
          return false;
        if (!(this.stopName == tmp0_other_with_cast.stopName))
          return false;
        if (!this.currentStatus.equals(tmp0_other_with_cast.currentStatus))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Vehicle');
    VehicleClass = $;
  }
  return VehicleClass;
}
var StopListClass;
function StopList() {
  if (StopListClass === VOID) {
    class $ {
      constructor(firstStop, collapsedStops, targetStop, followingStops) {
        this.firstStop = firstStop;
        this.collapsedStops = collapsedStops;
        this.targetStop = targetStop;
        this.followingStops = followingStops;
      }
      ec1() {
        return this.firstStop;
      }
      fc1() {
        return this.collapsedStops;
      }
      gc1() {
        return this.targetStop;
      }
      hc1() {
        return this.followingStops;
      }
      ch() {
        return this.firstStop;
      }
      dh() {
        return this.collapsedStops;
      }
      g97() {
        return this.targetStop;
      }
      abz() {
        return this.followingStops;
      }
      ic1(firstStop, collapsedStops, targetStop, followingStops) {
        return new (StopList())(firstStop, collapsedStops, targetStop, followingStops);
      }
      copy(firstStop, collapsedStops, targetStop, followingStops, $super) {
        firstStop = firstStop === VOID ? this.firstStop : firstStop;
        collapsedStops = collapsedStops === VOID ? this.collapsedStops : collapsedStops;
        targetStop = targetStop === VOID ? this.targetStop : targetStop;
        followingStops = followingStops === VOID ? this.followingStops : followingStops;
        return $super === VOID ? this.ic1(firstStop, collapsedStops, targetStop, followingStops) : $super.ic1.call(this, firstStop, collapsedStops, targetStop, followingStops);
      }
      toString() {
        return 'StopList(firstStop=' + toString_0(this.firstStop) + ', collapsedStops=' + toString_0(this.collapsedStops) + ', targetStop=' + toString_0(this.targetStop) + ', followingStops=' + toString_0(this.followingStops) + ')';
      }
      hashCode() {
        var result = this.firstStop == null ? 0 : this.firstStop.hashCode();
        result = imul(result, 31) + (this.collapsedStops == null ? 0 : hashCode(this.collapsedStops)) | 0;
        result = imul(result, 31) + (this.targetStop == null ? 0 : this.targetStop.hashCode()) | 0;
        result = imul(result, 31) + (this.followingStops == null ? 0 : hashCode(this.followingStops)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopList()))
          return false;
        var tmp0_other_with_cast = other instanceof StopList() ? other : THROW_CCE();
        if (!equals(this.firstStop, tmp0_other_with_cast.firstStop))
          return false;
        if (!equals(this.collapsedStops, tmp0_other_with_cast.collapsedStops))
          return false;
        if (!equals(this.targetStop, tmp0_other_with_cast.targetStop))
          return false;
        if (!equals(this.followingStops, tmp0_other_with_cast.followingStops))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'StopList');
    StopListClass = $;
  }
  return StopListClass;
}
var StateClass;
function State() {
  if (StateClass === VOID) {
    class $ {
      constructor(directions, upcomingTripTiles, tripId, tripHeadsign, tripVehicle, stopList) {
        this.directions = directions;
        this.upcomingTripTiles = upcomingTripTiles;
        this.tripId = tripId;
        this.tripHeadsign = tripHeadsign;
        this.tripVehicle = tripVehicle;
        this.stopList = stopList;
      }
      jc1() {
        return this.directions;
      }
      kc1() {
        return this.upcomingTripTiles;
      }
      ac1() {
        return this.tripId;
      }
      lc1() {
        return this.tripHeadsign;
      }
      mc1() {
        return this.tripVehicle;
      }
      nc1() {
        return this.stopList;
      }
      ch() {
        return this.directions;
      }
      dh() {
        return this.upcomingTripTiles;
      }
      g97() {
        return this.tripId;
      }
      abz() {
        return this.tripHeadsign;
      }
      oc1() {
        return this.tripVehicle;
      }
      pc1() {
        return this.stopList;
      }
      qc1(directions, upcomingTripTiles, tripId, tripHeadsign, tripVehicle, stopList) {
        return new (State())(directions, upcomingTripTiles, tripId, tripHeadsign, tripVehicle, stopList);
      }
      copy(directions, upcomingTripTiles, tripId, tripHeadsign, tripVehicle, stopList, $super) {
        directions = directions === VOID ? this.directions : directions;
        upcomingTripTiles = upcomingTripTiles === VOID ? this.upcomingTripTiles : upcomingTripTiles;
        tripId = tripId === VOID ? this.tripId : tripId;
        tripHeadsign = tripHeadsign === VOID ? this.tripHeadsign : tripHeadsign;
        tripVehicle = tripVehicle === VOID ? this.tripVehicle : tripVehicle;
        stopList = stopList === VOID ? this.stopList : stopList;
        return $super === VOID ? this.qc1(directions, upcomingTripTiles, tripId, tripHeadsign, tripVehicle, stopList) : $super.qc1.call(this, directions, upcomingTripTiles, tripId, tripHeadsign, tripVehicle, stopList);
      }
      toString() {
        return 'State(directions=' + toString_0(this.directions) + ', upcomingTripTiles=' + toString_0(this.upcomingTripTiles) + ', tripId=' + this.tripId + ', tripHeadsign=' + this.tripHeadsign + ', tripVehicle=' + toString_0(this.tripVehicle) + ', stopList=' + toString_0(this.stopList) + ')';
      }
      hashCode() {
        var result = this.directions == null ? 0 : hashCode(this.directions);
        result = imul(result, 31) + (this.upcomingTripTiles == null ? 0 : hashCode(this.upcomingTripTiles)) | 0;
        result = imul(result, 31) + (this.tripId == null ? 0 : getStringHashCode(this.tripId)) | 0;
        result = imul(result, 31) + (this.tripHeadsign == null ? 0 : getStringHashCode(this.tripHeadsign)) | 0;
        result = imul(result, 31) + (this.tripVehicle == null ? 0 : this.tripVehicle.hashCode()) | 0;
        result = imul(result, 31) + (this.stopList == null ? 0 : this.stopList.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof State()))
          return false;
        var tmp0_other_with_cast = other instanceof State() ? other : THROW_CCE();
        if (!equals(this.directions, tmp0_other_with_cast.directions))
          return false;
        if (!equals(this.upcomingTripTiles, tmp0_other_with_cast.upcomingTripTiles))
          return false;
        if (!(this.tripId == tmp0_other_with_cast.tripId))
          return false;
        if (!(this.tripHeadsign == tmp0_other_with_cast.tripHeadsign))
          return false;
        if (!equals(this.tripVehicle, tmp0_other_with_cast.tripVehicle))
          return false;
        if (!equals(this.stopList, tmp0_other_with_cast.stopList))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'State');
    StateClass = $;
  }
  return StateClass;
}
function com_mbta_tid_mbta_app_wrapper_State_Direction$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_Direction$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_Tile$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_Tile$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Disruption$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Disruption$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Overridden$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Overridden$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Hidden$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Hidden$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Boarding$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Boarding$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Arriving$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Arriving$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Approaching$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Approaching$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Now$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Now$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Time$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Time$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithStatus$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithStatus$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithSchedule$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithSchedule$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Minutes$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Minutes$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTime$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTime$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTimeWithStatus$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTimeWithStatus$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleMinutes$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleMinutes$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Skipped$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Skipped$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Cancelled$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Cancelled$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_Vehicle$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_Vehicle$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_StopList_Entry$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_StopList_Entry$stable;
}
function com_mbta_tid_mbta_app_wrapper_State_StopList$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State_StopList$stable;
}
function com_mbta_tid_mbta_app_wrapper_State$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_State$stable;
}
//region block: init
com_mbta_tid_mbta_app_wrapper_State_Direction$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_Tile$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Disruption$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Overridden$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Hidden$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Boarding$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Arriving$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Approaching$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Now$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Time$stable = 8;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithStatus$stable = 8;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithSchedule$stable = 8;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Minutes$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTime$stable = 8;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTimeWithStatus$stable = 8;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleMinutes$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Skipped$stable = 8;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Cancelled$stable = 8;
com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_Vehicle$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_StopList_Entry$stable = 0;
com_mbta_tid_mbta_app_wrapper_State_StopList$stable = 8;
com_mbta_tid_mbta_app_wrapper_State$stable = 8;
//endregion
//region block: exports
export {
  Direction as Directionsyoq7z5l537b,
  Entry as Entry109191p8c7ye7,
  StopList as StopList2j2ujchkczfup,
  Tile as Tile1sffnmo21394z,
  Approaching as Approaching17cl9hayrilc6,
  Arriving as Arriving36kmb7gr3poia,
  Boarding as Boarding3pwsgyt8xs12k,
  Cancelled as Cancelledo58bzwa54zjy,
  Disruption as Disruption13ux7gmmhvml7,
  Hidden as Hiddenvpsu11gc2jqc,
  Minutes as Minutes3awcowdeoings,
  Now as Nowjulv3d1ap83w,
  Overridden as Overridden3dw3atsfj3kr3,
  ScheduleMinutes as ScheduleMinutes3oac8n737v1vt,
  ScheduleTimeWithStatus as ScheduleTimeWithStatuszhmqhvhtdmgx,
  ScheduleTime as ScheduleTime38emxy67vjh1t,
  Skipped as Skipped349eppuwd4p4n,
  TimeWithSchedule as TimeWithSchedulecblumiuqhptg,
  TimeWithStatus as TimeWithStatus1yjc17mfhj3n5,
  Time as Time10f0zcwpc74pu,
  UpcomingFormat as UpcomingFormat2esyzuu8v9i0h,
  valueOf as valueOf23lg6ppd7r91t,
  values as values2t7urt8ndsgql,
  Status as Status2lhcv8590obyt,
  Vehicle as Vehiclei4d6c3hoqt9h,
  State as State1k760yqksu7ww,
  com_mbta_tid_mbta_app_wrapper_State$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State$stableprop_getter34ccmo9p3d43z,
  com_mbta_tid_mbta_app_wrapper_State_Direction$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_Direction$stableprop_getter3e40md6tfy20o,
  com_mbta_tid_mbta_app_wrapper_State_StopList$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_StopList$stableprop_getter2kxmx2t42w0zj,
  com_mbta_tid_mbta_app_wrapper_State_StopList_Entry$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_StopList_Entry$stableprop_getter220mptdecialz,
  com_mbta_tid_mbta_app_wrapper_State_Tile$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_Tile$stableprop_getter3ay3xtfjryqxo,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat$stableprop_getterm9gj0gblhsza,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Approaching$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Approaching$stableprop_getter2h74hq0hrqqm5,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Arriving$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Arriving$stableprop_getter2lkk1ynz7wwjz,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Boarding$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Boarding$stableprop_getterg8i3w54afd83,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Cancelled$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Cancelled$stableprop_gettery1c1equhhrjd,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Disruption$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Disruption$stableprop_getter3m49ee0vnovee,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Hidden$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Hidden$stableprop_getter2rawdbx375gp7,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Minutes$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Minutes$stableprop_getter14fu6rf7ttpad,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Now$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Now$stableprop_getterc440haafxz7o,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Overridden$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Overridden$stableprop_getter3htporvv9m7jr,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleMinutes$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleMinutes$stableprop_getter3ckwric3qyzlw,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTime$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTime$stableprop_getter32uc1dan9pecj,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTimeWithStatus$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTimeWithStatus$stableprop_getter3r13fkz4qf02r,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Skipped$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Skipped$stableprop_getter2vjtmvqo8qguc,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Time$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Time$stableprop_getter3m5v1urb45xwf,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithSchedule$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithSchedule$stableprop_getter27y2522dm7fex,
  com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithStatus$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithStatus$stableprop_gettermov8oyf4scx0,
  com_mbta_tid_mbta_app_wrapper_State_Vehicle$stableprop_getter as com_mbta_tid_mbta_app_wrapper_State_Vehicle$stableprop_getter135aj4hpxgc3f,
  Status_InTransitTo_getInstance as Status_InTransitTo_getInstance222f6mt9aj8eh,
  Status_IncomingAt_getInstance as Status_IncomingAt_getInstance3kpa6ifcdlm9b,
  Status_StoppedAt_getInstance as Status_StoppedAt_getInstance1e70agc6xx6me,
  Approaching_getInstance as Approaching_getInstance3s632ak0z8nc6,
  Arriving_getInstance as Arriving_getInstance3qcahvcq9u930,
  Boarding_getInstance as Boarding_getInstance1ij4hawy4usjb,
  Hidden_getInstance as Hidden_getInstance34quzuevslmc9,
  Now_getInstance as Now_getInstance1avntqbru28yq,
};
//endregion

//# sourceMappingURL=State.mjs.map
