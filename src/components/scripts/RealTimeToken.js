import WebSocket from 'ws';

const ws = new WebSocket('wss://pumpportal.fun/api/data');

const RealTimeToken = () => {

  ws.on('open', function open() {
    let payload = {
      method: "subscribeNewToken",
    }
    ws.send(JSON.stringify(payload));

  });

  ws.on('message', function message(data) {
    console.log(JSON.parse(data));
  });
}

export default RealTimeToken;
