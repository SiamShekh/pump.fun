import React, { useState, useEffect } from 'react';

function TrackWallets() {
  const [realTime, setRealTime] = useState([]); 

  useEffect(() => {
    const ws = new WebSocket('wss://pumpportal.fun/api/data');

    ws.onopen = function open() {
      let payload = {
        method: "subscribeNewToken", 
      };
      ws.send(JSON.stringify(payload));
    };

    ws.onmessage = function message(event) {
      const parsedData = JSON.parse(event.data);
      console.log(parsedData);
      setRealTime(prevData => {
        const updatedData = [parsedData, ...prevData];
        return updatedData.slice(0, 10); 
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time WebSocket Data</h1>
      <ul>
        {realTime.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default TrackWallets;
