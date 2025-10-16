import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  equals2au1ep9vhcato as equals,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { getNumberHashCode2l4nbdcihl25f as getNumberHashCode } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/bitUtils.mjs';
import {
  VPos_Bottom_getInstance36lsp88bpc25p as VPos_Bottom_getInstance,
  VPos_Center_getInstance1qdw1dt8mbj0j as VPos_Center_getInstance,
} from '../model/RouteBranchSegment.mjs';
import {
  lerpueh93lx3mh8q as lerp,
  Point3pc5o155wu3su as Point,
} from './CrossPlatformPathTypes.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_shape_StickDiagramShapes_Connection$stable;
var com_mbta_tid_mbta_app_shape_StickDiagramShapes_NonTwisted$stable;
var com_mbta_tid_mbta_app_shape_StickDiagramShapes_Twisted_Shadow$stable;
var com_mbta_tid_mbta_app_shape_StickDiagramShapes_Twisted_Curves$stable;
var com_mbta_tid_mbta_app_shape_StickDiagramShapes_Twisted_Ends$stable;
var com_mbta_tid_mbta_app_shape_StickDiagramShapes_Twisted$stable;
var com_mbta_tid_mbta_app_shape_StickDiagramShapes$stable;
var ShadowClass;
function Shadow() {
  if (ShadowClass === VOID) {
    class $ {
      constructor(start, end) {
        this.ja8_1 = start;
        this.ka8_1 = end;
      }
      toString() {
        return 'Shadow(start=' + this.ja8_1.toString() + ', end=' + this.ka8_1.toString() + ')';
      }
      hashCode() {
        var result = this.ja8_1.hashCode();
        result = imul(result, 31) + this.ka8_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Shadow()))
          return false;
        var tmp0_other_with_cast = other instanceof Shadow() ? other : THROW_CCE();
        if (!this.ja8_1.equals(tmp0_other_with_cast.ja8_1))
          return false;
        if (!this.ka8_1.equals(tmp0_other_with_cast.ka8_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Shadow');
    ShadowClass = $;
  }
  return ShadowClass;
}
var CurvesClass;
function Curves() {
  if (CurvesClass === VOID) {
    class $ {
      constructor(bottom, bottomCurveStart, bottomCurveControl, shadowStart, shadowEnd, topCurveControl, topCurveStart, top) {
        this.la8_1 = bottom;
        this.ma8_1 = bottomCurveStart;
        this.na8_1 = bottomCurveControl;
        this.oa8_1 = shadowStart;
        this.pa8_1 = shadowEnd;
        this.qa8_1 = topCurveControl;
        this.ra8_1 = topCurveStart;
        this.sa8_1 = top;
      }
      toString() {
        return 'Curves(bottom=' + toString(this.la8_1) + ', bottomCurveStart=' + this.ma8_1.toString() + ', bottomCurveControl=' + this.na8_1.toString() + ', shadowStart=' + this.oa8_1.toString() + ', shadowEnd=' + this.pa8_1.toString() + ', topCurveControl=' + this.qa8_1.toString() + ', topCurveStart=' + this.ra8_1.toString() + ', top=' + toString(this.sa8_1) + ')';
      }
      hashCode() {
        var result = this.la8_1 == null ? 0 : this.la8_1.hashCode();
        result = imul(result, 31) + this.ma8_1.hashCode() | 0;
        result = imul(result, 31) + this.na8_1.hashCode() | 0;
        result = imul(result, 31) + this.oa8_1.hashCode() | 0;
        result = imul(result, 31) + this.pa8_1.hashCode() | 0;
        result = imul(result, 31) + this.qa8_1.hashCode() | 0;
        result = imul(result, 31) + this.ra8_1.hashCode() | 0;
        result = imul(result, 31) + (this.sa8_1 == null ? 0 : this.sa8_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Curves()))
          return false;
        var tmp0_other_with_cast = other instanceof Curves() ? other : THROW_CCE();
        if (!equals(this.la8_1, tmp0_other_with_cast.la8_1))
          return false;
        if (!this.ma8_1.equals(tmp0_other_with_cast.ma8_1))
          return false;
        if (!this.na8_1.equals(tmp0_other_with_cast.na8_1))
          return false;
        if (!this.oa8_1.equals(tmp0_other_with_cast.oa8_1))
          return false;
        if (!this.pa8_1.equals(tmp0_other_with_cast.pa8_1))
          return false;
        if (!this.qa8_1.equals(tmp0_other_with_cast.qa8_1))
          return false;
        if (!this.ra8_1.equals(tmp0_other_with_cast.ra8_1))
          return false;
        if (!equals(this.sa8_1, tmp0_other_with_cast.sa8_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Curves');
    CurvesClass = $;
  }
  return CurvesClass;
}
var EndsClass;
function Ends() {
  if (EndsClass === VOID) {
    class $ {
      constructor(bottom, bottomCurveStart, topCurveStart, top) {
        this.ta8_1 = bottom;
        this.ua8_1 = bottomCurveStart;
        this.va8_1 = topCurveStart;
        this.wa8_1 = top;
      }
      toString() {
        return 'Ends(bottom=' + toString(this.ta8_1) + ', bottomCurveStart=' + this.ua8_1.toString() + ', topCurveStart=' + this.va8_1.toString() + ', top=' + toString(this.wa8_1) + ')';
      }
      hashCode() {
        var result = this.ta8_1 == null ? 0 : this.ta8_1.hashCode();
        result = imul(result, 31) + this.ua8_1.hashCode() | 0;
        result = imul(result, 31) + this.va8_1.hashCode() | 0;
        result = imul(result, 31) + (this.wa8_1 == null ? 0 : this.wa8_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Ends()))
          return false;
        var tmp0_other_with_cast = other instanceof Ends() ? other : THROW_CCE();
        if (!equals(this.ta8_1, tmp0_other_with_cast.ta8_1))
          return false;
        if (!this.ua8_1.equals(tmp0_other_with_cast.ua8_1))
          return false;
        if (!this.va8_1.equals(tmp0_other_with_cast.va8_1))
          return false;
        if (!equals(this.wa8_1, tmp0_other_with_cast.wa8_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Ends');
    EndsClass = $;
  }
  return EndsClass;
}
var ConnectionClass;
function Connection() {
  if (ConnectionClass === VOID) {
    class $ {
      constructor(start, startControl, endControl, end) {
        this.xa8_1 = start;
        this.ya8_1 = startControl;
        this.za8_1 = endControl;
        this.aa9_1 = end;
      }
      toString() {
        return 'Connection(start=' + this.xa8_1.toString() + ', startControl=' + this.ya8_1.toString() + ', endControl=' + this.za8_1.toString() + ', end=' + this.aa9_1.toString() + ')';
      }
      hashCode() {
        var result = this.xa8_1.hashCode();
        result = imul(result, 31) + this.ya8_1.hashCode() | 0;
        result = imul(result, 31) + this.za8_1.hashCode() | 0;
        result = imul(result, 31) + this.aa9_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Connection()))
          return false;
        var tmp0_other_with_cast = other instanceof Connection() ? other : THROW_CCE();
        if (!this.xa8_1.equals(tmp0_other_with_cast.xa8_1))
          return false;
        if (!this.ya8_1.equals(tmp0_other_with_cast.ya8_1))
          return false;
        if (!this.za8_1.equals(tmp0_other_with_cast.za8_1))
          return false;
        if (!this.aa9_1.equals(tmp0_other_with_cast.aa9_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Connection');
    ConnectionClass = $;
  }
  return ConnectionClass;
}
var TwistBaseClass;
function TwistBase() {
  if (TwistBaseClass === VOID) {
    class $ {
      constructor(topCenterX, bottomCenterX, topY, bottomY, opensToNothing) {
        this.ba9_1 = topCenterX;
        this.ca9_1 = bottomCenterX;
        this.da9_1 = topY;
        this.ea9_1 = bottomY;
        this.fa9_1 = opensToNothing;
        this.ga9_1 = (this.da9_1 + this.ea9_1) / 2;
      }
      toString() {
        return 'TwistBase(topCenterX=' + this.ba9_1 + ', bottomCenterX=' + this.ca9_1 + ', topY=' + this.da9_1 + ', bottomY=' + this.ea9_1 + ', opensToNothing=' + this.fa9_1 + ')';
      }
      hashCode() {
        var result = getNumberHashCode(this.ba9_1);
        result = imul(result, 31) + getNumberHashCode(this.ca9_1) | 0;
        result = imul(result, 31) + getNumberHashCode(this.da9_1) | 0;
        result = imul(result, 31) + getNumberHashCode(this.ea9_1) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.fa9_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TwistBase()))
          return false;
        var tmp0_other_with_cast = other instanceof TwistBase() ? other : THROW_CCE();
        if (!equals(this.ba9_1, tmp0_other_with_cast.ba9_1))
          return false;
        if (!equals(this.ca9_1, tmp0_other_with_cast.ca9_1))
          return false;
        if (!equals(this.da9_1, tmp0_other_with_cast.da9_1))
          return false;
        if (!equals(this.ea9_1, tmp0_other_with_cast.ea9_1))
          return false;
        if (!(this.fa9_1 === tmp0_other_with_cast.fa9_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'TwistBase');
    TwistBaseClass = $;
  }
  return TwistBaseClass;
}
var NonTwistedClass;
function NonTwisted() {
  if (NonTwistedClass === VOID) {
    class $ {
      constructor(start, startControl, endControl, end) {
        this.ha9_1 = start;
        this.ia9_1 = startControl;
        this.ja9_1 = endControl;
        this.ka9_1 = end;
      }
      toString() {
        return 'NonTwisted(start=' + this.ha9_1.toString() + ', startControl=' + this.ia9_1.toString() + ', endControl=' + this.ja9_1.toString() + ', end=' + this.ka9_1.toString() + ')';
      }
      hashCode() {
        var result = this.ha9_1.hashCode();
        result = imul(result, 31) + this.ia9_1.hashCode() | 0;
        result = imul(result, 31) + this.ja9_1.hashCode() | 0;
        result = imul(result, 31) + this.ka9_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof NonTwisted()))
          return false;
        var tmp0_other_with_cast = other instanceof NonTwisted() ? other : THROW_CCE();
        if (!this.ha9_1.equals(tmp0_other_with_cast.ha9_1))
          return false;
        if (!this.ia9_1.equals(tmp0_other_with_cast.ia9_1))
          return false;
        if (!this.ja9_1.equals(tmp0_other_with_cast.ja9_1))
          return false;
        if (!this.ka9_1.equals(tmp0_other_with_cast.ka9_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'NonTwisted');
    NonTwistedClass = $;
  }
  return NonTwistedClass;
}
var TwistedClass;
function Twisted() {
  if (TwistedClass === VOID) {
    class $ {
      constructor(shadow, curves, ends, opensToNothing) {
        this.la9_1 = shadow;
        this.ma9_1 = curves;
        this.na9_1 = ends;
        this.oa9_1 = opensToNothing;
      }
      toString() {
        return 'Twisted(shadow=' + this.la9_1.toString() + ', curves=' + this.ma9_1.toString() + ', ends=' + this.na9_1.toString() + ', opensToNothing=' + this.oa9_1 + ')';
      }
      hashCode() {
        var result = this.la9_1.hashCode();
        result = imul(result, 31) + this.ma9_1.hashCode() | 0;
        result = imul(result, 31) + this.na9_1.hashCode() | 0;
        result = imul(result, 31) + getBooleanHashCode(this.oa9_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Twisted()))
          return false;
        var tmp0_other_with_cast = other instanceof Twisted() ? other : THROW_CCE();
        if (!this.la9_1.equals(tmp0_other_with_cast.la9_1))
          return false;
        if (!this.ma9_1.equals(tmp0_other_with_cast.ma9_1))
          return false;
        if (!this.na9_1.equals(tmp0_other_with_cast.na9_1))
          return false;
        if (!(this.oa9_1 === tmp0_other_with_cast.oa9_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Twisted');
    TwistedClass = $;
  }
  return TwistedClass;
}
function x($this, lane, rect) {
  var tmp;
  switch (lane.x3_1) {
    case 0:
      tmp = rect.da8_1 + rect.ha8_1 / 4;
      break;
    case 1:
      tmp = rect.da8_1 + rect.ha8_1 / 2;
      break;
    case 2:
      tmp = rect.ea8_1 - rect.ha8_1 / 4;
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
}
function y($this, vPos, rect) {
  var tmp;
  switch (vPos.x3_1) {
    case 0:
      tmp = rect.fa8_1;
      break;
    case 1:
      tmp = rect.fa8_1 + rect.ia8_1 / 2;
      break;
    case 2:
      tmp = rect.ga8_1;
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
}
function twistBase($this, connection, rect, proportionClosed) {
  var openFromVPos = connection.t96_1.equals(VPos_Center_getInstance()) ? VPos_Bottom_getInstance() : connection.t96_1;
  var openToVPos = connection.u96_1.equals(VPos_Center_getInstance()) ? VPos_Bottom_getInstance() : connection.u96_1;
  var opensToNothing = openFromVPos.equals(openToVPos);
  if (opensToNothing && proportionClosed === 0.0)
    return null;
  var topY = lerp(y($this, openFromVPos, rect), y($this, connection.t96_1, rect), proportionClosed);
  var bottomY = lerp(y($this, openToVPos, rect), y($this, connection.u96_1, rect), proportionClosed);
  var topCenterX = x($this, connection.r96_1, rect);
  var bottomCenterX = lerp(topCenterX, x($this, connection.s96_1, rect), proportionClosed);
  return new (TwistBase())(topCenterX, bottomCenterX, topY, bottomY, opensToNothing);
}
var StickDiagramShapesClass;
function StickDiagramShapes() {
  if (StickDiagramShapesClass === VOID) {
    class $ {
      constructor() {
        this.pa9_1 = 3.1415927;
      }
      qa9(connection, rect) {
        var fromX = x(this, connection.r96_1, rect);
        var toX = x(this, connection.s96_1, rect);
        var fromY = y(this, connection.t96_1, rect);
        var toY = y(this, connection.u96_1, rect);
        var controlY = (fromY + toY) / 2;
        return new (Connection())(new (Point())(fromX, fromY), new (Point())(fromX, controlY), new (Point())(toX, controlY), new (Point())(toX, toY));
      }
      ra9(connection, rect, proportionClosed) {
        var tmp0_elvis_lhs = twistBase(this, connection, rect, proportionClosed);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return null;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var base = tmp;
        return new (NonTwisted())(new (Point())(base.ba9_1, base.da9_1), new (Point())(base.ba9_1, base.ga9_1), new (Point())(base.ca9_1, base.ga9_1), new (Point())(base.ca9_1, base.ea9_1));
      }
      sa9(connection, rect, proportionClosed) {
        var tmp0_elvis_lhs = twistBase(this, connection, rect, proportionClosed);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return null;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var base = tmp;
        var height = base.ea9_1 - base.da9_1;
        var slantAngle = lerp(3.1415927 / 2, 3.1415927 / 8, proportionClosed);
        var slantRadius = (height + rect.ha8_1) / 20;
        // Inline function 'kotlin.math.sin' call
        var twistSlantDY = slantRadius * Math.sin(slantAngle);
        var curveStartDY = height / 5;
        var curveControlDY = rect.ia8_1 / 15;
        var centerCenterX = (base.ba9_1 + base.ca9_1) / 2;
        // Inline function 'kotlin.math.cos' call
        var twistSlantDX = slantRadius * Math.cos(slantAngle);
        var shadowStart = new (Point())(centerCenterX + twistSlantDX, base.ga9_1 + twistSlantDY);
        var shadowEnd = new (Point())(centerCenterX - twistSlantDX, base.ga9_1 - twistSlantDY);
        var shadow = new (Shadow())(shadowStart, shadowEnd);
        var bottom = new (Point())(base.ca9_1, base.ea9_1);
        var bottomCurveStart = new (Point())(base.ca9_1, base.ea9_1 - curveStartDY);
        var topCurveStart = new (Point())(base.ba9_1, base.da9_1 + curveStartDY);
        var top = new (Point())(base.ba9_1, base.da9_1);
        // Inline function 'kotlin.math.abs' call
        var x = rect.ga8_1 - base.ea9_1;
        var roundedBottom = Math.abs(x) > 1;
        // Inline function 'kotlin.math.abs' call
        var x_0 = base.da9_1 - rect.fa8_1;
        var roundedTop = Math.abs(x_0) > 1;
        // Inline function 'kotlin.takeIf' call
        var tmp_0;
        if (roundedBottom) {
          tmp_0 = bottom;
        } else {
          tmp_0 = null;
        }
        var tmp_1 = tmp_0;
        var tmp_2 = new (Point())(base.ca9_1, base.ga9_1 + twistSlantDY + curveControlDY);
        var tmp_3 = new (Point())(base.ba9_1, base.ga9_1 - twistSlantDY - curveControlDY);
        // Inline function 'kotlin.takeIf' call
        var tmp_4;
        if (roundedTop) {
          tmp_4 = top;
        } else {
          tmp_4 = null;
        }
        var tmp$ret$7 = tmp_4;
        var curves = new (Curves())(tmp_1, bottomCurveStart, tmp_2, shadowStart, shadowEnd, tmp_3, topCurveStart, tmp$ret$7);
        // Inline function 'kotlin.takeIf' call
        var tmp_5;
        if (!roundedBottom) {
          tmp_5 = bottom;
        } else {
          tmp_5 = null;
        }
        var tmp_6 = tmp_5;
        // Inline function 'kotlin.takeIf' call
        var tmp_7;
        if (!roundedTop) {
          tmp_7 = top;
        } else {
          tmp_7 = null;
        }
        var tmp$ret$11 = tmp_7;
        var ends = new (Ends())(tmp_6, bottomCurveStart, topCurveStart, tmp$ret$11);
        return new (Twisted())(shadow, curves, ends, base.fa9_1);
      }
    }
    initMetadataForObject($, 'StickDiagramShapes');
    StickDiagramShapesClass = $;
  }
  return StickDiagramShapesClass;
}
var StickDiagramShapes_instance;
function StickDiagramShapes_getInstance() {
  return StickDiagramShapes_instance;
}
//region block: init
com_mbta_tid_mbta_app_shape_StickDiagramShapes_Connection$stable = 0;
com_mbta_tid_mbta_app_shape_StickDiagramShapes_NonTwisted$stable = 0;
com_mbta_tid_mbta_app_shape_StickDiagramShapes_Twisted_Shadow$stable = 0;
com_mbta_tid_mbta_app_shape_StickDiagramShapes_Twisted_Curves$stable = 0;
com_mbta_tid_mbta_app_shape_StickDiagramShapes_Twisted_Ends$stable = 0;
com_mbta_tid_mbta_app_shape_StickDiagramShapes_Twisted$stable = 0;
com_mbta_tid_mbta_app_shape_StickDiagramShapes$stable = 0;
StickDiagramShapes_instance = new (StickDiagramShapes())();
//endregion
//region block: exports
export {
  StickDiagramShapes_instance as StickDiagramShapes_instance34yr30mkd04nz,
};
//endregion

//# sourceMappingURL=StickDiagramShapes.mjs.map
