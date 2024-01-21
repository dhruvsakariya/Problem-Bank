import React, { useState, useEffect, FC } from "react";
// import { socket } from "../../socket";
import { ConnectionState } from "../../components/Connection/State";
import { ConnectionManager } from "../../components/Connection/Handler";
import { MyForm } from "../../components/Connection/Form";

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
//   const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    // no-op if the socket is already connected
    // socket.connect();

    return () => {
    //   socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onFooEvent(value:any) {
      setFooEvents(fooEvents.concat(value));
    }

    // socket.on('foo', onFooEvent);

    return () => {
    //   socket.off('foo', onFooEvent);
    };
  }, [fooEvents]);
  
  useEffect(() => {
    function onConnect() {
    //   setIsConnected(true);
    }

    function onDisconnect() {
    //   setIsConnected(false);
    }

    function onFooEvent(value: string) {
      setFooEvents((previous) => [...previous, value]);
    }

    // socket.on("connect", onConnect);
    // socket.on("disconnect", onDisconnect);
    // socket.on("foo", onFooEvent);

    // return () => {
    //   socket.off("connect", onConnect);
    //   socket.off("disconnect", onDisconnect);
    //   socket.off("foo", onFooEvent);
    // };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={false} />
      <ul>
        {fooEvents.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
      <ConnectionManager />
      <MyForm />
    </div>
  );
};

export default Chat;
