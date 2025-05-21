import React from 'react';
import { useEffect, useState } from 'react';

import { createApi } from '@reduxjs/toolkit/query/react';
import { createWebSocketConnection } from './websocketUtils';

let socket;
let listeners = [];

export const echoSocketApi = createApi({
  reducerPath: 'echoSocketApi',
  baseQuery: () => ({ data: null }),
  endpoints: (builder) => ({
    connect: builder.query({
      queryFn: () => {
        if (!socket || socket.readyState === WebSocket.CLOSED) {
          socket = createWebSocketConnection('wss://echo.websocket.org/.ws');

          socket.onmessage = (event) => {
            listeners.forEach((listener) => listener(event.data));
          };
        }
        return { data: true };
      },
    }),
  }),
});

export const { useConnectQuery } = echoSocketApi;

export const useEchoWebSocket = () => {
  useConnectQuery(); 

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  const [lastMessage, setLastMessage] = React.useState(null);

  useEffect(() => {
    const listener = (msg) => setLastMessage(msg);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return { sendMessage, lastMessage };
};
