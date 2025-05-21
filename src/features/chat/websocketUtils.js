export function createWebSocketConnection(url) {
    const socket = new WebSocket(url);
  
    socket.onopen = () => console.log('WebSocket connected');
    socket.onclose = () => console.log('WebSocket disconnected');
    socket.onerror = (e) => console.error('WebSocket error:', e);
  
    return socket;
  }
  