// src/components/WebSocketComponent.tsx
import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client, over } from "webstomp-client";

const WebSocketComponent: React.FC = () => {
  const [result, setResult] = useState<string>("");
  const [socketClient, setSocketClient] = useState<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS("https://api.jdoodle.com/v1/stomp");

    const stompClient = over(socket);
    setSocketClient(stompClient);

    const onWsConnection = () => {
      console.log("connection succeeded");
      // Existing subscription and message sending logic...
    };

    const onWsConnectionFailed = (e: any) => {
      console.log("connection failed", e);
    };

    stompClient.connect({}, onWsConnection, onWsConnectionFailed);

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // let key = e.key;
    // if (e.key === "Enter") {
    //   key = "\n";
    // }
    setResult(e.target.value);
    socketClient?.send("/app/execute-ws-api-token", e.target.value, {
      message_type: "input",
      token:
        "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKRE9PRExFIiwic3ViIjoiV1MtQVBJLVRPS0VOIiwiY2xpZW50LWlkIjoiZjg0YjVkY2U1ZGMzMjYxN2E3OGMyZTgxYzhlN2JmMjIiLCJpYXQiOjE3MDU4MTkzMDIsImV4cCI6MTcwNTgxOTQ4Mn0.GqDJQfrM4_CFKvI_FhZYuMOpTG9H243SsOtNrMNbxmI",
    });
  };

  return (
    <div>
      Output <br />
      <textarea
        title="result"
        rows={5}
        cols={100}
        value={result}
        onChange={onInput}
      ></textarea>
    </div>
  );
};

export default WebSocketComponent;
