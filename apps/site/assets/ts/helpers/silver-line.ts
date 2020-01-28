export const isSilverLine = (routeId: string): boolean =>
  ["741", "742", "743", "746", "749", "751"].includes(routeId);

export const isSilverLineWaterfront = (routeId: string): boolean =>
  routeId === "746";

export default isSilverLine;
