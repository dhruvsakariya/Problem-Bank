import React, { useState, useEffect, useRef } from "react";
import { onChange } from "react-toastify/dist/core/store";
import SockJS from "sockjs-client";
import { Client, over, Message } from "webstomp-client";

const WebSocketComponent: React.FC = () => {
  const [result, setResult] = useState<string>("");
  const socketClient = useRef<Client | null>(null);
  const wsNextId = useRef<number>(0);

  useEffect(() => {
    const stompClient = over(
      new SockJS(`${process.env.REACT_APP_API_URL}stomp`),
      {
        heartbeat: false,
        debug: false,
      }
    );

  

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
      const script = `import java.util.Scanner;
      import java.util.NoSuchElementException;
     
     public class MyClass {
      public static void main(String args[]) {
         Scanner scanner = new Scanner(System.in);
     
         try {
          System.out.println("Type a Line and enter....");
         String txt = scanner.nextLine();
         System.out.println("You have typed...");
         System.out.println(txt);
         } catch (NoSuchElementException e) {
             System.out.println("Type something in the Stdin box above....");
         }
     
       }
     }`; // Your Java script here
      const data = JSON.stringify({
        script: script,
        language: "java",
        versionIndex: 4,
      });

      stompClient.send("/app/execute-ws-api-token", data, {
        message_type: "execute",
        token:
          "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKRE9PRExFIiwic3ViIjoiV1MtQVBJLVRPS0VOIiwiY2xpZW50LWlkIjoiZjg0YjVkY2U1ZGMzMjYxN2E3OGMyZTgxYzhlN2JmMjIiLCJpYXQiOjE3MDU4NjA0MDIsImV4cCI6MTcwNTg2MDU4Mn0.dAF5RgDyD9FCWKStezrisoM5yYwzF90-OWImGQDqG6s", // Replace with your token
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

  function onInput(event: any) {
    let key = event.key;
    if (event.key === "Enter") {
      key = "\n";
    }
    console.log({key});
    socketClient.current.send("/app/execute-ws-api-token", key, {
      message_type: "input",
    });
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResult(e.target.value);
  };

  return (
    <div>
      Output <br />
      <textarea
        title="result"
        rows={5}
        cols={100}
        value={result}
        onKeyPress={onInput}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default WebSocketComponent;
