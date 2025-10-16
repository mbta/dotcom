import { NullableSerializer41etqlj0tdq5 as NullableSerializer } from '../internal/NullableSerializer.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  CharSerializer_getInstance368f23bfe318s as CharSerializer_getInstance,
  DoubleSerializer_getInstance3da4hv5ndgjlx as DoubleSerializer_getInstance,
  FloatSerializer_getInstance2fspe61zbqree as FloatSerializer_getInstance,
  LongSerializer_getInstance194e4t3ow5wjs as LongSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
  ShortSerializer_getInstance330bccrmjn2n6 as ShortSerializer_getInstance,
  ByteSerializer_getInstance2o4jevxladj6p as ByteSerializer_getInstance,
  BooleanSerializer_getInstance1t8habeqgiyq1 as BooleanSerializer_getInstance,
  UnitSerializer_getInstance2bvrjsz1qqqzj as UnitSerializer_getInstance,
} from '../internal/Primitives.mjs';
import {
  CharArraySerializer_getInstance3oryjy1xvmknv as CharArraySerializer_getInstance,
  DoubleArraySerializer_getInstancef1llmrjqfc7l as DoubleArraySerializer_getInstance,
  FloatArraySerializer_getInstance35ihhcpq3ab82 as FloatArraySerializer_getInstance,
  LongArraySerializer_getInstance1ig6h5hl21yk7 as LongArraySerializer_getInstance,
  ULongArraySerializer_getInstance2hnbvnui8wiv3 as ULongArraySerializer_getInstance,
  IntArraySerializer_getInstance34eu013sg7tz8 as IntArraySerializer_getInstance,
  UIntArraySerializer_getInstance2udoc8iaxrzr5 as UIntArraySerializer_getInstance,
  ShortArraySerializer_getInstanceqwmxisunsyg2 as ShortArraySerializer_getInstance,
  UShortArraySerializer_getInstance3n3pjd3tpanwl as UShortArraySerializer_getInstance,
  ByteArraySerializer_getInstance1p0ix35e82iv6 as ByteArraySerializer_getInstance,
  UByteArraySerializer_getInstance2xgvi8bxs38pn as UByteArraySerializer_getInstance,
  BooleanArraySerializer_getInstancexdjxaje3qyq8 as BooleanArraySerializer_getInstance,
} from '../internal/PrimitiveArraysSerializers.mjs';
import {
  ULongSerializer_getInstance1pt7p8sfwyqvu as ULongSerializer_getInstance,
  UIntSerializer_getInstancetd3sbgi6bazj as UIntSerializer_getInstance,
  UShortSerializer_getInstance125rt1ltxdym5 as UShortSerializer_getInstance,
  UByteSerializer_getInstance3s4kn84g1efyy as UByteSerializer_getInstance,
} from '../internal/ValueClasses.mjs';
import {
  NothingSerializer_getInstancejqk7fqid1kug as NothingSerializer_getInstance,
  DurationSerializer_getInstanceo50ej00g6vz5 as DurationSerializer_getInstance,
  InstantSerializer_getInstance2lbsjgw870jbk as InstantSerializer_getInstance,
  UuidSerializer_getInstance1ils3vei9gjnd as UuidSerializer_getInstance,
} from '../internal/BuiltInSerializers.mjs';
import {
  MapEntrySerializer2ukwamih4zw76 as MapEntrySerializer,
  PairSerializerpzh6nuee9oov as PairSerializer,
  TripleSerializer25andm5j3t9nu as TripleSerializer,
} from '../internal/Tuples.mjs';
import {
  ReferenceArraySerializer3juj1vqolxkrs as ReferenceArraySerializer,
  ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer,
  LinkedHashMapSerializermaoj2nyji7op as LinkedHashMapSerializer,
  LinkedHashSetSerializer3ncla559t2lx7 as LinkedHashSetSerializer,
} from '../internal/CollectionSerializers.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_nullable(_this__u8e3s4) {
  var tmp;
  if (_this__u8e3s4.fz().t11()) {
    tmp = isInterface(_this__u8e3s4, KSerializer()) ? _this__u8e3s4 : THROW_CCE();
  } else {
    tmp = new (NullableSerializer())(_this__u8e3s4);
  }
  return tmp;
}
function serializer(_this__u8e3s4) {
  return StringSerializer_getInstance();
}
function serializer_0(_this__u8e3s4) {
  return CharSerializer_getInstance();
}
function CharArraySerializer() {
  return CharArraySerializer_getInstance();
}
function serializer_1(_this__u8e3s4) {
  return DoubleSerializer_getInstance();
}
function DoubleArraySerializer() {
  return DoubleArraySerializer_getInstance();
}
function serializer_2(_this__u8e3s4) {
  return FloatSerializer_getInstance();
}
function FloatArraySerializer() {
  return FloatArraySerializer_getInstance();
}
function serializer_3(_this__u8e3s4) {
  return LongSerializer_getInstance();
}
function LongArraySerializer() {
  return LongArraySerializer_getInstance();
}
function serializer_4(_this__u8e3s4) {
  return ULongSerializer_getInstance();
}
function ULongArraySerializer() {
  return ULongArraySerializer_getInstance();
}
function serializer_5(_this__u8e3s4) {
  return IntSerializer_getInstance();
}
function IntArraySerializer() {
  return IntArraySerializer_getInstance();
}
function serializer_6(_this__u8e3s4) {
  return UIntSerializer_getInstance();
}
function UIntArraySerializer() {
  return UIntArraySerializer_getInstance();
}
function serializer_7(_this__u8e3s4) {
  return ShortSerializer_getInstance();
}
function ShortArraySerializer() {
  return ShortArraySerializer_getInstance();
}
function serializer_8(_this__u8e3s4) {
  return UShortSerializer_getInstance();
}
function UShortArraySerializer() {
  return UShortArraySerializer_getInstance();
}
function serializer_9(_this__u8e3s4) {
  return ByteSerializer_getInstance();
}
function ByteArraySerializer() {
  return ByteArraySerializer_getInstance();
}
function serializer_10(_this__u8e3s4) {
  return UByteSerializer_getInstance();
}
function UByteArraySerializer() {
  return UByteArraySerializer_getInstance();
}
function serializer_11(_this__u8e3s4) {
  return BooleanSerializer_getInstance();
}
function BooleanArraySerializer() {
  return BooleanArraySerializer_getInstance();
}
function serializer_12(_this__u8e3s4) {
  return UnitSerializer_getInstance();
}
function NothingSerializer() {
  return NothingSerializer_getInstance();
}
function serializer_13(_this__u8e3s4) {
  return DurationSerializer_getInstance();
}
function serializer_14(_this__u8e3s4) {
  return InstantSerializer_getInstance();
}
function serializer_15(_this__u8e3s4) {
  return UuidSerializer_getInstance();
}
function MapEntrySerializer_0(keySerializer, valueSerializer) {
  return new (MapEntrySerializer())(keySerializer, valueSerializer);
}
function PairSerializer_0(keySerializer, valueSerializer) {
  return new (PairSerializer())(keySerializer, valueSerializer);
}
function TripleSerializer_0(aSerializer, bSerializer, cSerializer) {
  return new (TripleSerializer())(aSerializer, bSerializer, cSerializer);
}
function ArraySerializer(kClass, elementSerializer) {
  return new (ReferenceArraySerializer())(kClass, elementSerializer);
}
function ListSerializer(elementSerializer) {
  return new (ArrayListSerializer())(elementSerializer);
}
function MapSerializer(keySerializer, valueSerializer) {
  return new (LinkedHashMapSerializer())(keySerializer, valueSerializer);
}
function SetSerializer(elementSerializer) {
  return new (LinkedHashSetSerializer())(elementSerializer);
}
//region block: exports
export {
  ArraySerializer as ArraySerializermpxy3fgi5xnb,
  BooleanArraySerializer as BooleanArraySerializer1s3kgnkejzqxt,
  ByteArraySerializer as ByteArraySerializersn06x87bo7h0,
  CharArraySerializer as CharArraySerializerklmg8gfnksga,
  DoubleArraySerializer as DoubleArraySerializertger6kqq08hw,
  FloatArraySerializer as FloatArraySerializerr6nw52je2tta,
  IntArraySerializer as IntArraySerializer1m3fo301mmjdr,
  ListSerializer as ListSerializer1hxuk9dx5n9du,
  LongArraySerializer as LongArraySerializer13aridd43vtw2,
  MapEntrySerializer_0 as MapEntrySerializer3oe1sx5ozvw2u,
  MapSerializer as MapSerializer11kmegt3g5c1g,
  NothingSerializer as NothingSerializer3oixyyf77l4xt,
  PairSerializer_0 as PairSerializer1d18kmsqyj4f,
  SetSerializer as SetSerializert3lb0yy9iftr,
  ShortArraySerializer as ShortArraySerializer316766pkdw188,
  TripleSerializer_0 as TripleSerializer39fneesmgp1wy,
  UByteArraySerializer as UByteArraySerializer1sccfecbzq55o,
  UIntArraySerializer as UIntArraySerializermosjtc8kcdu0,
  ULongArraySerializer as ULongArraySerializer2p6vevd8k2lpe,
  UShortArraySerializer as UShortArraySerializer2x9pkk602s3ka,
  get_nullable as get_nullable197rfua9r7fsz,
  serializer_14 as serializer1j5a5justjsv5,
  serializer as serializer1x79l67jvwntn,
  serializer_7 as serializer1tw0a8bv7lkga,
  serializer_8 as serializer1q7c5q67ysppr,
  serializer_15 as serializer1x80idigipeic,
  serializer_12 as serializer1cdzkc3mnhoc4,
  serializer_9 as serializer1r0h5yakm679b,
  serializer_6 as serializer3ikrxnm8b29d6,
  serializer_1 as serializer1wpgysz06u9ol,
  serializer_5 as serializer1hu9wv9at41ww,
  serializer_10 as serializer36584sjyg5661,
  serializer_4 as serializer2lw83vwvpnyms,
  serializer_11 as serializer3u3hsxnenk49x,
  serializer_0 as serializer345btyh1f2y1j,
  serializer_3 as serializerodflzzf6s3fp,
  serializer_13 as serializer37oyvz7rc4nep,
  serializer_2 as serializer3x9uckd1deom,
};
//endregion

//# sourceMappingURL=BuiltinSerializers.mjs.map
