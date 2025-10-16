import { VOID3gxj6tk5isa35 as VOID } from './void.mjs';
import { createMetadata3unb2gw4d2v4k as createMetadata } from './metadataUtils.mjs';
import { implementf3b9bp4orre as implement } from './BitMask.mjs';
import { throwUnsupportedOperationException1esr5y6wgmpks as throwUnsupportedOperationException } from '../hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_propertyRefClassMetadataCache() {
  _init_properties_reflectRuntime_kt__5r4uu3();
  return propertyRefClassMetadataCache;
}
var propertyRefClassMetadataCache;
function metadataObject() {
  _init_properties_reflectRuntime_kt__5r4uu3();
  return createMetadata('class', VOID, VOID, VOID, VOID, VOID);
}
function getPropertyCallableRef(name, paramCount, superType, getter, setter) {
  _init_properties_reflectRuntime_kt__5r4uu3();
  getter.get = getter;
  getter.set = setter;
  getter.callableName = name;
  // Inline function 'kotlin.js.unsafeCast' call
  return getPropertyRefClass(getter, getKPropMetadata(paramCount, setter), getInterfaceMaskFor(getter, superType));
}
function getPropertyRefClass(obj, metadata, imask) {
  _init_properties_reflectRuntime_kt__5r4uu3();
  obj.$metadata$ = metadata;
  obj.constructor = obj;
  obj.$imask$ = imask;
  return obj;
}
function getKPropMetadata(paramCount, setter) {
  _init_properties_reflectRuntime_kt__5r4uu3();
  return get_propertyRefClassMetadataCache()[paramCount][setter == null ? 0 : 1];
}
function getInterfaceMaskFor(obj, superType) {
  _init_properties_reflectRuntime_kt__5r4uu3();
  var tmp0_elvis_lhs = obj.$imask$;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$2 = [superType];
    tmp = implement(tmp$ret$2);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function getLocalDelegateReference(name, superType, mutable) {
  _init_properties_reflectRuntime_kt__5r4uu3();
  var lambda = getLocalDelegateReference$lambda();
  return getPropertyCallableRef(name, 0, superType, lambda, mutable ? lambda : null);
}
function getLocalDelegateReference$lambda() {
  return function () {
    throwUnsupportedOperationException('Not supported for local property reference.');
  };
}
var properties_initialized_reflectRuntime_kt_inkhwd;
function _init_properties_reflectRuntime_kt__5r4uu3() {
  if (!properties_initialized_reflectRuntime_kt_inkhwd) {
    properties_initialized_reflectRuntime_kt_inkhwd = true;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = [metadataObject(), metadataObject()];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = [metadataObject(), metadataObject()];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    propertyRefClassMetadataCache = [tmp, tmp_0, [metadataObject(), metadataObject()]];
  }
}
//region block: exports
export {
  getLocalDelegateReference as getLocalDelegateReference2ls94nvl5ojb2,
  getPropertyCallableRef as getPropertyCallableRef1ajb9in178r5r,
};
//endregion

//# sourceMappingURL=reflectRuntime.mjs.map
