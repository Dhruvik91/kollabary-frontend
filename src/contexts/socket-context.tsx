'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './auth-context';
import { API_CONFIG } from '@/constants';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const socketInstance = io(API_CONFIG.socketUrl || '', {
        withCredentials: true,
        transports: ['websocket', 'polling'],
      });

      socketInstance.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to WebSocket');
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from WebSocket');
      });

      socketInstance.on('connect_error', (err) => {
        console.error('WebSocket Connection Error:', err.message);
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    } else if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
