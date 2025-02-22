import { useContext } from "react";
import { WebSocketContext } from "../Router/WebsocketProvider";

const UseWebSocket = () => {
  const socket = useContext(WebSocketContext);
  return socket;
};

export default UseWebSocket;
