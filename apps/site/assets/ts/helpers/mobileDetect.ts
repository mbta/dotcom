import MobileDetect from "mobile-detect";

const mobileDetect = new MobileDetect(window.navigator.userAgent);

// This is to primarily to be used when generting android or ios specific behavior
// For feature detection a different library/approach should be used
const isIPhone = (): boolean => mobileDetect.is("iPhone");
const isAndroid = (): boolean => mobileDetect.is("Android");

export { isIPhone, isAndroid };
