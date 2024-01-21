import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, over, Message } from "webstomp-client";

const WebSocketComponent: React.FC = () => {
  const [result, setResult] = useState<string>("");
  const socketClient = useRef<Client | null>(null);
  const wsNextId = useRef<number>(0);

  useEffect(() => {
    const stompClient = over(new SockJS("http://localhost:3001"), {
      heartbeat: false,
      debug: true,
    });

    const onWsConnection = () => {
      console.log("connection succeeded");

      stompClient.subscribe("/user/queue/execute-i", (message: Message) => {
        const msgId = message.headers["message-id"];
        const msgSeq = parseInt(
          msgId.substring(msgId.lastIndexOf("-") + 1),
          10
        );
        const statusCode = parseInt(message.headers.statusCode, 10);

        if (statusCode === 201) {
          wsNextId.current = msgSeq + 1;
          return;
        }

        // Implementing the delay logic
        let t0 = performance.now();
        while (performance.now() - t0 < 2500 && wsNextId.current !== msgSeq) {}

        // Handling different status codes
        switch (statusCode) {
          case 204:
            // Execution time logic
            break;
          case 500:
          case 410:
            console.log("server error");
            break;
          case 206:
            // Handling output files
            break;
          case 429:
            console.log("daily limit reached");
            break;
          case 400:
            console.log("invalid request - invalid signature or token expired");
            break;
          case 401:
            console.log("unauthorized request");
            break;
          default:
            setResult((prev) => prev + message.body);
            break;
        }

        wsNextId.current = msgSeq + 1;
      });

      // Sending the script execution request
      const script = `import java.util.Scanner;...`; // Your Java script here
      const data = JSON.stringify({
        script: script,
        language: "java",
        versionIndex: 4,
      });

      stompClient.send("/app/execute-ws-api-token", data, {
        message_type: "execute",
        token:
          "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKRE9PRExFIiwic3ViIjoiV1MtQVBJLVRPS0VOIiwiY2xpZW50LWlkIjoiZjg0YjVkY2U1ZGMzMjYxN2E3OGMyZTgxYzhlN2JmMjIiLCJpYXQiOjE3MDU4MzcwODMsImV4cCI6MTcwNTgzNzI2M30.YAfywRM2Bewy-wG6OwDL0R-XmX6cpeXzKCWBD9BSjwg", // Replace with your token
      });
    };

    const onWsConnectionFailed = (e: any) => {
      console.log("connection failed", e);
    };

    stompClient.connect({}, onWsConnection, onWsConnectionFailed);
    socketClient.current = stompClient;

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newResult = e.target.value;
    setResult(newResult);

    if (socketClient.current && e.nativeEvent instanceof InputEvent) {
      const key = e.nativeEvent.data; // Get the character that was added
      if (key) {
        socketClient.current.send("/app/execute-ws-api-token", key, {
          message_type: "input",
          // Include the token here if required
        });
      }
    }
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
