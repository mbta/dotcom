import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException } from '../exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from './ArrayListJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function createJsReadonlyArrayViewFrom(list) {
  var tmp = createJsReadonlyArrayViewFrom$lambda(list);
  var tmp_0 = createJsReadonlyArrayViewFrom$lambda_0(list);
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_1 = UNSUPPORTED_OPERATION$ref();
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_2 = UNSUPPORTED_OPERATION$ref_0();
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = UNSUPPORTED_OPERATION$ref_1();
  return createJsArrayViewWith(tmp, tmp_0, tmp_1, tmp_2, tmp$ret$2);
}
function createJsArrayViewWith(listSize, listGet, listSet, listDecreaseSize, listIncreaseSize) {
  var arrayView = new Array();
  var tmp = Object;
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$0 = JsArrayView();
  tmp.setPrototypeOf(arrayView, tmp$ret$0.prototype);
  return new Proxy(arrayView, {get: function (target, prop, receiver) {
    if (prop === 'length')
      return listSize();
    var type = typeof prop;
    var index = type === 'string' || type === 'number' ? +prop : undefined;
    if (!isNaN(index))
      return listGet(index);
    return target[prop];
  }, has: function (target, key) {
    return !isNaN(key) && key < listSize();
  }, set: function (obj, prop, value) {
    if (prop === 'length') {
      var size = listSize();
      var newSize = type === 'string' || type === 'number' ? +prop : undefined;
      if (isNaN(newSize))
        throw new RangeError('invalid array length');
      if (newSize < size)
        listDecreaseSize(size - newSize);
      else
        listIncreaseSize(newSize - size);
      return true;
    }
    var type = typeof prop;
    var index = type === 'string' || type === 'number' ? +prop : undefined;
    if (isNaN(index))
      return false;
    listSet(index, value);
    return true;
  }});
}
function UNSUPPORTED_OPERATION() {
  throw UnsupportedOperationException().i5();
}
var JsArrayViewClass;
function JsArrayView() {
  if (JsArrayViewClass === VOID) {
    class $ extends Array {}
    initMetadataForClass($, 'JsArrayView');
    JsArrayViewClass = $;
  }
  return JsArrayViewClass;
}
function createListFrom(array) {
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.js.unsafeCast' call
  var tmp$ret$1 = array.slice();
  return ArrayList().j5(tmp$ret$1).k5();
}
function createJsReadonlyArrayViewFrom$lambda($list) {
  return function () {
    return $list.c1();
  };
}
function createJsReadonlyArrayViewFrom$lambda_0($list) {
  return function (i) {
    return $list.e1(i);
  };
}
function UNSUPPORTED_OPERATION$ref() {
  var l = function () {
    UNSUPPORTED_OPERATION();
    return Unit_instance;
  };
  l.callableName = 'UNSUPPORTED_OPERATION';
  return l;
}
function UNSUPPORTED_OPERATION$ref_0() {
  var l = function () {
    UNSUPPORTED_OPERATION();
    return Unit_instance;
  };
  l.callableName = 'UNSUPPORTED_OPERATION';
  return l;
}
function UNSUPPORTED_OPERATION$ref_1() {
  var l = function () {
    UNSUPPORTED_OPERATION();
    return Unit_instance;
  };
  l.callableName = 'UNSUPPORTED_OPERATION';
  return l;
}
//region block: exports
export {
  createJsReadonlyArrayViewFrom as createJsReadonlyArrayViewFrom3cs26f7gr195f,
  createListFrom as createListFrom4gbto0e646ia,
};
//endregion

//# sourceMappingURL=collectionsInterop.mjs.map
