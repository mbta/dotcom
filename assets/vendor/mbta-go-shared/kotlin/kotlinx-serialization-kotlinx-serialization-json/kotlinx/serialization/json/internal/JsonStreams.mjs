import {
  WriteMode_OBJ_getInstance1vxozndswhwrl as WriteMode_OBJ_getInstance,
  get_entries1lqoril5i9fco as get_entries,
} from './WriteMode.mjs';
import { StreamingJsonEncoder1wswwd0g47gwe as StreamingJsonEncoder } from './StreamingJsonEncoder.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function encodeByWriter(json, writer, serializer, value) {
  var tmp = WriteMode_OBJ_getInstance();
  // Inline function 'kotlin.arrayOfNulls' call
  var size = get_entries().c1();
  var tmp$ret$0 = Array(size);
  var encoder = StreamingJsonEncoder().w1r(writer, json, tmp, tmp$ret$0);
  encoder.o15(serializer, value);
}
//region block: exports
export {
  encodeByWriter as encodeByWriter108llwage8l5s,
};
//endregion

//# sourceMappingURL=JsonStreams.mjs.map
