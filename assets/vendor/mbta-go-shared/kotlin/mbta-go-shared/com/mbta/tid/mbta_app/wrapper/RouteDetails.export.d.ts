type Nullable<T> = T | null | undefined
declare function KtSingleton<T>(): T & (abstract new() => any);
export declare class RouteDetails /* implements KoinComponent */ {
    constructor(backendRoot: string);
    setSelection(routeId: string, directionId: number): void;
    onNewState(callback: (p0: Nullable<RouteDetails.State>) => void): Promise<void>;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace RouteDetails.$metadata$ {
    const constructor: abstract new () => RouteDetails;
}
export declare namespace RouteDetails {
    class State {
        constructor(routeColor: string, segments: KtList<RouteDetails.State.Segment>);
        get routeColor(): string;
        get segments(): KtList<RouteDetails.State.Segment>;
        copy(routeColor?: string, segments?: KtList<RouteDetails.State.Segment>): RouteDetails.State;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace State.$metadata$ {
        const constructor: abstract new () => State;
    }
    namespace State {
        class Segment {
            constructor(stops: KtList<RouteDetails.State.Stop>, isTypical: boolean, twistedConnections: Nullable<KtList<RouteDetails.State.TwistedConnection>>);
            get stops(): KtList<RouteDetails.State.Stop>;
            get isTypical(): boolean;
            get twistedConnections(): Nullable<KtList<RouteDetails.State.TwistedConnection>>;
            copy(stops?: KtList<RouteDetails.State.Stop>, isTypical?: boolean, twistedConnections?: Nullable<KtList<RouteDetails.State.TwistedConnection>>): RouteDetails.State.Segment;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Segment.$metadata$ {
            const constructor: abstract new () => Segment;
        }
        class Stop {
            constructor(name: string, stopLane: RouteDetails.State.Lane, stickConnections: KtList<RouteDetails.State.StickConnection>);
            get name(): string;
            get stopLane(): RouteDetails.State.Lane;
            get stickConnections(): KtList<RouteDetails.State.StickConnection>;
            copy(name?: string, stopLane?: RouteDetails.State.Lane, stickConnections?: KtList<RouteDetails.State.StickConnection>): RouteDetails.State.Stop;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Stop.$metadata$ {
            const constructor: abstract new () => Stop;
        }
        class TwistedConnection {
            constructor(connection: RouteDetails.State.StickConnection, isTwisted: boolean);
            get connection(): RouteDetails.State.StickConnection;
            get isTwisted(): boolean;
            copy(connection?: RouteDetails.State.StickConnection, isTwisted?: boolean): RouteDetails.State.TwistedConnection;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace TwistedConnection.$metadata$ {
            const constructor: abstract new () => TwistedConnection;
        }
        class StickConnection {
            private constructor();
            twistedShape(proportionClosed: number): Nullable<RouteDetails.State.TwistedShape>;
            nonTwistedShape(proportionClosed: number): Nullable<string>;
            stickShape(): string;
            copy$default(inner?: any/* RouteBranchSegment.StickConnection */): RouteDetails.State.StickConnection;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace StickConnection.$metadata$ {
            const constructor: abstract new () => StickConnection;
        }
        class TwistedShape {
            constructor(shadow: string, curves: string, ends: string, opensToNothing: boolean);
            get shadow(): string;
            get curves(): string;
            get ends(): string;
            get opensToNothing(): boolean;
            copy(shadow?: string, curves?: string, ends?: string, opensToNothing?: boolean): RouteDetails.State.TwistedShape;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace TwistedShape.$metadata$ {
            const constructor: abstract new () => TwistedShape;
        }
        abstract class Lane {
            private constructor();
            static get Left(): RouteDetails.State.Lane & {
                get name(): "Left";
                get ordinal(): 0;
            };
            static get Center(): RouteDetails.State.Lane & {
                get name(): "Center";
                get ordinal(): 1;
            };
            static get Right(): RouteDetails.State.Lane & {
                get name(): "Right";
                get ordinal(): 2;
            };
            get name(): "Left" | "Center" | "Right";
            get ordinal(): 0 | 1 | 2;
            static values(): Array<RouteDetails.State.Lane>;
            static valueOf(value: string): RouteDetails.State.Lane;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Lane.$metadata$ {
            const constructor: abstract new () => Lane;
        }
    }
}
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Segment$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_RouteDetails_State_Stop$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedConnection$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_RouteDetails_State_StickConnection$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_RouteDetails_State_TwistedShape$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_RouteDetails_State$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_RouteDetails$stableprop_getter(): number;