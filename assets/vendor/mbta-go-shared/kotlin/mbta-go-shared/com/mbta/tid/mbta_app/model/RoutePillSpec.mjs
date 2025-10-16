import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  createThis2j2avj17cvnv2 as createThis,
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  replace3le3ie7l9k8aq as replace,
  startsWith26w8qjqapeeq6 as startsWith,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import {
  split2bvyvnrlcifjv as split,
  removeSuffix3d61x5lsuvuho as removeSuffix,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { first3kg261hmihapu as first } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/_Strings.mjs';
import { Char19o2r8palgjof as Char } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  RouteType_BUS_getInstance1q03qahihhdox as RouteType_BUS_getInstance,
  RouteType_FERRY_getInstance2ap57x114albq as RouteType_FERRY_getInstance,
} from './RouteType.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_RoutePillSpec_Content_Empty$stable;
var com_mbta_tid_mbta_app_model_RoutePillSpec_Content_Text$stable;
var com_mbta_tid_mbta_app_model_RoutePillSpec_Content_ModeImage$stable;
var com_mbta_tid_mbta_app_model_RoutePillSpec_ContentDescription_StopSearchResultRoute$stable;
var com_mbta_tid_mbta_app_model_RoutePillSpec_ContentDescription$stable;
var com_mbta_tid_mbta_app_model_RoutePillSpec$stable;
var Type_Fixed_instance;
var Type_Flex_instance;
var Type_FlexCompact_instance;
var Type_entriesInitialized;
function Type_initEntries() {
  if (Type_entriesInitialized)
    return Unit_instance;
  Type_entriesInitialized = true;
  Type_Fixed_instance = new (Type())('Fixed', 0);
  Type_Flex_instance = new (Type())('Flex', 1);
  Type_FlexCompact_instance = new (Type())('FlexCompact', 2);
}
var EmptyClass;
function Empty() {
  if (EmptyClass === VOID) {
    class $ {
      toString() {
        return 'Empty';
      }
      hashCode() {
        return 1095992054;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Empty()))
          return false;
        other instanceof Empty() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Empty');
    EmptyClass = $;
  }
  return EmptyClass;
}
var Empty_instance;
function Empty_getInstance() {
  return Empty_instance;
}
var TextClass;
function Text() {
  if (TextClass === VOID) {
    class $ {
      constructor(text) {
        this.m9d_1 = text;
      }
      toString() {
        return 'Text(text=' + this.m9d_1 + ')';
      }
      hashCode() {
        return getStringHashCode(this.m9d_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Text()))
          return false;
        var tmp0_other_with_cast = other instanceof Text() ? other : THROW_CCE();
        if (!(this.m9d_1 === tmp0_other_with_cast.m9d_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Text');
    TextClass = $;
  }
  return TextClass;
}
var ModeImageClass;
function ModeImage() {
  if (ModeImageClass === VOID) {
    class $ {
      constructor(mode) {
        this.n9d_1 = mode;
      }
      toString() {
        return 'ModeImage(mode=' + this.n9d_1.toString() + ')';
      }
      hashCode() {
        return this.n9d_1.hashCode();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ModeImage()))
          return false;
        var tmp0_other_with_cast = other instanceof ModeImage() ? other : THROW_CCE();
        if (!this.n9d_1.equals(tmp0_other_with_cast.n9d_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'ModeImage');
    ModeImageClass = $;
  }
  return ModeImageClass;
}
var Height_Small_instance;
var Height_Medium_instance;
var Height_Large_instance;
var Height_entriesInitialized;
function Height_initEntries() {
  if (Height_entriesInitialized)
    return Unit_instance;
  Height_entriesInitialized = true;
  Height_Small_instance = new (Height())('Small', 0);
  Height_Medium_instance = new (Height())('Medium', 1);
  Height_Large_instance = new (Height())('Large', 2);
}
var Width_Circle_instance;
var Width_Fixed_instance;
var Width_Flex_instance;
var Width_entriesInitialized;
function Width_initEntries() {
  if (Width_entriesInitialized)
    return Unit_instance;
  Width_entriesInitialized = true;
  Width_Circle_instance = new (Width())('Circle', 0);
  Width_Fixed_instance = new (Width())('Fixed', 1);
  Width_Flex_instance = new (Width())('Flex', 2);
}
var Shape_Capsule_instance;
var Shape_Rectangle_instance;
var Shape_entriesInitialized;
function Shape_initEntries() {
  if (Shape_entriesInitialized)
    return Unit_instance;
  Shape_entriesInitialized = true;
  Shape_Capsule_instance = new (Shape())('Capsule', 0);
  Shape_Rectangle_instance = new (Shape())('Rectangle', 1);
}
var Context_SearchStation_instance;
var Context_Default_instance;
var Context_entriesInitialized;
function Context_initEntries() {
  if (Context_entriesInitialized)
    return Unit_instance;
  Context_entriesInitialized = true;
  Context_SearchStation_instance = new (Context())('SearchStation', 0);
  Context_Default_instance = new (Context())('Default', 1);
}
var StopSearchResultRouteClass;
function StopSearchResultRoute() {
  if (StopSearchResultRouteClass === VOID) {
    class $ extends ContentDescription() {
      constructor(routeName, routeType, isOnly) {
        super();
        this.o9d_1 = routeName;
        this.p9d_1 = routeType;
        this.q9d_1 = isOnly;
      }
      toString() {
        return 'StopSearchResultRoute(routeName=' + this.o9d_1 + ', routeType=' + this.p9d_1.toString() + ', isOnly=' + this.q9d_1 + ')';
      }
      hashCode() {
        var result = this.o9d_1 == null ? 0 : getStringHashCode(this.o9d_1);
        result = imul(result, 31) + this.p9d_1.hashCode() | 0;
        result = imul(result, 31) + getBooleanHashCode(this.q9d_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopSearchResultRoute()))
          return false;
        var tmp0_other_with_cast = other instanceof StopSearchResultRoute() ? other : THROW_CCE();
        if (!(this.o9d_1 == tmp0_other_with_cast.o9d_1))
          return false;
        if (!this.p9d_1.equals(tmp0_other_with_cast.p9d_1))
          return false;
        if (!(this.q9d_1 === tmp0_other_with_cast.q9d_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'StopSearchResultRoute');
    StopSearchResultRouteClass = $;
  }
  return StopSearchResultRouteClass;
}
function linePillContent($this, line) {
  var tmp;
  if (line.x92_1 === 'Green Line') {
    tmp = new (Text())('GL');
  } else {
    tmp = new (Text())(line.x92_1);
  }
  return tmp;
}
function lightRailPillContent($this, route, type) {
  var tmp;
  if (startsWith(route.u8r_1, 'Green Line ')) {
    var tmp_0;
    switch (type.x3_1) {
      case 0:
        tmp_0 = new (Text())(replace(route.u8r_1, 'Green Line ', 'GL '));
        break;
      case 1:
      case 2:
        tmp_0 = new (Text())(route.v8r_1);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    tmp = tmp_0;
  } else if (route.u8r_1 === 'Mattapan Trolley') {
    tmp = new (Text())('M');
  } else {
    tmp = new (Text())(route.u8r_1);
  }
  return tmp;
}
function heavyRailPillContent($this, route) {
  // Inline function 'kotlin.collections.map' call
  var this_0 = split(route.u8r_1, [' ']);
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = new (Char())(first(item));
    destination.i(tmp$ret$0);
  }
  return new (Text())(joinToString(destination, ''));
}
function commuterRailPillContent($this, route, type) {
  var tmp;
  switch (type.x3_1) {
    case 0:
    case 2:
      tmp = new (Text())('CR');
      break;
    case 1:
      tmp = new (Text())(removeSuffix(route.u8r_1, ' Line'));
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
}
function busPillContent($this, route, type, context) {
  var tmp;
  if (route.b8s_1 && !type.equals(Type_Flex_getInstance()) || context.equals(Context_SearchStation_getInstance())) {
    tmp = new (ModeImage())(RouteType_BUS_getInstance());
  } else {
    tmp = new (Text())(route.v8r_1);
  }
  return tmp;
}
function ferryPillContent($this, route, type) {
  var tmp;
  switch (type.x3_1) {
    case 0:
    case 2:
      tmp = new (ModeImage())(RouteType_FERRY_getInstance());
      break;
    case 1:
      tmp = new (Text())(route.u8r_1);
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
}
var TypeClass;
function Type() {
  if (TypeClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Type');
    TypeClass = $;
  }
  return TypeClass;
}
var HeightClass;
function Height() {
  if (HeightClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Height');
    HeightClass = $;
  }
  return HeightClass;
}
var WidthClass;
function Width() {
  if (WidthClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Width');
    WidthClass = $;
  }
  return WidthClass;
}
var ShapeClass;
function Shape() {
  if (ShapeClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Shape');
    ShapeClass = $;
  }
  return ShapeClass;
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
var ContentDescriptionClass;
function ContentDescription() {
  if (ContentDescriptionClass === VOID) {
    class $ {}
    initMetadataForClass($, 'ContentDescription');
    ContentDescriptionClass = $;
  }
  return ContentDescriptionClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
function Type_Fixed_getInstance() {
  Type_initEntries();
  return Type_Fixed_instance;
}
function Type_Flex_getInstance() {
  Type_initEntries();
  return Type_Flex_instance;
}
function Type_FlexCompact_getInstance() {
  Type_initEntries();
  return Type_FlexCompact_instance;
}
function Height_Small_getInstance() {
  Height_initEntries();
  return Height_Small_instance;
}
function Height_Medium_getInstance() {
  Height_initEntries();
  return Height_Medium_instance;
}
function Width_Circle_getInstance() {
  Width_initEntries();
  return Width_Circle_instance;
}
function Width_Fixed_getInstance() {
  Width_initEntries();
  return Width_Fixed_instance;
}
function Width_Flex_getInstance() {
  Width_initEntries();
  return Width_Flex_instance;
}
function Shape_Capsule_getInstance() {
  Shape_initEntries();
  return Shape_Capsule_instance;
}
function Shape_Rectangle_getInstance() {
  Shape_initEntries();
  return Shape_Rectangle_instance;
}
function Context_SearchStation_getInstance() {
  Context_initEntries();
  return Context_SearchStation_instance;
}
function Context_Default_getInstance() {
  Context_initEntries();
  return Context_Default_instance;
}
var RoutePillSpecClass;
function RoutePillSpec() {
  if (RoutePillSpecClass === VOID) {
    class $ {
      static y9d(textColor, routeColor, content, height, width, shape, contentDescription) {
        contentDescription = contentDescription === VOID ? null : contentDescription;
        var $this = createThis(this);
        $this.r9d_1 = textColor;
        $this.s9d_1 = routeColor;
        $this.t9d_1 = content;
        $this.u9d_1 = height;
        $this.v9d_1 = width;
        $this.w9d_1 = shape;
        $this.x9d_1 = contentDescription;
        return $this;
      }
      static z9d(route, line, type, height, context, contentDescription) {
        height = height === VOID ? Height_Medium_getInstance() : height;
        context = context === VOID ? Context_Default_getInstance() : context;
        contentDescription = contentDescription === VOID ? null : contentDescription;
        var tmp1_elvis_lhs = route == null ? null : route.x8r_1;
        var tmp;
        if (tmp1_elvis_lhs == null) {
          tmp = line == null ? null : line.a93_1;
        } else {
          tmp = tmp1_elvis_lhs;
        }
        var tmp3_elvis_lhs = tmp;
        var tmp_0 = tmp3_elvis_lhs == null ? 'FFFFFF' : tmp3_elvis_lhs;
        var tmp5_elvis_lhs = route == null ? null : route.q8r_1;
        var tmp_1;
        if (tmp5_elvis_lhs == null) {
          tmp_1 = line == null ? null : line.w92_1;
        } else {
          tmp_1 = tmp5_elvis_lhs;
        }
        var tmp7_elvis_lhs = tmp_1;
        var tmp_2 = tmp7_elvis_lhs == null ? '000000' : tmp7_elvis_lhs;
        var tmp9_subject = route == null ? null : route.p8r_1;
        var tmp_3;
        switch (tmp9_subject == null ? -1 : tmp9_subject.x3_1) {
          case -1:
            tmp_3 = line == null ? Empty_instance : linePillContent(Companion_instance, line);
            break;
          case 0:
            tmp_3 = lightRailPillContent(Companion_instance, route, type);
            break;
          case 1:
            tmp_3 = heavyRailPillContent(Companion_instance, route);
            break;
          case 2:
            tmp_3 = commuterRailPillContent(Companion_instance, route, type);
            break;
          case 3:
            tmp_3 = busPillContent(Companion_instance, route, type, context);
            break;
          case 4:
            tmp_3 = ferryPillContent(Companion_instance, route, type);
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        var tmp_4 = tmp_3;
        var tmp_5;
        if (type.equals(Type_Fixed_getInstance())) {
          tmp_5 = Width_Fixed_getInstance();
        } else {
          var tmp11_safe_receiver = route == null ? null : route.u8r_1;
          var tmp12_elvis_lhs = tmp11_safe_receiver == null ? null : startsWith(tmp11_safe_receiver, 'Green Line ');
          if (tmp12_elvis_lhs == null ? false : tmp12_elvis_lhs) {
            tmp_5 = Width_Circle_getInstance();
          } else {
            tmp_5 = Width_Flex_getInstance();
          }
        }
        var tmp_6 = tmp_5;
        var tmp_7;
        var tmp_8;
        if (equals(route == null ? null : route.p8r_1, RouteType_BUS_getInstance())) {
          tmp_8 = !route.b8s_1;
        } else {
          tmp_8 = false;
        }
        if (tmp_8) {
          tmp_7 = Shape_Rectangle_getInstance();
        } else {
          tmp_7 = Shape_Capsule_getInstance();
        }
        return this.y9d(tmp_0, tmp_2, tmp_4, height, tmp_6, tmp_7, contentDescription);
      }
      toString() {
        return 'RoutePillSpec(textColor=' + this.r9d_1 + ', routeColor=' + this.s9d_1 + ', content=' + toString(this.t9d_1) + ', height=' + this.u9d_1.toString() + ', width=' + this.v9d_1.toString() + ', shape=' + this.w9d_1.toString() + ', contentDescription=' + toString_0(this.x9d_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.r9d_1);
        result = imul(result, 31) + getStringHashCode(this.s9d_1) | 0;
        result = imul(result, 31) + hashCode(this.t9d_1) | 0;
        result = imul(result, 31) + this.u9d_1.hashCode() | 0;
        result = imul(result, 31) + this.v9d_1.hashCode() | 0;
        result = imul(result, 31) + this.w9d_1.hashCode() | 0;
        result = imul(result, 31) + (this.x9d_1 == null ? 0 : hashCode(this.x9d_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RoutePillSpec()))
          return false;
        var tmp0_other_with_cast = other instanceof RoutePillSpec() ? other : THROW_CCE();
        if (!(this.r9d_1 === tmp0_other_with_cast.r9d_1))
          return false;
        if (!(this.s9d_1 === tmp0_other_with_cast.s9d_1))
          return false;
        if (!equals(this.t9d_1, tmp0_other_with_cast.t9d_1))
          return false;
        if (!this.u9d_1.equals(tmp0_other_with_cast.u9d_1))
          return false;
        if (!this.v9d_1.equals(tmp0_other_with_cast.v9d_1))
          return false;
        if (!this.w9d_1.equals(tmp0_other_with_cast.w9d_1))
          return false;
        if (!equals(this.x9d_1, tmp0_other_with_cast.x9d_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'RoutePillSpec');
    RoutePillSpecClass = $;
  }
  return RoutePillSpecClass;
}
//region block: init
com_mbta_tid_mbta_app_model_RoutePillSpec_Content_Empty$stable = 0;
com_mbta_tid_mbta_app_model_RoutePillSpec_Content_Text$stable = 0;
com_mbta_tid_mbta_app_model_RoutePillSpec_Content_ModeImage$stable = 0;
com_mbta_tid_mbta_app_model_RoutePillSpec_ContentDescription_StopSearchResultRoute$stable = 0;
com_mbta_tid_mbta_app_model_RoutePillSpec_ContentDescription$stable = 0;
com_mbta_tid_mbta_app_model_RoutePillSpec$stable = 8;
Empty_instance = new (Empty())();
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  StopSearchResultRoute as StopSearchResultRoute1oelvk7kh1inn,
  RoutePillSpec as RoutePillSpec2c27q4ewrv5n8,
  Context_Default_getInstance as Context_Default_getInstance2bg4pqekotpi0,
  Context_SearchStation_getInstance as Context_SearchStation_getInstancea2s8r69gkebo,
  Height_Small_getInstance as Height_Small_getInstance19z76gof0olgm,
  Type_Fixed_getInstance as Type_Fixed_getInstance911fyfz5iim5,
  Type_FlexCompact_getInstance as Type_FlexCompact_getInstancee0t58wau7o1x,
};
//endregion

//# sourceMappingURL=RoutePillSpec.mjs.map
