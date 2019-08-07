export const routeToCSSClass = (route: string): string =>
  route.toLowerCase().replace(/[ _]/g, "-");

export default routeToCSSClass;
