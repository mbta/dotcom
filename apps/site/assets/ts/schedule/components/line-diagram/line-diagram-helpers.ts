import { LineDiagramStop } from "../__schedule";

export const isMergeStop = (stop: LineDiagramStop): boolean =>
  stop.stop_data.some(sd => sd.type === "merge"); // always on branch

