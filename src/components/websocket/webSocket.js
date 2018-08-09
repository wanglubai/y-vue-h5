export default function (wsServer) {
  let ws;
  ws = new WebSocket(wsServer);
  ws.onopen = (evt) => {
    console.log('websocket已经链接');
  };
  return ws;
};