import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
} from "react";
import TopBar from "../../components/TopBar/TopBar";
import WorkSpace from "../../components/WorkSpace/WorkSpace";
import { useAppDispatch } from "../../app/hooks";
import {
  setAuthToken,
  setSocketConnected,
} from "../../features/contest/contestSlice";
import { useGetAuthTokenQuery } from "../../features/contest/contestAPI";
import SockJS from "sockjs-client";
import { Client, over } from "webstomp-client";
import { useDispatch } from "react-redux";

const Problem = () => {
  const dispatch = useAppDispatch();

  const { data } = useGetAuthTokenQuery(undefined, {
    pollingInterval: 180000,
  });

  useEffect(() => {
    if (data) dispatch(setAuthToken(data));
  }, [data]);

  return (
    <div>
      <SocketProvider>
        <TopBar />
        <WorkSpace />
      </SocketProvider>
    </div>
  );
};

export default Problem;

export const SocketContext = createContext<React.RefObject<Client> | null>(
  null
);

const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const ref = useRef<Client | null>(null);
  // const wsNextId = useRef<number>(0);

  useEffect(() => {
    const stompClient = over(
      new SockJS(`${process.env.REACT_APP_API_URL}stomp`),
      {
        heartbeat: false,
        debug: true,
      }
    );

    const onWsConnection = () => {
      dispatch(setSocketConnected(stompClient.connected));
    };

    const onWsConnectionFailed = (e: any) => {
      console.log("connection failed", e);
      dispatch(setSocketConnected(stompClient.connected));
    };

    stompClient.connect({}, onWsConnection, onWsConnectionFailed);
    ref.current = stompClient;

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
        dispatch(setSocketConnected(stompClient.connected));
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={ref}>{children}</SocketContext.Provider>
  );
};

SocketProvider.displayName = SocketProvider.name;
