type Nullable<T> = T | null | undefined
declare function KtSingleton<T>(): T & (abstract new() => any);
export declare class State {
    constructor(directions: Nullable<KtList<State.Direction>>, upcomingTripTiles: Nullable<KtList<State.Tile>>, tripId: Nullable<string>, tripHeadsign: Nullable<string>, tripVehicle: Nullable<State.Vehicle>, stopList: Nullable<State.StopList>);
    get directions(): Nullable<KtList<State.Direction>>;
    get upcomingTripTiles(): Nullable<KtList<State.Tile>>;
    get tripId(): Nullable<string>;
    get tripHeadsign(): Nullable<string>;
    get tripVehicle(): Nullable<State.Vehicle>;
    get stopList(): Nullable<State.StopList>;
    copy(directions?: Nullable<KtList<State.Direction>>, upcomingTripTiles?: Nullable<KtList<State.Tile>>, tripId?: Nullable<string>, tripHeadsign?: Nullable<string>, tripVehicle?: Nullable<State.Vehicle>, stopList?: Nullable<State.StopList>): State;
    toString(): string;
    hashCode(): number;
    equals(other: Nullable<any>): boolean;
}
/** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
export declare namespace State.$metadata$ {
    const constructor: abstract new () => State;
}
export declare namespace State {
    class Direction {
        constructor(name: Nullable<string>, destination: Nullable<string>, id: number);
        get name(): Nullable<string>;
        get destination(): Nullable<string>;
        get id(): number;
        copy(name?: Nullable<string>, destination?: Nullable<string>, id?: number): State.Direction;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace Direction.$metadata$ {
        const constructor: abstract new () => Direction;
    }
    class Tile {
        constructor(tileId: string, tripId: string, headsign: Nullable<string>, format: Nullable<State.UpcomingFormat>);
        get tileId(): string;
        get tripId(): string;
        get headsign(): Nullable<string>;
        get format(): Nullable<State.UpcomingFormat>;
        copy(tileId?: string, tripId?: string, headsign?: Nullable<string>, format?: Nullable<State.UpcomingFormat>): State.Tile;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace Tile.$metadata$ {
        const constructor: abstract new () => Tile;
    }
    abstract class UpcomingFormat {
        protected constructor();
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace UpcomingFormat.$metadata$ {
        const constructor: abstract new () => UpcomingFormat;
    }
    namespace UpcomingFormat {
        class Disruption extends State.UpcomingFormat.$metadata$.constructor {
            constructor(effect: string);
            get effect(): string;
            copy(effect?: string): State.UpcomingFormat.Disruption;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Disruption.$metadata$ {
            const constructor: abstract new () => Disruption;
        }
        class Overridden extends State.UpcomingFormat.$metadata$.constructor {
            constructor(text: string);
            get text(): string;
            copy(text?: string): State.UpcomingFormat.Overridden;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Overridden.$metadata$ {
            const constructor: abstract new () => Overridden;
        }
        abstract class Hidden extends KtSingleton<Hidden.$metadata$.constructor>() {
            private constructor();
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Hidden.$metadata$ {
            abstract class constructor extends State.UpcomingFormat.$metadata$.constructor {
                toString(): string;
                hashCode(): number;
                equals(other: Nullable<any>): boolean;
                private constructor();
            }
        }
        abstract class Boarding extends KtSingleton<Boarding.$metadata$.constructor>() {
            private constructor();
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Boarding.$metadata$ {
            abstract class constructor extends State.UpcomingFormat.$metadata$.constructor {
                toString(): string;
                hashCode(): number;
                equals(other: Nullable<any>): boolean;
                private constructor();
            }
        }
        abstract class Arriving extends KtSingleton<Arriving.$metadata$.constructor>() {
            private constructor();
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Arriving.$metadata$ {
            abstract class constructor extends State.UpcomingFormat.$metadata$.constructor {
                toString(): string;
                hashCode(): number;
                equals(other: Nullable<any>): boolean;
                private constructor();
            }
        }
        abstract class Approaching extends KtSingleton<Approaching.$metadata$.constructor>() {
            private constructor();
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Approaching.$metadata$ {
            abstract class constructor extends State.UpcomingFormat.$metadata$.constructor {
                toString(): string;
                hashCode(): number;
                equals(other: Nullable<any>): boolean;
                private constructor();
            }
        }
        abstract class Now extends KtSingleton<Now.$metadata$.constructor>() {
            private constructor();
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Now.$metadata$ {
            abstract class constructor extends State.UpcomingFormat.$metadata$.constructor {
                toString(): string;
                hashCode(): number;
                equals(other: Nullable<any>): boolean;
                private constructor();
            }
        }
        class Time extends State.UpcomingFormat.$metadata$.constructor {
            constructor(predictionTime: Date);
            get predictionTime(): Date;
            copy(predictionTime?: Date): State.UpcomingFormat.Time;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Time.$metadata$ {
            const constructor: abstract new () => Time;
        }
        class TimeWithStatus extends State.UpcomingFormat.$metadata$.constructor {
            constructor(predictionTime: Date, status: string);
            get predictionTime(): Date;
            get status(): string;
            copy(predictionTime?: Date, status?: string): State.UpcomingFormat.TimeWithStatus;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace TimeWithStatus.$metadata$ {
            const constructor: abstract new () => TimeWithStatus;
        }
        class TimeWithSchedule extends State.UpcomingFormat.$metadata$.constructor {
            constructor(predictionTime: Date, scheduledTime: Date);
            get predictionTime(): Date;
            get scheduledTime(): Date;
            copy(predictionTime?: Date, scheduledTime?: Date): State.UpcomingFormat.TimeWithSchedule;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace TimeWithSchedule.$metadata$ {
            const constructor: abstract new () => TimeWithSchedule;
        }
        class Minutes extends State.UpcomingFormat.$metadata$.constructor {
            constructor(minutes: number);
            get minutes(): number;
            copy(minutes?: number): State.UpcomingFormat.Minutes;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Minutes.$metadata$ {
            const constructor: abstract new () => Minutes;
        }
        class ScheduleTime extends State.UpcomingFormat.$metadata$.constructor {
            constructor(scheduledTime: Date);
            get scheduledTime(): Date;
            copy(scheduledTime?: Date): State.UpcomingFormat.ScheduleTime;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace ScheduleTime.$metadata$ {
            const constructor: abstract new () => ScheduleTime;
        }
        class ScheduleTimeWithStatus extends State.UpcomingFormat.$metadata$.constructor {
            constructor(scheduledTime: Date, status: string);
            get scheduledTime(): Date;
            get status(): string;
            copy(scheduledTime?: Date, status?: string): State.UpcomingFormat.ScheduleTimeWithStatus;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace ScheduleTimeWithStatus.$metadata$ {
            const constructor: abstract new () => ScheduleTimeWithStatus;
        }
        class ScheduleMinutes extends State.UpcomingFormat.$metadata$.constructor {
            constructor(minutes: number);
            get minutes(): number;
            copy(minutes?: number): State.UpcomingFormat.ScheduleMinutes;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace ScheduleMinutes.$metadata$ {
            const constructor: abstract new () => ScheduleMinutes;
        }
        class Skipped extends State.UpcomingFormat.$metadata$.constructor {
            constructor(scheduledTime: Nullable<Date>);
            get scheduledTime(): Nullable<Date>;
            copy(scheduledTime?: Nullable<Date>): State.UpcomingFormat.Skipped;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Skipped.$metadata$ {
            const constructor: abstract new () => Skipped;
        }
        class Cancelled extends State.UpcomingFormat.$metadata$.constructor {
            constructor(scheduledTime: Date);
            get scheduledTime(): Date;
            copy(scheduledTime?: Date): State.UpcomingFormat.Cancelled;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Cancelled.$metadata$ {
            const constructor: abstract new () => Cancelled;
        }
    }
    class Vehicle {
        constructor(stopId: Nullable<string>, stopName: Nullable<string>, currentStatus: State.Vehicle.Status);
        get stopId(): Nullable<string>;
        get stopName(): Nullable<string>;
        get currentStatus(): State.Vehicle.Status;
        copy(stopId?: Nullable<string>, stopName?: Nullable<string>, currentStatus?: State.Vehicle.Status): State.Vehicle;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace Vehicle.$metadata$ {
        const constructor: abstract new () => Vehicle;
    }
    namespace Vehicle {
        abstract class Status {
            private constructor();
            static get IncomingAt(): State.Vehicle.Status & {
                get name(): "IncomingAt";
                get ordinal(): 0;
            };
            static get StoppedAt(): State.Vehicle.Status & {
                get name(): "StoppedAt";
                get ordinal(): 1;
            };
            static get InTransitTo(): State.Vehicle.Status & {
                get name(): "InTransitTo";
                get ordinal(): 2;
            };
            get name(): "IncomingAt" | "StoppedAt" | "InTransitTo";
            get ordinal(): 0 | 1 | 2;
            static values(): Array<State.Vehicle.Status>;
            static valueOf(value: string): State.Vehicle.Status;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Status.$metadata$ {
            const constructor: abstract new () => Status;
        }
    }
    class StopList {
        constructor(firstStop: Nullable<State.StopList.Entry>, collapsedStops: Nullable<KtList<State.StopList.Entry>>, targetStop: Nullable<State.StopList.Entry>, followingStops: Nullable<KtList<State.StopList.Entry>>);
        get firstStop(): Nullable<State.StopList.Entry>;
        get collapsedStops(): Nullable<KtList<State.StopList.Entry>>;
        get targetStop(): Nullable<State.StopList.Entry>;
        get followingStops(): Nullable<KtList<State.StopList.Entry>>;
        copy(firstStop?: Nullable<State.StopList.Entry>, collapsedStops?: Nullable<KtList<State.StopList.Entry>>, targetStop?: Nullable<State.StopList.Entry>, followingStops?: Nullable<KtList<State.StopList.Entry>>): State.StopList;
        toString(): string;
        hashCode(): number;
        equals(other: Nullable<any>): boolean;
    }
    /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
    namespace StopList.$metadata$ {
        const constructor: abstract new () => StopList;
    }
    namespace StopList {
        class Entry {
            constructor(entryId: string, stopId: string, stopName: string, format: Nullable<State.UpcomingFormat>);
            get entryId(): string;
            get stopId(): string;
            get stopName(): string;
            get format(): Nullable<State.UpcomingFormat>;
            copy(entryId?: string, stopId?: string, stopName?: string, format?: Nullable<State.UpcomingFormat>): State.StopList.Entry;
            toString(): string;
            hashCode(): number;
            equals(other: Nullable<any>): boolean;
        }
        /** @deprecated $metadata$ is used for internal purposes, please don't use it in your code, because it can be removed at any moment */
        namespace Entry.$metadata$ {
            const constructor: abstract new () => Entry;
        }
    }
}
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_Direction$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_Tile$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Disruption$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Overridden$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Hidden$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Boarding$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Arriving$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Approaching$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Now$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Time$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithStatus$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_TimeWithSchedule$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Minutes$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTime$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleTimeWithStatus$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_ScheduleMinutes$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Skipped$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat_Cancelled$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_UpcomingFormat$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_Vehicle$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_StopList_Entry$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State_StopList$stableprop_getter(): number;
/** @deprecated Synthetic declaration generated by the Compose compiler. Please do not use. */
export declare function com_mbta_tid_mbta_app_wrapper_State$stableprop_getter(): number;