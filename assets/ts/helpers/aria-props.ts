export type AriaLabelling = AriaLabel | AriaLabelledBy;

export interface AriaLabel {
  label: string;
}

export interface AriaLabelledBy {
  elementId: string;
}

interface AriaLabelProp {
  "aria-label": string;
}

interface AriaLabelledByProp {
  "aria-labelledby": string;
}

const isLabel = (label: AriaLabelling): label is AriaLabel =>
  (label as AriaLabel).label !== undefined;

export const labelOrDescribedBy = (
  label: AriaLabel | AriaLabelledBy
): AriaLabelProp | AriaLabelledByProp => {
  if (isLabel(label)) {
    return { "aria-label": label.label };
  }
  return { "aria-labelledby": label.elementId };
};
