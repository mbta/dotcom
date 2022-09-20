import { Socket } from "phoenix";
import { useEffect, useState } from "react";

export enum ConnectionStatus {
  Loading = 1,
  Connected,
  Disconnected
}

export interface SocketStatus {
  socket: Socket | undefined;
  connectionStatus: ConnectionStatus;
}

const useSocket = (): SocketStatus => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.Loading
  );

  useEffect(() => {
    const initialSocket = new Socket("/socket", {});
    initialSocket.connect();
    initialSocket.onOpen(() => setConnectionStatus(ConnectionStatus.Connected));
    initialSocket.onClose(() =>
      setConnectionStatus(ConnectionStatus.Disconnected)
    );
    setSocket(initialSocket);

    return () => {
      setConnectionStatus(ConnectionStatus.Disconnected);
      initialSocket.disconnect();
    };
  }, []);

  return { socket, connectionStatus };
};

export default useSocket;
