export enum FetchStatus {
  NotStarted = 1,
  Loading,
  Data,
  Error
}

export interface FetchState<T> {
  status: FetchStatus;
  data?: T;
  errorData?: string;
}
