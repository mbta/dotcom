import { Channel, Socket } from "phoenix";
import {
  Dispatch as ReactDispatch,
  useContext,
  useEffect,
  useReducer
} from "react";
import { SocketContext } from "../contexts/socketContext";
import { DirectionId } from "../__v3api";

type RouteId = string;

export interface Prediction {
  id: string;
  directionId: DirectionId;
  isDeparting: boolean;
  stopId: string;
  time: Date;
  track?: string;
  tripId: string;
}

interface StopData {
  id: string;
}

interface TripData {
  id: string;
}

interface PredictionData {
  id: string;
  "departing?": boolean;
  direction_id: DirectionId;
  stop: StopData;
  time: string;
  track?: string;
  trip: TripData;
}

const predictionFromData = (predictionData: PredictionData): Prediction => ({
  id: predictionData.id,
  directionId: predictionData.direction_id,
  isDeparting: predictionData["departing?"],
  stopId: predictionData.stop.id,
  time: new Date(predictionData.time),
  track: predictionData.track,
  tripId: predictionData.trip.id
});

interface State {
  channel?: Channel;
  routeId?: RouteId;
  predictions: Prediction[];
}

const initialState: State = {
  channel: undefined,
  routeId: undefined,
  predictions: []
};

interface SetRouteIdAction {
  type: "SET_ROUTE_ID";
  payload: {
    routeId: RouteId;
  };
}

const setRouteId = (routeId: RouteId): SetRouteIdAction => ({
  type: "SET_ROUTE_ID",
  payload: {
    routeId
  }
});

interface SetChannelAction {
  type: "SET_CHANNEL";
  payload: {
    channel: Channel;
  };
}

const setChannel = (channel: Channel): SetChannelAction => ({
  type: "SET_CHANNEL",
  payload: {
    channel
  }
});

interface SetPredictionsAction {
  type: "SET_PREDICTIONS";
  payload: {
    predictions: Prediction[];
  };
}

const setPredictions = (predictions: Prediction[]): SetPredictionsAction => ({
  type: "SET_PREDICTIONS",
  payload: {
    predictions
  }
});

type Action = SetRouteIdAction | SetChannelAction | SetPredictionsAction;

type Dispatch = ReactDispatch<Action>;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ROUTE_ID":
      return {
        ...state,
        routeId: action.payload.routeId
      };
    case "SET_CHANNEL":
      return {
        ...state,
        channel: action.payload.channel
      };
    case "SET_PREDICTIONS":
      return {
        ...state,
        predictions: action.payload.predictions
      };
    default:
      return state;
  }
};

const subscribe = (
  socket: Socket,
  routeId: RouteId,
  dispatch: Dispatch
): Channel => {
  const handlePredictions = ({
    predictions: predictionsData
  }: {
    predictions: PredictionData[];
  }): void => {
    const predictions: Prediction[] = predictionsData.map(predictionFromData);
    dispatch(setPredictions(predictions));
  };

  dispatch(setRouteId(routeId));

  const topic = `predictions:${routeId}`;
  const channel = socket.channel(topic);

  channel.on("predictions", handlePredictions);

  channel
    .join()
    .receive("ok", handlePredictions)
    .receive("error", ({ reason }) =>
      // eslint-disable-next-line no-console
      console.error("Predictions join failed", reason)
    );

  return channel;
};

const usePredictions = (routeId: RouteId): Prediction[] => {
  const { socket }: { socket: Socket | undefined } = useContext(SocketContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { channel, predictions } = state;

  useEffect(() => {
    if (socket && !channel) {
      const newChannel: Channel = subscribe(socket, routeId, dispatch);
      dispatch(setChannel(newChannel));
    }

    return () => {
      if (channel) {
        channel.leave();
      }
    };
  }, [socket, channel, routeId]);

  return predictions;
};

export default usePredictions;
