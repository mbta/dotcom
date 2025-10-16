import { getValue48kllevslyh6 as getValue } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { get_jsonPrimitivez17tyd5rw1ql as get_jsonPrimitive } from '../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonElement.mjs';
import { Companion_instance1pecasv1qx7vb as Companion_instance } from './Point.mjs';
import { Companion_instance3665m1nia2bt9 as Companion_instance_0 } from './MultiPoint.mjs';
import { Companion_instance7o1mq1saj4nn as Companion_instance_1 } from './LineString.mjs';
import { Companion_instance343bkjmmoqkl as Companion_instance_2 } from './MultiLineString.mjs';
import { Companion_instance19urtv1oz4xt6 as Companion_instance_3 } from './Polygon.mjs';
import { Companion_instance2404uh0ay56pc as Companion_instance_4 } from './MultiPolygon.mjs';
import { Companion_instancetxcectt6iuue as Companion_instance_5 } from './GeometryCollection.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { GeometrySerializer_getInstance1ncsg6chm8thv as GeometrySerializer_getInstance } from './serialization/GeometrySerializer.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      y1x(json) {
        var type = get_jsonPrimitive(getValue(json, 'type')).n1n();
        var tmp;
        switch (type) {
          case 'Point':
            tmp = Companion_instance.y1x(json);
            break;
          case 'MultiPoint':
            tmp = Companion_instance_0.y1x(json);
            break;
          case 'LineString':
            tmp = Companion_instance_1.y1x(json);
            break;
          case 'MultiLineString':
            tmp = Companion_instance_2.y1x(json);
            break;
          case 'Polygon':
            tmp = Companion_instance_3.y1x(json);
            break;
          case 'MultiPolygon':
            tmp = Companion_instance_4.y1x(json);
            break;
          case 'GeometryCollection':
            tmp = Companion_instance_5.y1x(json);
            break;
          default:
            throw IllegalArgumentException().q('Unsupported Geometry type "' + type + '"');
        }
        return tmp;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance_6;
function Companion_getInstance() {
  return Companion_instance_6;
}
var GeometryClass;
function Geometry() {
  if (GeometryClass === VOID) {
    class $ {
      static z1x() {
        return createThis(this);
      }
      toString() {
        return this.x1x();
      }
    }
    initMetadataForClass($, 'Geometry', VOID, VOID, VOID, VOID, VOID, {0: GeometrySerializer_getInstance});
    GeometryClass = $;
  }
  return GeometryClass;
}
//region block: init
Companion_instance_6 = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance_6 as Companion_instance2g2g24473apoz,
  Geometry as Geometry1mskyaxwfg3x4,
};
//endregion

//# sourceMappingURL=Geometry.mjs.map
