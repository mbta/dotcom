import { FakeFileSystem16sri3ivuv6lk as FakeFileSystem } from '../fs/FakeFileSystem.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Dispatchers.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_fileSystem() {
  _init_properties_AppModule_js_kt__qwloju();
  return fileSystem;
}
var fileSystem;
function get_ioDispatcher() {
  _init_properties_AppModule_js_kt__qwloju();
  return ioDispatcher;
}
var ioDispatcher;
var properties_initialized_AppModule_js_kt_99kmi4;
function _init_properties_AppModule_js_kt__qwloju() {
  if (!properties_initialized_AppModule_js_kt_99kmi4) {
    properties_initialized_AppModule_js_kt_99kmi4 = true;
    fileSystem = new (FakeFileSystem())();
    ioDispatcher = Dispatchers_getInstance().u28_1;
  }
}
//region block: exports
export {
  get_fileSystem as get_fileSystem32b7xe1ofriby,
  get_ioDispatcher as get_ioDispatcher2k47azxnqlo9k,
};
//endregion

//# sourceMappingURL=AppModule.js.mjs.map
