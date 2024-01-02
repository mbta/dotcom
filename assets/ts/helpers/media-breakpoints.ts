// Specify in pixels, but in numbers here for calculations
const mediaBreakpoints = {
  xs: 0,
  sm: 544,
  md: 800,
  lg: 1088,
  xxl: 1344
};

export const isLGDown = (): boolean =>
  window.matchMedia(`(max-width: ${mediaBreakpoints.lg}px)`).matches;

export const isSMDown = (): boolean =>
  window?.matchMedia(`(max-width: ${mediaBreakpoints.sm}px)`)?.matches;
