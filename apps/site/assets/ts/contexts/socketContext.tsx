import React, { createContext, ReactElement } from "react";
import { ConnectionStatus, SocketStatus } from "../hooks/useSocket";

export const SocketContext = createContext<SocketStatus>({
  socket: undefined,
  connectionStatus: ConnectionStatus.Loading
});

export const SocketProvider = ({
  socketStatus,
  children
}: {
  socketStatus: SocketStatus;
  children: ReactElement<HTMLElement>;
}): JSX.Element => (
  <SocketContext.Provider value={socketStatus}>
    {children}
  </SocketContext.Provider>
);
