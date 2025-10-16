type Nullable<T> = T | null | undefined
declare function KtSingleton<T>(): T & (abstract new() => any);
export declare const jsJodaTz: { get(): typeof JsJodaTimeZoneModule; };