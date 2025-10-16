import { Rect9h7fn4brxvs9 as Rect } from '../shape/CrossPlatformPathTypes.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  THROW_IAE23kobfj9wdoxr as THROW_IAE,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  throwKotlinNothingValueException2lxmvl03dor6f as throwKotlinNothingValueException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  equals2au1ep9vhcato as equals,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { StickDiagramShapes_instance34yr30mkd04nz as StickDiagramShapes_instance } from '../shape/StickDiagramShapes.mjs';
import { buildSvg31elonv04vbdd as buildSvg } from './SvgPathBuilder.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
import { IRouteDetailsViewModel333orcxbmvnvy as IRouteDetailsViewModel } from '../viewModel/RouteDetailsViewModel.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import {
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
  CoroutineScopelux7s7zphw7e as CoroutineScope_0,
} from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { appModule2jys7gqlxfq8j as appModule } from '../dependencyInjection/AppModule.mjs';
import { viewModelModule22xhj245stsph as viewModelModule } from '../viewModel/viewModelModule.js.mjs';
import { platformModule305lnhq4howzi as platformModule } from '../PlatformModule.mjs';
import { listOf1jh22dvmctj1r as listOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  loadKoinModules2dpj907mdbjkn as loadKoinModules,
  startKoin30la02u0gybvw as startKoin,
} from '../../../../../../projects-core-koin-core/org/koin/core/context/DefaultContextExt.mjs';
import { KoinPlatform_instance1hins6zdjrg2h as KoinPlatform_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/KoinPlatform.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Dispatchers.mjs';
import { promise1ky6tawqaxbt4 as promise } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Promise.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Segment$stable;
var com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Stop$stable;
var com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedConnection$stable;
var com_mbta_tid_mbta_app_wrapper_RouteDetails_State_StickConnection$stable;
var com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedShape$stable;
var com_mbta_tid_mbta_app_wrapper_RouteDetails_State$stable;
var com_mbta_tid_mbta_app_wrapper_RouteDetails$stable;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.eby_1 = new (Rect())(0.0, 40.0, 0.0, 48.0);
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
function RouteDetails$State$StickConnection$twistedShape$lambda($shape) {
  return function ($this$buildSvg) {
    $this$buildSvg.gby($shape.la9_1.ja8_1);
    $this$buildSvg.hby($shape.la9_1.ka8_1);
    return Unit_instance;
  };
}
function RouteDetails$State$StickConnection$twistedShape$lambda_0($shape) {
  return function ($this$buildSvg) {
    var bottom = $shape.ma9_1.la8_1;
    var tmp;
    if (bottom == null) {
      $this$buildSvg.gby($shape.ma9_1.ma8_1);
      tmp = Unit_instance;
    } else {
      $this$buildSvg.gby(bottom);
      $this$buildSvg.hby($shape.ma9_1.ma8_1);
      tmp = Unit_instance;
    }
    $this$buildSvg.iby($shape.ma9_1.na8_1, $shape.ma9_1.oa8_1);
    $this$buildSvg.hby($shape.ma9_1.oa8_1);
    $this$buildSvg.gby($shape.ma9_1.pa8_1);
    $this$buildSvg.iby($shape.ma9_1.qa8_1, $shape.ma9_1.ra8_1);
    var top = $shape.ma9_1.sa8_1;
    var tmp_0;
    if (top == null) {
      tmp_0 = Unit_instance;
    } else {
      $this$buildSvg.hby(top);
      tmp_0 = Unit_instance;
    }
    return Unit_instance;
  };
}
function RouteDetails$State$StickConnection$twistedShape$lambda_1($shape) {
  return function ($this$buildSvg) {
    var bottom = $shape.na9_1.ta8_1;
    var tmp;
    if (bottom == null) {
      tmp = Unit_instance;
    } else {
      $this$buildSvg.gby(bottom);
      $this$buildSvg.hby($shape.na9_1.ua8_1);
      tmp = Unit_instance;
    }
    var top = $shape.na9_1.wa8_1;
    var tmp_0;
    if (top == null) {
      tmp_0 = Unit_instance;
    } else {
      $this$buildSvg.gby($shape.na9_1.va8_1);
      $this$buildSvg.hby(top);
      tmp_0 = Unit_instance;
    }
    return Unit_instance;
  };
}
function RouteDetails$State$StickConnection$nonTwistedShape$lambda($shape) {
  return function ($this$buildSvg) {
    $this$buildSvg.gby($shape.ha9_1);
    $this$buildSvg.jby($shape.ia9_1, $shape.ja9_1, $shape.ka9_1);
    return Unit_instance;
  };
}
function RouteDetails$State$StickConnection$stickShape$lambda($shape) {
  return function ($this$buildSvg) {
    $this$buildSvg.gby($shape.xa8_1);
    $this$buildSvg.jby($shape.ya8_1, $shape.za8_1, $shape.aa9_1);
    return Unit_instance;
  };
}
var Lane_Left_instance;
var Lane_Center_instance;
var Lane_Right_instance;
function values() {
  return [Lane_Left_getInstance(), Lane_Center_getInstance(), Lane_Right_getInstance()];
}
function valueOf(value) {
  switch (value) {
    case 'Left':
      return Lane_Left_getInstance();
    case 'Center':
      return Lane_Center_getInstance();
    case 'Right':
      return Lane_Right_getInstance();
    default:
      Lane_initEntries();
      THROW_IAE('No enum constant value.');
      break;
  }
}
var Lane_entriesInitialized;
function Lane_initEntries() {
  if (Lane_entriesInitialized)
    return Unit_instance;
  Lane_entriesInitialized = true;
  Lane_Left_instance = new (Lane())('Left', 0);
  Lane_Center_instance = new (Lane())('Center', 1);
  Lane_Right_instance = new (Lane())('Right', 2);
}
var SegmentClass;
function Segment() {
  if (SegmentClass === VOID) {
    class $ {
      constructor(stops, isTypical, twistedConnections) {
        this.stops = stops;
        this.isTypical = isTypical;
        this.twistedConnections = twistedConnections;
      }
      kby() {
        return this.stops;
      }
      lby() {
        return this.isTypical;
      }
      mby() {
        return this.twistedConnections;
      }
      ch() {
        return this.stops;
      }
      dh() {
        return this.isTypical;
      }
      g97() {
        return this.twistedConnections;
      }
      nby(stops, isTypical, twistedConnections) {
        return new (Segment())(stops, isTypical, twistedConnections);
      }
      copy(stops, isTypical, twistedConnections, $super) {
        stops = stops === VOID ? this.stops : stops;
        isTypical = isTypical === VOID ? this.isTypical : isTypical;
        twistedConnections = twistedConnections === VOID ? this.twistedConnections : twistedConnections;
        return $super === VOID ? this.nby(stops, isTypical, twistedConnections) : $super.nby.call(this, stops, isTypical, twistedConnections);
      }
      toString() {
        return 'Segment(stops=' + toString(this.stops) + ', isTypical=' + this.isTypical + ', twistedConnections=' + toString_0(this.twistedConnections) + ')';
      }
      hashCode() {
        var result = hashCode(this.stops);
        result = imul(result, 31) + getBooleanHashCode(this.isTypical) | 0;
        result = imul(result, 31) + (this.twistedConnections == null ? 0 : hashCode(this.twistedConnections)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Segment()))
          return false;
        var tmp0_other_with_cast = other instanceof Segment() ? other : THROW_CCE();
        if (!equals(this.stops, tmp0_other_with_cast.stops))
          return false;
        if (!(this.isTypical === tmp0_other_with_cast.isTypical))
          return false;
        if (!equals(this.twistedConnections, tmp0_other_with_cast.twistedConnections))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Segment');
    SegmentClass = $;
  }
  return SegmentClass;
}
var StopClass;
function Stop() {
  if (StopClass === VOID) {
    class $ {
      constructor(name, stopLane, stickConnections) {
        this.name = name;
        this.stopLane = stopLane;
        this.stickConnections = stickConnections;
      }
      y3() {
        return this.name;
      }
      oby() {
        return this.stopLane;
      }
      pby() {
        return this.stickConnections;
      }
      ch() {
        return this.name;
      }
      dh() {
        return this.stopLane;
      }
      g97() {
        return this.stickConnections;
      }
      qby(name, stopLane, stickConnections) {
        return new (Stop())(name, stopLane, stickConnections);
      }
      copy(name, stopLane, stickConnections, $super) {
        name = name === VOID ? this.name : name;
        stopLane = stopLane === VOID ? this.stopLane : stopLane;
        stickConnections = stickConnections === VOID ? this.stickConnections : stickConnections;
        return $super === VOID ? this.qby(name, stopLane, stickConnections) : $super.qby.call(this, name, stopLane, stickConnections);
      }
      toString() {
        return 'Stop(name=' + this.name + ', stopLane=' + this.stopLane.toString() + ', stickConnections=' + toString(this.stickConnections) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.name);
        result = imul(result, 31) + this.stopLane.hashCode() | 0;
        result = imul(result, 31) + hashCode(this.stickConnections) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Stop()))
          return false;
        var tmp0_other_with_cast = other instanceof Stop() ? other : THROW_CCE();
        if (!(this.name === tmp0_other_with_cast.name))
          return false;
        if (!this.stopLane.equals(tmp0_other_with_cast.stopLane))
          return false;
        if (!equals(this.stickConnections, tmp0_other_with_cast.stickConnections))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Stop');
    StopClass = $;
  }
  return StopClass;
}
var TwistedConnectionClass;
function TwistedConnection() {
  if (TwistedConnectionClass === VOID) {
    class $ {
      constructor(connection, isTwisted) {
        this.connection = connection;
        this.isTwisted = isTwisted;
      }
      rby() {
        return this.connection;
      }
      sby() {
        return this.isTwisted;
      }
      ch() {
        return this.connection;
      }
      dh() {
        return this.isTwisted;
      }
      tby(connection, isTwisted) {
        return new (TwistedConnection())(connection, isTwisted);
      }
      copy(connection, isTwisted, $super) {
        connection = connection === VOID ? this.connection : connection;
        isTwisted = isTwisted === VOID ? this.isTwisted : isTwisted;
        return $super === VOID ? this.tby(connection, isTwisted) : $super.tby.call(this, connection, isTwisted);
      }
      toString() {
        return 'TwistedConnection(connection=' + this.connection.toString() + ', isTwisted=' + this.isTwisted + ')';
      }
      hashCode() {
        var result = this.connection.hashCode();
        result = imul(result, 31) + getBooleanHashCode(this.isTwisted) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TwistedConnection()))
          return false;
        var tmp0_other_with_cast = other instanceof TwistedConnection() ? other : THROW_CCE();
        if (!this.connection.equals(tmp0_other_with_cast.connection))
          return false;
        if (!(this.isTwisted === tmp0_other_with_cast.isTwisted))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'TwistedConnection');
    TwistedConnectionClass = $;
  }
  return TwistedConnectionClass;
}
var StickConnectionClass;
function StickConnection() {
  if (StickConnectionClass === VOID) {
    class $ {
      constructor(inner) {
        Companion_getInstance();
        this.uby_1 = inner;
      }
      twistedShape(proportionClosed) {
        var tmp0_elvis_lhs = StickDiagramShapes_instance.sa9(this.uby_1, Companion_getInstance().eby_1, proportionClosed);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return null;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var shape = tmp;
        var shadow = buildSvg(RouteDetails$State$StickConnection$twistedShape$lambda(shape));
        var curves = buildSvg(RouteDetails$State$StickConnection$twistedShape$lambda_0(shape));
        var ends = buildSvg(RouteDetails$State$StickConnection$twistedShape$lambda_1(shape));
        return new (TwistedShape())(shadow, curves, ends, shape.oa9_1);
      }
      nonTwistedShape(proportionClosed) {
        var tmp0_elvis_lhs = StickDiagramShapes_instance.ra9(this.uby_1, Companion_getInstance().eby_1, proportionClosed);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return null;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var shape = tmp;
        return buildSvg(RouteDetails$State$StickConnection$nonTwistedShape$lambda(shape));
      }
      stickShape() {
        var shape = StickDiagramShapes_instance.qa9(this.uby_1, Companion_getInstance().eby_1);
        return buildSvg(RouteDetails$State$StickConnection$stickShape$lambda(shape));
      }
      vby(inner) {
        return new (StickConnection())(inner);
      }
      copy$default(inner, $super) {
        inner = inner === VOID ? this.uby_1 : inner;
        return $super === VOID ? this.vby(inner) : $super.vby.call(this, inner);
      }
      toString() {
        return 'StickConnection(inner=' + this.uby_1.toString() + ')';
      }
      hashCode() {
        return this.uby_1.hashCode();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StickConnection()))
          return false;
        var tmp0_other_with_cast = other instanceof StickConnection() ? other : THROW_CCE();
        if (!this.uby_1.equals(tmp0_other_with_cast.uby_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'StickConnection');
    StickConnectionClass = $;
  }
  return StickConnectionClass;
}
var TwistedShapeClass;
function TwistedShape() {
  if (TwistedShapeClass === VOID) {
    class $ {
      constructor(shadow, curves, ends, opensToNothing) {
        this.shadow = shadow;
        this.curves = curves;
        this.ends = ends;
        this.opensToNothing = opensToNothing;
      }
      wby() {
        return this.shadow;
      }
      xby() {
        return this.curves;
      }
      yby() {
        return this.ends;
      }
      zby() {
        return this.opensToNothing;
      }
      ch() {
        return this.shadow;
      }
      dh() {
        return this.curves;
      }
      g97() {
        return this.ends;
      }
      abz() {
        return this.opensToNothing;
      }
      bbz(shadow, curves, ends, opensToNothing) {
        return new (TwistedShape())(shadow, curves, ends, opensToNothing);
      }
      copy(shadow, curves, ends, opensToNothing, $super) {
        shadow = shadow === VOID ? this.shadow : shadow;
        curves = curves === VOID ? this.curves : curves;
        ends = ends === VOID ? this.ends : ends;
        opensToNothing = opensToNothing === VOID ? this.opensToNothing : opensToNothing;
        return $super === VOID ? this.bbz(shadow, curves, ends, opensToNothing) : $super.bbz.call(this, shadow, curves, ends, opensToNothing);
      }
      toString() {
        return 'TwistedShape(shadow=' + this.shadow + ', curves=' + this.curves + ', ends=' + this.ends + ', opensToNothing=' + this.opensToNothing + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.shadow);
        result = imul(result, 31) + getStringHashCode(this.curves) | 0;
        result = imul(result, 31) + getStringHashCode(this.ends) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.opensToNothing) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TwistedShape()))
          return false;
        var tmp0_other_with_cast = other instanceof TwistedShape() ? other : THROW_CCE();
        if (!(this.shadow === tmp0_other_with_cast.shadow))
          return false;
        if (!(this.curves === tmp0_other_with_cast.curves))
          return false;
        if (!(this.ends === tmp0_other_with_cast.ends))
          return false;
        if (!(this.opensToNothing === tmp0_other_with_cast.opensToNothing))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'TwistedShape');
    TwistedShapeClass = $;
  }
  return TwistedShapeClass;
}
var LaneClass;
function Lane() {
  if (LaneClass === VOID) {
    class $ extends Enum() {
      get name() {
        return this.y3();
      }
      get ordinal() {
        return this.z3();
      }
    }
    initMetadataForClass($, 'Lane');
    LaneClass = $;
  }
  return LaneClass;
}
function Lane_Left_getInstance() {
  Lane_initEntries();
  return Lane_Left_instance;
}
function Lane_Center_getInstance() {
  Lane_initEntries();
  return Lane_Center_instance;
}
function Lane_Right_getInstance() {
  Lane_initEntries();
  return Lane_Right_instance;
}
var RouteDetails$onNewState$slambda$slambdaClass;
function RouteDetails$onNewState$slambda$slambda() {
  if (RouteDetails$onNewState$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($callback, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.mbz_1 = $callback;
        super(resultContinuation, $box);
      }
      obz(it, $completion) {
        var tmp = this.pbz(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.obz((p1 == null ? true : p1 instanceof State()) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              this.mbz_1(this.nbz_1);
              return Unit_instance;
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      pbz(it, completion) {
        var i = new (RouteDetails$onNewState$slambda$slambda())(this.mbz_1, completion);
        i.nbz_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    RouteDetails$onNewState$slambda$slambdaClass = $;
  }
  return RouteDetails$onNewState$slambda$slambdaClass;
}
function RouteDetails$onNewState$slambda$slambda_0($callback, resultContinuation) {
  var i = new (RouteDetails$onNewState$slambda$slambda())($callback, resultContinuation);
  var l = function (it, $completion) {
    return i.obz(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function _get_vm__ndccz8($this) {
  var tmp0 = $this.qbz_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('vm', 1, tmp, RouteDetails$_get_vm_$ref_bqfvjm(), null);
  return tmp0.v1();
}
var StateClass;
function State() {
  if (StateClass === VOID) {
    class $ {
      constructor(routeColor, segments) {
        this.routeColor = routeColor;
        this.segments = segments;
      }
      rbz() {
        return this.routeColor;
      }
      sbz() {
        return this.segments;
      }
      ch() {
        return this.routeColor;
      }
      dh() {
        return this.segments;
      }
      tbz(routeColor, segments) {
        return new (State())(routeColor, segments);
      }
      copy(routeColor, segments, $super) {
        routeColor = routeColor === VOID ? this.routeColor : routeColor;
        segments = segments === VOID ? this.segments : segments;
        return $super === VOID ? this.tbz(routeColor, segments) : $super.tbz.call(this, routeColor, segments);
      }
      toString() {
        return 'State(routeColor=' + this.routeColor + ', segments=' + toString(this.segments) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.routeColor);
        result = imul(result, 31) + hashCode(this.segments) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof State()))
          return false;
        var tmp0_other_with_cast = other instanceof State() ? other : THROW_CCE();
        if (!(this.routeColor === tmp0_other_with_cast.routeColor))
          return false;
        if (!equals(this.segments, tmp0_other_with_cast.segments))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'State');
    StateClass = $;
  }
  return StateClass;
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.ubz_1 = function_0;
      }
      z2n(value, $completion) {
        return this.ubz_1(value, $completion);
      }
      z4() {
        return this.ubz_1;
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, FlowCollector()) : false) {
          var tmp_0;
          if (!(other == null) ? isInterface(other, FunctionAdapter()) : false) {
            tmp_0 = equals(this.z4(), other.z4());
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.z4());
      }
    }
    initMetadataForClass($, 'sam$kotlinx_coroutines_flow_FlowCollector$0', VOID, VOID, [FlowCollector(), FunctionAdapter()], [1]);
    sam$kotlinx_coroutines_flow_FlowCollector$0Class = $;
  }
  return sam$kotlinx_coroutines_flow_FlowCollector$0Class;
}
function RouteDetails$lambda($modules) {
  return function ($this$startKoin) {
    $this$startKoin.o7v($modules);
    return Unit_instance;
  };
}
function RouteDetails$vm$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(IRouteDetailsViewModel()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(IRouteDetailsViewModel()), tmp2, parameters);
    }
    return tmp;
  };
}
function RouteDetails$_get_vm_$ref_bqfvjm() {
  return function (p0) {
    return _get_vm__ndccz8(p0);
  };
}
var RouteDetails$onNewState$slambdaClass;
function RouteDetails$onNewState$slambda() {
  if (RouteDetails$onNewState$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $callback, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.dc0_1 = this$0;
        $box.ec0_1 = $callback;
        super(resultContinuation, $box);
      }
      x3e($this$promise, $completion) {
        var tmp = this.y3e($this$promise, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.fd_1 = 1;
                var tmp_0 = _get_vm__ndccz8(this.dc0_1).oay();
                var tmp_1 = RouteDetails$onNewState$slambda$slambda_0(this.ec0_1, null);
                suspendResult = tmp_0.t2p(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                throwKotlinNothingValueException();
                break;
              case 2:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 2) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      y3e($this$promise, completion) {
        var i = new (RouteDetails$onNewState$slambda())(this.dc0_1, this.ec0_1, completion);
        i.fc0_1 = $this$promise;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    RouteDetails$onNewState$slambdaClass = $;
  }
  return RouteDetails$onNewState$slambdaClass;
}
function RouteDetails$onNewState$slambda_0(this$0, $callback, resultContinuation) {
  var i = new (RouteDetails$onNewState$slambda())(this$0, $callback, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.x3e($this$promise, $completion);
  };
  l.$arity = 1;
  return l;
}
var RouteDetailsClass;
function RouteDetails() {
  if (RouteDetailsClass === VOID) {
    class $ {
      constructor(backendRoot) {
        var modules = listOf([appModule(backendRoot), viewModelModule(), platformModule()]);
        if (KoinPlatform_instance.q7z() == null) {
          startKoin(RouteDetails$lambda(modules));
        } else {
          loadKoinModules(modules);
        }
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.qbz_1 = lazy(mode, RouteDetails$vm$delegate$lambda(this, null, null));
      }
      setSelection(routeId, directionId) {
        _get_vm__ndccz8(this).ibw(routeId, directionId);
      }
      onNewState(callback) {
        var tmp = CoroutineScope_0(Dispatchers_getInstance().u28_1);
        return promise(tmp, VOID, VOID, RouteDetails$onNewState$slambda_0(this, callback, null));
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'RouteDetails', VOID, VOID, [KoinComponent()]);
    RouteDetailsClass = $;
  }
  return RouteDetailsClass;
}
function com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Segment$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Segment$stable;
}
function com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Stop$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Stop$stable;
}
function com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedConnection$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedConnection$stable;
}
function com_mbta_tid_mbta_app_wrapper_RouteDetails_State_StickConnection$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_RouteDetails_State_StickConnection$stable;
}
function com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedShape$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedShape$stable;
}
function com_mbta_tid_mbta_app_wrapper_RouteDetails_State$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_RouteDetails_State$stable;
}
function com_mbta_tid_mbta_app_wrapper_RouteDetails$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_RouteDetails$stable;
}
//region block: init
com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Segment$stable = 8;
com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Stop$stable = 8;
com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedConnection$stable = 0;
com_mbta_tid_mbta_app_wrapper_RouteDetails_State_StickConnection$stable = 0;
com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedShape$stable = 0;
com_mbta_tid_mbta_app_wrapper_RouteDetails_State$stable = 8;
com_mbta_tid_mbta_app_wrapper_RouteDetails$stable = 8;
//endregion
//region block: exports
export {
  valueOf as valueOf32ai26mgtwqhn,
  values as values1bf1xbbm4ab7a,
  Lane as Lane1mlq4b25h1idy,
  Segment as Segment231eglc9oj4ao,
  StickConnection as StickConnection14xlkg7l6dpnm,
  Stop as Stop3qdt9axzvcxlh,
  TwistedConnection as TwistedConnection35un2g87jjmx3,
  TwistedShape as TwistedShape1iumu3ox4meia,
  State as State21zwpn71lnuf,
  RouteDetails as RouteDetailswkw3816kohe1,
  com_mbta_tid_mbta_app_wrapper_RouteDetails$stableprop_getter as com_mbta_tid_mbta_app_wrapper_RouteDetails$stableprop_getter3l57t06lox1tz,
  com_mbta_tid_mbta_app_wrapper_RouteDetails_State$stableprop_getter as com_mbta_tid_mbta_app_wrapper_RouteDetails_State$stableprop_getter3ne5vxap82o4z,
  com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Segment$stableprop_getter as com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Segment$stableprop_getter33yc6cyub8vel,
  com_mbta_tid_mbta_app_wrapper_RouteDetails_State_StickConnection$stableprop_getter as com_mbta_tid_mbta_app_wrapper_RouteDetails_State_StickConnection$stableprop_getter3q5z0t11pmy4a,
  com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Stop$stableprop_getter as com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Stop$stableprop_getter3g2b2smxi37ao,
  com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedConnection$stableprop_getter as com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedConnection$stableprop_getteru21wkijmjb0q,
  com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedShape$stableprop_getter as com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedShape$stableprop_getter27dsaku92mvj9,
  Lane_Center_getInstance as Lane_Center_getInstance1ywcxy36tih3d,
  Lane_Left_getInstance as Lane_Left_getInstance276z4y9t4qeau,
  Lane_Right_getInstance as Lane_Right_getInstanceumpk1ek4bwa4,
};
//endregion

//# sourceMappingURL=RouteDetails.mjs.map
