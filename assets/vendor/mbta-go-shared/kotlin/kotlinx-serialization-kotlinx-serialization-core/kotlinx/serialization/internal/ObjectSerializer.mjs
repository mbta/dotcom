import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { OBJECT_getInstance26229tfe4t547 as OBJECT_getInstance } from '../descriptors/SerialKinds.mjs';
import { buildSerialDescriptor2873qmkp8r2ib as buildSerialDescriptor } from '../descriptors/SerialDescriptors.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { asList2ho2pewtsfvv as asList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../SerializationExceptions.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../KSerializer.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
  return function ($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.kz_1 = this$0.p1c_1;
    return Unit_instance;
  };
}
function ObjectSerializer$descriptor$delegate$lambda($serialName, this$0) {
  return function () {
    var tmp = OBJECT_getInstance();
    return buildSerialDescriptor($serialName, tmp, [], ObjectSerializer$descriptor$delegate$lambda$lambda(this$0));
  };
}
function ObjectSerializer$_get_descriptor_$ref_7z4xb6() {
  return function (p0) {
    return p0.fz();
  };
}
var ObjectSerializerClass;
function ObjectSerializer() {
  if (ObjectSerializerClass === VOID) {
    class $ {
      static r1c(serialName, objectInstance) {
        var $this = createThis(this);
        $this.o1c_1 = objectInstance;
        $this.p1c_1 = emptyList();
        var tmp = $this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.q1c_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, $this));
        return $this;
      }
      static s1c(serialName, objectInstance, classAnnotations) {
        var $this = this.r1c(serialName, objectInstance);
        $this.p1c_1 = asList(classAnnotations);
        return $this;
      }
      fz() {
        var tmp0 = this.q1c_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('descriptor', 1, tmp, ObjectSerializer$_get_descriptor_$ref_7z4xb6(), null);
        return tmp0.v1();
      }
      yz(encoder, value) {
        encoder.v13(this.fz()).w13(this.fz());
      }
      gz(encoder, value) {
        return this.yz(encoder, !(value == null) ? value : THROW_CCE());
      }
      hz(decoder) {
        // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
        var descriptor = this.fz();
        var composite = decoder.v13(descriptor);
        var tmp$ret$0;
        $l$block_0: {
          if (composite.l14()) {
            tmp$ret$0 = Unit_instance;
            break $l$block_0;
          }
          var index = composite.m14(this.fz());
          if (index === -1) {
            tmp$ret$0 = Unit_instance;
            break $l$block_0;
          } else
            throw SerializationException().w10('Unexpected index ' + index);
        }
        var result = tmp$ret$0;
        composite.w13(descriptor);
        return this.o1c_1;
      }
    }
    initMetadataForClass($, 'ObjectSerializer', VOID, VOID, [KSerializer()]);
    ObjectSerializerClass = $;
  }
  return ObjectSerializerClass;
}
//region block: exports
export {
  ObjectSerializer as ObjectSerializer2kjkucmygguwd,
};
//endregion

//# sourceMappingURL=ObjectSerializer.mjs.map
