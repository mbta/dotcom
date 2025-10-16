import { get_json30ncetgsyi7ak as get_json } from './com/mbta/tid/mbta_app/Json.mjs';
import { VehicleStreamDataResponse3adnxumyrbh41 as VehicleStreamDataResponse } from './com/mbta/tid/mbta_app/model/response/VehicleStreamDataResponse.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { serializer1i4e9ym37oxmo as serializer } from '../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/Serializers.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion } from '../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var VehicleChannel$stable;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        this.w9s_1 = 'stream_data';
      }
      x9s(vehicleId) {
        return 'vehicle:id:' + vehicleId;
      }
      q9s(payload) {
        // Inline function 'kotlinx.serialization.json.Json.decodeFromString' call
        var this_0 = get_json();
        // Inline function 'kotlinx.serialization.serializer' call
        var this_1 = this_0.k14();
        // Inline function 'kotlinx.serialization.internal.cast' call
        var this_2 = serializer(this_1, createKType(getKClass(VehicleStreamDataResponse()), arrayOf([]), false));
        var tmp$ret$1 = isInterface(this_2, KSerializer()) ? this_2 : THROW_CCE();
        return this_0.o10(tmp$ret$1, payload);
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
//region block: init
VehicleChannel$stable = 0;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instance3djr90me8s5eb,
};
//endregion

//# sourceMappingURL=VehicleChannel.mjs.map
