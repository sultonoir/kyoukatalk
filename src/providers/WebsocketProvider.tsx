"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface WebSocketContextType {
  isConnected: boolean;
  status: UserStatus | null;
}

interface UserStatus {
  id: string;
  online: boolean;
  lastOnline: string;
}

interface WebSocketProviderProps {
  userId: string;
  children: React.ReactNode;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  userId,
  children,
}) => {
  const [status, setStatus] = useState<UserStatus | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3001/online?id=${userId}`);

    socket.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connection opened.");
      // Send an initial online status
      socket.send(JSON.stringify({ online: true }));
    };

    socket.onmessage = (event) => {
      const data: UserStatus = JSON.parse(event.data);
      setStatus(data);
      console.log("Received data:", data);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed.");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(socket);

    const handleFocus = () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ online: true }));
        console.log("Sent online status: true");
      }
    };

    const handleBlur = () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ online: false }));
        console.log("Sent online status: false");
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      socket.close();
    };
  }, [userId]);

  return (
    <WebSocketContext.Provider value={{ isConnected, status }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
