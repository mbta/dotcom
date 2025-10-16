import { UnsafeLazyImplgpp92xc41v15 as UnsafeLazyImpl } from './Lazy.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from './Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function lazy(mode, initializer) {
  return new (UnsafeLazyImpl())(initializer);
}
function lazy_0(initializer) {
  return new (UnsafeLazyImpl())(initializer);
}
function fillFrom(src, dst) {
  var srcLen = src.length;
  var dstLen = dst.length;
  var index = 0;
  // Inline function 'kotlin.js.unsafeCast' call
  var arr = dst;
  while (index < srcLen && index < dstLen) {
    var tmp = index;
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    arr[tmp] = src[_unary__edvuaz];
  }
  return dst;
}
function arrayCopyResize(source, newSize, defaultValue) {
  // Inline function 'kotlin.js.unsafeCast' call
  var result = source.slice(0, newSize);
  // Inline function 'kotlin.copyArrayType' call
  if (source.$type$ !== undefined) {
    result.$type$ = source.$type$;
  }
  var index = source.length;
  if (newSize > index) {
    // Inline function 'kotlin.js.asDynamic' call
    result.length = newSize;
    while (index < newSize) {
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      result[_unary__edvuaz] = defaultValue;
    }
  }
  return result;
}
function arrayPlusCollection(array, collection) {
  // Inline function 'kotlin.js.unsafeCast' call
  var result = array.slice();
  // Inline function 'kotlin.js.asDynamic' call
  result.length = result.length + collection.c1() | 0;
  // Inline function 'kotlin.copyArrayType' call
  if (array.$type$ !== undefined) {
    result.$type$ = array.$type$;
  }
  var index = array.length;
  var _iterator__ex2g4s = collection.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    result[_unary__edvuaz] = element;
  }
  return result;
}
//region block: exports
export {
  arrayCopyResize as arrayCopyResize15cxrbbe9vpuk,
  arrayPlusCollection as arrayPlusCollection1zlz5pt9o4ri5,
  fillFrom as fillFrom3pz8g2cvpcwer,
  lazy as lazy1261dae0bgscp,
  lazy_0 as lazy2hsh8ze7j6ikd,
};
//endregion

//# sourceMappingURL=kotlin.mjs.map
