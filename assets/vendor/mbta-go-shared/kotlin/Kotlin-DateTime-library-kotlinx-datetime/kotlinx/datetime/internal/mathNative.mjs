import { ArithmeticException18dajwq7kbp38 as ArithmeticException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function safeAdd(a, b) {
  var sum = a.f4(b);
  if (a.u4(sum).d2(new (Long())(0, 0)) < 0 && a.u4(b).d2(new (Long())(0, 0)) >= 0) {
    throw ArithmeticException().og('Addition overflows a long: ' + a.toString() + ' + ' + b.toString());
  }
  return sum;
}
function safeMultiply(a, b) {
  if (b.equals(new (Long())(1, 0))) {
    return a;
  }
  if (a.equals(new (Long())(1, 0))) {
    return b;
  }
  if (a.equals(new (Long())(0, 0)) || b.equals(new (Long())(0, 0))) {
    return new (Long())(0, 0);
  }
  var total = a.h4(b);
  if (!total.i4(b).equals(a) || (a.equals(new (Long())(0, -2147483648)) && b.equals(new (Long())(-1, -1))) || (b.equals(new (Long())(0, -2147483648)) && a.equals(new (Long())(-1, -1)))) {
    throw ArithmeticException().og('Multiplication overflows a long: ' + a.toString() + ' * ' + b.toString());
  }
  return total;
}
function safeMultiply_0(a, b) {
  var total = toLong(a).h4(toLong(b));
  if (total.d2(new (Long())(-2147483648, -1)) < 0 || total.d2(new (Long())(2147483647, 0)) > 0) {
    throw ArithmeticException().og('Multiplication overflows an int: ' + a + ' * ' + b);
  }
  return total.f2();
}
//region block: exports
export {
  safeAdd as safeAdd2ojtf0puot5k0,
  safeMultiply as safeMultiply1xb0xo3cufzd3,
  safeMultiply_0 as safeMultiplyomi65rg5l1en,
};
//endregion

//# sourceMappingURL=mathNative.mjs.map
